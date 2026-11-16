---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, changement_echelle]
anti_recipe_key: fausse_piste+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Dijkstra : le chemin le plus court qui alimente tous les gps

Temps de lecture ~10 min

De nombreux problèmes de navigation, de routage réseau et de pathfinding peuvent être modélisés avec des graphes pondérés. Dijkstra est un algorithme classique pour trouver les coûts minimaux depuis un départ lorsque tous les poids sont non négatifs ; les systèmes réels peuvent employer d’autres algorithmes ou des variantes adaptées à leur échelle.

La question à laquelle il répond : **dans un graphe pondéré avec des poids non négatifs, quel est le chemin le moins coûteux entre un point de départ et tous les autres ?**

Prérequis : graphes (`02-CONSTRUCTION/06-DATA-STRUCTURES/08_graphs`), heaps (`02-CONSTRUCTION/06-DATA-STRUCTURES/05_heap`). Si c'est flou, réviser là-bas d'abord.

---

## 1) L'INTUITION : POURQUOI ÇA MARCHE

Dijkstra est un greedy sur un graphe. À chaque étape, on traite le noeud non visité le plus proche du départ. Pourquoi c'est optimal ? Parce qu'avec des poids non négatifs, un chemin déjà trouvé vers un noeud ne peut qu'empirer si on passe par d'autres noeuds non visités. Le noeud le plus proche est définitivement réglé.

```text
        2     4
  [A] ──────── [B] ──────── [D]
   |      |
  5 |     3 |
   |      |
  [C] ──────── [E]
     1
```

Depuis A : dist[A]=0, dist[B]=2, dist[C]=5, dist[D]=6, dist[E]=5.
Chemin vers D : A→B→D (coût 6). Chemin vers E : A→B→E (coût 5) ou A→C→E (coût 6). Le chemin B→E est plus court.

---

## 2) IMPLÉMENTATION AVEC MIN-HEAP

La clé de performance : utiliser une priority queue (min-heap) pour toujours traiter le noeud avec la distance minimale connue.

```js
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() {
    return this.heap.length;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1,
        r = 2 * i + 2;
      if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
      if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

function dijkstra(graph, start) {
  // Contrat : graphe orienté représenté par Map<node, Array<[neighbor, weight]>>.
  // Chaque voisin doit être une clé du graphe ; chaque poids doit être fini et >= 0.
  if (!(graph instanceof Map)) throw new TypeError("graph doit être une Map");
  if (!graph.has(start))
    throw new RangeError("start doit être un sommet du graphe");

  for (const [node, edges] of graph) {
    if (!Array.isArray(edges)) {
      throw new TypeError(
        `Les arêtes de ${String(node)} doivent former un tableau`,
      );
    }
    for (const edge of edges) {
      if (!Array.isArray(edge) || edge.length !== 2) {
        throw new TypeError("Chaque arête doit être [neighbor, weight]");
      }
      const [neighbor, weight] = edge;
      if (!graph.has(neighbor)) {
        throw new RangeError(
          `Sommet voisin absent du graphe : ${String(neighbor)}`,
        );
      }
      if (!Number.isFinite(weight) || weight < 0) {
        throw new RangeError("Les poids doivent être finis et non négatifs");
      }
    }
  }

  const dist = new Map();
  const prev = new Map(); // pour reconstruire le chemin
  const pq = new MinHeap();

  // initialiser toutes les distances à Infinity
  for (const node of graph.keys()) {
    dist.set(node, Infinity);
    prev.set(node, null);
  }

  dist.set(start, 0);
  pq.push([0, start]); // [distance, node]

  while (pq.size > 0) {
    const [currDist, node] = pq.pop();

    // si on a déjà trouvé un chemin plus court : ignorer
    if (currDist > dist.get(node)) continue;

    for (const [neighbor, weight] of graph.get(node) || []) {
      const newDist = currDist + weight;

      if (newDist < dist.get(neighbor)) {
        dist.set(neighbor, newDist);
        prev.set(neighbor, node);
        pq.push([newDist, neighbor]);
      }
    }
  }

  return { dist, prev };
}

// Reconstruire le chemin depuis start vers target
function getPath(prev, start, target) {
  if (!(prev instanceof Map)) throw new TypeError("prev doit être une Map");
  if (!prev.has(start) || !prev.has(target)) return [];

  const path = [];
  const visited = new Set(); // garde-fou contre une map de prédécesseurs incohérente
  let current = target;

  while (current !== null && current !== undefined) {
    if (visited.has(current)) return []; // cycle inattendu dans les prédécesseurs
    visited.add(current);
    path.unshift(current);
    current = prev.get(current);
  }

  return path[0] === start ? path : [];
}
```

