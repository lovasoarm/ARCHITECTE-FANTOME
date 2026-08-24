---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 01_Webrtc_concepts : le vocabulaire sans la peur

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Temps de lecture ~9 min

WebRTC est une famille d'API et de protocoles du Web qui permet à deux pairs de communiquer directement lorsque le réseau et la négociation le permettent.
Le signaling passe généralement par un service de coordination distinct, et certains environnements nécessitent des relais TURN pour transporter les flux.
Appels vidéo, partage d'écran et échanges de données peuvent ainsi être établis entre pairs, avec un chemin réseau qui dépend des conditions rencontrées.

Pourquoi c'est complexe : deux machines sur internet ne se connaissent pas.
Elles sont derrière des NATs (Network Address Translation : traduction d'adresses réseau), des firewalls.
WebRTC fournit les mécanismes nécessaires pour établir ces communications, avec plusieurs protocoles et services complémentaires. La réussite dépend toutefois des conditions réseau, de la négociation et de la configuration.
Ce module décompose chaque pièce du puzzle. Le code réel : connexion, DataChannel, gestion des états : c'est dans `03-webrtc_demo.md`.

---

## 1) L'IDÉE DE BASE : CE QUI SE PASSE VRAIMENT

```text
Alice (navigateur) ---------- [internet + NATs] ---------- Bob (navigateur)
                  |
               [Signaling Server]
              (serveur de rendezvous)
                  |
             Échange de SDP et ICE candidates
                  |
          Une fois connectés, les données passent direct
          Alice <========================> Bob
             (pas par le serveur signaling)
```

Deux phases distinctes :

1. **Signaling** (coordination) : Alice et Bob doivent se trouver et négocier les paramètres de connexion. Ça passe par un serveur (ton serveur). WebRTC ne spécifie pas le protocole : WebSocket, HTTP, SMS, ça marche.
2. **Data transfer** (transfert de données) : une fois les candidats ICE sélectionnés, les flux peuvent être directs entre les pairs ou passer par un relais TURN. Le serveur de signaling n'a généralement plus à transporter les données applicatives, mais un relais réseau peut rester dans le chemin.

---

## 2) SDP : LA CARTE D'IDENTITÉ D'UNE CONNEXION

SDP (Session Description Protocol : protocole de description de session) c'est un bloc de texte qui décrit une connexion.

Ce qu'il contient :

- les codecs (algorithmes de compression/décompression audio et vidéo) supportés : H.264, VP8, Opus...
- la résolution et le bitrate (débit binaire : quantité de données transmises par seconde) souhaités
- les paramètres de chiffrement
- les ICE candidates (voir section suivante)

```text
v=0
o=alice 2890844526 2890844526 IN IP4 host.anywhere.com
s=
c=IN IP4 host.anywhere.com
t=0 0
m=audio 49170 RTP/AVP 0
a=rtpmap:0 PCMU/8000
m=video 51372 RTP/AVP 31
a=rtpmap:31 H261/90000
```

Tu n'écris jamais ce format à la main.
Le navigateur le génère via `RTCPeerConnection.createOffer()` et `createAnswer()`.
Ce que tu fais : le transporter via ton serveur de signaling d'Alice à Bob et vice-versa.

L'échange SDP :

```text
Alice          Serveur Signaling        Bob
 |              |             |
 |--- createOffer() --------->|             |
 |  (génère SDP local)   |--- forward SDP --------->|
 |              |             | setRemoteDescription()
 |              |<-- createAnswer() -------|
 |  setRemoteDescription() |--- forward answer ------>|
 |<-- answer reçu ------------|             |
```

---

## 3) ICE : COMMENT DEUX MACHINES SE TROUVENT VRAIMENT

ICE (Interactive Connectivity Establishment : établissement interactif de connectivité) c'est le mécanisme qui résout le problème du NAT.

Ton ordinateur peut avoir plusieurs IPs :

- l'IP locale (`192.168.1.42`) : visible seulement sur ton réseau
- l'IP publique (`203.0.113.1`) : visible depuis internet
- une IP relayée par un serveur TURN si tout le reste échoue

Chacune de ces possibilités de connexion s'appelle un **ICE candidate** (candidat ICE).

```js
// le navigateur génère des ICE candidates automatiquement
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    // envoyer ce candidate à l'autre pair via le signaling server
    signalingServer.send({
      type: "ice_candidate",
      candidate: event.candidate,
    });
  }
};
```

ICE teste toutes les combinaisons de candidates entre les deux pairs et garde la meilleure connexion.
C'est automatique. Tu dois juste transporter les candidates via ton signaling.

---

## 4) STUN : DÉCOUVRIR SON IP PUBLIQUE

STUN (Session Traversal Utilities for NAT) c'est simple : un serveur qui te dit quelle est ton IP publique et ton port depuis l'extérieur.

```text
Ton navigateur -------- "C'est quoi mon IP ?" --------> Serveur STUN
        <------- "Tu arrives avec 203.0.113.1:54321" --------
```

Le serveur STUN retourne ton IP publique et le port que le NAT a ouvert.
Cette info devient un ICE candidate que tu partages avec l'autre pair.

Google fournit des serveurs STUN publics gratuits :

```js
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

const peerConnection = new RTCPeerConnection(config);
```

STUN réussit dans certains scénarios courants ; son taux de réussite varie fortement selon les topologies NAT, les firewalls et le contexte de déploiement.
Certains environnements restants, notamment des NATs restrictifs ou symétriques, peuvent empêcher le chemin direct et nécessiter un relais TURN.
Là il faut TURN.

---

## 5) TURN : LE PLAN B QUAND TOUT ÉCHOUE

TURN (Traversal Using Relays around NAT) c'est un serveur relais.
Si Alice et Bob ne peuvent pas se connecter directement, les flux passent par le serveur TURN.

```text
Alice ----> Serveur TURN ----> Bob
```

Ce n'est plus un chemin pair-à-pair direct. Le relais TURN augmente la capacité à établir la communication lorsque le chemin direct échoue, mais ne constitue pas une garantie universelle de réussite.
Inconvénient : ça coûte de la bande passante côté serveur. TURN est ton budget infra WebRTC.

```js
const config = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "turn:ton-serveur-turn.com:3478",
      username: "alice", // credentials TURN:obligatoires
      credential: "motdepasse",
    },
  ],
};
```

En prod : ne jamais utiliser un serveur TURN public inconnu. Les flux passent par lui.
Héberger le tien avec Coturn (implémentation open source de TURN) ou payer un service (Twilio, Metered).

---

## 6) LE FLUX COMPLET DE CONNEXION

```text
Alice             Signaling       Bob
 |                |          |
 | new RTCPeerConnection()    |          |
 | getUserMedia() -> stream    |          |
 | addTrack(stream)        |          |
 |                |          |
 | createOffer()         |          |
 | setLocalDescription(offer)   |          |
 |--- send offer ---------------->|--- forward ------->|
 |                |          | setRemoteDescription(offer)
 |                |          | createAnswer()
 |                |          | setLocalDescription(answer)
 |<-- receive answer ------------|<--- forward --------|
 | setRemoteDescription(answer)  |          |
 |                |          |
 |--- ice candidate ------------->|--- forward ------->| addIceCandidate()
 |<-- ice candidate -------------|<--- forward --------|
 | addIceCandidate()       |          |
 |                |          |
 |<===== CONNEXION P2P ÉTABLIE ========================>|
 |    (flux audio/vidéo direct)          |
```

Six étapes clés :

1. Alice crée une `RTCPeerConnection` et capture son media avec `getUserMedia()`
2. Alice crée une offer SDP et la définit comme description locale
3. Alice envoie l'offer à Bob via le signaling
4. Bob répond avec une answer SDP
5. Les deux échangent les ICE candidates via le signaling
6. La connexion P2P s'établit : le signaling n'est plus utilisé

---

## RÉSUMÉ

WebRTC demande au minimum une phase de signaling/coordination puis une phase de transport négociée par ICE. Le transport des données peut être direct ou relayé par TURN ; il ne faut donc pas assimiler WebRTC à un chemin réseau toujours strictement pair-à-pair.
SDP décrit la session. ICE candidates décrivent les chemins réseau possibles. STUN découvre l'IP publique. TURN relaie quand tout le reste échoue.
Ce qui rend WebRTC complexe : c'est pas le code, c'est la plomberie réseau. Comprendre NAT, STUN, TURN : c'est comprendre pourquoi WebRTC peut réussir ou échouer selon les conditions réseau, la négociation et les relais disponibles ; le but est de comprendre les causes d'échec, pas de supposer une garantie universelle.
Le code complet : connexion, DataChannel, gestion des états ICE : c'est dans `03-webrtc_demo.md`.

---

## EXERCICES

**EXO 1 : Cartographier une connexion**

Sans écrire de code WebRTC, dessine en ASCII le flux complet d'une connexion entre deux joueurs de Breaking Bad qui veulent s'appeler via WebRTC.
Jesse est derrière un NAT symétrique. Walter est sur une IP publique.
Quels serveurs sont nécessaires ? Quel chemin prennent les données ?

(Indice : STUN échoue pour Jesse côté entrant : il faut TURN)

---

**EXO 2 : Analyser un SDP**

Le navigateur génère ce bloc SDP. Identifie :

- quel codec audio est proposé en priorité
- le bitrate maximum configuré
- si la session supporte la vidéo

```text
v=0
o=- 4611731400430051336 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
a=rtpmap:111 opus/48000/2
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
m=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99
a=rtpmap:96 VP8/90000
a=rtpmap:97 rtx/90000
a=fmtp:97 apt=96
a=rtpmap:98 VP9/90000
```

(Pas d'indice : lecture de format texte structuré)

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
