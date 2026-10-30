---
stability: evolutif
acte: épreuve intégratrice
noyau: oui
route: formation-complete
niveau: E-H
last_reviewed: 2026-10-30
---

# 72 : Capstone intégré : concevoir, exploiter et faire évoluer un système intelligent

## Mission

Conçois un système de surveillance et de maintenance d'équipements hydrauliques répartis sur plusieurs régions. Les stations transmettent des mesures intermittentes ; les opérateurs doivent consulter l'état, recevoir des alertes et planifier une intervention. Une fonction ML peut estimer un risque de surchauffe, mais elle ne doit jamais masquer les règles de sécurité ou inventer une certitude.

Ce projet relie les huit axes AF. Il ne demande pas de construire huit démonstrations indépendantes : il demande de défendre un système cohérent, ses frontières, ses garanties, ses limites et son coût.

## Contexte et hypothèses de dimensionnement

Les chiffres suivants sont des **hypothèses de travail**, pas des mesures ni une architecture imposée :

- 10 000 stations actives ;
- une mesure par station toutes les 30 secondes ;
- pic de trafic jusqu'à 10 fois la moyenne ;
- taille moyenne utile d'un événement : 300 octets avant index, réplication, logs et overhead ;
- réseau intermittent pour 15 % des stations au moins une fois par jour ;
- données rattachées à un tenant, une station, une métrique, une unité et un temps d'événement ;
- les alertes critiques doivent rester compréhensibles et traçables même si le modèle ML est arrêté.

Ordres de grandeur à vérifier : 28,8 millions d'événements/jour et environ 8,64 Go/jour de payload brut à 300 octets. Le volume réel sera supérieur après indexation, réplication, métadonnées, compression, logs et stockage des résultats. Montre tes calculs, ne recopie pas les chiffres sans les refaire.

## Exigences fonctionnelles

1. Enregistrer l'identité de chaque station et sa relation à un tenant.
2. Accepter des mesures répétées, tardives, hors ordre et dupliquées.
3. Valider le contrat, isoler les événements invalides et permettre leur investigation.
4. Exposer les séries temporelles et l'état des équipements à des utilisateurs autorisés.
5. Produire des alertes déterministes pour les règles de sécurité explicites.
6. Proposer une estimation ML séparée, avec score, version de modèle et justification limitée aux données observées.
7. Permettre l'arrêt du modèle sans arrêter la collecte ni les alertes déterministes.
8. Conserver une piste d'audit pour les décisions et les actions sensibles.

## Exigences non fonctionnelles de l'exercice

Les cibles suivantes sont initiales. Tu dois les challenger dans ton ADR et les relier à un coût :

| Dimension         | Cible initiale                                                                | Preuve attendue                                              |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Ingestion         | 99,9 % des événements valides acceptés ou mis en quarantaine de façon visible | Compteurs et rapprochement source/sortie                     |
| Fraîcheur         | 95 % des événements en ligne visibles en moins de 60 s                        | Histogramme p50/p95/p99 par horodatage d'événement           |
| Dashboard         | 99,9 % de disponibilité mensuelle, hors maintenance annoncée                  | SLI, fenêtre et exclusions explicités                        |
| Alertes critiques | latence p95 inférieure à 60 s lorsque le flux est connecté                    | Trace de bout en bout et test de charge                      |
| Reprise           | RPO cible 5 min, RTO cible 60 min                                             | Exercice de restauration chronométré                         |
| Sécurité          | aucune lecture inter-tenant non autorisée                                     | Tests négatifs API, SQL et cache                             |
| Coût              | budget mensuel plafonné et coût/unité suivi                                   | estimation, facture ou métrique observée, politique d'alerte |

Un SLO sans méthode de calcul, fenêtre, exclusion et conséquence d'un dépassement n'est pas un SLO exploitable.

## Les huit axes et leurs preuves non compensatoires

### 1. Software Engineering

À livrer : code modulaire, conventions, tests unitaires/intégration/contrat, tests négatifs, revue de diff, gestion d'erreurs et stratégie de compatibilité.

