---
perishability_id: PER-0017

stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, transmission]
anti_recipe_key: defaut_cache+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_historical"
source_url: "https://v8.dev/features/stable-sort"
source_type: "primary"
review_interval: "6 mois"
perishability_scope: "Détails versionnés sur les algorithmes des bibliothèques de tri ; le principe merge sort et sa stabilité restent intemporels."
source_scope: "Article V8 publié en 2019 : historique de la stabilité de Array.prototype.sort dans V8 et de l’implémentation Timsort. Il ne décrit pas l’algorithme merge sort construit dans cette leçon et ne prouve pas sa complexité. La stabilité de l’implémentation pédagogique dépend de sa propre règle de fusion."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_historical » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "HISTORICAL_V8_STABLE_SORT_SCOPE_CONFIRMED_2026-11-03"
review_due: "2027-05-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# MERGE SORT : DIVISER POUR RÉGNER EN O(n log n)

> **Périmètre de suivi (6 mois) :** Détails versionnés sur les algorithmes des bibliothèques de tri ; le principe merge sort et sa stabilité restent intemporels.

Temps de lecture ~8 min

Bubble sort te demandait de comparer chaque paire. Merge sort fait quelque chose de plus malin : il coupe le problème en deux, résout chaque moitié, puis fusionne les résultats.

C'est la même logique que l'attaque en formation des Chevaliers de Garo : diviser le champ de bataille, nettoyer chaque zone, reconsolider. O(n²) si tu essaies de tout gérer d'un coup. O(n log n) si tu divises intelligemment.

---

> **Limite de la référence externe :** l’article V8 lié dans cette leçon documente historiquement la stabilité de `Array.prototype.sort` et l’implémentation de V8 à cette époque. Il ne décrit pas l’algorithme `mergeSort` construit ici et ne constitue pas une preuve de sa complexité. Dans l’exercice, la stabilité de la fusion vient de la règle de comparaison locale qui choisit l’élément gauche lorsque les clés sont égales.

## 1) L'IDÉE : DIVISER JUSQU'À L'INDIVISIBLE

Un tableau de taille 1 est toujours trié. C'est le cas de base.

Merge sort exploite ça :

1. Couper le tableau en deux moitiés
2. Trier chaque moitié récursivement (même algo)
3. Fusionner les deux moitiés triées

```json
[38, 27, 43, 3, 9, 82, 10]

      Diviser
     /    \
 [38, 27, 43]  [3, 9, 82, 10]
  /   \    /     \
[38] [27,43] [3,9]   [82,10]
    / \   / \     / \
   [27][43] [3] [9]   [82] [10]

      Fusionner
   [27,43]  [3,9]   [10,82]
 [27, 38, 43] [3, 9, 10, 82]
    [3, 9, 10, 27, 38, 43, 82]
```

---

## 2) IMPLÉMENTATION

```js
function mergeSort(arr) {
  // cas de base : un tableau de 0 ou 1 élément est déjà trié
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);

  // diviser
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // fusionner les deux moitiés triées
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0; // pointeur gauche
  let j = 0; // pointeur droit

  // on compare les têtes des deux listes et on prend le plus petit
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // il reste peut-être des éléments dans une des deux listes
  // on les colle directement : ils sont déjà triés
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]
```

---

## 3) POURQUOI C'EST O(n log n)

```text
n = 8 éléments

Niveau 0 (diviser) : 1 tableau de 8
Niveau 1 :      2 tableaux de 4
Niveau 2 :      4 tableaux de 2
Niveau 3 :      8 tableaux de 1  <-- cas de base atteint

Nombre de niveaux = log₂(8) = 3
```

À chaque niveau, on fusionne **n éléments au total** (chaque élément est traité une fois).

```text
Niveau 3 (fusion) : 8 opérations
Niveau 2 (fusion) : 8 opérations
Niveau 1 (fusion) : 8 opérations
          ---------------
Total :       3 * 8 = 24 = n * log n
```

```text
      Comparaisons
      |
 50M    |               n²
      |
 130K   |           n log n *
      |       *
      |    *
      |  *
      |_________________________________ n
       1K 3K 5K 7K 10K
```

Pour 10 000 éléments, l’ordre de grandeur attendu diffère fortement entre O(n²) et O(n log n). Le nombre exact d’opérations dépend de l’implémentation, des données et de ce que tu comptes (comparaisons, copies, allocations).

---

## 4) STABLE, PRÉVISIBLE, MAIS GOURMAND EN MÉMOIRE

**Avantages :**

