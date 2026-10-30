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

# MODULE 12 TYPESCRIPT

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `02-CONSTRUCTION`. Duree estimee : **5 h 15** (9 fichiers de travail).

## Sommaire du module

| Fichier                                                | Objet                                                                                         | Duree  |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                   | 00 : Prereq check : TypeScript                                                                | 15 min |
| [`01A-00-why-typescript.md`](01A-00-why-typescript.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : TYPESCRIPT                                              | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                     | Page verrouillée                                                                              | 30 min |
| [`02A-EXO_LECTURE.md`](02A-EXO_LECTURE.md)             | EXO LECTURE : 15-25 minutes (TypeScript)                                                      | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)     | EXO [JEUNE IA] : 02-CONSTRUCTION/12-TYPESCRIPT                                                | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)     | EXO IA MENTEUSE : module 02-CONSTRUCTION/12-TYPESCRIPT                                        | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)         | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                                       | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                           | PONT : de typer du code à connaître le sol sur lequel il tourne à l'environnement d'exécution | 45 min |

Total : **5 h 15**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : TypeScript](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : typescript](01A-00-why-typescript.md)
- [`01_ts_basics/`](01_ts_basics/README.md)
- [`02_ts_intermediate/`](02_ts_intermediate/README.md)
- [`03_ts_advanced/`](03_ts_advanced/README.md)
- [Page verrouillée](90-grimoire.md)
- [`04_typescript_tooling/`](04_typescript_tooling/README.md)
- [EXO LECTURE : 15-25 minutes (TypeScript)](02A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/12-typescript](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/12-TYPESCRIPT](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de typer du code à connaître le sol sur lequel il tourne à l'environnement d'exécution](99A-PONT.md)
- [Challenge : `12-TYPESCRIPT`](95-challenge.md)
- [Grimoire : `12-TYPESCRIPT`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01A-00-why-typescript.md`](01A-00-why-typescript.md)
- [`01_ts_basics/02-types_and_interfaces.md`](01_ts_basics/02-types_and_interfaces.md)
- [`01_ts_basics/03-functions_typed.md`](01_ts_basics/03-functions_typed.md)
- [`01_ts_basics/04-classes_typed.md`](01_ts_basics/04-classes_typed.md)
- [`01_ts_basics/50-types_and_interfaces_minimini_projet.md`](01_ts_basics/50-types_and_interfaces_minimini_projet.md)
- [`01_ts_basics/51-functions_typed_minimini_projet.md`](01_ts_basics/51-functions_typed_minimini_projet.md)
- [`01_ts_basics/52-classes_typed_minimini_projet.md`](01_ts_basics/52-classes_typed_minimini_projet.md)
- [`01_ts_basics/README.md`](01_ts_basics/README.md)
- [`02A-EXO_LECTURE.md`](02A-EXO_LECTURE.md)
- [`02_ts_intermediate/02-generics.md`](02_ts_intermediate/02-generics.md)
- [`02_ts_intermediate/03-utility_types.md`](02_ts_intermediate/03-utility_types.md)
- [`02_ts_intermediate/04-union_intersection.md`](02_ts_intermediate/04-union_intersection.md)
- [`02_ts_intermediate/05-type_guards.md`](02_ts_intermediate/05-type_guards.md)
- [`02_ts_intermediate/50-generics_minimini_projet.md`](02_ts_intermediate/50-generics_minimini_projet.md)
- [`02_ts_intermediate/51-utility_types_minimini_projet.md`](02_ts_intermediate/51-utility_types_minimini_projet.md)
- [`02_ts_intermediate/52-union_intersection_minimini_projet.md`](02_ts_intermediate/52-union_intersection_minimini_projet.md)
- [`02_ts_intermediate/53-type_guards_minimini_projet.md`](02_ts_intermediate/53-type_guards_minimini_projet.md)
- [`02_ts_intermediate/README.md`](02_ts_intermediate/README.md)
- [`03_ts_advanced/02-conditional_types.md`](03_ts_advanced/02-conditional_types.md)
- [`03_ts_advanced/03-mapped_types.md`](03_ts_advanced/03-mapped_types.md)
- [`03_ts_advanced/04-ts_in_real_project.md`](03_ts_advanced/04-ts_in_real_project.md)
- [`03_ts_advanced/50-conditional_types_minimini_projet.md`](03_ts_advanced/50-conditional_types_minimini_projet.md)
- [`03_ts_advanced/51-mapped_types_minimini_projet.md`](03_ts_advanced/51-mapped_types_minimini_projet.md)
- [`03_ts_advanced/52-ts_in_real_project_minimini_projet.md`](03_ts_advanced/52-ts_in_real_project_minimini_projet.md)
- [`03_ts_advanced/README.md`](03_ts_advanced/README.md)
- [`04_typescript_tooling/01-00-why-typescript-tooling.md`](04_typescript_tooling/01-00-why-typescript-tooling.md)
- [`04_typescript_tooling/02-declaration_files.md`](04_typescript_tooling/02-declaration_files.md)
- [`04_typescript_tooling/03-ts_compiler_config.md`](04_typescript_tooling/03-ts_compiler_config.md)
- [`04_typescript_tooling/04-ts_migration_guide.md`](04_typescript_tooling/04-ts_migration_guide.md)
- [`04_typescript_tooling/50-ts_compiler_config_minimini_projet.md`](04_typescript_tooling/50-ts_compiler_config_minimini_projet.md)
- [`04_typescript_tooling/90-grimoire.md`](04_typescript_tooling/90-grimoire.md)
- [`04_typescript_tooling/README.md`](04_typescript_tooling/README.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`99A-PONT.md`](99A-PONT.md)
- [`SETUP.md`](SETUP.md)
