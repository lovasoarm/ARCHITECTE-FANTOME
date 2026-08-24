---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, constraints_injectees]
anti_recipe_key: solution_concurrente+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Décorer, c'est ajouter un comportement sans modifier l'existant : un cache ou un chronomètre autour de ton fetch GitHub.

## OBJECTIF

Ton appel réseau est instrumenté.

## APPLICATION

- Écris `withLogging(fn)` qui enveloppe une fonction asynchrone et journalise durée et issue.
- Applique-la à ton appel GitHub sans toucher à son code.
- Retire le décorateur et vérifie que tout fonctionne encore.

## Critère de réussite

- [ ] Écris `withLogging(fn)` qui enveloppe une fonction asynchrone et journalise durée et issue.
- [ ] Applique-la à ton appel GitHub sans toucher à son code.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un décorateur est-il préférable à un `console.log` ajouté dans la fonction ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton appel réseau est instrumenté.

Tu peux mesurer sans polluer la logique métier. Commit ce helper.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
