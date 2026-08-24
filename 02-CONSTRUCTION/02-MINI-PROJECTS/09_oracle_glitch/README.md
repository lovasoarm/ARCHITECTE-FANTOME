---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

[ATELIER]

# ORACLE GLITCH

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~6 min

L'IA se prend pour un génie. Elle analyse ton code JS, détecte des bugs, propose des fixes, génère des tests. Parfois elle a raison. Parfois elle invente des fonctions qui n'existent pas, retourne du JSON malformé à mi-chemin, ou te jure qu'un `NaN === NaN` est `true`. Ton boulot : construire le pipeline qui la surveille.

C'est ça, coder avec l'IA en 2026. Pas la croire. La contrôler.

---

## CE QUE ÇA FAIT

```bash
$ node src/cli.js analyze src/cible.js

[STREAM] token: "Le code" token: " présente" token: " un" token: "..."
[VALIDATE] Parsing JSON de la réponse IA...
[VALIDATE] Structure valide : bugs[], fixes[], tests[]
[VALIDATE] Bug détecté : NaN === NaN marqué comme 'true' dans le fix proposé
[VALIDATE] Fix rejeté, signalement enregistré

Résultat :
 bugs trouvés : 3
 fixes validés : 2
 fixes rejetés : 1 (NaN === NaN incorrect)
 tests générés : 4
```

---

## INSTALLATION

```text
Node.js : v22.23.2
npm : v10+
Variables env : ANTHROPIC_API_KEY (obligatoire pour les appels réels)
Outils externes: aucun
```

```bash
npm install
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
node src/cli.js analyze src/cible.js # analyse réelle
npm test # mocks IA, 0 appel API réel
```

---

## ARCHITECTURE

```text
src/
├── cli.js # point d'entrée : parse le fichier cible, lance l'analyse
│
├── classes/
│ ├── CodeAnalyzer.js # analyse statique du fichier JS avant l'envoi à l'IA
│ ├── PromptBuilder.js # construit le consigne à partir du code analysé
│ └── OutputValidator.js # valide la sortie IA via Zod
│
├── validators/
│ ├── Validator.js # classe de base : interface de validation
│ ├── StrictValidator.js # étend Validator : règles plus restrictives
│ └── LLMOutputValidator.js # étend StrictValidator : règles spécifiques aux LLM
│
├── streaming/
│ └── streamingClient.js # appel Anthropic API avec streaming token-par-token
│
├── mixins/
│ └── loggerMixin.js # mixin pour logger les validations sans héritage
│
├── schemas/
│ └── analysisSchema.js # schéma Zod : shape exacte attendue de la sortie IA
│
└── errors/
 ├── LLMTimeoutError.js
 ├── MalformedResponseError.js
 └── ValidationError.js

tests/
├── codeAnalyzer.test.js
├── outputValidator.test.js
├── streamingClient.test.js # mocke l'API Anthropic
└── edgeCases.test.js # NaN, JSON tronqué, timeout, undefined au milieu d'array
```

Flux d'une analyse :

```text
cli.js --> CodeAnalyzer.analyze(fichier)
 --> PromptBuilder.build(analysis)
 --> streamingClient.stream(consigne) # tokens arrivant progressivement
 --> assembler les tokens en JSON
 --> si timeout (3s sans nouveau token) : LLMTimeoutError
 --> OutputValidator.validate(jsonBrut)
 --> Zod parse
 --> si malformé : MalformedResponseError
 --> si NaN incorrectement utilisé : ValidationError
 --> si undefined dans un tableau : ValidationError
 --> cli.js affiche le résultat
```

---

## MODULES CRAZYDEVS COUVERTS

