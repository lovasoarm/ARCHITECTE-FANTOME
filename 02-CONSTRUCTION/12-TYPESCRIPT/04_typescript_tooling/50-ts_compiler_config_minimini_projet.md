---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_inversee, decision_organisationnelle]
anti_recipe_key: decision_inversee+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : TS compiler config : tsconfig.json : chaque option expliquée avec son impact réel

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

`tsconfig.json` décide de la sévérité du compilateur. `strict` activé dès maintenant coûte une heure ; activé plus tard, une semaine.

## OBJECTIF

Ton compilateur est en mode strict.

## APPLICATION

- Active `strict`, `noUncheckedIndexedAccess` et `noUnusedLocals` dans ton `tsconfig.json`.
- Corrige les erreurs qui apparaissent, en priorité celles liées aux accès par index.
- Vérifie que `next build` passe.

## Critère de réussite

- [ ] Active `strict`, `noUncheckedIndexedAccess` et `noUnusedLocals` dans ton `tsconfig.json`.
- [ ] Corrige les erreurs qui apparaissent, en priorité celles liées aux accès par index.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Qu'est-ce que `noUncheckedIndexedAccess` t'a forcé à gérer que tu ignorais ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton compilateur est en mode strict.

Le portfolio est protégé par défaut contre les `undefined` silencieux. Commit `tsconfig.json`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-ts_compiler_config_minimini_projet » :** Configure TypeScript pour le module Kintana en activant une option stricte à la fois. Pour chaque option, conserve un exemple qui échoue avant correction et explique le risque qu’elle rend visible.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
