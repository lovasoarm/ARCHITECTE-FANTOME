---
stability: intemporel
acte: évaluer
route: complete
---

**SCÈNE CRAZYDEVS : Naruto :** le contrat d’un jutsu doit préciser ce qui entre, ce qui sort et ce qui se passe si le chakra manque. Une API robuste fait exactement ça.

# Auto-test d'entrée : `20-API-DOJO`

<!-- AF-DIAGRAM:api_request -->

```text
┌────────┐  HTTP   ┌──────────┐  validate  ┌─────────┐
│ Client │────────►│ Gateway  │───────────►│ Handler │
└────────┘         └──────────┘            └────┬────┘
                                                ▼
                                           ┌─────────┐
                                           │ Data    │
                                           └────┬────┘
                                                ▼
                                           Response
```

Le cycle API relie transport, validation, logique métier, persistance et réponse observable.

Temps de lecture ~2 min

Acte attendu : évaluer. Trois minutes, seul, sans ouvrir le module.

Si une seule ligne ci-dessous te fait hésiter, tu ouvres d'abord ce qu'elle nomme. Ouvrir ce
module sans ces acquis coûte la séance : tu apprendrais le prérequis à la place du module.

## Ce que tu dois déjà savoir faire

- Tu as terminé [`19-API-CRAFT`](../../02-CONSTRUCTION/19-API-CRAFT/README.md), module précédent du fil.

## Verdict

- [ ] Toutes les lignes passent → ouvre [`README.md`](README.md).
- [ ] Une ligne ne passe pas → reviens ici quand elle passe. Note la date, pas l'excuse.
