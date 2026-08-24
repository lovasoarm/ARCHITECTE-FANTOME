---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, temps_limite]
anti_recipe_key: preuve_partielle+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# \_recall_10.md : modules `02-CONSTRUCTION/03-TESTING` a `02-CONSTRUCTION/07-ALGORITHMS`

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

Périmètre : testing, math basics, memory & performance, data structures, algorithms. Plus 2 questions de rappel sur 01-05.

## 10 questions

1. Un test qui passe : nomme 3 façons qu'il ne teste réellement rien.
2. Pyramide de tests : unit / integration / e2e - ratio cible et pourquoi.
3. Big-O : différence pratique entre O(n) et O(n log n) sur 10 millions d'entrées ?
4. Complexité de recherche dans un BST équilibré vs un array trié ? Cas où l'array gagne quand même ?
5. Fuite mémoire vs high water mark : définis les deux et donne un exemple JS de chaque.
6. `Map` vs `Object` comme dictionnaire : 3 raisons de choisir `Map`.
7. Tri stable vs tri instable : donne un cas métier où la stabilité compte.
8. Hash map en O(1) _amorti_ : pourquoi "amorti" et pas "toujours" ?
9. **Rappel 01-05 :** ordre exact `sync` → microtask → macrotask.
10. **Rappel 01-05 :** différence entre erreur attendue et erreur inattendue.

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
