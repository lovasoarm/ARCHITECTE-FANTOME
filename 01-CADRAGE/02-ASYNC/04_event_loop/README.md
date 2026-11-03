---
stability: evolutif
acte: parcours
noyau: oui
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "01-CADRAGE/02-ASYNC/04_event_loop/02-microtask_madness.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 01-CADRAGE/02-ASYNC/04_event_loop/02-microtask_madness.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
