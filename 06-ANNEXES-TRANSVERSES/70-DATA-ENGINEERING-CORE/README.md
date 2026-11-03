---
stability: evolutif
acte: apprendre-et-pratiquer
noyau: oui
route: formation-complete
niveau: C-F
last_reviewed: 2026-10-31
prerequis:
  - 05-MAITRISE/01-DATABASES/README.md
  - 05-MAITRISE/02-SCALABILITY/README.md
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 70 : Data Engineering : du fichier au pipeline fiable

## Pourquoi ce module mérite ton temps

Un système logiciel ne traite pas seulement des requêtes : il produit, reçoit, transforme, conserve et redistribue des données. Une donnée dupliquée, tardive, mal typée ou non autorisée peut contaminer un tableau de bord, un modèle ML, une décision métier ou une facturation. Le Data Engineering apprend à rendre ce trajet explicite, mesurable, rejouable et contrôlable.

Le but n'est pas de mémoriser Kafka, Spark ou Airflow. Le but est de savoir **construire un flux de données dont on peut expliquer la provenance, la qualité, le coût, le retard, les garanties et la reprise**.

## Place dans AF

Ce module devient une étape obligatoire de la route complète, après les étapes 5 et 8 de la Route 58. L'apprenant doit déjà avoir validé Databases (SQL, transactions et idempotence) et Scalability ; il les réutilise ici au lieu de les découvrir après le laboratoire. Il renforce les axes Backend & Databases, Architecture, Cloud/DevOps, AI Engineering et Distributed Systems. Il prépare le capstone [72 : Système intégré](../72-DISTINGUISHED-SYSTEMS-CAPSTONE.md).

## Prérequis

Avant toute exécution Python, réalise ou valide par preuve la [passerelle Python pour débutants absolus](../../00-SOCLE/07-PYTHON-PASSERELLE/README.md). Elle enseigne le langage utilisé ici ; elle ne remplace pas les prérequis SQL, mathématiques ou ML propres à ce module.

