---
stability: evolutif
acte: évaluer
---

> **SCÈNE CRAZYDEVS : Garo contre le réseau :** le backend change son contrat pendant que tu es en prod. Le héros qui « corrige vite » casse la moitié des clients. Le héros Staff commence par mesurer.

# Challenge : prouver qu'un client mobile survivra aux pannes ordinaires

## Mission

Construire ou spécifier un parcours de consultation et de modification d'une commande qui reste honnête hors ligne, reprend après fermeture et protège l'identité. Le cas de référence est `07-case-fil-rouge-client.md`.

## Livrables obligatoires

1. Diagramme de couches UI, contrôleur, cas d'usage, repository, base locale, outbox, synchroniseur et API.
2. Modèle d'état de l'écran : initial/loading/loaded/empty/error/offline/sync-pending/conflict.
3. Contrat d'API avec version de ressource, identifiant d'opération, erreurs et règle d'idempotence.
4. Stratégie de stockage d'identité, refresh, révocation et déconnexion.
5. Tests de reprise après crash, retry après réponse perdue, conflit entre appareils, changement de compte et erreur réseau.
6. Logs/mesures sans secret ni donnée personnelle inutile.
7. ADR expliquant une décision de conflit et une décision de cache.

## Scénarios d'acceptation

- Une édition locale survit à la fermeture de l'application.
- Un retry conserve le même identifiant d'opération.
- Le serveur simulé ne crée pas deux effets métier pour une opération dupliquée.
- Une version de base périmée donne un conflit visible ; aucune modification n'est silencieusement écrasée.
- Une requête 401 ne crée qu'un refresh coordonné ; un 403 ne déclenche pas une boucle de refresh.
- Après déconnexion/changement de compte, aucune opération privée du précédent utilisateur ne part sous le nouveau.
- Les états offline, synchronisation et erreur sont compréhensibles dans l'UI.

## Vérification /30

| Critère                                | Points |
| -------------------------------------- | -----: |
| Architecture et ownership d'état       |      4 |
| Persistance locale et outbox           |      5 |
| Idempotence et reprise                 |      5 |
| Versionnement et résolution de conflit |      6 |
| Authentification et isolation          |      4 |
| Observabilité et confidentialité       |      3 |
| Tests, documentation et limites        |      3 |

Seuil : 24/30, aucun zéro en idempotence, conflit ou sécurité. Les tests doivent être réellement exécutés ; les captures d'écran de l'UI ne remplacent pas les preuves de comportement.

## Indices progressifs

- Après crash : les données et l'outbox ont-elles été écrites dans une seule transaction locale ?
- Après timeout : le serveur peut-il avoir effectué l'action ? Le même ID est-il rejoué ?
- Après conflit : où se trouve la version acceptée par le serveur et l'édition locale est-elle conservée ?
- Après changement d'utilisateur : cache, outbox, token et requêtes en cours sont-ils isolés ?
- Après lenteur : la mesure sépare-t-elle UI, réseau, API et décodage ?

## Exemple de résultat insuffisant

« On garde les données dans le cache, et quand Internet revient on fait un POST. En cas d'erreur on retente trois fois. » Cette réponse ne traite ni doublons, ni version, ni identité, ni perte d'accusé, ni conflit.

## Exemple de résultat solide

L'opération est persistée dans une outbox atomique, munie d'un ID stable et d'une version de base. Le serveur déduplique et retourne le résultat précédent pour un retry. Un conflit reste en attente et présente les deux versions ; une règle métier détermine si l'utilisateur peut fusionner ou doit escalader. La file est partitionnée par identité et les secrets ne sont jamais tracés.

## Preuve attendue

Dépôt ou prototype réellement exécutable, sorties de tests, ADR, diagrammes et rapport de test sur au moins un appareil ou émulateur, avec versions de SDK et limites connues.

## Variation de contrat API conservée

Ajouter à la mission une séquence hostile : timeout, `401`, payload incomplet puis nouvelle version API. Produire un plan de réaction et un ADR ; expliquer le comportement de compatibilité et les preuves. Plusieurs réponses peuvent être raisonnables, mais aucune hypothèse de compatibilité ne doit rester implicite.

## Certification de conception sur papier : séparée de l'exécution mobile

Cette grille permet de vérifier le raisonnement sans Flutter SDK, appareil ou émulateur. Elle ne prétend pas qu'une application a été compilée ou testée en conditions réelles.

| Critère                           | Points | Artefact vérifiable                                                         |
| --------------------------------- | -----: | --------------------------------------------------------------------------- |
| Frontières UI / domaine / données |      4 | Diagramme de dépendances orientées et contrat des repositories              |
| États et cycle de vie             |      4 | Table des états UI, transitions et règles après fermeture/redémarrage       |
| Offline / outbox / idempotence    |      4 | Schéma de persistance atomique, identifiant stable et retry dédupliqué      |
| Conflits / version / identité     |      4 | Scénario à deux appareils, règle de conflit, tenant et isolation de session |
| Exploitation / tests / arbitrages |      4 | Plan de test, logs sans secret, indicateurs et ADR justifiant les limites   |

**Seuil papier : 16/20**, sans échec critique sur l'isolation des comptes, l'idempotence ou la perte silencieuse de données. Les scénarios doivent être déroulés pas à pas avec l'état avant/après.

**Validation d'exécution distincte :** le barème `/30` et la preuve sur émulateur/appareil restent requis pour déclarer un prototype mobile réellement exécuté. Tant que le SDK et le matériel ne sont pas disponibles, le statut est `CONCEPTION_PAPIER_VALIDEE` au mieux, jamais `EXECUTION_MOBILE_VALIDEE`.
