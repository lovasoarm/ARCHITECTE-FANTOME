---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, decision_inversee]
anti_recipe_key: defaut_cache+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Import / export : arrête de tout mettre dans un seul fichier

Temps de lecture ~8 min

Avant les modules ES6, le code JS vivait dans un seul espace global. Tout le monde pouvait écraser la variable de tout le monde. C'était le far west : un `var players = []` dans un fichier, un autre `var players = []` dans un autre, et boom : collision silencieuse, bug introuvable.

Les modules ES6 règlent ça : chaque fichier a son propre scope. Ce que tu n'exportes pas n'existe pas pour le monde extérieur. Ce que tu importes, tu choisis exactement ce dont tu as besoin.

---

## 1) EXPORT NOMMÉ : tu choisis ce qui sort

```js
// jutsu.js
export const rasengan = (puissance) => puissance * 9000;
export const kagebunshin = (nombre) => Array(nombre).fill("clone"); //kagebunshin(5) -> ["clone", "clone", "clone", "clone", "clone"]

// interne au fichier -> pas exporté, donc invisible depuis l'extérieur
const chakraNaruto = 9999;
```

```js
// main.js
import { rasengan, kagebunshin } from "./jutsu.js";

console.log(rasengan(2)); // 18000
console.log(kagebunshin(3)); // ["clone", "clone", "clone"]
```

Règle : ce que tu n'exportes pas reste privé. `chakraNaruto` n'est accessible nulle part ailleurs. C'est le principe d'encapsulation sans avoir besoin de classes ni de patterns compliqués.

---

## 2) EXPORT DEFAULT : le truc principal du fichier

Chaque fichier peut avoir exactement un `export default`. C'est l'export "signature" du module. Tu PEUX PAS avoir deux export default

```js
// ninja.js
const creerNinja = (nom, village) => ({
  nom,
  village,
  chakra: 100,
  attaquer: (cible) => `${nom} attaque ${cible} !`,
});

export default creerNinja;
```

```js
// main.js
import creerNinja from "./ninja.js";
// pas d'accolades -> c'est le default

const naruto = creerNinja("Naruto", "Konoha");
console.log(naruto.attaquer("Pain")); // "Naruto attaque Pain !"
```

La différence avec les exports nommés : à l'import, tu peux appeler ça comme tu veux.

```js
import buildNinja from "./ninja.js"; // même fichier, nom différent -> valide
import n from "./ninja.js"; // aussi valide
```

---

## 3) COMBINER DEFAULT ET NOMMÉS

Un fichier peut avoir les deux. C'est courant dans les bibliothèques.

```js
// ninjascan.js
export const NINJA_TYPES = ["Colossal", "Cuirassé", "Féminin", "Bestial"];

export const estDangereux = (ennemi) => ennemi.taille > 15;

const analyserNinja = (ennemi) => ({
  type: ennemi.type,
  menace: estDangereux(ennemi) ? "CRITIQUE" : "CONTROLÉE",
  taille: ennemi.taille,
});

export default analyserNinja;
```

```js
// main.js
import analyserNinja, { NINJA_TYPES, estDangereux } from "./ninjascan.js";
// ^-- default      ^-- nommés dans les accolades
```

---

## 4) NAMESPACE IMPORT : tout d'un coup

Si tu veux importer tout ce qu'un module exporte sous un seul nom :

```js
// main.js
import * as Jutsu from "./jutsu.js";

Jutsu.rasengan(3); // fonctionne
Jutsu.kagebunshin(5); // fonctionne
```

Utile quand un module exporte beaucoup de fonctions liées et que tu veux garder le contexte visible (`Jutsu.rasengan` plutôt que juste `rasengan`).

Attention : ça importe tout. Si le module est gros, tu charges ce dont tu n'as pas besoin.

---

## 5) RE-EXPORT : le module intermédiaire

Parfois tu veux créer un point d'entrée unique pour plusieurs sous-modules.

```js
// jutsu/index.js
export { rasengan } from "./rasengan.js";
export { kagebunshin } from "./kagebunshin.js";
export { default as chidori } from "./chidori.js";
```

```js
// main.js
import { rasengan, kagebunshin, chidori } from "./jutsu/index.js";
// une seule ligne au lieu de trois imports séparés
```

C'est le pattern barrel file. Courant dans les projets React, les bibliothèques TypeScript, partout.

---

## 6) LE PIÈGE : imports circulaires

```js
// a.js
import { quelqueChose } from "./b.js";
export const valeurA = "A";

// b.js
import { valeurA } from "./a.js"; // b importe a qui importe b...
export const quelqueChose = valeurA + "B";
```

JS ne plante pas immédiatement. Il résout les cycles en initialisant les modules dans un certain ordre, mais `valeurA` peut valoir `undefined` au moment où `b.js` l'utilise.

Le bug : ton code tourne, mais une valeur est `undefined` sans raison apparente. Cherche d'abord les imports circulaires.

---

## 7) DYNAMIC IMPORT : charger à la demande

Les imports statiques (`import ... from`) sont analysés au démarrage. Le dynamic import charge un module au runtime, seulement quand c'est nécessaire (ex: Charger un truc seulement sur un clic shinobi). Alléger le chargement initial de ta page

