---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, temps_limite]
anti_recipe_key: decision_inversee+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Dynamic programming : ne calcule jamais deux fois la même chose

Temps de lecture ~9 min

DP c'est une idée simple : si tu as déjà calculé quelque chose, stocke le résultat. Ne le recalcule pas.

La récursion naïve recalcule les mêmes sous-problèmes des milliers de fois. DP les mémorise. Résultat : O(2^n) devient O(n). La différence entre "tourne pas" et "tourne en 0.1ms".

---

## 1) LE PROBLÈME : FIBONACCI NAÏF

```js
function fibNaif(n) {
  if (n <= 1) return n;
  return fibNaif(n - 1) + fibNaif(n - 2);
}
```

Regarde ce qui se passe pour `fib(5)` :

```text
fib(5)
├── fib(4)
│  ├── fib(3)
│  │  ├── fib(2)
│  │  │  ├── fib(1) = 1
│  │  │  └── fib(0) = 0
│  │  └── fib(1)   = 1
│  └── fib(2)
│    ├── fib(1)   = 1  <-- déjà calculé
│    └── fib(0)   = 0  <-- déjà calculé
└── fib(3)
  ├── fib(2)     <-- déjà calculé
  │  ├── fib(1)   <-- déjà calculé
  │  └── fib(0)   <-- déjà calculé
  └── fib(1)     <-- déjà calculé
```

`fib(2)` est calculé 3 fois. `fib(1)` est calculé 5 fois.

Pour `fib(40)` : 2^40 ≈ 1 milliard d'appels. Pour `fib(50)` : intenable.

---

## 2) MÉMOÏZATION : TOP-DOWN DP

Mémoïzer = stocker le résultat la première fois qu'on le calcule. Si on retombe sur le même problème : retourne le cache.

```js
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n); // déjà calculé : retourne le cache

  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result); // stocke avant de retourner
  return result;
}

// maintenant fib(40) = instantané
// chaque fib(k) est calculé exactement UNE fois
console.log(fibMemo(40)); // 102334155
console.log(fibMemo(100)); // 354224848179261915075
```

L'arbre de récursion avec mémo :

```text
fib(5)
├── fib(4)
│  ├── fib(3)
│  │  ├── fib(2)
│  │  │  ├── fib(1) = 1
│  │  │  └── fib(0) = 0
│  │  │  memo[2] = 1
│  │  └── fib(1) = 1 (cache)
│  │  memo[3] = 2
│  └── fib(2) = 1 (cache) <-- une ligne, pas un sous-arbre entier
│  memo[4] = 3
└── fib(3) = 2 (cache)   <-- idem
```

**Complexité :** O(n) temps, O(n) espace.

---

## 3) TABULATION : BOTTOM-UP DP

Au lieu de partir du haut et de mémoïzer, partir du bas et remplir un tableau.

```js
function fibTab(n) {
  if (n <= 1) return n;

  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  // on remplit de bas en haut
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.log(fibTab(10)); // 55
console.log(fibTab(40)); // 102334155
```

**Optimisation espace :** pour Fibonacci, tu n'as besoin que des deux dernières valeurs.

```js
function fibOptimal(n) {
  if (n <= 1) return n;
  let prev = 0,
    curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

// O(n) temps, O(1) espace
```

---

## 4) MÉMO VS TABULATION : QUAND CHOISIR QUOI

```text
        Mémoïzation (Top-Down)   Tabulation (Bottom-Up)
Direction    Du problème vers les bases Des bases vers le problème
Structure    Récursion + cache      Itératif + tableau
Sous-problèmes Seulement ceux nécessaires Tous les sous-problèmes
Stack overflow Risque sur grands n     Aucun risque
Lisibilité   Plus naturelle       Plus efficace
```

```js
// exemple où mémoïzation calcule moins de sous-problèmes

// problème : peut-on atteindre l'index final avec des sauts de 1 à k ?
// on n'a pas forcément besoin de tous les sous-problèmes

function canJump(nums) {
  const n = nums.length;
  const memo = new Map();

  function dp(i) {
    if (i >= n - 1) return true; // arrivé ou dépassé la fin
    if (memo.has(i)) return memo.get(i);

    const maxJump = nums[i];
    for (let j = 1; j <= maxJump; j++) {
      if (dp(i + j)) {
        memo.set(i, true);
        return true;
      }
    }

    memo.set(i, false);
    return false;
  }

  return dp(0);
}

console.log(canJump([2, 3, 1, 1, 4])); // true
console.log(canJump([3, 2, 1, 0, 4])); // false
```

