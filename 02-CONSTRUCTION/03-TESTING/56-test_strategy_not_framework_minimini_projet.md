---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_inversee, decision_organisationnelle]
anti_recipe_key: decision_inversee+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

# Mise en pratique : Stratégie de tests (pas framework)

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

La bonne question n'est pas « quel framework » mais « quoi tester ». Un portfolio statique n'a pas besoin de 80 % de couverture, il a besoin des bons tests.

## APPLICATION

- Rédige `docs/strategie-tests.md` : ce que tu testes unitairement, en intégration, en E2E, et ce que tu ne testes pas volontairement.
- Justifie chaque « pas testé » en une ligne.
- Compare à ta suite actuelle et supprime les tests sans valeur.

## Critère de réussite

- [ ] Rédige `docs/strategie-tests.md`.
- [ ] Justifie chaque « pas testé » en une ligne.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel test as-tu supprimé, et pourquoi ne te manquera-t-il pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta suite de tests est intentionnelle.

Tu peux défendre chaque test de ton dépôt en entretien. Commit ce document.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 56-test_strategy_not_framework_minimini_projet » :** Dans Kintana, protège un invariant métier par tests nominaux, limites, droits et panne. Injecte une régression volontaire pour vérifier que la suite l’attrape.

Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
