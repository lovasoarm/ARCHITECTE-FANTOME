# Legacy Camp V1 : fixture locale

Ce fichier est le système legacy fourni pour commencer sans dépôt distant. Il est volontairement monolithique, mutable et sans tests. Il expose `status`, `rotate-guards`, `consume`, `add-threat` et `reset`.

- **Ne modifie pas `campV1.js` pendant la phase de caractérisation.**
- Le défaut intentionnel : `consume --amount -2` augmente le stock au lieu de refuser l'entrée.
- Les données vont dans `CAMP_STATE_FILE` ou, par défaut, `legacy/camp.json`. Utilise un fichier temporaire pendant les essais.
- Le code utilise uniquement les modules natifs Node.js ; aucun `npm install` n'est nécessaire.

Commande initiale depuis le dossier du projet :

```bash
node legacy/campV1.js status
```

Exemple isolé sur POSIX :

```bash
tmp=$(mktemp -d)
CAMP_STATE_FILE="$tmp/camp.json" node legacy/campV1.js status
CAMP_STATE_FILE="$tmp/camp.json" node legacy/campV1.js consume --resource food --amount -2
```

La seconde commande reproduit le défaut à diagnostiquer : le stock augmente de deux unités. Sous PowerShell, définir d'abord `$env:CAMP_STATE_FILE = Join-Path $env:TEMP 'af-camp-fixture.json'` puis lancer les commandes Node.
