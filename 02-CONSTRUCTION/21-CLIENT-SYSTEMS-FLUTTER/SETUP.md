# SETUP : 21 CLIENT SYSTEMS FLUTTER

Ce `SETUP.md` est le point de passage obligatoire avant la pratique, l’exercice ou le livrable situé dans ce dossier.

## 1. Héritage

Lis d’abord le [`SETUP.md`](../../SETUP.md) le plus proche dans l’arborescence. Ce document ne répète que les éléments utiles à cette activité.

## 2. Pré-requis locaux

- [ ] Le socle global est validé.
- [ ] La technologie demandée par le dossier est disponible **dans la version indiquée ci-dessous**.
- [ ] Les dépendances du projet, lorsqu’il existe un `package.json`/lockfile ou équivalent, sont présentes ou préparées pour l’offline.
- [ ] Une première commande de preuve est connue avant de commencer la mission.

## 3. Technologie / environnement

**Version de référence du curriculum (10 novembre 2026)** : Flutter **3.47.9 stable**, avec Dart **3.13.7** fourni dans le SDK Flutter. Cette paire est le point de référence reproductible pour les snippets et le mini-projet de cette version d'AF ; ne mélange pas un Flutter d'une version et un Dart installé séparément.

Le SDK Flutter inclut le SDK Dart : installe/extrais un seul SDK Flutter correspondant à la plateforme ciblée, puis conserve son archive hors ligne si la séance est isolée. Si un correctif plus récent est nécessaire, crée une mise à jour explicite du setup et vérifie les exemples, l'analyse, les tests et les plugins avant de modifier cette référence.

Première preuve attendue :

```bash
flutter --version
# doit afficher Flutter 3.47.9 et Dart 3.13.7
flutter doctor -v
```

Les exemples, dépendances et `pubspec.lock` doivent être testés avec cette paire. Le versionnement ne garantit pas que le SDK ou les composants de plateforme sont déjà installés localement.

### 3.1 Cible de plateforme

Ne prépare que les plateformes réellement visées par l’exercice. Le cœur du lab reste identique ; seul l’outillage natif change.

| Cible | Environnement à vérifier | Première preuve |
|---|---|---|
| Android | Android SDK + émulateur ou appareil physique | `flutter devices` puis lancement sur la cible choisie |
| iOS | macOS + Xcode + simulateur ou appareil iOS | `flutter devices` puis lancement sur la cible choisie |
| Windows desktop | outils desktop Windows compatibles Flutter | `flutter devices` puis lancement sur Windows |
| macOS desktop | macOS + outils desktop macOS compatibles Flutter | `flutter devices` puis lancement sur macOS |
| Linux desktop | outils desktop Linux compatibles Flutter | `flutter devices` puis lancement sur Linux |

**Point important** : iOS nécessite macOS et Xcode. Ne transforme pas l’absence d’un environnement natif en bug du code Flutter. Choisis une cible disponible et documente les autres comme non testées.

Avant une séance offline, précharge les composants de la plateforme ciblée pendant une séance connectée (par exemple avec `flutter precache --android` pour Android). N’exécute pas une commande de préchargement sur une machine isolée en espérant qu’elle télécharge ce qui manque.

## 4. Première preuve

1. Vérifier les prérequis ci-dessus.
2. Exécuter **une seule** commande de preuve simple avant de commencer la mission.
3. Si elle échoue, corriger l’environnement avant de modifier le code de l’exercice.

## 5. Offline

Aucun script automatique n’est requis pour l’installation. Prépare simplement les installateurs, caches, binaires, images ou fixtures mentionnés par ce document et son parent.

## 6. Anti-friction

- Ne pas installer Git/IDE/extensions si l’activité n’en dépend pas.
- Ne pas remplacer une version explicitement épinglée par une version « plus récente » pendant l’exercice.
- Ne pas lancer une commande qui télécharge implicitement des dépendances sur une machine isolée.
- Une dépendance commune est documentée au niveau parent ; ne pas la réinstaller dans chaque exercice.
