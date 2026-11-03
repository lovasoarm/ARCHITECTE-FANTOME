---

stability: "intemporel"
acte: évaluer
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/12-TYPESCRIPT/README.md"
source_scope: "Référence interne du module TypeScript pour les prérequis ; les versions et comportements périssables restent à vérifier auprès des sources officielles."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---
> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# 00 : Prereq check : TypeScript

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce n’est pas un test noté : elles servent à repérer les bases JavaScript déjà solides
> et celles que tu peux revoir avant ou pendant les premières leçons TypeScript. Le refactoring aide à maintenir du code, mais n’est pas un prérequis direct pour comprendre les types.

## Questions

1. Quelle différence fais-tu entre une valeur primitive (`string`, `number`, `boolean`) et un objet ?
2. Écris une fonction JavaScript qui reçoit un nombre et retourne son double. Où se trouve la valeur retournée ?
3. Comment lire une propriété d’objet qui peut être absente sans provoquer une erreur ?
4. À quoi servent `export` et `import` dans des modules JavaScript ?

**Repères à revoir :** [variables et références](../../00-SOCLE/04-FUNDAMENTALS/01_variables/07-reference_chaos.md), [fonctions](../../00-SOCLE/04-FUNDAMENTALS/03_functions/02-function_basics.md), [types primitifs](../../00-SOCLE/04-FUNDAMENTALS/04_types/02-primitives.md) et [modules](../../00-SOCLE/04-FUNDAMENTALS/06_modules/03-module_patterns.md).

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../11-REFACTORING/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence `interface`/`type`, ce que
> `unknown` fait que `any` ne fait pas, et les generics sont le contenu que
> ce module va t'enseigner (notamment `02-types_and_interfaces.md`) :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en
> fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
