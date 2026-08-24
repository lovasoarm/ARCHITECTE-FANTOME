---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# ASYNC AWAIT

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


> Sommaire de `01-CADRAGE/02-ASYNC/03_async_await`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Async/await : la jungle](02-async_jungle.md)
- [50-async_jungle_minimini_projet.md](50-async_jungle_minimini_projet.md)
- [Async rescue : sauver ce qui peut l'être](03-async_rescue.md)
- [51-async_rescue_minimini_projet.md](51-async_rescue_minimini_projet.md)
- [Generators et yield : la fonction qui fait pause](04-b_generators_yield.md)
- [Abortcontroller : annuler ce qui ne doit plus se terminer](05-c_abort_controller.md)
- [52-c_abort_controller_minimini_projet.md](52-c_abort_controller_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
