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

Module : **02-CONSTRUCTION/15-ARCHI-LAB** : frontieres, couplage, couches, flux, choix d'architecture.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : les memes frontieres se posent en couches Django (models/views/serializers) ou en architecture hexagonale (`ports`/`adapters` explicites en packages) ; le couplage se mesure pareil, independamment du langage.
- **Go** : les interfaces implicites (pas de mot-cle `implements`) forcent une discipline de frontieres differente : un package qui depend d'une interface, pas d'un type concret, decouple sans heritage.
- **Rust** : les traits + le systeme de modules (`mod`, visibilite `pub`) rendent les frontieres verifiables a la compilation ; un mauvais couplage (dependance circulaire de crates) est detecte avant l'execution, la ou JS le laisse passer jusqu'au runtime ou au bundler.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
