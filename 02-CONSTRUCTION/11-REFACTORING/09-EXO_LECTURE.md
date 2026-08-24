---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, temps_limite]
anti_recipe_key: constraints_injectees+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# EXO LECTURE : 15-25 minutes (Refactoring)

Temps de lecture ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 280 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Temps de lecture ~2 min

Competence : lire du code reel que tu n'as pas ecrit et le comprendre AVANT de
le modifier. C'est 80% du metier. Applique le protocole
`05-MAITRISE/06-ANNEXES/02-cartographier_codebase_inconnue.md` en version zoom.

## L'extrait

On te fournit : un fichier `god_object.js` fictif (100 lignes) : marque les 3 endroits ou tu appliquerais Extract Function.

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

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
