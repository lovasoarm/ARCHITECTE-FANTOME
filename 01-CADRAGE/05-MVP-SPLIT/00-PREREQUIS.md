---
stability: intemporel
acte: évaluer
route: survie
---

**SCÈNE CRAZYDEVS : Prison Break :** le plan semble simple jusqu’à ce qu’une porte soit fermée, qu’un garde change de ronde et qu’une information manque. C’est exactement là que le cadrage commence.

# Auto-test d'entrée : `05-MVP-SPLIT`

<!-- AF-DIAGRAM:mvp -->

```text
Problem
  │
  ▼
Must prove
  │
  ├────► CORE MVP
  │
  └────► Defer / remove
             │
             ▼
          measure
```

Le MVP choisit la plus petite tranche capable de tester l’hypothèse importante et de produire une mesure.

Temps de lecture ~2 min

Acte attendu : évaluer. Trois minutes, seul, sans ouvrir le module.

Les deux modules cités apportent des repères utiles, mais cette auto-évaluation n’est pas une autorisation d’entrée. Tu peux lire MVP Split même si tu dois encore consolider un point ; reporte seulement les décisions qui exigent une réponse que tu ne sais pas encore défendre.

## Ce que tu dois déjà savoir faire

- Tu as terminé [`04-ERROR-HANDLING`](../../01-CADRAGE/04-ERROR-HANDLING/README.md),
  le précédent immédiat dans le bloc.
- Tu as terminé [`01-PROBLEM-HUNT`](../../01-CADRAGE/01-PROBLEM-HUNT/README.md) et tu
  sais formuler le besoin, les acteurs, les non-objectifs et une métrique de succès.

## Vérification

1. Peux-tu distinguer une erreur métier attendue d'une panne technique ?
2. Peux-tu nommer le besoin utilisateur, un non-objectif et une mesure de succès de ton
   problème cadré ?

## Verdict

- **Les deux réponses sont solides** → ouvre [`README.md`](README.md) et passe au challenge lorsque tu es prêt.
- **Une réponse manque ou un module amont n’est pas terminé** → tu peux commencer la lecture ; reprends `04-ERROR-HANDLING` pour les erreurs et `01-PROBLEM-HUNT` pour le besoin, les non-objectifs et la métrique avant de valider ton découpage. Le diagnostic ne bloque pas l’accès.
