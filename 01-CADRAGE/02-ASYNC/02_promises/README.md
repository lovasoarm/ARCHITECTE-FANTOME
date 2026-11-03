---
stability: evolutif
acte: parcours
noyau: oui
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "01-CADRAGE/02-ASYNC/02_promises/02-promise_race.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 01-CADRAGE/02-ASYNC/02_promises/02-promise_race.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# PROMISES

<!-- AF-DIAGRAM:promise -->

```text
        ┌──────────┐
        │ pending  │
        └────┬─────┘
             │ résultat
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐ ┌────────────┐
│ fulfilled  │ │ rejected   │
└─────┬──────┘ └─────┬──────┘
      │              │
      └──────┬───────┘
             ▼
       ┌───────────┐
       │ handlers  │
       └───────────┘
```

Une Promise évolue d’un état en attente vers un résultat résolu ou rejeté, puis déclenche ses handlers.

> Sommaire de `01-CADRAGE/02-ASYNC/02_promises`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Promise.race, allsettled, any : quand plusieurs opérations s'affrontent](02-promise_race.md)
- [50-promise_race_minimini_projet.md](50-promise_race_minimini_projet.md)
- [Chaîner des opérations async sans perdre les erreurs en route](03-promise_chain_reactor.md)
- [51-promise_chain_reactor_minimini_projet.md](51-promise_chain_reactor_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
