---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 01_Sse_basics : le serveur qui parle en premier

Temps de lecture ~8 min

WebSocket c'est un tunnel bidirectionnel.
SSE (Server-Sent Events : événements envoyés par le serveur) c'est différent : le serveur parle, le client écoute.
Unidirectionnel. Plus simple. Et suffisant pour 80% des cas de temps réel.

Quand utiliser SSE au lieu de WebSocket :

- le client n'a pas besoin d'envoyer des données en continu
- tu veux profiter du HTTP natif (proxies, load balancers, tout ça marche sans config)
- tu veux la reconnexion automatique gratuite

Cas parfait pour SSE : notifications, feeds live, dashboards de score, logs en temps réel.

---

## 1) LE PROTOCOLE SSE : TROIS LIGNES C'EST TOUT

SSE utilise du HTTP/1.1 classique. La connexion reste ouverte.
Le serveur envoie des "events" dans un format texte ultra simple.

```text
data: {"type":"goal","team":"Barça","minute":34}\n\n
```

Les règles du format :

- chaque ligne commence par un préfixe : `data:`, `event:`, `id:`, ou `retry:`
- **deux sauts de ligne `\n\n` = fin d'un event** (une ligne seule ne suffit pas)
- plusieurs lignes `data:` dans un même event sont concatenées avec `\n`

```text
event: goal\n
data: {"team":"Barça","minute":34}\n
id: 42\n
\n
```

C'est tout. Pas de handshake custom, pas de format binaire. Du texte HTTP.

---

## 2) CÔTÉ SERVEUR : EXPRESS

```js
import express from "express";

const app = express();

// les clients SSE connectés:un Set pour les gérer proprement
const clients = new Set();

app.get("/events", (req, res) => {
  // headers obligatoires pour SSE
  res.setHeader("Content-Type", "text/event-stream"); // type MIME SSE
  res.setHeader("Cache-Control", "no-cache"); // pas de mise en cache
  res.setHeader("Connection", "keep-alive"); // connexion persistante

  // pour les proxies (intermédiaires réseau) qui bufferisent (stockent avant d'envoyer) les réponses
  res.flushHeaders();

  // enregistrer ce client
  clients.add(res);
  console.log(`Client SSE connecté : total : ${clients.size}`);

  // envoyer un event de confirmation de connexion
  res.write(`data: ${JSON.stringify({ type: "connected" })}\n\n`);

  // nettoyer quand le client se déconnecte
  req.on("close", () => {
    clients.delete(res);
    console.log(`Client SSE déconnecté : restants : ${clients.size}`);
  });
});

// fonction pour broadcaster un event à tous les clients SSE
function sendEvent(eventType, data, id = null) {
  const lines = [];
  if (id !== null) lines.push(`id: ${id}`);
  if (eventType !== "message") lines.push(`event: ${eventType}`); // 'message' est le type par défaut
  lines.push(`data: ${JSON.stringify(data)}`);
  lines.push(""); // ligne vide finale = \n\n quand joint avec \n

  const payload = lines.join("\n") + "\n";

  clients.forEach((client) => {
    client.write(payload);
  });
}

// simuler des events de match toutes les 5 secondes
setInterval(() => {
  sendEvent("match_update", {
    minute: Math.floor(Math.random() * 90),
    possession: { home: 55, away: 45 },
    xG: { home: 1.4, away: 0.8 },
  });
}, 5000);

app.listen(3000, () => console.log("SSE serveur actif sur port 3000"));
```

---

## 3) CÔTÉ CLIENT : EventSource

```js
// EventSource : l'API native du navigateur pour SSE
// le navigateur gère la reconnexion automatiquement:c'est la killer feature
const source = new EventSource("/events");

// event par défaut (type "message")
source.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Event reçu :", data);
});

// events typés:le type correspond au champ "event:" envoyé par le serveur
source.addEventListener("match_update", (event) => {
  const update = JSON.parse(event.data);
  console.log(
    `Minute ${update.minute} : possession home : ${update.possession.home}%`,
  );
});

source.addEventListener("goal", (event) => {
  const goal = JSON.parse(event.data);
  console.log(`GOAL ! ${goal.team} à la ${goal.minute}e minute`);
});

// connexion établie
source.addEventListener("open", () => {
  console.log("SSE connecté");
});

// erreur:EventSource retente automatiquement, pas besoin de gérer manuellement
source.addEventListener("error", (event) => {
  if (event.readyState === EventSource.CLOSED) {
    console.log("Connexion SSE fermée définitivement");
  } else {
    console.log("Erreur SSE : retry automatique en cours...");
    // le navigateur va retenter tout seul dans quelques secondes
  }
});

// fermer manuellement si besoin (exemple : utilisateur quitte la page)
// source.close();
```

---

## 4) RECONNEXION AUTOMATIQUE : LE CADEAU DU PROTOCOLE

