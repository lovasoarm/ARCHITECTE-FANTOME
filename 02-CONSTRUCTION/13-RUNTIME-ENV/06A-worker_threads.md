---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Worker threads : paralléliser sans bloquer l'event loop

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

Temps de lecture ~9 min

Node est single-threaded. Un seul thread d'exécution, un seul event loop. C'est parfait pour l'I/O asynchrone : des milliers de requêtes réseau en parallèle, zéro problème. Mais tu lances un calcul CPU intensif, genre parser 500k lignes de CSV ou générer un rapport de classement : l'event loop est bloqué. Aucune autre requête ne passe. Ton serveur freeze.

Worker Threads règlent ça. Tu crées un thread séparé, tu lui confies le calcul, et l'event loop continue de tourner.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

```js
// scénario : calcul le classement Ballon d'Or depuis 500k votes
// chaque vote = parsing JSON + pondération + agrégation

function computeRanking(votes) {
  // opération synchrone intensive : bloque le thread principal
  return votes
    .flatMap((v) => v.players)
    .reduce((acc, { name, points }) => {
      acc[name] = (acc[name] ?? 0) + points;
      return acc;
    }, Object.create(null)); // noms comme "__proto__" et "constructor" sans collision
}

// si cette fonction met 3 secondes :
// pendant 3 secondes, ton serveur Express ne répond plus à rien
// toutes les requêtes HTTP attendent dans la queue
// les timeouts se déclenchent
// les utilisateurs voient un spinner qui tourne
app.get("/ranking", (req, res) => {
  const ranking = computeRanking(votes); // l'event loop est bloqué ici
  res.json(ranking);
});
```

```text
Sans Worker Thread :
Event Loop ---|--calcul 3s--|--> requêtes en attente --> timeout

Avec Worker Thread :
Event Loop ---|---> autres requêtes --> OK
Worker   ---|--calcul 3s--|--> résultat --> Event Loop
```

---

## 2) CRÉER UN WORKER THREAD

Il faut deux fichiers : le thread principal qui crée le worker, et le worker qui fait le calcul.

```js
// --- main.js : le thread principal ---
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function computeRankingAsync(votes) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      join(__dirname, "ranking-worker.js"),
      { workerData: votes }, // les données à envoyer au worker
    );

    worker.on("message", (result) => {
      // le worker a terminé et envoie son résultat
      resolve(result);
    });

    worker.on("error", (err) => {
      // une erreur non catchée dans le worker
      reject(err);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker terminé avec le code ${code}`));
      }
    });
  });
}

// l'event loop reste libre pendant le calcul
const ranking = await computeRankingAsync(votes);
```

```js
// --- ranking-worker.js : le worker ---
import { workerData, parentPort } from "node:worker_threads";

// workerData = les données envoyées depuis main.js
const votes = workerData;

// on fait le calcul intensif ici, dans un thread séparé
const ranking = votes
  .flatMap((v) => v.players)
  .reduce((acc, { name, points }) => {
    acc.set(name, (acc.get(name) ?? 0) + points);
    return acc;
  }, new Map());

// On envoie des paires [nom, points] ; les noms spéciaux restent des clés sûres.
parentPort.postMessage([...ranking.entries()]);
// le worker se termine automatiquement après ça
```

---

## 3) COMMUNICATION BIDIRECTIONNELLE

```js
// --- worker avancé : envoyer des updates de progression ---

// ranking-worker.js
import { workerData, parentPort } from "node:worker_threads";

const { votes, batchSize } = workerData;
const total = votes.length;
const acc = new Map();

for (let i = 0; i < total; i += batchSize) {
  const batch = votes.slice(i, i + batchSize);

  batch.forEach(({ name, points }) => {
    acc.set(name, (acc.get(name) ?? 0) + points);
  });

  // Ce message est informatif : il ne termine pas la tâche.
  parentPort.postMessage({
    type: "progress",
    percent: Math.min(100, Math.round(((i + batch.length) / total) * 100)),
  });
}

// Map est clonable via le protocole de messages Node : les noms spéciaux restent des clés sûres.
parentPort.postMessage({ type: "result", data: [...acc.entries()] });
```

```js
// --- main.js : les messages progress ne terminent pas la tâche ---
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

const workerPath = fileURLToPath(
  new URL("./ranking-worker.js", import.meta.url),
);
const worker = new Worker(workerPath, {
  workerData: { votes, batchSize: 10000 },
});

