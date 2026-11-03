---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_inversee]
anti_recipe_key: constraints_injectees+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# 00 : Prereq check : Functional JS

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/07-ALGORITHMS`, le module que tu viens de finir.

## Questions

1. Quel est le Big-O de merge sort ?
2. La programmation dynamique (DP), en une phrase ?
3. Greedy vs backtracking : comment choisir entre les deux face à un problème ?
4. Différence entre O(n) et O(log n), en une phrase ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../07-ALGORITHMS/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la définition d'une fonction pure, les
> effets de bord, et le curry sont le contenu que ce module va t'enseigner
> (notamment `02-pure_functions.md` et `05-currying.md`) : normal de ne pas
> encore les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
