---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust

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

Temps de lecture ~2 min

Module : **02-CONSTRUCTION/01-USER-WIZARD** : flows avant ecrans, etats et cas vides, formulaires, accessibilite.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : le flow-avant-ecran se retrouve cote backend dans une machine a etats de workflow (ex. `transitions`, Django FSM) : memes questions (etat initial, transitions valides, etats terminaux), sans rendu visuel.
- **Go** : le meme principe pilote une CLI interactive ou une API multi-etapes (onboarding en plusieurs appels) : le "cas vide" devient une reponse JSON vide a gerer explicitement, pas un ecran blanc.
- **Rust** : les "etats et cas vides" se modelisent nativement avec des enums exhaustifs (`match` force a traiter chaque variante) : le compilateur refuse de compiler un flow qui oublie un etat, la ou JS le laisserait passer en silence jusqu'a l'ecran vide en prod.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
