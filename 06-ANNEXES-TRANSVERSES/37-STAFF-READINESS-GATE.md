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

## Contrôles de vérité

Les neuf preuves restent le noyau. Elles doivent maintenant être lues avec quatre contrôles transversaux :

- L'alignement avec des rôles réels est vérifié dans les preuves de projet et de transfert, sans confondre mots-clés et compétence.
- La supervision IA est vérifiée dans les exercices de gouvernance et d'automatisation du parcours.
- [48-EXTERNAL-REVIEW-GATE.md](48-EXTERNAL-REVIEW-GATE.md) : obtenir une contradiction indépendante et, lorsque possible, une revue R2.
- [49-TERRAIN-MATURITY-GATE.md](49-TERRAIN-MATURITY-GATE.md) : étiqueter la preuve T0→T4 sans transformer une simulation en expérience professionnelle.

Le [50-INCIDENT-COMMANDER-GATE.md](50-INCIDENT-COMMANDER-GATE.md) est la preuve intégratrice recommandée pour relier incident, sécurité, coût, produit et leadership.

### Condition READY renforcée

`READY` signifie désormais :

1. G1–G9 fermés ;
2. au moins une revue externe R1 ;
3. benchmark IA exécuté au moins une fois ;
4. provenance terrain explicitement étiquetée T0–T4 ;
5. aucune prétention d'expérience Staff réelle ne repose uniquement sur des simulations.

Lorsque l'expérience de terrain reste T0/T1, le verdict doit être formulé **READY : curriculum / Staff-track preparation**.

## Contrôles transversaux

Ils ne créent pas de nouvelles familles. Ils renforcent les neuf gates existants :

1. **Specification integrity** : intention → invariants → tests → révision.
2. **Organizational reasoning** : ambiguïté, parties prenantes, adoption et séquençage.
3. **System ownership** : décision initiale → dérive → migration → observation.
4. **Autonomy governance** : permissions minimales, évaluation, observabilité, arrêt et reprise.

Une même preuve peut fermer plusieurs contrôles, à condition que chacun soit visible et vérifiable.


## Critère de profondeur

Chaque gate doit montrer au moins une chaîne complète :

**hypothèse → décision → résultat → observation → contradiction → révision**.

Une décision qui ne peut pas être falsifiée est considérée comme une opinion documentée, pas comme une preuve d'ingénierie.

## Contrat des familles et du transfert

La sortie Staff exige la fermeture de **S1–S6**, les six familles du référentiel de preuves. **S7 : pensée transférable : est une preuve transversale obligatoire, mais n’est pas une septième famille.** Le capstone peut alimenter plusieurs familles et le transfert, mais il ne remplace jamais le Staff Readiness Gate.

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
