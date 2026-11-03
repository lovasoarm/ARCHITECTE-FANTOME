---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Attack on Titan :** une formation militaire n’est pas un uniforme. Un pattern n’est pas une décoration. Il n’a de valeur que lorsqu’il résout la contrainte pour laquelle il existe.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Decorator : ajouter du comportement sans toucher à la source

Temps de lecture ~9 min

Tu as une fonction qui marche. Elle fait exactement ce qu'elle doit faire.
Et là tu reçois un ticket : "ajoute du logging". Puis un autre : "ajoute du caching". Puis un autre : "ajoute de la validation".

Solution naïve : tu modifies la fonction originale. Trois fois. Elle grossit. Elle fait cinq choses. Elle est fragilisée.

Solution Decorator : tu _enveloppes_ la fonction. Tu ne la touches pas. Tu ajoutes le comportement par-dessus, comme une armure sur un ninja.

En prod, Decorator est partout : middleware Express, `@Injectable` Angular, `React.memo`, `withRouter`, les HOC en général. Chaque fois qu'on wrape quelque chose sans toucher au core : c'est un Decorator.

---

## 1) LE PROBLÈME QUE LE DECORATOR RÉSOUT

Sans Decorator, quand tu veux ajouter du comportement :

```js
// la fonction originale
function getPlayerStats(playerId) {
  return fetch(`/api/players/${playerId}`);
}

// version "modifiée pour tout faire" :
// logging + cache + retry + auth check
// cette fonction fait maintenant 4 choses
// et si le cache bugue, tu retestes tout
function getPlayerStats(playerId) {
  console.log(`[LOG] fetching ${playerId}`); // responsabilité 1
  if (cache.has(playerId)) return cache.get(playerId); // responsabilité 2
  const result = fetch(`/api/players/${playerId}`); // responsabilité 3
  cache.set(playerId, result); // responsabilité 2 bis
  return result;
}
```

C'est le God Function : une fonction qui sait tout faire, donc qui peut tout casser.

---

## 2) LE DECORATOR EN JS : LA VERSION FONCTIONNELLE

Le principe : une fonction qui prend une fonction et retourne une fonction augmentée.

```js
// on ne touche pas à getPlayerStats
// on crée un wrapper qui ajoute juste le logging
function withLogging(fn) {
  return function (...args) {
    // En production, masque les secrets et données personnelles avant de logger.
    console.log(`[LOG] calling ${fn.name} with`, args);

    let result;
    try {
      result = fn(...args);
    } catch (error) {
      console.error(`[LOG] ${fn.name} failed`, error);
      throw error;
    }

    // Un wrapper doit journaliser la valeur résolue, pas l'objet Promise.
    if (result && typeof result.then === "function") {
      return result.then(
        (value) => {
          console.log(`[LOG] ${fn.name} resolved`, value);
          return value;
        },
        (error) => {
          console.error(`[LOG] ${fn.name} rejected`, error);
          throw error;
        },
      );
    }

    console.log(`[LOG] ${fn.name} returned`, result);
    return result;
  };
}

// usage : on décore, on ne modifie pas
const getPlayerStats = (playerId) => fetch(`/api/players/${playerId}`);
const loggedGetPlayerStats = withLogging(getPlayerStats);

// getPlayerStats est intact
// loggedGetPlayerStats fait la même chose + le logging
```

---

## 3) STACKER LES DECORATORS

L'intérêt : chaque Decorator fait une seule chose. On les compose.