C'est là que SSE est plus pratique que WebSocket pour des cas simples.
Le navigateur reconnecte automatiquement si la connexion tombe.
Et il envoie le dernier `id` reçu dans le header `Last-Event-ID`.

```js
// côté serveur : utiliser les IDs pour reprendre depuis le bon endroit
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // récupérer le dernier ID reçu par ce client (null si première connexion)
  const lastEventId = req.headers["last-event-id"];

  if (lastEventId) {
    // le client se reconnecte : lui envoyer les events manqués
    const missedEvents = getEventsSince(parseInt(lastEventId));
    missedEvents.forEach((event) => {
      res.write(`id: ${event.id}\ndata: ${JSON.stringify(event.data)}\n\n`);
    });
  }

  // configurer le délai de retry (optionnel:défaut navigateur : 3 secondes)
  res.write("retry: 5000\n\n"); // retry en 5 secondes si connexion perdue

  clients.add(res);
  req.on("close", () => clients.delete(res));
});
```

---

## 5) SSE VS WEBSOCKET : QUAND CHOISIR QUOI

```text
          SSE             WebSocket
-----------------------------------------------------------------
Direction     Serveur --> Client      Bidirectionnel
Protocole     HTTP/1.1           WS (upgrade HTTP)
Reconnexion    Automatique (navigateur)   Manuelle
Proxies/CDN    Transparent         Peut bloquer
Auth       Headers HTTP classiques    Custom (handshake)
Coût serveur   Connexion HTTP longue     Connexion WS dédiée
Cas parfaits   Feeds, notifs, dashboards  Chat, jeux, co-édition
```

Règle simple : si le client n'a pas besoin d'envoyer de données en temps réel, SSE suffit.
Le chat a besoin de WebSocket. Le feed de score d'un match : SSE est parfait.

---

## 6) LE PIÈGE DU BUFFERING

Le problème le plus fréquent avec SSE en prod : les proxies qui bufferisent les réponses HTTP.
Nginx, par exemple, peut accumuler les events avant de les envoyer d'un coup : ce qui casse complètement le temps réel.

```nginx
# config Nginx pour SSE : obligatoire en prod
location /events {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Connection '';   # désactiver keep-alive sur le proxy
  proxy_buffering off;        # désactiver le buffering : CRITIQUE
  proxy_cache off;          # pas de cache
  proxy_read_timeout 86400;     # 24h : garder la connexion ouverte
}
```

Sans `proxy_buffering off` : les events arrivent en batch (groupes), pas en temps réel.

---

## RÉSUMÉ

SSE c'est du HTTP long-polling (connexion HTTP maintenue ouverte) avec un format standard.
Le navigateur gère la reconnexion automatiquement et envoie le `Last-Event-ID` pour reprendre là où ça s'est arrêté.
Le vrai avantage sur WebSocket : rien à configurer pour les proxies, les load balancers, le CORS.
Le vrai risque : le buffering des proxies qui détruit le temps réel si `proxy_buffering off` n'est pas configuré.

---

## EXERCICES

**EXO 1 : Le feed d'alertes Horror en direct**

Implémente un serveur SSE qui diffuse des alertes Horror générées aléatoirement.
Chaque alerte contient : nom du Horror, ville, niveau de menace (1 à 5), timestamp.
Côté client : affiche chaque alerte dans la console au format `[ALERTE] NomHorror : Ville (niveau 3)`.

Contrainte : utiliser des events typés (`event: horror_alert`) plutôt que le type `message` par défaut.
(Indice : `source.addEventListener('horror_alert', handler)` côté client)

---

**EXO 2 : La reprise après déconnexion**

Modifie le serveur pour qu'il :

- attribue un ID croissant à chaque event
- garde les 20 derniers events en mémoire
- envoie les events manqués si le client se reconnecte avec un `Last-Event-ID`

Contrainte : tester en coupant la connexion manuellement (`source.close()`) puis en rouvrant une nouvelle `EventSource` avec le bon `Last-Event-ID` dans les headers.
(Indice : le navigateur envoie `Last-Event-ID` automatiquement si tu avais un `id:` dans tes events précédents)

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Transfert production : SSE et proxy buffering

Server-Sent Events (SSE, flux HTTP unidirectionnel du serveur vers le navigateur) convient aux notifications serveur→client lorsque le client n'a pas besoin d'envoyer une commande sur la même connexion. Le buffering du proxy et les timeouts intermédiaires peuvent retarder le flux.

**Exercice.** Définis `Content-Type: text/event-stream`, les keep-alives, les événements nommés, le champ `id` et la reprise via `Last-Event-ID`. Décris ce que fait le serveur si le curseur demandé n'existe plus.

**Vérification.** Le client reçoit un événement, se déconnecte puis reprend sans perdre les événements encore disponibles ; les en-têtes proxy/cache sont documentés et le flux reste unidirectionnel. Ne promets pas une conservation indéfinie du journal.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **01_Sse_basics : le serveur qui parle en premier** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « 01_Sse_basics : le serveur qui parle en premier » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
