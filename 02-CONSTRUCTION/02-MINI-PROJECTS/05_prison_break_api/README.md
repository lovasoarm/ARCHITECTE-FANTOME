---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# PRISON BREAK API

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~6 min

Fox River State Penitentiary. Michael Scofield a tatoué le plan sur son corps. Maintenant il faut l'infrastructure. Profils de prisonniers, access logs par section, phases d'évasion séquentielles. T-Bag essaie d'injecter du SQL depuis l'intérieur. L'API doit tenir sous pression et ne jamais exposer ce qui doit rester secret.

---

## CE QUE ÇA FAIT

```bash
$ curl -X POST http://localhost:3000/evasion/badge \
 -H "Content-Type: application/json" \
 -d '{"code": "scofield-83712", "pin": "S0a0r0i3"}'

{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "role": "inmate" }

$ curl http://localhost:3000/plan/phase/2 \
 -H "Authorization: Bearer eyJhbGc..."

{ "phase": 2, "objectif": "Infirmerie", "acces": ["couloir-C", "ventilation-3"] }

$ curl -X POST http://localhost:3000/evasion/badge \
 -d '{"code": "tbag"; DROP TABLE prisonniers; --", "pin": "x"}'

{ "error": "InvalidCredentialsError", "code": 401 }
// T-Bag n'a rien cassé
```

---

## PRÉREQUIS ET ÉTAT INITIAL

- Node.js : `v22.23.4` (version de référence du dépôt AF) ; npm est fourni avec Node.js.
- État de l’archive : Le projet cible `better-sqlite3`, une dépendance native. L’archive pédagogique ne contient ni `package.json`, ni code serveur, ni tests : aucun `npm install` ou `npm test` ne peut réussir à la réception. L’installation future devra être faite dans le dépôt apprenant, sur un environnement compatible avec le binaire natif.

### Commandes disponibles dès réception

```bash
node --version
npm --version
```

### Commandes après réalisation du scaffold

Après création du dépôt applicatif : créer le manifeste, ajouter et verrouiller `better-sqlite3`, construire le serveur, puis déclarer le script de test adapté. `node src/server.js` n’est valide qu’après création du point d’entrée ; `npm test` seulement après configuration de la suite.

---

## ARCHITECTURE

```text
src/
├── server.js        # point d'entrée Express
│
├── routes/
│  ├── evasionRoutes.js    # POST /evasion/badge, POST /evasion/renouveler-badge
│  ├── prisonnierRoutes.js # CRUD sur les profils
│  ├── planRoutes.js    # GET /plan/phase/:n (auth requise)
│  └── sectionRoutes.js  # GET /sections/:id/logs (accès restreint)
│
├── middleware/
│  ├── authMiddleware.js  # vérifie et décode le JWT
│  ├── rateLimiter.js   # 5 tentatives max / 15min par IP sur /evasion/badge
│  ├── requestValidator.js # validation de type, format et longueur des entrées
│  └── errorHandler.js   # handler global : format d'erreur uniforme
│
├── services/
│  ├── evasionService.js   # sign, verify, refresh du JWT
│  ├── prisonnierService.js
│  └── planService.js
│
├── db/
│  ├── connection.js    # connexion SQLite unique (singleton)
│  ├── schema.sql     # DDL : tables, indexes, contraintes
│  └── seed.js       # données initiales (Fox River prêt à l'emploi)
│
└── errors/
  ├── AuthError.js
  ├── NotFoundError.js
  └── ForbiddenError.js

tests/
├── auth.test.js
├── prisonniers.test.js
├── plan.test.js
└── security.test.js
```

Flux d'une requête :

```text
client
 --> rateLimiter (bloque si trop de tentatives)
 --> authMiddleware (vérifie le JWT sur les routes protégées ; exception pour la route de connexion)
 --> requestValidator (valide le schéma et les contraintes d'entrée)
 --> route handler
 --> service
 --> db
 --> errorHandler (si ça plante)
 --> client
```

---

## MODULES CRAZYDEVS COUVERTS