---

## 5) IDENTIFIER UN PROBLÈME DP

Un problème est résolvable par DP si deux conditions sont réunies :

**1. Sous-structure optimale :** la solution optimale au problème contient les solutions optimales à ses sous-problèmes.

**2. Sous-problèmes qui se chevauchent :** les mêmes sous-problèmes sont résolus plusieurs fois dans la récursion naïve.

```text
Test rapide : si la récursion naïve recalcule les mêmes choses --> DP

Problèmes DP classiques :
- chemins dans une grille (chaque cellule dépend de ses voisins)
- optimisation avec contraintes (knapsack)
- sous-séquences (LCS, LIS)
- partitionnement de tableau (coin change)
- jeux à deux joueurs (minimax)

Problèmes PAS DP (récursion sans chevauchement) :
- binary search (divide and conquer pur)
- merge sort (chaque sous-tableau traité une fois)
- backtracking (exploration exhaustive sans cache utile)
```

---

## 6) CLIMBING STAIRS : LE FIBONACCI DÉGUISÉ

Tu montes un escalier de n marches. À chaque étape tu peux monter 1 ou 2 marches. Combien de façons différentes d'arriver en haut ?

```text
n = 1 : [1]        --> 1 façon
n = 2 : [1,1] ou [2]   --> 2 façons
n = 3 : [1,1,1] [1,2] [2,1] --> 3 façons
n = 4 : 5 façons
n = 5 : 8 façons
```

C'est Fibonacci. `ways(n) = ways(n-1) + ways(n-2)`.

```js
function climbStairs(n) {
  if (n <= 2) return n;

  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// variante : sauts de 1, 2 ou 3 marches
function climbStairsK(n, k = 3) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1; // une façon d'être en bas : ne pas bouger

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k && j <= i; j++) {
      dp[i] += dp[i - j];
    }
  }

  return dp[n];
}

console.log(climbStairsK(4, 3));
// [1] [1,1] [1,1,1] [1,1,2] [1,2,1] [2,1] [2,2] [3,1] [1,3] --> dépend de k
```

---

## EXERCICES

## EXO 1 : Naruto's chakra path

_~20 min_

Naruto monte une séquence de checkpoints chakra. Au checkpoint i, il peut récupérer `chakra[i]` points. Contrainte : il ne peut pas utiliser deux checkpoints adjacents (trop visible). Trouve le maximum de chakra récupérable.

```js
maxChakra([3, 10, 3, 1, 2]); // 12 (index 1 + index 4)
maxChakra([2, 7, 9, 3, 1]); // 12 (index 0 + index 2 + index 4)
maxChakra([1]); // 1
```

(c'est le "House Robber" problem)

---

## EXO 2 : Nombre de chemins dans une grille

_~15 min_

T'as une grille m x n. Tu pars du coin supérieur gauche, tu veux arriver au coin inférieur droit. Tu peux seulement aller à droite ou en bas. Combien de chemins différents ?

```js
uniquePaths(3, 7); // 28
uniquePaths(3, 2); // 3
uniquePaths(1, 1); // 1
```

---

## EXO 3 : Comparer mémo vs tabulation sur Fibonacci

_~20 min_

Implémente `fibMemo`, `fibTab`, et `fibOptimal`. Mesure le temps pour n = 100, 1000, 10000. Compare la mémoire utilisée (compte les entrées dans le Map/Array). Identifie à partir de quel n l'optimisation d'espace devient significative.

---

## RÉSUMÉ

DP : identifier les sous-problèmes qui se répètent, les stocker, ne jamais les recalculer. Deux approches : mémoïzation top-down (récursion + cache, calcule seulement ce qui est nécessaire) et tabulation bottom-up (itératif, remplit tous les sous-problèmes dans l'ordre). Un problème est DP si : sous-structure optimale ET chevauchement de sous-problèmes. La majorité des problèmes DP peuvent être optimisés en espace en ne gardant que les dernières valeurs du tableau.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Transfert : changer de contexte

Applique le mécanisme de « Dynamic programming : ne calcule jamais deux fois la même chose » à un volume de données dix fois plus grand ou une mémoire dix fois plus petite. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Dynamic programming : ne calcule jamais deux fois la même chose** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « Dynamic programming : ne calcule jamais deux fois la même chose » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.
