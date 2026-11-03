---
stability: intemporel
acte: évaluer
cognitive_level: L4
perturbation_modes: [changement_echelle, regression]
anti_recipe_key: changement_echelle+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# 00 : Prereq check : Error Handling

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `01-CADRAGE/03-DEBUGGING`, le module que tu viens de finir.

## Questions

1. Décris ce que doit contenir une bonne stack trace pour être utile.
2. Reproduire un bug avant de le corriger : pourquoi c'est non négociable ?
3. Une hypothèse de bug doit être formulée comment (rappel du format falsifiable) ?
4. À quoi sert un breakpoint conditionnel, concrètement ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../03-DEBUGGING/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence `throw new Error("x")` vs
> `throw "x"`, l'ordre `try`/`catch`/`finally`, le comportement d'une Promise
> rejetée non gérée, et le piège du `throw` dans un callback `setTimeout`
> sont le contenu que ce module va t'enseigner : normal de ne pas encore
> les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
