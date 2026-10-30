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

<!-- AF-DIAGRAM:async-lifecycle -->

```text
Opération asynchrone
       │
       ├── résultat ───────────────► succès
       ├── exception/rejet ────────► échec observable
       └── signal d’annulation ────► arrêt coopératif

Flux de données : producteur ──► tampon borné ──► consommateur
                              ▲
                     « drain » : reprendre

Mini-scheduler : traiter un lot ──► céder le contrôle ──► reprendre
```

Les trois sujets se complètent : borner la durée d’une opération, limiter la mémoire d’un flux et empêcher une longue tâche de monopoliser l’exécution.

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
function raisonAnnulation(signal) {
  return signal.reason ?? Object.assign(new Error("Opération annulée"), {
    name: "AbortError",
  });
}

function abortable(promiseFactory, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(raisonAnnulation(signal));
      return;
    }

    let settled = false;
    const cleanup = () => signal.removeEventListener("abort", onAbort);
    const onAbort = () => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(raisonAnnulation(signal));
    };

    signal.addEventListener("abort", onAbort, { once: true });
    Promise.resolve()
      .then(() => {
        if (settled || signal.aborted) return undefined;
        return promiseFactory(signal);
      })
      .then(
        (value) => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve(value);
        },
        (error) => {
          if (settled) return;
          settled = true;
          cleanup();
          reject(error);
        },
      );
  });
}
```

Le wrapper retire son écouteur et ne règle sa Promise extérieure qu'une fois. Il transmet le signal à l'opération : le travail sous-jacent ne s'arrête réellement que si cette opération observe le signal (par exemple `fetch(url, { signal })`). Un wrapper seul ne peut pas arrêter arbitrairement un calcul déjà lancé.

**Exercice** : écris `sleep(ms, { signal })` annulable ; assure-toi que le timer est effacé aussi bien à la résolution qu'à l'annulation.

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
