---
stability: intemporel
acte: comprendre
route_family: depth
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Cahier des charges : ballon d'or CLI

Temps de lecture ~13 min

## PRÉREQUIS ET ÉTAT INITIAL DU ZIP

- Node.js `22.23.4` recommandé ; Docker `24+` est optionnel et doit rester la dernière étape.
- Le récit du « code v1 » est le contexte de l'exercice : aucun dépôt v1, `package.json`, source CLI ou test n'est livré dans ce ZIP. Tu construis le prototype à partir du cahier des charges ; ne cherche pas un fichier legacy qui n'existe pas.
- Aucun Dockerfile n'est fourni au départ.

Commandes disponibles dès réception :

```bash
node --version
npm --version
docker --version  # uniquement si Docker est installé ; optionnel
```

Après création du CLI et de sa suite : lancer la commande CLI et `node --test` (ou le script de test réellement défini). `docker build` ne devient possible qu'après création et validation d'un Dockerfile.

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Les journalistes du monde entier votent. Chaque vote est soumis depuis le terminal. Les points s'agrègent. Le classement se met à jour. Des commandes disponibles : `vote`, `rank`, `simulate`, `reset`, `export`. Le scénario imagine une v1 écrite dans l’urgence. Cette v1 n’est pas incluse dans l’archive : le livrable demandé est de concevoir une CLI neuve à partir des invariants métier, puis de justifier ses frontières. Et cette fois, elle est SOLID, testée, containerisée, et déployée proprement.

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

**État réel de l'archive :** aucune version `legacy/ballonDorV1.js` n'est fournie. Le projet est donc un **greenfield guidé par des invariants métier**, pas une migration de code existant. Tu construis la première version à partir de la spécification, puis tu la fais évoluer par décisions et tests. Ne prétends pas avoir caractérisé ou refactorisé un legacy absent.

## POURQUOI CE PROJET EXISTE

Ce projet teste la capacité à comprendre un codebase existant, à le corriger sans le réécrire d'un coup, et à le rendre opérationnel comme un vrai outil :

- **concevoir des modules SOLID à partir d'un contrat métier** : aucun code v1 n'est livré. Tu pars des invariants, sépares CLI, domaine, persistance et présentation, puis tu justifies les frontières. Le travail est une conception greenfield, pas une refactorisation observée.
- **gérer des erreurs dans un contexte CLI** : un CLI a deux types de sorties : stdout pour les résultats, stderr pour les erreurs. Un vote invalide ne doit pas planter le processus avec une stacktrace. Il doit afficher un message clair et sortir avec le bon code de sortie (`process.exit(1)`).
- **automatiser un outil de bout en bout** : containeriser avec Docker, lancer les tests en CI à chaque push, exporter les résultats en CSV. Un outil CLI "qui tourne sur ma machine" n'est pas un livrable.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/13-RUNTIME-ENV` : CLI Node.js, process.argv, filesystem

**Où ça se voit** : `src/cli.js`, `src/parser/argsParser.js`, `src/export/csvExporter.js`.
**Pourquoi c'est nécessaire ici** : `process.argv` pour lire les flags (`--player`, `--points`). `process.exit(code)` pour le code de sortie. `fs.writeFileSync` pour l'export CSV. C'est le kit de base du CLI Node.

### `02-CONSTRUCTION/11-REFACTORING` : SOLID sur du code CLI procédural

**Où ça se voit** : découpage de `src/` en parsing CLI, validation métier, agrégation des scores, persistance, rendu et export.
**Pourquoi c'est nécessaire ici** : les règles de vote, le classement et les formats de sortie évoluent pour des raisons différentes. Les séparer limite les effets de bord et permet de tester chaque règle sans démarrer toute la CLI. Ce projet enseigne la conception modulaire ; il ne prétend pas enseigner une migration legacy réelle.

### `01-CADRAGE/04-ERROR-HANDLING` : custom errors, propagation, exit codes

**Où ça se voit** : `src/errors/`, les `try/catch` dans `cli.js`.
**Pourquoi c'est nécessaire ici** : `InvalidVoteError`, `PlayerNotFoundError`, `QuotaExceededError` permettent de répondre différemment selon le type d'erreur. Un vote invalide = message d'erreur + exit 1. Un joueur introuvable = suggestion de correction + exit 1. Une erreur système = stacktrace sur stderr + exit 2.

### `05-MAITRISE/06-ANNEXES` : Git workflow, Docker, GitHub Actions

**Où ça se voit** : `Dockerfile`, `.github/workflows/ci.yml`, conventions de commits.
**Pourquoi c'est nécessaire ici** : un outil CLI sans containerisation ne peut pas être distribué à 180 journalistes avec des environnements différents. Sans CI : les tests passent en local, échouent chez les autres, personne ne sait.

### Résumé visuel

