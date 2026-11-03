---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# MICROTASK MADNESS

<!-- AF-DIAGRAM:event_loop -->

```text
┌────────────────────┐
│ Job / tâche courant│
└──────────┬─────────┘
           │ fin du code courant
           ▼
┌────────────────────┐
│ Microtasks en attente│ ◄── Promise.then / queueMicrotask
└──────────┬─────────┘
           │ toutes vidées
           ▼
┌────────────────────┐
│ Hôte : rendu éventuel│
│ puis prochaine tâche│
└──────────┬─────────┘
           └──────────────► nouveau tour
```

Modèle simplifié du navigateur : une tâche est exécutée, puis les microtasks en attente sont vidées avant le prochain choix de tâche. Le détail du rendu et des sources de tâches appartient à l'hôte.

<!-- AF-DIAGRAM:microtasks -->

```text
      [ PILE D'APPEL ]
             │ fin du job courant
             ▼
      [ MICROTÂCHES ] ◄── réactions Promise / queueMicrotask
             │ file vidée
             ▼
      [ PROCHAIN JOB HÔTE ] ◄── tâche choisie parmi les sources du navigateur
```

Les microtasks sont traitées au point de contrôle prévu avant la prochaine tâche ordinaire ; ce schéma n'est pas une description universelle de Node.js.

Temps de lecture ~9 min

Dans un agent JavaScript donné, un job s'exécute à la fois.
Mais l'hôte décide comment les différents travaux sont planifiés et dans quel ordre ils deviennent exécutables.
Ces règles expliquent pourquoi le code asynchrone peut se comporter bizarrement quand on mélange les modèles du navigateur et de Node.js.

Ce fichier t'apprend à prédire l'ordre d'exécution avant de lancer le code.
C'est ça, comprendre le moteur.

---

## 1) LE MODÈLE DE BASE : UNE EXÉCUTION PAR AGENT, PLUSIEURS SOURCES DE TRAVAIL

Un agent JavaScript exécute un job à la fois sur son thread d'exécution. Un environnement peut toutefois utiliser plusieurs agents : par exemple, des Web Workers ont leurs propres contextes d'exécution et leurs propres boucles d'événements.

Pour comprendre un script navigateur simple, utilise ce modèle :

```
PILE D'APPEL       FILE DE MICROTÂCHES      FILES DE TÂCHES DE L'HÔTE
(exécution)        (Promises, queueMicrotask) (timers, événements, etc.)
-----------        ------------------------- -------------------------
code synchrone     réactions Promise        callbacks planifiés par l'hôte
                   queueMicrotask()
                   MutationObserver
```

Dans le modèle navigateur, quand une tâche se termine, les microtasks en attente sont vidées avant le prochain tour de tâches. Le navigateur peut ensuite effectuer un rendu avant de poursuivre.

```text
fin du job courant
       ↓
vider les microtasks en attente
       ↓
rendu éventuel / prochaine tâche de l'hôte
       ↺
```

**Vocabulaire :** « macrotask » est un raccourci pédagogique souvent utilisé pour parler d'une tâche ordinaire ; ce n'est pas le nom d'une file unique imposée à tous les runtimes. `setImmediate()` et `process.nextTick()` appartiennent à Node.js, pas au modèle navigateur. Les détails de l'ordonnancement Node.js sont différents : ne mélange pas les deux modèles.

````
CALL STACK       WEB APIs / Node APIs    TASK QUEUES
----------       --------------------    -----------
| fn() | ---------> | fetch (réseau)  |     Microtask : [ resolvePromise() ]
| main()|       | setTimeout    | -------> Macrotask : [ setTimeout_cb() ]
----------       | fs.readFile   |     -----------
   ^         --------------------        |
   |                           |
   +-------------------- EVENT LOOP --------------------+
           (call stack vide ?
           oui -> microtask en premier,
               puis UNE macrotask,
               puis recommence)

Règle précise : **quand une microtask est mise en file**, l'environnement JavaScript la traite lors du prochain point de contrôle des microtasks, avant de reprendre l'exécution normale des tasks suivantes. Mais une promesse n'est pas exécutée avant un timer si elle ne peut être résolue qu'au cours du callback de ce timer. Le moment où le travail est *planifié* compte autant que le type de callback.

