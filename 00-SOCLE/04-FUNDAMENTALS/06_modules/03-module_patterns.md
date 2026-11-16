---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_inversee, defaut_cache]
anti_recipe_key: decision_inversee+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Encapsuler, exposer, protéger : les vrais patterns de modules

Temps de lecture ~9 min

Savoir écrire `import` et `export` c'est la syntaxe. Savoir quoi exposer et quoi cacher : c'est l'architecture.

Un module mal conçu expose trop. Les autres fichiers se mettent à dépendre de ses détails internes. Tu changes un truc interne, ça casse ailleurs. Tu ne sais plus pourquoi. C'est comme ça que les projets deviennent ingérables.

Ce fichier t'apprend à penser en termes d'interface publique et d'implémentation privée.

---

## 1) LE PATTERN MODULE CLASSIQUE : private par défaut

Tout ce qui n'est pas exporté est privé. C'est la règle de base. Exploite-la.

```js
// scoring.js

// privé : personne ne peut toucher ça directement
let _totalMatchs = 0;
const _historique = [];

const _validerScore = (score) => {
  if (typeof score !== "number" || score < 0) {
    throw new Error(`Score invalide : ${score}`);
  }
};

// public : l'interface que le monde voit
export const enregistrerScore = (score) => {
  _validerScore(score);
  _historique.push(score);
  _totalMatchs++;
};

export const getMoyenne = () =>
  _historique.length === 0
    ? 0
    : _historique.reduce((a, b) => a + b, 0) / _historique.length;

export const getStats = () => ({
  totalMatchs: _totalMatchs,
  moyenne: getMoyenne(),
  // on retourne une copie, pas la référence directe
  historique: [..._historique],
});
```

`_historique` ne peut jamais être muté depuis l'extérieur. Quelqu'un qui importe `scoring.js` peut appeler `enregistrerScore`, `getMoyenne`, `getStats`. Il ne peut pas faire `_historique.push(999)` directement. Parce que `_historique` n'est pas exporté. C'est tout.

---

## 2) FAÇADE PATTERN : simplifier une interface complexe

Parfois tu as plusieurs modules internes qui font des choses compliquées. Tu crées un module façade qui expose une interface simple et cache la complexité.

```js
// internal/chakraEngine.js
export const calculerChakra = (ninja) => ninja.base * ninja.multiplicateur;

// internal/jutsuResolver.js
export const resoudreJutsu = (jutsu, chakra) => jutsu.coutChakra <= chakra;

// internal/combatLogger.js
export const logCombat = (attaquant, cible, resultat) =>
  `[COMBAT] ${attaquant} vs ${cible} : ${resultat}`;
```

```js
// combat.js <-- la façade
import { calculerChakra } from "./internal/chakraEngine.js";
import { resoudreJutsu } from "./internal/jutsuResolver.js";
import { logCombat } from "./internal/combatLogger.js";

// l'API publique : une seule fonction claire
export const lancerAttaque = (attaquant, cible, jutsu) => {
  const chakra = calculerChakra(attaquant);
  const succes = resoudreJutsu(jutsu, chakra);
  const log = logCombat(attaquant.nom, cible.nom, succes ? "TOUCHÉ" : "RATÉ");
  console.log(log);
  return succes;
};
```

```js
// main.js
import { lancerAttaque } from "./combat.js";
// pas besoin de savoir que chakraEngine, jutsuResolver et combatLogger existent
```

Le shinobi de `combat.js` appelle `lancerAttaque`. Il ne sait pas et n'a pas besoin de savoir que trois modules internes sont impliqués. Si tu refactores l'un d'eux, `main.js` ne change pas.

---

## 3) SINGLETON MODULE : une instance partagée

