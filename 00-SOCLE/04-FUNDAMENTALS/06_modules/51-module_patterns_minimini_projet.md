---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_inversee]
anti_recipe_key: constraints_injectees+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Encapsuler, exposer, protéger : les vrais patterns de modules

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## Prérequis

- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

Barrel files, modules « serveur uniquement », séparation client/serveur : dans l'App Router, un mauvais import fait basculer tout un arbre côté client.

## APPLICATION

- Marque un module réellement serveur (par ex. lecture de données) et tente de l'importer depuis un composant `"use client"` : lis l'erreur.
- Sépare les types dans `types/` pour qu'ils soient importables des deux côtés.
- Évalue si un barrel `index.js` t'aide ou masque tes dépendances : tranche et note ton choix.

## Critère de réussite

- [ ] Marque un module réellement serveur (par ex. lecture de données) et tente de l'importer depuis un composant `"use client"`.
- [ ] Sépare les types dans `types/` pour qu'ils soient importables des deux côtés.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment sais-tu, en lisant un fichier, s'il finira dans le bundle client ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta frontière client/serveur est explicite.

Tu contrôles ce qui part dans le navigateur : c'est du poids de page en moins, gratuitement. Commit.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-module_patterns_minimini_projet » :** Dans `domain/requests/`, cache l’état interne d’une politique de transition et expose des opérations nommées. Vérifie qu’un appelant ne peut pas modifier directement une structure interne.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
