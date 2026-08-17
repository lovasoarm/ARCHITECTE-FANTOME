---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : data spells
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre **oui, sans regarder**
> aux cinq affirmations ci-dessous. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Module amont de référence : `02-CONSTRUCTION/07_algorithms`.

Ce module modelise un domaine, ses relations, ses migrations et ses requetes. Il suppose acquis le cout algorithmique : une requete qui scale se juge en complexite avant de se juger en syntaxe.

## Les cinq affirmations (oui / non, rien entre les deux)

| # | Affirmation | Le fichier amont qui la fournit |
| --- | --- | --- |
| 1 | Je sais donner la complexite d'une recherche lineaire et d'une recherche dichotomique, et dire quand la seconde devient rentable. | [01_linear_binary.md](../07_algorithms/02_searching/01_linear_binary.md) |
| 2 | Je sais pourquoi un tri en n log n bat un tri quadratique a partir d'une certaine taille, avec un ordre de grandeur. | [02_merge_sort.md](../07_algorithms/01_sorting/02_merge_sort.md) |
| 3 | Je sais choisir une structure de donnees selon l'operation la plus frequente, pas selon l'habitude. | [01_hash_table_basics.md](../06_data_structures/07_hash_table/01_hash_table_basics.md) |
| 4 | Je sais lire un graphe et nommer un parcours en largeur et un parcours en profondeur. | [03_topological_sort.md](../07_algorithms/06_graph_algorithms/03_topological_sort.md) |
| 5 | Je sais ce qu'une donnee dupliquee coute quand les deux copies divergent. | [07_algorithms_grimoire.md](../07_algorithms/07_algorithms_grimoire.md) |

## Consigne d'arrêt

**Deux non = tu reviens en arrière avant d'ouvrir ce module.** Deux non = tu reviens dans `02-CONSTRUCTION/07_algorithms` avant d'ouvrir ce module.

Un « oui » qui a besoin d'ouvrir le fichier pour être prononcé est un non. Se sentir prêt
n'est pas être prêt : les cinq affirmations tranchent, et elles se cochent en trois minutes.

## Verdict

- **5 oui** → tu entres.
- **4 oui** → tu entres, mais tu relis d'abord le fichier amont du non.
- **3 oui ou moins** → retour au module amont, grimoire compris.
