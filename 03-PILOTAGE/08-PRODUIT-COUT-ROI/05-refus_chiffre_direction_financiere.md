---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [transmission, constraints_injectees]
anti_recipe_key: transmission+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# Exercice : le refus chiffré d'une direction financière

Temps de lecture ~2 min

Durée : 45 min. Rendu écrit.

## Le cas

Tu demandes 12 jours et 90 €/mois pour un chantier de fiabilité. La direction financière refuse :
« pas ce trimestre, les priorités sont commerciales ». Le refus est légitime.

## Ce qu'on te demande : trois temps, dans l'ordre

<!-- AF-DIAGRAM:roi -->

```text
text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

1. **Accuser réception du refus sans le rejouer.** Une phrase. Rediscuter le refus lui-même est
   l'erreur classique : tu perds le crédit dont tu auras besoin.
2. **Écrire le coût de l'attente**, en une page :
   - ce qui se dégrade chaque mois, chiffré (heures de support, incidents attendus, euros) ;
   - le seuil auquel le sujet redevient inévitable (métrique + valeur) ;
   - la date de réexamen, et qui la déclenche.
3. **Proposer la version à 20 %** : le sous-ensemble du chantier qui coûte 2 jours et couvre le pire
   risque. Il y en a presque toujours une.

## Ce qui est éliminatoire

- Menacer (« si ça tombe, ce sera votre responsabilité »).
- Repartir sans trace écrite : dans six mois, personne ne se souviendra que tu avais prévenu.
- Ne pas proposer la version à 20 %.

## Rendu

`DECISION-ARBITRAGE.md`, section « refus et coût de l'attente », daté et signé de ton nom.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
