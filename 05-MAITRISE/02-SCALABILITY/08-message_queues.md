---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Découpler pour ne pas tout bloquer en chaîne

Temps de lecture ~11 min

Rick Grimes enregistre un nouveau survivant au camp : le serveur doit sauvegarder le profil, générer une carte d'accès, notifier le sniper pour la garde, et envoyer une alerte radio au conseil. Si tu fais tout ça dans la même requête HTTP, le survivant attend 45 secondes devant un écran de chargement pendant que des Walkers approchent, et si la génération de carte échoue, tout échoue avec elle.

Une message queue (file de messages) dit : enregistre le profil tout de suite, mets le reste dans une file, un autre processus s'en occupe quand il peut. Rick a sa confirmation en 200ms.

Pourquoi ça compte : c'est la différence entre une appli qui répond en 200ms et une appli qui timeout, pour exactement la même quantité de travail au final.

Avantage : découplage (producteur et consommateur n'ont pas besoin d'être synchronisés), résilience (un crash du worker ne perd pas la tâche si bien configuré).
Inconvénient : complexité ajoutée, cohérence éventuelle (vu dans `05-MAITRISE/01-DATABASES/02_nosql_basics`) au lieu d'immédiate.

---

## 1) LE PRINCIPE : PRODUCTEUR, FILE, CONSOMMATEUR

```text
PRODUCTEUR (ton serveur API)
  |
  v
 pousse un message dans la FILE
  |
  v
FILE (la queue elle-même, qui stocke les messages en attente)
  |
  v
 un ou plusieurs CONSOMMATEURS (workers) lisent et traitent
```

```js
// Producteur : ton endpoint d'upload, ultra rapide
app.post("/upload", async (req, res) => {
  const fileId = await saveFile(req.file); // rapide : juste sauvegarder le fichier brut

  await queue.push("video-processing", { fileId, userId: req.user.id });
  // on pousse la tâche lourde dans la file, et on répond TOUT DE SUITE

  res.json({ status: "uploaded", message: "Traitement en cours" });
});

// Consommateur : un process séparé, qui tourne en continu
async function worker() {
  while (true) {
    const job = await queue.pop("video-processing");
    if (job) {
      await generateThumbnail(job.fileId);
      await compressVideo(job.fileId);
      await notifyUser(job.userId);
    }
  }
}
```

Ce premier extrait est un schéma de découplage, pas un worker prêt pour la production : il omet volontairement le contrat broker-specific d'ACK/NACK, détaillé plus bas. Il suppose aussi que `pop()` attend un message au lieu de boucler à vide. Ne suppose pas que `pop()` confirme ou supprime un message de la même façon dans tous les brokers. Autre frontière importante : si `saveFile()` réussit puis `queue.push()` échoue, le fichier peut rester sans tâche associée. En production, utilise un outbox/état durable ou une compensation et documente ce cas de double écriture.

Le pourquoi : l'utilisateur reçoit une réponse en quelques centaines de millisecondes au lieu d'attendre 45 secondes. Le traitement lourd continue en arrière-plan, et l'utilisateur peut être notifié plus tard (websocket vu dans `04-EPREUVE/03-REALTIME`, email, ou juste un statut qui change quand il rafraîchit).

---

## 2) DÉCOUPLAGE : LE PRODUCTEUR NE CONNAÎT PAS LE CONSOMMATEUR

```text
SANS queue (couplage direct) :
API appelle DIRECTEMENT generateThumbnail(), compressVideo(), notifyUser()
--> si compressVideo() crash, TOUTE la requête échoue, même la partie qui marchait
--> l'API doit attendre la fin de TOUT avant de répondre

AVEC queue (découplé) :
API pousse juste un message, répond immédiatement
--> le worker peut crasher et redémarrer SANS affecter l'API
--> tu peux ajouter/retirer des workers sans toucher au code de l'API
```

Le pourquoi c'est puissant : producteur et consommateur évoluent indépendamment. Tu peux changer la logique de traitement vidéo (le consommateur) sans redéployer l'API (le producteur), et vice versa. C'est aussi une porte vers le scale out ciblé (vu dans `02_horizontal_vs_vertical`) : si le traitement vidéo est le goulot d'étranglement, tu ajoutes des workers, pas des serveurs API.

