---
stability: intemporel
last_reviewed: 2026-11
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, fausse_piste]
anti_recipe_key: changement_echelle+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# Lighthouse : lire un rapport sans se noyer dans les chiffres

Temps de lecture ~10 min

Lighthouse te sort un score entre 0 et 100. Le dev moyen regarde le score, dit "meh, 67, je dois améliorer", et ferme l'onglet sans rien faire.

Le score est inutile sans savoir quoi fixer en premier. Selon la page, la version et les audits applicables, un rapport peut afficher des opportunités, des diagnostics et de nombreuses métriques. Leur nombre n'est pas fixe. Si tu essaies de tout corriger en même temps, tu risques de corriger les mauvaises choses et de perdre du temps pour un gain marginal.

Ce fichier t'apprend à lire le rapport comme un outil, pas comme un bulletin de notes.

---

## 1) STRUCTURE DU RAPPORT

Lighthouse expose quatre catégories principales dans le rapport standard : Performance, Accessibility, Best Practices et SEO. Les audits PWA ne constituent plus une cinquième catégorie native du rapport standard ; ils peuvent être suivis séparément avec des contrôles dédiés.

```text
Performance   => score de laboratoire et audits de performance
           LCP, TBT, CLS, FCP, Speed Index selon la version

Accessibility  => contrôles automatisés d'accessibilité
           contrast, aria, labels, navigation clavier

Best Practices  => sécurité, HTTPS, pratiques du navigateur

SEO       => métadonnées et bonnes pratiques de découvrabilité

PWA       => audits spécifiques éventuels, hors catégorie standard
```

Pour la performance : t'as un score global + les métriques individuelles + deux sections sous les métriques : **Opportunities** et **Diagnostics**.

```text
Score Performance (0-100)
 |
 +-- Métriques de laboratoire (LCP, TBT, CLS, FCP, Speed Index)
 |
 +-- Données de terrain éventuelles (CrUX/RUM : LCP, INP, CLS)
 |
 +-- Opportunities  : économies potentielles estimées
 |
 +-- Diagnostics   : signaux à examiner, sans gain garanti
 |
 +-- Passed audits  : contrôles déjà satisfaits
```

---

## 2) LES MÉTRIQUES ET LEUR POIDS

Dans la composition documentée pour Lighthouse 10, le score Performance utilise les métriques de laboratoire suivantes : LCP 25 %, TBT 30 %, CLS 25 %, FCP 10 % et Speed Index 10 %. Ce tableau est lié à cette version de référence : les pondérations peuvent évoluer ; vérifie toujours la documentation de la version réellement installée. **INP est une métrique de terrain (field), pas une composante de ce score Lighthouse 10 ; TTFB est un indicateur de diagnostic, pas un poids du score.**

Le TTFB (Time to First Byte) mesure le délai jusqu'au premier octet de réponse pour une navigation ; il peut inclure plusieurs phases réseau et serveur. Un TTFB mauvais est un signal à diagnostiquer, pas la preuve que le serveur seul est responsable.

```js
// mesurer TTFB depuis le code
const navEntry = performance.getEntriesByType("navigation")[0];
if (!navEntry) {
  throw new Error("Navigation Timing indisponible dans ce contexte.");
}
const ttfb = navEntry.responseStart - navEntry.startTime;
console.log(`TTFB de navigation : ${ttfb.toFixed(1)}ms`);
// requestStart → responseStart mesure une phase requête/réponse, pas le TTFB de navigation complet.

// repères TTFB web.dev, pas des seuils Core Web Vitals :
// <= 800ms : bon
// > 800ms et <= 1800ms : à améliorer
// > 1800ms : mauvais
```

---

## 3) OPPORTUNITIES VS DIAGNOSTICS

C'est la distinction la plus importante du rapport.

### Opportunities