```js
// Decorator 1 : logging
function withLogging(fn) {
  return function (...args) {
    console.log(`[LOG] ${fn.name}(${args})`);
    return fn(...args);
  };
}

// Decorator 2 : cache simple
function withCache(fn) {
  if (typeof fn !== "function")
    throw new TypeError("fn doit être une fonction");
  const cache = new Map();
  let modeRetour = null; // contrat stable : "sync" ou "async" pour cette fonction décorée
  return function (...args) {
    // Démonstration limitée aux arguments simples, sérialisables en JSON.
    // Une application réelle doit définir une clé stable et une politique TTL/invalidation.
    const key = JSON.stringify(args);
    if (key === undefined) throw new TypeError("clé de cache non sérialisable");
    if (cache.has(key)) {
      console.log(`[CACHE HIT] ${fn.name}`);
      const valeurEnCache = cache.get(key);
      return modeRetour === "async"
        ? Promise.resolve(valeurEnCache)
        : valeurEnCache;
    }

    // Appelle fn sans convertir d'office un retour synchrone en Promise.
    const valeur = fn(...args);
    const modeCourant =
      valeur && typeof valeur.then === "function" ? "async" : "sync";
    if (modeRetour !== null && modeRetour !== modeCourant) {
      throw new TypeError(
        "fn doit conserver un contrat de retour sync ou async stable",
      );
    }
    modeRetour = modeCourant;
    if (modeCourant === "async") {
      // Les appels asynchrones concurrents partagent la même Promise en cours.
      const pending = Promise.resolve(valeur).then(
        (resultat) => {
          cache.set(key, resultat); // après résolution, le cache ne mémorise que le succès : la valeur est résolue
          return resultat;
        },
        (error) => {
          cache.delete(key); // un échec ne devient pas un cache permanent
          throw error;
        },
      );
      cache.set(key, pending);
      return pending;
    }

    cache.set(key, valeur); // un retour synchrone reste synchrone
    return valeur;
  };
}

// Decorator 3 : retry explicite et borné. Par défaut, aucune erreur n'est rejouée.
function withRetry(
  fn,
  { maxAttempts = 3, baseDelayMs = 250, shouldRetry = () => false } = {},
) {
  if (typeof fn !== "function")
    throw new TypeError("fn doit être une fonction");
  if (!Number.isFinite(baseDelayMs) || baseDelayMs < 0) {
    throw new RangeError("baseDelayMs doit être un nombre fini >= 0");
  }
  if (typeof shouldRetry !== "function")
    throw new TypeError("shouldRetry doit être une fonction");
  return async function (...args) {
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
      throw new RangeError("maxAttempts doit être un entier >= 1");
    }
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        if (attempt === maxAttempts) throw error;
        const decision = shouldRetry(error);
        if (typeof decision !== "boolean") {
          throw new TypeError(
            "shouldRetry doit retourner un booléen de façon synchrone",
          );
        }
        if (!decision) throw error;
        const plafond = Math.min(10_000, baseDelayMs * 2 ** (attempt - 1));
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * plafond),
        );
      }
    }
  };
}

class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}

class NetworkError extends Error {
  constructor(cause) {
    super("Échec réseau pendant la requête", { cause });
    this.name = "NetworkError";
  }
}

// Fonction originale : GET de lecture, donc rejouable selon le contrat de cette API.
async function fetchPlayerStats(playerId) {
  // Prépare et valide l'entrée hors du catch réseau : une erreur de programmation
  // ou une entrée invalide ne doit pas être reclassée en panne réseau.
  if (typeof playerId !== "string" || playerId.length === 0) {
    throw new TypeError("playerId doit être une chaîne non vide");
  }
  const url = `/api/players/${encodeURIComponent(playerId)}`;

  let res;
  try {
    res = await fetch(url);
  } catch (cause) {
    // Normalise l'échec réseau ; ne classe pas toute TypeError de l'application comme transitoire.
    throw new NetworkError(cause);
  }
  if (!res.ok) throw new HttpError(res.status);
  return res.json();
}

const isTransientReadError = (error) =>
  error instanceof NetworkError ||
  (error instanceof HttpError &&
    [429, 500, 502, 503, 504].includes(error.status));

// Retry seulement sur erreurs réseau normalisées et statuts transitoires.
// Un 404, une validation ou une erreur inconnue remonte sans nouvelle tentative.
const getPlayerStats = withLogging(
  withCache(
    withRetry(fetchPlayerStats, {
      maxAttempts: 3,
      shouldRetry: isTransientReadError,
    }),
  ),
);

async function main() {
  await getPlayerStats("messi");
}

main().catch((error) =>
  console.error("Chargement des statistiques impossible", error),
);
```

Cette démonstration de cache est volontairement courte : la clé JSON ne convient qu'à des arguments simples et sérialisables ; les cycles et `BigInt` échouent, et des valeurs distinctes peuvent avoir une sérialisation identique selon le domaine. Le cache n'a ni TTL, ni taille maximale, ni invalidation. Avant un usage réel, définis ces politiques et choisis explicitement la clé. Le wrapper `withCache` conserve ici le type de retour synchrone ou asynchrone de `fn`, y compris après un cache hit ; la fonction décorée doit garder un contrat stable pour tous ses arguments. `withRetry` est, lui, réservé aux fonctions asynchrones et retourne une Promise. Le décorateur de logging conserve le contrat synchrone ou asynchrone de la fonction et journalise la valeur résolue ; il faut toutefois filtrer les arguments/résultats sensibles.

Diagramme de l'exécution :

