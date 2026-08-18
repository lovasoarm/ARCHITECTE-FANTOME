---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S3 : SLO.md : exemplaire de référence, anonymisé

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.

## Objectif de service

"Un utilisateur qui ouvre l'écran de disponibilité obtient une réponse en moins de
500 ms, dans 99,5 % des requêtes, sur un mois glissant."

## Budget d'erreur

99,5 % de disponibilité sur 43 200 requêtes estimées par semaine (palier 10 000 utilisateurs,
voir `PREUVES/BUDGET-CLOUD.md`) autorise 216 requêtes ratées par semaine avant d'entamer le
budget. Au 15/04, 34 requêtes ratées cumulées sur la semaine : budget non entamé.

## RTO mesuré

Restauration complète testée le 22/03, chronomètre en main, depuis la dernière sauvegarde
automatique de la base de données : 41 minutes entre le déclenchement de l'exercice et la
première requête de disponibilité répondant correctement. Objectif annoncé : 60 minutes.
Marge réelle : 19 minutes, pas supposée.

## Alertes qui réveillent quelqu'un

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans le module, à revérifier avant 2027.

| Alerte | Seuil | Qui est réveillé | Canal |
| --- | --- | --- | --- |
| Taux d'erreur 5xx sur l'API de disponibilité | > 2 % sur 5 min | astreinte technique | appel téléphonique |
| Latence p95 de l'écran de disponibilité | > 500 ms sur 10 min | astreinte technique | appel téléphonique |
| File d'événements de synchronisation (ADR-001) en retard | lag > 5 s | astreinte technique | appel téléphonique |
| Facture cloud journalière | > 130 % de la moyenne des 7 derniers jours | responsable produit, en heures ouvrées seulement | message asynchrone |

## Tenabilité avec le budget cloud

Le SLO de 99,5 % est atteint avec l'option B de `PREUVES/ADR-PRINCIPAL.md` (18 €/mois de
file d'événements). Passer à 99,9 % exigerait l'option C (65 €/mois, base de données
séparée) : ce chiffre n'a pas été engagé, faute de demande client justifiant ce coût
supplémentaire. Ce point de friction entre S1 et S3 est volontairement documenté ici plutôt
que masqué.
