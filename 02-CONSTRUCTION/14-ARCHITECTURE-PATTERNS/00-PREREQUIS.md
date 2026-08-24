---
stability: intemporel
acte: évaluer
cognitive_level: L4
perturbation_modes: [preuve_partielle, constraints_injectees]
anti_recipe_key: preuve_partielle+constraints_injectees
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Architecture Patterns

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/13-RUNTIME-ENV`, le module que tu viens de finir.

## Questions

1. Où peut tourner ton code JS aujourd'hui (au moins 3 environnements) ?
2. Différence entre l'event loop du navigateur et celui de Node ?
3. Que fait le require cache, et pourquoi ça peut te piéger en dev ?
4. Différence entre une variable d'environnement runtime et une variable de build ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/13-RUNTIME-ENV/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : le vrai but de l'architecture, couplage
> vs cohésion, et MVC sont le contenu que ce module va t'enseigner
> (notamment `01-00-why-architecture-patterns.md` et `04-mvc_pattern.md`) :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en
> fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
