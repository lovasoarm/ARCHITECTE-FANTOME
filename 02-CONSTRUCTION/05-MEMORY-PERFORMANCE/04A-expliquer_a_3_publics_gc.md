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

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Garbage Collection : expliqué à 3 publics** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Expliquer un même constat mémoire à trois publics

**Mission liée à « Garbage Collection : expliqué à 3 publics » :** À partir d’un scénario mémoire Kintana documenté, explique le mécanisme à un pair, à un responsable produit et à un utilisateur concerné. Garde les faits identiques mais adapte le niveau de détail.

**Livrable :** Trois explications courtes et un tableau des faits invariants.

**Critères d’acceptation :** Aucune promesse de libération déterministe n’est faite ; les mesures restent attribuées à leur environnement ; les termes sont adaptés sans déformer le mécanisme.

**Transfert obligatoire :** Un public demande une certitude impossible : formule précisément ce qui est connu et ce qui ne l’est pas.
