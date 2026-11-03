---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Combinatorics lite : compter avant de bruteforcer

Temps de lecture ~10 min

Avant d'écrire une boucle, pose-toi une question : combien de cas y a-t-il vraiment ?

Si t'as 10 éléments et que t'envisages de tester toutes les combinaisons possibles, tu vas générer 3 628 800 possibilités. Si t'en as 20, c'est 2 431 290 400 millions. Ton algorithme est mort avant de commencer.

La combinatoire, c'est l'art de compter les possibilités sans les énumérer.
C'est ce qui sépare un algo qui tourne de celui qui timeout en prod.

---

## 1) PERMUTATIONS : L'ORDRE COMPTE

Une permutation, c'est un arrangement ordonné. L'ordre compte : ABC ≠ BAC.

```text
n éléments, toutes les permutations = n! (factorielle)

3 éléments : 3! = 6
4 éléments : 4! = 24
10 éléments : 10! = 3 628 800
20 éléments : 20! = 2.4 × 10^18  <- jamais énumérer ça
```

```js
// générer toutes les permutations d'un tableau (backtracking)
function permutations(arr) {
  const results = [];

  function backtrack(current, remaining) {
    // cas de base : plus rien à choisir, on a une permutation complète
    if (remaining.length === 0) {
      results.push([...current]);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      // les éléments restants = tout sauf celui qu'on vient de prendre
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop(); // on revient en arrière pour essayer le suivant
    }
  }

  backtrack([], arr);
  return results;
}

permutations(["A", "B", "C"]);
// [["A","B","C"], ["A","C","B"], ["B","A","C"], ["B","C","A"], ["C","A","B"], ["C","B","A"]]
// 3! = 6 résultats
```

**Diagramme de l'arbre de backtracking :**

```json
          []
     /     |     \
    [A]    [B]    [C]
    /  \   /  \   /  \
  [A,B] [A,C] [B,A] [B,C] [C,A] [C,B]
   |   |  |   |  |   |
  [A,B,C][A,C,B][B,A,C][B,C,A][C,A,B][C,B,A]
```

---

## 2) COMBINAISONS : L'ORDRE NE COMPTE PAS

Une combinaison, c'est une sélection non ordonnée. ABC = BAC = CBA.

```text
Choisir k parmi n = C(n, k) = n! / (k! × (n-k)!)

C(5, 2) = 5! / (2! × 3!) = 10
C(10, 3) = 120
C(52, 5) = 2 598 960 <- nombre de mains de poker possibles
```

```js
// C(n, k) sans calculer les factorielles (évite les overflow)
function combinations(n, k) {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  // optimisation : C(n,k) = C(n, n-k) --> prendre le k le plus petit
  k = Math.min(k, n - k);

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

combinations(5, 2); // 10
combinations(52, 5); // 2598960
```

**Générer les combinaisons (pas juste les compter) :**

```js
function chooseCombinations(arr, k) {
  const results = [];

  function backtrack(start, current) {
    if (current.length === k) {
      results.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current); // i+1 : on ne reprend jamais un élément déjà pris
      current.pop();
    }
  }

  backtrack(0, []);
  return results;
}

chooseCombinations(["Naruto", "Sasuke", "Sakura", "Kakashi"], 2);
// [["Naruto","Sasuke"], ["Naruto","Sakura"], ["Naruto","Kakashi"],
// ["Sasuke","Sakura"], ["Sasuke","Kakashi"], ["Sakura","Kakashi"]]
// C(4,2) = 6 équipes possibles
```

---

## 3) LE PRINCIPE DE MULTIPLICATION : COMPTER SANS ÉNUMÉRER

Le vrai pouvoir de la combinatoire, c'est compter sans générer.

```text
Si choix A a n possibilités, et choix B a m possibilités,
alors le nombre total = n × m

Exemple : mot de passe 8 caractères, alphabet de 62 chars (a-z, A-Z, 0-9)
62^8 = 218 340 105 584 896 possibilités
```

```js
// estimer l'espace de recherche avant de bruteforcer
function searchSpace(alphabet, length) {
  return Math.pow(alphabet.length, length);
}

searchSpace("abcdefghijklmnopqrstuvwxyz", 6); // 308 915 776
// à 1M tentatives/seconde : 308 secondes
// donc bruteforce de 6 chars lowercase : faisable

searchSpace(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$",
  12,
);
// 3.22 × 10^22
// à 1 milliard tentatives/seconde : 10^13 secondes = impossible
```

**Application directe : valider la sécurité d'un token**

