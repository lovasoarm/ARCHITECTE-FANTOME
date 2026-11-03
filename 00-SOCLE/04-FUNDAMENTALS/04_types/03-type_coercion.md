---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, transmission]
anti_recipe_key: decision_inversee+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Type coercion : conversion implicite / explicite

Temps de lecture ~6 min

JavaScript est un langage **dynamique** (dynamique = les variables peuvent changer de type).

Donc JS convertit parfois les types automatiquement. Ça s'appelle la **coercion** → conversion automatique d'un type vers un autre.

Et c'est là que le chaos commence.

---

## 1) COERCION IMPLICITE (AUTOMATIQUE)

JS décide pour toi. Sans te demander. Comme un ami qui "aide" à ranger ta chambre.

```javascript
console.log("5" + 1); // "51"
```

Pourquoi ? Parce que `+` avec une string force la conversion en string. `1` devient `"1"`, donc `"5" + "1" = "51"`.

```javascript
console.log("5" - 1); // 4
```

Pourquoi ? Le `-` force une conversion en number. `"5"` devient `5`, donc `5 - 1 = 4`.

Résumé :

- `+` peut faire de la **concaténation** si une string est présente
- `-`, `*`, `/` forcent toujours un calcul **numérique**

Ça sent le piège. Parce que c'en est un.

---

## 2) `==` VS `===`

```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

- `==` compare **après coercion** : JS convertit `"5"` en `5` avant de comparer
- `===` compare le **type ET la valeur** : aucune conversion, aucune surprise

> Règle simple : utilise toujours `===` sauf si tu sais **exactement** ce que tu fais. Et même là, utilise `===`.

---

## 3) LES CAS TORDUS

```javascript
console.log(false == 0); // true
console.log("" == 0); // true
console.log(null == undefined); // true
```

Pourquoi ? JS applique des règles internes de conversion :

- `false` → devient `0`
- `""` → devient `0`
- `null` et `undefined` sont considérés égaux entre eux avec `==`

```javascript
console.log(null === undefined); // false
```

Types différents. `===` ne ment pas.

---

## 4) COERCION EXPLICITE (PROPRE)

Tu contrôles la conversion. Pas de magie cachée.

```javascript
// String vers Number
Number("10"); // 10
parseInt("10"); // 10

// Number vers String
String(10); // "10"

// Boolean
Boolean(1); // true
Boolean(0); // false
```

C'est propre. C'est prévisible. Fais-le toi-même plutôt que de laisser JS improviser.

---

## 5) TRUTHY / FALSY

En JS, certaines valeurs sont considérées comme `false` dans un contexte booléen.

**Falsy** : les 6 seules valeurs qui valent `false` :

```text
false, 0, "", null, undefined, NaN
```

**Tout le reste est truthy** : y compris `"0"`, `[]`, `{}`.

```javascript
if ("hello") {
  console.log("C'est vrai"); // s'exécute : string non vide = truthy
}
if ("0") {
  console.log("Aussi vrai"); // s'exécute : "0" est une string non vide
}
if (0) {
  console.log("Jamais"); // ne s'exécute pas : 0 est falsy
}
```

> `"0"` est truthy. `0` est falsy. Deux caractères de différence, comportement opposé. Bienvenue en JS.

---

## 6) POURQUOI C'EST CRUCIAL ?

- Éviter les bugs invisibles
- Comprendre les conditions
- Maîtriser les comparaisons
- Comprendre les APIs et formulaires

Si tu ne maîtrises pas la coercion, tu **subis** JavaScript.

---

## MISSION TYPE CHAOS

**Étape 1 : observe et comprends chaque résultat :**

```javascript
console.log("10" + 5); // "105" ← string, pas number
console.log("10" - 5); // 5
console.log(true + 1); // 2
console.log(false + 1); // 1
```

**Étape 2 : compare :**

```javascript
console.log(null == 0); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
```

**Étape 3 : crée une variable et teste la condition :**

```javascript
let input = "0";
if (input) {
  console.log("truthy");
} else {
  console.log("falsy");
}
```

Comprends pourquoi ça passe ou pas. `"0"` n'est pas `0`.

```javascript
// Ton code ici
```

> Ici tu ne dois pas juste voir le résultat. Tu dois comprendre la conversion. JS ne devine pas : il applique des règles. Et ces règles, tu dois les dominer.

---

## RÉSUMÉ

La coercition implicite (conversion automatique) : JS convertit les types selon des règles précises quand les opérandes ne correspondent pas. Ces règles ne sont pas aléatoires, elles sont spécifiées, mais elles surprennent si tu ne les connais pas.

`==` applique la coercition. `===` ne convertit rien : compare type ET valeur. En prod, `===` partout sauf cas exceptionnels.

Falsy values : `0`, `""`, `null`, `undefined`, `NaN`, `false`. Tout le reste est truthy : y compris `"0"`, `[]`, `{}`.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Type coercion : conversion implicite / explicite** se rattache à ce cas concret : Le formulaire Kintana reçoit des nombres, dates et chaînes venant d'appareils différents. Une chaîne vide, une date invalide ou un identifiant mal formé doit être rejeté avant la persistance.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Validation des entrées à la frontière API

> **Statut Kintana : prolongement produit différé, facultatif et sans gate supplémentaire.** Les trois leçons Types décrivent une seule évolution du même parseur ; ne construis pas trois parseurs et ne la réalise pas pendant la première passe. Fais d'abord la pratique locale de la leçon. Reprends l'intégration seulement après Data Basics, Function essentials, Type transformers, puis les modules [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md) et [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). Avant ces prérequis, tu peux simplement lire la mission et la laisser de côté.

> **Arc Konoha / Naruto :** une donnée qui arrive de l'extérieur est un rouleau inconnu. Tu ne la crois pas juste parce qu'elle a l'air propre.

**Mission liée à « Type coercion : conversion implicite / explicite » :** Écris un parseur de payload de création de demande Kintana. Il valide les champs, normalise les formats autorisés et retourne des erreurs identifiables sans convertir silencieusement une valeur douteuse.

**Livrable :** un parseur de frontière, un contrat d'entrée/sortie et des tests tabulaires couvrant formes valides, invalides et coercions piégeuses.

**Critères d’acceptation :** aucun payload brut n'entre dans le domaine ; les erreurs indiquent le champ sans révéler de secret ; les cas limites sont déterministes ; le parseur distingue valeur absente, vide et nulle.

**Transfert facultatif, à la reprise :** lorsque le parseur de base est compris et testé, ajoute une deuxième source (CSV ou client mobile) dont les formats diffèrent et compare les règles communes et spécifiques. Cette extension ne bloque pas la progression.
