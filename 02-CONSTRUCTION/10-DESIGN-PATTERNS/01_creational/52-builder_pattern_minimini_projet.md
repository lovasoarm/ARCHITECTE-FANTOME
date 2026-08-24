---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Le builder assemble pas à pas un objet complexe. Pour le portfolio : construire une requête de rangée (filtre + tri + limite) lisiblement.

## OBJECTIF

Tu as comparé deux styles sur ton propre code.

## APPLICATION

- Écris un petit builder `rowQuery().withRow("continuer").sortBy("year").limit(4).build()`.
- Utilise-le pour deux rangées de l'accueil.
- Compare la lisibilité avec ta version composée du module `02-CONSTRUCTION/09-FUNCTIONAL-JS` et tranche.

## Critère de réussite

- [ ] Écris un petit builder `rowQuery().withRow("continuer").sortBy("year").limit(4).build()`.
- [ ] Utilise-le pour deux rangées de l'accueil.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Entre composition de fonctions et builder, lequel gardes-tu pour ce projet, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as comparé deux styles sur ton propre code.

Tu peux justifier ton style d'API interne avec un exemple concret sous les yeux.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
