---
stability: evolutif
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Garo :** ton écran ne « sait » rien par magie. Il reçoit un état, rend une représentation et doit survivre quand l’état change sous ses pieds.

# Flutter : modèle mental avant widgets

Apprends les concepts durables avant les APIs :

- arbre de widgets ;
- état durable vs état éphémère ;
- frontières UI / application / domaine ;
- flux d’événements ;
- cycle de reconstruction ;
- gestion explicite des erreurs.

## Exercice

Prends un écran complexe du fil rouge. Interdis-toi de modifier le code pendant 15 minutes. Cartographie : événements entrants, état, décisions, appels réseau et sorties visibles.

### Question Staff

> Quel morceau de logique survivrait intact si demain Flutter disparaissait ?

La réponse doit pointer vers le modèle métier ou le contrat, jamais vers un widget.
