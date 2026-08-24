---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# EVENT LOOP

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


> Sommaire de `01-CADRAGE/02-ASYNC/04_event_loop`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Microtask madness](02-microtask_madness.md)
- [50-microtask_madness_minimini_projet.md](50-microtask_madness_minimini_projet.md)
- [Macrotask monsters](03-macrotask_monsters.md)
- [51-macrotask_monsters_minimini_projet.md](51-macrotask_monsters_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [EXO : implémenter une mini file de microtasks à la main](04-exo_microloop_a_la_main.md)
- [Event loop : expliqué à 3 publics](05-expliquer_a_3_publics.md)
- [Expliquer l'event loop à un enfant de 5 ans](06-expliquer_a_5_ans.md)

<!-- CONTENU-DOSSIER:fin -->
