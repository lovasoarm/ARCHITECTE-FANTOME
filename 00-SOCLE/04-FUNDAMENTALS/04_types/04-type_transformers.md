---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Type transformers

Temps de lecture ~7 min

_Transformer. Vérifier. Survivre._

JavaScript est **dynamique** : une variable peut changer de type quand elle veut.

Donc ton code peut penser avoir un nombre… et en réalité c'est une string déguisée.

Bienvenue dans le monde où `"100" + 20 = "10020"`.

Si tu ne contrôles pas les types, les types te trollent. On va régler ça.

---

## 1) STRING : FORCER LE MODE TEXTE

Pourquoi convertir en string ? Parce que le monde extérieur parle texte : HTML, API, stockage, logs.

```javascript
String(value);
value.toString();
```

Mais attention :

```javascript
String(null); // "null"   ← ok
String(undefined); // "undefined" ← ok
null.toString(); // BOOM erreur
undefined.toString(); // BOOM erreur
```

**Conclusion sauvage :** si tu n'es pas sûr de ce que tu as → utilise `String()`.

```javascript
let score = 99;
let display = String(score); // "99" : prêt à être affiché sans surprise
```

---

## 2) NUMBER : LÀ OÙ LES BUGS NAISSENT

Tu récupères un input :

```javascript
let price = "200";
price + 50; // "20050" → catastrophe silencieuse
Number(price) + 50; // 250  → correct
```

Les outils :

```javascript
Number("42"); // 42
Number("42px"); // NaN → trop strict, abandonne au moindre caractère bizarre
parseInt("42px"); // 42 → lit jusqu'à ce que ça sente mauvais
parseFloat("3.14px"); // 3.14
```

| Méthode      | Comportement                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `Number()`   | Convertit selon la syntaxe numérique JavaScript ; peut renvoyer `NaN`, mais `""`, `"   "` et `null` deviennent `0`. |
| `parseInt()` | Lit un entier depuis le début et s'arrête au premier caractère non accepté ; ce n'est pas une validation complète.  |

---

### NaN : le type qui ne s'aime pas lui-même

`NaN` = Not a Number = conversion foirée.

Et le pire :

```javascript
NaN === NaN; // false
```

Oui. Même `NaN` refuse d'être égal à lui-même. On le teste donc avec :

```javascript
isNaN("hello"); // true ← convertit d'abord, puis teste
Number.isNaN("hello"); // false ← teste strictement, sans conversion
Number.isNaN(NaN); // true ← le seul vrai positif
```

> `Number.isNaN()` est plus fiable : il retourne `true` **uniquement** si la valeur est réellement `NaN`, sans conversion implicite.

---

## 3) BOOLEAN : UN MOT SUR LA CONVERSION

```javascript
Boolean(value);
// ou
!!value;
```

Pourquoi `!!` marche ? `!value` inverse, `!!value` remet droit. Résultat = boolean pur.

> Les valeurs falsy et truthy sont expliquées en détail dans `03-type_coercion.md` -> mémorise-les si ce n'est pas fait, tout ce qui suit en dépend.

---

## 4) `typeof` : LE DÉTECTIVE PAS PARFAIT

```javascript
typeof 10; // "number"
typeof "yo"; // "string"
typeof true; // "boolean"
```

Mais :

```javascript
typeof null; // "object"
```

Bug vieux de 1995. On vit avec. On ne comprend plus vraiment pourquoi. On continue.

```javascript
typeof []; // "object" : pas très utile
typeof NaN; // "number" : scandaleux
```

Pour les tableaux, utilise toujours :

```javascript
Array.isArray([]); // true
```

Et pour un nombre vraiment valide :

```javascript
function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
```

`Number.isFinite()` accepte uniquement un nombre fini : il rejette `NaN`, `Infinity` et `-Infinity`. C'est plus strict que `!Number.isNaN()`, qui accepte encore les deux infinis.

---

## 5) CONVERTIR ET VALIDER SANS MASQUER UNE ABSENCE

`Number()` convertit ; il ne décide pas si l'entrée est acceptable pour ton métier. Par exemple, `Number("")`, `Number("   ")` et `Number(null)` valent `0`. Une chaîne vide ne doit donc pas devenir automatiquement un vrai zéro.

```javascript
function parseFiniteNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();
  if (cleaned === "") {
    return null;
  }

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

parseFiniteNumber("50"); // 50
parseFiniteNumber(" 50 "); // 50
parseFiniteNumber("hello"); // null
parseFiniteNumber(""); // null
parseFiniteNumber(null); // null
parseFiniteNumber("Infinity"); // null
```

Ici, `null` signifie « aucune valeur numérique acceptable ». Ce n'est pas la même chose que `0`. Ce helper suit la syntaxe numérique acceptée par `Number()` : par exemple, une chaîne comme `"1e3"` ou `"0x10"` est aussi convertible. Si ton domaine n'accepte que la notation décimale habituelle, vérifie ce format avant la conversion. Dans une vraie règle métier, ajoute ensuite les contraintes propres au domaine : minimum, maximum, unité, devise ou précision.

---

## 6) CAS RÉEL : FORMULAIRE DU MONDE SAUVAGE

```javascript
const ageInput = "18years";
parseInt(ageInput); // 18 : lit le préfixe numérique
Number(ageInput); // NaN : refuse la chaîne entière
```

