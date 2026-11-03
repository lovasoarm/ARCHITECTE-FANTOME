---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, defaut_cache]
anti_recipe_key: constraints_injectees+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : DOM manipulation

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

**Extension d'intégration avancée : React / Next.js (différée, hors première passe Fundamentals).** Ce livrable n'est pas la pratique de base de DOM manipulation et ne conditionne pas la progression.

## Prérequis

- Avoir terminé la route canonique Fundamentals jusqu'à Web Basics.
- Savoir créer un composant React et utiliser `useRef`.
- Savoir ce qu'est un Client Component dans l'App Router Next.js.
- Disposer d'un projet React/Next.js fonctionnel.

## CONTEXTE

En React on ne touche pas le DOM à la main : sauf pour ce que React ne gère pas : focus, mesure, scroll. Un carrousel Netflix a besoin des trois.

## OBJECTIF

Ta rangée défile comme sur Netflix.

## APPLICATION

- Dans un composant client de rangée, crée une `ref` sur le conteneur scrollable.
- Ajoute deux boutons flèche qui font défiler la rangée en modifiant `scrollLeft`.
- Vérifie que tu n'as créé ni sélecteur `document.querySelector` ni manipulation de classe à la main.

## Critère de réussite

- [ ] Dans un composant client de rangée, crée une `ref` sur le conteneur scrollable.
- [ ] Ajoute deux boutons flèche qui font défiler la rangée en modifiant `scrollLeft`.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Dans quels cas précis une `ref` est-elle légitime plutôt qu'un state ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta rangée défile comme sur Netflix.

Le geste signature du site fonctionne, et il est écrit en React idiomatique. Montre ce résultat à quelqu'un en 2 minutes.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-dom_manipulation_minimini_projet » :** Dans l’interface Kintana, affiche le statut courant d’une demande et mets à jour uniquement le nœud concerné après une action. Sépare la règle métier du DOM et traite les valeurs utilisateur comme du texte.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
