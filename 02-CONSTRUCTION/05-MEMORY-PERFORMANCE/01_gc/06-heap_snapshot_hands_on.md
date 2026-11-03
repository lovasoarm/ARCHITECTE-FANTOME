---
perishability_id: PER-0015

stability: perissable
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, decision_organisationnelle]
anti_recipe_key: preuve_partielle+decision_organisationnelle
transfer_distance: high
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots
source_type: primary
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Heap snapshot hands-on ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Heap snapshot hands-on

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

Temps de lecture ~35 min

Tu vas ouvrir la mémoire de ton process comme on ouvre un capot. Pas de théorie recopiée
d'un blog : tu prends un snapshot, tu compares deux snapshots, tu pointes l'objet coupable.

Prérequis : Node 22+, Chrome ou Edge (pour DevTools Memory), `--expose-gc`, avoir fait
`04-leak_from_closure_walkthrough.md`.

---

## 1) LE PROTOCOLE (à suivre à la lettre)

```text
1. Lance ton process avec : node --expose-gc --inspect=0.0.0.0:9229 script.js
2. Ouvre chrome://inspect → "inspect" sur le target Node
3. Onglet Memory → "Take heap snapshot"  (snapshot A, état de repos)
4. Provoque l'action suspectée de fuite (10 fois, pour amplifier le signal)
5. Force le GC : dans la Console DevTools, tape gc()
  (nécessite --expose-gc, sinon global.gc() n'existe pas)
6. "Take heap snapshot"           (snapshot B, après action + GC)
7. Compare B vs A : Filter "Comparison" en haut à gauche
8. Trie par "# Delta" décroissant. Le top 5 est ta liste de suspects.
```

Règle d'or : **si un objet apparaît en delta positif APRÈS un GC forcé, il est retenu.**
Pas retenu = pas de fuite. Retenu = quelqu'un le tient. Ton job : trouver qui.

---

## 2) POURQUOI `--expose-gc` ET `gc()`

Sans forcer le GC, ton snapshot B contient encore des objets _poubelle mais pas ramassés_.
Tu confonds alors "pas encore collecté" et "fuite". `gc()` élimine ce bruit. En prod, tu
n'auras pas ce luxe : tu devras raisonner avec des heuristiques (heap growth trend,
`--trace-gc`). Ici, on apprend à distinguer les deux mondes.

---

## 3) LIRE LE PANNEAU "COMPARISON"

```text
Objet        # New  # Deleted  # Delta  Size Delta
------------------  ------  ---------  -------  ----------
(closure)      120   0      +120    48 KB    <-- SUSPECT
Array        12    11      +1     120 B
HTMLElement (det.)  47    0      +47    14 KB    <-- SUSPECT (DOM détaché)
```

- **(closure)** : capture une variable qui vit trop longtemps (listener non retiré,
  callback stocké dans un cache global).
- **Detached DOM** : nœud retiré du DOM mais encore référencé par du JS. Classique en SPA.
- **Array** en croissance linéaire : cache sans borne, buffer, log en RAM.

---

## 4) MISSION (livrable)

Prends la fixture `02-CONSTRUCTION/02-MINI-PROJECTS/13_memory_hunter/00_fixture/`.
Exécute le protocole ci-dessus. Produis `LEAK_REPORT.md` (template dans le mini-projet)
avec :

1. Nom du/des objets fuyants (retainer path complet).
2. Ligne de code coupable.
3. Fix proposé (diff minimal).
4. Snapshot C après fix : delta doit revenir à 0 sur l'objet ciblé.

Si tu ne peux pas fournir les 4 points, tu n'as pas trouvé la fuite. Tu as trouvé un
symptôme. Recommence.

---

## 5) (attention) CE QUE L'OUTIL CACHE

DevTools montre la heap V8 uniquement. Il ne montre PAS :

- la mémoire native (Buffer, addons C++, WebAssembly linear memory),
- les fuites côté OS (file descriptors, sockets),
- les fuites côté worker thread (chaque worker a sa propre heap).

Pour ça : `process.memoryUsage()`, `process.report`, `lsof -p <pid>`. À creuser dans
`06_native_and_worker_leaks.md`.

Prochaine étape : `07-detached_dom_leak.md`.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Lire une comparaison de heap snapshots

```text
snapshot de départ
       |
       v
reproduire le scénario
       |
       v
snapshot après reproduction
       |
       v
comparer constructeurs et tailles
       |
       v
remonter les retainer paths
       |
       v
hypothèse à vérifier
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Heap snapshot hands-on** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Lire un heap snapshot par chemins de rétention

**Mission liée à « Heap snapshot hands-on » :** Prends deux instantanés d’un scénario Kintana après un protocole identique. Compare les constructeurs et les chemins de rétention, puis formule une hypothèse vérifiable sur les objets qui restent vivants.

**Livrable :** Deux instantanés, procédure de capture et hypothèse annotée.

**Critères d’acceptation :** Le même parcours est rejoué ; les objets attendus sont distingués des fuites probables ; les limites de l’outil sont notées.

**Transfert obligatoire :** La taille du heap varie mais aucun chemin suspect n’apparaît : indique quelle autre mesure serait utile.
