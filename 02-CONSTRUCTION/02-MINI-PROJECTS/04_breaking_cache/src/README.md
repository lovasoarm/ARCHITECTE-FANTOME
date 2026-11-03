---
stability: intemporel
acte: pratiquer
---

# `src/` : code à écrire pour 04 BREAKING CACHE

Dépose ici ton implémentation. Aucun code exécutable n'est fourni par le ZIP.

Découpage suggéré :

```text
ttl-cache.js              # get / set / delete / clear, TTL et horloge injectable
stock-summary-service.js  # cache-aside, clé tenant/boutique, invalidation après commit
demo.js                   # scénario local lisible
benchmark.js              # mesure locale, si tu as défini un protocole propre
```

Tu peux changer le découpage si les responsabilités sont mieux séparées. Documente cette décision dans un ADR.

Le contrat de comportement figure dans [le cahier des charges](../00-CAHIER-DES-CHARGES.md). Ne place pas de secret ou de donnée personnelle dans le cache.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

_Aucun fichier source n'est livré. Ajoute tes fichiers ici._

<!-- CONTENU-DOSSIER:fin -->
