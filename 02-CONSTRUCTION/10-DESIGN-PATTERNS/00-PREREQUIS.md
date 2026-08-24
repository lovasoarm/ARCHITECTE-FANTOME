---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L4
perturbation_modes: [defaut_cache, transmission]
anti_recipe_key: defaut_cache+transmission
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Design Patterns

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/09-FUNCTIONAL-JS`, le module que tu viens de finir.

## Questions

1. Fonction pure : définition, avec un exemple qui n'en est PAS une.
2. Cite trois effets de bord classiques qu'une fonction pure ne doit jamais avoir.
3. Le curry, en une phrase.
4. Différence entre curry et application partielle ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/09-FUNCTIONAL-JS/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : ce qu'un pattern résout vraiment, la
> différence Strategy/State, pourquoi éviter Singleton, et la différence
> Factory/Builder sont le contenu que ce module va t'enseigner : normal de
> ne pas encore les maîtriser. Ta compréhension est testée en fin de
> module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
