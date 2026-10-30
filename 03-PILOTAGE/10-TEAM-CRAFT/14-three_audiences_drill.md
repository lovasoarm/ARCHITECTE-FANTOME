---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, changement_echelle]
anti_recipe_key: decision_organisationnelle+changement_echelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# Drill 3 audiences : tu expliques ou tu ne comprends pas

Temps de lecture ~45 min

Choisis UN concept technique (closure, event loop, git rebase, index de DB…).

Explique-le à :

1. **Un enfant de 10 ans.** Analogies concrètes autorisées. 5 phrases max. Zéro jargon.
2. **Un dev junior qui vient d'apprendre le langage.** Vocabulaire technique OK. Insiste sur QUAND l'utiliser et QUAND ne pas.
3. **Un CTO.** Le coût, le risque, l'impact business. Pas UN mot de syntaxe.

## LIVRABLE

Un fichier `three_audiences_<concept>.md` avec les 3 versions.

## CRITÈRE DE RÉUSSITE

Quelqu'un lit ton fichier SANS que tu sois là et devine le concept dès la version #1. Si non → recommence.

## (attention) CE QUE LE DRILL RÉVÈLE

Si tu galères sur la version #1 (l'enfant), c'est que tu n'as pas compris. Tu récites. Retour à la leçon.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-P0-2026-10-30: missing_example -->

### Exemple travaillé : cas métier

Une décision affecte trois équipes, chacune ayant des contraintes et des données différentes ; les désaccords doivent devenir des options testables. Construis un cas minimal qui illustre « Drill 3 audiences : tu expliques ou tu ne comprends pas » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
