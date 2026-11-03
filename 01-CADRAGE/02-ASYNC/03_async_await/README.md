---
stability: evolutif
acte: parcours
noyau: oui
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "01-CADRAGE/02-ASYNC/03_async_await/02-async_jungle.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 01-CADRAGE/02-ASYNC/03_async_await/02-async_jungle.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# ASYNC AWAIT

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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
