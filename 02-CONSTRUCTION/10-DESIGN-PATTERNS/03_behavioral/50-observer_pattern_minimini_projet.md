---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_inversee, preuve_partielle]
anti_recipe_key: decision_inversee+preuve_partielle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Observer = s'abonner à un événement. `IntersectionObserver` anime les rangées à l'apparition, sans écouter le scroll en continu.

## OBJECTIF

Tes rangées s'animent à l'apparition.

## APPLICATION

- Écris un hook `useInView` basé sur `IntersectionObserver`.
- Utilise-le pour faire apparaître les rangées en fondu au défilement.
- Désabonne-toi proprement au démontage et respecte `prefers-reduced-motion`.

## Critère de réussite

- [ ] Écris un hook `useInView` basé sur `IntersectionObserver`.
- [ ] Utilise-le pour faire apparaître les rangées en fondu au défilement.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un observer est-il préférable à un écouteur de scroll pour cet effet ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes rangées s'animent à l'apparition.

L'effet de défilement Netflix est en place, performant et accessible. Montre-le à quelqu'un en 2 minutes.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
