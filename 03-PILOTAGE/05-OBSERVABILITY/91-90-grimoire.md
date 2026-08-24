---
stability: intemporel
acte: restituer
route: survie
---

**SCÈNE CRAZYDEVS : Naruto :** tu vois l’explosion finale, mais pas la seconde où le jutsu a commencé à dériver. Les traces corrélées servent à retrouver ce moment précis.

# Grimoire : `05-OBSERVABILITY`

<!-- AF-DIAGRAM:observability -->

```text
text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Temps de lecture ~2 min

Acte attendu : restituer. Un grimoire ne s'apprend pas en le lisant : il se récite, puis se
vérifie. Deux analogies au maximum par terme, suivies de leur limite.

## Les grimoires de ce module

- [Page verrouillée](90-grimoire.md)

Chaque grimoire porte les mêmes cinq colonnes : Terme, Définition, Code, Analogies, Limite.
Tu ne recopies pas : tu restitues de mémoire, puis tu vérifies.
