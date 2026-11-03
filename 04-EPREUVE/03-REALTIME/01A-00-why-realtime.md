---
perennite: perissable
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: "WebSocket, SSE, WebRTC : APIs stables mais l'écosystème bouge."
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "04-EPREUVE/03-REALTIME/99-PORTAGE-MENTAL.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 04-EPREUVE/03-REALTIME/99-PORTAGE-MENTAL.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : async (01-CADRAGE/02-ASYNC), event loop et backpressure (01-CADRAGE/02-ASYNC/06), réseau (02-CONSTRUCTION/18-WEB-CONCEPTS). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : real-time

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

Temps de lecture ~6 min

> **Durée de vie : 2-3 ans, revenir en 2028.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Temps de lecture ~8 min

Un chat où il faut rafraîchir la page pour voir les nouveaux messages. Un dashboard de match qui affiche le score d'il y a 5 minutes. Une app de notifications qui ne notifie jamais en direct. Ce sont des systèmes cassés aux yeux d'un utilisateur de 2026, habitué à voir les choses apparaître instantanément.

Le HTTP classique (requête, réponse, fin) ne suffit plus pour ça. Le temps réel demande un autre modèle de communication, et si tu ne le maîtrises pas, ton système a l'air d'avoir 10 ans de retard. C'est exactement le terrain du mini-projet `02_garo_no_kronika` : un Chevalier Garo qui reçoit son alerte de combat avec 5 secondes de retard, c'est un Horror qui a déjà fait des dégâts avant même que la mission soit dispatchée.

---

## PRÉREQUIS

Ce module suppose que tu maîtrises :

- tout `01-CADRAGE/02-ASYNC` : complet, event loop incluse
- HTTP, headers, stateless : voir `02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md`

Si ces bases ne sont pas là : reviens ici après.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Le modèle HTTP classique fonctionne en requête-réponse : le client demande, le serveur répond, la connexion se ferme. Pour savoir si quelque chose a changé, le client doit redemander, encore et encore (polling : interroger le serveur à intervalle régulier), ce qui gaspille de la bande passante et introduit toujours un délai entre le moment où l'événement arrive et le moment où le client le voit.

Le temps réel résout ce problème avec des mécanismes pensés pour le push (le serveur pousse l'info vers le client dès qu'elle existe, sans attendre une nouvelle requête) :

- les WebSockets pour une communication bidirectionnelle persistante
- les SSE (Server-Sent Events : événements envoyés par le serveur) pour un flux unidirectionnel simple du serveur vers le client
- WebRTC pour des communications temps réel entre pairs ; selon les conditions réseau, les médias et données peuvent circuler directement ou via un relais TURN, tandis que le signaling est séparé du transport applicatif.

Chaque mécanisme répond à un besoin précis : WebSocket quand tu as besoin d'échanger dans les deux sens (chat), SSE quand tu as juste besoin de recevoir des mises à jour du serveur (flux d'actualité, score live), WebRTC quand tu as besoin d'une communication directe à faible latence entre deux utilisateurs (appel vidéo).

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev qui ne connaît que HTTP classique implémente le temps réel avec du polling agressif : interroger le serveur toutes les 2 secondes pour voir s'il y a du nouveau. Ça marche, mais ça gaspille des ressources serveur énormes (chaque utilisateur génère des requêtes en continu, même quand rien ne change), et ça introduit toujours un délai perceptible entre l'événement réel et son affichage.

Sur un système avec beaucoup de utilisateurs connectés simultanément, l'absence de maîtrise du temps réel se traduit directement par des coûts d'infrastructure qui explosent (toutes ces requêtes de polling inutiles consomment du CPU et de la bande passante) et une expérience utilisateur qui semble en retard par rapport à des concurrents qui maîtrisent ces mécanismes.

