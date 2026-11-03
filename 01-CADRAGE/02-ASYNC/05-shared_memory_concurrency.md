---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# CONCURRENCE MÉMOIRE : SharedArrayBuffer & Atomics

Temps de lecture ~15 min

JS "single-thread" ? Plus tout à fait. Avec les Workers + `SharedArrayBuffer`, deux threads voient la MÊME mémoire. Bienvenue dans le monde des data races.

---

## POURQUOI ÇA EXISTE

Tu veux traiter une image de 50 Mo en parallèle sur 4 cœurs sans la recopier 4 fois. `SharedArrayBuffer` partage un bloc mémoire brut entre le main thread et des Workers. `Atomics` te donne des opérations indivisibles pour éviter que deux threads corrompent le même octet.

---

## L'EXEMPLE QUI FAIT MAL (data race)

```js
// main.js
const sab = new SharedArrayBuffer(4);
const view = new Int32Array(sab);
const w1 = new Worker("worker.js");
const w2 = new Worker("worker.js");
w1.postMessage(sab);
w2.postMessage(sab);

// worker.js
onmessage = (e) => {
  const v = new Int32Array(e.data);
  for (let i = 0; i < 100000; i++) v[0]++; // [NON] pas atomique
};
```

Résultat après les deux workers : PAS 200000. Chaque `v[0]++` est en réalité lire→incrémenter→écrire. Les deux threads se marchent dessus.

Fix :

```js
Atomics.add(v, 0, 1); // [OK] indivisible
```

---

## (attention) CE QUE L'ANALOGIE (« deux mecs qui écrivent sur le même tableau ») CACHE

Le CPU réordonne les lectures/écritures pour la perf. Sans `Atomics`, tu n'as même pas la garantie que l'autre thread VOIT ce que tu viens d'écrire. C'est pire qu'une simple collision : c'est de l'invisibilité.

---

## MISSION

Écris deux Workers qui incrémentent un compteur partagé 1M de fois chacun. Compare : version naïve vs `Atomics.add`. Note l'écart au résultat attendu et le temps.

Bonus : implémente un mutex avec `Atomics.wait` / `Atomics.notify`.

---

## PRINCIPES DURABLES

- Mémoire partagée = data races par défaut.
- `Atomics` = opérations indivisibles, obligatoires dès qu'on partage.
- La visibilité mémoire n'est PAS gratuite ; il faut la demander.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-DIAGRAM:async -->

## Repère visuel utile : Worker de notifications asynchrones fiable

```text
producteur -> file bornée -> worker × N -> fournisseur
                 |              |
          file pleine ?      timeout ?
            |                  |
            v                  v
       backpressure       retry borné / DLQ
                               |
                               v
                        déduplication
```

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CONCURRENCE MÉMOIRE : SharedArrayBuffer & Atomics** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « CONCURRENCE MÉMOIRE : SharedArrayBuffer & Atomics » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
