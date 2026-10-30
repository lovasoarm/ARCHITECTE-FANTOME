---
stability: evolutif
acte: diagnostiquer
---


> **SCÈNE CRAZYDEVS : Dragon Ball Z :** si ton écran met trois secondes à charger, ce n’est pas « juste un peu lent ». Il y a un combat quelque part. Mesure lequel.

# Observabilité et performance client : mesurer ce que l'utilisateur subit

## 1. Définition

L'**observabilité** est la capacité à déduire l'état interne d'un système à partir de signaux produits pendant son fonctionnement. Côté client, elle combine logs structurés, métriques, traces de parcours, erreurs et mesures de performance. Une mesure utile doit aider à localiser un problème sans exposer des données privées.

## 2. Ce qu'il faut mesurer

- démarrage à froid et retour au premier écran utile ;
- latence perçue d'une action (tap → résultat) ;
- taux d'échec API par route et version d'application ;
- crash et erreurs non fatales ;
- taille de file offline, âge de l'opération la plus ancienne, taux de conflit ;
- consommation mémoire et fluidité des listes/animations ;
- taux de réussite des flux métier critiques.

Les mesures doivent être segmentées de manière utile (version, type d'appareil, réseau, région), sans collecter plus d'identifiants ou de données personnelles que nécessaire. Éviter d'envoyer contenu de messages, token, adresse ou informations sensibles dans les logs.

## 3. Diagnostic par signaux

```text
[Utilisateur signale une action lente]
               |
               v
[Mesure UI : durée perçue / écran]
               |
               v
[Trace de parcours / correlation ID]
               |
       +-------+--------+
       |                |
       v                v
[Temps local]      [Temps réseau/API]
       |                |
       v                v
[Build/layout]     [DNS/TLS/serveur]
       |                |
       +-------+--------+
               v
[Cause isolée + version/appareil/réseau]
               |
               v
[Correction + mesure de non-régression]
```

## 4. Performance : diagnostiquer avant d'optimiser

- **Rebuilds** : profiler les reconstructions inutiles et séparer l'état local du global. Un rebuild n'est pas automatiquement un bug.
- **Listes** : utiliser une construction paresseuse pour les longues listes, clés stables, pagination et chargement incrémental.
- **Images** : tailles adaptées, cache contrôlé, placeholders, décodage hors chemin critique lorsque pertinent.
- **Mémoire** : fermer les streams, contrôleurs et subscriptions ; éviter de conserver tout un historique en mémoire.
- **Latence perçue** : afficher un état de progression honnête, utiliser cache si validité connue et éviter les animations qui masquent une panne.
- **Réseau** : regrouper seulement si cela améliore réellement le coût et la latence ; fixer timeout, limite de payload et stratégie de retry.

## 5. Fil rouge

Sur l'écran des commandes, un utilisateur voit une liste vide pendant quatre secondes sur réseau mobile. Il croit qu'il n'a aucune commande. La trace montre 300 ms de build UI, 2,8 s d'API et 900 ms de décodage d'images. La correction ne consiste pas à ajouter un spinner plus long : elle peut combiner cache récent clairement indiqué, pagination, optimisation d'images et contrat API plus efficace.

## 6. Pièges

- Mesurer le temps serveur seulement, alors que l'UI ou le réseau local domine.
- Tracer avec un identifiant qui expose directement l'identité ou une donnée personnelle.
- Envoyer un token ou le payload complet dans une exception.
- Optimiser au hasard, sans profil avant/après.
- Échantillonner les erreurs rares de manière à les rendre invisibles.
- Afficher une donnée cache sans date de fraîcheur ou état de synchronisation.

## 7. Exercice et vérification

Instrumenter un flux « ouvrir une commande ». Produire un identifiant de corrélation non sensible, mesurer UI/API/décodage, simuler une API lente et une erreur offline, puis comparer avant/après.

**Critères :** définition des métriques et unités, absence de données sensibles, capacité à retrouver une requête, attribution du temps, amélioration mesurée, tests de non-régression et décision documentée.

## 8. Lien et preuve

Prérequis : architecture client, auth, offline sync. Suite : SLO, incident management et leadership technique.

**Preuve attendue :** un dashboard ou rapport de profilage anonymisé, une trace de parcours, un diagnostic causal et une mesure avant/après.

## Mesures minimales conservées

Le tableau de bord doit au minimum suivre temps jusqu'au premier rendu utile, latence réseau par opération, taux d'erreur, cache hit/miss, crash, taille des payloads et corrélation client ↔ backend. Pour chaque mesure, préciser définition, unité, échantillonnage et risque de collecte de données sensibles.
