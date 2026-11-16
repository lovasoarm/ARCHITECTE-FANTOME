---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: high
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Dragon Ball Z :** deux attaques paraissent identiques à l’œil nu, mais l’énergie réelle n’est pas la même. Les bits, arrondis et probabilités te forcent à regarder sous la surface.

> **CrazyDevs : tournoi de Konoha :** le problème n’est pas de gagner un duel, mais de ne pas faire combattre inutilement 10 000 adversaires quand une seule bonne stratégie suffit.

# Arithmétique modulaire : le modulo qui tourne en boucle

Temps de lecture ~9 min

`%` est l'opérateur le plus sous-estimé de JS. La plupart des devs l'utilisent pour "vérifier si un nombre est pair". C'est dommage, parce que derrière le modulo se cache la logique qui pilote les cycles, les cooldowns, la pagination, les distributions équilibrées et les systèmes de rotation.

Un modulo ne calcule pas un reste. Il te dit **où tu es dans un cycle**.

---

## 1) CE QUE FAIT VRAIMENT `%`

`a % n` retourne le reste de la division euclidienne de `a` par `n`.

```js
7 % 3; // 1 : 7 = 2*3 + 1
10 % 5; // 0 : 10 = 2*5 + 0
13 % 4; // 1 : 13 = 3*4 + 1
```

**La vraie lecture :** `a % n` te donne ta position dans un cycle de taille `n`.

```text
0 % 4 = 0 → position 0
1 % 4 = 1 → position 1
2 % 4 = 2 → position 2
3 % 4 = 3 → position 3
4 % 4 = 0 → retour en position 0 : le cycle recommence
5 % 4 = 1 → position 1 à nouveau
```

Visualisé :

```text
index :  0 1 2 3 4 5 6 7 8 9 10 11
% 4  :  0 1 2 3 0 1 2 3 0 1  2  3
      ^-----------^-----------^-----------
      cycle    cycle    cycle
```

---

## 2) LES USAGES RÉELS

### Cycles et rotations

```js
// rotation de guard : 4 gardes, ils tournent en permanence
const gardes = ["Rick", "le sniper", "Michonne", "Glenn"];
const gardeActuel = (tour) => gardes[tour % gardes.length];

gardeActuel(0); // "Rick"
gardeActuel(4); // "Rick":le cycle repart
gardeActuel(7); // "le sniper" (7 % 4 = 3... attends)
// 7 % 4 = 3 => gardes[3] = "Glenn"
// vérifier : 7 = 1*4 + 3 => reste 3. correct.

// tournoi round-robin : match suivant dans un cycle
const equipes = ["PSG", "Real", "Bayern", "City"];
const prochainMatch = (matchActuel) => [
  equipes[matchActuel % equipes.length],
  equipes[(matchActuel + 1) % equipes.length],
];
prochainMatch(3); // ["City", "PSG"]:retour au début
```

### Pagination

```js
// page 0 → items 0, 1, 2, 3, 4
// page 1 → items 5, 6, 7, 8, 9
// page n → items n*taille à (n+1)*taille - 1

const paginer = (items, taille, page) => {
  const debut = page * taille;
  return items.slice(debut, debut + taille);
};

// numéro de page depuis un index
const pageDeIndex = (index, taille) => Math.floor(index / taille);
const positionDansPage = (index, taille) => index % taille;
```

### Cooldowns et timers cycliques

```js
// chakra de Naruto se régénère toutes les 3 actions
const peutUtiliserJutsu = (actionCount) => actionCount % 3 === 0;

// attaque spéciale disponible toutes les 5 secondes
const attaqueDisponible = (secondes) => secondes % 5 === 0;

// alternance pair/impair pour les équipes
const equipeQuiJoue = (tour) => (tour % 2 === 0 ? "domicile" : "exterieur");
```

### Distribution équilibrée

```js
// assigner des joueurs à des équipes de façon équilibrée
const assignerEquipe = (indexJoueur, nombreEquipes) =>
  indexJoueur % nombreEquipes;

// joueurs 0,3,6 => équipe 0
// joueurs 1,4,7 => équipe 1
// joueurs 2,5,8 => équipe 2

// ring buffer : structure de données circulaire
class RingBuffer {
  constructor(taille) {
    this.data = new Array(taille);
    this.taille = taille;
    this.curseur = 0;
  }

  push(valeur) {
    // écrase le plus ancien quand le buffer est plein
    this.data[this.curseur % this.taille] = valeur;
    this.curseur++;
  }
}
```

---

## 3) LE PIÈGE AVEC LES NOMBRES NÉGATIFS

En JavaScript, `%` renvoie le reste de la division et son signe suit celui de l'opérande gauche. Ce n'est pas un bug, mais ce résultat peut surprendre lorsqu'on veut calculer une position toujours positive dans un cycle.

