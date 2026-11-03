---
stability: intemporel
acte: pratiquer
---

# Mise en pratique : Template portals : template strings & DOM templating

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

**Extension d'intégration avancée : React (différée, hors première passe Fundamentals).** Ce livrable n'est pas une pratique HTML/DOM native et ne constitue pas une gate Fundamentals.

## Prérequis

- Avoir terminé les leçons canoniques Web Basics.
- Connaître les composants React, les événements et le rendu conditionnel.
- Comprendre les portails React et la gestion du focus / clavier pour une modale accessible.
- Disposer d'un projet React fonctionnel.

## CONTEXTE

Un portal rend un élément dans un autre emplacement du DOM tout en conservant son appartenance à l'arbre React. C'est une solution fréquente pour une modale qui doit échapper au découpage d'un conteneur, par exemple à cause de `overflow: hidden` ; ce n'est pas une réponse automatique à tous les problèmes de superposition.

## OBJECTIF

Ta modale projet s'ouvre proprement.

## APPLICATION

- Crée un composant `Modal` qui rend ses enfants via `createPortal` dans `document.body`.
- Ouvre-le au clic sur une carte projet, ferme-le avec Échap et au clic sur le fond.
- Donne au dialogue un nom accessible et une sémantique de dialogue ; place le focus à l'ouverture et restaure-le à la fermeture.
- Vérifie qu'il s'affiche par-dessus la rangée même quand celle-ci scrolle.

## Critère de réussite

- [ ] Crée un composant `Modal` qui rend ses enfants via `createPortal` dans `document.body`.
- [ ] Ouvre-le au clic sur une carte projet, ferme-le avec Échap et au clic sur le fond.
- [ ] Le dialogue est nommé, le focus est géré à l'ouverture et restauré à la fermeture.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi le portal résout-il le problème de découpage alors qu'un simple `z-index` ne suffisait pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta modale projet s'ouvre proprement.

La fiche projet en overlay, c'est la moitié de l'expérience Netflix. Commit ce composant, tu le réutiliseras partout.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-template_portals_minimini_projet » :** Dans l’interface Kintana, rends un résumé avec des données de demande injectées dans un template. Préserve la structure et affiche les valeurs utilisateur comme du texte sûr, sans interpréter leur contenu comme du HTML.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
