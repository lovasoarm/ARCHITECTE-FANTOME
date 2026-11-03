---
perishability_id: PER-0006

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://nodejs.org/docs/v22.23.4/api/errors.html"
source_type: primary
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle versionnée Node.js 22.23.4 Errors, rapprochée du contenu ciblé sur Error, Error.stack, captureStackTrace et les traces. Le contenu officiel versionné a été consulté via le miroir officiel R2 lorsque nodejs.org ne rendait pas la page directement. Les commandes locales ne sont pas certifiées pour tous les OS."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
additional_sources:
  - "https://v8.dev/docs/stack-trace-api"
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "VERSIONED_NODE_ERRORS_REFERENCE_AND_NAMED_SCOPE_CHECKED_2026-11-03"
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# Lire une stack trace : la carte qui te dit où le code a explosé

Temps de lecture ~6 min

Tu vois du rouge dans ta console. Dix lignes. Peut-être vingt.
Un réflexe fréquent consiste à copier-coller le message sur un moteur de recherche sans lire la trace.

Mauvais réflexe. La stack trace donne des indices sur le chemin d'exécution, mais elle ne dit pas toujours tout : elle peut être limitée en nombre de frames, ne montrer qu'une partie du parcours asynchrone et varier selon le moteur, la version ou les outils.
C'est pas une punition : c'est une carte partielle qu'il faut recouper avec le message, le code et la reproduction.

Ce fichier t'apprend à la lire, ligne par ligne, sans panique.

---

## 1) CE QU'EST UNE STACK TRACE

Une stack trace est une représentation des frames d'appel associées à une erreur. Dans Node/V8, la propriété `error.stack` est généralement rattachée au moment où l'objet `Error` est créé (ou quand `Error.captureStackTrace()` est appelé), puis sa chaîne est formatée à la lecture. Pour une erreur native comme ce `TypeError`, le moteur construit la trace autour du point où l'erreur est produite.

