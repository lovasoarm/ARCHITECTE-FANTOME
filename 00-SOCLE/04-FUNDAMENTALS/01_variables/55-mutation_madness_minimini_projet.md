---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Mutation madness : shallow vs deep copy

> **Repère :** une copie superficielle du tableau ne copie pas automatiquement les objets qu’il contient.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## Prérequis

- Connaître `useState`

## CONTEXTE

Muter un objet en place, c'est invisible pour React : sans nouvelle référence, pas de re-render. Ton futur filtre de catalogue en dépend directement.

## APPLICATION

- Dans un composant client, mets un tableau de projets dans un `useState`.
- Ajoute un bouton qui fait `projects.push(...)` puis `setProjects(projects)` : constate que rien ne se réaffiche.
- Corrige en construisant un nouveau tableau.
- Note en commentaire la règle : nouvelle donnée = nouvelle référence.

## Critère de réussite

- [ ] Dans un composant client, mets un tableau de projets dans un `useState`.
- [ ] Ajoute un bouton qui fait `projects.push(...)` puis `setProjects(projects)`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi React ne « voit » pas un `push` alors que la donnée a bien changé ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton state React réagit vraiment.

Tu tiens la règle qui gouvernera tous les états du portfolio : filtres, recherche, favoris. Montre ce mini-exemple à quelqu'un en 2 minutes : s'il comprend, tu as compris.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-mutation_madness_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, mets à jour une demande imbriquée sans modifier l’original. Vérifie précisément quelles branches peuvent rester partagées et lesquelles doivent être copiées.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
