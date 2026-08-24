---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les unions modélisent des états finis : le statut d'un projet n'est pas une `string` libre, c'est une liste fermée.

## OBJECTIF

Tes statuts sont infalsifiables.

## APPLICATION

- Remplace le type de `status` par l'union littérale `ProjectStatus` des statuts réels du catalogue.
- Fais de même pour `category` avec `ProjectCategory`.
- Constate l'erreur quand tu écris un statut mal orthographié.

## Critère de réussite

- [ ] Remplace le type de `status` par l'union littérale `ProjectStatus` des statuts réels du catalogue.
- [ ] Fais de même pour `category` avec `ProjectCategory`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qu'une union littérale t'apporte qu'un `string` ne donnera jamais ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes statuts sont infalsifiables.

Une faute de frappe dans les données devient impossible. Commit.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
