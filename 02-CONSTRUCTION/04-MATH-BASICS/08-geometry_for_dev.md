---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
cognitive_level: L4
perturbation_modes: [changement_echelle, constraints_injectees]
anti_recipe_key: changement_echelle+constraints_injectees
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Dragon Ball Z :** deux attaques paraissent identiques à l’œil nu, mais l’énergie réelle n’est pas la même. Les bits, arrondis et probabilités te forcent à regarder sous la surface.

> **CrazyDevs : tournoi de Konoha :** le problème n’est pas de gagner un duel, mais de ne pas faire combattre inutilement 10 000 adversaires quand une seule bonne stratégie suffit.

# GÉOMÉTRIE POUR DÉVELOPPEUR

Temps de lecture ~13 min

T'as pas besoin d'être Pythagore.
Tu as besoin de savoir calculer une distance entre deux points sur une carte, détecter si un clic tombe dans une zone, orienter un sprite, ou positionner des éléments dans un canvas.

C'est ça la géométrie du dev : des maths qui font tourner des jeux, des dashboards, des cartes interactives, et des interfaces qui répondent à l'espace.

---

## 1) LE SYSTÈME DE COORDONNÉES

Tout commence là. Un point dans l'espace, c'est `{x, y}`.

```js
// sur un canvas HTML, l'axe Y est INVERSÉ par rapport aux maths scolaires
// (0, 0) = coin en haut à gauche
// x augmente vers la droite
// y augmente vers le bas

const gokuPosition = { x: 120, y: 340 };
const vegetaPosition = { x: 480, y: 200 };

// dans un jeu de données ou une carte géographique :
// x = longitude, y = latitude (ou l'inverse selon la lib)
// toujours vérifier l'orientation de ton système avant de coder
```

Diagramme canvas :

```
(0,0) -----> x+
 |
 |
 v
 y+
```

Diagramme math classique :

```
 y+
 ^
 |
 |
(0,0) -----> x+
```

Même espace, axes différents : beaucoup de bugs viennent de là.

---

## 2) DISTANCE ENTRE DEUX POINTS

La formule de Pythagore. Utile partout : déterminer si deux objets se touchent, trouver le joueur le plus proche, trier des résultats par proximité géographique.

```js
function distance(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const messi = { x: 10, y: 20 };
const but = { x: 100, y: 80 };

console.log(distance(messi, but));
// => 108.17... pixels (ou mètres, ou degrés, selon ton unité)
```

**Piège prod :** `Math.sqrt` coûte cher en CPU. Si tu veux juste comparer deux distances (sans avoir besoin de la valeur exacte), compare les distances au carré :

```js
function distanceCarre(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return dx * dx + dy * dy;
  // évite le calcul de la racine carrée lorsque seule la comparaison compte
  // utile pour : "est-ce que A est plus proche de C que B ?"
}

// si distanceCarre(A, C) < distanceCarre(B, C) => A est plus proche
```

---

## 3) VECTEUR : DIRECTION + MAGNITUDE

Un vecteur, c'est pas un point. C'est un déplacement.
La différence entre deux positions = un vecteur.

```js
// vecteur de A vers B
function vecteur(a, b) {
  return { x: b.x - a.x, y: b.y - a.y };
}

// magnitude (longueur) du vecteur
function magnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// normaliser un vecteur = le ramener à une longueur de 1
// utile pour avoir une DIRECTION pure, sans la vitesse
function normaliser(v) {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0 }; // éviter la division par zéro
  return { x: v.x / mag, y: v.y / mag };
}

const spawn = { x: 0, y: 0 };
const cible = { x: 3, y: 4 };

const dir = vecteur(spawn, cible); // { x: 3, y: 4 }
const mag = magnitude(dir); // 5
const unitDir = normaliser(dir); // { x: 0.6, y: 0.8 }

// pour déplacer un objet vers la cible à vitesse fixe :
const vitesse = 10;
const deplacement = {
  x: unitDir.x * vitesse, // => 6
  y: unitDir.y * vitesse, // => 8
};
```

Diagramme :

```
spawn (0,0) -----> dir {x:3, y:4} -----> cible (3,4)
           |
         magnitude = 5
           |
        normaliser: {x:0.6, y:0.8}
```

