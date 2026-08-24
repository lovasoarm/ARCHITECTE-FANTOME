---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# EXO : reimplemente une file de microtasks a la main (12.6)

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

Temps de lecture ~2 min

## Consigne

Sans utiliser `Promise`, `queueMicrotask`, `setTimeout(0)` ni aucune API native de scheduling, ecris `myMicrotaskQueue.js` qui expose :

- `enqueue(fn)` : ajoute une microtache.
- `runOnce()` : execute toutes les microtaches en attente (les enfilages pendant l'execution passent au prochain drainage).
- `run()` : draine jusqu'a stabilite.

## Test deterministe (a livrer)

```js
const q = require("./myMicrotaskQueue");
const log = [];
q.enqueue(() => {
  log.push("A");
  q.enqueue(() => log.push("B"));
});
q.enqueue(() => log.push("C"));
q.run();
console.log(log.join(","));
// attendu : A,C,B
```

## Vulgarisation obligatoire

Ecris dans `EXPLIQUE_A_UN_ENFANT.md` en 5 phrases ce que fait ta file, sans mot technique.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
