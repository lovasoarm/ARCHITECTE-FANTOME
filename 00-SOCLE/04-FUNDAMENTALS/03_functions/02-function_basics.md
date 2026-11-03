---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Functions as objects : une fonction est une valeur

Temps de lecture ~7 min

> **Prérequis :** termine [`01-function_essentials.md`](01-function_essentials.md) et le module [Data Basics](../FOUNDATIONS/02_DATA_BASICS/README.md). Cette leçon traite des fonctions comme valeurs ; elle n'est pas l'introduction aux paramètres et à `return`.

Arrête de croire qu'une fonction = juste du code.

En JavaScript, une fonction est un **objet spécial**.

**Objet** = une structure en mémoire qui peut contenir des données et des comportements.

Donc une fonction c'est :

- Du code exécutable
- \+ un objet en mémoire
- \+ une valeur de référence qui permet de désigner cet objet fonction
- \+ des propriétés possibles

Oui. Une fonction peut avoir des propriétés. Oui. Elle peut être stockée. Oui. Elle peut être manipulée comme une variable. _(Bref, elle fait ce qu'elle veut : c'est une citoyenne de première classe.)_

C'est pour ça qu'on dit que les fonctions sont des **first-class citizens** : des valeurs traitées comme n'importe quelle autre valeur.

---

## 1) UNE FONCTION EST UNE VALEUR

```javascript
function greet() {
  console.log("Hello");
}
```

Ce que tu crois :

```text
greet = du code
```

Ce que JS fait vraiment :

```text
greet → valeur de référence → objet fonction
```

Donc si tu fais :

```javascript
let copy = greet;
copy(); // Hello
```

Tu ne dupliques pas le code de la fonction. L'affectation copie sa valeur de référence : `copy` et `greet` désignent le **même objet fonction**. Ce n'est pas une adresse physique que JavaScript expose.

---

## 2) UNE FONCTION PEUT ÊTRE STOCKÉE

```javascript
let actions = [];

actions.push(function () {
  console.log("Attack");
});

actions[0](); // Attack
```

Pourquoi ça marche ? Parce qu'une fonction est une valeur. Comme un nombre. Comme une string. Comme un objet. Elle peut aller partout où une valeur peut aller.

---

## 3) UNE FONCTION PEUT ÊTRE PASSÉE EN ARGUMENT

```javascript
function execute(fn) {
  fn();
}

execute(function () {
  console.log("Boom");
});
```

On passe une fonction à une autre fonction. Ça s'appelle un **callback** : une fonction donnée à une autre pour être exécutée plus tard.

C'est la base de :

- `setTimeout`
- Événements
- Promesses
- React
- Middleware (Code qui se place entre deux choses : généralement entre la requête qui arrive et la réponse qui repart.)

> Si tu comprends les callbacks, tu as déjà déverrouillé 80% du JS asynchrone. _(Les 20% restants ? On y vient.)_

---

## 4) Approfondissement différé : une fonction peut retourner une fonction

> **Statut : différé, facultatif pour cette étape.** Lis cette section après le module Scope, qui enseigne les environnements lexicaux et les closures. Les trois premières sections sur les fonctions comme valeurs et les callbacks constituent le contenu de cette étape.

```javascript
function outer() {
  return function () {
    console.log("Inside");
  };
}

let fn = outer();
fn(); // Inside
```

Chaque appel à `outer` crée une **nouvelle fonction** et la retourne. Chaque fonction retournée peut capturer son **environnement lexical** : la zone mémoire qui l'entoure au moment de sa création.

Et là, tu entres dans le monde des closures.

---

## 5) UNE FONCTION PEUT AVOIR DES PROPRIÉTÉS

```javascript
function power() {}

power.level = 9000;

console.log(power.level); // 9000
```

Pourquoi ? Parce qu'une fonction est un objet. Et les objets peuvent avoir des propriétés.

Donc techniquement, ceci :

```javascript
function test() {}
```

est mentalement proche de :

```javascript
let test = new Function(); // version simplifiée
```

> C'est bizarre. C'est JS. Accueille-le.

---

## 6) CE QUI SE PASSE EN MÉMOIRE

Quand tu écris :

```javascript
function attack() {}
```

JS fait trois choses :

1. Crée un **objet fonction** en mémoire (Ce que JS crée en mémoire quand tu déclares une fonction.)
2. Crée une **variable** `attack`
3. Met la **référence** de l'objet dedans

```text
attack → valeur de référence → objet fonction
```

Si tu fais ensuite :

```javascript
let a = attack;
```

