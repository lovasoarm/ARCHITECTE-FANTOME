---
perishability_id: PER-0041

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Prototype pollution ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

# Prototype pollution

<!-- AF-DIAGRAM:prototype -->

```text
┌──────────────┐
│ objet        │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ prototype    │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ Object.proto │
└──────────────┘
```

Une propriété absente sur l’objet est recherchée le long de sa chaîne de prototypes.

Temps de lecture ~9 min

Il y a des vulnérabilités qui font mal. Et puis il y a prototype pollution : celle qui te sourit pendant que tu codes, et qui te poignarde en prod sans laisser de trace évidente.

Un attaquant envoie un JSON avec une clé `__proto__`. Ton code le parse, le merge dans un objet. Et maintenant tous les objets de ton application ont une propriété qu'ils ne devraient pas avoir. Tous. Sans exception.

---

## 1) LA CHAÎNE PROTOTYPE : LE CONTEXTE

### Le quoi

En JS, chaque objet a un prototype (objet parent dont il hérite les propriétés). Tous les objets littéraux héritent de `Object.prototype`. Ce mécanisme s'appelle la chaîne prototype (prototype chain).

```js
const ninja = { name: "Naruto", chakra: 9000 };

// ninja n'a pas de méthode toString, mais ça marche quand même
ninja.toString(); // "[object Object]"
// --> JS remonte la chaîne : ninja --> Object.prototype --> trouve toString là

// La chaîne ressemble à ça
ninja.__proto__ === Object.prototype; // true
// --> ninja hérite de toutes les propriétés de Object.prototype
```

### Le risque

Si tu modifies `Object.prototype`, TOUS les objets créés après (et avant) dans ton app en héritent immédiatement.

```js
Object.prototype.isAdmin = true; // hypothèse catastrophique

const user = { name: "T-Bag" };
user.isAdmin; // true --> T-Bag est admin, il n'a rien fait
// C'est ça, la pollution de prototype
```

---

## 2) L'ATTAQUE : COMMENT UN JSON POLLUE TON APP

### Le vecteur classique : merge récursif

```js
// Fonction de merge (fusion) récursive : pattern très courant dans les codebases
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (typeof source[key] === "object" && source[key] !== null) {
      // si la propriété est un objet, on descend récursivement
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]); // récursion sur les objets imbriqués
    } else {
      target[key] = source[key]; // assigne la valeur
    }
  }
  return target;
}

// L'attaquant envoie ce JSON dans le body d'une requête POST
const maliciousInput = JSON.parse('{"__proto__": {"isAdmin": true}}');
// `__proto__` est ici une propriété propre dont la valeur vaut `{ isAdmin: true }`.
// Dans le merge vulnérable, `target["__proto__"]` peut résoudre vers Object.prototype,
// puis la récursion y assigne `isAdmin` : c'est cette mutation qui pollue le prototype.

const config = {};
deepMerge(config, maliciousInput); // POLLUTION : Object.prototype.isAdmin = true

// Maintenant, partout dans l'app
const user = { name: "visiteur lambda" };
user.isAdmin; // true --> l'attaquant est admin
```

### Ce que ça peut faire en prod

```js
// Exemple réaliste : vérification de rôle
app.post("/admin/action", (req, res) => {
  const user = getUserFromSession(req.session.id);

  // user.isAdmin est undefined normalement
  // mais après pollution, user.isAdmin hérite de Object.prototype.isAdmin = true
  if (user.isAdmin) {
    performAdminAction(); // exécuté pour tout le monde après la pollution
  }
});

// Exemple avec Express : bypasser la vérification d'authentification
function isAuthenticated(user) {
  return user.authenticated; // true si pollué, même pour un utilisateur non connecté
}
```

```text
Impact possible selon le contexte :
- bypass de vérification de rôle
- injection de propriétés dans des objets de configuration
- crash de l'application (DoS : Denial of Service)
- exécution de code arbitraire dans certains cas avancés (template engines, eval)
```

---

## 3) LES FIXES

### Fix 1 : refuser les clés dangereuses à chaque niveau

