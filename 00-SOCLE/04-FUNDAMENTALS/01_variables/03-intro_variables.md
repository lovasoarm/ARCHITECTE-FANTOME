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

> **Repère :** une variable associe un nom à une valeur ; le nom permet de réutiliser cette valeur dans le programme.

# Introduction aux variables : nommer une valeur

Temps de lecture indicatif : 5 min.

## 1. Une valeur peut recevoir un nom

```js
const learnerName = "Mina";
const score = 12;

console.log(learnerName); // Mina
console.log(score); // 12
```

`learnerName` et `score` sont des noms de variables. `"Mina"` et `12` sont les valeurs associées. Le nom doit aider une personne à comprendre ce que représente la donnée.

## 2. Lire et réutiliser une valeur

```js
const unitPrice = 12000;
const quantity = 2;
const total = unitPrice * quantity;

console.log(total); // 24000
```

Le programme réutilise les noms au lieu de recopier les nombres dans chaque calcul. Le symbole `*` signifie « multiplié par ». Si le prix change, le calcul se met à jour à partir de la nouvelle valeur.

## 3. Une valeur peut être réaffectée

```js
let attempts = 0;
console.log(attempts); // 0

attempts = 1;
console.log(attempts); // 1
```

`let` autorise la réaffectation. `const` sert lorsqu'on ne prévoit pas de réaffecter le nom. La différence entre `let`, `const` et `var` est détaillée dans la leçon suivante.

## Repère visuel utile : nom et valeur

<!-- AF-DIAGRAM:variables-intro -->

```text
const learnerName = "Mina"
      |               |
      nom             valeur

const total = unitPrice * quantity
      |
      résultat réutilisable
```

## Pourquoi ce mécanisme compte

Les variables rendent les valeurs identifiables, réutilisables et modifiables lorsque le besoin l'exige. Elles évitent les nombres ou textes répétés sans explication.

## Repères de décision

- **Pourquoi :** Un nom clair permet de comprendre à quoi sert une valeur et où elle est réutilisée.
- **Quand l'utiliser / quand l'éviter :** Donne un nom à une donnée réutilisée ou importante pour la compréhension. Évite les noms vagues comme `x1`, `data2` ou `thing` lorsqu'un nom métier est possible.
- **Limites :** Un nom clair ne garantit pas que la valeur soit correcte. Les types, conditions, objets et références sont des notions séparées qui seront étudiées ensuite.

## Mécanisme : la version sans magie

Une déclaration introduit un binding (association entre un nom et une valeur). Une lecture utilise ce nom ; une affectation peut remplacer la valeur associée lorsque le mot-clé l'autorise. JavaScript évalue ensuite les expressions qui utilisent ces valeurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), le prix, la quantité et le statut d'une demande sont des données différentes. Leur donner des noms explicites aide à lire une règle métier sans devoir deviner le rôle de chaque valeur.

**À observer :** identifie le nom, la valeur et la ligne qui affiche le résultat. Une exécution locale suffit pour cette première preuve ; étiquette-la `LAB`.

## Mission utile : nommer un calcul

**Mission liée à « Introduction aux variables : nommer une valeur » :** écris un programme avec `unitPrice`, `quantity` et `total`. Affiche le total, puis modifie le prix et prédis le nouveau résultat.

**Livrable :** code, résultat initial, résultat modifié et une phrase sur le rôle des trois noms.

**Critères d'acceptation :** chaque variable a un nom compréhensible ; la valeur affichée correspond au calcul ; la prédiction est écrite avant la nouvelle exécution.

**Transfert obligatoire :** remplace le prix et la quantité par deux données d'un autre contexte, par exemple le nombre de billets et leur tarif. Garde le même mécanisme.
