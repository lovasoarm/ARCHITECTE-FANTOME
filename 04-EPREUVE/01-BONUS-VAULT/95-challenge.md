---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, fausse_piste]
anti_recipe_key: solution_concurrente+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Challenge : Revue de risques du projet fil rouge

Temps de lecture ~2 min

## Consigne

Ce challenge fournit un **parcours guidé facultatif** pour préparer un livrable obligatoire
du Capstone : la revue de risques du projet fil rouge. Le livrable obligatoire appartient au
Capstone, pas au coffre Bonus Vault. Tu peux utiliser ce gabarit ou produire le même document
à partir des critères de `../05-CAPSTONE-ARENA/04-evaluation-grid.md` et de
`../05-CAPSTONE-ARENA/03-deliverables.md`. La revue couvre trois familles de risques :
sécurité, coûts et données personnelles.

## Gabarit imposé de REVUE-DE-RISQUES.md

```text
# Revue de risques : [nom du projet]

Date de la revue : [date]
Auteur : [ton nom]
Signature : [ton nom]

## Sécurité

| Risque | Probabilité (basse/moyenne/haute) | Impact (faible/moyen/fort) | Mitigation |
| ------ | ---------------------------------- | ---------------------------- | ---------- |
| ...    | ...                                 | ...                           | ...        |

## Coûts

| Risque | Probabilité | Impact | Mitigation |
| ------ | ----------- | ------ | ---------- |
| ...    | ...         | ...    | ...        |

## Données personnelles

| Risque | Probabilité | Impact | Mitigation |
| ------ | ----------- | ------ | ---------- |
| ...    | ...         | ...    | ...        |

## Risque le plus critique et plan d'action

[Le risque qui, s'il se réalise, coûte le plus cher à corriger a posteriori. Une phrase de
plan d'action concret, pas une intention vague.]
```

## Critères de réussite mesurables

- Chaque famille (sécurité, coûts, données personnelles) contient au moins deux risques
  identifiés, avec probabilité, impact et mitigation renseignés pour chacun : une ligne
  laissée à "..." ne compte pas comme un risque traité.
- Le risque de comptage de capacité en accès concurrent (voir le brief du capstone,
  `../05-CAPSTONE-ARENA/02-briefing.md`) figure explicitement dans la famille Sécurité,
  puisqu'il découle d'un incident réel avec un contrôle des pompiers.
- Le partage de données d'adhérents entre les trois salles indépendantes figure explicitement
  dans la famille Données personnelles, avec une mitigation nommée (consentement, séparation
  des accès, ou autre).
- La section "Risque le plus critique et plan d'action" désigne un seul risque, avec une
  action concrète et datée, pas une liste de bonnes intentions.
- Le fichier est signé et daté **avant le premier commit de code du jalon 3** du Capstone.

## Ce qui invalide le challenge

- Une revue de risques générique, copiée d'un modèle externe sans adaptation au projet réel
  des trois salles d'escalade.
- Une mitigation qui répète l'impact sans proposer d'action ("le risque est fort donc il faut
  faire attention" n'est pas une mitigation).
- Une revue non signée, ou signée mais non datée.

## Lien vers le capstone qui la consomme

La revue de risques est intégrée à l'arborescence de livraison du Capstone et évaluée
dans sa grille. Le document doit exister avant le premier commit de code du jalon 3 :
prépare-le à l'ouverture de ce jalon, puis conserve sa date et son historique. Tu peux
utiliser ce challenge comme méthode guidée, mais terminer Bonus Vault n'est pas requis.

## Durée cible

9 h, cohérent avec la durée annoncée pour ce niveau dans CURRICULUM.md. Si tu dépasses
largement ce budget, c'est un signal à noter dans ta rétrospective de bloc, pas une raison
de bâcler la fin du livrable.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
