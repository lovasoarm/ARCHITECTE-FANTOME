---
stability: intemporel
acte: évaluer
route: survie
---

**SCÈNE CRAZYDEVS : Prison Break :** le plan semble simple jusqu’à ce qu’une porte soit fermée, qu’un garde change de ronde et qu’une information manque. C’est exactement là que le cadrage commence.

# Auto-test d'entrée : `05-MVP-SPLIT`

<!-- AF-DIAGRAM:mvp -->

```text
text
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

Si une seule ligne ci-dessous te fait hésiter, tu ouvres d'abord ce qu'elle nomme. Ouvrir ce
module sans ces acquis coûte la séance : tu apprendrais le prérequis à la place du module.

## Ce que tu dois déjà savoir faire

- Tu as terminé [`04-ERROR-HANDLING`](../../01-CADRAGE/04-ERROR-HANDLING/README.md), module précédent du fil.

## Verdict

- [ ] Toutes les lignes passent → ouvre [`README.md`](README.md).
- [ ] Une ligne ne passe pas → reviens ici quand elle passe. Note la date, pas l'excuse.
