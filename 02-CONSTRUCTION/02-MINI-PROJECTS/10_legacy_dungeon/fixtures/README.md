# Fixture locale hors ligne : Legacy Billing

Cette fixture Git est un dépôt local auto-suffisant avec quatre commits, du JavaScript CommonJS, un stockage JSON et aucun service externe. Elle permet d'effectuer les étapes de cartographie, `git log`, `git blame`, tests de caractérisation et bugfix sans choisir un dépôt public.

Depuis le dossier `10_legacy_dungeon` du dépôt AF :

```bash
git clone fixtures/legacy-billing.bundle dungeon/
cd dungeon
git log --oneline --decorate -4
git rev-parse HEAD
node src/cli.js list
node src/cli.js price INV-1001
```

Le dépôt est figé dans `legacy-billing.bundle`. Les tests ne sont pas inclus : l'apprenant doit découvrir le comportement et écrire un test rouge avant la correction. Aucun `npm install` n'est requis ; le `package.json` existe et ne déclare aucune dépendance. Le point d'entrée est `src/cli.js`.

La fixture sert de parcours de secours et de vérification hors ligne. Le choix d'un dépôt public réel reste un exercice de transfert supplémentaire recommandé, mais n'est plus un prérequis bloquant.
