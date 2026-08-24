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

Module : **03-PILOTAGE/03-QUALITY-SHIELD** : tests qui paient, observabilite, revue et CI, incidents et post-mortem.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : memes principes de CI (lint + tests + coverage bloquants), observabilite via `OpenTelemetry` (SDK Python officiel, memes concepts de trace/span qu'en JS) ; le post-mortem sans coupable est une pratique d'equipe, pas un artefact de langage.
- **Go** : CI similaire mais plus rapide (compilation statique, binaire unique a deployer, pas de `node_modules` a installer) ; observabilite native forte car Go est le langage d'origine de beaucoup d'outils SRE (Prometheus, Grafana Agent sont ecrits en Go).
- **Rust** : la CI gagne une etape que JS n'a pas : le compilateur rejette deja une partie des bugs qu'un post-mortem JS constaterait en prod (null deref, data race) ; l'observabilite via `tracing` suit la meme logique de spans qu'OpenTelemetry.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
