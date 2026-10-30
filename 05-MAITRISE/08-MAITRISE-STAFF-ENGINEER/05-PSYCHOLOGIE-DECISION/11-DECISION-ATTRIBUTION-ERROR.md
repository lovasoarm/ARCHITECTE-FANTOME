---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [regression, decision_inversee]
anti_recipe_key: regression+decision_inversee
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible

Après un incident, interdis-toi d'utiliser les informations découvertes après la décision initiale pour condamner le raisonnement initial.

## Manche 1 : T-1

Écris uniquement :

- faits observables ;
- hypothèses ;
- inconnues ;
- options ;
- seuil de réouverture ;
- décision.

## Manche 2 : T+1

Seulement après avoir scellé la manche 1, ajoute les faits révélés par l'incident.

## Analyse

Sépare :

- mauvaise décision compte tenu des informations disponibles ;
- bonne décision rendue mauvaise par un événement imprévisible ;
- décision raisonnable mais mécanisme de détection insuffisant ;
- décision mal documentée malgré un raisonnement correct.

## Preuve

Conserve les deux versions et explique ce qui était réellement prévisible.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-P0-2026-10-30: missing_example -->

### Exemple travaillé : cas métier

Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
