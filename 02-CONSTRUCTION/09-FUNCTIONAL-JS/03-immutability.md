---
perishability_id: PER-0019

stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_historical"
source_url: "https://nodejs.org/en/blog/release/v17.0.0"
source_type: "primary"
review_interval: "6 mois"
perishability_scope: "Disponibilité et limites de structuredClone selon Node.js et les navigateurs ; le principe d’immutabilité reste intemporel."
source_scope: "Release Node.js v17.0.0 : référence historique pour l’introduction de structuredClone dans Node.js 17. Elle ne prouve pas la compatibilité actuelle des navigateurs ; celle-ci relève de MDN et des versions de runtime visées."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_historical » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "HISTORICAL_NODE_17_STRUCTURED_CLONE_INTRODUCTION_CONFIRMED_2026-11-03"
review_due: "2027-05-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : Naruto :** une technique qui ne modifie pas le village autour d’elle est plus facile à tester et à relancer. La pureté n’est pas mystique : elle réduit les surprises.

> **CrazyDevs : clan des ninjas :** une abstraction peut devenir une technique brillante ou une armure impossible à retirer. Le vrai skill est de savoir quand la jeter.

# Immutabilité : ne pas muter, créer

> **Périmètre de suivi (6 mois) :** Disponibilité et limites de structuredClone selon Node.js et les navigateurs ; le principe d’immutabilité reste intemporel.

Temps de lecture ~9 min

Muter un objet c'est prendre un couteau et modifier directement ce qui existe.
Immutabilité c'est : tu prends l'original, tu crées une copie avec les changements, tu laisses l'original tranquille.

En prod, la mutation cachée est la cause numéro 1 des bugs qui "arrivent d'eux-mêmes". Tu modifies un objet à un endroit, un autre composant qui référence le même objet voit des données corrompues, et t'as aucune idée d'où ça vient.

> Le mécanisme de copie par référence (pourquoi deux variables peuvent pointer vers le même objet) est traité en profondeur dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref/02-shallow_vs_deep.md`.
> Ici on travaille l'immutabilité comme discipline de code. Là-bas on explique le moteur.

---

> **Portée historique de la source :** la release Node.js 17.0.0 sert uniquement à dater l’arrivée de `structuredClone` dans Node.js. Elle ne démontre pas la compatibilité de toutes les versions de navigateur ; pour cette partie, se référer à la documentation MDN et vérifier le runtime cible.

## 1) LE PROBLÈME DE LA RÉFÉRENCE PARTAGÉE

JS passe les objets et tableaux par référence. Pas par valeur.

```js
const statsNaruto = { chakra: 100, force: 85, vitesse: 70 };

// tu passes l'objet à une fonction
function augmenterForce(stats) {
  stats.force += 20; // mutation directe sur l'original
  return stats;
}

const statsApres = augmenterForce(statsNaruto);

console.log(statsNaruto.force); // 105:l'original est corrompu
console.log(statsApres === statsNaruto); // true:c'est le même objet
```

`statsNaruto` et `statsApres` pointent vers le même objet en mémoire. Y'a pas de copie. La mutation est globale.

```json
[statsNaruto] ──────────────┐
               ▼
[statsApres] ──────────> { chakra: 100, force: 105, vitesse: 70 }
```

---

## 2) CRÉER PLUTÔT QUE MUTER : SPREAD OPERATOR

La solution la plus courante : spread.

```js
const statsNaruto = { chakra: 100, force: 85, vitesse: 70 };

function augmenterForce(stats, bonus) {
  return { ...stats, force: stats.force + bonus }; // nouvel objet, original intact
}

const statsApres = augmenterForce(statsNaruto, 20);

console.log(statsNaruto.force); // 85:intact
console.log(statsApres.force); // 105:nouvel objet
console.log(statsApres === statsNaruto); // false:deux objets distincts
```

Pour les tableaux :

```js
const classement = ["Messi", "Haaland", "Mbappé"]

// MUTATION:interdit en FP
classement.push("Bellingham")  // modifie l'original
classement.splice(1, 1)     // modifie l'original
classement.sort(...)       // modifie l'original

// IMMUTABLE:on crée un nouveau tableau
const avecBellingham = [...classement, "Bellingham"]
const sansMessi = classement.filter(j => j !== "Messi")
const triés = [...classement].sort() // sort sur une copie
```

---

## 3) SHALLOW COPY VS DEEP COPY

Spread ne copie qu'un niveau. Si l'objet est imbriqué, les références des sous-objets sont partagées.

```js
const joueur = {
  nom: "Goku",
  stats: { force: 9000, vitesse: 8500 }, // objet imbriqué
};

const copie = { ...joueur };

copie.nom = "Vegeta"; // ok, string = primitif, pas de partage
copie.stats.force = 1; // DANGER : modifie aussi joueur.stats.force

