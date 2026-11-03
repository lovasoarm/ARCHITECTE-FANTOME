---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# RASENGAN ENGINE

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~6 min

Simulateur de combat textuel. Naruto vs Sasuke, Itachi vs Pain, n'importe quelle paire de ninjas avec leurs stats, leurs jutsus, et leurs cooldowns. Le moteur calcule les dégâts, résout les esquives, applique les critiques, et sort un log de combat lisible directement dans le terminal.

Zéro framework. Zéro bibliothèque externe. Du JS pur, et des décisions de conception qui comptent.

---

## CE QUE ÇA FAIT

```bash
$ node src/index.js

[COMBAT] Naruto (Uzumaki) vs Sasuke (Uchiha)
[TOUR 1] Naruto utilise Rasengan : 87 dégâts | Sasuke esquive (prob: 32%)
[TOUR 2] Sasuke utilise Chidori : 112 dégâts | Naruto bloqué (chakra: 140/200)
[TOUR 3] Naruto utilise Rasengan Ōdama : CRITIQUE x1.8 => 156 dégâts
[FIN] Sasuke KO au tour 3. Chakra restant de Naruto : 68/200.
```

---

## PRÉREQUIS ET ÉTAT INITIAL

- Node.js : `v22.23.4` (version de référence du dépôt AF) ; npm est fourni avec Node.js.
- État de l’archive : Sans dépendance externe. Le ZIP contient uniquement les cahiers, gabarits et README de `src/`/`tests/` : aucun `package.json`, source JavaScript ou test exécutable n’est livré.

### Commandes disponibles dès réception

```bash
node --version
npm --version
```

### Commandes après réalisation du scaffold

Après création du code : `node src/index.js`. Pour les tests avec le runner natif Node : `node --test`. `npm test` ne fonctionne qu’après déclaration d’un script `test` dans `package.json`. Aucun `npm install` n’est requis si tu conserves les modules natifs.

---

## ARCHITECTURE

```text
src/
├── fighters/
│  ├── fighterFactory.js  # crée un ninja prêt au combat (Factory pattern)
│  └── fighterStats.js   # stats de base par ninja connu
│
├── jutsus/
│  ├── jutsuRegistry.js  # registre des jutsus, indexés par nom
│  ├── narutoJutsus.js   # jutsus spécifiques à Naruto (Strategy pattern)
│  └── sasukeJutsus.js   # jutsus spécifiques à Sasuke
│
├── engine/
│  ├── combat.js      # orchestre la boucle de combat
│  ├── turnResolver.js   # résout un tour, retourne un nouvel état
│  └── damageCalc.js    # calcule les dégâts d'une attaque
│
├── utils/
│  ├── rng.js       # générateur de probabilités, déterministe en mode test
│  └── cooldownCycle.js  # gestion des cooldowns par modulo
│
├── logger/
│  └── combatLogger.js   # affichage du combat dans le terminal
│
└── index.js        # point d'entrée

tests/
├── fighter.test.js
├── jutsu.test.js
├── combat.test.js
└── rng.test.js
```

Flux d'appel d'un combat complet :

```text
index.js
 --> fighterFactory.createFighter("naruto")
 --> fighterFactory.createFighter("sasuke")
 --> combat.start(naruto, sasuke)
    --> turnResolver.resolve(state)
       --> jutsuRegistry.getJutsu(...)
       --> rng.roll(probability)
       --> damageCalc.compute(...)
       --> cooldownCycle.tick(...)
    --> combat.nextTurn(newState)
 --> combatLogger.printResult(finalState)
```

---

## MODULES CRAZYDEVS COUVERTS

| Module                             | Où ça se voit                                                          |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `00-SOCLE/04-FUNDAMENTALS`         | objets ninja, HOF (`map`/`filter`/`reduce`) partout dans `combat.js`   |
| `02-CONSTRUCTION/04-MATH-BASICS`   | `rng.js` (probabilités), `cooldownCycle.js` (modulo)                   |
| `02-CONSTRUCTION/09-FUNCTIONAL-JS` | `turnResolver.js` : chaque tour retourne un nouvel état, zéro mutation |
| `13_design_patterns`               | `fighterFactory.js` (Factory), `jutsus/` (Strategy)                    |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Zéro mutation directe sur un fighter ou sur l'état du combat
2. Zéro if/switch par jutsu dans le moteur : le moteur appelle, il ne connaît pas
3. Zéro bibliothèque externe (pas de lodash, pas de ramda)
4. rng.js doit avoir un mode déterministe pour que les tests ne soient pas flaky
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

