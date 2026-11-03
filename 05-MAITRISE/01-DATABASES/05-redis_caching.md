---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Se souvenir vite pour ne pas redemander à chaque fois

Temps de lecture ~10 min

Imagine une lecture fréquente qui coûte 50 ms dans ton environnement de test. Si beaucoup d'utilisateurs demandent la même donnée, un cache peut éviter de recalculer ou relire la même chose à chaque fois. Ces 50 ms sont un exemple de scénario, pas une mesure universelle. Le cache (mémoire tampon) garde une copie temporaire ; au prochain accès, l'application peut la réutiliser.

Redis (Remote Dictionary Server) est un moteur clé-valeur en mémoire très utilisé pour ce type d'accès. Vu dans `02_nosql_basics` côté famille clé-valeur, ici on rentre dans le concret : comment l'utiliser sans se tirer une balle dans le pied.

Avantage possible : une lecture en mémoire évite certains coûts d'accès à une base durable. La latence observée dépend aussi du réseau, du client, de la sérialisation, de la charge, de la persistance et du déploiement.
Inconvénient : un cache est une copie temporaire, jamais la source de vérité métier.

---

## 1) LE PRINCIPE : CACHE-ASIDE

<!-- AF-DIAGRAM:cache -->

```text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```

Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.

Le pattern le plus courant : ton appli vérifie le cache avant d'aller en DB.

```text
REQUÊTE arrive
  |
  v
Cache contient la donnée ?
  |
  OUI ---------> retourne direct (cache HIT, rapide)
  |
  NON
  |
  v
Va chercher en DB (cache MISS)
  |
  v
Stocke le résultat dans le cache
  |
  v
Retourne la donnée
```

```js
async function getMission(id) {
  const cacheKey = `mission:${id}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached); // cache HIT, pas de requête DB du tout
  }

  const mission = await db.query("SELECT * FROM missions WHERE id = $1", [id]);
  await redis.set(cacheKey, JSON.stringify(mission), "EX", 3600); // TTL 1h
  return mission;
}
```

Le pourquoi : la première requête paie le coût DB, toutes les suivantes (pendant la durée du cache) sont quasi gratuites. Sur une mission consultée 50 000 fois par jour, tu passes de 50 000 requêtes DB à potentiellement 1 par heure.

---

## 2) TTL : LE CACHE QUI S'AUTODÉTRUIT (ET C'EST VOULU)

TTL (time to live : durée de vie) définit combien de temps une clé reste valide avant expiration automatique.

```js
await redis.set("session:abc123", data, "EX", 3600); // expire en 1h
await redis.set("cache:ranking", json, "EX", 60); // expire en 1 minute
await redis.set("otp:ninja:42", "482913", "EX", 300); // code OTP, expire en 5 min
```

Le pourquoi : sans TTL, une clé reste en RAM pour toujours, même si la donnée sous-jacente a changé en DB depuis longtemps. Tu finis par servir des données complètement obsolètes (stale data) à l'infini, ou par saturer la RAM avec des clés mortes que personne ne nettoie.

```text
SANS TTL :
clé créée --> reste en RAM pour toujours --> RAM se remplit --> serveur Redis sature

AVEC TTL :
clé créée --> expire automatiquement --> RAM se libère --> cycle de vie sain
```

Le risque réel : un TTL trop long sur une donnée qui change souvent (classement du Ballon d'Or en direct, niveau de danger d'une zone) donne des informations périmées à quelqu'un qui prend une décision critique. Un TTL trop court annule l'intérêt du cache. Le bon TTL dépend de la fréquence de changement réelle de la donnée, pas d'un chiffre arbitraire copié d'un tuto.

---

## 3) INVALIDATION : LE VRAI PROBLÈME DIFFICILE DU CACHE

Il y a une blague connue chez les devs : "il y a deux choses difficiles en informatique : le cache invalidation, le nommage des variables, et les erreurs off-by-one." La blague marche parce que c'est vrai.

```js
// La mission change de statut en DB
await db.query("UPDATE missions SET status = $1 WHERE id = $2", [
  "completed",
  missionId,
]);

// Si tu oublies ÇA, le cache sert encore l'ancien statut jusqu'à expiration du TTL
await redis.del(`mission:${missionId}`); // invalide le cache immédiatement
```

```text
SANS invalidation à l'écriture :
DB commit réussi --> suppression Redis échoue --> l'ancienne valeur peut rester servie jusqu'à correction/expiration

