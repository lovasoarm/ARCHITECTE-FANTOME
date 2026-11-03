---
stability: stable
acte: concevoir
last_reviewed: 2026-10-30
---

# Kintana : modèle métier, contrats et architecture

## 1. Modèle de domaine minimal

```text
User 1 ─── * Request * ─── 0..1 Slot
  |              |
  |              +── * RequestEvent
  |
  +── * RoleBinding

Request 1 ─── * Assignment * ─── 1 Agent
Request 1 ─── * NotificationOutbox
```

Ce modèle est un point de départ à critiquer. Il ne dit pas qu'une table doit obligatoirement correspondre à chaque rectangle. Justifie le modèle relationnel, les cardinalités, les contraintes et les invariants.

## 2. États et transitions

```text
DRAFT -> SUBMITTED -> ASSIGNED -> IN_PROGRESS -> COMPLETED
  |          |           |            |
  +--------> CANCELLED   +----------> CANCELLED
             |
             +----------> REJECTED
```

La transition doit être contrôlée côté serveur. Un bouton désactivé dans le navigateur n'est pas une règle de sécurité. Les transitions exactes doivent être spécifiées, testées et auditées.

## 3. Contrat de création

Une commande `CreateRequest` contient au minimum :

- `request_id` généré côté serveur ;
- `actor_id` obtenu depuis la session authentifiée, jamais cru depuis le body ;
- `service_id` autorisé pour cet acteur ;
- `payload` validé selon le contrat ;
- `idempotency_key` fournie par le client ;
- `created_at` déterminé côté serveur.

Le résultat distingue une création nouvelle, une répétition idempotente et un conflit de clé réutilisée avec un contenu différent. Ne renvoie jamais les données d'un autre utilisateur pour expliquer qu'une clé est déjà utilisée.

## 4. Contraintes de persistance

Tu dois décider et démontrer :

- les clés primaires et étrangères ;
- les contraintes d'unicité adaptées au domaine ;
- le traitement des deux requêtes concurrentes pour un même créneau ;
- le niveau d'isolation réellement nécessaire ;
- le format et la stratégie des migrations ;
- la politique de rétention et de suppression ;
- la stratégie de sauvegarde et le test de restauration.

Une vérification applicative seule ne protège pas contre une course entre deux transactions. Les invariants critiques doivent être ancrés dans la base ou dans un mécanisme transactionnel équivalent.

## 5. Contrat d'événement

L'événement contient :

```json
{
  "event_id": "evt_synthetic_001",
  "event_type": "request.submitted",
  "aggregate_id": "req_synthetic_001",
  "occurred_at": "2026-10-30T10:00:00Z",
  "schema_version": 1,
  "correlation_id": "corr_synthetic_001",
  "payload": { "status": "SUBMITTED" }
}
```

Les identifiants ci-dessus sont fictifs. Le contrat doit expliquer versionnement, évolution compatible, rejeu, déduplication, ordre et données interdites dans le payload. L'événement n'est pas une copie libre de toute la ligne de base de données.

## 6. Sécurité minimale

- Authentification distincte de l'autorisation.
- Autorisation côté serveur, par ressource et par action.
- Contrôle d'appartenance et de périmètre (tenant/organisation) pour chaque lecture/écriture.
- Validation des entrées et encodage des sorties.
- Secrets hors dépôt, prompts, journaux et fixtures.
- Logs sans données sensibles inutiles.
- Audit des opérations sensibles, avec accès limité.
- Tests négatifs : acteur anonyme, rôle insuffisant, demande étrangère, clé d'idempotence conflictuelle, payload inattendu.

## 7. Exploitation

Chaque service ou processus doit expliciter : health/readiness, configuration, arrêt propre, logs structurés, métriques utiles, budget de ressources, gestion des secrets, redémarrage, backup/restore et rollback. Les commandes doivent être réellement exécutables dans l'environnement annoncé ; les autres restent étiquetées comme étapes à réaliser.

## 8. IA en lecture seule

Le module FAQ IA ne reçoit que des documents approuvés et des questions synthétiques. Il retourne les sources utilisées, peut s'abstenir et n'a aucun outil d'écriture métier. Les tests couvrent au minimum absence de source, source contradictoire, prompt injection, données interdites, réponse hors sujet et indisponibilité du fournisseur.
