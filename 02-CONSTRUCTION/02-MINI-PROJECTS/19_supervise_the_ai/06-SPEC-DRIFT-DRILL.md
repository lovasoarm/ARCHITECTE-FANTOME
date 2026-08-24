---
stability: evolutif
scope: 19_supervise_the_ai
cognitive_level: L6
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: medium
assessment_role: project_mastery
review_interval: 6 mois
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)

Complement de `05-SPEC-DRIFT-TRIGGERS.md` (statique, liste des declencheurs
intemporels). Ce fichier-ci est **mouvant** : il documente le drift _pendant_
que tu construis 19_supervise_the_ai.

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

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
