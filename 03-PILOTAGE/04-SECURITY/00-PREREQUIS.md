---
stability: intemporel
acte: évaluer
cognitive_level: L4
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# 00 : Prereq check : Security

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/19-API-CRAFT`, le module que tu viens de finir.

## Questions

1. REST vs RPC : quelle est la différence culturelle entre les deux approches ?
2. Cite un verbe HTTP idempotent, et explique pourquoi il l'est.
3. Cite deux stratégies pour versionner une API.
4. Différence entre un code 401 et un code 403 ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../../02-CONSTRUCTION/19-API-CRAFT/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence XSS/CSRF, pourquoi ne
> jamais rouler sa propre crypto, et ce que fait un CSP strict sont le
> contenu que ce module va t'enseigner (notamment `02-xss_injection.md`
> et `03-csrf_cors.md`) : normal de ne pas encore les maîtriser. Ta
> compréhension est testée en fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
