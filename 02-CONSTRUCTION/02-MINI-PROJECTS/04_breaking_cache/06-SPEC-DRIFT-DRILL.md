---
stability: evolutif
scope: 04_breaking_cache
acte: comprendre
cognitive_level: L6
perturbation_modes: [preuve_partielle, transmission]
anti_recipe_key: preuve_partielle+transmission
transfer_distance: medium
assessment_role: project_mastery
review_interval: 6 mois
---

> ### SCÈNE CRAZYDEVS : Breaking Bad
>
> Le système est maintenant ton labo : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# 06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)

Temps de lecture ~2 min

Complement de `05-SPEC-DRIFT-TRIGGERS.md` (statique, liste des declencheurs
intemporels). Ce fichier-ci est **mouvant** : il documente le drift _pendant_
que tu construis 04_breaking_cache.

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

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
