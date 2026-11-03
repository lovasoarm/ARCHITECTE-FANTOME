---
perishability_id: PER-0038

stability: perissable
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, fausse_piste]
anti_recipe_key: constraints_injectees+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Node vs browser : même JS, deux planètes ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Node vs browser : même JS, deux planètes

Temps de lecture ~8 min

Même langage et mêmes règles ECMAScript de base, mais pas les mêmes API d'hôte. `window` et le DOM appartiennent au navigateur ; `node:fs` et `process` appartiennent à Node. Certaines API existent dans les deux environnements, par exemple `fetch`, les timers ou `URL`, mais leur disponibilité et certains comportements dépendent du runtime.

Les moteurs JavaScript varient aussi : Node utilise V8 ; Chrome et les navigateurs Chromium utilisent V8, Firefox utilise SpiderMonkey et Safari utilise JavaScriptCore. Les navigateurs ont des boucles d'événements adaptées au rendu et aux tâches Web ; Node utilise son propre modèle d'événements et libuv. Les deux gèrent l'asynchronisme, mais il ne faut pas supposer que toutes les phases, priorités et API sont identiques.

En production, savoir où ton code vit détermine quelles API sont disponibles, quelles contraintes de sécurité s'appliquent et pourquoi un programme peut fonctionner dans un environnement puis échouer dans un autre.

---

## 1) LE RUNTIME : CE QUI TOURNE VRAIMENT SOUS LE CAPOT

JavaScript est exécuté par un moteur. Node s'appuie sur V8 ; le navigateur utilise le moteur choisi par son éditeur. Le moteur exécute le langage, tandis que le runtime ajoute les API disponibles : fichiers et processus côté Node ; DOM, rendu et stockage Web côté navigateur. Certaines API, comme `fetch`, existent aujourd'hui dans les deux environnements, mais leurs contraintes ne sont pas toutes identiques.

```text
                  [ code JavaScript ]
                           |
                    [ moteur JS ]
                           |
              +------------+------------+
              |                         |
           [ Node ]                 [ Browser ]
              |                         |
       [ V8 + APIs Node ]      [ moteur du navigateur
       [ fs, os, process ]      + APIs Web ]
                                [ DOM, window,
                                  localStorage,
                                  canvas, audio ]

      APIs communes possibles : fetch, URL, timers,
      encodage et autres fonctionnalités selon le runtime
```

Node fournit des API système : fichiers, réseau, processus et workers. Le navigateur fournit les API Web liées au document, au rendu et aux interactions. Le chevauchement existe ; il ne signifie pas que les deux environnements sont interchangeables.

---

## 2) CE QUE CHAQUE ENVIRONNEMENT APPORTE

**Dans le navigateur :**

```js
// le DOM : accès direct à la page HTML
document.querySelector(".card").addEventListener("click", () => {
  // l'utilisateur a cliqué : on réagit
  document.title = "clicked";
});

// le stockage web : conserver une préférence non sensible
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
// Ne stocke jamais de token ou de secret dans Web Storage.

// fetch : HTTP depuis le navigateur (intégré, pas besoin d'import)
const data = await fetch("https://api.foot.com/matches").then((r) => r.json());

// window : l'objet global:il contient TOUT dans le navigateur
console.log(window === globalThis); // true
```

**Dans Node :**

```js
// fs : lire et écrire des fichiers sur le disque
import { readFile } from "node:fs/promises";
const content = await readFile("./data.json", "utf-8");

// process : infos sur le processus en cours
console.log(process.env.NODE_ENV); // 'development' ou 'production'
console.log(process.argv); // les arguments passés en ligne de commande

// os : infos sur la machine
import os from "node:os";
console.log(os.cpus().length); // combien de coeurs CPU sur cette machine

// globalThis : l'objet global dans Node (pas window, pas document)
console.log(globalThis === global); // true:mais window n'existe pas ici
```

---

## 3) LES ZONES DE DANGER : CE QUI EXPLOSE

