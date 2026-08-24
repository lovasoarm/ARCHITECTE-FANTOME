---
stability: stable
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

# Observability contract

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

Chaque run doit pouvoir répondre à six questions :

1. Quelle question ?
2. Quels documents ont été récupérés ?
3. Quel score de retrieval ?
4. Quel mode de génération : fallback, live ou degraded ?
5. Quelle latence ?
6. Pourquoi l'appel a-t-il échoué ou été refusé ?

La même structure doit être reprise dans la preuve S6 de l'apprenant.