Gate : un défaut introduit doit être détecté par un test avant le correctif et rester détecté après refactoring. Un test qui vérifie seulement l'implémentation actuelle ne suffit pas.

### 2. Backend & Databases

À livrer : API documentée, contrat versionné, modèle relationnel, clés/contraintes, transactions, index mesurés, migration expand-migrate-contract, stratégie d'idempotence et isolation tenant.

Gate : exécuter une migration avec ancien et nouveau consommateur en parallèle ; prouver l'absence de perte, de double écriture et de lecture inter-tenant.

### 3. Architecture & Distributed Systems

À livrer : diagramme de contexte/conteneurs, ADR avec au moins trois options, modèle de panne, cohérence, stratégie de retry, backpressure, cache, files, partitionnement et plan de migration.

Gate : provoquer duplication, retard, indisponibilité partielle et reprise ; expliquer les garanties qui restent vraies et celles qui ne le sont pas.

### 4. Cloud & DevOps

À livrer : environnement reproductible, pipeline CI/CD, artefact signé ou traçable, secrets séparés, déploiement progressif, rollback, sauvegarde, restauration, observabilité et budget.

Gate : déployer une release, observer un signal, déclencher un rollback et restaurer une donnée ; joindre les résultats réels et les limites de l'environnement.

### 5. AI Engineering

À livrer : baseline non-ML, dataset versionné, pipeline de préparation, modèle versionné, seuil de décision, abstention, service d'inférence, évaluation, contrôle d'accès, limites, coût et arrêt d'urgence.

Gate : prouver que le système continue de fonctionner sans le modèle ; mesurer une régression et bloquer une release lorsque le seuil critique est dépassé.

### 6. Data Engineering & Big Data

À livrer : ingestion batch et streaming, contrat de données, schéma, stockage brut/nettoyé/analytique, qualité, quarantaine, déduplication, event time, watermark, backfill, orchestration et lineage.

Gate : rejouer un lot, traiter une donnée tardive, récupérer après échec et démontrer qu'aucun événement valide n'est perdu silencieusement.

### 7. Machine Learning & Mathématiques

À livrer : exploration des distributions, baseline, séparation temporelle, métriques, calibration ou analyse de seuil, explication du modèle et limites statistiques.

Gate : démontrer l'absence de fuite connue, comparer au modèle naïf, analyser faux positifs/faux négatifs et expliquer quand une règle simple est préférable.

### 8. Technical Leadership

À livrer : ADR, RFC, note d'arbitrage coût/risque/valeur, stratégie de migration, présentation à des publics différents, revue contradictoire, plan de mentorat et retours d'adoption.

Gate : une autre personne doit comprendre, challenger et maintenir une partie importante du système sans dépendre de l'auteur. Une adoption réelle doit être distinguée d'une simulation.

## Décisions architecturales à défendre

Tu dois explicitement comparer :

- monolithe modulaire contre services séparés ;
- batch contre streaming, ou une combinaison ;
- PostgreSQL seul contre stockage spécialisé additionnel ;
- traitement synchrone contre asynchrone ;
- règles déterministes contre modèle ML ;
- modèle hébergé par un fournisseur contre modèle local ;
- cache et matérialisation contre requêtes directes ;
- architecture multi-région contre sauvegarde/restauration régionale.

Pour chaque décision : contexte, options, critères, coûts directs, coût opérationnel, risque de migration, conséquences, métriques de réexamen et option de retour arrière. Tu dois aussi défendre une décision de **ne pas** ajouter une technologie si sa complexité ne produit pas assez de valeur.

## Phases de réalisation

