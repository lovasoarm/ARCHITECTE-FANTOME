---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 05 : Heap Snapshot Arena

<!-- AF-DIAGRAM:gc -->

```text
┌────────────┐
│ Roots      │
└─────┬──────┘
      ▼
┌────────────┐     ┌────────────┐
│ reachable  │────►│ reachable  │
└────────────┘     └────────────┘

┌────────────┐
│ unreachable│ ─────► collect
└────────────┘
```

Le GC peut récupérer ce qui n’est plus atteignable depuis les racines du runtime.

Temps de lecture ~5 min

> Outil V8 : **Principe universel intemporel** : diff de snapshots = méthode canonique pour traquer une fuite dans n'importe quel runtime managé (JVM, .NET, Python, Go pprof).

## Mission

On te livre `leaky-app.js` (à écrire à partir de la spec ci-dessous).
Objectif : **prouver** la fuite avec 3 heap snapshots et **nommer la closure fautive**.

## Spec de l'app qui fuit

Un serveur HTTP minimal qui, à chaque requête `/register`, ajoute un handler dans un `Map` global mais ne le supprime jamais.

```js
// squelette : à toi de compléter
import http from "node:http";
const listeners = new Map();
http
  .createServer((req, res) => {
    if (req.url === "/register") {
      const big = new Array(100_000).fill(Math.random());
      listeners.set(Math.random(), () => big.length);
      res.end("ok");
    }
  })
  .listen(3000);
```

## Protocole

1. Démarre avec `node --inspect leaky-app.js`.
2. Ouvre `chrome://inspect` → **Memory** → prends **Snapshot 1**.
3. Envoie 500 requêtes (`for i in $(seq 500); do curl -s localhost:3000/register; done`).
4. Force un GC (bouton poubelle) → **Snapshot 2**.
5. Envoie 500 requêtes de plus → **Snapshot 3**.
6. Compare S2 → S3 (**Comparison view**). Trie par **Size Delta**.

## Livrable

`REPORT.md` avec :

- 3 captures annotées (flèches sur la closure `() => big.length`).
- La **retainer chain** de l'objet fautif.
- Le fix (1 ligne suffit).

## (attention) Ce que l'exercice cache

Un snapshot **fige** l'état ; il ne dit pas **pourquoi** l'objet est retenu. La `retainer chain` est ta boussole, pas la taille brute.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
