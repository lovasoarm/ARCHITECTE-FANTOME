---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# 04 : Reproduis avant de corriger

Temps de lecture ~5 min

> **Principe universel** : un bug qu'on ne sait pas reproduire n'est pas un bug : c'est une croyance. Vrai partout, du JS au distribué.

## Règle non négociable

> **Aucun `git commit fix:` avant un `test` qui échoue de manière déterministe.**

## Protocole

1. Écris la reproduction **en français** : entrées, actions, résultat observé, résultat attendu.
2. Traduis-la en test automatisé (unit, integration, ou un simple script).
3. Le test doit **échouer** avant le fix.
4. Fix.
5. Le test doit **passer** après.
6. Commit dans cet ordre : `test:` puis `fix:`.

## Exercice

On te fournit [`11A-flaky.js`](./11A-flaky.js) (15 lignes, autonome). Bug : environ 1 fois sur 100, `computeTotal([1,2,3])` renvoie `NaN`.

- Reproduis **déterministe** (indice : seed le random, force la branche).
- Écris le test qui casse à coup sûr.
- Fix. Commit.

## (attention) Piège

"Je le vois en dev mais pas en test" = le test ne reproduit pas encore. Continue.

---

> Pour tout exercice de debugging : utilise le template [`16-HYPOTHESES_TEMPLATE.md`](16-HYPOTHESES_TEMPLATE.md). Pas de correction sans hypothèse écrite.

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
