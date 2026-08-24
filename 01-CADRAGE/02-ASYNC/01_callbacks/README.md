---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
---

# CALLBACKS

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


> Sommaire de `01-CADRAGE/02-ASYNC/01_callbacks`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Le labyrinthe du callback](02-callback_maze.md)
- [50-callback_maze_minimini_projet.md](50-callback_maze_minimini_projet.md)
- [Orchestrer sans perdre le fil](95-challenge.md)
- [Page verrouillée](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
