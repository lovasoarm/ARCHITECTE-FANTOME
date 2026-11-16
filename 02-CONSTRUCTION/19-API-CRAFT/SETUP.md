# SETUP : 19 API CRAFT

Ce `SETUP.md` est le point de passage obligatoire avant la pratique, l’exercice ou le livrable situé dans ce dossier.

## 1. Héritage

Lis d’abord le [`SETUP.md`](../../SETUP.md) le plus proche dans l’arborescence. Ce document ne répète que les éléments utiles à cette activité.

## 2. Pré-requis locaux

- [ ] Le socle global est validé.
- [ ] La technologie demandée par le dossier est disponible **dans la version indiquée ci-dessous**.
- [ ] Les dépendances du projet, lorsqu’il existe un `package.json`/lockfile ou équivalent, sont présentes ou préparées pour l’offline.
- [ ] Une première commande de preuve est connue avant de commencer la mission.

## 3. Technologie / environnement

**Environnement standard AF** : Node.js 22.23.4 et npm 10.x. Un éditeur seul ne suffit pas pour exécuter les exemples de ce module : les dépendances directes sont déclarées dans `package.json`.

## 4. Installation reproductible

À la racine de `19-API-CRAFT`, avec accès au registre npm :

```bash
npm install
```

Cette première installation doit produire `package-lock.json`. Le lockfile obtenu doit être relu, conservé et versionné avec le manifeste. Les installations suivantes utilisent `npm ci`, qui respecte exactement le lockfile. Le ZIP de correction ne fabrique pas de lockfile : il devra être généré avec succès par `npm install`, puis contrôlé avant de considérer le setup entièrement reproductible. Ne considère pas les dépendances comme prêtes hors ligne tant que le cache npm ou un miroir local n’a pas été préparé.

## 5. Première preuve

1. Vérifier `node --version` et `npm --version`.
2. Installer les dépendances et vérifier que le lockfile est présent.
3. Exécuter `node --input-type=module -e "import express from 'express'; console.log(typeof express)"`.
4. Si une étape échoue, corriger l’environnement avant de modifier le code de l’exercice.

## 6. Offline

Aucun script automatique n’est requis pour l’installation. Prépare simplement les installateurs, caches, binaires, images ou fixtures mentionnés par ce document et son parent.

## 7. Anti-friction

- Ne pas installer Git/IDE/extensions si l’activité n’en dépend pas.
- Ne pas remplacer une version explicitement épinglée par une version « plus récente » pendant l’exercice.
- Ne pas lancer une commande qui télécharge implicitement des dépendances sur une machine isolée.
- Une dépendance commune est documentée au niveau parent ; ne pas la réinstaller dans chaque exercice.
