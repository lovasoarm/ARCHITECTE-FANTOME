---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

[ATELIER]

# Mini-projet 12 : Legacy Takeover

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> ~5 min

> **INTEMPOREL** : reprendre un projet abandonné est **le jour 1** de la
> majorité des postes. Personne ne code sur du green-field.

> **Différence avec `10_legacy_dungeon`** : en 10, tu **lisais** un gros
> dépôt vivant pour t'y orienter. Ici tu **prends la responsabilité** d'un
> petit dépôt mort : tests remis au vert, dette tranchée, décisions de
> maintien ou d'abandon assumées par écrit. Le livrable n'est plus une carte,
> c'est un repo dont tu es désormais le mainteneur.

> Avant de commencer : `../10_legacy_dungeon/README.md` a une section
> "Avant de cloner : deux pièges mentaux à désamorcer" (mépris du code
> existant, panique face au volume). Vaut le détour ici aussi, même
> résumée : tu vas retomber sur les deux mêmes réflexes.

## Mission

Choisis un petit repo Node.js OSS **abandonné** (dernière release > 24 mois),
avec ≤ 3 000 LOC et au moins 2 issues ouvertes. Suggestions de critères :

- `package.json` valide,
- au moins un README,
- test suite existante mais qui ne passe plus.

Exemples de terrains (à vérifier au moment où tu lis) : petits loggers CLI,
wrappers d'API météo, générateurs de mocks. Ne prends pas un framework.

## Protocole (5 étapes)

### 1. Fork + install

Clone, `nvm use`, `npm install`. Note **tout** ce qui casse dans
`ONBOARDING.md` : deps deprecated, warnings, node version mismatch.

### 2. Reproduis un bug documenté

Choisis une issue ouverte "bug" (pas "feature request"). **Avant** de coder,
écris dans `REPRO.md` :

- l'input exact,
- la sortie attendue,
- la sortie obtenue,
- ta première hypothèse.

Interdit de patcher tant que le bug n'est pas reproduit **localement** de
façon fiable (cf. `../../../01-CADRAGE/03-DEBUGGING/05-repro_before_fix.md`).

### 3. ADR de refonte partielle

Dans `ADR/ADR-003_decision.md` : quels modules tu refactores, lesquels
tu laisses tels quels, pourquoi (coût vs risque). Utilise le template
`03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md`.

### 4. CI minimale

Ajoute `.github/workflows/ci.yml` :

```yaml
name: ci
on: [push, pull_request]
jobs:
 test:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v4
 - uses: actions/setup-node@v4
 with: { node-version-file: ".nvmrc" }
 - run: npm ci
 - run: npm test
 - run: npm run lint --if-present
```

### 5. Write-up avant PR

`WRITE_UP.md` : tu expliques ce que fait le code fautif **avant** de proposer
un correctif. Règle stricte : _interdiction de modifier une ligne avant
d'avoir décrit son comportement actuel_.

## BENCH & DÉCISIONS (obligatoire)

