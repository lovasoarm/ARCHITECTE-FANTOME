---
stability: intemporel
last_reviewed: 2026-11
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Core Web Vitals : mesurer le chargement, la réactivité et la stabilité

Temps de lecture ~11 min

Les Core Web Vitals regroupent trois métriques centrées sur l'expérience réelle : le chargement du contenu principal, la réactivité aux interactions et la stabilité visuelle. Google recommande de viser de bons résultats ; ces métriques participent aux signaux d'expérience de page, mais elles ne garantissent pas à elles seules une position dans les résultats de recherche.

On les évalue idéalement au 75e percentile des visites, séparément sur mobile et ordinateur. Une mesure de laboratoire aide à reproduire un problème ; les données de terrain indiquent ce que vivent réellement les utilisateurs.

---

## 1) LCP : LARGEST CONTENTFUL PAINT

### Ce que ça mesure

Le moment où le plus grand élément de contenu visible dans la fenêtre d'affichage est rendu, mesuré depuis le début de la navigation de l'utilisateur.

Cet élément est généralement une image, un bloc de texte ou une vidéo. Le LCP inclut aussi le temps de déchargement de la page précédente, la connexion, les redirections et le TTFB (temps jusqu'au premier octet). Ce n'est donc pas une métrique qui commence au premier octet reçu.

```text
Navigation start
   |
   |-----> réseau --> parser HTML --> style --> layout --> paint
                               |
                             LCP event
```

### Les seuils

```text
LCP <= 2.5s          => vert   : bon
2.5s < LCP <= 4.0s   => orange : à améliorer
LCP > 4.0s           => rouge  : mauvais
```

### Ce qui fait exploser le LCP

**Images non optimisées :**

```html
<!-- mauvais : image de 4Mo chargée sans compression -->
<img src="hero-naruto-4k.png" />

<!-- correct : format WebP + taille adaptée -->
<img
  src="hero-naruto.webp"
  srcset="hero-naruto-800.webp 800w, hero-naruto-1600.webp 1600w"
  sizes="(max-width: 800px) 100vw, 800px"
  width="1600"
  height="900"
  fetchpriority="high"
  alt="Illustration principale"
/>
```

**CSS qui bloque le rendu :**

```html
<!-- mauvais : CSS bloquant en tête de page -->
<link rel="stylesheet" href="all-styles-5000-lines.css" />

<!-- approche : isoler les styles nécessaires au premier rendu -->
<link rel="stylesheet" href="critical.css" />
<link
  rel="preload"
  href="below-the-fold.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="below-the-fold.css" /></noscript>
<!-- Ne diffère que les styles réellement non critiques et conserve un fallback
     sans JavaScript. Une CSP stricte peut imposer un chargeur externe plutôt
     qu'un attribut onload inline. -->
```

**JavaScript qui retarde le premier rendu :**

```html
<!-- mauvais : script synchrone avant le contenu -->
<script src="analytics.js"></script>
<body>
  ...
</body>

<!-- scripts du site qui doivent respecter l'ordre et attendre le parsing -->
<script src="app.js" defer></script>

<!-- script d'analytics indépendant du code applicatif -->
<script src="analytics.js" async></script>
```

### Comment mesurer le LCP depuis le code

```js
// PerformanceObserver : observe les événements de rendu
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  if (entries.length === 0) return;

  // Le dernier candidat livré est le candidat LCP le plus récent.
  const lcp = entries[entries.length - 1];
  console.log("LCP element:", lcp.element);
  console.log("LCP time:", lcp.startTime, "ms");

  if (lcp.startTime > 2500) {
    console.warn("LCP au-dessus du seuil de 2,5 secondes");
  }
});

// "largest-contentful-paint" : le type d'entrée qu'on observe
observer.observe({ type: "largest-contentful-paint", buffered: true });
```

---

## 2) INP : INTERACTION TO NEXT PAINT

### Ce que ça mesure

Le délai entre le début d'une interaction (clic, toucher ou touche du clavier) et le moment où le navigateur peut présenter la frame suivante. INP observe les interactions pendant toute la durée de la visite et retient une valeur représentative de la plus lente ; pour les pages avec beaucoup d'interactions, un très petit nombre de valeurs extrêmes est écarté.

INP a remplacé FID en mars 2024. FID ne mesurait que le délai avant le début du premier gestionnaire d'événement. INP inclut le délai d'entrée, l'exécution des gestionnaires et le délai avant la présentation de la frame suivante. Le survol et le défilement seuls ne sont pas des interactions prises en compte par INP.

```text
User clique sur un bouton
     |
     |---> event handler JS s'exécute
     |---> navigateur calcule le nouveau layout
     |---> navigateur peint le résultat
          |
         INP = ce délai total
```

### Les seuils

```text
INP <= 200ms         => vert   : bon
200ms < INP <= 500ms => orange : à améliorer
INP > 500ms          => rouge  : mauvais
```

### Ce qui fait exploser l'INP

**Event handler qui bloque le thread principal :**

```js
// mauvais : calcul lourd directement dans le click handler
button.addEventListener("click", () => {
  // ce calcul bloque le thread pendant 600ms
  // l'utilisateur clique, rien ne se passe visuellement
  const result = computePlayerRankings(10000); // O(n²)
  displayResult(result);
});

// correct : afficher un retour immédiat et déplacer le calcul hors du thread UI
const rankingWorker = new Worker("./rankings.worker.js", { type: "module" });
let latestRequestId = 0;

button.addEventListener("click", () => {
  const requestId = ++latestRequestId;
  showLoadingState();
  button.disabled = true;
  rankingWorker.postMessage({ requestId, players });
});

rankingWorker.addEventListener("message", (event) => {
  // Ignore un résultat ancien si une demande plus récente a été lancée.
  if (event.data.requestId !== latestRequestId) return;
  displayResult(event.data.rankedPlayers);
  button.disabled = false;
  showReadyState();
});
```

Dans le fichier séparé `rankings.worker.js` :

```js
self.addEventListener("message", (event) => {
  const { requestId, players } = event.data;
  const rankedPlayers = [...players].sort(
    (a, b) => b.points - a.points || String(a.id).localeCompare(String(b.id)),
  );
  self.postMessage({ requestId, rankedPlayers });
});
```

**Trop de travail synchrone dans une interaction :**

```js
// mauvais : mélange rendu, recalcul lourd et télémétrie dans le même gestionnaire
function handleFilterChange(value) {
  setFilter(value);
  updateURL(value);
  trackAnalytics(value); // fetch() est asynchrone, mais le travail JS de préparation reste ici
  rebuildIndex(items); // recalcul synchrone qui peut bloquer le prochain paint
}
```

```js
// meilleur découpage : feedback d'abord, calcul lourd dans un Worker
function handleFilterChange(value) {
  setFilter(value); // le framework planifie le retour visuel
  rankingWorker.postMessage({
    requestId: ++latestRequestId,
    items,
    filter: value,
  });

  // Télémétrie non bloquante : sendBeacon renvoie immédiatement un booléen.
  const payload = JSON.stringify({ event: "filter_changed", value });
  navigator.sendBeacon(
    "/analytics",
    new Blob([payload], { type: "application/json" }),
  );
}

// requestAnimationFrame sert à synchroniser une mise à jour visuelle avec une frame.
// Il ne rend PAS un calcul CPU lourd non bloquant : un long callback rAF retarde le paint.
```

### Mesurer les interactions liées à l'INP

Un événement `event` représente un événement de timing, pas forcément une interaction entière. Plusieurs événements peuvent appartenir au même geste (`interactionId`). L'exemple de mesure plus complet plus bas regroupe les événements par `interactionId` et garde la durée la plus longue de chaque geste.

Les trois phases sont : `input delay` (attente avant le gestionnaire), `processing duration` (exécution de tous les gestionnaires du geste dans la frame) et `presentation delay` (attente avant la frame présentée). `entry.duration` donne une durée globale pour l'entrée observée ; il ne décompose pas à lui seul les trois phases.

---

## 3) CLS : CUMULATIVE LAYOUT SHIFT

### Ce que ça mesure

Le score du plus grand groupe de décalages visuels inattendus pendant toute la durée de vie de la page. Ce groupe, appelé _session window_, rassemble des décalages séparés de moins d'une seconde, dans une fenêtre qui ne dépasse pas cinq secondes.

Ce n'est donc plus la somme de tous les décalages sur toute la vie de la page. Un changement directement lié à une interaction discrète récente peut être exclu (`hadRecentInput`), mais ce drapeau n'exclut pas indistinctement tous les décalages suivant un scroll ou un geste continu.

```text
Score CLS = somme de (impact fraction * distance fraction)
               |         |
          % de la viewport     déplacement
          affectée par le shift  relatif à la viewport
```

### Les seuils

```text
CLS <= 0.10         => vert   : bon
0.10 < CLS <= 0.25  => orange : à améliorer
CLS > 0.25          => rouge  : mauvais
```

### Ce qui fait exploser le CLS

**Images sans dimensions :**

```html
<!-- mauvais : le navigateur ne réserve aucun espace avant le chargement -->
<img src="messi-goal.jpg" />

<!-- correct : réserve l'espace avant même que l'image charge -->
<img src="messi-goal.jpg" width="800" height="600" />

<!-- ou avec CSS : même effet -->
<style>
  .hero-img {
    aspect-ratio: 4/3; /* réserve l'espace proportionnellement */
  }
</style>
```

**Contenu injecté dynamiquement au-dessus du fold :**

```js
// mauvais : bannière publicitaire insérée en haut après chargement
setTimeout(() => {
  const banner = document.createElement("div");
  banner.className = "promo-banner";
  document.body.insertBefore(banner, document.body.firstChild);
  // tout le contenu se décale vers le bas : CLS +0.3
}, 2000);

// correct : réserver l'espace à l'avance
// même si la bannière n'est pas encore chargée, l'espace existe
```

```css
/* réserver l'espace pour une bannière qui chargera plus tard */
.promo-banner {
  min-height: 90px; /* réserve la hauteur réelle attendue pour cette bannière */
  width: 100%;
}
```

**Polices qui causent un flash :**

```css
/* La police principale est remplacée temporairement par un fallback. */
@font-face {
  font-family: "CustomFont";
  src: url("custom-font.woff2") format("woff2");
  font-display: swap;
}

/* Ajuster le fallback, pas la police principale.
   Les pourcentages ci-dessous sont des exemples à calculer avec les métriques
   des deux polices ; ne pas les recopier sans mesure. */
@font-face {
  font-family: "AdjustedFallback";
  src: local("Arial");
  size-adjust: 98%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}

body {
  font-family: "CustomFont", "AdjustedFallback", sans-serif;
}
```

### Mesurer le CLS par fenêtres de session

```js
let clsValue = 0;
let sessionValue = 0;
let sessionStart = null;
let lastShiftTime = null;

const observer = new PerformanceObserver((list) => {
  const entries = [...list.getEntries()].sort(
    (a, b) => a.startTime - b.startTime,
  );

  for (const entry of entries) {
    // Les décalages associés à une interaction discrète récente sont exclus.
    if (entry.hadRecentInput) continue;

    const startsNewSession =
      lastShiftTime === null ||
      entry.startTime - lastShiftTime >= 1000 ||
      entry.startTime - sessionStart >= 5000;

    if (startsNewSession) {
      sessionStart = entry.startTime;
      sessionValue = entry.value;
    } else {
      sessionValue += entry.value;
    }

    lastShiftTime = entry.startTime;
    clsValue = Math.max(clsValue, sessionValue);
  }
});

observer.observe({ type: "layout-shift", buffered: true });

function reportCls() {
  console.log(`CLS observé (plus grande session) : ${clsValue.toFixed(3)}`);
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") reportCls();
});
window.addEventListener("pagehide", reportCls);
```

Cette version illustre les fenêtres de session. Elle ne couvre pas toutes les subtilités de la métrique sur les pages restaurées depuis le BFCache ou les décalages provenant d'iframes. Pour la mesure de production, préfère `web-vitals`.

---

## 4) LIRE LES TROIS MÉTRIQUES ENSEMBLE

LCP, INP, CLS ne s'analysent pas séparément. Ils racontent une histoire :

```text
LCP élevé + INP ok + CLS ok
 => le contenu charge lentement mais l'app est réactive une fois chargée
 => problème réseau / ressources lourdes

LCP ok + INP élevé + CLS ok
 => la page affiche vite mais réagit lentement aux interactions
 => JS trop lourd sur le thread principal

LCP ok + INP ok + CLS élevé
 => la page charge et réagit bien mais le contenu saute partout
 => images sans dimensions, contenu injecté dynamiquement
```

### Mesurer les trois en une passe

```js
// web-vitals est la bibliothèque de référence recommandée pour mesurer en production.
// Elle gère des cas particuliers de cycle de vie et de mesure que le code natif
// pédagogique ci-dessous ne reproduit pas tous.
// Installation : npm install web-vitals
import { onLCP, onINP, onCLS } from "web-vitals";

function sendToAnalytics({ name, value, rating }) {
  // rating : "good" | "needs-improvement" | "poor"
  console.log(`${name}: ${Math.round(value)}ms : ${rating}`);
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(({ name, value, rating }) => {
  // CLS est un score sans unité, pas une durée.
  console.log(`${name}: ${value.toFixed(3)} : ${rating}`);
});
```

### Fonctions testables sans navigateur

Ces fonctions pures servent à tester les seuils, l'approximation de la valeur INP et le regroupement CLS. Elles ne remplacent pas les règles complètes de la bibliothèque `web-vitals`.

```js
export function rateLcp(value) {
  if (!Number.isFinite(value)) return "unavailable";
  if (value <= 2500) return "good";
  if (value <= 4000) return "needs-improvement";
  return "poor";
}

export function rateInp(value) {
  if (!Number.isFinite(value)) return "unavailable";
  if (value <= 200) return "good";
  if (value <= 500) return "needs-improvement";
  return "poor";
}

export function rateCls(value) {
  if (!Number.isFinite(value)) return "unavailable";
  if (value <= 0.1) return "good";
  if (value <= 0.25) return "needs-improvement";
  return "poor";
}

// `values` contient déjà une durée maximale par interactionId.
// On écarte une valeur extrême par tranche de 50 interactions.
export function approximateInp(values) {
  if (!Array.isArray(values) || values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const ignoredOutliers = Math.floor(sorted.length / 50);
  return sorted[sorted.length - 1 - ignoredOutliers];
}

export function createClsSessionTracker() {
  let sessionStart = null;
  let lastShiftTime = null;
  let sessionValue = 0;
  let maxSessionValue = 0;

  return {
    add(entry) {
      if (entry.hadRecentInput) return maxSessionValue;

      const startsNewSession =
        lastShiftTime === null ||
        entry.startTime - lastShiftTime >= 1000 ||
        entry.startTime - sessionStart >= 5000;

      if (startsNewSession) {
        sessionStart = entry.startTime;
        sessionValue = entry.value;
      } else {
        sessionValue += entry.value;
      }

      lastShiftTime = entry.startTime;
      maxSessionValue = Math.max(maxSessionValue, sessionValue);
      return maxSessionValue;
    },
    value() {
      return maxSessionValue;
    },
  };
}
```

### Mesure native pédagogique des trois métriques

Le code suivant assemble ces fonctions avec les API natives. C'est une version didactique : les limites de l'API (iframes, BFCache, pages maintenues longtemps en arrière-plan et certains cas de cycle de vie) empêchent de la considérer comme une implémentation de production complète.

```js
function measureVitals(onReport = console.log) {
  const values = { lcp: null, inp: null, cls: 0 };
  const interactions = new Map();
  const observers = [];
  const clsTracker = createClsSessionTracker();

  function addInteraction(entry) {
    if (!Number.isInteger(entry.interactionId) || entry.interactionId <= 0)
      return;
    const previous = interactions.get(entry.interactionId) ?? 0;
    interactions.set(entry.interactionId, Math.max(previous, entry.duration));
    values.inp = approximateInp([...interactions.values()]);
  }

  function observe(type, callback, extraOptions = {}) {
    if (!PerformanceObserver.supportedEntryTypes?.includes(type)) return;
    try {
      const observer = new PerformanceObserver((list) =>
        callback(list.getEntries()),
      );
      observer.observe({ type, buffered: true, ...extraOptions });
      observers.push(observer);
    } catch {
      // Type d'entrée ou option non pris en charge par ce navigateur.
    }
  }

  observe("largest-contentful-paint", (entries) => {
    for (const entry of entries) values.lcp = entry.startTime;
  });

  observe(
    "event",
    (entries) => {
      for (const entry of entries) addInteraction(entry);
    },
    { durationThreshold: 16 },
  );

  // Le premier événement peut être plus court que le seuil des entrées `event`.
  observe("first-input", (entries) => {
    for (const entry of entries) addInteraction(entry);
  });

  observe("layout-shift", (entries) => {
    for (const entry of [...entries].sort(
      (a, b) => a.startTime - b.startTime,
    )) {
      values.cls = clsTracker.add(entry);
    }
  });

  function snapshot() {
    const result = {
      ...values,
      ratings: {
        lcp: rateLcp(values.lcp),
        inp: rateInp(values.inp),
        cls: rateCls(values.cls),
      },
    };
    onReport(result);
    if (Object.values(result.ratings).includes("poor")) {
      console.warn(
        "Au moins une métrique Core Web Vitals est dans la zone poor.",
      );
    }
    return result;
  }

  function reportWhenHidden() {
    if (document.visibilityState === "hidden") snapshot();
  }

  document.addEventListener("visibilitychange", reportWhenHidden);
  window.addEventListener("pagehide", snapshot);

  return {
    snapshot,
    disconnect() {
      for (const observer of observers) observer.disconnect();
      document.removeEventListener("visibilitychange", reportWhenHidden);
      window.removeEventListener("pagehide", snapshot);
    },
  };
}
```

**Limites de cette version native :** le suivi INP est une approximation du percentile et ne traite pas les iframes ; la gestion du cycle de vie n'intègre pas toutes les règles BFCache ; le navigateur peut ne pas exposer tous les types d'entrée. Pour une mesure de terrain, utilise la bibliothèque `web-vitals` et valide les données réelles.

---

## EXERCICES

## EXO 1 : DIAGNOSTIC LCP

Tu es le lead dev de la fansite officielle de la Champions League. Le patron te sort que le LCP est à 6.2 secondes. Les images hero font 3Mo. Le CSS est un seul fichier de 8000 lignes. Il y a 4 scripts analytics en tête de page.

Liste les 3 changements prioritaires. Implémente le fix sur les images (attributs HTML) et les scripts (attributs de chargement).

---

## EXO 2 : INTERACTION LENTE

Un dashboard de stats de Ballon d'Or a un bouton "Calculer le classement" qui prend 800ms à répondre visuellement. Le handler fait un tri O(n²) sur 15000 joueurs, met à jour le DOM, et envoie un event analytics.

Refactore le handler pour que l'INP passe sous 200ms. Le utilisateur doit voir une réponse visuelle immédiate, même si le calcul n'est pas terminé.

---

## EXO 3 : LAYOUT SHIFT HUNTING

Une page blog a un CLS de 0.41. La page contient :

- 3 images sans dimensions
- Une bannière publicitaire chargée 3 secondes après le premier rendu
- Une police custom sans `font-display`
- Un bloc "commentaires récents" injecté en haut de page via JS

Identifie les 4 sources de CLS. Corrige-les une par une. Mesure le CLS avant et après avec le code d'observation.

---

## EXO 4 : PIPELINE DE MESURE

Écris une fonction `measureVitals()` qui :

- observe LCP, INP, et CLS simultanément
- stocke les valeurs dans un objet `{ lcp, inp, cls }`
- affiche un résumé avec le rating de chaque métrique (`good` / `needs-improvement` / `poor`)
- loggue une alerte si au moins une métrique est dans le rouge

(Sans utiliser la lib `web-vitals` : uniquement `PerformanceObserver` natif)

---

## CORRIGÉS DE RÉFÉRENCE

Les corrigés sont à consulter après une première tentative. Les valeurs de départ des exercices sont des données de scénario, pas des mesures de production.

### Corrigé : EXO 1 : diagnostic LCP

1. **Priorité au contenu LCP :** identifier l'élément réellement retenu par le navigateur dans la trace. S'il s'agit de l'image hero, fournir des variantes adaptées (`srcset` et `sizes`), compresser l'image, déclarer ses dimensions et lui donner `fetchpriority="high"`. Ne pas appliquer `loading="lazy"` à l'image principale visible immédiatement.
2. **Réduire le blocage du rendu :** séparer les styles nécessaires au premier écran du reste ; mesurer avant d'externaliser ou de retarder des feuilles, pour éviter un flash sans style.
3. **Revoir les scripts analytics :** retirer ceux qui ne sont pas nécessaires au premier rendu. Utiliser `defer` pour les scripts applicatifs qui doivent respecter l'ordre après le parsing ; `async` pour un script réellement indépendant. Ne pas appliquer `async` à un script qui dépend de l'ordre d'exécution.

Exemple de correction HTML pour l'image et les scripts :

```html
<img
  src="hero-1600.webp"
  srcset="hero-800.webp 800w, hero-1600.webp 1600w"
  sizes="100vw"
  width="1600"
  height="900"
  fetchpriority="high"
  alt="Action principale du match"
/>
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
```

On ne promet pas que LCP passera de 6,2 s à une valeur précise sans mesurer la page après chaque changement.

### Corrigé : EXO 2 : interaction lente

Le gestionnaire doit afficher un état immédiat, puis transférer le tri à un Web Worker pour ne pas monopoliser le thread principal. Remplacer un tri O(n²) par un tri O(n log n) avec un comparateur déterministe ; ignorer les réponses d'une requête devenue obsolète. L'analytique ne doit pas exécuter de calcul réseau synchrone dans le handler : `sendBeacon` ou `fetch` avec `keepalive` est un envoi non bloquant.

Le code du Worker et du gestionnaire dans la section INP constitue le modèle de référence. Dans une application réelle, il faut aussi vérifier le coût de copie/transfert des 15 000 objets ; un tableau typé transférable peut être plus approprié si la structure des données le permet. Un Worker ne garantit pas à lui seul une INP inférieure à 200 ms : le rendu initial, la taille du DOM et les autres tâches doivent aussi être mesurés.

### Corrigé : EXO 3 : layout shift hunting

- **Images :** ajouter `width` et `height` cohérents avec le ratio réel, ou un conteneur avec `aspect-ratio`.
- **Publicité :** réserver avant le chargement une zone correspondant à sa taille réelle ; ne pas insérer tardivement une bannière au-dessus du contenu déjà lu.
- **Police :** définir `font-display` avec un fallback adapté ; mesurer les métriques typographiques et ajuster le fallback (`size-adjust`, `ascent-override`, `descent-override` si nécessaire), au lieu de copier une valeur de 105 % sans mesure.
- **Commentaires :** ne pas injecter le bloc au-dessus du contenu. Le placer après l'article ou réserver explicitement son espace avant le chargement.

La mesure « avant/après » doit comparer le plus grand _session window_, pas additionner toute la vie de la page. Le bloc `createClsSessionTracker()` permet de tester la logique de regroupement ; le score réel doit être observé dans un navigateur sur le parcours concerné.

### Corrigé : EXO 4 : pipeline de mesure

La fonction `measureVitals()` plus haut observe les quatre types d'entrée nécessaires (`largest-contentful-paint`, `event`, `first-input`, `layout-shift`), regroupe les événements par `interactionId`, calcule une valeur INP pédagogique, met à jour le CLS à partir de sessions et expose `snapshot()` ainsi que `disconnect()`.

Les valeurs nulles signifient qu'aucune observation exploitable n'est disponible ; elles ne doivent pas être présentées comme un zéro mesuré. Pour une exploitation de production, remplacer cette implémentation didactique par `web-vitals`, qui gère davantage de cas du cycle de vie, et transmettre les résultats avec le contexte de navigation.

## RÉSUMÉ

- **LCP :** moment du rendu du plus grand élément visible, calculé depuis le début de la navigation. Le réseau, les redirections, le TTFB, les images et le CSS peuvent le retarder.
- **INP :** réactivité aux clics, tapes et frappes clavier. La valeur représente la plupart des interactions, pas une moyenne naïve ni systématiquement le pire événement isolé.
- **CLS :** stabilité visuelle, mesurée par la plus grande session window de décalages inattendus, pas par la somme de toute la vie de la page.

Les trois métriques se lisent ensemble. Les seuils sont des repères de terrain au 75e percentile, à segmenter mobile/ordinateur ; un résultat de laboratoire n'est pas une preuve de performance en production.

## RÉFÉRENCES OFFICIELLES

Sources consultées le 11 novembre 2026. Les seuils sont les recommandations Core Web Vitals actuelles ; vérifier de nouveau la documentation avant une certification ou un changement important de version.

- Google Search Central : [Core Web Vitals et résultats de recherche](https://developers.google.com/search/docs/appearance/core-web-vitals) : rôle des métriques dans l'expérience de page et repères recommandés.
- web.dev : [Largest Contentful Paint (LCP)](https://web.dev/articles/lcp) : définition relative au début de navigation et prise en compte des étapes réseau précédant le rendu.
- web.dev : [Interaction to Next Paint (INP)](https://web.dev/articles/inp) : interactions prises en compte, calcul et limites de l'API Event Timing.
- web.dev : [Cumulative Layout Shift (CLS)](https://web.dev/articles/cls) : sessions de décalages, exclusions et limites de la mesure native.
- web.dev : [Optimiser les polices web](https://web.dev/learn/performance/optimize-web-fonts) : `font-display`, fallback et risques de décalage visuel.
- web.dev : [Seuils des Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds) : justification des seuils.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « Lcp, inp, cls : les trois chiffres que google regarde sur ton site » à un service long-vivant plutôt qu’un script ponctuel. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Lcp, inp, cls : les trois chiffres que google regarde sur ton site** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Distinguer LCP, INP et CLS sur un parcours

**Mission liée à « Lcp, inp, cls : les trois chiffres que google regarde sur ton site » :** Mesure un parcours Kintana en environnement de laboratoire et relie chaque signal à un mécanisme candidat : chargement du contenu principal, réactivité ou stabilité visuelle.

**Livrable :** Rapport des trois métriques, parcours utilisé et hypothèses causales.

**Critères d’acceptation :** Les métriques ne sont pas confondues ; les données laboratoire et terrain sont distinguées ; aucun seuil n’est présenté comme universel sans contexte.

**Transfert obligatoire :** Le laboratoire est bon mais les utilisateurs signalent un problème : précise quelles données terrain consulter.
