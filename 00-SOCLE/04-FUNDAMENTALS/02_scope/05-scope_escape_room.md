---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Scope escape room : la porte est fermée. le code est la clé.

Temps de lecture ~7 min

> Ici tu ne codes pas juste. Tu réfléchis.
> Qui garde quoi ? Quelle variable vit où ? Laquelle disparaît... ou fait semblant ?

---

## 1) NIVEAU 1 : LE COFFRE SECRET

<!-- AF-DIAGRAM:secrets -->

```text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

### Instructions

1. Crée une fonction `createVault(secret)`
2. Stocke `secret` dans une variable locale
3. Retourne une fonction `guess(password)` qui compare `password` avec `secret`
4. Affiche `"Access granted"` ou `"Access denied"`
5. Crée deux coffres avec deux secrets différents et teste-les

### Code de départ

```js
// Résultat attendu :
const vault1 = createVault("dragon");
const vault2 = createVault("unicorn");

vault1("dragon"); // Access granted
vault1("unicorn"); // Access denied
vault2("unicorn"); // Access granted
vault2("dragon"); // Access denied
```

> **Question :** Pourquoi chaque coffre garde son propre secret après la mort de `createVault` ?
>
> `createVault` est morte, but `secret` survit dans la closure --> comme un fantôme utile. Chaque appel crée son propre environnement lexical. La fonction retournée conserve l'accès aux liaisons de cet environnement ; le dessin en « boîte mémoire » est une analogie, pas une adresse physique.

---

## 2) NIVEAU 2 : LE PIÈGE DU COMPTEUR

### Instructions

1. Crée `createLimitedCounter(limit)` avec `count = 0` à l'intérieur
2. Retourne une fonction qui incrémente `count`
3. Si `count > limit` --> affiche `"Limit reached"`, sinon affiche la valeur
4. Crée deux compteurs avec deux limites différentes
5. Observe qu'ils ne se contaminent pas

### Résultat attendu

```js
const counter1 = createLimitedCounter(2);
const counter2 = createLimitedCounter(4);

counter1(); // 1
counter1(); // 2
counter1(); // Limit reached
counter2(); // 1 <-- pas de contamination
counter2(); // 2
```

> **Question :** Pourquoi `counter1` et `counter2` ont chacun leur propre `count` ?
>
> Chaque appel à `createLimitedCounter` crée un nouvel environnement en mémoire. Deux appels = deux boîtes séparées. Elles ne se voient pas.

---

## 3) NIVEAU 3 : LA BOUCLE MAUDITE

Lis ce code. **Ne le lance pas encore. Réfléchis d'abord.**

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("Door number:", i);
  }, 100);
}
```

> **Question :** Qu'est-ce qui s'affiche et pourquoi ?
>
> `var` n'est pas block-scoped. Toutes les fonctions partagent la **même** variable `i`. La boucle finit avant que les `setTimeout` s'exécutent --> `i` vaut déjà `4`. Toutes les portes s'ouvrent sur la même pièce vide.

**Résultat :**

```text
Door number: 4
Door number: 4
Door number: 4
```

**Maintenant corrige avec `let` :**

```js
for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log("Door number:", i);
  }, 100);
}
```

> `let` crée une liaison lexicale distincte pour chaque itération de cette boucle. Chaque callback peut lire la liaison de son itération ; ce n'est pas une copie générale des objets référencés.

**Résultat :**

```text
Door number: 1
Door number: 2
Door number: 3
```

---

## 4) MISSION FINALE : EXPLIQUE SANS REGARDER TES NOTES

Réponds à ces quatre questions avec tes propres mots. Si tu bloques sur une, relis le module avant de continuer.

1. C'est quoi une **closure** ?
2. C'est quoi le **function scope** ?
3. C'est quoi le **block scope** ?
4. Pourquoi `var` pose problème dans les boucles **async** ?

### Réponses minimales attendues

**Closure** : une fonction associée à l'environnement lexical dans lequel elle a été créée. Elle peut continuer à lire ou modifier les liaisons capturées après le retour de la fonction externe. Ce modèle ne signifie pas qu'une adresse mémoire brute est exposée ni que toutes les variables sont copiées.

**Function scope** : Une variable déclarée avec `var` vit dans toute la fonction. Pas dans le bloc, pas dans le `if`, pas dans la boucle --> toute la fonction. Elle n'est pas accessible en dehors.

**Block scope** : Une variable déclarée avec `let` ou `const` vit uniquement dans le bloc `{}` où elle est créée. Elle meurt à la fermeture du bloc.

**`var` en async** : `var` a une portée fonction : toutes les itérations partagent la même variable. Quand le code async s'exécute plus tard, la boucle est déjà finie et la variable a sa valeur finale. Résultat : toutes les callbacks lisent la même valeur. Avec `let`, chaque itération a sa propre variable --> chaque callback lit la bonne.

---

> Ne passe pas au module suivant si tu ne peux pas reformuler ces quatre réponses sans regarder. Le scope c'est la fondation. Rater ça, c'est construire une maison sur du sable... qui est aussi en feu.

---

## RÉSUMÉ

Le scope d'une variable définit sa zone de vie. `let` et `const` : portée bloc. `var` : portée fonction, ce qui casse les boucles async et les closures imbriquées.

Une closure est une fonction qui garde une référence vivante à ses variables parentes : pas une copie. Deux closures créées par deux appels séparés ont des environnements mémoire séparés.

`var` dans une boucle async partage une seule variable entre toutes les itérations. `let` crée une variable distincte par itération. C'est la différence entre un bug subtil et du code prévisible.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Scope escape room : la porte est fermée. le code est la clé.** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « Scope escape room : la porte est fermée. le code est la clé. » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

**Transfert facultatif, à la reprise :** lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
