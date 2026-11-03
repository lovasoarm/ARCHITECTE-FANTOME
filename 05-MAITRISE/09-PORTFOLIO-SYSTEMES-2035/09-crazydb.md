---
stability: evolutif
acte: maitrise
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

# 09 : CrazyDB

> Moteur de stockage pédagogique : WAL, crash recovery, MVCC et réplication Raft en profondeur.

**Place dans le parcours :** Très avancé : projet de systèmes bas niveau ; à fractionner en versions.  
**Prérequis :** Structures de données, complexité, fichiers/I/O, concurrence, transactions et un seul langage système (Go ou Rust) validé par la preuve de sortie du [pont 09](LECONS-PONTS/09-langage-systeme-go-rust.md). AF fournit le parcours guidé et les critères ; l'apprentissage du langage s'appuie aussi sur sa documentation officielle et ses exercices. La simple lecture du pont ne vaut pas acquisition. Si ces prérequis ne sont pas démontrés, différer plutôt que copier un moteur généré.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

Ce projet est le plus bas niveau du portefeuille. Ne le commence pas parce que tu sais faire des requêtes SQL.

1. [Structures de données](../../02-CONSTRUCTION/06-DATA-STRUCTURES/README.md), [algorithmes](../../02-CONSTRUCTION/07-ALGORITHMS/README.md), [memory/performance](../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/README.md).
2. [Streams/buffers](../../02-CONSTRUCTION/13-RUNTIME-ENV/03-streams_buffers.md), [filesystem](../../02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts/03-filesystem_ops.md), [worker threads](../../02-CONSTRUCTION/13-RUNTIME-ENV/06A-worker_threads.md).
3. [Databases](../01-DATABASES/README.md), [du single-node au cluster](../01-DATABASES/08-du_single_node_au_cluster.md), [Lab transactions 65](../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md).
4. [Distributed primitives](../02-SCALABILITY/03-distributed_primitives.md) et [Distributed Arena](../../02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/README.md).
5. Choisis **Go ou Rust** et suis le [pont langage système 09](LECONS-PONTS/09-langage-systeme-go-rust.md) jusqu'à sa preuve `READY` (les ressources officielles de langage font partie du parcours). Étudie ensuite [WAL/MVCC/Raft : pont 04](LECONS-PONTS/04-stockage-wal-mvcc-raft.md).

**Gate d'entrée :** tu as un verdict `READY` documenté du [pont Go/Rust 09](LECONS-PONTS/09-langage-systeme-go-rust.md), tu peux écrire et relire des bytes, définir un format de record, gérer erreur I/O, écrire des tests de concurrence et expliquer commit/flush/recovery. `Pont lu` ou `code généré qui compile` ne suffit pas. Si tu n'as pas pratiqué Go ou Rust, diffère CrazyDB. Raft est une extension après WAL local et transactions ; ce n'est pas une étape V1. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-3--routes-spécialisées).

## Mission

Comprendre expérimentalement la persistance et le consensus en implémentant une petite base pédagogique. C’est un travail de recherche/apprentissage sur invariants et pannes, pas une solution exploitable pour des données importantes.

## Version de départ : obligatoire

- [ ] V1 : journal append-only/WAL, format de page ou record versionné, checksum, flush explicite, récupération après crash et corruption détectée.
- [ ] Créer un petit modèle transactionnel local ; définir exactement ce que commit signifie et quelles opérations sont atomiques.
- [ ] V2 : choisir un index (B-tree ou LSM simplifié, pas les deux au départ) ; mesurer compromis lecture/écriture, espace et compaction si LSM.
- [ ] V3 : introduire MVCC uniquement après une version WAL stable ; expliquer visibilité des versions, snapshots, conflits et nettoyage des anciennes versions.
- [ ] Utiliser property-based/fuzz testing et un modèle de référence simple pour vérifier invariants sur des séquences aléatoires.
- [ ] Faire des crashs déterministes à chaque frontière d’écriture : avant log, après log, après flush, avant/across index/checkpoint, et comparer l’état récupéré aux garanties promises.

## Extensions Depth : une à la fois

- [ ] V4 séparée : répliquer un journal via Raft ou un protocole étudié sérieusement ; définir term, log matching, commit index, quorum, leader changes et snapshots.
- [ ] Tester partitions, messages retardés/dupliqués, restart de nœud, perte d’un leader, nœud en retard et rejoin.
- [ ] Écrire une preuve/invariant lisible pour chaque safety property et un test qui la falsifie en cas de bug.

## Tests d’acceptation

- [ ] Une transaction acquittée respecte les garanties de durabilité définies après un crash dans la plage couverte par les tests.
- [ ] La récupération est idempotente et n’applique pas deux fois la même opération.
- [ ] Le générateur de séquences confronte l’état du moteur à une implémentation de référence.
- [ ] Pour Raft, aucune écriture n’est déclarée commit à partir d’une majorité qui ne respecte pas les règles de quorum/terme ; les scénarios de split-brain sont testés.

## Dossier de preuves attendu

Spécification des invariants, format de WAL, code Rust ou Go, harness de panne, fuzz/property tests, bench reproductible, ADR index/MVCC, postmortem d’un bug de récupération. Si Raft : rapport de sûreté distinct.

## Hors périmètre et limites

Ne jamais utiliser CrazyDB comme unique stockage pour un produit réel ou données irremplaçables. Pas besoin d’implémenter WAL+MVCC+Raft simultanément : chaque version doit avoir une spécification, des tests et une sortie indépendante.

## Ponts vers AF

[Leçon : WAL, MVCC et Raft](LECONS-PONTS/04-stockage-wal-mvcc-raft.md), [Distributed Arena](../../02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/README.md), [Bases de données](../01-DATABASES/README.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
