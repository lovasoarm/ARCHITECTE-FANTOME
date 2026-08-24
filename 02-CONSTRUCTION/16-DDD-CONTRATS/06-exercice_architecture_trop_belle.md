---
stability: intemporel
acte: construction
noyau: oui
type: exercice
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Exercice : refuser une architecture trop belle

Temps de lecture ~2 min

Durée : 45 min. Rendu écrit obligatoire.

## Le cas

On te propose, sur ton fil rouge : event sourcing complet, un service par contexte borné (six
services), un bus de messages, une base par service, et CQRS avec vues asynchrones.
Le proposant est compétent et sincère. La proposition est _correcte_ dans l'absolu.

## Ce qu'on te demande

Écrire une page `ADR/0xx-refus-architecture.md` qui **refuse**, sans mépris, avec des nombres.

Structure imposée :

1. Ce que la proposition résout réellement (sois honnête, il y a du vrai).
2. Le coût, en trois lignes chiffrées : jours-homme de mise en place, surcoût mensuel d'infrastructure
   (tiré de ton `06A-BUDGET-CLOUD.md`), nombre de nouveaux modes de panne.
3. Le seuil déclencheur : « nous adopterons X quand Y dépassera Z » (une métrique, un nombre, un lieu
   de mesure).
4. Ce que tu fais à la place cette semaine, et le gain attendu.
5. La date de réexamen.

## Critère de réussite

Un lecteur qui n'était pas dans la discussion doit pouvoir dire : « le refus est réversible, il a une
condition de sortie ». Un refus sans seuil déclencheur est un refus idéologique : recale-toi seul.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
