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

# MODULE 02 SCALABILITY

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `05-MAITRISE`. Duree estimee : **11 h 23** (16 fichiers de travail).

## Sommaire du module

| Fichier                                                                        | Objet                                                                                     | Duree  |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                           | 00 : Prereq check : Scalability                                                           | 15 min |
| [`01-00-why-scalability.md`](01-00-why-scalability.md)                         | POURQUOI CE MODULE MÉRITE TON TEMPS : SCALABILITY                                         | 45 min |
| [`02-distributed_thinking.md`](02-distributed_thinking.md)                     | Distributed thinking (sans K8s, sans buzz)                                                | 45 min |
| [`03-distributed_primitives.md`](03-distributed_primitives.md)                 | Primitives distribuées : les bases qu'on te demandera en entretien                        | 45 min |
| [`04-distributed_fallacies.md`](04-distributed_fallacies.md)                   | Les 8 sophismes du distribué (fallacies)                                                  | 45 min |
| [`05-load_balancing.md`](05-load_balancing.md)                                 | Un seul serveur ne suffit jamais longtemps                                                | 45 min |
| [`06-horizontal_vs_vertical.md`](06-horizontal_vs_vertical.md)                 | Grossir un serveur ou en ajouter dix                                                      | 45 min |
| [`07-rate_limiting.md`](07-rate_limiting.md)                                   | Protéger ton API sans punir les gens honnêtes                                             | 45 min |
| [`50-rate_limiting_minimini_projet.md`](50-rate_limiting_minimini_projet.md)   | 06 rate limiting minimini projet                                                          | 45 min |
| [`08-message_queues.md`](08-message_queues.md)                                 | Découpler pour ne pas tout bloquer en chaîne                                              | 45 min |
| [`51-message_queues_minimini_projet.md`](51-message_queues_minimini_projet.md) | 07 message queues minimini projet                                                         | 45 min |
| [`09-b_hypotheses_panne_distribuee.md`](09-b_hypotheses_panne_distribuee.md)   | Hypothèses en panne distribuée : le pont que personne ne fait spontanément                | 45 min |
| [`10-c_tests_de_resilience.md`](10-c_tests_de_resilience.md)                   | Tests de résilience : prouver qu'une panne d'un service dépendant ne coule pas les autres | 8 min  |
| [`90-grimoire.md`](90-grimoire.md)                                             | Page verrouillée                                                                          | 30 min |
| [`11-EXO_LECTURE.md`](11-EXO_LECTURE.md)                                       | EXO LECTURE : 15-25 minutes (Scalabilite)                                                 | 45 min |
| [`97A-EXO-VERIFICATION.md`](97A-EXO-VERIFICATION.md)                           | EXO [JEUNE IA] : 05-MAITRISE/02-SCALABILITY                                               | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                 | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                                   | 45 min |

Total : **11 h 23**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : Scalability](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : scalability](01-00-why-scalability.md)
- [Distributed thinking (sans K8s, sans buzz)](02-distributed_thinking.md)
- [Primitives distribuées : les bases qu'on te demandera en entretien](03-distributed_primitives.md)
- [Les 8 sophismes du distribué (fallacies)](04-distributed_fallacies.md)
- [Un seul serveur ne suffit jamais longtemps](05-load_balancing.md)
- [Grossir un serveur ou en ajouter dix](06-horizontal_vs_vertical.md)
- [Protéger ton API sans punir les gens honnêtes](07-rate_limiting.md)
- [50-rate_limiting_minimini_projet.md](50-rate_limiting_minimini_projet.md)
- [Découpler pour ne pas tout bloquer en chaîne](08-message_queues.md)
- [51-message_queues_minimini_projet.md](51-message_queues_minimini_projet.md)
- [Hypothèses en panne distribuée : le pont que personne ne fait spontanément](09-b_hypotheses_panne_distribuee.md)
- [Tests de résilience : prouver qu'une panne d'un service dépendant ne coule pas les autres](10-c_tests_de_resilience.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Scalabilite)](11-EXO_LECTURE.md)
- [EXO [jeune IA] : 05-maitrise/02-scalability](97A-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `02-SCALABILITY`](95-challenge.md)
- [Grimoire : `02-SCALABILITY`](90-grimoire.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-scalability.md`](01-00-why-scalability.md)
- [`02-distributed_thinking.md`](02-distributed_thinking.md)
- [`03-distributed_primitives.md`](03-distributed_primitives.md)
- [`04-distributed_fallacies.md`](04-distributed_fallacies.md)
- [`05-load_balancing.md`](05-load_balancing.md)
- [`06-horizontal_vs_vertical.md`](06-horizontal_vs_vertical.md)
- [`07-rate_limiting.md`](07-rate_limiting.md)
- [`08-message_queues.md`](08-message_queues.md)
- [`09-b_hypotheses_panne_distribuee.md`](09-b_hypotheses_panne_distribuee.md)
- [`10-c_tests_de_resilience.md`](10-c_tests_de_resilience.md)
- [`11-EXO_LECTURE.md`](11-EXO_LECTURE.md)
- [`50-rate_limiting_minimini_projet.md`](50-rate_limiting_minimini_projet.md)
- [`51-message_queues_minimini_projet.md`](51-message_queues_minimini_projet.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-CHECKPOINT-PACK/97-criteres.md`](97-CHECKPOINT-PACK/97-criteres.md)
- [`97-CHECKPOINT-PACK/README.md`](97-CHECKPOINT-PACK/README.md)
- [`97A-EXO-VERIFICATION.md`](97A-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
