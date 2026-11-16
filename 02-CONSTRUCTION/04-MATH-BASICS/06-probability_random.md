---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Dragon Ball Z :** deux attaques paraissent identiques à l’œil nu, mais l’énergie réelle n’est pas la même. Les bits, arrondis et probabilités te forcent à regarder sous la surface.

> **CrazyDevs : tournoi de Konoha :** le problème n’est pas de gagner un duel, mais de ne pas faire combattre inutilement 10 000 adversaires quand une seule bonne stratégie suffit.

# Probability & random : le rng qui ne ment pas

Temps de lecture ~10 min

`Math.random()` retourne un nombre entre 0 et 1. C'est tout ce que la plupart des devs savent.
C'est pas assez.

Un système de drop rate dans un jeu, un A/B test équitable, un shuffle de playlist sans biais, une simulation de match : tout ça repose sur une compréhension correcte des probabilités et des distributions.
Sinon ton RNG ment. Il génère des résultats qui _semblent_ aléatoires mais qui ne le sont pas.

---

## 1) Math.random() : CE QU'IL FAIT VRAIMENT

`Math.random()` retourne un flottant dans `[0, 1)` (0 inclus, 1 exclu).
Il utilise un PRNG (Pseudo-Random Number Generator) : pas vraiment aléatoire, déterministe si on connaît la graine.

```js
Math.random(); // 0.7234...
Math.random(); // 0.1891...

// Transformer en entier entre min et max (inclus).
// Pratique pour une simulation, mais pas adapté à la sécurité ni à une preuve d'uniformité parfaite.
function randInt(min, max, random = Math.random) {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min > max) {
    throw new RangeError(
      "min et max doivent être des entiers sûrs avec min <= max",
    );
  }
  const range = max - min + 1;
  if (!Number.isSafeInteger(range))
    throw new RangeError(
      "l'intervalle demandé est trop large pour un tirage Number exact",
    );
  const value = random();
  if (!(value >= 0 && value < 1))
    throw new RangeError("random() doit retourner une valeur dans [0, 1)");
  return Math.floor(value * range) + min;
}

randInt(1, 6); // simule un dé : 1 à 6
randInt(0, 99); // pourcentage : 0 à 99

// piège classique :
Math.floor(Math.random() * 6) + 1; // correct : 1-6
Math.round(Math.random() * 6); // FAUX : 0 et 6 ont moitié moins de chances
```

**Pourquoi `Math.round` est biaisé :**

```text
Avec `Math.random() * 6`, les valeurs sont dans `[0, 6)` :
0     : [0.0, 0.5[ --> 0,5 / 6 = 1/12 ≈ 8,33%
1 à 5 : intervalle de largeur 1 chacun --> 1 / 6 ≈ 16,67% chacun
6     : [5.5, 6.0[ --> 0,5 / 6 = 1/12 ≈ 8,33%

0 et 6 ont donc moitié moins de chances que chacune des valeurs centrales.
`Math.floor(Math.random() * 6)` produit six intervalles de même largeur.
```

---

## 2) DISTRIBUTIONS : UNIFORM VS WEIGHTED

**Distribution uniforme** : chaque valeur a la même probabilité.
**Distribution pondérée** : certaines valeurs ont plus de chances que d'autres.

```js
// distribution uniforme : chaque ninja a 1/4 de chances
const ninjas = ["Naruto", "Sasuke", "Sakura", "Kakashi"];
const picked = ninjas[randInt(0, ninjas.length - 1)];

// distribution pondérée : Naruto est 3x plus probable que Sasuke
function weightedRandom(items) {
  // items = [{ value, weight }, ...]
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item.value;
  }
}

const result = weightedRandom([
  { value: "Naruto", weight: 60 }, // 60% de chances
  { value: "Sasuke", weight: 20 }, // 20%
  { value: "Sakura", weight: 15 }, // 15%
  { value: "Kakashi", weight: 5 }, // 5%
]);
```

**Visualisation du concept :**

```text
poids total = 100

0     60    80    95  100
|---------|---------|---------|-----|
 Naruto  Sasuke  Sakura Kakashi

random() * 100 --> tombe dans la zone --> résultat
```

---

## 3) SYSTÈMES DE DROP RATE : COMME DANS UN VRAI JEU

