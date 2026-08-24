---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# BREAKING CACHE

<!-- AF-DIAGRAM:cache -->
```text
text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```
Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.


## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~6 min

Réseau de distribution de Walter White. Des villes, des routes pondérées par le coût et le risque, des distributeurs à prioriser, des lots à trier avant livraison. Chaque décision se prend avec des données mesurées, pas avec des intuitions.

Zéro bibliothèque d'algorithmes externe. Dijkstra, Heap, BFS, Quick Sort, Merge Sort : tout est écrit from scratch. Et tout tourne sous profilage.

---

## CE QUE ÇA FAIT

```bash
$ node src/index.js

[RESEAU] 12 villes chargées, 31 routes indexées
[DIJKSTRA] Route la plus sûre ABQ --> Juarez : cout total 47, risque 2.3
[HEAP] Distributeur prioritaire : Albuquerque Sud (stock critique)
[TRI] 5000 lots triés par QuickSort : 12ms
[TRI] 5000 lots triés par MergeSort : 18ms
[BENCHMARK] O(n log n) confirmé sur 10k, 100k, 1M éléments
```

---

## INSTALLATION

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : aucune
Outils externes: aucun
```

```bash
npm install
node src/index.js  # charge le graphe, lance tous les algos, écrit les benchmarks
npm test       # lance la suite de tests
```

Pas de build step. Le code tourne tel qu'il est écrit.

---

## ARCHITECTURE

```text
src/
├── graph/
│  ├── graphBuilder.js   # construit le graphe depuis les données brutes
│  ├── adjacencyList.js  # représentation par liste d'adjacence
│  └── graphData.js    # villes et routes du réseau Walter White
│
├── algorithms/
│  ├── dijkstra.js     # chemin le plus sûr dans un graphe pondéré
│  ├── bfs.js       # détection de routes compromises
│  └── dfs.js       # exploration complète du réseau
│
├── structures/
│  ├── minHeap.js     # min-heap pour prioriser les urgences
│  └── priorityQueue.js  # abstraction au-dessus du heap
│
├── sorting/
│  ├── quickSort.js    # rapide en pratique, unstable
│  ├── mergeSort.js    # stable, garanti O(n log n)
│  └── sortingRace.js   # comparaison sur 10k, 100k, 1M éléments
│
├── dp/
│  └── stockOptimizer.js  # knapsack : maximiser le stock sous contraintes
│
├── profiling/
│  └── benchmarker.js   # performance.now() sur chaque algo
│
└── index.js        # point d'entrée : lance tout, sort les résultats

tests/
├── graph.test.js
├── dijkstra.test.js
├── heap.test.js
├── sorting.test.js
└── dp.test.js
```

Flux d'appel principal :

```text
index.js
 --> graphBuilder.build(graphData)
 --> dijkstra.shortestPath(graph, "ABQ", "Juarez")
 --> minHeap.extractMin()      # distributeur le plus urgent
 --> sortingRace.compare(lots)   # quickSort vs mergeSort
 --> stockOptimizer.knapsack(stock, contraintes)
 --> benchmarker.report()
```

---

## MODULES CRAZYDEVS COUVERTS

| Module         | Où ça se voit                                |
| ----------------------- | ---------------------------------------------------------------------------- |
| `02-CONSTRUCTION/06-DATA-STRUCTURES`  | `graphBuilder.js` (graphe), `minHeap.js` (heap), `adjacencyList.js`     |
| `02-CONSTRUCTION/07-ALGORITHMS`     | `dijkstra.js`, `bfs.js`, `quickSort.js`, `mergeSort.js`, `stockOptimizer.js` |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` | `benchmarker.js` : `performance.now()` sur chaque algo, Big-O analysé    |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Aucune bibliothèque d'algorithmes externe (pas de graphlib, pas de heap npm)
2. Chaque algo est profilé : performance.now() avant et après, résultat loggé
3. La complexité Big-O de chaque algo est documentée en commentaire dans le fichier
4. Les benchmarks tournent sur au moins trois tailles d'input : 1k, 10k, 100k
```

---

## DOCUMENTS DU PROJET

```text
00-CAHIER-DES-CHARGES.md  --> spécification complète, ordre de construction, cas limites
02-TDD-JOURNAL.md    --> trace de l'écriture des tests, dans l'ordre réel
08-POSTMORTEM.md     --> ce qui a coincé, ce qui a été appris
ADR/         --> décisions d'architecture documentées
```

---

## BENCH & DÉCISIONS (obligatoire)

Aucun mini-projet n'est "fini" sans cette section. Documente au moins **un**
trade-off chiffré :

- **Question** : "J'ai comparé X vs Y."
- **Charge** : (taille des données, N itérations, hardware).
- **Résultat** : `X = 12ms`, `Y = 48ms` sur 10 000 items.
- **Décision** : "J'ai retenu X car …"
- **Ce que je n'ai pas mesuré** : (mémoire, DX, coût cloud…).

Sans chiffres, ce n'est pas une décision, c'est une préférence.
Voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02A-measure_first.md`.

## Pitch 3 lignes

Ce projet démontre une compétence clé : lire du code inconnu, débugger sous pression, livrer un produit (ADR + tests) qu'un autre dev peut reprendre. Utilisable en portfolio et en entretien.

## Empreinte carbone (critère d'acceptation)

Estime l'empreinte carbone approximative de ton déploiement ou de ton algo. Justifie **un** choix d'optimisation (moins d'invocations, cache, batch, région serveur). Voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`.

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

## Structure attendue

Chaque mini-projet doit contenir a minima :

- `src/` : code source (obligatoire).
- `tests/` : tests unitaires et/ou d'intégration (obligatoire).
- `README.md` : présentation, objectifs, comment lancer.
- `02-TDD-JOURNAL.md` : trace de la démarche TDD.
- `08-POSTMORTEM.md` : ce qui a marché, ce qui a cassé, ce que tu retiens.
- `ADR/` : décisions architecturales (Architecture Decision Records).
- `00-CAHIER-DES-CHARGES.md` : contraintes et périmètre.

Un CI check impose la présence de `src/` et `tests/` avant validation.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : breaking cache](08-POSTMORTEM.md)
- [RULES : 04_breaking_cache](01-RULES.md)
- [SECURITY : 04_breaking_cache](03-SECURITY.md)
- [Security Gate : 04_breaking_cache](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 04_breaking_cache](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : breaking cache](02-TDD-JOURNAL.md)
- [Cahier des charges : breaking cache](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
