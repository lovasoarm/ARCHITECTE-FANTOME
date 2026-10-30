---
stability: stable
acte: concevoir
---

# Architecture client : séparer présentation, domaine, cas d'usage et données

## 1. Définition

Une architecture client maintenable sépare les responsabilités pour que l'interface ne soit pas directement couplée au stockage, au protocole réseau et aux règles métier. Les couches sont une manière de contrôler les dépendances, pas une obligation de multiplier les dossiers.

## 2. Diagramme de référence

```text
[UI / Widgets]
      | intentions + état affiché
      v
[Controller / ViewModel]
      | orchestre
      v
[Cas d'usage]
      | règles métier / ports
      v
[Repository (interface)]
      ^                     ^
      | implémentations     |
      |                     |
[Cache local]       [API distante]
      |                     |
      +---- [Outbox] --------+
                |
                v
       [Moteur de synchronisation]
                |
                v
       [Conflits / versions serveur]
```

L'UI dépend d'une abstraction d'état et envoie une intention. Le cas d'usage décide de la règle métier. Le repository fournit ou persiste les données. L'implémentation décide quand lire le cache, quand joindre le réseau et comment publier une commande à synchroniser.

## 3. État : quatre catégories à ne pas mélanger

- **État local de présentation** : champ sélectionné, modal ouverte, onglet.
- **État métier local** : brouillon, données enregistrées offline, file d'opérations.
- **État serveur** : statut faisant autorité côté API, avec version et fraîcheur.
- **État d'identité** : utilisateur, tenant, token, droits et session.

Chaque catégorie a un propriétaire, une durée de vie et une règle de persistance. Le cache ne devient pas l'autorité métier juste parce qu'il est disponible.

## 4. Cas d'usage fil rouge

`UpdateDeliveryAddress` valide l'adresse selon les règles métier, lit la commande et sa version, vérifie si elle peut encore être modifiée (par exemple pas déjà expédiée), puis demande au repository de persister le changement et l'opération offline. Le contrôleur expose `saving`, `saved_locally`, `sync_pending`, `synced`, `conflict` ou `failed`. Le widget ne connaît ni SQL ni endpoint.

## 5. Testabilité

- tester les règles métier sans Flutter/UI ni réseau ;
- tester le contrôleur avec un fake repository ;
- tester l'adaptateur local avec une base temporaire ;
- tester l'adaptateur API avec réponses simulées ;
- tester la synchronisation sur timeout, doublon, crash et conflit ;
- quelques tests de widget vérifient que l'état est correctement rendu.

La frontière doit être justifiée : ne crée pas un `UseCase` pour chaque ligne de code triviale si cela ajoute seulement de la cérémonie. Une extraction est utile quand elle clarifie un cas d'usage, une politique ou une dépendance.

## 6. Erreurs fréquentes

- Appeler HTTP directement depuis le widget.
- Stocker le token dans un modèle de commande.
- Faire dépendre les règles métier d'une bibliothèque Flutter.
- Avoir deux caches qui se contredisent sans version commune.
- Mettre en file un changement sans identité/tenant ni clé idempotente.
- Retenter toutes les erreurs avec la même stratégie.

## 7. Exercice

Concevoir les couches d'une application de commandes, représenter les dépendances et écrire un faux repository pour tester `UpdateDeliveryAddress`. Ajouter les transitions d'état de l'écran et une stratégie si l'adresse ne peut plus être modifiée.

**Vérification :** tests du cas d'usage sans UI, UI sans HTTP direct, persistance offline atomique, identité/tenant explicitement isolés, conflits visibles et données serveur versionnées.

## 8. Lien et preuve

Prérequis : modèle Flutter, programmation asynchrone et tests. Suite : offline-first, auth et observabilité.

**Preuve attendue :** architecture annotée, tests unitaires métier, contrat du repository, et démonstration qu'un remplacement du transport HTTP ne nécessite pas de réécrire l'interface.
