---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/05-local-first-crdt.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/05-local-first-crdt.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 05 : Local-first, synchronisation et CRDT

> **Arc One Piece :** ton application doit continuer le voyage même quand le Log Pose (réseau) est cassé. Mais quand deux équipages modifient le même trésor, il faut une règle claire pour ne pas effacer le travail de l'autre.

<!-- AF-DIAGRAM:local-first -->

## Repère visuel utile : Synchronisation locale

```text
Action -> base locale transactionnelle -> UI offline
                    |
                    v
              outbox durable
                    |
             réseau disponible
                    |
              sync idempotente
                    |
          conflit ? -> règle métier
```

<!-- AF-LESSON-PROFILE: local-first -->

## Résultat attendu

Concevoir une application qui reste utile hors ligne, synchronise les changements après reconnexion et résout les conflits selon la sémantique métier. Savoir quand CRDT aide et quand il complique inutilement le système.

## Pourquoi ce problème est différent

Le réseau est lent, intermittent, parfois absent. Les requêtes peuvent être dupliquées, retardées ou désordonnées. L'appareil peut redémarrer au mauvais moment. La sync n'est donc pas « envoyer les données quand internet revient » : c'est un protocole de réplication avec des invariants.

```text
Action utilisateur
      |
      v
Base locale transactionnelle
      |
      +----> UI lit l'état local même offline
      |
      v
Outbox durable (pending operations)
      |
      v
Sync worker -- réseau revenu --> API idempotente
      |                           |
      +<---- accusé / conflit -----+
      |
      v
Résolution métier / fusion / intervention utilisateur
```

## Notions à apprendre

- **Offline-first** : le parcours défini reste utilisable sans connexion. Les fonctions dépendant du serveur doivent être clairement indiquées.
- **Local-first** : l'utilisateur garde une copie et un contrôle réel sur ses données locales, y compris export et restauration.
- **Outbox** : les opérations à envoyer sont écrites localement avec la modification métier, puis envoyées plus tard. Les reprises doivent être idempotentes.
- **Conflit** : deux états concurrents ne peuvent pas être fusionnés aveuglément. Une réservation, un solde et un compteur n'ont pas la même règle métier.
- **Last-write-wins** : simple mais peut perdre une modification ; l'horloge locale n'est pas toujours fiable.
- **Résolution explicite** : l'utilisateur ou une règle métier choisit. Plus coûteux UX, mais souvent correct pour les décisions sensibles.
- **CRDT** : structures et opérations conçues pour converger sous des hypothèses précises. Exemples : compteur grow-only, ensemble add/remove avec identifiants uniques, registre multi-valeurs. Chaque type a ses limites.
- **Tombstone** : marqueur de suppression conservé assez longtemps pour propager la suppression ; purger trop tôt peut faire réapparaître une donnée.
- **Causalité/version** : distinguer ordre local, ordre serveur et dépendances entre opérations. L'heure murale ne suffit pas toujours.

## Quand utiliser CRDT / quand l'éviter

CRDT est pertinent quand plusieurs répliques doivent modifier les mêmes données avec convergence automatique et que les opérations possèdent une sémantique compatible. Évite-le pour des invariants financiers, une réservation exclusive ou une règle qui exige un arbitre serveur sans conception métier adaptée. Une fusion automatique n'est pas automatiquement une bonne décision.

## Limites

CRDT ne fournit ni autorisation, ni chiffrement, ni sauvegarde, ni validation métier. Un appareil peut être perdu. Une opération peut être révoquée. La synchronisation peut être retardée. Les conflits irréconciliables doivent être exposés, pas cachés.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [Browser storage](../../../00-SOCLE/04-FUNDAMENTALS/05_web_basics/04-storage_treasure.md) et [DB/data modeling](../../01-DATABASES/README.md).
- [Async](../../../01-CADRAGE/02-ASYNC/README.md), [shared memory/concurrency](../../../01-CADRAGE/02-ASYNC/05-shared_memory_concurrency.md), [distributed primitives](../../02-SCALABILITY/03-distributed_primitives.md) et [queues](../../02-SCALABILITY/08-message_queues.md).
- [Transactions et idempotence : Lab 65](../../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md).
- Flutter est une option d'interface : [Client Systems Flutter](../../../02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/README.md), notamment [offline sync](../../../02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/03-offline-sync.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : Zéro Réseau pour Kintana

Choisis une action réellement utile hors ligne, par exemple préparer un brouillon de demande ou enregistrer une note de suivi. Écris les invariants avant le code. Simule deux appareils, trois conflits, une fermeture forcée, des doublons et une reconnexion après plusieurs heures.

**Livrable :** modèle d'état local, outbox, politique de conflit, journal de sync, tests réseau perturbé, export/restore, threat model et décision justifiée CRDT ou non-CRDT.

**Critère de sortie :** l'usage local survit au redémarrage ; la sync répétée ne duplique pas l'effet ; aucun changement n'est perdu silencieusement ; l'utilisateur comprend les conflits non résolus.

## Transfert obligatoire

Un utilisateur supprime une donnée hors ligne, mais un ancien appareil se reconnecte avec une copie en retard. Explique comment la suppression se propage et pourquoi la donnée ne doit pas ressusciter.

## Références

[08 : Zéro Réseau](../08-zero-reseau.md) · [Kleppmann et al. : Local-first software](https://martin.kleppmann.com/2019/10/23/local-first-at-onward.html).
