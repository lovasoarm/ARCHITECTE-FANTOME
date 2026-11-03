---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, defaut_cache]
anti_recipe_key: changement_contexte+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# State et dataflow : qui possède l'état, qui le lit, qui le modifie

Temps de lecture ~10 min

Le camp de Rick Grimes a un problème.
le sniper pense qu'il reste 3 jours de vivres. Carol pense qu'il en reste 7. Michonne a pas été informée.
Trois personnes, trois versions différentes de la même réalité.
C'est un problème de state management (gestion d'état).

En web, c'est pareil. L'état d'une app, c'est l'ensemble des données qui décrivent ce qu'elle affiche à un instant T.
Qui le possède, qui le lit, qui le modifie : si tu n'as pas de règles, t'as du chaos.

---

## 1) C'EST QUOI L'ÉTAT ?

L'état (state) : toutes les données dont dépend l'interface pour s'afficher.

```js
// L'état d'une app simple de gestion du camp
const state = {
  survivors: [
    { id: 1, name: "Rick", role: "leader", alive: true },
    { id: 2, name: "Glenn", role: "scout", alive: false },
  ],
  supplies: { food: 3, ammo: 50, fuel: 2 },
  selectedSurvivor: null, // aucun survivant sélectionné au départ
  isLoading: false, // pas de chargement en cours
  error: null, // pas d'erreur
};
```

Tout ce qui est dans `state` peut changer. Chaque changement doit mettre à jour l'interface.

---

## 2) LE PROBLÈME DU STATE DISPERSÉ

Sans discipline, l'état se disperse partout.

```js
// Version spaghetti : chaque fonction a son propre morceau d'état
let foodCount = 3; // dans un module
let survivors = []; // dans un autre module

function addSurvivor(name) {
  survivors.push({ name }); // mute (modifie) directement le tableau
  document.getElementById("count").textContent = survivors.length; // mise à jour DOM en dur
}

function removeFood(amount) {
  foodCount -= amount; // mute la variable globale
  document.getElementById("food").textContent = foodCount; // DOM en dur encore
}
```

Problème : `addSurvivor` et `removeFood` doivent peut-être parler ensemble (un survivant arrive = consomme de la nourriture). Mais elles ne se connaissent pas. Et aucune source de vérité (single source of truth) n'existe.

---

## 3) LE PATTERN SINGLE SOURCE OF TRUTH

Une règle fondamentale : une seule source de vérité pour chaque donnée.

```js
// State centralisé : toute l'app lit depuis là
const store = {
  state: {
    survivors: [],
    food: 3,
  },

  // Les getters (accesseurs) : lire l'état proprement
  getters: {
    aliveSurvivors() {
      return store.state.survivors.filter((s) => s.alive); // pas de mutation, juste lecture
    },
    foodPerSurvivor() {
      const alive = store.getters.aliveSurvivors().length;
      return alive > 0 ? store.state.food / alive : 0;
    },
  },

  // Les actions : les seuls endroits où l'état peut changer
  actions: {
    addSurvivor(name) {
      // Créer un nouvel objet : pas de mutation directe
      store.state.survivors = [
        ...store.state.survivors,
        { id: Date.now(), name, alive: true },
      ];
      store._notify(); // notifier tous les listeners que l'état a changé
    },

    consumeFood(amount) {
      store.state.food = Math.max(0, store.state.food - amount);
      store._notify();
    },
  },

  // Système de listeners pour réagir aux changements d'état
  _listeners: new Set(),
  subscribe(fn) {
    store._listeners.add(fn);
  },
  _notify() {
    store._listeners.forEach((fn) => fn(store.state));
  },
};

// Tout composant qui a besoin du state s'abonne
store.subscribe((state) => {
  document.getElementById("food").textContent = state.food;
  document.getElementById("count").textContent = state.survivors.length;
});

// Un seul endroit modifie l'état
store.actions.addSurvivor("le sniper");
store.actions.consumeFood(1);
```

---

## 4) UNIDIRECTIONAL DATAFLOW (FLUX DE DONNÉES UNIDIRECTIONNEL)

Le pattern le plus robuste : les données ne circulent que dans une direction.

```text
Action utilisateur
    |
    v
  [Action]
    |
    v
  [Store] (mise à jour de l'état)
    |
    v
  [Vue]  (re-rendu basé sur le nouvel état)
    |
    v
Action utilisateur (recommence)
```

Dans ce modèle, la vue ne modifie pas directement le store : elle émet une intention/action qui est traitée par le flux prévu. D'autres architectures existent, mais elles doivent rendre explicites ownership, mutation et synchronisation.
Ce pattern est à la base de Redux, Vuex, Zustand, et beaucoup d'autres libs.