console.log(joueur.stats.force); // 1:corrompu
```

```text
joueur     copie
 nom: "Goku"  nom: "Vegeta"
 stats ──────► stats ──────► { force: 1, vitesse: 8500 }
```

Pour les objets imbriqués, il faut soit spread à chaque niveau, soit `structuredClone` :

```js
// spread imbriqué : manuel mais précis
function mettreAJourForce(joueur, nouvelleForce) {
  return {
    ...joueur,
    stats: {
      ...joueur.stats,
      force: nouvelleForce,
    },
  };
}

// structuredClone : copie profonde de valeurs compatibles (Node.js 17+, navigateurs depuis 2022)
function mettreAJourForceDeep(joueur, nouvelleForce) {
  const copie = structuredClone(joueur);
  copie.stats.force = nouvelleForce;
  return copie;
}

// Attention : structuredClone n'accepte pas toutes les valeurs JavaScript.
// Une valeur non sérialisable provoque DataCloneError ; vérifie le type réel.
// Ce n'est pas un remplacement universel de spread, des constructeurs ou d'un mapper métier.

// Références : Node.js 17.0.0 (ajout global) et MDN (disponibilité navigateur depuis mars 2022).
// https://nodejs.org/en/blog/release/v17.0.0
// https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone

// les deux sont valides:spread est plus lisible sur des objets peu profonds
```

---

## 4) `Object.freeze` : BLOQUER LA MUTATION EN DUR

`Object.freeze` rend un objet non modifiable à l'exécution.

```js
const config = Object.freeze({
  apiUrl: "https://foxriver.prison.com",
  timeout: 5000,
  maxRetries: 3,
});

config.timeout = 9999; // silencieux en mode normal, erreur en strict mode
console.log(config.timeout); // 5000:la mutation n'a pas eu lieu
```

Limite : `freeze` est shallow. Objets imbriqués restent mutables.

```js
const personnage = Object.freeze({
  nom: "Walter White",
  stats: { danger: 100 }, // pas freeze
});

personnage.nom = "Heisenberg"; // ignoré
personnage.stats.danger = 9000; // OK, stats n'est pas freezé

// deep freeze si t'en as vraiment besoin
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach((name) => {
    const val = obj[name];
    if (val && typeof val === "object") deepFreeze(val);
  });
  return Object.freeze(obj);
}
```

---

## 5) PATTERNS D'IMMUTABILITÉ SUR DES STRUCTURES COMPLEXES

Cas réel : mettre à jour un combattant dans une liste sans muter la liste.

```js
const chevaliers = [
  { id: "leon", armure: 100, actif: true },
  { id: "rei", armure: 80, actif: true },
  { id: "kouga", armure: 95, actif: true },
];

// MUTATION:interdit
function blesserChevalier(liste, id, degats) {
  const chevalier = liste.find((c) => c.id === id);
  chevalier.armure -= degats; // mutation de l'objet original
  return liste;
}

// IMMUTABLE:on crée une nouvelle liste avec le chevalier mis à jour
function blesserChevalier(liste, id, degats) {
  return liste.map(
    (c) =>
      c.id === id
        ? { ...c, armure: c.armure - degats } // nouvel objet pour le chevalier ciblé
        : c, // les autres sont réutilisés tels quels
  );
}

const apresAttaque = blesserChevalier(chevaliers, "leon", 30);

console.log(chevaliers[0].armure); // 100:intact
console.log(apresAttaque[0].armure); // 70:nouveau tableau, nouvel objet
```

---

## 6) LE CAS QUI CASSE : SORT ET LES MÉTHODES MUTANTES

Les méthodes JS qui mutent en place : `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`.

```js
function classerParButs(joueurs) {
  return joueurs.sort((a, b) => b.buts - a.buts); // mute l'original
}

const candidats = [
  { nom: "Messi", buts: 45 },
  { nom: "Mbappé", buts: 52 },
  { nom: "Haaland", buts: 60 },
];

const classés = classerParButs(candidats);
console.log(candidats[0].nom); // "Haaland":l'original est réordonné
```

Fix en une ligne :

```js
function classerParButs(joueurs) {
  return [...joueurs].sort((a, b) => b.buts - a.buts); // spread avant sort
}
```

---

## EXERCICES

## EXO 1 : l'inventaire de Rick

```js
const inventaire = {
  nourriture: 45,
  munitions: 120,
  medicaments: 8,
  survivants: [
    { nom: "le sniper", role: "chasseur" },
    { nom: "Michonne", role: "guerrière" },
  ],
};

// Ta mission : écrire 3 fonctions pures
// 1. consommerNourriture(inventaire, quantite) -> nouvel inventaire avec nourriture réduite
// 2. ajouterSurvivant(inventaire, survivant) -> nouvel inventaire avec le survivant ajouté
// 3. changerRole(inventaire, nom, nouveauRole) -> nouvel inventaire avec le rôle mis à jour

