---
stability: intemporel
acte: reference
assessment_role: instructional_support
---

# Corrigé différé : 07-CLOUD-FOUNDATIONS

**Ne lire qu'après l'atelier.** Ce corrigé résout les calculs du scénario fictif. Il ne rapporte aucune exécution d'infrastructure ni aucun prix fournisseur.

## Résultat attendu : palier 10 000 utilisateurs

| Poste          |               Entrée | Formule                       |            Résultat |
| -------------- | -------------------: | ----------------------------- | ------------------: |
| Calcul         |         7 000 vCPU-h | 7 000 × 0,02 €                |            140,00 € |
| Base managée   |       forfait simulé | entrée fixe                   |            210,00 € |
| Stockage objet |           20 GB-mois | 20 × 0,023 €                  |              0,46 € |
| Egress         |               180 GB | 180 × 0,08 €                  |             14,40 € |
| Observabilité  | forfait simulé 10 GB | entrée fixe                   |             25,00 € |
| **Total**      |                      | 140 + 210 + 0,46 + 14,40 + 25 | **389,86 € / mois** |

Chaque poste doit rester marqué `SIMULATION`. Les forfaits de base et d'observabilité sont des entrées fictives et ne se calculent pas à partir d'un prix unitaire.

## Cas de transfert : egress multiplié par dix

Le volume passe de 180 GB à 1 800 GB. Le coût passe de `180 × 0,08 = 14,40 €` à `1 800 × 0,08 = 144,00 €`, soit +129,60 €. Les autres postes restent identiques par hypothèse ; le nouveau total est `519,46 € / mois`.

## Cas négatif : ligne sans région ni SKU

La ligne est **non comparable**, pas automatiquement fausse. Sans région et sans configuration précise, un tiers ne peut pas reconstruire le tarif ni confirmer qu'il correspond au besoin. Il faut compléter la source ou refuser le montant.

## Barème / 10

- Formules et unités exactes : 2 points.
- Total à 389,86 € : 2 points.
- Nouvelle ligne egress à 144 € : 2 points.
- Total modifié à 519,46 € : 2 points.
- Distinction simulation / tarif réel et détection de la ligne non comparable : 2 points.

**Limite :** ce corrigé fournit des résultats calculés à partir des entrées affichées. Il ne prouve ni déploiement, ni facture réelle, ni mesure de production.
