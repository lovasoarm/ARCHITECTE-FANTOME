---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Scope isolé : arrêter de polluer le global

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Projet fil rouge

## Niveau

**Extension d'intégration avancée : séparation des données dans un portfolio React/Next.js (différée, hors première passe Fundamentals).** Ce livrable n'est pas nécessaire pour valider les modules JavaScript et ne constitue pas une gate Fundamentals.

## Prérequis

- Avoir terminé la route canonique Modules / Function factories correspondante.
- Maîtriser `import` / `export`, les fonctions et les tableaux / objets.
- Connaître les composants React et la structure du projet de portfolio utilisé.
- Disposer de ce projet et vérifier son état avant toute modification.

## CONTEXTE

Un module bien découpé expose peu et cache beaucoup. `lib/projects.js` doit exposer des fonctions de sélection, pas son tableau interne partout.

## OBJECTIF

Ta couche d'accès aux données est fermée.

## APPLICATION

- Regroupe dans `lib/projects.js` : `getAllProjects`, `getProjectBySlug`, `getProjectsByCategory`.
- Fais en sorte que les composants n'importent plus jamais `data/projects.js` directement.
- Vérifie en cherchant les imports restants dans le projet.

## Critère de réussite

- [ ] Regroupe dans `lib/projects.js`.
- [ ] Fais en sorte que les composants n'importent plus jamais `data/projects.js` directement.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel avantage obtiens-tu le jour où tes projets viendront d'un CMS au lieu d'un fichier ?

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

Dans ce scénario, tu as vérifié que : ta couche d'accès aux données est fermée.

Tu as une frontière nette entre données et affichage : c'est le genre de choix qu'on remarque en revue de code. Commit.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 55-module_factory_minimini_projet » :** Dans `domain/requests/`, encapsule la configuration et les fonctions d’un module sans ajouter de variables au global. N’expose que l’API nécessaire et vérifie que deux instances gardent leur état séparé.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
