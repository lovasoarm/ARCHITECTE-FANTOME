---
stability: stable
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** `const` protège un nom contre la réaffectation ; `let` autorise la réaffectation ; `var` reste surtout utile à connaître pour lire du code ancien.

# var / let / const : choisir une déclaration

Temps de lecture indicatif : 5 min.

## 1. `const` : choix par défaut lorsque le nom ne sera pas réaffecté

```js
const country = "Madagascar";
console.log(country); // Madagascar
```

Cette variable ne doit pas être réaffectée. Une tentative comme `country = "France"` provoque une erreur.

## 2. `let` : lorsque le nom doit recevoir une nouvelle valeur

```js
let attempts = 0;
attempts = 1;
attempts = 2;
console.log(attempts); // 2
```

Utilise `let` lorsqu'une nouvelle valeur doit remplacer la précédente, par exemple un compteur ou un état qui évolue.

## 3. `var` : surtout pour comprendre le code existant

```js
var legacyLabel = "Ancien format";
legacyLabel = "Format maintenu";
console.log(legacyLabel); // Format maintenu
```

`var` est toujours valide en JavaScript, mais ses règles de portée sont plus anciennes et plus surprenantes. En code neuf, privilégie `const`, puis `let` lorsque la réaffectation est nécessaire.

## 4. La portée : terme à connaître, détails juste après

La **portée** (scope) est la zone dans laquelle un nom est accessible. `var` a une portée de fonction ; `let` et `const` ont une portée de bloc. Tu n'as pas besoin de mémoriser tous les cas tout de suite : les blocs `if` et les boucles seront étudiés dans le module Contrôle de flux, puis les portées seront approfondies dans le module Scope.

## Repère visuel utile : réaffectation

<!-- AF-DIAGRAM:variables-declarations -->

```text
const country = "Madagascar"
      |
      +-- nom non réaffectable

let attempts = 0
    |
    +-- peut recevoir 1, puis 2

var legacyLabel = "ancien"
    |
    +-- valide, surtout à reconnaître dans le code ancien
```

## Pourquoi ce mécanisme compte

Le choix du mot-clé rend visible l'intention : garder la même association ou permettre son évolution. Cela réduit les réaffectations accidentelles.

## Repères de décision

- **Pourquoi :** `const` et `let` rendent explicite si un nom doit pouvoir recevoir une nouvelle valeur.
- **Quand l'utiliser / quand l'éviter :** Choisis `const` par défaut. Choisis `let` lorsqu'une réaffectation est prévue. N'utilise pas `var` dans du code neuf sauf raison de compatibilité clairement expliquée.
- **Limites :** `const` ne rend pas immuable le contenu d'un tableau ou d'un objet. Cette distinction sera reprise après l'introduction des structures de données. Les différences de portée sont plus précises que cette règle de choix.

## Mécanisme : la version sans magie

`const` crée un binding qui ne peut pas être réaffecté. `let` crée un binding réaffectable. `var` est également réaffectable, mais sa portée est celle de la fonction (ou globale hors fonction), contrairement à la portée de bloc de `let` et `const`.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), l'identifiant d'une demande ne change généralement pas après sa création (`const`), tandis qu'un compteur de tentatives peut évoluer (`let`). Le code ancien peut encore contenir `var` ; savoir le reconnaître facilite la maintenance.

**À observer :** distingue les variables dont la valeur de binding ne change pas de celles qui sont réaffectées. Ne confonds pas réaffectation et modification du contenu d'un objet.

## Mission utile : choisir le bon mot-clé

**Mission liée à « var / let / const : choisir une déclaration » :** déclare `requestId` avec `const`, `attempts` avec `let` et une variable `legacyLabel` avec `var`. Réaffecte `attempts`, puis explique pourquoi tu ne réaffectes pas `requestId`.

**Livrable :** code et trois annotations justifiant le choix de chaque mot-clé.

**Critères d'acceptation :** le programme s'exécute ; seule la variable prévue change de valeur ; l'explication ne prétend pas que `const` gèle automatiquement les objets.

**Transfert obligatoire :** invente une donnée qui doit rester stable et une autre qui évolue. Choisis leur déclaration et justifie-la.

> **Approfondissement différé :** les exemples de bloc (`if`) et de boucle avec `var`/`let` se font après le module Contrôle de flux. Le piège des callbacks se fait après les fonctions et les closures. Ils ne sont pas requis dans cette première pratique.

## Approfondissement différé : portée détaillée et binding par itération

> **Statut : différé, facultatif pour la première passe.** Reviens à cette section après Contrôle de flux, Data Basics, Function essentials et Scope. Elle n'est pas nécessaire pour réussir le mini-projet de cette leçon.

`let` reste parfaitement valable lorsqu'un nom doit être réaffecté. Une différence supplémentaire apparaît dans un bloc : `var` a une portée de fonction, tandis que `let` et `const` ont une portée de bloc. Les accolades d'un littéral d'objet servent à construire l'objet ; elles ne servent pas à ouvrir un nouveau bloc lexical.

```js
if (true) {
  var legacyStatus = "visible après le bloc";
  let localStatus = "visible dans le bloc";
}

console.log(legacyStatus); // "visible après le bloc"
// console.log(localStatus); // ReferenceError : hors du bloc
```

Après avoir étudié les fonctions et les closures, tu peux examiner le binding par itération : dans l'en-tête d'une boucle, `let` crée un binding propre à chaque itération. Ce détail explique certains comportements de callbacks différés.

```js
for (var index = 0; index < 3; index++) {
  setTimeout(() => console.log(index), 0);
}
// Dans l'environnement usuel, les trois callbacks affichent 3.

for (let index = 0; index < 3; index++) {
  setTimeout(() => console.log(index), 0);
}
// Chaque callback conserve le binding de son itération : 0, puis 1, puis 2.
```

Un worker de notification peut rencontrer le même type de piège lorsqu'une tâche asynchrone capture un identifiant ou un destinataire. Cet exemple Kintana est une application ultérieure, après les fonctions et les callbacks ; il ne fait pas partie de la première passe Variables.
