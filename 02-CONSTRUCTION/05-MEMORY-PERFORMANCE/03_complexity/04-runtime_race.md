---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
cognitive_level: L4
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# RUNTIME RACE : O(n log n) VS O(n²) : tri jusqu’à 10K, recherche jusqu’à 100K

Temps de lecture ~10 min

Sur 10 éléments, O(n²) et O(n log n) semblent identiques. La différence est invisible. Alors on ne s'en préoccupe pas. Et puis un jour, les données grossissent, et l'app se fige.

Ce fichier met en regard les ordres de grandeur théoriques et des mesures réalisées sur une machine donnée. Les courses ne couvrent pas toutes les mêmes tailles : le tri Bubble Sort est mesuré jusqu'à 10 000 éléments, car 100 000 éléments impliqueraient environ 10 milliards de comparaisons et ne constituent pas un benchmark pédagogique raisonnable ; les recherches et les autres exercices utilisent des tailles distinctes. Les temps observés varient selon le matériel, le runtime, les données et la charge.

---

## 1) LES CHIFFRES D'ABORD

Sur différentes tailles de données, avec les opérations estimées :

```
n     O(n log n)      O(n²)
────────  ──────────────────  ──────────────────────────
100    700 ops       10 000 ops
1 000   10 000 ops      1 000 000 ops
10 000   130 000 ops     100 000 000 ops
100 000  1 700 000 ops    10 000 000 000 ops
1 000 000 20 000 000 ops    1 000 000 000 000 ops
```

À 100 000 éléments, les termes de croissance représentent environ 1,7 million pour n log₂(n) et 10 milliards pour n². Le rapport d'environ 5 900 illustre l'écart des termes dominants, pas un ratio de temps garanti entre deux programmes concrets.

---

## 2) LE BENCHMARK : METTRE ÇA EN PRATIQUE

```js
// Mesure courte avec échauffement et plusieurs échantillons.
function bench(label, fn, { warmups = 3, runs = 9 } = {}) {
  for (let i = 0; i < warmups; i += 1) fn();
  const samples = [];
  for (let i = 0; i < runs; i += 1) {
    const start = performance.now();
    fn();
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  const median = samples[Math.floor(samples.length / 2)];
  console.log(`[${label}] médiane de ${runs} runs : ${median.toFixed(2)}ms`);
  return median;
}

// Générer un tableau de n éléments aléatoires
function generateData(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    score: Math.random() * 1000,
  }));
}
```

---

## 3) RACE 1 : TRI : BUBBLE SORT VS ARRAY.SORT

```js
// Bubble sort:O(n²)
function bubbleSort(arr) {
  const a = [...arr]; // on ne mute pas l'original
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j].score > a[j + 1].score) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

// Array.sort natif : complexité et algorithme internes dépendent du moteur et de sa version
function nativeSort(arr) {
  return [...arr].sort((a, b) => a.score - b.score);
}

// La course
const sizes = [100, 1_000, 5_000, 10_000];

for (const n of sizes) {
  const data = generateData(n);

  console.log(`\n── n = ${n} ──`);
  bench(`bubble sort O(n²)  `, () => bubbleSort(data));
  bench(`native sort O(n log n)`, () => nativeSort(data));
}
```

Exemple de sortie possible sur une machine donnée (ne pas la considérer comme une référence universelle). Pour une comparaison exploitable, le code réchauffe chaque fonction puis prend la médiane de neuf mesures ; conserve aussi les versions Node/V8, le CPU et les tailles mesurées :

```
── n = 100 ──
bubble sort O(n²)   : 0.08ms
native sort O(n log n): 0.02ms

── n = 1 000 ──
bubble sort O(n²)   : 6ms
native sort O(n log n): 0.3ms

── n = 5 000 ──
bubble sort O(n²)   : 140ms
native sort O(n log n): 1.2ms

── n = 10 000 ──
bubble sort O(n²)   : 580ms
native sort O(n log n): 2.5ms
```

