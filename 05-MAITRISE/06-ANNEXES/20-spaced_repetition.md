---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Répétition espacée : le planning qui grave

Temps de lecture ~5 min

Un concept vu une fois s'oublie en 3 jours. Vu 3 fois à intervalles croissants, il reste 6 mois.

## LE PROTOCOLE

Pour chaque nouveau concept clé :

| Quand | Quoi                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------- |
| J+0   | Tu apprends, tu codes l'exercice.                                                                 |
| J+1   | Tu ouvres le `_recall_XX.md` du module, tu réponds aux questions SANS regarder.                   |
| J+7   | Tu réexpliques le concept à voix haute, en 60 secondes, sans notes.                               |
| J+30  | Tu résous une variante de l'exercice initial dans un langage différent (voir `transferability/`). |

## QUESTIONS DE RAPPEL : MODÈLES TYPES

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

- "Que fait exactement `X` sous le capot ?"
- "Quel bug spécifique évite `Y` ?"
- "Donne un cas où `Z` est le mauvais choix."
- "Explique `X` à un dev qui ne connaît que Python."

## AUTO-DIAGNOSTIC

Si à J+7 tu bloques > 30 secondes sur une question, retour à la leçon. Pas de honte. C'est le signal que le concept n'est pas encore ancré.

Lié depuis chaque `_recall_XX.md`.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
