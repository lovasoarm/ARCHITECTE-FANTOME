---
stability: intemporel
last_reviewed: 2026-11
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_organisationnelle]
anti_recipe_key: changement_echelle+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Le budget de performance : tu le poses, le CI le fait respecter

<!-- AF-DIAGRAM:secrets -->

```text
┌──────────────┐
│ Secret store │
└──────┬───────┘
       │ inject
       ▼
┌──────────────┐      ✗ hardcode
│ Runtime      │◄──────────────
└──────┬───────┘
       ▼
   application
```

Un secret doit entrer dans le système au runtime et ne pas être figé dans le code ou l’image.

Temps de lecture ~9 min

Ton site est rapide aujourd'hui.
Dans 6 mois, quelqu'un a ajouté une librairie d'analytics, un widget de chat, trois fonts Google, et un carousel. LCP : 4.2s. CLS : 0.31. Le score Lighthouse est passé de 94 à 61 sans que personne s'en aperçoive.

Le budget de performance, c'est le garde du corps que tu mets en place avant que ça arrive.
Une assertion configurée en `error` bloque le build ; une assertion en `warn` signale le dépassement sans faire échouer le contrôle. Le niveau doit être explicite pour chaque règle.

Sans ça, la perf se dégrade en silence : chaque PR est "juste un petit truc", et au bout de 20 PRs t'as un site qui charge en 6 secondes.

---

## 1) C'EST QUOI UN BUDGET DE PERF

Un budget de performance c'est un ensemble de seuils que ton projet ne peut pas dépasser.

```text
LCP (labo)   <= 2.5s
TBT (labo)   <= 200ms
CLS (labo)   <= 0.1
INP (terrain) <= 200ms, suivi séparément via CrUX/RUM
JS bundle gzip <= 200 KiB
Score Performance Lighthouse >= 90 (version et environnement fixés)
```

Ce n'est pas une recommandation. C'est un contrat.
Si le build dépasse ces seuils : il échoue. La PR ne merge pas.

```text
Développeur    CI Pipeline     Merge
   |         |         |
   |--- push code ---> |         |
   |         |-- run audit ----> |
   |         |         |
   |         | LCP: 3.1s    |
   |         | BUDGET: 2.5s  |
   |         |         |
   |         |-- FAIL ----------|
   |         |         |
   |<-- build failed--|         |
   |  "LCP exceeded budget"       |
```

---

## 2) POSER LE BUDGET AVEC LIGHTHOUSE CI

`@lhci/cli` est l'outil officiel pour automatiser Lighthouse.

```bash
npm install -D @lhci/cli
```

Configuration dans `lighthouserc.js` à la racine du projet :

```js
// lighthouserc.js
// le contrat de performance du projet:on ne touche pas sans discussion
module.exports = {
  ci: {
    collect: {
      // l'URL à auditer:en local ou sur un serveur de preview
      url: ["http://localhost:3000", "http://localhost:3000/about"],
      numberOfRuns: 3, // plusieurs runs réduisent l'effet d'une seule mesure
    },
    assert: {
      // Chaque assertion mesurée fixe explicitement sa méthode d’agrégation à la médiane ;
      // les trois passages réduisent l’effet d’une mesure isolée sans créer une garantie de stabilité.
      assertions: {
        // Métriques de laboratoire prises en charge par Lighthouse CI.
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: 2500, aggregationMethod: "median" },
        ],
        "cumulative-layout-shift": [
          "error",
          { maxNumericValue: 0.1, aggregationMethod: "median" },
        ],
        "total-blocking-time": [
          "error",
          { maxNumericValue: 200, aggregationMethod: "median" },
        ],
        // INP est une métrique terrain : ne pas prétendre la mesurer ici via TBT.

        // taille du bundle JS:ce qui se paye à chaque chargement
        "resource-summary:script:size": [
          "error",
          { maxNumericValue: 204800, aggregationMethod: "median" },
        ], // 200 KiB

        // score global:le plancher en dessous duquel on ne descend pas
        "categories:performance": [
          "error",
          { minScore: 0.9, aggregationMethod: "median" },
        ],
        "categories:accessibility": [
          "warn",
          { minScore: 0.9, aggregationMethod: "median" },
        ],
      },
    },
    upload: {
      target: "filesystem", // stockage local : pas de rapport public par URL
    },
  },
};
```

### Confidentialité des rapports

La configuration ci-dessus utilise `target: "filesystem"` : les rapports restent dans le dossier local `.lighthouseci` et ne sont pas envoyés à un stockage public. Si tu choisis `target: "temporary-public-storage"`, toute personne qui possède l'URL du rapport peut le consulter ; les rapports sont temporaires et supprimés après quelques jours. N'y envoie pas de pages authentifiées, de données personnelles, de chemins internes sensibles ni de contenu confidentiel. Pour conserver des rapports privés, utilise le stockage local ou un serveur Lighthouse CI privé dont les accès sont configurés.

