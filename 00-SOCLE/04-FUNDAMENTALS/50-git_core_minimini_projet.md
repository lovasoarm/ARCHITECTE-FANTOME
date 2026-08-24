---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_echelle, temps_limite]
anti_recipe_key: changement_echelle+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

Git est le filet du portfolio : chaque brique livrée doit être un commit lisible, et chaque déploiement Vercel part d'une branche propre.

## OBJECTIF

Ton portfolio a un historique propre.

## APPLICATION

- Initialise le dépôt du portfolio s'il ne l'est pas, avec un `.gitignore` Next.js correct (`.next`, `node_modules`, `.env*`).
- Crée une branche `feat/catalogue`, commit ton travail des fichiers précédents en messages courts et impératifs.
- Fusionne dans `main` et pousse.
- Vérifie qu'aucun fichier `.env` n'est suivi.

## Critère de réussite

- [ ] Initialise le dépôt du portfolio s'il ne l'est pas, avec un `.gitignore` Next.js correct (`.next`, `node_modules`, `.env*`).
- [ ] Crée une branche `feat/catalogue`, commit ton travail des fichiers précédents en messages courts et impératifs.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui rend un message de commit utile six mois plus tard ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton portfolio a un historique propre.

Le projet est versionné, déployable et récupérable en cas d'erreur. Pousse la branche : c'est la première pierre publique.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
