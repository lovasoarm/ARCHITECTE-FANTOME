---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
cognitive_level: L3
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# BACKTRACKING ARENA : SUDOKU, WORD SEARCH, PROBLÈMES RÉELS

Temps de lecture ~12 min

Les bases sont posées. Maintenant on entre dans les arènes réelles : des problèmes où le backtracking n'est pas juste un exercice académique mais la seule approche qui fait sens. Sudoku solver, word search dans une grille, path finding contraint. Ces trois problèmes partagent la même mécanique mais leurs prunings sont complètement différents. C'est là que ça devient intéressant.

---

## 1) SUDOKU SOLVER

Une grille 9×9. Certaines cellules sont remplies. Remplir les vides avec des chiffres 1-9 tel que chaque ligne, colonne et bloc 3×3 ait chaque chiffre exactement une fois.

**Stratégie :** parcourir les cellules vides, essayer chaque chiffre valide, continuer récursivement. Si une cellule n'a aucun chiffre valide : revenir en arrière.

**Pruning critique :** avant de placer un chiffre, vérifier ligne + colonne + bloc 3×3. Un chiffre invalide = branche coupée immédiatement.

```js
// Vérifie si un chiffre peut être placé sans conflit dans la ligne, la colonne et le bloc.
function canPlaceSudoku(board, row, col, digit) {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === digit) return false;
    if (i !== row && board[i][col] === digit) return false;
  }

  const startRow = 3 * Math.floor(row / 3);
  const startCol = 3 * Math.floor(col / 3);
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === digit) return false;
    }
  }
  return true;
}

function isValidSudokuBoard(board) {
  if (!Array.isArray(board) || board.length !== 9) return false;
  if (!board.every((row) => Array.isArray(row) && row.length === 9))
    return false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value !== "." && !/^[1-9]$/.test(value)) return false;
      if (value !== "." && !canPlaceSudoku(board, row, col, value))
        return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  // board : tableau 9x9, "." pour les vides. La grille est modifiée in-place.
  // false signifie grille invalide ou puzzle sans solution ; true signifie solution trouvée.
  if (!isValidSudokuBoard(board)) return false;

  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== ".") continue;

        for (let num = 1; num <= 9; num++) {
          const digit = String(num);
          if (!canPlaceSudoku(board, row, col, digit)) continue;

          board[row][col] = digit;
          if (solve()) return true;
          board[row][col] = ".";
        }
        return false;
      }
    }
    return true;
  }

  return solve();
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const solved = solveSudoku(board); // true si une solution a été trouvée
// board est modifié in-place ; ce solveur trouve une solution, il ne prouve pas qu'elle est unique.
```

**Optimisation avancée :** au lieu de parcourir les cellules dans l'ordre, trouver d'abord la cellule avec le moins de valeurs possibles (minimum remaining values). Ça réduit drastiquement l'arbre.

```js
// Cette fonction réutilise canPlaceSudoku() défini dans le bloc précédent.
function findBestEmpty(board) {
  let best = null;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== ".") continue;

      const candidates = [];
      for (let num = 1; num <= 9; num++) {
        const digit = String(num);
        if (canPlaceSudoku(board, row, col, digit)) candidates.push(digit);
      }

      // Une case vide sans candidat rend la grille insoluble depuis cet état.
      if (candidates.length === 0) return { row, col, candidates };
      if (best === null || candidates.length < best.candidates.length) {
        best = { row, col, candidates };
      }
      if (candidates.length === 1) return best;
    }
  }

  return best; // null signifie qu'il ne reste aucune case vide.
}

function solveSudokuMRV(board) {
  if (!isValidSudokuBoard(board)) return false;

  function solve() {
    const choice = findBestEmpty(board);
    if (choice === null) return true; // aucune cellule vide : la grille est résolue

    const { row, col, candidates } = choice;
    for (const digit of candidates) {
      board[row][col] = digit;
      if (solve()) return true;
      board[row][col] = "."; // retour arrière si cette branche échoue
    }
    return false;
  }

  return solve();
}
```

---

## 2) WORD SEARCH DANS UNE GRILLE

Grille de lettres. Un mot cible. Le mot peut-il être formé en suivant des cellules adjacentes (haut, bas, gauche, droite) sans repasser par la même cellule ?

