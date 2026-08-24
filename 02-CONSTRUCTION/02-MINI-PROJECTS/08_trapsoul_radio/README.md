---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

[ATELIER]

# TRAPSOUL RADIO

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~6 min

Plateforme de radio web dédiée au trapsoul, au RnB et au country underground. Des artistes du monde entier. Des auditeurs de toutes les langues. Une interface qui doit fonctionner au clavier, à la souris, aux lecteurs d'écran, et en 4 langues sans que le code parte en vrille.

Si un auditeur aveugle ne peut pas naviguer vers la prochaine track, la radio ne sort pas.

---

## CE QUE ÇA FAIT

```bash
$ npx http-server dist/ -p 3000
$ npx axe http://localhost:3000

 Contraste WCAG AA : toutes les combinaisons couleur/fond
 ARIA : role="radio" sur le lecteur, aria-live sur la track en cours
 Navigation clavier : tab order logique, skip link vers le contenu principal
 Focus visible sur tous les éléments interactifs
 0 violations trouvées

$ npx tsc --noImplicitAny --noEmit
 0 erreurs
```

---

## INSTALLATION

```text
Node.js : v22.23.2
npm : v10+
TypeScript : v5+
Outils externes: axe-cli, Lighthouse CLI
```

```bash
npm install
npm install -g @axe-core/cli lighthouse
npx http-server dist/ -p 3000 # serveur local
npx axe http://localhost:3000 # audit a11y
npm test # tests unitaires
```

---

## ARCHITECTURE

```text
src/
├── types/
│ ├── track.ts # Track, Artist, Playlist (génériques)
│ ├── i18n.ts # TranslationKeys, Locale, avec clés typées en TS
│ └── player.ts # PlayerState, PlayerEvent
│
├── i18n/
│ ├── fr.ts # clés de traduction françaises
│ ├── en.ts
│ ├── ja.ts # japonais
│ ├── mg.ts # malgache
│ └── i18nService.ts # chargement, fallback, pluralisation
│
├── player/
│ ├── playerEngine.ts # logique de lecture : play, pause, skip, seek
│ ├── playerState.ts # état immutable du lecteur (Track, isPlaying, volume)
│ └── playerEvents.ts # EventEmitter pour les changements d'état
│
├── ui/
│ ├── trackDisplay.ts # aria-live sur la track en cours
│ ├── playlistNav.ts # navigation clavier dans la playlist
│ ├── focusTrap.ts # trap de focus dans les modals
│ └── skipLink.ts # "Aller au contenu" en haut de chaque page
│
├── formatting/
│ ├── dates.ts # Intl.DateTimeFormat par locale
│ └── numbers.ts # Intl.NumberFormat (durée des tracks)
│
└── index.ts

tests/
├── i18n.test.ts
├── playerEngine.test.ts
├── a11y.test.ts
└── formatting.test.ts
```

---

## MODULES CRAZYDEVS COUVERTS

| Module                                 | Où ça se voit                                                           |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `02-CONSTRUCTION/12-TYPESCRIPT`        | Clés de traduction typées, `Track<T>`, types stricts sur tout le player |
| `02-CONSTRUCTION/18-WEB-CONCEPTS`      | Browser render pipeline, LCP/CLS optimisés, métadonnées SEO             |
| `03-PILOTAGE/02-WEB-INCLUSIVE`         | ARIA complet, navigation clavier, contraste WCAG AA vérifié             |
| `03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n` | 4 locales, `Intl.DateTimeFormat`, pluralisation, fallback               |

---

## RÈGLES NON-NÉGOCIABLES DE CE PROJET

```text
1. axe-cli retourne 0 violations avant chaque release
2. Toutes les clés de traduction sont typées en TS : clé absente = erreur de compilation
3. Navigation clavier complète : chaque action accessible sans souris
4. Aucune bibliothèque externe de dates (Intl.DateTimeFormat uniquement)
5. LCP < 2.5s, CLS < 0.1 sur Lighthouse (réseau simulé 4G)
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

Les descriptions de tracks en 4 langues sont l'endroit où une brique IA devient
tentante : traduction automatique à l'ingestion, plutôt que quatre saisies
manuelles. Décide-le avec des chiffres, dans `ADR/ADR-COUT-IA.md`, au format du
contrat de production
04-EPREUVE/04-BIG-APP-SNOOP/90_preuve de vérification dans le livrable staff.md.

Chiffrage d'exercice, à remplacer par ton relevé daté :

| Élément                       |              Volume |    Prix d'exercice |       Coût |
| ----------------------------- | ------------------: | -----------------: | ---------: |
| Entrée : description source   | 220 tokens / langue | 0,000003 € / token | 0,000660 € |
| Sortie : description traduite | 260 tokens / langue | 0,000012 € / token | 0,003120 € |
| Une traduction                |          480 tokens |                  : | 0,003780 € |
| Une track (3 langues cibles)  |        1 440 tokens |                  : | 0,011340 € |

400 nouvelles tracks / mois : `400 × 0,011340 = 4,54 € / mois`. Coût dérisoire —
donc la décision ne se joue **pas** sur le coût, et c'est tout l'intérêt : elle
se joue sur la relecture. Le poste réel est humain : 400 × 3 relectures à 40 s
= 13 h / mois. Écris dans l'ADR le seuil de confiance au-dessous duquel la
traduction part en file de relecture, et le coût de cette file.

**Plafond retenu (exercice) : 25 € / mois**, vérifié côté serveur à l'ingestion.
Au-delà : la track sort avec sa description d'origine et l'attribut `lang`
correct : jamais une chaîne vide, jamais du texte dans la mauvaise langue
annoncée, ce qui casserait le lecteur d'écran.

**SLO de la brique, séparé du SLO du produit :**

|                 | Brique IA                                                                  | Radio                                                                   |
| --------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Objectif        | 99 % des traductions autorisées sont rendues en < 5 s avec `lang` conforme | 99,9 % des sessions permettent d'atteindre la track suivante au clavier |
| Budget d'erreur | 1 % des traductions demandées                                              | 0,1 % des sessions                                                      |
| Fallback        | échec IA                                                                   | pas une panne produit : la langue source annoncée reste accessible      |

Règle d'accessibilité non négociable : une sortie de modèle n'atteint jamais un
attribut `aria-*` ou `lang` sans validation déterministe. Une IA qui casse un
lecteur d'écran coûte plus qu'elle ne fait gagner.

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
- [Postmortem : trapsoul radio](08-POSTMORTEM.md)
- [RULES : 08_trapsoul_radio](01-RULES.md)
- [SECURITY : 08_trapsoul_radio](03-SECURITY.md)
- [Security Gate : 08_trapsoul_radio](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 08_trapsoul_radio](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : trapsoul radio](02-TDD-JOURNAL.md)
- [Cahier des charges : trapsoul radio](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
