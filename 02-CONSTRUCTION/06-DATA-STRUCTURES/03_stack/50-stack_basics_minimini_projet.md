---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_inversee, temps_limite]
anti_recipe_key: decision_inversee+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Une pile : dernier entré, premier sorti. C'est exactement l'historique « Continuer à regarder » et la pile de modales ouvertes.

## OBJECTIF

Ton historique se comporte comme Netflix.

## APPLICATION

- Implémente la liste des projets récemment vus comme une pile bornée à 5 entrées, sans doublons.
- Vérifie que revoir un projet le remonte en tête.
- Branche-la sur le hook `useRecentlyViewed`.

## Critère de réussite

- [ ] Implémente la liste des projets récemment vus comme une pile bornée à 5 entrées, sans doublons.
- [ ] Vérifie que revoir un projet le remonte en tête.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi une pile bornée et pas une simple liste qui grandit ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton historique se comporte comme Netflix.

Le dernier projet consulté apparaît en premier, comme attendu. Commit.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
