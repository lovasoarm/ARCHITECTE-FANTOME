---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, preuve_partielle]
anti_recipe_key: changement_contexte+preuve_partielle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Distributed thinking (sans K8s, sans buzz)

Temps de lecture ~5 min

> **Principe universel** : dès que 2 processus se parlent en réseau, tu es en distribué. Tous les problèmes d'après en découlent.

## 5 idées non négociables

### 1. Idempotence

Faire la même opération deux fois == une fois. Sans ça, retry = corruption.
**Exemple** : `POST /transfer` avec `Idempotency-Key`.

### 2. Retry avec backoff

<!-- AF-DIAGRAM:retry -->

```text
┌────────┐   fail   ┌─────────┐   wait   ┌────────┐
│ call 1 │─────────►│ backoff │────────►│ call 2 │
└────────┘          └─────────┘          └────┬───┘
                                              │ fail
                                              ▼
                                        wait plus long
```

Un retry sain combine décision de retry, délai de backoff et limite d’essais pour éviter d’amplifier la panne.

Retry immédiat = tempête. Retry exponentiel + jitter = poli.

```js
const plafond = Math.min(30_000, 100 * 2 ** (attempt - 1));
await sleep(Math.random() * plafond);
```

Ce fragment calcule **uniquement le délai** : `attempt` commence à 1 et `sleep` est
un helper fourni par l'application. Il ne constitue pas une politique de retry complète.
Il doit être utilisé seulement après qu'un `shouldRetry(error)` explicite a confirmé
une erreur transitoire et avant la limite d'essais. Ne rejoue jamais un effet métier
non idempotent sans déduplication ou clé d'idempotence.

### 3. Deadline sur les appels distants

Un appel distant qui doit respecter un budget de latence doit avoir une deadline ou un
timeout adapté au client. Avec `fetch`, un `AbortSignal` permet d'interrompre l'attente
côté client ; cela ne prouve pas que le serveur n'a pas déjà appliqué une écriture.

### 4. Exactly-once : nomme la frontière

Certains systèmes garantissent un traitement/commit unique dans un périmètre défini.
Pour les effets externes non coordonnés, `at-least-once` avec déduplication atomique ou
idempotence peut produire un effet métier unique dans le périmètre couvert, sans garantir
qu'un e-mail, un paiement ou une API tierce n'aura jamais de doublon.

### 5. Modélise l'échange

Dessine : **qui appelle qui, avec quoi, que se passe-t-il si ça échoue à mi-chemin ?**

## Exercice

Un `POST /pay` déclenche : débit A → crédit B → email.

- Que se passe-t-il si l'email échoue ?
- Que se passe-t-il si le crédit échoue ?
- Que se passe-t-il si le client re-clique ?

Écris le protocole (3 hypothèses de panne, 3 remèdes).

## (attention) Ce que "microservices" cache

Le distribué n'est **pas** un choix architectural, c'est une **conséquence**. Évite-le tant que possible.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Transfert : changer de contexte

Applique le mécanisme de « Distributed thinking (sans K8s, sans buzz) » à une panne partielle avec retard, duplication et ordre différent. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Distributed thinking (sans K8s, sans buzz)** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Modéliser un parcours distribué et ses délais

**Mission liée à « Distributed thinking (sans K8s, sans buzz) » :** Dessine les appels entre services Kintana et répartis un budget de latence. Ajoute timeout, indisponibilité partielle et réponse tardive pour montrer pourquoi un appel réseau n’est pas une fonction locale.

**Livrable :** Diagramme de séquence, budget de latence et scénario de panne partielle.

**Critères d’acceptation :** Les délais réseau et les dépendances sont visibles ; les retries ne sont pas illimités ; les hypothèses de synchronie sont explicites.

**Transfert obligatoire :** Un service répond après timeout : précise comment éviter un effet en double.
