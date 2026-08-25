---
stability: stable
acte: démontrer
preuve: learner
route_family: core
---

# 37 : Staff Readiness Gate : la preuve avant le prestige

Le niveau Staff d'AF ne se mesure pas au nombre de chapitres terminés. Il se mesure à la capacité de produire des décisions qui tiennent sous contrainte, dans la durée et pour plusieurs équipes.

## Les neuf preuves obligatoires

| Gate | Preuve                | Ce qui doit être visible                                                          |
| ---- | --------------------- | --------------------------------------------------------------------------------- |
| G1   | Problème ambigu       | cadrage, inconnues, hypothèses                                                    |
| G2   | Décision architecture | options, critères, trade-offs, conséquences                                       |
| G3   | Fiabilité             | SLI/SLO, mode de panne, récupération, mesure                                      |
| G4   | Sécurité              | menace, contrôle, preuve, coût/impact                                             |
| G5   | Économie              | coût, sensibilité, arbitrage produit                                              |
| G6   | Incident              | détection, diagnostic, mitigation, postmortem                                     |
| G7   | Influence             | désaccord, alignement, décision collective                                        |
| G8   | IA/automatisation     | délégation, validation, rollback, gouvernance                                     |
| G9   | Transfert             | nouvel environnement où la première solution n’est pas transportable telle quelle |

**Clarification IA :** G8 n’exige pas une spécialisation de recherche en ML. Lorsqu'une solution IA est utilisée, le candidat doit pouvoir expliquer le mécanisme pertinent, les hypothèses, les limites, les métriques, le coût, la sécurité et les conditions d'arrêt. Le [pont mathématiques → IA → ML → deep learning → LLM](41-PONT-MATHS-IA-ML-LLM.md) reste une référence DEPTH ; la route CORE exige une littératie IA architecturale minimale et une preuve de supervision via S6. Le [Noyau dur Staff / Principal 2035+](40-NOYAU-DUR-STAFF-PRINCIPAL-2035.md) décrit la portée durable.

## Critère de profondeur

Chaque gate doit montrer au moins une chaîne complète :

**hypothèse → décision → résultat → observation → contradiction → révision**.

Une décision qui ne peut pas être falsifiée est considérée comme une opinion documentée, pas comme une preuve d'ingénierie.

## Contrat des familles et du transfert

La sortie Staff exige la fermeture de **S1–S6**, les six familles du référentiel de preuves. **S7 — pensée transférable — est une preuve transversale obligatoire, mais n’est pas une septième famille.** Le capstone peut alimenter plusieurs familles et le transfert, mais il ne remplace jamais le Staff Readiness Gate.

## Critère d'influence

Au moins trois preuves doivent montrer que le résultat dépend d'autre chose que du code de l'apprenant :

- autre équipe ;
- produit ;
- sécurité ;
- opérations ;
- coût ;
- décision organisationnelle.

## Critère de temporalité

Une preuve Staff critique doit être revisitée après une période d'exploitation ou une simulation longitudinale. L'objectif est d'exposer les conséquences différées et les effets de second ordre.

## Décision de sortie

- **READY** : toutes les preuves critiques existent et les contradictions ont été traitées.
- **READY-WITH-GAPS** : les preuves techniques sont solides mais l'influence ou la durée reste insuffisante.
- **NOT-READY** : une preuve fondamentale manque ou ne peut pas être vérifiée.

Le gate ne prétend jamais transformer artificiellement seize semaines en années d'expérience professionnelle.
