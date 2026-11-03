---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling/02-profiling_basics.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling/02-profiling_basics.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
