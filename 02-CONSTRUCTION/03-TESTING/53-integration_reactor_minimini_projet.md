---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, changement_echelle]
anti_recipe_key: transmission+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un test d'intégration monte plusieurs pièces : données → filtre → composant rendu. C'est ce qui prouve qu'une rangée affiche les bons projets.

## OBJECTIF

Ta rangée est testée de bout en bout.

## APPLICATION

- Rends la rangée « Continuer à regarder » dans un test avec un jeu de données maîtrisé.
- Assure-toi que seuls les projets attendus apparaissent, par leur titre visible.
- Ajoute un cas limite : aucune donnée.

## Critère de réussite

- [ ] Rends la rangée « Continuer à regarder » dans un test avec un jeu de données maîtrisé.
- [ ] Assure-toi que seuls les projets attendus apparaissent, par leur titre visible.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que couvre ce test que trois tests unitaires séparés ne couvraient pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta rangée est testée de bout en bout.

La pièce la plus visible du portfolio est vérifiée automatiquement. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
