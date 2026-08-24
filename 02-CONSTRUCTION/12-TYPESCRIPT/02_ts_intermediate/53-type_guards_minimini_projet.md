---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [preuve_partielle, decision_organisationnelle]
anti_recipe_key: preuve_partielle+decision_organisationnelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

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
