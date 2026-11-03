---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, changement_echelle]
anti_recipe_key: transmission+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Integration reactor : quand l'isolation ne suffit plus

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un test d'intégration monte plusieurs pièces : données → filtre → composant rendu. C'est ce qui prouve qu'une rangée affiche les bons projets.

## OBJECTIF

Ta rangée est testée de bout en bout.

## APPLICATION

- Rends la rangée « Continuer à regarder » dans un test avec un jeu de données maîtrisé.
- Assure-toi que seuls les projets attendus apparaissent, par leur titre visible.
- Ajoute un cas limite : aucune donnée.

## Critère de réussite

- [ ] Rends la rangée « Continuer à regarder » dans un test avec un jeu de données maîtrisé.
- [ ] Assure-toi que seuls les projets attendus apparaissent, par leur titre visible.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que couvre ce test que trois tests unitaires séparés ne couvraient pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta rangée est testée de bout en bout.

La pièce la plus visible du portfolio est vérifiée automatiquement. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Livraison produit obligatoire : Kintana : Contrat métier sous filet

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-integration_reactor_minimini_projet » :** Construis une suite de tests autour d’un invariant Kintana lié à cette notion. Ajoute un test nominal, un cas limite, un cas d’accès refusé ou de panne selon le sujet, puis injecte volontairement une régression.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Les assertions testent le comportement public ; la régression est détectée ; les tests restent déterministes et reproductibles. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
