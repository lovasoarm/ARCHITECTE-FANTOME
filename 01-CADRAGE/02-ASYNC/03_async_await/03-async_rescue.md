---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, preuve_partielle]
anti_recipe_key: solution_concurrente+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# Async rescue : sauver ce qui peut l'être

Temps de lecture ~9 min

Une opération async peut rater pour 100 raisons différentes.
Le réseau coupe. L'API timeout. Le serveur répond 500. Le JSON est malformé.
Sans stratégie de gestion d'erreur : ton app crash en silence et l'utilisateur ne sait rien.

Ce fichier : comment attraper, décider, et survivre.

---

## 1) `try/catch` EN ASYNC : LA BRIQUE DE BASE

Avec les Promises, les erreurs se catchent dans `.catch()`.
Avec `async/await`, elles se catchent dans un `try/catch` classique.

```js
// version Promise
fetchKnight("leon")
  .then((data) => console.log(data))
  .catch((err) => console.error("Leon est tombé :", err));

// version async/await
async function getKnight() {
  try {
    const data = await fetchKnight("leon");
    console.log(data);
  } catch (err) {
    // si fetchKnight() rejette : on arrive ici
    console.error("Leon est tombé :", err);
  }
}
```

Le `catch` attrape n'importe quelle erreur qui se passe dans le `try` :
rejets de Promise, erreurs réseau, erreurs de parsing JSON : tout.

---

## 2) CE QUE `try/catch` NE CATCH PAS

```js
async function getKnight() {
  try {
    // fetchKnight démarre...
    const promise = fetchKnight("leon");

    // ...mais on n'await pas
    // si la Promise rejette : personne ne l'attrape
    // le catch ci-dessous ne sera JAMAIS appelé
  } catch (err) {
    console.error(err); // jamais exécuté
  }
}
```

**Règle :** `try/catch` attrape uniquement les Promises que tu `await`.
Une Promise non-awaitée qui rejette = une `UnhandledPromiseRejection`.

---

## 3) GÉRER PLUSIEURS `await` DANS UN SEUL `try`

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

```js
async function executeHorrorMission(horrorId) {
  try {
    const horror = await detectHorror(horrorId); // peut rater
    const knight = await dispatchKnight(horror.zone); // peut rater
    const result = await startCombat(knight, horror); // peut rater
    return result;
  } catch (err) {
    // on sait qu'il y a eu une erreur, mais laquelle ?
    // detectHorror ? dispatchKnight ? startCombat ?
    // impossible à savoir sans info supplémentaire
    console.error("mission échouée :", err.message);
  }
}
```

Un seul `try` pour tout : pratique, mais tu perds la granularité.
Si tu as besoin de savoir exactement où ça a raté :

```js
async function executeHorrorMission(horrorId) {
  let horror;
  try {
    horror = await detectHorror(horrorId);
  } catch (err) {
    throw new Error(`Détection échouée pour ${horrorId} : ${err.message}`);
  }

  let knight;
  try {
    knight = await dispatchKnight(horror.zone);
  } catch (err) {
    throw new Error(
      `Dispatch échoué pour zone ${horror.zone} : ${err.message}`,
    );
  }

  try {
    return await startCombat(knight, horror);
  } catch (err) {
    throw new Error(
      `Combat échoué : ${knight.name} vs ${horror.name} : ${err.message}`,
    );
  }
}
```

Plus verbeux, mais les logs racontent une histoire.

---

## 4) RETRY : RETENTER AVANT D'ABANDONNER

<!-- AF-DIAGRAM:retry -->

```text
┌────────┐   fail   ┌─────────┐   wait   ┌────────┐
│ call 1 │─────────►│ backoff │────────►│ call 2 │
└────────┘          └─────────┘          └────┬───┘
                                              │ fail
                                              ▼
                                        wait plus long
```

Un retry sain combine décision de retry, délai de backoff et limite d’essais pour éviter d’amplifier la panne.

Certaines erreurs sont temporaires : timeout réseau, 503 passager, rate limit.
Renoncer au premier échec : souvent la mauvaise décision.

