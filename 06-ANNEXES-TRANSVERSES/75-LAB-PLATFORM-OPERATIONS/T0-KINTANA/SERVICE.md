# SERVICE : Kintana Reservations (simulation T0)

> **SIMULATION : données synthétiques.** Aucun chiffre de ce pack ne provient d'un service réel, d'un client ou d'une production. Tous les horodatages sont en UTC et le scénario se déroule le 10 novembre 2026.

## Service et utilisateurs

Kintana est une API de réservation. Un client envoie une demande, l'API enregistre la réservation, une file transmet le travail au worker et le service de paiement confirme la transaction. Les utilisateurs peuvent consulter le statut de leur réservation.

## Architecture simplifiée

```text
Client web/mobile
      |
      v
API Reservations -----> PostgreSQL (réservations + idempotency key)
      |                         ^
      v                         |
Queue --------------------> Worker -----> Payment Provider (externe)
      |                         |
      +------ logs / métriques --+
```

## Responsabilités et invariants

- **API** : valider la requête, authentifier le tenant, créer une réservation `PENDING_PAYMENT` et répondre avec son identifiant.
- **Queue** : transporter un identifiant de travail ; un message peut être livré plus d'une fois.
- **Worker** : appeler le prestataire avec une clé d'idempotence stable et mettre à jour la réservation.
- **PostgreSQL** : source de vérité de l'état de réservation et contrainte d'unicité `(tenant_id, idempotency_key)`.
- **Payment Provider** : dépendance externe ; son indisponibilité ne doit pas transformer une réservation en paiement confirmé.

Invariants à vérifier après récupération :

1. Une clé d'idempotence ne correspond pas à deux réservations du même tenant.
2. `CONFIRMED` implique une confirmation de paiement présente.
3. Un message rejoué ne crée pas un second paiement.
4. Une réservation en attente reste visible et peut être reprise ; elle ne doit pas disparaître silencieusement.
5. Les données d'un tenant ne sont pas visibles par un autre tenant.

## Contrat de service simulé

- SLI succès : réponses API réussies / requêtes éligibles, sur une fenêtre de 5 minutes.
- SLI latence : p95 de la durée API, même fenêtre et même population de requêtes.
- SLO de scénario : succès ≥ 99,5 % et p95 ≤ 500 ms pendant la fenêtre stable.
- Queue : âge du plus ancien message ≤ 30 s en régime normal.
- RPO cible : ≤ 15 min, mesuré depuis le dernier snapshot cohérent dont l'intégrité est vérifiée.
- RTO cible : ≤ 60 min, mesuré jusqu'au service utilisable et aux invariants vérifiés.

Ces seuils sont des **hypothèses pédagogiques du scénario**, pas des recommandations universelles.
