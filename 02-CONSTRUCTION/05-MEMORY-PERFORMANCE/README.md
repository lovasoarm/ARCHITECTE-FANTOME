---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01A-00-why-memory-performance.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01A-00-why-memory-performance.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 05 MEMORY PERFORMANCE

<!-- AF-DIAGRAM:gc -->

```text
┌────────────┐
│ Roots      │
└─────┬──────┘
      ▼
┌────────────┐     ┌────────────┐
│ reachable  │────►│ reachable  │
└────────────┘     └────────────┘

┌────────────┐
│ unreachable│ ─────► collect
└────────────┘
```

Le GC peut récupérer ce qui n’est plus atteignable depuis les racines du runtime.

> Palier `02-CONSTRUCTION`. Duree estimee : **5 h 45** (11 fichiers de travail).

## Sommaire du module

| Fichier                                                                | Objet                                                                                    | Duree  |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| [`02A-measure_first.md`](02A-measure_first.md)                         | 00 : Mesure avant d'optimiser (règle non négociable)                                     | 45 min |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                   | 00 : Prereq check : Memory & Performance                                                 | 15 min |
| [`01A-00-why-memory-performance.md`](01A-00-why-memory-performance.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : MEMORY & PERFORMANCE                               | 45 min |
| [`03A-heap_snapshot_workshop.md`](03A-heap_snapshot_workshop.md)       | 08 : Heap snapshot workshop (fuite par closure)                                          | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                     | Page verrouillée                                                                         | 30 min |
| [`04A-expliquer_a_3_publics_gc.md`](04A-expliquer_a_3_publics_gc.md)   | Garbage Collection : expliqué à 3 publics                                                | 45 min |
| [`05A-EXO_LECTURE.md`](05A-EXO_LECTURE.md)                             | EXO LECTURE : ~20 minutes : un cycle (Memoire & Perf)                                    | 20 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                     | EXO [JEUNE IA] : 02-CONSTRUCTION/05-MEMORY-PERFORMANCE                                   | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                     | EXO IA MENTEUSE : module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE                           | 10 min |
| [`99A-PONT.md`](99A-PONT.md)                                           | PONT : de mesurer une ressource à choisir la bonne structure à les structures de données | 45 min |

Total : **5 h 45**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

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

- [00 : Mesure avant d'optimiser (règle non négociable)](02A-measure_first.md)
- [00 : Prereq check : Memory & Performance](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : memory & performance](01A-00-why-memory-performance.md)
- [`01_gc/`](01_gc/README.md)
- [`02_copy_vs_ref/`](02_copy_vs_ref/README.md)
- [`03_complexity/`](03_complexity/README.md)
- [`04_profiling/`](04_profiling/README.md)
- [`05_core_web_vitals/`](05_core_web_vitals/README.md)
- [`06_jit/`](06_jit/README.md)
- [08 : Heap snapshot workshop (fuite par closure)](03A-heap_snapshot_workshop.md)
- [Page verrouillée](90-grimoire.md)
- [Garbage Collection : expliqué à 3 publics](04A-expliquer_a_3_publics_gc.md)
- [EXO LECTURE : ~20 minutes : un cycle (Memoire & Perf)](05A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/05-memory-performance](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de mesurer une ressource à choisir la bonne structure à les structures de données](99A-PONT.md)
- [Challenge : `05-MEMORY-PERFORMANCE`](95-challenge.md)
- [Grimoire : `05-MEMORY-PERFORMANCE`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Sous-parcours indexés

- [01_gc/08_fixtures](01_gc/08_fixtures/README.md)

### Ressources d'appui et vérification

- [Vérification : 11_EXO_VERIFICATION.md](11_EXO_VERIFICATION.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
