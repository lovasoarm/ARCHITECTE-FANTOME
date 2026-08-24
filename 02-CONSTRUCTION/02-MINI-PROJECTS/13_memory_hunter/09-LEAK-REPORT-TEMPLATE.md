---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# LEAK_REPORT : <nom du service ou fixture>

Temps de lecture ~2 min

Date : YYYY-MM-DD
Investigateur : <toi>
Durée totale enquête : XX min

## 1) Symptôme observé

- Métrique qui alerte : rss / heapUsed / event loop lag / autre
- Courbe (6 points minimum) :

```text
t=10s rss=___MB  heap=___MB
t=20s rss=___MB  heap=___MB
t=30s rss=___MB  heap=___MB
t=40s rss=___MB  heap=___MB
t=50s rss=___MB  heap=___MB
t=60s rss=___MB  heap=___MB
```

## 2) Hypothèse initiale (AVANT le snapshot)

Une phrase. Pas plus. Écrite avant d'ouvrir DevTools.

## 3) Protocole d'investigation

- [ ] `--expose-gc` activé
- [ ] Snapshot A pris à t=\_\_\_
- [ ] Snapshot B pris à t=\_\_\_ après gc()
- [ ] Comparison filtrée par Delta décroissant

## 4) Top 3 retainers

| Rang | Objet | # Delta | Size Delta | Retainer path (résumé) |
| ---- | ----- | ------- | ---------- | ---------------------- |
| 1    |       |         |            |                        |
| 2    |       |         |            |                        |
| 3    |       |         |            |                        |

## 5) Cause racine

Une phrase. Pointe la ligne coupable (fichier:ligne).

## 6) Fix appliqué

```diff
- ligne d'origine
+ ligne corrigée
```

## 7) Preuve du fix

Courbe rss APRÈS fix, mêmes 6 points :

```text
t=10s rss=___MB
...
```

Delta rss(fixed, t=60s) - rss(leaky, t=60s) = \_\_\_ MB.

## 8) Ce que j'ai appris (ne pas sauter)

3 lignes. Ce que tu ne referas plus jamais.
