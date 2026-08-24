---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [regression, solution_concurrente]
anti_recipe_key: regression+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : Runtime Environment

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/12-TYPESCRIPT`, le module que tu viens de finir.

## Questions

1. Différence `interface` / `type` ?
2. Que fait `unknown` que `any` ne fait pas ?
3. Les generics, à quoi ça sert concrètement ?
4. Cite un piège classique quand on migre du JS vers TS trop vite.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/12-TYPESCRIPT/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence event loop navigateur vs
> Node, ce que fait le require cache, et la différence variable d'env
> runtime vs variable de build sont le contenu que ce module va
> t'enseigner (notamment `02-node_vs_browser.md`) : normal de ne pas
> encore les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