worker.on("message", (message) => {
  if (message.type === "progress") {
    process.stdout.write(`\rCalcul en cours : ${message.percent}%`);
  } else if (message.type === "result") {
    console.log("\nClassement final :", new Map(message.data));
  } else if (message.type === "error") {
    console.error("Échec du calcul :", message.message);
  }
});
worker.on("error", (error) => console.error("Worker interrompu :", error));
worker.on("exit", (code) => {
  if (code !== 0) console.error(`Worker terminé avec le code ${code}`);
});
```

Un message `progress` n'est jamais un résultat. Le protocole distingue explicitement `progress`, `result` et `error`; le pool ci-dessous ne libère une tâche qu'à la réception de `result` ou `error`.

---

## 4) WORKER POOL : RÉUTILISER ET RÉCUPÉRER

Un pool doit traiter les messages typés, les erreurs et les sorties inattendues. Il remplace un Worker mort, conserve les tâches encore en file et rejette la tâche qui était en cours : il ne la rejoue pas automatiquement, car elle a peut-être déjà produit un effet de bord.

```js
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";

class WorkerPool {
  constructor(workerPath, size) {
    if (!Number.isInteger(size) || size < 1)
      throw new RangeError("size doit être >= 1");
    this.workerPath = workerPath;
    this.size = size;
    this.queue = [];
    this.slots = [];
    this.closed = false;
    for (let i = 0; i < size; i += 1) this.#addWorker();
  }

  #addWorker() {
    if (this.closed) return;
    const slot = {
      thread: new Worker(this.workerPath),
      busy: false,
      job: null,
      dead: false,
    };
    this.slots.push(slot);

    slot.thread.on("message", (message) => {
      if (slot.dead || !slot.job) return;
      const job = slot.job;
      if (message?.type === "progress") {
        job.onProgress?.(message.percent);
        return;
      }
      if (message?.type === "result") {
        slot.job = null;
        slot.busy = false;
        job.resolve(message.data);
        this.#dispatchNext(slot);
        return;
      }
      if (message?.type === "error") {
        slot.job = null;
        slot.busy = false;
        job.reject(
          new Error(message.message || "Erreur signalée par le worker"),
        );
        this.#dispatchNext(slot);
        return;
      }
      this.#retire(
        slot,
        new Error(`Message Worker inconnu : ${String(message?.type)}`),
      );
    });

    slot.thread.on("error", (error) => this.#retire(slot, error));
    slot.thread.on("exit", (code) => {
      if (!this.closed)
        this.#retire(slot, new Error(`Worker terminé (code ${code})`));
    });
    this.#dispatchNext(slot);
  }

  run(data, { onProgress } = {}) {
    if (this.closed) return Promise.reject(new Error("Pool fermé"));
    return new Promise((resolve, reject) => {
      this.queue.push({ data, resolve, reject, onProgress });
      const idle = this.slots.find((slot) => !slot.dead && !slot.busy);
      if (idle) this.#dispatchNext(idle);
    });
  }

  #dispatchNext(slot) {
    if (this.closed || slot.dead || slot.busy || this.queue.length === 0)
      return;
    const job = this.queue.shift();
    slot.job = job;
    slot.busy = true;
    try {
      slot.thread.postMessage({ type: "run", data: job.data });
    } catch (error) {
      slot.job = null;
      slot.busy = false;
      job.reject(error);
      this.#dispatchNext(slot);
    }
  }

  #retire(slot, error) {
    if (slot.dead || this.closed) return;
    slot.dead = true;
    if (slot.job) {
      slot.job.reject(error);
      slot.job = null;
    }
    // La promesse de terminate est consommée ; la sortie ultérieure est ignorée grâce à dead.
    void slot.thread.terminate().catch(() => {});
    this.#addWorker();
  }

  async destroy() {
    this.closed = true;
    const reason = new Error("Pool fermé avant exécution");
    for (const job of this.queue.splice(0)) job.reject(reason);
    const active = this.slots.filter((slot) => !slot.dead);
    for (const slot of active) {
      if (slot.job) {
        slot.job.reject(reason);
        slot.job = null;
      }
      slot.dead = true;
    }
    await Promise.all(active.map((slot) => slot.thread.terminate()));
  }
}

