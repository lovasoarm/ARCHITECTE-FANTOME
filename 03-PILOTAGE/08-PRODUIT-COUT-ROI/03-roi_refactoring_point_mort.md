---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [preuve_partielle, decision_inversee]
anti_recipe_key: preuve_partielle+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# ROI d'un refactoring et point mort

<!-- AF-DIAGRAM:roi -->

```text
text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

Temps de lecture ~8 min

## 1) LA FORMULE, UNE SEULE

```txt
Point mort (mois) = Coût du chantier / Gain mensuel récurrent
```

Coût = jours-homme x coût journalier + surcoût d'exploitation.
Gain = temps gagné valorisé + incidents évités + coût d'infrastructure économisé.

## 2) EXEMPLE COMPLET

```txt
Chantier : extraire le module de facturation, 12 jours-homme à 500 €/j = 6 000 €
Gains mensuels :
  - 6 h/mois de correctifs en moins ....... 6 x 60 € = 360 €
  - 1 incident/trimestre évité (2 400 €) .. 800 €/mois
  - déploiements séparés, - 40 €/mois d'infra ... 40 €
  Total = 1 200 €/mois
Point mort = 6 000 / 1 200 = 5 mois
```

## 3) LA RÈGLE DE DÉCISION

| Point mort                | Décision                                                              |
| ------------------------- | --------------------------------------------------------------------- |
| < 6 mois                  | à faire, planifié ce trimestre                                        |
| 6-18 mois                 | à faire seulement si le code concerné est encore modifié dans 18 mois |
| > 18 mois ou incalculable | à ne pas faire ; documenter et fermer le sujet                        |

Le critère caché, et le plus important : **la fréquence de modification du code visé**. Refactorer du
code que personne ne touche n'a jamais de point mort.

## 4) CE QUI FAUSSE TOUT

Le gain estimé par celui qui veut faire le chantier. Contre-mesure : fais estimer le gain par la
personne qui subit le problème, pas par toi.

## Exercice (25 min)

Calcule le point mort de ton refactoring préféré. S'il dépasse 18 mois, écris publiquement que tu y
renonces : c'est l'exercice.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
