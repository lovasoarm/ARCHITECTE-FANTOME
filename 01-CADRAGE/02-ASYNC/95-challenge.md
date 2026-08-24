---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L3
perturbation_modes: [solution_concurrente, decision_organisationnelle]
anti_recipe_key: solution_concurrente+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# Challenge : `02-ASYNC`

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

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

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

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-mental_model_js_minimini_projet.md](50-mental_model_js_minimini_projet.md)
- [50-callback_maze_minimini_projet.md](01_callbacks/50-callback_maze_minimini_projet.md)
- [ORCHESTRER SANS PERDRE LE FIL](01_callbacks/95-challenge.md)
- [50-promise_race_minimini_projet.md](02_promises/50-promise_race_minimini_projet.md)
- [51-promise_chain_reactor_minimini_projet.md](02_promises/51-promise_chain_reactor_minimini_projet.md)
- [50-async_jungle_minimini_projet.md](03_async_await/50-async_jungle_minimini_projet.md)
- [51-async_rescue_minimini_projet.md](03_async_await/51-async_rescue_minimini_projet.md)
- [52-c_abort_controller_minimini_projet.md](03_async_await/52-c_abort_controller_minimini_projet.md)
- [50-microtask_madness_minimini_projet.md](04_event_loop/50-microtask_madness_minimini_projet.md)
- [51-macrotask_monsters_minimini_projet.md](04_event_loop/51-macrotask_monsters_minimini_projet.md)
- [EXO : IMPLÉMENTER UNE MINI FILE DE MICROTASKS À LA MAIN](04_event_loop/04-exo_microloop_a_la_main.md)
- [DRILL : L'event loop explique a un enfant de 5 ans, PUIS reconstruit en 20 lignes](06-event_loop_drill_5ans.md)
- [EXO LECTURE : 15-25 minutes (Asynchrone)](07-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 01-CADRAGE/02-ASYNC](98-EXO-VERIFICATION.md)
- [EXO [IA MENTEUSE] : async (forEach + await)](97-EXO-VERIFICATION.md)
- [EXO : reimplemente une file de microtasks a la main (12.6)](08-EXO_MICROTASK_A_LA_MAIN.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
