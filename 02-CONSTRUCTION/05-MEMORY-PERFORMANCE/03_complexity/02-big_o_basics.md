---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, decision_inversee]
anti_recipe_key: decision_organisationnelle+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Big o : le coût de chaque décision

Temps de lecture ~10 min

Deux fonctions qui font la même chose. L'une tourne en 2ms sur 1000 éléments. L'autre tourne en 14 minutes sur 1 million. Même résultat. Coût radicalement différent.

Big O, c'est le langage qui décrit ce coût. Pas en millisecondes, les millisecondes dépendent de la machine. En **croissance** : comment le temps d'exécution augmente quand la taille des données augmente. C'est ça qui compte en prod, sur de vraies données, à vraie échelle.

---

## 1) L'IDÉE CENTRALE : LA CROISSANCE, PAS LA VITESSE

```text
100 éléments  → 0.1ms
1 000 éléments → 1ms
10 000 éléments → 10ms
```

Si la durée est multipliée par 10 quand les données sont multipliées par 10 : c'est **O(n)**.

Si la durée est multipliée par 100 quand les données sont multipliées par 10 : c'est **O(n²)**.

Si la durée ne change pas quand les données augmentent : c'est **O(1)**.

Big O ignore les constantes et les termes mineurs. On cherche la forme de la courbe, pas la valeur exacte.

```text
O(3n + 500) → simplifié en O(n)
O(n² + n)  → simplifié en O(n²)
O(2)    → simplifié en O(1)
```

---

## 2) O(1) : TEMPS CONSTANT

L'opération prend le même temps, quelle que soit la taille des données.

```js
// Accès à un élément d'un tableau par index
function getPlayer(roster, index) {
  return roster[index]; // O(1) : index direct, pas de parcours
}

// Accès à une propriété d'objet (hash map)
function getKillers(stats, type) {
  return stats[type]; // O(1) : lookup en hash table
}

// push sur un tableau (amortized O(1))
const events = [];
events.push({ type: "goal", player: "Mbappe" }); // O(1)
```

```text
Données : 10   → 1 opération
Données : 1 000 → 1 opération
Données : 1 000 000 → 1 opération

Courbe : ────────────── (plate)
```

---

## 3) O(n) : TEMPS LINÉAIRE

L'opération grandit proportionnellement à la taille des données.

```js
// Chercher un ninja par son nom dans un tableau
function findNinja(ninjas, name) {
  for (const ninja of ninjas) {
    // on parcourt tous les éléments dans le pire cas
    if (ninja.name === name) return ninja;
  }
  return null;
}
// Si 100 ninjas : max 100 vérifications
// Si 100 000 ninjas : max 100 000 vérifications
```

```js
// Calculer la somme de toutes les stats
function totalPower(ninjas) {
  return ninjas.reduce((sum, n) => sum + n.power, 0); // touche chaque élément une fois
}
```

```text
Données : 10   → 10 opérations max
Données : 1 000 → 1 000 opérations max
Données : 1 000 000 → 1 000 000 opérations max

Courbe :    /
       /
       /
      /  (droite)
```

---

## 4) O(n²) : TEMPS QUADRATIQUE

L'opération utilise une boucle dans une boucle. Chaque élément est comparé à tous les autres.

```js
// Trouver tous les duos de ninjas avec la même somme de stats
function findMatchingPairs(ninjas) {
  const pairs = [];

  for (let i = 0; i < ninjas.length; i++) {
    // n
    for (let j = i + 1; j < ninjas.length; j++) {
      // n
      if (ninjas[i].power + ninjas[j].power === 100) {
        pairs.push([ninjas[i], ninjas[j]]);
      }
    }
  }

  return pairs;
}
// 100 ninjas  → ~5 000 vérifications
// 1 000 ninjas → ~500 000 vérifications
// 10 000 ninjas → ~50 000 000 vérifications ← ça commence à piquer
```

