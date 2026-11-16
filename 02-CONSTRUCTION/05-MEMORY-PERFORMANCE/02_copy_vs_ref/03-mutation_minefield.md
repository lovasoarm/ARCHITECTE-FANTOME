---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Prison Break :** le tunnel fuit lentement. Personne ne voit la panne au premier tour. Puis la cellule se remplit. Une fuite mémoire est souvent exactement aussi discrète.

> **CrazyDevs : jauge de chakra :** si tu optimises sans mesurer, tu dépenses ton chakra sur le mauvais ennemi. Mesure d’abord, attaque ensuite.

# Mutation minefield : toucher un objet et tout casser ailleurs

<!-- AF-DIAGRAM:mutation -->

```text
Référence A ───────────────┐
                           ▼
                    Objet partagé
                           ▲
Référence B ───────────────┘
                           │ mutation via A
                           ▼
              B observe aussi le nouvel état
```

Une affectation d'objet copie sa référence, pas son contenu. Si A et B désignent le même objet, une mutation faite via A est visible via B.

Temps de lecture ~9 min

T'as modifié un objet. T'as rien d'autre touché. Et pourtant, trois fonctions différentes dans trois fichiers différents ont un comportement bizarre depuis ce matin.

C'est le champ de mines de la mutation. Pas de crash. Pas d'erreur. Juste un état qui dérive sans qu'on sache pourquoi : parce que plusieurs parties du code partagent silencieusement le même objet.

Ce fichier, c'est la carte du champ. On repère les mines. On apprend à traverser sans exploser.

---

## 1) LA MUTATION SILENCIEUSE

Une mutation, c'est modifier un objet existant en place. Le problème : si plusieurs variables ou fonctions pointent vers cet objet, elles voient toutes la modification : même celles qui ne devaient pas.

```js
// Le squad de Naruto
const squad = { name: "Konoha", members: 104, leader: "Hokage" };

function promote(s) {
  s.leader = "Tsunade"; // mutation directe du paramètre
  return s;
}

const promoted = promote(squad);

console.log(promoted.leader); // → "Tsunade":attendu
console.log(squad.leader); // → "Tsunade":PAS attendu
// squad et promoted sont le même objet
```

Le paramètre `s` n'est pas une copie de `squad`. C'est la même référence.
Modifier `s.leader` modifie l'objet original.

```text
AVANT promote
─────────────
squad ──────────┐
        ▼
promoted ──────►{ leader: "Hokage" }

PENDANT promote (s = squad)
───────────────────────────
s ──────────────► { leader: "Tsunade" }
             ▲
squad ─────────────────►─┘
promoted ──────────────►─┘

Tous les trois pointent vers le même objet muté.
```

---

## 2) LES MINES LES PLUS COURANTES

### Mine #1 : Modifier un paramètre objet

```js
// Mauvais
function addBonus(player, bonus) {
  player.score += bonus; // mute le paramètre:l'original change
  return player;
}

// Bon
function addBonus(player, bonus) {
  return { ...player, score: player.score + bonus }; // nouvel objet
}
```

---

### Mine #2 : Pusher dans un tableau partagé

```js
// Les logs de Fox River:partagés entre modules
const logs = [];

// Module A
function logEntry(entry) {
  logs.push(entry); // mute le tableau partagé
}

// Module B lit les logs
function getLogs() {
  return logs; // retourne la référence directe:pas une copie
}

// Problème : quiconque a le résultat de getLogs() peut muter logs
const myLogs = getLogs();
myLogs.push("fake entry"); // ← mute aussi `logs`
console.log(logs.length); // impacté

// Correction
function getLogs() {
  return [...logs]; // retourne une copie:l'appelant ne peut pas muter l'original
}
```

---

### Mine #3 : L'initialisation d'objet partagée

```js
// Ce paramètre par défaut est évalué à chaque appel : les objets ne sont PAS partagés.
function createNinja(name, options = { level: 1, village: "Konoha" }) {
  options.name = name;
  return options;
}

const ninja1 = createNinja("Naruto");
const ninja2 = createNinja("Sasuke");
console.log(ninja1 === ninja2); // false
console.log(ninja1.name, ninja2.name); // Naruto Sasuke

// Un partage réel apparaît si la même référence est réutilisée explicitement.
const sharedOptions = { level: 1, village: "Konoha" };
function createNinjaWithSharedDefault(name, options = sharedOptions) {
  options.name = name;
  return options;
}
const sharedNaruto = createNinjaWithSharedDefault("Naruto");
const sharedSasuke = createNinjaWithSharedDefault("Sasuke");
console.log(sharedNaruto === sharedSasuke); // true : même objet réutilisé
```

```js
// Correction : recréer l'objet à chaque appel
function createNinja(name, options = {}) {
  return { level: 1, village: "Konoha", ...options, name };
}
```

---

### Mine #4 : Sort qui mute le tableau original

```js
const scores = [85, 92, 78, 95, 88];

// Array.prototype.sort mute le tableau
const sorted = scores.sort((a, b) => b - a);

console.log(scores); // → [95, 92, 88, 85, 78]:MUTÉ
console.log(sorted); // → [95, 92, 88, 85, 78]
// sorted et scores sont le même tableau
```

