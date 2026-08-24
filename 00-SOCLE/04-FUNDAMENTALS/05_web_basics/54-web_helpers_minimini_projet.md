---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, defaut_cache]
anti_recipe_key: fausse_piste+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Fondamental

## CONTEXTE

Les API natives du navigateur (IntersectionObserver, matchMedia, clipboard) remplacent des dépendances entières. Un portfolio léger doit s'appuyer dessus.

## OBJECTIF

Ton site respecte les préférences système.

## APPLICATION

- Écris un hook `usePrefersReducedMotion` basé sur `matchMedia`.
- Utilise-le pour désactiver l'animation d'entrée des cartes.
- Ajoute un bouton « copier mon email » utilisant l'API clipboard, avec un retour visuel.

## Critère de réussite

- [ ] Écris un hook `usePrefersReducedMotion` basé sur `matchMedia`.
- [ ] Utilise-le pour désactiver l'animation d'entrée des cartes.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel bénéfice concret un visiteur tire-t-il de `prefers-reduced-motion` respecté ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton site respecte les préférences système.

Deux fonctionnalités réelles, zéro dépendance ajoutée. Commit ces hooks.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
