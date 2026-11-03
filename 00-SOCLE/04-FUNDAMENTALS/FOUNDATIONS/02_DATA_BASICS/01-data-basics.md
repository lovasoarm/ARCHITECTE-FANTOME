---
stability: stable
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** une variable peut désigner une valeur simple, un tableau qui regroupe plusieurs éléments ou un objet qui regroupe des propriétés nommées.

# Data Basics : premiers tableaux et objets

Temps de lecture indicatif : 8 à 10 min.

## 1. Pourquoi regrouper des données ?

Trois variables peuvent suffire pour trois articles. Mais lorsqu'une liste grandit, un tableau permet de garder les éléments ensemble et de les traiter avec une boucle.

## 2. Le tableau : une liste ordonnée

```js
const names = ["Mina", "Tovo", "Lala"];

console.log(names[0]); // "Mina"
console.log(names[1]); // "Tovo"
console.log(names.length); // 3
```

Les index commencent à `0` : le premier élément est `names[0]`, le deuxième est `names[1]`. `length` indique le nombre d'éléments.

Tu peux modifier un élément avec son index, ajouter à la fin avec `push` et retirer le dernier élément avec `pop`.

```js
const tasks = ["Lire", "Pratiquer"];
tasks[0] = "Relire";
tasks.push("Vérifier");
const lastTask = tasks.pop();

console.log(tasks); // ["Relire", "Pratiquer"]
console.log(lastTask); // "Vérifier"
```

`const` empêche de réaffecter le nom `tasks`, mais ne rend pas le tableau immuable. Le contenu peut être modifié ; ce point sera approfondi dans les leçons sur les références et `const`.

## 3. Parcourir un tableau

Quand tu veux examiner chaque élément, une boucle `for...of` lit les valeurs dans l'ordre. C’est une forme de boucle conçue pour parcourir les éléments d’une collection ; elle n’utilise pas de compteur manuel.

```js
const names = ["Mina", "Tovo", "Lala"];

for (const name of names) {
  console.log(name);
}
```

Ne confonds pas la valeur d'un élément (`name`) et son index (`0`, `1`, `2`). Cette première boucle te donne les valeurs ; une boucle `for` avec compteur permet de manipuler les index quand c'est nécessaire.

## 4. L'objet : des propriétés nommées

Un objet regroupe des informations qui décrivent une même chose. Chaque propriété a un nom et une valeur.

```js
const person = {
  name: "Mina",
  city: "Antananarivo",
  age: 21,
};

console.log(person.name); // "Mina"
console.log(person["city"]); // "Antananarivo"
person.age = 22;
console.log(person.age); // 22
```

La notation avec un point (`person.name`) est la plus simple lorsque le nom de propriété est connu. La notation avec crochets (`person["city"]`) est utile lorsque tu écris le nom de la propriété sous forme de texte ou que tu le stockes dans une variable.

## 5. Une liste de fiches : tableau d'objets

Les deux structures peuvent être combinées : le tableau garde la liste ordonnée, et chaque objet décrit un élément de cette liste.

```js
const requests = [
  { id: "REQ-101", status: "queued" },
  { id: "REQ-102", status: "done" },
];

console.log(requests[0].id); // "REQ-101"
console.log(requests[1].status); // "done"
```

Lis d'abord `requests[0]` comme « premier élément du tableau », puis `.id` comme « propriété id de cet objet ». Cette combinaison sera réutilisée dans les leçons de références et de mutation.

## 6. Tableau ou objet ?

| Structure    | À choisir lorsque…                              | Exemple                          |
| ------------ | ----------------------------------------------- | -------------------------------- |
| Tableau `[]` | tu as une liste ordonnée d'éléments             | noms, tâches, prix               |
| Objet `{}`   | tu décris une chose avec des propriétés nommées | personne, demande, configuration |

Un tableau peut contenir des nombres, du texte, des objets ou des valeurs de types différents. Au début, garde des éléments simples et un format cohérent : c'est plus facile à lire et à vérifier.

## Repère visuel utile : deux façons de regrouper les valeurs

<!-- AF-DIAGRAM:data-basics -->

```text
TABLEAU : ordre + index
names
  [0] -> "Mina"
  [1] -> "Tovo"
  [2] -> "Lala"

OBJET : propriétés nommées
person
  name -> "Mina"
  city -> "Antananarivo"
```

## Pourquoi ce mécanisme compte

Les tableaux représentent des collections ; les objets représentent des entités décrites par leurs propriétés. Cette distinction permet de choisir une structure lisible avant d'écrire les fonctions qui la traiteront.

## Repères de décision

- **Pourquoi :** Regrouper les valeurs rend le programme plus facile à faire évoluer et évite de multiplier des variables sans relation explicite.
- **Quand l'utiliser / quand l'éviter :** Choisis un tableau pour une collection ordonnée et un objet pour décrire une entité. Ne crée pas un objet simplement parce qu'il est possible de le faire ; une valeur simple suffit parfois.
- **Limites :** Un tableau n'impose pas à lui seul que tous les éléments aient la même forme. Un objet JavaScript peut contenir des fonctions et des propriétés imbriquées, mais ces notions ne sont pas nécessaires pour cette première leçon.

## Mécanisme : la version sans magie

Un tableau expose des éléments accessibles par index et une propriété `length`. Un objet expose des propriétés accessibles par leur nom. L'affectation d'un index ou d'une propriété modifie le contenu de la structure désignée ; elle ne réaffecte pas forcément le binding déclaré avec `const`.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une demande peut être représentée par un objet contenant un identifiant et un statut ; une liste de demandes peut être représentée par un tableau. Cette leçon reste locale : aucune API ni base de données n'est requise.

**À observer :** note la valeur avant l'accès, la propriété ou l'index lu, puis le résultat affiché. Étiquette l'expérience `LAB` si tu l'exécutes localement.

## Mission utile : représenter une petite liste

**Mission liée à « Data Basics : premiers tableaux et objets » :** crée un tableau `tasks` de trois noms de tâches et un objet `profile` avec `name` et `city`. Affiche le deuxième élément du tableau, ajoute une tâche, puis affiche le nom de la personne.

**Livrable :** code, sorties attendues et trois annotations : index, longueur et propriété.

**Critères d'acceptation :** le deuxième élément est correctement lu avec l'index `1` ; l'ajout apparaît à la fin ; les propriétés sont lues avec le nom exact.

**Transfert obligatoire :** remplace les tâches par trois produits et l'objet `profile` par un objet `product`. Explique pourquoi tu conserves un tableau pour la liste et un objet pour chaque produit.