```js
function estimateBruteforceTime(charset, length, attemptsPerSecond = 1e9) {
  const space = BigInt(charset.length) ** BigInt(length);
  const seconds = space / BigInt(attemptsPerSecond);
  const years = seconds / BigInt(31_536_000);
  return { space: space.toString(), estimatedYears: years.toString() };
}

estimateBruteforceTime("0123456789abcdef", 32, 1e12);
// space : "3.4 × 10^38"
// estimatedYears : "10^19" <- t'as le temps
```

---

## 4) SUBSETS : TOUS LES SOUS-ENSEMBLES

Générer tous les sous-ensembles d'un ensemble (y compris le vide).

```text
n éléments --> 2^n sous-ensembles
3 éléments --> 8 subsets
10 éléments --> 1024 subsets
20 éléments --> 1 048 576 subsets
```

```js
// approche backtracking
function subsets(arr) {
  const results = [];

  function backtrack(start, current) {
    results.push([...current]); // chaque état intermédiaire est un subset valide

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return results;
}

subsets([1, 2, 3]);
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
// 2^3 = 8 subsets

// approche bit manipulation (plus élégante pour les petits sets)
function subsetsWithBits(arr) {
  const n = arr.length;
  const results = [];

  for (let mask = 0; mask < 1 << n; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(arr[i]); // bit i actif --> inclure arr[i]
    }
    results.push(subset);
  }

  return results;
}
// 000 --> []
// 001 --> [arr[0]]
// 010 --> [arr[1]]
// 011 --> [arr[0], arr[1]]
// etc.
```

---

## 5) QUAND COMPTER SUFFIT : ÉVITER L'ÉNUMÉRATION

Dans la majorité des problèmes réels, t'as pas besoin de générer les combinaisons.
T'as juste besoin de savoir combien il y en a.

```js
// Problème : combien d'équipes de 5 peut-on former depuis un roster de 15 joueurs ?
const teams = combinations(15, 5); // 3003 équipes possibles

// Problème : combien de chemins possibles dans une grille 4x4 (seulement droite et bas) ?
// Chaque chemin = 6 mouvements : 3 droite + 3 bas, dans n'importe quel ordre
// = C(6, 3) = 20 chemins possibles
const paths = combinations(6, 3); // 20

// Problème : password policy checker
function isStrongEnough(charset, length, minYearsToBreak = 1000) {
  const { estimatedYears } = estimateBruteforceTime(charset, length);
  return BigInt(estimatedYears) >= BigInt(minYearsToBreak);
}
```

---

## 6) PRUNING : COUPER L'ARBRE AVANT D'EXPLORER LES BRANCHES MORTES

La vraie valeur du backtracking, c'est de savoir quand ne pas continuer.

```js
// problème : trouver toutes les équipes de ninjas avec chakra total >= 200
// sans pruning : on génère toutes les combinaisons, on filtre après
// avec pruning : on arrête dès que c'est impossible d'atteindre 200

function teamsByChakra(ninjas, k, minChakra) {
  const results = [];
  ninjas.sort((a, b) => b.chakra - a.chakra); // trier par chakra décroissant pour pruner tôt

  function backtrack(start, current, chakraSum) {
    if (current.length === k) {
      if (chakraSum >= minChakra) results.push([...current]);
      return;
    }

    const remaining = k - current.length;
    const remainingNinjas = ninjas.length - start;

    // pruning : même avec les meilleurs ninjas restants, on peut pas atteindre minChakra
    if (remainingNinjas < remaining) return; // pas assez de ninjas

    for (let i = start; i < ninjas.length; i++) {
      current.push(ninjas[i]);
      backtrack(i + 1, current, chakraSum + ninjas[i].chakra);
      current.pop();
    }
  }

  backtrack(0, [], 0);
  return results;
}
```

---

## EXERCICES

## EXO 1 : SÉLECTION DE L'ÉQUIPE DE CHAMPIONNAT

Konoha doit envoyer une équipe de 3 ninjas pour le tournoi. T'as 8 candidats, chacun avec des stats.

Implémente `selectTeams(ninjas, size)` qui retourne toutes les équipes possibles.
Ensuite implémente `bestTeam(ninjas, size)` qui retourne l'équipe avec la somme de chakra maximale.

(Hint : génère les combinaisons, calcule la somme pour chacune, garde le max)

---

## EXO 2 : VALIDATEUR DE FORCE DE MOT DE PASSE

Implémente `analyzePassword(password)` qui retourne :

- la taille de l'alphabet utilisé (lowercase, uppercase, digits, symbols)
- le nombre de combinaisons possibles pour ce mot de passe
- le temps estimé pour bruteforcer à 10^9 tentatives/seconde
- un verdict : "weak" / "moderate" / "strong" / "unbreakable"