Sur cette machine et cette exécution seulement, le ratio affiché décrit les mesures obtenues. Il varie avec le CPU, le runtime, les données, le bruit système et l'implémentation ; ne transforme pas un ratio unique en garantie.

---

## 4) RACE 2 : RECHERCHE : O(n) VS O(log n)

```js
// Recherche linéaire:O(n)
function linearSearch(arr, targetId) {
  for (const item of arr) {
    if (item.id === targetId) return item;
  }
  return null;
}

// Recherche binaire:O(log n):nécessite un tableau trié
function binarySearch(arr, targetId) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid].id === targetId) return arr[mid];
    if (arr[mid].id < targetId) left = mid + 1;
    else right = mid - 1;
  }

  return null;
}

// Données triées par id (requis pour binary search)
const LARGE = 100_000;
const sortedData = generateData(LARGE).sort((a, b) => a.id - b.id);

// On cherche 1000 cibles différentes pour avoir une mesure représentative
const targets = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * LARGE),
);

bench("linear search O(n)  ", () => {
  for (const t of targets) linearSearch(sortedData, t);
});

bench("binary search O(log n)", () => {
  for (const t of targets) binarySearch(sortedData, t);
});
```

Résultats typiques sur 100 000 éléments, 1000 recherches :

```
linear search O(n)   : 85ms  ← parcourt en moyenne 50 000 éléments par recherche
binary search O(log n) : 0.4ms  ← parcourt max 17 éléments par recherche
```

Dans cet exemple, le temps de recherche binaire est environ 212 fois inférieur. Ce ratio dépend de la machine, du runtime, de la distribution et des conditions de mesure ; l'intérêt général vient de la différence de croissance O(n) / O(log n), pas de ce chiffre isolé.

---

## 5) RACE 3 : DÉTECTION DE DOUBLONS : O(n²) VS O(n)

```js
// Version naïve:O(n²)
function hasDuplicateNaive(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].id === arr[j].id) return true;
    }
  }
  return false;
}

// Version avec Set:O(n)
function hasDuplicateSet(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item.id)) return true;
    seen.add(item.id);
  }
  return false;
}

const sizes2 = [1_000, 5_000, 10_000, 50_000];

for (const n of sizes2) {
  // Cas pessimiste : pas de doublon, on parcourt tout
  const data = generateData(n);

  console.log(`\n── n = ${n} ──`);
  if (n <= 10_000) {
    // au-delà bubble sort prend trop de temps pour être intéressant
    bench(`naive O(n²)`, () => hasDuplicateNaive(data));
  }
  bench(`set  O(n) `, () => hasDuplicateSet(data));
}
```

Exemple de sortie illustrative (les résultats réels dépendent de la machine et du runtime) :

```
── n = 1 000 ──
naive O(n²) : 3ms
set  O(n) : 0.05ms

── n = 5 000 ──
naive O(n²) : 80ms
set  O(n) : 0.2ms

── n = 10 000 ──
naive O(n²) : 310ms
set  O(n) : 0.4ms

── n = 50 000 ──
(naive : extrapolation indicative depuis la mesure à 10 000 ; non exécutée dans ce benchmark)
set  O(n) : 2ms
```

---

## 6) LA COURBE VISUELLEMENT

```
temps (ms)
│
│                      O(n²)
│                     ╱
│                   ╱
│                  ╱
│                ╱
│               ╱
│            ╱
│         ╱
│      ╱          O(n log n)
│   ╱          ────────────────────
│ ╱       O(n) ─────────────────
│ ────────────────────────────────────  O(log n)
│ ────────────────────────────────────────────── O(1)
└──────────────────────────────────────────────── n
  100  1k  10k  100k  1M
```

Le point de douleur de O(n²) se situe entre 10 000 et 100 000 éléments. En dessous, c'est tolérable. Au-dessus, c'est rédhibitoire.

---

