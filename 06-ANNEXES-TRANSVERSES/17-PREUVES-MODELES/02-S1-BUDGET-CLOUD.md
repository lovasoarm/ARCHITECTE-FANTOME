---
stability: stable
acte: appliquer
---

> **CrazyDevs : QG de Konoha :** les écrans peuvent clignoter toute la nuit sans te dire ce qui compte. Le boss est de relier signal, seuil, risque, coût et action.

# MODÈLE S1 : 06A-BUDGET-CLOUD.md : exemple pédagogique entièrement simulé

Temps de lecture ~7 min

> **SIMULATION : AUCUN TARIF RÉEL** Tous les montants, forfaits et volumes de ce document sont fictifs. Ils ont été définis pour que les calculs soient reproductibles ; ils ne décrivent ni AWS, ni un fournisseur A ou B, ni un marché daté. N'utilise pas ces valeurs dans une décision réelle.

Le modèle montre la forme d'un budget à trois échelles. Pour ton projet, remplace chaque hypothèse par une mesure et chaque montant par un tarif réellement relevé, daté et sourcé dans [l'exercice Cloud](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md).

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.

## 1. Hypothèses de trafic retenues

| Palier    | Utilisateurs actifs/mois |          Requêtes/s en pointe | Volume stocké |
| --------- | -----------------------: | ----------------------------: | ------------: |
| 100       |                      100 |     2 (hypothèse de capacité) |        0,5 GB |
| 10 000    |                   10 000 |    40 (hypothèse de capacité) |         20 GB |
| 1 000 000 |                1 000 000 | 1 200 (hypothèse de capacité) |      2 000 GB |

## Profil de charge canonique Lumen : hypothèses pédagogiques

| Paramètre                 |                             Hypothèse | Interprétation                                                                                        |
| ------------------------- | ------------------------------------: | ----------------------------------------------------------------------------------------------------- |
| Consultations utilisateur |         12 / utilisateur actif / jour | Action représentative                                                                                 |
| Période de calcul         |                       30 jours / mois | Convention de calcul                                                                                  |
| Requête principale        |          1 requête API / consultation | Les appels annexes sont exclus du compte principal                                                    |
| Réponse principale        |         40 kB décimaux / consultation | Réponse d'un endpoint représentatif                                                                   |
| Trafic supplémentaire     |                                 +25 % | Autres réponses et métadonnées                                                                        |
| Egress budgété            |               trafic principal × 1,25 | 1,8 GB calculé à 100 actifs, arrondi au GB supérieur à 2 GB ; 180 GB à 10 000 ; 18 000 GB à 1 000 000 |
| Calcul consommé           | 365 / 7 000 / 240 000 vCPU-h par mois | Hypothèses de consommation simulées, indépendantes des pics                                           |
| Stockage                  |                   0,5 / 20 / 2 000 GB | Hypothèses de capacité, non déduites du seul nombre d'utilisateurs                                    |

À 100 utilisateurs actifs, le calcul donne `100 × 12 × 30 × 40 kB × 1,25 = 1,8 GB/mois` ; le tableau budgète prudemment `2 GB`, après arrondi au GB supérieur. À 10 000 utilisateurs actifs : `10 000 × 12 × 30 = 3 600 000` consultations/mois. Le trafic principal vaut `3 600 000 × 40 kB = 144 000 000 kB = 144 GB` en unités décimales. Avec +25 %, le budget d'egress est `180 GB/mois`. Les 43 200 requêtes du SLO S3 concernent uniquement le point de contrôle hebdomadaire de disponibilité, pas tout le trafic API.

## 2. Paramètres de coût fictifs

| Poste           |                      Paramètre de simulation | Limite                                                     |
| --------------- | -------------------------------------------: | ---------------------------------------------------------- |
| Calcul          |                              0,02 € / vCPU-h | Coût par vCPU-heure, sans engagement ni taxe               |
| Base managée    | 15 € / 210 € / 3 100 € par mois selon palier | Forfaits fictifs, pas de SKU réel                          |
| Stockage objet  |                            0,023 € / GB-mois | Requêtes et récupération exclues                           |
| Egress Internet |                                  0,08 € / GB | Seuils gratuits et transferts internes exclus              |
| Observabilité   |     0 € / 25 € / 640 € par mois selon palier | Forfaits fictifs de logs, sans métriques additionnelles    |
| CDN / edge      |             210 € / mois au palier 1 000 000 | Forfait fictif ; transfert traité séparément dans l'egress |

