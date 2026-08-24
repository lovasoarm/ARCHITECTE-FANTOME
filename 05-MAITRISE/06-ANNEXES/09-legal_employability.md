---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Juridique & employabilité : ce qu'on t'a pas dit

Temps de lecture ~15 min

Tu vas signer des contrats. Certains te feront perdre la propriété de TON code. Lis avant, pas après.

## NDA (accord de confidentialité)

- Vérifie la DURÉE (5 ans ? à vie ?).
- Vérifie le PÉRIMÈTRE ("toute information" = trop large).
- Vérifie la JURIDICTION (tribunal du client = souvent défavorable).

## PROPRIÉTÉ DU CODE

- **Salarié** : par défaut le code appartient à l'employeur si écrit dans le cadre du travail.
- **Freelance** : par défaut le code T'appartient tant que le contrat ne prévoit PAS de cession. Beaucoup de contrats prévoient la cession : lis-les.
- **Open source pendant le boulot** : demande l'autorisation ÉCRITE avant de committer sur ton repo perso.

## FREELANCE VS SALARIÉ (résumé brutal)

| Critère            | Salarié  | Freelance          |
| ------------------ | -------- | ------------------ |
| Sécurité           | Élevée   | Zéro par défaut    |
| Rémunération brute | Moyenne  | 1.5x à 3x          |
| Charges/impôts     | Prélevés | À gérer soi        |
| Congés payés       | Oui      | Non                |
| Choix des missions | Faible   | Élevé (si demandé) |
| Formation          | Payée    | À financer soi     |

## AVANT DE SIGNER

- Fais relire par un pair.
- Négocie 3 clauses (jamais 0, jamais 10).
- Garde une copie signée en PDF hors du drive de l'employeur.

## PRINCIPES DURABLES

Un contrat mal lu est plus dangereux qu'un bug en prod. Le bug tu le fixes ; le contrat te suit 5 ans.

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