Et sur des cas critiques comme un chat ou un système d'alerte, ne pas gérer correctement la reconnexion automatique (quand la connexion WebSocket ou SSE tombe, par exemple sur un changement de réseau) veut dire que l'utilisateur perd silencieusement des messages ou des événements, sans même savoir que sa connexion a été coupée.

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
chat en direct, messagerie instantanée           --> WebSocket  --> communication bidirectionnelle persistante
flux d'actualité, score de match en direct         --> SSE     --> push unidirectionnel simple du serveur
appel vidéo, partage d'écran entre deux utilisateurs     --> WebRTC    --> peer-to-peer à faible latence
notification poussée en temps réel              --> WebSocket/SSE --> alerte instantanée sans polling
dashboard d'analytics avec données qui changent en continu  --> SSE     --> mise à jour live sans rechargement
```

Ces mécanismes apparaissent dans tout système qui a une dimension "live" : un système de trading qui affiche les prix en direct, un outil de collaboration où plusieurs utilisateurs voient les modifications des autres en temps réel, un système de monitoring qui alerte instantanément en cas de problème.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Les protocoles eux-mêmes (WebSocket, SSE, WebRTC) sont des standards web établis et stables. Ce qui évolue, c'est leur niveau d'adoption : ces mécanismes étaient autrefois réservés à des cas d'usage de niche (trading, jeux en ligne), et sont devenus des attentes standard pour une grande variété de systèmes grand public.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Avant, le polling était la solution par défaut pour simuler du temps réel, malgré son inefficacité, parce que les alternatives (WebSocket en particulier) demandaient une infrastructure serveur plus complexe à mettre en place et à scaler. Aujourd'hui, le tooling autour de ces protocoles s'est largement simplifié, et l'infrastructure cloud moderne facilite la gestion de connexions persistantes à grande échelle.

Les attentes des utilisateurs ont aussi évolué : un délai de quelques secondes pour voir une mise à jour, acceptable il y a dix ans, est aujourd'hui perçu comme un système cassé ou mal fini, parce que les standards de référence (réseaux sociaux, outils de collaboration) ont habitué les utilisateurs à de l'instantané.

---

## 6) NOYAU DUR DU MÉTIER ?

Prérequis explicite : `04-EPREUVE/03-REALTIME`, prérequis `01-CADRAGE/02-ASYNC` complet + `02-CONSTRUCTION/18-WEB-CONCEPTS`. Tu ne peux pas comprendre la gestion des connexions persistantes et des événements en flux sans déjà maîtriser l'event loop et les bases du protocole HTTP. Le mini-projet `02_garo_no_kronika` combine directement `01-CADRAGE/02-ASYNC`, `01-CADRAGE/04-ERROR-HANDLING`, `04-EPREUVE/03-REALTIME`, et `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` pour construire un système de dispatch d'alertes en temps réel avec gestion de timeout strict.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

L'attente des utilisateurs pour de l'instantané ne va pas diminuer, elle va continuer d'augmenter. Les protocoles sous-jacents (WebSocket, SSE, WebRTC) sont des standards web matures qui ne vont pas être remplacés du jour au lendemain. Maîtriser ces mécanismes reste une compétence différenciante, parce que beaucoup de devs restent confortables avec le modèle requête-réponse classique et n'ont jamais eu besoin (ou pris le temps) d'aller plus loin.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Le modèle HTTP classique ne suffit plus dès qu'une fonctionnalité doit sembler "vivant" et instantané. Ça casse de deux façons sans ces mécanismes : du polling coûteux et toujours en retard, ou une reconnexion mal gérée qui perd des événements silencieusement. L'attente d'instantané des utilisateurs ne fait qu'augmenter, jamais l'inverse.

Maintenant, ouvre `02-ws_basics.md`. Et arrête de faire semblant d'être en direct avec du polling.

> Ce module réutilise : l'event loop du `01-CADRAGE/02-ASYNC`, les web concepts du `02-CONSTRUCTION/18-WEB-CONCEPTS`.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : real-time** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Pourquoi ce module mérite ton temps : real-time » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
