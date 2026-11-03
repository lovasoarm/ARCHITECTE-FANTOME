---
stability: stable
acte: concevoir
---

# Cas fil rouge DDD : commande, paiement et livraison sans modèle métier monolithique

## 1. Objectif du cas

Ce cas montre comment découper un système par responsabilités métier, définir des contrats et faire évoluer un système existant sans laisser les dépendances techniques décider des frontières. Il ne s'agit pas de créer un microservice par nom : un bounded context peut être un module dans un monolithe modulaire. La séparation physique vient plus tard, si elle répond à un besoin démontré.

## 2. Langage ubiquitaire

Le **langage ubiquitaire** est un vocabulaire partagé et précis utilisé par les développeurs et les personnes métier dans un contexte donné. Une même expression peut avoir un sens différent dans deux contextes ; cette différence doit être explicite.

Dans le cas, « commande » ne signifie pas la même chose partout :

- Sales : intention d'achat et lignes commandées ;
- Payment : créance à encaisser et résultat d'une autorisation/capture ;
- Fulfillment : travail de préparation et colis à expédier ;
- Delivery : mission transporteur, suivi et preuve de livraison.

Ne pas partager un objet `Order` global qui contiendrait tous les champs et toutes les règles de tous les contextes. Chaque contexte possède son modèle local et traduit les informations dont il a besoin.

## 3. Carte des bounded contexts

Un **bounded context (contexte borné)** est une frontière à l'intérieur de laquelle un modèle et son langage ont un sens cohérent. La frontière protège les invariants et évite qu'un changement local ne casse toutes les équipes.

```text
                 [Canal Web / Mobile]
                          |
                          v
              +-----------------------+
              | SALES / ORDERING      |
              | panier, commande, prix|
              +-----------------------+
                    | OrderPlaced
                    v
              +-----------------------+
              | PAYMENT               |
              | autorisation, capture |
              +-----------------------+
                    | PaymentCaptured
                    v
              +-----------------------+
              | FULFILLMENT           |
              | stock, picking, colis |
              +-----------------------+
                    | ParcelHandedOver
                    v
              +-----------------------+
              | DELIVERY              |
              | transport, suivi      |
              +-----------------------+

     [CUSTOMER / IDENTITY] : identité et coordonnées référencées
     [CATALOG / PRICING]   : produits, prix et règles commerciales
```

Les événements circulent dans le sens indiqué. Le fait qu'un contexte publie un événement ne lui donne pas une dépendance directe sur la base de données du contexte suivant.

## 4. Agrégats et invariants

Un **agrégat** est une frontière de cohérence transactionnelle autour d'un ensemble d'objets métier ; son agrégat racine contrôle les invariants. Dans Sales, `Order` peut être un agrégat : une commande ne passe à `CONFIRMED` que si ses lignes, prix, devise et adresse répondent aux règles applicables. Dans Payment, `PaymentAttempt` contrôle ses propres transitions : une capture ne peut pas être enregistrée deux fois pour la même opération logique.

Un agrégat n'est pas nécessairement une table SQL ni un service. Le choisir trop grand crée des conflits de concurrence et des transactions lourdes ; le choisir trop petit peut rendre impossible le respect d'un invariant.

## 5. Flux métier complet

1. Sales reçoit `PlaceOrder`, vérifie le client, le panier, la disponibilité connue et le prix applicable, puis crée `Order` en état `PENDING_PAYMENT`.
2. Sales publie `OrderPlaced` avec un identifiant d'événement stable, un identifiant de commande, un montant et une version de schéma.
3. Payment consomme l'événement, crée un `PaymentAttempt` idempotent et contacte le prestataire. Il publie `PaymentCaptured` ou `PaymentFailed`.
4. Sales consomme le résultat et confirme ou annule la commande selon sa politique ; l'événement peut être dupliqué ou retardé.
5. Fulfillment ne commence qu'après confirmation. Il réserve les éléments et crée une préparation.
6. Delivery reçoit un colis prêt, crée une mission et publie les changements de suivi.
7. Un écran de commande construit sa lecture à partir des projections et indique éventuellement que le suivi est en cours de mise à jour.

