---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, preuve_partielle]
anti_recipe_key: decision_organisationnelle+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

# Mise en pratique : This : un avant-goût avant le vrai cours

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

`this` dépend de l'appel, pas de la déclaration. En React fonctionnel tu l'évites presque partout : sauf dans une classe `ErrorBoundary`, que le portfolio aura pour ne jamais afficher un écran blanc.

## OBJECTIF

Tu maîtrises le piège du this détaché.

## APPLICATION

- Écris un objet avec une méthode classique et une méthode fléchée qui lisent toutes deux `this`.
- Extrais chaque méthode dans une variable, appelle-la, compare le résultat.
- Déduis-en pourquoi une classe React lie ses handlers avec des propriétés fléchées.

## Critère de réussite

- [ ] Écris un objet avec une méthode classique et une méthode fléchée qui lisent toutes deux `this`.
- [ ] Extrais chaque méthode dans une variable, appelle-la, compare le résultat.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle règle détermine la valeur de `this` lors d'un appel de fonction classique ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tu maîtrises le piège du this détaché.

Tu es prêt à écrire une `ErrorBoundary` correcte au module 5 sans copier un exemple sans le comprendre.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-this_context_minimini_projet » :** Dans `domain/requests/`, passe une méthode de demande comme callback et compare son comportement appelée directement, extraite puis liée explicitement. Rends le contexte nécessaire explicite.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
