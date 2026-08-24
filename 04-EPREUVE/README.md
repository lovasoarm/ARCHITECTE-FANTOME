---
stability: intemporel
acte: restituer
---

# 04-EPREUVE

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


Porte d’entrée du palier terminal. Le contenu detaille vit dans les fichiers listes ci-dessous.

## Le livrable noté de ce palier : PORTAGE.md

Ce palier ne se valide pas par un rendu de plus : il se valide par **un seul livrable noté**,
le portage d'un service du fil rouge dans un second langage et chez un second fournisseur.

- Ce qui est attendu, section par section :
  [06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md](../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).
- Où il s'inscrit dans le profil de sortie : septième entrée de
  [PREUVES-STAFF-ENGINEER.md](../PREUVES-STAFF-ENGINEER.md).
- Condition d'entree au capstone : `PORTAGE.md` existe physiquement, ses tests de contrat
  passent des deux cotes, et son ecart de cout est calcule a partir de prix releves et dates
  ([05-releve_tarifaire_reel.md](../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md)).

Un portage raconte sans code deploye ni chiffre releve ne vaut pas validation : c'est le seul
endroit du parcours ou l'affirmation « je saurais le refaire ailleurs » devient verifiable.

## Appel TECH-ILA 5 sur 6 : Niveau 5 Transfert

<!-- AF-DIAGRAM:transfer -->
```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```
Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.


Tu ouvres la carte **maintenant**, dans ce module, pas a la retrospective. Elle apporte ici
le second langage et le second fournisseur du livrable PORTAGE.md : la carte sert a choisir la cible, pas a la decouvrir apres coup.

- Carte : [Niveau 5 Transfert](../06-ANNEXES-TRANSVERSES/04-TECH-ILA/tech-ila/07-niveau-5-transfert.md)
- Pourquoi ici : ce module est le premier endroit du parcours ou ces noms d'outils changent une
  decision. Lue plus tard, la carte n'est plus qu'un catalogue.
- Ce que tu produis avec : PORTAGE.md, le livrable note du palier.
- Regle : la carte est perissable, le module ne l'est pas. Si un nom d'outil a vieilli, on
  remplace la carte en annexes sans toucher a ce module.

<!-- CONTENU-DOSSIER:debut -->

- [`01-BONUS-VAULT/`](01-BONUS-VAULT/README.md)
- [`02-TOOL-CAVE/`](02-TOOL-CAVE/README.md)
- [`03-REALTIME/`](03-REALTIME/README.md)
- [`04-BIG-APP-SNOOP/`](04-BIG-APP-SNOOP/README.md)
- [`05-CAPSTONE-ARENA/`](05-CAPSTONE-ARENA/README.md)
- [`03b-BOSS-1/`](03b-BOSS-1/README.md)
- [`04b-BOSS-2/`](04b-BOSS-2/README.md)
- [Rétrospective de bloc : Bloc EPREUVE (de 04-EPREUVE/04-BIG-APP-SNOOP a 04-EPREUVE/05-CAPSTONE-ARENA)](02A-RETRO-BLOC-4-EPREUVE.md)

<!-- CONTENU-DOSSIER:fin -->

> **Compagnons actifs :** [Code d'honneur CrazyDevs](../06-ANNEXES-TRANSVERSES/07-FUN-CODE-HONNEUR.md) · [Synchronisation TECH-ILA](../06-ANNEXES-TRANSVERSES/04-TECH-ILA/02-SYNCHRONISATION-PARCOURS.md)

