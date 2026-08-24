---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, changement_echelle]
anti_recipe_key: decision_organisationnelle+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Avant de typer avec TypeScript, il faut savoir ce que JavaScript manipule vraiment : string, number, boolean, null, undefined. Le champ `rating` de tes projets est un `number` borné de 1 à 5, et `featured` un vrai `boolean` : pas un hasard.

## APPLICATION

- Liste chaque champ d'un projet du cahier des charges et note à côté son type primitif réel.
- Repère les champs qui peuvent légitimement être absents (`github`, `demo`).
- Écris ces observations en commentaire en tête de `data/projects.js`.

## Critère de réussite

- [ ] Liste chaque champ d'un projet du cahier des charges et note à côté son type primitif réel.
- [ ] Repère les champs qui peuvent légitimement être absents (`github`, `demo`).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle différence de sens fais-tu entre `null` et `undefined` pour le champ `github` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton modèle de données est cartographié.

Tu as la carte exacte de ton type `Project` avant même de l'écrire. C'est ce qui rendra le module TypeScript facile.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
