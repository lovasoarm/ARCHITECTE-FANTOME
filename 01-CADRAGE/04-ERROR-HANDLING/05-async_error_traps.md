---
perishability_id: PER-0008
stability: perissable
acte: comprendre
cognitive_level: L3
perturbation_modes:
  - defaut_cache
  - regression
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://nodejs.org/docs/v22.23.4/api/process.html#event-unhandledrejection
source_type: primary
review_interval: 6 mois
review_due: "2027-05-03"
source_scope: >-
  Documentation officielle versionnée Node.js 22.23.4 sur `process` et
  `unhandledRejection`. La portée confirmée concerne les noms et le comportement
  documenté des événements Node.js ; les effets du processus et les commandes
  doivent rester liés à la version indiquée. La leçon comprend aussi des passages
  sur `fetch`, CORS et les statuts HTTP : MDN documente le comportement de `fetch`
  et CORS côté navigateur ; Undici documente l'absence de contrôles CORS navigateur
  par défaut. La vérification est limitée aux affirmations corrigées sur
  `fetch`/CORS et les statuts HTTP ; les autres mécanismes asynchrones de la leçon
  ne sont pas entièrement revus.
provenance_note: >-
  V6.4, 2026-11-03 : revue de référence réalisée à partir de Node.js 22.23.4,
  MDN et Undici. Le statut « verified_reference » est limité au périmètre indiqué ;
  il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue
  experte indépendante. Le reste de la leçon n’a pas fait l’objet d’une revue
  exhaustive affirmation par affirmation. Pour les informations volatiles,
  reconsulter la source à l'échéance ou avant toute décision.
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "VERSIONED_NODE_PROCESS_EVENT_REFERENCE_CONFIRMED_2026-11-03"
additional_sources:
  - https://nodejs.org/docs/v22.23.4/api/cli.html#--unhandled-rejectionsmode
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
  - https://github.com/nodejs/undici#cors
  - https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# Async error traps : les erreurs qui tombent en silence

Temps de lecture ~6 min

En synchrone, une erreur non catchée crash le programme immédiatement. Tu vois le problème.

En async, une erreur non traitée peut être signalée tardivement ou faire terminer le processus : le résultat dépend du runtime et de sa configuration. Dans Node.js, le comportement par défaut actuel est de traiter un rejet non géré comme une exception non interceptée. Le code appelant doit donc récupérer ou transmettre l’erreur explicitement.

C'est ça le vrai danger de l'async.

---

## 1) LE PIÈGE CLASSIQUE : PROMISE NON CATCHÉE

```js
// ce code "fonctionne":il ne crash pas
function chargerStatsMatch(id) {
  fetch(`/api/matchs/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("stats reçues :", data);
    });
  // pas de .catch()
  // si fetch échoue : l'erreur disparaît en silence
}

chargerStatsMatch(99999); // ID inexistant
// la Promise rejette
// personne ne l'attrape
// Node émet un warning "UnhandledPromiseRejection"
// depuis Node.js 15, le mode par défaut est --unhandled-rejections=throw
// sans gestionnaire unhandledRejection, le rejet devient une exception non interceptée
// et le processus se termine normalement avec un code de sortie non nul
// le flag --unhandled-rejections ou un gestionnaire peut modifier ce comportement
```

```text
call stack :
 chargerStatsMatch() --> fetch() --> Promise rejetée
 ...
 la fonction est déjà terminée
 personne pour attraper la Promise rejetée
 --> UnhandledPromiseRejection
```

---

## 2) TRY/CATCH AVEC ASYNC/AWAIT

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

La syntaxe qui rend l'async lisible : et qui récupère les erreurs naturellement.

```js
async function chargerStatsMatch(id) {
  try {
    const res = await fetch(`/api/matchs/${id}`);
    if (!res.ok) {
      throw new NotFoundError("Match", id);
      // fetch ne lève pas d'erreur sur les 404:tu dois le faire toi-même
    }
    const data = await res.json();
    return data;
  } catch (e) {
    if (e instanceof NotFoundError) {
      console.log(`Match ${id} introuvable`);
      return null;
    }
    // erreur réseau ou autre
    throw e;
  }
}
```

Attention : distingue le runtime.

- **Dans un navigateur**, `fetch` applique la politique CORS. Une réponse cross-origin qui ne satisfait pas cette politique n'est pas exposée au JavaScript et la requête échoue comme une erreur réseau.
- **Dans Node.js 22**, le `fetch` natif s'appuie sur Undici, qui n'applique pas par défaut les contrôles CORS du navigateur : il n'envoie pas automatiquement de préflight CORS et ne valide pas `Access-Control-Allow-Origin`. Cela ne rend pas un fetch serveur sûr pour autant : valide les destinations autorisées et protège-toi notamment contre les requêtes SSRF.
- **Dans les deux environnements**, un statut HTTP 404 ou 500 ne rejette pas automatiquement la Promise. Vérifie `res.ok` et transforme les statuts non réussis en erreurs adaptées au contrat de ton application.

---

## 3) LE PIÈGE DU FOREACH ASYNC

```js
const matchIds = [1, 2, 3, 4, 5];

