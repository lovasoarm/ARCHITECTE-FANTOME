---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, regression]
anti_recipe_key: changement_echelle+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Higher-order functions : map, filter et reduce

Temps de lecture ~6 min

> **Prérequis obligatoires :** [Function essentials](01-function_essentials.md), [Data Basics](../FOUNDATIONS/02_DATA_BASICS/README.md) et lecture des fonctions comme valeurs dans [`02-function_basics.md`](02-function_basics.md). Si les tableaux, les index, les paramètres ou `return` sont nouveaux, retourne à ces leçons avant de continuer.

Bienvenue dans le labo des fonctions qui manipulent des fonctions. _(Fonctionception.)_

---

## 1) HIGH ORDER FUNCTION (HOF)

Une HOF, c'est **une fonction qui prend une autre fonction en argument, ou qui en retourne une**.

En gros : les fonctions sont des jouets que tu peux donner à d'autres fonctions.

```javascript
function greet(name) {
  return "Hello " + name;
}

function processUser(user, fn) {
  console.log(fn(user));
}

processUser("Naruto", greet); // Hello Naruto
```

Ici :

- `processUser` est la **HOF**
- `greet` est la fonction passée en argument
- Résultat : du code modulaire, réutilisable, et beaucoup moins répétitif

> Les HOF sont partout en JS : `setTimeout`, `addEventListener`, `map`, `filter`, `reduce`... Tu les utilisais déjà sans le savoir.

---

## 2) MAP

`map` **transforme chaque élément** d'un tableau et retourne un **nouveau tableau**.

```javascript
let numbers = [1, 2, 3];
let squared = numbers.map((x) => x * x);

console.log(squared); // [1, 4, 9]
console.log(numbers); // [1, 2, 3] ← intact
```

Points clés :

- `map` ne modifie pas lui-même la structure du tableau original : il retourne un nouveau tableau
- prend une fonction en argument : c'est elle qui décide la transformation
- retourne toujours un tableau de **même longueur**

> Pense à `map` comme une chaîne de montage : chaque élément passe par ta fonction et ressort transformé de l'autre côté.

---

## 3) FILTER

`filter` **garde uniquement les éléments** qui passent un test et retourne un nouveau tableau.

```javascript
let points = [10, 5, 8, 3];
let highScores = points.filter((p) => p >= 8);

console.log(highScores); // [10, 8]
console.log(points); // [10, 5, 8, 3] ← intact
```

Points clés :

- `filter` = un videur à l'entrée du club : il ne laisse passer que ceux qui passent la condition
- retourne un tableau potentiellement **plus court** que l'original
- le tableau d’origine garde le même contenu si le callback ne le modifie pas lui-même ; avec des objets, les références restent partagées

| Méthode  | Ce qu'elle fait              | Taille du résultat     |
| -------- | ---------------------------- | ---------------------- |
| `map`    | transforme chaque élément    | identique à l'original |
| `filter` | garde selon une condition    | inférieure ou égale    |
| `reduce` | accumule en une seule valeur | n'importe quoi         |

---

## 4) REDUCE

`reduce` **accumule tous les éléments** en une seule valeur de sortie. Cette valeur peut être un nombre, une string, un objet, un tableau : n'importe quoi.

```javascript
let scores = [10, 5, 8, 3];
let total = scores.reduce((acc, score) => acc + score, 0);

console.log(total); // 26
```

Anatomie :

- `acc` = l'accumulateur : la valeur en cours de construction
- `score` = l'élément courant du tableau
- `0` = la valeur de départ de l'accumulateur

```text
tour 1 : acc=0, score=10 → acc devient 10
tour 2 : acc=10, score=5 → acc devient 15
tour 3 : acc=15, score=8 → acc devient 23
tour 4 : acc=23, score=3 → acc devient 26
résultat : 26
```

> `reduce` c'est un entonnoir : tout rentre, une seule chose sort. C'est le couteau suisse des trois : ce que `map` et `filter` ne peuvent pas faire seuls, `reduce` s'en charge.

---

## 5) POURQUOI C'EST CRUCIAL

- Code **plus court, plus lisible**, moins de boucles `for` manuelles
- Parfait pour manipuler des collections : joueurs, scores, jutsus, utilisateurs...
- C'est la base du style **fonctionnel** en JS : et de tout ce que tu feras en React

