---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mission Konoha :** trois clones partent en même temps, mais un seul doit avoir le dernier mot. Si tu ne distingues pas file d'attente, concurrence et ordre d'exécution, les clones vont te livrer leurs résultats dans un ordre qui te fera accuser le mauvais ninja.

# Expliquer l'event loop à un enfant de 5 ans

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

Temps de lecture ~4 min

Si tu n'arrives pas à expliquer l'event loop à un enfant de 5 ans, c'est que tu ne l'as pas compris. Feynman, en substance.

Cette leçon n'ajoute pas de contenu technique. Elle t'oblige à en enlever.

---

## LE FORMAT IMPOSÉ

Rédige (dans `01-CADRAGE/02-ASYNC/04_event_loop/mon_explication_5_ans.md`) une explication de 5 à 8 lignes, sans un seul mot technique. Interdits : `microtask`, `macrotask`, `queue`, `callback`, `thread`, `promise`, `stack`, `heap`, `synchrone`, `asynchrone`, `scheduler`. Autorisés : tout ce qui parlerait à un enfant qui regarde un dessin animé.

Puis vérifie que ton texte permet à un lecteur naïf de prédire correctement la sortie de :

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Réponse attendue : `A D C B`. Si ton explication ne fait pas tomber le bon ordre, elle est fausse (ou trop vague).

---

## EXEMPLE DE CE QU'ON CHERCHE (à ne PAS copier)

Imagine un cuisinier dans une cuisine. Il a une liste de plats à préparer sur son plan de travail : il les fait un par un, dans l'ordre. Quand quelqu'un lui glisse un mot avec une petite tâche urgente (par exemple : "assaisonne ce plat"), il termine ce qu'il est en train de faire, puis fait toutes les petites tâches urgentes d'un coup. Ensuite seulement il regarde la sonnette de la porte, qui lui signale les commandes à emporter (les plus lentes). Il ne peut jamais faire deux choses en même temps, mais il ne laisse jamais la cuisine vide.

Dans cette histoire : petites tâches urgentes = ce que ton `Promise.then` déclenche. Sonnette = ce que ton `setTimeout` déclenche. Le cuisinier = le thread principal.

---

## POURQUOI CE FORMAT

Un dev qui sait expliquer sans jargon a compris. Un dev qui ne sait qu'expliquer avec le vocabulaire technique a mémorisé. En entretien, la question "explique l'event loop à un enfant" tue plus de candidats que la question "code une queue de microtasks".

---

## LIVRABLE + CRITÈRE

Livrable : `mon_explication_5_ans.md` (5 à 8 lignes, sans mots interdits).
Critère : trois lecteurs non-tech (colocataire, parent, ami) prédisent correctement la sortie du programme ci-dessus après avoir lu ton texte, sans autre indice.

---

Voir aussi : `01-CADRAGE/02-ASYNC/04_event_loop/90-grimoire.md`, `03-PILOTAGE/10-TEAM-CRAFT/14-three_audiences_drill.md`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

<!-- AF-LESSON-PROFILE: async -->

## Repères de décision

- **Pourquoi :** L'asynchronisme permet au système de continuer pendant l'attente, mais introduit ordre, concurrence, annulation et erreurs différées.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour I/O, tâches longues, notifications ou flux continus. Évite les traitements concurrents sans limite ; impose timeout, annulation et backpressure quand le producteur peut dépasser le consommateur.
- **Limites :** `Promise.race` ne tue pas l'opération perdante ; `Promise.all` rejette au premier échec observable ; `allSettled` collecte les résultats mais ne fournit pas de stratégie de reprise. La mémoire partagée exige une synchronisation explicite.

## Mécanisme : la version sans magie

Sépare tâche, attente et consommation. Fixe un délai, une politique d'annulation, une limite de concurrence et une règle de rejeu/idempotence selon les effets.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Expliquer l'event loop à un enfant de 5 ans** se rattache à ce cas concret : Le service de notification Kintana traite plusieurs demandes. Un fournisseur lent ne doit pas bloquer toute la file ni provoquer des doublons au retry.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Worker de notifications asynchrones fiable

> **Arc One Piece / Grand Line :** un message peut arriver tard, deux fois ou pas du tout. Le navigateur ne promet pas que tout le monde rame à la même vitesse.

**Mission liée à « Expliquer l'event loop à un enfant de 5 ans » :** Implémente un worker pour les notifications Kintana avec concurrence bornée, timeout, annulation quand elle est supportée, backoff avec jitter et clé de déduplication. Instrumente le nombre en attente et l'âge du plus vieux message.

**Livrable :** un worker, une horloge contrôlée dans les tests, un test de timeout, un test de rejeu et un scénario de saturation.

**Critères d’acceptation :** la concurrence ne dépasse jamais la limite ; le message échoué est classé ; un replay ne double pas l'effet ; l'annulation est distinguée d'un timeout ; le backlog est observable.

**Transfert obligatoire :** Augmente le débit producteur jusqu'à dépasser le débit consommateur. Explique quand appliquer backpressure, rejeter ou stocker temporairement.
