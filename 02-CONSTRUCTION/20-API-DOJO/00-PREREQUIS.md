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

Le parcours recommandé suit `19-API-CRAFT`. Ce diagnostic prépare les exercices de contrat ; il ne ferme pas la lecture. Si HTTP ou le contrat API est nouveau, révise la ressource précédente avant le premier exercice noté.

## Ce que tu dois déjà savoir faire

- Tu as terminé [`19-API-CRAFT`](../../02-CONSTRUCTION/19-API-CRAFT/README.md), module immédiatement précédent du fil.
- Tu as déjà livré au moins une API HTTP exécutable : au minimum une route de lecture et une route d'écriture, validation d'entrée, codes HTTP et preuve par tests ou démonstration reproductible. Une simple lecture de tutoriel ne compte pas.
- Tu sais expliquer les frontières UI / cas d'usage / domaine / infrastructure vues dans [`15-ARCHI-LAB`](../15-ARCHI-LAB/README.md), et tu as réalisé son challenge. Le module 19 réutilise cette compétence ; il ne remplace pas la preuve pratique d'une API.

## Verdict

- [ ] Les trois conditions sont démontrées → ouvre [`README.md`](README.md).
- [ ] Une condition manque → retourne au module ou au projet indiqué. Note la preuve précise qui manque et la date de nouvelle vérification.
