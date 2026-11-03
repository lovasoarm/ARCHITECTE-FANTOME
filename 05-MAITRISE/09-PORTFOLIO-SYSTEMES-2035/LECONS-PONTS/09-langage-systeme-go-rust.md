---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/09-langage-systeme-go-rust.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/09-langage-systeme-go-rust.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 09 : Un langage système : Go ou Rust (choisis un seul)

> **Arc DBZ :** CrazyDB est un boss bas niveau. Tu peux arriver avec Go ou Rust. Tu n'as pas besoin de maîtriser les deux avant d'entrer ; tu dois en revanche comprendre les outils que tu tiens.

<!-- AF-DIAGRAM:systems -->

## Repère visuel utile : Toolchain et boucle de validation

```text
source -> formatter -> compiler -> tests
                         |           |
                      erreurs     fuzz / race
                         |           |
                         +----+------+
                              |
                     benchmark + profilage
```

<!-- AF-LESSON-PROFILE: systems -->

## Résultat attendu

Être capable de construire, tester, profiler et déboguer un programme système en Go **ou** Rust, qui lit des fichiers, manipule des bytes, gère les erreurs et la concurrence. Ce pont n'est pas un cours complet de langage.

## Pourquoi un langage système est nécessaire ici

CrazyDB travaille directement avec des fichiers, des bytes, des buffers, des erreurs I/O et de la concurrence. JavaScript/TypeScript reste utile pour une première simulation, mais ne t’apprend pas toutes les garanties de mémoire et de concurrence d’un moteur natif. Go ou Rust te donnent un environnement où ces contraintes sont visibles et testables.

## Choisir sa voie

- **Go** : syntaxe relativement directe, goroutines/channels, gestion d'erreurs explicite. Bon choix pour apprendre les services et outils concurrents.
- **Rust** : contrôle mémoire plus explicite, ownership/borrowing, `Result`/`Option`, threads sûrs. Excellent pour apprendre les garanties mémoire, mais la courbe d'entrée est plus raide.
- Choisis selon le type de compréhension recherché et les outils que tu peux installer. N'apprends pas Go et Rust en parallèle pour ce projet.

## Compétences communes obligatoires

1. Types, structures, enums/interfaces/traits et modules/packages.
2. Erreurs explicites : retour d'erreur, propagation et contexte.
3. Collections, bytes, buffers, slices et représentation binaire.
4. Fichiers : lecture/écriture, append, flush, fermeture et erreurs partielles.
5. Concurrence : threads/goroutines, mutex ou canaux, race conditions et arrêt propre.
6. Tests : unitaires, intégration, tests de propriété/fuzz si la bibliothèque choisie le permet.
7. Outils : formatter, compiler, debugger, profiler, benchmark et dépendances verrouillées.

## Route Go

- Installer Go et comprendre `go version`, `go mod`, packages, `go test` et `go fmt`.
- Étudier structs, méthodes, interfaces, slices/maps et erreurs (`error`, wrapping).
- Apprendre `io.Reader`/`io.Writer`, `os.File`, `bufio`, `encoding/binary` et `context.Context`.
- Comprendre goroutines, channels, `sync.Mutex`, `sync.WaitGroup` et le détecteur de race `go test -race`.
- Écrire une mini-journalisation append-only et un test de crash/replay.

## Route Rust

- Installer Rust et comprendre `rustup`, `cargo`, crates, `cargo test`, `cargo fmt` et `cargo clippy`.
- Étudier structs/enums, `Option`, `Result`, ownership, borrowing, lifetimes de base et traits.
- Apprendre `std::fs::File`, `Read`, `Write`, `Seek`, buffers et encodage binaire.
- Comprendre `Send`/`Sync`, threads, `Arc`, `Mutex` et arrêt propre.
- Écrire une mini-journalisation append-only et des tests de récupération.

## Leçons AF à faire avant de choisir ton langage

- [Structures de données](../../../02-CONSTRUCTION/06-DATA-STRUCTURES/README.md), [algorithmes](../../../02-CONSTRUCTION/07-ALGORITHMS/README.md) et [mémoire/performance](../../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/README.md).
- [Streams et buffers](../../../02-CONSTRUCTION/13-RUNTIME-ENV/03-streams_buffers.md), [filesystem](../../../02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts/03-filesystem_ops.md), [worker threads](../../../02-CONSTRUCTION/13-RUNTIME-ENV/06A-worker_threads.md) et [gestion des erreurs](../../../01-CADRAGE/04-ERROR-HANDLING/README.md).

## Documentation officielle : parcours de lecture

Choisis une seule colonne. Les documents officiels sont les références détaillées ; cette leçon AF te donne l'ordre et les preuves à produire.

**Voie Go**

