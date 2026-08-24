## perishability_id: PER-0064

stability: perissable
acte: pilotage
noyau: oui
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_organisationnelle]
anti_recipe_key: fausse_piste+decision_organisationnelle
transfer_distance: low
assessment_role: diagnostic_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# Challenge : produire DECISION-ARBITRAGE.md

Temps de lecture ~2 min

Les preuves S4 exigent `DECISION-ARBITRAGE.md`. Ce challenge est ce qui le déclenche.

Sujet : le [changement de spec du capstone](../../04-EPREUVE/05-CAPSTONE-ARENA/05-changement-de-spec.md)
**ou**, si tu n'es pas encore au palier 4, une coupe réelle de ton MVP (une feature que tu
voulais, que tu sors).

## Page unique, trois nombres, une source chacun

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

| Nombre | Question                                          | Source admissible                       |
| ------ | ------------------------------------------------- | --------------------------------------- |
| Valeur | que gagne l'utilisateur, en unité métier / mois ? | mesure fil rouge ou entretien daté      |
| Coût   | euros **et** heures, palier 10 000                | une ligne de `06A-BUDGET-CLOUD.md` (S1) |
| Risque | pire mois plausible                               | P95, pas la moyenne                     |

Point mort : à partir de quand le chantier se paie. Si tu ne peux pas l'écrire, tu
**refuses** le chantier, avec le chiffre du refus.

## Forme

Fichier `PREUVES/DECISION-ARBITRAGE.md` : une page, date, SHA. Gabarit :
[05-S4-DECISION-ARBITRAGE.md](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/05-S4-DECISION-ARBITRAGE.md).

## Verdict

Réussi si un tiers retrouve les trois sources et le palier. Échec : prose sans nombre, ou
nombres copiés du [relevé de référence](../07-CLOUD-FOUNDATIONS/07-RELEVE-REFERENCE-2026.md).

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
