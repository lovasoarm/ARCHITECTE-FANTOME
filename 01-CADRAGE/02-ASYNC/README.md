---
stability: evolutif
acte: parcours
noyau: oui
route: survie
---

# MODULE 02 ASYNC

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

> Palier `01-CADRAGE`. Duree estimee : **9 h 15** (13 fichiers de travail).

## Sommaire du module

| Fichier                                                                          | Objet                                                                             | Duree  |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------ |
| [`02A-mental_model_js.md`](02A-mental_model_js.md)                               | LE MODÈLE MENTAL JS EN 1 IMAGE                                                    | 45 min |
| [`50-mental_model_js_minimini_projet.md`](50-mental_model_js_minimini_projet.md) | 00 mental model js minimini projet                                                | 45 min |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                             | 00 : Prereq check : Async & Event Loop                                            | 15 min |
| [`01A-00-why-async.md`](01A-00-why-async.md)                                     | POURQUOI CE MODULE MÉRITE TON TEMPS : ASYNC & EVENT LOOP                          | 45 min |
| [`03A-advanced_patterns.md`](03A-advanced_patterns.md)                           | 05 : Async avancé : AbortController, backpressure, mini-scheduler                 | 45 min |
| [`04A-backpressure.md`](04A-backpressure.md)                                     | 05b : Backpressure : quand le producteur va plus vite que le consommateur         | 45 min |
| [`05-shared_memory_concurrency.md`](05-shared_memory_concurrency.md)             | CONCURRENCE MÉMOIRE : SharedArrayBuffer & Atomics                                 | 45 min |
| [`06-event_loop_drill_5ans.md`](06-event_loop_drill_5ans.md)                     | DRILL : L'event loop explique a un enfant de 5 ans, PUIS reconstruit en 20 lignes | 45 min |
| [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)                                         | EXO LECTURE : 15-25 minutes (Asynchrone)                                          | 45 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)                               | EXO [JEUNE IA] : 01-CADRAGE/02-ASYNC                                              | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                               | EXO [IA MENTEUSE] : async (forEach + await)                                       | 45 min |
| [`08-EXO_MICROTASK_A_LA_MAIN.md`](08-EXO_MICROTASK_A_LA_MAIN.md)                 | EXO : reimplemente une file de microtasks a la main (12.6)                        | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                                     | PONT : de l'async au debugging                                                    | 45 min |

Total : **9 h 15**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [Le modèle mental JS en 1 image](02A-mental_model_js.md)
- [50-mental_model_js_minimini_projet.md](50-mental_model_js_minimini_projet.md)
- [00 : Prereq check : Async & Event Loop](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : async & event loop](01A-00-why-async.md)
- [`01_callbacks/`](01_callbacks/README.md)
- [`02_promises/`](02_promises/README.md)
- [`03_async_await/`](03_async_await/README.md)
- [`04_event_loop/`](04_event_loop/README.md)
- [05 : Async avancé : AbortController, backpressure, mini-scheduler](03A-advanced_patterns.md)
- [05b : Backpressure : quand le producteur va plus vite que le consommateur](04A-backpressure.md)
- [CONCURRENCE MÉMOIRE : SharedArrayBuffer & Atomics](05-shared_memory_concurrency.md)
- [DRILL : L'event loop explique a un enfant de 5 ans, PUIS reconstruit en 20 lignes](06-event_loop_drill_5ans.md)
- [EXO LECTURE : 15-25 minutes (Asynchrone)](07-EXO_LECTURE.md)
- [EXO [jeune IA] : 01-cadrage/02-async](98-EXO-VERIFICATION.md)
- [EXO [IA MENTEUSE] : async (forEach + await)](97-EXO-VERIFICATION.md)
- [EXO : reimplemente une file de microtasks a la main (12.6)](08-EXO_MICROTASK_A_LA_MAIN.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de l'async au debugging](99A-PONT.md)
- [Challenge : `02-ASYNC`](95-challenge.md)
- [Grimoire : `02-ASYNC`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