```js
// Implémentation minimale du flux unidirectionnel
function createStore(initialState, reducer) {
  // reducer (réducteur) : fonction pure qui prend l'état actuel + une action, retourne le nouvel état
  let state = initialState;
  const listeners = new Set();

  return {
    getState() {
      return state;
    },

    // dispatch (envoyer) une action : le seul moyen de modifier l'état
    dispatch(action) {
      // Le reducer ne modifie jamais l'état en place : il en retourne un nouveau
      state = reducer(state, action);
      listeners.forEach((fn) => fn(state));
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn); // retourner la fonction de désabonnement
    },
  };
}

// Le reducer : logique pure, aucune mutation, aucun side effect
function campReducer(state, action) {
  switch (action.type) {
    case "ADD_SURVIVOR":
      return {
        ...state,
        survivors: [
          ...state.survivors,
          { id: Date.now(), name: action.payload, alive: true },
        ],
      };

    case "CONSUME_FOOD":
      return {
        ...state,
        food: Math.max(0, state.food - action.payload),
      };

    default:
      return state; // si l'action est inconnue, retourner l'état sans modification
  }
}

const store = createStore({ survivors: [], food: 5 }, campReducer);

// Abonnement pour mettre à jour l'UI
store.subscribe((state) => {
  console.log(
    `Camp : ${state.survivors.length} survivants, ${state.food} jours de vivres`,
  );
});

// Dispatch des actions
store.dispatch({ type: "ADD_SURVIVOR", payload: "Carol" });
store.dispatch({ type: "CONSUME_FOOD", payload: 1 });
// => Camp : 1 survivants, 4 jours de vivres
```

---

## 5) LES TYPES D'ÉTAT

Tout n'est pas le même type d'état. Les confondre est une source de bugs.

```text
Local state (état local)   => concerne un seul composant (input focus, modal open/close)
Shared state (partagé)    => plusieurs composants le lisent ou le modifient
Server state (serveur)    => données qui viennent d'une API, avec cache et sync
URL state (URL)        => ce qui est dans l'URL (params, query strings)
```

```js
// Local state : appartient au composant, ne sort pas
function Dropdown() {
  let isOpen = false; // état local : personne d'autre n'a besoin de savoir
  button.addEventListener("click", () => {
    isOpen = !isOpen;
    render();
  });
}

// Shared state : dans le store, plusieurs parties de l'app le lisent
// Exemple : l'user connecté (utilisé dans le header, les permissions, les requêtes)
store.state.currentUser = { id: 1, name: "Rick", role: "admin" };

// Server state : données en cache qui se synchronisent avec l'API
// React Query ou SWR gèrent ça en React. En vanilla : gérer manuellement
const cache = new Map();

async function getUser(id) {
  if (cache.has(id)) return cache.get(id); // servir depuis le cache d'abord
  const user = await fetch(`/api/users/${id}`).then((r) => r.json());
  cache.set(id, user);
  return user;
}

// URL state : synchroniser l'état avec l'URL
// Si on recharge la page, l'état doit être restauré depuis l'URL
const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get("page") || "1", 10);
const currentFilter = params.get("filter") || "all";
```

---

## 6) MUTATIONS ET IMMUTABILITÉ EN PRATIQUE

Muter l'état directement = bugs silencieux. Les composants ne savent pas que l'état a changé.

```js
// MAUVAIS : mutation directe
const state = { survivors: ["Rick", "le sniper"] };

function addSurvivor(name) {
  state.survivors.push(name); // MUTATION : push modifie le tableau en place
  // Si quelqu'un compare `oldState === newState` pour détecter un changement : c'est la même référence, le changement est invisible
}

// CORRECT : remplacer l'objet entier (ou la propriété) sans muter
function addSurvivor(state, name) {
  return {
    ...state, // copier toutes les propriétés de l'état précédent
    survivors: [...state.survivors, name], // nouveau tableau avec le survivant ajouté
  };
}

// Pour les objets imbriqués (nested) : copier jusqu'au niveau modifié
const oldState = {
  camp: {
    name: "Alexandria",
    supplies: { food: 5, ammo: 100 },
  },
};

// Modifier supplies.food sans muter
const newState = {
  ...oldState, // copier le niveau racine
  camp: {
    ...oldState.camp, // copier le niveau camp
    supplies: {
      ...oldState.camp.supplies, // copier supplies
      food: oldState.camp.supplies.food - 1, // modifier seulement food
    },
  },
};
```

---

## EXERCICES

