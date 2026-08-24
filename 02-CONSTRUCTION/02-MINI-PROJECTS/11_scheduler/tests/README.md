---
stability: stable
acte: comprendre
---

# Tests : 11_scheduler

<!-- AF-DIAGRAM:scheduler -->
```text
┌─────────────┐
│ tâches      │
└──────┬──────┘
       ▼
┌─────────────┐
│ queue       │
└──────┬──────┘
       ▼
┌──────┴──────┐
│ worker pool │
└──────┬──────┘
       ▼
┌─────────────┐
│ résultats   │
└─────────────┘
```
Le scheduler transforme un flux de tâches en travail ordonnancé par une capacité d’exécution limitée.


Temps de lecture ~3 min

## Lancer

```bash
node --test tests/
```

Aucune dépendance externe. Node ≥ 20 (utilise `node:test`).

## Structure attendue

- `pmap.test.js` : couvre `pMap`, concurrence, ordre de sortie,
  propagation d'erreurs, `stopOnError`, cas `items` vide.
- `loop.test.js` : couvre la boucle d'ordonnancement, pas de tâche
  perdue, pas de starvation quand la concurrence est saturée.

## Critère de succès

Tous les tests verts. Le harness sort en code 0. Un test qui « passe par
chance » (timing-dependent) est un test rouge déguisé : le signaler dans
le POSTMORTEM.

## Ajouter un test

- Nom explicite : `pMap - honore concurrency=1 sur 3 items lents`.
- Assertions ciblées, pas de `assert.ok(true)` de remplissage.
- Timing : si un test dépend de délais, utilise `setTimeout` avec des
  valeurs > 50 ms pour éviter les flakes.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [`loop.test.js`](loop.test.js)
- [`pmap.test.js`](pmap.test.js)

<!-- CONTENU-DOSSIER:fin -->
