---
stability: "perissable"
perishability_id: PER-0115
review_interval: "3 mois"
acte: securiser
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://docs.flutter.dev/cookbook/networking"
source_type: "primary"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Authentification, tokens et réseau : protéger le client sans lui confier les secrets métier ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Naruto :** le clone de l’identité n’est pas Naruto. Un token valide ne donne pas automatiquement tous les droits.

# Authentification, tokens et réseau : protéger le client sans lui confier les secrets métier

> **Périmètre suivi :** les recettes réseau Flutter, les API de plateforme et les dépendances utilisées pour l’authentification, le stockage protégé et la gestion des tokens. La référence Flutter ci-dessus valide des recettes réseau ; elle ne certifie pas à elle seule un fournisseur OAuth/OIDC ni une bibliothèque de stockage.

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

La source Flutter indiquée dans le frontmatter a été consultée le 2 novembre 2026 et confirme des recettes réseau, dont les requêtes authentifiées. Elle ne valide pas automatiquement le flux OAuth/OIDC choisi, la bibliothèque de stockage ni les recommandations propres au fournisseur : vérifie ces éléments dans leurs documentations officielles à la date du projet. Ce document ne certifie aucune bibliothèque ou configuration particulière.

**Preuve attendue :** diagramme d'authentification, tests du refresh concurrent, tests de révocation/déconnexion et analyse de menace des données locales.

## Exercice réseau conservé

Simule séparément un token expiré (`401`), un endpoint lent (timeout) et un endpoint qui retourne `403`. Le résultat UX doit distinguer les trois cas sans inventer la cause. Ajoute un test prouvant qu'un `403` ne déclenche pas une boucle de refresh.

## Transfert vérifiable : cycle d'identité sur un client mobile

**Scénario.** Une requête part avec un access token expiré pendant que l'application est en arrière-plan. Un refresh est lancé, mais deux requêtes concurrentes ne doivent pas déclencher deux rotations incompatibles.

**Exercice papier.** Décris les états `authenticated`, `refreshing`, `reauth_required`, `revoked` et `offline`. Déroule : 401 → verrou de refresh partagé → échange de refresh token → reprise des requêtes sûres → déconnexion si rotation/revocation échoue. Indique quels appels mutatifs ne peuvent pas être rejoués sans idempotency key.

**Vérification.** La table de transitions couvre token expiré, refresh expiré, réseau absent, révocation serveur, deux 401 simultanés et logout pendant refresh. Aucun token n'est écrit dans les logs ou le stockage non sécurisé. Le serveur reste l'autorité finale sur les permissions.

**Transfert.** Ce cycle se relie à la gestion d'état Flutter, au cache local et à l'isolation multi-tenant ; une UI qui paraît connectée n'est pas une preuve d'autorisation.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Flutter : Networking cookbook](https://docs.flutter.dev/cookbook/networking)
- [Flutter : Secure networking](https://docs.flutter.dev/security)
- [OWASP : MASVS](https://mas.owasp.org/MASVS/)
