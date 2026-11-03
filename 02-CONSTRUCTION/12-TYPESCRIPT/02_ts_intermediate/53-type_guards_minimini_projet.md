---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [preuve_partielle, decision_organisationnelle]
anti_recipe_key: preuve_partielle+decision_organisationnelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Type guards : rétrécir un type à runtime

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un garde de type restreint `unknown` à quelque chose d'utilisable. Indispensable pour valider une réponse d'API avant affichage.

## APPLICATION

- Écris `isGithubRepo(value: unknown)` qui vérifie la présence des champs attendus.
- Utilise-le avant ton adaptateur : si le garde échoue, renvoie le repli.
- Vérifie que TypeScript t'autorise l'accès aux champs seulement après le garde.

## Critère de réussite

- [ ] Écris `isGithubRepo(value: unknown)`.
- [ ] Utilise-le avant ton adaptateur.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi le compilateur ne peut-il pas vérifier seul la forme d'une réponse réseau ?

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes données externes sont validées au runtime.

La frontière entre le monde extérieur et ton code typé est étanche. Commit.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-type_guards_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Reçois une donnée externe de type `unknown` et écris un type guard qui valide les champs réellement nécessaires avant de la traiter comme une demande Kintana. Rejette les structures partielles ou incohérentes.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
