---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/02-gc_basics.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/02-gc_basics.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
