---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, temps_limite]
anti_recipe_key: decision_organisationnelle+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Higher-order functions : map, filter et reduce

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Projet fil rouge

## Niveau

[OK] Fondamental

## CONTEXTE

`map` et `filter` sont le moteur de rendu d'un catalogue Netflix : une liste de données → une liste de cartes, filtrée par catégorie.

## OBJECTIF

Ta première rangée Netflix est vivante.

## APPLICATION

- Dans `data/projects.js`, écris un tableau de tes six projets (ZO, Hotelia, ce parcours, Safe-driving, RECIPLY, Lovasoa) avec au minimum `id`, `title`, `category`, `year`, `featured`.
- Dans `app/page.tsx`, rends une rangée en filtrant sur `category` (et une autre sur `featured`) puis en mappant vers `<ProjectCard />`.
- Ajoute la `key` correcte sur chaque élément rendu.

## Critère de réussite

- [ ] Dans `app/page.tsx`, rends une rangée en filtrant sur `category` (et une autre sur `featured`) puis en mappant vers `<ProjectCard />`.
- [ ] Ajoute la `key` correcte sur chaque élément rendu.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi `key` doit-elle être l'id du projet et jamais l'index du tableau ?

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

Dans ce scénario, tu as vérifié que : ta première rangée Netflix est vivante.

Le catalogue existe : tes six projets sortent d'une donnée typée et non de HTML recopié. Commit ce fichier, c'est le cœur du site.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-hof_map_filter_minimini_projet » :** Dans `domain/requests/`, utilise `map` pour projeter les demandes, `filter` pour sélectionner celles qui respectent un critère et `reduce` pour calculer un agrégat. Vérifie l’ordre et le résultat sur une entrée vide.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
