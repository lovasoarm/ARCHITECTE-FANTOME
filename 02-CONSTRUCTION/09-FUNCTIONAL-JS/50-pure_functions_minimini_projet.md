---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Une fonction pure : même entrée, même sortie, aucun effet de bord. C'est ce qui rend `format.js` et `projects.js` testables sans monter React.

## APPLICATION

- Audite tes fonctions de `lib/` et repère celles qui lisent une variable externe ou écrivent quelque part.
- Rends-les pures en passant les dépendances en paramètre.
- Vérifie que tes tests existants passent toujours.

## Critère de réussite

- [ ] Audite tes fonctions de `lib/` et repère celles qui lisent une variable externe ou écrivent quelque part.
- [ ] Rends-les pures en passant les dépendances en paramètre.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle fonction n'a pas pu devenir pure, et pourquoi c'est légitime ?

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta couche lib est pure et testable.

Chaque fonction de sélection est vérifiable en une ligne de test. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