_*Note: Un singleton, c'est une façon de s'assurer qu'il n'existe qu'un seul exemplaire d'un truc dans tout ton code, et que tout le monde utilise le même. (ex:partager une seule et même chose (connexion BDD, config, etc.) sans risquer d'en créer plusieurs par erreur.)*_

En ES6, un module est chargé une seule fois. Si deux fichiers importent le même module, ils obtiennent la même instance. Pas une copie : la même.

```js
// config.js
const _config = {
  apiUrl: "https://api.crazydevs.io",
  timeout: 5000,
  debug: false,
};

export const getConfig = () => ({ ..._config });

export const setDebug = (val) => {
  _config.debug = val;
};
```

```js
// moduleA.js
import { setDebug } from "./config.js";
setDebug(true);
```

```js
// moduleB.js
import { getConfig } from "./config.js";
console.log(getConfig().debug); // true
// moduleA et moduleB partagent le même _config
```

C'est le singleton gratuit en JS. Pas de pattern compliqué, pas de classe. Juste le système de modules qui fait son boulot.

Danger : si `_config` est un objet et que tu le retournes directement (sans spread), quelqu'un peut le muter depuis l'extérieur. Le `{ ..._config }` dans `getConfig` protège contre ça.

---

## 4) PLUGIN PATTERN : un module qui s'enregistre lui-même

Pour les systèmes extensibles. Un module "core" (le coeur) expose une méthode `register`. Les plugins (des fonctionnalités) s'enregistrent eux-mêmes.

```js
// core/jutsuRegistry.js
const _registry = new Map(); // ← ça, c'est l'unique instance (singleton)

export const register = (nom, fn) => {
  if (_registry.has(nom)) throw new Error(`Jutsu "${nom}" déjà enregistré`);
  _registry.set(nom, fn);
};

export const executer = (nom, ...args) => {
  if (!_registry.has(nom)) throw new Error(`Jutsu "${nom}" inconnu`);
  return _registry.get(nom)(...args);
};

export const lister = () => [..._registry.keys()];
```

```js
// plugins/rasengan.js
import { register } from "../core/jutsuRegistry.js";

register("rasengan", (puissance) => ({
  nom: "Rasengan",
  degats: puissance * 150,
  element: "vent",
}));
```

```js
// main.js
import "../plugins/rasengan.js"; // juste importer suffit : le plugin s'enregistre
import { executer, lister } from "./core/jutsuRegistry.js";

console.log(lister()); // ["rasengan"]
console.log(executer("rasengan", 3));
```

L'import de `rasengan.js` déclenche son exécution, qui appelle `register`. Le core ne sait pas à l'avance quels plugins existent. Tu peux en ajouter sans toucher au core.

---

## 5) LE PIÈGE DU MODULE QUI EXPOSE TROP

Mauvais pattern :

```js
// player.js : expose trop
export let score = 0;
export let vie = 100;
export const nom = "Naruto";

// n'importe qui peut faire :
// import { score } de "./player.js"
// score = 9999  <- ERREUR en strict mode pour les live bindings (le lien en direct entre ton import et la variable originale dans le module)
// mais une valeur mutable exposée crée une dépendance sur l'implémentation interne
```

Meilleur pattern :

```js
// player.js : interface contrôlée
let score = 0;
let vie = 100;
const nom = "Naruto";

export const getEtat = () => ({ score, vie, nom });
export const ajouterScore = (points) => {
  score += points;
};
export const prendreDegats = (degats) => {
  vie = Math.max(0, vie - degats);
};
```

L'état interne change : personne ne peut l'écraser directement. Tout passe par des fonctions. Ton module reste maître de son propre état.

---

## EXERCICES

## EXO 1 : le module de camp

Walking Dead. Tu construis `camp.js` : le module de gestion du camp de Rick.

State interne : liste de survivants, niveau de munitions, niveau de nourriture.

Interface publique :

- `ajouterSurvivant(nom)` : ajoute si pas déjà présent
- `consommerRessources(type, quantite)` : "munitions" ou "nourriture", ne descend pas sous 0
- `getStatsCamp()` : retourne une copie de l'état (pas la référence directe)
- `estEnDanger()` : retourne `true` si munitions < 10 OU nourriture < 5

Contrainte : les tableaux et valeurs internes ne sont jamais exposés directement.

---

## EXO 2 : la façade de Konoha

Trois modules internes :

- `ennemis.js` : génère des ennemis (nom, taille, puissance)
- `shinobis.js` : liste des shinobis disponibles (nom, rang, kunaï: boolean)
- `calcul.js` : `tauxSurvie(ennemi, shinobi)` retourne un pourcentage

Crée `konoha.js` : une façade qui expose une seule fonction :
`lancerMission(nomCible, nomShinobi)` qui retourne un rapport de mission complet.

`main.js` n'importe que `konoha.js`. Il ne sait pas que les trois modules internes existent.

---

## EXO 3 : le registre de plugins

Construit un système de calcul de stats de foot extensible.

`core/statsRegistry.js` : système de register / executer / lister (comme l'exemple ci-dessus)

Trois plugins à créer :

- `plugins/possession.js` : calcule la possession à partir des passes
- `plugins/xg.js` : calcule le xG à partir des tirs et leur position
- `plugins/rating.js` : calcule un rating joueur sur 10 à partir de ses stats brutes

`main.js` importe les trois plugins et les utilise via le registre. Si tu ajoutes un quatrième plugin plus tard, `main.js` ne change pas.

---

## CORRIGÉS DE RÉFÉRENCE : À CONSULTER APRÈS UNE TENTATIVE

Les exemples ci-dessous sont des implémentations de référence. Les données et formules des exercices 2 et 3 sont des **hypothèses pédagogiques explicites** : elles rendent le comportement déterministe et testable ; elles ne prétendent pas représenter un vrai calcul de survie ou un modèle professionnel de xG.

### Corrigé 1 : module de camp (`camp.js`)

Pour rendre le scénario reproductible, le corrigé choisit un état initial documenté : aucun survivant, 20 munitions et 10 unités de nourriture. `consommerRessources` retourne `true` si la consommation a été effectuée, `false` si les ressources sont insuffisantes. Une quantité nulle, négative ou non entière est rejetée.

```js
// camp.js
const survivants = [];
let munitions = 20;
let nourriture = 10;

export function ajouterSurvivant(nom) {
  if (typeof nom !== "string" || nom.trim() === "") {
    throw new TypeError("Le nom du survivant doit être une chaîne non vide.");
  }
  const nomNormalise = nom.trim();
  if (
    survivants.some(
      (item) =>
        item.toLocaleLowerCase("fr") === nomNormalise.toLocaleLowerCase("fr"),
    )
  ) {
    return false;
  }
  survivants.push(nomNormalise);
  return true;
}

export function consommerRessources(type, quantite) {
  if (!Number.isSafeInteger(quantite) || quantite <= 0) {
    throw new RangeError("La quantité doit être un entier positif sûr.");
  }
  if (type !== "munitions" && type !== "nourriture") {
    throw new TypeError('Le type doit être "munitions" ou "nourriture".');
  }
  const disponible = type === "munitions" ? munitions : nourriture;
  if (quantite > disponible) return false;
  if (type === "munitions") munitions -= quantite;
  else nourriture -= quantite;
  return true;
}

export function getStatsCamp() {
  return {
    survivants: [...survivants],
    munitions,
    nourriture,
  };
}

export function estEnDanger() {
  return munitions < 10 || nourriture < 5;
}
```

Le tableau de survivants retourné est une copie. Modifier `getStatsCamp().survivants` ne modifie donc pas l'état privé du module. Les valeurs numériques sont primitives et sont copiées par valeur.

### Corrigé 2 : façade de Konoha

Le scénario fixe trois shinobis et deux cibles synthétiques. La formule de survie est volontairement simple : `70 + bonus de rang + bonus kunaï - 5 × puissance ennemie - 2 × taille ennemie`, bornée entre 0 et 100. C'est un mécanisme d'exercice, **pas** une estimation réaliste de survie.

```js
// internal/ennemis.js
const ennemis = [
  { nom: "Zabuza", taille: 2, puissance: 8 },
  { nom: "Bandit", taille: 1, puissance: 3 },
];

export function genererEnnemi(nom) {
  const ennemi = ennemis.find((item) => item.nom === nom);
  return ennemi ? { ...ennemi } : null;
}
```

```js
// internal/shinobis.js
const shinobis = [
  { nom: "Naruto", rang: "Genin", kunai: true },
  { nom: "Sakura", rang: "Chunin", kunai: false },
  { nom: "Kakashi", rang: "Jonin", kunai: true },
];

export function trouverShinobi(nom) {
  const shinobi = shinobis.find((item) => item.nom === nom);
  return shinobi ? { ...shinobi } : null;
}
```

```js
// internal/calcul.js
const bonusRang = { Genin: 0, Chunin: 8, Jonin: 15 };

export function tauxSurvie(ennemi, shinobi) {
  if (!ennemi || !shinobi || !(shinobi.rang in bonusRang)) {
    throw new TypeError("Ennemi ou shinobi invalide.");
  }
  const taux =
    70 +
    bonusRang[shinobi.rang] +
    (shinobi.kunai ? 5 : 0) -
    5 * ennemi.puissance -
    2 * ennemi.taille;
  return Math.max(0, Math.min(100, taux));
}
```

```js
// konoha.js  : seule façade publique
import { genererEnnemi } from "./internal/ennemis.js";
import { trouverShinobi } from "./internal/shinobis.js";
import { tauxSurvie } from "./internal/calcul.js";

export function lancerMission(nomCible, nomShinobi) {
  const ennemi = genererEnnemi(nomCible);
  const shinobi = trouverShinobi(nomShinobi);
  if (!ennemi) throw new Error(`Cible inconnue : ${nomCible}`);
  if (!shinobi) throw new Error(`Shinobi inconnu : ${nomShinobi}`);

  const probabilitePedagogique = tauxSurvie(ennemi, shinobi);
  return {
    cible: ennemi.nom,
    shinobi: shinobi.nom,
    probabilitePedagogique,
    niveauRisque:
      probabilitePedagogique >= 70
        ? "faible"
        : probabilitePedagogique >= 40
          ? "modéré"
          : "élevé",
    recommandation:
      probabilitePedagogique >= 40
        ? "Mission envisageable selon le scénario."
        : "Renforcer l'équipe ou revoir la mission.",
  };
}
```

```js
// main.js
import { lancerMission } from "./konoha.js";

console.log(lancerMission("Bandit", "Kakashi"));
```

`main.js` dépend uniquement de la façade. Les modules internes peuvent être réorganisés sans modifier son import tant que le contrat public de `konoha.js` reste stable.

### Corrigé 3 : registre de plugins de statistiques

Les trois plugins utilisent un même contrat : une fonction reçoit un objet d'entrée et retourne un résultat. Les noms sont uniques ; les fonctions inconnues ou les doublons provoquent une erreur explicite. Le calcul xG ci-dessous est un **proxy géométrique simplifié**, non calibré sur des tirs réels.

```js
// core/statsRegistry.js
const plugins = new Map();

export function register(nom, calculer) {
  if (
    typeof nom !== "string" ||
    nom.trim() === "" ||
    typeof calculer !== "function"
  ) {
    throw new TypeError("Un nom non vide et une fonction sont requis.");
  }
  if (plugins.has(nom)) throw new Error(`Plugin déjà enregistré : ${nom}`);
  plugins.set(nom, calculer);
}

export function executer(nom, donnees) {
  const calculer = plugins.get(nom);
  if (!calculer) throw new Error(`Plugin inconnu : ${nom}`);
  return calculer(donnees);
}

export function lister() {
  return [...plugins.keys()];
}
```

```js
// plugins/possession.js
import { register } from "../core/statsRegistry.js";

function possession({ passesEquipe, passesAdversaire }) {
  for (const valeur of [passesEquipe, passesAdversaire]) {
    if (!Number.isSafeInteger(valeur) || valeur < 0) {
      throw new RangeError(
        "Les nombres de passes doivent être des entiers positifs ou nuls.",
      );
    }
  }
  const total = passesEquipe + passesAdversaire;
  if (total === 0)
    throw new RangeError("Impossible de calculer une possession sans passe.");
  return Number(((passesEquipe / total) * 100).toFixed(1));
}

register("possession", possession);
```

```js
// plugins/xg.js  : proxy pédagogique, pas modèle professionnel
import { register } from "../core/statsRegistry.js";

function xg({ tirs }) {
  if (!Array.isArray(tirs)) throw new TypeError("tirs doit être un tableau.");
  return Number(
    tirs
      .reduce((total, tir) => {
        const { x, y } = tir ?? {};
        if (
          ![x, y].every(Number.isFinite) ||
          x < 0 ||
          x > 100 ||
          y < 0 ||
          y > 100
        ) {
          throw new RangeError(
            "Chaque tir doit avoir x et y compris entre 0 et 100.",
          );
        }
        const distanceAuBut = Math.hypot(100 - x, 50 - y);
        const probabilite = Math.max(
          0,
          Math.min(0.95, 0.65 - distanceAuBut * 0.008),
        );
        return total + probabilite;
      }, 0)
      .toFixed(3),
  );
}

register("xg", xg);
```

```js
// plugins/rating.js  : barème d'exercice explicite, sur 10
import { register } from "../core/statsRegistry.js";

function rating({ buts, passesDecisives, taclesGagnes, pertesBalle }) {
  const valeurs = [buts, passesDecisives, taclesGagnes, pertesBalle];
  if (!valeurs.every((v) => Number.isFinite(v) && v >= 0)) {
    throw new RangeError(
      "Les statistiques doivent être des nombres positifs ou nuls.",
    );
  }
  const note =
    5 +
    buts * 0.8 +
    passesDecisives * 0.5 +
    taclesGagnes * 0.1 -
    pertesBalle * 0.15;
  return Number(Math.max(0, Math.min(10, note)).toFixed(2));
}

register("rating", rating);
```

```js
// main.js
import "./plugins/possession.js";
import "./plugins/xg.js";
import "./plugins/rating.js";
import { executer, lister } from "./core/statsRegistry.js";

console.log(lister());
console.log(
  executer("possession", { passesEquipe: 420, passesAdversaire: 380 }),
);
console.log(
  executer("xg", {
    tirs: [
      { x: 90, y: 50 },
      { x: 80, y: 45 },
    ],
  }),
);
console.log(
  executer("rating", {
    buts: 1,
    passesDecisives: 1,
    taclesGagnes: 4,
    pertesBalle: 2,
  }),
);
```

Le plugin xG est une fonction d'illustration des contrats, non un modèle de prédiction. Une utilisation sportive réelle demanderait des données de tirs, une définition des variables, un entraînement/calibrage et une validation hors échantillon. Le barème rating est tout aussi pédagogique : ne le présente pas comme une note officielle de joueur.

---

## RÉSUMÉ

Un module = une responsabilité. Une interface publique réduite. Un état interne protégé.

La façade simplifie ce qui est complexe. Le singleton module est gratuit en ES6. Le plugin pattern rend un système extensible sans le modifier.

Ce que tu n'exposes pas, tu ne le casses pas. Ce que tu exposes, tu t'engages à le maintenir. Réfléchis à ce que tu exportes avant de le faire.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Encapsuler, exposer, protéger : les vrais patterns de modules** se rattache à ce cas concret : Les règles de statut et d'éligibilité Kintana doivent donner le même résultat pour les mêmes entrées, quel que soit l'écran ou le canal qui les appelle.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle métier réutilisable dans Kintana

> **Statut Kintana : prolongement facultatif, sans gate supplémentaire.** Réutilise la même règle métier commencée dans les leçons Functions ; ne crée pas une deuxième implémentation. La pratique locale sur `import`/`export` reste la priorité de première passe. Les tests unitaires seront ajoutés après le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md).

> **Arc Capsule Corp. / DBZ :** une fonction est un petit moteur. Tu veux qu'elle fasse une chose clairement, pas qu'elle déclenche une transformation surprise.

**Mission liée à « Encapsuler, exposer, protéger : les vrais patterns de modules » :** Isole une règle Kintana liée à la leçon (normalisation, filtrage, calcul ou création de handler). Appelle-la depuis deux parcours distincts et vérifie que le résultat ne dépend ni du DOM ni de l'ordre d'appel caché.

**Livrable :** une fonction métier documentée, des tests unitaires de contrat et deux points d'appel qui réutilisent la même règle.

**Critères d’acceptation :** mêmes entrées et même état initial donnent le même résultat ; les effets sont injectés ou isolés ; les entrées invalides sont explicites ; le nom reflète le contrat.

**Transfert facultatif, à la reprise :** ajoute une règle métier qui nécessite une dépendance variable (date, taux ou service). Choisis entre paramètre, factory et composition, puis justifie après avoir étudié Function factory. Tu peux d'abord comparer les options sur papier ; aucune intégration ni gate supplémentaire n'est requise.