```text
Scale ciblé grâce au découplage :
API (légère, rapide) --> 2 instances suffisent
Workers (lourds, lents) --> 10 instances pour absorber la charge de traitement
```

---

## 3) AT-LEAST-ONCE VS EXACTLY-ONCE : LA GARANTIE QUI CHANGE TOUT

```text
AT-MOST-ONCE (sémantique de livraison)
 --> le broker ne livre pas le même message plus d'une fois dans ce contrat,
     mais il peut être perdu si l'échec survient au mauvais moment
 --> à réserver aux cas où une perte est acceptable

AT-LEAST-ONCE (sémantique de livraison)
 --> le broker peut redélivrer jusqu'à obtenir l'ACK, selon sa rétention,
     ses règles de retry et sa configuration ; le même message peut arriver plusieurs fois
 --> cela ne garantit PAS que le traitement métier réussira : il peut échouer,
     atteindre une limite, expirer ou finir en DLQ

EXACTLY-ONCE / effet unique dans une frontière nommée
 --> certains systèmes coordonnent traitement et commit dans un périmètre précis
 --> ne garantit pas à lui seul un effet unique dans une base ou un service externe
```

Le risque réel avec at-least-once (un mode fréquent, selon la configuration du broker) : si ton worker traite un message, mais crash juste APRÈS le traitement et AVANT de confirmer ("ack", acknowledgment) à la queue qu'il a fini, la queue va renvoyer le même message à un autre worker, qui va le retraiter.

```js
// exemple qui casse avec at-least-once mal géré
async function distribuerRations(job) {
  await preleverDuStock(job.quantite); // étape 1 : retire les rations du stock du camp
  // CRASH ICI, avant de pouvoir confirmer à la queue
  await queue.ack(job.id); // jamais atteint
}
// La queue, n'ayant pas reçu l'ack, renvoie le message
// Un autre worker reprend le job depuis le début --> double prélèvement du stock
```

La correction : rendre l'effet métier idempotent ou dédupliquer atomiquement l'identifiant
du message avec l'effet persistant. Rejouer la même clé dans le périmètre garanti doit
produire le même effet métier qu'une seule exécution. Une opération externe non coordonnée
(paiement, e-mail, API tierce) exige une clé acceptée par le fournisseur, un outbox/inbox
ou une procédure de rapprochement ; un ACK de queue ne la rend pas « exactly-once ».

```text
Consommateur at-least-once
        │
        ▼
BEGIN transaction DB
        │
        ├─ INSERT idempotency_key avec contrainte UNIQUE
        │      ├─ déjà présent : aucun effet métier à rejouer
        │      └─ nouvel identifiant : appliquer l'effet métier
        │
        ├─ vérifier que le stock suffit et l'actualiser
        └─ COMMIT transaction DB
                │
                ▼
          ACK du message
```

