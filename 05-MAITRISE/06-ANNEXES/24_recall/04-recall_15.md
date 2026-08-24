---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_inversee]
anti_recipe_key: fausse_piste+decision_inversee
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# \_recall_15.md : modules `02-CONSTRUCTION/09-FUNCTIONAL-JS` a `02-CONSTRUCTION/13-RUNTIME-ENV`

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Temps de lecture ~5 min

> Rappel espacé. Réponds **sans revoir les fichiers**. Note ton score.
> Refais ce fichier **une semaine plus tard**. C'est là que la mémoire tient.

Périmètre : functional JS, design patterns, refactoring (SOLID), TypeScript, runtime env. Plus 2 questions de rappel sur 06-10.

## 10 questions

1. Fonction pure : les 2 conditions strictes. Donne un contre-exemple.
2. `map` / `filter` / `reduce` : réécris un `for` classique en pipeline en 1 ligne (mentalement).
3. Cite 3 design patterns utiles au quotidien en JS et _quand_ les sortir (pas leur définition).
4. SOLID - le **S** : quel signal déclencheur t'indique qu'une classe le viole ?
5. SOLID - le **D** : pourquoi la logique métier ne doit pas faire `new PostgresClient()` directement ?
6. TypeScript : différence entre `unknown` et `any` et pourquoi `any` est un anti-pattern.
7. `type` vs `interface` en TS : quand tu prends l'un, quand tu prends l'autre.
8. Node.js vs navigateur : cite 3 différences runtime qui te pètent à la gueule si tu les ignores.
9. **Rappel 06-10 :** Big-O - coût pratique de O(n²) sur 100k éléments.
10. **Rappel 06-10 :** un test qui passe - comment prouver qu'il teste vraiment ?

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
