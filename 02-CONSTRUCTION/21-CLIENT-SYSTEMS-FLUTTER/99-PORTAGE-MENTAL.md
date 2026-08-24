---
stability: intemporel
acte: transférer
---

> **SCÈNE CRAZYDEVS : Multivers :** tu changes de framework, pas de cerveau. Si ton modèle disparaît avec le widget, ce n’était pas encore un modèle.

# Portage mental

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

Porte :

- état UI → état observable ailleurs ;
- cache local → cache distribué ;
- retry client → retry serveur ;
- contrat mobile → contrat service ;
- observabilité client → trace distribuée.

Écris ce qui reste invariant et ce qui doit être repensé.