APRÈS commit + invalidation confirmée :
DB mise à jour --> clé cache supprimée --> prochaine lecture recharge la valeur depuis la source
```

Le risque réel (exemple qui casse) : un ninja accepte une mission marquée "disponible" dans le cache, alors qu'elle vient d'être assignée à quelqu'un d'autre en DB depuis 20 minutes. Deux ninjas sur la même mission : conflit, chaos, ticket support. La règle d'or : définis précisément quand invalider ou mettre à jour le cache. Une transaction SQL et une commande Redis ne forment pas automatiquement une transaction distribuée atomique. Si l'invalidation doit survivre à une panne entre les deux, utilise un mécanisme fiable (par exemple outbox + worker idempotent, version de donnée ou stratégie de TTL borné) et teste le scénario où le processus tombe après le commit SQL.

---

## 4) STRUCTURES REDIS : PAS QUE DES STRINGS

Redis n'est pas qu'un dictionnaire clé/string. Il a des structures natives qui évitent de réinventer la roue en JS.

```js
// String : la base
await redis.set("ninja:1:name", "Kakashi");

// Hash : un objet avec plusieurs champs, sans tout sérialiser en JSON
await redis.hset("ninja:1", {
  name: "Kakashi",
  rank: "Jonin",
  village: "Konoha",
});
await redis.hget("ninja:1", "rank");

// List : une file ou une pile (vu dans 02-CONSTRUCTION/06-DATA-STRUCTURES/03_stack et 04_queue)
await redis.lpush(
  "queue:missions",
  JSON.stringify({ id: 99, type: "infiltration" }),
);
await redis.rpop("queue:missions");

// Set : des valeurs uniques, opérations d'ensemble natives
await redis.sadd("online:ninjas", "ninja:1", "ninja:2");
await redis.sismember("online:ninjas", "ninja:1"); // true

// Sorted Set : comme un Set mais avec un score, parfait pour un classement
await redis.zadd("ninja:ranking", 1500, "kakashi");
await redis.zadd("ninja:ranking", 2200, "naruto");
await redis.zrevrange("ninja:ranking", 0, 9); // top 10 des ninjas
```

Le pourquoi : utiliser la bonne structure native évite de tout faire en JSON stringifié (coûteux à parser/sérialiser à chaque accès) et profite d'opérations atomiques (qui s'exécutent sans interruption possible) déjà optimisées par Redis lui-même.

---

## 5) STRATÉGIES DE CACHE : PAS QUE CACHE-ASIDE

```text
CACHE-ASIDE (lazy loading)
 --> l'appli vérifie le cache, sinon va en DB et remplit le cache
 --> simple, le cache ne contient que ce qui a vraiment été demandé

WRITE-THROUGH
 --> le chemin d'écriture met à jour la source durable puis le cache selon un ordre défini
 --> réduit la fenêtre de données périmées si les erreurs partielles sont traitées ; ne garantit pas à lui seul une atomicité DB + Redis

WRITE-BEHIND (write-back)
 --> l'écriture est acceptée dans le cache puis répercutée vers la source durable plus tard
 --> risque de perte ou de retard si le cache, la file ou le worker tombe ; à réserver aux données reconstructibles ou aux pertes explicitement acceptées et contrôlées

STALE-WHILE-REVALIDATE (vu aussi dans 02-CONSTRUCTION/18-WEB-CONCEPTS/04_caching_strategies)
 --> sert la version en cache MÊME périmée, tout en rafraîchissant en arrière-plan
 --> le shinobi n'attend jamais, au prix d'une fraîcheur légèrement décalée
```

Le quand : cache-aside est souvent le point de départ le plus simple. Un write-through peut réduire la fenêtre de fraîcheur, à condition de gérer les écritures partielles. Un write-behind exige une file durable, des reprises idempotentes et une politique de perte explicite ; ne l'utilise pas pour une donnée métier qui ne peut pas être perdue.

---

## 6) CE QUI CASSE (MAIS FUN) : LE CACHE STAMPEDE

```js
// exemple minimal : ça marche tranquille en dev
async function getNinjaRanking() {
  const cached = await redis.get("ninja:ranking:full");
  if (cached) return JSON.parse(cached);
  const ranking = await computeExpensiveRanking(); // coûte 2 secondes à générer
  await redis.set("ninja:ranking:full", JSON.stringify(ranking), "EX", 60);
  return ranking;
}

// exemple réaliste : 10 000 shinobis arrivent sur le tableau de classement
// pile quand le cache expire après le résultat d'un tournoi

