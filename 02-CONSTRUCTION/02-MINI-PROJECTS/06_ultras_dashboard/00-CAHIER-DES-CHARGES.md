---
stability: intemporel
acte: comprendre
route_family: core
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : ultras dashboard

Temps de lecture ~14 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
TypeScript   : v5+ (installé comme dépendance locale via npm install)
Variables env : aucune
Outils externes: aucun

# Installation
$ npm install

# Compiler et vérifier les types
$ npx tsc --noImplicitAny --noEmit

# Démarrer le serveur (ts-node pour le dev)
$ npm start

# Lancer les tests
$ npm test
```

`ts-jest` est utilisé pour exécuter les tests TypeScript directement sans étape de build séparée. La config `tsconfig.json` est fournie dans le projet. Si `npx tsc --noImplicitAny --noEmit` sort avec 0 erreurs, le typage est propre.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Le club de foot le plus suivi de la saison. Des milliers d'ultras connectés pendant le match. Des événements arrivent à 200 par minute : but, passe décisive, tir cadré, faute, possession actualisée, xG (Expected Goals : buts attendus calculés selon la qualité des occasions). Le dashboard doit ingérer tout ça, le traiter, l'afficher en temps réel, et alerter si quelque chose cloche (latence trop haute, taux d'erreur qui monte, serveur sous charge). Si le serveur tombe pendant le match : les ultras brûlent tout.

Ce que tu dois voir tourner à la fin :

```bash
$ npm run start

[SERVER] Ultras Dashboard : écoute sur le port 4000
[INGEST] Pipeline prêt : buffer: 0 events
[METRICS] Dashboard http://localhost:4000/metrics

--- (simulation de match lancée) ---