// Règle : inventaire original jamais modifié. Vérifie avec ===
```

---

## EXO 2 : le pipeline de match

Tu as des stats de match. Chaque transformation doit retourner un nouvel objet.

```js
const statsMatch = {
  club: "PSG",
  score: 0,
  possession: 50,
  tirs: [],
  joueurs: [],
};

// Écris ces fonctions en immutable :
// marquerBut(stats) -> score + 1
// ajouterTir(stats, tir) -> nouveau tir dans la liste
// mettreAJourPossession(stats, valeur) -> nouvelle possession
// reinitialiser(stats) -> retourne les stats à zéro (score 0, tirs [], possession 50)
```

---

## EXO 3 : freeze partiel

```js
const configAPI = Object.freeze({
  base: "https://api.ballondor.com",
  headers: {
    Authorization: "Bearer token_messi",
    "Content-Type": "application/json",
  },
  retries: 3,
});

// 1. Essaie de modifier configAPI.retries:que se passe-t-il ?
// 2. Essaie de modifier configAPI.headers.Authorization:que se passe-t-il ?
// 3. Explique pourquoi le comportement est différent
// 4. Implémente deepFreeze et applique-le à configAPI
```

---

## EXO 4 : le tournoi de Naruto

```js
const bracket = [
  {
    round: 1,
    combats: [
      { id: "c1", ninja1: "Naruto", ninja2: "Sasuke", gagnant: null },
      { id: "c2", ninja1: "Gaara", ninja2: "Rock Lee", gagnant: null },
    ],
  },
  { round: 2, combats: [] },
];

// Écris declareGagnant(bracket, combatId, gagnant)
// Elle doit retourner un nouveau bracket avec le gagnant mis à jour
// Le bracket original ne doit pas changer
// (Indice : c'est un objet imbriqué à deux niveaux)
```

---

## RÉSUMÉ

En JavaScript, les affectations et les appels de fonction transmettent des valeurs. Pour un objet ou un tableau, cette valeur est une référence : plusieurs bindings ou paramètres peuvent donc désigner le même objet. Une mutation est visible depuis tous les bindings qui le désignent ; réaffecter un paramètre ne réaffecte pas la variable de l’appelant.
Muter un état partagé sans contrat clair est une source de bugs. La solution dépend du besoin : mutation contrôlée, copie superficielle, copie ciblée du chemin modifié ou `structuredClone()` pour une structure compatible.
`Object.freeze` bloque la mutation, mais seulement en surface.
Les méthodes `sort`, `reverse`, `splice` mutent en place : toujours travailler sur une copie.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Immutabilité : ne pas muter, créer » à un traitement de journaux d’audit plutôt que des événements de mesure. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:functional -->

## Repère visuel utile : Règle pure pour les transitions de demande

```text
état + rôle + action
        |
        v
  fonction pure
        |
  +-----+-----+
  v           v
nouvel état  erreur métier
  |
  v
adaptateur DB / événement
```

<!-- AF-LESSON-PROFILE: functional -->

## Repères de décision

- **Pourquoi :** La programmation fonctionnelle aide à isoler des transformations déterministes et à réduire les effets de bord qui rendent les bugs difficiles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Utilise fonctions pures et immutabilité pour les règles partagées ou testées souvent. N'impose pas un style fonctionnel complexe quand une boucle lisible est plus claire.
- **Limites :** Créer une copie profonde peut coûter cher ; une fonction pure peut toujours être lente ou incorrecte ; composition excessive et currying gratuit rendent le code illisible.

## Mécanisme : la version sans magie

Sépare calcul et effet, rends les dépendances explicites, transforme les données sans mutation partagée et compose des fonctions au contrat clair.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Immutabilité : ne pas muter, créer** se rattache à ce cas concret : Les transitions de demande Kintana doivent être calculées de façon déterministe avant écriture en base ou notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Règle pure pour les transitions de demande

> **Arc DBZ / Capsule Corp. :** une règle métier doit être testable sans brancher tout le vaisseau. Garde les effets derrière une frontière.

**Mission liée à « Immutabilité : ne pas muter, créer » :** Isole une transition Kintana en fonction pure : entrée (état, rôle, action), sortie (nouvel état ou erreur). Appelle l'adaptateur de persistance seulement après validation de la transition.

**Livrable :** une fonction pure, tests table-driven, test de non-mutation et un adaptateur qui applique le résultat.

**Critères d’acceptation :** le calcul n'accède ni à l'horloge ni au réseau ; les entrées invalides sont explicites ; l'état d'origine reste intact ; le code d'effet n'est pas mélangé à la règle.

**Transfert obligatoire :** Ajoute une règle qui dépend de l'heure courante. Rends cette dépendance explicite et teste les limites de fuseau et de date.
