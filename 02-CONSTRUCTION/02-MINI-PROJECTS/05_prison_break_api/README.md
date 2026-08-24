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

## INSTALLATION

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : PORT (optionnel, défaut 3000)
Outils externes: aucun (SQLite embedded via better-sqlite3)
```

```bash
npm install
node src/server.js  # démarre l'API
npm test       # tests (ne pas lancer le serveur en parallèle)
```

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
│  ├── sanitizer.js    # nettoyage des inputs contre XSS et injection SQL
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
 --> sanitizer (nettoie l'input)
 --> authMiddleware (vérifie le JWT si route protégée)
 --> route handler
 --> service
 --> db
 --> errorHandler (si ça plante)
 --> client
```

---

## MODULES CRAZYDEVS COUVERTS

| Module      | Où ça se voit                      |
| ----------------- | -------------------------------------------------------- |
| `02-CONSTRUCTION/19-API-CRAFT`  | Express complet, CRUD, error middleware, OpenAPI     |
| `03-PILOTAGE/04-SECURITY`   | JWT, bcrypt, rate limiting, sanitization XSS/SQL     |
| `05-MAITRISE/01-DATABASES`  | SQLite, modélisation, indexes, Redis cache sur les plans |
| `02-CONSTRUCTION/18-WEB-CONCEPTS` | HTTP verbes, status codes, browser render pipeline    |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Zéro mot de passe en clair dans la DB : bcrypt uniquement, coût minimum 12
2. Chaque endpoint protégé vérifie le JWT avant tout traitement
3. Rate limiter actif sur /evasion/badge avant même de chercher le prisonnier en DB
4. Tous les inputs de l'utilisateur passent par le sanitizer avant d'atteindre la DB
5. Les erreurs ne leak jamais de stack trace ni de détail interne vers le client
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
