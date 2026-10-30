---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, preuve_partielle]
anti_recipe_key: defaut_cache+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# HYPOTHESES_TEMPLATE.md

Temps de lecture ~2 min

Modèle obligatoire pour tout exercice de debugging. Aucune correction sans hypothèse écrite, testée, réfutée ou confirmée.

## 1. Hypothèses envisagées

Liste toutes les causes possibles au moment T. Ordonne de la plus probable à la moins probable.

- Hypothèse A : ...
- Hypothèse B : ...
- Hypothèse C : ...

## 2. Preuves d'écartement

Pour chaque hypothèse écartée, note l'observation ou le test qui la disqualifie.

- Hypothèse A écartée car : ...
- Hypothèse B écartée car : ...

## 3. Hypothèse retenue

Une seule. Formulée en une phrase falsifiable.

- Hypothèse retenue : ...

## 4. Preuve de confirmation

L'expérience minimale qui prouve que l'hypothèse est vraie. Résultat attendu vs observé.

- Expérience : ...
- Résultat attendu : ...
- Résultat observé : ...
- Verdict : confirmée / infirmée (si infirmée, retour étape 1).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

<!-- AF-P0-2026-10-30: missing_example -->

### Exemple travaillé : cas métier

Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « HYPOTHESES_TEMPLATE.md » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
