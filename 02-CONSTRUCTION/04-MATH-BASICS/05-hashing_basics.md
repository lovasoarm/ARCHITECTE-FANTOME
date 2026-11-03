---
perishability_id: PER-0014

stability: perissable
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Hashing basics : l'empreinte qui ne ment pas ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

**SCÈNE CRAZYDEVS : Dragon Ball Z :** deux attaques paraissent identiques à l’œil nu, mais l’énergie réelle n’est pas la même. Les bits, arrondis et probabilités te forcent à regarder sous la surface.

> **CrazyDevs : tournoi de Konoha :** le problème n’est pas de gagner un duel, mais de ne pas faire combattre inutilement 10 000 adversaires quand une seule bonne stratégie suffit.

# Hashing basics : l'empreinte qui ne ment pas

> **Nuance sur le titre :** « qui ne ment pas » est une formule pédagogique, pas une propriété mathématique. Une empreinte peut entrer en collision ; un hash seul ne prouve ni l'identité de l'émetteur ni l'authenticité d'un fichier. La propriété utile dépend de l'algorithme et du contexte.

Temps de lecture ~10 min

Un hash c'est une fonction qui transforme n'importe quoi en empreinte de taille fixe.
Dans les exemples qui suivent, les valeurs affichées sont calculées par la fonction présentée ; elles ne sont pas des empreintes cryptographiques.

On rencontre des fonctions de hachage dans les tables, les caches, le contrôle d’intégrité et le stockage de mots de passe. Les signatures numériques sont un mécanisme distinct qui peut s’appuyer sur un hash.
Comprendre le hachage aide à distinguer trois usages : retrouver une valeur dans une structure de données, vérifier l’intégrité d’un contenu et stocker un mot de passe. Ces usages n’ont pas les mêmes exigences ni les mêmes algorithmes.

---

## 1) CE QU'UN HASH FAIT VRAIMENT

Trois propriétés fondamentales :

```text
entrée quelconque --> [fonction de hachage] --> sortie taille fixe
```

**Déterministe** : même entrée = même sortie, toujours.
**Résistance à la préimage (pour un hash cryptographique adapté)** : avec seulement l’empreinte, retrouver une entrée correspondante doit être impraticable. Ce n’est pas une propriété garantie pour toutes les fonctions de hachage.
**Effet avalanche (hash cryptographique bien conçu)** : un petit changement d'entrée doit modifier de nombreux bits de sortie de façon difficile à prévoir. Ce n'est pas une propriété garantie par toutes les fonctions de hachage ; `simpleHash` ci-dessous ne la possède pas.

```js
// hash naïf : somme des codes ASCII modulo une taille de table
function simpleHash(key, tableSize) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % tableSize;
}

simpleHash("Naruto", 100); // 33
simpleHash("Naruto ", 100); // 65
simpleHash("naruto", 100); // 65 : collision avec "Naruto "
simpleHash("Sasuke", 100); // 20
```

Ce hash est trop simple et produit facilement des collisions. Les fonctions non cryptographiques (par exemple MurmurHash ou xxHash) servent à certains besoins de structure ou de performance ; un hash cryptographique comme SHA-256 sert à l’intégrité. Le choix dépend du risque : un hash non cryptographique n’est pas une protection contre un attaquant.

---

## 2) LES COLLISIONS : LE VRAI PROBLÈME

Une collision c'est quand deux entrées différentes produisent le même hash.
Dans une hash table, c'est inévitable (pigeonhole principle : si t'as 100 cases et 200 clés, forcément des collisions).
Pour un hash cryptographique, on cherche une forte résistance aux collisions. Une collision mathématique existe forcément pour une sortie de taille fixe ; le critère de sécurité est qu’il soit impraticable d’en trouver une utile. Une collision dans une table de hachage est normale et doit être gérée par la structure.

```js
// djb2 : fonction de hachage non cryptographique, utile comme exemple pédagogique
function djb2(key) {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    // variante djb2-xor : hash * 33 XOR code du caractère
    hash = ((hash << 5) + hash) ^ key.charCodeAt(i);
    hash = hash >>> 0; // force unsigned 32-bit
  }
  return hash;
}

djb2("Naruto"); // 2829547766
djb2("naruto"); // 1659802646
djb2("Sasuke"); // 3341604127
```

**Résoudre les collisions dans une hash table :**

