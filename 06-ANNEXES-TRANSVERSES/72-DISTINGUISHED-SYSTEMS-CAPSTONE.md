---
stability: evolutif
acte: épreuve intégratrice
noyau: oui
route: formation-complete
niveau: E-H
last_reviewed: 2026-10-31
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
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
6. Évaluer si une estimation ML apporte une valeur mesurable au-delà des règles déterministes. Si oui, proposer une estimation séparée, avec score, version de modèle et justification limitée aux données observées ; si non, documenter une décision argumentée de non-recours au ML.
7. Si un modèle est retenu, permettre son arrêt sans arrêter la collecte ni les alertes déterministes. Si aucun modèle n'est retenu, démontrer que l'architecture n'en dépend pas et préciser les conditions qui justifieraient de réexaminer cette décision.
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

À livrer dans tous les cas : baseline déterministe/non-ML, analyse de la valeur attendue, qualité et provenance des données disponibles, risques, coûts, seuils d'acceptation, supervision humaine pertinente et critères d'arrêt ou de réexamen.

- **Voie ML retenue :** ajouter dataset et pipeline versionnés, modèle versionné, protocole d'évaluation, seuil de décision, abstention, service d'inférence, contrôle d'accès, monitoring, limites, coût et arrêt d'urgence.
- **Voie sans ML :** fournir une décision de non-recours étayée par les données et les besoins métier, analyser la faisabilité/qualité/quantité des données, décrire les risques d'un modèle hypothétique et fixer les preuves qui déclencheraient un nouvel examen. Aucun modèle factice ni métrique ML inventée n'est demandé.

Gate : dans les deux voies, prouver que la collecte et les alertes déterministes restent autonomes. Si un modèle est déployé, mesurer une régression et bloquer une release lorsque le seuil critique est dépassé ; si aucun modèle n'est retenu, vérifier l'absence de dépendance runtime et la traçabilité de la décision de non-recours.

### 6. Data Engineering & Big Data

À livrer : ingestion batch et streaming, contrat de données, schéma, stockage brut/nettoyé/analytique, qualité, quarantaine, déduplication, event time, watermark, backfill, orchestration et lineage.

Gate : rejouer un lot, traiter une donnée tardive, récupérer après échec et démontrer qu'aucun événement valide n'est perdu silencieusement.

### 7. Machine Learning & Mathématiques

À livrer dans tous les cas : analyse exploratoire des données disponibles, qualité des labels, risques de fuite temporelle, baseline déterministe, choix de métriques et analyse des coûts de faux positifs/faux négatifs.

- **Voie ML retenue :** ajouter séparation temporelle, comparaison au modèle naïf, métriques, calibration ou analyse de seuil, analyse d'erreurs, incertitude et limites statistiques.
- **Voie sans ML :** produire une étude de faisabilité reproductible : volume et représentativité des données, disponibilité/fiabilité des labels, biais et fuites possibles, baseline déterministe, protocole temporel envisagé, métriques et seuils préenregistrés, critères minimums de données et conditions de décision. Une simulation ou un jeu synthétique doit être étiqueté comme tel ; il ne prouve pas une performance prédictive réelle.

Gate : voie ML, démontrer l'absence de fuite connue, comparer au modèle naïf et analyser les erreurs ; voie sans ML, démontrer pourquoi les preuves disponibles ne justifient pas encore un modèle et comment une future évaluation pourrait être menée sans fuite. Le non-recours argumenté n'est pas pénalisé en soi.

### 8. Technical Leadership

À livrer : ADR, RFC, note d'arbitrage coût/risque/valeur, stratégie de migration, présentation à des publics différents, revue contradictoire, plan de mentorat et retours d'adoption.

Gate : une autre personne doit comprendre, challenger et maintenir une partie importante du système sans dépendre de l'auteur. Une adoption réelle doit être distinguée d'une simulation.

## Décisions architecturales à défendre

Tu dois explicitement comparer :

- monolithe modulaire contre services séparés ;
- batch contre streaming, ou une combinaison ;
- PostgreSQL seul contre stockage spécialisé additionnel ;
- traitement synchrone contre asynchrone ;
- règles déterministes contre modèle ML, avec possibilité documentée de conclure que le ML n'est pas justifié ;
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

| Axe                                | Points | Condition minimale                                                                                                                                                           |
| ---------------------------------- | -----: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Software Engineering               |     12 | tests de régression et qualité démontrés                                                                                                                                     |
| Backend & Databases                |     12 | migration, transactions et isolation prouvées                                                                                                                                |
| Architecture & Distributed Systems |     16 | ADR comparatif et pannes partielles démontrées                                                                                                                               |
| Cloud & DevOps                     |     12 | livraison, rollback et restauration exécutés                                                                                                                                 |
| AI Engineering                     |     12 | voie ML : évaluation, garde-fous et arrêt démontrés ; voie sans ML : décision de non-recours, preuve de valeur insuffisante, gouvernance et critères de réexamen vérifiables |
| Data Engineering                   |     14 | pipeline idempotent, qualité, streaming/batch et reprise                                                                                                                     |
| ML & Mathématiques                 |     10 | voie ML : résultats et analyse sans fuite ; voie sans ML : faisabilité des données, baseline, analyse des coûts d'erreur et protocole futur sans fuite                       |
| Leadership                         |     12 | revue contradictoire, transfert et feedback externe                                                                                                                          |

