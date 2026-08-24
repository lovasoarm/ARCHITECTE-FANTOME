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
1. Lance le main avec : node --expose-gc --inspect main.js
2. Trouve les workers : ps -o pid,command | grep worker
3. Attache l'inspecteur à CHAQUE worker (chacun ouvre un port différent)
4. Snapshot dans chaque inspecteur SÉPARÉMENT
5. Somme les heapUsed. Compare à rss. Le manque = mémoire native ou workers non attachés.
```

Alternative programmatique :

```js
// dans le worker :
import { parentPort } from "node:worker_threads";
setInterval(() => {
  parentPort.postMessage({ heap: process.memoryUsage() });
}, 5000);
```

Le main agrège et log. Tu vois la courbe par worker.

---

## 3) FIX PATTERN : POOL BORNÉ + TERMINATE

```js
class WorkerPool {
  constructor(size, script) {
    this.workers = Array.from({ length: size }, () => new Worker(script));
    this.free = [...this.workers];
    this.queue = [];
  }
  run(payload) {
    return new Promise((resolve) => {
      const task = { payload, resolve };
      this.free.length
        ? this._dispatch(this.free.pop(), task)
        : this.queue.push(task);
    });
  }
  _dispatch(w, task) {
    w.once("message", (r) => {
      task.resolve(r);
      this.queue.length
        ? this._dispatch(w, this.queue.shift())
        : this.free.push(w);
    });
    w.postMessage(task.payload);
  }
  async destroy() {
    await Promise.all(this.workers.map((w) => w.terminate()));
  }
}
```

Règle : jamais `new Worker` dans une boucle chaude. Pool + `terminate()` en shutdown.

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
