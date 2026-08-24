---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# 00 : Prereq check : i18n

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce sous-module si tu ne peux pas répondre à ces
> questions **sans regarder**. Ce n'est pas un test noté, c'est un filtre
> anti-illusion. Ces questions portent sur la partie accessibilité de
> `03-PILOTAGE/02-WEB-INCLUSIVE` que tu viens de finir, avant ce sous-dossier i18n.

## Questions

1. Que fait un lecteur d'écran sur une page mal structurée ?
2. Quel est le contraste minimum exigé par WCAG AA ?
3. Pourquoi une `div` cliquable sans `<button>` est-elle un piège d'accessibilité ?
4. Cite un attribut ARIA et explique à quoi il sert.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `03-PILOTAGE/02-WEB-INCLUSIVE/` (partie accessibilité), ou à sa
  synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce sous-module précis** : pourquoi la pluralisation est
> difficile à internationaliser, les pièges CSS du RTL, et pourquoi ne
> jamais concaténer des morceaux de phrase pour traduire sont le contenu
> que ce sous-module va t'enseigner (notamment `05-pluralization.md`) :
> normal de ne pas encore les maîtriser. Ta compréhension est testée en
> fin de sous-module, dans `90-grimoire.md`.

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
