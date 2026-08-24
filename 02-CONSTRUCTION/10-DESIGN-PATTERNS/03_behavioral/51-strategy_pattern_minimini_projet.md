---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Une stratégie = un algorithme interchangeable. Le tri du catalogue (par année, par note, par titre) est un cas d'école.

## OBJECTIF

Ton catalogue se trie à la demande.

## APPLICATION

- Définis un objet de stratégies de tri, clé → fonction de comparaison.
- Branche un sélecteur d'ordre sur la page « Tous les projets ».
- Ajoute une nouvelle stratégie sans modifier le composant.

## Critère de réussite

- [ ] Définis un objet de stratégies de tri, clé → fonction de comparaison.
- [ ] Branche un sélecteur d'ordre sur la page « Tous les projets ».
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce que ce pattern t'évite d'écrire à chaque nouveau critère de tri ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton catalogue se trie à la demande.

Une vraie fonctionnalité utilisateur, extensible sans toucher l'UI. Commit.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
