---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [defaut_cache, preuve_partielle]
anti_recipe_key: defaut_cache+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

`map`, `filter`, `reduce`, `some`, `find` : choisir la bonne méthode rend l'intention lisible. Ton catalogue les utilise toutes.

## OBJECTIF

Tu as le filtre par techno du portfolio.

## APPLICATION

- Écris quatre sélections réelles : les projets d'une rangée, le projet par slug, le nombre de projets en cours, la liste dédupliquée de toutes les technos.
- Utilise pour chacune la méthode la plus expressive.
- Interdis-toi toute boucle `for`.

## Critère de réussite

- [ ] Utilise pour chacune la méthode la plus expressive.
- [ ] Interdis-toi toute boucle `for`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pour la liste dédupliquée des technos, pourquoi `reduce` ou `Set` plutôt qu'un `map` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as le filtre par techno du portfolio.

La liste des technos alimente directement un futur filtre de catalogue. Commit `projects.js`.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