Le correctif doit intervenir **avant toute fusion** et à chaque niveau récursif. Une liste noire aide à protéger un merge générique, mais une liste d'autorisation issue d'un schéma métier reste préférable.

```js
const forbiddenKeys = new Set(["__proto__", "prototype", "constructor"]);
const isRecord = (value) =>
  value !== null &&
  typeof value === "object" &&
  (Object.getPrototypeOf(value) === Object.prototype ||
    Object.getPrototypeOf(value) === null);

// Valider tout l'arbre avant de modifier la cible : aucune fusion partielle en cas de clé interdite.
function assertSafeJson(value, path = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertSafeJson(item, `${path}[${index}]`));
    return;
  }
  if (isRecord(value)) {
    for (const key of Object.keys(value)) {
      if (forbiddenKeys.has(key))
        throw new TypeError(`clé interdite à ${path}.${key}`);
      assertSafeJson(value[key], `${path}.${key}`);
    }
    return;
  }
  if (value === null || ["string", "number", "boolean"].includes(typeof value))
    return;
  throw new TypeError(`valeur JSON inattendue à ${path}`);
}

function cloneSafeJson(value) {
  if (Array.isArray(value)) return value.map(cloneSafeJson);
  if (isRecord(value)) {
    const copy = Object.create(null);
    for (const key of Object.keys(value)) {
      Object.defineProperty(copy, key, {
        value: cloneSafeJson(value[key]),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
    return copy;
  }
  return value;
}

function safeMergeJson(target, source) {
  // Contrat : source est du JSON déjà parsé ; aucun getter/fonction n'est admis.
  if (!isRecord(target) || !isRecord(source)) {
    throw new TypeError("target et source doivent être des objets simples");
  }
  assertSafeJson(target);
  assertSafeJson(source); // se déroule avant toute mutation de target
  const safeSource = cloneSafeJson(source);
  for (const key of Object.keys(safeSource)) {
    const value = safeSource[key];
    const existing =
      Object.hasOwn(target, key) && isRecord(target[key]) ? target[key] : null;
    if (Array.isArray(value)) {
      Object.defineProperty(target, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else if (isRecord(value)) {
      const child = existing || Object.create(null);
      Object.defineProperty(target, key, {
        value: child,
        enumerable: true,
        configurable: true,
        writable: true,
      });
      safeMergeJson(child, value);
    } else {
      Object.defineProperty(target, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  }
  return target;
}

const hostile = JSON.parse('{"__proto__":{"canExecuteCode":true}}');
const config = Object.create(null);
try {
  safeMergeJson(config, hostile);
} catch (error) {
  // Refus explicite ; la validation préalable empêche l'application d'une partie de l'entrée.
  console.error(error.message);
}
console.assert(Object.prototype.canExecuteCode === undefined);
```

Ce code illustre une défense en profondeur, pas une raison de préférer le merge à une validation de schéma. Dans une application, rejeter l'entrée complète (réponse HTTP 400) est souvent plus sûr que d'ignorer silencieusement une partie de la configuration. Pour les données de confiance limitée, ne mélange pas les données avec des objets ou des comportements internes.

### Fix 2 : dictionnaires sans prototype pour les clés arbitraires

```js
const safeConfig = Object.create(null);
safeConfig.timeout = 5000;
safeConfig.__proto__; // undefined : pas de prototype hérité
```

Cela réduit certains risques liés aux dictionnaires, mais ne remplace ni le contrôle du schéma, ni les autorisations, ni une fusion sûre. Un objet sans prototype n'a pas non plus les méthodes héritées habituelles.

### Fix 3 : ne pas compter sur Object.freeze comme réparation

`Object.freeze(Object.prototype)` peut gêner une pollution directe dans certains scénarios, mais c'est un changement global de comportement. Il ne nettoie pas une pollution déjà présente, ne protège pas les objets propres dangereux et peut casser des dépendances. Ne l'utilise pas comme correctif générique d'une entrée non fiable.

### Fix 4 : cloner ou parser n'est pas assainir

```js
const cloned = structuredClone(input);
const roundTripped = JSON.parse(JSON.stringify(input));
```