Une opportunity peut afficher une **économie potentielle estimée** sur une métrique ou une ressource. Ce n'est pas une promesse : les économies ne s'additionnent pas toujours et ne se soustraient pas mécaniquement au LCP final. Le résultat dépend des ressources réellement critiques, de leur ordre de chargement et des interactions entre corrections.

Exemples d'opportunities :

```text
Serve images in next-gen formats     => économie estimée : 2.3s
Eliminate render-blocking resources   => économie estimée : 1.1s
Remove unused JavaScript         => économie estimée : 0.8s
Properly size images           => économie estimée : 0.5s
```

**Règle** : commence par l'opportunity qui cible le symptôme confirmé, avec un gain potentiel important et une correction faisable. Une estimation élevée ne suffit pas si l'audit n'explique pas le problème observé. Rejoue le même parcours après chaque correction et compare plusieurs runs.

### Diagnostics

Les diagnostics signalent des risques ou des caractéristiques à examiner sans toujours fournir une estimation de gain. Ils peuvent révéler une cause importante ; l'absence d'économie affichée ne signifie pas qu'ils sont sans effet.

Exemples :

```text
Avoid enormous network payloads     => informationnel
Serve static assets with efficient cache policy => informationnel
Avoid chaining critical requests     => informationnel
```

Les diagnostics et les opportunities se priorisent selon la métrique en difficulté, la preuve causale, le risque et l'effort. Ne reporte pas un diagnostic de sécurité, d'accessibilité ou de fiabilité uniquement parce qu'il n'affiche pas une économie en secondes.

---

## 4) LES PIÈGES CLASSIQUES DE LECTURE

### Le score global est trompeur

Un score de 85 peut cacher un LCP de 4.8s si les autres métriques du rapport de laboratoire compensent en partie. Une donnée INP de terrain peut, elle aussi, révéler un problème absent du score Lighthouse.

Toujours regarder les métriques individuelles et leur origine (laboratoire ou terrain), pas seulement le score.

```text
Score Performance Lighthouse : 85/100
 LCP labo : 4.8s (mauvais)
 TBT labo : 120ms
 CLS labo : 0.05 (bon)
 FCP labo : 1.2s
 Speed Index labo : 2.0s
 INP terrain : 180ms (bon)
 TTFB navigation : 210ms (valeur brute, à interpréter dans son contexte)
```

Dans ce scénario, le score global masque un problème de chargement du contenu principal. La trace et les audits doivent confirmer si l'image est la cause, ou si le délai vient d'une autre phase de chargement.

### Les scores varient entre les runs

Lighthouse tourne dans un environnement simulé avec une connexion et un CPU bridés. Les scores fluctuent entre les runs, parfois de 10 points.

Ne jamais comparer un run à un seul autre run. Lancer 3 fois et prendre la médiane.

```bash
# Pour plusieurs runs comparables et une médiane, utiliser Lighthouse CI.
# .lighthouserc.cjs configure collect.numberOfRuns et assert.assertions.
npx lhci autorun
```

### "Passed audits" contient des infos utiles

La section verte en bas du rapport montre ce qui fonctionne déjà. Si tu cherches pourquoi ton score est bon sur certains points, c'est là que tu regardes. Ça sert aussi à documenter ce qu'il ne faut pas casser lors d'un refacto.

---

## 5) LANCER LIGHTHOUSE EN DEHORS DES DEVTOOLS

### CLI

```bash
# installer
npm install -g lighthouse

# lancer un audit basique
npx lighthouse https://tonsite.com --view

# simuler mobile (default) vs desktop
npx lighthouse https://tonsite.com --preset=desktop --view

# sortir en JSON pour parser les résultats
npx lighthouse https://tonsite.com --output=json --output-path=./report.json
```

### Programmatique

