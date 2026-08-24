---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, defaut_cache]
anti_recipe_key: preuve_partielle+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

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

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
