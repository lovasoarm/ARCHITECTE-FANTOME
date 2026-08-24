---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [transmission, changement_contexte]
anti_recipe_key: transmission+changement_contexte
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Drill : spec floue + spec qui dérive (combo)

Temps de lecture ~2 min

> Le monde réel ne t'envoie jamais une spec floue OU une spec qui bouge.
> Il t'envoie les deux en même temps. Ce drill entraîne exactement ça.

Complément à `10-SPEC_DRIFT_DRILL.md` (spec qui bouge seulement) et à
`05-MAITRISE/06-ANNEXES/25_soft_skills/03-spec_drift_vs_flou_statique.md` (typologie).

## Prérequis

- Avoir joué au moins une fois `10-SPEC_DRIFT_DRILL.md`.
- Avoir lu `05-MAITRISE/06-ANNEXES/25_soft_skills/03-spec_drift_vs_flou_statique.md`.

## Setup (5 min)

Choisis un mini-projet que tu n'as jamais fait. Prends la brief la plus
courte possible, ex :

> « Fais-moi un endpoint qui retourne les meilleurs joueurs. »

Voilà. Pas de schéma. Pas de format. Pas de « meilleur selon quoi ».
C'est **flou** au démarrage.

## Boucle de drill (45 min)

À chaque round, un timer déclenche un événement de **drift** en plus du flou
initial. Tu dois continuer à livrer sans jamais tout refactoriser.

| T+min | Événement                                                         | Réaction attendue                                                     |
| ----- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| 0     | Brief flou reçue                                                  | Écris **3 hypothèses** explicites dans un `ASSUMPTIONS.md` avant tout |
| 10    | Drift 1 : « ah, en fait "meilleurs" = plus de buts cette saison » | Marque l'hypothèse #1 comme confirmée. Ne casse rien du reste         |
| 20    | Drift 2 : « il nous faut aussi une pagination »                   | Ajoute sans refactor. Note la dette dans `SPEC_LOG.md`                |
| 30    | Drift 3 : « on veut du JSON, pas du CSV comme tu as compris »     | Change le sérialiseur, garde le reste. Log l'ancienne interprétation  |
| 40    | Freeze : plus rien ne bouge, livre                                | Merge la dette, écris un `08-POSTMORTEM.md` de 10 lignes              |

## Rubrique d'auto-notation (sur 10)

- **/2** : 3 hypothèses écrites AVANT d'avoir commencé à coder
- **/2** : À chaque drift, la spec précédente est **loggée** (pas juste écrasée)
- **/2** : Aucun refactor total : les 3 drifts sont absorbés par extension
- **/2** : `08-POSTMORTEM.md` distingue ce qui était **flou** de ce qui a **dérivé**
- **/2** : Le code final tient : `node --test` passe, aucune règle métier n'a été perdue

Seuil de passage : ≥ 7/10. Sous 7 : rejoue avec un autre mini-projet.

## Anti-pattern à repérer sur toi-même

- Tu as codé avant d'écrire les 3 hypothèses → tu as confondu flou et évident
- Tu as tout refait au 2ᵉ drift → tu paniques quand la spec bouge, à corriger
- Tu n'as pas écrit `08-POSTMORTEM.md` → tu vas rejouer les mêmes erreurs

## Cadence

Rejouable **mensuellement**, avec un mini-projet différent à chaque fois.
Archiver le `08-POSTMORTEM.md` dans `05-MAITRISE/06-ANNEXES/` pour tracer ta progression.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
