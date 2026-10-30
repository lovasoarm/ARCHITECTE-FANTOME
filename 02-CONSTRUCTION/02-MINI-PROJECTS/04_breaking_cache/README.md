---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# BREAKING CACHE

<!-- AF-DIAGRAM:cache -->

```text
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

## PRÉREQUIS ET ÉTAT INITIAL

- Node.js : `v22.23.4` (version de référence du dépôt AF) ; npm est fourni avec Node.js.
- État de l’archive : Le cœur algorithmique peut être écrit en Node natif. Le ZIP ne fournit pas `package.json`, source exécutable ni tests ; les README de `src/` et `tests/` sont des consignes, pas des programmes.

### Commandes disponibles dès réception

```bash
node --version
npm --version
```

### Commandes après réalisation du scaffold

Après création des sources et de la suite, lance `node src/index.js` et `node --test`. Les benchmarks ne sont à exécuter qu’après avoir créé leur runner et fixé les données, le warm-up et le protocole. `npm install` n’est pas nécessaire sans dépendances ; `npm test` suppose un script défini.

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

| Module                                  | Où ça se voit                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| `02-CONSTRUCTION/06-DATA-STRUCTURES`    | `graphBuilder.js` (graphe), `minHeap.js` (heap), `adjacencyList.js`          |
| `02-CONSTRUCTION/07-ALGORITHMS`         | `dijkstra.js`, `bfs.js`, `quickSort.js`, `mergeSort.js`, `stockOptimizer.js` |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` | `benchmarker.js` : `performance.now()` sur chaque algo, Big-O analysé        |

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

---

## Comprendre les tests avant de commencer : état exact du ZIP

Référence : [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les exemples de sortie décrivent la cible, pas un logiciel livré, sauf mention contraire.

- Code fourni : aucun module exécutable ; `src/README.md` et `tests/README.md` sont des espaces réservés. Les timings affichés sont illustratifs, pas des mesures déjà produites.
- Tests de référence verts : aucun. Tests volontairement rouges : aucun.
- Tests à écrire : graphe, Dijkstra (poids non négatifs), BFS/DFS, min-heap, tris/stabilité, knapsack, entrées vides/dupliquées et tests différentiels.
- Validation finale : après implémentation, `node --test tests/*.test.js`. Exécute les benchmarks à part, avec warm-up, données déterministes, matériel/version et plusieurs répétitions ; ne transforme pas un temps unique en promesse de performance.
- Ordre : graphe → heap/priority queue → algorithmes → oracle simple → tests limites → benchmarks. `npm install`/`npm test` ne sont pas disponibles faute de `package.json`.

## Règles communes de progression et de preuve

### Contrôle commun de la progression

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État des tests à la réception

- **Code de départ :** aucun fichier source exécutable ; `src/` est un scaffold de documentation.
- **Tests verts de référence :** aucun.
- **Tests volontairement rouges :** aucun fichier de test exécutable n'est fourni à l'état initial. Le premier test rouge est à écrire par l'apprenant avant le code.
- **Tests à créer :** traduire chaque invariant du cahier en test ; ajouter limites, erreurs et contrôles de sécurité.
- **Validation finale :** définir et documenter un runner, créer une suite qui couvre les critères d'acceptation, puis l'exécuter depuis un environnement propre. `tests/README.md` n'est pas un test.

**Ordre de construction :** lire les règles et le cahier, cartographier entrées/sorties, écrire tests du domaine, implémenter modèle et règles, ajouter adaptateurs, orchestration et tests d'intégration. Pour un projet de reprise de legacy, inspecter et caractériser le comportement existant avant la refactorisation.
