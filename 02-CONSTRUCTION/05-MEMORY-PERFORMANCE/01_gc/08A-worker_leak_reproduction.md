---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, temps_limite]
anti_recipe_key: changement_echelle+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Worker leak : quand chaque thread saigne seul

Temps de lecture ~25 min

Un `worker_threads` Node ou un Web Worker a **sa propre heap V8**. Un heap snapshot du
process principal ne verra JAMAIS la fuite qui vit dans le worker. C'est la classe de
bug qui fait tomber les services en prod sans qu'aucun graphique ne l'annonce.

Prérequis : `06-heap_snapshot_hands_on.md`, `07-detached_dom_leak.md`.

---

## 1) LE PIÈGE

```js
// main.js
import { Worker } from "node:worker_threads";
for (let i = 0; i < 100; i++) {
  const w = new Worker("./worker.js");
  w.postMessage({ id: i });
  // on ne fait jamais w.terminate() ni on n'attend 'exit'
}
```

Chaque worker garde une heap. Tu crées 100 heaps. `process.memoryUsage().rss` explose
alors que `heapUsed` semble normal. Un `--inspect` sur le main ne voit rien.

---

## 2) PROTOCOLE MULTI-HEAP

```text
1. Lance le main avec `node --expose-gc --inspect=127.0.0.1:9229 main.js` (inspecteur lié à loopback ; ne l'expose jamais sur Internet).
2. Les `worker_threads` sont des threads du même processus, pas des processus OS séparés : `ps | grep worker` ne permet pas de les identifier fiablement. Conserve les objets `Worker` et leurs `threadId` côté main.
3. Observe `heapUsed`/`heapTotal` par worker via un message de télémétrie ; le `rss` est une mesure du processus entier. Ne somme pas les RSS remontés par plusieurs workers.
4. Pour un heap snapshot, cible l'isolate du worker avec les outils Node/DevTools adaptés à la version utilisée ; un snapshot du main seul ne suffit pas.
5. Note la version Node, le nombre de workers, la charge et les limites de mémoire ; distingue heap JS, mémoire externe et RSS global.
```

Alternative programmatique :

```js
// worker.js : heap attribuable à cet isolate ; le RSS reste global au processus.
import { parentPort, threadId } from "node:worker_threads";
setInterval(() => {
  const { heapUsed, heapTotal, external, arrayBuffers } = process.memoryUsage();
  parentPort.postMessage({
    threadId,
    heapUsed,
    heapTotal,
    external,
    arrayBuffers,
  });
}, 5000);

// main.js : appeler process.memoryUsage().rss une seule fois pour le processus entier.
```

Le main agrège et log. Tu vois la courbe par worker.

---

## 3) FIX PATTERN : POOL BORNÉ + TERMINATE

```js
import { Worker } from "node:worker_threads";

class WorkerPool {
  constructor(size, script) {
    if (!Number.isInteger(size) || size < 1)
      throw new RangeError("size doit être >= 1");
    this.size = size;
    this.script = script;
    this.queue = [];
    this.slots = [];
    this.closed = false;
    for (let i = 0; i < size; i += 1) this.#addWorker();
  }

  #addWorker() {
    const slot = { worker: new Worker(this.script), task: null, dead: false };
    this.slots.push(slot);
    slot.worker.on("message", (result) => {
      if (!slot.task || slot.dead) return;
      const task = slot.task;
      slot.task = null;
      task.resolve(result);
      this.#drain();
    });
    slot.worker.on("error", (error) => this.#retire(slot, error));
    slot.worker.on("exit", (code) => {
      if (!this.closed)
        this.#retire(slot, new Error(`Worker terminé (code ${code})`));
    });
    this.#drain();
  }

  run(payload) {
    if (this.closed) return Promise.reject(new Error("Pool fermé"));
    return new Promise((resolve, reject) => {
      this.queue.push({ payload, resolve, reject });
      this.#drain();
    });
  }

  #drain() {
    if (this.closed) return;
    for (const slot of this.slots) {
      if (slot.dead || slot.task || this.queue.length === 0) continue;
      const task = this.queue.shift();
      slot.task = task;
      try {
        slot.worker.postMessage(task.payload);
      } catch (error) {
        slot.task = null;
        task.reject(error);
      }
    }
  }

  #retire(slot, error) {
    if (slot.dead || this.closed) return;
    slot.dead = true;
    if (slot.task) {
      slot.task.reject(error); // pas de retry automatique : un job peut avoir des effets de bord
      slot.task = null;
    }
    this.#addWorker(); // les tâches encore en file restent en attente
  }

  async destroy() {
    this.closed = true;
    const reason = new Error("Pool fermé avant exécution");
    for (const task of this.queue.splice(0)) task.reject(reason);
    for (const slot of this.slots) {
      if (slot.task) {
        slot.task.reject(reason);
        slot.task = null;
      }
    }
    await Promise.all(
      this.slots
        .filter((slot) => !slot.dead)
        .map((slot) => slot.worker.terminate()),
    );
  }
}
```

Règle : jamais `new Worker` dans une boucle chaude. Un pool doit traiter `error` et `exit`, rejeter explicitement le job actif d'un worker mort, garder les jobs en attente, remplacer un worker si le pool reste ouvert et attendre `terminate()` au shutdown. Ne rejoue pas automatiquement un job qui peut avoir produit un effet de bord : un retry exige une garantie d'idempotence ou une clé de déduplication.

---

## 4) MISSION

Écris un `leaky.js` qui crée 50 workers sans terminate. Mesure `rss` toutes les secondes.
Écris `fixed.js` avec `WorkerPool(4)`. Compare les courbes sur 60 secondes. Livre un
`WORKER_LEAK_REPORT.md` avec les deux courbes en ASCII (une ligne par mesure).

---

## 5) (attention) PIÈGE FINAL

`worker.terminate()` renvoie une Promise. Si tu ne l'attends pas au shutdown, ton
process se ferme avec des heaps orphelines. En prod, `SIGTERM` sans grace period =
mémoire perdue jusqu'au restart.

Prochaine étape : approfondis le module mémoire (voir le grimoire `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/90-grimoire.md` et les autres exercices du dossier `01_gc/`).

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Fermer proprement le cycle de vie d’un Worker

```text
créer le Worker
      |
      v
définir propriétaire et canal
      |
      v
fermeture de l’écran
      |
      v
arrêt + libération des références
      |
      v
vérifier qu’aucun message ne persiste
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Worker leak : quand chaque thread saigne seul** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Borner le cycle de vie d’un Worker

**Mission liée à « Worker leak : quand chaque thread saigne seul » :** Reproduis un Worker Kintana qui continue à recevoir ou conserver des messages après la fermeture de son écran. Définis un protocole d’arrêt, de drainage ou d’annulation et compare les ressources observées.

**Livrable :** Scénario de reproduction, séquence de fermeture et observations avant/après.

**Critères d’acceptation :** Le Worker a un propriétaire explicite ; les messages en attente ont une politique ; l’arrêt ne perd pas silencieusement un travail qui doit être conservé.

**Transfert obligatoire :** La fermeture survient pendant un traitement : définis si l’opération est annulée, terminée ou reprise.