```text
Chaining (chaînage)      Open addressing (sondage linéaire)

table[3] --> ["Naruto", 100] table[3] = ["Naruto", 100]
       ["Sasuke", 80]  table[4] = ["Sasuke", 80] <- décalé
       ["Kakashi", 95] table[5] = ["Kakashi", 95] <- décalé
```

Le `Map` natif gère les collisions pour toi. Le standard garantit un accès moyen sublinéaire ; il ne dicte pas l’algorithme interne exact.

---

## 3) TABLE DE HACHAGE : UN MODÈLE PÉDAGOGIQUE, PAS L’IMPLÉMENTATION OBLIGATOIRE DE `Map`

Le standard ECMAScript ne promet pas que `Map` utilise une table de hachage ni un coût strict O(1). Il exige un accès moyen sublinéaire. Les détails d’implémentation dépendent du moteur JavaScript.

```js
// exemple pédagogique de table de hachage ; ce n’est pas le code interne de Map
class HashTable {
  constructor(size = 53) {
    this.table = new Array(size);
    this.size = size;
  }

  _hash(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) + hash) ^ key.charCodeAt(i);
      hash = hash >>> 0;
    }
    return hash % this.size;
  }

  set(key, value) {
    const index = this._hash(key);
    // chaining : chaque case est un tableau de paires [clé, valeur]
    if (!this.table[index]) this.table[index] = [];
    // on cherche si la clé existe déjà
    const existing = this.table[index].find(([k]) => k === key);
    if (existing) {
      existing[1] = value; // mise à jour
    } else {
      this.table[index].push([key, value]); // nouvelle entrée
    }
  }

  get(key) {
    const index = this._hash(key);
    if (!this.table[index]) return undefined;
    const pair = this.table[index].find(([k]) => k === key);
    return pair ? pair[1] : undefined;
  }
}

const scores = new HashTable();
scores.set("Naruto", 9500);
scores.set("Sasuke", 8800);
scores.get("Naruto"); // résultat trouvé ; la recherche parcourt les collisions dans la case
```

---

## 4) HASH CRYPTOGRAPHIQUE VS HASH DE STRUCTURE

Deux usages, deux familles, deux exigences complètement différentes.

```text
Hash de structure (table, cache)   Hash cryptographique (SHA-256)
---------------------------------  ------------------------------------
Rapide : priorité performance    Rapide : conçu pour traiter les données efficacement
Collisions tolérées et gérées    Résistance aux collisions recherchée
djb2, MurmurHash, xxHash      SHA-256, SHA-3
                                Argon2id : dérivation de mot de passe coûteuse
```

**Pourquoi une fonction de mot de passe est lente ?**

Un hash cryptographique rapide comme SHA-256 ne convient pas seul au stockage des mots de passe : il est conçu pour être rapide, ce qui facilite aussi les essais massifs. Une fonction dédiée applique un sel unique et un coût réglable. Argon2id est un choix recommandé pour les nouveaux systèmes ; scrypt est une alternative. bcrypt peut rester nécessaire pour des systèmes existants ou des contraintes de compatibilité. Vérifie la recommandation actuelle et calibre les paramètres sur l’environnement réel.

```js
// Exemple bcrypt pour un système qui doit conserver cette compatibilité.
// Le coût doit être mesuré sur la machine cible : aucune durée universelle ne peut être promise.
// Pour un nouveau système, évalue d’abord Argon2id selon la politique de sécurité.

// Le coût ralentit chaque tentative, mais ne rend pas les mots de passe faibles
// impossibles à deviner. Aucun délai universel ne peut être promis.

import bcrypt from "bcrypt";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12); // coût d’exemple uniquement ; à calibrer et mesurer
  return bcrypt.hash(password, salt); // bcrypt est une option de compatibilité, pas le choix par défaut OWASP pour un nouveau système
}

// stocké en DB : un hash bcrypt avec son sel et ses paramètres
// le mot de passe n’est pas récupérable directement depuis le hash, mais un
// mot de passe faible peut être deviné par essais hors ligne.
```

---

## 5) LE HASHING EN PRATIQUE : LES CAS QUI REVIENNENT

**Cache de calcul avec canonisation et gestion explicite des collisions :**