Référence : [documentation officielle Lighthouse CI : choix de la cible d'upload](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#target).

Lancer l'audit :

```bash
# démarre l'app d'abord, puis
npx lhci autorun
```

Si une assertion échoue, la commande sort avec un code non-zéro : le CI le détecte et bloque.

---

## 3) INTÉGRER DANS GITHUB ACTIONS

```yaml
# .github/workflows/perf-budget.yml
name: Performance Budget
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22.23.4"
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Start server
        run: npm run start > server.log 2>&1 &
        env:
          PORT: 3000
      - name: Wait for server
        run: npx wait-on http://localhost:3000 --timeout 30000
      - name: Run Lighthouse CI
        run: npx lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

Résultat : l'intégration officielle Lighthouse CI publie des status checks GitHub et des liens vers les rapports. Elle ne garantit pas à elle seule un commentaire récapitulatif dans le fil de chaque PR ; ajoute une action séparée si ce commentaire est un besoin explicite.

```text
PR #47 : "Add analytics widget"
----------------------------------------
 LCP:  3.1s  [NON] budget: 2.5s
 CLS:  0.08  [OK]
 TBT:  180ms [OK]
 JS:  312kb [NON] budget: 200kb
 Score: 81   [NON] budget: 90

 2 assertions failed. Merge blocked.
```

---

## 4) BUDGET PAR RESSOURCE AVEC BUNDLESIZE

Lighthouse mesure les métriques runtime. `bundlesize` mesure les fichiers statiques.
Les deux se complètent : l'un mesure les résultats d'audit, l'autre contrôle le poids des fichiers livrés.

```bash
npm install -D bundlesize
```

Dans `package.json` :

```json
{
  "bundlesize": [
    {
      "path": "./dist/js/*.js",
      "maxSize": "200 kB"
    },
    {
      "path": "./dist/css/*.css",
      "maxSize": "30 kB"
    },
    {
      "path": "./dist/images/*.{jpg,png,webp}",
      "maxSize": "100 kB",
      "compression": "none"
    }
  ],
  "scripts": {
    "size": "bundlesize"
  }
}
```

```bash
npm run size

 PASS ./dist/js/main.js: 187.4kB < 200kB (gzip)
 FAIL ./dist/js/vendor.js: 234.1kB > 200kB (gzip)
 PASS ./dist/css/app.css: 22.3kB < 30kB (gzip)
```

---

## 5) SCRIPT DE VÉRIFICATION LOCALE

Avant de pousser, tu veux savoir si tu vas casser le budget.

```js
// Enregistrer ce fichier sous scripts/check-budget.js.
// Scofield check : est-ce que le plan tient avant d'exécuter ?

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const BUDGET = {
  lcp: 2500, // ms, laboratoire
  cls: 0.1,
  tbt: 200, // ms, laboratoire ; proxy imparfait de la réactivité
  jsGzipKiB: 200,
  cssGzipKiB: 30,
  score: 90,
};

function listFilesRecursively(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(
      `Dossier introuvable : ${directory}. Lance le build d'abord.`,
    );
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFilesRecursively(fullPath) : [fullPath];
  });
}

function totalGzipBytes(files) {
  return files.reduce((sum, file) => {
    const source = fs.readFileSync(file);
    return sum + zlib.gzipSync(source).byteLength;
  }, 0);
}

function checkStaticBudgets() {
  const distDir = path.resolve(__dirname, "../dist");
  const allFiles = listFilesRecursively(distDir);
  const groups = [
    { label: "JavaScript", extension: ".js", budget: BUDGET.jsGzipKiB },
    { label: "CSS", extension: ".css", budget: BUDGET.cssGzipKiB },
  ];

  let ok = true;
  for (const group of groups) {
    const files = allFiles.filter((file) =>
      file.toLowerCase().endsWith(group.extension),
    );
    if (files.length === 0) {
      throw new Error(
        `Aucun fichier ${group.extension} trouvé dans dist/ : vérifie le build et les chemins.`,
      );
    }
    const actualKiB = totalGzipBytes(files) / 1024;
    const passed = actualKiB <= group.budget;
    console.log(
      `[${passed ? "PASS" : "FAIL"}] ${group.label} gzip agrégé : ${actualKiB.toFixed(1)} KiB (budget : ${group.budget} KiB; fichiers : ${files.length})`,
    );
    if (!passed) ok = false;
  }
  return ok;
}

