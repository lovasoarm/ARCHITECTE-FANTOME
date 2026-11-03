---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, decision_inversee]
anti_recipe_key: fausse_piste+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : E2e playwright beast : simuler un vrai utilisateur

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le test end-to-end vérifie le parcours réel : arrivée sur l'accueil, clic sur une carte, lecture de la fiche projet. C'est le niveau de test qui vérifie qu'un parcours utilisateur important fonctionne à travers plusieurs couches du système : il ne remplace ni les tests unitaires ni les tests d'intégration.

## OBJECTIF

Ton parcours principal est protégé automatiquement.

## APPLICATION

- Installe Playwright et écris un unique scénario : ouvrir l'accueil, cliquer sur la carte ce parcours, vérifier le titre de la fiche.
- Ajoute une assertion sur l'URL du slug.
- Fais tourner le test contre le build de production local.

## Critère de réussite

- [ ] Installe Playwright et écris un unique scénario.
- [ ] Ajoute une assertion sur l'URL du slug.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi ce test doit-il viser des rôles et textes visibles plutôt que des classes CSS ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton parcours principal est protégé automatiquement.

Le chemin qu'empruntera un recruteur est testé automatiquement. Commit le scénario.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-e2e_playwright_beast_minimini_projet » :** Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
