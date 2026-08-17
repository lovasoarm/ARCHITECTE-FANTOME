---
stability: intemporel
acte: appliquer
---

# LOGS CORRÉLÉS : PANNE PARTIELLE (SEED 20260416)

Temps de lecture ~3 min

Extrait produit par `node 02-CONSTRUCTION/02_mini_projects/16_distributed_arena/INCIDENT/01_scenario_panne.js`.
Rejoue-le toi-même : même seed, mêmes ticks, mêmes lignes, à l'octet près.

```
w2-op5 | t=17 | coordinator | ACK opKey=2:5 total=17
w2-op5 | t=18 | worker-2 | ACK perdu (réseau), retry avec opKey identique=2:5
w2-op5 | t=19 | coordinator | DUP rejetée opKey=2:5 (déjà appliquée)
w2-op6 | t=20 | coordinator | ACK opKey=2:6 total=18
```

## Ce que tu dois lire, pas deviner

- `trace-id` (`w2-op5`) est la seule colonne qui relie les trois lignes : sans lui tu vois trois
  événements isolés, avec lui tu vois un incident.
- `t=17` : le coordinateur applique l'opération et incrémente le total. Du point de vue du
  coordinateur, tout est normal.
- `t=18` : le worker 2 ne reçoit jamais l'accusé de réception. Il ne sait pas si son message est
  arrivé. Il retente, avec la même `opKey=2:5`, pas une nouvelle.
- `t=19` : le coordinateur reconnaît l'`opKey` déjà vue et rejette le doublon. Le total ne bouge
  pas une seconde fois.

## L'erreur de diagnostic la plus fréquente

Lire seulement `t=18` ("ACK perdu") et conclure "le réseau a perdu un incrément, le total est
faux de -1". Faux : le worker a retenté, le coordinateur a dédupliqué, le total est correct. Le
symptôme visible côté worker (timeout) n'est pas la cause du problème (il n'y en a pas ici) :
c'est le fonctionnement attendu d'un système at-least-once avec dédup.

Compare cette séquence à ce qui se passerait sans clé d'idempotence stable (uniquement
`Date.now()` par exemple) : la ligne `t=19` deviendrait un second `ACK`, le total afficherait 37
au lieu de 36, et le seul indice serait un chiffre final faux, sans aucune ligne de log qui crie
"bug" explicitement. C'est ça, une panne distribuée : le symptôme est un nombre, la cause est
trois lignes plus haut, sur une autre machine.
