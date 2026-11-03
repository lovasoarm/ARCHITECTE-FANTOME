---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Singleton pattern

Temps de lecture ~11 min

Dans Breaking Bad, il n'y a qu'un seul cook qui dirige le labo à la fois.
Deux Walter White qui décident en même temps : c'est la catastrophe, deux lots incompatibles, deux stocks en conflit.
Une instance partagée dans un périmètre défini. Une seule source de vérité locale. C'est l'idée du Singleton.

Cette implémentation cherche à partager une instance dans un périmètre défini. Elle ne garantit pas une instance universelle : la portée dépend du module, du chargeur, du runtime et du processus. Une autre copie du module, un worker ou un autre processus peut avoir son propre état.

Cas d'usage légitimes : config globale d'une app, connexion DB partagée, logger centralisé, état partagé de cache.
Cas dangereux : tout le reste. Le Singleton est souvent le premier pas vers le God Object.

---

## 1) LE PROBLÈME QUE SINGLETON RÉSOUT

Certaines ressources doivent exister en un seul exemplaire dans tout le processus.

```js
// sans singleton : deux connexions DB différentes, deux états différents
const db1 = new DatabaseConnection({ host: "localhost", db: "foxriver" });
const db2 = new DatabaseConnection({ host: "localhost", db: "foxriver" });

// db1 et db2 sont deux objets distincts
// si db1 ouvre une transaction, db2 ne le sait pas
// résultat : états incohérents, fuites de connexions, chaos

console.log(db1 === db2); // false:catastrophe
```

Le Singleton fixe ça : une seule connexion, partagée par tout le code qui en a besoin.

---

## 2) IMPLÉMENTATION CLASSIQUE

```js
class LabManager {
  constructor(cook, location) {
    // si une instance existe déjà, on la retourne directement
    if (LabManager._instance) {
      return LabManager._instance;
    }

    // première instanciation : on construit vraiment
    this.cook = cook;
    this.location = location;
    this.batches = [];
    this.status = "operational";

    // on stocke la référence sur la classe elle-même
    LabManager._instance = this;
  }

  addBatch(purity, quantity) {
    this.batches.push({ purity, quantity, timestamp: Date.now() });
    console.log(`Nouveau lot : ${purity}% : ${quantity}kg`);
  }

  getStatus() {
    return `${this.cook} @ ${this.location} : ${this.batches.length} lots jutsus`;
  }

  // réinitialiser l'instance (utile en test uniquement)
  static reset() {
    LabManager._instance = null;
  }
}

const lab1 = new LabManager("Walter White", "Superlab");
const lab2 = new LabManager("Gustavo", "Autre endroit"); // ignoré : instance déjà là

console.log(lab1 === lab2); // true : même objet
console.log(lab2.cook); // "Walter White" : le second new n'a rien écrasé

lab1.addBatch(99.1, 50);
console.log(lab2.getStatus()); // voit aussi le lot ajouté via lab1
// "Walter White @ Superlab : 1 lots jutsus"
```

```text
new LabManager()  --> _instance null ?
              |
          oui : on crée, on stocke
              |
          non : on retourne l'existante

new LabManager()  --> _instance existe ?
              |
          oui : on retourne la même
              |
          (le new est ignoré silencieusement)
```

---

## 3) SINGLETON AVEC MODULE

En JS moderne, le module pattern donne un Singleton naturel : un module est chargé une seule fois, son état persiste pour toute la durée du processus.

```js
// config.js:chargé une seule fois par le runtime Node
// tous les imports de ce fichier reçoivent le même objet

let _initialized = false;
let _config = {};

function init(overrides = {}) {
  if (_initialized) {
    // deuxième init : on refuse, on ne silencieuse pas
    throw new Error(
      "Config déjà initialisée : appeler init() deux fois c'est suspect",
    );
  }

  _config = {
    env: process.env.NODE_ENV || "development",
    logLevel: process.env.LOG_LEVEL || "info",
    dbHost: process.env.DB_HOST || "localhost",
    ...overrides,
  };

  _initialized = true;
  console.log(`Config initialisée pour l'env : ${_config.env}`);
}

