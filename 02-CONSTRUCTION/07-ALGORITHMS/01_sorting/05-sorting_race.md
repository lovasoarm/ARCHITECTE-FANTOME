---
perishability_id: PER-0018

stability: "perissable"
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
source_type: "secondary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Source secondaire consultée pour le sujet « Sorting race : bubble vs merge vs quick sur des vrais volumes ». Elle sert de repère conceptuel/heuristique, non de norme officielle ni de preuve universelle. Les choix propres au curriculum doivent être évalués séparément."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "SECONDARY_REFERENCE_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Sorting race : bubble vs merge vs quick sur des vrais volumes

Temps de lecture ~8 min

T'as vu les algos en isolation. Maintenant on les fait se battre.

10k éléments. 100k. 1M. Sur des tableaux aléatoires, triés, inversés, avec doublons. Les courbes de complexité que t'as vues en théorie vont devenir des chiffres réels. Certains résultats vont te surprendre.

---

> **Comportement JavaScript à connaître avant le benchmark :** `Array.prototype.sort()` modifie le tableau d’origine. Sans comparateur, les éléments sont triés selon leur représentation en chaînes (ce qui surprend pour les nombres). Le tri est stable depuis ECMAScript 2019, mais la spécification ne promet ni un algorithme interne précis ni une complexité temporelle particulière. Les détails V8 décrits plus loin sont donc des exemples dépendants de la version du moteur, pas une règle ECMAScript.

## 1) LE SETUP DE BENCHMARK

```js
// générateurs de données
function createRandom(seed = 123456789) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}
const random = (n, seed = 123456789) => {
  const next = createRandom(seed);
  return Array.from({ length: n }, () => Math.floor(next() * n));
};
const sorted = (n) => Array.from({ length: n }, (_, i) => i);
const reversed = (n) => Array.from({ length: n }, (_, i) => n - i);
const duplicates = (n, seed = 123456789) => {
  const next = createRandom(seed);
  return Array.from({ length: n }, () => Math.floor(next() * 10));
};

// timer propre
function benchmark(label, fn, arr, repetitions = 5) {
  fn([...arr]); // échauffement séparé, non compté
  const samples = [];
  for (let i = 0; i < repetitions; i++) {
    const input = [...arr]; // on ne mute pas le tableau de référence
    const start = performance.now();
    fn(input);
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  const median = samples[Math.floor(samples.length / 2)];
  console.log(
    `${label.padEnd(20)} : ${median.toFixed(2).padStart(8)} ms (médiane)`,
  );
  return median;
}
```

---

## 2) LA COURSE : 10k, 100k, 1M ÉLÉMENTS

```js
// implémentations à utiliser
// (reprises des leçons précédentes)

for (const n of [10_000, 100_000, 1_000_000]) {
  console.log(`\n=== n = ${n.toLocaleString()} ===`);
  const data = random(n);

  if (n <= 10_000) benchmark("bubble sort", bubbleSort, data);
  else
    console.log(
      "bubble sort          : SKIP (coût quadratique trop élevé pour ce palier)",
    );

  if (n <= 50_000) benchmark("insertion sort", insertionSort, data);
  else
    console.log(
      "insertion sort       : SKIP (coût quadratique trop élevé pour ce palier)",
    );

  benchmark("merge sort", mergeSort, data);
  benchmark("quick sort", quickSortRandom, data);
  benchmark("Array.sort", (arr) => arr.sort((a, b) => a - b), data);
}
```

**Exemple de tableau de résultats : valeurs fictives de mise en forme, à remplacer par tes mesures :**

```text
=== n = 10 000 ===
bubble sort      : mesure à relever
insertion sort   : mesure à relever
merge sort       : mesure à relever
quick sort       : mesure à relever
Array.sort       : mesure à relever

=== n = 100 000 ===
reprendre les algorithmes réellement exécutables ; noter les skips et leur raison

=== n = 1 000 000 ===
ne lancer que les algorithmes dont le coût et la mémoire restent acceptables
```

---

### Environnement à consigner

Avant de comparer les résultats, note : version de Node (`node --version`), version du moteur (`process.versions.v8`), système d’exploitation, processeur, taille de l’échantillon, générateur et graine des données, nombre de répétitions, échauffement, et si le processus tournait seul. Les valeurs mesurées ne sont pas transférables automatiquement à une autre machine. La graine du générateur doit aussi être enregistrée pour rejouer exactement les mêmes données.

