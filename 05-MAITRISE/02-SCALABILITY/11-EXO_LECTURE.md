---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO LECTURE : ~20 minutes : un cycle (Scalabilite)

**Durée indicative : environ 20 minutes** : environ 2 minutes pour prendre connaissance de la consigne, puis 15 minutes pour le protocole et quelques minutes pour consigner le résultat. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 460 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Competence : lire du code reel que tu n'as pas ecrit et le comprendre AVANT de
le modifier. C'est 80% du metier. Applique le protocole
`05-MAITRISE/06-ANNEXES/02-cartographier_codebase_inconnue.md` en version zoom.

## L'extrait

On te fournit : un pool de workers avec load-balancing round-robin : trace ce qui se passe quand un worker crash.

## Le protocole (15 min chrono)

1. POINT D'ENTREE : quelle ligne s'execute en premier ? Qui appelle ce code ?
2. HYPOTHESE SUR LE COMPORTEMENT : sans l'executer, ecris ce que tu crois qu'il
   fait, entree -> sortie.
3. VERIFICATION : execute (ou lis les tests), compare a ton hypothese, explique
   tout ecart.

## Livrable

`LECTURE_<nom>.md` avec tes 3 sections remplies + un dessin ASCII du flux.

## (attention) Ce que l'exo revele

Si ton hypothese etait fausse, tant mieux : tu viens d'apprendre ou ton modele
mental cloche. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent
mais juste.

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

Crée `MAP_15MIN.md` dans ton espace de travail apprenant, en suivant le [template MAP_15MIN](../../02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/08-MAP_15MIN_TEMPLATE.md). Ne place pas ce livrable dans le dépôt source du curriculum.

Le `MAP_15MIN.md` complète `LECTURE_<nom>.md` : le MAP conserve la cartographie, le chemin critique, les points chauds et les hypothèses testables ; la fiche LECTURE conserve la prédiction de comportement, la vérification et l’écart observé. **Le MAP est le livrable du même protocole de 15 minutes ; il ne constitue pas une séance supplémentaire.**

**Critère binaire :** 15 minutes chronométrées (ou dépassement documenté), cartographie non vide, chemin critique, exactement 3 points chauds et exactement 3 hypothèses testables.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
