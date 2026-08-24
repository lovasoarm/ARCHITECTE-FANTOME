---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le catalogue est un tableau. Indexation, longueur, parcours : c'est le socle du rendu des rangées et de la navigation « projet suivant ».

## OBJECTIF

La navigation entre projets fonctionne.

## APPLICATION

- Écris `getAdjacentProjects(id)` qui renvoie le projet précédent et le suivant dans le catalogue.
- Gère les bords (premier et dernier) sans planter.
- Affiche ces deux liens en bas de la fiche projet.

## Critère de réussite

- [ ] Écris `getAdjacentProjects(id)` qui renvoie le projet précédent et le suivant dans le catalogue.
- [ ] Gère les bords (premier et dernier) sans planter.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment évites-tu un accès hors limites sans multiplier les conditions ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : la navigation entre projets fonctionne.

Le visiteur peut enchaîner tes six projets comme des épisodes. Commit.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