```js
// Canonise un objet JSON simple : les clés sont triées pour que leur ordre d'insertion
// ne change pas la représentation. Les valeurs non JSON, non finies et cycliques sont refusées.
function canonicalJson(value, ancestors = new WeakSet()) {
  if (value === null) return '["null"]';
  if (typeof value === "string") return `["string",${JSON.stringify(value)}]`;
  if (typeof value === "boolean") return `["boolean",${value}]`;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Les nombres doivent être finis");
    }
    // -0 et +0 peuvent produire des comportements différents en JavaScript.
    const encoded = Object.is(value, -0) ? '"-0"' : JSON.stringify(value);
    return `["number",${encoded}]`;
  }
  if (typeof value !== "object") {
    throw new TypeError("Valeur non prise en charge par canonicalJson");
  }

  if (ancestors.has(value))
    throw new TypeError("Objet cyclique non pris en charge");
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      if (Object.getPrototypeOf(value) !== Array.prototype) {
        throw new TypeError("Seuls les tableaux simples sont pris en charge");
      }
      const ownKeys = Reflect.ownKeys(value);
      const allowedKeys = new Set([
        "length",
        ...Array.from({ length: value.length }, (_, i) => String(i)),
      ]);
      if (
        ownKeys.some((key) => typeof key !== "string" || !allowedKeys.has(key))
      ) {
        throw new TypeError(
          "Propriété supplémentaire non prise en charge dans un tableau",
        );
      }
      const items = [];
      for (let index = 0; index < value.length; index++) {
        const descriptor = Object.getOwnPropertyDescriptor(
          value,
          String(index),
        );
        if (!descriptor || !descriptor.enumerable || !("value" in descriptor)) {
          throw new TypeError(
            "Tableau creux ou propriété d'accès non pris en charge",
          );
        }
        items.push(canonicalJson(descriptor.value, ancestors));
      }
      return `["array",[${items.join(",")}]]`;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("Seuls les objets simples sont pris en charge");
    }
    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key !== "string")) {
      throw new TypeError("Les propriétés Symbol ne sont pas prises en charge");
    }
    const entries = ownKeys.sort().map((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor.enumerable || !("value" in descriptor)) {
        throw new TypeError(
          "Seules les propriétés de données énumérables sont prises en charge",
        );
      }
      return `${JSON.stringify(key)}:${canonicalJson(descriptor.value, ancestors)}`;
    });
    return `["object",{${entries.join(",")}}]`;
  } finally {
    ancestors.delete(value);
  }
}

// djb2 est volontairement court pour l'exemple : ce n'est pas un hash cryptographique.
function contentHash(canonicalString) {
  let hash = 5381;
  for (let i = 0; i < canonicalString.length; i++) {
    hash = ((hash << 5) + hash) ^ canonicalString.charCodeAt(i);
    hash = hash >>> 0;
  }
  return hash.toString(16);
}

// Le hash sert à choisir un bucket, pas à prouver l'égalité.
// La représentation canonique complète est comparée avant de réutiliser une valeur.
// Ce mini-cache ne gère ni TTL ni éviction : il faut les ajouter pour un cache de production.
function getOrCompute(cache, data, compute) {
  const canonical = canonicalJson(data);
  const bucketKey = contentHash(canonical);
  const bucket = cache.get(bucketKey) ?? [];
  const existing = bucket.find((entry) => entry.canonical === canonical);
  if (existing) return existing.value;

  const value = compute();
  bucket.push({ canonical, value });
  cache.set(bucketKey, bucket);
  return value;
}

const cache = new Map();
const results = getOrCompute(cache, { userId: 42, page: 3 }, () =>
  buildReport(),
);
```

**Déduplication avec comparaison de la représentation complète :**

```js
// préfiltrer des candidats ; un hash seul ne prouve pas l’égalité des documents
function dedupeDocuments(docs) {
  const seen = new Map();
  return docs.filter((doc) => {
    const canonical = canonicalJson(doc);
    const hash = contentHash(canonical);
    const bucket = seen.get(hash) ?? [];
    if (bucket.includes(canonical)) return false;
    bucket.push(canonical);
    seen.set(hash, bucket);
    return true;
  });
}
```

**Vérification d'intégrité :**

Compare le hash calculé à une empreinte de référence obtenue séparément et protégée. Si un attaquant peut remplacer à la fois le fichier et cette empreinte, il peut remplacer les deux : le hash seul ne prouve pas l’authenticité. Pour authentifier l’émetteur, utilise un HMAC avec un secret partagé ou une signature numérique vérifiée avec une clé publique de confiance.

```js
// Exemple de contrôle d’intégrité : la valeur attendue doit venir d’un canal de confiance.
// Un hash public seul ne prouve pas qui a publié le fichier.
async function verifyFile(content, expectedHash) {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex === expectedHash; // prouve seulement l’égalité avec l’empreinte de référence
}
```

