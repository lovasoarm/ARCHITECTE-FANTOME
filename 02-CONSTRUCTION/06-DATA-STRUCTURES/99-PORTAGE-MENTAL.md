---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust

<!-- AF-DIAGRAM:transfer -->

```text
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

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.
