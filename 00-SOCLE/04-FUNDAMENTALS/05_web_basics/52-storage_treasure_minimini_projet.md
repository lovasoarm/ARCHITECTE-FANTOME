---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, decision_inversee]
anti_recipe_key: regression+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Storage treasure : le stockage du navigateur

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

**Extension d'intégration avancée : React / Next.js (différée, hors première passe Fundamentals).** Ce livrable n'est pas la pratique de base de `localStorage` et ne constitue pas une gate Fundamentals.

## Prérequis

- Avoir terminé la leçon canonique Storage.
- Connaître les composants React, `useState` et `useEffect`.
- Comprendre pourquoi `localStorage` n'existe que dans le navigateur et pourquoi l'accès doit être différé côté client.
- Disposer d'un projet React/Next.js fonctionnel.

## CONTEXTE

`localStorage` permet la rangée « Continuer à regarder » : se souvenir des projets déjà consultés. C'est du navigateur pur, donc du client, donc à protéger du rendu serveur.

## OBJECTIF

La rangée « Continuer à regarder » est réelle.

## APPLICATION

- Écris un hook `useRecentlyViewed` qui lit et écrit une liste d'ids dans `localStorage`.
- Appelle-le depuis la page détail d'un projet pour enregistrer la visite.
- Lis-le sur l'accueil pour construire la rangée « Continuer à regarder ».
- Assure-toi que l'accès au stockage se fait uniquement après montage.

## Critère de réussite

- [ ] Écris un hook `useRecentlyViewed` qui lit et écrit une liste d'ids dans `localStorage`.
- [ ] Appelle-le depuis la page détail d'un projet pour enregistrer la visite.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Que se passe-t-il si tu lis `localStorage` pendant le rendu serveur, et comment l'évites-tu ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : la rangée « Continuer à regarder » est réelle.

Ton portfolio se souvient du visiteur : c'est LA touche Netflix du projet. Commit ce hook.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-storage_treasure_minimini_projet » :** Dans l’adaptateur navigateur Kintana, enregistre un brouillon non sensible avec une clé versionnée. Gère stockage absent, JSON corrompu et version inconnue ; ne fais pas de `localStorage` la source d’autorité métier.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
