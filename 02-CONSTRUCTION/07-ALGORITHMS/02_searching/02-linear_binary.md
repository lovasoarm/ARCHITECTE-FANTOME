---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, changement_echelle]
anti_recipe_key: decision_inversee+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Linear search vs binary search : la différence qui compte à l'échelle

Temps de lecture ~9 min

Chercher un élément. Le truc le plus basique qui soit. Pourtant, selon le volume, la différence entre O(n) et O(log n) peut changer fortement le nombre de comparaisons nécessaires. Elle ne prédit pas, à elle seule, le temps réel observé.

---

## 1) LINEAR SEARCH : O(n)

Tu regardes chaque élément un par un jusqu'à trouver. Simple. Toujours correct. Lent sur des grands tableaux.

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // trouvé
  }
  return -1; // pas là
}

// fonctionne sur n'importe quel tableau, trié ou non
const buts = [3, 7, 1, 9, 4, 2];
console.log(linearSearch(buts, 9)); // 3
console.log(linearSearch(buts, 5)); // -1
```

**Nombre de comparaisons :**

- Meilleur cas : 1 comparaison, si le premier élément est la cible.
- Cas moyen, sous l’hypothèse que la cible est présente et que chaque position est équiprobable : `(n + 1) / 2` comparaisons.
- Pire cas : `n` comparaisons, si la cible est absente ou située en dernière position.

Sans hypothèse sur la position de la cible et la fréquence des recherches infructueuses, il n’existe pas une moyenne unique à annoncer. Dans tous les cas, la complexité asymptotique est `O(n)`.

**Quand l'utiliser :**

- tableau non trié, surtout pour une recherche ponctuelle ;
- petit volume, lorsque la simplicité compte davantage qu’un index ou un tri ;
- collection indexable quand tu dois simplement parcourir les éléments sans construire d’index supplémentaire.

Il n’existe pas de seuil universel (par exemple 50 éléments) : mesure le cas réel si la performance est importante.

---

## 2) BINARY SEARCH : O(log n)

Condition : le tableau doit être **trié**.

Avec des doublons, `binarySearch` peut retourner **une occurrence quelconque** de la cible. Pour trouver la première position qui satisfait un seuil, utilise plutôt `lowerBound`.

Idée : diviser l'espace de recherche par deux à chaque étape. Si la cible est plus petite que le milieu, cherche à gauche. Si plus grande, cherche à droite.

```text
Tableau : [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
Cible : 13

Étape 1 : mid = index 4, valeur = 9
     13 > 9 --> cherche à droite
     [11, 13, 15, 17, 19]

Étape 2 : mid = index 7 (dans le tableau original), valeur = 15
     13 < 15 --> cherche à gauche
     [11, 13]

Étape 3 : mid = index 5, valeur = 11
     13 > 11 --> cherche à droite
     [13]

Étape 4 : mid = index 6, valeur = 13
     13 === 13 --> trouvé !
```

```text
low         high
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
         ^
        mid = 9 < 13 --> cherche à droite

           low     high
        [11, 13, 15, 17, 19]
             ^
            mid = 15 > 13 --> cherche à gauche

           low high
          [11, 13]
           ^
           mid = 11 < 13 --> cherche à droite

             low/high
             [13] --> trouvé
```

```js
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    // pourquoi low + (high - low) / 2 et pas (low + high) / 2 ?
    // parce que (low + high) peut overflow sur des très grands tableaux en d'autres langages
    // bonne habitude à prendre dès maintenant

    if (arr[mid] === target) return mid; // trouvé
    if (arr[mid] < target)
      low = mid + 1; // cherche à droite
    else high = mid - 1; // cherche à gauche
  }

  return -1; // pas trouvé
}

const classement = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(classement, 13)); // 6
console.log(binarySearch(classement, 10)); // -1
```

---

## 3) VISUALISER O(log n)

```text
n éléments --> nombre max d'étapes de binary search

n = 10     --> 4 étapes
n = 100     --> 7 étapes
n = 1 000    --> 10 étapes
n = 1 000 000  --> 20 étapes
n = 1 000 000 000 --> 30 étapes

Comparaison du nombre de comparaisons pour `n = 1 000 000` :

- Recherche linéaire : jusqu’à `1 000 000` comparaisons.
- Recherche binaire : au plus `20` comparaisons pour cette taille.

Ce sont des comptes d’opérations, pas des durées. On ne peut pas en déduire directement un rapport de temps : l’accès mémoire, les constantes, le matériel, le moteur JavaScript et le protocole de mesure influencent le temps observé.
```

```text
Opérations
|
1M | *
  |  *
500K|  *
  |   *
  |      *
20 |         * * * * * *  log n
  |__________________________________________
   10 100 1K 10K 100K 1M
