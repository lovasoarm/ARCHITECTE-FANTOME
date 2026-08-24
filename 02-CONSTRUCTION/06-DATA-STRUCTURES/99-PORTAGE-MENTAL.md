---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

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

Module : **02-CONSTRUCTION/06-DATA-STRUCTURES** : array, liste chainee, pile, file, heap, BST, table de hachage.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `list` couvre array/pile/file (mais `deque` de `collections` est la vraie file performante), `dict` est la table de hachage native, `heapq` fournit le heap en fonctions libres plutot qu'en objet.
- **Go** : pas de generiques riches avant 1.18, `slice` pour l'array dynamique, `container/heap` et `container/list` existent mais sont peu idiomatiques ; la map native est la table de hachage, sans ordre garanti (contrairement a l'objet JS moderne).
- **Rust** : `Vec`, `VecDeque`, `BinaryHeap`, `HashMap`, `BTreeMap` (BST equilibre integre a la stdlib, sans code a ecrire) ; l'ownership impose de decider explicitement qui possede chaque noeud d'une liste chainee, la ou JS laisse le GC s'en occuper.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
