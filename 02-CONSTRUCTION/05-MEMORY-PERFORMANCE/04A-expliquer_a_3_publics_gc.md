---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# Garbage Collection : expliqué à 3 publics

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

<!-- AF-DIAGRAM:gc -->

```text
┌────────────┐
│ Roots      │
└─────┬──────┘
      ▼
┌────────────┐     ┌────────────┐
│ reachable  │────►│ reachable  │
└────────────┘     └────────────┘

┌────────────┐
│ unreachable│ ─────► collect
└────────────┘
```

Le GC peut récupérer ce qui n’est plus atteignable depuis les racines du runtime.

Temps de lecture ~2 min

-> ~10 min

## À UN ENFANT

Imagine ta chambre pleine de jouets. Certains, tu joues avec toutes les semaines. D'autres, tu ne les as pas touchés depuis 6 mois. Une fois par mois, ta mère passe et range dans un carton tous ceux qui traînent et que personne n'utilise. Elle ne jette **jamais** un jouet auquel tu es encore attaché : mais tout ce qui n'a plus de lien avec personne part au grenier. Le GC en JS fait pareil avec la mémoire : il libère ce qui n'est plus référencé.

## À UN PAIR DEV

Le GC de V8 est **generational** + **mark-and-sweep** + **incremental**. Concrètement :

- **New Space** (Scavenger) : objets fraîchement créés, GC toutes les 1-2 ms, très rapide.
- **Old Space** (Major GC) : objets qui ont survécu 2 cycles, GC plus lourd (10-100 ms), incrémental pour ne pas geler la main thread.
- **Racines** : globals, stack, closures actives. Tout objet joignable depuis une racine survit.
- **Fuite typique** : `Map` ou array global qui accumule, closure sur DOM détaché, listener non détaché.
- `WeakMap` / `WeakRef` : références qui **n'empêchent pas** la collecte.

## À UN CTO

Le GC est invisible tant que la mémoire est saine. Il devient une catastrophe business quand : (1) GC pauses > 200 ms bloquent le event loop et cassent le SLO latence, (2) fuite lente (100 Ko/heure) fait OOM au bout de 3 semaines : donc en pleine prod, jamais reproductible en staging. Signal d'embauche mid/senior : sait poser `process.memoryUsage()` + heap snapshot et lire la différence. Junior : croit que "JS a un GC donc pas de souci mémoire".

## PREUVE EXIGÉE

Écris les trois textes (12 lignes max chacun) sur **un même fait mesuré** : un pic de pause GC, une mesure de heap. Rends-les dans `PREUVES/GC-3-PUBLICS.md`.

- **Enfant** : analogie, et ce qu'il ne faut surtout pas faire (`delete` mental, micro-optimiser).
- **Pair** : heap snapshot, génération, et si tu parles de métriques, lien vers [90-grimoire.md](../../03-PILOTAGE/05-OBSERVABILITY/90-grimoire.md).
- **CTO** : coût (temps utilisateur, euros d'instance) et une action refusée, chiffre à l'appui.

Sans mesure (ms ou Go), les trois textes sont nuls.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
