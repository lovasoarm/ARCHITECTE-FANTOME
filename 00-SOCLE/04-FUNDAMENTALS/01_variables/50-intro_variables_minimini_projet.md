---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** donne des noms clairs aux données et affiche le résultat d'un calcul simple.

# Micro-projet : panier de deux articles

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Savoir créer un fichier `.js` et afficher une valeur avec `console.log`.
- Avoir lu [`03-intro_variables.md`](03-intro_variables.md).

## Mission de première passe

Dans `basket.js`, utilise les mots-clés adaptés au changement demandé :

1. Déclare `unitPrice` avec `const`, car le prix ne change pas dans cet exercice, et donne-lui la valeur `12000`.
2. Déclare `quantity` avec `let`, car la consigne demande de lui attribuer une nouvelle valeur ensuite ; commence à `2`.
3. Déclare `total` avec `let`, car tu vas recalculer et réaffecter ce total après le changement de quantité.
4. Calcule puis affiche le premier total.
5. Réaffecte `3` à `quantity`, recalcule `total` à partir des deux variables et affiche le nouveau résultat.

Voici la forme attendue, avec les deux affectations visibles :

```js
const unitPrice = 12000;
let quantity = 2;
let total = unitPrice * quantity;
console.log(total); // 24000

quantity = 3;
total = unitPrice * quantity;
console.log(total); // 36000
```

`const` interdit de réaffecter le nom ; `let` autorise cette réaffectation. Le calcul reste écrit à partir des noms, sans recopier les nombres dans la formule.

## Critères de réussite

- [ ] Le premier total vaut `24000`.
- [ ] Le deuxième total vaut `36000`.
- [ ] Le calcul utilise les noms des variables, pas les nombres recopiés en dur.
- [ ] `unitPrice` utilise `const` ; `quantity` et `total` utilisent `let` parce qu'ils sont réaffectés.
- [ ] Je peux expliquer à quoi sert chaque nom et pourquoi ces déclarations ne sont pas interchangeables.

## Vérification

Quelle ligne doit être modifiée pour passer de deux à trois articles ? Pourquoi le calcul du total n'a-t-il pas besoin d'être réécrit ?

## Preuve à conserver

Le code, les deux sorties et une phrase sur le rôle des variables.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-intro_variables_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, représente le prix unitaire, la quantité et le total d’une demande. Calcule le total à partir des valeurs nommées et vérifie les résultats avant/après un changement de quantité.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
