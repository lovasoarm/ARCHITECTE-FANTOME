---
stability: intemporel
acte: comprendre
route_family: core
---

> ### SCÈNE CRAZYDEVS : Walking Dead
>
> Le système est maintenant ton camp de survivants : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# Cahier des charges : walking dead protocol

Temps de lecture ~17 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : aucune
Outils externes: Playwright (installé via npm install)

# Installation
$ npm install
$ npx playwright install chromium  # navigateur pour les tests E2E

# Lancer le camp (le CLI de gestion)
$ node src/cli.js status

# Lancer les tests unitaires et d'intégration
$ npm test

# Lancer les tests E2E
$ npm run test:e2e
```

Pas de serveur web. Le camp se gère depuis la ligne de commande. Playwright teste le comportement du CLI via des processus Node enfants.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Le groupe de Rick Grimes a besoin d'un système de gestion de camp : inventaire de ressources, rotations de garde, rations alimentaires, niveaux de sécurité par périmètre. Le code existe déjà : `legacy/campV1.js`. Il a été écrit en pleine nuit, sous la pression des morts-vivants. C'est du spaghetti. Une seule fonction de 300 lignes. Des variables globales partout. Zéro test. Personne ne sait ce qu'il fait vraiment.

Ton boulot : ne jamais ajouter de feature avant d'avoir des tests. Refactorer sans rien casser. Transformer ce camp en forteresse de code propre.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/cli.js status
[CAMP RICK] Alexandria : jour 47
[SECURITE] Périmètre nord : OK | Périmètre sud : ALERTE (niveau 3)
[INVENTAIRE] Nourriture : 14 jours | Munitions : 847 | Médicaments : CRITIQUE (3 unités)
[GARDES] Rotation suivante dans 4h | Poste A : le sniper | Poste B : Michonne

$ node src/cli.js rotate-guards
[ROTATION] Nouvelle rotation : le sniper -> Glenn | Michonne -> Carl
[LOG] Rotation enregistrée à 22:41

$ node src/cli.js consume --resource food --amount 3
[INVENTAIRE] Nourriture : 11 jours restants
[ALERTE] Seuil critique atteint dans 6 jours si consommation constante

$ node src/cli.js add-threat --level 4 --perimeter south
[SECURITE] Menace enregistrée : périmètre sud, niveau 4
[ALERTE] Niveau critique : évacuation possible dans 2h

$ npm test
PASS tests/inventory.test.js (22 tests)
PASS tests/guards.test.js (18 tests)
PASS tests/security.test.js (16 tests)
PASS tests/cli.test.js (20 tests)

$ npm run test:e2e
PASS e2e/campWorkflow.spec.js (8 scénarios)
```

Ce projet a deux versions coexistantes : `legacy/campV1.js` (jamais modifié) et `src/` (ta v2 propre). Même comportement observable, structure interne entièrement différente.

## POURQUOI CE PROJET EXISTE

Ce projet teste une compétence que les juniors évitent systématiquement : travailler sur du code existant qu'on n'a pas écrit, sans le réécrire d'un bloc.

- **écrire des tests sur du code sans tests** : avant de toucher quoi que ce soit dans `legacy/campV1.js`, tu dois le couvrir par des tests. C'est la seule façon de savoir si ta refactorisation casse quelque chose.
- **refactorer sans régression** : chaque petite étape de refactoring est validée par les tests. Pas de grand saut. Pas de "je réécris tout et je vois si ça marche". Étape par étape, test vert après test vert.
- **TDD pur sur les nouvelles features** : une fois la v2 en place, chaque nouvelle fonctionnalité suit le cycle red/green/refactor. Le test arrive avant le code, toujours.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/03-TESTING` : unit, intégration, mocking, E2E Playwright

**Où ça se voit** : tout le dossier `tests/` et `e2e/`.
**Pourquoi c'est nécessaire ici** : couvrir un legacy sans tests, puis passer au TDD pour les nouvelles features. Les deux exercices en un. Playwright simule un opérateur qui tape des commandes dans le terminal.

### `02-CONSTRUCTION/11-REFACTORING` : SOLID sur du code procédural, code smells

**Où ça se voit** : le passage de `legacy/campV1.js` vers `src/`. Chaque module de `src/` correspond à une responsabilité extraite du monolithe original.
**Pourquoi c'est nécessaire ici** : `campV1.js` viole SRP (une seule fonction fait tout), OCP (ajouter une feature = modifier la fonction existante), DIP (la logique métier dépend directement du filesystem). La v2 corrige les trois.

### `02-CONSTRUCTION/13-RUNTIME-ENV` : CLI Node.js, fs, Worker Threads

**Où ça se voit** : `src/cli.js`, `src/store/fileStore.js`, `src/workers/threatSimulator.js`.
**Pourquoi c'est nécessaire ici** : `process.argv` pour les commandes CLI, `fs.promises` pour la persistance JSON, Worker Threads pour simuler des vagues de menaces en parallèle sans bloquer le CLI.

### `05-MAITRISE/07-TOOLS` : logger structuré, benchmark, debug toolkit

**Où ça se voit** : `src/logger/`, `src/debug/`.
**Pourquoi c'est nécessaire ici** : les opérations du camp sont loggées en JSON structuré avec timestamp et niveau. Le debug toolkit permet de rejouer un scénario passé depuis les logs. Ce sont des outils réutilisables dans n'importe quel autre projet du curriculum.

### Résumé visuel

```text
02-CONSTRUCTION/03-TESTING  --> tests/ (unit + integration), e2e/ (Playwright), mocks/
02-CONSTRUCTION/11-REFACTORING --> legacy/ -> src/ (SOLID, code smells éliminés)
02-CONSTRUCTION/13-RUNTIME-ENV --> src/cli.js (argv), src/store/fileStore.js (fs), src/workers/
05-MAITRISE/07-TOOLS    --> src/logger/ (JSON structuré), src/debug/ (replay de scénarios)
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 16 à 24 heures de travail réel.