```js
function validateWordGrid(board) {
  if (!Array.isArray(board) || board.length === 0)
    throw new TypeError("board doit être une grille non vide");
  if (!Array.isArray(board[0]) || board[0].length === 0)
    throw new TypeError("la grille doit avoir au moins une colonne");
  const width = board[0].length;
  if (!board.every((row) => Array.isArray(row) && row.length === width)) {
    throw new TypeError("la grille doit être rectangulaire");
  }
  if (!board.every((row) => row.every((cell) => typeof cell === "string"))) {
    throw new TypeError("chaque cellule doit contenir une chaîne");
  }
  return width;
}

function wordSearch(board, word) {
  if (typeof word !== "string")
    throw new TypeError("word doit être une chaîne");
  if (word.length === 0) return true; // convention : le mot vide est trouvé sans parcourir la grille
  const m = board.length;
  const n = validateWordGrid(board);
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));

  function backtrack(row, col, idx) {
    if (idx === word.length) return true;
    if (row < 0 || row >= m || col < 0 || col >= n) return false;
    if (visited[row][col] || board[row][col] !== word[idx]) return false;

    visited[row][col] = true;
    for (const [dr, dc] of directions) {
      if (backtrack(row + dr, col + dc, idx + 1)) return true;
    }
    visited[row][col] = false; // annulation obligatoire avant d'essayer un autre chemin
    return false;
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (backtrack(row, col, 0)) return true;
    }
  }
  return false;
}

const grid = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
console.log(wordSearch(grid, "ABCCED")); // true
console.log(wordSearch(grid, "ABCB")); // false : B déjà utilisé, ne peut pas revenir dessus
```

**Optimisation : marquer in-place**

Au lieu d'un tableau `visited` séparé, modifier la grille directement. Plus économique en mémoire.

```js
function wordSearchInPlace(board, word) {
  if (typeof word !== "string")
    throw new TypeError("word doit être une chaîne");
  if (word.length === 0) return true;
  const m = board.length;
  const n = validateWordGrid(board); // fonction définie dans le bloc précédent
  const visited = Symbol("visited"); // aucun caractère de l'alphabet ne peut entrer en collision avec ce marqueur

  function backtrack(row, col, idx) {
    if (idx === word.length) return true;
    if (row < 0 || row >= m || col < 0 || col >= n) return false;
    if (board[row][col] !== word[idx]) return false;

    const previous = board[row][col];
    board[row][col] = visited;
    const found =
      backtrack(row - 1, col, idx + 1) ||
      backtrack(row + 1, col, idx + 1) ||
      backtrack(row, col - 1, idx + 1) ||
      backtrack(row, col + 1, idx + 1);
    board[row][col] = previous; // restaurer même lorsque le mot est trouvé
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (backtrack(r, c, 0)) return true;
    }
  }
  return false;
}
```

**Pruning supplémentaire avant même de commencer :**

```js
// Compter les lettres disponibles vs les lettres requises
// Si le mot demande 3 fois "A" et la grille n'en a que 2 : retourner false immédiatement
function preCheck(board, word) {
  if (typeof word !== "string")
    throw new TypeError("word doit être une chaîne");
  if (word.length === 0) return true;
  validateWordGrid(board); // contrôle la forme rectangulaire et les cellules
  const freq = new Map();
  for (const row of board) {
    for (const char of row) freq.set(char, (freq.get(char) ?? 0) + 1);
  }
  for (const char of word) {
    const remaining = freq.get(char) ?? 0;
    if (remaining === 0) return false;
    freq.set(char, remaining - 1);
  }
  return true;
}
```

---

## 3) LETTER COMBINATIONS D'UN NUMÉRO DE TÉLÉPHONE

Mapping téléphone : 2="abc", 3="def", etc. Donner toutes les combinaisons de lettres pour un numéro donné.

```js
function letterCombinations(digits) {
  if (!digits) return [];

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  function backtrack(idx, current) {
    if (idx === digits.length) {
      result.push(current);
      return;
    }

    for (const letter of map[digits[idx]]) {
      // pas de pop nécessaire : string est immutable, on passe une nouvelle string
      backtrack(idx + 1, current + letter);
    }
  }

  backtrack(0, "");
  return result;
}

console.log(letterCombinations("23"));
// ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

Note : avec des strings immutables, pas besoin de `push/pop`. La concaténation `current + letter` crée une nouvelle string à chaque niveau. Plus lisible, légèrement moins efficace sur de très longues strings.

---

## 4) PALINDROME PARTITIONING

<!-- AF-DIAGRAM:sharding -->

```text
                 key
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
       Shard 0 Shard 1  Shard 2
          │       │        │
        keys    keys     keys