```js
// Correction
const sorted = [...scores].sort((a, b) => b - a);
// ou en 2023+
const sorted = scores.toSorted((a, b) => b - a); // retourne une nouvelle copie
```

Les méthodes mutantes à connaître :

- `sort()`, `reverse()` → utilisent `toSorted()`, `toReversed()`
- `push()`, `pop()`, `shift()`, `unshift()`, `splice()` → utiliser spread + concat pour les alternatives immutables
- `fill()` → mute le tableau en place et retourne la même référence ; pour préserver l'original, utiliser `[...arr].fill(value)`

---

### Mine #5 : La closure qui capture et mute

```js
// Système de statistiques de match
function createMatchStats(initialStats) {
  let stats = initialStats; // référence vers l'objet passé en paramètre

  return {
    addGoal(team) {
      stats.score[team]++; // mute l'objet original passé à createMatchStats
    },
    getStats() {
      return stats;
    },
  };
}

const liveStats = { score: { home: 0, away: 0 }, events: [] };
const tracker = createMatchStats(liveStats);

tracker.addGoal("home");
console.log(liveStats.score.home); // → 1:liveStats est muté depuis l'extérieur
```

```js
// Correction : copier à l'entrée, isoler l'état interne
function createMatchStats(initialStats) {
  let stats = structuredClone(initialStats); // copie profonde:isolé

  return {
    addGoal(team) {
      stats = {
        ...stats,
        score: { ...stats.score, [team]: stats.score[team] + 1 },
      };
    },
    getStats() {
      return structuredClone(stats);
    }, // copie à la sortie aussi
  };
}
```

---

## 3) `Object.freeze` : INTERDIRE LA MUTATION

`Object.freeze` rend un objet non-modifiable. Toute tentative de mutation échoue silencieusement (ou lance une `TypeError` en strict mode).

```js
const config = Object.freeze({
  apiUrl: "https://foxriver.api",
  timeout: 5000,
  maxRetries: 3,
});

config.timeout = 10000; // silencieusement ignoré (ou TypeError en strict mode)
config.newProp = "test"; // ignoré

console.log(config.timeout); // → 5000
```

**Attention : `freeze` est shallow.** Les objets imbriqués restent mutables.

```js
const frozenNinja = Object.freeze({
  name: "Naruto",
  stats: { power: 9000 }, // pas freezé
});

frozenNinja.name = "Sasuke"; // ignoré:OK
frozenNinja.stats.power = 0; // fonctionne:stats n'est pas freezé
console.log(frozenNinja.stats.power); // → 0
```

Pour une configuration composée uniquement d'objets simples et de tableaux, on peut parcourir les références avec un `WeakSet` pour éviter les boucles. Attention : `Object.freeze(new Map())` n'empêche pas `map.set()` ; `Map` et `Set` exigent un contrat ou un wrapper dédié. Ce helper refuse donc explicitement les collections et les instances non prises en charge.

```js
function deepFreezePlain(value, seen = new WeakSet()) {
  if (value === null || typeof value !== "object" || seen.has(value))
    return value;
  const proto = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && proto !== Object.prototype && proto !== null) {
    throw new TypeError(
      "deepFreezePlain accepte seulement objets simples et tableaux",
    );
  }
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    deepFreezePlain(value[key], seen);
  }
  return Object.freeze(value);
}

const frozenConfig = deepFreezePlain({
  server: { host: "localhost", port: 3000 },
  db: { name: "foxriver" },
});
frozenConfig.server.port = 9999; // en strict mode : TypeError ; sinon écriture ignorée
console.log(frozenConfig.server.port); // 3000
```

---

## 4) LE PATTERN IMMUTABLE : PENSER EN TRANSFORMATIONS

Au lieu de muter l'état, retourner toujours un nouvel état. C'est le principe fondamental de Redux, Zustand, et de tout système de state management.

```js
// STYLE MUTATIF:dangereux
function addSurvivor(camp, survivor) {
  camp.survivors.push(survivor); // mute camp directement
  camp.headcount++;
  return camp;
}

// STYLE IMMUTABLE:prévisible
function addSurvivor(camp, survivor) {
  return {
    ...camp,
    survivors: [...camp.survivors, survivor],
    headcount: camp.headcount + 1,
  };
}

// Usage
const campV1 = { name: "Prison", survivors: ["Rick"], headcount: 1 };
const campV2 = addSurvivor(campV1, "le sniper");

console.log(campV1.headcount); // → 1:intact
console.log(campV2.headcount); // → 2:nouvel état
```

Les deux états coexistent. Tu peux comparer l'historique. Tu peux revenir en arrière. C'est pour ça que les apps React avec une immutabilité stricte sont plus faciles à débugger.

---

## EXERCICES

### EXO 1 : LOCALISER LES MINES

Chaque bloc de code ci-dessous contient une mutation silencieuse. Identifie-la et propose la correction.