Teste avec :

- `"password"` (lowercase only, 8 chars)
- `"P@ssw0rd"` (mixed, 8 chars)
- `"Rasengan_1000_Years_of_Death!"` (mixed long)

---

## EXO 3 : GÉNÉRATEUR DE SETLIST

Bryson Tiller a 12 tracks. Il joue un concert de 8 tracks.
L'ordre compte (c'est un setlist, pas une playlist de soirée).

1. Combien de setlists différentes peut-il faire ? (calcul seulement, pas d'énumération)
2. Implémente `generateSetlist(tracks, size)` qui retourne UN setlist aléatoire valide (pas toutes les permutations)

(Hint : pour (2), Fisher-Yates puis slice)

---

## RÉSUMÉ

Permutations : l'ordre compte, n éléments → n! possibilités. Ça explose vite.
Combinaisons : l'ordre ne compte pas, choisir k parmi n → C(n,k). Beaucoup moins.
Subsets : tous les sous-ensembles → 2^n. La bit manipulation les génère élégamment.
Le principe de multiplication permet de compter l'espace de recherche sans l'énumérer.
Le pruning, c'est couper les branches impossibles avant de les explorer : c'est là que le backtracking devient efficace.
Avant de coder une boucle de bruteforce, compte d'abord : si c'est > 10^8, t'as besoin d'un autre algo.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Transfert vérifiable : estimer l'espace de recherche avant de coder

Le nombre de combinaisons détermine souvent si une recherche exhaustive est viable. Pour choisir `k` éléments parmi `n`, le nombre de possibilités est \(\binom{n}{k}\). Une boucle imbriquée peut donc devenir impraticable même si chaque itération est rapide. Les contraintes (ordre, répétition, exclusions) changent la formule : écris-les avant de compter.

**Exercice terrain.** Un moteur de recommandations doit comparer toutes les paires parmi 5 000 produits. Calcule le nombre de paires, estime la durée à 2 millions d'évaluations/s, puis propose une réduction (préfiltrage, top-k, index ou échantillonnage) et indique le biais possible.

**Vérification.** Le résultat attendu pour les paires non ordonnées sans répétition est `n*(n-1)/2 = 12 497 500`. À 2 000 000 évaluations/s, le plancher théorique est environ 6,25 s, hors I/O, allocation et contention. Un benchmark réel doit remplacer l'estimation avant engagement de performance.

**Lien aval.** Ce raisonnement prépare l'analyse de complexité dans `07-ALGORITHMS`, les index et requêtes dans Databases, puis le capacity planning dans Scalability.

<!-- AF-LESSON-PROFILE: math -->

## Repères de décision

- **Pourquoi :** Les maths rendent explicites la capacité, l'incertitude, le coût et les limites d'un algorithme. Elles évitent de décider au feeling quand le système grandit.
- **Quand l’utiliser / quand l’éviter :** Utilise la formule adaptée à la question (capacité, probabilité, hachage, logique ou combinatoire). Vérifie unités et hypothèses avant de coder ; ne sors pas une formule parce qu'elle a l'air savante.
- **Limites :** Un calcul exact sur des hypothèses fausses donne une réponse fausse. Les données réelles ont bruit, biais et limites d'échantillonnage ; une simulation n'est pas une mesure de terrain.

## Mécanisme : la version sans magie

Définis les variables, unités et domaine de validité ; dérive ou explique la formule ; calcule un cas de base, un cas limite et une sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Combinatorics lite : compter avant de bruteforcer** se rattache à ce cas concret : Kintana doit dimensionner les créneaux, estimer une charge de notification ou choisir un seuil de contrôle sans masquer l'incertitude.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décision quantitative pour la capacité Kintana

> **Arc DBZ / Capsule Corp. :** les chiffres ne sont pas de la déco. Une formule mal choisie peut envoyer tout le système dans le mur, même si le code compile.

**Mission liée à « Combinatorics lite : compter avant de bruteforcer » :** Choisis une question chiffrée cohérente avec la notion : capacité de créneaux, probabilité de collision, taille d'un espace de recherche ou seuil d'alerte. Formalise les hypothèses et compare deux scénarios.

**Livrable :** un calcul reproductible (tableur ou script), les unités, hypothèses, sensibilité et une décision argumentée.

**Critères d’acceptation :** les dimensions sont cohérentes ; le résultat est vérifié par un cas simple ; les hypothèses et l'incertitude sont exposées ; aucune précision injustifiée n'est revendiquée.

**Transfert obligatoire :** Change le volume ou le taux de base et observe si la décision reste la même. Explique le point où elle bascule.
