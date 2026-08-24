---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : Edge Cases

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `03-PILOTAGE/10-TEAM-CRAFT`, le module que tu viens de finir.

## Questions

1. Cite trois critères d'un bon commit.
2. Pourquoi dire "je ne sais pas" en équipe est-il un signe de force, pas de faiblesse ?
3. Quelle est LA règle non négociable d'une PR review, celle qu'on ne casse jamais ?
4. À quoi sert une revue de code, au-delà de trouver des bugs ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/10-TEAM-CRAFT/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la définition d'une race condition, les
> cas limites d'un formulaire, l'erreur off-by-one, et les pièges des
> fuseaux horaires sont le contenu que ce module va t'enseigner :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en
> fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
