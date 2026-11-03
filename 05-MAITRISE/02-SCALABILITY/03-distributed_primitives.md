---
last_reviewed: 2026-10-31
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, constraints_injectees]
anti_recipe_key: temps_limite+constraints_injectees
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Primitives distribuées : les bases qu'on te demandera en entretien

Temps de lecture ~5 min

Un système distribué, c'est deux machines qui essaient de se mettre d'accord alors que le réseau peut retarder, perdre ou dupliquer des échanges. Six concepts donnent un vocabulaire de base pour raisonner sur ces situations ; ils ne remplacent pas l'analyse du protocole et de ses garanties.

## 1. Idempotence

Une opération est idempotente si l'appeler 10 fois = l'appeler 1 fois.

- `DELETE /user/42` → idempotent (une fois supprimé, c'est supprimé).
- `POST /payment` → **pas** idempotent → utilise une `Idempotency-Key`.

Analogie : appuyer 10 fois sur le bouton d'ascenseur, la porte ne s'ouvre qu'une fois.

## 2. Retry avec exponential backoff + jitter

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

Serveur down ? Ne martèle pas.

```text
attempt 1 : wait 100ms
attempt 2 : wait 200ms + random(0..100)
attempt 3 : wait 400ms + random(0..200)
...
```

Le **jitter** évite le "thundering herd" (10 000 clients qui retry en même temps).

## 3. Timeout et durée de vie

Toute opération réseau à durée bornée doit avoir une deadline ou un timeout adapté.
Pour une connexion longue (WebSocket, flux, abonnement), définis plutôt une durée
maximale d'inactivité, des heartbeats et une politique explicite de fermeture.
Avec un `fetch` pris en charge par le runtime :

```js
const réponse = await fetch(url, { signal: AbortSignal.timeout(5000) });
```

Ce signal borne l'attente côté client ; il ne prouve pas qu'un serveur distant
n'a pas déjà reçu ou appliqué une écriture.

## 4. Circuit breaker

<!-- AF-DIAGRAM:circuit_breaker -->

```text
           seuil d'échecs consécutifs atteint
[ CLOSED ] ─────────────────► [ OPEN ]
     ▲                            │
     │ succès test                │ timeout
     │                            ▼
     └────────────── [ HALF-OPEN ]
```

Le circuit breaker protège une dépendance en passant de trafic normal à ouvert, puis en testant prudemment la récupération.

Après N échecs consécutifs (dans cette variante simple), arrête d'appeler pendant T secondes. Puis autorise une sonde représentative de la dépendance protégée ; un simple ping réseau ne prouve pas que le parcours métier fonctionne. Trois états : `CLOSED` (normal), `OPEN` (bloqué), `HALF_OPEN` (sonde).

## 5. CAP theorem, vulgarisé

Quand une partition réseau survient, un système distribué ne peut pas garantir
simultanément, pour la même opération, une réponse à chaque requête (**disponibilité
CAP**) et une cohérence forte de type linéarisable (**cohérence CAP**). Il doit
arbitrer selon les garanties configurées :

- **CP** : pendant la partition, privilégie la cohérence (au sens CAP, proche de la linéarisabilité) ; certaines opérations peuvent attendre un quorum ou être refusées.
- **AP** : privilégie une réponse malgré la partition ; selon le système et l'opération,
  une lecture peut être ancienne ou divergente, puis converger.

Ces catégories décrivent un compromis pour une opération et un modèle de panne ; elles
ne classent pas un produit entier. Les garanties dépendent de la configuration, du
niveau de cohérence et du chemin de lecture/écriture. « CA » peut décrire un système
sans partition dans un modèle simplifié, mais ne constitue pas une garantie réaliste
face à un réseau distribué susceptible de se partitionner.

## 6. At-least-once vs exactly-once

- Un consommateur qui confirme (`ack`/offset) après le traitement peut recevoir un rejeu
  si le worker tombe avant la confirmation : prévois une déduplication ou un effet idempotent.
- Kafka propose des garanties différentes selon la configuration et la frontière du
  traitement. Les transactions Kafka peuvent coordonner certains flux Kafka→Kafka ; elles
  ne rendent pas automatiquement atomique un effet écrit dans une base externe ou un
  fournisseur HTTP.
- Parle d'« exactly-once » uniquement en nommant la frontière couverte, les commits et les
  pannes traitées. Pour un effet métier externe, documente la clé, la transaction, l'outbox
  ou le mécanisme de rapprochement.

## Ce que l'analogie cache

L'ascenseur idempotent, c'est simple. Un `POST /transfer` idempotent nécessite un **store de clés** (Redis) avec TTL et gestion des collisions. Le concept est facile, l'implémentation propre non.

## Mission

Modélise un échange de tribut entre `service_orders` et `service_payments`. Réseau non fiable. Livre :

- Séquence ASCII de la conversation.
- Où tu mets l'idempotence.
- Ta politique de retry.
- Un ADR qui justifie CP ou AP.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Transfert : changer de contexte

Applique le mécanisme de « Primitives distribuées : les bases qu'on te demandera en entretien » à une panne partielle avec retard, duplication et ordre différent. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Primitives distribuées : les bases qu'on te demandera en entretien** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir une primitive distribuée pour un invariant

**Mission liée à « Primitives distribuées : les bases qu'on te demandera en entretien » :** Pour un cas Kintana, sélectionne une primitive (idempotency key, timeout, retry borné, lease ou horloge logique) et définis exactement l’invariant qu’elle protège.

**Livrable :** Fiche de primitive, séquence nominale et deux séquences de panne.

**Critères d’acceptation :** La primitive n’est pas présentée comme une garantie globale ; ses limites et son périmètre sont écrits ; les duplications sont traitées.

**Transfert obligatoire :** La primitive tombe en panne ou expire : précise le comportement de repli.