Tu obtiens :

```text
a → même valeur de référence → même objet
```

Ce n'est **pas un nouvel objet fonction**. C'est une deuxième liaison qui désigne le même objet. Le terme `pointeur` peut servir d'analogie, mais JavaScript n'expose pas ici une adresse mémoire brute.

---

## 7) POURQUOI C'EST CRUCIAL ?

| Concept                 | Repose sur les fonctions-objets |
| ----------------------- | ------------------------------- |
| Callbacks               | ok                              |
| Closures                | ok                              |
| Hooks React             | ok                              |
| Middleware              | ok                              |
| Architecture JS moderne | ok                              |

Si tu comprends que les fonctions sont des objets, tu comprends pourquoi JS est flexible.
Si tu ne comprends pas ça, tu **subis** le langage.

---

## MISSION FUNCTION BASICS

## La Team Functions

1. Crée une fonction `attack()` qui affiche `"Slash"`
2. Copie-la dans une variable `move`
3. Exécute `move()`
4. Ajoute une propriété `damage = 50` à `attack`
5. Affiche `attack.damage`
6. Crée un tableau `skills` et mets `attack` dedans
7. Exécute la fonction depuis le tableau
8. Copie `attack` dans une autre variable et vérifie si `attack === move`

```javascript
// Ton code ici
```

> Comprends. Ne regarde pas juste le résultat. Réfléchis à la **référence** : deux noms, un seul objet en mémoire.

---

## RÉSUMÉ

Une fonction en JS est un objet de première classe : elle peut être assignée à une variable, passée en argument, retournée depuis une autre fonction, stockée dans un tableau.

Declaration vs expression vs arrow : trois syntaxes, trois comportements différents sur le hoisting (remontée de déclaration) et sur `this`. Les arrows n'ont pas leur propre `this`.

Deux variables qui référencent la même fonction pointent vers le même objet. Copier une référence de fonction ne copie pas la fonction.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: functions -->

## Repères de décision

- **Pourquoi :** Des fonctions avec un contrat clair rendent les règles testables et réutilisables sans coupler le domaine à l'interface, au réseau ou au stockage.
- **Quand l’utiliser / quand l’éviter :** Isole une transformation ou une décision métier dans une fonction. Utilise composition ou application partielle quand plusieurs étapes sont réellement réutilisées ; évite d'empiler des abstractions pour une seule ligne.
- **Limites :** Une fonction pure ne supprime pas les problèmes de concurrence, d'entrée invalide ou d'effet externe. Une pipeline trop découpée peut devenir plus difficile à suivre qu'un bloc simple.

## Mécanisme : la version sans magie

Définis les entrées, la sortie et les effets. Garde la décision pure autant que possible et place réseau, temps et persistance derrière des adaptateurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Function basics : une fonction est un objet vivant** se rattache à ce cas concret : Les règles de statut et d'éligibilité Kintana doivent donner le même résultat pour les mêmes entrées, quel que soit l'écran ou le canal qui les appelle.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle métier réutilisable dans Kintana

> **Statut Kintana : prolongement facultatif, à construire progressivement.** Les missions des leçons Function basics, `map`/`filter` et Function factory réutilisent la même règle métier ; ne crée pas trois projets. Termine d'abord la pratique locale de la leçon. Tu peux noter les entrées et sorties attendues à la main ; les tests unitaires automatisés et les deux parcours complets seront repris après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). La mission Kintana ne constitue pas une gate de Fundamentals.

> **Arc Capsule Corp. / DBZ :** une fonction est un petit moteur. Tu veux qu'elle fasse une chose clairement, pas qu'elle déclenche une transformation surprise.

**Mission liée à « Function basics : une fonction est un objet vivant » :** Isole une règle Kintana liée à la leçon (normalisation, filtrage, calcul ou création de handler). Appelle-la depuis deux parcours distincts et vérifie que le résultat ne dépend ni du DOM ni de l'ordre d'appel caché.

**Livrable :** une fonction métier documentée, des tests unitaires de contrat et deux points d'appel qui réutilisent la même règle.

**Critères d’acceptation :** mêmes entrées et même état initial donnent le même résultat ; les effets sont injectés ou isolés ; les entrées invalides sont explicites ; le nom reflète le contrat.

**Transfert facultatif, à la reprise :** ajoute une règle métier qui nécessite une dépendance variable (date, taux ou service). Choisis entre paramètre, factory et composition, puis justifie après avoir étudié Function factory. Tu peux d'abord comparer les options sur papier ; aucune intégration ni gate supplémentaire n'est requise.
