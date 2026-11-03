---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, fausse_piste]
anti_recipe_key: decision_organisationnelle+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

# Mise en pratique : Closure trap : la fonction qui n'oublie jamais

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## Prérequis

- Connaître `useState`
- Connaître `useEffect`
- Comprendre les closures

## CONTEXTE

Une closure capture des variables, pas des valeurs figées : d'où les « stale closures » de React, où un handler lit un state périmé. Ton futur carrousel de projets tombera dedans.

Une stale closure n'est pas une anomalie des closures : c'est une conséquence normale d'une closure utilisée avec une valeur issue d'un rendu précédent.

## APPLICATION

- Crée un composant client avec un compteur et un `setInterval` dans un `useEffect` avec tableau de dépendances vide.
- Affiche la valeur lue par l'intervalle : constate qu'elle reste bloquée.
- Corrige avec la forme fonctionnelle de `setState`.
- Note en commentaire ce que la closure avait réellement capturé.

## Critère de réussite

- [ ] Crée un composant client avec un compteur et un `setInterval` dans un `useEffect` avec tableau de dépendances vide.
- [ ] Affiche la valeur lue par l'intervalle.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi l'intervalle lit-il toujours la même valeur alors que le state, lui, augmente bien ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu as désamorcé la stale closure.

Ce bug précis coûte des heures à la plupart des devs React. Tu l'as vu, reproduit et corrigé avant qu'il n'atteigne ton carrousel Netflix.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-closure_trap_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, crée une fabrique de compteurs indépendants par tenant au moyen d’une closure. Vérifie que deux instances ne partagent pas leur état et documente la durée de vie de la référence capturée.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
