---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_inversee]
anti_recipe_key: fausse_piste+decision_inversee
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Closure trap : la fonction qui n'oublie jamais

<!-- AF-DIAGRAM:closure -->

```text
┌──────────────┐
│ appelant     │
└──────┬───────┘
       │ crée
       ▼
┌──────────────┐       conserve
│ fonction     │────────────────┐
└──────┬───────┘                │
       │ retourne               │
       ▼                        ▼
┌──────────────┐        ┌──────────────┐
│ code suivant │        │ environnement│
└──────────────┘        │ lexical      │
                        └──────────────┘
```

Une closure reste liée à son environnement lexical même après le retour de la fonction créatrice.

Temps de lecture ~8 min

> Une closure c'est une fonction qui garde en mémoire les variables de son environnement, même après que la fonction parente soit morte et enterrée. Comme un fantôme utile.

> **Où l'analogie casse** : un fantôme narratif reste "vivant" par principe, indéfiniment. Une closure, non : elle vit tant que quelque chose la référence encore (une variable, un handler, un timer). Dès que plus rien ne pointe dessus, le garbage collector la balaye : plus de closure, plus de variables capturées, terminé. On reverra ça froidement dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/` avec le GC. Retenir : la closure est un mécanisme précis du moteur (référence vers l'environnement lexical), pas une entité magique.

---

## 1) CLOSURE BASIQUE : LE COMPTEUR IMMORTEL

```js
function makeCounter() {
  let count = 0; // variable locale : normalement elle mourrait ici
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

`makeCounter` est terminée. Mais `count` survit --> la fonction retournée la garde en mémoire. C'est ça une closure : une fonction avec une boîte mémoire privée.

> Crée un deuxième compteur `counter2 = makeCounter()` et observe qu'il repart de 0. Deux appels = deux boîtes séparées.

---

## 2) LE PIÈGE CLASSIQUE : `var` DANS UNE BOUCLE ASYNC

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("i vaut :", i);
  }, 100);
}
```

**Réfléchis avant de lancer. Que va afficher `i` ?**

```text
i vaut : 4
i vaut : 4
i vaut : 4
```

`var` n'est pas block-scoped. Toutes les fonctions partagent la **même** variable `i`. La boucle finit avant que les `setTimeout` s'exécutent -> `i` vaut déjà `4`. Toutes les callbacks lisent la même valeur.

```text
GLOBAL ENV
|-- i ------------> 4
     ^
  callback #1 -------|
  callback #2 -------| <-- toutes pointent sur le même i
  callback #3 -------|
```

---

## 3) COMMENT RÉSOUDRE

**Solution 1 : `let` à la place de `var` :**

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("i vaut :", i); // 1, 2, 3
  }, 100);
}
```

Dans une boucle `for`, `let` crée une liaison lexicale distincte pour chaque itération. Chaque callback conserve l'accès à la liaison de son itération ; **ce n'est pas une copie générale des objets ou de leurs valeurs**.

```text
ENVIRONNEMENT DE L'ITÉRATION 1 : liaison i = 1 <-- callback #1
ENVIRONNEMENT DE L'ITÉRATION 2 : liaison i = 2 <-- callback #2
ENVIRONNEMENT DE L'ITÉRATION 3 : liaison i = 3 <-- callback #3
```

Contre-exemple important : une liaison distincte peut tout de même référencer le même objet mutable si cet objet est partagé. Modifier ses propriétés reste observable par les callbacks qui le référencent.

**Solution 2 : IIFE pour capturer la valeur :**

```js
for (var i = 1; i <= 3; i++) {
  (function (j) {
    setTimeout(function () {
      console.log("j vaut :", j); // 1, 2, 3
    }, 100);
  })(i);
}
```

L'IIFE crée un environnement d'appel par itération et lie le paramètre `j` à la valeur courante de `i`. Cela isole cette liaison primitive ; si `j` recevait une référence vers un objet, l'objet ne serait pas cloné automatiquement. Vieux pattern, mais utile à comprendre.

---

## 4) POURQUOI LES CLOSURES C'EST PUISSANT ?

Les closures c'est pas juste un concept à connaître pour les entretiens. C'est ce qui fait fonctionner :

- Les **callbacks** : la fonction se souvient du contexte où elle a été créée
- Les **event listeners** : chaque listener garde accès à ses variables locales
- Les **modules** : mémoire privée sans classes, sans global
- Tout l'**async** de JS : promises, setTimeout, fetch

Si tu rates les closures, tu rates la moitié de comment JS fonctionne réellement.

---

## Comparaison multi-langages

| Concept              | JavaScript                         | Python                       | Dart                          | PHP                                   |
| -------------------- | ---------------------------------- | ---------------------------- | ----------------------------- | ------------------------------------- |
| Closure native       | `function` retourne une `function` | `def` imbriqué               | fonctions imbriquées          | depuis PHP 5.3 avec `use`             |
| Capture de variable  | automatique                        | automatique                  | automatique                   | manuelle avec `use ($var)`            |
| Piège boucle + async | `var` partage la même référence    | pas de `var`, moins de piège | `let` block-scoped par défaut | peu pertinent, pas d'event loop natif |
| Solution recommandée | `let` ou IIFE                      | `default arg` dans la lambda | `let` par défaut              | `use` explicite                       |
| Niveau de piège      | élevé : `var` est silencieux       | faible                       | faible                        | moyen : `use` oublié = bug            |

---

## MISSION : La Team Closure

### Instructions

1. Crée `makeTeam()` qui initialise un tableau vide `team`
2. Retourne une fonction `addPlayer(name)` qui ajoute un joueur et affiche le tableau
3. Crée **deux équipes distinctes** avec `makeTeam()`
4. Ajoute deux joueurs dans chaque équipe
5. Observe que chaque équipe garde sa propre mémoire
6. Refais un mini `for` with `var` puis `let` --> observe la différence

### Code de départ

```js
function makeTeam() {
  // ton code ici
}

