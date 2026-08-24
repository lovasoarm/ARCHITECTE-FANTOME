---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [defaut_cache, constraints_injectees]
anti_recipe_key: defaut_cache+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# 00 : Prereq check : Team Craft

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `03-PILOTAGE/05-OBSERVABILITY`, le module que tu viens de finir.

## Questions

1. Différence entre logs, métriques et traces ?
2. Que fait un correlation ID, et pourquoi c'est indispensable en prod distribuée ?
3. Différence entre SLI et SLO ?
4. Cite un signal d'observabilité qui te dit qu'un service dégrade avant qu'il ne tombe.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/05-OBSERVABILITY/`, ou à sa synthèse en fin de module.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : les critères d'un bon commit, pourquoi
> dire "je ne sais pas" est une force plutôt qu'une faiblesse, et la règle
> non négociable d'une PR review sont le contenu que ce module va
> t'enseigner (notamment `02-code_review.md`) : normal de ne pas encore
> les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
