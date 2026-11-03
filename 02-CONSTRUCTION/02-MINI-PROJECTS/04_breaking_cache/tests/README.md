---
stability: intemporel
acte: pratiquer
---

# `tests/` : tests à écrire pour 04 BREAKING CACHE

Aucun test exécutable ou test de référence n'est fourni par le ZIP. Écris des tests qui observent le contrat, pas seulement les détails internes de ton implémentation. Le projet démarre en CommonJS pour ses fichiers `.js` ; si tu optes pour ESM, utilise `.mjs` ou déclare `"type": "module"` dans ton `package.json`.

Priorités :

- hit/miss, y compris `null` ou `undefined` ;
- TTL invalide et frontière `now === expiresAt` avec horloge contrôlée ;
- `delete` et `clear` ;
- loader appelé seulement sur miss et absence de cache sur erreur ;
- invalidation après commit réussi, pas après échec ;
- isolation tenant/boutique, y compris les identifiants contenant `:` qui pourraient créer une collision avec une concaténation naïve ;
- logs sans payload sensible.

Commande, après création des fichiers :

```bash
node --test
```

`npm test` n'existe pas dans le ZIP de base (aucun `package.json` n'est fourni).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

_Aucun test n'est livré. Ajoute tes fichiers de test ici._

<!-- CONTENU-DOSSIER:fin -->
