---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cahier des charges : ballon d'or CLI

Temps de lecture ~13 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Docker     : v24+ (pour la containerisation : optionnel pour commencer)
Variables env : aucune
Outils externes: Docker (en dernier, une fois que tout tourne en local)

# Installation
$ npm install

# Lancer une commande CLI
$ node src/cli.js rank

# Lancer les tests
$ npm test

# Construire l'image Docker (une fois que les tests passent)
$ docker build -t ballon-dor-cli .
$ docker run ballon-dor-cli rank
```

Conseil de démarrage : ignore Docker jusqu'à ce que toutes les commandes CLI fonctionnent en local et que tous les tests passent. La containerisation est la dernière étape, pas la première.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Les journalistes du monde entier votent. Chaque vote est soumis depuis le terminal. Les points s'agrègent. Le classement se met à jour. Des commandes disponibles : `vote`, `rank`, `simulate`, `reset`, `export`. Le code v1 a été torché en une nuit par un stagiaire. Il fonctionne. Il est illisible. La v2, c'est toi qui l'écris. Et cette fois, elle est SOLID, testée, containerisée, et déployée proprement.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/cli.js vote --player "Rodri" --journalist "France Football" --points 15
[VOTE] Rodri reçoit 15 points de France Football

$ node src/cli.js rank
[CLASSEMENT BALLON D'OR 2026]
1. Rodri (Manchester City) : 847 pts
2. Vinicius Jr (Real Madrid) : 761 pts
3. Lamine Yamal (Barcelone) : 698 pts

$ node src/cli.js simulate --journalists 180 --players 30
[SIMULATE] 180 journalistes votent... done (1240ms)

$ node src/cli.js export --format csv --output results/classement.csv
[EXPORT] Classement exporté : results/classement.csv

$ npm test
PASS tests/voteService.test.js (20 tests)
PASS tests/rankingService.test.js (14 tests)
PASS tests/cli.test.js (12 tests)
PASS tests/errors.test.js (8 tests)
```

Ce projet a deux versions qui coexistent dans le repo : `legacy/ballonDorV1.js` (le code du stagiaire) et `src/` (ta v2 propre). Le comportement observable est identique. La structure interne, non.

## POURQUOI CE PROJET EXISTE

Ce projet teste la capacité à comprendre un codebase existant, à le corriger sans le réécrire d'un coup, et à le rendre opérationnel comme un vrai outil :

- **refactorer du code procédural en modules SOLID sans tout casser** : le v1 est un script procédural avec des variables globales, des conditions imbriquées, et une seule responsabilité éparpillée partout. La v2 sépare le CLI de la logique métier de la persistance. Chaque couche a une seule raison de changer.
- **gérer des erreurs dans un contexte CLI** : un CLI a deux types de sorties : stdout pour les résultats, stderr pour les erreurs. Un vote invalide ne doit pas planter le processus avec une stacktrace. Il doit afficher un message clair et sortir avec le bon code de sortie (`process.exit(1)`).
- **automatiser un outil de bout en bout** : containeriser avec Docker, lancer les tests en CI à chaque push, exporter les résultats en CSV. Un outil CLI "qui tourne sur ma machine" n'est pas un livrable.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/13-RUNTIME-ENV` : CLI Node.js, process.argv, filesystem

**Où ça se voit** : `src/cli.js`, `src/parser/argsParser.js`, `src/export/csvExporter.js`.
**Pourquoi c'est nécessaire ici** : `process.argv` pour lire les flags (`--player`, `--points`). `process.exit(code)` pour le code de sortie. `fs.writeFileSync` pour l'export CSV. C'est le kit de base du CLI Node.

### `02-CONSTRUCTION/11-REFACTORING` : SOLID sur du code CLI procédural

**Où ça se voit** : tout le passage de `legacy/ballonDorV1.js` vers `src/`.
**Pourquoi c'est nécessaire ici** : le v1 viole SRP (Single Responsibility Principle : une classe/fonction = une responsabilité) à chaque fonction. La v2 sépare le parsing des args, la validation des votes, l'agrégation des scores, et l'affichage. Chaque module peut changer sans toucher les autres.

### `01-CADRAGE/04-ERROR-HANDLING` : custom errors, propagation, exit codes

**Où ça se voit** : `src/errors/`, les `try/catch` dans `cli.js`.
**Pourquoi c'est nécessaire ici** : `InvalidVoteError`, `PlayerNotFoundError`, `QuotaExceededError` permettent de répondre différemment selon le type d'erreur. Un vote invalide = message d'erreur + exit 1. Un joueur introuvable = suggestion de correction + exit 1. Une erreur système = stacktrace sur stderr + exit 2.

### `05-MAITRISE/06-ANNEXES` : Git workflow, Docker, GitHub Actions

**Où ça se voit** : `Dockerfile`, `.github/workflows/ci.yml`, conventions de commits.
**Pourquoi c'est nécessaire ici** : un outil CLI sans containerisation ne peut pas être distribué à 180 journalistes avec des environnements différents. Sans CI : les tests passent en local, échouent chez les autres, personne ne sait.

### Résumé visuel

