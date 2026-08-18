---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S4 : DECISION-ARBITRAGE.md : exemplaire de référence, anonymisé

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs.
Traite le changement de spec imposé au capstone (`04-EPREUVE/06-CAPSTONE-ARENA/05-changement-de-spec.md`).

## Le changement imposé

Le 02/06, la direction annonce l'ouverture aux entreprises : facturation à la place réservée,
export comptable mensuel, et engagement de réponse en moins de 500 ms maintenu. Délai : fin de trimestre.

## Les trois nombres, avec leur source

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans le module, à revérifier avant 2027.

| Dimension | Nombre | Source |
| --- | --- | --- |
| Valeur | 4 200 €/an de revenu attendu la première année, sur 7 structures déjà en attente | liste commerciale du 28/05, hypothèse de conversion à 50% notée comme telle |
| Coût | 14 jours-personne, plus 96 €/mois d'infrastructure supplémentaire | chiffrage d'équipe du 03/06 ; ligne cloud issue de `PREUVES/BUDGET-CLOUD.md`, palier 10 000, relevé 03/02 |
| Risque | probabilité forte de dégrader le p95 de l'écran de disponibilité pendant l'export mensuel | mesure de charge du 05/06 : l'export consomme 60% des connexions de la base pendant 8 minutes |

Le recroisement exigé est tenu : le coût mensuel de 96 € vient directement du budget S1.

## Les deux options chiffrées

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans le module, à revérifier avant 2027.

| Option | Contenu | Coût | Effet sur le SLO |
| --- | --- | --- | --- |
| A. Export synchrone sur la base principale | 6 jours, 0 €/mois | 6 j | dégrade le p95 pendant 8 min/mois : 2 100 requêtes ratées, soit 10 semaines de budget d'erreur en une nuit |
| B. Export depuis la réplique de lecture | 14 j, 96 €/mois | 14 j | aucun effet mesurable sur le p95 |

## Le point mort

L'option B coûte 8 jours de plus et 1 152 €/an d'infrastructure. Elle évite une consommation de budget
d'erreur qui, au tarif de nos pénalités contractuelles (250 € par incident déclaré, 2 incidents attendus
par an), représente 500 €/an, plus 1,5 jour de traitement d'incident. Point mort atteint au bout de
19 mois sur le seul argument financier : c'est l'engagement écrit de 99,5% auprès de trois clients,
et non le calcul, qui tranche.

## Décision, en trois phrases

Nous retenons l'option B. Le surcoût de 96 € par mois est le prix du maintien de la promesse de
service signée avec trois clients, promesse que l'option A briserait dès le premier export mensuel.
Nous livrons l'export en 14 jours plutôt qu'en 6, et nous l'annonçons dès aujourd'hui aux
7 structures en attente plutôt qu'à la fin du trimestre.

## Ce qui a été écarté, et assumé

La facturation à l'usage réel (par minute occupée) est reportée : elle exigeait un compteur
temps réel, chiffré à 21 jours, sans demande client formulée à ce jour. Revue au 02/12.