---

## 4) JUTSU SCALAIRE (DOT PRODUCT)

Deux vecteurs. Un seul nombre. Ce nombre dit si les vecteurs pointent dans la même direction.

```js
function dotProduct(v1, v2) {
  return v1.x * v2.x + v1.y * v2.y;
}

// si dot > 0 : même sens général (angle < 90°)
// si dot = 0 : perpendiculaires
// si dot < 0 : sens opposés (angle > 90°)

const regardDuGardien = { x: 1, y: 0 }; // il regarde vers la droite
const directionMbappé = { x: 0.8, y: 0.2 }; // Mbappé fonce en diagonale

const dot = dotProduct(regardDuGardien, directionMbappé);
// => 0.8 : positif, Mbappé est dans le champ de vision du gardien

const directionDerriere = { x: -1, y: 0 };
const dot2 = dotProduct(regardDuGardien, directionDerriere);
// => -1 : négatif, le joueur arrive par derrière
```

Cas d'usage réels :

- déterminer si un ennemi est dans le champ de vision du joueur
- calculer l'éclairage d'une surface (angle entre lumière et normale)
- IA de pathfinding : est-ce que l'agent regarde vers la cible

---

## 5) DÉTECTION DE COLLISION : BOUNDING BOX

La collision pixel-perfect coûte trop cher. En prod, on commence par tester si les bounding boxes se chevauchent.

```js
// rectangle représenté par coin supérieur gauche + largeur/hauteur
function collisionRect(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

const sasuke = { x: 100, y: 100, width: 50, height: 80 };
const monstre = { x: 130, y: 120, width: 60, height: 90 };

console.log(collisionRect(sasuke, monstre)); // true : collision détectée
```

Diagramme :

```
sasuke:
 (100,100) +--------+
      |    |
      |    |
      +--------+ (150,180)

monstre:
    (130,120) +-----------+
         | OVERLAP |
         |      |
         +-----------+ (190,210)
```

**Collision cercle** (plus précise pour les sprites ronds) :

```js
function collisionCercle(a, b) {
  // a et b ont : x, y (centre), radius
  const dist = distance(a, b);
  return dist < a.radius + b.radius;
  // Cette convention exige un chevauchement strict : un simple contact ne compte pas.
  // Si le contact doit déclencher une collision, utilise <=.
}

const goku = { x: 200, y: 200, radius: 30 };
const vegeta = { x: 220, y: 210, radius: 50 };

console.log(collisionCercle(goku, vegeta));
// distance ≈ 22.4, radius sum = 80 => true : ils se touchent
```

---

## 6) POINT DANS UNE ZONE

Est-ce que le curseur est dans une zone cliquable ? Est-ce qu'un joueur est dans la zone de capture ?

```js
// point dans un rectangle
function pointDansRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

// point dans un cercle
function pointDansCercle(point, cercle) {
  return distance(point, cercle) <= cercle.radius;
}

const clic = { x: 250, y: 150 };
const bouton = { x: 200, y: 100, width: 100, height: 80 };

console.log(pointDansRect(clic, bouton));
// => true : le clic est dans le bouton
```

Cas d'usage réels :

- hitboxes dans un jeu
- zones interactives sur une carte
- drag & drop : est-ce que l'élément est lâché sur une cible valide
- tooltip : est-ce que la souris survole une région

---

## 7) INTERPOLATION LINÉAIRE (LERP)

<!-- AF-DIAGRAM:rto_rpo -->

```text
Incident
│<──── RTO : délai maximal de reprise ────>│
│
└─<── RPO : perte maximale de données ──>│
```

RTO mesure le temps acceptable avant reprise ; RPO mesure la quantité de données acceptable à perdre.

Lerp = Linear Interpolation. Ça calcule un point entre deux valeurs selon un pourcentage.

```js
function lerp(a, b, t) {
  // t entre 0 et 1
  // t=0 => a, t=1 => b, t=0.5 => milieu
  return a + (b - a) * t;
}

function lerpPoint(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
  };
}

const depart = { x: 0, y: 0 };
const arrivee = { x: 100, y: 200 };

lerpPoint(depart, arrivee, 0); // {x:0, y:0}
lerpPoint(depart, arrivee, 0.25); // {x:25, y:50}
lerpPoint(depart, arrivee, 0.5); // {x:50, y:100}
lerpPoint(depart, arrivee, 1); // {x:100, y:200}
```

