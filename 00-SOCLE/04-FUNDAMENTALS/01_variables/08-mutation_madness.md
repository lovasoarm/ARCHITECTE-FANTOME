---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **Repère :** une copie superficielle du conteneur peut laisser les objets imbriqués partagés ; vérifie chaque niveau.

# Mutation madness : shallow vs deep copy

Temps de lecture ~6 min

> Tu croyais avoir copié. T'as juste dupliqué le chaos.

> Ce fichier introduit la mutation et la copie superficielle.
> Le mécanisme complet (Stack vs Heap, deep clone, structuredClone) est traité en profondeur dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref/02-shallow_vs_deep.md`.
> Ici on pose le problème. Là-bas on va au fond.

---

## Scène concrète : modifier le prix d’un produit

Un inventaire contient des produits. Chaque produit possède un prix décrit par un objet imbriqué. Une copie superficielle du tableau ne recopie pas automatiquement cet objet interne.

## 1) LE PROBLÈME DU SHALLOW COPY (COPIE SUPERFICIELLE) AVEC DES OBJETS IMBRIQUÉS

```js
let products = [
  { name: "Carnet", stock: 10, price: { amount: 1200, currency: "MGA" } },
  { name: "Stylo", stock: 30, price: { amount: 500, currency: "MGA" } },
];

let shallowProducts = [...products];
```

Le tableau est nouveau. Mais les objets à l'intérieur ? **Même référence.**

```text
products       --> [ obj1, obj2 ]
shallowProducts --> [ obj1, obj2 ] <-- mêmes objets, pas des copies
```

Donc :

```js
shallowProducts[0].price.amount += 100;
console.log(products[0].price.amount); // 1300 -> modifié aussi
```

---

## 2) SHALLOW VS DEEP : LE TABLEAU DE VÉRITÉ

| Type         | Tableau | Objets internes | Objets imbriqués |
| ------------ | ------- | --------------- | ---------------- |
| Shallow copy | nouveau | partagés        | partagés         |
| Deep copy    | nouveau | nouveaux        | nouveaux         |

---

## 3) COMMENT FAIRE UNE VRAIE DEEP COPY (COPIE EN PROFONDEUR)

**Manuelle avec `map` + spread** : quand t'as un niveau d'imbrication :

```js
let independentProducts = products.map((product) => ({
  ...product,
  price: { ...product.price }, // on recopie aussi l'objet imbriqué
}));
```

**`structuredClone`** : la méthode moderne, pour tout le reste :

```js
let independentProducts = structuredClone(products);

independentProducts[0].price.amount += 100;
console.log(products[0].price.amount); // reste 1300
```

Un seul appel. Tous les niveaux copiés. Fini le chaos.

> Limite de `structuredClone` : ne fonctionne pas avec les `Function` et les classes complexes. Pour du JSON classique, c'est parfait.

---

## RÉSUMÉ

Shallow copy (copie superficielle) : la structure de premier niveau est copiée, mais les objets imbriqués restent partagés. Modifier `copy.stats.hp` modifie l'original aussi.

Deep copy (copie profonde) : tout l'arbre est dupliqué. `structuredClone()` est la solution native en 2026. `JSON.parse(JSON.stringify(...))` fonctionne mais tue les `undefined`, les fonctions, et les `Date`.

Le bon réflexe : avant de muter un objet reçu en paramètre, demande-toi si tu travailles sur l'original ou sur une copie.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** Une copie évite qu'une modification destinée à une nouvelle version touche aussi l'état d'origine. La profondeur de copie détermine quelles références restent partagées.
- **Quand l’utiliser / quand l’éviter :** Fais une copie lorsque tu as besoin d'un instantané indépendant ou d'un état modifiable séparément. Choisis explicitement le niveau de profondeur correspondant aux données réellement imbriquées.
- **Limites :** Le spread et `slice()` sont superficiels. Une copie profonde coûte du temps et de la mémoire et ne doit pas être appliquée automatiquement à chaque objet.

## Mécanisme : la version sans magie

Une copie superficielle crée un nouvel objet ou tableau externe, mais conserve les références des objets imbriqués. Une copie plus profonde recrée aussi les niveaux nécessaires. La bonne profondeur dépend de ce qui doit rester partagé et de ce qui doit devenir indépendant.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), un composant peut préparer une nouvelle version des métadonnées d'une demande sans modifier l'état d'origine. Une copie superficielle suffit parfois ; lorsque les propriétés imbriquées doivent être indépendantes, il faut copier ces niveaux aussi.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : choisir la profondeur d'une copie

> **Repère concret :** copier le dossier parent ne duplique pas automatiquement chaque sous-dossier. Vérifie la profondeur de la copie avant de promettre un instantané indépendant.

**Mission liée à « Mutation madness : shallow vs deep copy » :** Kintana conserve une demande contenant un objet `metadata`. Crée une copie superficielle, modifie une propriété imbriquée et observe si l'original change. Construis ensuite une copie adaptée à cette structure et vérifie que la modification ne traverse plus la frontière voulue.

```js
const original = { id: "REQ-105", metadata: { retries: 0 } };
const shallow = { ...original };
shallow.metadata.retries = 1;
console.log(original.metadata.retries); // 1 : objet imbriqué partagé

const independent = {
  ...original,
  metadata: { ...original.metadata },
};
independent.metadata.retries = 2;
console.log(original.metadata.retries); // reste 1
```

**Livrable :** le code et un schéma des références avant/après chaque copie.

**Critères d’acceptation :** l'apprenant identifie exactement le niveau copié par le spread ; il explique pourquoi le premier changement affecte l'original et pourquoi le second ne l'affecte pas ; il ne choisit une copie profonde que si la structure et le besoin la justifient.

**Transfert obligatoire :** indique comment tu adapterais la stratégie si `metadata` contenait un troisième niveau d'imbrication.
