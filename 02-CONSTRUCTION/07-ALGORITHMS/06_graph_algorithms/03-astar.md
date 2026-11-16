---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
cognitive_level: L3
perturbation_modes: [changement_echelle, solution_concurrente]
anti_recipe_key: changement_echelle+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

# A\* : DIJKSTRA AVEC UN CERVEAU

Temps de lecture ~10 min

Dijkstra explore dans toutes les directions depuis le départ. Il ne sait pas où est l'arrivée. Il s'en fout : il finalise les noeuds du plus proche au plus loin, dans toutes les directions à la fois.

A\* sait où est l'arrivée. Il utilise cette information pour prioriser les noeuds qui semblent aller dans la bonne direction. Résultat : il explore beaucoup moins de noeuds que Dijkstra sur la plupart des problèmes de pathfinding.

La différence tient dans une seule ligne : la fonction de coût.

```
Dijkstra : f(n) = g(n)
A*    : f(n) = g(n) + h(n)

g(n) = coût réel depuis le départ jusqu'à n
h(n) = estimation (heuristique) du coût restant de n jusqu'à l'arrivée
```

Si `h(n) = 0` : A\* se comporte comme Dijkstra (avec une règle de départage éventuellement différente).
Si `h(n)` est parfaite : l'exploration peut être fortement réduite, mais plusieurs noeuds situés sur des chemins optimaux peuvent encore être examinés selon les égalités et le départage.

---

## 1) L'HEURISTIQUE : LE COEUR D'A\*

L'heuristique `h(n)` doit être **admissible** : elle ne doit jamais surestimer le coût restant réel. Avec des coûts d'arêtes non négatifs et cette implémentation qui peut réouvrir un sommet lorsqu'un meilleur coût est trouvé, une heuristique admissible permet de préserver l'optimalité. Une heuristique cohérente (consistante) simplifie en plus la gestion des sommets déjà explorés. Une heuristique qui surestime peut faire perdre la garantie d'optimalité.

```
Grille 2D, mouvements dans 4 directions :
h(n) = distance Manhattan = |x1-x2| + |y1-y2|
    => sous-estime ou est exacte (jamais plus grand que le chemin réel)
    => admissible

Grille 2D, mouvements en 8 directions :
- Chebyshev = max(|dx|, |dy|) si un pas diagonal coûte exactement 1,
  comme un pas horizontal ou vertical.
- Distance octile si un pas droit coûte 1 et un pas diagonal coûte √2.
  Elle tient compte du coût réel des déplacements diagonaux.

Espace euclidien (coordonnées continues) :
h(n) = distance euclidienne = sqrt(dx² + dy²)
    => admissible si chaque déplacement autorisé coûte au moins
       la distance euclidienne qu'il parcourt.

Heuristique nulle :
h(n) = 0 => Dijkstra pur, toujours admissible mais pas de gain de perf
```

---

## 2) IMPLÉMENTATION A\* SUR GRILLE