```js
// Bubble sort : l'exemple classique de O(n²)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

```text
Données : 10   → ~100 opérations
Données : 1 000 → ~1 000 000 opérations
Données : 1 000 000 → ~1 000 000 000 000 opérations

Courbe : parabole croissante (quadratique)
Le nombre d'opérations est proportionnel à n², pas à 2ⁿ.
```

---

## 5) O(log n) : TEMPS LOGARITHMIQUE

À chaque étape, on élimine la moitié des possibilités. Très efficace sur de grandes données.

```js
// Recherche binaire sur un tableau trié
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target)
      left = mid + 1; // éliminer la moitié gauche
    else right = mid - 1; // éliminer la moitié droite
  }

  return -1;
}
// 1 000 000 éléments → max 20 vérifications (log₂(1 000 000) ≈ 20)
```

```text
Données : 10     → ~3 opérations
Données : 1 000   → ~10 opérations
Données : 1 000 000 → ~20 opérations
Données : 1 000 000 000 → ~30 opérations

Courbe :
       ___________
      /
     /
    /  (aplatie très vite)
```

---

## 6) O(n log n) : UN ORDRE DE GRANDEUR COURANT POUR LE TRI PAR COMPARAISON

Merge sort garantit O(n log n) dans ses versions usuelles, et Quick Sort a une moyenne O(n log n) mais un pire cas O(n²) selon le choix du pivot. Les moteurs JavaScript utilisent des algorithmes efficaces pour `Array.sort()`, mais le standard n’impose pas une borne O(n log n) ni un algorithme précis. Pour un benchmark, relève le moteur et sa version.

```js
// Trier les buteurs par nombre de buts
const scorers = [
  { name: "Mbappe", goals: 28 },
  { name: "Haaland", goals: 35 },
  { name: "Benzema", goals: 20 },
];

scorers.sort((a, b) => b.goals - a.goals);
// Le coût exact dépend du moteur et de sa version : ne déduis pas
// une garantie normative O(n log n) du seul appel à Array.prototype.sort().
```

```text
Ordres de grandeur illustratifs pour n = 1 000 000 :

O(n²)      → environ 10¹² unités de travail
O(n log₂ n) → environ 2 × 10⁷ unités de travail
O(n)       → environ 10⁶ unités de travail
O(log₂ n)  → environ 20 unités de travail
O(1)       → un coût borné indépendant de n

Ces valeurs illustrent la croissance asymptotique ; elles ne prédisent
ni le nombre exact d'instructions machine ni le temps réel.
```

---

> **À retenir :** une forme récursive ne détermine pas à elle seule sa complexité.
> Écris la récurrence (nombre d'appels, taille de chaque sous-problème et travail
> hors appels), puis résous-la. De même, « accès direct » ne signifie O(1) que
> si le modèle de coût retenu garantit un travail borné indépendamment de n.

## 7) RÈGLES PRATIQUES POUR LIRE LE BIG O D'UN CODE

```text
1 boucle qui traite n éléments une fois chacun       → O(n)
2 boucles imbriquées parcourant chacune ~n éléments → O(n²)
3 boucles imbriquées parcourant chacune ~n éléments → O(n³)
Diviser l'espace de recherche par 2 à chaque étape, avec un travail
  borné par étape                 → O(log n)
Parcourir n éléments et effectuer à chacun une recherche logarithmique
  indépendante                    → O(n log n)
Opération dont le coût reste borné quand n grandit
  (dans le modèle étudié)          → O(1)