Usages réels :

- animation de caméra qui glisse vers une cible
- transition fluide entre deux couleurs
- smooth scroll vers un élément
- courbe de progression d'un élément UI

**Lerp "smooth follow"** (caméra qui suit un joueur sans être rigide) :

```js
let cameraPos = { x: 0, y: 0 };
const SMOOTH = 0.1; // plus petit = plus lent

function updateCamera(playerPos) {
  // chaque frame, la caméra avance de 10% vers le joueur
  cameraPos = lerpPoint(cameraPos, playerPos, SMOOTH);
}
```

---

## 8) ANGLE ET ROTATION

En JS, les angles sont en radians. Pas en degrés.

```js
const PI = Math.PI;

// conversions
function toRad(deg) {
  return (deg * PI) / 180;
}
function toDeg(rad) {
  return (rad * 180) / PI;
}

// angle entre deux points (en radians)
function angle(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

// faire pivoter un point autour d'un centre
function rotation(point, centre, angleRad) {
  const dx = point.x - centre.x;
  const dy = point.y - centre.y;
  return {
    x: centre.x + dx * Math.cos(angleRad) - dy * Math.sin(angleRad),
    y: centre.y + dx * Math.sin(angleRad) + dy * Math.cos(angleRad),
  };
}

const balle = { x: 100, y: 0 };
const origine = { x: 0, y: 0 };

// faire tourner la balle de 90° autour de l'origine
const balleRotée = rotation(balle, origine, toRad(90));
// => {x: 0, y: 100} (approximativement, floating point oblige)
```

**`Math.atan2` vs `Math.atan` :** toujours utiliser `atan2(y, x)`. Il gère les quatre quadrants correctement. `atan` tout seul perd de l'information.

---

## 9) DISTANCE MANHATTAN

Dans certains contextes (grille de cases, tableur, pathfinding sur une map), la distance euclidienne est inutile. Ce qui compte, c'est combien de cases tu dois traverser.

```js
function distanceManhattan(a, b) {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

// dans un jeu de plateau type village ninja :
// combien de déplacements pour aller de (1,1) à (4,5) ?
const depart = { x: 1, y: 1 };
const arrivee = { x: 4, y: 5 };

console.log(distanceManhattan(depart, arrivee));
// => 3 + 4 = 7 déplacements

// utilisé comme heuristique dans A* pour accélérer le pathfinding
```

Quand utiliser quoi :

```
distance euclidienne --> espace continu (canvas, physique, 3D)
distance manhattan  --> grille de cases (jeux de plateau, pathfinding, maps)
distance au carré   --> comparaison relative sans besoin de la valeur exacte
```

---

## 10) HEATMAP BASIQUE : AGRÉGER DES POINTS

Cas réel : tu as des milliers de clics shinobi sur une page. Tu veux savoir quelles zones sont les plus touchées.

```js
function genererHeatmap(clics, largeur, hauteur, resolution = 50) {
  // divise l'espace en cellules de taille "resolution"
  const cols = Math.ceil(largeur / resolution);
  const rows = Math.ceil(hauteur / resolution);

  // initialiser la grille à zéro
  const grille = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (const clic of clics) {
    const col = Math.floor(clic.x / resolution);
    const row = Math.floor(clic.y / resolution);

    // vérifier les bornes avant d'accéder
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      grille[row][col]++;
    }
  }

  return grille;
}

const clicsSpectateurs = [
  { x: 120, y: 80 },
  { x: 125, y: 85 },
  { x: 300, y: 200 },
  { x: 118, y: 79 },
  { x: 122, y: 82 },
  { x: 301, y: 201 },
];

const heatmap = genererHeatmap(clicsSpectateurs, 500, 400, 100);
// la zone autour de (120,80) aura un score de 4
// la zone autour de (300,200) aura un score de 2
```

---

## EXERCICES

## EXO 1 : LE RADAR DE RECONNAISSANCE NINJA

Naruto est en mission de reconnaissance près de Konoha. Des ennemis approchent de plusieurs directions. Tu as les positions de 5 ennemis et la position du shinobi.

