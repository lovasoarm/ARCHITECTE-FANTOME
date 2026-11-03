---
perishability_id: PER-0016

stability: perissable
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Shallow vs deep : copier la surface ou copier le fond ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : Prison Break :** le tunnel fuit lentement. Personne ne voit la panne au premier tour. Puis la cellule se remplit. Une fuite mémoire est souvent exactement aussi discrète.

> **CrazyDevs : jauge de chakra :** si tu optimises sans mesurer, tu dépenses ton chakra sur le mauvais ennemi. Mesure d’abord, attaque ensuite.

# Shallow vs deep : copier la surface ou copier le fond

Temps de lecture ~10 min

Tu copies un objet. Tu modifies la copie. Et l'original change aussi.

Bienvenue dans le bug le plus silencieux de JavaScript. Pas d'erreur. Pas de warning. Juste un état corrompu que tu découvres trois heures plus tard en mode panique.

La raison : copier un objet en JS ne signifie pas forcément copier ce qu'il contient. Ça dépend de si tu copies en surface ou en profondeur : et par défaut, JS copie en surface.

---

## 1) VALEUR VS RÉFÉRENCE : LE FONDEMENT

En JavaScript, une affectation copie toujours une **valeur**. La distinction utile est le type de valeur copiée, pas une règle physique de placement dans la mémoire :

```text
Binding score ──► valeur primitive 42
Binding level ──► valeur primitive 7

Binding ninja ──► valeur de référence R1 ──┐
                                          ├──► { hp: 100, name: "Naruto" }
Binding ally  ──► valeur de référence R1 ──┘
```

Copier `score` copie sa valeur primitive. Affecter `ninja` à `ally` copie la valeur de référence : les deux bindings désignent le même objet. Le dessin est logique, pas une carte des adresses physiques du moteur.

**Primitives** : copiées par valeur. Chaque variable a sa propre copie.

```js
let chakra = 9000;
let cloneChakra = chakra; // copie de la valeur

cloneChakra = 1; // modifie la copie
console.log(chakra); // → 9000:l'original ne bouge pas
```

**Objets, tableaux et fonctions** : l'affectation copie leur valeur de référence. Deux variables peuvent donc désigner le même objet.

```js
const naruto = { name: "Naruto", power: 9000 };
const shadowClone = naruto; // copie la valeur de référence, pas l'objet

shadowClone.power = 1; // modifie l'objet pointé
console.log(naruto.power); // → 1:l'original est aussi touché
```

### Passage d'argument : toujours par valeur

JavaScript passe les arguments **par valeur**. Quand l'argument est un objet, la valeur copiée est une référence vers le même objet : le paramètre local peut donc muter cet objet. En revanche, réaffecter le paramètre ne remplace pas la valeur du binding chez l'appelant.

```js
function mutate(user) {
  user.name = "Kakashi"; // mutation visible à l'extérieur
}

function rebind(user) {
  user = { name: "Itachi" }; // réaffectation du paramètre local seulement
}

const profile = { name: "Naruto" };
mutate(profile);
console.log(profile.name); // "Kakashi"
rebind(profile);
console.log(profile.name); // reste "Kakashi"
```

```text
PRIMITIVES
──────────
chakra   → [9000]
cloneChakra → [9000]  ← copie indépendante

OBJETS
──────
naruto   ──┐
       ▼
shadowClone ──► { name: "Naruto", power: 9000 }
       ← les deux pointent vers le même objet
```

---

## 2) SHALLOW COPY : LA COPIE EN SURFACE

Une shallow copy crée un **nouvel objet** avec les mêmes propriétés de premier niveau. Mais si ces propriétés sont elles-mêmes des objets, elles ne sont pas dupliquées : elles sont partagées.

### Spread operator

```js
const ninja = {
  name: "Sasuke",
  stats: { speed: 95, power: 85 }, // objet imbriqué
  jutsus: ["Chidori", "Sharingan"], // tableau imbriqué
};

const copy = { ...ninja };

// Modifier une propriété primitive → OK, indépendant
copy.name = "Itachi";
console.log(ninja.name); // → "Sasuke":non touché

// Modifier une propriété imbriquée → DANGER
copy.stats.power = 0;
console.log(ninja.stats.power); // → 0:l'original est touché

copy.jutsus.push("Susanoo");
console.log(ninja.jutsus); // → ["Chidori", "Sharingan", "Susanoo"]:touché
```

```text
APRÈS SPREAD
────────────
ninja ──► { name: "Sasuke", stats: ──┐, jutsus: ──┐ }
copy ──► { name: "Itachi", stats: ──┘, jutsus: ──┘ }
                 ▲       ▲
             objet partagé  tableau partagé
```

`name` est une primitive : chaque objet a sa propre valeur.
`stats` et `jutsus` sont des objets/tableaux : les deux copies partagent la même référence.