[EVENT] But de Mbappé (32') : xG: 0.73 : possession: 58%
[TRACE] req-id: e7f2a1 | ingest -> process -> store -> broadcast | 12ms total
[ALERT] Latence P99 > 200ms depuis 30s : threshold dépassé
[SENTRY] Exception capturée : broadcastError : context: { matchId: 'PSG-OM', turn: 67 }
[METRICS] events_total: 1420 | errors_total: 3 | p99_latency_ms: 187

$ npm test
PASS tests/pipeline.test.ts (22 tests)
PASS tests/metrics.test.ts (14 tests)
PASS tests/tracing.test.ts (12 tests)
PASS tests/alerting.test.ts (10 tests)
```

Ce projet est en TypeScript. Le pipeline d'ingestion d'événements est typé de bout en bout. C'est aussi le premier projet avec de l'observabilité réelle : logging structuré, tracing distribué simulé, métriques, alertes, Sentry.

## POURQUOI CE PROJET EXISTE

Ce projet teste une compétence que les juniors n'ont pas : savoir ce que fait son système en production, avant que les utilisateurs le signalent.

- **un système qui n'a pas de logs structurés est un système aveugle** : "le dashboard a lagué pendant le match" n'est pas un rapport d'incident utilisable. "Latence P99 = 2300ms pendant 47 secondes à 21h32, corrélée avec un pic d'events de possession à 320/min" : ça, on peut travailler avec.
- **un pipeline d'events sans types, c'est une bombe à retardement** : si un event `{ goals: '1' }` arrive avec `goals` en string au lieu de number, et que le code attend un number, tout plante silencieusement. TypeScript attrape ça à la compilation.
- **scaler horizontalement sans observabilité, c'est du chaos** : si deux instances du serveur tournent en parallèle, comment savoir laquelle a reçu quel event ? Les correlation IDs (identifiants uniques attachés à chaque requête pour la suivre d'un service à l'autre) répondent à cette question.

## LES 3 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `03-PILOTAGE/05-OBSERVABILITY` : logging, tracing, métriques, Sentry

**Où ça se voit** : `src/observability/` entier.
**Pourquoi c'est nécessaire ici** : sans observabilité, on ne sait pas ce que le pipeline fait en prod. Logging structuré en JSON pour chercher les events corrélés. Tracing pour suivre un event de l'ingestion à l'affichage. Métriques pour les seuils d'alerte. Sentry pour les exceptions.

### `05-MAITRISE/02-SCALABILITY` : rate limiting, message queues, load balancing simulé

**Où ça se voit** : `src/queue/`, `src/balancer/`, `src/middleware/rateLimiter.ts`.
**Pourquoi c'est nécessaire ici** : 200 events par minute ça tient. 2000 events par minute si tous les ultras rafraîchissent en même temps : le pipeline doit absorber le pic sans tomber. La queue découple l'ingestion du traitement.

### `02-CONSTRUCTION/12-TYPESCRIPT` : generics, utility types, types stricts sur tout le pipeline

**Où ça se voit** : tous les fichiers `.ts` du projet.
**Pourquoi c'est nécessaire ici** : `Event<T>` permet de typer un event de match différemment d'un event de possession, tout en partageant la même infrastructure de traitement. `Pipeline<Input, Output>` décrit explicitement ce que chaque étape attend et retourne.

### Résumé visuel

```text
03-PILOTAGE/05-OBSERVABILITY --> src/observability/ (logger, tracer, metrics, sentry)
05-MAITRISE/02-SCALABILITY  --> src/queue/ (message queue), src/balancer/ (round-robin simulé)
02-CONSTRUCTION/12-TYPESCRIPT   --> generics Event<T>, Pipeline<I,O>, utility types sur les structs
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 20 à 28 heures de travail réel.

| Étape              | Durée estimée | Zone de résistance                                            |
| ------------------ | ------------- | ------------------------------------------------------------- |
| Types TypeScript   | 2h            | Moyenne : bien définir les generics dès le départ             |
| logger + tracer    | 2h            | Faible                                                        |
| metrics + alerting | 3h            | Moyenne : les histogrammes P99 sont subtils                   |
| eventQueue         | 1h30          | Faible                                                        |
| pipeline complet   | 4-5h          | **Haute** : le typing de bout en bout sans `any`              |
| middleware         | 2h            | Moyenne                                                       |
| simulator          | 1h30          | Faible                                                        |
| server.ts          | 1h            | Faible                                                        |
| Tests complets     | 3-4h          | Moyenne : tester des métriques qui s'accumulent dans le temps |

Le point de résistance majeur est le pipeline typé sans `any`. La tentation d'écrire `event as any` pour contourner une erreur TypeScript est forte. Résiste. Si tu as besoin de `any`, c'est que le type d'entrée est mal défini.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Queue pleine** : si la queue atteint sa taille max, le nouvel event est rejeté sans planter le serveur. Un log d'erreur doit être émis.
2. **Event avec champ manquant** : `{ type: 'goal', matchId: 'PSG-OM' }` sans le champ `minute`. Le validator doit rejeter, pas laisser passer un objet partiel.
3. **Spike soudain de 10x le volume** : le matchSimulator injecte 10x les events normaux pendant 5 secondes. Le serveur ne doit pas crasher.
4. **Alerte déclenchée puis résolue** : la latence dépasse le seuil, l'alerte se déclenche. Puis la latence repasse en dessous. L'alerte doit se résoudre sans alerte fantôme.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Zéro `any` dans le code TypeScript.** `unknown` est acceptable dans le validator avant que le type soit confirmé. `any` ne l'est pas.
2. **Chaque event entrant a un correlation ID.** Si l'ID n'est pas dans le body de la requête, le middleware en génère un. Aucun event ne traverse le pipeline sans ID.
3. **Les métriques sont loggées, jamais perdues.** Si le broadcaster plante, les métriques de cet event sont quand même enregistrées.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas de vraie base de données (les events sont en mémoire, le store est une Map).
- Pas de vrai Sentry (le module `sentry.ts` simule la capture sans appeler l'API Sentry). Raison : créer un compte Sentry et configurer un DSN sort du scope pédagogique. L'interface de `sentry.ts` est identique à celle du vrai SDK : si tu veux brancher le vrai Sentry, tu changes uniquement l'implémentation de `captureException`, pas le code qui l'appelle.
- Pas d'interface frontend (le dashboard est simulé via `/metrics` en texte).
- Pas de WebRTC.
- Le `roundRobin.ts` simule la distribution de charge entre plusieurs instances : en pratique, il distribue les events entrants entre N workers fictifs (tableau d'index, chacun son tour). Il intervient dans le `QueueWorker` au moment de choisir quel worker traite l'event suivant. Ce n'est pas un vrai load balancer réseau : c'est la simulation du comportement pour comprendre le principe avant de le voir en vrai dans une infra.

## LES ADR

```text
ADR/001-pourquoi-queue-entre-ingest-et-traitement.md
ADR/002-pourquoi-generics-sur-les-events-plutot-que-union-types.md
ADR/003-pourquoi-correlation-id-genere-cote-serveur.md
```

Micro-exemple de forme (contexte distinct du projet) :

L’objectif est uniquement d’illustrer la rédaction d’un ADR complet ; aucune décision du projet n’est donnée.

```markdown
# ADR : Conserver une fenêtre glissante pour une série temporelle courte

## Contexte

Un écran affiche en permanence les vingt dernières mesures d’une sonde.

## Décision

Conserver uniquement une fenêtre glissante bornée à vingt valeurs.

## Alternatives considérées

- Conserver toute l’historique en mémoire : rejeté car l’historique n’est pas nécessaire à cet écran.
- Recharger depuis une base à chaque rafraîchissement : rejeté pour sa complexité et sa latence ici.

## Conséquences

L’empreinte mémoire reste bornée, au prix de l’absence d’accès direct aux mesures plus anciennes depuis cette structure.
```

**Important : exemple distinct du projet. Tes décisions, métriques et compromis doivent être construits par toi.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] la simulation de match tourne 5 minutes sans crash
[ ] chaque event a un correlation ID dans les logs
[ ] les métriques events_total et errors_total sont correctes après simulation
[ ] une alerte se déclenche quand la latence P99 dépasse le seuil configuré
[ ] zéro `any` dans les fichiers .ts (vérifié avec tsc --noImplicitAny)
[ ] les 4 cas limites ont chacun un test qui passe
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente au moins un bug de concurrence ou de timing rencontré
[ ] 02-TDD-JOURNAL.md trace quels tests ont été écrits avant le code correspondant
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- XSS (OWASP A03) : échapper toute donnée utilisateur affichée dans le dashboard.
- Contrôle d'accès (OWASP A01) : un utilisateur ne voit que les données de son périmètre.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Le `97-CHECKPOINT-PACK` de ce projet contient un test de sécurité qui doit passer.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

---

## SURPRISE MI-PARCOURS (spec drift, obligatoire)

Spec drift obligatoire, voir `../../../05-MAITRISE/06-ANNEXES/27_synthese_mini_projects/04-spec_drift.md`
(protocole unique, tirage aléatoire, déclenchement à 40 % d'avancement).

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
