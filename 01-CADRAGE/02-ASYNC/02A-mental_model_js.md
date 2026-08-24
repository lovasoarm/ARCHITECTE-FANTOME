---
stability: intemporel
last_reviewed: 2026-07
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

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

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
- Microtasks battent macrotasks.
- L'event loop ne pousse que sur pile vide.
- Les I/O sont déléguées à l'OS, pas exécutées par JS.

Prochain arrêt : [`04_event_loop/`](04_event_loop/).

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
