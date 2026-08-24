---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** ta frontière de confiance est un mur. Le problème n'est pas seulement de savoir s'il tient ; il faut savoir **qui peut passer, par où, avec quelle preuve et que se passe-t-il quand le mur est percé**.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le portfolio est en français mais des recruteurs internationaux le liront. Externaliser les textes rend une version anglaise possible sans refonte.

## OBJECTIF

Tes textes d'interface sont centralisés.

## APPLICATION

- Sors les chaînes d'interface (titres de rangées, boutons, libellés) dans un fichier de dictionnaire typé.
- Remplace chaque texte en dur des composants par une clé.
- Ajoute `lang="fr"` sur le document.

## Critère de réussite

- [ ] Sors les chaînes d'interface (titres de rangées, boutons, libellés) dans un fichier de dictionnaire typé.
- [ ] Remplace chaque texte en dur des composants par une clé.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelles chaînes ne doivent PAS être externalisées, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes textes d'interface sont centralisés.

Une version anglaise coûte désormais un fichier, pas une refonte. Commit le dictionnaire.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
