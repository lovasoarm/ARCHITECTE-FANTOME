---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Primitives : les types fondamentaux en JS

Temps de lecture ~6 min

En JavaScript, il existe 2 grandes catégories de types :

1. Les types primitifs
2. Les types objets

Aujourd'hui on parle des primitifs.

Un type primitif = une valeur simple, **immuable**
(immuable = on ne peut pas modifier la valeur interne)

Quand tu affectes une autre valeur primitive, tu remplaces la valeur associée à la variable ; tu ne modifies pas la primitive en place.

---

## LES 7 TYPES PRIMITIFS

Oui. 7. Pas 6.

1. `string`
2. `number`
3. `boolean`
4. `undefined`
5. `null`
6. `bigint`
7. `symbol` (utilisé notamment pour des protocoles du langage comme `Symbol.iterator` et `Symbol.asyncIterator`).

---

## 1) STRING

```javascript
let name = "Blob";
```

Une string = du texte. Elle est immuable.

```javascript
"use strict";
let text = "Hi";

try {
  text[0] = "B";
} catch (error) {
  console.log(error.name); // TypeError en mode strict
}

console.log(text); // "Hi" : la chaîne n'a pas changé
```

Les caractères d'une chaîne ne peuvent pas être modifiés sur place. Le résultat de cette affectation dépend du mode d'exécution : en mode strict (utilisé par les modules JavaScript), elle déclenche une `TypeError` ; dans un script classique non strict, l'affectation échoue sans effet. Dans les deux cas, la chaîne d'origine reste inchangée.

---

## 2) NUMBER

```javascript
let hp = 100;
let price = 19.99;
```

En JS il n'existe qu'**un seul type `number`** (pas `int`, pas `float` séparé).

Attention :

- `NaN` = Not a Number
- `Infinity` existe aussi

---

## 3) BOOLEAN

```javascript
let isAlive = true;
```

Seulement `true` ou `false`. Deux options. Pas de "peut-être".

---

## 4) UNDEFINED

```javascript
let x;
console.log(x); // undefined
```

`undefined` = variable déclarée mais sans valeur. JS a créé la boîte, mais personne n'a rien mis dedans.

---

## 5) NULL

```javascript
let y = null;
```

`null` = absence **volontaire** de valeur.

Différence simple :

- `undefined` = JS n'a rien mis
- `null` = toi tu as mis "rien"

> `null` est une décision. `undefined`, c'est JS qui hausse les épaules.

---

## 6) BIGINT

```javascript
let big = 12345678901234567890n;
```

Pour les très grands nombres. Ajoute un `n` à la fin.

---

## 7) SYMBOL

```javascript
let id = Symbol("id");
```

Type unique utilisé pour créer des clés uniques dans les objets. Avancé, mais important en architecture.

---

## PRIMITIVE OU OBJET : SAVOIR LES DISTINGUER

> **Repère de prérequis :** à cette étape, tu dois seulement reconnaître qu'un tableau ou un objet n'est pas une valeur primitive. La création et la manipulation de tableaux/objets arrivent dans [Data Basics](../FOUNDATIONS/02_DATA_BASICS/README.md). Les copies, références et mutations seront étudiées plus tard, à l'étape 8 de la route canonique.

```javascript
console.log(typeof "Bonjour"); // "string" : primitif
console.log(typeof 42); // "number" : primitif
console.log(typeof {}); // "object" : objet
console.log(Array.isArray([])); // true : tableau
```

Ne cherche pas encore à expliquer ce qui se passe quand on copie ou modifie un objet. Ce mécanisme dépend des notions de références et de mutations, volontairement différées jusqu'au Passage B de Variables.

---

## POURQUOI C'EST CRUCIAL ?

| Repère à cette étape | Ce que tu dois savoir                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `typeof "texte"`     | renvoie `"string"`                                                     |
| `typeof 42`          | renvoie `"number"`                                                     |
| `typeof null`        | renvoie historiquement `"object"` ; teste `null` explicitement         |
| `Array.isArray([])`  | distingue un tableau d'un objet ordinaire                              |
| Objet ou tableau     | n'est pas une primitive ; son fonctionnement détaillé arrive plus tard |

---

## MISSION PRIMITIVES : SANS OBJET POUR LE MOMENT

