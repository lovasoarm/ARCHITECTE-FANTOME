---
stability: intemporel
acte: appliquer
---

# INTEMPOREL vs PERISSABLE (tableau de re-audit)

Rendre explicite ce que le front-matter `stability:` implique deja : quels
modules restent vrais dans 10 ans, lesquels doivent etre rejoues tous les
2 ans. Tu sais alors quoi rouvrir en 2029.

| Module                    | Durée de validité estimée | Signal de péremption                                             |
| ------------------------- | ------------------------- | ---------------------------------------------------------------- |
| 00-SOCLE/01_getting_started        | 2 ans                     | Node LTS bascule ; nouvel outil de package (bun stable, etc.)    |
| 00-SOCLE/03_referentiel            | intemporel                | Nouvelle "pierre" ajoutée au métier                              |
| 00-SOCLE/04_fundamentals           | intemporel                | Changement majeur de la spec ECMAScript                          |
| 00-SOCLE/05_problem_solving        | intemporel                | :                                                                |
| 01-CADRAGE/02_async                  | intemporel                | Nouveau primitif de concurrence (au-delà de async/await)         |
| 01-CADRAGE/03_debugging              | 5 ans                     | Nouveau DevTools majeur ; nouvel outil de trace                  |
| 01-CADRAGE/04_error_handling         | intemporel                | :                                                                |
| 02-CONSTRUCTION/03_testing                | 5 ans                     | Runner par défaut change (Jest -> Vitest -> ?)                   |
| 02-CONSTRUCTION/04_math_basics            | intemporel                | :                                                                |
| 02-CONSTRUCTION/05_memory_performance     | 5 ans                     | Nouveau GC ; nouveau format de heap snapshot                     |
| 02-CONSTRUCTION/06_data_structures        | intemporel                | :                                                                |
| 02-CONSTRUCTION/07_algorithms             | intemporel                | :                                                                |
| 02-CONSTRUCTION/09_functional_js          | intemporel                | Nouvelle proposition TC39 (pipeline, records) stabilisée         |
| 02-CONSTRUCTION/10_design_patterns        | intemporel                | :                                                                |
| 02-CONSTRUCTION/11_refactoring            | intemporel                | :                                                                |
| 02-CONSTRUCTION/12_typescript             | 2 ans                     | Bascule majeure TS (strict flags, decorators v2, effect systems) |
| 02-CONSTRUCTION/13_runtime_env            | 2 ans                     | Bun/Deno atteint parité Node ; workerd change ; edge dominant    |
| 02-CONSTRUCTION/14_architecture_patterns  | 5 ans                     | Nouveau paradigme (au-delà micro-services / event-driven)        |
| 02-CONSTRUCTION/18_web_concepts           | 5 ans                     | HTTP/4 ; nouvelle spec navigateur majeure                        |
| 02-CONSTRUCTION/17_oop_js                 | intemporel                | :                                                                |
| 03-PILOTAGE/02_web_inclusive          | 5 ans                     | Nouvelle version WCAG ; nouveau standard i18n                    |
| 04-EPREUVE/03_realtime               | 5 ans                     | WebTransport remplace WebSocket dominant                         |
| 02-CONSTRUCTION/19_api_craft              | 5 ans                     | REST remplacé par gRPC / GraphQL / autre en majorité             |
| 03-PILOTAGE/04_security               | 2 ans                     | Nouvelle famille d'attaques ; nouvelle version OWASP Top 10      |
| 04-EPREUVE/04_ai_native_dev          | 2 ans                     | Nouveau paradigme d'assistance (au-delà du chat + suggestions)   |
| 05-MAITRISE/01_databases              | 5 ans                     | Nouveau modèle (vectoriel dominant ; SQL sur objets, etc.)       |
| 05-MAITRISE/02_scalability            | 5 ans                     | Nouveau modèle de déploiement (edge partout ; serverless v2)     |
| 03-PILOTAGE/05_observability          | 5 ans                     | OpenTelemetry remplacé ; nouveau standard de trace               |
| 03-PILOTAGE/10_team_craft             | intemporel                | :                                                                |
| 05-MAITRISE/03_edge_cases             | intemporel                | :                                                                |
| 05-MAITRISE/04_ai_agents_and_autonomy | 2 ans                     | Nouveau protocole d'agent (MCP successor, etc.)                  |
| 02-CONSTRUCTION/02_mini_projects          | 5 ans                     | Stack de référence obsolète ; sujet plus représentatif du métier |
| 05-MAITRISE/06_annexes                | intemporel                | :                                                                |
| 05-MAITRISE/07_tools                  | 2 ans                     | Outillage dominant remplacé (bundler, linter, formatter)         |

## Comment se servir de ce tableau

- **Chaque 2 ans** : re-audit des lignes "2 ans". Priorité absolue.
- **Chaque 5 ans** : re-audit des lignes "5 ans".
- **Intemporel** : ne veut pas dire "à ne jamais toucher" ; veut dire "aucun signal externe n'impose de re-auditer". Tu re-auditeras si un signal apparaît.

Ce tableau est lui-même à ré-auditer tous les 2 ans.
