---
stability: intemporel
acte: comprendre
route_family: core
---

> ### SCÈNE CRAZYDEVS : Prison Break
>
> Le système est maintenant ton Fox River : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# Cahier des charges : prison break API

Temps de lecture ~13 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : PORT (optionnel, défaut : 3000)
Outils externes: aucun (SQLite est embedded, pas de serveur à démarrer séparément)

# Installation
$ npm install

# Démarrer le serveur
$ node src/server.js

# Lancer les tests (le serveur ne doit pas tourner en parallèle)
$ npm test
```

SQLite est inclus via le package `better-sqlite3` : pas de base de données externe à installer ni à configurer.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Fox River State Penitentiary. Michael Scofield a tatoué le plan sur son corps. Maintenant il faut l'infrastructure derrière. Chaque prisonnier a un profil. Chaque section de la prison (B-Company, Death Row, l'infirmerie) a des access logs. Le plan d'évasion est une série de phases séquentielles avec des accès réservés. T-Bag essaie de hacker le système depuis l'intérieur. L'API doit tenir sous pression, ne jamais exposer ce qui ne doit pas l'être, et résister.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/server.js
[SERVER] Fox River API en écoute sur le port 3000

$ curl -X POST http://localhost:3000/api/evasion/badge \
 -d '{"id": "michael_scofield", "password": "linc_is_innocent"}'
{ "token": "eyJhbGci..." }

$ curl http://localhost:3000/api/prisoners \
 -H "Authorization: Bearer eyJhbGci..."
{ "prisoners": [ { "id": "scofield", "section": "B-Company", "status": "actif" }, ... ] }

$ curl -X POST http://localhost:3000/api/escape-plan \
 -H "Authorization: Bearer ..." \
 -d '{"phase": 1, "section": "infirmerie"}'
{ "status": "accès validé", "nextPhase": 2, "coordinates": "..." }

$ npm test
PASS tests/auth.test.js (20 tests)
PASS tests/prisoners.test.js (16 tests)
PASS tests/escapePlan.test.js (18 tests)
PASS tests/security.test.js (14 tests)
```

C'est le premier projet avec un vrai serveur. Tout ce qui précède tournait en Node pur. Ici tu as des requêtes HTTP, une base de données (SQLite pour rester simple), et une surface d'attaque réelle.

## POURQUOI CE PROJET EXISTE

Ce projet force à penser sécurité et robustesse ensemble, pas séparément :

- **concevoir une API qui ne révèle pas d'information sensible dans ses erreurs** : "utilisateur non trouvé" vs "mot de passe incorrect" sont deux messages différents qui donnent des infos à un attaquant. Fox River répond toujours "identifiants invalides", jamais plus précis.
- **protéger chaque endpoint avec le bon niveau d'authentification** : il y a des endpoints publics (la liste des sections), des endpoints authentifiés (les profils), et des endpoints avec rôle (les phases du plan d'évasion). Pas de route qui accepte n'importe qui par oubli.
- **résister aux attaques d'injection et de force brute** : T-Bag envoie des payloads malformés, des apostrophes dans les IDs, des tokens expirés, 500 requêtes de badge en une minute. Le serveur doit tenir.

## LES 4 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/19-API-CRAFT` : Express, CRUD, middleware, versioning

**Où ça se voit** : toute l'arborescence `src/routes/` et `src/middleware/`.
**Pourquoi c'est nécessaire ici** : structurer une API Express proprement (pas un seul fichier de 500 lignes) avec des routes séparées, des middlewares réutilisables, et une gestion d'erreur centralisée.

### `03-PILOTAGE/04-SECURITY` : JWT, bcrypt, XSS, injection, rate limiting

<!-- AF-DIAGRAM:jwt -->

```text
text
Login ─► Issue token ─► Request + token ─► Verify ─► Allow / Reject
                                      │
                                      └────► Expired / Invalid
```

Le token traverse un cycle de création, transport, validation et expiration.

**Où ça se voit** : `src/auth/`, `src/middleware/rateLimiter.js`, `src/middleware/sanitizer.js`.
**Pourquoi c'est nécessaire ici** : bcrypt sur les mots de passe, JWT signé pour l'auth, rate limiting par IP pour bloquer T-Bag qui force, sanitization des inputs pour l'injection.

### `05-MAITRISE/01-DATABASES` : SQLite, modélisation, indexes, Redis cache

