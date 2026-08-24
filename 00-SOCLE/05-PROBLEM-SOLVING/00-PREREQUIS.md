---
stability: intemporel
acte: évaluer
cognitive_level: L4
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Problem Solving

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `00-SOCLE/04-FUNDAMENTALS`, le module que tu viens de finir :
> pas sur ce que tu vas apprendre ici.

## Questions

1. Différence `let` / `const` / `var` ?
2. Que renvoie `typeof null`, et pourquoi c'est un piège historique du langage ?
3. Une closure, en une phrase, avec un exemple concret d'usage.
4. Différence entre `==` et `===` : donne un cas où `==` te trompe silencieusement.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `00-SOCLE/04-FUNDAMENTALS/`, ou à sa synthèse `_recall_05.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : les 4 étapes de la méthode Polya, le
> découpage avant codage, et la notion de cas limite sont le contenu que
> ce module va t'enseigner : normal de ne pas encore les connaître. Ta
> compréhension de ces notions est testée à la fin, dans
> `90-grimoire.md`, pas ici à l'entrée.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