## 3) ANALYSER CHAQUE TYPE DE DONNÉES

```js
const SIZES = [10_000, 100_000];

function raceOn(label, dataFn) {
  console.log(`\n--- Données : ${label} ---`);
  for (const n of SIZES) {
    const data = dataFn(n);
    console.log(`n = ${n}`);
    benchmark("merge sort", (arr) => mergeSort(arr), data);
    benchmark("quick sort", (arr) => quickSortRandom([...arr]), data);
    benchmark("Array.sort", (arr) => arr.sort((a, b) => a - b), data);
  }
}

raceOn("aléatoire", random);
raceOn("trié", sorted);
raceOn("inversé", reversed);
raceOn("doublons", duplicates);
```

**Hypothèses à tester, pas résultats garantis :**

```text
Données triées :
 merge sort  --> O(n log n) pour l’algorithme standard ; comparer les constantes et la mémoire sur les données mesurées
 quick sort  --> pareil avec pivot random, O(n log n) moyen
 Array.sort  --> peut profiter de séquences déjà ordonnées ; mesure le moteur réellement utilisé

Données inversées :
 merge sort  --> identique à aléatoire
 quick sort  --> identique à aléatoire (pivot random)
 Array.sort  --> peut profiter de séquences inversées ; le résultat dépend du moteur et de la version

Données avec doublons :
 quick sort classique --> ralenti sur certaines distributions
 quick sort 3-way   --> gagne ici
```

---

## 4) POURQUOI ARRAY.SORT ÉCRASE TOUT

L’implémentation de `Array.sort()` dépend du moteur et de sa version. V8 a utilisé une variante de TimSort, mais ECMAScript impose surtout le résultat observable (notamment la stabilité), pas cet algorithme interne.

Tim Sort est une hybridation :

