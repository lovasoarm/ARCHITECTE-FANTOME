# SETUP : 30 transferability

Ce `SETUP.md` est le point de passage obligatoire avant la pratique, l’exercice ou le livrable situé dans ce dossier.

## 1. Héritage

Lis d’abord le [`SETUP.md`](../SETUP.md) le plus proche dans l’arborescence. Ce document ne répète que les éléments utiles à cette activité.

## 2. Pré-requis locaux

- [ ] Le socle global est validé.
- [ ] La technologie demandée par le dossier est disponible **dans la version indiquée ci-dessous**.
- [ ] Les dépendances du projet, lorsqu’il existe un `package.json`/lockfile ou équivalent, sont présentes ou préparées pour l’offline.
- [ ] Une première commande de preuve est connue avant de commencer la mission.

## 3. Technologies / versions de référence (vérifiées le 10 novembre 2026)

Node.js reste l'environnement du curriculum principal ; **il ne suffit pas** pour ce dossier de transfert. Installe uniquement les langages du transfert que tu as choisi, pas les quatre par principe. Les versions ci-dessous forment la référence de cette édition ; un dépôt cible peut imposer une version plus ancienne dans son `README`, son fichier de toolchain ou son lockfile. Dans ce cas, le dépôt cible fait foi et la divergence doit être notée.

| Langage / outil    | Version de référence | Vérification                                         |
| ------------------ | -------------------- | ---------------------------------------------------- |
| Node.js (socle AF) | 22.23.4              | `node --version` doit afficher `v22.23.4`            |
| Python             | 3.15.2               | `python --version` puis `python -m pytest --version` |
| Java               | JDK 25.0.5 LTS       | `java --version` et `javac --version`                |
| Rust               | 1.99.1               | `rustc --version` et `cargo --version`               |
| Go                 | 1.27.3               | `go version`                                         |

Références officielles de versions consultées le 10 novembre 2026 : [Python releases](https://www.python.org/downloads/), [Go release history](https://go.dev/doc/devel/release), [Rust release announcements](https://blog.rust-lang.org/releases/), [JDK 25 release notes](https://www.oracle.com/java/technologies/javase/25all-relnotes.html). JDK 25 est retenu comme cible LTS ; le dépôt cible peut nécessiter une autre version compatible.

## 4. Première preuve

1. Choisir le langage et vérifier sa version avec la commande du tableau.
2. Pour Python, confirmer que `pytest` est disponible avec `python -m pytest --version` ; ne pas l'installer implicitement pendant une session offline.
3. Lire le `README` et la configuration du dépôt choisi (`pyproject.toml`, `Cargo.toml`, `go.mod`, `pom.xml` ou équivalent), puis utiliser ses commandes de test.
4. Si une dépendance manque, consigner `NON TESTÉ  : dépendance absente` plutôt que prétendre avoir exécuté la preuve.

## 5. Offline

Aucun script automatique n’est requis pour l’installation. Prépare simplement les installateurs, caches, binaires, images ou fixtures mentionnés par ce document et son parent.

## 6. Anti-friction

- Ne pas installer Git/IDE/extensions si l’activité n’en dépend pas.
- Ne pas remplacer une version explicitement épinglée par une version « plus récente » pendant l’exercice.
- Ne pas lancer une commande qui télécharge implicitement des dépendances sur une machine isolée.
- Une dépendance commune est documentée au niveau parent ; ne pas la réinstaller dans chaque exercice.
