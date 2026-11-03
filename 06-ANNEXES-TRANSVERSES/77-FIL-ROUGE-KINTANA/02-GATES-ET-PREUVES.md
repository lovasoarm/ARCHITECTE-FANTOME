---
stability: stable
acte: évaluer
last_reviewed: 2026-10-30
---

# Kintana : gates de livraison et preuves

## Gate de chaque tranche

| Contrôle         | Preuve minimale                                        | Échec bloquant si…                           |
| ---------------- | ------------------------------------------------------ | -------------------------------------------- |
| Besoin           | scénario utilisateur et non-objectifs                  | le comportement attendu est ambigu           |
| Contrat          | entrées, sorties, erreurs, rôles                       | le contrat dépend d'une hypothèse non écrite |
| Correctness      | tests nominal, limite, concurrence ou panne pertinente | une violation d'invariant est possible       |
| Sécurité         | test d'autorisation négatif et menace principale       | un acteur lit ou modifie hors périmètre      |
| Exploitation     | logs/métriques, health, runbook                        | l'équipe ne sait pas diagnostiquer le défaut |
| Reproductibilité | versions, commandes et résultats observés              | un tiers ne peut pas refaire la vérification |
| Décision         | ADR/RFC avec alternatives et coût                      | une option est retenue sans critère          |
| Transfert        | variante inconnue ou changement de contrainte          | seule la recette mémorisée fonctionne        |

## Matrice de tests de référence

Construis et complète cette matrice au fil du parcours. Elle ne prétend pas que les résultats existent déjà.

| Scénario                                          | Résultat attendu                                   | Preuve à conserver                            |
| ------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| Double clic / retry de création                   | Une seule demande, même résultat logique           | test idempotence + logs corrélés              |
| Deux réservations concurrentes du dernier créneau | Une seule gagne ; l'autre reçoit un conflit propre | test de concurrence sur vraie DB de test      |
| Coupure réseau après envoi                        | Le client conserve l'état et reprend sans doublon  | test offline/replay                           |
| Agent hors périmètre                              | Refus sans fuite de données                        | test d'autorisation négatif                   |
| Notification traitée deux fois                    | Un seul effet observable                           | test worker + clé de déduplication            |
| Payload invalide                                  | Rejet explicite ou quarantaine                     | rapport de validation                         |
| Modèle IA sans source                             | Abstention et aucune action métier                 | jeu d'évaluation                              |
| Déploiement défectueux                            | Signal détecté et rollback vérifié                 | sortie de pipeline + runbook                  |
| Sauvegarde restaurée                              | Données cohérentes dans les limites annoncées      | rapport restore avec durée et perte constatée |

## Niveau de preuve

- `CONCEPT` : explication sans implémentation.
- `LAB` : implémentation locale, contexte et données contrôlés.
- `SIMULATION` : panne, utilisateur ou volume simulé.
- `PILOT` : service réellement utilisé par un groupe autorisé, avec consentement et cadre adapté.
- `PRODUCTION` : service réellement exploité ; la période, la population, l'environnement, les incidents et les mesures sont traçables.
- `EXTERNAL_REVIEW` : critique indépendante avec reviewer, date, périmètre et objections consignés.

Ne fais jamais passer un niveau pour le suivant. Les chiffres synthétiques servent à tester un mécanisme, pas à prouver un impact humain ou commercial.

## Dossier de preuve personnel

Pour chaque livrable, conserve :

1. commit ou archive exact(e) ;
2. version du runtime et commandes réellement exécutées ;
3. données d'entrée ou fixture et leur provenance ;
4. résultat brut, y compris les échecs ;
5. décision, alternative rejetée et coût ;
6. limites connues et condition de révision ;
7. revue externe si disponible.

## Critère de clôture

Un projet peut être techniquement terminé dans son environnement de laboratoire sans être validé en production. Utilise les deux statuts séparément : `LAB_COMPLETE` et `FIELD_VALIDATED`. Le deuxième exige une preuve de terrain réelle ; il ne peut pas être attribué par une checklist vide.
