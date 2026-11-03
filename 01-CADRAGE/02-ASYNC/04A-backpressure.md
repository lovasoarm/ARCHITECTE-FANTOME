---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

# 05b : Backpressure : quand le producteur va plus vite que le consommateur

<!-- AF-DIAGRAM:backpressure -->

```text
┌──────────┐    ┌───────────┐    ┌──────────┐
│ Producer │───►│ Queue     │───►│ Consumer │
└──────────┘    │ ████████  │    └──────────┘
                └────┬──────┘
                     │ saturation
                     ▼
                ralentir / refuser
```

Le backpressure limite la production lorsque la capacité de consommation ou de stockage devient insuffisante.

Temps de lecture ~5 min

Ton stream produit 10 MB/s. Ton consommateur en avale 2 MB/s. Sans régulation, tu explose la RAM. C'est la backpressure : dire au producteur "attends".

## Push vs Pull

- **Push** : le producteur envoie dès qu'il peut. Rapide, mais dangereux.
- **Pull** : le consommateur tire quand il est prêt. Sûr, mais nécessite un protocole.

Node streams : mode push par défaut, mais `.pause()` / `.resume()` + `readable.read()` te donnent du pull.

## Exemple minimal

```js
import { createReadStream, createWriteStream } from "node:fs";
const src = createReadStream("huge.log");
const dst = createWriteStream("/dev/null");

src.on("data", (chunk) => {
  const ok = dst.write(chunk);
  if (!ok) src.pause(); // dst sature -> stop
});
dst.on("drain", () => src.resume()); // dst prêt -> reprendre
```

Ou plus court, la version qui fait tout ça pour toi : `src.pipe(dst)` ou `pipeline(src, dst, cb)`.

## Web Streams (fetch, WHATWG)

`ReadableStream` a un `queuingStrategy`. Un `highWaterMark` bas force le consommateur à tirer. Pareil, pattern universel.

## Ce que l'analogie cache

La backpressure ne "ralentit" pas magiquement le producteur si tu l'ignores. Si le producteur est un WebSocket ou une DB, il faut coder la logique de pause (buffer intermédiaire, credit-based flow).

## Mission

Écris un pipeline : lecture d'un CSV de 1 GB, transformation ligne par ligne, écriture. Mesure la RAM. Sans backpressure vs avec.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **05b : Backpressure : quand le producteur va plus vite que le consommateur** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « 05b : Backpressure : quand le producteur va plus vite que le consommateur » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
