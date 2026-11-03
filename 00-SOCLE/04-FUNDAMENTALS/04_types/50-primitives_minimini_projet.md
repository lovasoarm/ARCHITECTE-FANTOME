---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, changement_echelle]
anti_recipe_key: decision_organisationnelle+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Primitives : les types fondamentaux en JS

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Avant de typer avec TypeScript, il faut savoir ce que JavaScript manipule vraiment : string, number, boolean, null, undefined. Le champ `rating` de tes projets est un `number` borné de 1 à 5, et `featured` un vrai `boolean` : pas un hasard.

## APPLICATION

- Liste chaque champ d'un projet du cahier des charges et note à côté son type primitif réel.
- Repère les champs qui peuvent légitimement être absents (`github`, `demo`).
- Écris ces observations en commentaire en tête de `data/projects.js`.

## Critère de réussite

- [ ] Liste chaque champ d'un projet du cahier des charges et note à côté son type primitif réel.
- [ ] Repère les champs qui peuvent légitimement être absents (`github`, `demo`).
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle différence de sens fais-tu entre `null` et `undefined` pour le champ `github` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton modèle de données est cartographié.

Tu as la carte exacte de ton type `Project` avant même de l'écrire. C'est ce qui rendra le module TypeScript facile.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-primitives_minimini_projet » :** Dans `domain/requests/`, définis les types primitifs attendus pour identifiant, quantité et montant. Refuse explicitement les valeurs incompatibles au lieu de t’appuyer sur une conversion implicite.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