`parseInt("18years") === 18` ne prouve pas que l'entrée est valide. `parseInt()` s'arrête au premier caractère qu'il ne sait pas interpréter. Pour un champ où toute la chaîne doit représenter un nombre, valide la chaîne entière avec une stratégie explicite, par exemple `parseFiniteNumber()` ci-dessus.

Utilise `parseInt()` seulement lorsque ton format autorise réellement de lire un entier au début d'une chaîne (par exemple extraire une partie numérique d'un format déjà vérifié). Ne l'utilise pas comme validateur général d'une saisie utilisateur.

---

## EXERCICES

## EXO 1 : Le Faux Prix

```javascript
let price = "199";
```

Corrige le bug pour que `price + 1` donne `200`.

---

## EXO 2 : Nettoyeur d'une valeur en `px`

```javascript
const size = "300px";
```

Écris une fonction qui accepte uniquement une chaîne terminée par `px`, retire ce suffixe, convertit toute la partie numérique et vérifie que le résultat est fini. Retourne `300` pour `"300px"` et `-1` pour `"abc"`, `"300pxx"`, `""` ou `"Infinitypx"`. `parseInt()` seul ne suffit pas : il pourrait accepter un préfixe et ignorer le reste.

Ce petit exercice valide un format d'entrée simplifié ; il ne remplace pas un parseur CSS complet. Rappelle-toi que `Number()` accepte aussi certaines syntaxes comme l'exponentielle et l'hexadécimale. Si la règle métier attend uniquement des chiffres décimaux, il faut contrôler ce format avant la conversion.

---

## EXO 3 : Mindfuck Boolean

Explique pourquoi chacun de ces résultats est ce qu'il est :

```javascript
Boolean("false"); // ?
Boolean(" "); // ?
Boolean([]); // ?
Boolean(0); // ?
```

---

## EXO 4 : Inspecteur Ultime

Crée une fonction `inspect(value)` qui retourne un objet avec exactement ces quatre propriétés :

- `type` : la chaîne correspondant au type JavaScript ; distingue explicitement `null` et `array` (car `typeof null` et `typeof []` renvoient tous deux `"object"`). Utilise `"null"`, `"array"`, `"string"`, `"number"`, `"boolean"`, `"object"`, `"undefined"`, `"function"`, `"bigint"` ou `"symbol"` selon le cas ;
- `estArray` : résultat booléen de `Array.isArray(value)` ;
- `estNumberValide` : vrai uniquement si `typeof value === "number"` et `Number.isFinite(value)` ;
- `estFalsy` : vrai exactement lorsque `Boolean(value)` vaut `false`.

Teste avec :

```javascript
inspect(0);
inspect("0");
inspect([]);
inspect(null);
inspect(NaN);
```

---

## EXO 5 : Currency Boss

Crée une fonction `parseCurrency(value)` qui :

- accepte `"100$"` et `" 250 "` ;
- refuse `"abc"`, `"100$abc"`, `""`, `null` et `"Infinity$"` ;
- vérifie que la chaîne entière représente une valeur numérique finie ;
- retourne un nombre valide, sinon `null`.

Ne te contente pas de `parseInt()` : il pourrait accepter le début d'une chaîne invalide. Précise aussi que la fonction ne vérifie pas encore les règles métier d'une devise (montant positif, nombre de décimales, devise autorisée).

---

## RÉSUMÉ FINAL

- Transformer **avant** d'utiliser
- Vérifier **avant** de faire confiance
- Utiliser `===`
- Tester `NaN` avec `Number.isNaN()`
- Ne jamais croire un input à l'aveugle

Les types sont neutres. C'est la méconnaissance des règles qui crée les bugs : et maintenant tu les connais.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Type transformers** se rattache à ce cas concret : Le formulaire Kintana reçoit des nombres, dates et chaînes venant d'appareils différents. Une chaîne vide, une date invalide ou un identifiant mal formé doit être rejeté avant la persistance.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Validation des entrées à la frontière API

> **Statut Kintana : prolongement produit différé, facultatif et sans gate supplémentaire.** Les trois leçons Types décrivent une seule évolution du même parseur ; ne construis pas trois parseurs et ne la réalise pas pendant la première passe. Fais d'abord la pratique locale de la leçon. Reprends l'intégration seulement après Data Basics, Function essentials, Type transformers, puis les modules [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md) et [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). Avant ces prérequis, tu peux simplement lire la mission et la laisser de côté.

> **Arc Konoha / Naruto :** une donnée qui arrive de l'extérieur est un rouleau inconnu. Tu ne la crois pas juste parce qu'elle a l'air propre.

**Mission liée à « Type transformers » :** Écris un parseur de payload de création de demande Kintana. Il valide les champs, normalise les formats autorisés et retourne des erreurs identifiables sans convertir silencieusement une valeur douteuse.

**Livrable :** un parseur de frontière, un contrat d'entrée/sortie et des tests tabulaires couvrant formes valides, invalides et coercions piégeuses.

**Critères d’acceptation :** aucun payload brut n'entre dans le domaine ; les erreurs indiquent le champ sans révéler de secret ; les cas limites sont déterministes ; le parseur distingue valeur absente, vide et nulle.

**Transfert facultatif, à la reprise :** lorsque le parseur de base est compris et testé, ajoute une deuxième source (CSV ou client mobile) dont les formats diffèrent et compare les règles communes et spécifiques. Cette extension ne bloque pas la progression.
