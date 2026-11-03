---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: "Callbacks, promises, event loop : modèle de concurrence stable depuis 2015."
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, temps_limite]
anti_recipe_key: changement_echelle+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

> **Statut de pérennité :** **intemporel** | évolutif | périssable
> Statut effectif de ce module : **intemporel**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : fonctions et scope (00-SOCLE/04-FUNDAMENTALS), structures de contrôle (00-SOCLE/04-FUNDAMENTALS), erreurs synchrones (01-CADRAGE/04-ERROR-HANDLING, approfondi plus loin dans le fil). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : async & event loop

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

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.
> Temps de lecture ~8 min

Dans un agent JavaScript donné, un seul thread d'exécution traite le code de cet agent à la fois. Un environnement peut toutefois lancer des workers ou d'autres agents avec leurs propres contextes d'exécution. Un serveur peut gérer de nombreuses opérations en attente sans exécuter chacune d'elles simultanément sur le thread JavaScript principal. Si tu ne distingues pas exécution et attente d'I/O, tu codes avec un fantôme que tu ne contrôles pas.

L'event loop (boucle d'événements), c'est le moteur caché derrière chaque `fetch`, chaque `setTimeout`, chaque réponse API. Tant que tu ne le vois pas, tu codes async au hasard.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Un serveur qui lit un fichier, interroge une base de données, ou attend une réponse réseau ne peut pas juste freezer pendant l'attente. Si JS bloquait sur chaque opération lente, ton serveur planterait dès 2 utilisateurs simultanés : le premier bloquerait tout le monde pendant qu'il attend sa réponse.

La boucle d'événements orchestre le travail d'un agent : le code JavaScript courant s'exécute jusqu'à rendre la main ; les opérations prises en charge par l'hôte (réseau, disque, timers) progressent selon le runtime, puis leurs suites sont planifiées. Les microtasks et les tâches sont deux catégories utiles, mais leur ordonnancement dépend de l'environnement. L'attente d'une I/O ne signifie pas qu'un nouveau thread JavaScript est créé pour chaque opération.

Sans comprendre ce mécanisme, le code async devient une boîte noire : tu écris `async/await` parce que "ça marche", mais tu ne sais pas pourquoi deux promises s'exécutent dans un ordre qui te surprend à chaque fois.

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev qui ne comprend pas l'event loop écrit du code qui semble fonctionner... jusqu'à ce qu'il ne fonctionne plus. Une boucle `forEach` avec un `await` dedans qui ne fait pas ce qu'il croit : `forEach` ignore les promises retournées, donc tes opérations s'enchaînent dans le désordre. Un `setTimeout` à 0ms qui s'exécute après tous les `.then()`, et personne ne comprend pourquoi.

Dans `02_garo_no_kronika`, les Chevaliers d'Or doivent répondre à plusieurs alertes Horror en parallèle. Un dev qui ne maîtrise pas `Promise.allSettled` et `Promise.race` va soit bloquer chaque combat l'un après l'autre, soit rater la limite des 99.9 secondes d'armure sans le voir venir. Pas de crash : juste un système qui fonctionne de travers.

