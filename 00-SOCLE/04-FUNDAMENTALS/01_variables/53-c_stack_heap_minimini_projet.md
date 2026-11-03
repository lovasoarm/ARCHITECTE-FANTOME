---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, defaut_cache]
anti_recipe_key: changement_contexte+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Stack vs Heap : où vit ta valeur ?

> **Repère :** utilise le schéma de pile et d’objets comme modèle d’explication, pas comme photographie de la mémoire.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Les primitives et les objets n'ont pas le même comportement de stockage et de référence observable. Pour comprendre les copies, raisonne surtout en termes de valeur et de référence plutôt qu'en supposant une implémentation précise de la mémoire. Ton tableau `projects` est un objet : le passer à un composant ne le copie pas. C'est exactement ce qui décide si un filtre casse ou non tes données d'origine.

## APPLICATION

- Dans `scratch.js`, crée un tableau de 3 objets projets simplifiés.
- Copie-le avec `=`, modifie un titre dans la copie, affiche l'original.
- Recommence avec une copie superficielle (`[...projects]`) puis une copie profonde (`structuredClone`).
- Écris en commentaire quel niveau de copie protège quoi.

## Critère de réussite

- [ ] Dans `scratch.js`, crée un tableau de 3 objets projets simplifiés.
- [ ] Copie-le avec `=`, modifie un titre dans la copie, affiche l'original.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Après `[...projects]`, pourquoi modifier `copie[0].title` change-t-il quand même l'original ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu sais où vivent tes données.

Tu viens de comprendre pourquoi ton futur filtre « par `category` » ne doit jamais muter `projects`. Cette intuition te fera gagner une soirée de debug en `01-CADRAGE/03-DEBUGGING`.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-c_stack_heap_minimini_projet » :** Dans Kintana, choisis une opération réellement coûteuse, compare deux stratégies sur un jeu reproductible et mesure latence/mémoire avant de retenir une solution.

Dans `domain/requests/`, trace les valeurs primitives et les références d’objets d’une demande partagée. Explique quelles variables pointent vers le même objet et ce qui change lorsqu’une copie est créée.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
