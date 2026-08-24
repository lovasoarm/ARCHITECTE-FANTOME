---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, constraints_injectees]
anti_recipe_key: preuve_partielle+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Codes de statut, en-têtes, méthodes : ton portfolio consomme une API et sert lui-même des réponses HTTP (200, 404, 304).

## APPLICATION

- Ouvre l'onglet réseau sur ton site local et note les statuts de trois requêtes différentes.
- Vérifie qu'une URL de projet inexistante renvoie bien un 404 HTTP, pas un 200 avec un message.
- Corrige si ce n'est pas le cas.

## Critère de réussite

- [ ] Ouvre l'onglet réseau sur ton site local et note les statuts de trois requêtes différentes.
- [ ] Vérifie qu'une URL de projet inexistante renvoie bien un 404 HTTP, pas un 200 avec un message.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un 200 affichant « page introuvable » est-il un vrai problème, au-delà de l'esthétique ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes statuts HTTP disent la vérité.

Moteurs de recherche et outils de monitoring comprennent enfin ton site. Commit.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
