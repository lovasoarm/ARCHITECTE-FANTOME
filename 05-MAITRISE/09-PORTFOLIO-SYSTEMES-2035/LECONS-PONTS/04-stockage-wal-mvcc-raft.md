---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/04-stockage-wal-mvcc-raft.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/04-stockage-wal-mvcc-raft.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 04 : WAL, MVCC et Raft : trois problèmes, trois preuves

> **Arc DBZ :** la base de données est le coffre des Dragon Balls. Écrire dedans, récupérer après destruction et se mettre d'accord entre plusieurs coffres sont trois combats différents. Ne les mélange pas dans un seul boss rush.

<!-- AF-DIAGRAM:storage -->

## Repère visuel utile : Ordre de construction du stockage

```text
bytes + I/O
   |
   v
WAL + flush + recovery
   |
   v
index (B-tree OU LSM)
   |
   v
transactions + MVCC
   |
   v
Raft (phase indépendante)
```

<!-- AF-LESSON-PROFILE: storage -->

## Résultat attendu

Expliquer les contrats de durabilité, la visibilité des versions transactionnelles et les invariants d'un consensus. Construire une petite expérience de persistance avant d'essayer la réplication.

## Pourquoi cet ordre est non négociable

Un moteur de stockage doit d’abord savoir lire et écrire des octets de façon définie. Le WAL et la récupération répondent ensuite à la question « que reste-t-il après un crash ? ». Les index et transactions ajoutent leurs propres invariants. La réplication et Raft viennent seulement après : répliquer un stockage dont la durabilité locale est floue multiplie les ambiguïtés au lieu de les corriger.

## Ordre obligatoire

```text
Fichiers + bytes + erreurs I/O
            |
            v
WAL append-only + flush + recovery
            |
            v
Index (B-tree OU LSM simplifié)
            |
            v
Transactions + isolation + MVCC
            |
            v
Raft / réplication (extension séparée)
```

## 1. I/O et durabilité

Un appel `write` peut ne faire que transmettre des octets au noyau ou à un buffer. Il faut comprendre ce qui est réellement persisté, le rôle du flush/fsync et les hypothèses du système de fichiers et du matériel. Ne promets pas une durabilité physique que ton environnement de test ne vérifie pas.

**Exercice :** écrire des records binaires versionnés avec longueur, checksum et détection de troncature. Tester fichier absent, record incomplet, checksum invalide et erreur d'écriture.

## 2. Write-ahead log et récupération

Le WAL conserve les informations nécessaires avant de considérer les modifications dépendantes comme durables. Définis commit, flush, ordre des écritures, checkpoint et replay. La récupération doit être déterministe et idempotente selon ton format.

**Exercice :** injecter un crash avant log, après append, après flush, pendant l'application à l'index et pendant le checkpoint. Compare le résultat récupéré à un modèle de référence.

## 3. Index : B-tree ou LSM

Un B-tree optimise la recherche et la mise à jour structurées ; un LSM privilégie l'écriture séquentielle puis paie la compaction et les lectures multi-niveaux. Ce sont des familles avec des compromis, pas deux cases à cocher. Commence par un seul index minimal, mesure lectures, écritures, mémoire et espace.

## 4. Transactions et MVCC

MVCC garde plusieurs versions afin que les transactions lisent un snapshot cohérent selon le niveau d'isolation choisi. Tu dois définir visibilité, timestamp/version, commit/abort, write-write conflict et garbage collection des anciennes versions. Ne revendique pas Serializable si ton moteur ne le démontre pas.

**Exercice :** écrire deux lecteurs et deux écrivains entrelacés. Préciser les valeurs visibles et les conflits attendus, puis vérifier par tests.

## 5. Consensus Raft : seulement après

Raft coordonne un journal répliqué par termes, élections, leader, réplication, quorum, commit index et snapshots. La majorité ne suffit pas à elle seule : les règles de terme et de correspondance du journal comptent pour la sûreté.

**Exercice :** commencer par un simulateur à événements déterministes. Tester messages retardés/dupliqués, partition, ancien leader, réélection, nœud en retard et réintégration. N'ajoute pas Raft au moteur avant d'avoir un WAL local fiable et des invariants écrits.

## Quand l'utiliser / quand l'éviter

Apprends ces mécanismes pour comprendre les bases de données, les garanties et les compromis systèmes. Pour un produit réel, utilise une base mature. CrazyDB est une expérience pédagogique contrôlée, jamais ton stockage unique de production.

## Limites

Un test de crash de processus n'est pas une coupure électrique physique. Un WAL n'est pas une base complète. MVCC n'est pas un niveau d'isolation à lui seul. Un Raft simplifié n'est pas un cluster sûr. Les propriétés doivent être formulées et testées séparément.

## Leçons AF et prérequis

- [Data Structures](../../../02-CONSTRUCTION/06-DATA-STRUCTURES/README.md), [Algorithms](../../../02-CONSTRUCTION/07-ALGORITHMS/README.md), [Memory & Performance](../../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/README.md).
- [Runtime, streams et buffers](../../../02-CONSTRUCTION/13-RUNTIME-ENV/03-streams_buffers.md) et [filesystem](../../../02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts/03-filesystem_ops.md).
- [Databases](../../01-DATABASES/README.md), [single-node to cluster](../../01-DATABASES/08-du_single_node_au_cluster.md), [transactions lab 65](../../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md).
- [Distributed primitives](../../02-SCALABILITY/03-distributed_primitives.md), [Distributed Arena](../../../02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/README.md).
- Choisir un seul langage système et réussir [Leçon-pont 09 : Go ou Rust](09-langage-systeme-go-rust.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : CrazyDB V1

Avant d'écrire CrazyDB, construis un programme qui écrit un journal append-only, relit le journal après redémarrage, détecte les records incomplets et compare l'état reconstruit à un modèle en mémoire. N'implémente pas Raft dans cette première tranche.

**Livrable :** format de fichier versionné, invariants de durabilité, test harness de crash, fuzz/property tests, rapport de bench et limites de l'environnement.

**Critère de sortie :** tu peux montrer chaque frontière de crash, justifier ce qui doit survivre et expliquer ce que tes tests ne prouvent pas.

## Transfert obligatoire

Le disque devient plein pendant un checkpoint et un ancien format de record doit encore être lu après évolution du schéma. Définis la récupération, la compatibilité et le rollback.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Références de projet

[09 : CrazyDB](../09-crazydb.md) · [PostgreSQL docs](https://www.postgresql.org/docs/current/) · [Raft](https://raft.github.io/).