Une décision de refonte doit être appuyée par un chiffre (ex : "les 3
fonctions du module `parser.js` totalisent 68% du temps CPU sur un input
type : mesure `--prof`").

## Livrable

- `ONBOARDING.md`, `REPRO.md`, `ADR/ADR-003_decision.md`,
  `WRITE_UP.md`, `BENCH.md`,
- PR ouverte sur ton fork,
- CI verte.

## Ce que l'analogie "just refactor it" cache

Refactorer sans tests = casser en silence. Le prérequis absolu : couvrir la
zone à toucher **avant** de la toucher (voir `02-CONSTRUCTION/03-TESTING/10-test_strategy_not_framework.md`).

## Pitch 3 lignes

Ce projet démontre une compétence clé : lire du code inconnu, débugger sous pression, livrer un produit (ADR + tests) qu'un autre dev peut reprendre. Utilisable en portfolio et en entretien.

## Empreinte carbone (critère d'acceptation)

Estime l'empreinte carbone approximative de ton déploiement ou de ton algo. Justifie **un** choix d'optimisation (moins d'invocations, cache, batch, région serveur). Voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`.

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

## Gate pédagogique après les cinq étapes

- Reproduire le défaut de départ avant de modifier le code.
- Expliquer le mécanisme causal et différencier symptôme, cause racine et dette historique.
- Ajouter un test qui échoue sur la version défectueuse, puis démontrer qu'il protège la correction.
- Mesurer l'impact de la refonte sur au moins une dimension pertinente ; si aucune mesure numérique n'est utile, justifier ce choix et fournir une comparaison comportementale reproductible.
- Écrire les conditions de rollback et le signal qui déclencherait une nouvelle refonte.
- Traiter un second scénario de changement sans réutiliser la réponse précédente comme recette.

**Critère éliminatoire :** une PR qui passe les tests mais change un comportement métier non approuvé ne passe pas la gate. Relie le travail à [63 : Testing Engineering](../../../06-ANNEXES-TRANSVERSES/63-LAB-TESTING-ENGINEERING.md) et [67 : Gate de maîtrise](../../../06-ANNEXES-TRANSVERSES/67-GATE-MAITRISE-ET-CAPSTONE.md).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [07-DAY-ONE-SIMULATION.md : 4 h chrono, ton premier jour dans une équipe](07-DAY-ONE-SIMULATION.md)
- [Postmortem : legacy takeover](08-POSTMORTEM.md)
- [RULES : 12_legacy_takeover](01-RULES.md)
- [SECURITY : 12_legacy_takeover](03-SECURITY.md)
- [Security Gate : 12_legacy_takeover](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 12_legacy_takeover](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : legacy takeover](02-TDD-JOURNAL.md)
- [Cahier des charges : legacy takeover](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État des tests à la réception

- **Code de départ :** aucun fichier source exécutable ; `src/` est un scaffold de documentation.
- **Tests verts de référence :** aucun.
- **Tests volontairement rouges :** aucun fichier de test exécutable n'est fourni à l'état initial. Le premier test rouge est à écrire par l'apprenant avant le code.
- **Tests à créer :** traduire chaque invariant du cahier en test ; ajouter limites, erreurs et contrôles de sécurité.
- **Validation finale :** définir et documenter un runner, créer une suite qui couvre les critères d'acceptation, puis l'exécuter depuis un environnement propre. `tests/README.md` n'est pas un test.

**Ordre de construction :** lire les règles et le cahier, cartographier entrées/sorties, écrire tests du domaine, implémenter modèle et règles, ajouter adaptateurs, orchestration et tests d'intégration. Pour un projet de reprise de legacy, inspecter et caractériser le comportement existant avant la refactorisation.

### Détails d’implémentation et de validation à la réception

- **Code de départ :** aucun système legacy n'est embarqué ; `src/README.md` et `tests/README.md` sont des instructions.
- **Tests de référence verts :** aucun dans AF.
- **Tests volontairement rouges :** aucun test exécutable AF n'est fourni. Le rouge/vert doit être créé dans le dépôt legacy autorisé choisi par l'apprenant.
- **Prérequis :** Git, accès à un dépôt que tu es autorisé à cloner, environnement et outils explicitement requis par ce dépôt. Fixe un commit SHA ; ne travaille pas sur une branche mouvante sans le noter.
- **Démarrage :** `git clone <URL_AUTORISEE> legacy-target`, puis `git -C legacy-target rev-parse HEAD`. Le placeholder doit être remplacé. Lis les scripts et la politique de contribution avant toute commande d'installation ou de test.
- **Tests à créer :** caractérisation du comportement existant, cas métier, sécurité, non-régression, et test prouvant chaque correction. Ne transforme pas une bizarrerie legacy en règle sans validation métier.
- **Validation finale :** rejouer exactement la suite documentée au commit initial et au commit corrigé ; comparer sorties, migrations et compatibilité. Le résultat attendu est un dossier de preuves (diagnostic, patch, tests, ADR, plan de rollback), non un programme fourni dans AF.