```js
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

async function runAudit(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      formFactor: "mobile",
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
      },
    });

    if (!result?.lhr?.categories?.performance) {
      throw new Error(
        "Lighthouse n'a pas produit de rapport de performance exploitable.",
      );
    }

    const audits = result.lhr.audits;
    const numeric = (id) => audits[id]?.numericValue ?? null;

    return {
      score: result.lhr.categories.performance.score * 100,
      lcp: numeric("largest-contentful-paint"),
      cls: numeric("cumulative-layout-shift"),
      tbt: numeric("total-blocking-time"),
      // INP de terrain : à récupérer séparément via CrUX/RUM ou web-vitals.
      inpField: null,
    };
  } finally {
    // Fermer Chrome même si l'audit ou l'extraction échoue.
    await chrome.kill();
  }
}
```

---

## 6) LIRE LE RAPPORT SECTION PAR SECTION

### Étape 1 : regarder les métriques individuelles

Dans le rapport de laboratoire : LCP, TBT, CLS, FCP et Speed Index. À côté, si l'outil fournit des données de terrain : LCP, INP et CLS CrUX/RUM. Ne compare pas une valeur de terrain à un score de laboratoire comme si les deux venaient du même protocole.

### Étape 2 : chercher l'opportunity la plus pertinente

Regarde les économies potentielles, mais filtre d'abord par la métrique dégradée et par la preuve présente dans la trace. La première ligne du tableau n'est pas forcément la meilleure correction pour le parcours que tu diagnostiques.

### Étape 3 : comprendre la cause

Chaque opportunity a un "Learn more" et une liste d'éléments incriminés. Par exemple pour "Properly size images" :

```text
Image served : 1200x800px
Image displayed : 300x200px
Potential savings : 340KB
```

Tu as servi 16x plus de pixels que nécessaire. Fix : générer une version 300x200 ou utiliser srcset.

### Étape 4 : estimer l'effort vs le gain

```text
Opportunity : Serve images in next-gen formats => économie estimée 2.1s, effort : moyen
Opportunity : Remove unused CSS        => économie estimée 0.3s, effort : élevé

=> tester d'abord l'hypothèse image, puis mesurer à nouveau
```

Ne soustrais pas 2.1s au LCP pour annoncer le résultat futur : les estimations sont indicatives et les corrections peuvent interagir.

### Étape 5 : re-lancer après chaque fix

Pas un rapport pour tout corriger d'un coup. Un rapport, un fix, un nouveau rapport, validation, suivant.

---

## 7) INTERPRÉTER UN RAPPORT RÉEL

Voici un rapport fictif d'une page type dashboard de stats de foot :

```text
Performance score Lighthouse 10 : 58/100 (score issu du scénario synthétique, non recalculé à la main)

Métriques de laboratoire :
 LCP : 5.2s  (mauvais)  poids Lighthouse 10 : 25%
 TBT : 620ms             poids Lighthouse 10 : 30%
 CLS : 0.12 (à améliorer) poids Lighthouse 10 : 25%
 FCP : 1.8s              poids Lighthouse 10 : 10%
 Speed Index : 5.4s      poids Lighthouse 10 : 10%

Données de terrain séparées :
 INP : 320ms (à améliorer)
 TTFB navigation : 420ms (valeur brute ; aucun code couleur universel n'est déduit ici)

Opportunities :
 Properly size images        => économie potentielle : 2.1s (image hero 4Mo)
 Eliminate render-blocking resources => économie potentielle : 1.3s (scripts en tête)
 Remove unused JavaScript      => économie potentielle : 0.6s (bundle analytics)

Diagnostics :
 Avoid enormous network payloads  (total : 8.2MB)
 Serve static assets with efficient cache policy
```

### Lecture du rapport

Le TTFB de 420ms ne suffit pas à exclure le réseau ou le serveur : il faut le comparer au parcours, à la distribution des utilisateurs et aux autres phases de chargement.

LCP à 5.2s avec une opportunity d'image à 2.1s : inspecter la requête de l'image hero, son poids, sa priorité et le moment où elle devient découvrable. Les 2.1s sont une estimation ; ne soustrais pas automatiquement ce nombre au LCP et ne promets pas un LCP à 3.1s.

