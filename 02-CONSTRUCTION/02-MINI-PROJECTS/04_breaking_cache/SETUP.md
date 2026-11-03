# SETUP : 04 BREAKING CACHE

Ce projet est local, sans réseau et sans dépendance npm.

## Prérequis

- Avoir compris les valeurs/objets JavaScript.
- Savoir utiliser une `Map`.
- Avoir les bases de `async` / `await`.
- Savoir écrire un test unitaire simple (voir [Tests unitaires](../../03-TESTING/02-unit_sniper.md)).
- Comprendre le principe de mesure avant optimisation (voir [Mesurer avant d'optimiser](../../05-MEMORY-PERFORMANCE/02A-measure_first.md)).
- Runtime de référence AF : Node.js `22.23.4` (voir [politique Node](../../../06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md)).

Tu peux lire le cahier et préparer tes tests sans installer d'outil supplémentaire. Le ZIP ne contient pas de `package.json`, de modules exécutables ni de suite de tests pour ce projet. Pour éviter une ambiguïté de modules, pars en CommonJS (`require` / `module.exports`) avec les fichiers `.js` proposés. Si tu choisis ESM, utilise `.mjs` ou crée un `package.json` avec `"type": "module"` et adapte les commandes en conséquence.

## Première preuve disponible dès réception

```bash
node --version
```

La sortie attendue pour la référence AF est `v22.23.4`. C'est la seule commande de projet disponible avant d'avoir écrit les fichiers.

## Après création du code et des tests

```bash
node src/demo.js
node --test
```

La commande `node src/benchmark.js` devient disponible après avoir écrit ton runner. Ne lance pas `npm test` sans avoir créé et documenté un script `test` dans un `package.json`.

## Anti-friction

- Aucune installation `npm install` nécessaire.
- Pas de base PostgreSQL, Redis, Docker ni service Cloud requis.
- Si une extension ajoute une dépendance ou un service, documente son besoin dans un ADR et garde le projet de base reproductible sans elle.
