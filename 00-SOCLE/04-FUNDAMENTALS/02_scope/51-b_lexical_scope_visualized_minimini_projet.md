---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

� Fondamental

## CONTEXTE

La portée lexicale se lit dans le code, pas à l'exécution. C'est ce qui explique qu'un composant enfant « voie » les props qu'on lui passe et rien d'autre.

## OBJECTIF

Ta carte projet a une hiérarchie claire.

## APPLICATION

- Dessine (papier ou commentaire) les portées imbriquées de ton fichier `ProjectCard.jsx` : module → composant → handler `onClick`.
- Utilise dans le handler une variable venant de chacune des trois portées.
- Vérifie que ça compile et explique en une phrase la chaîne de résolution.

## Critère de réussite

- [ ] Dessine (papier ou commentaire) les portées imbriquées de ton fichier `ProjectCard.jsx`.
- [ ] Utilise dans le handler une variable venant de chacune des trois portées.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Si deux variables portent le même nom dans deux portées imbriquées, laquelle gagne et pourquoi ?

## Preuve à conserverem-

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta carte projet a une hiérarchie claire.

Tu sais maintenant lire un composant React comme une pile de portées : c'est l'outil mental n°1 pour comprendre le code des autres.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
