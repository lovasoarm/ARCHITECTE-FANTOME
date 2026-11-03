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

> **Repère :** une fonction regroupe des instructions sous un nom ; elle ne s'exécute que lorsqu'on l'appelle.

# Function essentials : écrire et appeler une fonction

Temps de lecture indicatif : 7 à 9 min.

## 1. Pourquoi créer une fonction ?

Sans fonction, tu peux recopier la même formule à plusieurs endroits. Une fonction donne un nom à une opération pour pouvoir la réutiliser et la tester séparément.

## 2. Déclarer puis appeler

```js
function greet() {
  console.log("Bonjour");
}

greet(); // Bonjour
```

La déclaration décrit ce que la fonction fera. L'appel (`greet()`) demande son exécution. Oublier l'appel signifie que le bloc ne s'exécute pas.

## 3. Paramètres et arguments

Un paramètre est le nom placé dans la définition. Un argument est la valeur fournie au moment de l'appel.

```js
function greet(name) {
  console.log("Bonjour " + name);
}

greet("Mina"); // Bonjour Mina
```

Ici, `name` est le paramètre et `"Mina"` l'argument.

Une fonction peut recevoir plusieurs paramètres :

```js
function add(a, b) {
  return a + b;
}

const total = add(12, 8);
console.log(total); // 20
```

## 4. `return` n'est pas `console.log`

`console.log` affiche une information dans la console. `return` renvoie une valeur à l'endroit où la fonction a été appelée.

```js
function double(number) {
  return number * 2;
}

const result = double(5);
console.log(result); // 10
```

Sans `return` explicite, une fonction renvoie `undefined`. Une valeur affichée et une valeur renvoyée sont deux choses différentes.

## 5. Une première fonction fléchée

Une fonction fléchée est une autre manière d'écrire une fonction. Commence par lire l'équivalent avec accolades et `return` :

```js
const double = (number) => {
  return number * 2;
};

console.log(double(6)); // 12
```

Ne cherche pas encore à maîtriser les callbacks, les closures ou les fonctions qui retournent d'autres fonctions : ils arrivent après les bases.

## Repère visuel utile : appel et valeur de retour

<!-- AF-DIAGRAM:function-essentials -->

```text
add(12, 8)
    |
    v
paramètres a=12, b=8
    |
    v
return a + b
    |
    v
la valeur 20 revient à l'appelant
```

## Pourquoi ce mécanisme compte

Les fonctions évitent de recopier une même règle, donnent un nom à une opération et séparent le calcul de son affichage. Elles deviennent les briques de base des modules, des tests et des applications.

## Repères de décision

- **Pourquoi :** Une fonction nommée rend une opération réutilisable et permet de la vérifier indépendamment du reste du programme.
- **Quand l'utiliser / quand l'éviter :** Crée une fonction lorsqu'un comportement mérite un nom, doit être réutilisé ou peut être testé séparément. N'en crée pas une pour cacher une seule ligne évidente sans apporter de sens.
- **Limites :** Une fonction peut encore dépendre de variables globales ou modifier un objet reçu. Les paramètres et `return` rendent les entrées et sorties plus visibles, mais ne garantissent pas à eux seuls l'absence d'effets de bord.

## Mécanisme : la version sans magie

Lors d'un appel, JavaScript évalue les arguments, les associe aux paramètres, exécute le corps de la fonction puis renvoie la valeur indiquée par `return`. L'exécution reprend à l'endroit de l'appel.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une règle simple peut calculer le total d'une demande à partir d'un prix et d'une quantité. La fonction reçoit ces deux données et renvoie le résultat ; l'interface décide séparément comment l'afficher.

**À observer :** les arguments fournis, la valeur renvoyée, puis l'instruction qui l'affiche. Une sortie console locale est une preuve `LAB`, pas une livraison produit.

## Mission utile : calculer un total

**Mission liée à « Function essentials : écrire et appeler une fonction » :** écris une fonction `calculateTotal(price, quantity)` qui renvoie le produit des deux valeurs. Appelle-la avec `12000` et `2`, stocke le résultat puis affiche-le.

**Livrable :** définition de la fonction, appel, valeur renvoyée et sortie.

**Critères d'acceptation :** le résultat vaut `24000` ; la fonction renvoie un nombre au lieu de seulement l'afficher ; les paramètres et arguments sont correctement nommés.

**Transfert obligatoire :** change le prix et la quantité. Prédis le nouveau résultat avant l'exécution et explique pourquoi la fonction elle-même n'a pas besoin d'être réécrite.
