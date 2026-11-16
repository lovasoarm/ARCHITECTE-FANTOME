---
stability: intemporel
acte: pratiquer
---

# `src/` : 13_memory_hunter

Tu construis ici les cinq scénarios du projet. Aucun serveur, correctif ou scénario complet n'est fourni dans ce dossier.

## Découpage conseillé

Un fichier par famille de rétention, sans obligation d'utiliser un framework ni de créer un serveur HTTP :

```text
src/
  scenarios/
    01-closure-retention.js
    02-listener-lifecycle.js
    03-timer-lifecycle.js
    04-unbounded-collection.js
    05-weighted-cache.js
```

Les noms sont une proposition d'organisation, pas des fichiers précréés. Chaque scénario doit préciser :

1. la ressource créée et son propriétaire ;
2. l'événement qui termine son cycle de vie ;
3. la référence qui pourrait la retenir ;
4. la méthode de libération ou la limite appliquée ;
5. les observations qui permettent de comparer avant/après.

La fixture `../00_fixture/00_leaky.js` sert d'exemple pour une closure conservée dans un tableau après éviction d'une entrée de Map ; elle ne fournit pas un exemple complet d'`EventEmitter` mal nettoyé. Ne la présente pas comme les cinq scénarios du cahier des charges.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

_Rien à lister pour l'instant : crée tes fichiers de scénario ici._

<!-- CONTENU-DOSSIER:fin -->