```js
const chargerModule = async (mode) => {
  if (mode === "combat") {
    const { rasengan } = await import("./jutsu.js");
    return rasengan;
  }
  // jutsu.js n'est pas chargé si mode !== "combat"
};
```

Utilité réelle : code splitting dans les apps web. Tu charges le code de la page "dashboard" seulement quand le shinobi navigue vers /dashboard. Pas avant.

---

## EXERCICES

## EXO 1 : le village de Konoha

Tu as trois fichiers à créer :

- `ninjas.js` : exporte une liste de ninjas (objets avec nom, rang, clan)
- `filtres.js` : exporte deux fonctions : une pour filtrer par rang, une pour filtrer par clan
- `main.js` : importe tout, affiche les Jonin du clan Uchiha

Contrainte : `main.js` ne contient aucune logique de filtrage. Tout ça vit dans `filtres.js`.

---

## EXO 2 : la façade de la mission d'infiltration

Le village a des modules éparpillés :

- `formation.js` : exporte `formationDiamant`, `formationV`
- `equipement.js` : exporte `kunai`, `parcheminsScellés`
- `strategie.js` : exporte `default` `plannerAttaque`

Crée un `missionCorps/index.js` qui re-exporte tout. `main.js` n'importe qu'à partir de cet index.

---

## EXO 3 : le chargement conditionnel

Une app de scoring de matchs. Elle peut charger deux moteurs de calcul :

- `moteurSimple.js` : stats de base (possession, tirs)
- `moteurAvancé.js` : xG, heat maps, Expected Threat

`main.js` charge le moteur avancé seulement si le shinobi a un abonnement premium. Utilise un dynamic import. Si le module échoue à charger, affiche un message d'erreur propre.

(Indice : `import()` retourne une Promise -> gère le `.catch`)

---

## RÉSUMÉ

Les modules ES6 ne sont pas une feature de confort. C'est la frontière entre ton code et le chaos global.

Export nommé : tu choisis ce qui est public. Export default : la signature du fichier. Namespace import : contexte visible. Re-export : un point d'entrée propre. Dynamic import : chargement à la demande pour des apps rapides.

Ce que tu n'exportes pas n'existe pas pour les autres. C'est la règle la plus importante du fichier.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

<!-- AF-DIAGRAM:functions -->

## Repère visuel utile : Règle métier réutilisable dans Kintana

```text
UI web ----+
           |
UI mobile -+--> fonction métier pure --> résultat
           |                                  |
API -------+                                  v
                                       adaptateur effet
                                       (DB / HTTP / horloge)
```

<!-- AF-LESSON-PROFILE: functions -->

## Repères de décision

- **Pourquoi :** Des fonctions avec un contrat clair rendent les règles testables et réutilisables sans coupler le domaine à l'interface, au réseau ou au stockage.
- **Quand l’utiliser / quand l’éviter :** Isole une transformation ou une décision métier dans une fonction. Utilise composition ou application partielle quand plusieurs étapes sont réellement réutilisées ; évite d'empiler des abstractions pour une seule ligne.
- **Limites :** Une fonction pure ne supprime pas les problèmes de concurrence, d'entrée invalide ou d'effet externe. Une pipeline trop découpée peut devenir plus difficile à suivre qu'un bloc simple.

## Mécanisme : la version sans magie

Définis les entrées, la sortie et les effets. Garde la décision pure autant que possible et place réseau, temps et persistance derrière des adaptateurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Import / export : arrête de tout mettre dans un seul fichier** se rattache à ce cas concret : Les règles de statut et d'éligibilité Kintana doivent donner le même résultat pour les mêmes entrées, quel que soit l'écran ou le canal qui les appelle.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle métier réutilisable dans Kintana

> **Statut Kintana : prolongement facultatif, sans gate supplémentaire.** Réutilise la même règle métier commencée dans les leçons Functions ; ne crée pas une deuxième implémentation. La pratique locale sur `import`/`export` reste la priorité de première passe. Les tests unitaires seront ajoutés après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md).

> **Arc Capsule Corp. / DBZ :** une fonction est un petit moteur. Tu veux qu'elle fasse une chose clairement, pas qu'elle déclenche une transformation surprise.

**Mission liée à « Import / export : arrête de tout mettre dans un seul fichier » :** Isole une règle Kintana liée à la leçon (normalisation, filtrage, calcul ou création de handler). Appelle-la depuis deux parcours distincts et vérifie que le résultat ne dépend ni du DOM ni de l'ordre d'appel caché.

**Livrable :** une fonction métier documentée, des tests unitaires de contrat et deux points d'appel qui réutilisent la même règle.

**Critères d’acceptation :** mêmes entrées et même état initial donnent le même résultat ; les effets sont injectés ou isolés ; les entrées invalides sont explicites ; le nom reflète le contrat.

**Transfert facultatif, à la reprise :** ajoute une règle métier qui nécessite une dépendance variable (date, taux ou service). Choisis entre paramètre, factory et composition, puis justifie après avoir étudié Function factory. Tu peux d'abord comparer les options sur papier ; aucune intégration ni gate supplémentaire n'est requise.
