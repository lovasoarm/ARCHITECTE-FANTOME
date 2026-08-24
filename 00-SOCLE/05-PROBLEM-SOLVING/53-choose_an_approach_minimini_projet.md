---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Il y a toujours plusieurs chemins : modale vs page dédiée, données statiques vs CMS. Choisir consciemment, c'est pouvoir justifier en entretien.

## OBJECTIF

Ta première décision d'architecture est documentée.

## APPLICATION

- Pour la fiche projet, liste deux approches (modale par-dessus l'accueil / route `/projects/[slug]`).
- Écris pour chacune 2 avantages et 2 inconvénients réels (SEO, partage de lien, complexité).
- Tranche en une phrase et note la décision dans `docs/adr-fiche-projet.md`.

## Critère de réussite

- [ ] Pour la fiche projet, liste deux approches (modale par-dessus l'accueil / route `/projects/[slug]`).
- [ ] Écris pour chacune 2 avantages et 2 inconvénients réels (SEO, partage de lien, complexité).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel critère a réellement fait pencher ta décision, et est-il lié à l'utilisateur ou à ton confort ?

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

Dans ce scénario, tu as vérifié que : ta première décision d'architecture est documentée.

Tu as un ADR : un recruteur technique adore ça. Commit-le.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