```text
02-CONSTRUCTION/13-RUNTIME-ENV --> src/cli.js (argv), src/export/csvExporter.js (fs), src/store/jsonStore.js
02-CONSTRUCTION/11-REFACTORING --> découpage de src/ en modules testables (SOLID, séparation des couches)
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
3. **Ne fabrique pas une preuve de legacy.** Aucun ancien code n'est fourni. Les invariants du cahier et les tests de contrat sont la référence. Si tu crées une ancienne implémentation pour t'entraîner, place-la dans `fixtures/` et marque-la `EXERCISE_FIXTURE` ; elle ne représente pas un historique réel.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface web.
- Pas de base de données (JSON sur le filesystem uniquement).
- Pas de TypeScript.
- La validation, l'acceptation et l'écriture des bulletins restent mono-writer : un seul processus décide et persiste. Des Worker Threads peuvent uniquement générer des jeux de données synthétiques pour `simulate`, puis transmettre les lots au processus principal. Aucun worker n'écrit directement dans le journal de votes.

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
[ ] aucun document ni livrable ne présente un fichier legacy absent comme preuve ; les invariants du contrat sont couverts par des tests
[ ] les 5 cas limites ont chacun un test qui passe
[ ] les exit codes sont corrects (testé dans cli.test.js)
[ ] les erreurs vont sur stderr, les résultats sur stdout (vérifié manuellement)
[ ] Dockerfile construit et le CLI tourne dans le container
[ ] le workflow CI tourne les tests à chaque push (fichier .github/workflows présent)
[ ] les ADR sont remplis avec contexte, décision, alternatives, conséquences et signal de révision
[ ] 08-POSTMORTEM.md documente les hypothèses initiales, les décisions modifiées et les écarts par rapport aux invariants spécifiés (pas de comparaison fictive v1/v2)
[ ] 02-TDD-JOURNAL.md trace dans quel ordre les tests ont été écrits
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Injection d'arguments (OWASP A03) : valider les arguments CLI, ne jamais passer une entrée brute à un shell/eval.
- Chemins (OWASP A01) : empêcher le path traversal si le CLI lit/écrit des fichiers fournis par l'utilisateur.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Ajoute dans le dossier `tests/` de ce projet un test ciblé pour au moins une des menaces retenues. Documente dans le README la commande exacte qui exécute ce test. Aucun pack de correction séparé n’est fourni dans ce projet.

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

<!-- AF-BALLO-DOR-REAL-PRODUCT-GATE-1.1 -->

## Mission produit évaluée : Ballot Integrity & Audit CLI

Le classement sportif est le contexte mémorisable. La mission évaluée est de construire un outil de collecte et d'audit de votes pour une association sportive ou un prix communautaire. Utilise **uniquement des identifiants pseudonymes et des données synthétiques** : ce projet n'est ni un système électoral juridiquement valable, ni une plateforme de scrutin à enjeu élevé.

### Problème terrain

Un club reçoit des bulletins par fichiers CSV/JSON. Des doublons, imports répétés, points invalides et règles d'égalité incohérentes peuvent fausser le classement. Le responsable doit pouvoir comprendre ce qui a été accepté, rejeté, corrigé et exporté.

### Livrable attendu

Une CLI versionnée avec les commandes `validate`, `import`, `rank`, `audit`, `export` et `simulate`. Le modèle et les règles métier sont séparés de l'interface terminal et du stockage.

```text
CSV / JSON entrant
       |
       v
 validation + quarantaine ----> rapport des rejets
       |
       v
 identité pseudonyme + idempotence
       |
       v
 journal append-only de bulletins
       |
       v
 règles de score versionnées -> classement déterministe
       |                              |
       +---------- audit / export ---+
```

### Exigences d'acceptation

1. Valider format, concours, candidat, score, identifiant et taille de chaque ligne avant écriture.
2. Mettre les lignes invalides en quarantaine avec un motif exploitable ; ne pas abandonner silencieusement tout un lot.
3. Empêcher un second bulletin pour le même pseudonyme et le même concours, selon une règle explicite.
4. Rendre l'import idempotent : rejouer exactement le même fichier ne crée aucun nouveau bulletin.
5. Conserver un journal append-only ; une correction est un nouvel événement lié à l'ancien, pas une réécriture silencieuse. Un hash aide à détecter une altération, mais ne prouve pas à lui seul l'identité de l'auteur ni l'authenticité du vote.
6. Versionner la règle de score et de départage ; produire le même classement avec les mêmes données et la même version de règle.
7. Fournir `audit` pour expliquer acceptations, rejets, doublons et corrections ; exporter CSV avec échappement correct.
8. Ne jamais stocker nom, email ou autre donnée personnelle réelle : le lab utilise des pseudonymes synthétiques.
9. Documenter les limites du stockage local JSON/SQLite : concurrence multi-processus, sauvegarde, corruption, verrouillage et absence de déploiement multi-hôte. Pour dépasser ces limites, proposer une évolution transactionnelle sans l'implémenter gratuitement.

### Gate de preuve

- Le même lot importé deux fois donne le même nombre de bulletins et le même digest logique.
- Deux lignes concurrentes portant le même identifiant de bulletin ne sont acceptées qu'une fois.
- Un bulletin dupliqué pour un pseudonyme/concours est rejeté ou mis en quarantaine selon la règle annoncée.
- Les égalités sont traitées selon une règle versionnée et testée.
- L'audit permet de retrouver pourquoi chaque ligne a été acceptée ou rejetée.
- L'export est déterministe et protège les séparateurs, guillemets et retours à la ligne.
- Un test de panne pendant l'import prouve la stratégie de reprise (tout ou rien, ou reprise par lot documentée).
- Le rapport final distingue `LAB`, `SIMULATION`, `PILOT` et `PRODUCTION`. Aucun chiffre d'exemple n'est déclaré comme résultat mesuré.

### Limites explicites

Ce projet ne prétend pas fournir un scrutin anonyme, résistant à un adversaire étatique, juridiquement opposable ou audité cryptographiquement. Le journal append-only et les hashes ne remplacent ni une identité vérifiée, ni un protocole de vote sécurisé, ni une revue externe. Le stockage local convient au laboratoire ; toute utilisation réelle impose une analyse juridique, sécurité, protection des données et architecture adaptée.
