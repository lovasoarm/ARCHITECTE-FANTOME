---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les génériques évitent de dupliquer un utilitaire par type. Ton `take(n)` ou ton `sortBy` doivent marcher sur n'importe quelle liste.

## OBJECTIF

Tes utilitaires sont réutilisables et typés.

## APPLICATION

- Rends `take` et `sortBy` génériques.
- Vérifie au survol que le type de sortie conserve `Project` quand tu les appliques au catalogue.
- Interdis toute perte de type vers `any[]`.

## Critère de réussite

- [ ] Rends `take` et `sortBy` génériques.
- [ ] Vérifie au survol que le type de sortie conserve `Project` quand tu les appliques au catalogue.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que perds-tu concrètement si tu remplaces le générique par `unknown[]` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes utilitaires sont réutilisables et typés.

Une bibliothèque interne minuscule mais solide. Commit.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