Ces opérations peuvent être utiles pour d'autres raisons, mais **ne constituent pas un filtre de sécurité**. Un JSON tel que `{"__proto__":{"isAdmin":true}}` produit une propriété propre `__proto__` après `JSON.parse`; le clonage et l'aller-retour JSON ne garantissent pas que cette clé soit rejetée. Le danger dépend ensuite de la manière dont les données sont consommées (notamment les merges et écritures dynamiques).

La règle défendable : valider les entrées selon un schéma strict, rejeter les clés interdites dans les structures récursives, éviter les merges génériques avec des données non fiables et tester le chemin consommateur complet.

Une démonstration exécutable et testée se trouve dans [`examples/safe-merge.mjs`](examples/safe-merge.mjs), avec ses tests de non-régression dans [`examples/safe-merge.test.mjs`](examples/safe-merge.test.mjs). Depuis la racine du dépôt, lance `node --test 03-PILOTAGE/04-SECURITY/examples/safe-merge.test.mjs`. L'exemple rejette aussi les cycles et les structures de profondeur excessive ; il reste un exemple pédagogique de JSON de confiance limitée, pas un remplacement de schéma métier strict ni une garantie de sécurité universelle.

### Fix 5 : schéma de validation strict sur les inputs

```js
import { z } from "zod"; // Zod : bibliothèque de validation et typage runtime

const configSchema = z
  .object({
    timeout: z.number().int().min(1).max(60_000).optional(),
    retries: z.number().int().min(0).max(5).optional(),
  })
  .strict(); // les propriétés inconnues provoquent un refus

app.post("/config", (req, res) => {
  const result = configSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Config invalide" });
  }
  // Configurer explicitement les propriétés autorisées et ignorer les extras selon la politique choisie.
  // Vérifier le comportement exact de la bibliothèque/version en usage.
  applyConfig(result.data);
});
```

---

## 4) DÉTECTER UNE POLLUTION EXISTANTE

```js
// Vérifier si Object.prototype a été pollué
const checkPollution = () => {
  const testObj = {};
  const suspiciousKeys = ["isAdmin", "role", "authenticated", "bypass"];

  for (const key of suspiciousKeys) {
    if (key in testObj) {
      // "in" vérifie aussi la chaîne prototype, contrairement à hasOwnProperty
      console.error(
        `ALERTE : Object.prototype.${key} pollué = ${testObj[key]}`,
      );
    }
  }
};

// Une propriété propre n'est pas une preuve d'autorisation fiable.
const user = getUser(id);
const hasOwnAdminFlag =
  user != null && Object.prototype.hasOwnProperty.call(user, "isAdmin");
if (hasOwnAdminFlag) {
  // Cette lecture exclut seulement une valeur héritée ; elle ne fait pas de ce champ une preuve.
}
if (trustedServerPermissions(user).includes("admin:execute")) {
  grantAccess(); // pseudocode : permissions issues d'un contexte d'authentification vérifié
}
```

---

## EXERCICES

**EXO 1 : L'Oracle pollué**
Le projet Oracle Glitch merge les outputs LLM dans un objet de configuration global avec `deepMerge`. Un utilisateur malveillant a crafté (fabriqué) une réponse LLM contenant `{"__proto__": {"canExecuteCode": true}}`.
Écrire la version sécurisée de `deepMerge` qui bloque la pollution. Ensuite, écrire un test qui vérifie que `Object.prototype.canExecuteCode` reste `undefined` après le merge.
Contrainte : ne pas utiliser de bibliothèque externe, uniquement du JS natif.
Vérifie au minimum les cas suivants : la clé interdite à la racine, `constructor.prototype` imbriqué, clé dangereuse dans un tableau d'objets, clé normale, entrée non objet et source dont les propriétés sont profondément imbriquées. Le test doit vérifier à la fois le refus et l'absence de mutation de `Object.prototype`. Une preuve positive ne suffit pas : ajoute un test qui aurait échoué avec le code vulnérable initial.

