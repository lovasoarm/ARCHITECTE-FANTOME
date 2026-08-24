---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# \_recall_05.md : modules `00-SOCLE/04-FUNDAMENTALS` a `01-CADRAGE/04-ERROR-HANDLING`

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

Périmètre : fundamentals, problem solving, async, error handling, debugging.

## 10 questions

1. `let`, `const`, `var` : donne la vraie différence (scope + hoisting + TDZ) en 3 phrases.
2. `==` vs `===` : cite un cas concret où `==` te trompe silencieusement.
3. Décompose un problème "flou" en 4 étapes de problem-solving (avant d'écrire une ligne).
4. Dessine l'ordre : `sync` → `Promise.resolve().then` → `setTimeout(0)`.
5. `async/await` c'est du sucre sur quoi ? Que se passe-t-il si tu oublies un `await` ?
6. Différence entre une erreur _attendue_ (validation) et une erreur _inattendue_ (bug) : traitement ?
7. Un bug non déterministe apparaît en prod : quelle est **la première** action ?
8. Lis une stack trace : par où tu commences, du haut ou du bas, pourquoi ?
9. Cite 2 signaux qu'un `try/catch` masque un bug au lieu de le traiter.
10. Reproduction déterministe : donne les 3 conditions minimales pour qu'un bug soit "repro".

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