> Maîtriser ces trois HOF, c'est passer de "je subis les tableaux" à "je les plie à ma volonté".

---

## MISSION MAP / FILTER / REDUCE

## La Team HOF

1. Crée un tableau `players` avec 4 objets `{ name, hp }`
2. Utilise `map` pour créer un tableau avec le **double** des hp de chaque joueur
3. Utilise `filter` pour ne garder que les joueurs avec `hp > 100`
4. Utilise `reduce` pour calculer le **total de hp** de toute la team
5. Affiche les résultats à chaque étape

```javascript
// Ton code ici
```

> Les méthodes retournent un nouveau tableau ou une nouvelle valeur de résultat, mais cela ne garantit pas une copie profonde. Un callback peut modifier un objet reçu, et `filter` conserve les références vers les objets retenus. Évite les effets de bord dans les callbacks lorsque tu veux préserver les données d’origine.

---

## RÉSUMÉ

`map` transforme chaque élément et retourne un nouveau tableau de même taille. `filter` garde les éléments qui passent le test et retourne un tableau plus petit ou égal. `reduce` accumule tout en une seule valeur.

Ces méthodes ne modifient pas elles-mêmes le tableau source. Elles ne neutralisent toutefois pas les effets de bord du callback : si celui-ci modifie un objet partagé, le changement reste visible depuis le tableau d’origine. `filter` copie la liste des références retenues, pas les objets eux-mêmes.

`map + filter` enchaînés créent deux tableaux intermédiaires. Si la performance compte, `reduce` peut parfois réaliser une transformation en un seul passage, mais un code plus court n’est pas automatiquement plus rapide ni plus lisible.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-LESSON-PROFILE: functions -->

## Repères de décision

- **Pourquoi :** Des fonctions avec un contrat clair rendent les règles testables et réutilisables sans coupler le domaine à l'interface, au réseau ou au stockage.
- **Quand l’utiliser / quand l’éviter :** Isole une transformation ou une décision métier dans une fonction. Utilise composition ou application partielle quand plusieurs étapes sont réellement réutilisées ; évite d'empiler des abstractions pour une seule ligne.
- **Limites :** Une fonction pure ne supprime pas les problèmes de concurrence, d'entrée invalide ou d'effet externe. Une pipeline trop découpée peut devenir plus difficile à suivre qu'un bloc simple.

## Mécanisme : la version sans magie

Définis les entrées, la sortie et les effets. Garde la décision pure autant que possible et place réseau, temps et persistance derrière des adaptateurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **High order functions : map & filter** se rattache à ce cas concret : Les règles de statut et d'éligibilité Kintana doivent donner le même résultat pour les mêmes entrées, quel que soit l'écran ou le canal qui les appelle.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle métier réutilisable dans Kintana

> **Statut Kintana : prolongement facultatif, à construire progressivement.** Les missions des leçons Function basics, `map`/`filter` et Function factory réutilisent la même règle métier ; ne crée pas trois projets. Termine d'abord la pratique locale de la leçon. Tu peux noter les entrées et sorties attendues à la main ; les tests unitaires automatisés et les deux parcours complets seront repris après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). La mission Kintana ne constitue pas une gate de Fundamentals.

> **Arc Capsule Corp. / DBZ :** une fonction est un petit moteur. Tu veux qu'elle fasse une chose clairement, pas qu'elle déclenche une transformation surprise.

**Mission liée à « High order functions : map & filter » :** Isole une règle Kintana liée à la leçon (normalisation, filtrage, calcul ou création de handler). Appelle-la depuis deux parcours distincts et vérifie que le résultat ne dépend ni du DOM ni de l'ordre d'appel caché.

**Livrable :** une fonction métier documentée, des tests unitaires de contrat et deux points d'appel qui réutilisent la même règle.

**Critères d’acceptation :** mêmes entrées et même état initial donnent le même résultat ; les effets sont injectés ou isolés ; les entrées invalides sont explicites ; le nom reflète le contrat.

**Transfert facultatif, à la reprise :** ajoute une règle métier qui nécessite une dépendance variable (date, taux ou service). Choisis entre paramètre, factory et composition, puis justifie après avoir étudié Function factory. Tu peux d'abord comparer les options sur papier ; aucune intégration ni gate supplémentaire n'est requise.
