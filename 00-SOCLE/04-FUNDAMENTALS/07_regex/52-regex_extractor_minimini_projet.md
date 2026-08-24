---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: low
assessment_role: diagnostic_mastery
---

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

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.
