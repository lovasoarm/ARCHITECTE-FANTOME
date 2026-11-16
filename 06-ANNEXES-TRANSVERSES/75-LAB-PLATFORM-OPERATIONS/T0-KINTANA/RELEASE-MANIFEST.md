# RELEASE-MANIFEST : scénario Kintana T0

> **SIMULATION : valeurs fictives, non déployées.** `sim-7e1a9c2` est un identifiant de scénario, pas un vrai commit Git.

| Champ               | Valeur simulée                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Service             | `kintana-reservations`                                                                                           |
| Version précédente  | `1.8.1`                                                                                                          |
| Version candidate   | `1.8.2`                                                                                                          |
| Référence simulée   | `sim-7e1a9c2`                                                                                                    |
| Début de release    | `2026-11-10T09:00:00Z`                                                                                           |
| Schéma DB           | `schema-42` ; migration additive, colonne nullable `payment_attempt_ref`                                         |
| Feature flag        | `async_payment_retry=true`                                                                                       |
| Retry max           | 5 tentatives                                                                                                     |
| Backoff             | 0 seconde dans la configuration candidate                                                                        |
| Timeout paiement    | 900 ms                                                                                                           |
| Concurrence worker  | 80 tâches simultanées                                                                                            |
| Dépendance externe  | Payment Provider, disponibilité simulée variable                                                                 |
| Rollback applicatif | Revenir à `1.8.1`, désactiver la feature flag ; conserver la migration additive tant que l'ancien code la tolère |
| Rollback DB         | **Non prévu automatiquement** : aucune suppression de colonne sans preuve de compatibilité et plan distinct      |

## Écarts à examiner avant autorisation

- Le retry sans backoff peut amplifier une dépendance lente.
- Cinq tentatives peuvent multiplier la charge quand le prestataire dépasse le timeout.
- La concurrence worker (80) doit être comparée à la capacité réelle du prestataire ; aucune capacité fournisseur n'est garantie par ce pack.
- La migration additive n'autorise pas une restauration aveugle d'une base ancienne.
- Les contrôles de sécurité, tests de contrat et tests de reprise restent à démontrer ; ce manifeste ne les déclare pas passés.
