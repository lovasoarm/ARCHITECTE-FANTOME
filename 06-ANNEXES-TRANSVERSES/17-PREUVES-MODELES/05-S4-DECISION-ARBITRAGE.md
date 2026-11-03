---
stability: stable
acte: appliquer
---

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# MODÈLE S4 : DECISION-ARBITRAGE.md : exemple pédagogique anonymisé

Temps de lecture ~4 min

> **Scénario fictif.** Les volumes, coûts, délais, pénalités et mesures ci-dessous sont des hypothèses de cas, pas des données de marché ni des observations de production. Ils montrent comment construire un arbitrage ; ils ne doivent pas être cités comme preuves réelles.

Projet fictif : **Lumen**, plateforme de réservation de créneaux pour ateliers associatifs. Traite le changement de spécification imposé au capstone ([05-changement-de-spec.md](../../04-EPREUVE/05-CAPSTONE-ARENA/05-changement-de-spec.md)).

## Le changement imposé

Le 02/06, la direction annonce l'ouverture aux entreprises : facturation à la place réservée, export comptable mensuel et engagement de réponse en moins de 500 ms maintenu. Délai demandé : fin de trimestre.

## Les trois nombres et leurs hypothèses

| Dimension | Hypothèse du scénario                                                        | Origine simulée / limite                                                                                                  |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Valeur    | 4 200 € de revenu attendu sur la première année pour 7 structures en attente | projection fictive avec conversion supposée à 50 %, pas une vente constatée                                               |
| Coût      | Option B : 14 jours-personne et +96 €/mois d'infrastructure                  | estimation fictive d'équipe et hypothèse budgétaire ; aucun tarif fournisseur n'est revendiqué                            |
| Risque    | l'export pourrait dégrader le p95 de disponibilité                           | scénario de charge fictif : l'export consomme 60 % des connexions de base pendant 8 minutes ; à valider par mesure réelle |

## Les deux options

| Option                                   | Contenu           | Coût initial hypothétique | Coût récurrent hypothétique | Effet supposé sur le SLO                                                                      |
| ---------------------------------------- | ----------------- | ------------------------: | --------------------------: | --------------------------------------------------------------------------------------------- |
| A. Export sur la base principale         | 6 jours-personne  |                   6 jours |        0 €/mois additionnel | risque de dégradation pendant l'export ; estimation de 2 100 requêtes ratées dans le scénario |
| B. Export depuis une réplique de lecture | 14 jours-personne |                  14 jours |                  +96 €/mois | risque de contention réduit ; l'absence d'effet mesurable doit être confirmée par un test     |

Les 2 100 requêtes ratées sont une estimation fictive du cas et doivent être recalculées à partir du débit réel, de la durée et de la définition du SLI. Le budget d'erreur de 99,5 % dépend de la population de requêtes éligibles : ne compare pas les nombres sans vérifier cette population.

## Le point mort : calcul à compléter, pas un chiffre à deviner

L'option B demande **8 jours-personne de plus** et coûte **96 €/mois**, soit `96 × 12 = 1 152 €/an` de coût récurrent supplémentaire. Le scénario suppose que l'option B évite deux incidents annuels à 250 € de pénalité chacun, soit `2 × 250 = 500 €/an`, et économise 1,5 jour de traitement d'incident par an.

La valeur d'une journée de travail chargée n'est pas fournie. Appelons-la `R` euros par jour. Le bénéfice annuel estimé devient `500 + 1,5 × R`. Le gain annuel net après le surcoût récurrent vaut donc :

```text
gain_annuel_net = 500 + 1,5 × R - 1 152
                = 1,5 × R - 652
investissement_initial_supplémentaire = 8 × R

si gain_annuel_net <= 0 : aucun point mort financier avec ces hypothèses
sinon : point_mort_mois = 12 × (8 × R) / gain_annuel_net
```

Avec les informations du scénario, **le point mort financier n'est pas déterminable** : `R` manque, et l'évitement de deux incidents doit lui-même être justifié. Les pénalités seules (500 €/an) ne couvrent pas les 1 152 €/an d'infrastructure. Il est donc incorrect d'annoncer « 19 mois » ou toute autre durée sans compléter les entrées.

La décision B peut néanmoins être retenue pour respecter un engagement contractuel ou réduire un risque jugé inacceptable. Dans ce cas, présente-le comme un arbitrage de fiabilité/contrat, pas comme un investissement dont le retour financier est démontré.

## Décision, en trois phrases

Dans ce scénario, nous retenons l'option B parce que l'engagement de service est traité comme une contrainte, même si le retour financier n'est pas démontré. Nous annonçons le délai de 14 jours et le surcoût hypothétique de 96 €/mois aux parties concernées. Nous rouvrons la décision si une mesure de charge montre que l'export sur la base principale reste sous les seuils convenus, ou si les coûts réels changent l'arbitrage.

## Ce qui a été écarté, et assumé

La facturation à l'usage réel (par minute occupée) est reportée : elle exige un compteur temps réel, dont le coût de construction et d'exploitation doit être estimé avant de réexaminer cette option. La date de revue est fixée par le propriétaire du projet ; aucune date de revue passée n'est présentée comme une action future.