```js
-1 % 4; // -1 en JavaScript, pas 3
-5 % 3; // -2 en JavaScript, pas 1

// Pour un modulo mathématique positif, n doit être un entier strictement positif.
function mod(a, n) {
  if (!Number.isSafeInteger(a) || !Number.isSafeInteger(n) || n <= 0) {
    throw new RangeError(
      "a doit être un entier sûr et n un entier sûr positif",
    );
  }
  return ((a % n) + n) % n;
}

mod(-1, 4); // 3
mod(-5, 3); // 1
mod(7, 3); // 1
```

**Quand utiliser `mod` vs `%` :**

- indices, cycles, positions → utilise `mod` pour être safe
- vérification pair/impair sur des positifs → `%` suffit

---

## 4) MODULO ET HASHING (INTRO)

Le modulo est la dernière étape de beaucoup de fonctions de hash : ramener une valeur potentiellement énorme dans une plage fixe.

```js
// distribuer des clés dans un tableau de taille fixe
// Réutilise la fonction mod() définie à la section précédente.
const TAILLE_TABLE = 16;

const indexHash = (valeurHash) => mod(valeurHash, TAILLE_TABLE);
// si valeurHash = 273 => 273 % 16 = 1
// si valeurHash = 289 => 289 % 16 = 1 :collision ! (même index)
// le hash parfait n'existe pas : le modulo amplifie les collisions

// c'est la base des hash tables:module 02-CONSTRUCTION/06-DATA-STRUCTURES creuse ça
```

---

## 5) ARITHMÉTIQUE MODULAIRE AVANCÉE : CONGRUENCES

Deux nombres sont **congrus modulo n** s'ils ont le même reste.

```js
// 7 ≡ 3 (mod 4) car 7 % 4 = 3 % 4 = 3
const congruents = (a, b, n) => mod(a, n) === mod(b, n);

congruents(7, 3, 4); // true
congruents(13, 1, 4); // true
congruents(-1, 3, 4); // true : -1 et 3 sont congrus modulo 4
```

Utilité en pratique :

```js
// même jour de la semaine que dans n jours
const jourSemaine = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
const dansNJours = (jourActuel, n) => jourSemaine[mod(jourActuel + n, 7)];

// le Ballon d'Or se vote en décembre : quel mois dans 20 mois ?
const moisSuivant = (moisActuel, n) => mod(moisActuel + n, 12);
// moisActuel = 11 (décembre), n = 20
// (11 + 20) % 12 = 31 % 12 = 7 => août
```

---

## EXERCICES

## EXO 1 : Le système de cooldown de Naruto

Naruto a 4 jutsus. Chaque jutsu a un cooldown en nombre de tours :

- Rasengan : cooldown 3
- Rasengan Géant : cooldown 5
- Rasenshuriken : cooldown 7
- Sage Mode : cooldown 10

Écrire `jutsuDisponible(nomJutsu, tourActuel, dernierUsage)` qui retourne `true` si le jutsu est disponible.

Puis écrire `prochainDisponible(nomJutsu, tourActuel, dernierUsage)` qui retourne dans combien de tours il sera dispo.

---

## EXO 2 : Distribution des matchs de Ligue des Champions

16 équipes, format round-robin. À chaque journée, chaque équipe joue contre une autre. Écrire une fonction qui génère le planning complet des 15 journées sans qu'une équipe joue deux fois contre la même.

(indice : algorithme de round-robin avec modulo sur les indices)

---

## EXO 3 : Ring buffer pour les replays

Dans un jeu de foot, les 10 dernières actions sont gardées en mémoire pour le replay. Implémenter un `ReplayBuffer` de taille fixe 10 avec `push(action)` et `getAll()` qui retourne les actions dans l'ordre chronologique.

---

## CORRIGÉS DE RÉFÉRENCE : À CONSULTER APRÈS UNE TENTATIVE

### Corrigé EXO 1 : cooldowns

Convention retenue : un jutsu jamais utilisé (`dernierUsage = null`) est disponible. Sinon, il est disponible dès que `tourActuel - dernierUsage >= cooldown`. `prochainDisponible` retourne `0` si le jutsu est déjà disponible ; sinon, il retourne le nombre de tours restants.

```js
const COOLDOWNS = Object.freeze({
  Rasengan: 3,
  "Rasengan Géant": 5,
  Rasenshuriken: 7,
  "Sage Mode": 10,
});

function verifierEntrees(nomJutsu, tourActuel, dernierUsage) {
  if (!Object.hasOwn(COOLDOWNS, nomJutsu))
    throw new RangeError(`Jutsu inconnu : ${nomJutsu}`);
  if (!Number.isSafeInteger(tourActuel) || tourActuel < 0)
    throw new RangeError("tourActuel invalide");
  if (
    dernierUsage !== null &&
    (!Number.isSafeInteger(dernierUsage) ||
      dernierUsage < 0 ||
      dernierUsage > tourActuel)
  ) {
    throw new RangeError("dernierUsage doit être null ou un tour déjà écoulé");
  }
}

export function jutsuDisponible(nomJutsu, tourActuel, dernierUsage) {
  verifierEntrees(nomJutsu, tourActuel, dernierUsage);
  return (
    dernierUsage === null || tourActuel - dernierUsage >= COOLDOWNS[nomJutsu]
  );
}

export function prochainDisponible(nomJutsu, tourActuel, dernierUsage) {
  verifierEntrees(nomJutsu, tourActuel, dernierUsage);
  if (dernierUsage === null) return 0;
  return Math.max(0, COOLDOWNS[nomJutsu] - (tourActuel - dernierUsage));
}
```

