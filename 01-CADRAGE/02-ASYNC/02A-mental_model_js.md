---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# Le modèle mental JS en 1 image

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

Temps de lecture ~10 min

Avant de plonger dans l'event loop, tu dois avoir UNE image en tête. Si tu ne l'as pas, la suite est du bruit.

---

## LA RÈGLE UNIQUE

> **JS a UNE seule pile d'exécution. Tout le reste est une file d'attente.**

Ta pile ("call stack") empile les appels de fonctions. Elle fait UNE chose à la fois. Point.

Tout ce qui n'est pas "en train de s'exécuter maintenant" attend dans une file : les timers, les I/O, les promises, les clics utilisateur. Un chef d'orchestre (l'event loop) pioche dans les files et pose le prochain morceau sur la pile QUAND ELLE EST VIDE.

---

## LE SCHÉMA À GRAVER

```text
    ┌────────────────────────┐
    │   CALL STACK    │ ← 1 seule pile, LIFO
    │ [fonction courante]  │   "je fais UNE chose"
    └────────────▲───────────┘
           │ (event loop pousse quand vide)
  ┌─────────────────┴─────────────────┐
  │                  │
┌──┴──────────────┐      ┌───────┴──────────┐
│ MICROTASK QUEUE │ ←priorité│ MACROTASK QUEUE │
│ .then / await │      │ setTimeout, I/O │
└─────────────────┘      └──────────────────┘
```

Règle : la pile doit être VIDE pour que l'event loop pousse un nouveau job. Et il vide TOUTES les microtasks avant de toucher à une seule macrotask.

---

## (attention) CE QUE L'ANALOGIE (« chef d'orchestre ») CACHE

Il n'y a pas de "thread magique" qui exécute les I/O. C'est l'OS (libuv, kernel) qui prévient JS quand une donnée est prête. Le chef d'orchestre ne fait que planifier : il n'exécute rien lui-même.

---

## MINI-EXERCICE DE VISUALISATION

Dessine (à la main, sur papier) l'état de la pile et des deux files après chaque ligne :

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Écris l'ordre d'affichage AVANT de tester. Puis lance-le. Si ton papier ment, c'est ton modèle mental qui doit changer, pas le code.

---

## PRINCIPES DURABLES

- Une pile, plusieurs files.
- Dans le modèle navigateur présenté ici, les microtasks sont vidées au point de contrôle avant la prochaine tâche ordinaire ; ne transforme pas cette règle en classement universel de toutes les files des runtimes.
- L'event loop ne pousse que sur pile vide.
- Les I/O sont déléguées à l'OS, pas exécutées par JS.

Prochain arrêt : [`04_event_loop/`](04_event_loop/).

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Le modèle mental JS en 1 image** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Le modèle mental JS en 1 image » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