```

---

## 4) BINARY SEARCH RÉCURSIF

```js
function binarySearchRecursive(arr, target, low = 0, high = arr.length - 1) {
  if (low > high) return -1; // cas de base : zone vide = pas trouvé

  const mid = low + Math.floor((high - low) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearchRecursive(arr, target, mid + 1, high);
  else return binarySearchRecursive(arr, target, low, mid - 1);
}
```

Les deux versions ont une profondeur de recherche en `O(log n)`. La version récursive utilise donc `O(log n)` d’espace de pile ; ce risque ne doit pas être exagéré pour un tableau JavaScript de taille ordinaire, car la profondeur reste faible. La version itérative utilise `O(1)` d’espace auxiliaire et évite de consommer la pile d’appels. Choisis selon la lisibilité et les contraintes du contexte.

---

## 5) LE CAS QUI CASSE : BINARY SEARCH SUR TABLEAU NON TRIÉ

```js
// Contre-exemple : la cible est présente, mais le tableau n'est pas trié.
const nonTrie = [7, 2, 9, 1, 5, 3];
console.log(binarySearch(nonTrie, 1)); // -1 : résultat incorrect pour cette entrée
console.log(linearSearch(nonTrie, 1)); // 3 : la cible est bien présente

// Pourquoi la recherche binaire échoue ici :
// low=0, high=5, mid=2 -> 9 ; comme 1 < 9, elle élimine les indices 2 à 5.
// low=0, high=1, mid=0 -> 7 ; comme 1 < 7, elle élimine le reste.
// L'algorithme s'arrête, alors que 1 se trouvait à l'index 3.
```

**Règle de décision :**

- Si le tableau est déjà trié et donne un accès direct aux indices, la recherche binaire peut être utile même pour une seule recherche.
- Si le tableau n’est pas trié et que tu n’as qu’une recherche, `linearSearch` évite de payer un tri préalable.
- Si tu as plusieurs recherches sur les mêmes données, le coût du tri initial peut être amorti : compare `O(n log n + q log n)` au coût de `q` recherches linéaires, et mesure selon le nombre `q` et les opérations réellement effectuées.

Ne transforme donc pas « le tri coûte cher pour une recherche ponctuelle » en « la recherche binaire n’a de sens qu’avec des recherches répétées ».

---

## 6) BINARY SEARCH DANS LA VRAIE VIE

```js
// chercher dans un dictionnaire de mots (millions d'entrées)
// chercher un ID dans une liste triée d'utilisateurs
// chercher un timestamp dans un log trié par date

// Précondition : arr est trié par ordre croissant.
// Retourne le premier index i tel que arr[i] >= target.
// Le résultat peut être arr.length si aucun élément ne convient.
function lowerBound(arr, target) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] < target) low = mid + 1;
    else high = mid;
  }

  return low; // index dans [0, arr.length] ; arr.length si toutes les valeurs sont < target
}

const scores = [10, 20, 30, 40, 50, 60, 70, 80];
console.log(lowerBound(scores, 35)); // 3 (index de 40, premier >= 35)
console.log(lowerBound(scores, 30)); // 2 (index de 30 lui-même)
console.log(lowerBound(scores, 85)); // 8 (past-the-end : tous sont < 85)
```

---

## EXERCICES

## EXO 1 : Binary search sur le classement des buteurs

_~10 min_

Tu as un tableau trié de joueurs `{ nom, goals }` trié par `goals` croissant. Trouve l'index du joueur avec exactement N buts. Si aucun joueur n'a ce nombre exact, retourne -1.

```js
const buteurs = [
  { nom: "Bellingham", goals: 18 },
  { nom: "Salah", goals: 24 },
  { nom: "Messi", goals: 30 },
  { nom: "Mbappé", goals: 35 },
  { nom: "Haaland", goals: 42 },
];
findByGoals(buteurs, 30); // 2 (index de Messi)
findByGoals(buteurs, 25); // -1
```

---

## EXO 2 : Première et dernière occurrence

_~12 min_

Dans un tableau trié avec doublons, trouve l'index de la première ET de la dernière occurrence de `target`. Utilise deux binary searches modifiés.

```js
const butsPar = [1, 2, 2, 2, 3, 4, 4, 5];
findRange(butsPar, 2); // [1, 3] (index 1 à 3)
findRange(butsPar, 4); // [5, 6]
findRange(butsPar, 6); // [-1, -1] (absent)
```

(indice : pour trouver la première : `lowerBound`. Pour la dernière : `upperBound - 1`)

---

## EXO 3 : Comparaison de performance

_~15 min_

Génère un tableau trié de 100 000 entiers et prépare 100 cibles identiques pour les deux méthodes, avec des valeurs présentes et absentes. Lance une courte phase d’échauffement, mesure plusieurs répétitions, puis compare :

1. le nombre théorique de comparaisons (compte les vérifications d’égalité et d’ordre dans ton implémentation) ;
2. le temps observé sur la même machine et les mêmes cibles.

Note l’environnement, la méthode de mesure et les résultats. **Aucun rapport de temps précis n’est exigé** : le rapport `n / log₂(n)` décrit un ordre de grandeur de comparaisons, pas une promesse de vitesse réelle. Explique les écarts et les limites de ton benchmark.

---

## RÉSUMÉ

Linear search : `O(n)`, simple et adaptée notamment aux données non triées. Binary search : `O(log n)` sur des données triées et accessibles par indice ; elle réduit l’intervalle de recherche de moitié à chaque étape. Pour un million d’éléments, elle demande au plus environ 20 comparaisons, tandis qu’une recherche linéaire peut en demander un million. Ces nombres ne sont pas des temps d’exécution. Si les données ne sont pas triées, compare le coût d’un tri préalable à celui de la recherche linéaire. Si elles sont déjà triées, une seule recherche binaire peut déjà être pertinente.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Vérification observable : critères de réussite

Démontre la précondition de tri avant recherche binaire. Compare au résultat d’une recherche linéaire sur des entrées vides, répétées et non trouvées.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Linear search vs binary search : la différence qui compte à l'échelle** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « Linear search vs binary search : la différence qui compte à l'échelle » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.