- Stable : si `Mbappé` et `Vinicius` ont le même score, leur ordre original est préservé
- Performance garantie : O(n log n) dans tous les cas (pire, moyen, meilleur)
- Parfait pour trier des linked lists (pas besoin d'accès aléatoire)

**Inconvénient :**

- Espace O(n) : chaque `merge` crée un nouveau tableau. Sur 1M d'éléments, ça fait 1M d'allocations supplémentaires.

```js
// exemple qui casse : tri sur des objets avec propriété manquante
const data = [
  { joueur: "Messi", buts: 45 },
  { joueur: "Mbappé", buts: 52 },
  { joueur: "Haaland" }, // pas de propriété "buts"
];

// un comparateur naïf va comparer undefined avec des nombres
// le résultat est imprévisible : NaN dans les comparaisons
function mergeSortBy(arr, key) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortBy(arr.slice(0, mid), key);
  const right = mergeSortBy(arr.slice(mid), key);
  return mergeBy(left, right, key);
}

function mergeBy(left, right, key) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    const a = left[i][key] ?? -Infinity; // défense contre undefined
    const b = right[j][key] ?? -Infinity;
    if (a <= b) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

---

## 5) MERGE SORT DANS LA VRAIE VIE

### 5.1) LES TRIS NATIFS : NE PAS CONFONDRE ALGORITHME ET GARANTIE

Merge sort est un algorithme de tri que tu peux implémenter toi-même. Les bibliothèques standard choisissent leurs propres algorithmes : il n'existe pas de règle universelle « au-delà de 64 éléments, tout le monde utilise TimSort ».

| Environnement / API                     | Ce que la documentation permet d'affirmer                                                                                                                                 | Ce qu'il ne faut pas en déduire                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Python** (`list.sort()` / `sorted()`) | Le tri est stable ; l'implémentation CPython utilise Timsort et profite des séquences déjà partiellement ordonnées.                                                       | Que Java ou tous les moteurs JavaScript utilisent le même algorithme.                                                |
| **Java** (`Arrays.sort(Object[])`)      | Le tri des tableaux d'objets est stable ; la documentation Java SE 26 décrit une implémentation mergesort itérative et adaptative.                                        | Que les tableaux de types primitifs utilisent le même tri : leur implémentation documentée est Dual-Pivot Quicksort. |
| **JavaScript** (`Array.prototype.sort`) | La stabilité est une garantie du langage depuis ECMAScript 2019 ; les moteurs peuvent choisir leur algorithme.                                                            | Que toutes les versions de Node utilisent TimSort, ni qu'un seuil de taille fixe s'applique à tous les moteurs.      |
| **V8 / Node.js**                        | V8 a documenté son passage à un tri stable et l'usage de Timsort ; le changelog Node.js 27 indique maintenant PowerSort pour les grands tableaux, tout en restant stable. | Que le détail d'implémentation reste identique entre versions de V8 et de Node.js.                                   |

```js
const joueurs = [
  { nom: "Messi", goals: 45 },
  { nom: "Mbappé", goals: 52 },
  { nom: "Ronaldo", goals: 45 },
  { nom: "Haaland", goals: 52 },
];

// La stabilité conserve l'ordre d'origine entre éléments dont la clé est égale.
joueurs.sort((a, b) => b.goals - a.goals);
// Mbappé reste avant Haaland ; Messi reste avant Ronaldo.
```

**À retenir :** la stabilité est une propriété observable du tri ; le nom de l'algorithme est un détail d'implémentation dépendant du runtime et de sa version. Vérifie la documentation de l'environnement réellement déployé avant d'affirmer quel algorithme il utilise.

**Sources primaires consultées le 2 novembre 2026 :**

- [Python : Sorting Techniques](https://docs.python.org/3/howto/sorting.html) (Timsort et exploitation des séquences pré-ordonnées).
- [V8 : Stable `Array.prototype.sort`](https://v8.dev/features/stable-sort) (historique de V8 et stabilité JavaScript).
- [Node.js : CHANGELOG_V27.md](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V27.md) (PowerSort pour les grands tableaux et stabilité dans la ligne Node 27).
- [Oracle : `Arrays.sort`](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/Arrays.html) (distinction entre tableaux d'objets et tableaux primitifs).

---

## EXERCICES

## EXO 1 : Merge sort sur des objets

_~15 min_

Implémente `mergeSortByScore` qui trie des joueurs de foot par `score` décroissant. Le tri doit être stable.

```js
const classement = [
  { nom: "Messi", score: 580 },
  { nom: "Mbappé", score: 612 },
  { nom: "Vinicius", score: 612 },
  { nom: "Bellingham", score: 490 },
  { nom: "Rodri", score: 550 },
];
// résultat : Mbappé, Vinicius, Messi, Rodri, Bellingham
```

---

## EXO 2 : Compter les inversions

_~20 min_

Une "inversion" c'est une paire `(i, j)` où `i < j` mais `arr[i] > arr[j]`. C'est une mesure du désordre.

Modifie `mergeSort` pour qu'il retourne `{ sorted, inversions }`. Pendant la fusion, chaque fois qu'un élément de `right` passe devant un élément de `left`, compte le nombre d'éléments restants dans `left` : c'est autant d'inversions.

```js
// [3, 1, 2] a 2 inversions : (3,1) et (3,2)
countInversions([3, 1, 2]); // { sorted: [1, 2, 3], inversions: 2 }
```

---

## EXO 3 : Merge de K listes triées

_~15 min_

T'as K listes déjà triées. Tu dois les fusionner en une seule liste triée.

Approche naïve : concat tout, puis sort. O(n log n) mais tu jettes l'information "déjà trié".
Approche correcte : applique `merge` en cascade.

```js
const listes = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];
mergeKLists(listes); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

(indice : `reduce` avec `merge` comme accumulateur)

---

## RÉSUMÉ

Merge sort coupe le tableau en deux récursivement jusqu'aux sous-tableaux de taille 1, puis fusionne en remontant. Pour cette implémentation, la complexité temporelle est O(n log n), le tri est stable si la fusion choisit l'élément gauche en cas d'égalité, et les tableaux temporaires demandent O(n) d'espace. Des bibliothèques standard utilisent des familles de tri différentes selon le langage, le type de tableau et la version du runtime ; voir la section 5 et ses sources officielles.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Vérification observable : critères de réussite

Vérifie ordre croissant, conservation exacte des éléments et stabilité sur des clés égales ; mesure séparément le coût mémoire.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

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

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **MERGE SORT : DIVISER POUR RÉGNER EN O(n log n)** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « MERGE SORT : DIVISER POUR RÉGNER EN O(n log n) » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.
