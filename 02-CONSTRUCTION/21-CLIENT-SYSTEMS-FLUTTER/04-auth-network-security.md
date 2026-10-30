---
stability: perissable
acte: securiser
freshness_registry_id: PATH:02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/04-auth-network-security.md
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-01-28
review_status: a_verifier_date_absente
---
> **SCÈNE CRAZYDEVS : Naruto :** le clone de l’identité n’est pas Naruto. Un token valide ne donne pas automatiquement tous les droits.

# Authentification, tokens et réseau : protéger le client sans lui confier les secrets métier

## 1. Vocabulaire

L'**authentification** établit quelle identité se présente. L'**autorisation** détermine ce que cette identité peut faire. Un **access token** (jeton d'accès) autorise généralement un ensemble d'appels pendant une durée limitée. Un **refresh token** permet, selon le protocole, d'obtenir de nouveaux tokens sans demander une nouvelle connexion interactive.

Un client mobile est un environnement contrôlé par l'utilisateur : un secret embarqué dans l'application peut être extrait. Ne jamais traiter une clé statique intégrée à l'application comme un secret sûr.

## 2. Cycle de vie du token

```text
[Connexion via flux d'identité adapté]
                 |
                 v
      [Access token + refresh token]
                 |
      access token stocké protégé
                 |
                 v
             [Requête API]
                 |
          succès / 401 expiré
                 |
      +----------+-----------+
      |                      |
    succès                expiré
      |                      v
      |              [Refresh synchronisé]
      |                      |
      |                succès / échec
      |                 |       |
      |                 v       v
      |             [Retry] [Réauthentifier]
      |                 |
      +-----------------+
                        |
                 [Déconnexion/révocation]
```

Plusieurs requêtes peuvent détecter simultanément l'expiration. Sans verrou ou mécanisme de refresh partagé, elles peuvent lancer plusieurs refresh concurrents, écraser le token le plus récent ou provoquer une déconnexion. Une seule opération de refresh doit être coordonnée et les requêtes rejouées seulement si elles sont sûres à rejouer.

## 3. Stockage et permissions

Utiliser le stockage sécurisé fourni par la plateforme (keychain/keystore via une bibliothèque maintenue) selon le modèle de menace et le support réel de l'environnement. Ne pas mettre les refresh tokens dans des préférences non chiffrées, logs, analytics, URL ou sauvegardes non maîtrisées. Appliquer le principe de moindre privilège au serveur : un token valide ne donne pas accès à tout.

Le serveur doit vérifier l'émetteur, l'audience, la signature, l'expiration et les claims requis. Le client ne doit pas décider seul qu'un utilisateur est autorisé à accéder à une donnée. Pour chaque objet, contrôler l'autorisation côté serveur et le périmètre du compte/tenant.

## 4. Erreurs réseau et retries

Distinguer timeout, absence de réseau, DNS/TLS, 401, 403, 404, 409, 429 et 5xx. Elles ne demandent pas les mêmes réponses. Un `401` peut signifier token expiré ; un `403` signifie généralement que l'accès est refusé et ne doit pas être corrigé en répétant le refresh sans fin.

Retry avec backoff exponentiel et jitter pour les erreurs transitoires, limite de tentatives et budget de temps. Respecter `Retry-After` lorsque présent. Ne rejouer une écriture que si elle est idempotente ou protégée par une clé d'idempotence. Une requête `POST` non idempotente ne devient pas sûre juste parce que le client a un retry.

## 5. Révocation et déconnexion

La déconnexion doit effacer les tokens locaux, interrompre les opérations liées à l'identité, invalider caches privés et files d'attente selon une règle documentée. Le serveur doit pouvoir révoquer ou invalider le refresh token selon son protocole. Effacer les tokens sur l'appareil ne révoque pas automatiquement une session côté serveur.

Lorsque le compte change, il faut isoler les données locales et l'outbox par identité/tenant : ne jamais synchroniser les opérations d'un utilisateur sous l'identité du suivant.

## 6. Pièges fréquents

- Stocker un token dans les logs d'erreur ou outils analytics.
- Confondre 401 et 403 puis lancer une boucle de refresh.
- Refresh concurrent non coordonné.
- Retry d'un paiement ou d'une commande sans clé idempotente.
- Conserver un cache privé après déconnexion.
- Croire qu'un secret embarqué dans l'application est confidentiel.
- Oublier de traiter l'expiration pendant une synchronisation offline.

## 7. Exercice

Simuler un access token expiré, cinq requêtes concurrentes, un refresh valide, puis un refresh révoqué. Ajouter une bascule de compte pendant que trois opérations offline sont en attente.

**Vérification :** un seul refresh en cours ; erreurs 401/403 différenciées ; pas de rejeu non sûr ; tokens absents des logs ; cache privé isolé ; file d'attente suspendue ou purgée selon politique lors du changement de compte.

## 8. Références et preuve

Vérifier le flux OAuth/OIDC, la bibliothèque de stockage et les recommandations de sécurité à la date du projet auprès des documentations officielles du fournisseur et de la plateforme mobile. Ce document est évolutif et marqué `a_verifier` : il ne certifie pas une bibliothèque ou un algorithme particulier.

**Preuve attendue :** diagramme d'authentification, tests du refresh concurrent, tests de révocation/déconnexion et analyse de menace des données locales.

## Exercice réseau conservé

Simule séparément un token expiré (`401`), un endpoint lent (timeout) et un endpoint qui retourne `403`. Le résultat UX doit distinguer les trois cas sans inventer la cause. Ajoute un test prouvant qu'un `403` ne déclenche pas une boucle de refresh.

## Transfert vérifiable : cycle d'identité sur un client mobile

**Scénario.** Une requête part avec un access token expiré pendant que l'application est en arrière-plan. Un refresh est lancé, mais deux requêtes concurrentes ne doivent pas déclencher deux rotations incompatibles.

**Exercice papier.** Décris les états `authenticated`, `refreshing`, `reauth_required`, `revoked` et `offline`. Déroule : 401 → verrou de refresh partagé → échange de refresh token → reprise des requêtes sûres → déconnexion si rotation/revocation échoue. Indique quels appels mutatifs ne peuvent pas être rejoués sans idempotency key.

**Vérification.** La table de transitions couvre token expiré, refresh expiré, réseau absent, révocation serveur, deux 401 simultanés et logout pendant refresh. Aucun token n'est écrit dans les logs ou le stockage non sécurisé. Le serveur reste l'autorité finale sur les permissions.

**Transfert.** Ce cycle se relie à la gestion d'état Flutter, au cache local et à l'isolation multi-tenant ; une UI qui paraît connectée n'est pas une preuve d'autorisation.