## 7) QUAND EST-CE QUE ÇA COMPTE EN PROD ?

```
Opération           Taille typique  Complexité à viser
──────────────────────────  ───────────────  ──────────────────
Trier une liste de résultats 10-10 000     O(n log n) ou moins
Chercher un utilisateur    1M+        O(log n) ou O(1)
Détecter des doublons     10k-1M      O(n)
Construire un index      1M+        O(n)
Matcher deux ensembles    100k+       O(n) avec Set/Map
Générer toutes les paires   >1 000      Éviter O(n²)
```

La règle empirique : si les données peuvent dépasser 10 000 éléments et que l'opération doit être interactive, un O(n²) complet doit déclencher une analyse de risque et une mesure réaliste ; le seuil acceptable dépend du coût réel, de la fréquence et du budget de latence.

---

## EXERCICES

### EXO 1 : REPRODUIRE LE BENCHMARK

Lancer le code de la Race 1 (bubble sort vs native sort) sur ta machine avec les tailles `[100, 1000, 5000, 10000]`. Relever les temps, calculer le ratio O(n²)/O(n log n) à chaque taille. Est-ce que le ratio croît ? De combien entre 1000 et 5000 ?

_(Indice : si l'algo est vraiment O(n²) vs O(n log n), le ratio devrait être proportionnel à `n / log n`)_

---

### EXO 2 : OPTIMISER LE SCANNER DE ROUTES

La supply chain de Walter White a un bug de performance. Cette fonction tourne sur 50 000 routes à chaque requête et met 8 secondes. Analyse la complexité, identifie le problème, propose la version optimisée.

```js
function findComplementaryRoutes(routes, budget) {
  const valid = [];
  const indicesByCost = new Map();

  for (let j = 0; j < routes.length; j += 1) {
    const route = routes[j];
    const complements = indicesByCost.get(budget - route.cost) ?? [];
    for (const i of complements) valid.push([routes[i].id, route.id]);

    const sameCost = indicesByCost.get(route.cost) ?? [];
    sameCost.push(j);
    indicesByCost.set(route.cost, sameCost);
  }

  return valid;
}
```

**Contrainte supplémentaire :** il peut y avoir plusieurs paires valides. La solution optimisée doit toutes les retouver.

_(Indice : une Map permet de trouver les compléments en O(n + k) en moyenne, où k est le nombre de paires retournées. La sortie elle-même peut contenir Θ(n²) paires ; il est donc impossible de promettre O(n) lorsque k est quadratique.)_

---

### EXO 3 : MESURER ET PROJETER

Tu as mesuré ces temps sur ton système :

```
n = 1 000  → 2ms
n = 2 000  → 8ms
n = 4 000  → 32ms
```

En déduire :

1. La complexité de cet algorithme (O(n), O(n log n), O(n²) ?)
2. Le temps estimé pour n = 10 000
3. Le temps estimé pour n = 100 000

Méthode : si doubler n multiplie le temps par 4 → O(n²). Par 2 → O(n). Par ~2.1 → O(n log n).

---

## RÉSUMÉ

O(n²) et O(n log n) peuvent sembler proches sur de petites données ; leur écart de croissance devient important lorsque n augmente. Dans l'exemple de sortie de la Race 1, Bubble Sort à 10 000 éléments prend environ 580 ms et le tri natif environ 2,5 ms : ce sont des valeurs illustratives, pas des seuils universels. La course de tri s'arrête à 10 000 éléments ; aucune mesure Bubble Sort à 100 000 éléments n'est revendiquée. Pour chercher plusieurs fois dans une collection, un index `Set` ou `Map` peut éviter le parcours répété, sous réserve que le coût de construction et la mémoire de l'index soient pris en compte. `performance.now()` aide à comparer des durées, à condition de réchauffer le code et d'utiliser plusieurs échantillons représentatifs.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « RUNTIME RACE : O(n log n) VS O(n²) SUR 100K ÉLÉMENTS », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