```js
function astar(grid, start, goal) {
  // Contrat : grille rectangulaire non vide, 0 = libre, 1 = obstacle.
  if (
    !Array.isArray(grid) ||
    grid.length === 0 ||
    !Array.isArray(grid[0]) ||
    grid[0].length === 0
  ) {
    throw new TypeError("grid doit être une grille rectangulaire non vide");
  }
  const rows = grid.length;
  const cols = grid[0].length;
  if (
    !grid.every(
      (row) =>
        Array.isArray(row) &&
        row.length === cols &&
        row.every((cell) => cell === 0 || cell === 1),
    )
  ) {
    throw new TypeError(
      "chaque ligne doit avoir la même longueur et contenir uniquement 0 ou 1",
    );
  }
  const validPoint = (point) =>
    Array.isArray(point) &&
    point.length === 2 &&
    point.every(Number.isSafeInteger);
  if (!validPoint(start) || !validPoint(goal)) {
    throw new TypeError(
      "start et goal doivent être des paires d'indices entiers",
    );
  }
  const [sr, sc] = start;
  const [gr, gc] = goal;
  const inside = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;
  if (!inside(sr, sc) || !inside(gr, gc)) {
    throw new RangeError("start et goal doivent se trouver dans la grille");
  }
  if (grid[sr][sc] === 1 || grid[gr][gc] === 1) return null;

  function heuristic(r, c) {
    // distance Manhattan : admissible pour mouvements en 4 directions
    return Math.abs(r - gr) + Math.abs(c - gc); // coût unitaire et mouvements 4 directions
  }

  function key(r, c) {
    return `${r},${c}`;
  }

  // g[key] = coût réel depuis le départ
  const g = new Map();
  g.set(key(sr, sc), 0);

  // f[key] = g + h
  const f = new Map();
  f.set(key(sr, sc), heuristic(sr, sc));

  // pour reconstruire le chemin
  const cameFrom = new Map();

  // open set : noeuds à explorer, triés par f
  // (min-heap en prod, array trié ici pour lisibilité)
  // Une amélioration peut créer une nouvelle entrée. Les anciennes entrées
  // restent dans le tableau et seront ignorées lorsqu'elles deviendront périmées.
  const openSet = [[f.get(key(sr, sc)), sr, sc]];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (openSet.length > 0) {
    // extraire le noeud avec f minimal
    openSet.sort((a, b) => a[0] - b[0]);
    const [queuedF, r, c] = openSet.shift();
    const currKey = key(r, c);
    if (queuedF !== f.get(currKey)) continue; // entrée périmée : une meilleure priorité existe

    // arrivée atteinte : reconstruire le chemin
    if (r === gr && c === gc) {
      const path = [];
      let cur = currKey;
      while (cameFrom.has(cur)) {
        const [pr, pc] = cur.split(",").map(Number);
        path.unshift([pr, pc]);
        cur = cameFrom.get(cur);
      }
      path.unshift(start);
      return path;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (grid[nr][nc] === 1) continue; // obstacle

      const neighborKey = key(nr, nc);
      const tentativeG = g.get(currKey) + 1; // coût d'une case = 1

      if (tentativeG < (g.get(neighborKey) ?? Infinity)) {
        // meilleur chemin vers ce voisin trouvé
        cameFrom.set(neighborKey, currKey);
        g.set(neighborKey, tentativeG);
        const fVal = tentativeG + heuristic(nr, nc);
        f.set(neighborKey, fVal);

        // Toujours empiler la nouvelle priorité : ne jamais conserver une priorité obsolète.
        openSet.push([fVal, nr, nc]);
      }
    }
  }

  return null; // pas de chemin
}

// Terrain de patrouille de León Luis : 0=libre, 1=obstacle
const terrain = [
  [0, 0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0],
];

const path = astar(terrain, [0, 0], [4, 5]);
console.log(path);
// [[0,0],[1,0],[2,0],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5]]
```

---

## 3) VISUALISER LA DIFFÉRENCE DIJKSTRA VS A\*

```js
// Sur la grille ci-dessus, compter les noeuds explorés par chaque algo
// (ajouter un compteur dans la boucle principale)

// Résultat typique :
// Dijkstra explore depuis tous les côtés : ~20-25 noeuds
// A* (Manhattan) ne explore quasi que dans la direction de l'arrivée : ~10-14 noeuds

// Différence qui grandit : sur une grille 1000×1000, Dijkstra peut explorer
// plusieurs centaines de milliers de noeuds, A* quelques milliers
```

```
Grille 5×6, départ (0,0), arrivée (4,5) :

Noeuds explorés par Dijkstra :   Noeuds explorés par A* :
D D D D X .            A A . . X .
D X X D X .            A X X A X .
D X D D D D            A X . A A A
D X D X X D            A X . X X A
D D D D D D            A A A A A A

D = exploré par Dijkstra      A = exploré par A*
X = obstacle            X = obstacle
```

---

## 4) A\* AVEC COÛTS VARIABLES

Grille avec des terrains différents : routes, forêts, montagnes. Chaque type a un coût de traversée différent.

```js
const TERRAIN_COST = { 0: 1, 2: 5, 3: 10 };
// 0 = route (coût 1), 2 = forêt (coût 5), 3 = montagne (coût 10), 1 = obstacle

function astarWeighted(grid, start, goal) {
  // même structure, mais le coût d'une case = TERRAIN_COST[grid[nr][nc]]
  // heuristique : distance Manhattan * coût_minimal = Manhattan * 1
  //        (sous-estime toujours si coût minimum = 1)

  function heuristic(r, c) {
    return Math.abs(r - goal[0]) + Math.abs(c - goal[1]); // * 1 = coût minimum
  }

  // ... reste identique, juste changer `tentativeG = g.get(currKey) + 1`
  // par `tentativeG = g.get(currKey) + TERRAIN_COST[grid[nr][nc]]`
}
```

---

## 5) L'HEURISTIQUE INADMISSIBLE : QUAND A\* ACCÉLÈRE MAIS PERD L'OPTIMAL

