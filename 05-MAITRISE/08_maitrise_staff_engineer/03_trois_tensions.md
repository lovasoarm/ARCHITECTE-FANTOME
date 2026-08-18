---
stability: intemporel
acte: maitrise
noyau: oui
---

# LES TROIS TENSIONS : LA SEULE PREUVE DE CROISEMENT

Durée : 1 h 30.

Six familles prouvées séparément ne prouvent rien. Ce qui distingue le niveau visé, c'est de tenir
deux exigences qui se contredisent, et d'arbitrer par un nombre.

## Ce qu'est une tension recevable

Une contradiction **réelle et chiffrée des deux côtés**, entre deux familles différentes.

```txt
Tension 1 (S1 x S3) — la haute disponibilité de la base coûte +58 €/mois (S1).
Sans elle, le RTO mesuré passe de 6 min à 41 min, hors SLO promis (S3).
Arbitrage : sauvegarde restaurable en 12 min + SLO abaissé à 99,3 %, réexamen à 2 000 utilisateurs.
Ce que je perds : deux heures de service par an dans le pire cas. Assumé, écrit, daté.
```

## Les trois tensions imposées (une par ligne)

| Tension | Familles | Question forcée |
| --- | --- | --- |
| 1 | S1 x S3 | ta promesse de service est-elle finançable ? |
| 2 | S4 x S2 | l'architecture choisie est-elle rentable, ou seulement élégante ? |
| 3 | S5 x S6 | ce que l'agent décide seul est-il compatible avec ce que tu promets aux humains ? |

## La structure d'une tension écrite (5 lignes, jamais plus)

1. Le fait A, chiffré, avec sa source.
2. Le fait B, chiffré, avec sa source, qui contredit A.
3. L'arbitrage retenu, en une phrase.
4. Ce que tu perds, nommé.
5. Le seuil et la date de réexamen.

## Auto-recalage

Si une de tes tensions se résout sans rien perdre, ce n'était pas une tension : c'était un malentendu.
Recommence avec un vrai conflit — il y en a toujours trois dans un système réel.
