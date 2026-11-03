---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, defaut_cache]
anti_recipe_key: preuve_partielle+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Import / export : arrête de tout mettre dans un seul fichier

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

ESM, imports nommés vs par défaut, alias `@/` : les conventions d'import décident de la lisibilité du portfolio quand il atteindra 40 fichiers.

## OBJECTIF

Tes imports sont propres partout.

## APPLICATION

- Configure (ou vérifie) l'alias `@/*` dans `tsconfig.json`.
- Convertis tous tes imports relatifs profonds (`../../`) en imports d'alias.
- Adopte une règle : export nommé pour les utilitaires, export par défaut pour les composants de page.

## Critère de réussite

- [ ] Configure (ou vérifie) l'alias `@/*` dans `tsconfig.json`.
- [ ] Convertis tous tes imports relatifs profonds (`../../`) en imports d'alias.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel problème concret l'alias `@/` résout-il quand tu déplaces un fichier ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes imports sont propres partout.

Le projet est maintenant déplaçable sans casse. Commit `tsconfig.json` et les fichiers touchés.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-import_export_minimini_projet » :** Sépare la règle de transition d’une demande Kintana dans un module `domain/` et importe uniquement son contrat public dans l’adaptateur. Vérifie qu’aucune dépendance UI ne remonte dans le domaine.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