Un drop rate simple peut être modélisé par `Math.random() < taux`. Certains jeux ajoutent un _pity system_ (la probabilité augmente après des échecs) ou une distribution pseudo-aléatoire contrôlée. Ce sont des choix de conception, pas une règle universelle.

```js
// drop rate naïf : 1% de chances
function naiveDrop() {
  return Math.random() < 0.01; // peut échouer 500x de suite
}

// pity system : la probabilité augmente si on échoue
class PityDrop {
  constructor(baseRate, pityThreshold, random = Math.random) {
    if (
      typeof baseRate !== "number" ||
      !Number.isFinite(baseRate) ||
      baseRate < 0 ||
      baseRate > 1
    ) {
      throw new RangeError("baseRate doit être compris entre 0 et 1");
    }
    if (!Number.isSafeInteger(pityThreshold) || pityThreshold < 1) {
      throw new RangeError("pityThreshold doit être un entier positif");
    }
    if (typeof random !== "function")
      throw new TypeError("random doit être une fonction");
    this.baseRate = baseRate;
    this.pityThreshold = pityThreshold;
    this.random = random; // injectable pour des tests reproductibles
    this.attempts = 0;
  }

  roll() {
    this.attempts++;

    // Le pity garantit un drop à l'essai seuil, même si le tirage aléatoire échoue.
    if (this.attempts >= this.pityThreshold) {
      this.attempts = 0;
      return true;
    }

    const rampStart = Math.ceil(this.pityThreshold / 2);
    const rampEnd = this.pityThreshold - 1;
    let progressRate = this.baseRate;
    if (this.attempts >= rampStart && rampEnd >= rampStart) {
      const progress =
        (this.attempts - rampStart + 1) / (rampEnd - rampStart + 1);
      const targetRate = Math.max(this.baseRate, 0.5);
      progressRate = this.baseRate + progress * (targetRate - this.baseRate);
    }

    const draw = this.random();
    if (!(draw >= 0 && draw < 1))
      throw new RangeError("random() doit retourner une valeur dans [0, 1)");
    if (draw < progressRate) {
      this.attempts = 0;
      return true;
    }
    return false;
  }
}

const chakraDrop = new PityDrop(0.01, 100);
// un échec aux 99 premiers essais conduit à un drop garanti au 100e
// avec ce scénario, le taux commence à augmenter progressivement à partir du 50e essai
```

---

## 4) SHUFFLE SANS BIAIS : FISHER-YATES

Mélanger un tableau proprement, ça semble trivial. Le naïf `sort(() => Math.random() - 0.5)` est biaisé.

```js
// BIAISÉ : distribue les éléments inégalement
const squad = ["Naruto", "Sasuke", "Sakura", "Kakashi", "Rock Lee"];
squad.sort(() => Math.random() - 0.5);
// certaines permutations apparaissent plus souvent que d'autres

// CORRECT : Fisher-Yates shuffle
function fisherYates(arr) {
  const result = [...arr]; // on ne mute pas l'original
  for (let i = result.length - 1; i > 0; i--) {
    const j = randInt(0, i); // j dans [0, i]
    [result[i], result[j]] = [result[j], result[i]]; // swap
  }
  return result;
}

fisherYates(squad); // uniforme si randInt choisit réellement chaque entier de [0, i] avec la même probabilité
```

**Pourquoi `.sort()` est biaisé :**

```text
.sort() appelle le comparateur ~n*log(n) fois.
Chaque appel retourne un résultat aléatoire.
Mais .sort() n'est pas conçu pour ça : les éléments ne sont pas tous comparés entre eux.
Résultat : certaines permutations sont favorisées.

Fisher-Yates : on parcourt de droite à gauche, on échange chaque élément
avec un indice choisi uniformément dans [0, i]. Sous cette hypothèse, chaque permutation a une probabilité de 1/n!.
Avec `Math.random()` et le `randInt` pédagogique ci-dessus, on obtient un mélange pseudo-aléatoire pratique, pas une garantie cryptographique ou mathématique absolue.
```

---

## 5) LOI DES GRANDS NOMBRES : TESTER SON RNG

Avec un générateur pseudo-aléatoire adapté, les fréquences observées tendent à se rapprocher des probabilités théoriques quand le nombre d'essais augmente ; un test statistique ne prouve pas à lui seul l'absence de biais.