```text
Client
  | PlaceOrder
  v
SALES -- OrderPlaced --> PAYMENT -- PaymentCaptured --> SALES
  |                                                   |
  |                                          OrderConfirmed
  |                                                   v
  +--------------------------------------------> FULFILLMENT
                                                   |
                                            ParcelHandedOver
                                                   v
                                                DELIVERY
                                                   |
                                            TrackingUpdated
                                                   v
                                          Read projection / UI
```

## 6. Contrats entre contextes

Un **contrat** décrit la forme, le sens, les règles, la compatibilité et les garanties d'un échange. Il inclut plus que le JSON : identité, auth, idempotence, ordering éventuel, erreurs, versionnage, délai, propriété des données et politique de rétention.

**Upstream** (amont) est le contexte qui fournit l'interface ou l'événement ; **downstream** (aval) est celui qui en dépend. Le fournisseur doit annoncer les changements et maintenir une compatibilité définie. Le consommateur doit tolérer les champs optionnels, doublons ou délais selon le contrat.

Exemple de contrat `OrderPlaced` :

```json
{
  "eventId": "evt-unique-123",
  "eventType": "sales.order-placed.v1",
  "occurredAt": "2026-10-30T08:00:00Z",
  "orderId": "ord-42",
  "customerRef": "cus-7",
  "currency": "EUR",
  "totalMinor": 1299,
  "schemaVersion": 1
}
```

L'exemple est illustratif : en production, préciser validation, signature/auth du transport, tenant, identifiant de corrélation, clé de partition, politique PII et évolution de schéma. Utiliser les unités mineures évite les erreurs de nombres flottants monétaires, à condition de définir la devise et son nombre de décimales.

## 7. Anti-Corruption Layer

Une **Anti-Corruption Layer (ACL, couche de traduction protectrice)** empêche un modèle externe ou legacy de contaminer le domaine interne. Elle traduit les concepts, unités, statuts et erreurs du système source vers le langage cible.

```text
[Legacy ERP : status=7, amount=float, cust_no]
                    |
                    v
          [Adaptateur / ACL]
          - mappe les statuts
          - valide la devise
          - convertit les identifiants
          - traduit les erreurs
                    |
                    v
       [Domaine Sales : Order / Money]
```

Ne pas faire passer directement un DTO legacy dans le cœur métier. L'ACL doit être testée avec des exemples réels, notamment valeurs inconnues et champs manquants.

## 8. CQRS et projections

**CQRS (Command Query Responsibility Segregation)** sépare les modèles utilisés pour les commandes (écriture et invariants) et les requêtes (lecture optimisée). CQRS n'exige pas deux bases de données ; une séparation logique peut suffire.

```text
[Commande utilisateur]
         |
         v
[Validation + agrégat / modèle écriture]
         |
         v
[Transaction + événement/outbox]
         |
         v
[Consommateur]
         |
         v
[Projection de lecture]
         |
         v
[Query API / écran]
```

Une **projection** est une représentation calculée à partir des événements ou données d'écriture, adaptée à une lecture. Elle peut être en retard. L'interface doit connaître la fraîcheur ou afficher un état de traitement au lieu de présenter une projection éventuellement cohérente comme une vérité instantanée.

## 9. Cohérence éventuelle

La **cohérence éventuelle** signifie que des copies/projections convergent si les événements sont traités correctement et que le système cesse de recevoir de nouveaux changements. Elle implique un délai visible et des états intermédiaires. Elle ne convient pas à tous les invariants : le solde, la capture d'un paiement ou la réservation d'une ressource rare peuvent exiger une décision cohérente dans le contexte propriétaire.

Les consommateurs doivent gérer doublons, ordre partiel, retry, poison messages et rejeu. L'outbox transactionnelle lie l'écriture métier à la publication ; l'inbox/déduplication empêche les effets répétés côté consommateur.

## 10. Migration progressive du legacy

1. Cartographier les responsabilités actuelles et caractériser les comportements existants avec des tests.
2. Choisir une frontière selon le changement métier et la cohésion, pas selon les tables.
3. Introduire un contrat et une ACL devant le legacy.
4. Migrer un flux limité en gardant une source d'autorité unique.
5. Réconcilier et comparer les résultats en mode shadow (sans double effet métier).
6. Basculer progressivement le trafic ; documenter retour arrière et cohérence des données.
7. Retirer l'ancien chemin après preuve et période de stabilisation.