Le débogage devient un cauchemar : les erreurs async qu'on oublie de catcher tombent en silence, le stack trace (trace de la pile d'appels) devient illisible parce que l'exécution a sauté entre plusieurs ticks d'event loop.

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
appel API           --> Promise --> attente --> résolution ou rejet
upload de fichier       --> stream asynchrone --> progress events
notification temps réel    --> WebSocket/SSE   --> event loop qui dispatch
plusieurs requêtes en parallèle --> Promise.all/allSettled --> agrégation
timeout sur une opération   --> Promise.race    --> annulation logique
```

Chaque fois que ton code attend quelque chose qui ne dépend pas du CPU local (réseau, disque, timer), l'event loop est dans la boucle. Un backend Node, un dashboard qui poll une API, une UI qui réagit à des clics pendant qu'un fetch tourne en fond : tout ça, c'est le même mécanisme.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Les idées fondamentales restent utiles : une pile d'exécution par agent, du travail planifié par l'hôte, des microtasks et des tâches. Mais il n'existe pas un unique schéma détaillé valable à l'identique partout. Dans le navigateur, le modèle HTML distingue notamment tâches, microtasks et rendu ; les agents Worker ont leur propre boucle. Node.js possède un ordonnancement avec des phases propres au runtime. Comprendre le modèle commun aide à raisonner ; pour prédire l'ordre exact, il faut consulter le contrat de l'hôte utilisé.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Avant, on enchaînait les callbacks (fonctions passées en argument pour être appelées plus tard) les unes dans les autres : ça donnait le fameux "callback hell" (pyramide de callbacks imbriqués illisible). Chaque opération async ajoutait un niveau d'indentation, et après 4 ou 5 niveaux, le code devenait impossible à lire ou à débugger.

Les Promises ont résolu le problème de lisibilité en aplatissant la chaîne avec `.then()`. Puis `async/await` a fait la même chose, mais en rendant le code async lisible comme du code synchrone : plus besoin de chaîner mentalement des callbacks, tu lis de haut en bas comme une recette de cuisine.

Le changement n'est pas cosmétique : moins d'erreurs silencieuses, gestion des erreurs centralisée avec `try/catch`, et un code que n'importe quel dev peut relire 6 mois plus tard sans reconstruire la logique dans sa tête.

---

## 6) NOYAU DUR DU MÉTIER ?

Oui, directement dans le noyau dur défini par le curriculum. `01 + 03` (fundamentals + async) forment le duo "sans ça, t'es aveugle". Impossible de toucher à une API, un serveur Node, ou n'importe quel système réseau sans cette base. Le testing, l'error handling, le realtime : tout ce qui vient après suppose que tu sais déjà comment l'event loop traite une opération asynchrone.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

Les frameworks changeront leur façon d'exposer l'asynchrone, mais le contrat dépend toujours du runtime. Comprendre les jobs, les microtasks, les tâches et les agents permet d'expliquer pourquoi `async/await` s'appuie sur les Promises sans confondre ce modèle de langage avec l'ordonnancement complet du navigateur ou de Node.js.

Un dev qui maîtrise l'event loop débugue un problème de performance async en minutes. Un dev qui ne le maîtrise pas ajoute des `await` partout en espérant que ça règle un problème qu'il ne comprend pas.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

JS est mono-thread, et pourtant il gère des milliers d'opérations en attente sans bloquer. Ce module explique comment. Sans lui, l'ordre d'exécution de ton code async reste une superstition. Avec lui, tu lis un `await` dans une boucle et tu sais exactement ce qui va foirer avant même de l'exécuter.

Maintenant, ouvre `02-callback_maze.md`. Le labyrinthe t'attend, et cette fois tu as le plan.

## AILLEURS QUE JS

En Python, `asyncio` a aussi une boucle d'événements et des coroutines (`async def`/`await`), mais tu dois la lancer explicitement (`asyncio.run`). En Rust, l'async est basé sur des `Future` inertes tant qu'un exécuteur (Tokio) ne les `poll` pas : rien ne tourne sans runtime. En Go, pas d'async/await : des goroutines légères et des channels. Le mécanisme (ne pas bloquer sur l'attente d'I/O) est universel ; l'ergonomie change.

---

## Modèle mental (schéma ASCII)

```text
    +---------------------+
    |   JS Engine    |
    |  +-------------+  |
    |  | Call Stack |  |  <- ta fonction courante
    |  +-------------+  |
    +----------|----------+
          | vide ?
          v
    +----------------------+
    |  Microtask Queue  | <- Promises, queueMicrotask
    +----------------------+
          | vide ?
          v
    +----------------------+
    |   Task Queue    | <- setTimeout, I/O, events
    +----------------------+

Regle : Call Stack se vide -> on draine TOUTES les microtasks -> puis UNE task -> rerendu (browser) -> on recommence.
```

Retiens : microtasks avant tasks, toujours. C'est pour ca qu'un `await` peut faire "avancer plus vite" qu'un `setTimeout(fn, 0)`.

## TROIS PUBLICS : GRILLE D'AUTO-EVALUATION

> Greffe P6 : un ingenieur qui ne sait pas expliquer a trois publics ne survit
> pas a un entretien senior. Voir `03-PILOTAGE/10-TEAM-CRAFT/13-three_audiences_intro.md`.

Prends le concept-cle du module. Explique-le **trois fois**, chronometre en main :

### 1. A un enfant de 10 ans (60 s)

Analogie seule, zero jargon. Si le mot "runtime" sort, tu as perdu.

### 2. A un dev junior (3 min)

Un exemple de code minimal executable, un piege classique, un cas d'usage reel.

### 3. A un CTO hostile (5 min)

Trade-off, cout, quand NE PAS l'utiliser, impact business, alternative.

### Grille (coche honnetement)

- [ ] Enfant : aucun mot technique.
- [ ] Junior : l'exemple tourne vraiment.
- [ ] CTO : le mot "cout" ou "risque" est sorti au moins une fois.
- [ ] Aucune version ne ment (pas de simplification qui devient fausse).

Si une case n'est pas cochee : tu ne maitrises pas encore ce concept, tu le
recites.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : async & event loop** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Pourquoi ce module mérite ton temps : async & event loop » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.

### Références de précision

- [MDN : Modèle d'exécution JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) : agents, pile d'exécution, jobs et distinction tâches/microtasks.
- [MDN : Microtasks en profondeur](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) : boucle d'événements navigateur et agents Worker.
- [Node.js : Event Loop, timers et `process.nextTick`](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) : phases propres à Node.js.