Les ressources bloquant le rendu et le JavaScript inutilisé sont des pistes à vérifier dans la trace. `defer` convient aux scripts applicatifs ordonnés ; `async` convient aux scripts indépendants. Après chaque correction, rejoue le même protocole et compare les résultats.

INP à 320ms est une donnée terrain à améliorer. Ne la classe pas automatiquement après LCP : la priorité dépend de la gravité, de la fréquence et des parcours utilisateurs concernés.

CLS à 0.12 : proche du seuil vert (0.1). Regarder si une image sans dimensions est responsable. Fix rapide.

---

## EXERCICES

## EXO 1 : PRIORISATION DE RAPPORT

Tu reçois ce rapport Lighthouse pour le site du club de foot de tes rêves :

```text
Score : 61

LCP : 4.1s (rouge)
INP : 440ms (orange)
CLS : 0.08 (vert)
TTFB : 1.9s (rouge selon le repère TTFB cité : > 1.8s)

Opportunities :
 Serve images in next-gen formats  => -1.8s
 Reduce server response times    => ?
 Remove unused CSS          => -0.4s
 Eliminate render-blocking resources => -0.7s
```

1. Quel est le problème le plus critique dans ce rapport ?
2. Dans quel ordre tu corriges les opportunities, et pourquoi ?
3. TTFB à 1.9s : c'est un problème front ou back ? Qu'est-ce que ça implique pour ta stratégie de fix ?

---

## EXO 2 : AUDIT PROGRAMMATIQUE

Écris un script Node.js qui :

- lance Lighthouse en headless sur une URL passée en argument
- extrait LCP, TBT, CLS et le score global depuis le rapport Lighthouse
- lit séparément un fichier JSON de données terrain (`INP`, et éventuellement LCP/CLS de terrain) produit par CrUX ou RUM ; ne prétends pas extraire l'INP depuis Lighthouse
- affiche un résumé coloré dans le terminal (vert / orange / rouge selon les seuils applicables à chaque source)
- sort avec `process.exitCode = 1` si une métrique obligatoire est dans le rouge

Le script et l'installation de Lighthouse sont à réaliser par l'apprenant dans son environnement. Le corrigé ci-dessous est un contrat de référence ; il n'affirme pas que Lighthouse ou un navigateur ont été installés ou exécutés ici.

---

## EXO 3 : DIAGNOSTIC D'IMAGE

Lighthouse te dit : "Properly size images : potential savings: 1.4s" sur une page qui affiche des cartes de joueurs.

La page contient :

```html
<img src="player-mbappe.jpg" style="width: 80px; height: 80px" />
```

L'image originale fait 1200x1200px et 680KB.

1. Calcule combien de pixels sont gaspillés (sur un écran @2x)
2. Écris le HTML correct avec `srcset` pour servir la bonne taille selon la densité d'écran
3. Quel format tu utilises et pourquoi ?

---

### Corrigé de référence : EXO 1 : priorisation sans fausse causalité

1. Le LCP à 4,1 s est mauvais ; l'INP à 440 ms nécessite une amélioration ; le CLS à 0,08 est bon. Le TTFB à 1,9 s est mauvais selon le repère de terrain cité dans la leçon. LCP et TTFB doivent être investigués ensemble : un TTFB élevé retarde le début de réception du document, mais il ne prouve pas à lui seul que l'origine serveur est l'unique cause.
2. Ne trie pas les opportunities uniquement par les économies estimées. Vérifie d'abord dans la trace si l'image concernée est réellement l'élément LCP et si elle est surdimensionnée ; en parallèle, collecte les timings serveur/CDN et compare les régions et types d'utilisateurs. Puis inspecte les ressources bloquant le rendu et le CSS inutilisé. Une économie de 1,8 s est une estimation, pas un résultat garanti.
3. Le TTFB est un indicateur de la navigation entière : serveur d'origine, CDN, réseau, DNS/TLS, redirections et cache peuvent contribuer. Il ne se classe donc ni « front » ni « back » sans trace. La stratégie est de séparer les phases, tester cache/CDN/origine et comparer les mesures terrain avant de choisir un correctif.