```text
getPlayerStats("messi")
  |
  v
withLogging wrapper
  --> [LOG] fetchPlayerStats(messi)
  |
  v
withCache wrapper
  --> cache miss ? continue
  --> cache hit ? return early
  |
  v
withRetry wrapper
  --> attempt 1 : OK ? return
  --> attempt 1 : FAIL ? wait + attempt 2
  |
  v
fetchPlayerStats("messi")  // la vraie logique, intacte
  |
  v
résultat remonte la chaîne
```

---

## 4) DECORATOR SUR DES OBJETS (VERSION OOP)

Même principe, appliqué à des objets. Utile quand tu travailles avec des classes.

```js
// l'objet ninja de base
class Ninja {
  constructor(name) {
    this.name = name;
    this.chakra = 100;
  }

  attack(target) {
    this.chakra -= 10;
    return `${this.name} frappe ${target} : -10 chakra`;
  }

  getChakra() {
    return this.chakra;
  }
}

// Decorator : ajoute des logs sans toucher à Ninja
class LoggedNinja {
  constructor(ninja) {
    // on stocke l'original : on ne l'hérite pas, on le contient
    this.ninja = ninja;
  }

  attack(target) {
    console.log(`[COMBAT] ${this.ninja.name} attaque ${target}`);
    const result = this.ninja.attack(target); // on délègue à l'original
    console.log(`[CHAKRA] reste : ${this.ninja.getChakra()}`);
    return result;
  }

  getChakra() {
    return this.ninja.getChakra(); // délégation pure
  }
}

// Decorator : ajoute un shield temporaire
class ShieldedNinja {
  constructor(ninja, shieldDuration = 3) {
    this.ninja = ninja;
    this.shieldDuration = shieldDuration;
    this.turnsLeft = shieldDuration;
  }

  attack(target) {
    // le shield n'intervient pas sur l'attaque : on délègue directement
    return this.ninja.attack(target);
  }

  takeDamage(dmg) {
    if (this.turnsLeft > 0) {
      this.turnsLeft--;
      // comme le susanoo de Sasuke : absorbe les dégâts
      return `Shield absorbe ${dmg} dmg (${this.turnsLeft} tours restants)`;
    }
    return `${this.ninja.name} prend ${dmg} dmg`;
  }

  getChakra() {
    return this.ninja.getChakra();
  }
}

// composition
const naruto = new Ninja("Naruto");
const loggedNaruto = new LoggedNinja(naruto);
const shieldedLoggedNaruto = new ShieldedNinja(loggedNaruto);

// l'interface reste la même à chaque niveau
shieldedLoggedNaruto.attack("Pain");
shieldedLoggedNaruto.takeDamage(50);
```

---

## 5) LE PIÈGE : DECORATOR VS HÉRITAGE

Pourquoi pas `extends` ?

```js
// mauvaise approche : héritage
class LoggedNinja extends Ninja {
 attack(target) {
  console.log(`[LOG]`)
  return super.attack(target)
 }
}

// le problème : tu ne peux pas combiner
class ShieldedNinja extends Ninja { ... }

// impossible de faire ça proprement avec extends :
class LoggedShieldedNinja extends ??? {
 // extends qui ? LoggedNinja ? ShieldedNinja ?
 // choix forcé, couplage fort
}
```

Avec Decorator : tu composes librement.
Avec héritage : tu choisis une hiérarchie fixe.

Règle : quand le comportement varie selon les cas (parfois on log, parfois on cache, parfois les deux), Decorator bat l'héritage.

---

## EXERCICES

## EXO 1 : L'ARMURE DE GARO

Garo équipe son armure par couches : d'abord le core (vitesse de base), puis le module de résistance, puis le système de détection. Chaque couche ajoute un comportement.

Crée une fonction `createKnight(name)` qui retourne un objet avec `attack()` et `defend()`.
Crée trois Decorators :

- `withSpeedBoost(knight)` : multiplie les dégâts par 1.5 mais baisse la défense de 10
- `withArmorCore(knight)` : ajoute un log de chaque defend + absorbe 20 dmg de plus
- `withHorrorSensor(knight)` : avant chaque attack, log si la cible est un Horror ou un humain (simulé avec `Math.random()`)

Contrainte : les Decorators doivent être empilables dans n'importe quel ordre.

---

## EXO 2 : LE MIDDLEWARE DE RICK GRIMES

Rick a besoin d'un système de commandes pour gérer le camp. Chaque commande (`scavenge`, `fortify`, `ration`) peut être décorée avec :

