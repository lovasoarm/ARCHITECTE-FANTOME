---
stability: intemporel
acte: comprendre
---

# Fixtures complémentaires : GC et fuites mémoire

Temps de lecture ~4 min

**Périmètre : approfondissement optionnel, distinct de l'exercice principal.**
Pour l'exercice principal de `06-heap_snapshot_hands_on.md`, la fixture canonique est
`02-CONSTRUCTION/02-MINI-PROJECTS/13_memory_hunter/00_fixture/00_leaky.js` : elle
illustre la rétention de buffers via des closures. Les scripts de ce dossier illustrent
un autre mécanisme (cache global non borné et listeners accumulés) et servent à un
approfondissement comparatif, pas à remplacer la fixture principale.

| Script             | Rôle                                                                                                                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01_leak_case.js`  | Reproduit deux fuites classiques (cache non borné + listeners orphelins). Une dérive du RSS peut être observée en corrélation avec les références retenues ; sa forme exacte dépend du runtime et de l'OS. |
| `00_fixed_case.js` | Version corrigée avec cache FIFO borné et listener attaché une seule fois. RSS variable selon runtime et OS.                                                                                               |

## Procédure minimale (5 min)

```bash
# terminal 1 : fuite
node --expose-gc --inspect=127.0.0.1:9229 01_leak_case.js

# terminal 2 : version saine (comparaison)
node --expose-gc 00_fixed_case.js
```

Laisse tourner 60 secondes chacun. Compare les colonnes `rss=` et `cache=` :

- `01_leak_case.js` : on doit observer une tendance à la hausse du cache et des listeners, avec une hausse de RSS corrélée sur la machine d'essai. Les valeurs exactes de RSS sont indicatives, pas des critères binaires.
- `00_fixed_case.js` : on doit observer un cache plafonné et des listeners stabilisés ; la variation de RSS dépend de l'OS, du runtime et de l'allocateur.

## Snapshots à comparer dans Chrome DevTools

1. Ouvre `chrome://inspect`, clique sur le process de `01_leak_case.js`.
2. Onglet **Memory** → **Take heap snapshot** à `t=10s` (snapshot 1).
3. Attends 50 s. Refais un snapshot à `t=60s` (snapshot 2).
4. Vue **Comparison** entre 1 et 2 : le top delta doit contenir des `(string)`
   et des `Object` retenus par la `Map` globale, et des `Function` de nom
   `leakyListener` proportionnels au nombre de ticks.

## Questions de contrôle

1. **Pourquoi `heap` seul ne suffit-il pas à voir la fuite ?** Parce que `heap`
   ne compte que la mémoire JS ; les buffers natifs et le RSS englobent tout.
2. **Le GC forcé (`global.gc()`) libère-t-il la fuite ?** Non : les objets sont
   toujours atteignables via `cache` et via les closures des listeners. Le GC
   ne peut rien pour des références vivantes.

Réponses attendues consignées : `CHECK_ANSWERS.md` (à créer par
l'apprenant après avoir fait l'exercice, pas avant).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [`00_fixed_case.js`](00_fixed_case.js)
- [`01_leak_case.js`](01_leak_case.js)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
