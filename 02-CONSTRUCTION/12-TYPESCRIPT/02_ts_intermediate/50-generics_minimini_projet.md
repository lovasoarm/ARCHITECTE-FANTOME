---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Generics : écrire une fois, utiliser pour n'importe quel type

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

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-generics_minimini_projet » :** Crée un conteneur générique `Result<T>` ou `Page<T>` pour les réponses Kintana. Vérifie que le type du payload est conservé sans cast et que les métadonnées restent indépendantes.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