| Module                            | Où ça se voit                                                    |
| --------------------------------- | ---------------------------------------------------------------- |
| `02-CONSTRUCTION/19-API-CRAFT`    | Express complet, CRUD, error middleware, OpenAPI                 |
| `03-PILOTAGE/04-SECURITY`         | JWT, Argon2id, rate limiting, rendu XSS sûr, paramètres SQL liés |
| `05-MAITRISE/01-DATABASES`        | SQLite, modélisation, indexes, Redis cache sur les plans         |
| `02-CONSTRUCTION/18-WEB-CONCEPTS` | HTTP verbes, status codes, browser render pipeline               |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Aucun mot de passe en clair dans la DB : Argon2id pour toute nouvelle création de compte ; bcrypt uniquement pour vérifier un hash hérité explicitement identifié et le migrer après authentification réussie.
2. Chaque endpoint protégé vérifie le JWT avant le traitement métier ; la route d'authentification reste l'exception.
3. Le rate limiter s'exécute sur `/evasion/badge` avant toute recherche en DB.
4. Les entrées sont validées selon leur type, format, taille et règles métier ; les valeurs SQL sont toujours liées comme paramètres, jamais concaténées. Les identifiants SQL dynamiques viennent d'une allowlist serveur. Le rendu des données non fiables est protégé au bon contexte ; aucun sanitizer universel ne remplace ces contrôles distincts.
5. Les contenus texte renvoyés par l'API restent des données : tout client qui les affiche utilise `textContent` ou l'échappement automatique de son framework. Si du HTML utilisateur est volontairement accepté, il est assaini avec DOMPurify au point de rendu.
6. Les erreurs ne révèlent ni stack trace ni détail interne au client.
```

---

## DOCUMENTS DU PROJET

```text
00-CAHIER-DES-CHARGES.md  --> spécification complète, ordre de construction, cas limites
02-TDD-JOURNAL.md    --> trace de l'écriture des tests, dans l'ordre réel
08-POSTMORTEM.md     --> ce qui a coincé, ce qui a été appris
ADR/         --> décisions d'architecture documentées
```

---

## BENCH & DÉCISIONS (obligatoire)

Aucun mini-projet n'est "fini" sans cette section. Documente au moins **un**
trade-off chiffré :

- **Question** : "J'ai comparé X vs Y."
- **Charge** : (taille des données, N itérations, hardware).
- **Résultat** : `X = 12ms`, `Y = 48ms` sur 10 000 items.
- **Décision** : "J'ai retenu X car …"
- **Ce que je n'ai pas mesuré** : (mémoire, DX, coût cloud…).

Sans chiffres, ce n'est pas une décision, c'est une préférence.
Voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02A-measure_first.md`.

## Pitch 3 lignes

Ce projet démontre une compétence clé : lire du code inconnu, débugger sous pression, livrer un produit (ADR + tests) qu'un autre dev peut reprendre. Utilisable en portfolio et en entretien.

## Empreinte carbone (critère d'acceptation)