---

## 3) EXEMPLE CONCRET : LE RÉSEAU DE WALTER WHITE

```js
// Réseau de distribution de Walter : villes et temps de trajet (en minutes)
const network = new Map([
  [
    "ABQ",
    [
      ["Santa Fe", 60],
      ["El Paso", 280],
      ["Tucson", 420],
    ],
  ],
  [
    "Santa Fe",
    [
      ["ABQ", 60],
      ["Denver", 390],
    ],
  ],
  [
    "El Paso",
    [
      ["ABQ", 280],
      ["Tucson", 280],
      ["Phoenix", 430],
    ],
  ],
  [
    "Tucson",
    [
      ["ABQ", 420],
      ["El Paso", 280],
      ["Phoenix", 115],
    ],
  ],
  [
    "Phoenix",
    [
      ["Tucson", 115],
      ["El Paso", 430],
      ["Las Vegas", 290],
    ],
  ],
  [
    "Denver",
    [
      ["Santa Fe", 390],
      ["Las Vegas", 750],
    ],
  ],
  [
    "Las Vegas",
    [
      ["Phoenix", 290],
      ["Denver", 750],
    ],
  ],
]);

const { dist, prev } = dijkstra(network, "ABQ");

console.log(dist.get("Las Vegas")); // 825 minutes
console.log(getPath(prev, "ABQ", "Las Vegas"));
// ["ABQ", "Tucson", "Phoenix", "Las Vegas"]
```

**Trace d'exécution :**

```text
init : dist = {ABQ:0, tous:Inf}, pq = [(0, "ABQ")]

Pop (0, ABQ) :
 Santa Fe : 0+60=60 < Inf => dist[Santa Fe]=60, push (60, "Santa Fe")
 El Paso : 0+280=280 < Inf => dist[El Paso]=280, push (280, "El Paso")
 Tucson  : 0+420=420 < Inf => dist[Tucson]=420, push (420, "Tucson")

Pop (60, Santa Fe) :
 ABQ   : 60+60=120 > `dist[ABQ]` (0) => skip
 Denver : 60+390=450 < Inf => dist[Denver]=450, push (450, "Denver")

Pop (280, El Paso) :
 ABQ  : 280+280=560 > 0 => skip
 Tucson : 280+280=560 > `dist[Tucson]` (420) => skip
 Phoenix: 280+430=710 < Inf => dist[Phoenix]=710... (sera amélioré plus tard)

Pop (420, Tucson) :
 Phoenix: 420+115=535 < 710 => dist[Phoenix]=535, push (535, "Phoenix")

Pop (450, Denver) :
 Las Vegas : 450+750=1200 < Inf => ...

Pop (535, Phoenix) :
 Las Vegas : 535+290=825 < 1200 => dist[Las Vegas]=825, push (825, "Las Vegas")

Pop (710, Phoenix) :
 710 > dist[Phoenix] (535) => entrée obsolète, skip

Pop (825, Las Vegas) :
 destination atteinte ; aucune amélioration n'est possible avec les poids non négatifs.

Chemin optimal : ABQ → Tucson → Phoenix → Las Vegas
Coût : 420 + 115 + 290 = 825 minutes
```

---

## 4) COMPLEXITÉ ET CHOIX DE STRUCTURE

```text
Implémentation      Complexité
─────────────────────────────────────
Array trié (naïf)    O(V²)
Binary heap (MinHeap)  O((V + E) log V)
Fibonacci heap      O(V log V + E)
```

