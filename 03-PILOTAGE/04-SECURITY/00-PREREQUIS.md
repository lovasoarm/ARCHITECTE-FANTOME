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

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/19-API-CRAFT`, le module que tu viens de finir.

## Questions

1. REST vs RPC : quelle est la différence culturelle entre les deux approches ?
2. Cite un verbe HTTP idempotent, et explique pourquoi il l'est.
3. Cite deux stratégies pour versionner une API.
4. Différence entre un code 401 et un code 403 ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/19-API-CRAFT/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence XSS/CSRF, pourquoi ne
> jamais rouler sa propre crypto, et ce que fait un CSP strict sont le
> contenu que ce module va t'enseigner (notamment `02-xss_injection.md`
> et `03-csrf_cors.md`) : normal de ne pas encore les maîtriser. Ta
> compréhension est testée en fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