| Phase             | Travail                                             | Livrable bloquant                              |
| ----------------- | --------------------------------------------------- | ---------------------------------------------- |
| A : Comprendre    | besoins, acteurs, données, contraintes, risques     | note problème et exigences mesurables          |
| B : Modéliser     | flux, contrats, frontières, pannes, dimensionnement | C4 ou diagrammes équivalents + ADR initial     |
| C : Construire    | API, base, pipeline, contrôles, modèle optionnel    | code, tests, scripts SQL et dataset versionnés |
| D : Exploiter     | déploiement, observabilité, SLO, coûts, sauvegarde  | runbook et dashboard de mesures                |
| E : Perturber     | charge, duplication, retard, crash, restauration    | rapports avant/après et post-mortem            |
| F : Faire évoluer | migration, compatibilité, deuxième consommateur     | plan expand-migrate-contract et preuves        |
| G : Transmettre   | revue externe, documentation, mentorat, adoption    | feedback daté et preuve de transfert           |

## Barème de capstone (100 points)

| Axe                                | Points | Condition minimale                                        |
| ---------------------------------- | -----: | --------------------------------------------------------- |
| Software Engineering               |     12 | tests de régression et qualité démontrés                  |
| Backend & Databases                |     12 | migration, transactions et isolation prouvées             |
| Architecture & Distributed Systems |     16 | ADR comparatif et pannes partielles démontrées            |
| Cloud & DevOps                     |     12 | livraison, rollback et restauration exécutés              |
| AI Engineering                     |     12 | évaluation, garde-fous et arrêt du modèle démontrés       |
| Data Engineering                   |     14 | pipeline idempotent, qualité, streaming/batch et reprise  |
| ML & Mathématiques                 |     10 | protocole d'évaluation sans fuite et métriques justifiées |
| Leadership                         |     12 | revue contradictoire, transfert et feedback externe       |

**Règles non compensatoires :** au moins 60 % dans chaque axe ; aucune note globale ne compense une faille de sécurité critique, une fuite inter-tenant, une absence de restauration ou une évaluation ML contaminée. 80/100 permet de déclarer le capstone maîtrisé dans son contexte ; cela ne confère pas un titre professionnel.

## Niveaux de preuve : ne pas gonfler le niveau

- `SIMULATION` : modèle papier, test local ou panne simulée ; utile, mais limité.
- `PERSONNEL` : projet individuel exécuté et mesuré ; preuve plus forte, portée limitée.
- `COLLABORATIF` : travail partagé, revue, feedback et responsabilité répartie.
- `EXTERNE` : revue indépendante ou usage par un tiers avec retour documenté.
- `PRODUCTION` : responsabilité dans un service réellement exploité, avec conséquences suivies dans le temps.

**Staff readiness :** nécessite une responsabilité technique démontrée sur un système ou plusieurs équipes, des décisions défendues et des résultats opérationnels.

**Principal readiness :** nécessite une influence durable sur plusieurs systèmes ou domaines, des migrations structurantes et des arbitrages avec impact mesuré.

**Distinguished readiness :** exige un impact organisationnel/écosystème durable, une influence au-delà d'une équipe ou d'un produit, des preuves externes longitudinales et une capacité à faire évoluer les standards d'ingénierie. Ce niveau ne peut pas être certifié par un projet scolaire ou un ZIP seul.

## Revue contradictoire obligatoire

Le reviewer doit pouvoir répondre « oui » aux questions suivantes :

- Les hypothèses sont-elles séparées des mesures ?
- Les calculs de charge et de coût sont-ils reproductibles ?
- Les données peuvent-elles être retracées jusqu'à leur source ?
- Les permissions sont-elles vérifiées au serveur et dans la couche de données ?
- Les erreurs de modèle sont-elles séparées des erreurs de pipeline ?
- Les pannes partielles et les reprises sont-elles testées ?
- Les décisions peuvent-elles être annulées ou migrées progressivement ?
- Une personne autre que l'auteur peut-elle exploiter le système ?
- Les limites et les inconnues sont-elles annoncées sans les cacher ?

Une réponse « non » devient une action, pas une phrase dans la conclusion.

## Dossier de preuve à archiver

`README`, diagrammes, ADR, RFC, schémas SQL, contrats, dataset et provenance, code, tests, rapports de charge, coût, SLO, threat model, matrice d'accès, rapport d'évaluation ML, runbook, rollback, preuve de restauration, post-mortem, registre des risques et feedback externe. Toutes les preuves portent un niveau de maturité et une date.
