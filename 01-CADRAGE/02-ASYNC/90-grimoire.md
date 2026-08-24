---
stability: intemporel
acte: restituer
route: survie
---

**SCÈNE CRAZYDEVS : Prison Break :** le plan semble simple jusqu’à ce qu’une porte soit fermée, qu’un garde change de ronde et qu’une information manque. C’est exactement là que le cadrage commence.

# Grimoire : `02-ASYNC`

<!-- AF-DIAGRAM:async_await -->

```text
┌──────────────┐
│ fonction     │
│ async        │
└──────┬───────┘
       │ await
       ▼
┌──────────────┐
│ suspend      │
│ la reprise   │
└──────┬───────┘
       │ Promise prête
       ▼
┌──────────────┐
│ reprend      │
│ le contexte  │
└──────────────┘
```

await suspend la reprise de la fonction async, pas l’ensemble du runtime.

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

Temps de lecture ~2 min

Acte attendu : restituer. Un grimoire ne s'apprend pas en le lisant : il se récite, puis se
vérifie. Deux analogies au maximum par terme, suivies de leur limite.

## Les grimoires de ce module

- [Page verrouillée](01_callbacks/90-grimoire.md)
- [Page verrouillée](02_promises/90-grimoire.md)
- [Page verrouillée](03_async_await/90-grimoire.md)
- [Page verrouillée](04_event_loop/90-grimoire.md)

Chaque grimoire porte les mêmes cinq colonnes : Terme, Définition, Code, Analogies, Limite.
Tu ne recopies pas : tu restitues de mémoire, puis tu vérifies.
