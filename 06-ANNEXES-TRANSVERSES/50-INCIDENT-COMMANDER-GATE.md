---
stability: stable
type: gate
---

# 50 - INCIDENT COMMANDER GATE

Un incident est une décision sous information incomplète et pression.

## Perturbations possibles

```text
latence
erreurs
saturation
dépendance indisponible
queue bloquée
permission refusée
hausse de coût
```

## Chronologie

```text
T+00 signal
T+05 triage
T+10 hypothèse
T+15 première décision
T+30 nouvelle observation
T+45 révision
T+60 containment (limitation de l'impact)
T+90 recovery (retour à un état acceptable)
T+120 postmortem outline
```

## Mesures

```text
MTTA = temps jusqu'au premier traitement
MTTR = temps jusqu'au rétablissement acceptable
blast radius = étendue de l'impact
decision latency = délai entre nouvelle information et décision
```

Tout timestamp doit être réel dans la simulation.
Ne pas réécrire l'historique après coup.
