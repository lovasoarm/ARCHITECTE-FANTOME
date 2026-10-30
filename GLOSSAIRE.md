---
stability: stable
acte: comprendre
---

# Glossaire général AF

Les définitions sont des repères courts. La leçon liée reste la référence approfondie ; en cas de divergence, corriger le glossaire à partir du mécanisme et non l'inverse.

| Terme                       | Explication simple                                                                                                             | Approfondissement                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| GitOps                      | Exploiter un environnement à partir d'un état désiré versionné que des contrôleurs réconcilient avec l'état réel.              | [`Platform Engineering`](03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md)                  |
| IDP                         | Internal Developer Platform : ensemble de capacités internes qui automatise des tâches récurrentes pour les équipes produit.   | [`IDP`](03-PILOTAGE/12-PLATFORM-ENGINEERING/03-internal-developer-platform.md)                        |
| Golden Path                 | Parcours recommandé, documenté et maintenu pour réaliser une tâche de manière sûre et reproductible.                           | [`Golden Paths`](03-PILOTAGE/12-PLATFORM-ENGINEERING/04-golden-paths-and-dx.md)                       |
| DX                          | Developer Experience : expérience réelle du développeur pour construire, tester, livrer et exploiter un logiciel.              | [`Golden Paths et DX`](03-PILOTAGE/12-PLATFORM-ENGINEERING/04-golden-paths-and-dx.md)                 |
| CQRS                        | Séparation des modèles d'écriture (commandes) et de lecture (requêtes).                                                        | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| Bounded context             | Contexte borné : frontière dans laquelle un modèle et un vocabulaire métier gardent un sens précis.                            | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| SLI                         | Service Level Indicator : mesure définie d'un résultat réellement vécu par l'utilisateur.                                      | [`Cas SLO`](03-PILOTAGE/06-FIABILITE-SLO/08-CASE-OPERATIONNEL-SLO.md)                                 |
| SLO                         | Service Level Objective : cible interne définie sur un SLI et une fenêtre.                                                     | [`Cas SLO`](03-PILOTAGE/06-FIABILITE-SLO/08-CASE-OPERATIONNEL-SLO.md)                                 |
| SLA                         | Service Level Agreement : engagement contractuel envers un client, potentiellement assorti de compensations.                   | [`Cas SLO`](03-PILOTAGE/06-FIABILITE-SLO/08-CASE-OPERATIONNEL-SLO.md)                                 |
| RPO                         | Recovery Point Objective : quantité/perte de données maximale acceptable selon le point de reprise visé.                       | [`Cloud foundations`](03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md) |
| RTO                         | Recovery Time Objective : durée cible de rétablissement d'un service après incident.                                           | [`Cloud foundations`](03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md) |
| RAG                         | Retrieval-Augmented Generation : génération qui récupère des sources externes pertinentes avant de produire une réponse.       | [`Pont maths/IA/ML/LLM`](06-ANNEXES-TRANSVERSES/41-PONT-MATHS-IA-ML-LLM.md)                           |
| Idempotence                 | Propriété par laquelle répéter une opération identifiée ne produit pas plusieurs effets métier.                                | [`Offline sync`](02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/03-offline-sync.md)                        |
| Cohérence éventuelle        | Modèle où des copies/projections convergent après propagation, avec un délai possible.                                         | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| Anti-Corruption Layer (ACL) | Couche de traduction qui empêche un modèle externe/legacy de contaminer le modèle du domaine cible.                            | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| Drift                       | Dérive : différence entre l'état désiré déclaré et l'état réellement observé.                                                  | [`GitOps`](03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md)                                |
| Observabilité               | Capacité à comprendre l'état d'un système à partir des signaux qu'il émet.                                                     | [`Client Systems`](02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/05-observability-performance.md)         |
| Résilience                  | Capacité à continuer, se dégrader proprement ou se rétablir lorsqu'un composant échoue.                                        | [`Offline sync`](02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/03-offline-sync.md)                        |
| Transaction                 | Groupe d'opérations traité selon des propriétés de cohérence et de durabilité définies par le système de stockage.             | [`PostgreSQL lab`](05-MAITRISE/01-DATABASES/97-EXO-VERIFICATION.md)                                   |
| Rollback                    | Retour à un état précédent ou correction compensatoire ; sa faisabilité dépend aussi des données et effets externes.           | [`GitOps`](03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md)                                |
| Soft-delete                 | Marquage logique d'une donnée comme supprimée plutôt que suppression physique ; choix métier, pas obligation universelle.      | [`PostgreSQL lab`](05-MAITRISE/01-DATABASES/97-EXO-VERIFICATION.md)                                   |
| Tenant                      | Périmètre logique d'un client/organisation dans un système multi-tenant, utilisé pour isoler données et autorisations.         | [`Exercice SQL de risque`](05-MAITRISE/01-DATABASES/09-EXO-VERIFICATION.md)                           |
| Projection                  | Modèle de lecture calculé depuis des données/événements pour servir une requête ; peut être en retard sur l'écriture.          | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| Événement métier            | Fait passé et significatif dans le domaine (ex. `OrderPlaced`), publié avec un contrat et une identité.                        | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md)                   |
| Refresh token               | Jeton permettant d'obtenir un nouvel access token selon le protocole d'identité.                                               | [`Authentification client`](02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/04-auth-network-security.md)    |
| Outbox                      | File persistante d'opérations à publier/synchroniser, liée à l'écriture locale ou métier pour éviter une perte entre les deux. | [`Offline sync`](02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/03-offline-sync.md)                        |

| Agrégat | Frontière de cohérence transactionnelle autour d’une racine ; les invariants de l’agrégat sont protégés lors de ses commandes. | [`Cas DDD`](02-CONSTRUCTION/16-DDD-CONTRATS/10-CAS-FIL-ROUGE-COMMANDE-LIVRAISON.md) |
| Migration progressive | Transformation d’un système existant par étapes compatibles, avec double-run ou bascule contrôlée lorsque le risque le justifie. | [`Contrats et migration`](02-CONSTRUCTION/16-DDD-CONTRATS/05-contrats_migration.md) |
| Postmortem | Analyse après incident centrée sur les mécanismes, les facteurs contributifs et les actions vérifiables, sans réduire la cause à une faute individuelle. | [`Cycle SLO`](03-PILOTAGE/06-FIABILITE-SLO/08-CASE-OPERATIONNEL-SLO.md) |
| ADR | Architecture Decision Record : note courte qui conserve contexte, décision, options, conséquences et conditions de revisite. | [`Team craft`](03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md) |
| Error budget | Part de l’objectif de fiabilité qu’un service peut consommer avant d’atteindre son SLO ; il guide le compromis vitesse/fiabilité selon une politique explicite. | [`Cycle SLO`](03-PILOTAGE/06-FIABILITE-SLO/08-CASE-OPERATIONNEL-SLO.md) |
| SQL paramétré | Requête dont la structure SQL est séparée des valeurs liées ; cela réduit le risque d’injection mais ne remplace ni l’autorisation ni la validation métier. | [`Exercice 10  : Databases`](05-MAITRISE/01-DATABASES/10-EXO-VERIFICATION.md) |
| Injection SQL | Défaut où une donnée non fiable est interprétée comme une partie de la syntaxe SQL au lieu d’une simple valeur. | [`Exercice 10  : Databases`](05-MAITRISE/01-DATABASES/10-EXO-VERIFICATION.md) |

## Règle d'usage

À la première apparition dans une leçon, le terme technique doit être expliqué simplement dans la phrase. Ce glossaire aide à retrouver une définition ; il ne remplace pas l'explication locale ni l'exemple du module.
