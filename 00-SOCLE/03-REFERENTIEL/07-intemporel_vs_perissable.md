---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, preuve_partielle]
anti_recipe_key: solution_concurrente+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# INTEMPOREL vs PERISSABLE (tableau de re-audit)

Temps de lecture ~3 min

Rendre explicite ce que le front-matter `stability:` implique deja : quels
modules restent vrais dans 10 ans, lesquels doivent etre rejoues tous les
2 ans. Tu sais alors quoi rouvrir en 2029.

| Module                                   | Durée de validité estimée | Signal de péremption                                             |
| ---------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| 00-SOCLE/01-GETTING-STARTED              | 2 ans                     | Node LTS bascule ; nouvel outil de package (bun stable, etc.)    |
| 00-SOCLE/03-REFERENTIEL                  | intemporel                | Nouvelle "pierre" ajoutée au métier                              |
| 00-SOCLE/04-FUNDAMENTALS                 | intemporel                | Changement majeur de la spec ECMAScript                          |
| 00-SOCLE/05-PROBLEM-SOLVING              | intemporel                | :                                                                |
| 01-CADRAGE/02-ASYNC                      | intemporel                | Nouveau primitif de concurrence (au-delà de async/await)         |
| 01-CADRAGE/03-DEBUGGING                  | 5 ans                     | Nouveau DevTools majeur ; nouvel outil de trace                  |
| 01-CADRAGE/04-ERROR-HANDLING             | intemporel                | :                                                                |
| 02-CONSTRUCTION/03-TESTING               | 5 ans                     | Runner par défaut change (Jest -> Vitest -> ?)                   |
| 02-CONSTRUCTION/04-MATH-BASICS           | intemporel                | :                                                                |
| 02-CONSTRUCTION/05-MEMORY-PERFORMANCE    | 5 ans                     | Nouveau GC ; nouveau format de heap snapshot                     |
| 02-CONSTRUCTION/06-DATA-STRUCTURES       | intemporel                | :                                                                |
| 02-CONSTRUCTION/07-ALGORITHMS            | intemporel                | :                                                                |
| 02-CONSTRUCTION/09-FUNCTIONAL-JS         | intemporel                | Nouvelle proposition TC39 (pipeline, records) stabilisée         |
| 02-CONSTRUCTION/10-DESIGN-PATTERNS       | intemporel                | :                                                                |
| 02-CONSTRUCTION/11-REFACTORING           | intemporel                | :                                                                |
| 02-CONSTRUCTION/12-TYPESCRIPT            | 2 ans                     | Bascule majeure TS (strict flags, decorators v2, effect systems) |
| 02-CONSTRUCTION/13-RUNTIME-ENV           | 2 ans                     | Bun/Deno atteint parité Node ; workerd change ; edge dominant    |
| 02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS | 5 ans                     | Nouveau paradigme (au-delà micro-services / event-driven)        |
| 02-CONSTRUCTION/18-WEB-CONCEPTS          | 5 ans                     | HTTP/4 ; nouvelle spec navigateur majeure                        |
| 02-CONSTRUCTION/17-OOP-JS                | intemporel                | :                                                                |
| 03-PILOTAGE/02-WEB-INCLUSIVE             | 5 ans                     | Nouvelle version WCAG ; nouveau standard i18n                    |
| 04-EPREUVE/03-REALTIME                   | 5 ans                     | WebTransport remplace WebSocket dominant                         |
| 02-CONSTRUCTION/19-API-CRAFT             | 5 ans                     | REST remplacé par gRPC / GraphQL / autre en majorité             |
| 03-PILOTAGE/04-SECURITY                  | 2 ans                     | Nouvelle famille d'attaques ; nouvelle version OWASP Top 10      |
| 04-EPREUVE/04-BIG-APP-SNOOP              | 2 ans                     | Nouveau paradigme d'assistance (au-delà du chat + suggestions)   |
| 05-MAITRISE/01-DATABASES                 | 5 ans                     | Nouveau modèle (vectoriel dominant ; SQL sur objets, etc.)       |
| 05-MAITRISE/02-SCALABILITY               | 5 ans                     | Nouveau modèle de déploiement (edge partout ; serverless v2)     |
| 03-PILOTAGE/05-OBSERVABILITY             | 5 ans                     | OpenTelemetry remplacé ; nouveau standard de trace               |
| 03-PILOTAGE/10-TEAM-CRAFT                | intemporel                | :                                                                |
| 05-MAITRISE/03-EDGE-CASES                | intemporel                | :                                                                |
| 05-MAITRISE/03-EDGE-CASES                | 2 ans                     | Nouveau protocole d'agent (MCP successor, etc.)                  |
| 02-CONSTRUCTION/02-MINI-PROJECTS         | 5 ans                     | Stack de référence obsolète ; sujet plus représentatif du métier |
| 05-MAITRISE/06-ANNEXES                   | intemporel                | :                                                                |
| 05-MAITRISE/07-TOOLS                     | 2 ans                     | Outillage dominant remplacé (bundler, linter, formatter)         |

## Comment se servir de ce tableau

- **Chaque 2 ans** : re-audit des lignes "2 ans". Priorité absolue.
- **Chaque 5 ans** : re-audit des lignes "5 ans".
- **Intemporel** : ne veut pas dire "à ne jamais toucher" ; veut dire "aucun signal externe n'impose de re-auditer". Tu re-auditeras si un signal apparaît.

Ce tableau est lui-même à ré-auditer tous les 2 ans.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
