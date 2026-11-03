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

Un club sportif collecte des bulletins pseudonymisés, vérifie les règles et publie un classement traçable. Tu construis une CLI neuve à partir d'un contrat métier : aucun dépôt v1 ou code legacy n'est fourni. La mission est de concevoir des modules testables, de rendre les imports idempotents et d'expliquer les limites de la persistance locale.

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
[EXEMPLE DE SORTIE  : SIMULATION] 500 bulletins synthétiques générés ; aucun résultat de benchmark n'est revendiqué

$ node src/cli.js export --format csv
[EXPORT] classement_2026-06-23.csv créé (23 lignes)
```

---

## PRÉREQUIS ET ÉTAT INITIAL

- Node.js : `v22.23.4` (version de référence du dépôt AF) ; npm est fourni avec Node.js.
- État de l’archive : Le moteur métier et la CLI restent à écrire : aucun `package.json`, source ou test exécutable n’est livré. Docker est une étape optionnelle de fin de projet ; aucun Dockerfile n’est fourni au départ.

### Commandes disponibles dès réception

```bash
node --version
npm --version
```

### Commandes après réalisation du scaffold

Après création de `src/cli.js` et des tests : lancer le point d’entrée et la suite configurée. Ne lance `docker build` qu’après création et validation du Dockerfile ; Docker n’est pas un prérequis pour apprendre le modèle de classement.

---

## ARCHITECTURE

```text
src/
├── cli.js       # point d'entrée : parse process.argv, dispatche les commandes
│
├── commands/
│  ├── voteCommand.js # logique de la commande vote
│  ├── rankCommand.js # logique de la commande rank
│  ├── simCommand.js  # génération contrôlée de lots synthétiques
│  ├── resetCommand.js # remet les votes à zéro
│  └── exportCommand.js # exporte en CSV ou JSON
│
├── store/
│  └── voteStore.js  # lecture/écriture JSON sur le disque (persistence)
│
├── workers/
│  └── simWorker.js  # optionnel : génération synthétique uniquement, aucun accès au store
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

| Module                           | Où ça se voit                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `02-CONSTRUCTION/13-RUNTIME-ENV` | `process.argv`, `fs` ; Worker Threads facultatifs pour fabriquer des fixtures synthétiques |
| `02-CONSTRUCTION/11-REFACTORING` | conception modulaire greenfield : SRP, domaine séparé des adaptateurs                      |
| `01-CADRAGE/04-ERROR-HANDLING`   | `InvalidVoteError`, `PlayerNotFoundError`, `QuotaExceededError`                            |
| `05-MAITRISE/06-ANNEXES`         | Git workflow, Docker, CI/CD sur chaque push                                                |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Chaque commande est dans son propre fichier : un fichier = une responsabilité
2. Les erreurs ont des classes custom avec des messages précis
3. Le processus principal est l'unique writer du journal ; un worker éventuel ne génère que des fixtures et renvoie les données au processus principal
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

Ce projet démontre une compétence clé : transformer un besoin d'audit de bulletins en CLI déterministe, testée et documentée. La capacité à reprendre un codebase inconnu est évaluée dans d'autres projets du parcours ; ce dépôt ne simule pas la présence d'un legacy absent.

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

---

## Comprendre les tests avant de commencer : état exact du ZIP

Référence : [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les exemples de sortie décrivent la cible, pas un logiciel livré, sauf mention contraire.

- Code fourni : aucun programme CLI et aucun test exécutable ; seuls les README des emplacements sont présents.
- Tests de référence verts : aucun. Tests volontairement rouges : aucun.
- Tests à écrire : validation des points, identité/idempotence du vote, règles d'égalité, classement déterministe, import/export CSV, erreurs et charge.
- Validation finale : `node --test tests/*.test.js` après création des tests. `npm test` nécessite un manifeste et le script correspondant.
- Ordre : modèle de vote → validation → agrégateur → classement → CLI → import/export. Preuve : classement reproductible et règles de correction d'un vote explicites.

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

<!-- AF-BALLO-DOR-REAL-PRODUCT-GATE-1.1 -->

## Mission produit évaluée : Ballot Integrity & Audit CLI

Le classement sportif est le crochet narratif. Le livrable portfolio est un outil d'import, de validation, de classement et d'audit de bulletins pseudonymisés pour une association sportive. **Données synthétiques uniquement** : pas d'élection réelle, pas de données personnelles, pas de promesse de scrutin juridiquement valable.

**À livrer :** commandes `validate`, `import`, `rank`, `audit`, `export` et `simulate` ; import CSV/JSON avec quarantaine des lignes invalides ; unicité par pseudonyme/concours ; import idempotent ; journal append-only avec corrections traçables ; règle de score/départage versionnée ; classement déterministe ; export CSV correctement échappé ; tests de doublons, concurrence, reprise et panne.

**Schéma de flux :**

```text
CSV/JSON -> validation -> quarantaine des erreurs
                    |
                    v
            pseudonyme + idempotence
                    |
                    v
           journal append-only
                    |
                    v
       score versionné -> audit -> export
```

Le stockage local JSON/SQLite est acceptable pour le lab et ses limites doivent être démontrées. Il ne constitue pas une architecture multi-hôte. Un `Worker Thread` éventuel génère seulement des données de simulation ; le processus principal reste l'unique writer. Consulte le cahier des charges pour les gates détaillées et les limites de sécurité.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
