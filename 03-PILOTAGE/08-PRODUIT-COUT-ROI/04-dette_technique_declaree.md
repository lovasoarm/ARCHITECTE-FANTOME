---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [solution_concurrente, temps_limite]
anti_recipe_key: solution_concurrente+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# La dette technique déclarée

Temps de lecture ~8 min

## 1) DETTE CHOISIE, DETTE SUBIE

Choisie : « on livre sans cache, on sait que ça tiendra jusqu'à 500 utilisateurs, on ajoute le cache
avant. » Datée, chiffrée, assumée. C'est un outil.
Subie : personne ne sait pourquoi c'est comme ça. C'est une panne en attente.

## 2) LE REGISTRE (un fichier, jamais un canal de discussion)

`DETTE.md`, une ligne par dette :

| ID   | Ce qui est emprunté     | Intérêt mensuel     | Déclencheur de remboursement | Date limite | Porteur |
| ---- | ----------------------- | ------------------- | ---------------------------- | ----------- | ------- |
| D-01 | pas de cache sur le fil | 3 h/mois de support | > 500 utilisateurs actifs    | 2026-11-30  | toi     |

**L'intérêt mensuel est obligatoire.** Une dette sans intérêt chiffré n'est pas une dette, c'est un
avis esthétique.

## 3) LE DÉCLENCHEUR EST UNE MÉTRIQUE, PAS UNE HUMEUR

« Quand on aura le temps » n'existe pas. « Quand p95 dépasse 1,2 s deux semaines de suite » existe.

## 4) COMMENT EN PARLER À CELUI QUI PAIE

Trois phrases : ce qu'on a gagné en empruntant, ce que ça coûte chaque mois, la date à laquelle ça
devient plus cher que le remboursement. Aucun jargon.

## Exercice (25 min)

Écris `DETTE.md` avec au moins trois lignes réelles de ton fil rouge, dont une que tu déclares
**volontaire** et une que tu déclares subie.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
