---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# This : un avant-goût avant le vrai cours

Temps de lecture ~5 min

> `this` est l'un des mots-clés les plus piégeux de JS. Il change de valeur selon comment et où tu appelles la fonction. Pas selon où elle est écrite : selon comment elle est appelée.

Ce fichier est intentionnellement court. Pourquoi ? Parce que `this` est inséparable du système de prototype et des classes ES6 : tout ça est traité en profondeur dans `../../../02-CONSTRUCTION/17-OOP-JS/05-this_keyword_rules.md`, au moment où tu auras tous les outils pour vraiment comprendre.

Ici : juste les deux réflexes de survie pour la suite du curriculum.

---

## 1) LA RÈGLE DE BASE À RETENIR

`this` = l'objet qui a **appelé** la fonction. Pas celui où elle est écrite.

```js
const ninja = {
  name: "Naruto",
  cri() {
    console.log(this.name); // this = ninja, parce que ninja.cri()
  },
};

ninja.cri(); // "Naruto"

const fn = ninja.cri;
fn(); // undefined : plus personne n'appelle via ninja, this est perdu
```

---

## 2) LE SEUL PIÈGE QUE TU VAS CROISER MAINTENANT

Une arrow function ne crée pas son propre `this`. Elle hérite du contexte où elle est **écrite**.

```js
const timer = {
  name: "Bombe",
  start() {
    setTimeout(function () {
      console.log(this.name); // undefined : this perdu dans le callback classique
    }, 100);

    setTimeout(() => {
      console.log(this.name); // "Bombe" : arrow hérite du this de start()
    }, 100);
  },
};

timer.start();
```

Règle : dans un callback passé à `setTimeout`, `addEventListener`, `map`, etc. : utilise une arrow function si tu as besoin de garder le `this` de l'appelant.

---

> Pour la suite complète : `bind`, `call`, `apply`, le fonctionnement interne du `this` dans les classes, les pièges avec le prototype : tout ça est dans **`../../../02-CONSTRUCTION/17-OOP-JS/05-this_keyword_rules.md`**. Tu reviendras ici après ce module et tout fera sens.

---

## RÉSUMÉ

`this` ne dépend pas de l'endroit où la fonction est définie. Il dépend de l'endroit où elle est appelée. C'est la règle numéro un.

Dans un callback standard (pas arrow), `this` change selon l'appelant. Dans une arrow function, `this` est capturé à la création : il garde le `this` de la fonction englobante.

Ce fichier couvre l'essentiel pour démarrer. Le comportement complet de `this` avec `bind`, `call`, `apply`, les classes et le prototype est dans `02-CONSTRUCTION/17-OOP-JS`.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-DIAGRAM:scope -->

## Repère visuel utile : Contexte sûr des handlers Kintana

```text
création de la fonction
      | capture l'environnement lexical
      v
closure(handler) -----> requestId / role
      |
      v
dispatcher appelle plus tard
      |
      +--> paramètres explicites
      +--> closure conservée
      +--> `this` dépend du call-site
```

<!-- AF-LESSON-PROFILE: scope -->

## Repères de décision

- **Pourquoi :** La portée et les closures contrôlent quelles données une fonction peut lire et combien de temps elles restent accessibles. Cela évite les états cachés et les callbacks qui perdent leur contexte.
- **Quand l’utiliser / quand l’éviter :** Utilise une fermeture pour encapsuler un état privé ou garder un contexte stable dans un callback. Préfère un paramètre explicite quand la dépendance doit être visible ou remplacée en test.
- **Limites :** Une closure peut prolonger la durée de vie d'objets et créer une fuite mémoire. `this` dépend du mode d'appel pour les fonctions classiques ; une flèche capture le `this` lexical et ne peut pas être rebondie avec `call`/`bind`.

## Mécanisme : la version sans magie

Une fonction lit les bindings de son environnement lexical. Pour `this`, regarde le call-site ; pour une closure, regarde l'endroit où la fonction est créée et les valeurs qu'elle retient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **This : un avant-goût avant le vrai cours** se rattache à ce cas concret : Un handler Kintana doit garder l'identité de la demande et le rôle attendu sans lire un global modifiable ni perdre le contexte quand il est passé à une file de callbacks.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contexte sûr des handlers Kintana

> **Statut Kintana : prolongement intégré différé, facultatif et sans gate supplémentaire.** Les blocs Kintana de Scope réutilisent le même handler de notification : il s'agit d'un seul artefact à faire évoluer, pas d'un exercice complet à recommencer dans chaque leçon. Termine d'abord la pratique locale de la leçon et les étapes canoniques Scope puis Function factories. Reprends le test de passage de callback après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md) ; le déplacement vers un worker n'est qu'une variante ultérieure, après le module Runtime concerné. Aucun worker, module supplémentaire ou test automatisé n'est requis pour valider la première passe Scope.

> **Arc Naruto / Konoha :** chaque équipe connaît son périmètre. Une variable globale qui circule partout, c'est le rouleau secret posé au milieu de la place.

**Mission liée à « This : un avant-goût avant le vrai cours » :** Construis un handler de notification qui conserve `requestId` et le rôle autorisé. Compare une closure, un paramètre explicite et `bind` selon le besoin. Ajoute un test qui passe le handler à un dispatcher sans changer le résultat ni exposer d'état global.

**Livrable :** un handler isolé, un test de passage de callback, un test de contexte `this` si la leçon le traite et une courte décision sur la portée choisie.

**Critères d’acceptation :** le handler garde le bon identifiant ; le comportement ne dépend pas d'un appel accidentel à travers un objet ; l'état privé n'est pas accessible de l'extérieur ; la durée de vie des références est expliquée.

**Transfert facultatif, à la reprise :** lorsque tu étudieras les modules puis le runtime des workers, compare le contexte disponible dans un module et dans un worker. Pour la première passe, explique simplement avec tes mots pourquoi un worker ne partage pas automatiquement le même contexte JavaScript.
