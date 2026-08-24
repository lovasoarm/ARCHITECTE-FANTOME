---
stability: intemporel
acte: pratiquer
---

# `src/` : 04_breaking_cache

<!-- AF-DIAGRAM:cache -->

```text
text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```

Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.

Tu déposes ici ton code de ce mini-projet, un fichier par responsabilité.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

_Rien a lister pour l'instant : depose tes fichiers ici._

<!-- CONTENU-DOSSIER:fin -->