```js
// ---- cas 1 : du code navigateur exécuté dans Node ----

// tu importes une lib qui fait ça :
const el = document.getElementById("app");
// ReferenceError: document is not defined
// Node ne sait pas ce qu'est un DOM

// ---- cas 2 : du code Node exécuté dans le navigateur ----

import { readFileSync } from "fs";
// ModuleNotFoundError:'fs' n'existe pas dans le navigateur

// ---- cas 3 : fetch:l'exception qui piège tout le monde ----

// fetch est natif dans le navigateur depuis toujours
// fetch est natif dans Node depuis v18 seulement
// avant Node 18 : tu devais installer node-fetch ou axios

// résultat en prod : ton code plante sur une ancienne version de Node
// et tu cherches le bug pendant 2 heures

// ---- cas 4 : l'objet global ----

// navigateur :
console.log(typeof window); // 'object'
console.log(typeof global); // 'undefined'

// Node :
console.log(typeof window); // 'undefined'
console.log(typeof global); // 'object'

// les deux :
console.log(typeof globalThis); // 'object':c'est l'API universelle depuis ES2020
```

---

## 4) DÉTECTER L'ENVIRONNEMENT DEPUIS LE CODE

```js
// méthode solide : tester globalThis
function getRuntime() {
  if (typeof window !== "undefined") return "browser";
  if (typeof process !== "undefined" && process.versions?.node) return "node";
  return "unknown";
}

// usage concret : une lib qui s'adapte
async function readConfig(path) {
  const runtime = getRuntime();

  if (runtime === "node") {
    // on lit depuis le disque
    const { readFile } = await import("node:fs/promises");
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  }

  if (runtime === "browser") {
    // on lit une préférence non sensible du stockage local
    const content = localStorage.getItem(path);
    return content === null ? null : JSON.parse(content);
  }

  throw new Error(`runtime inconnu : ${runtime}`);
}
```

Pourquoi c'est utile : les libs isomorphiques (qui tournent dans les deux environnements) font exactement ça. Lodash, date-fns, zod : ils détectent l'environnement et adaptent leur code.

---

## 5) LE TABLEAU QUI RÉSUME TOUT

```text
API / fonctionnalité       Node                         Navigateur
--------------------------------------------------------------------------
Moteur JS                 V8                           V8 / SpiderMonkey / JavaScriptCore selon le navigateur
Asynchronisme             oui                          oui ; ordonnancement lié aussi au rendu et aux API Web
fetch                     global depuis Node 18        oui ; les règles de sécurité Web diffèrent
DOM (`document`, `window`) non                         oui dans une page (pas dans un Worker)
localStorage              non                          oui dans les contextes qui l'autorisent ; jamais de secret
Fichiers (`node:fs`)      oui                          non depuis une page Web ordinaire
`process.env`             oui                          non (ne pas exposer de secrets au client)
Workers                   `node:worker_threads`        Web Workers ; API distincte
WebSocket                 API intégrée dans les versions Node récentes ; vérifier le runtime   oui
Canvas / WebGL            pas d'API DOM native          oui dans les contextes adaptés
Web Crypto                `crypto` / `node:crypto`      `crypto` ; API commune, disponibilité liée au contexte/version
globalThis                oui                          oui ; objet global de l'environnement
```

---

## EXERCICES

## EXO 1 : le détective de runtime

T'écris une fonction `describeRuntime()` qui retourne un objet :

```js
{
 name: 'node' | 'browser' | 'unknown',
 version: string | null,  // version Node si disponible
 canReadFiles: boolean,
 canAccessDOM: boolean,
 globalObject: 'window' | 'global' | 'globalThis'
}
```

Contrainte : zero try/catch. Utilise uniquement des checks `typeof` et des accès optionnels (`?.`).

---

## EXO 2 : la lib qui s'adapte

T'écris une fonction `readData(key)` qui :

- dans Node : lit depuis un fichier JSON nommé `key + '.json'` dans le dossier courant
- dans le navigateur : lit une préférence ou une valeur locale non sensible depuis `localStorage.getItem(key)` ; jamais un token, un identifiant de session ou un secret
- dans les deux cas : retourne l'objet parsé, ou `null` si la donnée n'existe pas

