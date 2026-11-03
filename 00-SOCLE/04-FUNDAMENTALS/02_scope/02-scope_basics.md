---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, fausse_piste]
anti_recipe_key: solution_concurrente+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Scope : où vit ta variable ?

Temps de lecture ~7 min

> Chaque variable a une zone de vie. En dehors de cette zone, elle n'existe plus. Elle est morte. ReferenceError (erreur de référence : variable inexistante). Game over.

---

## 1) GLOBAL SCOPE : LA VARIABLE QUI TRAÎNE PARTOUT

Elle est déclarée dehors, elle vit partout. Toutes les fonctions peuvent la voir.

```js
let hero = "Naruto";

function adventure() {
  console.log(hero); // "Naruto" : accessible depuis la fonction
}

adventure();
console.log(hero); // "Naruto" : accessible dehors aussi
```

> Trop de globales = n'importe qui peut modifier n'importe quoi. C'est le chaos de la colocation où tout le monde touche à tout.

---

## 2) LOCAL SCOPE : CE QUI SE PASSE DANS LA FONCTION RESTE DANS LA FONCTION

Une variable déclarée dans une fonction meurt quand la fonction se termine.

```js
function adventure() {
  let weapon = "Sword"; // vit ici et nulle part ailleurs
  console.log(weapon); // OK
}

adventure();
console.log(weapon); // ReferenceError : weapon est morte
```

---

## 3) BLOCK SCOPE : `let` et `const` Respectent les `{}`

Un bloc c'est tout ce qui est entre `{}` : `if`, `for`, `while`.

```js
if (true) {
  let potion = "Health"; // vit dans ce bloc uniquement
  console.log(potion); // OK
}

console.log(potion); // ReferenceError : le bloc est terminé
```

**Mais `var` s'en fout des blocs :**

```js
if (true) {
  var ghost = "Je fuis partout";
}

console.log(ghost); // "Je fuis partout" : var ignore le bloc
```

| Mot-clé | Scope                            | Safe ? |
| ------- | -------------------------------- | ------ |
| `var`   | function scope : ignore les `{}` | nope   |
| `let`   | block scope : respecte les `{}`  | ok     |
| `const` | block scope : respecte les `{}`  | ok     |

> Règle d'or : `var` n'existe pas dans ton vocabulaire. `let` et `const` seulement.

---

## 4) POURQUOI C'EST CRUCIAL

Sans scope control :

- Une variable globale se fait écraser sans prévenir
- Un bug dans une boucle contamine tout le reste
- Les closures (fonctions qui capturent leur environnement lexical) et l'async (programmation asynchrone : exécution de code différée sans bloquer le thread principal) deviennent un enfer

Avec scope control : chaque variable vit exactement là où elle doit vivre. Pas plus loin.

---

## Comparaison multi-langages

| Concept           | JavaScript                | Python                     | Dart                      | PHP                    |
| ----------------- | ------------------------- | -------------------------- | ------------------------- | ---------------------- |
| Variable globale  | `let x` hors fonction     | `x = 42` hors fonction     | `var x` hors classe       | `$x` hors fonction     |
| Variable locale   | `let x` dans une fonction | `x = 42` dans une fonction | `var x` dans une fonction | `$x` dans une fonction |
| Block scope       | `let` / `const`           | pas natif                  | oui par défaut            | oui avec `{}`          |
| Mot-clé à éviter  | `var`                     | .                          | .                         | .                      |
| Constante         | `const`                   | .                          | `final` / `const`         | `define()` / `const`   |
| Erreur hors scope | `ReferenceError`          | `NameError`                | erreur de compilation     | `Undefined variable`   |
| Niveau de rigueur | flexible                  | permissif                  | strict                    | semi-strict            |

---

## MISSION : La Zone Interdite

### Instructions

1. Déclare une variable globale `hero = "Naruto"`
2. Crée une fonction `adventure()` avec une variable locale `weapon = "Sword"`
3. Dans la fonction : affiche `hero` et `weapon`
4. Hors de la fonction : essaie d'afficher `weapon` → observe l'erreur
5. Crée un `if (true)` avec `let potion = "Health"` à l'intérieur
6. Hors du bloc : essaie d'afficher `potion` → observe l'erreur

### Code de départ

```js
let hero = "Naruto";

function adventure() {
  let weapon = "Sword";
  console.log("Dans la fonction :", hero, weapon);
}

adventure();
// Ton code ici
```

### Résultat attendu

```text
Dans la fonction : Naruto Sword
ReferenceError: weapon is not defined  <-- hors fonction
ReferenceError: potion is not defined  <-- hors bloc
```

> **Scope = zone de vie de ta variable.** C'est la base de tout ce qui vient après : closures, async, architecture.

---

## RÉSUMÉ

Le scope (portée) définit où une variable est accessible. Une variable déclarée dans une fonction n'existe que dans cette fonction. Une variable déclarée dans un bloc `{}` avec `let` ou `const` n'existe que dans ce bloc.

`var` a une portée fonction, pas bloc : elle remonte à la fonction parente même si déclarée dans un `if` ou une boucle. C'est un piège classique.

Le scope global est la dernière chose à laquelle JS fait appel. Si une variable n'est pas trouvée dans le scope local, puis le scope parent, JS remonte jusqu'au global. Si elle n'est nulle part : `ReferenceError`.

---

## (attention) Ce que l'analogie "colocation" cache

L'analogie suggère un espace partagé où chacun touche à tout. En réalité, le scope JS suit des **règles lexicales strictes** : les variables sont accessibles là où elles sont **déclarées**, pas là où elles sont **appelées**. La colocation cache la notion de chaîne de portées imbriquées. Retiens le mécanisme : **résolution lexicale**, pas "on partage tout".

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-DIAGRAM:scope -->

## Repère visuel utile : Contexte sûr des handlers Kintana

```text
création de la fonction
      | capture l'environnement lexical
      v
closure(handler) -----> requestId / role
      |
      v
dispatcher appelle plus tard
      |
      +--> paramètres explicites
      +--> closure conservée
      +--> `this` dépend du call-site
```

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Scope : où vit ta variable ?** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « Scope : où vit ta variable ? » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

**Transfert facultatif, à la reprise :** lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