Exemple de pseudo-code transactionnel (adapter l'API et les erreurs au moteur choisi) :

```js
await db.transaction(async (tx) => {
  const inserted = await tx.query(
    `INSERT INTO processed_messages (idempotency_key) VALUES ($1)
     ON CONFLICT (idempotency_key) DO NOTHING RETURNING idempotency_key`,
    [job.idempotencyKey],
  );

  if (inserted.rowCount === 1) {
    const updated = await tx.query(
      `UPDATE stock SET quantity = quantity - $1
       WHERE item_id = $2 AND quantity >= $1`,
      [job.quantite, job.itemId],
    );
    if (updated.rowCount !== 1)
      throw new Error("stock insuffisant ou article absent");
  }
  // Si la clé existait déjà, aucun effet métier n'est rejoué. La transaction commit ensuite.
}); // Le commit doit être confirmé avant l'ACK.
await queue.ack(job.id);
```

La table `processed_messages` doit avoir une contrainte `UNIQUE` sur `idempotency_key`, et l'enregistrement de la clé doit appartenir à la même transaction que l'effet métier. L'exemple est un pseudo-code : vérifie que `db.transaction` ne retourne qu'après un commit confirmé et que les erreurs annulent la transaction.

Le point déterminant n'est pas le `SELECT` préalable : deux workers peuvent lire simultanément « absent ». La contrainte `UNIQUE` et la transaction doivent rendre atomiques l'enregistrement de la clé et l'effet métier. Si l'effet externe n'est pas dans la même base (email, fournisseur, paiement), la transaction locale ne le rend pas atomique ; il faut un contrat d'idempotence côté destinataire, un outbox/inbox ou une réconciliation documentée. Un crash après le commit mais avant l'ACK provoque un rejeu sans second effet métier si la clé est conservée durablement.

---

## 4) DEAD LETTER QUEUE : OÙ VONT LES MESSAGES QUI ÉCHOUENT TOUJOURS

```text
Message échoue --> retry automatique --> échoue encore --> retry --> échoue encore
                                    |
                                    v
                             après N tentatives :
                             DEAD LETTER QUEUE
                             (file d'attente des morts)
```

Le pourquoi : sans ça, un message qui échoue systématiquement (genre une donnée corrompue qui fait crasher le worker à chaque fois) tourne en boucle de retry infinie, consommant des ressources pour rien, et masquant le fait qu'il y a un vrai problème à régler.

```js
// PSEUDO-CODE : queue.ack() et deadLetterQueue.putOnce()/has() représentent
// des contrats à adapter au broker choisi, pas des méthodes universelles.
// putOnce(job.id, payload) doit persister durablement une entrée unique par job.id.
// has(job.id) lit le registre durable utilisé après un crash DLQ / avant ACK.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processWithRetry(
  job,
  {
    queue,
    deadLetterQueue,
    processJob,
    maxAttempts = 3,
    shouldRetry = () => false,
    baseDelayMs = 250,
  } = {},
) {
  if (!job?.id) throw new TypeError("job.id est requis");
  if (!queue || typeof queue.ack !== "function")
    throw new TypeError("queue.ack requis");
  if (
    !deadLetterQueue ||
    typeof deadLetterQueue.putOnce !== "function" ||
    typeof deadLetterQueue.has !== "function"
  ) {
    throw new TypeError(
      "deadLetterQueue.putOnce et deadLetterQueue.has requis",
    );
  }
  if (typeof processJob !== "function" || typeof shouldRetry !== "function") {
    throw new TypeError("processJob et shouldRetry doivent être des fonctions");
  }
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts doit être un entier >= 1");
  }
  if (!Number.isFinite(baseDelayMs) || baseDelayMs < 0) {
    throw new RangeError("baseDelayMs doit être un nombre fini >= 0");
  }

  // Récupération après un crash survenu entre l'écriture durable en DLQ et l'ACK.
  // `has` doit lire un registre durable dédupliqué par job.id.
  const dejaEnDlq = await deadLetterQueue.has(job.id);
  if (typeof dejaEnDlq !== "boolean") {
    throw new TypeError("deadLetterQueue.has doit retourner un booléen");
  }
  if (dejaEnDlq) {
    await queue.ack(job.id);
    return { status: "dead-letter-already-recorded" };
  }

  let processingError = null;
  let hasProcessingError = false; // ne pas utiliser la truthiness de la valeur throw comme indicateur
  let attemptsUsed = 0;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    attemptsUsed = attempt;
    try {
      await processJob(job);
      processingError = null;
      hasProcessingError = false;
      break;
    } catch (error) {
      // JavaScript permet techniquement `throw null`, `throw 0`, etc. Normalise
      // la valeur à la frontière pour que la DLQ conserve un diagnostic exploitable.
      processingError =
        error instanceof Error
          ? error
          : new Error(
              `processJob a rejeté une valeur non-Error : ${String(error)}`,
              { cause: error },
            );
      hasProcessingError = true;
      if (attempt === maxAttempts) break;
      const decision = shouldRetry(error);
      if (typeof decision !== "boolean") {
        throw new TypeError(
          "shouldRetry doit retourner un booléen de façon synchrone",
        );
      }
      if (!decision) break;
      const plafond = Math.min(30_000, baseDelayMs * 2 ** (attempt - 1));
      await sleep(Math.random() * plafond); // full jitter : [0, plafond]
    }
  }

  if (hasProcessingError) {
    // Si l'écriture durable en DLQ échoue, on ne ACK pas : le broker peut redélivrer.
    await deadLetterQueue.putOnce(job.id, {
      job,
      attempts: attemptsUsed,
      errorCode: processingError.code ?? processingError.name,
    });
    // L'ACK arrive après la persistance DLQ ; si l'ACK échoue, putOnce doit dédupliquer.
    await queue.ack(job.id);
    return { status: "dead-letter" };
  }

  // Hors du bloc catch : une panne d'ACK ne doit pas être confondue avec
  // un échec de processJob et déclencher un second traitement dans cette boucle.
  await queue.ack(job.id);
  return { status: "acknowledged" };
}

const resultat = await processWithRetry(job, {
  queue,
  deadLetterQueue,
  processJob,
  maxAttempts: 4,
  shouldRetry: (error) => error.code === "ETIMEDOUT" || error.status === 503,
});
```

`shouldRetry` ne doit autoriser que les erreurs temporaires. `processJob` doit être idempotent
ou dédupliquer le message atomiquement avant tout rejeu. En particulier, si le traitement réussit
mais que l'ACK échoue, le broker peut redélivrer le message : l'effet métier ne doit pas être
appliqué une deuxième fois. Si l'écriture dans la DLQ réussit mais que l'ACK échoue, `putOnce`
doit elle aussi être dédupliquée par `job.id`. Dans un vrai broker, utilise ses mécanismes
réels d'ACK, de visibilité, de redelivery et de dead-letter ; ce pseudo-code ne remplace pas
leur documentation. L'alerte opérateur doit partir d'un événement durable ou d'une voie séparée,
pas devenir un nouvel effet bloquant au milieu de l'ACK.

Le vrai intérêt : la dead letter queue devient un endroit que l'équipe surveille (vu dans `03-PILOTAGE/05-OBSERVABILITY`), pour comprendre pourquoi certains messages échouent systématiquement, sans que ça bloque le traitement normal des autres messages.

---

## 5) ORDRE DES MESSAGES : PAS TOUJOURS GARANTI, ET C'EST IMPORTANT DE LE SAVOIR

```text
Plusieurs workers en parallèle traitent la MÊME file :

Message 1 (Rick ordonne : fortifier le mur nord) --> Worker A, prend 2 secondes
Message 2 (Rick ordonne : annuler la fortification) --> Worker B, prend 0.1 seconde

Si l'ordre n'est pas garanti et que les workers tournent en parallèle :
Worker B peut FINIR avant Worker A
--> la fortification est "annulée" avant même d'avoir été "lancée"
```

Le risque réel : si l'ordre des opérations a un sens métier (fortifier avant annuler, poster une sentinelle avant la relever), tu dois soit garantir l'ordre (souvent en sacrifiant le parallélisme pour CE type de message précis, par exemple en routant tous les ordres d'un même leader vers le même worker), soit concevoir chaque traitement pour être robuste face au désordre (vérifier l'état actuel avant d'agir, plutôt que de supposer un ordre).

---

## 6) CE QUI CASSE (MAIS FUN) : LA FILE QUI GROSSIT SANS FIN

```js
// exemple minimal : ça marche, 1 producteur, 1 consommateur, débit équilibré

// exemple réaliste : un pic de trafic (lancement produit) fait exploser
// le nombre de messages poussés dans la file, alors que le nombre de workers
// reste fixe

// exemple qui casse : la file grossit plus vite qu'elle ne se vide
// (producteur : 1000 messages/seconde, consommateur : 100 messages/seconde traités)
// Résultat : la file accumule 900 messages en attente PAR SECONDE
// Après 10 minutes : 540 000 messages en attente, certains users attendent
// des heures pour qu'une simple notification leur soit envoyée
```

La correction : surveiller la profondeur de la file (queue depth, vu dans `03-PILOTAGE/05-OBSERVABILITY/04_metrics_alerting`) comme une métrique critique, et scaler le nombre de workers dynamiquement selon cette profondeur, pas selon une intuition. Un système de queue sans cette surveillance peut sembler fonctionner parfaitement... jusqu'à ce que tu réalises que la file contient 6 heures de retard accumulé.

---

## 7) KAFKA CONCRÈTEMENT : LE LOG QU'ON PEUT REJOUER

Une queue classique, c'est une boîte aux lettres : le facteur dépose, tu relèves, la lettre disparaît. Kafka, c'est le journal de bord du camp : chaque événement est écrit à la suite, à l'encre, et personne ne le gomme quand quelqu'un l'a lu. Deux lecteurs différents peuvent lire la même page, chacun à son rythme, et n'importe qui peut revenir trois pages en arrière.

C'est ça, un log distribué (journal ordonné et répliqué sur plusieurs machines) : le message n'est pas consommé au sens "supprimé", il est lu à une position.

```text
QUEUE CLASSIQUE            LOG (Kafka & co)
[m1][m2][m3]               offset:  0   1   2   3   4
 worker pop m1              log:   [m1][m2][m3][m4][m5]   <- rien n'est effacé
 --> m1 disparaît            groupe A lit à l'offset 3
                             groupe B lit à l'offset 1  (indépendant de A)
```

### Partition : découper le journal pour aller plus vite

Un seul journal = un seul rythme d'écriture. Kafka découpe donc un **topic** (un sujet, genre `alertes-perimetre`) en **partitions** : plusieurs journaux parallèles pour le même sujet.

Chaque message part dans une partition choisie par sa **clé de partition** (souvent l'identifiant de l'entité concernée). Conséquence directe, et c'est la partie qui compte : l'ordre n'est garanti **qu'à l'intérieur d'une partition**. Tous les événements du secteur nord dans la même partition = ordre garanti pour le secteur nord. Entre secteur nord et secteur sud, aucun ordre global : et tu n'en as pas besoin.

```text
topic "alertes-perimetre"
├── partition 0  [nord-1][nord-2][nord-3]      <- clé "nord", ordre garanti
├── partition 1  [sud-1][sud-2]                <- clé "sud", ordre garanti
└── partition 2  [est-1][est-2][est-3][est-4]  <- clé "est", ordre garanti
```

C'est la même tension que la section 5 : le parallélisme s'achète en renonçant à un ordre total. Kafka ne supprime pas le compromis, il te laisse choisir sa granularité avec la clé.

### Consumer group : qui lit quoi, sans se marcher dessus

Un **consumer group** (groupe de consommateurs, identifié par un nom) est un ensemble de workers qui se partagent le travail d'un topic. La règle tient en une phrase : chaque partition est assignée à **un seul** membre du groupe à un instant donné.

```text
topic à 3 partitions

groupe "traitement-alertes" avec 2 workers :
  worker A --> partitions 0 et 1
  worker B --> partition 2

on ajoute un worker C (rééquilibrage automatique) :
  A --> p0     B --> p1     C --> p2

on ajoute un worker D :
  D --> rien du tout. 3 partitions, 4 workers : le 4e attend.
```

Deux conséquences très concrètes :

- Le nombre de partitions est ton **plafond de parallélisme** pour un groupe. Ajouter des workers au-delà ne sert à rien : c'est la première chose à vérifier quand "on a scalé les workers et ça n'accélère pas".
- Deux groupes **différents** sur le même topic lisent tout, chacun de son côté. Le groupe "notifications" et le groupe "analytics" voient les mêmes événements sans se gêner : un producteur, plusieurs usages, zéro duplication de la file.

### Offset : la position, pas la suppression

L'**offset** est le numéro de ligne où en est un groupe dans une partition. C'est une donnée que le groupe **commit** (enregistre) : "j'ai traité jusqu'à la ligne 4 812".

```js
// La mécanique, dépouillée de toute bibliothèque
async function consommer(partition, groupe) {
  let offset = await lireOffsetCommit(groupe, partition.id); // reprise où on s'était arrêté

  while (offset < partition.log.length) {
    const message = partition.log[offset]; // on LIT à une position, on ne retire rien
    await traiter(message);
    offset++;
    await commitOffset(groupe, partition.id, offset); // on avance le curseur
  }
}
```

Ce que ça change : le crash d'un worker ne perd rien, il repart au dernier offset commité, et les messages déjà traités depuis sont **rejoués**. On retombe pile sur la section 3 : at-least-once, donc idempotence obligatoire. Le log ne te dispense de rien, il rend juste la reprise possible.

### Le replay : la vraie raison d'y venir

Comme rien n'est effacé avant l'expiration de la rétention (durée de conservation configurée, souvent quelques jours), tu peux remettre le curseur d'un groupe à l'offset 0 et **tout relire**. Un bug dans le calcul des scores de risque depuis mardi ? Tu corriges le code, tu remets le groupe au mardi, tu relis. Avec une queue classique, les messages consommés sont partis : tu n'as plus rien à relire, il faut reconstituer à la main depuis la base.

C'est aussi ce qui permet de brancher un nouveau service sur un historique existant : le groupe "analytics" créé aujourd'hui peut lire les événements de la semaine dernière.

Le prix, parce qu'il y en a un : tu stockes tout pendant la rétention (disque, coût), tu gères des partitions et un rééquilibrage qui n'existent pas dans une queue simple, et un replay mal réfléchi renvoie des e-mails déjà envoyés. Un système à faible volume avec des tâches jetables n'a rien à gagner ici : `05-niveau-3-backend.md` de TECH-ILA traite en détail le moment où ce choix devient légitime.

### Ce qu'il faut retenir même quand Kafka aura disparu

Partitions, groupes, offsets, replay : ce ne sont pas des fonctionnalités d'un produit, c'est le modèle "log distribué". Pulsar, Redpanda, Kinesis reprennent les mêmes idées avec d'autres noms. La commande d'installation, elle, aura changé avant que tu aies fini de la retenir.

---

## TIPS D'ÉVOLUTION TECHNIQUE

Avant, beaucoup d'équipes géraient des tâches asynchrones avec des tables SQL dédiées ("table jobs avec un statut pending/done") interrogées en boucle (polling). Ça marche à petite échelle, mais ça sature vite la DB en lectures inutiles. Maintenant, des systèmes dédiés (RabbitMQ, SQS, Kafka pour des volumes massifs) gèrent nativement le push/pop efficace, les retries, et les dead letter queues, sans réinventer ça à la main sur une table SQL. Le switch existe pour la performance et la fiabilité native, pas par mode : une table SQL en polling reste suffisante pour un petit projet avec peu de volume.

---

## EXERCICES

**EXO 1 : Découpe l'inscription au Camp des Survivants**
Rick Grimes met en place un système d'inscription pour le camp : créer le profil du survivant en DB, envoyer une alerte radio au conseil de sécurité, générer une carte d'accès, et notifier le sniper pour l'affectation de garde. Identifie ce qui DOIT être synchrone (avant de confirmer l'inscription au survivant) et ce qui PEUT partir en file asynchrone. Justifie : une erreur sur quoi est inacceptable vs acceptable ? (15 minutes)

**EXO 2 : Rends la distribution de rations de Michonne idempotente**
Le réseau radio du camp est instable. Michonne soumet une distribution de rations pour un groupe de survivants, le serveur reçoit la requête, commence le prélèvement du stock, crash avant de répondre. Son client retente 3 fois. Sans idempotence, le stock est prélevé 4 fois. Reprends l'exemple `distribuerRations` de la section 3, écris ta propre version idempotente, puis compare. (15 minutes)

**EXO 3 : Diagnostique la file qui accumule les alertes**
Le camp de Rick reçoit les alertes de zombies avec 3 heures de retard depuis ce matin. Des survivants sont en danger parce que les notifications push n'arrivent plus. Décris les 3 premières choses à vérifier (métriques, logs) pour identifier si c'est un problème de producteur (capteurs), de file (broker), ou de consommateur (workers d'alerte). (15 minutes)

---

## RÉSUMÉ

Une message queue découple ce qui doit répondre vite de ce qui peut prendre son temps, en échange d'une cohérence éventuelle plutôt qu'immédiate. La garantie at-least-once (la plus courante) exige que tes traitements soient idempotents, sinon un simple crash de worker peut prélever deux fois le même stock. Une dead letter queue évite qu'un message cassé tourne en boucle infinie de retry, et surveiller la profondeur de la file est la seule façon de savoir si tes workers suivent vraiment le rythme du producteur.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Vérification observable : critères de réussite

Écris une assertion sur l’invariant de « Découpler pour ne pas tout bloquer en chaîne », puis teste cas normal, concurrence/duplicat, interruption et reprise. Fournis la requête ou la trace et explique ce que le test ne démontre pas.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Découpler pour ne pas tout bloquer en chaîne** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Concevoir une file avec livraison et backpressure explicites

**Mission liée à « Découpler pour ne pas tout bloquer en chaîne » :** Pour un événement Kintana, décris l’acceptation, l’acknowledgement, le retry, la déduplication et le traitement d’un message poison. Précise le comportement si le consommateur est plus lent que le producteur.

**Livrable :** Diagramme producteur/file/consommateur et politique de reprise.

**Critères d’acceptation :** La sémantique de livraison est nommée ; l’idempotence est au niveau métier ; la taille de file et le backpressure ont des limites.

**Transfert obligatoire :** Le consommateur reste indisponible : fixe un seuil d’alerte, une stratégie de quarantaine et un plan de rattrapage.
