---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [transmission, fausse_piste]
anti_recipe_key: transmission+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# 00 : Prereq check : Algorithms

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/06-DATA-STRUCTURES`, le module que tu viens de finir.

## Questions

1. Dans quel cas une hash table bat un array en performance ?
2. Différence entre une stack et une queue, avec un exemple d'usage réel de chaque ?
3. Un BST équilibré : quel est le coût d'insertion, et pourquoi "équilibré" compte ?
4. Complexité d'un accès dans une `Map` vs un tableau classique ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../06-DATA-STRUCTURES/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : le Big-O de merge sort, la programmation
> dynamique, et la différence greedy vs backtracking sont le contenu que ce
> module va t'enseigner (notamment `01_sorting/`, `03_dynamic_programming/`,
> `04_greedy/`, `05_backtracking/`) : normal de ne pas encore les maîtriser.
> Ta compréhension est testée en fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
