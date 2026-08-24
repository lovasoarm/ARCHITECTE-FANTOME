---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

[ATELIER]

# BALLON D'OR CLI

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~6 min

Les journalistes du monde entier votent. Les points s'agrègent. Le classement se met à jour. La v1 a été codée en une nuit par un stagiaire pressé : elle fonctionne, mais personne n'ose la toucher. La v2, c'est toi qui l'écris. Et cette fois, elle est testée, refactorisée, containerisée.

---

## CE QUE ÇA FAIT

```bash
$ node src/cli.js vote --joueur "Vinicius Jr" --journaliste "L'Equipe-FR" --points 7
[VOTE] L'Equipe-FR --> Vinicius Jr : 7 points enregistrés

$ node src/cli.js rank
CLASSEMENT BALLON D'OR 2026
═══════════════════════════════════════
1. Vinicius Jr  (Real Madrid)  147 pts  ████████████████
2. Bellingham   (Real Madrid)  134 pts  ███████████████
3. Pedri     (Barcelona)   121 pts  █████████████
═══════════════════════════════════════

$ node src/cli.js simulate --votes 500
[SIM] 500 votes aléatoires générés et enregistrés (4 Worker Threads)

$ node src/cli.js export --format csv
[EXPORT] classement_2026-06-23.csv créé (23 lignes)
```

---

## INSTALLATION

```text
Node.js    : v22.23.2
npm      : v10+
Docker     : v24+ (optionnel, pour la containerisation)
Variables env : aucune
Outils externes: aucun
```

```bash
npm install
node src/cli.js rank      # classement actuel
npm test            # tests complets
docker build -t ballon-dor .  # après que les tests passent
docker run ballon-dor rank
```

---

## ARCHITECTURE

```text
src/
├── cli.js       # point d'entrée : parse process.argv, dispatche les commandes
│
├── commands/
│  ├── voteCommand.js # logique de la commande vote
│  ├── rankCommand.js # logique de la commande rank
│  ├── simCommand.js  # logique de la commande simulate (Worker Threads)
│  ├── resetCommand.js # remet les votes à zéro
│  └── exportCommand.js # exporte en CSV ou JSON
│
├── store/
│  └── voteStore.js  # lecture/écriture JSON sur le disque (persistence)
│
├── workers/
│  └── simWorker.js  # Worker Thread pour la génération de votes en parallèle
│
├── errors/
│  ├── InvalidVoteError.js
│  ├── PlayerNotFoundError.js
│  └── QuotaExceededError.js
│
├── utils/
│  ├── formatter.js  # affichage du classement dans le terminal
│  └── csvExporter.js # sérialisation CSV depuis les votes
│
└── data/
  └── joueurs.json  # liste des 23 nominés avec leurs stats

tests/
├── voteCommand.test.js
├── rankCommand.test.js
├── voteStore.test.js
└── errors.test.js
```

Flux d'une commande `vote` :

```text
cli.js --> parseArgs()
 --> voteCommand.execute({ joueur, journaliste, points })
    --> PlayerNotFoundError si joueur inconnu
    --> QuotaExceededError si journaliste a déjà voté 3x aujourd'hui
    --> voteStore.save(vote)
       --> fs.readFileSync (votes actuels)
       --> JSON.parse
       --> ... ajout du vote ...
       --> JSON.stringify
       --> fs.writeFileSync
    --> formatter.printConfirmation(vote)
```

---

## MODULES CRAZYDEVS COUVERTS

| Module       | Où ça se voit                          |
| ------------------- | --------------------------------------------------------------- |
| `02-CONSTRUCTION/13-RUNTIME-ENV`  | `process.argv`, `fs`, Worker Threads pour la simulation     |
| `02-CONSTRUCTION/11-REFACTORING`  | v1 spaghetti → v2 modulaire : SRP sur chaque commande   |
| `01-CADRAGE/04-ERROR-HANDLING` | `InvalidVoteError`, `PlayerNotFoundError`, `QuotaExceededError` |
| `05-MAITRISE/06-ANNEXES`    | Git workflow, Docker, CI/CD sur chaque push           |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Chaque commande est dans son propre fichier : un fichier = une responsabilité
2. Les erreurs ont des classes custom avec des messages précis
3. La commande simulate utilise Worker Threads : jamais bloquer l'event loop principal
4. voteStore.js ne fait que lire et écrire, jamais de logique métier
5. Le Dockerfile est multi-stage : image de prod aussi légère que possible
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
- [Postmortem : ballon d'or CLI](08-POSTMORTEM.md)
- [RULES : 07_ballon_dor_cli](01-RULES.md)
- [SECURITY : 07_ballon_dor_cli](03-SECURITY.md)
- [Security Gate : 07_ballon_dor_cli](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 07_ballon_dor_cli](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : ballon d'or CLI](02-TDD-JOURNAL.md)
- [Cahier des charges : ballon d'or CLI](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