```js
// Heuristique "pondérée" : multiplier h par un facteur > 1
function heuristicOverestimate(r, c, gr, gc, weight = 2) {
  return weight * (Math.abs(r - gr) + Math.abs(c - gc));
}

// Résultat :
// - Plus rapide : encore moins de noeuds explorés
// - Non optimal : peut rater le chemin le plus court
// - Acceptable quand on préfère la vitesse à la précision absolue
// - Utilisé dans les jeux temps réel où une solution "assez bonne" suffit
```

---

## 6) A\* POUR LE PATHFINDING EN JEU VIDÉO

En jeu vidéo, des milliers d'entités cherchent des chemins chaque frame. Optimisations courantes :

```js
// 1. Hierarchical A* : découper la carte en zones, chercher d'abord zone à zone
// 2. Flow fields : précalculer les directions pour une cible donnée, tous les entités partagent
// 3. Jump Point Search (JPS) : skip les noeuds "inutiles" sur des grilles uniformes
// 4. Waypoint graphs : réduire le graphe aux seuls points significatifs (coins d'obstacles)

// Exemple de waypoint graph (Naruto-style : seuls les carrefours comptent)
const waypointGraph = new Map([
  // chaque waypoint connecté à ses voisins directs visibles
  [
    "W1",
    [
      ["W2", 15],
      ["W3", 22],
    ],
  ],
  [
    "W2",
    [
      ["W1", 15],
      ["W4", 18],
    ],
  ],
  // ...
]);
// Sur ce graphe réduit, A* est beaucoup plus rapide qu'en case par case
```

---

## EXERCICES

## EXO 1 : LA CHASSE AUX HORREURS DE LEON

_~20 min_

León reçoit une alerte : une Horreur est détectée aux coordonnées `[7, 12]`. León est en `[0, 0]`. La carte de la ville est une grille `15×20` avec des zones inaccessibles (bâtiments, rivières). Implémenter `findPath(map, start, target)` avec A\* et la distance Manhattan.

Afficher : le chemin complet, le nombre de noeuds explorés, la longueur du chemin.

---

## EXO 2 : TERRAINS VARIÉS : LA ROUTE DU TOURNOI CHUNIN

_~20 min_

L'escouade de reconnaissance doit traverser un territoire avec différents types de terrain. Chaque type a un coût différent.

```js
// 0 = plaine (1), 1 = obstacle, 2 = forêt (3), 3 = marais (7), 4 = montagne (15)
const territory = [
  [0, 0, 2, 2, 1, 0, 0],
  [0, 2, 2, 3, 1, 0, 0],
  [0, 0, 3, 3, 0, 4, 0],
  [0, 0, 0, 0, 0, 4, 0],
  [0, 1, 1, 0, 0, 0, 0],
];
```

Implémenter `findCheapestPath(territory, start, goal)`. Le coût d'un chemin = somme des coûts de terrain traversés. Retourner le chemin et le coût total.

---

## EXO 3 : DIJKSTRA VS A\* BENCHMARK

_~25 min_

Générer une grille `50×50` avec 30% d'obstacles aléatoires. Lancer Dijkstra et A\* depuis `[0,0]` vers `[49,49]` 100 fois sur des grilles différentes. Comparer :

- temps d'exécution moyen
- nombre de noeuds explorés en moyenne
- pourcentage de cas où aucun chemin n'existe

---

## EXO 4 : A\* AVEC 8 DIRECTIONS

_~25 min_

Modifier A\* pour autoriser les mouvements en diagonale (8 directions). Le coût d'un mouvement diagonal = `√2 ≈ 1.414`. L'heuristique correcte pour 8 directions = distance Chebyshev : `max(|dr|, |dc|)`.

Implémenter `astar8dir(grid, start, goal)` et comparer les chemins obtenus avec la version 4 directions sur la même grille.

---

## RÉSUMÉ

A* = Dijkstra + une heuristique qui guide vers l'objectif. La clé : l'heuristique doit être admissible (jamais surestimer) pour garantir l'optimalité. Distance Manhattan pour les 4 directions, Chebyshev pour les 8, euclidienne pour l'espace continu. Quand `h=0`, A* = Dijkstra. Quand `h` est parfaite, A* ne visite que les noeuds du chemin optimal. En pratique sur des grilles avec obstacles, A* explore 5 à 100 fois moins de noeuds que Dijkstra. En jeu vidéo et robotique, c'est l'algo de pathfinding de référence.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Vérification observable : critères de réussite

Compare le chemin trouvé à Dijkstra sur de petits graphes. Explique quelle propriété de l’heuristique garantit l’optimalité dans les hypothèses choisies.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
