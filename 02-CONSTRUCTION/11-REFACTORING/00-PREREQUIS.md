---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [preuve_partielle, solution_concurrente]
anti_recipe_key: preuve_partielle+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# 00 : Prereq check : Refactoring

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/10-DESIGN-PATTERNS`, le module que tu viens de finir.

## Questions

1. Un pattern résout un problème de quoi, fondamentalement ?
2. Différence entre le pattern Strategy et le pattern State ?
3. Pourquoi le pattern Singleton est-il généralement à éviter ?
4. Différence entre Factory et Builder ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../10-DESIGN-PATTERNS/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : reconnaître un code smell, ce que "refacto
> sans tests" implique comme risque, et la boy scout rule sont le contenu
> que ce module va t'enseigner (notamment `05-code_smells.md`) : normal de
> ne pas encore les maîtriser. Ta compréhension est testée en fin de
> module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