```js
// Bloc A
function setActiveNinja(roster, name) {
  roster.active = name;
  return roster;
}

// Bloc B
function topScorers(players, n) {
  return players.sort((a, b) => b.goals - a.goals).slice(0, n);
}

// Bloc C
function applyDebuff(ninja, debuff) {
  ninja.stats.power -= debuff.damage;
  ninja.stats.speed -= debuff.slow;
  return ninja;
}

// Bloc D
const defaultConfig = { retries: 3, timeout: 5000 };
function createRequest(url, options = defaultConfig) {
  options.url = url;
  return options;
}
createRequest("/api/enter_dojo");
createRequest("/api/data");
```

---

### EXO 2 : LE REDUCER DU CAMP

Implémente un `campReducer(state, action)` qui gère l'état du camp de Rick Grimes sans jamais muter `state`. Chaque action retourne un nouvel état.

```js
const initialState = {
  name: "Prison",
  resources: { food: 50, ammo: 200 },
  survivors: ["Rick", "le sniper", "Glenn"],
  threatLevel: "low",
};

// Actions à gérer :
// { type: "ADD_SURVIVOR", payload: "Michonne" }
// { type: "CONSUME_FOOD", payload: 10 }
// { type: "SET_THREAT", payload: "high" }
// { type: "REMOVE_SURVIVOR", payload: "Glenn" }  ← spoiler
```

**Ta mission :** implémenter `campReducer`, tester chaque action, et vérifier que `initialState` reste intact après chaque appel.

---

### EXO 3 : DEEP FREEZE EN PROD

Dans le système de config du serveur de Fox River, n'importe quel module peut accidentellement modifier la config globale. Implémente `createImmutableConfig(config)` selon un contrat explicite :

1. Accepte uniquement des objets simples (`Object` ou `null` comme prototype) et des tableaux ; refuse clairement `Map`, `Set`, `Date`, les instances de classes, les fonctions et les propriétés accesseurs non prises en charge.
2. Détache la configuration de l'objet fourni par l'appelant (copie du graphe accepté) afin qu'une référence externe vers l'objet initial ne contourne pas le proxy.
3. Retourne un proxy récursif : lire une propriété imbriquée doit aussi renvoyer une vue protégée. Utilise un `WeakMap` pour conserver l'identité des proxys, les références partagées et les cycles sans récursion infinie.
4. Intercepte au minimum `set`, `deleteProperty`, `defineProperty` et `setPrototypeOf`. Chaque tentative doit produire un diagnostic avec le chemin et l'opération, puis être refusée de manière déterministe (par exemple en lançant une `TypeError` explicite).
5. N'appelle pas `Object.freeze()` sur les cibles avant de les envelopper : cela complique les invariants des proxys et peut empêcher le trap `get` de renvoyer les proxys imbriqués attendus. La protection repose ici sur les traps récursifs et sur l'absence de référence brute accessible.

**Preuves obligatoires :** teste une affectation sur la racine, une affectation imbriquée (`config.server.port`), `delete`, `Object.defineProperty`, une mutation de tableau (`push`), une référence partagée, un cycle, une tentative de mutation via l'objet initial et un type explicitement refusé. Le test doit démontrer que les valeurs protégées restent inchangées et que chaque tentative refusée est diagnostiquée.

**Limites à écrire :** ce contrat ne couvre pas automatiquement les objets exotiques ou les effets de bord cachés dans des getters ; ils sont refusés, pas silencieusement acceptés. Un proxy récursif n'est pas une frontière de sécurité contre du code hostile disposant d'autres capacités d'accès au processus.

---

## RÉSUMÉ

En JS, affecter un objet à une variable ou le passer à une fonction copie la référence, pas l’objet. Deux variables peuvent donc désigner le même objet. Les méthodes `sort()`, `reverse()`, `push()` et `splice()` modifient le tableau en place : crée une copie si tu veux préserver l’original. `Object.freeze` est superficiel : il ne protège pas automatiquement les objets imbriqués. Une copie profonde doit être choisie selon les types de données et les contraintes ; `structuredClone` ne prend pas en charge tous les types ni tous les comportements. L’immutabilité réduit les effets de bord, sans être une garantie automatique d’absence de bug.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Transfert : changer de contexte

Applique le mécanisme de « Mutation minefield : toucher un objet et tout casser ailleurs » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Mutation minefield : toucher un objet et tout casser ailleurs** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Repérer les mutations qui fuient entre parcours

**Mission liée à « Mutation minefield : toucher un objet et tout casser ailleurs » :** Passe en revue un parcours Kintana qui trie, filtre et met à jour des objets partagés. Identifie les appels mutables, reproduis une fuite d’état, puis remplace seulement les mutations qui violent le contrat.

**Livrable :** Liste des mutations, reproduction, correctif ciblé et tests de non-mutation.

**Critères d’acceptation :** Les mutations intentionnelles restent explicites ; les tests vérifient l’entrée et les autres consommateurs ; aucune copie inutile n’est ajoutée sans raison.

**Transfert obligatoire :** Un objet doit réellement être modifié : indique où la mutation est autorisée et qui en possède la responsabilité.
