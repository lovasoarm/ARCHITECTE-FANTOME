---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Regex extractor : capturer, remplacer, splitter

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

Extraire, pas seulement valider : si tes fiches projets deviennent des fichiers Markdown, il faudra en tirer le front-matter et les titres.

## OBJECTIF

Ton sommaire de fiche projet se génère seul.

## APPLICATION

- Prends la `description` d'un projet en Markdown.
- Écris une fonction qui extrait tous les titres `##` avec leur texte en utilisant les groupes de capture.
- Utilise le résultat pour générer un sommaire cliquable sur la page détail.

## Critère de réussite

- [ ] Prends la `description` d'un projet en Markdown.
- [ ] Écris une fonction qui extrait tous les titres `##` avec leur texte en utilisant les groupes de capture.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

À quoi sert un groupe de capture par rapport à une simple correspondance ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton sommaire de fiche projet se génère seul.

La page détail gagne une navigation interne automatique. Commit ce helper.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 52-regex_extractor_minimini_projet » :** Extrait d’une référence Kintana le préfixe, le numéro et un éventuel suffixe documenté. Teste la capture, le remplacement et le découpage sans perdre les séparateurs nécessaires.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