### Corrigé de référence : EXO 2 : audit labo et données terrain séparées

Le contrat correct est le suivant : Lighthouse fournit le score et les audits de laboratoire ; INP provient d'une source de terrain distincte (CrUX ou RUM). Voici un squelette Node.js qui illustre cette séparation. Il dépend du paquet `lighthouse` et de Chrome installés par l'apprenant : ce code n'a pas été exécuté dans cet environnement et n'est pas présenté comme un test passé.

```js
// scripts/audit-performance.mjs
import fs from "node:fs/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const url = process.argv[2];
const fieldMetricsPath = process.argv[3];
if (!url || !fieldMetricsPath) {
  throw new Error(
    "Usage: node audit-performance.mjs <url> <field-metrics.json>",
  );
}

const classify = (name, value) => {
  if (value == null || !Number.isFinite(value)) return "NON DISPONIBLE";
  if (name === "score") {
    return value >= 0.9 ? "VERT" : value >= 0.5 ? "ORANGE" : "ROUGE";
  }
  const limits = {
    lcp: [2500, 4000],
    inp: [200, 500],
    cls: [0.1, 0.25],
    tbt: [200, 600], // seuils de laboratoire de cet exemple, pas des seuils CWV
  }[name];
  if (!limits) return "NON CLASSÉ";
  return value <= limits[0] ? "VERT" : value <= limits[1] ? "ORANGE" : "ROUGE";
};

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
try {
  const runner = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "error",
  });
  if (!runner?.lhr) throw new Error("Lighthouse n'a pas retourné de rapport.");

  const audits = runner.lhr.audits;
  const lab = {
    score: runner.lhr.categories?.performance?.score,
    lcp: audits["largest-contentful-paint"]?.numericValue,
    tbt: audits["total-blocking-time"]?.numericValue,
    cls: audits["cumulative-layout-shift"]?.numericValue,
  };

  const field = JSON.parse(await fs.readFile(fieldMetricsPath, "utf8"));
  if (
    !field ||
    !["CrUX", "RUM"].includes(field.source) ||
    field.percentile !== 75 ||
    typeof field.period !== "string" ||
    !field.period
  ) {
    throw new Error(
      "Le fichier terrain doit préciser source CrUX/RUM, période et percentile 75.",
    );
  }
  if (!Number.isFinite(field.inp) || field.inp < 0) {
    throw new Error(
      "Le champ inp doit être un nombre positif en millisecondes.",
    );
  }

  console.log("LABORATOIRE  : Lighthouse");
  for (const [name, value] of Object.entries(lab)) {
    const display =
      value == null
        ? "indisponible"
        : name === "score"
          ? `${(value * 100).toFixed(0)}/100`
          : `${value}`;
    console.log(`${name}: ${display}  : ${classify(name, value)}`);
  }
  console.log("TERRAIN  : CrUX/RUM");
  console.log(
    `INP p75 (${field.source}, ${field.period}): ${field.inp} ms  : ${classify("inp", field.inp)}`,
  );

  const labRed = ["score", "lcp", "tbt", "cls"].some(
    (name) => classify(name, lab[name]) === "ROUGE",
  );
  const fieldRed = classify("inp", field.inp) === "ROUGE";
  if (labRed || fieldRed) process.exitCode = 1;
} finally {
  await chrome.kill();
}
```

Format d'entrée terrain minimal, lorsque la mesure RUM/CrUX est fournie séparément :

```json
{ "source": "RUM", "period": "28d", "percentile": 75, "inp": 440 }
```