// MAUVAIS:le forEach n'attend pas les Promises
matchIds.forEach(async (id) => {
  const stats = await chargerStats(id); // retourne une Promise
  console.log(stats);
  // si ça throw ici : l'erreur est dans une Promise que forEach ignore
});

console.log("terminé");
// s'affiche AVANT les stats:forEach n'attend pas
// les erreurs dans les callbacks async : perdues
```

```js
// BON:for...of attend vraiment chaque itération
async function traiterTousLesMatchs(ids) {
  for (const id of ids) {
    try {
      const stats = await chargerStats(id);
      console.log(stats);
    } catch (e) {
      console.error(`Erreur match ${id} :`, e.message);
      // on continue avec les autres
    }
  }
}
```

```js
// BON:Promise.all pour les traitements en parallèle
async function traiterEnParallele(ids) {
  const resultats = await Promise.all(
    ids.map(async (id) => {
      try {
        return await chargerStats(id);
      } catch (e) {
        return { erreur: e.message, id };
        // chaque résultat est soit les stats soit l'erreur wrappée
      }
    }),
  );
  return resultats;
}
```

---

## 4) PROMISE.ALL : UN ÉCHEC COULE TOUT

```js
// Promise.all rejette dès qu'une seule Promise rejette
const [statsA, statsB, statsC] = await Promise.all([
  chargerStats(1), // ok
  chargerStats(999), // rejette
  chargerStats(3), // ok, mais jamais utilisé
]);
// si chargerStats(999) rejette :
// Promise.all ne renvoie aucun tableau de résultats si l’une des Promises rejette
// les autres opérations ne sont pas annulées : elles peuvent continuer leurs effets
// si tu dois connaître chaque issue, utilise Promise.allSettled
```

```js
// Promise.allSettled:chaque résultat individuellement
const resultats = await Promise.allSettled([
  chargerStats(1),
  chargerStats(999),
  chargerStats(3),
]);

resultats.forEach((r, i) => {
  if (r.status === "fulfilled") {
    console.log(`Match ${i + 1} :`, r.value);
  } else {
    console.error(`Match ${i + 1} a échoué :`, r.reason.message);
  }
});
// les trois résultats, succès ou échec, tous disponibles
```

Règle : tu veux que tout réussisse ou rien → `Promise.all`. Tu veux traiter chaque résultat indépendamment → `Promise.allSettled`.

---

## 5) LE PIÈGE DU EVENT EMITTER ASYNC

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("data", async (payload) => {
  // ce handler est async
  const result = await traiterPayload(payload);
  // si traiterPayload rejette :
  // la Promise retournée par le handler est perdue dans le vide
  // EventEmitter ne la surveille pas
});

emitter.emit("data", { matchId: 42 });
// les erreurs async dans les handlers EventEmitter : non catchées par défaut
```

Solution :

```js
emitter.on("data", async (payload) => {
  try {
    const result = await traiterPayload(payload);
    console.log(result);
  } catch (e) {
    emitter.emit("error", e); // déléguer au handler d'erreur de l'emitter
  }
});

emitter.on("error", (e) => {
  console.error("erreur dans le pipeline :", e.message);
});
```

---

## 6) TOP-LEVEL AWAIT ET GESTION D'ERREURS

Dans les modules ES (`type: "module"` ou `.mjs`), tu peux `await` au niveau module. Ce qui veut dire : les erreurs non catchées au top level crash le module entier.

```js
// index.mjs
const config = await chargerConfig();
// si chargerConfig() rejette et qu'il n'y a pas de try/catch
// le module entier échoue au chargement

// version solide
try {
  const config = await chargerConfig();
  demarrerApp(config);
} catch (e) {
  console.error("Impossible de charger la config :", e.message);
  process.exit(1); // crash propre avec message clair
}
```

---

## 7) PATTERN : RESULT TYPE POUR ÉVITER LES THROWS

Inspiré de Rust. Au lieu de throw, tu retournes un objet `{ ok, valeur, erreur }`.

```js
async function chargerStatsSafe(matchId) {
  try {
    const data = await chargerStats(matchId);
    return { ok: true, valeur: data };
  } catch (e) {
    return { ok: false, erreur: e };
  }
}

// utilisation:zéro throw, zéro try/catch à l'extérieur
const result = await chargerStatsSafe(42);

if (!result.ok) {
  console.error("stats indisponibles :", result.erreur.message);
  return;
}

console.log("xG :", result.valeur.xG);
```

Avantage : le code appelant n'a pas à se soucier des try/catch. L'erreur est une valeur normale.

Inconvénient : si tu oublies de vérifier `result.ok`, tu utilises `result.valeur` qui est `undefined`. Fais-le seulement si l'API est interne et contrôlée.

---

## 8) RÉSUMÉ DES PIÈGES EN TABLEAU