Récursion T(n) = T(n/2) + O(1)    → O(log n)
Récursion T(n) = 2T(n/2) + O(1)  → O(n)
Récursion T(n) = 2T(n-1) + O(1)  → O(2ⁿ)
```

Exemple de lecture rapide :

```js
function mystery(arr) {
  const result = {}; // O(1)

  for (const item of arr) {
    // O(n) : boucle unique
    if (!result[item]) {
      // O(1) : accès hash
      result[item] = 0; // O(1)
    }
    result[item]++; // O(1)
  }

  return result; // O(1)
}
// Complexité totale : O(n)
// La boucle domine. Tout ce qui est à l'intérieur est O(1).
```

```js
function suspicious(arr) {
  for (let i = 0; i < arr.length; i++) {
    // O(n)
    for (let j = 0; j < arr.length; j++) {
      // O(n) : imbriqué
      if (arr[i] === arr[j] && i !== j) {
        console.log(`doublon : ${arr[i]}`);
      }
    }
  }
}
// Complexité totale : O(n²)
// Peut être réécrit en O(n) avec un Set ou une Map
```

---

## EXERCICES

### EXO 1 : CLASSIFIER

Pour chaque fonction, donner sa complexité et justifier.

```js
// Fonction A
function sumFirst(arr) {
  return arr[0] + arr[1];
}

// Fonction B
function hasDuplicate(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
}

// Fonction C
function pairSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) return [i, j];
    }
  }
  return null;
}

// Fonction D
function logPowers(n) {
  let i = 1;
  while (i < n) {
    console.log(i);
    i *= 2; // ← indice clé
  }
}

// Fonction E
function processAll(arr) {
  const sorted = [...arr].sort(); // ← quelle complexité pour sort ?
  for (const item of sorted) {
    console.log(item);
  }
}
```

---

### EXO 2 : OPTIMISER LE SCOUT

Walter White a besoin de vérifier si deux listes de distributeurs ont des éléments en commun. La version actuelle est O(n²). Ta mission : la réécrire en O(n).

```js
// Version O(n²) : à optimiser
function hasCommonDistributor(listA, listB) {
  for (const a of listA) {
    for (const b of listB) {
      if (a.id === b.id) return true;
    }
  }
  return false;
}
```

_(Indice : quelle structure de données offre un lookup en O(1) ?)_

---

### EXO 3 : COMPTER LES OPÉRATIONS

Pour ce code, compter le nombre exact d'opérations en fonction de `n`, puis simplifier en notation Big O.

```js
function analyzeSquad(ninjas) {
  let total = 0; // 1 opération

  for (let i = 0; i < ninjas.length; i++) {
    // n itérations
    total += ninjas[i].power; // 1 opération par itération
  }

  for (let i = 0; i < ninjas.length; i++) {
    // n itérations
    for (let j = 0; j < 10; j++) {
      // TOUJOURS 10:pas n
      total += ninjas[i].stats[j] || 0; // 1 opération
    }
  }

  return total; // 1 opération
}
```

**Question bonus :** la deuxième boucle double est `n × 10`. Est-ce O(n²) ou O(n) ? Pourquoi ?

---

## RÉSUMÉ

Big O mesure comment un algorithme se comporte quand les données grossissent, pas à quelle vitesse il tourne sur ta machine. O(1) est constant, O(n) linéaire, O(n²) quadratique. Une boucle unique sur n éléments donne O(n). Deux boucles imbriquées donnent O(n²). Diviser par 2 à chaque étape donne O(log n). Les constantes et termes mineurs disparaissent : seule la forme de la croissance compte. Reconnaître le Big O d'un code en le lisant, sans le tester, c'est l'une des compétences qui distinguent un dev senior.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « Big o : le coût de chaque décision » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Big o : le coût de chaque décision** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dériver la croissance avant de chronométrer

**Mission liée à « Big o : le coût de chaque décision » :** Analyse un algorithme Kintana : compte les opérations dominantes, écris sa complexité asymptotique et justifie les hypothèses. Compare ensuite plusieurs tailles d’entrée à titre de vérification empirique, sans confondre temps mesuré et preuve de Big O.

**Livrable :** Décomposition du code, dérivation, tableau de tailles et limites du benchmark.

**Critères d’acceptation :** Les boucles et appels récursifs sont analysés selon leurs bornes ; la récurrence est explicitée ; la mesure ne remplace pas le raisonnement.

**Transfert obligatoire :** Le temps observé ne suit pas la tendance attendue : distingue bruit, constantes, moteur et modèle de complexité.
