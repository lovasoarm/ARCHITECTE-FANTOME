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

Module : **02-CONSTRUCTION/07-ALGORITHMS** : tri, recherche, recursion, complexite.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `sorted()`/`list.sort()` en Timsort, memes complexites theoriques a raisonner (Big O identique quel que soit le langage) ; recursion limitee par defaut (~1000 frames), a augmenter explicitement contrairement au JS qui laisse planter la stack silencieusement.
- **Go** : `sort.Slice` avec fonction de comparaison explicite (pas de comparateur par defaut magique comme le `.sort()` JS qui trie en string par defaut, piege classique) ; recursion sans optimisation de queue garantie, comme en JS.
- **Rust** : tri stable garanti par la stdlib (`sort` vs `sort_unstable`, choix explicite de compromis performance/stabilite que JS ne propose pas) ; la complexite algorithmique se raisonne pareil, mais le cout constant reel change enormement (pas de JIT a chauffer).

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