```js
// vérifier qu'un dé à 6 faces est équitable
function testDie(rollFn, trials = 100000) {
  const counts = {};

  for (let i = 0; i < trials; i++) {
    const roll = rollFn();
    counts[roll] = (counts[roll] || 0) + 1;
  }

  console.log("Distribution (théorique : 16.67% chacun) :");
  for (const [face, count] of Object.entries(counts)) {
    const pct = ((count / trials) * 100).toFixed(2);
    const bar = "█".repeat(Math.round((count / trials) * 100));
    console.log(`Face ${face}: ${pct}% ${bar}`);
  }
}

testDie(() => randInt(1, 6));
// Face 1: 16.72% ████████████████
// Face 2: 16.65% ████████████████
// ...
// si une face est à 25%, ton générateur est biaisé
```

---

## 6) RANDOM CRYPTOGRAPHIQUE : QUAND Math.random() NE SUFFIT PAS

`Math.random()` est prévisible : si un attaquant connaît la graine du PRNG, il peut prédire les prochains nombres.
Pour les tokens de session, les UUID, les codes de reset de mot de passe : utilise `crypto.getRandomValues`.

```js
// DANGEREUX pour du code de sécurité
const resetToken = Math.random().toString(36); // prédictible

// CORRECT : aléatoire cryptographiquement sûr
function secureToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

secureToken(); // "a3f92c1b8e4d7f0a..." imprévisible

// en Node.js :
import { randomBytes } from "crypto";
const token = randomBytes(32).toString("hex");
```

**Règle simple :**

```text
Math.random()     --> jeux, simulations, UI, shuffle de playlist
crypto.getRandomValues --> tokens, sessions, codes, tout ce qui a des implications de sécurité
```

---

## 7) DISTRIBUTION NORMALE : LE BELL CURVE

La plupart des phénomènes réels suivent une distribution normale (en cloche), pas uniforme.
Les stats de joueurs dans FIFA, les temps de réponse d'une API, les scores d'un examen.

```js
// Box-Muller transform : générer une distribution normale depuis Math.random()
function normalRandom(mean = 0, stdDev = 1) {
  const u1 = Math.random();
  const u2 = Math.random();
  // transformation mathématique qui produit une distribution en cloche
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

// générer des stats de joueur réalistes
function generatePlayerStats() {
  return {
    pace: Math.round(Math.min(99, Math.max(40, normalRandom(72, 10)))),
    shoot: Math.round(Math.min(99, Math.max(40, normalRandom(68, 12)))),
    stamina: Math.round(Math.min(99, Math.max(40, normalRandom(75, 8)))),
  };
}

// la majorité des joueurs sera autour de 68-76
// quelques extrêmes à 45 ou 95 : comme dans la vraie vie
```

---

## EXERCICES

## EXO 1 : LE SYSTÈME DE COMBAT DE NARUTO

Implémente un résolveur de combat qui détermine le résultat d'une attaque.
Chaque attaque a :

- un taux de coup critique (`critRate`) entre 0 et 1
- un taux d'esquive de l'adversaire (`dodgeRate`) entre 0 et 1
- des dégâts de base (`baseDamage`)

L'esquive est résolue en premier. Si l'attaque touche :

- les dégâts normaux = `baseDamage * (0.8 + Math.random() * 0.4)` (±20%)
- les dégâts critiques = dégâts normaux \* 1.75

Implémente `resolveAttack(attacker, defender)` et teste-le 10 000 fois pour vérifier que les probabilités sont correctes.

---

## EXO 2 : PLAYLIST SHUFFLE ÉQUITABLE

Bryson Tiller a 20 tracks dans sa playlist.
Il veut une fonction `createShuffleQueue(tracks)` qui :

- génère une queue mélangée avec Fisher-Yates
- garantit que chaque track joue exactement une fois avant de recommencer
- si la même track serait en première position deux fois de suite (fin de cycle → début de suivant), la swap avec une position aléatoire

(Hint : garde en mémoire la dernière track jouée)

---

## EXO 3 : A/B TEST REPRODUCTIBLE

T'as un système d'A/B test pour ton projet fil rouge.
Les shinobis sont assignés au groupe A ou B selon leur `userId`.

Implémente `assignVariant(userId, experimentId, ratio = 0.5)` qui :