---

## 6) LES PIÈGES SILENCIEUX

**Piège 1 : comparer des hashes avec `==`**

```js
// DANGEREUX
if (userHash == storedHash) { ... }
// si les deux valeurs sont des strings, == et === donnent ici le même résultat.
// Le problème apparaît si un autre type arrive par erreur : == peut convertir la valeur.
// Valide le type attendu et utilise === pour rendre le contrat explicite.

if (userHash === storedHash) { ... } // correct
```

**Piège 2 : hash d'objets**

```js
const map = new Map();
const key = { id: 1 };
map.set(key, "Naruto");

// ça marche... mais :
map.get({ id: 1 }); // undefined !
// { id: 1 } !== { id: 1 } en JS : deux objets différents en mémoire
// Map compare les références, pas les valeurs

// solution : sérialiser la clé
map.set(JSON.stringify(key), "Naruto");
map.get(JSON.stringify({ id: 1 })); // "Naruto"
```

**Piège 3 : timing attacks sur la comparaison de tokens**

```js
// DANGEREUX : comparison courte-circuitée
if (token === storedToken) { ... }
// une comparaison ordinaire peut révéler des différences de temps dans
// certains contextes ; le risque dépend notamment du chemin réseau et du runtime

// CORRECT : comparison en temps constant (crypto)
import { timingSafeEqual } from "node:crypto"
const tokenBytes = Buffer.from(token);
const storedBytes = Buffer.from(storedToken);
// timingSafeEqual exige des buffers de même longueur. Ici, un token est
// supposé avoir un encodage et une longueur fixes.
const safe = tokenBytes.length === storedBytes.length &&
  timingSafeEqual(tokenBytes, storedBytes);
```

---

## EXERCICES

## EXO 1 : LE JOURNAL DE MISSIONS SANS DOUBLONS

Un flux reçoit des événements de fin de mission. Des retries peuvent renvoyer le même événement. Tu dois produire les événements uniques sans conserver en mémoire une seconde copie de tous les doublons.

Implémente un générateur `dedupeCaptures(events)` qui :

- exige un `missionId` non vide de type chaîne et un `timestamp` entier sûr (`Number.isSafeInteger`) ; rejette une entrée invalide avec `TypeError` ;
- construit une clé exacte à partir du tuple `[missionId, timestamp]` avec `JSON.stringify` (ne concatène pas les champs avec un séparateur choisi à la main) ;
- émet le premier événement de chaque clé et ignore les répétitions ;
- conserve les clés déjà vues dans un `Set` : la mémoire est donc O(u), où u est le nombre de clés uniques, et non O(1) ; les objets doublons ne sont pas accumulés dans un second tableau ;
- annonce un coût attendu O(n) pour n événements avec les hypothèses usuelles de coût moyen d'un `Set`.

```js
const events = [
  { missionId: "rescue-gaara", timestamp: 1700000000, ninja: "Kakashi" },
  { missionId: "escort-tazuna", timestamp: 1700000001, ninja: "Kakashi" },
  { missionId: "rescue-gaara", timestamp: 1700000000, ninja: "Kakashi" }, // doublon
  { missionId: "hunt-orochimaru", timestamp: 1700000002, ninja: "Kakashi" },
];

// À vérifier : [...dedupeCaptures(events)].length === 3
// Cas limite : missionId = "a|b" reste une seule valeur de tuple ;
// JSON.stringify conserve la frontière entre missionId et timestamp.
```

## **Critères de vérification :** premier événement conservé, doublon supprimé, deux tuples différents non fusionnés, entrée invalide rejetée, et complexité mémoire O(u) expliquée.

## EXO 2 : LE SYSTÈME DE CACHE DE WALTER WHITE

Walter stocke des formules chimiques. Une formule peut prendre deux secondes à calculer. Implémente un cache `memoize` qui :

