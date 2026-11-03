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

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `00-SOCLE/04-FUNDAMENTALS`, le module que tu viens de finir :
> pas sur ce que tu vas apprendre ici.

## Questions

1. Différence `let` / `const` / `var` ?
2. Que renvoie `typeof null`, et pourquoi c'est un piège historique du langage ?
3. Une closure, en une phrase, avec un exemple concret d'usage.
4. Différence entre `==` et `===` : donne un cas où `==` te trompe silencieusement.

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../04-FUNDAMENTALS/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : les 4 étapes de la méthode Polya, le
> découpage avant codage, et la notion de cas limite sont le contenu que
> ce module va t'enseigner : normal de ne pas encore les connaître. Ta
> compréhension de ces notions est testée à la fin, dans
> `90-grimoire.md`, pas ici à l'entrée.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
