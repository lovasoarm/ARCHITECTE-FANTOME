---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_echelle, transmission]
anti_recipe_key: changement_echelle+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# EXO : implémenter une mini file de microtasks à la main

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

Temps de lecture ~7 min. Temps d'implémentation ~30 min.

> **Prérequis** : avoir lu `02-microtask_madness.md`, `03-macrotask_monsters.md`, `90-grimoire.md`.
> **Objectif** : prouver que tu comprends l'event loop en le simulant sans event loop. Si tu ne sais pas l'écrire, tu ne le comprends pas.

---

## LA CONSIGNE

Écris `microloop.js` (< 30 lignes) qui expose :

```javascript
const loop = createMicroloop();
loop.schedule(() => console.log("A"));
loop.schedule(() => {
  console.log("B");
  loop.schedule(() => console.log("D"));
});
loop.schedule(() => console.log("C"));
loop.tick();
// Sortie attendue : A B C D
```

Contraintes :

1. `schedule(fn)` empile une tâche.
2. `tick()` vide **entièrement** la file, y compris les tâches ajoutées **pendant** l'exécution (comportement microtask, pas macrotask).
3. Aucune utilisation de `Promise`, `queueMicrotask`, `setTimeout`, `setImmediate`, `process.nextTick`. Tu n'as **pas** d'event loop : tu la simules.
4. Erreurs isolées : si une tâche throw, elle ne casse pas les suivantes. Rapport en fin de `tick()`.

---

## VARIANTE : DIFFÉRENCIER MICRO ET MACRO

Ajoute `scheduleMacro(fn)` : les macrotasks ne s'exécutent qu'**après** que la file microtask soit vide. Reproduis l'ordre :

```javascript
loop.schedule(() => console.log("micro1"));
loop.scheduleMacro(() => console.log("macro1"));
loop.schedule(() => console.log("micro2"));
loop.tick();
// Sortie attendue : micro1 micro2 macro1
```

---

## AUTO-VÉRIFICATION

Ta version passe si :

- [ ] La sortie du snippet principal est exactement `A B C D`.
- [ ] `tick()` termine même si une tâche schedule 10 000 tâches en cascade.
- [ ] Une tâche qui throw n'empêche pas la suite.
- [ ] Aucun appel à `Promise`, `queueMicrotask`, `setTimeout`, `setImmediate`, `process.nextTick`.

Si un seul de ces points casse : ton modèle mental de l'event loop est faux. Recolle le grimoire.

---

## POURQUOI CET EXO EXISTE

Un dev qui écrit `await` sans savoir ce qu'il y a dessous est un passager. Ce fichier te force à devenir conducteur pendant 30 minutes. Après ça, tu n'oublieras plus jamais que la file microtask est **drainée jusqu'au bout** avant la macrotask suivante : parce que tu l'auras codée toi-même.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
