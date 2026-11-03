---
stability: stable
type: staff-evidence-traceability
release: 1.1.33
introduced_release: 1.1.4
---

# 81 : Matrice de traçabilité des huit piliers, preuves S et gates G

Cette matrice explique les relations entre trois référentiels existants. Elle ne crée aucun nouvel identifiant et ne remplace ni les définitions des [preuves S1–S7](../PREUVES-STAFF-ENGINEER.md), ni le [Staff Readiness Gate G1–G9](37-STAFF-READINESS-GATE.md).

## Correspondance canonique

| Pilier                                          | Familles S principalement mobilisées          | Gates G concernés                                              | Artefacts généralement mobilisés                                                |
| ----------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1. Software Engineering                         | S2, S6, S7                                    | G2, G3, G6, G9                                                 | Tests, ADR, revue de code, release, portage                                     |
| 2. Backend & Database Systems                   | S1, S2, S3, S6, S7                            | G2, G3, G4, G6, G9                                             | API, modèle de données, transactions, sécurité, migration, transfert            |
| 3. Software Architecture & System Design        | S1, S2, S3, S4, S6, S7                        | G1, G2, G3, G5, G9                                             | ADR, diagrammes, options rejetées, coûts et plan de migration                   |
| 4. Cloud / DevOps / Infrastructure              | S1, S3, S6, S7                                | G2, G3, G4, G6, G9                                             | Budget Cloud, SLO, runbook, release, rollback, restauration                     |
| 5. AI Engineering                               | S2, S3, S4, S6, S7 ; G8 comme contrôle        | G2, G4, G5, G6, G8, G9                                         | Évaluation IA, ACL, sécurité, coût, fallback, arrêt, version et rollback        |
| 6. Data Engineering & Big Data                  | S1, S2, S3, S6, S7                            | G2, G3, G4, G6, G9                                             | Contrats de données, pipeline, lineage, quarantaine, rejeu et coût              |
| 7. ML / Data Science / Maths                    | S1, S2, S3, S4, S7 ; G8 si modèle/IA exploité | G1, G2, G4, G5, G8, G9                                         | Baseline, split, métriques, seuils, analyse d’erreurs et limites                |
| 8. Technical Leadership & Advanced Architecture | S1–S6 selon la décision, plus S7              | G1–G9 selon la situation ; G7 non compensable pour l’influence | RFC, décision collective, mentorat exécuté, adoption corroborée, dossier unique |

## Règles d’interprétation

1. **Une famille S peut contribuer à plusieurs piliers.** Exemple : une migration de base de données peut démontrer backend, architecture, fiabilité et exploitation si les preuves correspondantes sont distinctes et visibles.
2. **Un gate G est un contrôle transversal, pas un cours ni un document unique.** Une ligne de tableau ne ferme pas automatiquement le gate.
3. **S7 est le transfert.** Il teste la portabilité d’un mécanisme ; il n’est ni une nouvelle famille S ni un synonyme de G9. G9 exige un transfert dans un environnement où la première solution ne se transporte pas telle quelle, alors que S7 organise les preuves de pensée transférable.
4. **G8 est le contrôle IA/automatisation.** Il est couvert par `EVALUATION-IA.md` et par `STANDARDS-AGENTS.md` seulement lorsque des agents autonomes sont utilisés. Une justification documentée de non-usage peut satisfaire le volet décisionnel, mais ne simule pas une exécution de benchmark non réalisée.
5. **G7 ne se ferme pas en solo.** Les exercices solos préparent la capacité ; la preuve d’influence requiert une interaction réelle, adoption ou effet corroboré par des tiers.
6. **Les pièces peuvent se recouper, pas se substituer.** Le budget S1 ne remplace pas les métriques S3 ; un ADR S2 ne remplace pas la décision d’arbitrage S4 ; un plan S5 ne prouve pas l’adoption ; une release déclarée ne prouve pas le rollback.

## États de preuve

Employer les statuts définis dans le [Pont preuve terrain](43-PONT-PREUVE-TERRAIN.md). Pour chaque ligne, préciser le statut, l’auteur, la contribution personnelle, la date, le contexte, la source, les limites et l’éventuelle corroboration. Un artefact `SIMULATION` ou `PERSONNEL` peut prouver un raisonnement dans son périmètre ; il ne doit pas être requalifié en `COLLABORATIF` ou `PRODUCTION`.
