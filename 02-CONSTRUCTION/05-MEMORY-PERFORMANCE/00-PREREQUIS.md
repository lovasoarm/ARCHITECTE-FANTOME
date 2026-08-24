---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [constraints_injectees, transmission]
anti_recipe_key: constraints_injectees+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 00 : Prereq check : Memory & Performance

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/04-MATH-BASICS`, le module que tu viens de finir.

## Questions

1. Log base 2 de 1024 ?
2. Modulo, à quoi ça sert concrètement en programmation ?
3. Complexité : différence entre O(n) et O(log n) sur un million d'éléments ?
4. Pourquoi `0.1 + 0.2 !== 0.3` en JavaScript ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/04-MATH-BASICS/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : ce que fait un GC, la différence entre
> fuite et pic mémoire, et ce que révèle un heap snapshot sont le contenu
> que ce module va t'enseigner (notamment `01_gc/`) : normal de ne pas
> encore les maîtriser. La copie par valeur vs par référence, elle, a déjà
> été vue en `00-SOCLE/04-FUNDAMENTALS` : si ce point-là est flou, retourne-y d'abord.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
