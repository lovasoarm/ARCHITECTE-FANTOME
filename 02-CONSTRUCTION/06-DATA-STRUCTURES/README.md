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

# MODULE 06 DATA STRUCTURES

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `02-CONSTRUCTION`. Duree estimee : **5 h 15** (8 fichiers de travail).

## Sommaire du module

| Fichier                                                          | Objet                                                       | Duree  |
| ---------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| [`02A-navigation.md`](02A-navigation.md)                         | NAVIGATION : DATA STRUCTURES EN 3 PALIERS                   | 45 min |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                             | 00 : Prereq check : Data Structures                         | 15 min |
| [`01A-00-why-data-structures.md`](01A-00-why-data-structures.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : DATA STRUCTURES       | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                               | Page verrouillée                                            | 30 min |
| [`03A-EXO_LECTURE.md`](03A-EXO_LECTURE.md)                       | EXO LECTURE : 15-25 minutes (Structures de donnees)         | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)               | EXO [JEUNE IA] : 02-CONSTRUCTION/06-DATA-STRUCTURES         | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)               | EXO IA MENTEUSE : module 02-CONSTRUCTION/06-DATA-STRUCTURES | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                     | PONT : de stocker à traiter à les algorithmes               | 45 min |

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

- [Navigation : data structures en 3 paliers](02A-navigation.md)
- [00 : Prereq check : Data Structures](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : data structures](01A-00-why-data-structures.md)
- [`01_array/`](01_array/README.md)
- [`02_linked_list/`](02_linked_list/README.md)
- [`03_stack/`](03_stack/README.md)
- [`04_queue/`](04_queue/README.md)
- [`05_heap/`](05_heap/README.md)
- [`06_bst/`](06_bst/README.md)
- [`07_hash_table/`](07_hash_table/README.md)
- [`08_graphs/`](08_graphs/README.md)
- [`09_advanced_bonus/`](09_advanced_bonus/README.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Structures de donnees)](03A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/06-data-structures](12_EXO_VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/06-DATA-STRUCTURES](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de stocker à traiter à les algorithmes](99A-PONT.md)
- [Challenge : `06-DATA-STRUCTURES`](95-challenge.md)
- [Grimoire : `06-DATA-STRUCTURES`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Vérification : 12_EXO_VERIFICATION.md](12_EXO_VERIFICATION.md)

## Standard de complétude et audit
