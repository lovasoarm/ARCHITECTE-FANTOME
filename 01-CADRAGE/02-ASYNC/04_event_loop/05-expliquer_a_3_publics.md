---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, transmission]
anti_recipe_key: solution_concurrente+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# Event loop : expliqué à 3 publics

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

Temps de lecture ~2 min

-> ~10 min

Compléte `expliquer_a_5_ans.md`. Généralise le pattern : **un concept, trois auditoires, trois versions**. Reproduis-le pour tout concept dur (closures, prototypes, GC…).

## À UN ENFANT (7 ans)

Imagine un serveur dans un restaurant. Il ne peut porter qu'un plateau à la fois. Quand tu commandes un plat, le cuisinier met du temps à le faire. Est-ce que le serveur reste planté devant la cuisine à attendre ? Non : il va s'occuper d'autres clients. Quand ton plat est prêt, le cuisinier sonne, et le serveur revient te le porter. **JavaScript, c'est ce serveur : un seul, mais il ne perd jamais son temps à attendre.**

## À UN PAIR DEV

L'event loop est une boucle infinie qui, à chaque tick :

1. Exécute la tâche synchrone courante jusqu'à `return`.
2. Vide **toute** la microtask queue (`.then`, `queueMicrotask`, `await` resume).
3. Prend UNE macrotask (`setTimeout`, I/O, `setImmediate` en Node).
4. Rend la main au rendering (côté navigateur).
5. Recommence.

Corollaires concrets :

- `Promise.resolve().then(f)` s'exécute **avant** un `setTimeout(f, 0)` du même tick.
- Un `await` qui ne se résout jamais gèle sa fonction mais **pas** le thread.
- Un `while(true)` bloque tout : pas un thread, LE thread.

## À UN CTO

L'event loop est le mécanisme qui permet à Node/JS d'atteindre 10-100k connexions concurrentes avec **un seul thread OS**. Trade-off : zéro parallélisme CPU par défaut (workers séparés obligatoires pour du calcul lourd), mais coût de context-switch quasi nul, latence prédictible sous charge I/O. Le risque business : une seule fonction bloquante en synchro (JSON parse d'un payload de 50 Mo, regex catastrophic backtracking) fige **toutes** les requêtes en cours. Mitigations : timeouts partout, worker threads pour le CPU, monitoring event loop lag (`perf_hooks.monitorEventLoopDelay`).

## POURQUOI CE FORMAT

Un ingénieur employable en 2028 doit pouvoir défendre une décision technique devant :

- **un enfant / débutant total** (test ultime de la compréhension : si tu n'arrives pas à expliquer sans jargon, tu n'as pas compris) ;
- **un pair** (langage précis, mécanismes exacts, corollaires exploitables) ;
- **un CTO** (langage de risque, coût, trade-off business, timeline).

Ce format t'entraîne aux trois registres avec un seul exercice.

## À RÉPLIQUER

Crée le même fichier pour :

- `closures` (dans `00-SOCLE/04-FUNDAMENTALS/`)
- `prototypes` (dans `02-CONSTRUCTION/17-OOP-JS/`)
- `garbage collection` (dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/`)

Un fichier par concept, trois publics par fichier. C'est le format canon.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