1. Crée une variable `score = 50`.
2. Copie sa valeur dans `bestScore`.
3. Change `bestScore` à `100`.
4. Affiche les deux variables et explique pourquoi `score` reste à `50`.
5. Recommence avec une chaîne : copie `"Hi"` dans une deuxième variable, puis réaffecte cette deuxième variable à `"Bye"`.
6. Vérifie que la première chaîne reste inchangée.

```javascript
// Écris ton code ici : uniquement des valeurs primitives.
```

Les objets et les tableaux seront manipulés dans Data Basics, puis étudiés sous l'angle des références et des mutations à l'étape 8. Tu n'as pas besoin de ces notions pour réussir cette mission.

---

## RÉSUMÉ

Les primitives (`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) sont des valeurs immuables. Pour cette première passe, retiens seulement qu'un tableau ou un objet n'est pas une primitive et que `typeof null` a un résultat historique particulier. Les copies, références, arguments et mutations d'objets seront expliqués à l'étape 8 ; ce ne sont pas des prérequis de cette leçon.

`typeof null === 'object'` est un comportement historique conservé pour la compatibilité. Teste `null` explicitement (`value === null`) au lieu de t'appuyer sur `typeof`.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-DIAGRAM:types -->

## Repère visuel utile : Validation des entrées à la frontière API

```text
payload externe (unknown)
        |
        v
  validation de forme
        |
        v
 normalisation explicite
        |
  +-----+------+
  v            v
valide       invalide
  |            |
  v            v
valeur métier  erreur structurée
```

<!-- AF-LESSON-PROFILE: types -->

## Repères de décision

- **Pourquoi :** Les types et conversions empêchent une valeur ambiguë de traverser le système et de devenir une décision métier incorrecte.
- **Quand l’utiliser / quand l’éviter :** Valide et normalise aux frontières (HTTP, formulaire, CSV, stockage). Utilise une conversion explicite quand le format est connu ; rejette une valeur si aucune interprétation sûre n'existe.
- **Limites :** Les types statiques n'assurent pas la validité des données au runtime. Les conversions peuvent perdre de l'information ; `parseInt`, `Number` et les coercions implicites n'ont pas les mêmes règles.

## Mécanisme : la version sans magie

Lis une entrée comme `unknown`, vérifie sa forme et ses contraintes, puis construis une valeur de domaine typée. Ne confonds pas conversion et validation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Primitives : les types fondamentaux en JS** se rattache à ce cas concret : Le formulaire Kintana reçoit des nombres, dates et chaînes venant d'appareils différents. Une chaîne vide, une date invalide ou un identifiant mal formé doit être rejeté avant la persistance.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Validation des entrées à la frontière API

> **Statut Kintana : prolongement produit différé, facultatif et sans gate supplémentaire.** Les trois leçons Types décrivent une seule évolution du même parseur ; ne construis pas trois parseurs et ne la réalise pas pendant la première passe. Fais d'abord la pratique locale de la leçon. Reprends l'intégration seulement après Data Basics, Function essentials, Type transformers, puis les modules [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md) et [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). Avant ces prérequis, tu peux simplement lire la mission et la laisser de côté.

> **Arc Konoha / Naruto :** une donnée qui arrive de l'extérieur est un rouleau inconnu. Tu ne la crois pas juste parce qu'elle a l'air propre.

**Mission liée à « Primitives : les types fondamentaux en JS » :** Écris un parseur de payload de création de demande Kintana. Il valide les champs, normalise les formats autorisés et retourne des erreurs identifiables sans convertir silencieusement une valeur douteuse.

**Livrable :** un parseur de frontière, un contrat d'entrée/sortie et des tests tabulaires couvrant formes valides, invalides et coercions piégeuses.

**Critères d’acceptation :** aucun payload brut n'entre dans le domaine ; les erreurs indiquent le champ sans révéler de secret ; les cas limites sont déterministes ; le parseur distingue valeur absente, vide et nulle.

**Transfert facultatif, à la reprise :** lorsque le parseur de base est compris et testé, ajoute une deuxième source (CSV ou client mobile) dont les formats diffèrent et compare les règles communes et spécifiques. Cette extension ne bloque pas la progression.
