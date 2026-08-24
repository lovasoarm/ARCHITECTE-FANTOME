---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# PROFILING

<!-- AF-DIAGRAM:memory_leak -->
```text
Root
 │
 ▼
Cache ─────► Entry ─────► Data
 │
 └───────────────────────────┘
          référence retenue
```
Une fuite apparaît lorsqu’une structure conserve une référence qui maintient des données inutilement atteignables.


> Sommaire de `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Profiling basics : mesurer avant de toucher](02-profiling_basics.md)
- [50-profiling_basics_minimini_projet.md](50-profiling_basics_minimini_projet.md)
- [02 : DevTools Memory tab : le guide de terrain](03-devtools_memory_tab.md)
- [Memory leak hunter : la chasse au fantôme](04-memory_leak_hunter.md)
- [Devtools deep dive : lire un flamegraph](05-devtools_deep_dive.md)
- [03 : Node : flamegraph avec clinic / 0x](06-node_inspect_flamegraph.md)
- [Node CPU profiling : trouver ce qui bouffe le CPU en prod](07-node_cpu_profiling.md)
- [05 : Heap Snapshot Arena](08-heap_snapshot_arena.md)

<!-- CONTENU-DOSSIER:fin -->