Estime l'empreinte carbone approximative de ton déploiement ou de ton algo. Justifie **un** choix d'optimisation (moins d'invocations, cache, batch, région serveur). Voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`.

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

## Structure attendue

Chaque mini-projet doit contenir a minima :

- `src/` : code source (obligatoire).
- `tests/` : tests unitaires et/ou d'intégration (obligatoire).
- `README.md` : présentation, objectifs, comment lancer.
- `02-TDD-JOURNAL.md` : trace de la démarche TDD.
- `08-POSTMORTEM.md` : ce qui a marché, ce qui a cassé, ce que tu retiens.
- `ADR/` : décisions architecturales (Architecture Decision Records).
- `00-CAHIER-DES-CHARGES.md` : contraintes et périmètre.

Un CI check impose la présence de `src/` et `tests/` avant validation.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Séquence de maîtrise exigée (contrats et sécurité)

1. **Définir l'API** : liste les opérations, entrées valides, erreurs, identité nécessaire et données retournées.
2. **Écrire des tests négatifs avant le correctif** : entrée mal formée, utilisateur non authentifié, utilisateur authentifié mais non autorisé, identifiant d'un autre tenant et dépendance indisponible.
3. **Tracer la frontière de confiance** : montre où l'authentification devient une identité, où l'autorisation objet est décidée et où l'entrée devient une requête persistante.
4. **Injecter un changement** : révoque l'accès ou réutilise une clé d'idempotence ; la suite doit détecter toute exposition ou double opération interdite.
5. **Transférer** : applique la même politique à une seconde ressource et explique quelles règles sont communes et quelles règles restent métier.

**Gate :** un statut HTTP correct ne suffit pas si le corps, le cache ou le log contient une donnée interdite. Aucun test ne doit être présenté comme preuve d'une base réelle s'il ne teste qu'un faux dépôt. Complète avec [65 : Données/API/transactions](../../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md) et [66 : Sécurité/architecture](../../../06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : prison break API](08-POSTMORTEM.md)
- [RULES : 05_prison_break_api](01-RULES.md)
- [SECURITY : 05_prison_break_api](03-SECURITY.md)
- [Security Gate : 05_prison_break_api](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 05_prison_break_api](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : prison break API](02-TDD-JOURNAL.md)
- [Cahier des charges : prison break API](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## Comprendre les tests avant de commencer : état exact du ZIP

Référence : [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les exemples de sortie décrivent la cible, pas un logiciel livré, sauf mention contraire.

- Code fourni : aucun serveur, schéma SQL, `package.json` ou test exécutable ; `src/README.md` et `tests/README.md` sont des emplacements.
- Tests de référence verts : aucun. Tests volontairement rouges : aucun ; écris les tests de contrat avant les routes.
- Tests à écrire : authn/authz par rôle et tenant, validation, paramètres SQL, injection, transactions, contraintes, migrations, erreurs HTTP, concurrence et restauration.
- Validation finale : crée `package.json`, lockfile, base de test jetable et script `test`; ensuite seulement `npm ci && npm test`. Cette commande n'est pas disponible dans le ZIP initial.
- Ordre : modèle de menace/schéma → migrations → tests tenant/auth → repository paramétré → cas d'usage → API → intégration depuis base vide. Preuve : traversée tenant refusée et tests indépendants des données personnelles.

## Règles communes de progression et de preuve

### Contrôle commun de la progression

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État des tests à la réception

- **Code de départ :** aucun fichier source exécutable ; `src/` est un scaffold de documentation.
- **Tests verts de référence :** aucun.
- **Tests volontairement rouges :** aucun fichier de test exécutable n'est fourni à l'état initial. Le premier test rouge est à écrire par l'apprenant avant le code.
- **Tests à créer :** traduire chaque invariant du cahier en test ; ajouter limites, erreurs et contrôles de sécurité.
- **Validation finale :** définir et documenter un runner, créer une suite qui couvre les critères d'acceptation, puis l'exécuter depuis un environnement propre. `tests/README.md` n'est pas un test.

**Ordre de construction :** lire les règles et le cahier, cartographier entrées/sorties, écrire tests du domaine, implémenter modèle et règles, ajouter adaptateurs, orchestration et tests d'intégration. Pour un projet de reprise de legacy, inspecter et caractériser le comportement existant avant la refactorisation.

<!-- AF-PROJECT-REAL-WORLD-GATE-1.1 -->

## Mission produit évaluée : API sécurisée multi-tenant Kintana

Fox River reste une scène pour comprendre les contrôles d'accès et les erreurs de sécurité. Le produit évalué est une **API multi-tenant de demandes et de rendez-vous**, plus proche d'un service professionnel.

### Mission évaluée : API Kintana sécurisée

Construis au minimum ces capacités :

- `POST /v1/requests` avec clé d'idempotence ;
- `GET /v1/requests/:id` avec contrôle propriétaire/tenant ;
- `POST /v1/requests/:id/assign` réservé au superviseur ;
- `PATCH /v1/requests/:id/status` avec transition autorisée ;
- `GET /v1/audit` avec accès restreint et pagination.

Impose validation serveur, requêtes paramétrées, mots de passe hachés si authentification locale, expiration/révocation documentée des sessions, limitation de débit et erreurs sans fuite. Sépare authentification (qui es-tu ?) et autorisation (as-tu le droit sur cette ressource ?).

**Produit de référence :** [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Livrables :** API exécutable, schéma et migrations, contrat OpenAPI, tests d'intégration et tests négatifs entre deux utilisateurs et deux tenants, journal d'audit et ADR.

**Gate :** aucun accès croisé ; aucune injection ; aucune donnée sensible dans les logs ; doublons idempotents ; erreurs stables. Une validation dans le navigateur ne remplace jamais le contrôle serveur.

**Règle de livraison :** la kata d’origine reste utile pour isoler le concept et son univers narratif. La validation finale du projet repose sur la mission métier ci-dessus, ses tests, ses limites et les preuves produites par l’apprenant. Les résultats de simulation ne sont jamais présentés comme des résultats de production.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
