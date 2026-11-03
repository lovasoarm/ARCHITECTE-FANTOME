---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** choisis `const` lorsque le nom garde la même valeur associée et `let` lorsqu'il doit être réaffecté.

# Micro-projet : identifiant et compteur

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Avoir compris les variables et les bindings.
- Avoir lu [`05-b_var_let_const.md`](05-b_var_let_const.md).

## Mission de première passe

Crée `request.js` :

1. Déclare `requestId` avec `const` et donne-lui la valeur `REQ-101`.
2. Déclare `attempts` avec `let` et donne-lui la valeur `0`.
3. Réaffecte `attempts` à `1`, puis à `2`.
4. Affiche `requestId` et `attempts`.
5. Déclare `legacyLabel` avec `var` pour apprendre à reconnaître l'ancien mot-clé, sans l'utiliser pour les nouvelles données.

## Critères de réussite

- [ ] L'identifiant affiché reste `REQ-101`.
- [ ] Le compteur affiché vaut `2`.
- [ ] Je peux expliquer pourquoi `const` et `let` ne sont pas interchangeables dans cet exemple.
- [ ] Je sais que `var` reste valide, mais qu'on préfère généralement `const`/`let` en code neuf.

## Vérification

Pourquoi `attempts` doit-il être déclaré avec `let` dans cet exercice ?

## Preuve à conserver

Le fichier, la sortie et une phrase expliquant chaque choix.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-b_var_let_const_minimini_projet » :** Dans `domain/requests/`, distingue les identifiants stables (`const`) des compteurs ou états réaffectés (`let`). Teste un parcours qui met à jour le statut sans réaffecter une constante.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
