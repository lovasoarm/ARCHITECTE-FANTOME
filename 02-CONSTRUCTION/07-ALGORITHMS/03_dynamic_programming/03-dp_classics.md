---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Dp classics : knapsack, lcs, coin change

Temps de lecture ~11 min

Trois problèmes DP incontournables. Ils reviennent dans les entretiens, dans les systèmes réels (optimisation de budget, diff de fichiers, systèmes de rendu monnaie), et dans les bases de la théorie des algorithmes.

Chacun représente un pattern différent. Apprends les patterns, pas les problèmes.

---

## 1) 0/1 KNAPSACK : OPTIMISER SOUS CONTRAINTE DE POIDS

Tu as un sac de capacité W. Tu as n objets, chacun avec un poids `weight[i]` et une valeur `value[i]`. Tu veux maximiser la valeur totale sans dépasser W. Chaque objet : soit tu le prends (1), soit tu ne le prends pas (0).

**Analogie :** Walter White prépare une livraison. Il a un coffre de voiture (capacité). Plusieurs lots de jutsu avec des poids et des valeurs différentes. Il veut maximiser la valeur de la livraison sans dépasser la capacité du coffre.

```text
Objets :
 Item 0 : poids=1, valeur=1
 Item 1 : poids=3, valeur=4
 Item 2 : poids=4, valeur=5
 Item 3 : poids=5, valeur=7

Capacité W = 7

Meilleure sélection : Item 1 (3kg, 4$) + Item 2 (4kg, 5$) = 7kg, 9$
```

**La récurrence DP :**

```text
dp[i][w] = valeur max avec les i premiers items et capacité w

Si on ne prend pas l'item i :
 dp[i][w] = dp[i-1][w]

Si on prend l'item i (seulement si weight[i] <= w) :
 dp[i][w] = value[i] + dp[i-1][w - weight[i]]

On prend le max des deux options.
```

```js
function knapsack(weights, values, W) {
  const n = weights.length;
  // dp[i][w] = valeur max avec les i premiers items et capacité w
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      // option 1 : ne pas prendre l'item i-1
      dp[i][w] = dp[i - 1][w];

      // option 2 : prendre l'item i-1 (si le poids le permet)
      if (weights[i - 1] <= w) {
        const withItem = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        dp[i][w] = Math.max(dp[i][w], withItem);
      }
    }
  }

  return dp[n][W];
}

const weights = [1, 3, 4, 5];
const values = [1, 4, 5, 7];
console.log(knapsack(weights, values, 7)); // 9
```

**Reconstruction de la sélection :**

```js
function knapsackWithItems(weights, values, W) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= W; w++) {
      dp[i][w] = dp[i - 1][w];
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          dp[i][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
        );
      }
    }
  }

  // retracer quels items ont été pris
  const selected = [];
  let w = W;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      // l'item i-1 a été pris
      selected.push(i - 1);
      w -= weights[i - 1];
    }
  }

  return { maxValue: dp[n][W], items: selected.reverse() };
}
```

**Complexité :** O(n \* W) temps et espace. Si W est très grand (10^9), cette approche devient impraticable.

---

## 2) LONGEST COMMON SUBSEQUENCE : LE DIFF DE GIT

LCS = la plus longue suite de caractères qui apparaît dans le même ordre dans deux chaînes, sans forcément être contiguë.

**Pourquoi ça compte :** `git diff` utilise LCS pour trouver ce qui a changé entre deux versions d'un fichier. Les outils de comparaison de DNA aussi.

```text
s1 = "ABCBDAB"
s2 = "BDCABA"

LCS = "BCBA" (longueur 4) ou "BDAB" (longueur 4)
   (plusieurs LCS possibles de même longueur)
```

**La récurrence DP :**

```text
dp[i][j] = longueur de la LCS de s1[0..i-1] et s2[0..j-1]

Si s1[i-1] === s2[j-1] :
 dp[i][j] = dp[i-1][j-1] + 1  (les deux chars matchent : on les prend)

Sinon :
 dp[i][j] = max(dp[i-1][j], dp[i][j-1])  (on saute un char dans l'une ou l'autre)
```

```js
function lcs(s1, s2) {
  const m = s1.length,
    n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // match : +1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // pas de match : best des deux
      }
    }
  }

  return dp[m][n];
}

console.log(lcs("ABCBDAB", "BDCABA")); // 4
```

**Reconstruire la LCS :**

```js
function lcsString(s1, s2) {
  const m = s1.length,
    n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // retracer en remontant le tableau
  let result = "";
  let i = m,
    j = n;
  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      result = s1[i - 1] + result;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return result;
}

console.log(lcsString("ABCBDAB", "BDCABA")); // "BCBA" ou "BDAB"
```