**Règles non compensatoires :** au moins 60 % dans chaque axe ; aucune note globale ne compense une faille de sécurité critique, une fuite inter-tenant, une absence de restauration ou, lorsqu'un modèle est entraîné/évalué, une fuite de données ou une évaluation ML contaminée. Les voies ML et sans ML sont deux façons recevables de démontrer le jugement AI/ML : la voie sans ML doit satisfaire les critères alternatifs explicités dans les axes 5 et 7 ; elle ne reçoit ni bonus ni malus du seul fait de ne pas déployer de modèle. Toute donnée synthétique, simulation ou hypothèse doit être étiquetée et ne peut être présentée comme une mesure réelle. 80/100 permet de déclarer le capstone maîtrisé dans son contexte ; cela ne confère pas un titre professionnel.

### Barème détaillé des axes AI Engineering et ML (même niveau d'exigence pour les deux voies)

Le choix ML ou sans ML est décidé dans un ADR avant la phase de construction, à partir de la valeur métier, de la disponibilité et qualité des données, du coût des erreurs, des risques, du coût opérationnel et d'une baseline déterministe. Le reviewer évalue la qualité du raisonnement et des preuves, pas la présence d'un modèle pour elle-même.

| Axe                | Critère                                                      | Points | Preuve attendue, quelle que soit la voie                                                                                                                           |
| ------------------ | ------------------------------------------------------------ | -----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AI Engineering     | Décision de valeur et comparaison à la baseline déterministe |      3 | Alternatives, bénéfice attendu, coût, risques et raison de retenir ou rejeter ML                                                                                   |
| AI Engineering     | Données, provenance, qualité, droits et risques              |      3 | Inventaire des données, qualité, labels, limites et contrôles ; les données absentes sont explicitement signalées                                                  |
| AI Engineering     | Évaluation et critères d'acceptation                         |      3 | Voie ML : résultats reproductibles ; voie sans ML : protocole, métriques, seuils et conditions de lancement définis avant toute future expérimentation             |
| AI Engineering     | Architecture, supervision et arrêt sûr                       |      3 | Voie ML : isolation, monitoring et kill switch ; voie sans ML : absence de dépendance runtime et conditions de réexamen                                            |
| ML & Mathématiques | Distribution, couverture et qualité des labels               |      2 | Analyse reproductible des données réellement disponibles, ou preuve précise de leur insuffisance                                                                   |
| ML & Mathématiques | Biais, dépendances temporelles et risques de fuite           |      2 | Analyse des fuites possibles et séparation temporelle conçue pour le problème                                                                                      |
| ML & Mathématiques | Baseline et comparaison                                      |      2 | Baseline déterministe mesurée ou caractérisée ; voie ML : comparaison aussi au modèle naïf                                                                         |
| ML & Mathématiques | Métriques, seuils et coûts d'erreur                          |      2 | Justification des métriques, faux positifs/faux négatifs et seuils en lien avec le métier                                                                          |
| ML & Mathématiques | Décision statistique et limites                              |      2 | Voie ML : analyse des erreurs, incertitude/calibration et limites ; voie sans ML : protocole futur préenregistré et conditions minimales nécessaires pour conclure |

**Règle d'équité :** la voie sans ML peut obtenir tous les points si ses preuves démontrent que l'adoption du modèle n'est pas justifiée avec les données, contraintes et bénéfices observables du cas. Elle ne peut pas obtenir de points pour des métriques de modèle non calculées ; elle est évaluée sur l'analyse de faisabilité et le protocole de décision alternatif décrit ci-dessus. Un jeu synthétique peut vérifier un pipeline ou illustrer une méthode, jamais prouver une performance prédictive sur le terrain.

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
- Si un modèle est retenu, les erreurs de modèle sont-elles séparées des erreurs de pipeline ? Sinon, la décision de non-recours et ses critères de réexamen sont-ils étayés ?
- Les pannes partielles et les reprises sont-elles testées ?
- Les décisions peuvent-elles être annulées ou migrées progressivement ?
- Une personne autre que l'auteur peut-elle exploiter le système ?
- Les limites et les inconnues sont-elles annoncées sans les cacher ?

Une réponse « non » devient une action, pas une phrase dans la conclusion.

## Dossier de preuve à archiver

`README`, diagrammes, ADR, RFC, schémas SQL, contrats, données disponibles et provenance, code, tests, rapports de charge, coût, SLO, threat model, matrice d'accès, runbook, plan de rollback/roll-forward, preuve de restauration, post-mortem, registre des risques et feedback externe. Si un modèle est retenu, archiver dataset, pipeline, modèle et rapport d'évaluation ML ; si aucun modèle n'est retenu, archiver la note de non-recours, l'analyse de faisabilité, la baseline et les critères de réexamen. Toutes les preuves portent un niveau de maturité, une date et une étiquette `MESURE`, `SIMULATION`, `SYNTHÉTIQUE` ou `HYPOTHÈSE` appropriée.