## Séquence de maîtrise exigée (pas seulement une démo)

1. **Prédire** : écris les invariants de combat, de dégâts, de cooldown et de fin de partie avant de lancer le moteur.
2. **Établir une baseline** : conserve la sortie d'un combat déterministe et les tests qui la rendent reproductible.
3. **Casser une hypothèse** : injecte un jutsu inconnu, des stats limites et une source aléatoire contrôlée ; vérifie que le moteur refuse ou traite chaque cas selon le contrat.
4. **Corriger avec preuve** : un test doit échouer avant la correction et réussir après. La sortie visuelle seule n'est pas suffisante.
5. **Transférer** : remplace le domaine « combat » par une simulation d'inventaire ou de réservation en gardant l'architecture de décision, puis indique ce qui ne se transfère pas.

**Gate :** les tests couvrent au moins un invariant, un cas limite, une erreur de contrat et une régression injectée. Explique pourquoi la séparation des responsabilités est utile ici et quand elle serait une abstraction inutile. Utilise [64 : Fondations](../../../06-ANNEXES-TRANSVERSES/64-LAB-FONDATIONS-ET-RAISONNEMENT.md) et [67 : Gate de maîtrise](../../../06-ANNEXES-TRANSVERSES/67-GATE-MAITRISE-ET-CAPSTONE.md).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : rasengan engine](08-POSTMORTEM.md)
- [RULES : 01_rasengan_engine](01-RULES.md)
- [SECURITY : 01_rasengan_engine](03-SECURITY.md)
- [Security Gate : 01_rasengan_engine](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 01_rasengan_engine](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : rasengan engine](02-TDD-JOURNAL.md)
- [Cahier des charges : rasengan engine](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## Comprendre les tests avant de commencer : état exact du ZIP

Référence : [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les exemples de sortie décrivent la cible, pas un logiciel livré, sauf mention contraire.

- Code fourni : aucun module exécutable ; `src/README.md` et `tests/README.md` sont des consignes.
- Tests de référence verts : aucun. Tests volontairement rouges : aucun test exécutable au départ ; le premier rouge est à écrire avant le code.
- Tests à écrire : RNG déterministe, combattants, jutsus, dégâts/cooldowns, invariants de tour, fin de combat, erreurs et reproductibilité.
- Validation finale : après création de `src/` et `tests/`, `node --test tests/*.test.js`. `npm test` n'existe qu'après déclaration d'un script dans `package.json`. La commande CLI `node src/index.js` est une commande d'état final, pas une commande du ZIP reçu.
- Ordre : RNG/tests → modèles → règles de combat → orchestration → CLI/logger → intégration. Preuve : mêmes graines = mêmes combats ; limites et transitions couvertes.

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

## Mission produit évaluée : Moteur de règles et de capacité Kintana

Le simulateur de combat Naruto/Sasuke reste une **kata d'entrée** pour fonctions pures, stratégies et état immuable. Il n'est plus, à lui seul, le livrable de portfolio.

### Mission évaluée : moteur de règles et de capacité Kintana

Construis le moteur de décision du parcours de demande et de réservation :

- règles d'éligibilité selon le type de demande, le centre, le rôle et l'état courant ;
- calcul de capacité disponible avec priorité métier explicite ;
- transitions d'état autorisées/interdites et raisons de refus stables ;
- idempotence d'une commande répétée ;
- concurrence sur le dernier créneau (aucun double-booking) ;
- données de test synthétiques, reproductibles et sans informations personnelles.

**Produit de référence :** [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Livrables :** module de domaine indépendant de l'interface, tests table-driven, test de concurrence/transaction, ADR comparant au moins deux stratégies et rapport de mesure sur un volume annoncé.

**Gate :** zéro mutation cachée ; invariant de capacité vérifié ; même commande rejouée sans double effet ; cas limite et contre-exemple documentés. Un benchmark local reste `LAB`.

**Hors scope :** pas de microservices ni de moteur de règles générique tant que le besoin ne les justifie.

**Règle de livraison :** la kata d’origine reste utile pour isoler le concept et son univers narratif. La validation finale du projet repose sur la mission métier ci-dessus, ses tests, ses limites et les preuves produites par l’apprenant. Les résultats de simulation ne sont jamais présentés comme des résultats de production.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