function printBudgetReminder() {
  console.log("\n--- BUDGET DE PERFORMANCE ---");
  console.log(`LCP labo <= ${BUDGET.lcp}ms`);
  console.log(`CLS labo <= ${BUDGET.cls}`);
  console.log(`TBT labo <= ${BUDGET.tbt}ms`);
  console.log(`JS gzip agrégé <= ${BUDGET.jsGzipKiB} KiB`);
  console.log(`CSS gzip agrégé <= ${BUDGET.cssGzipKiB} KiB`);
  console.log(`Score Lighthouse >= ${BUDGET.score}`);
  console.log("INP terrain : surveillé séparément via CrUX/RUM.");
  console.log("-----------------------------\n");
}

try {
  printBudgetReminder();
  if (!checkStaticBudgets()) {
    console.error(
      "\nBudget statique dépassé. Inspecte les fichiers responsables avant de modifier le seuil.",
    );
    process.exitCode = 1;
  } else {
    console.log(
      "\nBudgets statiques OK. Lance Lighthouse CI pour les métriques de laboratoire.",
    );
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
```

---

## 6) QUAND UN SEUIL SE CASSE : PROCESSUS DE DÉCISION

Le budget peut bloquer une PR si les assertions configurées échouent. Les seuils de terrain (comme INP) doivent être alimentés par une source RUM/CrUX distincte, et leur politique de blocage doit être définie séparément :

```text
Budget cassé
   |
   |--> est-ce qu'on peut réduire la source ?
   |     |
   |     |--> OUI : lazy loading, code splitting, image compression
   |     |     tree shaking, remplacer une lib lourde
   |     |
   |     |--> NON : la feature vaut-elle la dégradation ?
   |          |
   |          |--> NON : la feature sort pas
   |          |
   |          |--> OUI : réviser le budget, documenter la décision
   |               => c'est un choix assumé, pas un oubli
```

Réviser le budget sans documenter pourquoi : c'est de la dette silencieuse.
Si tu montes le seuil LCP à 3s, tu l'écris dans le commit. Et tu sais pourquoi.

---

## EXERCICES

## EXO 1 : le contrat de Scofield

Tu rejoins une équipe. L'app actuelle a ces métriques selon le dernier audit Lighthouse :

```text
LCP:  2.8s
CLS:  0.06
TBT:  310ms
Score: 84
JS:  287kb gzipped
```

1. Écris un `lighthouserc.js` avec des budgets réalistes pour cette app (objectif : atteindre "Good" sur tous les CWV en 3 sprints)
2. Définis des seuils `warn` pour les métriques proches du budget et `error` pour celles qui dépassent clairement
3. Explique pourquoi TBT à 310ms est le problème le plus urgent à régler

---

## EXO 2 : l'analytics qui tue le score

Un dev a intégré une librairie d'analytics. Le build passe mais le score Lighthouse est passé de 91 à 78. TBT est monté à 420ms.

```js
// lib ajoutée dans le bundle principal
import AnalyticsSuite from "analytics-suite"; // 89kb gzipped
```

1. Propose deux stratégies pour réintégrer cette lib sans casser le budget TBT
2. Implémente le chargement lazy de cette lib en JS pur (pas de framework)
3. Écris l'assertion `bundlesize` qui aurait bloqué cette PR avant le merge

---

## EXO 3 : le script de guardrail local

Écris un script Node.js `check-budget.js` qui :

- lit les fichiers du dossier `dist/`
- calcule la taille totale des `.js` et `.css`
- calcule la taille gzip réelle de chaque fichier avec `zlib.gzipSync`, puis additionne les tailles
- compare séparément JS et CSS aux seuils du budget
- sort avec `process.exit(1)` si dépassement
- affiche un message clair avec quelle catégorie dépasse et de combien

(indice : `fs.readdirSync` + `fs.statSync` + filtre par extension)

---

## CORRIGÉS DE RÉFÉRENCE

Les valeurs de budgets ci-dessous sont des décisions de scénario à ajuster à l'application et à son objectif. Elles ne sont pas des seuils universels pour tous les produits.

### Corrigé : EXO 1 : le contrat de Scofield

Un profil cible final cohérent peut être : LCP labo ≤ 2 500 ms, CLS ≤ 0,10, TBT ≤ 200 ms, JS gzip agrégé ≤ 200 KiB et score Lighthouse ≥ 90. Pour les données de terrain, suivre séparément LCP/INP/CLS au 75e percentile ; ne pas convertir TBT en INP.

La demande de deux niveaux (`warn` et `error`) appelle une précision : Lighthouse CI ne prend qu'une assertion par audit et par configuration. Ne duplique pas la clé d'un même audit dans l'objet JavaScript/JSON en espérant deux seuils : une clé répétée sera écrasée. Deux options valides :

1. utiliser un profil `warn` durant les premiers sprints puis promouvoir la même assertion à `error` au sprint final ;
2. ajouter un contrôle local personnalisé avec deux seuils explicites, par exemple `warn` au-dessus de 2 500 ms et `error` au-dessus de 4 000 ms pour LCP.

Le TBT à 310 ms est un problème important : il dépasse le budget de scénario de 200 ms et peut signaler du travail bloquant sur le thread principal. Mais il n'est pas automatiquement « le plus urgent » : le LCP à 2,8 s, le bundle JS à 287 KiB et les parcours utilisateurs doivent être comparés avec la trace et les données terrain. Le TBT est un indicateur de laboratoire, pas une mesure directe de l'INP.

### Corrigé : EXO 2 : l'analytics qui tue le score

Deux stratégies complémentaires : charger la bibliothèque seulement au moment où la fonction analytics est réellement nécessaire via `import()` ; ou déplacer un traitement CPU lourd vers un Web Worker. Différer le chargement ne suffit pas si l'import est immédiatement suivi d'un gros calcul dans le gestionnaire d'interaction.

```js
let analyticsModulePromise;

function loadAnalyticsModule() {
  analyticsModulePromise ??= import("analytics-suite");
  return analyticsModulePromise;
}

button.addEventListener("click", async () => {
  showImmediateFeedback();
  try {
    const analyticsModule = await loadAnalyticsModule();
    // `track` représente l'export documenté par la bibliothèque choisie.
    if (typeof analyticsModule.track !== "function") {
      throw new TypeError(
        "L'export track() attendu n'existe pas dans analytics-suite.",
      );
    }
    analyticsModule.track("ranking_opened");
  } catch (error) {
    console.error("Analytics indisponible :", error);
  }
});
```

Exemple de garde-fou pour l'entrée dédiée, en plus du budget de bundle principal :

```json
{
  "bundlesize": [
    { "path": "./dist/js/main.js", "maxSize": "200 kB" },
    { "path": "./dist/js/analytics-*.js", "maxSize": "90 kB" }
  ]
}
```

`bundlesize` vérifie chaque fichier qui correspond au motif. Ce seuil ne mesure pas la somme globale de tous les chunks ; le script local de la section 5 répond à ce besoin agrégé.

### Corrigé : EXO 3 : script de guardrail local

Le script complet de la section 5 est le corrigé de référence : il parcourt récursivement `dist/`, calcule les tailles gzip avec zlib pour les fichiers JavaScript et CSS, compare chaque agrégat au budget et renvoie un code non nul en cas de dépassement. Un ratio fixe de 0,3 serait seulement une approximation et ne doit pas être présenté comme une taille gzip mesurée.

## RÉSUMÉ

Un budget automatisé rend les régressions visibles à chaque changement.
Le flow : tu définis les seuils dans `lighthouserc.js`, tu intègres Lighthouse CI dans GitHub Actions, et seules les assertions `error` bloquent le workflow ; les assertions `warn` restent des alertes.
`bundlesize` surveille les fichiers statiques. Lighthouse CI surveille les métriques runtime. Les deux ensemble couvrent tout.
Quand un budget est cassé : tu réduis la source ou tu révises le seuil en documentant pourquoi. Jamais en silence.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Le budget de performance : tu le poses, le CI le fait respecter » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Le budget de performance : tu le poses, le CI le fait respecter** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Définir un budget de performance non flakey

**Mission liée à « Le budget de performance : tu le poses, le CI le fait respecter » :** Propose pour Kintana un budget sur une métrique et un scénario stables. Définis seuil, tolérance au bruit, mode d’échec et processus d’exception documenté.

**Livrable :** Budget versionné, méthode de mesure, règle d’alerte et procédure d’exception.

**Critères d’acceptation :** Le seuil dérive d’un objectif produit ; le bruit est évalué ; les exceptions ont une échéance ; une mesure de laboratoire n’est pas assimilée au terrain.

**Transfert obligatoire :** Le pipeline échoue de façon intermittente : améliore la stabilité de mesure avant d’assouplir silencieusement le seuil.

## RÉFÉRENCES OFFICIELLES

Sources consultées le 11 novembre 2026 :

- GoogleChrome : [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) : métriques et pondérations par version.
- GoogleChrome : [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) : assertions, agrégation et budgets de ressources.
- `bundlesize` : [README du projet](https://github.com/siddharthkp/bundlesize) : configuration, compression gzip par défaut et comparaison fichier par fichier.
