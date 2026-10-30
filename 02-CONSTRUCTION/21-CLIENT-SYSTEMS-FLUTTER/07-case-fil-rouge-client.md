---
stability: stable
acte: démontrer
---

# Cas fil rouge : application mobile de commandes utilisable hors ligne

## Contexte

L'application `FieldOrders` permet à un agent de consulter ses commandes, modifier une adresse avant expédition, créer un brouillon et synchroniser lorsque le réseau revient. Plusieurs appareils peuvent être utilisés par le même compte. L'identité est parfois expirée pendant une période hors ligne.

## Architecture attendue

```text
[Écrans Flutter]
      |
      v
[Contrôleur / ViewModel]
      |
      v
[Cas d'usage : consulter / modifier / synchroniser]
      |
      v
[Repository]
      |                        \
      v                         v
[Base locale]             [API distante]
      |                         ^
      v                         |
[Outbox persistante] ---> [Sync engine]
      |                         |
      +---- status / version ---+
                                |
                      [Conflit à résoudre]
```

## Scénario complet

1. Connexion en ligne : le client obtient une session via un flux d'identité adapté et stocke les tokens dans un stockage protégé.
2. Téléchargement : commandes avec version, date de fraîcheur et droits de l'utilisateur sont enregistrées localement.
3. Mode avion : l'agent modifie une adresse ; donnée locale et outbox sont écrites de façon atomique.
4. Fermeture forcée : l'application s'arrête avant l'envoi. Au redémarrage, l'outbox doit survivre.
5. Refresh : lorsque le réseau revient, le client constate l'expiration de l'access token et coordonne un refresh unique.
6. Synchronisation : il envoie le même `operationId`. Le serveur déduplique et compare la version de base.
7. Conflit : un autre appareil a modifié l'adresse. Le client conserve les deux versions et demande une résolution selon la règle métier.
8. Déconnexion : données privées, tokens et opérations en attente sont isolés ou effacés conformément à la politique du produit ; elles ne doivent pas partir sous le compte suivant.

## Mini-projet par étapes

- Étape A : modèle de commande et règles métier, sans UI ; tests unitaires.
- Étape B : repository avec fake et stockage local ; test de fermeture/reprise.
- Étape C : UI avec états initial/loading/loaded/empty/error/offline/conflict.
- Étape D : outbox avec identifiant d'opération et transitions persistées.
- Étape E : API simulée avec déduplication et version serveur.
- Étape F : auth simulée avec token expiré, refresh concurrent et révocation.
- Étape G : observabilité (corrélation, métriques, erreur sans secret) et profilage.

## Tests indispensables

1. Écriture locale et outbox atomiques.
2. Redémarrage : l'opération reste en attente avec le même ID.
3. Timeout après acceptation serveur : retry ne crée pas de doublon.
4. Version divergente : conflit signalé et aucune valeur perdue.
5. Token expiré : refresh unique partagé par les requêtes concurrentes.
6. Refresh révoqué : demande de réauthentification sans boucle.
7. Changement de compte : aucune opération ne traverse le périmètre d'identité.
8. Erreur API : état visible, journal sans token ni donnée sensible.
9. Liste longue : pagination et profilage sans chargement intégral.

## Grille de correction / 40

| Critère                         | Points |
| ------------------------------- | -----: |
| Frontières UI/domaine/données   |      5 |
| Modèle d'état + cycle de vie    |      4 |
| Stockage local + outbox durable |      6 |
| Idempotence + reprise           |      6 |
| Conflit versionné sans perte    |      7 |
| Authentification/sécurité       |      5 |
| Observabilité/performance       |      4 |
| Documentation et limites        |      3 |

Seuil : 32/40, aucun zéro en idempotence, conflit ou sécurité. Un prototype qui ne compile pas ou ne permet pas de lancer les tests ne peut pas être déclaré validé.

## Indices progressifs

- Si le retry crée un doublon, vérifie qui génère `operationId` et où le serveur mémorise le résultat.
- Si la donnée disparaît après crash, cherche si l'écriture locale et l'outbox sont atomiques.
- Si le second appareil écrase le premier, inspecte `baseVersion` et le traitement du conflit.
- Si le compte suivant envoie des données du précédent, isole cache/outbox/session par identité.

## Preuve attendue

Dépôt exécutable, tests automatisés, diagrammes de séquence, rapport de profilage, modèle de menace et démonstration de reprise. Le scénario n'est pas considéré terminé sur la seule base d'une maquette visuelle.

## Exercice de transfert sur papier : reprise après conflit multi-appareil

**Situation.** Le client A modifie le numéro de téléphone hors ligne à 09:00. Le client B modifie l'adresse à 09:02. À 09:05, A et B se reconnectent. Puis B modifie aussi le téléphone avant de synchroniser. L'API utilise `version=41` et refuse toute écriture dont `baseVersion` n'est plus actuelle.

**Travail demandé.** Produis la table des changements locaux (UUID, entité, champ, valeur, baseVersion, statut), la requête envoyée par chaque client, la réponse 409/412 attendue, puis la stratégie de résolution. Distingue les changements sur champs indépendants du conflit portant sur le même champ. Explique pourquoi « dernier timestamp gagne » peut être faux avec des horloges appareil non synchronisées.

**Vérification.** Une bonne réponse conserve les deux changements indépendants, ne perd pas silencieusement la dernière modification du téléphone, conserve un historique de conflit et demande une résolution utilisateur ou métier quand aucune fusion sûre n'existe. Les retries réutilisent un identifiant d'opération stable. Note les états finaux de A, B et serveur.

**Preuve papier.** Joins le diagramme, la table de transitions, au moins six tests Given/When/Then, et une ADR de stratégie de conflit. L'exécution Flutter est une validation distincte.
