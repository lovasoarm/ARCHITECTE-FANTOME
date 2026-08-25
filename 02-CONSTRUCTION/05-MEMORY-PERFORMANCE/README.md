---
stability: evolutif
acte: parcours
noyau: oui
route: complete
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

> Palier `02-CONSTRUCTION`. Duree estimee : **6 h 45** (11 fichiers de travail).

## Sommaire du module

| Fichier                                                                | Objet                                                                                    | Duree  |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| [`02A-measure_first.md`](02A-measure_first.md)                         | 00 : Mesure avant d'optimiser (règle non négociable)                                     | 45 min |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                   | 00 : Prereq check : Memory & Performance                                                 | 15 min |
| [`01A-00-why-memory-performance.md`](01A-00-why-memory-performance.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : MEMORY & PERFORMANCE                               | 45 min |
| [`03A-heap_snapshot_workshop.md`](03A-heap_snapshot_workshop.md)       | 08 : Heap snapshot workshop (fuite par closure)                                          | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                     | Page verrouillée                                                                         | 30 min |
| [`04A-expliquer_a_3_publics_gc.md`](04A-expliquer_a_3_publics_gc.md)   | Garbage Collection : expliqué à 3 publics                                                | 45 min |
| [`05A-EXO_LECTURE.md`](05A-EXO_LECTURE.md)                             | EXO LECTURE : 15-25 minutes (Memoire & Perf)                                             | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                     | EXO [JEUNE IA] : 02-CONSTRUCTION/05-MEMORY-PERFORMANCE                                   | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                     | EXO IA MENTEUSE : module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE                           | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                           | PONT : de mesurer une ressource à choisir la bonne structure à les structures de données | 45 min |

Total : **6 h 45**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

## Comment travailler ce module

1. Ouvre d abord le fichier `00_why_*` s il existe : il dit pourquoi le module merite ton temps.
2. Passe le controle de prerequis. Un prerequis manquant se repare en amont, jamais ici.
3. Fais les lecons dans l ordre des numeros. Chaque lecon a un exercice borne : il se rend, il se date.
4. Le grimoire se lit **apres** la pratique, jamais avant : c est une fiche de rappel, pas un cours.
5. Le challenge, puis le boss fight, cochent le module. Sans eux, le module est lu, pas acquis.

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
- [EXO LECTURE : 15-25 minutes (Memoire & Perf)](05A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/05-memory-performance](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de mesurer une ressource à choisir la bonne structure à les structures de données](99A-PONT.md)
- [Challenge : `05-MEMORY-PERFORMANCE`](95-challenge.md)
- [Grimoire : `05-MEMORY-PERFORMANCE`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