- détecte les "runs" naturels dans le tableau (séquences déjà triées ou triées à l'envers)
- sur les runs courts (< 64 éléments) : Insertion Sort
- fusionne les runs avec une version optimisée de Merge Sort

```text
Tableau avec runs naturels :
[1, 3, 5, 7 | 8, 6, 4, 2 | 10, 11, 12]
 run trié   run inversé  run trié

Algorithme interne du moteur (exemple V8 selon version) :
1. Détecte les 3 runs
2. Inverse le run décroissant : [2, 4, 6, 8]
3. Fusionne les 3 runs triés

Résultat : beaucoup moins d'opérations que Merge Sort pur sur les données "réelles"
```

```js
// démonstration du comportement avec runs
const avecRuns = [
  ...sorted(1000), // déjà trié
  ...reversed(1000), // à l'envers
  ...random(1000), // aléatoire
].slice(0, 2000);

console.time("array sort avec runs");
[...avecRuns].sort((a, b) => a - b);
console.timeEnd("array sort avec runs");
// beaucoup plus rapide que sur 2000 éléments purement aléatoires
```

---

## 5) CHOISIR LE BON ALGO SELON LE CONTEXTE

```text
Contexte             Algo recommandé
-------------------------------- ----------------
Données primitives en JS     Array.sort() (choix pratique ; moteur dépendant)
Objets avec comparateur custom  Array.sort() (tri stable requis par ECMAScript depuis ES2019)
Stabilité critique        Merge Sort stable (ou Array.sort, stable depuis ES2019)
Mémoire contrainte        Quick Sort in-place
Linked list à trier        Merge Sort (pas d'accès aléatoire nécessaire)
Données avec beaucoup de doublons Quick Sort 3-way
Très petits tableaux (< 20)    Insertion Sort (overhead minimal)
Pédagogie / entretiens      Savoir implémenter les trois
```

---

## 6) LE VRAI MESSAGE DE CETTE LEÇON

```text
n = 100 000

Insertion sort : ~5 000 000 000 opérations (50 milliards sur 1M)
Merge sort :     ~1 700 000 opérations
Quick sort :     ~1 700 000 opérations
Algorithme interne du moteur (exemple V8 selon version) :        < 1 000 000 opérations (avec runs naturels)
```

La différence entre O(n²) et O(n log n) devient importante lorsque n augmente. Le temps mesuré n’est pas déductible du seul Big-O : il dépend de la machine, du moteur, des données, de l’implémentation et des coûts mémoire.

---

## EXERCICES

## EXO 1 : La race complète

_~20 min_

Implémente le benchmark complet avec tous les algos sur les 4 types de données (aléatoire, trié, inversé, doublons) pour n = 10k et n = 100k. Documente les résultats dans un tableau Markdown. Identifie quel algo gagne sur quel type de données et explique pourquoi.

---

## EXO 2 : Trouver le break-even

_~15 min_

À partir de quelle taille de tableau Merge sort commence-t-il à battre Insertion sort de manière significative (>2x) ? Écris un script qui trouve ce seuil empiriquement en testant n = 10, 20, 50, 100, 500, 1000, 5000.

---

## EXO 3 : Départager 100 000 lignes de stats sans planter le site en pleine soirée de match

_~25 min_

Tu reçois un tableau de 100 000 entrées de match avec `{ équipe, buts, passes, minutes }`. Tu dois les trier par `buts` décroissant, avec `passes` comme critère de départage. Le tri doit être stable. Choisis le bon algo et justifie ton choix dans un commentaire.

```js
const stats = Array.from({ length: 100_000 }, () => ({
  équipe: ["PSG", "Real", "Bayern", "City"][(Math.random() * 4) | 0],
  buts: (Math.random() * 5) | 0,
  passes: (Math.random() * 20) | 0,
  minutes: 90,
}));
```

---

## RÉSUMÉ

Sur des données aléatoires, des données presque triées ou des suites déjà structurées, les résultats dépendent de l’algorithme, de son implémentation, du moteur et du protocole de mesure. `Array.sort()` peut exploiter des séquences déjà ordonnées, mais son algorithme interne n’est pas imposé par ECMAScript. Insertion sort reste utile dans certains petits tableaux ou contextes presque triés. Le vrai enseignement : la classe de complexité ne suffit pas à prédire le temps réel ; mesure le moteur et les données utilisés.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « Sorting race : bubble vs merge vs quick sur des vrais volumes » à un volume de données dix fois plus grand ou une mémoire dix fois plus petite. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: algorithms -->

## Repères de décision

- **Pourquoi :** Un algorithme transforme une entrée en résultat ; sa complexité détermine si la solution reste viable quand le volume augmente.
- **Quand l’utiliser / quand l’éviter :** Compare plusieurs approches quand le volume ou la latence est important. Préfère l'algorithme le plus simple qui respecte le besoin et l'enveloppe mesurée.
- **Limites :** Big-O décrit une croissance asymptotique, pas le temps exact. Les constantes, la distribution des données, le matériel et les coûts I/O comptent aussi.

## Mécanisme : la version sans magie

Décris l'état, les étapes et les invariants ; analyse le meilleur, moyen et pire cas pertinents ; vérifie par tests de propriétés et benchmark.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Sorting race : bubble vs merge vs quick sur des vrais volumes** se rattache à ce cas concret : Le dispatch Kintana doit affecter des demandes à des agents selon capacité, priorité et zone sans créer de biais ou exploser en coût.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Optimiser une opération de dispatch

> **Arc DBZ / Capsule Corp. :** une attaque brillante mais quadratique peut perdre le combat quand la foule arrive. Regarde le coût quand l'entrée grandit.

**Mission liée à « Sorting race : bubble vs merge vs quick sur des vrais volumes » :** Implémente ou compare l'algorithme associé à la leçon sur une tâche de dispatch Kintana. Définis d'abord le résultat attendu et les cas limites, puis calcule le coût et mesure une fixture à plusieurs tailles.

**Livrable :** l'algorithme, tests de propriétés, analyse de complexité et benchmark reproductible si le sujet le permet.

**Critères d’acceptation :** le résultat est correct pour les cas limites ; le coût temporel et mémoire est expliqué ; le benchmark ne confond pas overhead de mesure et algorithme ; les hypothèses sont écrites.

**Transfert obligatoire :** Change le nombre d'acteurs et la distribution des priorités. Identifie le scénario où l'algorithme choisi devient mauvais.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [MDN : Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [ECMAScript : Array.prototype.sort](https://tc39.es/ecma262/#sec-array.prototype.sort)
