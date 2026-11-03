---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Types et interfaces : pas les mêmes armes

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

C'est le moment central du portfolio : écrire les types `Project` et `PersonalInfo` du cahier des charges. Tout le reste du site en dépendra.

## OBJECTIF

Le type Project du cahier des charges existe.

## APPLICATION

- Crée `types/index.ts` (à la racine du projet, pas sous `src/`) et déclare d'abord les deux unions littérales : `ProjectStatus` (`'completed' | 'in-progress' | 'concept'`) et `ProjectCategory` (`'web' | 'mobile' | 'ux' | 'open-source' | 'backend'`).
- Déclare `interface Project` avec exactement ces champs : `id`, `slug`, `title`, `tagline`, `description` (string), `category: ProjectCategory`, `status: ProjectStatus`, `year: number`, `duration: string`, `stack: string[]`, `github?: string`, `demo?: string`, `thumbnail: string`, `featured: boolean`, `rating: number` (1 à 5, commente la contrainte).
- Déclare `interface PersonalInfo` avec : `name`, `alias`, `role`, `bio`, `location`, `email`, `github`, `linkedin` : tous en `string`.
- Applique `Project[]` à `data/projects.ts` et `PersonalInfo` à tes infos personnelles, puis corrige toutes les erreurs remontées.

## Critère de réussite

- [ ] Déclare `interface PersonalInfo` avec.
- [ ] Applique `Project[]` à `data/projects.ts` et `PersonalInfo` à tes infos personnelles, puis corrige toutes les erreurs remontées.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle erreur TypeScript t'a révélé une incohérence que tu n'avais pas vue ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : le type Project du cahier des charges existe.

C'est la brique n°1 de tout le portfolio : chaque composant s'y adossera désormais. Commit ce fichier.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-types_and_interfaces_minimini_projet » :** Définis une interface TypeScript pour le résumé d’une demande Kintana et un type distinct pour la commande de création. Rends explicite la différence entre champ absent, `null` et champ requis.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
