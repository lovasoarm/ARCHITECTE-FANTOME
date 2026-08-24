---
stability: intemporel
acte: pilotage
---

**SCÈNE CRAZYDEVS : Attack on Titan :** un mur n’est pas fiable parce qu’il n’est jamais tombé. Il est fiable parce que tu sais combien de temps il protège, comment tu détectes sa rupture et comment tu récupères.

# Prereq check : fiabilité / SLO

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Temps de lecture ~2 min

Sans regarder. Tu sors de `05-OBSERVABILITY`.

1. Cite les quatre golden signals.
2. Pourquoi un P99 peut être rouge quand la moyenne est verte ?
3. Qu'est-ce qu'un `traceId` change dans un diagnostic ?

**3/3** → entre. **Moins** → [90-grimoire.md](../05-OBSERVABILITY/90-grimoire.md).