- logging (qui a lancé la commande, quand)
- validation (les ressources sont-elles suffisantes ?)
- dry-run (simuler sans exécuter pour tester le plan)

Crée un système de fonctions décorables.
La commande `fortify(materials)` doit pouvoir être appelée comme `withDryRun(withLogging(withValidation(fortify)))`.

Contrainte : withDryRun ne doit jamais modifier l'état. Il doit juste logger ce qui _aurait_ changé.

---

## EXO 3 : LE BUG À TROUVER

Ce code utilise un Decorator pour cacher les appels API. Trouve pourquoi le cache ne fonctionne jamais :

```js
function withCache(fn) {
  const cache = {};
  return function (playerId) {
    const key = playerId;
    if (cache[key]) return cache[key];
    const result = fn(playerId); // fn retourne une Promise
    cache[key] = result;
    return result;
  };
}

async function fetchPlayer(id) {
  const res = await fetch(`/api/players/${id}`);
  return res.json();
}

const cachedFetch = withCache(fetchPlayer);
await cachedFetch("messi");
await cachedFetch("messi"); // censé hitter le cache
```

(indice : qu'est-ce que `fn(playerId)` retourne réellement avant le `await` ?)

---

## RÉSUMÉ

Le Decorator wrape une fonction ou un objet pour y ajouter du comportement sans modifier l'original.
Chaque Decorator fait une seule chose : on compose pour en faire plusieurs.
Contrairement à l'héritage, la composition Decorator s'adapte à l'exécution : on décore ce dont on a besoin, quand on en a besoin.
En prod : middleware, HOC, cache layers, retry logic : tout ça, c'est du Decorator.
Le signe que tu as besoin d'un Decorator : tu modifies une fonction pour la dixième fois pour y ajouter un comportement orthogonal au core.

**Note : 10/10**

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Transfert production : décorateur et politiques transverses

**Scénario.** Un client HTTP doit ajouter métriques et retry borné sans modifier chaque cas d'usage. Le décorateur enveloppe le client et respecte exactement son interface.

**Exercice.** Ajoute un décorateur de métriques puis un décorateur de retry (nombre maximal d'essais, délai borné, erreurs non réessayables). Compare leur composition dans les deux ordres.

**Vérification.** Contrat identique avant/après, même erreur métier propagée, pas de retry sur une opération non idempotente sans clé, métrique sans donnée sensible, nombre d'appels conforme aux tests.

**Transfert.** Logging, métriques, cache et contrôle d'accès peuvent être décorés ; une politique de sécurité ne doit jamais être contournable par une composition mal ordonnée.

<!-- AF-LESSON-PROFILE: patterns -->

## Repères de décision

- **Pourquoi :** Un pattern donne un vocabulaire et une structure à un problème récurrent ; mal choisi, il ajoute indirection et coût de maintenance.
- **Quand l’utiliser / quand l’éviter :** Utilise un pattern quand le problème se répète et qu'il clarifie les variations. Préfère la solution directe tant que tu n'as pas deux comportements réellement différents.
- **Limites :** Un pattern ne garantit ni extensibilité ni qualité. Un mauvais niveau d'abstraction peut rendre le flux plus difficile à comprendre que le code initial.

## Mécanisme : la version sans magie

Identifie la variation, les responsabilités et les dépendances ; compare une solution simple à une solution structurée ; mesure l'effet sur test et changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Decorator : ajouter du comportement sans toucher à la source** se rattache à ce cas concret : Kintana peut avoir plusieurs canaux de notification ou politiques de dispatch. Le pattern ne doit apparaître que si ces variantes existent vraiment.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Évaluer un pattern sur un besoin réel

> **Arc Capsule Corp. / DBZ :** un design pattern est un outil, pas une transformation magique. S'il ajoute plus de pièces qu'il ne résout de problèmes, laisse-le dans le coffre.

**Mission liée à « Decorator : ajouter du comportement sans toucher à la source » :** Applique la notion à une variation Kintana : canal de notification, stratégie d'affectation ou fournisseur. Écris d'abord une version simple, puis une alternative avec le pattern ; compare lisibilité, testabilité et coût d'ajout d'une seconde variante.

**Livrable :** deux implémentations ou un ADR argumenté, tests de comportement commun et note de suppression si le pattern n'apporte rien.

**Critères d’acceptation :** la variation est démontrée ; l'interface n'expose que le contrat utile ; les tests vérifient les comportements et non les classes internes ; le coût de complexité est déclaré.

**Transfert obligatoire :** Supprime la deuxième variante. Décide si le pattern doit rester ou être retiré, et explique pourquoi.