// exemple qui casse (cache stampede / thundering herd) :
// les 10 000 requêtes voient TOUTES "cache vide" en même temps
// les 10 000 lancent TOUTES computeExpensiveRanking() en parallèle
// ton serveur prend 10 000 calculs de 2 secondes d'un coup --> il tombe
// c'est le Bijuu Mode déclenché par 10 000 Naruto en même temps : personne ne survit
```

La correction : un verrou (lock) qui dit "une seule requête recalcule, les autres attendent ou reçoivent l'ancienne version" :

```js
async function getNinjaRanking() {
  const cached = await redis.get("ninja:ranking:full");
  if (cached) return JSON.parse(cached);

  const lockAcquired = await redis.set("ranking:lock", "1", "NX", "EX", 5); // NX = only if not exists
  if (!lockAcquired) {
    // une autre requête recalcule déjà : on attend un peu et on relit le cache
    await sleep(100);
    return JSON.parse((await redis.get("ninja:ranking:full")) ?? "[]");
  }

  const ranking = await computeExpensiveRanking();
  await redis.set("ninja:ranking:full", JSON.stringify(ranking), "EX", 60);
  await redis.del("ranking:lock");
  return ranking;
}
```

---

## TIPS D'ÉVOLUTION TECHNIQUE

Avant, beaucoup de devs géraient leur "cache" à la main avec un simple objet JS en mémoire (`const cache = {}`) dans le process Node. Ça marche en local, sur un seul serveur. Maintenant, dès que t'as plusieurs instances de ton serveur (scalabilité horizontale, vue dans `05-MAITRISE/02-SCALABILITY`), un cache en mémoire locale devient incohérent entre instances : chaque serveur a SA version du cache. Redis externalisé résout ça : toutes les instances partagent le même cache, peu importe combien de serveurs tournent.

---

## EXERCICES

**EXO 1 : Calibrer le TTL**
Pour chacune de ces données, propose un TTL et justifie : (a) le profil public d'un ninja (rang, village, spécialité), (b) le nombre de missions disponibles dans un secteur donné, (c) un token de confirmation d'identité shinobi, (d) le classement en direct du tournoi Chunin mis à jour après chaque combat. (15 minutes)

**EXO 2 : Trouve le bug d'invalidation**
Un système cache le nombre de victoires d'un ninja avec un TTL de 24h. Le ninja gagne 5 combats consécutifs lors d'un tournoi surprise. Décris le problème UX exact que ça crée pendant les 24h, et propose 2 corrections différentes (pas juste "réduire le TTL"). (15 minutes)

**EXO 3 : Simuler le stampede**
Reprends l'exemple du classement avec lock du point 6. Explique ce qui se passerait si tu retirais le `EX` (expiration) du lock lui-même, et pourquoi c'est dangereux si le process qui détient le lock crash avant de faire `redis.del`. (10 minutes)

---

## RÉSUMÉ

Redis cache pour éviter de recalculer ou re-requêter ce qui a déjà une réponse connue, en l'échange contre une fraîcheur relative qu'on contrôle via le TTL. Le vrai défi n'est jamais "comment je cache", c'est "comment j'invalide proprement" et "comment j'évite que 10 000 requêtes recalculent en même temps quand le cache expire". Un cache sans stratégie d'invalidation claire n'est pas un cache, c'est une source de bugs à retardement.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

### Vérification observable : critères de réussite

Écris une assertion sur l’invariant de « Se souvenir vite pour ne pas redemander à chaque fois », puis teste cas normal, concurrence/duplicat, interruption et reprise. Fournis la requête ou la trace et explique ce que le test ne démontre pas.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: redis -->

## Repères de décision

- **Pourquoi :** Un cache réduit certains coûts de lecture ou fournit des primitives rapides, mais introduit une copie temporaire qui peut devenir incohérente.
- **Quand l’utiliser / quand l’éviter :** Utilise un cache pour des lectures répétées et mesurées ou une primitive adaptée (rate limit, coordination courte). Ne mets pas dans Redis une donnée de vérité sans stratégie de persistance et de reprise.
- **Limites :** TTL seul ne garantit pas la cohérence ; invalidation et cache stampede restent des risques. Redis n'est pas automatiquement une base primaire ni un verrou distribué sûr sans analyser son modèle.

## Mécanisme : la version sans magie

Choisis clé, valeur, TTL et stratégie d'invalidation ; précise le comportement en cache miss, panne, stale data et déploiement ; mesure hit ratio et coût.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Se souvenir vite pour ne pas redemander à chaque fois** se rattache à ce cas concret : Kintana peut mettre en cache des listes de disponibilités, mais une réservation doit revalider la capacité dans la base transactionnelle au moment de l'écriture.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Cache des disponibilités sans casser les réservations

> **Arc DBZ / Capsule Corp. :** Redis peut accélérer le vaisseau, mais un turbo mal invalidé sert des coordonnées périmées avec beaucoup de confiance.

**Mission liée à « Se souvenir vite pour ne pas redemander à chaque fois » :** Ajoute un cache-aside pour la lecture des créneaux Kintana. Définis TTL et invalidation après réservation, puis prouve qu'une ancienne valeur en cache ne permet jamais de réserver une capacité épuisée.

**Livrable :** adaptateur de cache, stratégie de clé/TTL, test d'invalidation, test de panne Redis et métriques hit/miss simulées.

**Critères d’acceptation :** la base reste source de vérité ; l'écriture revalide la capacité ; cache miss/panne a un fallback défini ; les métriques sont des mesures LAB si Redis n'est pas déployé.

**Transfert obligatoire :** Deux instances écrivent en même temps et Redis devient indisponible. Décris ce qui reste correct et quelles performances tu acceptes de perdre.
