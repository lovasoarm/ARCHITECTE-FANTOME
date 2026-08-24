---
stability: stable
cognitive_level: L3
perturbation_modes: [changement_contexte, solution_concurrente]
anti_recipe_key: changement_contexte+solution_concurrente
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# AUDITER UNE DÉCISION TECHNIQUE

Une bonne décision peut être expliquée, testée et corrigée. Une mauvaise décision se cache souvent derrière des mots vagues : « standard », « scalable », « best practice ».

## Grille

1. Quel problème résout-on ?
2. Quelles contraintes sont non négociables ?
3. Quelles options ont été envisagées ?
4. Pourquoi l’option retenue gagne-t-elle dans ce contexte ?
5. Quel est son coût ?
6. Quel risque introduit-elle ?
7. Comment vérifier qu’elle fonctionne ?
8. Quel signal ferait revenir sur la décision ?

## Exercice

Prends une décision d’architecture de ton projet fil rouge. Fais une première version en dix minutes. Puis cherche volontairement l’objection la plus solide contre ton choix et mets à jour l’ADR.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
