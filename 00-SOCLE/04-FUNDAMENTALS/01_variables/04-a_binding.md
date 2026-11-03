---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** un binding associe un nom à une valeur ; déclaration, assignation et lecture sont trois opérations distinctes.

> **À retenir :** explique d’abord le mécanisme avec les termes exacts ; une analogie reste facultative et ne doit jamais remplacer la définition.

# 01a : Binding : nommer, c'est déjà décider

Temps de lecture ~5 min

Avant de modifier un dossier, il faut savoir comment le retrouver. Une variable, ce n'est pas une boîte : c'est un **nom associé à une valeur**. Cette association, c'est le _binding_.

## Scène concrète : identifier une demande

Un service reçoit une demande et doit retrouver son état à partir d’un identifiant. Le nom `requestId` permet de désigner l’identifiant ; la valeur associée est le texte `REQ-102`.

## L'idée

```text
let requestId = "REQ-102"
  ^^^^^  ^^^^^^^^
  nom   valeur associée
```

Le `=` n'est pas "égal". C'est "colle ce nom à cette valeur". Retiens ça, tu viens de sauver 2 ans de bugs.

## Trois moments qui comptent

1. **Déclaration** : tu réserves le nom (`let x`).
2. **Assignation** : tu colles une valeur (`x = 42`).
3. **Lecture** : tu demandes la valeur derrière le nom (`console.log(x)`).

## Risque

Réutiliser un nom qui existe déjà dans un scope parent. Tu crois modifier, tu shadow. On y revient dans `01b`.

## Ce que l'analogie cache

Une étiquette ne se consomme pas lorsque plusieurs instructions utilisent la même valeur. En JavaScript, plusieurs bindings peuvent désigner une même valeur ; la relation de binding ne la divise pas.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-DIAGRAM:variables -->

## Repère visuel utile : un binding associe un nom à une valeur

```text
const requestId = "REQ-102"
       |                |
       +-- nom          +-- valeur associée

let status = "queued"
    |
    +-- le binding peut ensuite être réaffecté
```

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** Le binding relie un nom utilisé dans le code à une valeur. Il permet de comprendre ce que lit une instruction et ce qu'une affectation change.
- **Quand l’utiliser / quand l’éviter :** Identifie d'abord le nom et la valeur avant de suivre une fonction ou un objet. Ne confonds pas cette association avec une adresse mémoire physique.
- **Limites :** Un binding n'est pas une boîte qui contient nécessairement la donnée à une adresse connue. Avec un objet, la valeur associée peut être une référence partagée.

## Mécanisme : la version sans magie

La déclaration crée le nom dans son environnement ; l'affectation associe ou réassocie une valeur ; la lecture récupère la valeur associée à ce nom. `const` interdit la réaffectation du binding, tandis que `let` l'autorise.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), un identifiant comme `requestId` et un état comme `status` ont des rôles distincts. Nommer clairement ces informations permet de savoir quelle valeur une instruction lit ou modifie.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : nommer, affecter et lire une valeur

> **Repère concret :** écrire un identifiant sur une fiche ne déplace pas la demande ; cela permet simplement de retrouver la valeur associée.

**Mission liée à « 01a : Binding : nommer, c'est déjà décider » :** Déclare un identifiant de demande, prépare un statut puis change ce statut. Pour chaque ligne, dis si tu déclares un nom, lui affectes une valeur ou lis la valeur.

```js
const requestId = "REQ-102";
let status;
status = "queued";
console.log(requestId);
console.log(status);
```

**Livrable :** le petit programme et trois annotations : déclaration, affectation, lecture.

**Critères d’acceptation :** les deux sorties correspondent aux valeurs attendues ; les trois opérations sont correctement identifiées ; aucune explication ne confond le nom (`binding`) avec la valeur associée.

**Transfert obligatoire :** ajoute une variable `attempts`, affecte-lui `0`, puis `1`, et explique quelle instruction a changé sa valeur.
