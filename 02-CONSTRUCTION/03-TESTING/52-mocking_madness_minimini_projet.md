---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, decision_inversee]
anti_recipe_key: solution_concurrente+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Mocking madness : remplacer ce qu'on ne contrôle pas

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

On simule ce qu'on ne contrôle pas : l'API GitHub, `localStorage`, le routeur. Sans mocks, tes tests dépendent du réseau : donc échouent au hasard.

## OBJECTIF

Tes tests tournent hors ligne.

## APPLICATION

- Écris un test de ta fonction de fetch GitHub en simulant `fetch` : un cas succès, un cas erreur.
- Vérifie que la valeur de repli est bien renvoyée en cas d'échec.
- Assure-toi qu'aucun appel réseau réel ne part pendant les tests.

## Critère de réussite

- [ ] Écris un test de ta fonction de fetch GitHub en simulant `fetch`.
- [ ] Vérifie que la valeur de repli est bien renvoyée en cas d'échec.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Où passe la frontière entre ce qu'il faut simuler et ce qu'il faut tester réellement ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes tests tournent hors ligne.

Ta suite est rapide et déterministe, exécutable dans l'avion. Commit.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-mocking_madness_minimini_projet » :** Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
