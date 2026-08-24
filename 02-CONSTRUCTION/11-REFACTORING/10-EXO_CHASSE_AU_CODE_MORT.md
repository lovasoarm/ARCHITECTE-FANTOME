---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, constraints_injectees]
anti_recipe_key: solution_concurrente+constraints_injectees
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# EXO : chasse au code mort (15.4)

Temps de lecture ~2 min

## Contexte

Reprends le mini-projet `02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon`. Ton objectif : lister le code mort ET la duplication mesurable.

## Regle

1. Interdit de supprimer avant d'avoir prouve (grep + tests).
2. Chaque suppression doit reduire >=1 ligne sans casser un test.

## Livrables

- `DEAD_CODE.md` : liste par fichier:ligne, avec la preuve (grep, coverage).
- `DUPLICATION.md` : blocs > 5 lignes dupliques >=2 fois, avec proposition de factorisation.
- diff final avec tests verts.

## Auto-verification

```bash
node learner-verifier.js
# doit afficher : drill 2 OK (detection code mort)
```

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
