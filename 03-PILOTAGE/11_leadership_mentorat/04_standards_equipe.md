# 04 : UN STANDARD SANS AUTOMATISATION EST UN VŒU

Temps de lecture ~9 min

Une règle qui repose sur la vigilance humaine tient trois semaines. Une règle vérifiée par un outil tient des années, y compris la nuit d'un déploiement en urgence.

## 1. LES TROIS QUESTIONS AVANT D'IMPOSER UN STANDARD

1. **Qui l'a demandé ?** Un standard sans demandeur est une préférence personnelle industrialisée.
2. **Qu'est-ce qu'il fait gagner, mesurablement ?** Temps de revue, incidents évités, délai d'intégration d'un nouvel arrivant.
3. **Quel outil le vérifie sans réunion ?** Sans réponse à cette question, ne l'impose pas.

```
règle dans un wiki   --> oubliée au premier rush
règle en CI          --> tenue même à 2 h du matin
```

## 2. LES QUATRE NIVEAUX D'APPLICATION

| Niveau | Mécanisme | Quand |
| --- | --- | --- |
| Suggéré | documenté, non vérifié | idée en essai |
| Averti | l'outil signale sans bloquer | période de transition |
| Bloquant | l'intégration continue refuse | règle stabilisée |
| Structurel | impossible d'écrire le code fautif | le meilleur niveau, quand il existe |

Un standard passe de suggéré à bloquant, jamais l'inverse sans décision écrite. Et on ne rend bloquant que ce dont on a mesuré le gain.

## 3. LE COÛT D'UN STANDARD

Chaque règle bloquante coûte : faux positifs, temps d'attente, contournements. Une règle dont le taux de contournement dépasse 10% est une règle à corriger ou à supprimer, pas à défendre.

Risque réel : la collection de standards héritée, que personne n'ose supprimer et que tout le monde contourne. Elle apprend surtout à l'équipe que les règles se contournent.

## 4. EXERCICE

**Le standard défendable (20 min).** Choisis une règle que tu voudrais imposer sur ton fil rouge. Réponds aux trois questions de la section 1, choisis son niveau, et écris la commande exacte qui la vérifie.

## RÉSUMÉ

Un standard a un demandeur, un gain mesurable et un outil qui le vérifie. Il monte progressivement de suggéré à bloquant. Un taux de contournement élevé est un défaut de la règle, pas de l'équipe.

## ET APRÈS

[05_expliquer_trois_publics.md](05_expliquer_trois_publics.md).

## ET APRÈS

Le même standard, appliqué à un exécutant qui ne dort jamais : [07_standards_pour_agents.md](07_standards_pour_agents.md).
