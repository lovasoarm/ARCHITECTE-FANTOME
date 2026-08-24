---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Valider une saisie utilisateur côté client, c'est du confort ; mal la valider, c'est une fausse sécurité. Le formulaire de contact du portfolio en a besoin.

## APPLICATION

- Dans le formulaire de contact, écris une validation d'email par regex volontairement trop stricte, puis teste-la avec une adresse valide qu'elle rejette.
- Remplace-la par une validation permissive + le type `email` natif du champ.
- Note en commentaire pourquoi une regex d'email « parfaite » est une mauvaise idée.

## Critère de réussite

- [ ] Remplace-la par une validation permissive + le type `email` natif du champ.
- [ ] Note en commentaire pourquoi une regex d'email « parfaite » est une mauvaise idée.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Contre quoi une validation regex côté client ne protège-t-elle absolument pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton formulaire valide sans frustrer.

Tu as évité le classique « mon adresse est refusée » qui fait fuir un recruteur. Commit le formulaire.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
