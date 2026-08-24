---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# GC

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


> Sommaire de `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Le garbage collector : le nettoyeur que tu n'entends jamais](02-gc_basics.md)
- [GC simulator : rendre visible ce que le runtime cache](03-gc_simulator.md)
- [03 : Fuite par closure : autopsie pas-à-pas](04-leak_from_closure_walkthrough.md)
- [04 : WeakRef & FinalizationRegistry : quand tu veux "peut-être garder"](05-weakref_and_finalization.md)
- [Heap snapshot hands-on](06-heap_snapshot_hands_on.md)
- [Detached DOM leak : le poison des SPA](07-detached_dom_leak.md)
- [Worker leak : quand chaque thread saigne seul](08A-worker_leak_reproduction.md)
- [`08_fixtures/`](08_fixtures/README.md)

<!-- CONTENU-DOSSIER:fin -->