### Object.assign

Même comportement que le spread : shallow.

```js
const copy2 = Object.assign({}, ninja);
// identique à { ...ninja } pour les cas simples
```

### Array spread

Pareil pour les tableaux :

```js
const squad = [{ name: "Naruto" }, { name: "Sasuke" }];

const copySquad = [...squad];

copySquad[0].name = "Rock Lee";
console.log(squad[0].name); // → "Rock Lee":partagé
```

---

## 3) DEEP COPY : COPIER JUSQU'AU FOND

Une copie profonde crée des objets distincts pour les éléments clonables de la structure et conserve certaines relations internes (par exemple les cycles). Elle ne signifie pas que tout type JavaScript ou toute métadonnée sera reproduit à l'identique.

### structuredClone : la méthode moderne

```js
const ninja = {
  name: "Sasuke",
  stats: { speed: 95, power: 85 },
  jutsus: ["Chidori", "Sharingan"],
  sensei: { name: "Kakashi", rank: "Jonin" },
};

const deepCopy = structuredClone(ninja);

deepCopy.stats.power = 0;
deepCopy.jutsus.push("Susanoo");
deepCopy.sensei.rank = "Hokage";

console.log(ninja.stats.power); // → 85:non touché
console.log(ninja.jutsus); // → ["Chidori", "Sharingan"]:non touché
console.log(ninja.sensei.rank); // → "Jonin":non touché
```

```text
APRÈS structuredClone
─────────────────────
ninja ──► { stats: ──► { power: 85 }, jutsus: ──► ["Chidori"...] }

deepCopy ──► { stats: ──► { power: 0 }, jutsus: ──► ["Chidori", "Susanoo"] }

Les objets clonés de cet exemple ont une identité distincte de ceux de l’original. À l’intérieur de la copie, les relations entre références sont conservées ; les types non clonables restent exclus.
```

`structuredClone` gère :

- objets imbriqués
- tableaux imbriqués
- `Date`, `Map`, `Set`, `ArrayBuffer`
- références circulaires

`structuredClone` **ne prend pas en charge** :

- les fonctions (une tentative de clonage déclenche `DataCloneError`)
- les valeurs `symbol`
- les nœuds DOM

Les prototypes personnalisés et plusieurs métadonnées (descripteurs, getters/setters) ne sont pas reproduits comme tels : les objets ordinaires clonés ne conservent pas leur chaîne de prototypes personnalisée. `undefined` est pris en charge comme valeur ; ce n'est pas lui qui est supprimé.

### JSON.parse + JSON.stringify : l'ancienne méthode (avec ses pièges)

```js
const deepCopyJson = JSON.parse(JSON.stringify(ninja));
```

Fonctionnait avant `structuredClone`. Mais :

```js
const problematic = {
  name: "Walter",
  cook: () => "meth", // ← fonction : PERDUE dans la copie
  date: new Date(), // ← Date : converti en string, pas en Date
  value: undefined, // ← undefined : PERDU (clé supprimée)
  score: NaN, // ← NaN : converti en null
};

const bad = JSON.parse(JSON.stringify(problematic));
// bad.cook   → undefined (la fonction a disparu)
// bad.date   → string (plus un objet Date)
// bad.value   → clé inexistante
// bad.score   → null
```

**Règle :** utilise `structuredClone()` uniquement pour des données compatibles avec l’algorithme de clonage structuré et lorsque cette API existe dans ton environnement cible. Vérifie les contraintes de la plateforme ; ne confonds pas disponibilité de l’API et compatibilité de tous les types.

---

## 4) LE TABLEAU DE DÉCISION

```text
Tu as besoin de...            Utilise...
─────────────────────────────────────   ──────────────────
copier un objet plat (pas d'imbrication) { ...obj }
copier un tableau d'éléments simples   [...arr]
copier en profondeur, données modernes  structuredClone()
copier en profondeur, vieux environnement JSON.parse(JSON.stringify())
copier en gardant les fonctions      bibliothèque lodash _.cloneDeep()
```

---

## 5) CAS RÉEL : LE STATE MANAGEMENT

Dans tout système avec un état (Redux, Zustand, signal custom), shallow vs deep est la décision qui fait ou casse la détection de changement.

