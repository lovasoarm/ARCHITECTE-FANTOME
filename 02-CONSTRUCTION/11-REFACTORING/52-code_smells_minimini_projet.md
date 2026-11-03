---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Code smells

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les odeurs : duplication, props en cascade, conditions imbriquées, nombres magiques. Elles s'accumulent vite dans une UI riche.

## OBJECTIF

Ta dette technique est visible et datée.

## APPLICATION

- Liste trois odeurs réelles dans ton portfolio, fichier et ligne à l'appui, dans `docs/smells.md`.
- Corrige la plus coûteuse.
- Laisse les deux autres documentées avec ta raison de les tolérer pour l'instant.

## Critère de réussite

- [ ] Liste trois odeurs réelles dans ton portfolio, fichier et ligne à l'appui, dans `docs/smells.md`.
- [ ] Corrige la plus coûteuse.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle odeur as-tu choisi de tolérer, et à quelle condition la traiteras-tu ?

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

Dans ce scénario, tu as vérifié que : ta dette technique est visible et datée.

Tu la pilotes au lieu de la subir. Commit `docs/smells.md`.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-code_smells_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
