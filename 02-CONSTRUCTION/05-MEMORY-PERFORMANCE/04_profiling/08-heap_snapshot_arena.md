---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# 05 : Heap Snapshot Arena

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

Temps de lecture ~5 min

> Outil V8 : **Principe universel intemporel** : diff de snapshots = méthode canonique pour traquer une fuite dans n'importe quel runtime managé (JVM, .NET, Python, Go pprof).

## Mission

On te livre `leaky-app.js` (à écrire à partir de la spec ci-dessous).
Objectif : **prouver** la fuite avec 3 heap snapshots et **nommer la closure fautive**.

## Spec de l'app qui fuit

Un serveur HTTP minimal qui, à chaque requête `/register`, ajoute un handler dans un `Map` global mais ne le supprime jamais.

```js
// squelette : à toi de compléter
import http from "node:http";
const listeners = new Map();
http
  .createServer((req, res) => {
    if (req.url === "/register") {
      const big = new Array(100_000).fill(Math.random());
      listeners.set(Math.random(), () => big.length);
      res.end("ok");
    }
  })
  .listen(3000);
```

## Protocole

1. Démarre avec `node --inspect leaky-app.js`.
2. Ouvre `chrome://inspect` → **Memory** → prends **Snapshot 1**.
3. Envoie 500 requêtes (`for i in $(seq 500); do curl -s localhost:3000/register; done`).
4. Force un GC (bouton poubelle) → **Snapshot 2**.
5. Envoie 500 requêtes de plus → **Snapshot 3**.
6. Compare S2 → S3 (**Comparison view**). Trie par **Size Delta**.

## Livrable

`REPORT.md` avec :

- 3 captures annotées (flèches sur la closure `() => big.length`).
- La **retainer chain** de l'objet fautif.
- Le fix (1 ligne suffit).

## (attention) Ce que l'exercice cache

Un snapshot **fige** l'état ; il ne dit pas **pourquoi** l'objet est retenu. La `retainer chain` est ta boussole, pas la taille brute.

<!-- AF-DIAGRAM:performance -->

## Repère visuel utile : Enquêter à partir des chemins de rétention

```text
objet suspect
      |
      v
retainer path
      |
      v
propriétaire qui conserve la référence
      |
      v
hypothèse de cycle de vie
      |
      v
correction candidate + preuve
```

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **05 : Heap Snapshot Arena** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Résoudre un cas de rétention à partir d’un heap snapshot

**Mission liée à « 05 : Heap Snapshot Arena » :** Traite le scénario de l’arène comme une enquête : identifie l’objet suspect, remonte ses retainer paths, propose une cause et vérifie-la en retirant une seule référence.

**Livrable :** Dossier d’enquête avec hypothèses, snapshots et preuve de correction.

**Critères d’acceptation :** Le chemin de rétention est montré ; les objets attendus sont exclus ; une variation de mémoire seule n’est pas suffisante.

**Transfert obligatoire :** Le chemin de rétention traverse une dépendance : nomme le propriétaire à qui transmettre la correction.