```js
// Système de stats de match pour les ultras
const matchState = {
  score: { home: 0, away: 0 },
  events: [],
  players: {
    mbappe: { goals: 0, assists: 2 },
  },
};

// MAUVAISE mise à jour:mute l'état directement
function badGoal(team) {
  matchState.score[team]++; // mutation directe
  // un comparateur shallow (===) ne verra aucune différence
  // matchState est toujours le même objet en mémoire
  // React, Vue, ou ton système de détection ne se déclenchera pas
}

// BONNE mise à jour:retourne un nouvel état
function goal(state, team) {
  return {
    ...state,
    score: {
      ...state.score,
      [team]: state.score[team] + 1,
    },
  };
  // nouveau score, nouvel objet → détection de changement = OK
  // mais attention : events et players sont toujours partagés (shallow)
}

// Si une propriété imbriquée change, copie seulement le chemin modifié.
function addGoalForPlayer(state, team, playerId) {
  const player = state.players[playerId];
  return {
    ...state,
    score: { ...state.score, [team]: state.score[team] + 1 },
    players: {
      ...state.players,
      [playerId]: { ...player, goals: player.goals + 1 },
    },
  };
}
// Les branches non modifiées restent partagées volontairement (structural sharing).
// Un deep clone global serait souvent plus coûteux et inutile.
```

---

## EXERCICES

### EXO 1 : IDENTIFIER LA PROFONDEUR

Pour chaque opération ci-dessous, dire si la modification de `copy` affecte `original`, et pourquoi.

```js
// Cas A
const original = { name: "Goku", power: 9000 };
const copy = { ...original };
copy.power = 1;

// Cas B
const original = { name: "Vegeta", stats: { ki: 8000 } };
const copy = { ...original };
copy.stats.ki = 0;

// Cas C
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);

// Cas D
const original = [{ name: "Piccolo" }, { name: "Krilin" }];
const copy = [...original];
copy[0].name = "Cell";

// Cas E
const original = { name: "Freezer", minions: [{ name: "Zarbon" }] };
const copy = structuredClone(original);
copy.minions[0].name = "Dodoria";
```

---

### EXO 2 : LE SYSTÈME D'INVENTAIRE DE RICK GRIMES

Rick a un camp. Chaque camp a un inventaire avec des ressources imbriquées. Une fonction doit retourner un état mis à jour sans jamais muter l'état original.

```js
const campState = {
  name: "Prison",
  resources: {
    food: { cans: 50, water: 20 },
    weapons: ["rifle", "axe", "crossbow"],
  },
  survivors: [
    { name: "Rick", role: "leader" },
    { name: "le sniper", role: "scout" },
  ],
};
```

**Ta mission :**

1. Écrire `consumeFood(state, amount)` : retire `amount` cans, retourne un nouvel état (shallow suffit ici : pourquoi ?)
2. Écrire `addWeapon(state, weapon)` : ajoute une arme, retourne un nouvel état (shallow suffit aussi : pourquoi ?)
3. Écrire `promoteSurvivor(state, name, newRole)` : change le rôle d'un survivant, retourne un nouvel état (shallow ne suffit plus : pourquoi ?)
4. Vérifier que `campState` est toujours intact après chaque opération.

---

### EXO 3 : DEEP CLONE SANS STRUCTURED CLONE

`structuredClone` n'existe pas dans ton environnement (vieux Node, env restreint). Implémente `deepClone(obj)` récursif qui gère :

- objets plats
- objets imbriqués
- tableaux (y compris imbriqués)
- `null` et `undefined`
- primitives

Ne pas gérer `Date`, `Map`, `Set`, `Function` : les ignorer ou les copier par référence en les signalant.

_(Indice : `Array.isArray()` te sauvera la vie. Et pense aux cas limite : que faire si `obj` est une primitive ?)_

---

## RÉSUMÉ

Spread et `Object.assign` créent un nouvel objet de premier niveau : chaque propriété reçoit sa valeur ; si cette valeur désigne un autre objet, la référence vers cet objet reste partagée. `structuredClone` réalise un clonage profond pour les types pris en charge, mais ne préserve pas toutes les particularités des objets. `JSON.parse(JSON.stringify(...))` est une sérialisation limitée : les fonctions et propriétés `undefined` d'un objet sont omises, les `Date` deviennent des chaînes, `NaN` devient `null` et `BigInt` provoque une erreur. Dans un système qui détecte les changements par identité, utilise des mises à jour immuables ciblées ; ce n'est pas une obligation universelle pour tous les systèmes d'état.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Shallow vs deep : copier la surface ou copier le fond », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Shallow vs deep : copier la surface ou copier le fond** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir la profondeur de copie nécessaire

**Mission liée à « Shallow vs deep : copier la surface ou copier le fond » :** Pour un état Kintana imbriqué, modifie une propriété interne après copie superficielle puis après copie ciblée. Observe quelles références restent partagées et choisis la plus petite copie qui garantit l’isolation requise.

**Livrable :** Diagramme des références et tests d’isolation avant/après.

**Critères d’acceptation :** La copie profonde n’est pas choisie par défaut ; les branches non modifiées peuvent être partagées explicitement ; l’original reste conforme au contrat.

**Transfert obligatoire :** La structure contient un objet volumineux : explique le coût mémoire d’une copie plus profonde.

## Références techniques

- [MDN : Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) : types clonables, prototypes et métadonnées.
- [MDN : Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) : gel superficiel des propriétés propres.
