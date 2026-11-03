---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Unit sniper : tester une fonction précisément

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un test unitaire cible une fonction pure. `slugify`, `formatYear`, `getProjectsByRow` sont les premières cibles évidentes du portfolio.

## OBJECTIF

Tes utilitaires sont sous filet.

## APPLICATION

- Écris trois tests sur `slugify` : titre simple, titre avec majuscules et tiret (`Safe-driving`), titre avec accents.
- Vérifie qu'un test échoue si tu casses volontairement la fonction.
- Remets la fonction en état.

## Critère de réussite

- [ ] Écris trois tests sur `slugify`.
- [ ] Vérifie qu'un test échoue si tu casses volontairement la fonction.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce qui rend une fonction facile à tester unitairement ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes utilitaires sont sous filet.

Les briques de formatage du portfolio sont protégées contre les régressions. Commit les tests.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-unit_sniper_minimini_projet » :** Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