- produit la même assignation pour le même `userId + experimentId` (reproductible)
- distribue les shinobis selon le ratio (0.5 = 50/50, 0.3 = 30% groupe A)
- utilise un hash du userId+experimentId pour déterminer l'assignation (pas Math.random)

(Hint : hash(userId + experimentId) % 100 < ratio \* 100 --> groupe A)

---

## RÉSUMÉ

`Math.random()` est uniform et prévisible : bon pour les jeux, interdit pour la sécurité.
`.sort(() => Math.random() - 0.5)` est biaisé : Fisher-Yates est l'algo correct pour mélanger.
Les distributions pondérées permettent de contrôler les probabilités sans biais.
La loi des grands nombres : tester son RNG sur 100k itérations révèle les biais cachés.
`crypto.getRandomValues` pour tout ce qui touche à la sécurité : tokens, sessions, codes.
Box-Muller transform si t'as besoin d'une distribution normale depuis `Math.random()`.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Transfert vérifiable : aléatoire de production et simulation

La probabilité décrit une distribution, pas une promesse sur un petit échantillon. Une probabilité de 1 % ne garantit pas exactement dix succès sur mille essais. Distingue trois besoins : tirage reproductible pour les tests (graine déterministe), simulation statistique (PRNG documenté) et secret imprévisible (CSPRNG fourni par une API cryptographique). `Math.random()` convient à une simulation ordinaire, pas à un jeton, une session ou un secret.

**Exercice terrain.** Construis une fonction `chooseWeighted(options, rng)` injectable. Teste un RNG déterministe qui retourne une séquence connue, puis simule 20 000 choix avec une distribution 1:3. La fonction doit refuser poids négatifs, poids non finis et somme nulle.

**Vérification.** Le test déterministe doit être exact ; le test statistique doit utiliser une tolérance annoncée et ne doit pas échouer à cause d'une graine différente ; le test de validation doit couvrir `NaN`, `Infinity` et somme nulle. N'utilise jamais une fréquence observée comme preuve de sécurité cryptographique.

**Lien aval.** Les graines et distributions servent aux algorithmes et aux tests de charge ; les jetons et secrets relèvent des modules auth/sécurité, pas d'un PRNG de simulation.

<!-- AF-LESSON-PROFILE: math -->

## Repères de décision

- **Pourquoi :** Les maths rendent explicites la capacité, l'incertitude, le coût et les limites d'un algorithme. Elles évitent de décider au feeling quand le système grandit.
- **Quand l’utiliser / quand l’éviter :** Utilise la formule adaptée à la question (capacité, probabilité, hachage, logique ou combinatoire). Vérifie unités et hypothèses avant de coder ; ne sors pas une formule parce qu'elle a l'air savante.
- **Limites :** Un calcul exact sur des hypothèses fausses donne une réponse fausse. Les données réelles ont bruit, biais et limites d'échantillonnage ; une simulation n'est pas une mesure de terrain.

## Mécanisme : la version sans magie

Définis les variables, unités et domaine de validité ; dérive ou explique la formule ; calcule un cas de base, un cas limite et une sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Probability & random : le rng qui ne ment pas** se rattache à ce cas concret : Kintana doit dimensionner les créneaux, estimer une charge de notification ou choisir un seuil de contrôle sans masquer l'incertitude.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décision quantitative pour la capacité Kintana

> **Arc DBZ / Capsule Corp. :** les chiffres ne sont pas de la déco. Une formule mal choisie peut envoyer tout le système dans le mur, même si le code compile.

**Mission liée à « Probability & random : le rng qui ne ment pas » :** Choisis une question chiffrée cohérente avec la notion : capacité de créneaux, probabilité de collision, taille d'un espace de recherche ou seuil d'alerte. Formalise les hypothèses et compare deux scénarios.

**Livrable :** un calcul reproductible (tableur ou script), les unités, hypothèses, sensibilité et une décision argumentée.

**Critères d’acceptation :** les dimensions sont cohérentes ; le résultat est vérifié par un cas simple ; les hypothèses et l'incertitude sont exposées ; aucune précision injustifiée n'est revendiquée.

**Transfert obligatoire :** Change le volume ou le taux de base et observe si la décision reste la même. Explique le point où elle bascule.