- savoir lire et écrire des fichiers CSV/JSON ;
- comprendre fonctions, exceptions, tests et structures de données ;
- avoir terminé [Databases](../../05-MAITRISE/01-DATABASES/README.md) : SQL, transactions et idempotence ;
- avoir terminé [Scalability](../../05-MAITRISE/02-SCALABILITY/README.md) : charge, limites et raisonnement distribué ;
- savoir expliquer retries et leurs effets ;
- Compatibilité minimale annoncée : Python 3.12+ (bibliothèque standard uniquement) ; installation apprenant recommandée au 31 octobre 2026 : Python 3.15.x, dernier correctif de la branche stable. Python 3.12 est en sécurité uniquement et ne doit pas être conseillé comme choix d’installation par défaut. Voir [versions prises en charge](https://devguide.python.org/versions/).

Un prérequis échoué doit être repris avant d'ajouter une plateforme distribuée.

## Progression obligatoire

| Étape | Sujet                            | Ce que tu dois savoir faire                                                                    | Preuve attendue de l'apprenant                                                                           |
| ----- | -------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1     | Cycle de vie, batch et streaming | Distinguer source, ingestion, validation, transformation, stockage, exposition et consommation | Schéma de flux + contrat de données (preuve de conception)                                               |
| 2     | Ingestion batch                  | Lire des fichiers, gérer formats, encodage, checkpoints et reprises                            | Pipeline local rejouable (CORE exécutable sans service externe)                                          |
| 3     | Qualité et contrats              | Contrôler schéma, valeurs, fraîcheur, unicité, complétude et quarantaine                       | Rapport de qualité + jeux invalides (CORE exécutable localement)                                         |
| 4     | SQL analytique et modélisation   | Séparer événements bruts, données nettoyées et modèle analytique                               | DDL, requêtes et tests d'intégrité ; l'exécution SQL nécessite un serveur (extension)                    |
| 5     | Streaming et Kafka               | Raisonner sur partitions, clés, offsets, consumer groups, relecture et duplication             | Trace de livraison/rejeu + décision d'idempotence ; la preuve broker exige une exécution Kafka distincte |
| 6     | Calcul distribué et Spark        | Définir schéma, transformations, agrégations, partitions, skew et coût du shuffle              | Job reproductible, plan et mesures ; la preuve d'exécution exige Spark                                   |
| 7     | Orchestration                    | Construire un DAG idempotent, avec retries, dépendances, backfill et alertes                   | DAG, retry et reprise ; la preuve d'exécution exige Airflow ou un orchestrateur équivalent               |
| 8     | Exploitation et gouvernance      | Tracer provenance, droits, rétention, qualité, coûts, SLO et incident                          | Runbook, lineage et post-mortem ; simulation ≠ incident de production                                    |

## Laboratoire CORE local sans dépendance externe

**Statut de preuve dans cette archive :** le pipeline batch Python est fourni et ses tests locaux peuvent être rejoués avec la bibliothèque standard. Les fichiers SQL, Kafka, Spark et Airflow sont des supports d'extension : ils ne sont pas présentés comme des services lancés ni comme des intégrations validées dans cette release. Une commande ou un extrait de configuration n'est pas une preuve d'exécution.

Le noyau pratique utilise uniquement Python standard. Il ingère des mesures d'équipements, normalise les événements, rejette les lignes invalides en quarantaine, déduplique par `event_id`, écrit un manifeste et permet un rejeu idempotent.

```bash
cd lab
python run_pipeline.py --input data/events.csv --output build
python -m unittest discover -s tests -v
```

Résultats attendus avec le jeu fourni : 8 lignes lues, 3 événements acceptés, 1 identifiant dupliqué (dont 1 conflit de contenu) et 4 lignes invalides en quarantaine. Un doublon strictement identique et un identifiant réutilisé avec un contenu différent ne sont pas équivalents : le second est écrit dans `duplicate_conflicts/events.jsonl` avec les deux payloads normalisés. Le pipeline ne choisit pas silencieusement entre deux versions contradictoires. Le manifeste indique les compteurs, les empreintes SHA-256 et permet de vérifier la réconciliation `read = accepted + duplicates + quarantined`. Le pipeline doit produire les mêmes octets de sortie lorsqu'il est relancé sur la même entrée.

Le lot de 8 lignes est une fixture lisible, pas un benchmark de capacité. Les tests incluent aussi un lot généré de 3 110 lignes pour vérifier la réconciliation, les doublons stricts et la quarantaine à une échelle moins triviale. Cela reste un test local de quelques milliers de lignes, pas une preuve de débit Big Data.

## Extensions plateformes : à réaliser dans cet ordre

Les outils sont des implémentations possibles des concepts, pas des prérequis pour comprendre le premier laboratoire. Les versions ci-dessous sont une photographie documentaire datée du **31 octobre 2026** ; elles ne signifient pas que les outils ont été installés ou testés dans cette archive. Ne mélange pas des versions de runtimes au hasard.

| Technologie    | Version de référence datée | Usage pédagogique                                                  | Référence officielle                                                                                                                                     |
| -------------- | -------------------------: | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL     |                       18.6 | SQL transactionnel, contraintes, zone de staging et entrepôt       | [Politique de version](https://www.postgresql.org/support/versioning/)                                                                                   |
| Apache Kafka   |                      4.4.0 | Streaming, partitions, offsets, relecture et consumer groups       | [Téléchargements et versions supportées](https://kafka.apache.org/community/downloads/)                                                                  |
| Apache Spark   |                      4.3.0 | Traitement batch/distribué, DataFrames, shuffle et partitionnement | [Annonce officielle du 30 octobre 2026](https://spark.apache.org/news/spark-4-3-0-released.html) · [Téléchargements](https://spark.apache.org/downloads) |
| Apache Airflow |                      3.3.2 | Orchestration, DAG, retries, backfill et observabilité des tâches  | [Versions supportées](https://airflow.apache.org/docs/apache-airflow/stable/installation/supported-versions.html)                                        |

Avant d'installer une version, relis ses notes, la matrice de compatibilité avec ton Python/Java/Scala et les alertes de sécurité du fournisseur. Spark 4.3.0 est la référence documentaire publiée le 30 octobre 2026 ; son statut de version la plus récente n'en fait pas une recommandation de production ni une version testée par AF. La version la plus récente n'est pas automatiquement celle qui convient à une stack existante. Ne copie pas un tag `latest` dans un environnement reproductible.

### Extension PostgreSQL

Exécute [le schéma d'entrepôt](lab/sql/warehouse.sql) dans une base jetable PostgreSQL 15+ (PostgreSQL 18.6 est la référence datée de ce module). Vérifie les contraintes et le `ON CONFLICT`. Le fichier SQL est fourni, mais la validation dans ce paquet ne prétend pas qu'un serveur PostgreSQL a été démarré. Le `ON CONFLICT DO NOTHING` du fragment est seulement une démonstration d'unicité ; pour une ingestion réelle, compare le payload existant et place tout conflit de contenu dans une quarantaine d'investigation, comme le fait le pipeline Python.

### Extension Kafka

Crée un topic `telemetry.events` avec plusieurs partitions. Utilise `station_id` comme clé uniquement après avoir expliqué l'ordre que tu veux garantir. Provoque un arrêt du consommateur après écriture mais avant validation de l'offset ; prouve la duplication possible et protège l'écriture par une clé métier idempotente. Compare au moins une livraison « at-most-once », « at-least-once » et la portée réelle de « exactly-once » dans le périmètre choisi.

### Extension Spark

Lis les événements avec un schéma explicite. Compare une agrégation locale et une agrégation distribuée ; observe le shuffle, le partitionnement et le skew. Ajoute un événement tardif et définis une politique de watermark. Ne présente pas un job Spark qui lit 20 lignes comme une preuve de scalabilité.

### Extension Airflow

Orchestre `extract → validate → load → quality_check`. Chaque tâche de chargement doit être idempotente. Provoque un échec après écriture partielle, lance un retry puis un backfill. Le DAG ne doit ni doubler les lignes ni déclarer le lot complet avant le contrôle qualité.

## Patterns techniques à savoir lire et adapter

Les extraits suivants sont des points de départ pédagogiques, pas des jobs de production certifiés ni des preuves d'exécution. Ils doivent être exécutés avec des versions compatibles et adaptés au schéma réel. Dans cette archive, seule la partie batch Python locale dispose d'une suite de tests autonome ; les extensions SQL/Kafka/Spark/Airflow restent `DECLARED` tant qu'elles ne sont pas exécutées dans leurs environnements respectifs.

### Kafka : créer un topic, produire et consommer

```bash
# Exemple pour une installation locale Apache Kafka 4.x.
# Les options exactes sont à confirmer avec --help de la distribution utilisée.
bin/kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic telemetry.events --partitions 6 --replication-factor 1

# Le producteur console lit une ligne JSON par événement.
bin/kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic telemetry.events --property parse.key=true --property key.separator=:

# Le consommateur utilise un groupe nommé : les offsets sont suivis par groupe.
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic telemetry.events --group af-lab-consumer --from-beginning
```

Envoie des clés `station-001` et `station-002`, arrête le consommateur après avoir écrit une ligne en base mais avant de valider son offset, puis redémarre-le. Explique pourquoi un message peut être rejoué. La clé Kafka seule ne garantit pas l'idempotence de ta base : ajoute une contrainte unique sur `event_id` et rends l'écriture transactionnelle.

### Spark : schéma explicite, temps événementiel et agrégation

```python
from pyspark.sql import SparkSession, functions as F
from pyspark.sql.types import (
    StructType, StructField, StringType, TimestampType, DoubleType
)

schema = StructType([
    StructField("event_id", StringType(), nullable=False),
    StructField("station_id", StringType(), nullable=False),
    StructField("occurred_at", TimestampType(), nullable=False),
    StructField("temperature_c", DoubleType(), nullable=False),
])

spark = SparkSession.builder.appName("af-telemetry-lab").getOrCreate()
events = (spark.read.schema(schema).json("data/events/*.json")
    .filter(F.col("event_id").isNotNull())
    .filter(F.col("temperature_c").isNotNull()))

hourly = (events
    .groupBy(F.window("occurred_at", "1 hour"), "station_id")
    .agg(F.avg("temperature_c").alias("avg_temperature_c"),
         F.countDistinct("event_id").alias("event_count")))

hourly.explain("formatted")
```

Ce snippet montre le schéma, le groupement temporel et l'inspection du plan ; il ne démontre pas encore le streaming. Pour l'extension streaming, utilise `readStream`, définis un watermark justifié par le retard métier, traite les doublons avec une clé stable, écris vers un sink compatible et teste le redémarrage depuis un checkpoint. Mesure le shuffle et le skew sur un volume suffisant ; `explain()` seul n'est pas un benchmark.

### Airflow : l'orchestration ne remplace pas l'idempotence

Construis un DAG versionné avec quatre tâches explicites : `extract`, `validate`, `load`, `quality_check`. Chaque tâche doit recevoir un identifiant de lot déterministe (par exemple date logique + partition source), enregistrer son état et pouvoir être relancée sans double effet. Documente retries, timeout, pool/concurrency, dépendances, backfill et alerte. Avec Airflow 3.x, lis la documentation de l'API stable et le guide de migration avant de reprendre un exemple d'une version 2.x : ne copie pas un DAG ancien en supposant les mêmes imports et comportements.

### Contrat de livraison de plateforme

Pour chaque extension Kafka/Spark/Airflow, conserve : version exacte, commande d'installation, sortie de `--version`, données d'entrée, configuration expurgée, test de panne, métriques observées et limites. Si l'outil n'est pas disponible, marque l'étape `NON_EXECUTEE` ; une capture ou un diagramme ne doit pas devenir une preuve d'exécution.

## Contrat de données minimal

Chaque événement doit posséder :

- un identifiant métier stable (`event_id`) ;
- un identifiant de source (`station_id`) ;
- un temps d'événement avec fuseau explicite (`occurred_at`) ;
- un nom de mesure contractuel (`metric`) ;
- une valeur numérique finie et une unité connue ;
- une version de schéma ou un contrat d'évolution documenté.

Sépare temps d'événement, temps d'ingestion et temps de traitement. Un événement arrivé maintenant peut décrire une mesure vieille de dix minutes.

## Ce que tu dois rendre

1. Schéma de flux avec producteurs, consommateurs, zones et frontières de confiance.
2. Contrat versionné et règle de compatibilité.
3. Pipeline local vert, tests positifs/négatifs, quarantaine et manifeste.
4. Requête SQL, contrôle d'intégrité et explication des index.
5. Scénario Kafka de duplication/relecture et décision d'idempotence.
6. Job Spark avec schéma explicite, plan d'exécution et mesure du shuffle.
7. DAG orchestré, retry, backfill et preuve de reprise.
8. Runbook : fraîcheur, volume, erreurs, lag, coût, accès, rétention et restauration.
9. ADR comparant au moins deux architectures, y compris l'option plus simple sans streaming si elle suffit.

## Gate de sortie

Tu réussis lorsque tu peux démontrer, pas simplement raconter :

- la même entrée rejouée ne double pas les sorties ;
- une donnée invalide est visible et isolée, pas silencieusement supprimée ;
- une donnée tardive suit une règle explicite ;
- un échec se reprend sans corrompre le lot ;
- la provenance de la donnée est retraçable ;
- un consommateur ne lit pas des données auxquelles il n'a pas droit ;
- les coûts et la latence sont mesurés sur une charge décrite ;
- le choix batch/streaming/outil est justifié par le besoin, pas par la mode.

**Barrière anti-survente :** le laboratoire Python et les simulations de raisonnement prouvent uniquement les comportements qu'ils exécutent localement. Ils ne prouvent ni l'interopérabilité d'un broker Kafka, ni les performances d'un cluster Spark, ni l'orchestration réelle par Airflow, ni une exploitation Big Data à grande échelle, ni une expérience de production, ni un niveau Staff/Principal/Distinguished. Pour les extensions non lancées, inscris `NOT RUN` ; ne transforme jamais un scénario décrit en test réussi.

## Références de progression

- [Bases SQL et transactions](../../05-MAITRISE/01-DATABASES/README.md)
- [Scalabilité et systèmes distribués](../../05-MAITRISE/02-SCALABILITY/README.md)
- [Lab DevOps](../59-LAB-DEVOPS-LIFECYCLE.md)
- [Lab IA/RAG](../60-LAB-SERVICE-IA-END-TO-END.md)
- [Capstone intégré](../72-DISTINGUISHED-SYSTEMS-CAPSTONE.md)
