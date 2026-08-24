---
stability: intemporel
acte: pilotage
noyau: oui
type: grimoire
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# Grimoire : fiabilité et SLO

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Temps de lecture ~2 min

À n'ouvrir qu'après les leçons et [07-injection_panne.md](07-injection_panne.md). Deux
analogies par ligne ; la cinquième colonne dit où l'image ment.

| Terme           | Définition                             | Code                  | Analogies                                           | Limite                                 |
| --------------- | -------------------------------------- | --------------------- | --------------------------------------------------- | -------------------------------------- |
| SLI             | Mesure brute d'un comportement vécu    | `ok / total` sur 30 j | un compteur de trains à l'heure / un thermomètre    | Sans fenêtre, ce n'est pas un SLI      |
| SLO             | Objectif chiffré + budget d'erreur     | `99,5 % / 30 j`       | un contrat d'horaire / une batterie avec jauge      | Le % seul ne se défend pas             |
| Budget d'erreur | Requêtes qu'on a le droit de rater     | `0,5 % × volume`      | un crédit de retard / un quota de cartons           | À 0 % tu gèles tout changement         |
| RTO             | Temps de retour au service, **mesuré** | `chrono.lap()`        | un exercice incendie / un change de pneu chrono     | Une cible non drillée est un slogan    |
| RPO             | Données que tu acceptes de perdre      | `backup every 5 min`  | un brouillon non sauvé / une photo toutes les n min | Plus serré = plus cher (S1)            |
| Injection       | Panne **provoquée**, pas racontée      | flag `latency_x10`    | un test de parachute / un disjoncteur qu'on ouvre   | Sans geste, la résilience est du texte |

Le SLO IA et le SLO produit ne se mélangent pas : voir
90_preuve de vérification dans le livrable staff.md.
