---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** un binding relie un nom à une valeur ; une déclaration, une affectation et une lecture sont trois actions différentes.

# Micro-projet : identifier et mettre à jour un statut

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Avoir lu [`04-a_binding.md`](04-a_binding.md).
- Savoir déclarer une variable avec `const` ou `let`.

## Mission de première passe

Dans `status.js` :

1. Déclare `invoiceNumber` avec `const` et la valeur `INV-01`.
2. Déclare `status` avec `let` et la valeur `draft`.
3. Lis et affiche les deux variables.
4. Réaffecte `status` à `sent`, puis affiche de nouveau sa valeur.
5. Annote dans le fichier quelle ligne déclare, quelle ligne affecte et quelles lignes lisent les valeurs.

```js
const invoiceNumber = "INV-01";
let status = "draft";

console.log(invoiceNumber);
console.log(status);

status = "sent";
console.log(status);
```

## Critères de réussite

- [ ] L'identifiant affiché est `INV-01`.
- [ ] Le statut affiché passe de `draft` à `sent`.
- [ ] Je peux distinguer déclaration, affectation et lecture.
- [ ] Aucun tableau, objet, condition, boucle ou fonction n'est nécessaire pour réaliser cette mission.

## Vérification

Quelle instruction modifie la valeur associée au binding `status` ? Quelle instruction ne fait que la lire ?

## Preuve à conserver

Le fichier, les trois sorties et les annotations des opérations.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-a_binding_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, fais évoluer le statut d’une demande en affectant une nouvelle valeur au bon binding. Montre la différence entre conserver l’ancienne valeur dans une variable et lire la valeur courante après réaffectation.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
