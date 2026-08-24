---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, constraints_injectees]
anti_recipe_key: regression+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Currying : transformer `f(a, b)` en `f(a)(b)`. Utile pour préconfigurer un filtre de `category` réutilisé dans plusieurs rangées.

## OBJECTIF

Ton filtre générique est en place.

## APPLICATION

- Écris `filterBy(champ)(valeur)(projects)`.
- Utilise-la pour créer `filterByCategory` et `filterByStatus` sans dupliquer la logique.
- Emploie-les sur la page d'accueil.

## Critère de réussite

- [ ] Écris `filterBy(champ)(valeur)(projects)`.
- [ ] Utilise-la pour créer `filterByCategory` et `filterByStatus` sans dupliquer la logique.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

En quoi le currying diffère-t-il d'une fonction à paramètres par défaut ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton filtre générique est en place.

Un seul filtre couvre tous les champs du catalogue. Commit.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
