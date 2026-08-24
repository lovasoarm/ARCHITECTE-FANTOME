---
stability: evolutif
acte: pilotage
noyau: renfort
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Drill 2 : le chiffrage à froid, en 20 minutes

Temps de lecture ~2 min

Exercice de répétition. À rejouer une fois par mois, sans notes.

## Consigne

On te donne un système inconnu en trois lignes. Tu produis, en 20 minutes, chronomètre visible :

1. L'action représentative choisie et pourquoi.
2. Les six postes, avec l'unité facturée de chacun.
3. La facture d'ordre de grandeur à 10 000 utilisateurs.
4. Le poste qui explosera en premier à 1 000 000, et le levier associé.

## Le système du jour

« Une application de partage de photos entre amis : envoi d'images (2 Mo en moyenne), fil
d'actualité, notifications par courriel, conservation illimitée. »

## Correction attendue (à ne lire qu'après)

Le poste dominant n'est ni le stockage ni le calcul : c'est **l'egress** des images consultées, sauf
si un CDN et des vignettes existent. Deuxième poste : le stockage, à cause de la conservation
illimitée : la rétention est ici une décision produit, pas technique.

## Critère

Réussi si l'egress apparaît dans les deux premiers postes et si l'unité facturée est nommée pour
chaque ligne.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