En pratique : binary heap pour la majorité des cas. Fibonacci heap en théorie uniquement (complexe à implémenter, constants élevés).

```text
V = nombre de noeuds (vertices)
E = nombre d'arêtes (edges)

Graphe dense (E ≈ V²) : array trié peut être compétitif
Graphe sparse (E ≈ V) : binary heap clairement meilleur
```

---

## 5) LE PIÈGE : POIDS NÉGATIFS

Dijkstra **ne fonctionne pas** avec des poids négatifs. La preuve : avec un poids négatif, un noeud déjà "finalisé" pourrait se voir attribuer une distance plus courte via un voisin non encore traité.

```js
const brokenGraph = new Map([
  [
    "A",
    [
      ["B", 4],
      ["C", 2],
    ],
  ],
  ["B", [["D", -1]]], // poids négatif
  ["C", [["B", -3]]], // poids négatif
  ["D", []],
]);

// Dijkstra va "finaliser" C avant B (dist=2 < 4)
// puis mettre B à dist 2+(-3)=-1
// mais B avait déjà été potentiellement traité à dist=4
// résultat : distances incorrectes silencieusement

// Solution pour poids négatifs : Bellman-Ford (O(VE)) ou SPFA
```

---

## 6) VARIANTE PÉDAGOGIQUE : K CHEMINS SIMPLES PAR COÛT

Pour un petit graphe fini à poids non négatifs, on peut énumérer les K chemins simples par coût croissant, puis comparer un second critère (risque, péage, nombre de changements) sur les chemins réellement restitués. Ce code d’apprentissage n’est pas un algorithme de navigation à grande échelle : le nombre de chemins simples peut croître exponentiellement.

```js
function kShortestSimplePaths(graph, start, target, k) {
  if (!Number.isSafeInteger(k) || k < 1) {
    throw new RangeError("k doit être un entier strictement positif");
  }

  // Ce parcours énumère les chemins simples par coût croissant.
  // Il exige des poids finis et non négatifs, et un graphe fini.
  // La recherche peut être exponentielle : réserve-la aux graphes pédagogiques
  // ou aux réseaux de taille maîtrisée, pas à un service de navigation général.
  const queue = new MinHeap();
  queue.push([0, [start]]);
  const results = [];

  while (queue.size > 0 && results.length < k) {
    const [distance, path] = queue.pop();
    const node = path[path.length - 1];

    if (node === target) {
      results.push({ distance, path });
      continue;
    }

    for (const [neighbor, weight] of graph.get(node) || []) {
      if (!Number.isFinite(weight) || weight < 0) {
        throw new RangeError("Les poids doivent être finis et non négatifs");
      }
      // Empêche les cycles : chaque résultat est un chemin simple.
      if (path.includes(neighbor)) continue;
      queue.push([distance + weight, [...path, neighbor]]);
    }
  }

  return results; // [{ distance, path }, ...], triés par distance croissante
}
```

---

## EXERCICES

## EXO 1 : LE GPS DE LEON LUIS

_~20 min_

León Luis (Garo) patrouille la ville. La ville est un graphe de quartiers connectés par des rues (poids = temps de trajet en minutes). Implémenter `fastestRoute(city, start, target)` qui retourne le chemin et la durée minimale.

```js
const city = new Map([
  [
    "Shinjuku",
    [
      ["Shibuya", 12],
      ["Akihabara", 25],
      ["Ikebukuro", 18],
    ],
  ],
  [
    "Shibuya",
    [
      ["Shinjuku", 12],
      ["Roppongi", 8],
      ["Ginza", 22],
    ],
  ],
  [
    "Roppongi",
    [
      ["Shibuya", 8],
      ["Ginza", 10],
      ["Akihabara", 30],
    ],
  ],
  [
    "Ginza",
    [
      ["Roppongi", 10],
      ["Shibuya", 22],
      ["Akihabara", 15],
    ],
  ],
  [
    "Akihabara",
    [
      ["Shinjuku", 25],
      ["Ginza", 15],
      ["Ikebukuro", 20],
    ],
  ],
  [
    "Ikebukuro",
    [
      ["Shinjuku", 18],
      ["Akihabara", 20],
    ],
  ],
]);
```