La call stack (pile d'appels) : l'empilement des fonctions actives. Chaque appel ajoute une frame ; le retour en retire une. La trace disponible n'est pas nécessairement toute l'histoire : `Error.stackTraceLimit`, les frontières async et les outils peuvent en limiter le contenu.

```text
CALL STACK au moment du crash

 calculerDegats   <-- crash ici (en haut : plus récent)
 lancerJutsu    <-- a appelé calculerDegats
 simulerCombat   <-- a appelé lancerJutsu
 <anonymous>    <-- point d'entrée du script
```

Dans les exemples V8 ci-dessous, la première frame utile est généralement la plus proche de l'erreur, puis viennent les appelants. Vérifie toujours la convention affichée par ton runtime.

---

## 2) ANATOMIE D'UNE STACK TRACE RÉELLE

```js
// combat.js : moteur de combat de l'Académie de Konoha
function calculerDegats(attaquant, cible) {
  return (attaquant.chakra * attaquant.force) / cible.defense; // crash : cible est undefined
}

function lancerJutsu(attaquant, victime) {
  return calculerDegats(attaquant, victime);
}

function simulerCombat(ninja1, ninja2) {
  return lancerJutsu(ninja1, ninja2);
}

simulerCombat(
  { chakra: 100, force: 50, jutsus: ["Rasengan"] },
  undefined, // victime oubliée à l'appel
);
```

Exemple de forme possible dans le terminal (le format et les frames exactes varient selon Node/V8) :

```text
TypeError: Cannot read properties of undefined (reading 'defense')
  at calculerDegats (combat.js:2:39)
  at lancerJutsu (combat.js:7:10)
  at simulerCombat (combat.js:11:10)
  at Object.<anonymous> (combat.js:14:1)
  at Module._compile (node:internal/modules/cjs/loader:1364:14)
  at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
  at Module.load (node:internal/modules/cjs/loader:1203:32)
  at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:128:12)
```

Décomposition ligne par ligne :

```text
TypeError: Cannot read properties of undefined (reading 'defense')
^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
type d'erreur          message exact
```

Le type : `TypeError` signifie qu'on a essayé d'utiliser une valeur d'un mauvais type.
Le message : `undefined (reading 'defense')` dit exactement quoi : `cible` vaut `undefined`,
et on a tenté de lire `cible.defense`.

```text
  at calculerDegats (combat.js:2:39)
    ^^^^^^^^^^^^^^ ^^^^^^^^^^ ^ ^^
    nom de fonction fichier ligne colonne
```

C'est là que le crash s'est produit : fichier `combat.js`, ligne 2, colonne 39.

```text
  at lancerJutsu  (combat.js:7:10)
  at simulerCombat (combat.js:11:10)
  at Object.<anonymous> (combat.js:14:1)
```

Le chemin d'appel : `simulerCombat` -> `lancerJutsu` -> `calculerDegats` -> crash.

```text
  at Module._compile (node:internal/modules/cjs/loader:1364:14)
  at Module._extensions..js ...
```

Ces lignes commencent par `node:internal` ou `node:` : elles décrivent le chemin dans le runtime Node. Elles ne sont généralement pas le premier endroit à corriger pour un bug métier, mais ne les ignore pas systématiquement : elles peuvent montrer une frontière utile (chargement de module, timer, réseau, filesystem) ou aider à identifier une erreur du runtime / d'une API.

---

## 3) RÈGLE : CE QUI T'APPARTIENT ET CE QUI NE T'APPARTIENT PAS

```text
at calculerDegats (combat.js:2:39)     <- ton code : lis cette ligne
at lancerJutsu  (combat.js:7:10)     <- ton code : lis cette ligne
at simulerCombat (combat.js:11:10)     <- ton code : lis cette ligne
at Object.<anonymous> (combat.js:14:1)   <- ton code (point d'entrée)
at Module._compile (node:internal/...)   <- runtime : inspecte si pertinent
at Module._extensions (node:internal/...)  <- runtime : inspecte si pertinent
at Module.load  (node:internal/...)    <- runtime : inspecte si pertinent
```

Règle de départ : commence par la première frame de ton code, puis remonte les appelants. Les frames `node:internal` et `node_modules` ne sont pas automatiquement inutiles : inspecte-les si ton code les traverse directement, si l'erreur concerne une API ou si la première frame applicative n'explique pas le problème. Une dépendance peut aussi être la source du défaut.

---

## 4) LIRE UNE STACK TRACE ASYNC

Les Promises et async/await complexifient les stacks traces.
Quand une Promise rejette et que l'erreur est catchée plus loin, la trace peut sembler déconnectée.

```js
// patrouille.js : système d'alerte des Chevaliers de Garo
async function envoyerAlerte(horreur) {
  const chevalier = await trouverChevalier(horreur.zone);
  return chevalier.armer(); // crash : chevalier est null
}

async function trouverChevalier(zone) {
  const data = await fetchAPI(`/chevaliers?zone=${zone}`);
  return data.chevalier; // retourne null si aucun chevalier disponible
}

envoyerAlerte({ zone: "secteur-nord" });
```

Stack trace async :

```text
TypeError: Cannot read properties of null (reading 'armer')
  at envoyerAlerte (patrouille.js:3:24)
  at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

Sortie illustrative  : le texte exact dépend de Node/V8.
(Aucune option supplémentaire n'est normalement nécessaire pour les frames async prises en charge par V8.)
```

Deux points à comprendre :

- Une fonction qui a déjà terminé (`trouverChevalier`, ici) n'apparaît pas forcément comme une frame active au moment de l'erreur. V8 peut toutefois reconstruire certaines frontières `await` et les ajouter comme frames marquées `async`.
- `process.processTicksAndRejections` est une frame du mécanisme de Promises de Node. Elle explique le passage par la file de microtâches ; ce n'est pas nécessairement la cause du défaut.

**À propos de `--async-stack-traces` :** V8 active les traces asynchrones « zero-cost » par défaut depuis V8 7.3. Tu n'as normalement pas besoin d'ajouter cette option à Node 22. La reconstruction concerne surtout les sites `await`, `Promise.all()` et `Promise.any()` documentés par V8 ; elle ne reconstitue pas tous les callbacks ni tout l'historique du programme. Si une frame manque, inspecte le flux de Promises, les erreurs `cause`, les logs corrélés et les points d'entrée plutôt que de compter sur un drapeau magique.

---

## 5) EXEMPLE COMPLET : DIAGNOSTIC EN TROIS SECONDES

Exercice mental. Stack trace suivante :

```text
RangeError: Maximum call stack size exceeded
  at puissance (dbz.js:4:10)
  at puissance (dbz.js:5:10)
  at puissance (dbz.js:5:10)
  at puissance (dbz.js:5:10)
  ... (1000 lignes identiques)
  at Object.<anonymous> (dbz.js:8:1)
```

Lecture :

- Type : `RangeError`, message `Maximum call stack size exceeded` : la profondeur d'appels a dépassé la limite du runtime.
- Fonction en cause : `puissance` dans `dbz.js`.
- La répétition des frames suggère une récursion ou un enchaînement d'appels trop profond.
- La ligne 8 est un point d'entrée possible ; vérifie les arguments transmis et le chemin qui mène à la récursion.

Diagnostic : vérifie le cas de base (base case), la progression de l'argument et les entrées extrêmes. Une récursion infinie est une cause possible, mais une récursion finie trop profonde peut aussi dépasser la limite. Le message seul ne prouve donc pas l'absence de condition d'arrêt.

---

## Références ciblées

- [Node.js v22.23.4 : Errors](https://nodejs.org/docs/v22.23.4/api/errors.html) : `Error.stack`, `Error.captureStackTrace` et `Error.stackTraceLimit`.
- [V8 : Stack Trace API](https://v8.dev/docs/stack-trace-api) : capture des frames et limites des traces asynchrones zero-cost.

Ces références soutiennent les mécanismes décrits ci-dessus ; elles ne garantissent pas que chaque trace produite par ton environnement aura exactement la même forme.

## EXERCICES

EXO 1 : Identifier le bug sans ouvrir le fichier (~8 min)

Le système de combat de Konoha envoie ce message d'erreur :

```text
TypeError: ninja.jutsus is not a function
  at selectionnerJutsu (jutsu_selector.js:12:22)
  at preparerAttaque (combat_engine.js:34:10)
  at tour (combat_engine.js:67:5)
  at simulerTour (game.js:103:3)
  at Object.<anonymous> (game.js:156:1)
  at Module._compile (node:internal/modules/cjs/loader:1364:14)
```

Sans voir le code : réponds à ces questions.

- Quel est le type d'erreur ? Qu'est-ce que ça signifie ?
- Dans quel fichier et à quelle ligne le crash s'est-il produit ?
- Quelle propriété ou méthode est en cause ?
- Donne une hypothèse concrète sur la cause.
- Quelle ligne du fichier appelant vaut la peine d'être inspectée en deuxième ?

EXO 2 : Tracer le chemin d'appel (~10 min)

Voici une stack trace d'un système de surveillance de camp (Walking Dead) :

```text
TypeError: Cannot read properties of undefined (reading 'niveau')
  at evaluerMenace (securite.js:8:19)
  at calculerAlerte (securite.js:23:7)
  at mettreAJourEtat (camp.js:45:5)
  at tick (simulation.js:89:3)
  at setInterval (node:timers:231:11)
```

Exercice : dessine le chemin d'appel dans l'ordre chronologique (du premier appel au crash).
Ensuite : que vaut probablement la variable passée à `evaluerMenace` au moment du crash ?
Indice : la fonction à la ligne 8 de `securite.js` lit `.niveau` sur quelque chose.

---

## RÉSUMÉ

Une stack trace lit le chemin d'exécution depuis le crash jusqu'à l'origine.
La première ligne donne le type d'erreur et le message exact : c'est ton diagnostic.
Les premières lignes `at ...` pointent ton code : fais-leur confiance.
Tout ce qui commence par `node:internal` ou `node_modules` : ignore.
En async, la trace est parfois incomplète : `node --async-stack-traces` aide en dev.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-DIAGRAM:debug -->

## Repère visuel utile : Reproduction et correction d'un incident Kintana

```text
signal utilisateur
      |
      v
hypothèses falsifiables
      |
      v
reproduction stable ? -- non --> instrumenter
      | oui
      v
isoler la cause
      |
      v
patch minimal + test de régression
```

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Lire une stack trace : la carte qui te dit où le code a explosé** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Lire une stack trace : la carte qui te dit où le code a explosé » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.

> **À garder en tête :** la forme d’une stack trace dépend du runtime, des source maps, de la transpilation et parfois de la minification. Lis les chemins et numéros de ligne comme des indices propres à l’exécution observée, pas comme une preuve que le code source affiché correspond exactement au fichier livré. Référence : [documentation officielle Node.js sur les erreurs](https://nodejs.org/docs/v22.23.4/api/errors.html).
