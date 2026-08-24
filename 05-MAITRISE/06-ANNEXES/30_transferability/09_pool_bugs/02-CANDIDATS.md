---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [decision_inversee, solution_concurrente]
anti_recipe_key: decision_inversee+solution_concurrente
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Pool de bugs : candidats calibrés

Temps de lecture ~2 min

Trois dépôts par langage, sélectionnés pour être :

- ni triviaux (pas un à 3 fichiers),
- ni gigantesques (< 20k lignes de code utile),
- riches en bugs historiques bien documentés (issues fermées, PR de fix).

## Python

1. `httpx` : client HTTP asyncio. Chercher issues label `bug` closed.
2. `sanic` : framework asyncio. Bugs de concurrence documentés.
3. Un projet perso à toi > 6 mois d'existence (le meilleur choix).

## Rust

1. `serde_json` : parsing, edge cases numériques.
2. `tokio` (exemples) : concurrence, cancellation.
3. Un starter Rust que tu casses volontairement (voir `CHAOS_INSTRUCTIONS.md`).

## Règle d'or

Tu ne cherches pas un bug ouvert non résolu. Tu prends un bug **déjà corrigé**, tu
`git checkout` sur le commit d'AVANT le fix, et tu essaies de le retrouver seul.
Puis tu compares ton diagnostic au fix officiel. C'est la seule façon d'avoir un
oracle honnête sur ta perf.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
