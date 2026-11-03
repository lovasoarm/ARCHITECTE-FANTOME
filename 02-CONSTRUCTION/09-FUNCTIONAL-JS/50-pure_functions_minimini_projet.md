---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Fonctions pures : même input, même output, toujours

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

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-pure_functions_minimini_projet » :** Dans `domain/requests/`, écris une fonction de calcul qui dépend uniquement de ses arguments. Injecte le taux ou l’horloge si nécessaire et vérifie que deux appels avec les mêmes entrées donnent le même résultat sans effet de bord.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
