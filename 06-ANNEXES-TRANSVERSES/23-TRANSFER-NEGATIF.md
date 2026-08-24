---
stability: intemporel
acte: pratique
noyau: oui
route_family: transfer
---

# 23 : TRANSFERT NÉGATIF

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

## But

Le transfert le plus difficile n'est pas « refaire pareil dans une autre stack ». C'est reconnaître qu'une règle correcte dans un contexte devient mauvaise dans un autre.

## Drill

Pour chaque grande pratique CORE, construire une paire :

```text
CONTEXTE A
bonne pratique
↓
CONTEXTE B
même objectif
nouvelle contrainte
↓
la pratique devient insuffisante ou dangereuse
```

## Exemples de familles

- cache ;
- retries ;
- transactions ;
- microservices ;
- CQRS ;
- feature flags ;
- async ;
- abstraction ;
- chiffrement ;
- autonomie d'agent IA.

## Questions obligatoires

1. Quelle règle était vraie ?
2. Pourquoi était-elle vraie ?
3. Quelle hypothèse change ?
4. Quel nouveau risque apparaît ?
5. Quelle décision prendrais-tu maintenant ?
6. Quelle observation te ferait revenir à la première décision ?

## Gate

Une explication qui cite seulement « cela dépend » ne valide pas le drill. Le dépend de quoi doit être explicite.
