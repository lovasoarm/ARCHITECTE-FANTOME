---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Modéliser avant de coder

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## Support de l’exercice

Utilise le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Le cas est indépendant de ton projet personnel ; travaille dans un fichier local, sur papier ou dans `scratch/problem-solving/`. Aucun dépôt Git ni site réel n’est requis.

## TYPE

Exercice de modélisation

## Niveau

[OK] Intermédiaire

## CONTEXTE

Modéliser, c'est décider de la forme des données avant de construire une interface. Dans le cas fictif de Noa, `Project` décrit les projets et `PersonalInfo` décrit les informations de présentation.

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

Tu pourras réutiliser ce modèle lorsque TypeScript sera étudié. Conserve ce document dans ton dossier local de preuves ; aucun code TypeScript n'est demandé ici. Dans la leçon associée, l'EXO 3 se termine par une table de transitions ou un schéma en première passe. La traduction en type discriminant est un prolongement facultatif, à reprendre seulement après `02-CONSTRUCTION/12-TYPESCRIPT` ; elle ne conditionne pas la sortie de Problem Solving.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Pont Kintana différé : modéliser une demande

**Statut : différé et non bloquant pour le Socle.** Après avoir étudié les modèles métier et la persistance, tu pourras représenter les états d'une demande Kintana, ses identifiants et ses invariants. Pour le challenge actuel, utilise le modèle `Project` et `PersonalInfo` du cas fictif de Noa. Ne construis pas de schéma de base de données Kintana à ce stade.
