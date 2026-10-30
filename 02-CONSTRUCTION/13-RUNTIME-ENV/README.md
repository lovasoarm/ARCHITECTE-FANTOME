---
stability: evolutif
acte: parcours
noyau: oui
route: complete
paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING
expert_review: pending
paper_audit_date: 2026-10-30
terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT
---

# MODULE 13 RUNTIME ENV

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `02-CONSTRUCTION`. Duree estimee : **7 h 30** (11 fichiers de travail).

## Sommaire du module

| Fichier                                                | Objet                                                           | Duree  |
| ------------------------------------------------------ | --------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                   | 00 : Prereq check : Runtime Environment                         | 15 min |
| [`01-00-why-runtime-env.md`](01-00-why-runtime-env.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : RUNTIME ENVIRONMENT       | 45 min |
| [`02-node_vs_browser.md`](02-node_vs_browser.md)       | NODE VS BROWSER : MÊME JS, DEUX PLANÈTES                        | 45 min |
| [`03-streams_buffers.md`](03-streams_buffers.md)       | STREAMS ET BUFFERS : LIRE SANS AVALER                           | 45 min |
| [`04-commonjs_vs_esm.md`](04-commonjs_vs_esm.md)       | COMMONJS VS ESM : L'HISTOIRE D'UNE GUERRE QUI N'EST PAS FINIE   | 45 min |
| [`05-process_env_argv.md`](05-process_env_argv.md)     | PROCESS.ENV ET PROCESS.ARGV : LA CONFIG QUI NE SE HARD-CODE PAS | 45 min |
| [`06A-worker_threads.md`](06A-worker_threads.md)       | WORKER THREADS : PARALLÉLISER SANS BLOQUER L'EVENT LOOP         | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                     | Page verrouillée                                                | 30 min |
| [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)               | EXO LECTURE : 15-25 minutes (Runtime & Env)                     | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)     | EXO [JEUNE IA] : 02-CONSTRUCTION/13-RUNTIME-ENV                 | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)         | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust         | 45 min |

Total : **7 h 30**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

## Comment travailler ce module

1. Commence par [`00-PREREQUIS.md`](00-PREREQUIS.md). Si un prérequis échoue, remonte vers la ressource indiquée au lieu de deviner.
2. Lis la leçon « pourquoi ce module » lorsqu'elle figure dans le parcours, puis suis l'ordre du sommaire. Les sous-dossiers ont leur propre README lorsqu'un sous-parcours est nécessaire.
3. Après chaque concept, réalise l'exercice ou le mini-projet explicitement associé. Une leçon peut intégrer sa pratique dans une section `EXERCICES` ; ne suppose pas qu'un fichier séparé existe.
4. Avant toute exécution, lis [`SETUP.md`](SETUP.md) et vérifie la version, le dossier courant, les données de départ et la commande attendue. Lorsqu'un outil externe manque, utilise uniquement le mode papier/simulation décrit par l'activité et marque le résultat comme simulé.
5. Fais le challenge `95-challenge.md`, puis le boss `96-boss-fight.md` **seulement s'il existe dans ce module**. À défaut de boss séparé, le challenge et les checkpoints/critères liés constituent la vérification annoncée : aucun boss non fourni n'est supposé.
6. Le grimoire se lit après la pratique. Consigne la preuve, le résultat des vérifications, les limites non testées et la date dans ton journal de progression.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Runtime Environment](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : runtime environment](01-00-why-runtime-env.md)
- [Node vs browser : même JS, deux planètes](02-node_vs_browser.md)
- [Streams et buffers : lire sans avaler](03-streams_buffers.md)
- [Commonjs vs ESM : l'histoire d'une guerre qui n'est pas finie](04-commonjs_vs_esm.md)
- [Process.env et process.argv : la config qui ne se hard-code pas](05-process_env_argv.md)
- [Worker threads : paralléliser sans bloquer l'event loop](06A-worker_threads.md)
- [`06_node_cli_scripts/`](06_node_cli_scripts/README.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Runtime & Env)](07-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/13-runtime-env](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `13-RUNTIME-ENV`](95-challenge.md)
- [Grimoire : `13-RUNTIME-ENV`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-runtime-env.md`](01-00-why-runtime-env.md)
- [`02-node_vs_browser.md`](02-node_vs_browser.md)
- [`03-streams_buffers.md`](03-streams_buffers.md)
- [`04-commonjs_vs_esm.md`](04-commonjs_vs_esm.md)
- [`05-process_env_argv.md`](05-process_env_argv.md)
- [`06A-worker_threads.md`](06A-worker_threads.md)
- [`06_node_cli_scripts/02-cli_basics.md`](06_node_cli_scripts/02-cli_basics.md)
- [`06_node_cli_scripts/03-filesystem_ops.md`](06_node_cli_scripts/03-filesystem_ops.md)
- [`06_node_cli_scripts/04-automation_scripts.md`](06_node_cli_scripts/04-automation_scripts.md)
- [`06_node_cli_scripts/05-cli_tool_builder.md`](06_node_cli_scripts/05-cli_tool_builder.md)
- [`06_node_cli_scripts/README.md`](06_node_cli_scripts/README.md)
- [`06_node_cli_scripts/SETUP.md`](06_node_cli_scripts/SETUP.md)
- [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