```text
forEach + async    --> erreurs perdues      --> utiliser for...of
Promise.all      --> un échec coule tout    --> utiliser Promise.allSettled si besoin
fetch sur 404/500   --> pas d'exception native   --> tester res.ok manuellement
EventEmitter async  --> erreurs perdues      --> wrapping try/catch + emit("error")
top-level await    --> crash module entier    --> try/catch au top level
setTimeout callback  --> hors du try/catch externe --> try/catch dans le callback
```

---

## EXERCICES

## EXO 1 : LE FOREACH QUI TRAHIT

Ce code a un bug silencieux. Identifie-le et corrige-le :

```js
const joueurIds = [7, 10, 11, 99999, 9];

joueurIds.forEach(async (id) => {
  const joueur = await fetchJoueur(id); // peut rejeter sur 99999
  console.log(joueur.nom);
});
```

Corrige pour que les erreurs soient loggées et que le traitement continue pour les autres IDs.

---

## EXO 2 : LE TOURNAMENT PROCESSOR

Tu as 5 matchs à charger. Certains peuvent échouer (API instable pendant le tournoi).

Utilise `Promise.allSettled` pour charger tous les matchs en parallèle et retourner :

- la liste des matchs réussis
- la liste des IDs qui ont échoué avec leur message d'erreur

---

## EXO 3 : SAFE WRAPPER

Écris une fonction générique `safeAsync(fn, ...args)` qui :

- exécute `fn(...args)` dans un try/catch
- retourne `{ ok: true, valeur }` ou `{ ok: false, erreur }`

Utilise-la pour wrapper `chargerStats` et teste avec un match existant et un inexistant.

---

## RÉSUMÉ

En async, une erreur n’est pas automatiquement récupérée par le code appelant. Selon le runtime et sa configuration, un rejet non géré peut être journalisé, transmis à un gestionnaire ou terminer le processus. Dans tous les cas, traite-le explicitement au plus près de l’opération.

`forEach` avec `async` : les erreurs sont perdues. Utilise `for...of` ou `Promise.allSettled`.

`fetch` ne rejette pas automatiquement sur les 404/500 : teste `res.ok`. Les règles CORS s'appliquent dans le navigateur ; le `fetch` natif Node/Undici ne les applique pas par défaut.

Les EventEmitters ne gèrent pas les erreurs async de leurs handlers. Wrap systématiquement.

Dans Node.js, le mode par défaut `--unhandled-rejections=throw` transforme un rejet non géré en exception non interceptée lorsqu’aucun gestionnaire `unhandledRejection` ne le prend en charge. Ne compte pas sur ce comportement comme stratégie de gestion d’erreurs : récupère ou propage les rejets explicitement.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une politique d'erreur explicite empêche un échec temporaire de devenir une boucle infinie et évite de cacher un défaut métier derrière un message vague.
- **Quand l’utiliser / quand l’éviter :** Classe l'erreur selon sa cause et sa récupérabilité. Retry uniquement les erreurs transitoires et les opérations idempotentes ; remonte les violations métier et sécurité sans boucle automatique.
- **Limites :** Un `catch` trop large masque la cause. Un retry peut amplifier une panne et doubler un effet ; une erreur personnalisée ne rend pas un message sûr à exposer au client.

## Mécanisme : la version sans magie

Capture au niveau qui peut décider, enrichis avec le contexte utile, transforme en contrat stable et préserve la cause originale pour le diagnostic.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Async error traps : les erreurs qui tombent en silence** se rattache à ce cas concret : La création de demande Kintana doit distinguer validation, refus d'accès, conflit d'idempotence, timeout fournisseur et panne de base.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'erreur stable pour l'API Kintana

> **Arc Walking Dead :** une erreur n'est pas toujours un zombie à abattre. Certaines se récupèrent ; d'autres doivent arrêter la mission immédiatement.

**Mission liée à « Async error traps : les erreurs qui tombent en silence » :** Définis les erreurs du parcours de création de demande. Ajoute une conversion stable vers les réponses API, une politique retry par classe et des tests qui vérifient qu'un secret ou une pile interne ne fuit pas.

**Livrable :** un catalogue d'erreurs, un mapper HTTP, des tests de contrat et une table de décision retry/no-retry.

**Critères d’acceptation :** les erreurs métier, techniques et de sécurité sont séparées ; les causes sont conservées côté serveur ; aucun retry n'est fait sur opération non idempotente sans clé ; les réponses client restent stables.

**Transfert obligatoire :** Ajoute une panne fournisseur qui récupère après deux tentatives et compare le comportement avec une validation refusée.

## Référence runtime à vérifier

Le comportement décrit ici correspond au mode par défaut de Node.js **22.23.4**, version épinglée par cette édition. Le flag `--unhandled-rejections` et l’événement `unhandledRejection` sont documentés dans la [référence `process` de Node.js 22.23.4](https://nodejs.org/docs/v22.23.4/api/process.html#event-unhandledrejection) et la [référence CLI de Node.js 22.23.4](https://nodejs.org/docs/v22.23.4/api/cli.html#--unhandled-rejectionsmode). Une option de lancement ou un gestionnaire installé par l’application peut changer le comportement observé.
