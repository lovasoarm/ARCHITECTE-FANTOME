---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## Prérequis

- Connaître la frontière Server / Client de l'App Router Next.js

## CONTEXTE

Le cache décide de la fraîcheur et de la vitesse. Dans l'App Router, le choix statique / revalidé / dynamique se fait route par route.

## APPLICATION

- Rends la page d'accueil statique et la donnée GitHub revalidée à intervalle (par ex. une heure).
- Vérifie dans la sortie du build quelles routes sont statiques.
- Pour chaque donnée du portfolio, note dans `docs/caching.md` : fréquence de changement, coût de récupération, fraîcheur nécessaire, stratégie choisie.

## Critère de réussite

- [ ] Rends la page d'accueil statique et la donnée GitHub revalidée à intervalle (par ex. une heure).
- [ ] Vérifie dans la sortie du build quelles routes sont statiques.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle donnée de ton site mérite d'être revalidée, et laquelle ne changera jamais ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : chaque route a sa stratégie de fraîcheur.

Ton site privilégie une stratégie de rendu et de cache adaptée à la fréquence de changement de chaque donnée. Commit.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
