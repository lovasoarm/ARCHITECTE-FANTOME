---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : API Craft

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/18-WEB-CONCEPTS`, le module que tu viens de finir.

## Questions

1. Différence entre CORS et CSP ?
2. Qu'est-ce qui bloque le rendu d'une page (render-blocking) ?
3. Cite deux directives de `Cache-Control` et leur effet.
4. Authentification vs autorisation : où se décide chacune dans une requête HTTP ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../18-WEB-CONCEPTS/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence culturelle REST vs RPC,
> l'idempotence, et les stratégies de versioning d'API sont le contenu que
> ce module va t'enseigner (notamment `03-rest_crud_complete.md`) :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en
> fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
