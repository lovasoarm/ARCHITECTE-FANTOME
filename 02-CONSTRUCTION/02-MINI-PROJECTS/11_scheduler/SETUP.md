# SETUP : 11_scheduler

Ce guide précise uniquement les prérequis propres à ce mini-projet.

## Prérequis

- Le gate pédagogique du [README](README.md) est satisfait.
- Node.js `22.23.4` est la version cible du dépôt (`.nvmrc` racine).
- Le dossier contient un `package.json` sans dépendance tierce ; aucune installation npm n'est nécessaire.

## Première preuve

Depuis ce dossier :

```bash
node --version
npm test
```

À réception, `npm test` échoue avec des imports manquants tant que l'apprenant n'a pas créé `src/loop.js` et `src/pmap.js`. Ce premier rouge est attendu et documenté dans `tests/README.md`.

Après implémentation, la même commande doit terminer avec tous les tests verts. Note la version exacte de Node réellement utilisée. Si elle diffère de `22.23.4`, n'affirme pas avoir validé le runtime cible.

## Hors périmètre

Pas de Docker, Flutter, service réseau, base de données, dépendance npm ou compte externe requis pour le projet de base. Si tu ajoutes volontairement une de ces surfaces, documente-la et adapte les prérequis avant de poursuivre.
