---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
cognitive_level: L3
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# 05 : Async avancé : AbortController, backpressure, mini-scheduler

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

> **Principe universel** : toute opération asynchrone doit avoir une **fin garantie** (succès, échec, annulation). Sinon, tu construis une bombe à retardement.

## 1. AbortController

```js
const ac = new AbortController();
const p = fetch(url, { signal: ac.signal });
setTimeout(() => ac.abort(new Error("too slow")), 3000);
```

**Exercice** : ajoute un `AbortController` à une recherche autocomplétée. Chaque nouvelle frappe **annule** la précédente.

## 2. Annulation d'une promesse "maison"

<!-- AF-DIAGRAM:promise -->

```text
        ┌──────────┐
        │ pending  │
        └────┬─────┘
             │ résultat
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐ ┌────────────┐
│ fulfilled  │ │ rejected   │
└─────┬──────┘ └─────┬──────┘
      │              │
      └──────┬───────┘
             ▼
       ┌───────────┐
       │ handlers  │
       └───────────┘
```

Une Promise évolue d’un état en attente vers un résultat résolu ou rejeté, puis déclenche ses handlers.

Les Promises natives ne sont pas annulables. Solution : wrapper qui écoute un signal.

```js
function cancellable(promiseFactory, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener("abort", () => reject(signal.reason), {
      once: true,
    });
    promiseFactory().then(resolve, reject);
  });
}
```

**Exercice** : écris `sleep(ms, { signal })` annulable.

## 3. Backpressure (streams)

Producteur rapide + consommateur lent = mémoire qui explose.
Node : `readable.pipe(writable)` gère automatiquement. À la main :

```js
for await (const chunk of readable) {
  const ok = writable.write(chunk);
  if (!ok) await once(writable, "drain");
}
```

**Exercice** : lis un fichier de 1 GB ligne par ligne et écris chaque ligne en majuscules dans un autre. RAM stable requise.

## 4. Mini-scheduler

Écris `schedule(tasks, { concurrency: 3 })` qui exécute `tasks` (des fonctions renvoyant des Promises) avec **au plus 3** en parallèle. Sans lib externe.

## (attention) Ce que l'analogie "async = parallèle" cache

Async ≠ parallèle. Async = **entrelacé** sur un seul thread. Le parallèle vient des workers.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
