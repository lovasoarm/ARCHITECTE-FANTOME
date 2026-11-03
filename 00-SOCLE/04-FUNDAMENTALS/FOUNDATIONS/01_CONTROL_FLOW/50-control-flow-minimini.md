---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** prédis le chemin choisi par une condition avant de lancer le code.

# Micro-projet : accès et tentatives

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Savoir déclarer une variable avec `const` ou `let`.
- Avoir lu la leçon [`01-control-flow.md`](01-control-flow.md).

## Mission de première passe

Crée un fichier `access.js` avec deux petites parties :

1. Une variable `age` vaut `16`. Affiche `Accès autorisé` si l'âge est au moins 18, sinon `Accès refusé`.
2. Une boucle `for` affiche `Tentative 1`, `Tentative 2`, puis `Tentative 3`.
3. Une boucle `while` part de `remaining = 2`, affiche la valeur puis la diminue jusqu’à `0`.

Avant l'exécution, écris dans `preuve.md` les sorties que tu t'attends à voir. Exécute ensuite le fichier et compare.

## Critères de réussite

- [ ] Les prédictions sont écrites avant l'exécution.
- [ ] La bonne branche est choisie.
- [ ] Trois tentatives, pas deux ni quatre, sont affichées.
- [ ] La boucle `while` affiche `2`, puis `1`, et s’arrête lorsque la valeur atteint `0`.
- [ ] Je peux expliquer la condition de départ, la condition de continuation et la progression du compteur.

## Vérification

Que se passe-t-il si `attempt++` est retiré de l'en-tête de la boucle ? N'exécute pas une boucle infinie ; explique le risque à partir du code.

## Preuve à conserver

Le code, les prédictions, les sorties et une phrase sur la condition d'arrêt.

## Approfondissement différé : mission Kintana

> **Statut : différé, facultatif pour la première passe.** Cette intégration suppose que le modèle de demande et le dépôt Kintana soient disponibles. Elle ne conditionne pas la validation du contrôle de flux.

**Mission liée à « Micro-projet : accès et tentatives » :** applique une condition à une transition de statut dans un scénario Kintana simulé. Distingue clairement le cas permis, le cas refusé et la raison du refus.

**Livrable :** une règle testable et ses cas positif/négatif. **Gate de cette livraison différée (pas gate Fundamentals) :** le cas nominal et les deux refus attendus sont reproduits sans ambiguïté ; la règle métier est expliquée. Sans environnement réel, étiquette le résultat `LAB`.
