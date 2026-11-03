---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Profiling basics : mesurer avant de toucher

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

« Le site est rapide » n'est pas une mesure. Profiler une page réelle du portfolio remplace l'impression par des chiffres reproductibles.

## OBJECTIF

Tu disposes d'une mesure de départ sur une page réelle du portfolio.

## APPLICATION

- Lance le build de production en local et ouvre l'accueil du portfolio.
- Enregistre un profil de performance pendant le chargement, puis pendant une interaction (ouverture d'une fiche projet).
- Relève trois chiffres : temps de chargement perçu, tâche la plus longue, poids du JavaScript envoyé.
- Note ces chiffres dans `docs/performance.md` comme point de référence daté, avant toute optimisation.

## Critère de réussite

- [ ] Fait : les trois chiffres sont relevés sur un build de production, pas en développement.
- [ ] Fait : `docs/performance.md` contient une mesure de référence datée.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi une mesure faite en mode développement peut-elle induire en erreur ?

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

Dans ce scénario, tu as vérifié que : la performance de ton site peut être décrite par des chiffres reproductibles.

Toute optimisation future se comparera à cette référence. Commit `docs/performance.md`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Livraison produit obligatoire : Kintana : Mesurer avant d’optimiser

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-profiling_basics_minimini_projet » :** Dans Kintana, écris un scénario d’incident reproductible, capture la preuve avant correction et ajoute le test qui aurait empêché le retour du défaut.

Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le protocole indique machine, volume, concurrence et répétitions ; tu présentes p50/p95 ou mémoire ; tu expliques le coût secondaire et refuses toute extrapolation non justifiée. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