1. [A Tour of Go](https://go.dev/tour/) : types, structures, slices/maps, fonctions, méthodes/interfaces et concurrence. Refais les exercices, ne te contente pas de lire.
2. [Documentation Go](https://go.dev/doc/) : modules, tests, outils et guides pratiques.
3. Packages à étudier dans l'ordre : [`io`](https://pkg.go.dev/io) et [`os`](https://pkg.go.dev/os), puis [`bufio`](https://pkg.go.dev/bufio), [`encoding/binary`](https://pkg.go.dev/encoding/binary), [`context`](https://pkg.go.dev/context) et [`sync`](https://pkg.go.dev/sync).
4. [Go race detector](https://go.dev/doc/articles/race_detector) : écris un test qui déclenche une data race, puis corrige-la et relance `go test -race ./...`.

**Voie Rust**

1. [The Rust Programming Language](https://doc.rust-lang.org/book/) : chapitres sur les concepts communs, ownership/borrowing, structs/enums, gestion d'erreurs, traits/génériques, collections, I/O et concurrence. Suis le livre dans l'ordre de ses chapitres utiles ; ne saute pas l'ownership.
2. [Rust by Example](https://doc.rust-lang.org/stable/rust-by-example/) : refais les exemples sur les types, le contrôle, les modules, les erreurs, les threads et les tests.
3. Documentation de [`std::fs`](https://doc.rust-lang.org/std/fs/), [`std::io`](https://doc.rust-lang.org/std/io/) et [`std::thread`](https://doc.rust-lang.org/std/thread/).
4. Exécute `cargo test`, `cargo fmt --check` et `cargo clippy -- -D warnings` ; documente les avertissements que tu choisis de ne pas corriger.

**Preuve commune de sortie :** un CLI append-only écrit des records binaires versionnés, relit le journal après redémarrage, refuse un record tronqué, gère les erreurs I/O et passe les tests de concurrence propres au langage choisi. Le rapport doit contenir les commandes, versions et limites.

## Quand l'utiliser / quand l'éviter

Ce prérequis sert à CrazyDB et aux composants nécessitant contrôle mémoire/I/O/concurrence. Il n'est pas requis pour RAG, les agents ou Mini-Heroku. Si tu choisis de rester en TypeScript, tu peux faire une version pédagogique réduite de certains mécanismes, mais ne prétends pas maîtriser le comportement bas niveau d'un moteur natif.

## Limites

Un exercice de fichier ne fait pas de toi un ingénieur systèmes. Les garanties de flush/fsync dépendent de l'OS, du filesystem et du matériel. Les bibliothèques de fuzz/proptest changent selon le langage et la version ; sélectionne-les après avoir validé le compilateur et le toolchain.

## Mécanisme : le modèle mental à retenir

La maîtrise se vérifie quand tu peux construire une petite tranche, expliquer chaque frontière, observer les erreurs, puis modifier le système sans casser ses invariants.

## Ancrage produit / terrain : Kintana

Utilise un dépôt et des données de laboratoire associés à Kintana. Étiquette les résultats `LAB` ou `SIMULATION` tant qu'aucun système réel n'est exploité. Garde les commandes, les versions, les entrées, les sorties et les limites dans le dossier de preuve.

## Mission utile : Logbook

Écris un outil CLI qui ajoute des records versionnés à un fichier, affiche son contenu, détecte un record tronqué et reconstruit le dernier état. Ajoute tests normaux, corruption, fichier vide, doublon et crash simulé. Fais une seconde passe avec une concurrence contrôlée.

**Livrable :** dépôt, commandes de build/test, format des records, rapport de tests, benchmark reproductible et note expliquant les garanties non démontrées.

**Critère de sortie :** tu peux ajouter un champ au format, gérer un ancien record, provoquer une erreur I/O et expliquer les erreurs de concurrence sans copier une solution.

## Gate de sortie : décider READY ou NOT READY

Le parcours ci-dessus est un **guide de progression vers des ressources officielles**, pas un cours AF complet de Go ou de Rust. Tu dois réellement étudier une voie, pratiquer les exercices et garder les preuves. Ne coche pas `READY` parce que le compilateur accepte un exemple copié.

`READY` pour CrazyDB uniquement si ton dépôt de preuve contient :

1. Une commande de version et un toolchain identifiables ; le projet compile depuis un clone propre.
2. Un CLI avec modules/packages, structures de données et erreurs explicites ; les erreurs I/O sont propagées sans être transformées en succès.
3. Un format binaire documenté avec version et longueur ; le CLI ajoute puis relit plusieurs records après redémarrage.
4. Un test qui fournit volontairement un record tronqué ou un fichier invalide ; le programme le refuse sans inventer un état valide.
5. Des tests de concurrence ; pour Go, `go test -race ./...` passe sur le périmètre testé ; pour Rust, les tests concurrents et l'analyse statique choisie sont exécutés et leurs limites décrites.
6. Les commandes de formatage et de test passent ; les versions, commandes, résultats et limites sont consignés.
7. Tu peux modifier une structure ou ajouter un champ sans suivre un tutoriel pas à pas, puis expliquer l'impact sur la sérialisation et les tests.

`NOT READY` si le projet ne compile que sur une machine non documentée, si les erreurs sont ignorées, si la relecture après redémarrage échoue, si la corruption est acceptée ou si tu ne peux pas expliquer le code sans assistance. Reprends le cours officiel et les exercices de la compétence déficiente ; ne passe pas à CrazyDB pour « apprendre Go/Rust en même temps que le moteur ».

**Preuve :** `SYSTEMS-LANGUAGE-READINESS.md` avec la voie choisie, liens/chapitres officiels étudiés, versions du compilateur, commandes exécutées, résultats, dépôt du CLI et limites. Le verdict est daté et révisable ; il ne certifie pas une maîtrise professionnelle complète du langage.

## Ensuite

Quand le gate ci-dessus est `READY`, passe à [Leçon-pont 04 : WAL/MVCC/Raft](04-stockage-wal-mvcc-raft.md), puis seulement à [CrazyDB](../09-crazydb.md).

## Transfert obligatoire

Une contrainte change après la première version. Prédis le résultat, ajoute un test de non-régression et explique si le choix initial reste pertinent.
