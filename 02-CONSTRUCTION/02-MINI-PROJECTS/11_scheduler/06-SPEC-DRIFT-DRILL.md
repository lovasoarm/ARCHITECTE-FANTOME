---
stability: evolutif
scope: 11_scheduler
acte: comprendre
cognitive_level: L6
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: project_mastery
review_interval: 6 mois
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)

Temps de lecture ~2 min

Complement de `05-SPEC-DRIFT-TRIGGERS.md` (statique, liste des declencheurs
intemporels). Ce fichier-ci est **mouvant** : il documente le drift _pendant_
que tu construis 11_scheduler.

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

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
