---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

[ATELIER]

# LEGACY DUNGEON

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~7 min

Les 9 projets précédents, quelqu'un a pensé à toi en les écrivant. Celui-là, non. Tu clones un vrai dépôt open source, jamais écrit pour t'apprendre quoi que ce soit, et tu dois en sortir vivant : une carte du terrain, un bug corrigé, une décision d'architecture déduite après coup.

C'est ça, ton premier jour dans une équipe. Le code existe déjà. Personne ne te fait la visite guidée.

> **Différence avec `12_legacy_takeover`** : ici le dépôt est **gros et
> vivant** et l'attendu est la **lecture** : cartographier, situer la vraie
> logique, corriger un bug sans casser le reste. En 12, le dépôt est **petit
> et abandonné** et l'attendu est la **reprise de propriété** : remettre la
> suite de tests au vert et assumer la maintenance. Lecture d'abord, reprise
> ensuite.

---

## CE QUE ÇA FAIT

```bash
$ git clone <repo-choisi-par-toi> dungeon/
$ cd dungeon
$ find . -name "*.js" -o -name "*.ts" | grep -v node_modules | xargs wc -l | tail -1
 47832 total # tu mesures, tu ne supposes jamais

[CARTOGRAPHIE] 2h chrono, MAP.md produit
 - point d'entrée réel localisé
 - 6 fichiers où vit la vraie logique
 - diagramme ASCII du flux principal
 - liste honnête de ce qui reste flou

[BUGFIX] 1 bug imposé, corrigé
 - test qui échouait avant : ROUGE
 - test qui passe après : VERT
 - cause réelle expliquée, pas juste constatée

[ADR RÉTROSPECTIVE] 1 décision d'architecture du repo, déduite
 - indices : date des commits, contraintes visibles, absence de TS à l'époque
 - "la prendrais-tu pareil en 2026 ?"
```

---

## INSTALLATION

```text
Node.js : v22.23.2
npm : v10+
Variables env : aucune
Outils externes: git
```

```bash
# ÉTAPE 0 : choisis ton dépôt (voir 00-CAHIER-DES-CHARGES.md pour les 4 critères et les 3 candidats)
git clone <url-du-repo-choisi> dungeon/
cd dungeon

# mesure ce que tu viens de cloner, ne fais confiance à personne, même pas à GitHub
find . -name "*.js" -o -name "*.ts" | grep -v node_modules | xargs wc -l | tail -1

# pas de npm install obligatoire : ce projet c'est lire, pas exécuter
```

---

## STRUCTURE DE CE QUE TU PRODUIS

```text
10_legacy_dungeon/
├── 00-CAHIER-DES-CHARGES.md # spec complète, les 3 étapes, les 4 critères de choix
├── README.md # ce fichier
├── 02-TDD-JOURNAL.md # journal d'investigation : l'ordre réel de ta lecture
├── 08-POSTMORTEM.md # ce qui t'a perdu, ce que t'as fini par piger
├── ADR/
│ └── ADR-001_decision.md # template à remplir, décision déduite
├── MAP.md # à créer toi-même : la carte du repo (ÉTAPE 1)
└── BUGFIX.md # à créer toi-même : la preuve avant/après (ÉTAPE 2)

dungeon/ # le repo OSS que tu clones, à côté, pas dans ce dossier
```

Pas de `src/`, pas de `tests/` ici comme dans les autres mini-projets. Le "src" de ce projet, c'est le dépôt externe que tu choisis et clones à côté.

---

## MODULE CRAZYDEVS COUVERT

| Module                      | Où ça se voit                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `03-PILOTAGE/10-TEAM-CRAFT` | navigation de codebase (`05-navigate_codebase.md`) appliquée pour de vrai, ADR rétrospective, technical writing dans MAP.md/08-POSTMORTEM.md |

Mobilisés en lecture, sans être le coeur du projet : `01-CADRAGE/03-DEBUGGING` (stack traces inconnues), `01-CADRAGE/04-ERROR-HANDLING` (comprendre une stratégie qu'on n'a pas choisie), `02-CONSTRUCTION/11-REFACTORING/03_code_smells` (reconnaître sans corriger), `02-CONSTRUCTION/03-TESTING` (lire des tests existants comme documentation).

---

## AVANT DE CLONER : DEUX PIÈGES MENTAUX À DÉSAMORCER

**Le mépris.** Tu vas tomber sur du code qui te fait lever les yeux au
ciel : une fonction de 400 lignes, un nommage à côté de la plaque, zéro
commentaire là où t'en aurais mis dix. Réflexe naturel : juger. Réflexe
utile : demander pourquoi. Le code que tu regardes a probablement
survécu à des deadlines, des specs qui ont changé trois fois, et des
développeurs qui ne travaillent plus là pour t'expliquer. "C'est mal
écrit" est un jugement de confort. "Je ne sais pas encore pourquoi c'est
écrit comme ça" est un point de départ. Le premier ferme la réflexion,
le second l'ouvre.

**La panique.** 47 000 lignes que tu n'as jamais vues, un bug à trouver,
un chrono qui tourne. Le réflexe de panique pousse à tout lire, ou à
rien lire et tester au hasard. Aucun des deux ne marche. Le protocole de
cartographie (`05-MAITRISE/06-ANNEXES/02-cartographier_codebase_inconnue.md`) existe
justement pour remplacer la panique par une méthode : tu n'as pas besoin
de tout comprendre, tu as besoin de savoir où chercher.

Les deux pièges ont la même racine : traiter l'inconnu comme une menace
plutôt que comme un terrain à cartographier. Le POSTMORTEM de ce projet
te demande explicitement un moment où tu ne savais pas : "je ne sais pas
encore comment ça marche, mais je sais où regarder" est une réponse
valide et attendue, pas un aveu d'échec.

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. L'ÉTAPE 1 (cartographie) est chronométrée à 2h. Dépasser casse l'objectif :
 sentir la pression d'un vrai premier jour, pas explorer en confort
2. Un seul bug corrigé, avec preuve avant/après. Trois bugs bâclés < un bug propre
3. Aucune ligne du repo cloné touchée en dehors du strict nécessaire au bugfix :
 pas de refactoring "pendant que t'y es"
4. L'ADR reconstruit le pourquoi de quelqu'un d'autre, pas tes préférences :
 "j'aurais fait autrement" sans contexte déduit = exercice raté
5. Le POSTMORTEM documente au moins un vrai moment de confusion : zéro moment
 perdu = repo trop simple ou honnêteté insuffisante
```

---

## DOCUMENTS DU PROJET

```text
00-CAHIER-DES-CHARGES.md --> spécification complète, les 4 critères de choix du repo, les 3 étapes
02-TDD-JOURNAL.md --> ordre réel de l'investigation, pas du TDD classique : adapté à l'exploration
08-POSTMORTEM.md --> ce qui a coincé, ce qui a été appris
ADR/ --> décision d'architecture du repo, déduite après coup
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

---

## RÈGLE ZÉRO : LA LOI DU DONJON

Voir `03-RULES.md` pour la règle complète et le format exact du livrable `MAP.md` (unique livrable de cartographie de ce projet).

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [SPEC DRIFT : la specification change en cours de projet](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : legacy dungeon](08-POSTMORTEM.md)
- [RULES : 10_legacy_dungeon](01-RULES.md)
- [SECURITY : 10_legacy_dungeon](03-SECURITY.md)
- [Security Gate : 10_legacy_dungeon](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 10_legacy_dungeon](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : legacy dungeon](02-TDD-JOURNAL.md)
- [Cahier des charges : legacy dungeon](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
