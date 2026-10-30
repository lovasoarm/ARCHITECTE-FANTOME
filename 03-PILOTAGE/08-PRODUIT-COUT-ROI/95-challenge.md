---
perishability_id: PER-0064

stability: perissable
acte: pilotage
noyau: oui
cognitive_level: L4
perturbation_modes: [fausse_piste, decision_organisationnelle]
anti_recipe_key: fausse_piste+decision_organisationnelle
transfer_distance: low
assessment_role: diagnostic_mastery
freshness_registry_id: PER-0064
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-04-28
review_status: a_verifier_date_absente
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

## Barème autonome sur 20 : décision produit / coût / ROI

| Critère               | Points | Preuve attendue                                                                  |
| --------------------- | -----: | -------------------------------------------------------------------------------- |
| Problème et baseline  |      4 | Segment d'utilisateur, mesure de départ datée, source et limite de l'échantillon |
| Valeur métier         |      4 | Unité, hypothèse causale, résultat attendu et indicateur de succès               |
| Coût complet          |      4 | Coût cloud, heures d'ingénierie, exploitation, migration et coût de sortie       |
| Risque et sensibilité |      4 | P50/P95 ou fourchette, scénario défavorable, dépendances et coût d'opportunité   |
| Décision et garde-fou |      4 | Choix, option rejetée, point mort, seuil d'arrêt et date de réévaluation         |

**Seuil : 15/20**, aucune donnée chiffrée sans source et aucun engagement sur un tarif cloud sans date, région, unité et source officielle vérifiées. Si le coût ne peut pas être mesuré, le verdict doit expliciter l'incertitude et réduire l'engagement.