```js
// Retry borné : seules les erreurs explicitement jugées temporaires sont rejouées.
// Le nombre d'appels inclut la première tentative. Utilise ce helper pour une lecture
// rejouable ou une opération rendue idempotente par un contrat vérifié.
async function withRetry(
  fn,
  { maxAttempts = 3, baseDelayMs = 500, shouldRetry = () => false } = {},
) {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts doit être un entier >= 1");
  }
  if (
    !Number.isFinite(baseDelayMs) ||
    baseDelayMs < 0 ||
    typeof shouldRetry !== "function"
  ) {
    throw new TypeError("baseDelayMs ou shouldRetry invalide");
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      const decision = shouldRetry(error);
      if (typeof decision !== "boolean") {
        throw new TypeError(
          "shouldRetry doit retourner un booléen de façon synchrone",
        );
      }
      if (!decision) throw error;
      const plafond = Math.min(30_000, baseDelayMs * 2 ** (attempt - 1));
      const delai = Math.random() * plafond; // backoff exponentiel plafonné + jitter
      console.warn(
        `Tentative ${attempt}/${maxAttempts} échouée : ${error.message}`,
      );
      await new Promise((resolve) => setTimeout(resolve, delai));
    }
  }
  throw new Error(
    "État inaccessible : la boucle doit toujours retourner ou lever",
  );
}

// Lecture illustrative : le prédicat dépend des erreurs normalisées par le client HTTP.
// Une erreur HTTP 404 n'est pas transitoire.
async function getKnightWithRetry() {
  return withRetry(() => fetchKnight("leon"), {
    maxAttempts: 3,
    baseDelayMs: 500,
    shouldRetry: (error) =>
      error.name === "NetworkError" || error.status === 503,
  });
}
```

---

## 5) TIMEOUT : NE PAS ATTENDRE ÉTERNELLEMENT

Une Promise sans timeout peut attendre indéfiniment. L'utilisateur attend. L'UI freeze.

```js
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      const error = new Error(`Timeout après ${ms}ms`);
      error.name = "TimeoutError";
      reject(error);
    }, ms);
  });

  // Promise.race : le premier qui se règle gagne.
  // Le timer est nettoyé si l'une des branches se termine.
  // Si le timeout gagne, l'opération originale continue : Promise.race ne l'annule pas.
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

// si fetchMission prend plus de 3s : erreur de timeout côté appelant.
// Ce wrapper ne stoppe pas fetchMission : préfère lui transmettre un AbortSignal
// si son API sait réellement interrompre la requête côté client. Même un abort
// côté client ne prouve pas que le serveur n'a pas déjà appliqué une écriture.
// Cet exemple suppose que fetchMission est une lecture sans effet métier.
async function getMissionSafe() {
  try {
    const mission = await withTimeout(fetchMission("leon"), 3000);
    return mission;
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.error(
        "Leon dépasse la limite d'attente. On envoie Rei ; l'appel de Leon peut encore tourner.",
      );
      return fetchMission("rei"); // fallback
    }
    throw err; // autre type d'erreur : on la propage
  }
}
```

---

## 6) FALLBACK : UN PLAN B QUAND LE PLAN A CRÈVE

```js
function estErreurLectureTransitoire(error) {
  // Le client HTTP doit normaliser ses rejets réseau en NetworkError.
  // fetch() natif peut rejeter avec TypeError ; cette fonction suppose un adaptateur.
  // Une erreur inconnue n'est pas retryable par défaut.
  return (
    error?.name === "NetworkError" || [502, 503, 504].includes(error?.status)
  );
}

async function getHorrorData(horrorId) {
  try {
    return await fetchFromPrimaryAPI(horrorId);
  } catch (primaryErr) {
    if (!estErreurLectureTransitoire(primaryErr)) throw primaryErr;

    try {
      return await fetchFromBackupAPI(horrorId);
    } catch (backupErr) {
      if (!estErreurLectureTransitoire(backupErr)) throw backupErr;
      // Ne fabrique pas un faux Horror : l'indisponibilité est un état distinct.
      return { id: horrorId, data: null, status: "unavailable" };
    }
  }
}
```

