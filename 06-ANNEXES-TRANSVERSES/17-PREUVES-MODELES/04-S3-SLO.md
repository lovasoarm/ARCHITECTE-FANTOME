---
stability: stable
acte: appliquer
---

> **CrazyDevs : QG de Konoha :** les écrans peuvent clignoter toute la nuit sans te dire ce qui compte. Le boss est de relier signal, seuil, risque, coût et action.

# MODÈLE S3 : SLO.md : exemplaire de référence, anonymisé

<!-- AF-DIAGRAM:slo -->

```text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Temps de lecture ~2 min

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.

## Portée et objectif de service

**Portée :** endpoint critique de disponibilité des créneaux (`GET /availability`). Ce SLI ne représente pas l’ensemble des appels API du produit. Au palier pédagogique de 10 000 utilisateurs actifs, l’hypothèse de charge prévoit 43 200 requêtes éligibles par semaine sur cet endpoint, soit environ 5,14 % du volume API mensuel total converti en moyenne hebdomadaire. Le profil complet et ses limites sont décrits dans le modèle [S1 : Budget Cloud](02-S1-BUDGET-CLOUD.md).

**SLI de latence utile :** une requête est bonne si elle reçoit une réponse HTTP réussie, sans timeout, en **500 ms ou moins**. Les 5xx, timeouts et réponses au-delà de 500 ms sont mauvais événements pour ce SLI. L’objectif est que **99,5 % des requêtes éligibles** soient bonnes sur une fenêtre glissante de 7 jours. Ce SLO mesure la conformité de cette route à une promesse de latence utile ; il ne doit pas être nommé « disponibilité globale ».

## Budget d'erreur

Avec 43 200 requêtes éligibles par semaine et un objectif de 99,5 % de bonnes requêtes, le budget hebdomadaire est `43 200 × 0,005 = 216` mauvais événements. Dans le scénario de référence, 34 mauvais événements sont comptabilisés : le budget simulé consommé est 34 et le solde est `216 − 34 = 182`. Il est donc **entamé**, mais il reste 182 événements avant épuisement. Ces nombres constituent un exemple de scénario pédagogique, pas une mesure de production revendiquée.

## RTO : exemple de scénario de restauration

Dans le scénario de référence (étiqueté `SIMULATION` tant qu’un apprenant n’a pas exécuté son propre test), la restauration complète depuis la dernière sauvegarde est fixée à 41 minutes dans le scénario, du déclenchement supposé de l’exercice à la première requête de disponibilité qui répond correctement. L’objectif RTO annoncé est 60 minutes ; la marge dans ce scénario est de 19 minutes. Un apprenant ne peut reprendre ces valeurs comme preuve de son propre système : il doit chronométrer sa restauration et conserver le contexte.

## Alertes qui réveillent quelqu'un

> Les seuils de cette page appartiennent au scénario Lumen. Ils ne constituent ni une mesure de production ni un tarif fournisseur. Le coût d'une alerte ou d'un service d'observabilité doit être chiffré séparément à partir des sources propres au projet.

| Alerte                                                                          | Seuil                                      | Qui est réveillé                                 | Canal              |
| ------------------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------ | ------------------ |
| Mauvais événements du SLI de latence utile (`5xx`, timeout ou latence > 500 ms) | > 0,5 % sur 5 min de trafic éligible       | astreinte technique                              | appel téléphonique |
| Latence p95 de l'écran de disponibilité                                         | > 500 ms sur 10 min                        | astreinte technique                              | appel téléphonique |
| File d'événements de synchronisation (ADR-001) en retard                        | lag > 5 s                                  | astreinte technique                              | appel téléphonique |
| Facture cloud journalière                                                       | > 130 % de la moyenne des 7 derniers jours | responsable produit, en heures ouvrées seulement | message asynchrone |

## Tenabilité avec le budget cloud

Dans cet exemple pédagogique, l’option B du dossier d’architecture (18 €/mois de file d’événements) est associée au SLO de latence utile 99,5 %. L’option C (65 €/mois, base de données séparée) correspond à un scénario de conception visant une cible plus exigeante ; elle n’est pas retenue sans demande et mesure justifiant ce coût. Ces montants sont des hypothèses illustratives à recalculer avec le budget réel du projet. Ils ne prouvent pas que la file seule garantit le SLO : le profilage, les tests et l’exploitation restent requis.