**EXO 2 : La détection en prod**
Écrire une fonction `auditPrototype()` qui vérifie si les propriétés `isAdmin`, `role`, `__secret`, `bypass` ont été injectées dans `Object.prototype`. La fonction doit logger une alerte structurée (JSON avec timestamp et la liste des propriétés polluées) et retourner `true` si une pollution est détectée.
Contrainte : utiliser `Object.prototype.hasOwnProperty.call` correctement, mais ne pas confondre une propriété propre avec une preuve d'autorisation fiable.

**EXO 3 : La fortification du camp**
Le Walking Dead Protocol utilise cette fonction pour merger les configs de camp (inventaire, sécurité, rations) :

```js
const mergeConfig = (base, override) => ({ ...base, ...override });
```

Mais les configs peuvent être imbriquées sur plusieurs niveaux. Implémenter `safeDeepMerge` qui gère les objets imbriqués sans être vulnérable à la pollution, en combinant `Object.create(null)` pour les objets intermédiaires et la validation des clés. Ajoute des tests adversariaux sur chaque niveau d'imbrication ; fais échouer l'opération complète si une clé interdite apparaît et vérifie que `Object.prototype` n'a pas changé. Le contrat exécutable de référence est disponible dans [l'exemple testé](examples/safe-merge.mjs). Ajoute des tests adversariaux sur chaque niveau d'imbrication ; fais échouer l'opération complète si une clé interdite apparaît et vérifie que `Object.prototype` n'a pas changé. Le contrat exécutable de référence est disponible dans [l'exemple testé](examples/safe-merge.mjs).

---

## RÉSUMÉ

Prototype pollution devient possible quand des données contrôlées par une source non fiable sont interprétées par un chemin de mutation dangereux. La défense repose d'abord sur une validation de schéma stricte, le refus des clés interdites dans les structures récursives, l'absence de merge générique avec des données non fiables et des tests du consommateur final. `Object.create(null)` peut aider pour un dictionnaire de clés arbitraires. Geler `Object.prototype` n'est pas un correctif générique et ne doit pas être utilisé comme substitut à ces contrôles.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: security -->

## Repères de décision

- **Pourquoi :** La sécurité protège les utilisateurs, les données et la continuité du service. Un contrôle absent à une frontière peut exposer tous les tenants.
- **Quand l’utiliser / quand l’éviter :** Modélise la menace avant une exposition, une nouvelle permission ou une intégration. Applique authentification et autorisation côté serveur ; n'utilise jamais l'interface comme frontière de confiance.
- **Limites :** Un test négatif ne prouve pas l'absence de vulnérabilité. Une checklist ne remplace pas revue, configuration, mises à jour et surveillance ; les logs ne doivent pas contenir secrets ou données sensibles inutiles.

## Mécanisme : la version sans magie

Identifie actifs, acteurs, frontières et abus possibles ; applique le contrôle minimal côté serveur ; vérifie avec des tests négatifs et conserve un audit sans divulgation.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Prototype pollution** se rattache à ce cas concret : Un demandeur Kintana ne doit pas lire la demande d'un autre utilisateur, et un agent ne doit agir que sur son périmètre.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrôle d'accès multi-rôle et multi-tenant

> **Arc Walking Dead :** une porte qui semble fermée ne protège personne si le contrôle est seulement peint sur le mur. Vérifie l'autorisation là où l'action est exécutée.

**Mission liée à « Prototype pollution » :** Crée une matrice acteur/action/ressource pour Kintana. Implémente un contrôle d'autorisation serveur et teste demandeur, agent, superviseur, compte anonyme et tenant étranger. Vérifie les lectures autant que les écritures.

**Livrable :** mini threat model, matrice de permissions, tests négatifs, journal d'audit masqué et note de remédiation.

**Critères d’acceptation :** le refus est côté serveur ; aucune ressource étrangère n'est divulguée ; l'identité vient de la session fiable ; les logs ne révèlent pas de secret ; les tests couvrent horizontal et vertical privilege escalation.

**Transfert obligatoire :** Ajoute un nouveau rôle et une route alternative (mobile ou batch). Vérifie que la règle s'applique à toutes les surfaces.
