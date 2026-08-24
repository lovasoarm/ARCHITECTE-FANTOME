---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, decision_organisationnelle]
anti_recipe_key: regression+decision_organisationnelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# EXO : debugging a l'aveugle (Pierre 5, 11.5)

Temps de lecture ~2 min

Un mainteneur te livre un bug en une phrase, sans stack, sans repro, sans logs.

## Enonce

"Depuis vendredi, une commande sur cent est facturee deux fois. On ne sait ni laquelle, ni pourquoi."

## Regle

1. Interdit d'ouvrir le code avant d'avoir ecrit 5 hypotheses classees par probabilite (`HYPOTHESES.md`).
2. Chaque hypothese doit inclure son test de falsification.
3. Une fois le code ouvert, tu ne modifies rien avant d'avoir reproduit le bug (deterministe).

## Livrables

- `HYPOTHESES.md` (5 hypotheses minimum, verdict pour chacune).
- `REPRO.md` (comment reproduire a 100 %).
- `FIX.md` (correctif + test de non-regression).

## Auto-verification

Un pair (ou toi 24h plus tard) doit pouvoir rejouer ton `REPRO.md` et voir le bug.

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
