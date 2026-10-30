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

# MODULE 01 DATABASES

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `05-MAITRISE`. Duree estimee : **9 h 45** (14 fichiers de travail).

## Sommaire du module

| Fichier                                                                      | Objet                                                          | Duree  |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                         | 00 : Prereq check : Databases                                  | 15 min |
| [`01-00-why-databases.md`](01-00-why-databases.md)                           | POURQUOI CE MODULE MÉRITE TON TEMPS : DATABASES                | 45 min |
| [`02-sql_basics.md`](02-sql_basics.md)                                       | Parler à une base relationnelle sans la supplier               | 45 min |
| [`03-nosql_basics.md`](03-nosql_basics.md)                                   | Quand ranger en tables fait plus de mal que de bien            | 45 min |
| [`04-data_modeling.md`](04-data_modeling.md)                                 | Le plan avant les murs                                         | 45 min |
| [`50-data_modeling_minimini_projet.md`](50-data_modeling_minimini_projet.md) | 03 data modeling minimini projet                               | 45 min |
| [`05-redis_caching.md`](05-redis_caching.md)                                 | Se souvenir vite pour ne pas redemander à chaque fois          | 45 min |
| [`06-db_in_js.md`](06-db_in_js.md)                                           | Connecter ton code à la DB sans te perdre dans l'abstraction   | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                           | Page verrouillée                                               | 30 min |
| [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)                                     | EXO LECTURE : 15-25 minutes (Databases)                        | 45 min |
| [`09-EXO-VERIFICATION.md`](09-EXO-VERIFICATION.md)                           | Exercice 09 : analyse de risque d’une suppression multi-tenant | 30 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                           | Exercice 97 : laboratoire transactionnel PostgreSQL            | 60 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                               | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust        | 45 min |
| [`08-du_single_node_au_cluster.md`](08-du_single_node_au_cluster.md)         | Du single-node au cluster : le pont vers le distribué          | 45 min |

Total : **9 h 45**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : Databases](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : databases](01-00-why-databases.md)
- [Parler à une base relationnelle sans la supplier](02-sql_basics.md)
- [Quand ranger en tables fait plus de mal que de bien](03-nosql_basics.md)
- [Le plan avant les murs](04-data_modeling.md)
- [50-data_modeling_minimini_projet.md](50-data_modeling_minimini_projet.md)
- [Se souvenir vite pour ne pas redemander à chaque fois](05-redis_caching.md)
- [Connecter ton code à la DB sans te perdre dans l'abstraction](06-db_in_js.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Databases)](07-EXO_LECTURE.md)
- [Exercice 09 : analyse de risque multi-tenant](09-EXO-VERIFICATION.md)
- [Exercice 97 : laboratoire transactionnel PostgreSQL](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Du single-node au cluster : le pont vers le distribué](08-du_single_node_au_cluster.md)
- [Challenge : `01-DATABASES`](95-challenge.md)
- [Grimoire : `01-DATABASES`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [EXO : Vérifier une IA séduisante](10-EXO-VERIFICATION.md)

## Standard de complétude et audit