Ce JSON est un exemple synthétique. La période, le percentile, l'origine et le segment d'appareils doivent être conservés dans le vrai rapport ; n'agrège pas les résultats de laboratoire et de terrain dans le même indicateur.

### Corrigé de référence : EXO 3 : diagnostic d'image

Une image carrée affichée à 80 × 80 pixels CSS doit fournir environ 160 × 160 pixels source sur un écran à densité 2. La source 1 200 × 1 200 contient 1 440 000 pixels ; la variante 160 × 160 en contient 25 600. Il y a donc 1 414 400 pixels de plus que nécessaire dans la source originale, soit environ 98,22 % du nombre de pixels non requis pour ce rendu. Le poids en octets ne peut pas être déduit du seul nombre de pixels : il dépend du contenu et de l'encodage.

```html
<picture>
  <source
    type="image/avif"
    srcset="player-80.avif 80w, player-160.avif 160w"
    sizes="80px"
  />
  <source
    type="image/webp"
    srcset="player-80.webp 80w, player-160.webp 160w"
    sizes="80px"
  />
  <img
    src="player-160.jpg"
    srcset="player-80.jpg 80w, player-160.jpg 160w"
    sizes="80px"
    width="80"
    height="80"
    alt="Kylian Mbappé"
    loading="lazy"
    decoding="async"
  />
</picture>
```

AVIF ou WebP peuvent réduire le poids selon l'image et les encodeurs ; garde un fallback largement pris en charge et mesure le résultat réel. Pour une carte visible dès le premier écran, ne force pas `loading="lazy"` si cette image est l'élément LCP ; réserve le lazy loading aux images hors écran.

---

## RÉSUMÉ

Le score global est un résumé, pas un objectif. LCP, INP, CLS sont les vrais indicateurs.

Les opportunities donnent des économies potentielles : elles aident à choisir, mais ne dictent pas l'ordre à elles seules. Priorise selon la métrique en difficulté, la cause démontrée, le risque, l'effort et la mesure après correction.

Les diagnostics peuvent révéler une cause ou un risque sans économie chiffrée ; ils peuvent donc guider la priorité lorsque les preuves le justifient. Les passed audits indiquent seulement quels contrôles ont été satisfaits dans ce run.

Lighthouse fluctue : toujours lancer plusieurs fois et travailler sur des médianes, pas sur un seul run.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « Lighthouse : lire un rapport sans se noyer dans les chiffres » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Interpréter un audit Lighthouse

```text
parcours utilisateur
       |
       v
mesure labo + données terrain
       |
       v
causes communes
       |
       v
priorité impact / effort
       |
       v
validation après correction
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Lighthouse : lire un rapport sans se noyer dans les chiffres** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Prioriser un audit Lighthouse

**Mission liée à « Lighthouse : lire un rapport sans se noyer dans les chiffres » :** Réalise un audit contrôlé d’une page Kintana. Regroupe les recommandations par cause commune, estime le coût de correction et choisis une seule action à impact plausible.

**Livrable :** Rapport annoté, top trois causes et plan de vérification.

**Critères d’acceptation :** L’appareil, le réseau, la version et les répétitions sont consignés ; les scores ne remplacent pas les métriques réelles ; aucun correctif n’est revendiqué sans mesure après.

**Transfert obligatoire :** Le score monte mais l’expérience n’évolue pas : explique la limite du score et change la mesure.

## RÉFÉRENCES OFFICIELLES

Sources consultées le 11 novembre 2026. Les pondérations ci-dessus sont explicitement celles de Lighthouse 10 ; elles ne doivent pas être réutilisées comme règle universelle pour une autre version.

- Chrome for Developers : [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) : pondérations, score et variabilité des versions.
- GoogleChrome : [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) : niveaux `warn`/`error`, seuils, agrégation `median` et unités des budgets de ressources.
- web.dev : [Core Web Vitals](https://web.dev/articles/vitals) : distinction entre métriques de laboratoire et objectifs de terrain.
