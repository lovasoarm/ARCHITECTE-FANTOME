---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

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

Module : **02-CONSTRUCTION/05-MEMORY-PERFORMANCE** : GC, copie vs reference, complexite, profiling, JIT.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : GC a comptage de references + ramasse-miettes de cycles (different du mark-and-sweep generationnel de V8) ; le GIL change radicalement le profil de perf multi-thread, absent du raisonnement JS mono-thread.
- **Go** : GC concurrent a faible latence, concu pour ne quasiment jamais "stop-the-world" longtemps (contrairement aux pauses GC parfois visibles en JS) ; le profiling passe par `pprof`, integre au runtime plutot que par un outil externe comme Chrome DevTools.
- **Rust** : pas de GC du tout : la gestion memoire se fait a la compilation via l'ownership (chaque valeur a un seul proprietaire, liberee automatiquement a la sortie de scope) ; le profiling porte sur le CPU et le cache, jamais sur des pauses GC puisqu'il n'y en a pas.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
