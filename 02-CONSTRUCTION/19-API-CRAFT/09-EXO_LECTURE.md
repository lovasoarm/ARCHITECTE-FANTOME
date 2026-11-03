---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# EXO LECTURE : ~20 minutes : un cycle (API Craft)

**Durée indicative : environ 20 minutes** : environ 2 minutes pour prendre connaissance de la consigne, puis 15 minutes pour le protocole et quelques minutes pour consigner le résultat. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 400 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier. Applique le protocole `05-MAITRISE/06-ANNEXES/02-cartographier_codebase_inconnue.md` en version zoom.

## L'extrait

On te fournit un handler Express sans gestion d'erreur centralisée (10-30 lignes ; prends un extrait réel de tes mini-projets ou d'un repo OSS).

## Le protocole (15 min chrono)

1. POINT D'ENTRÉE : quelle ligne s'exécute en premier ? Qui appelle ce code ?
2. HYPOTHÈSE SUR LE COMPORTEMENT : sans l'exécuter, écris ce que tu crois qu'il fait, entrée -> sortie.
3. VÉRIFICATION : exécute, compare à ton hypothèse, explique tout écart.

## Livrable

`LECTURE_<nom>.md` avec tes 3 sections remplies + un dessin ASCII du flux.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## RÈGLE READ_ONLY_FIRST (non négociable)

**Tu n'as PAS le droit de modifier le code tant que tu ne peux pas :**

1. Expliquer à voix haute ce que fait la fonction / le fichier, en 3 phrases.
2. Prédire correctement la sortie sur au moins 2 entrées distinctes (sans exécuter).
3. Nommer une hypothèse implicite du code (ex : "suppose que l'input est trié", "suppose qu'il y a un seul thread").

Tant que ces 3 points ne sont pas faits, `git status` doit rester `working tree clean` sur ce fichier. La lecture précède l'écriture. Un dev qui modifie avant d'avoir lu est un dev qui casse.

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans `HYPOTHESES.md`, ne le fais pas dans le fichier**.

---

## Livrable obligatoire : MAP_15MIN.md

Ce bloc appartient au parcours « Système web complet » / « Ingénierie senior ».

Crée `MAP_15MIN.md` dans ton espace de travail apprenant, en suivant le [template MAP_15MIN](../02-MINI-PROJECTS/97-templates/08-MAP_15MIN_TEMPLATE.md). Ne place pas ce livrable dans le dépôt source du curriculum.

Le `MAP_15MIN.md` complète `LECTURE_<nom>.md` : le MAP conserve la cartographie, le chemin critique, les points chauds et les hypothèses testables ; la fiche LECTURE conserve la prédiction de comportement, la vérification et l’écart observé. **Le MAP est le livrable du même protocole de 15 minutes ; il ne constitue pas une séance supplémentaire.**

**Critère binaire :** 15 minutes chronométrées (ou dépassement documenté), cartographie non vide, chemin critique, exactement 3 points chauds et exactement 3 hypothèses testables.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