**Où ça se voit** : `src/db/`, `src/cache/`.
**Pourquoi c'est nécessaire ici** : les profils et le plan d'évasion sont persistés en SQLite. Les plans souvent consultés sont cachés en Redis (simulé avec une Map en mémoire si Redis n'est pas disponible).

### `02-CONSTRUCTION/18-WEB-CONCEPTS` : HTTP, status codes, headers, caching

**Où ça se voit** : partout. Chaque réponse a le bon status code, les bons headers, le bon format d'erreur.
**Pourquoi c'est nécessaire ici** : un 200 quand la ressource n'existe pas, un 500 quand c'est une erreur métier : c'est du code qui ment. Fox River répond avec précision.

### Résumé visuel

```text
02-CONSTRUCTION/19-API-CRAFT  --> src/routes/, src/middleware/errorHandler.js, src/server.js
03-PILOTAGE/04-SECURITY   --> src/auth/ (JWT + bcrypt), src/middleware/rateLimiter.js + sanitizer.js
05-MAITRISE/01-DATABASES  --> src/db/ (SQLite), src/cache/ (Redis simulé)
02-CONSTRUCTION/18-WEB-CONCEPTS --> status codes, headers, format d'erreur uniforme
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 18 à 25 heures de travail réel.

| Étape                        | Durée estimée | Zone de résistance                                           |
| ---------------------------- | ------------- | ------------------------------------------------------------ |
| db + migrations              | 2h            | Moyenne : écrire un schema propre dès le début               |
| passwordService + jwtService | 2h            | Faible si le module `03-PILOTAGE/04-SECURITY` est maîtrisé   |
| cacheService                 | 1h            | Faible                                                       |
| prisonerService              | 2h            | Moyenne : logique cache-first                                |
| middlewares                  | 3-4h          | **Haute** : rateLimiter et sanitizer sont subtils            |
| routes complètes             | 3h            | Moyenne                                                      |
| server.js                    | 30min         | Faible                                                       |
| Tests de sécurité            | 3-4h          | **Haute** : tester une injection SQL, un XSS, un brute force |

Le rateLimiter est sous-estimé systématiquement. Gérer le compteur par IP avec un TTL glissant (pas juste une fenêtre fixe) est plus complexe qu'il n'y paraît.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Token expiré** : une requête avec un token expiré doit recevoir 401, pas 500.
2. **Injection SQL dans un paramètre** : `GET /api/prisoners/1' OR '1'='1` doit retourner 400 ou une réponse vide, pas une fuite de données.
3. **Body malformé (JSON invalide)** : `POST /api/evasion/badge` avec un body `"notjson"` doit retourner 400, pas planter le serveur.
4. **Accès à un endpoint protégé sans token** : 401, pas 403, pas 200, pas 500.
5. **Rate limit doit se réinitialiser après la fenêtre de temps** : après 1 minute, les tentatives doivent être à nouveau acceptées.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Zéro requête SQL construite par concaténation de chaînes.** Toujours des requêtes paramétrées : `db.query('SELECT * FROM prisoners WHERE id = ?', [id])`.
2. **Zéro information sur la raison d'un refus d'authentification dans la réponse.** "identifiants invalides", toujours, même si l'ID n'existe pas.
3. **Chaque route protégée a `authGuard` en middleware.** Pas d'endpoint qui oublie son garde.

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface graphique.
- Pas de WebSocket (ce sera dans un autre projet).
- Pas de TypeScript.
- Pas de déploiement en prod (le focus est sur le code, pas l'infra).
- SQLite uniquement pour la persistance (pas Postgres, pas MongoDB ici).
- Redis est simulé par une Map en mémoire dans `cacheService.js`, pas par un vrai serveur Redis. Raison : ajouter Redis introduit une dépendance infra externe (un process séparé à démarrer, configurer, monitorer) qui sort du scope de ce projet. La logique de cache reste la même : `get`, `set`, TTL, invalidation. Seul le backend change. Si tu veux brancher un vrai Redis plus tard, seul `cacheService.js` est à modifier.

## LES ADR

```text
ADR/001-pourquoi-sqlite-plutot-que-postgres.md
ADR/002-pourquoi-jwt-stateless-plutot-que-sessions.md
ADR/003-pourquoi-message-erreur-generique-pour-lauth.md
```

Micro-exemple de forme (contexte distinct du projet) :

Cet exemple montre une décision de conception sans toucher aux problèmes de sécurité du mini-projet.

```markdown
# ADR : Normaliser les noms de fichiers entrants

## Contexte

Un service d’archivage reçoit des fichiers provenant de plusieurs systèmes dont les conventions de nommage diffèrent.

## Décision

Normaliser les noms dès l’entrée et stocker le nom original comme métadonnée.

## Alternatives considérées

- Conserver uniquement le nom original : rejeté car les recherches deviennent dépendantes de conventions externes.
- Renommer uniquement à l’affichage : rejeté car les traitements internes resteraient hétérogènes.

## Conséquences

Les traitements internes ont une convention stable, tandis que la provenance reste traçable.
```

**Important : cet exemple est hors contexte du projet et ne fournit aucune réponse à ses ADR.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] le serveur démarre sans erreur et les endpoints répondent
[ ] /evasion/badge retourne un token valide et un 401 générique en cas d'échec
[ ] les 5 cas limites de sécurité ont chacun un test qui passe
[ ] aucune requête SQL n'est construite par concaténation
[ ] le rate limiter bloque après 5 tentatives (test vérifié)
[ ] le cache est utilisé dans prisonerService (vérifié en logs)
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente au moins une faille trouvée et corrigée pendant le dev
[ ] 02-TDD-JOURNAL.md trace quels tests de sécurité ont été écrits en premier
```

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