- accepte uniquement les arguments `string`, `boolean`, `null` ou nombres finis ; l'ordre des arguments compte ;
- distingue les types et distingue `-0` de `0` ; refuse `undefined`, `NaN`, les infinis, les objets et les fonctions ;
- retourne le résultat mémorisé pour une clé exacte ;
- retourne exactement la même Promise (même identité d'objet) lorsque deux appels identiques arrivent avant la fin du calcul ;
- supprime l'entrée en cas de rejet pour permettre une nouvelle tentative ;
- explique pourquoi un hash 32 bits seul n'est pas une clé exacte.

```js
function encodeArgument(value) {
  if (value === null) return ["null"];
  if (typeof value === "string") return ["string", value];
  if (typeof value === "boolean") return ["boolean", value];
  if (typeof value === "number" && Number.isFinite(value)) {
    return ["number", Object.is(value, -0) ? "-0" : String(value)];
  }
  throw new TypeError("Argument non pris en charge");
}

function memoize(fn) {
  if (typeof fn !== "function")
    throw new TypeError("fn doit être une fonction");
  const cache = new Map(); // clé exacte -> Promise en cours ou résolue
  return (...args) => {
    const key = JSON.stringify(args.map(encodeArgument));
    if (cache.has(key)) return cache.get(key);

    const pending = Promise.resolve().then(() => fn(...args));
    cache.set(key, pending);
    // Le rejet est retiré du cache. Le test d'identité évite d'effacer
    // une éventuelle entrée plus récente pour la même clé.
    pending.catch(() => {
      if (cache.get(key) === pending) cache.delete(key);
    });
    return pending; // pas de wrapper async : l'identité de Promise est conservée
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const computeFormula = memoize(async (compound, temperature, pressure) => {
  await sleep(2000); // simulation d'un calcul long
  return `${compound}_${temperature}_${pressure}_processed`;
});

await computeFormula("CH3", 200, 1.5); // calcule
await computeFormula("CH3", 200, 1.5); // réutilise le résultat, sans second calcul
```

## **Limites du modèle :** les entrées réussies restent en cache sans expiration. Pour un cache de production, définis une politique de durée, de taille/éviction et d'invalidation adaptée ; ce mini-exercice n'en implémente pas. Le traitement d'un rejet enlève l'entrée pour autoriser une nouvelle tentative.

## EXO 3 : DÉTECTION DE TAMPERING

Tu construis un journal chaîné pour Prison Break. Chaque empreinte couvre l'identifiant,
le contenu et l'empreinte du log précédent. T-Bag essaie de modifier les logs pour couvrir ses traces.

Implémente `verifyLogChain(logs, trustedFinalHash)` avec le contrat suivant :

- `logs` est un tableau non vide ordonné ; chaque entrée possède `id` (chaîne non vide ou entier sûr), `content` (chaîne), `prevHash` (hex SHA-256 ou `null` pour la première entrée) et `hash` (64 caractères hexadécimaux minuscules) ;
- le contenu canonique d'une entrée est exactement `JSON.stringify([id, content, prevHash])`, encodé en UTF-8 ; le hash est `SHA-256` de ces octets ;
- le premier `prevHash` vaut `null`, puis chaque entrée référence le hash recalculé de l'entrée précédente ;
- `trustedFinalHash` est une empreinte de référence obtenue et conservée hors du périmètre de modification de l'attaquant ;
- retourne `{ valid: boolean, tamperedAt: number | null }`, où `tamperedAt` est l'index de tableau (base 0) de la première incohérence locale détectée ; si tous les liens locaux sont cohérents mais que l'ancre finale diffère, retourne le dernier index et précise que cet index indique le point de comparaison, pas l'origine exacte de la modification.

Le test doit couvrir une chaîne valide, un contenu modifié sans recalcul du hash, un lien `prevHash` erroné et une chaîne entièrement recalculée avec une ancre externe restée inchangée. Une chaîne de hashes sans ancre de confiance ne prouve pas qu'elle n'a jamais été réécrite ; elle ne prouve pas non plus l'identité de l'auteur.

```js
import { createHash } from "node:crypto";

function digestLog(id, content, prevHash) {
  const canonical = JSON.stringify([id, content, prevHash]);
  return createHash("sha256").update(canonical, "utf8").digest("hex");
}

// Les valeurs ci-dessous sont à générer avec digestLog pendant les tests ;
// les chaînes "..." ne sont pas des empreintes valides.
const logs = [
  { id: 1, content: "T-Bag entered cell block D", hash: "...", prevHash: null },
  { id: 2, content: "T-Bag met with Abruzzi", hash: "...", prevHash: "..." },
];
```

C'est une chaîne de hachage simplifiée ; une blockchain ajoute d'autres règles de consensus, de validation et de résistance à la réécriture.

---

## RÉSUMÉ

Une fonction de hachage produit une sortie de taille fixe et déterministe. Les tables de hachage doivent gérer les collisions ; les hash cryptographiques cherchent à rendre les collisions utiles impraticables. Le coût et la sécurité d’une fonction dépendent de son usage : SHA-256 sert à l’intégrité, tandis qu’une fonction dédiée comme Argon2id sert au stockage des mots de passe. ECMAScript ne garantit pas un `Map` en O(1) ni une implémentation par table de hachage.
Les clés objet dans un `Map` se comparent par référence : sérialise-les si tu veux les comparer par valeur.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Transfert vérifiable : intégrité, cache et secrets

Un hash (empreinte calculée à partir d'une donnée) sert à comparer ou indexer, mais il ne prouve ni l'identité d'un utilisateur ni l'absence de collision. Pour une clé de cache, canonise d'abord l'entrée (ordre stable des propriétés, encodage et version de format). Un hash court peut encore entrer en collision : utilise-le au plus comme index de bucket, puis compare la représentation canonique complète avant de réutiliser une valeur. Pour un mot de passe, n'utilise jamais un SHA-256 simple : choisis une fonction de dérivation de mot de passe dédiée avec sel et coût adaptatif (Argon2id, scrypt ou bcrypt selon les contraintes et la politique du système).

**Exercice terrain.** Implémente une clé de cache pour une requête de rapport composée de `tenantId`, `from`, `to` et `filters`. Ajoute `schemaVersion` dans la matière hachée. Vérifie : même requête réordonnée → même clé ; tenant différent → clé différente ; période différente → clé différente ; changement de schéma → clé différente. N'inclus jamais le secret d'authentification dans une clé exposée.

**Vérification.** Tests unitaires sur les quatre propriétés ci-dessus ; test de collision de représentation (objets dont l'ordre des clés diffère) ; vérification que la fonction de clé ne journalise pas les données sensibles. Une empreinte n'est pas un contrôle d'accès : le service doit toujours vérifier le tenant et l'autorisation.

**Lien aval.** Ce mécanisme prépare les tables de hachage et le cache dans `06-DATA-STRUCTURES`, puis les index, contraintes et clés d'idempotence dans `05-MAITRISE/01-DATABASES` et les systèmes distribués.

<!-- AF-LESSON-PROFILE: math -->

## Repères de décision

- **Pourquoi :** Les maths rendent explicites la capacité, l'incertitude, le coût et les limites d'un algorithme. Elles évitent de décider au feeling quand le système grandit.
- **Quand l’utiliser / quand l’éviter :** Utilise la formule adaptée à la question (capacité, probabilité, hachage, logique ou combinatoire). Vérifie unités et hypothèses avant de coder ; ne sors pas une formule parce qu'elle a l'air savante.
- **Limites :** Un calcul exact sur des hypothèses fausses donne une réponse fausse. Les données réelles ont bruit, biais et limites d'échantillonnage ; une simulation n'est pas une mesure de terrain.

## Mécanisme : la version sans magie

Définis les variables, unités et domaine de validité ; dérive ou explique la formule ; calcule un cas de base, un cas limite et une sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Hashing basics : l'empreinte qui ne ment pas** se rattache à ce cas concret : Kintana doit dimensionner les créneaux, estimer une charge de notification ou choisir un seuil de contrôle sans masquer l'incertitude.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décision quantitative pour la capacité Kintana

> **Arc DBZ / Capsule Corp. :** les chiffres ne sont pas de la déco. Une formule mal choisie peut envoyer tout le système dans le mur, même si le code compile.

**Mission liée à « Hashing basics : l'empreinte qui ne ment pas » :** Choisis une question chiffrée cohérente avec la notion : capacité de créneaux, probabilité de collision, taille d'un espace de recherche ou seuil d'alerte. Formalise les hypothèses et compare deux scénarios.

**Livrable :** un calcul reproductible (tableur ou script), les unités, hypothèses, sensibilité et une décision argumentée.

**Critères d’acceptation :** les dimensions sont cohérentes ; le résultat est vérifié par un cas simple ; les hypothèses et l'incertitude sont exposées ; aucune précision injustifiée n'est revendiquée.

**Transfert obligatoire :** Change le volume ou le taux de base et observe si la décision reste la même. Explique le point où elle bascule.

## Références de sécurité et de langage

- [OWASP : Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) : choix et paramétrage des fonctions de stockage des mots de passe.
- [MDN : `Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) : comportement observable de l’API ; ne déduis pas une implémentation interne imposée par ECMAScript.
- [NIST : Secure Hash Standard (FIPS 180-4)](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) : famille SHA-2 et usages d’intégrité.
