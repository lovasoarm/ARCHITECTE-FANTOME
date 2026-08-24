---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# GARO NO KRONIKA

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~6 min

Des Horrors apparaissent simultanément dans plusieurs quartiers. Le Conseil de Surveillance dispatche des Chevaliers d'Or disponibles. Chaque Chevalier prépare son armure (ça prend du temps), combat, et streame le résultat en direct vers le Conseil. L'armure tient 99,9 secondes maximum : au-delà, elle se désintègre, et la mission échoue.

Le streaming est simulé avec `EventEmitter` natif de Node. Zéro serveur HTTP, zéro port ouvert : l'objectif est de comprendre le pattern event-driven, pas de configurer du SSE réel.

---

## CE QUE ÇA FAIT

```bash
$ node src/index.js

[CONSEIL] Horror détecté : Quartier Est (niveau CRITIQUE)
[CONSEIL] Horror détecté : Quartier Ouest (niveau MODÉRÉ)
[DISPATCH] León Luis => Quartier Est
[DISPATCH] Alfonso San Valiante => Quartier Ouest

[ARMURE] León : préparation... (2.3s)
[ARMURE] Alfonso : préparation... (1.8s)
[COMBAT] León vs Horror Anima : en cours...
[COMBAT] Alfonso vs Horror Blade : en cours...
[STREAM] Alfonso => victoire en 44.2s | Quartier Ouest sécurisé
[STREAM] León => victoire en 67.8s | Quartier Est sécurisé
[CONSEIL] Rapport : 2/2 missions réussies | 0 armures désintégrées
```

---

## INSTALLATION

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : aucune
Outils externes: aucun
```

```bash
npm install
node src/index.js  # lance la démo
npm test       # lance la suite de tests
```

---

## ARCHITECTURE

```text
src/
├── council/
│  ├── council.js     # détecte, dispatche, construit le rapport
│  ├── dispatcher.js    # choisit quel Chevalier va où
│  └── streamReceiver.js  # écoute les événements de combat, ne fait aucun appel sortant
│
├── knight/
│  ├── knight.js       # le Chevalier, son armure, son état
│  └── streamEmitter.js   # émet les événements de combat
│
├── armor/
│  └── armor.js       # préparation de l'armure, timer des 99,9s
│
├── engine/
│  ├── missionRunner.js   # Promise.race entre combat et timeout
│  └── combat.js       # simule le combat lui-même
│
├── errors/
│  ├── ArmorCollapseError.js
│  ├── HorrorEscapeError.js
│  └── KnightDownError.js
│
└── index.js

tests/
├── dispatcher.test.js
├── knight.test.js
├── armor.test.js
└── council.test.js
```

Flux d'appel complet :

```text
index.js
 --> council.detectHorror(location, level)
 --> dispatcher.assign(horror, availableKnights)
    --> knight.prepareMission(horror)
       --> armor.equip(knight)
       --> missionRunner.run(knight, horror)
          --> Promise.race([combat.fight(...), timeout(99900)])
          --> streamEmitter.emit(event)
 --> council.streamReceiver.on(event, handler)  // écoute EN PARALLÈLE des missions
 --> Promise.allSettled([mission1, mission2, ...])
 --> council.buildReport(results)
```

Le Conseil écoute pendant que les missions tournent. Ce n'est pas séquentiel : les deux choses se passent en même temps.

---

## MODULES CRAZYDEVS COUVERTS

| Module           | Où ça se voit                              |
| -------------------------- | ----------------------------------------------------------------------- |
| `01-CADRAGE/02-ASYNC`         | `dispatcher.js` (allSettled), `missionRunner.js` (race + timeout)    |
| `01-CADRAGE/04-ERROR-HANDLING`    | `errors/` (erreurs custom typées), propagation dans `missionRunner.js` |
| `04-EPREUVE/03-REALTIME`       | `streamEmitter.js` / `streamReceiver.js` : pattern SSE simulé en JS pur |
| `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` | découplage total Conseil/Chevalier via événements (event-driven)    |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Zéro catch vide : chaque erreur est classée, remontée ou loggée
2. Le Conseil n'appelle jamais une méthode interne d'un Chevalier directement
3. Chaque erreur custom porte ses métadonnées (knight, horror, durée, pas juste un message)
```

---

## DOCUMENTS DU PROJET

```text
00-CAHIER-DES-CHARGES.md  --> spécification complète, ordre de construction, cas limites
02-TDD-JOURNAL.md    --> trace de l'écriture des tests, dans l'ordre réel
08-POSTMORTEM.md     --> bugs async rencontrés, décisions prises
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
- [Postmortem : garo no kronika](08-POSTMORTEM.md)
- [RULES : 02_garo_no_kronika](01-RULES.md)
- [SECURITY : 02_garo_no_kronika](03-SECURITY.md)
- [Security Gate : 02_garo_no_kronika](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 02_garo_no_kronika](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : garo no kronika](02-TDD-JOURNAL.md)
- [Cahier des charges : garo no kronika](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
