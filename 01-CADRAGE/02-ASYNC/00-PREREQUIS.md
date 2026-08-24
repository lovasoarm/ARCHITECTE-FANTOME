---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# 00 : Prereq check : Async & Event Loop

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

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `00-SOCLE/05-PROBLEM-SOLVING`, le module que tu viens de finir.

## Questions

1. Cite les 4 étapes de la méthode Polya, dans l'ordre.
2. Pourquoi découper un problème avant de coder, plutôt que de foncer directement ?
3. Donne un cas concret où NE PAS coder est la bonne réponse à un problème.
4. Qu'est-ce qu'un cas limite (edge case), et pourquoi le traiter tôt plutôt qu'après coup ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `00-SOCLE/05-PROBLEM-SOLVING/`, ou à sa synthèse `_recall_05.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : microtask vs macrotask, ce que fait `await`
> sous le capot, et le vrai problème du callback hell sont le contenu que ce
> module va t'enseigner (notamment dans `04_event_loop/`) : normal de ne pas
> encore les maîtriser. Ta compréhension est testée à la fin de chaque
> sous-section (`01_callbacks/90-grimoire.md`,
> `02_promises/90-grimoire.md`, `03_async_await/90-grimoire.md`,
> `04_event_loop/90-grimoire.md`), pas ici à l'entrée.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