Teste avec deux exports séparés si tu veux séparer les responsabilités.

---

## EXO 3 : la bombe à désamorcer

Ce code plante. T'as 3 bugs liés au mauvais environnement. Il illustre aussi volontairement une mauvaise idée de stockage : `user` peut contenir des données sensibles ; ne conserve jamais une session ou un token dans Web Storage :

```js
import fs from "fs";

export function saveSession(userId, data) {
  window.sessionId = userId;
  localStorage.setItem("user", JSON.stringify(data));
  fs.writeFileSync(`./sessions/${userId}.json`, JSON.stringify(data));
  document.title = `Session : ${userId}`;
}
```

Identifie les problèmes et propose une version qui tourne dans Node uniquement.

---

## RÉSUMÉ

Node utilise V8, tandis que les navigateurs peuvent utiliser V8, SpiderMonkey ou JavaScriptCore. Les runtimes partagent le langage et plusieurs API, mais pas toutes les API d'hôte ni les détails de leur ordonnancement asynchrone. Le navigateur expose le DOM et Web Storage ; Node expose notamment le filesystem et `process`. `fetch` est fourni globalement par Node depuis la version 18 et existe dans les navigateurs ; ses règles de sécurité ne sont toutefois pas identiques. `globalThis` donne accès à l'objet global de l'environnement. Pour une détection simple dans les contextes ciblés, vérifie `typeof window` et `process.versions?.node` sans supposer que ces tests couvrent tous les runtimes JavaScript possibles.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Transfert : changer de contexte

Applique le mécanisme de « Node vs browser : même JS, deux planètes » à un traitement exécuté en environnement contraint ou interrompu. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:runtime -->

## Repère visuel utile : Service Kintana reproductible et arrêtable

```text
processus démarre
      |
      v
valider config / secrets
      |
  +---+---+
  v       v
ready   échec explicite
  |
  v
traiter requêtes
  | SIGTERM
  v
drain -> fermer ressources -> exit
```

<!-- AF-LESSON-PROFILE: runtime -->

## Repères de décision

- **Pourquoi :** Le runtime détermine les APIs disponibles, le cycle de vie, la configuration et les ressources. Confondre Node, navigateur et processus peut créer des bugs impossibles à reproduire.
- **Quand l’utiliser / quand l’éviter :** Choisis l'environnement selon les capacités requises. Déclare configuration, arrêt et signaux de santé ; ne suppose pas que toutes les APIs ou variables existent partout.
- **Limites :** Le même code ne se comporte pas toujours pareil selon version, OS, runtime et permissions. Une variable d'environnement ne remplace pas un gestionnaire de secrets.

## Mécanisme : la version sans magie

Déclare les prérequis, lit la configuration à un point contrôlé, valide au démarrage, expose un état de santé et ferme proprement les ressources.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Node vs browser : même JS, deux planètes** se rattache à ce cas concret : Le service Kintana doit démarrer avec une configuration explicite et s'arrêter sans perdre les traitements déjà acceptés.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Service Kintana reproductible et arrêtable

> **Arc Walking Dead :** le code ne vit pas dans le vide. Runtime, processus, fichiers et variables d'environnement sont le camp autour de lui.

**Mission liée à « Node vs browser : même JS, deux planètes » :** Ajoute un contrôle de configuration et un arrêt propre au composant Kintana concerné. Sépare les variables obligatoires/optionnelles, valide leur format et vérifie le comportement sous SIGTERM si le runtime le permet.

**Livrable :** module de configuration, validation au démarrage, health/readiness si service, smoke test et note des différences runtime.

**Critères d’acceptation :** les erreurs de configuration échouent tôt ; aucun secret n'est journalisé ; l'arrêt ferme les ressources ; les APIs Node et navigateur ne sont pas confondues.

**Transfert obligatoire :** Exécute dans un conteneur ou un environnement qui ne possède pas les mêmes variables et permissions. Documente le diagnostic exact.
