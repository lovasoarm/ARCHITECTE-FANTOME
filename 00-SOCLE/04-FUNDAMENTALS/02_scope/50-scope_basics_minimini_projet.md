---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Scope : où vit ta variable ?

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Projet fil rouge

## Niveau

[OK] Fondamental

## Prérequis

- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

La portée décide de ce qu'un morceau de code peut voir. Dans Next.js App Router, cette distinction devient également importante pour comprendre quelles données appartiennent au code serveur et lesquelles peuvent être exposées au client.

> Attention : une variable au niveau module n'est pas une garantie de sécurité. Une donnée secrète doit rester dans une frontière serveur appropriée.

## OBJECTIF

Ta page est rangée par portée.

## APPLICATION

- Dans `app/page.tsx`, déclare une constante au niveau module et une autre dans le corps du composant.
- Essaie d'utiliser la seconde dans une fonction déclarée hors du composant : lis l'erreur.
- Range ce qui est réutilisable au niveau module, ce qui dépend du rendu dans le composant.

## Critère de réussite

- [ ] Dans `app/page.tsx`, déclare une constante au niveau module et une autre dans le corps du composant.
- [ ] Essaie d'utiliser la seconde dans une fonction déclarée hors du composant.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle question te poses-tu pour décider si une valeur doit vivre au niveau module ou dans le composant ?

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

Dans ce scénario, tu as vérifié que : ta page est rangée par portée.

Tu viens d'adopter le réflexe qui garde tes fichiers Next.js lisibles quand ils grossissent. Commit cette page.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-scope_basics_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, limite les variables temporaires à la fonction ou au bloc qui les utilise. Ajoute deux parcours indépendants et vérifie qu’aucun état temporaire ne fuit entre eux.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