```

Le sharding répartit les données selon une clé afin de distribuer stockage et charge.

Découper une string en toutes les partitions possibles où chaque sous-chaîne est un palindrome.

```js
function palindromePartition(s) {
  const result = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, current) {
    if (start === s.length) {
      result.push([...current]);
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      // pruning : si la sous-chaîne n'est pas un palindrome, skip
      if (!isPalindrome(s, start, end - 1)) continue;

      current.push(s.slice(start, end));
      backtrack(end, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// La squad de Leon Luis analyse des codes de Horreurs : trouver toutes les partitions palindromiques
console.log(palindromePartition("aab"));
// [["a","a","b"], ["aa","b"]]
```

---

## 5) COMPARER LES APPROCHES : BACKTRACKING VS DP

Pour certains problèmes, backtracking et DP sont deux angles d'attaque sur le même problème. Choisir entre les deux dépend de ce qu'on cherche.

```
         Backtracking     DP
But      Trouver toutes    Trouver l'optimal
        les solutions    (ou compter)

Mémoire    O(profondeur     O(taille de
        * état)        la table)

Quand utiliser Toutes solutions,   Optimisation,
        contraintes      comptage,
        complexes,      pas besoin de
        grilles        toutes solutions

Exemple    Sudoku solver     Coin change
        N-Queens       Longest common
        Word search      subsequence
        Permutations     Knapsack
```

Word break (peut-on découper le mot ?) : DP.
Word break (donner tous les découpages possibles) : backtracking.

---

## 6) LE PIÈGE : ÉTAT PARTAGÉ ENTRE BRANCHES

```js
// BUG subtil : visited partagé entre les appels de la boucle externe
function wordSearchBuggy(board, word) {
  const visited = Array.from({ length: board.length }, () =>
    new Array(board[0].length).fill(false),
  );

  function backtrack(row, col, idx) {
    if (idx === word.length) return true;
    // ...
    visited[row][col] = true;
    // explore...
    visited[row][col] = false;
    return false;
  }

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      // visited est créé UNE SEULE FOIS en dehors de la boucle
      // si backtrack(r,c,0) modifie visited et retourne false
      // le prochain appel backtrack(r,c+1,0) part avec un visited potentiellement modifié
      // => bug si le reset en fin de backtrack n'est pas parfait
      if (backtrack(r, c, 0)) return true;
    }
  }
  return false;
}

// CORRECT : créer visited à l'intérieur de la boucle externe,
// ou s'assurer que le reset est parfait (modification in-place + restauration)
```

---

## EXERCICES

## EXO 1 : LE BINGO DE SHIKAMARU

_~20 min_

Shikamaru doit résoudre un Sudoku pour décoder un message codé de l'ANBU. Implémenter `solveSudoku(board)` complet avec la vérification ligne + colonne + bloc 3×3. La grille est modifiée in-place.

Ajouter un compteur d'appels récursifs. Puis ajouter l'optimisation MRV (minimum remaining values) et comparer les deux compteurs.

---

## EXO 2 : LES MOTS CACHÉS DE WALTER WHITE

_~25 min_

Walter cache des messages dans des grilles de lettres. Implémenter `findAllWords(board, wordList)` : donner tous les mots de `wordList` présents dans la grille.

```js
const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
const wordList = ["oath", "pea", "eat", "rain"];
// résultat attendu : ["eat", "oath"]
```

(indice : backtracking classique pour chaque mot, ou Trie pour optimiser sur une grande wordList)

---

## EXO 3 : LES CODES DE CHAKRA DE NARUTO

_~25 min_

Le système de scellement ninja utilise des séquences de signes de main. Chaque chiffre 2-9 correspond à des signes. Générer toutes les séquences de signes possibles pour le numéro de sceau `"2367"`.

Implémenter `letterCombinations(digits)`. Puis étendre : `letterCombinationsFiltered(digits, minLength, contains)` qui ne retourne que les combinaisons d'au moins `minLength` caractères contenant la lettre `contains`.

---

## EXO 4 : ROBOT UNIQUE PATH AVEC OBSTACLES ET COLLECTION

_~20 min_

Un robot part de `(0,0)` d'une grille `m×n`. Il peut aller bas ou droite. Certaines cellules sont des obstacles. D'autres contiennent des cristaux (valeur > 0). Trouver **tous les chemins** qui collectent au moins `minCrystals` cristaux.

Implémenter `findRichPaths(grid, minCrystals)`. Retourner la liste de tous les chemins valides avec leur total de cristaux.

```js
const grid = [
  [0, 3, 0, 0],
  [0, -1, 5, 0], // -1 = obstacle
  [4, 0, 0, 2],
];
// minCrystals = 8 => quels chemins collectent >= 8 cristaux ?
```

---

## RÉSUMÉ

Sudoku, word search, combination sum : trois arènes, trois prunings différents, même mécanique. Sudoku prune sur les contraintes de ligne/colonne/bloc avant de placer. Word search prune sur la lettre courante et la cellule déjà visitée. Letter combinations n'a pas besoin de prune : l'arbre est déjà borné par les longueurs. La vraie compétence, c'est pas d'appliquer le template : c'est de trouver la condition de pruning la plus tôt possible pour couper le maximum de branches. Chaque branche coupée tôt économise une sous-arborescence entière.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Transfert : changer de contexte

Applique le mécanisme de « BACKTRACKING ARENA : SUDOKU, WORD SEARCH, PROBLÈMES RÉELS » à un volume de données dix fois plus grand ou une mémoire dix fois plus petite. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