function get(key) {
  if (!_initialized) {
    throw new Error(`Config non initialisée. Appelle init() d'abord.`);
  }
  return _config[key];
}

function getAll() {
  return { ..._config }; // copie : personne ne modifie l'interne
}

export { init, get, getAll };
```

```js
// main.js
import { init, get } from "./config.js";

init({ env: "production", logLevel: "warn" });
console.log(get("env")); // "production"

// ailleurs dans le code
import { get } from "./config.js";
console.log(get("env")); // toujours "production" : même module, même état
```

C'est la forme la plus propre de Singleton en JS.
Pas de classe. Pas de `_instance`. Juste le système de modules qui fait le boulot.

---

## 4) SINGLETON EN PRATIQUE : LE LOGGER

Cet exemple garde volontairement un historique de démonstration, borné aux 1 000 dernières entrées. Un logger de production doit généralement déléguer les sorties à un collecteur adapté plutôt que conserver indéfiniment chaque événement en mémoire.

```js
// logger.js:un seul logger pour toute l'app
const levels = { debug: 0, info: 1, warn: 2, error: 3 };

let _level = "info";
let _history = [];
const MAX_HISTORY = 1000; // borne pédagogique pour ne pas conserver un historique sans limite

const logger = {
  setLevel(lvl) {
    if (!Object.prototype.hasOwnProperty.call(levels, lvl)) {
      throw new Error(`Niveau inconnu : ${lvl}`);
    }
    _level = lvl;
  },

  log(level, message, context = {}) {
    if (!Object.prototype.hasOwnProperty.call(levels, level)) {
      throw new Error(`Niveau inconnu : ${level}`);
    }
    if (levels[level] < levels[_level]) return; // filtré selon le niveau actuel
    if (
      context === null ||
      typeof context !== "object" ||
      Array.isArray(context)
    ) {
      throw new TypeError("context doit être un objet non-null et non-tableau");
    }

    const entry = {
      ...context, // les champs fournis ne peuvent pas écraser les métadonnées réservées
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    _history.push(entry);
    if (_history.length > MAX_HISTORY) _history.shift(); // garde uniquement les 1 000 événements les plus récents
    console.log(JSON.stringify(entry));
  },

  debug: (msg, ctx) => logger.log("debug", msg, ctx),
  info: (msg, ctx) => logger.log("info", msg, ctx),
  warn: (msg, ctx) => logger.log("warn", msg, ctx),
  error: (msg, ctx) => logger.log("error", msg, ctx),

  getHistory: () => [..._history], // copie défensive des 1 000 événements les plus récents
  clear: () => {
    _history = [];
  }, // pour les tests
};

// on exporte l'objet directement : c'est le singleton
export default logger;
```

```js
// n'importe où dans l'app
import logger from "./logger.js";

logger.info("Connexion DB établie", { host: "localhost" });
logger.warn("Rate limit atteint", { endpoint: "/api/vote" });

// dans un autre fichier, même import et même historique récent dans ce contexte
import logger from "./logger.js";
logger.getHistory(); // contient les deux entrées précédentes
```

---

## 5) CAS QUI CASSE : LES DANGERS DU SINGLETON

### Problème 1 : couplage global caché

```js
// n'importe quelle fonction peut accéder et modifier le state global
import missionState from "./missionState.js"; // singleton

function terminerMission(id) {
  // cette fonction modifie le state global sans que l'appelant le sache
  missionState.set("derniereMission", id);
  missionState.set("rapportEnAttente", true);
  // et si une autre fonction lit missionState.rapportEnAttente au mauvais moment ?
}
```

Le Singleton crée des effets de bord invisibles.
Les fonctions semblent indépendantes : elles ne le sont pas.

### Problème 2 : tests qui s'interfèrent

```js
// test A modifie le singleton
import config from "./config.js";
config.set("env", "test-a");

// test B lit le singleton modifié par A
// si les tests tournent dans le même processus : test B voit l'état de test A
import config from "./config.js";
console.log(config.get("env")); // "test-a":bug de test non obvious
```

C'est pour ça que chaque Singleton sérieux expose une méthode `reset()` pour les tests.
Et c'est pour ça que beaucoup de gens préfèrent l'injection de dépendances.

### Problème 3 : parallélisme (dans les workers)

```js
// en Node avec Worker Threads : chaque worker a son propre module scope
// ton "singleton" n'est pas partagé entre workers
// si tu comptes sur le singleton pour synchroniser des workers : erreur d'architecture
```

Un Singleton ne traverse pas les Workers. Si tu en as besoin : utilise une DB, un cache Redis, ou un message bus.

---

## 6) SINGLETON VS INJECTION DE DÉPENDANCES

Le Singleton est souvent le premier réflexe. L'injection de dépendances est souvent la meilleure décision.

```js
// singleton : couplage fort, difficile à tester
class PlayerService {
  getTopScorer() {
    // dbConnection est global, impossible à remplacer en test
    return dbConnection.query(
      "SELECT * FROM players ORDER BY goals DESC LIMIT 1",
    );
  }
}

// injection : découplé, testable, flexible
class PlayerService {
  constructor(db) {
    this.db = db; // injecté : peut être le vrai ou un mock
  }

  getTopScorer() {
    return this.db.query("SELECT * FROM players ORDER BY goals DESC LIMIT 1");
  }
}

// en prod : vrai DB
const service = new PlayerService(realDb);

// en test : mock DB
const service = new PlayerService({
  query: () => [{ name: "Mbappé", goals: 32 }],
});
```

Règle : si le Singleton est utilisé dans du code qui doit être testé, préfère l'injection.
Le Singleton convient quand la ressource est vraiment unique et globale par nature : config, logger, connexion unique à une ressource externe.

---

## EXERCICES

## EXO 1 : LE CAMP DE RICK GRIMES

Le camp des survivants dans The Walking Dead a un seul `CampManager`.
Il gère l'inventaire global, le nombre de survivants, le niveau d'alerte (0 à 5).

Crée ce Singleton avec :

- `addSurvivor(name)` : ajoute un survivant
- `removeSupply(item, quantity)` : retire une quantité d'un item de l'inventaire (throw si stock insuffisant)
- `setAlertLevel(level)` : 0 à 5 uniquement (throw sinon)
- `getReport()` : retourne un objet avec survivants, inventaire, niveau d'alerte
- `static reset()` : pour les tests

Crée deux variables `camp1` et `camp2` depuis `new CampManager()`.
Prouve que `camp1 === camp2`.
Montre que modifier via `camp1` est visible via `camp2`.

---

## EXO 2 : LA CONFIG DE PRISON BREAK

Michael Scofield n'initialise le plan d'évasion qu'une seule fois.
Après ça, tous les détenus qui consultent le plan voient la même version.

Crée un module `escapePlan.js` (Singleton module pattern) avec :

- `init(prisonName, cellBlock, totalPhases)` : initialise le plan (throw si déjà initialisé)
- `addPhase(description, responsible)` : ajoute une phase au plan
- `completePhase(index)` : marque une phase comme complétée
- `getProgress()` : retourne le nombre de phases complétées vs total
- `reset()` : pour les tests uniquement

Simule trois fichiers différents qui importent `escapePlan.js` et interagissent avec le même état.

---

## EXO 3 : LE DANGER DU GLOBAL

Voici un Singleton de cache partagé :

```js
const cache = {
  _data: {},
  set(key, value) {
    this._data[key] = value;
  },
  get(key) {
    return this._data[key];
  },
};
export default cache;
```

Identifie deux problèmes concrets que ce cache peut causer dans une app multi-fonctions.
Réécris-le en version défensive : TTL par entrée, getter qui retourne `null` si expiré, méthode `clear()` pour les tests.

---

## EXO 4 : SINGLETON OU INJECTION ?

Pour chacun des cas suivants, décide si un Singleton est adapté ou si l'injection de dépendances est préférable. Justifie en une phrase :

1. Logger JSON qui écrit dans `stdout` : tous les modules l'utilisent
2. Connexion WebSocket vers un serveur de match en temps réel
3. Service qui envoie des emails : utilisé dans 3 controllers différents
4. Config d'environnement lue depuis `process.env` au démarrage
5. Compteur de votes du Ballon d'Or partagé entre plusieurs routes Express

---

## RÉSUMÉ

Dans cette forme, le module partage un objet unique pour les importateurs qui utilisent la même instance du module dans le même contexte de chargement.
En JS, la forme la plus propre c'est le module pattern : un fichier exporté = un singleton naturel.
Les cas légitimes sont rares et précis : config, logger, connexion unique à une ressource externe.
Les dangers sont réels : couplage global caché, tests qui s'interfèrent, parallélisme qui casse.
Dès que le Singleton est utilisé dans du code métier testable : c'est probablement le mauvais choix. L'injection de dépendances est plus solide, plus flexible, et plus honnête sur ce que le code consomme.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Transfert production : singleton, processus et tests

Un singleton garantit au mieux une instance dans un périmètre d'exécution donné. Il ne garantit pas une instance unique entre plusieurs processus, conteneurs ou régions. Il peut aussi cacher un état global et rendre les tests dépendants de l'ordre d'exécution.

**Exercice.** Compare un client de configuration global et un client injecté dans deux cas d'usage. Lance deux tests concurrents avec configurations différentes et observe si l'état fuit d'un test à l'autre.

**Vérification.** Les tests doivent pouvoir créer deux contextes indépendants sans reset global fragile. Documente la portée réelle (module/processus/runtime) et l'impact du hot reload ou des workers.

**Transfert.** En production, préfère souvent un cycle de vie explicite (singleton scoped au processus, pool, ou injection) plutôt qu'un `getInstance()` global. Un pool de connexions est un singleton de ressources à portée limitée, pas une instance universelle distribuée.

<!-- AF-LESSON-PROFILE: patterns -->

## Repères de décision

- **Pourquoi :** Un pattern donne un vocabulaire et une structure à un problème récurrent ; mal choisi, il ajoute indirection et coût de maintenance.
- **Quand l’utiliser / quand l’éviter :** Utilise un pattern quand le problème se répète et qu'il clarifie les variations. Préfère la solution directe tant que tu n'as pas deux comportements réellement différents.
- **Limites :** Un pattern ne garantit ni extensibilité ni qualité. Un mauvais niveau d'abstraction peut rendre le flux plus difficile à comprendre que le code initial.

## Mécanisme : la version sans magie

Identifie la variation, les responsabilités et les dépendances ; compare une solution simple à une solution structurée ; mesure l'effet sur test et changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Singleton pattern** se rattache à ce cas concret : Kintana peut avoir plusieurs canaux de notification ou politiques de dispatch. Le pattern ne doit apparaître que si ces variantes existent vraiment.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Évaluer un pattern sur un besoin réel

> **Arc Capsule Corp. / DBZ :** un design pattern est un outil, pas une transformation magique. S'il ajoute plus de pièces qu'il ne résout de problèmes, laisse-le dans le coffre.

**Mission liée à « Singleton pattern » :** Applique la notion à une variation Kintana : canal de notification, stratégie d'affectation ou fournisseur. Écris d'abord une version simple, puis une alternative avec le pattern ; compare lisibilité, testabilité et coût d'ajout d'une seconde variante.

**Livrable :** deux implémentations ou un ADR argumenté, tests de comportement commun et note de suppression si le pattern n'apporte rien.

**Critères d’acceptation :** la variation est démontrée ; l'interface n'expose que le contrat utile ; les tests vérifient les comportements et non les classes internes ; le coût de complexité est déclaré.

**Transfert obligatoire :** Supprime la deuxième variante. Décide si le pattern doit rester ou être retiré, et explique pourquoi.
