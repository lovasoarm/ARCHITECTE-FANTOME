---
stability: evolutif
scope: 08_trapsoul_radio
acte: comprendre
cognitive_level: L5
perturbation_modes: [changement_echelle, transmission]
anti_recipe_key: changement_echelle+transmission
transfer_distance: low
assessment_role: project_mastery
review_interval: 6 mois
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)

Temps de lecture ~2 min

Complement de `05-SPEC-DRIFT-TRIGGERS.md` (statique, liste des declencheurs
intemporels). Ce fichier-ci est **mouvant** : il documente le drift _pendant_
que tu construis 08_trapsoul_radio.

## Regle

Chaque fois qu'un choix du `00-CAHIER-DES-CHARGES.md` bouge en cours de route,
tu ajoutes une ligne ici. C'est la trace vivante que la specification n'est
pas gravee, elle respire.

## Format d'entree

| Date       | Ce qui a bouge                         | Trigger declencheur (voir 05-SPEC-DRIFT-TRIGGERS.md) | Decision prise                        | ADR lie |
| ---------- | -------------------------------------- | ---------------------------------------------------- | ------------------------------------- | ------- |
| 2026-MM-JJ | Exemple : format de sortie CSV -> JSON | T3 : besoin utilisateur precise                      | Adopte JSON, back-compat CSV via flag | ADR/003 |

## Rappel

- Statique = `05-SPEC-DRIFT-TRIGGERS.md` (les triggers eux-memes, jamais reecrits).
- Mouvant = ce fichier (les **occurrences** de drift, alimente en continu).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?