Éviter deux systèmes qui écrivent en parallèle la même vérité sans protocole de résolution. Le pattern strangler consiste à remplacer progressivement des capacités en routant les flux vers le nouveau système, pas à dupliquer tout le système en une fois.

## 11. Bonnes et mauvaises frontières

| Frontière                                   | Pourquoi elle est bonne ou mauvaise                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Paiement séparé de Sales                    | Règles de paiement, idempotence et prestataires propres ; contrat explicite nécessaire               |
| Un microservice par table                   | Mauvaise : découpe technique sans cohésion métier, appels distribués superflus                       |
| Livraison avec modèle `Order` complet copié | Risque de couplage ; Delivery doit recevoir une projection/contrat adapté                            |
| Catalogue et pricing toujours confondus     | Peut être valide pour un domaine simple, mais à séparer si règles et rythmes évoluent indépendamment |
| ACL devant un ERP aux statuts historiques   | Bonne si elle traduit et protège le modèle cible, plutôt qu'exposer le vocabulaire ERP               |

## 12. Exercices progressifs

### Exercice A : Délimiter

À partir d'un scénario de commande, identifier acteurs, verbes, règles et données. Dessiner deux découpages possibles ; choisir l'un selon cohésion, invariants, ownership et fréquence de changement.

### Exercice B : Définir un contrat

Définir `PaymentCaptured` : champs, unités, version, identité, duplication, erreurs, délai et compatibilité. Ajouter au moins un exemple valide et deux invalides.

### Exercice C : Faire évoluer le contrat

Ajouter un champ `paymentMethod`. Indiquer comment le consommateur ancien se comporte, comment le nouveau producteur déploie, et à quel moment un champ devient obligatoire ou une nouvelle version majeure est nécessaire.

### Exercice D : Concevoir une ACL

Traduire trois statuts legacy vers le langage Sales ; prévoir statut inconnu, montant invalide et identifiant manquant. Le système doit échouer de manière explicite, pas inventer une valeur.

### Exercice E : CQRS et cohérence

Choisir une projection de lecture, définir le délai acceptable, le signal de fraîcheur et les conséquences d'un événement dupliqué ou retardé.

## 13. Grille de vérification / 30

- frontières et langage (5) ;
- invariants et agrégats (5) ;
- contrat versionné et compatibilité (5) ;
- ACL testable (4) ;
- CQRS/projection et cohérence (5) ;
- migration legacy/réversibilité (4) ;
- justification des compromis (2).

Réussite : 24/30 et aucun oubli critique sur l'idempotence des opérations financières, les responsabilités de données ou la compatibilité du contrat. Un diagramme seul ne suffit pas : joindre exemples de payload, tests de contrat ou pseudo-tests précis et ADR.

## 14. Lien et preuve de maîtrise

Prérequis : modélisation, API, transactions, événements, tests et modularité. Suite : system design, fiabilité, migration et arbitrage Staff.

**Preuve attendue :** carte de contexte, modèle d'un agrégat, contrat évolutif, ACL testée, diagrammes de flux et CQRS, plan de migration progressive et défense orale des compromis. L'apprenant sait expliquer ce qu'il garde synchrone, ce qu'il rend éventuellement cohérent et pourquoi.

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Cas fil rouge DDD : commande, paiement et livraison sans modèle métier monolithique** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat métier et langage commun Kintana

> **Arc Naruto / Konoha :** le mot « mission » ne veut pas dire la même chose pour le demandeur, l'agent et l'administrateur. Le vocabulaire doit coller au métier qui l'utilise.

**Mission liée à « Cas fil rouge DDD : commande, paiement et livraison sans modèle métier monolithique » :** Anime une mini revue de domaine sur la création et l'affectation d'une demande. Construis un glossaire validé, un event storming simple, les invariants et les contextes candidats ; teste une ambiguïté avec une évolution.

**Livrable :** glossaire métier, diagramme commandes/événements, frontières proposées et ADR qui explique pourquoi une frontière existe ou non.

**Critères d’acceptation :** chaque terme a un sens et un propriétaire ; les règles sont testables ; les contextes ne sont pas découpés par table ; les désaccords sont conservés comme questions ouvertes.

**Transfert obligatoire :** Une nouvelle organisation utilise le mot « agent » pour deux rôles différents. Montre comment ton modèle absorbe ou refuse cette ambiguïté.