**Complexité :** O(m \* n) temps et espace.

---

## 3) COIN CHANGE : LE RENDU DE MONNAIE

Tu as des pièces de valeurs `coins[]`. Tu veux atteindre exactement la somme `amount`. Quel est le nombre minimum de pièces ?

**Analogie :** Heist de Prison Break. Michael doit payer exactement X dollars avec les billets qu'il a. Il veut utiliser le minimum de billets pour ne pas attirer l'attention.

```text
coins = [1, 5, 10, 25]
amount = 41

Solution optimale : 25 + 10 + 5 + 1 = 4 pièces
```

**La récurrence DP :**

```text
dp[i] = nombre minimum de pièces pour atteindre la somme i

Pour chaque pièce c dans coins :
 si i >= c :
  dp[i] = min(dp[i], dp[i - c] + 1)
```

```js
function coinChange(coins, amount) {
  // dp[i] = min de pièces pour la somme i
  // Infinity = somme inaccessible
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 pièces pour atteindre 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 5, 10, 25], 41)); // 4
console.log(coinChange([2], 3)); // -1 (impossible)
console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)
```

**Variante : compter le nombre de façons** (pas le min de pièces)

```js
function coinChangeWays(coins, amount) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1; // une façon d'atteindre 0 : ne rien prendre

  for (const coin of coins) {
    // pour chaque pièce, on met à jour toutes les sommes >= coin
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
}

console.log(coinChangeWays([1, 2, 5], 5));
// 1+1+1+1+1, 1+1+1+2, 1+2+2, 5 = 4 façons
```

**Complexité :** O(amount \* n) temps, O(amount) espace.

---

## 4) LES PATTERNS DERRIÈRE CES TROIS PROBLÈMES

```text
Knapsack  : DP 2D, décision binaire par item (prendre ou ne pas prendre)
LCS    : DP 2D, deux strings qui avancent ensemble ou séparément
Coin Change: DP 1D, construire une somme en ajoutant des pièces

Pattern commun : chaque dp[i] ou dp[i][j] dépend d'un état précédent.
La clé : identifier quelle "dimension" représente quoi.
```

```text
Identifier la "dimension" de l'état :

Knapsack  : dp[items vus][capacité restante]
LCS    : dp[longueur s1 traitée][longueur s2 traitée]
Coin Change: dp[somme à atteindre]

Si ça ressemble à "optimiser quelque chose avec des éléments" : Knapsack
Si ça ressemble à "comparer deux séquences" : LCS / edit distance
Si ça ressemble à "atteindre une somme/cible avec des unités" : Coin Change
```

---

## EXERCICES

## EXO 1 : Budget de transfert mercato

<!-- AF-DIAGRAM:algorithms -->

## Repère visuel utile : Optimiser une opération de dispatch

```text
entrée + contraintes
        |
        v
algorithme candidat
   |         |
   v         v
preuve     analyse coût
   |         |
   +----+----+
        v
 tests + tailles croissantes
        |
        v
 décision / compromis
```

## EXO 2 : Edit distance (Levenshtein)

_~20 min_

Nombre minimum d'opérations (insertion, suppression, substitution) pour transformer `s1` en `s2`.

```js
editDistance("horse", "ros"); // 3
editDistance("intention", "execution"); // 5
editDistance("", "abc"); // 3
```

(récurrence : si `s1[i] === s2[j]` → `dp[i-1][j-1]`. Sinon → `1 + min(insert, delete, replace)`)

---

## EXO 3 : Longest Increasing Subsequence

_~25 min_

Trouve la longueur de la plus longue sous-séquence strictement croissante.

```js
lis([10, 9, 2, 5, 3, 7, 101, 18]); // 4 : [2, 3, 7, 101] ou [2, 5, 7, 101]
lis([0, 1, 0, 3, 2, 3]); // 4 : [0, 1, 2, 3]
lis([7, 7, 7, 7]); // 1
```

---

## RÉSUMÉ

Trois patterns DP fondamentaux. Knapsack : décision binaire sur chaque item sous contrainte de capacité, tableau 2D `items x capacité`. LCS : avancer dans deux séquences en cherchant les correspondances, tableau 2D `len1 x len2`. Coin Change : construire une cible à partir d'unités, tableau 1D `somme`. Dans les trois cas : identifier l'état, écrire la récurrence, remplir le tableau dans le bon ordre, reconstruire la solution si besoin.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Dp classics : knapsack, lcs, coin change** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « Dp classics : knapsack, lcs, coin change » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.
