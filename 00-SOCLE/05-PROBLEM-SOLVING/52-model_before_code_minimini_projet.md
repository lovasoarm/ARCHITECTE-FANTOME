---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Modéliser, c'est décider de la forme des données avant du JSX. Ton type `Project` est le modèle central de tout le site.

## OBJECTIF

Ton modèle de données est validé contre la maquette.

## APPLICATION

- Sur papier ou en commentaire, décris l'entité `Project` : chaque champ, son type, s'il est optionnel, et quel écran l'utilise.
- Fais la même chose pour `PersonalInfo`.
- Confronte le modèle à la maquette : y a-t-il un champ affiché que ton modèle ne prévoit pas ?

## Critère de réussite

- [ ] Sur papier ou en commentaire, décris l'entité `Project`.
- [ ] Fais la même chose pour `PersonalInfo`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel champ as-tu failli oublier, et à quel écran l'aurais-tu découvert trop tard ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton modèle de données est validé contre la maquette.

Tu vas pouvoir écrire les types TypeScript sans hésiter au module `02-CONSTRUCTION/12-TYPESCRIPT`. Garde ce document à côté du code.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
