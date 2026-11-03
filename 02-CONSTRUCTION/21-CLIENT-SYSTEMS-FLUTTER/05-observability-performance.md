---
stability: evolutif
acte: diagnostiquer
freshness_status: "verified_reference"
source_verified_on: "2026-11-03"
source_type: "primary"
canonical_resource: "03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md"
source_url: "https://docs.flutter.dev/perf/best-practices"
source_scope: "La documentation officielle Flutter confirme les recommandations de performance explicitement couvertes ici : limiter le travail coûteux dans build(), localiser setState, construire les longues listes paresseusement et diagnostiquer les coûts de rendu. La Performance View de DevTools documente les temps de frame, les threads UI/raster, la timeline et le suivi des builds/layouts/paints. La définition générale de l’observabilité, les métriques métier proposées et les recommandations de confidentialité restent des repères pédagogiques AF, non des affirmations attribuées à ces pages Flutter."
source_registry_id: "PER-0120"
provenance_note: "Documentation Flutter consultée le 2026-11-03. Vérification limitée aux pratiques de performance et aux capacités documentées de DevTools ; aucun profilage d’application ni snippet n’a été exécuté."
source_access_status: "OFFICIAL_FLUTTER_PERFORMANCE_BEST_PRACTICES_AND_DEVTOOLS_PERFORMANCE_VIEW_RETRIEVED_2026-11-03"
claim_alignment_status: "FLUTTER_BUILD_COST_LAZY_LISTS_FRAME_TIMING_AND_DEVTOOLS_PROFILING_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
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

## Références Flutter pour le diagnostic de performance

- [Performance best practices](https://docs.flutter.dev/perf/best-practices) : coût de `build()`, portée de `setState`, listes paresseuses et opérations de rendu coûteuses.
- [Use the Performance view](https://docs.flutter.dev/tools/devtools/performance) : temps de frame, travail UI/raster, timeline et suivi des builds, layouts et paints. Pour comparer des temps de rendu représentatifs, la documentation recommande un build en mode `profile`, pas `debug`.

La définition générale de l’observabilité, les métriques métier et les précautions de confidentialité de cette leçon restent des recommandations pédagogiques AF ; elles ne sont pas attribuées à ces pages Flutter.

<!-- AF-LESSON-PROFILE: ui -->

## Repères de décision

- **Pourquoi :** Un flux utilisateur clair réduit les erreurs, les doubles actions et les abandons. L'interface doit montrer les états réels du système, pas inventer un succès optimiste.
- **Quand l’utiliser / quand l’éviter :** Modélise les parcours et états avant d'ajouter des écrans. Sur un réseau instable, prévois attente, reprise et conflit ; sur une action sensible, demande confirmation si nécessaire.
- **Limites :** Le front ne remplace ni autorisation serveur ni cohérence transactionnelle. Les états offline ne sont pas des confirmations serveur ; les tests visuels seuls ne prouvent pas l'accessibilité.

## Mécanisme : la version sans magie

Décris l'état métier, l'état de la requête et l'état de l'interface séparément. Définis les transitions et les messages pour chaque résultat.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Observabilité et performance client : mesurer ce que l'utilisateur subit** se rattache à ce cas concret : Un demandeur Kintana peut perdre le réseau en envoyant une demande. Il doit voir si elle est en attente, confirmée ou rejetée et ne pas la renvoyer au hasard.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours multi-états pour le demandeur Kintana

> **Arc One Piece / Grand Line :** le parcours doit rester lisible même quand le réseau fait des vagues. L'utilisateur ne doit pas deviner si son action est partie.

**Mission liée à « Observabilité et performance client : mesurer ce que l'utilisateur subit » :** Construis le parcours de création et suivi d'une demande avec loading, empty, error, success et offline. Ajoute navigation clavier, annonces de statut et prévention du double envoi.

**Livrable :** un flux d'écran, les composants d'état, une matrice de parcours et des tests clavier / réseau simulé.

**Critères d’acceptation :** chaque écran correspond à un état réel ; le succès attend le serveur ; les erreurs sont récupérables ; le brouillon et la clé d'idempotence évitent la duplication ; les contrôles sont accessibles.

**Transfert obligatoire :** Le serveur accepte la demande mais la réponse se perd. Explique ce que l'interface doit afficher et comment réconcilier le statut.
