---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un test unitaire cible une fonction pure. `slugify`, `formatYear`, `getProjectsByRow` sont les premières cibles évidentes du portfolio.

## OBJECTIF

Tes utilitaires sont sous filet.

## APPLICATION

- Écris trois tests sur `slugify` : titre simple, titre avec majuscules et tiret (`Safe-driving`), titre avec accents.
- Vérifie qu'un test échoue si tu casses volontairement la fonction.
- Remets la fonction en état.

## Critère de réussite

- [ ] Écris trois tests sur `slugify`.
- [ ] Vérifie qu'un test échoue si tu casses volontairement la fonction.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui rend une fonction facile à tester unitairement ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes utilitaires sont sous filet.

Les briques de formatage du portfolio sont protégées contre les régressions. Commit les tests.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