```text
02-CONSTRUCTION/13-RUNTIME-ENV --> src/cli.js (argv), src/export/csvExporter.js (fs), src/store/jsonStore.js
02-CONSTRUCTION/11-REFACTORING --> legacy/ -> src/ (SOLID, séparation des couches)
01-CADRAGE/04-ERROR-HANDLING --> src/errors/ (custom errors), exit codes dans cli.js
05-MAITRISE/06-ANNEXES   --> Dockerfile, .github/workflows/ci.yml
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 14 à 20 heures de travail réel.

| Étape                        | Durée estimée | Zone de résistance                                       |
| ---------------------------- | ------------- | -------------------------------------------------------- |
| errors + parser              | 1h30          | Faible                                                   |
| store + validators           | 2h            | Faible                                                   |
| voteService + rankingService | 3h            | Moyenne : les edge cases de vote (quota, ex-aequo)       |
| handlers + router            | 2h            | Faible                                                   |
| cli.js + renderer            | 1h30          | Faible                                                   |
| csvExporter                  | 1h            | Faible                                                   |
| Dockerfile + CI              | 2-3h          | **Haute** si c'est la première fois qu'on containerise   |
| Tests                        | 2-3h          | Moyenne : tester un CLI avec process.argv est inhabituel |

Le Dockerfile et la CI sont le point de résistance pour quelqu'un qui ne l'a jamais fait. Commence par faire tourner le CLI sans Docker. Une fois que tout est vert en local, containerise.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Un journaliste vote deux fois** : `QuotaExceededError`, le deuxième vote n'est pas enregistré, le premier reste intact.
2. **Points hors plage (0 ou 16)** : `InvalidVoteError`, message clair sur stderr, exit 1.
3. **Joueur avec des caractères spéciaux dans le nom** : `--player "İlkay Gündoğan"` doit passer sans erreur de parsing.
4. **Export CSV sur un classement vide** : le fichier est créé avec juste les headers, pas une erreur.
5. **Ordre_mission inconnue** : `node src/cli.js unknown_command` affiche l'aide disponible et exit 1.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Les erreurs vont sur stderr, les résultats sur stdout.** Jamais un mélange. Un script qui parse la sortie du CLI doit pouvoir les distinguer.
2. **Chaque commande a un exit code explicite.** Succès = 0. Erreur métier = 1. Erreur système = 2. Pas de `process.exit()` sans argument.
3. **`legacy/ballonDorV1.js` reste intact.** C'est la référence comportementale. Si un comportement de la v2 diffère du v1, c'est documenté dans `08-POSTMORTEM.md`.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface web.
- Pas de base de données (JSON sur le filesystem uniquement).
- Pas de TypeScript.
- Pas de Worker Threads (ce projet reste mono-thread, la simulation est séquentielle).

## LES ADR

```text
ADR/001-pourquoi-json-fichier-plutot-que-db-pour-la-persistance.md
ADR/002-pourquoi-exit-codes-distincts-pour-erreur-metier-vs-systeme.md
ADR/003-pourquoi-separer-renderer-des-services.md
```

Micro-exemple de forme (contexte distinct du projet) :

Cet exemple ne concerne pas le CLI du projet ; il montre simplement la forme attendue d’un ADR.

```markdown
# ADR : Séparer formatage et calcul dans un rapport batch

## Contexte

Un outil de génération de rapports doit produire plusieurs formats de sortie à partir des mêmes données calculées.

## Décision

Séparer le calcul métier du rendu de chaque format.

## Alternatives considérées

- Mélanger calcul et rendu : rejeté car chaque nouveau format multiplierait les branches métier.
- Dupliquer le calcul pour chaque format : rejeté car les règles divergeraient plus facilement.

## Conséquences

Les formats peuvent évoluer indépendamment, avec un léger coût initial de séparation des responsabilités.
```

**Important : exemple hors contexte. Il ne remplace aucun des ADR du projet.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] les 5 commandes (vote, rank, simulate, reset, export) fonctionnent en console
[ ] legacy/ballonDorV1.js existe, intact, jamais modifié
[ ] les 5 cas limites ont chacun un test qui passe
[ ] les exit codes sont corrects (testé dans cli.test.js)
[ ] les erreurs vont sur stderr, les résultats sur stdout (vérifié manuellement)
[ ] Dockerfile construit et le CLI tourne dans le container
[ ] le workflow CI tourne les tests à chaque push (fichier .github/workflows présent)
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente les différences comportementales trouvées entre v1 et v2
[ ] 02-TDD-JOURNAL.md trace dans quel ordre les tests ont été écrits
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Injection d'arguments (OWASP A03) : valider les arguments CLI, ne jamais passer une entrée brute à un shell/eval.
- Chemins (OWASP A01) : empêcher le path traversal si le CLI lit/écrit des fichiers fournis par l'utilisateur.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Le `97-CHECKPOINT-PACK` de ce projet contient un test de sécurité qui doit passer.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **au moins 1 décision architecturale documentée** (choix de structure, trade-off, alternative rejetée + pourquoi). Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

---

## CONTRAT ANTI-RECETTE

Tu choisis toi-même la découpe, les modules, l’ordre de construction et les tests. Aucun squelette d’architecture n’est fourni.

Avant de coder, produis :

- trois hypothèses vérifiables sur le système ;
- une première découpe que tu défends et une alternative rejetée ;
- un test falsifiant une hypothèse importante ;
- les critères qui te feront changer d’architecture en cours de route.

Ne cherche pas une architecture « correcte » dans le curriculum : le but est de reconstruire un modèle sous contrainte, puis de défendre pourquoi il tient.