```js
// Exemple A : la réaction de Promise est planifiée immédiatement.
const ordreA = [];
Promise.resolve().then(() => ordreA.push("reaction Promise"));
setTimeout(() => ordreA.push("callback timer"), 0);
setTimeout(() => console.log("A :", ordreA), 10);
// A attendu : ["reaction Promise", "callback timer"] dans un script Node/browser standard.

// Exemple B : la promesse ne peut être résolue qu'au passage du timer.
const ordreB = [];
const terminee = new Promise((resolve) => {
  setTimeout(() => {
    ordreB.push("callback timer qui résout");
    resolve();
  }, 0);
});
terminee.then(() => ordreB.push("reaction Promise après résolution"));
setTimeout(() => console.log("B :", ordreB), 10);
// B attendu : ["callback timer qui résout", "reaction Promise après résolution"].
// Le callback timer doit d'abord s'exécuter pour résoudre la promesse.
````

Ne retiens donc pas « Promise toujours avant timer ». Demande-toi : **quand la réaction est-elle devenue éligible, et quel contexte d'exécution l'a mise en file ?** La comparaison entre navigateurs et Node peut en plus dépendre de la phase et du contexte d'où le code est lancé.

````

---

## 2) CALL STACK : LA PILE D'EXÉCUTION

Chaque appel de fonction empile une frame. Chaque `return` dépile.

```js
function tuer(villain) {
  return `${villain} est éliminé`;
}

function mission(ninja) {
  const cible = "Pain";
  return tuer(cible);
  // tuer() est empilé par-dessus mission()
  // quand tuer() return, il est dépilé
  // mission() continue et return à son tour
}

mission("Naruto");
````

Visualisation de la pile :

```
APPEL :
[mission("Naruto")]  --> [tuer("Pain")]  --> return "Pain est éliminé"

DÉPILAGE :
tuer() sort --> mission() sort --> call stack vide
```

Quand la call stack est vide, l'event loop regarde les queues.
C'est là que le fun commence.

---

## 3) MICROTASK QUEUE : LA FILE VIP

Les microtasks éligibles sont drainées au point de contrôle des microtasks avant que l'environnement reprenne les tâches ordinaires suivantes. Cela ne signifie pas qu'elles passent avant toute opération interne du runtime ni qu'une promesse non encore résolue devance un timer qui doit la résoudre.

Sources de microtasks :

- `Promise.then()` / `Promise.catch()` / `Promise.finally()`
- `await` (ce qui suit le `await` dans une async function)
- `queueMicrotask()`
- `MutationObserver`

```js
// Exemple 1 : prédis l'ordre avant de lire la réponse
console.log("A");

Promise.resolve().then(() => {
  console.log("B"); // microtask
});

console.log("C");

// Ordre : A --> C --> B
// Pourquoi :
// A : code sync, exécuté immédiatement
// C : code sync, exécuté immédiatement
// B : microtask, exécuté APRES que tout le code sync est fini
```

---

## 4) LE TRUC QUI SURPREND TOUT LE MONDE

```js
// Exemple 2 : microtasks imbriquées
console.log("début");

Promise.resolve()
  .then(() => {
    console.log("microtask 1");
    // on planifie une nouvelle microtask depuis une microtask
    return Promise.resolve();
  })
  .then(() => {
    console.log("microtask 2");
  });

console.log("fin");

// Ordre : début --> fin --> microtask 1 --> microtask 2
```

Ce qui se passe dans le moteur :

```
1. code sync tourne    --> "début", "fin" sont affichés
2. call stack vide     --> event loop vérifie microtask queue
3. microtask 1 s'exécute  --> affiche "microtask 1", planifie microtask 2
4. microtask 2 planifiée  --> elle s'ajoute à la microtask queue
5. event loop continue   --> microtask 2 s'exécute
6. queue vide       --> event loop peut passer aux macrotasks
```

Au checkpoint pertinent, le runtime draine la file des microtasks jusqu'à ce qu'elle soit vide, y compris les microtasks ajoutées pendant ce drainage. Le moment exact de ce checkpoint dépend de l'environnement ; cela ne signifie pas que chaque microtask précède tout travail interne ou toute phase de Node.

---

## 5) AWAIT : C'EST UNE MICROTASK DÉGUISÉE

`await` suspend la fonction async et reprend à la prochaine microtask.

```js
async function naruto() {
  console.log("Naruto commence");

  await Promise.resolve();
  // tout ce qui suit le await est une microtask

  console.log("Naruto finit son rasengan");
}

console.log("avant");
naruto();
console.log("après");

// Ordre : avant --> Naruto commence --> après --> Naruto finit son rasengan
```

Ligne par ligne :

```
"avant"          --> code sync
naruto() est appelée   --> entre dans la fonction
"Naruto commence"     --> code sync dans naruto()
await Promise.resolve()  --> suspend naruto(), sort de la fonction
"après"          --> code sync du dessus reprend
call stack vide      --> microtask queue : reprendre naruto()
"Naruto finit son rasengan" --> suite de naruto()
```

C'est pour ça que le code après `naruto()` s'exécute avant la suite de `naruto()`.
La fonction se met en pause, rend la main, reprend plus tard.

---

