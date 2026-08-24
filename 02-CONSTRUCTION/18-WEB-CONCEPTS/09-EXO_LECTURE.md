---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# EXO LECTURE : 15-25 minutes (Web Concepts)

Temps de lecture ~3 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 320 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Temps de lecture ~2 min

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier.

## L'extrait

On te fournit un extrait qui manipule DOM/CORS/fetch/CSP ou stream le rendu : issu de `02-CONSTRUCTION/18-WEB-CONCEPTS/`. 15-25 minutes de lecture, pas plus.

## Le protocole (15 min chrono)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : exécute (ou lis les tests), compare à ton hypothèse, explique tout écart. Le nombre d'écarts est le vrai résultat de l'exercice.

## Livrable

`LECTURE_<nom>.md` avec tes 3 sections remplies. Interdiction absolue de modifier l'extrait avant que les 3 sections soient écrites au propre. Cf `../11-REFACTORING/07-do_not_touch_before_explain.md`.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur Web Concepts. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Fait 3 fois de suite avec 3 extraits différents avant de passer au prochain module.
- Croise avec `EXO_VERIFICATION.md` du même module quand il existe : compare ton hypothèse humaine à celle qu'une IA produirait sur le même extrait.

## Livrable obligatoire : MAP_15MIN.md

Ce bloc appartient a "Systeme web complet" / "Ingenierie senior".
A la fin de cet EXO_LECTURE, tu produis un `MAP_15MIN.md` a cote de ce fichier,
en suivant `02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/08-MAP_15MIN_TEMPLATE.md`.

Critere binaire : 15 min chrono, cartographie + chemin critique + 3 points
chauds + 3 hypotheses testables. Sans cet artefact, l'EXO_LECTURE n'est pas
valide.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
