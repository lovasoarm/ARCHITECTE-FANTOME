---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Installer, configurer, lancer : un test qui ne tourne pas en une commande ne sera jamais lancé. Sur Next.js en JavaScript, la config compte autant que les assertions.

## OBJECTIF

Une commande, tous tes tests.

## APPLICATION

- Installe et configure un lanceur de tests compatible avec ton projet (Jest ou Vitest : choisis-en un et note pourquoi).
- Ajoute le script `test` dans `package.json`.
- Fais passer tes tests de `slugify` avec cette commande unique.

## Critère de réussite

- [ ] Installe et configure un lanceur de tests compatible avec ton projet (Jest ou Vitest.
- [ ] Ajoute le script `test` dans `package.json`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi la config de ton lanceur de tests diffère-t-elle de celle du build Next ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : une commande, tous tes tests.

`npm test` fonctionne : la barrière d'entrée est tombée, tu écriras des tests. Commit la config.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