**EXO 1 : Le state du camp en vrac**
Tu reçois une app avec 5 variables globales éparpillées (`let currentUser`, `let zombieCount`, etc.).
Centralise tout dans un store avec getters et actions.
Le store doit notifier un listener UI à chaque changement.

**EXO 2 : Implémenter un reducer pour Walking Dead**
Actions possibles : `SURVIVOR_JOINED`, `SURVIVOR_LOST`, `SUPPLY_CONSUMED`, `BASE_UPGRADED`.
Écris le reducer qui gère chacune de ces actions sans jamais muter l'état.
Teste chaque action avec `assert(newState !== oldState)`.

**EXO 3 : Synchroniser l'état avec l'URL**
Une page liste des survivants avec filtre (alive/dead) et pagination.
Quand le filtre ou la page change, l'URL doit se mettre à jour.
Quand on recharge, l'état doit être restauré depuis l'URL.
Utilise `URLSearchParams` et `history.pushState` (méthode pour modifier l'URL sans recharger la page).

---

## RÉSUMÉ

L'état c'est ce que l'app sait à un instant T. Tout l'affichage en dépend.
La règle n°1 : une seule source de vérité. Pas deux variables qui représentent la même donnée.
Le flux unidirectionnel : Action --> Store --> Vue. Jamais dans l'autre sens.
Ne jamais muter l'état directement : créer un nouvel objet avec les modifications. Sinon les changements sont invisibles.
Distinguer local state, shared state, server state et URL state : ce ne sont pas les mêmes problèmes.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Transfert : changer de contexte

Applique le mécanisme de « State et dataflow : qui possède l'état, qui le lit, qui le modifie » à un navigateur mobile avec réseau lent et session renouvelée. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:browser -->

## Repère visuel utile : Parcours web résilient et brouillon sûr

```text
formulaire -> brouillon local
    |
    v
réseau disponible ?
  | oui          | non
  v              v
API + clé       état en attente
  |              |
  v              +--> reprise au retour
confirmation
  |
  v
statut affiché
```

<!-- AF-LESSON-PROFILE: browser -->

## Repères de décision

- **Pourquoi :** Le navigateur est un environnement distinct du serveur : DOM, réseau, stockage local et cycle de vie utilisateur imposent des états et des erreurs spécifiques.
- **Quand l’utiliser / quand l’éviter :** Utilise ces mécanismes pour rendre le parcours web compréhensible, résilient et accessible. Ne stocke rien de sensible dans le navigateur et ne suppose jamais que le réseau est disponible.
- **Limites :** Le client ne fait pas autorité pour les droits, les montants ou l'état métier. Le stockage local peut être effacé, altéré ou partagé sur un appareil ; la synchronisation peut produire des conflits.

## Mécanisme : la version sans magie

Modélise les états visibles, annule les requêtes devenues inutiles, traite les réponses réseau comme non fiables et synchronise les brouillons avec un identifiant stable.

## Ancrage produit / terrain : Kintana

Dans le [cas d’étude Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), Le brouillon du demandeur, l’envoi réseau et la demande enregistrée sont trois états différents. Il faut savoir qui possède chaque donnée et quelle transition est autorisée quand une action réussit, échoue ou reste incertaine.

**Niveau de preuve :** Kintana est un scénario fictif. Étiquette le résultat `CONCEPT`, `LAB` ou `SIMULATION` selon le travail réellement effectué ; une fixture synthétique n’est pas une observation de terrain.

## Mission utile : Kintana : Étape 4/8 : modéliser l’état et son propriétaire

> **Arc One Piece / Grand Line :** Trois personnes qui portent trois versions de la même demande créent le chaos : choisis une source de vérité et rends chaque transition visible.

À partir du contrat HTTP de l’étape 2, construis la machine d’états du brouillon et de la demande : `draft`, `submitting`, `pending_confirmation`, `submitted`, `error` et `offline` si ces états sont pertinents. Sépare état local, état de requête et état métier serveur.

**Livrable :** Un diagramme de transitions, un tableau propriétaire/lecteur/modificateur pour chaque donnée, et les événements qui provoquent les changements.

**Critères d’acceptation :** Une donnée a un propriétaire clairement identifié ; une réponse tardive ne réécrit pas un état plus récent ; un timeout n’est pas assimilé à un rejet ni à une confirmation.

**Transfert obligatoire :** Le demandeur ferme l’écran puis reçoit une ancienne réponse réseau : explique comment éviter qu’elle écrase un état plus récent.

Cette étape prolonge le même artefact Kintana ; elle ne demande pas de recommencer le projet et n’ajoute pas de gate au parcours.
