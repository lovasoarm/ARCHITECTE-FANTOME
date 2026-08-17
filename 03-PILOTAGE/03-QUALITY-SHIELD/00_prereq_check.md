---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : quality shield
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre **oui, sans regarder**
> aux cinq affirmations ci-dessous. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Module amont de référence : `02-CONSTRUCTION/03_testing`.

Ce module est la mise en pratique, sur le fil rouge, de trois references situees ailleurs : les tests (`02-CONSTRUCTION/03_testing`), l'observabilite (`03-PILOTAGE/05_observability`) et les incidents. La regle de hierarchie du depot s'applique : le module est la reference, ce niveau est l'application.

## Les cinq affirmations (oui / non, rien entre les deux)

| # | Affirmation | Le fichier amont qui la fournit |
| --- | --- | --- |
| 1 | Je sais dire quels tests paient sur mon projet et lesquels sont du decor, avec un argument de cout. | [09_test_strategy_not_framework.md](../../02-CONSTRUCTION/03_testing/09_test_strategy_not_framework.md) |
| 2 | Je sais ecrire un test qui echoue d'abord, puis le faire passer. | [05_tdd_arena.md](../../02-CONSTRUCTION/03_testing/05_tdd_arena.md) |
| 3 | Je sais ce qu'un log structure contient de plus qu'un `console.log`. | [01_structured_logging.md](../05_observability/01_structured_logging.md) |
| 4 | Je sais lire une trace distribuee et y trouver l'etape qui coute le plus de temps. | [02_distributed_tracing.md](../05_observability/02_distributed_tracing.md) |
| 5 | Mon fil rouge a une chaine d'integration qui refuse au moins une chose, et je sais laquelle. | [README.md](../../02-CONSTRUCTION/03_testing/README.md) |

## Consigne d'arrêt

**Deux non = tu reviens en arrière avant d'ouvrir ce module.** Deux non = tu reviens dans `02-CONSTRUCTION/03_testing`, ou dans `03-PILOTAGE/05_observability` si les deux non portent sur l'observabilite.

Un « oui » qui a besoin d'ouvrir le fichier pour être prononcé est un non. Se sentir prêt
n'est pas être prêt : les cinq affirmations tranchent, et elles se cochent en trois minutes.

## Verdict

- **5 oui** → tu entres.
- **4 oui** → tu entres, mais tu relis d'abord le fichier amont du non.
- **3 oui ou moins** → retour au module amont, grimoire compris.