| Étape                         | Durée estimée | Zone de résistance                                                                         |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| Lire et comprendre campV1.js  | 1-2h          | **Haute psychologiquement** : du spaghetti intentionnel, c'est déstabilisant               |
| Tests sur le legacy (phase 1) | 3-4h          | **Haute** : tester du code sans interface claire demande de l'ingéniosité                  |
| fileStore + logger + alerts   | 2h            | Faible                                                                                     |
| services (3)                  | 3h            | Moyenne                                                                                    |
| handlers + router + cli       | 2h            | Faible                                                                                     |
| tests/cli.test.js             | 1h30          | Faible                                                                                     |
| Worker Thread                 | 2-3h          | Moyenne : les Worker Threads ont une API distincte, postMessage prend du temps à maîtriser |
| E2E Playwright                | 2-3h          | Moyenne : premier contact avec Playwright via CLI                                          |
| scenarioReplayer              | 1h30          | Faible                                                                                     |

La zone de résistance inattendue est la phase 1 : écrire des tests sur du code procédural sans interface claire. Il n'y a pas de fonctions exportées proprement dans `campV1.js`. Point de contrainte : le code procédural n’expose pas d’interface claire. Détermine toi-même une stratégie de test à partir des comportements observables ; justifie ce que tu mesures, ce que tu ignores et pourquoi.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Consommation supérieure au stock** : `consume --resource food --amount 9999` doit throw `InsufficientResourceError`, stderr propre, exit 1. Le stock ne bouge pas.
2. **Rotation de garde avec un poste vacant** : si un garde est absent (malade, KO), la rotation doit remplir le poste vacant en priorité plutôt que de tourner normalement.
3. **Alerte multiple simultanée** : menace niveau 4 + médicaments CRITIQUE en même temps : le CLI doit afficher les deux alertes, pas seulement la plus récente.
4. **Reset confirme avant d'effacer** : `node src/cli.js reset` sans `--confirm` doit demander une confirmation, pas effacer immédiatement. `node src/cli.js reset --confirm` efface sans demander.
5. **Worker Thread qui plante** : si le `threatSimulator` lance une exception, le thread principal doit logger l'erreur et continuer. Le camp ne doit pas crasher parce qu'une simulation de zombie a échoué.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **`legacy/campV1.js` reste intact et jamais modifié.** C'est la référence comportementale. Si un comportement de la v2 diffère, c'est documenté dans `08-POSTMORTEM.md`.
2. **Aucune nouvelle feature avant que les tests correspondants soient écrits en premier.** Red/green/refactor. Si tu te retrouves à écrire du code sans test rouge qui l'attendait, tu t'es écarté du TDD.
3. **Les services ne touchent jamais le filesystem directement.** `inventoryService.consume()` prend un état en paramètre et retourne un nouvel état. C'est le handler qui appelle `fileStore.read()` et `fileStore.write()`. Cette séparation rend les services testables sans mocker le filesystem.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface web.
- Pas de TypeScript.
- Pas de base de données SQL (JSON sur le filesystem uniquement).
- Pas de communication réseau (le Worker Thread communique via `postMessage`, pas via HTTP ou WebSocket).
- Pas de benchmark de performance (c'est le projet `04_breaking_cache` qui couvre ça).

## LES ADR

```text
ADR/001-pourquoi-services-sans-acces-filesystem-direct.md
ADR/002-pourquoi-tdd-avant-refactoring-plutot-qu-apres.md
ADR/003-pourquoi-worker-thread-pour-la-simulation-de-menaces.md
```

Micro-exemple de forme (contexte distinct du projet) :

Cet exemple illustre la rédaction d’un ADR dans un autre problème. Il ne constitue pas un corrigé du projet.

```markdown
# ADR : Échantillonner les métriques au niveau du collecteur

## Contexte

Une plateforme de télémétrie produit beaucoup de mesures très fréquentes alors que le tableau de bord métier n’exige qu’une résolution à la seconde.

## Décision

Réduire la fréquence d’échantillonnage au niveau du collecteur pour cette vue.

## Alternatives considérées

- Conserver toutes les mesures : rejeté pour le coût de stockage.
- Agréger uniquement dans le tableau de bord : rejeté car le volume resterait élevé sur le transport.

## Conséquences

Le coût baisse et la visibilité sur les variations très fines diminue pour cette vue particulière.
```

**Important : cet exemple est volontairement hors contexte. Les ADR du projet doivent rester entièrement ouverts.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] legacy/campV1.js est couvert par des tests avant que la v2 soit commencée
  (vérifiable par git : les tests sur le legacy sont dans un commit séparé)
[ ] les 5 commandes (status, consume, rotate-guards, add-threat, reset) fonctionnent
[ ] les services ne lisent ni n'écrivent jamais le filesystem directement
[ ] les 5 cas limites ont chacun un test qui passe
[ ] le Worker Thread envoie des events au thread principal sans crasher le CLI
[ ] les logs structurés sont en JSON valide dans logs/camp.jsonl après utilisation
[ ] le scenarioReplayer reconstruit un état de camp depuis les logs (testé manuellement)
[ ] les tests E2E Playwright couvrent au moins 2 workflows complets
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente au moins une différence de comportement entre v1 et v2
[ ] 02-TDD-JOURNAL.md trace dans quel ordre les tests ont été écrits (phase 1 vs phase 2)
```

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