## 6) LE PIÈGE DU MICROTASK LOOP INFINI

Une microtask qui s'appelle elle-même bloque tout.

```js
// NE PAS FAIRE EN PROD
function blackHole() {
  Promise.resolve().then(blackHole);
  // planifie une microtask qui planifie une microtask qui planifie...
}

blackHole();
// les macrotasks ne tournent jamais
// setTimeout, setInterval, render : tout est bloqué
// le navigateur gèle
```

C'est le Susanoo de Sasuke sur l'event loop : il absorbe tout et ne laisse rien passer.

---

## EXERCICES

## EXO 1 : LE CLASSEMENT PROPHÉTIQUE

Donne l'ordre exact des logs avant d'exécuter ce code.
Chaque erreur de prédiction = une ligne que tu n'as pas comprise.

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

Promise.resolve()
  .then(() => {
    console.log("5");
    return Promise.resolve();
  })
  .then(() => console.log("6"));

setTimeout(() => console.log("7"), 0);
```

Écris l'ordre attendu, puis lance le code et compare.
Si tu t'es trompé : identifie exactement quelle règle tu as ratée.

(indice : raisonne sur les microtasks déjà éligibles au point de contrôle pertinent ; un callback de timer nécessaire pour résoudre une promesse doit d'abord s'exécuter)

---

## EXO 2 : LA MISSION ASYNC DE SASUKE

```js
async function sasuke(jutsu) {
  console.log(`${jutsu} - début`);

  const resultat = await fetch_simulé(jutsu);

  console.log(`${jutsu} - résultat reçu : ${resultat}`);
  return resultat;
}

function fetch_simulé(nom) {
  return Promise.resolve(`${nom} a réussi`);
}

console.log("Départ");
sasuke("Chidori");
sasuke("Amaterasu");
console.log("Missions lancées");
```

Question : dans quel ordre s'affichent les logs ?
Deuxième question : est-ce que "Missions lancées" apparaît avant ou après les résultats des deux jutsus ? Pourquoi ?

---

## EXO 3 : DÉBOGUER L'ORDRE CASSÉ

Ce code est censé afficher les étapes dans l'ordre 1 → 2 → 3 → 4.
Il ne le fait pas. Trouve pourquoi et corrige sans changer la logique métier.

```js
async function pipeline() {
  setTimeout(() => console.log("étape 4 : archivage"), 0);

  console.log("étape 1 : lancement");

  await Promise.resolve();
  console.log("étape 3 : traitement");

  Promise.resolve().then(() => console.log("étape 2 : validation"));
}

pipeline();
```

(indice : l'ordre des `await` et des `.then()` détermine la priorité)

---

## RÉSUMÉ

JS est mono-thread mais il a une file d'attente prioritaire pour les microtasks.
Quand la call stack est vide : toutes les microtasks tournent d'abord, puis une macrotask, puis retour aux microtasks.
`Promise.then()` et `await` créent des microtasks.
`setTimeout` et `setInterval` planifient des callbacks de timer : ils ne s’exécutent pas avant l’expiration du délai minimal, et leur ordre relatif dépend du contexte d’exécution et du runtime. À un checkpoint de microtasks, les microtasks déjà en file sont traitées avant le retour à une nouvelle task ; ne transforme pas cela en règle universelle sur tous les callbacks.
Prédire l'ordre d'exécution sans lancer le code : c'est le vrai test de compréhension du moteur JS.

## Schéma : timeline complète

Code :

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
queueMicrotask(() => console.log("D"));
Promise.resolve().then(() => console.log("E"));
console.log("F");
```

Timeline :

```
t=0 | STACK    | MICROTASK Q   | MACROTASK Q
-----|-------------|------------------|-------------------
   | log("A")  |         | setTimeout(cb_B)
   | log("F")  | then(cb_C)    |
   |       | queueMT(cb_D)  |
   |       | then(cb_E)    |
-----|-------------|------------------|-------------------
   | drain micro | -> log C     |
   |       | -> log D     |
   |       | -> log E     |
-----|-------------|------------------|-------------------
   | macro tick |         | -> log B
```

Sortie : `A F C D E B`.

### Ce que l'analogie cache

La microtask queue est **drainée entièrement** entre deux macrotasks. Une microtask qui en ajoute une autre = boucle infinie qui bloque le rendu. Le navigateur ne rendra jamais un frame.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Frontière du modèle et références

Le diagramme principal de cette leçon est le modèle simplifié du navigateur. Les task sources, le rendu, les Workers et le runtime Node.js ont des règles propres ; le diagramme n'est pas un simulateur universel.

- [MDN : Guide approfondi des microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
- [MDN : Modèle d'exécution JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [Node.js : Event Loop, timers et `process.nextTick`](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