Une réponse d’indisponibilité explicite vaut mieux qu’un faux objet métier. Le client peut alors afficher un état de chargement/indisponibilité au lieu de traiter une valeur inventée comme une donnée réelle.

---

## 7) `Promise.allSettled` : TOLÉRER LES ÉCHECS PARTIELS

`Promise.all` = si un échoue, tout échoue.
`Promise.allSettled` = attend tout le monde, récupère les résultats ET les erreurs.

```js
async function getAllKnightReports(knights) {
  const results = await Promise.allSettled(
    knights.map((knight) => fetchReport(knight)),
  );

  // results = tableau d'objets :
  // { status: 'fulfilled', value: ... }
  // { status: 'rejected', reason: ... }

  const reports = [];
  const failures = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      reports.push(result.value);
    } else {
      failures.push(result.reason);
      console.warn("Un rapport manquant :", result.reason.message);
    }
  }

  // on retourne ce qu'on a, même incomplet
  return { reports, failures };
}
```

Le Conseil reçoit les rapports disponibles.
Si Rei est tombé en mission, ça ne bloque pas les rapports de Leon et Kouga.

---

## EXERCICES

## EXO 1 : LE PIPELINE BLINDÉ

Tu construis le pipeline d'évasion de Michael Scofield. 3 étapes en séquence :

```js
function getBlueprints() {
  /* peut rejeter : 'Blueprints locked' */
}
function digTunnel(blueprints) {
  /* peut rejeter : 'Guard patrol' */
}
function reachFreedom(tunnel) {
  /* peut rejeter : 'Dogs detected' */
}
```

**Mission :** Écris `executeEscape()` avec un `try/catch` par étape. Chaque erreur catchée doit relancer une erreur avec un message qui dit clairement à quelle étape le plan a merdé. Si toutes les étapes réussissent : retourne `'Liberté. Fox River derrière nous.'`

---

## EXO 2 : LEON AVEC UN TIMEOUT ET UN BACKUP

Leon part en mission. Sa réponse prend parfois plus de 5 secondes.

```js
function callLeon() {
  return new Promise((resolve, reject) => {
    const delay = Math.random() > 0.5 ? 2000 : 8000;
    setTimeout(() => resolve("Leon disponible"), delay);
  });
}

function callRei() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("Rei disponible"), 1000),
  );
}
```

**Mission :** Écris `dispatchKnight()`. Si `callLeon()` prend plus de 5s : timeout, et tu appelles `callRei()` en fallback. Si les deux ratent : retourne `'Aucun Chevalier disponible'` sans crasher.

---

## EXO 3 : LE CONSEIL RÉSILIENT

5 Chevaliers doivent rendre leur rapport. Certains peuvent échouer.

```js
function fetchReport(name) {
  return new Promise((resolve, reject) => {
    // 30% de chance d'échouer
    if (Math.random() < 0.3) {
      reject(new Error(`${name} : rapport indisponible`));
    } else {
      resolve(`${name} : mission accomplie`);
    }
  });
}

const knights = ["Leon", "Rei", "Kouga", "Leo", "Bado"];
```

**Mission :** Récupère tous les rapports avec `Promise.allSettled`. Affiche les rapports reçus. Affiche les noms des Chevaliers dont le rapport est manquant. Le Conseil doit toujours recevoir quelque chose, même si c'est incomplet.

---

## RÉSUMÉ

`try/catch` autour d'un `await` : attrape la rejection de la Promise.
Un `await` manquant = l'erreur passe à travers sans être catchée.
`withRetry` : retente avec délai progressif avant de jeter l'éponge.
`Promise.race` + timeout : ne jamais attendre éternellement.
`Promise.allSettled` : tolérer les échecs partiels et travailler avec ce qui reste.
La règle d'or : un crash silencieux est pire qu'une erreur visible.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Async rescue : sauver ce qui peut l'être** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Async rescue : sauver ce qui peut l'être » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