const workerPath = fileURLToPath(
  new URL("./ranking-worker.js", import.meta.url),
);
const pool = new WorkerPool(workerPath, 4);
const result = await pool.run(votes, {
  onProgress: (percent) => process.stdout.write(`\r${percent}%`),
});
await pool.destroy();
```

Le worker doit respecter le protocole d'entrée/sortie :

```js
// ranking-worker.js  : exemple minimal du contrat attendu par WorkerPool
import { parentPort } from "node:worker_threads";
import { computeRanking } from "./ranking.js";

parentPort.on("message", async (message) => {
  if (message?.type !== "run") return;
  try {
    parentPort.postMessage({ type: "progress", percent: 0 });
    const data = await computeRanking(message.data);
    parentPort.postMessage({ type: "result", data });
  } catch (error) {
    parentPort.postMessage({ type: "error", message: error.message });
  }
});
```

Le chemin du Worker est construit depuis `import.meta.url`, et non depuis le répertoire courant du terminal. Un crash rejette la tâche active, remplace le Worker et laisse les tâches en attente disponibles. Aucun retry automatique n'est effectué sans contrat d'idempotence.

---

## 5) SHARED ARRAY BUFFER : MÉMOIRE PARTAGÉE

```js
// par défaut, les données entre worker et main thread sont copiées (pas partagées)
// pour de gros volumes : utiliser SharedArrayBuffer

// main.js
const sharedBuffer = new SharedArrayBuffer(4); // 4 octets = 1 Int32
const counter = new Int32Array(sharedBuffer);
counter[0] = 0;

const counterWorkerPath = fileURLToPath(
  new URL("./counter-worker.js", import.meta.url),
);
const worker = new Worker(counterWorkerPath, {
  workerData: { sharedBuffer }, // on partage le buffer, pas une copie
});

// le worker peut modifier counter[0] et le main thread voit la modification
// sans envoyer de message

// contre-indication : les race conditions
// deux workers qui écrivent en même temps = données corrompues
// solution : Atomics.add(), Atomics.compareExchange() pour les opérations atomiques
Atomics.add(counter, 0, 1); // incrément atomique thread-safe
```

---

## EXERCICES

## EXO 1 : le calcul hors thread

T'as cette fonction qui analyse les stats d'un match (supposons qu'elle soit lente) :

```js
function analyzeMatchData(events) {
  // Map accepte tout nom de joueur sans collision avec les propriétés d'Object.prototype.
  const result = new Map();
  if (events.length === 0) return [];

  for (let i = 0; i < 10_000_000; i++) {
    const event = events[i % events.length];
    result.set(event.player, (result.get(event.player) ?? 0) + 1);
  }

  // Les entrées Map sont clonables par le protocole de messages Worker.
  return [...result.entries()];
}
```

Déplace ce calcul dans un Worker Thread. Le thread principal doit rester libre (teste avec un `setInterval` qui print un compteur toutes les 100ms : il ne doit pas s'interrompre pendant le calcul).

---

## EXO 2 : la progression du vote

Crée un worker qui simule le comptage de 1 million de votes. Il envoie des updates de progression toutes les 100k votes. Le thread principal affiche une barre de progression dans le terminal.

---

## EXO 3 : le pool de simulation

Simule 9 matchs de Champions League en parallèle (fixtures hardcodées). Crée un pool de 3 workers. Chaque worker simule un match (5 secondes simulées). Les résultats arrivent au fur et à mesure. Affiche chaque résultat dès qu'il est prêt, pas en attente que tous soient terminés.

---

## RÉSUMÉ

Node est single-threaded : un calcul CPU intensif bloque l'event loop. Worker Threads créent des threads séparés pour ces calculs. Les données transitent par message (copie) ou SharedArrayBuffer (mémoire partagée). En prod : un pool de workers réutilisables plutôt que créer un worker par requête. La règle de décision : si c'est de l'I/O, `async/await` suffit. Si c'est du CPU pur, Worker Thread.

> Note : 9.5/10 : le schéma ASCII event loop vs worker est efficace. Le pool est bien calibré pour le niveau. Moins 0.5 : les pièges de SharedArrayBuffer (race conditions) mériteraient un exemple cassé + Atomics côte à côte.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Worker threads : paralléliser sans bloquer l'event loop** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Worker threads : paralléliser sans bloquer l'event loop » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
