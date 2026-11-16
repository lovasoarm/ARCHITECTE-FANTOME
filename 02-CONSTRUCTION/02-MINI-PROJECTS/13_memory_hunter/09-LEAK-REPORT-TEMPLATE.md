---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : prolongation au stade :** deux solutions ont l'air équivalentes jusqu'à ce que l'une épuise l'équipe au bout de 90 minutes. La mémoire et la performance se voient souvent dans la durée, pas dans la première démo.

# LEAK_REPORT : <nom du scénario ou de la fixture>

Temps de lecture ~2 min

Date : YYYY-MM-DD  
Investigateur : <toi>  
Durée totale enquête : XX min  
Version Node / OS : <valeurs réellement observées>

## 1) Symptôme observé

- Ressource ou métrique qui alerte : objet retenu / listeners / timers / cache / heapUsed / external / arrayBuffers / rss / autre
- Protocole : warm-up, nombre d'itérations, séquence, délai avant snapshot, options GC réellement utilisées.
- Mesures (mêmes conditions à chaque passage) :

| Point | `heapUsed` | `external` | `arrayBuffers` | `rss` | Compteur propre au scénario |
|---|---:|---:|---:|---:|---:|
| Baseline après warm-up | | | | | |
| Série 1 | | | | | |
| Série 2 | | | | | |
| Série 3 | | | | | |

Les valeurs RSS dépendent notamment du runtime et de l'environnement ; elles sont un signal de contexte, pas un seuil universel de réussite. `arrayBuffers` est déjà inclus dans `external` : ne les additionne pas.

## 2) Hypothèse initiale (AVANT le snapshot)

Une phrase. Pas plus. Écrite avant d'ouvrir DevTools.

## 3) Protocole d'investigation

- [ ] Version Node et environnement consignés
- [ ] Warm-up et charge bornée décrits
- [ ] Snapshot A pris à t=___
- [ ] Snapshot B pris à t=___ dans les mêmes conditions
- [ ] Différence de retainers examinée
- [ ] Limites de l'observation décrites

## 4) Top 3 retainers

| Rang | Objet | Delta observé | Retainer path (résumé) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 5) Cause racine

Une phrase. Pointe la ligne coupable (fichier:ligne) et explique quelle référence garde l'objet accessible.

## 6) Fix appliqué

```diff
- ligne d'origine
+ ligne corrigée
```

## 7) Preuve du fix et non-régression

- Même protocole relancé :
- Invariant de cycle de vie vérifié :
- Test fonctionnel conservé :
- Observation après correction :
- Limite ou incertitude restante :

Ne déclare pas une absence universelle de fuite à partir d'un seul chiffre ou d'une seule exécution.

## 8) Ce que j'ai appris (ne pas sauter)

3 lignes. Ce que tu ne referas plus jamais.
