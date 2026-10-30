---
stability: evolutif
acte: créer
---

> **SCÈNE CRAZYDEVS : Prison Break :** le serveur coupe le courant au milieu de l’évasion. Ton app doit continuer sans faire croire que tout va bien.

# Mini-projet : Client survivant

Construis une petite app Flutter reliée à une API du fil rouge.

## Contraintes

- auth ;
- cache ;
- une action offline ;
- reprise après reconnexion ;
- timeout ;
- retry borné ;
- journal d’événements utile au diagnostic ;
- budget de taille de réponse ;
- test d’un contrat cassé.

## Tu dois produire

- code ;
- tests ;
- contrat ;
- ADR ;
- hypothèses ;
- mesure ;
- postmortem d’une panne injectée.

**Aucun corrigé n’est fourni.** Le but est précisément de construire et découvrir le modèle.


## Comprendre les tests avant de commencer

Ce fichier est un **brief de mini-projet**, pas un dépôt Flutter préconfiguré. À l'état initial, il ne faut pas supposer qu'un `pubspec.yaml`, une application ou des tests exécutables sont déjà présents dans ce dossier. Les tests de référence du module sont les contrôles que tu écris à partir des critères ci-dessous ; il n'y a pas de suite de tests Flutter préécrite dans ce brief.

Distingue quatre catégories :

1. **Tests de référence** : tests de l'environnement ou d'un composant fourni qui doivent passer dès le départ. Ce brief n'en fournit pas.
2. **Tests volontairement rouges** : tests TDD que tu écris avant l'implémentation et qui échouent tant que le comportement manque. Un test rouge attendu n'indique pas un projet cassé.
3. **Tests à créer par l'apprenant** : tous les tests métier, offline, auth, synchronisation, reprise et UI décrits ci-dessous.
4. **Tests de validation finale** : la suite complète doit passer sur une exécution propre et reproductible.

## État initial du projet

Avant le code, crée ou vérifie un projet Flutter avec la version de Flutter/Dart fixée par ton environnement de travail. Enregistre cette version dans le README du projet. Ne copie pas un `pubspec.lock` provenant d'un environnement différent sans exécuter `flutter pub get` et vérifier les dépendances. Le brief ne fournit pas de code de départ ; les tests sont à créer par TDD.

## Ordre de construction conseillé

1. Modèles métier et états de synchronisation (`Order`, `Version`, `PendingOperation`, `Conflict`).
2. Cas d'usage purs : consultation, modification autorisée, règles de transition.
3. Contrat du repository et fake en mémoire ; tests métier.
4. Persistance locale et outbox atomique ; tests de reprise.
5. Adaptateur API et serveur simulé avec déduplication ; tests de timeout et idempotence.
6. Moteur de synchronisation, versions et résolution de conflit.
7. Authentification, refresh coordonné, révocation et séparation par compte.
8. Widgets/écrans et gestion des états visibles.
9. Logs, métriques, profilage, documentation et postmortem.

Les noms de fichiers et packages sont laissés à ton choix ; le README doit documenter ta structure et les raisons de la découpe. Les couches doivent exister dans le raisonnement et les tests, pas nécessairement dans un nombre arbitraire de dossiers.

## Matrice de vérification

| Catégorie | À démontrer | Résultat attendu |
|---|---|---|
| Tests initiaux | Version Flutter/Dart et dépendances | Environnement reproductible, aucune fausse promesse de tests préinstallés |
| Tests TDD rouges | Tests métier écrits avant le code | Échec explicable sur le comportement absent |
| Tests apprenant | Offline, outbox, retry, conflit, auth, UI, observabilité | Chaque comportement possède au moins un test ciblé |
| Validation finale | Suite complète répétée après redémarrage | Tous les tests attendus verts, aucun test ignoré sans justification |

## Critères de réussite

Utiliser la grille /40 du fichier `07-case-fil-rouge-client.md`. Conserver les sorties de tests, versions de l'environnement, diagrammes et décisions. Ne pas remplacer un test qui échoue par `skip` ou par une assertion plus faible sans ADR et justification.

## Exemple de solution attendue (extrait, non-copiable comme architecture universelle)

Pour une liste de rendez-vous, le cache local contient `appointmentId`, `serverVersion`, `updatedAtServer`, `syncState` et les données visibles. La file d'outbox contient une opération immuable avec `operationId`, `entityId`, `baseVersion`, `patch`, `createdAtDevice` et `status`. La transaction locale qui modifie le rendez-vous et ajoute l'opération doit être atomique : sinon l'interface peut afficher un changement qui ne sera jamais synchronisé.

**Vérification.** Un test simule fermeture immédiate après modification locale puis redémarrage : la mutation et son entrée d'outbox sont toutes deux présentes, ou aucune des deux. Un second test rejoue deux fois le même `operationId` et vérifie l'absence de double effet. Ce modèle est un exemple de contrat à adapter, pas une consigne d'utiliser une base précise.

**Transfert.** Le même outbox pattern s'applique à une application de caisse ou de logistique ; les conflits et règles de priorité restent spécifiques au domaine.