Afficher le chemin complet et la durée totale.

---

## EXO 2 : DIJKSTRA AVEC CONTRAINTE DE CARBURANT

_~25 min_

Même graphe, mais le véhicule a une autonomie maximale `maxFuel`. Chaque arête a un coût de carburant (pas forcément égal au temps). Trouver le chemin le plus rapide qui ne dépasse jamais `maxFuel` entre deux points consécutifs.

(indice : étendre l'état à `[distance, node]` → `[distance, node, currentFuel]`)

---

## EXO 3 : RÉSEAU DE DISTRIBUTION WALKING DEAD

_~20 min_

Rick Grimes doit approvisionner plusieurs camps à partir d'Alexandria. Le réseau routier est un graphe pondéré (distance en km). Implémenter Dijkstra depuis Alexandria et retourner les distances minimales vers tous les camps.

Puis : trouver le camp le plus éloigné. Si la distance dépasse 200km, afficher un avertissement.

```js
const roads = new Map([
  [
    "Alexandria",
    [
      ["Hilltop", 50],
      ["Kingdom", 120],
      ["Saviors", 80],
    ],
  ],
  [
    "Hilltop",
    [
      ["Alexandria", 50],
      ["Kingdom", 90],
      ["Oceanside", 110],
    ],
  ],
  [
    "Kingdom",
    [
      ["Alexandria", 120],
      ["Hilltop", 90],
      ["Saviors", 40],
    ],
  ],
  [
    "Saviors",
    [
      ["Alexandria", 80],
      ["Kingdom", 40],
    ],
  ],
  ["Oceanside", [["Hilltop", 110]]],
]);
```

---

## EXO 4 : COMPARAISON NAIVE VS HEAP

_~25 min_

Implémenter deux versions de Dijkstra : une avec un array simple (trouver le minimum par scan linéaire O(V)), une avec un min-heap. Générer un graphe aléatoire de 100 noeuds et 500 arêtes. Mesurer et comparer les temps d'exécution avec `performance.now()`.

---

## CORRIGÉ DE RÉFÉRENCE : À CONSULTER APRÈS TA TENTATIVE

Les corrections ci-dessous utilisent la classe `MinHeap`, la fonction `dijkstra()` et `getPath()` présentées plus haut dans ce document. Elles donnent une implémentation de référence ; tu peux proposer une autre solution si elle respecte le contrat et les mêmes cas limites.

### Exo 1 : Le GPS de León Luis

```js
function fastestRoute(city, start, target) {
  const { dist, prev } = dijkstra(city, start);
  const distance = dist.get(target);
  if (distance === undefined || !Number.isFinite(distance)) {
    return { path: [], minutes: Infinity };
  }
  const path = getPath(prev, start, target);
  return path.length > 0
    ? { path, minutes: distance }
    : { path: [], minutes: Infinity };
}

const route = fastestRoute(city, "Shinjuku", "Ginza");
console.log(route);
// { path: ["Shinjuku", "Shibuya", "Roppongi", "Ginza"], minutes: 30 }
```

Le chemin passe par Shibuya puis Roppongi : `12 + 8 + 10 = 30` minutes. La route directe Shinjuku → Shibuya → Ginza coûte `12 + 22 = 34` minutes.

### Exo 2 : Dijkstra avec contrainte de carburant

La consigne initiale ne fournissait pas de coût de carburant. Voici une fixture explicite. Ici, `maxFuel` est un **budget total de carburant pour tout le trajet**, sans ravitaillement intermédiaire ; chaque arête contient `[voisin, minutes, carburant]`.

```js
const fuelCity = new Map([
  [
    "Konoha",
    [
      ["Suna", 12, 6],
      ["Kiri", 18, 3],
    ],
  ],
  [
    "Suna",
    [
      ["Kiri", 3, 1],
      ["Iwa", 12, 6],
    ],
  ],
  [
    "Kiri",
    [
      ["Suna", 3, 1],
      ["Iwa", 9, 4],
    ],
  ],
  ["Iwa", []],
]);

function fastestRouteWithFuel(graph, start, target, maxFuel) {
  if (!(graph instanceof Map)) throw new TypeError("graph doit être une Map");
  if (!graph.has(start) || !graph.has(target))
    throw new RangeError("Sommet de départ ou d'arrivée absent");
  if (!Number.isFinite(maxFuel) || maxFuel < 0)
    throw new RangeError("maxFuel doit être fini et positif ou nul");

  for (const [node, edges] of graph) {
    if (!Array.isArray(edges))
      throw new TypeError(`Arêtes invalides pour ${String(node)}`);
    for (const edge of edges) {
      if (!Array.isArray(edge) || edge.length !== 3)
        throw new TypeError(
          "Chaque arête doit être [voisin, minutes, carburant]",
        );
      const [neighbor, minutes, fuel] = edge;
      if (!graph.has(neighbor))
        throw new RangeError(`Voisin absent : ${String(neighbor)}`);
      if (
        !Number.isFinite(minutes) ||
        minutes < 0 ||
        !Number.isFinite(fuel) ||
        fuel < 0
      ) {
        throw new RangeError(
          "Minutes et carburant doivent être finis et non négatifs",
        );
      }
    }
  }

  // Un état est défini par le sommet ET le carburant déjà consommé.
  const best = new Map([...graph.keys()].map((node) => [node, new Map()]));
  const queue = new MinHeap();
  best.get(start).set(0, 0);
  queue.push([0, start, 0, [start]]); // [minutes, sommet, carburant, chemin]

  while (queue.size > 0) {
    const [minutes, node, fuel, path] = queue.pop();
    if (minutes !== best.get(node).get(fuel)) continue;
    if (node === target) return { path, minutes, fuel };

    for (const [neighbor, edgeMinutes, edgeFuel] of graph.get(node)) {
      const nextFuel = fuel + edgeFuel;
      if (nextFuel > maxFuel) continue;
      const nextMinutes = minutes + edgeMinutes;
      const previousBest = best.get(neighbor).get(nextFuel) ?? Infinity;
      if (nextMinutes < previousBest) {
        best.get(neighbor).set(nextFuel, nextMinutes);
        queue.push([nextMinutes, neighbor, nextFuel, [...path, neighbor]]);
      }
    }
  }

  return { path: [], minutes: Infinity, fuel: Infinity };
}

console.log(fastestRouteWithFuel(fuelCity, "Konoha", "Iwa", 8));
// { path: ["Konoha", "Kiri", "Iwa"], minutes: 27, fuel: 7 }
```

Le chemin Konoha → Suna → Iwa est plus rapide en temps brut (`24` minutes), mais consomme `12` unités de carburant : il dépasse le budget de `8` et doit être rejeté. L'état doit donc mémoriser le carburant restant/consommé, pas seulement le sommet.

### Exo 3 : Réseau de distribution Walking Dead

```js
const { dist: campDistances } = dijkstra(roads, "Alexandria");
const reachableCamps = [...campDistances.entries()].filter(([, distance]) =>
  Number.isFinite(distance),
);
const farthestCamp = reachableCamps.reduce((best, current) =>
  current[1] > best[1] ? current : best,
);

console.log(Object.fromEntries(campDistances));
// { Alexandria: 0, Hilltop: 50, Kingdom: 120, Saviors: 80, Oceanside: 160 }
console.log(farthestCamp); // ["Oceanside", 160]
console.log(
  farthestCamp[1] > 200 ? "ALERTE : plus de 200 km" : "Distance sous le seuil",
);
// "Distance sous le seuil"
```

Le chemin optimal vers Oceanside passe par Hilltop : `50 + 110 = 160 km`. Le réseau ne déclenche donc pas l'avertissement de 200 km.

### Exo 4 : Comparaison naive vs heap

La fixture ci-dessous crée un graphe **non orienté, connexe, déterministe** de 100 sommets et 500 arêtes distinctes. Le générateur pseudo-aléatoire sert uniquement à produire une fixture reproductible ; il ne convient pas à un usage cryptographique.

```js
function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

function generateGraph(nodeCount = 100, edgeCount = 500, seed = 42) {
  if (
    nodeCount < 3 ||
    edgeCount < nodeCount ||
    edgeCount > (nodeCount * (nodeCount - 1)) / 2
  ) {
    throw new RangeError("Dimensions de graphe impossibles");
  }
  const random = createSeededRandom(seed);
  const graph = new Map(
    Array.from({ length: nodeCount }, (_, node) => [node, []]),
  );
  const keys = new Set();

  function addEdge(a, b) {
    if (a === b) return false;
    const low = Math.min(a, b);
    const high = Math.max(a, b);
    const key = `${low}:${high}`;
    if (keys.has(key)) return false;
    keys.add(key);
    const weight = 1 + Math.floor(random() * 20);
    graph.get(a).push([b, weight]);
    graph.get(b).push([a, weight]);
    return true;
  }

  // Un cycle connecte les 100 sommets avant l'ajout des autres arêtes.
  for (let node = 0; node < nodeCount; node++)
    addEdge(node, (node + 1) % nodeCount);
  while (keys.size < edgeCount) {
    const a = Math.floor(random() * nodeCount);
    const b = Math.floor(random() * nodeCount);
    addEdge(a, b);
  }
  return graph;
}

function dijkstraNaive(graph, start) {
  const dist = new Map([...graph.keys()].map((node) => [node, Infinity]));
  const unvisited = new Set(graph.keys());
  dist.set(start, 0);

  while (unvisited.size > 0) {
    let current = null;
    let smallest = Infinity;
    for (const node of unvisited) {
      if (dist.get(node) < smallest) {
        smallest = dist.get(node);
        current = node;
      }
    }
    if (current === null) break;
    unvisited.delete(current);

    for (const [neighbor, weight] of graph.get(current)) {
      if (!unvisited.has(neighbor)) continue;
      const candidate = smallest + weight;
      if (candidate < dist.get(neighbor)) dist.set(neighbor, candidate);
    }
  }
  return dist;
}

function assertSameDistances(left, right) {
  for (const [node, distance] of left) {
    if (distance !== right.get(node))
      throw new Error(`Distance différente pour le sommet ${node}`);
  }
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

const benchmarkGraph = generateGraph(100, 500, 42);
const naiveExpected = dijkstraNaive(benchmarkGraph, 0);
const heapExpected = dijkstra(benchmarkGraph, 0).dist;
assertSameDistances(naiveExpected, heapExpected); // même résultat avant mesure

const naiveTimes = [];
const heapTimes = [];
for (let run = 0; run < 5; run++) {
  let startTime = performance.now();
  dijkstraNaive(benchmarkGraph, 0);
  naiveTimes.push(performance.now() - startTime);

  startTime = performance.now();
  dijkstra(benchmarkGraph, 0);
  heapTimes.push(performance.now() - startTime);
}
console.log({
  nodes: benchmarkGraph.size,
  edges: 500,
  runs: 5,
  naiveMedianMs: median(naiveTimes),
  heapMedianMs: median(heapTimes),
  resultsIdentical: true,
});
```

Ne transforme pas un seul temps mesuré en loi générale : sur un graphe de 100 sommets, le coût de démarrage et le moteur peuvent masquer l'écart théorique. La preuve attendue est d'abord l'égalité des distances, puis une mesure répétée et contextualisée.

---

## RÉSUMÉ

Dijkstra s'applique à un graphe fini dont les poids sont **non négatifs** (zéro est autorisé). À chaque étape, il extrait le sommet de distance provisoire minimale. Avec une file de priorité binaire, la complexité usuelle est `O((V+E) log V)`. Deux pièges absolus : accepter un poids négatif (utiliser Bellman-Ford à la place) et oublier le contrôle `currDist > dist.get(node)`, qui ignore les entrées obsolètes de la file. La reconstruction remonte les prédécesseurs ; elle doit aussi traiter explicitement une destination inconnue ou inaccessible.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Dijkstra : le chemin le plus court qui alimente tous les gps** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « Dijkstra : le chemin le plus court qui alimente tous les gps » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.