Les calculs suivent les formules affichées. Les forfaits sont des hypothèses d'entrée ; aucun prix unitaire réel n'est déduit.

## 3. Facture mensuelle simulée, à 100 utilisateurs

| Catégorie       | Quantité / règle       |                                       Calcul | Coût mensuel simulé |
| --------------- | ---------------------- | -------------------------------------------: | ------------------: |
| Calcul          | 365 vCPU-h             |                                 365 × 0,02 € |              7,30 € |
| Base de données | forfait petit palier   |                              donnée d'entrée |             15,00 € |
| Stockage objet  | 0,5 GB-mois            | 0,5 × 0,023 € = 0,0115 €, arrondi au centime |              0,01 € |
| Egress          | 2 GB                   |                                   2 × 0,08 € |              0,16 € |
| Observabilité   | forfait gratuit fictif |                              donnée d'entrée |              0,00 € |
| **Total**       |                        |                        somme des cinq lignes |         **22,47 €** |

## 4. Facture mensuelle simulée, à 10 000 utilisateurs

| Catégorie       | Quantité / règle      |                Calcul | Coût mensuel simulé |
| --------------- | --------------------- | --------------------: | ------------------: |
| Calcul          | 7 000 vCPU-h          |        7 000 × 0,02 € |            140,00 € |
| Base de données | forfait intermédiaire |       donnée d'entrée |            210,00 € |
| Stockage objet  | 20 GB-mois            |          20 × 0,023 € |              0,46 € |
| Egress          | 180 GB                |          180 × 0,08 € |             14,40 € |
| Observabilité   | forfait 10 GB de logs |       donnée d'entrée |             25,00 € |
| **Total**       |                       | somme des cinq lignes |        **389,86 €** |

## 5. Facture mensuelle simulée, à 1 000 000 utilisateurs

| Catégorie       | Quantité / règle           |               Calcul | Coût mensuel simulé |
| --------------- | -------------------------- | -------------------: | ------------------: |
| Calcul          | 240 000 vCPU-h             |     240 000 × 0,02 € |          4 800,00 € |
| Base de données | forfait grand palier       |      donnée d'entrée |          3 100,00 € |
| Stockage objet  | 2 000 GB-mois              |      2 000 × 0,023 € |             46,00 € |
| Egress          | 18 000 GB                  |      18 000 × 0,08 € |          1 440,00 € |
| Observabilité   | forfait 400 GB de logs     |      donnée d'entrée |            640,00 € |
| CDN / edge      | forfait activé à ce palier |      donnée d'entrée |            210,00 € |
| **Total**       |                            | somme des six lignes |     **10 236,00 €** |

## 6. Portage chez un second fournisseur

Aucun tarif fictif de « fournisseur B » n'est proposé : le tableau précédent n'est pas une grille fournisseur. Pour ton projet, reprends le même trafic, les mêmes services attendus et les mêmes unités, puis remplis le second tableau avec tes sources personnelles. Note les postes non équivalents au lieu de les chiffrer par supposition.

| Poste                | Fournisseur choisi | Service/SKU | Région | Unité/volume | Coût mensuel | Date | URL | Limites / différences |
| -------------------- | ------------------ | ----------- | ------ | ------------ | -----------: | ---- | --- | --------------------- |
| Calcul               |                    |             |        |              |              |      |     |                       |
| Base managée         |                    |             |        |              |              |      |     |                       |
| Stockage objet       |                    |             |        |              |              |      |     |                       |
| Egress               |                    |             |        |              |              |      |     |                       |
| Observabilité        |                    |             |        |              |              |      |     |                       |
| **Total comparable** |                    |             |        |              |              |      |     |                       |

Ne conclus pas à une économie totale si une catégorie, une sauvegarde ou un transfert manque. Une comparaison partielle doit rester qualifiée comme telle.

## 7. Ce que ce budget révèle

Dans cette simulation, l'egress passe de 0,16 € à 1 440 € parce que le volume budgété passe de 2 GB à 18 000 GB avec un paramètre fictif constant de 0,08 €/GB. Cela illustre l'effet du volume ; cela ne démontre pas que l'egress est toujours le deuxième poste ni que ce prix existe chez un fournisseur réel.

## 8. Recroisements

Ce modèle montre comment relier hypothèses, budget, SLO et arbitrage. Les chiffres d'un autre exemple (S4 ou S5) peuvent appartenir à un scénario distinct : ne les présente pas comme dérivés de S1 sans refaire le calcul et conserver les entrées communes.
