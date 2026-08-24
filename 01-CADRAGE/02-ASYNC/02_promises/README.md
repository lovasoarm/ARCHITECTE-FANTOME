---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# PROMISES

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
