---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# Page verrouillée

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`91-18_GRIMOIRE_CODE_HONNEUR.md`](../../../05-MAITRISE/06-ANNEXES/91-18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~9 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00-PREREQUIS.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## EVENT LOOP GRIMOIRE

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

Le moteur JS expliqué terme par terme.
Chaque concept avec son code, son comportement runtime, et son équivalent dans la vraie vie.

---

| Terme                     | Définition                                                                                                                                                                                                         | Code                                                                                                        | Analogies                                                                                                                                                                                                                       | Limite                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Call Stack**            | Pile d'exécution des fonctions. Chaque appel empile une frame, chaque `return` dépile. Quand elle est vide, l'event loop peut agir.                                                                                | `function a() { b() } function b() { console.log("ok") } a()` : stack : [a] --> [a, b] --> [a] --> []       | Une pile d'assiettes sales : on pose, on enlève, toujours par le haut / Le stack de missions actives de Naruto : une à la fois, on finit avant d'en prendre une autre                                                           | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Event Loop**            | La boucle qui surveille la call stack et les queues. Règle : stack vide --> microtasks --> rendu --> une macrotask --> recommencer.                                                                                | `while(true) { if (callStack.isEmpty()) { runMicrotasks(); runOneMacrotask() } }`                           | L'arbitre du tournoi de Chunin : il gère l'ordre des combats, personne ne saute son tour / Le dispatching des missions au Village : une mission à la fois, les urgences passent devant                                          | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Heap**                  | Modèle pédagogique d’une zone de stockage d’objets/références ; les détails d’allocation et de représentation sont propres au moteur. La call stack n’est pas une garantie universelle de localisation des objets. | `const joueur = { nom: "Messi" }` : `joueur` est dans la stack, l'objet `{ nom: "Messi" }` est dans le heap | L'armurerie du camp : les cartes (stack) pointent vers les emplacements (heap), les armes restent là-bas / Le casier des Chevaliers de la Flamme : la référence est dans les papiers, l'armure est dans le casier               | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Microtask Queue**       | File haute priorité. Remplie par `Promise.then()`, `await`, `queueMicrotask()`. Vidée entièrement avant chaque macrotask.                                                                                          | `Promise.resolve().then(() => console.log("je passe avant setTimeout"))`                                    | La file VIP du Conseil de Surveillance : tout le monde attend, mais les Chevaliers Dorés passent en premier / Le carton rouge en foot : traité immédiatement avant de reprendre le jeu                                          | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Macrotask Queue**       | File basse priorité. Remplie par `setTimeout`, `setInterval`, `requestAnimationFrame`, callbacks I/O. L'event loop en prend UNE par tour.                                                                          | `setTimeout(() => console.log("macrotask"), 0)`                                                             | La salle d'attente normale chez le médecin : chacun son tour, un seul à la fois / Les zombies qui font la queue à la grille de la prison de Rick                                                                                | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **setTimeout**            | Planifie une fonction dans la macrotask queue après un délai minimum. Le `0` ne veut pas dire "maintenant" : ça veut dire "après les microtasks".                                                                  | `setTimeout(() => console.log("après"), 0); console.log("avant")` : affiche "avant" puis "après"            | Titanr une pizza en 0 minute : la pizza arrive quand elle peut, pas instantanément / Sasuke qui dit "j'arrive tout de suite" : c'est après son jutsu en cours                                                                   | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **setInterval**           | Planifie une macrotask répétée toutes les N ms. Ne garantit pas un timing exact si le callback est long.                                                                                                           | `const id = setInterval(() => tick(), 1000); clearInterval(id)`                                             | Le ticker de score pendant un match live : toutes les secondes, mais peut dériver si le réseau lag / Le système de garde du camp : toutes les heures, sauf si une attaque zombie dépasse l'heure                                | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **requestAnimationFrame** | Macrotask synchronisée avec le cycle de rendu navigateur (~60fps). Suspendue quand l'onglet est en arrière-plan.                                                                                                   | `function animer() { dessiner(); requestAnimationFrame(animer) }`                                           | Le battement de coeur de Rock Lee qui court dans le tournoi chunin : régulier, synchronisé avec le mouvement / Le dribble de Mbappé : coordonné avec chaque foulée, pas lancé au hasard                                         | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **queueMicrotask**        | Planifie explicitement une microtask. Alternative légère à `Promise.resolve().then()` quand on veut juste différer sans créer une Promise.                                                                         | `queueMicrotask(() => console.log("microtask"))`                                                            | Glisser un mot au Hokage pendant une réunion : prioritaire, mais pas une urgence officielle / Un SMS urgent entre deux actions dans un match                                                                                    | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Starvation**            | Situation où les macrotasks ne tournent jamais parce que les microtasks s'enchaînent infiniment. Le rendu et les setTimeout sont bloqués.                                                                          | `function loop() { Promise.resolve().then(loop) } loop()` : setTimeout ne tourne jamais                     | La file VIP qui n'arrête pas d'arriver : les gens normaux attendent indéfiniment / Le Training Arc infini : Naruto s'entraîne, les missions s'accumulent, personne n'est dépêché                                                | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Blocking Code**         | Code synchrone qui prend du temps et bloque la call stack pendant son exécution. Toutes les queues attendent.                                                                                                      | `while(i < 1e9) i++` : rien d'autre ne peut tourner pendant ce while                                        | Une longue réunion qui bloque toute l'équipe : personne ne peut travailler / Rick qui fait une longue analyse solo : les autres attendent à la grille                                                                           | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Concurrency**           | La capacité de JS à gérer plusieurs opérations en alternant : pas en parallèle. Une chose à la fois, mais intelligemment ordonnée.                                                                                 | `fetch(url1); fetch(url2)` : les deux sont en vol, mais les callbacks s'exécutent l'un après l'autre        | Deux missions lancées simultanément dans le Village : les ninjas partent en même temps, leurs rapports reviennent à tour de rôle / Deux chansons en streaming : les deux téléchargent, mais tu ne les entends pas en même temps | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Async Function**        | Fonction qui retourne toujours une Promise. Le code après chaque `await` est traité comme une microtask.                                                                                                           | `async function f() { await delay(); console.log("microtask") }`                                            | Gajeel qui forge une armure : il lance la forge (sync), part chercher du métal (await), revient finir (microtask) / Un joueur qui attend le VAR : il s'arrête, le jeu continue, il reprend quand la décision arrive             | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| **Promise**               | Objet représentant une valeur future. Peut être `pending`, `fulfilled`, ou `rejected`. Ses callbacks (`.then`, `.catch`) sont des microtasks.                                                                      | `const p = new Promise((resolve) => setTimeout(resolve, 1000))`                                             | Une lettre de transfer envoyée : en attente (pending), acceptée (fulfilled), refusée (rejected) / La promesse de Naruto de ramener Sasuke : en cours, accomplie, ou échouée                                                     | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |

---

## DIAGRAMME COMPLET DE L'EVENT LOOP

```
          CODE SOURCE
            |
            v
       +-----------------+
       |  CALL STACK  |
       | (exécution   |
       |  synchrone)  |
       +-----------------+
            |
       stack vide |
            v
       +-----------------+    +-----------------+
       | MICROTASK QUEUE |    |   HEAP    |
       |         |    | (objets en   |
       | Promise.then() |    |  mémoire)   |
       | await résolution|    +-----------------+
       | queueMicrotask()|
       +-----------------+
            |
      queue vide |
            v
       +-----------------+
       |  RENDU     |
       | (navigateur)  |
       +-----------------+
            |
            v
       +-----------------+
       | MACROTASK QUEUE |
       |         |
       | setTimeout()  |
       | setInterval()  |
       | rAF()      |
       | I/O callbacks  |
       +-----------------+
            |
       UNE tâche |
            v
        retour au début
```

---

## LES 3 RÈGLES QUI EXPLIQUENT TOUT

```
1. call stack se vide     --> microtask queue se vide entièrement
2. microtask queue vide    --> rendu navigateur (si nécessaire) --> UNE macrotask
3. après la macrotask     --> retour à la règle 1
```

Tout le reste est une conséquence de ces trois règles.

> ATTENTION - ou cette analogie casse :
> les analogies mecaniquement sensibles (prototype, closure, event loop, reference vs copie)
> creent de faux modeles si on les prend trop loin. Consulte ce court aide-memoire :
>
> - **prototype != clone** : `Object.create(p)` ne COPIE pas p, il LIE dessus. Modifier p impacte l'enfant.
> - **closure != variable capturee** : la closure capture la REFERENCE au binding, pas la valeur au moment de la creation.
> - **event loop != file simple** : microtasks drainent COMPLETEMENT entre chaque macrotask - pas un round-robin.
> - **reference != alias** : `let b = a; b = {...}` ne mute pas a. `b.x = 1` mute a si a est objet.

---

## OÙ L'ANALOGIE CASSE

Rappel Partie B.2 : toute analogie de ce grimoire simplifie un mécanisme.
Quand tu dois **décider** (fix, refactor, ADR), retourne au mécanisme réel,
pas à l'image. L'analogie sert à comprendre vite ; elle ment toujours un peu.

---

## OÙ LES ANALOGIES CASSENT (règle B.2)

Les analogies de ce grimoire simplifient : elles ne définissent pas. Une
closure **nest pas** un tiroir ; un event loop **nest pas** un carrousel ;
une pile **nest pas** une pile de crêpes. Chaque analogie sert à visualiser
un mécanisme ; elle cesse dès que tu veux raisonner sur la complexité, la
mémoire, la concurrence ou les cas limites. Reviens toujours à la définition
technique avant de coder, débugger ou expliquer à un pair. Une analogie
prise pour la réalité devient un obstacle épistémologique.

---

## Ou l'analogie casse (event loop)

Garde-fou epistemologique : l'analogie seduisante est utile a l'entree, dangereuse a la sortie.
Ce tableau liste les endroits **precis** ou l'analogie courante trompe.

| Analogie courante              | Ou elle casse                                                                                                                 | Limite                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| "File d attente unique"        | Il y a **plusieurs** files (macrotasks, microtasks, animation frame, I/O). Croire a une file unique fait mal predire l ordre. | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| "Le navigateur = Node"         | En Node, `setImmediate` et `process.nextTick` n existent pas dans le browser ; l ordre change.                                | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |
| "setTimeout(fn, 0) = immediat" | Non : c est **au minimum** 0 ms, apres vidage des microtasks et selon le nesting (clamp a 4 ms).                              | L'image simplifie : le mécanisme runtime réel peut différer (spécificités moteur JS, edge cases, timing). |

Regle : si tu ne peux pas nommer _une_ case ou ton analogie casse, tu ne l'as
pas encore comprise ; tu l'as juste memorisee.