**Mission :**

- Trouver l'ennemi le plus proche du shinobi
- Lister tous les ennemis qui sont à moins de 200 unités (portée d'un kunaï lancé)
- Calculer la direction normalisée vers chaque ennemi (pour orienter les kunaï)

**Contrainte :** pas de `Math.sqrt` dans la comparaison pour trouver le plus proche (utilise la distance au carré).

---

## EXO 2 : SYSTÈME DE COLLISION DU TOURNOI DE CHUNIN

Un mini-jeu de combat 2D. Naruto et ses adversaires sont des cercles avec une position et un rayon (selon leur taille).

**Mission :**

- Détecter si Naruto entre en collision avec un adversaire
- Calculer le vecteur de "rebond" quand deux personnages se heurtent (vecteur de A vers B normalisé, inversé)
- Implémenter un système de détection pour N personnages en même temps

**Contrainte :** O(n²) est acceptable pour 10 personnages. À partir de 100, signale que ça devient un problème.

---

## EXO 3 : CAMÉRA SMOOTH FOLLOW

Tu builds un mini-jeu de football. La caméra doit suivre le ballon. Mais si elle se téléporte instantanément, c'est brutal.

**Mission :**

- Implémenter une caméra qui utilise `lerp` pour suivre le ballon avec un délai
- La caméra doit rester dans les bornes du terrain (ne pas sortir de la map)
- Quand le ballon est immobile, la caméra doit converger exactement sur lui (pas osciller autour)

**Indice :** si `distance(camera, ballon) < 0.5`, clamp directement sur la position du ballon.

---

## EXO 4 : HEATMAP DE PASSES

T'as les données d'un match de Ligue des Champions. 847 passes enregistrées avec leurs coordonnées de départ.

**Mission :**

- Générer une heatmap sur un terrain de 105x68 mètres avec une résolution de 10m
- Trouver les 3 zones les plus actives
- Calculer le centre de gravité de toutes les passes (moyenne des x, moyenne des y)

---

## CORRIGÉS DE RÉFÉRENCE : À CONSULTER APRÈS UNE TENTATIVE

Les coordonnées de ces quatre exercices sont des coordonnées cartésiennes dans le même repère et la même unité. Le code refuse les coordonnées invalides au lieu de les corriger silencieusement.

### Corrigé EXO 1 : radar de reconnaissance

```js
function distanceCarree(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function normaliserDirection(depart, cible) {
  const dx = cible.x - depart.x;
  const dy = cible.y - depart.y;
  const longueur = Math.hypot(dx, dy);
  return longueur === 0
    ? { x: 0, y: 0 }
    : { x: dx / longueur, y: dy / longueur };
}

export function analyserRadar(shinobi, ennemis, portee = 200) {
  if (
    !Array.isArray(ennemis) ||
    ennemis.length !== 5 ||
    !Number.isFinite(portee) ||
    portee < 0
  ) {
    throw new RangeError(
      "Le radar attend cinq ennemis et une portée positive ou nulle.",
    );
  }
  const points = [shinobi, ...ennemis];
  if (!points.every((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y))) {
    throw new TypeError(
      "Toutes les positions doivent contenir des coordonnées finies.",
    );
  }
  const mesures = ennemis.map((ennemi) => ({
    ennemi,
    distanceCarree: distanceCarree(shinobi, ennemi),
    direction: normaliserDirection(shinobi, ennemi),
  }));
  const plusProche = mesures.reduce((best, item) =>
    item.distanceCarree < best.distanceCarree ? item : best,
  );
  return {
    plusProche: plusProche.ennemi,
    ennemisAPortee: mesures
      .filter((item) => item.distanceCarree < portee ** 2)
      .map((item) => item.ennemi),
    directions: mesures.map(({ ennemi, direction }) => ({ ennemi, direction })),
  };
}
```

La portée est strictement « moins de 200 » : un ennemi exactement à 200 unités n'est pas inclus. Si le métier inclut la frontière, remplace `<` par `<=`. La distance au carré permet de comparer sans calculer `Math.sqrt`.

### Corrigé EXO 2 : collisions de cercles

```js
function validerCercle(cercle) {
  if (
    !cercle ||
    !Number.isFinite(cercle.x) ||
    !Number.isFinite(cercle.y) ||
    !Number.isFinite(cercle.radius) ||
    cercle.radius < 0
  ) {
    throw new TypeError(
      "Un cercle exige x, y et un rayon fini positif ou nul.",
    );
  }
}

export function collisionEntreCercles(a, b) {
  validerCercle(a);
  validerCercle(b);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const sommeRayons = a.radius + b.radius;
  // Le contact compte comme collision : convention inclusive.
  return dx * dx + dy * dy <= sommeRayons * sommeRayons;
}

export function vecteurRebond(a, b) {
  validerCercle(a);
  validerCercle(b);
  const dx = a.x - b.x; // de B vers A : normale qui éloigne A de B
  const dy = a.y - b.y;
  const longueur = Math.hypot(dx, dy);
  // Centres confondus : aucune normale géométrique unique n'existe.
  return longueur === 0 ? null : { x: dx / longueur, y: dy / longueur };
}

export function detecterCollisions(personnages) {
  if (!Array.isArray(personnages))
    throw new TypeError("personnages doit être un tableau");
  personnages.forEach(validerCercle);
  const collisions = [];
  for (let i = 0; i < personnages.length; i++) {
    for (let j = i + 1; j < personnages.length; j++) {
      if (collisionEntreCercles(personnages[i], personnages[j])) {
        collisions.push({
          a: personnages[i],
          b: personnages[j],
          rebond: vecteurRebond(personnages[i], personnages[j]),
        });
      }
    }
  }
  return collisions;
}
```

Cette méthode compare toutes les paires : O(n²). Elle convient au scénario de dix personnages. Vers cent personnages, le nombre de paires augmente fortement ; un système de partition spatiale (grille, quadtree ou autre broad phase, c'est-à-dire présélection des paires candidates) devient à évaluer. Si les centres coïncident, `rebond` vaut `null` : le moteur doit alors choisir une séparation déterministe, pas inventer une direction géométrique.

### Corrigé EXO 3 : caméra smooth follow

Pour garder l'exercice indépendant d'un moteur de jeu, la caméra est ici représentée par un point d'ancrage dans les limites du terrain, non par un viewport complet. `alpha` est compris entre 0 et 1 ; la caméra ne dépasse pas la cible. Le seuil de 0,5 évite une convergence infinie en virgule flottante.

```js
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function updateCamera(camera, ballon, terrain, alpha = 0.1) {
  for (const point of [camera, ballon]) {
    if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new TypeError(
        "La caméra et le ballon doivent avoir des coordonnées finies.",
      );
    }
  }
  if (
    !terrain ||
    !Number.isFinite(terrain.width) ||
    !Number.isFinite(terrain.height) ||
    terrain.width < 0 ||
    terrain.height < 0
  )
    throw new RangeError("Terrain invalide");
  if (!Number.isFinite(alpha) || alpha <= 0 || alpha > 1)
    throw new RangeError("alpha doit être dans ]0, 1]");

  const cible = {
    x: clamp(ballon.x, 0, terrain.width),
    y: clamp(ballon.y, 0, terrain.height),
  };
  const actuelle = {
    x: clamp(camera.x, 0, terrain.width),
    y: clamp(camera.y, 0, terrain.height),
  };
  if (distance(actuelle, cible) < 0.5) return cible;
  const prochaine = {
    x: actuelle.x + (cible.x - actuelle.x) * alpha,
    y: actuelle.y + (cible.y - actuelle.y) * alpha,
  };
  return {
    x: clamp(prochaine.x, 0, terrain.width),
    y: clamp(prochaine.y, 0, terrain.height),
  };
}
```

Si le ballon est à l'extérieur du terrain, la cible utilisée est sa position clampée sur le bord. Dans un vrai jeu, le centre de la caméra doit aussi tenir compte de la taille du viewport : ses bornes deviennent alors `largeurViewport / 2` à `largeurTerrain - largeurViewport / 2` (idem pour y). Cette contrainte peut empêcher le centre d'être exactement sur le ballon près d'un bord ; la promesse doit être formulée comme « suivre la cible autorisée la plus proche ».

### Corrigé EXO 4 : heatmap des passes

La carte de 105 × 68 m avec une résolution de 10 m donne 11 colonnes et 7 lignes, car les dimensions ne sont pas des multiples exacts de la résolution. Les coordonnées sont dans `[0,105[` et `[0,68[` ; le bord supérieur/droit exact est exclu.

```js
export function analyserPassesHeatmap(
  passes,
  largeur = 105,
  hauteur = 68,
  resolution = 10,
) {
  if (!Array.isArray(passes) || passes.length === 0)
    throw new TypeError("Au moins une passe est requise");
  if (
    ![largeur, hauteur, resolution].every(Number.isFinite) ||
    largeur <= 0 ||
    hauteur <= 0 ||
    resolution <= 0
  ) {
    throw new RangeError(
      "Dimensions et résolution doivent être positives et finies",
    );
  }
  const colonnes = Math.ceil(largeur / resolution);
  const lignes = Math.ceil(hauteur / resolution);
  const grille = Array.from({ length: lignes }, () => Array(colonnes).fill(0));
  let sommeX = 0;
  let sommeY = 0;

  for (const passe of passes) {
    if (
      !passe ||
      !Number.isFinite(passe.x) ||
      !Number.isFinite(passe.y) ||
      passe.x < 0 ||
      passe.x >= largeur ||
      passe.y < 0 ||
      passe.y >= hauteur
    ) {
      throw new RangeError(
        "Une passe se trouve hors du terrain ou a des coordonnées invalides",
      );
    }
    const colonne = Math.floor(passe.x / resolution);
    const ligne = Math.floor(passe.y / resolution);
    grille[ligne][colonne]++;
    sommeX += passe.x;
    sommeY += passe.y;
  }

  const zones = [];
  for (let ligne = 0; ligne < lignes; ligne++) {
    for (let colonne = 0; colonne < colonnes; colonne++) {
      zones.push({ ligne, colonne, passes: grille[ligne][colonne] });
    }
  }
  zones.sort(
    (a, b) => b.passes - a.passes || a.ligne - b.ligne || a.colonne - b.colonne,
  );
  return {
    grille,
    troisZonesActives: zones.slice(0, 3),
    centre: { x: sommeX / passes.length, y: sommeY / passes.length },
  };
}
```

Les ex æquo sont départagés par ligne puis colonne pour que le résultat soit reproductible. Si les 847 passes sont requises dans le dataset final, vérifie cette cardinalité séparément avant l'appel ; la fonction reste réutilisable avec un échantillon plus petit.

---

## RÉSUMÉ

La géométrie en dev, c'est Pythagore + vecteurs + quelques formules. Pas de calcul intégral, pas de géométrie différentielle.

Ce que tu dois avoir en tête : les distances (euclidienne, Manhattan, au carré), les vecteurs (direction, normalisation, dot product), et les tests de collision (rect vs rect, cercle vs cercle, point dans zone). Le reste : lerp, angle, heatmap : c'est des combinaisons de ces outils de base.

Un canvas, une carte, un jeu, un dashboard interactif : tout ça tourne avec ce que tu viens de voir.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

## Transfert vérifiable : géométrie dans une interface et une API

Une distance dépend du repère et de l'unité. Des coordonnées écran en pixels ne sont pas des coordonnées géographiques ; une distance euclidienne sur latitude/longitude n'est pas une distance fiable sur de grandes zones. Les boîtes englobantes (bounding boxes, rectangles qui bornent une forme) permettent un préfiltre rapide, mais une collision exacte exige ensuite le test adapté à la forme.

**Exercice terrain.** Implémente `containsPoint(box, point)` avec bornes inclusives explicites. Ajoute `intersects(a, b)` pour deux rectangles axis-aligned. Teste point sur chaque bord, coin, rectangle nul, rectangles séparés d'une unité et rectangles qui se touchent.

**Vérification.** Fournis une table de cas attendus et 100 cas aléatoires comparés à une implémentation oracle simple. Les coordonnées doivent partager le même repère et la même unité ; sinon rejette l'entrée ou convertis-la avant le calcul.

**Lien aval.** Ces invariants sont réutilisables dans le rendu d'interface, les hitboxes, la cartographie et les validations géospatiales ; pour des distances terrestres, utiliser une formule géodésique adaptée ou une projection documentée.