### Corrigé EXO 2 : planning round-robin à 16 équipes

L'algorithme du cercle garde la première équipe fixe et fait tourner les quinze autres. À chaque journée, les positions opposées sont associées. Il produit 15 journées de 8 matchs, soit 120 rencontres distinctes.

```js
export function genererPlanning(equipes) {
  if (
    !Array.isArray(equipes) ||
    equipes.length !== 16 ||
    equipes.some((e) => typeof e !== "string" || e.trim() === "") ||
    new Set(equipes).size !== 16
  ) {
    throw new TypeError(
      "Fournir exactement 16 noms d'équipes distincts et non vides.",
    );
  }
  const rotation = [...equipes];
  const planning = [];
  for (let journee = 0; journee < 15; journee++) {
    const matchs = [];
    for (let i = 0; i < 8; i++) {
      matchs.push([rotation[i], rotation[15 - i]]);
    }
    planning.push(matchs);
    const dernier = rotation.pop();
    rotation.splice(1, 0, dernier);
  }
  return planning;
}
```

### Corrigé EXO 3 : ReplayBuffer de dix actions

```js
export class ReplayBuffer {
  #data = new Array(10);
  #next = 0;
  #count = 0;

  push(action) {
    this.#data[this.#next] = action;
    this.#next = (this.#next + 1) % 10;
    this.#count = Math.min(this.#count + 1, 10);
  }

  getAll() {
    const debut = (this.#next - this.#count + 10) % 10;
    return Array.from(
      { length: this.#count },
      (_, i) => this.#data[(debut + i) % 10],
    );
  }
}
```

`getAll()` retourne une nouvelle liste dans l'ordre ancien → récent. Après plus de dix insertions, seules les dix actions les plus récentes restent présentes. Le tableau interne n'est jamais exposé.

---

## RÉSUMÉ

Le modulo calcule une position dans un cycle. C'est son vrai rôle : pas juste pair/impair. Les cycles, la pagination, les cooldowns, les distributions équilibrées, les ring buffers : tout ça repose sur `a % n`. Attention aux négatifs : utilise `((a % n) + n) % n` pour un modulo toujours positif. Et retiens que le modulo est la base des hash tables : ramener une valeur dans une plage, c'est toujours `hash % taille`.

<!-- AF-DIAGRAM:math -->

## Repère visuel utile : Décision quantitative pour la capacité Kintana

```text
question métier
     |
     v
variables + unités + hypothèses
     |
     v
formule / modèle
     |
  +--+--+
  v     v
base  sensibilité
  |     |
  +--+--+
     v
décision + limites
```

<!-- AF-LESSON-PROFILE: math -->

## Repères de décision

- **Pourquoi :** Les maths rendent explicites la capacité, l'incertitude, le coût et les limites d'un algorithme. Elles évitent de décider au feeling quand le système grandit.
- **Quand l’utiliser / quand l’éviter :** Utilise la formule adaptée à la question (capacité, probabilité, hachage, logique ou combinatoire). Vérifie unités et hypothèses avant de coder ; ne sors pas une formule parce qu'elle a l'air savante.
- **Limites :** Un calcul exact sur des hypothèses fausses donne une réponse fausse. Les données réelles ont bruit, biais et limites d'échantillonnage ; une simulation n'est pas une mesure de terrain.

## Mécanisme : la version sans magie

Définis les variables, unités et domaine de validité ; dérive ou explique la formule ; calcule un cas de base, un cas limite et une sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Arithmétique modulaire : le modulo qui tourne en boucle** se rattache à ce cas concret : Kintana doit dimensionner les créneaux, estimer une charge de notification ou choisir un seuil de contrôle sans masquer l'incertitude.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décision quantitative pour la capacité Kintana

> **Arc DBZ / Capsule Corp. :** les chiffres ne sont pas de la déco. Une formule mal choisie peut envoyer tout le système dans le mur, même si le code compile.

**Mission liée à « Arithmétique modulaire : le modulo qui tourne en boucle » :** Choisis une question chiffrée cohérente avec la notion : capacité de créneaux, probabilité de collision, taille d'un espace de recherche ou seuil d'alerte. Formalise les hypothèses et compare deux scénarios.

**Livrable :** un calcul reproductible (tableur ou script), les unités, hypothèses, sensibilité et une décision argumentée.

**Critères d’acceptation :** les dimensions sont cohérentes ; le résultat est vérifié par un cas simple ; les hypothèses et l'incertitude sont exposées ; aucune précision injustifiée n'est revendiquée.

**Transfert obligatoire :** Change le volume ou le taux de base et observe si la décision reste la même. Explique le point où elle bascule.