const alphaTeam = makeTeam();
const betaTeam = makeTeam();

// Ajoute des joueurs ici
```

### Résultat attendu

```text
// alphaTeam
Équipe : ["Naruto"]
Équipe : ["Naruto", "Sakura"]

// betaTeam
Équipe : ["Sasuke"]
Équipe : ["Sasuke", "Kakashi"]

// alphaTeam non contaminée
alphaTeam toujours : ["Naruto", "Sakura"]

// boucle var
i vaut : 4
i vaut : 4
i vaut : 4

// boucle let
i vaut : 1
i vaut : 2
i vaut : 3
```

> Deux appels à `makeTeam()` = deux boîtes mémoire séparées. C'est exactement ça une closure.

---

## RÉSUMÉ

Une closure est une fonction qui garde accès aux variables de son environnement parent, même après que la fonction parente soit terminée. Elle ne copie pas les valeurs : elle garde une référence vivante.

Le piège classique avec `var` dans les boucles async : toutes les closures partagent la même variable `i` qui vaut sa valeur finale au moment de l'exécution. Avec `let`, chaque itération crée sa propre variable.

Deux appels à une factory créent des environnements d'appel distincts pour leurs variables locales. En revanche, plusieurs closures créées pendant **un même appel** peuvent partager le même environnement lexical ; et deux environnements peuvent toujours référencer le même objet mutable si le programme leur transmet cet objet.

## Schéma : chaîne de portée en action

```text
+-----------------------------------------------+
| GLOBAL env                  |
|  makeCounter (fn)              |
|  +---------------------------------------+  |
|  | makeCounter() env           |  |
|  |  count = 0              |  |
|  |  +-------------------------------+  |  |
|  |  | inner() env (returned)    |  |  |
|  |  |  [[Scope]] -> makeCounter env|  |  |
|  |  |       -> GLOBAL env   |  |  |
|  |  +-------------------------------+  |  |
|  +---------------------------------------+  |
+-----------------------------------------------+
```

Quand `inner` est appelée plus tard, sa `[[Scope]]` maintient vivant l'environnement `makeCounter()`. C'est **ça**, la closure. Pas de la magie, juste des références qui refusent de mourir.

### Ce que l'analogie cache

On dit "closure = fonction qui se souvient". Faux. La closure, c'est le **couple** (fonction, environnement). Sans l'environnement, ce n'est qu'une fonction.

> ATTENTION - ou cette analogie casse :
> les analogies mecaniquement sensibles (prototype, closure, event loop, reference vs copie)
> creent de faux modeles si on les prend trop loin. Consulte ce court aide-memoire :
>
> - **prototype != clone** : `Object.create(p)` ne COPIE pas p, il LIE dessus. Modifier p impacte l'enfant.
> - **closure != variable capturee** : la closure capture la REFERENCE au binding, pas la valeur au moment de la creation.
> - **event loop != file simple** : microtasks drainent COMPLETEMENT entre chaque macrotask - pas un round-robin.
> - **reference != alias** : `let b = a; b = {...}` ne mute pas a. `b.x = 1` mute a si a est objet.

---

## Ou l'analogie casse (closure)

Garde-fou epistemologique : l'analogie seduisante est utile a l'entree, dangereuse a la sortie.
Ce tableau liste les endroits **precis** ou l'analogie courante trompe.

| Analogie courante              | Ou elle casse                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| "Une closure = une fonction"   | Non : c est **la paire (fonction, environnement lexical)**. Deux fonctions peuvent partager le meme environnement. |
| "La closure copie les valeurs" | Elle **capture les references** aux bindings. `var` dans une boucle sans `let` = piege classique.                  |
| "Closure = fuite memoire"      | Faux en general ; la fuite vient d une **reference qui traine**, pas de la closure en soi.                         |

Regle : si tu ne peux pas nommer _une_ case ou ton analogie casse, tu ne l'as
pas encore comprise ; tu l'as juste memorisee.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Closure trap : la fonction qui n'oublie jamais** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « Closure trap : la fonction qui n'oublie jamais » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

**Transfert facultatif, à la reprise :** lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