| Module                        | Où ça se voit                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `04-EPREUVE/04-BIG-APP-SNOOP` | Streaming Anthropic, validation Zod, consigne engineering                      |
| `02-CONSTRUCTION/17-OOP-JS`   | `CodeAnalyzer`, `PromptBuilder`, `OutputValidator` : classes, héritage, mixins |
| `03-PILOTAGE/10-TEAM-CRAFT`   | ADR pour chaque décision d'architecture, code review outillée                  |
| `05-MAITRISE/03-EDGE-CASES`   | `NaN === NaN`, JSON tronqué, `0.1 + 0.2`, `undefined` dans un array            |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. Les tests n'appellent JAMAIS l'API Anthropic réelle (streamingClient est toujours mocké)
2. Zod valide chaque sortie IA avant de l'afficher ou de l'utiliser
3. Timeout de 3s sur le streaming : si l'IA ne répond plus, LLMTimeoutError, pas de freeze
4. LLMOutputValidator hérite de StrictValidator qui hérite de Validator : la chaîne est intentionnelle
5. Chaque décision d'architecture est documentée dans un ADR avant d'être codée
```

---

## DOCUMENTS DU PROJET

```text
00-CAHIER-DES-CHARGES.md --> spécification complète, ordre de construction, cas limites
02-TDD-JOURNAL.md --> trace de l'écriture des tests, dans l'ordre réel
08-POSTMORTEM.md --> ce qui a coincé, ce qui a été appris
ADR/ --> décisions d'architecture documentées
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

## CONTRAINTE COÛT / SLO DE LA BRIQUE IA (obligatoire)

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Ce projet appelle un modèle payant : sans plafond ni promesse de service, le
pipeline de surveillance est lui-même hors de contrôle. Tu produis
`ADR/ADR-COUT-IA.md` avec les quatre lignes ci-dessous, chiffrées sur **ta**
mesure, au format du contrat de production
04-EPREUVE/04-BIG-APP-SNOOP/90_preuve de vérification dans le livrable staff.md.

Chiffrage d'exercice, à remplacer par ton relevé daté (URL tarifaire + date) :

| Élément                              |          Volume mesuré |    Prix d'exercice |       Coût |
| ------------------------------------ | ---------------------: | -----------------: | ---------: |
| Entrée : fichier + consignes         | 3 200 tokens / analyse | 0,000003 € / token | 0,009600 € |
| Sortie : bugs + fixes + tests        |   900 tokens / analyse | 0,000012 € / token | 0,010800 € |
| Analyse complète                     |           4 100 tokens |                  : | 0,020400 € |
| Reprise après rejet de schéma (12 %) |           0,12 analyse |         0,020400 € | 0,002448 € |

`cout_par_analyse = 0,020400 + 0,002448 = 0,022848 €`. Sur 300 analyses / jour en
intégration continue : `300 × 30 × 0,022848 = 205,63 € / mois`.

Ce chiffre dépasse volontairement le plafond ci-dessous : c'est le cas normal,
et c'est ce qui rend le comportement de dégradation obligatoire plutôt que
décoratif.

**Plafond retenu (exercice) : 120 € / mois**, soit ~5 250 analyses payantes. À 70 % on alerte, à 85 % on refuse
les fichiers de plus de 400 lignes, à 100 % le disjoncteur s'ouvre côté serveur :
`cli.js` sort en code 0 avec le statut `degraded_ai_quota` et n'analyse plus que
par règles locales (lint + tests existants). Un plafond que le client peut
contourner ne compte pas.

**SLO de la brique, séparé du SLO de l'outil :**

|          | Brique IA                                                                | CLI                                                            |
| -------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Objectif | 99 % des analyses autorisées rendent un JSON conforme au schéma en < 8 s | 100 % des invocations rendent un verdict, IA disponible ou non |
| Fallback | compte comme échec IA                                                    | n'est **pas** un échec CLI s'il est annoncé                    |

Ce que la mesure doit prouver dans `08-POSTMORTEM.md` : le coût par analyse au-delà
duquel tu retires l'IA du pipeline, et ce que tu perds à ce moment-là.

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
- [Postmortem : oracle glitch](08-POSTMORTEM.md)
- [RULES : 09_oracle_glitch](01-RULES.md)
- [SECURITY : 09_oracle_glitch](03-SECURITY.md)
- [Security Gate : 09_oracle_glitch](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 09_oracle_glitch](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : oracle glitch](02-TDD-JOURNAL.md)
- [Cahier des charges : oracle glitch](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
