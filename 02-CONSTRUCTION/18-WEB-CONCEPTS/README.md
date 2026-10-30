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

# MODULE 18 WEB CONCEPTS

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

> Palier `02-CONSTRUCTION`. Duree estimee : **14 h 15** (20 fichiers de travail).

## Sommaire du module

| Fichier                                                                                          | Objet                                                              | Duree  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                             | 00 : Prereq check : Web Concepts                                   | 15 min |
| [`01-00-why-web-concepts.md`](01-00-why-web-concepts.md)                                         | POURQUOI CE MODULE MÉRITE TON TEMPS : WEB CONCEPTS                 | 45 min |
| [`02-http_rest_basics.md`](02-http_rest_basics.md)                                               | HTTP ET REST : LIRE UNE REQUÊTE COMME UN PROFESSIONNEL             | 45 min |
| [`50-http_rest_basics_minimini_projet.md`](50-http_rest_basics_minimini_projet.md)               | 01 http rest basics minimini projet                                | 45 min |
| [`03-browser_render_pipeline.md`](03-browser_render_pipeline.md)                                 | BROWSER RENDER PIPELINE : DE L'HTML BRUT AU PIXEL AFFICHÉ          | 45 min |
| [`51-browser_render_pipeline_minimini_projet.md`](51-browser_render_pipeline_minimini_projet.md) | 02 browser render pipeline minimini projet                         | 45 min |
| [`04-state_and_dataflow.md`](04-state_and_dataflow.md)                                           | STATE ET DATAFLOW : QUI POSSÈDE L'ÉTAT, QUI LE LIT, QUI LE MODIFIE | 45 min |
| [`52-state_and_dataflow_minimini_projet.md`](52-state_and_dataflow_minimini_projet.md)           | 03 state and dataflow minimini projet                              | 45 min |
| [`05-caching_strategies.md`](05-caching_strategies.md)                                           | CACHING STRATEGIES : METTRE EN CACHE SANS METTRE EN DANGER         | 45 min |
| [`53-caching_strategies_minimini_projet.md`](53-caching_strategies_minimini_projet.md)           | 04 caching strategies minimini projet                              | 45 min |
| [`06-auth_authz.md`](06-auth_authz.md)                                                           | AUTHENTIFICATION ET AUTORISATION : DEUX PROBLÈMES DIFFÉRENTS       | 45 min |
| [`07-serialization.md`](07-serialization.md)                                                     | SÉRIALISATION : TRANSPORTER LES DONNÉES SANS LES PERDRE            | 45 min |
| [`54-serialization_minimini_projet.md`](54-serialization_minimini_projet.md)                     | 06 serialization minimini projet                                   | 45 min |
| [`08-seo_and_rendering.md`](08-seo_and_rendering.md)                                             | SEO ET RENDERING : OÙ TON HTML NAÎT VRAIMENT                       | 45 min |
| [`55-seo_and_rendering_minimini_projet.md`](55-seo_and_rendering_minimini_projet.md)             | 07 seo and rendering minimini projet                               | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                               | Page verrouillée                                                   | 30 min |
| [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)                                                         | EXO LECTURE : 15-25 minutes (Web Concepts)                         | 45 min |
| [`97A-EXO-VERIFICATION.md`](97A-EXO-VERIFICATION.md)                                             | EXO [JEUNE IA] : 02-CONSTRUCTION/18-WEB-CONCEPTS                   | 45 min |
| [`10-web_concepts_drill_exec.md`](10-web_concepts_drill_exec.md)                                 | Web concepts : Drill exécutable                                    | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                                   | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust            | 45 min |

Total : **14 h 15**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : Web Concepts](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : web concepts](01-00-why-web-concepts.md)
- [HTTP et REST : lire une requête comme un professionnel](02-http_rest_basics.md)
- [50-http_rest_basics_minimini_projet.md](50-http_rest_basics_minimini_projet.md)
- [Browser render pipeline : de l'html brut au pixel affiché](03-browser_render_pipeline.md)
- [51-browser_render_pipeline_minimini_projet.md](51-browser_render_pipeline_minimini_projet.md)
- [State et dataflow : qui possède l'état, qui le lit, qui le modifie](04-state_and_dataflow.md)
- [52-state_and_dataflow_minimini_projet.md](52-state_and_dataflow_minimini_projet.md)
- [Caching strategies : mettre en cache sans mettre en danger](05-caching_strategies.md)
- [53-caching_strategies_minimini_projet.md](53-caching_strategies_minimini_projet.md)
- [Authentification et autorisation : deux problèmes différents](06-auth_authz.md)
- [Sérialisation : transporter les données sans les perdre](07-serialization.md)
- [54-serialization_minimini_projet.md](54-serialization_minimini_projet.md)
- [SEO et rendering : où ton HTML naît vraiment](08-seo_and_rendering.md)
- [55-seo_and_rendering_minimini_projet.md](55-seo_and_rendering_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : 15-25 minutes (Web Concepts)](09-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/18-web-concepts](97A-EXO-VERIFICATION.md)
- [Web concepts : Drill exécutable](10-web_concepts_drill_exec.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `18-WEB-CONCEPTS`](95-challenge.md)
- [Grimoire : `18-WEB-CONCEPTS`](90-grimoire.md)
- [`97-CHECKPOINT-PACK/`](97-CHECKPOINT-PACK/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-web-concepts.md`](01-00-why-web-concepts.md)
- [`02-http_rest_basics.md`](02-http_rest_basics.md)
- [`03-browser_render_pipeline.md`](03-browser_render_pipeline.md)
- [`04-state_and_dataflow.md`](04-state_and_dataflow.md)
- [`05-caching_strategies.md`](05-caching_strategies.md)
- [`06-auth_authz.md`](06-auth_authz.md)
- [`07-serialization.md`](07-serialization.md)
- [`08-seo_and_rendering.md`](08-seo_and_rendering.md)
- [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)
- [`10-web_concepts_drill_exec.md`](10-web_concepts_drill_exec.md)
- [`50-http_rest_basics_minimini_projet.md`](50-http_rest_basics_minimini_projet.md)
- [`51-browser_render_pipeline_minimini_projet.md`](51-browser_render_pipeline_minimini_projet.md)
- [`52-state_and_dataflow_minimini_projet.md`](52-state_and_dataflow_minimini_projet.md)
- [`53-caching_strategies_minimini_projet.md`](53-caching_strategies_minimini_projet.md)
- [`54-serialization_minimini_projet.md`](54-serialization_minimini_projet.md)
- [`55-seo_and_rendering_minimini_projet.md`](55-seo_and_rendering_minimini_projet.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-CHECKPOINT-PACK/97-criteres.md`](97-CHECKPOINT-PACK/97-criteres.md)
- [`97-CHECKPOINT-PACK/README.md`](97-CHECKPOINT-PACK/README.md)
- [`97A-EXO-VERIFICATION.md`](97A-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
