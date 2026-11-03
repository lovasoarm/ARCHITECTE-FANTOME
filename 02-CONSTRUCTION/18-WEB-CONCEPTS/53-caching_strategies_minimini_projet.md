---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Caching strategies : mettre en cache sans mettre en danger

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

## Livraison produit obligatoire : Kintana : Parcours client sous réseau instable

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-caching_strategies_minimini_projet » :** Implémente un morceau du parcours mobile/web de création ou suivi de demande. Ajoute états loading/empty/error, accessibilité clavier et conservation du brouillon quand la connexion disparaît.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Une coupure ne détruit pas la saisie ; une reprise ne crée pas de doublon ; l’état reste compréhensible sur petit écran. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
