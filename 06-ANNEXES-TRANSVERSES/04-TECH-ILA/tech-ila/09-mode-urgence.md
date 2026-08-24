## perishability_id: PER-0093

statut: revu
last_reviewed: 2026-08
proprietaire: mainteneur TECH-ILA
revue: trimestrielle
companion: ce parcours
stability: perissable
acte: comprendre
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

[← Sommaire TECH-ILA](../README.md)

> **Tu viens de** : 08-IA-exercices-marche-audit.md : ou de nulle part, parce que ça brûle.
> **Tu dois déjà savoir** : lire un message d'erreur littéral, ouvrir un log, exécuter une commande dans le bon environnement.
> **Ensuite** : rien. En incident, on ne lit pas le reste du corpus. On revient après.

# Mode urgence

Temps de lecture ~5 min

Ce fichier ne s'apprend pas. Il se **cherche**, en moins de 30 secondes, pendant que quelque chose est cassé. Deux index et une procédure. Rien d'autre.

Utilise `Ctrl+F` sur le message d'erreur **littéral**, avant toute autre chose.

---

## 1 : Index par message d'erreur

| Message littéral                                                                          | Cause la plus fréquente                                                  | Où lire                                                                                                                                   |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `EADDRINUSE: address already in use :::3000`                                              | un process précédent n'est pas mort                                      | [01 : Node](03-niveau-1-socle.md#43-nodejs)                                                                                               |
| `ECONNREFUSED 127.0.0.1:5432`                                                             | la base n'écoute pas, ou pas sur cet hôte depuis un conteneur            | [01 : PostgreSQL](03-niveau-1-socle.md#47-sql-et-postgresql) · [01 : Docker](03-niveau-1-socle.md#43-nodejs)                              |
| `remote: Permission denied (publickey)`                                                   | clé SSH absente de l'agent ou du compte                                  | [01 : Git](03-niveau-1-socle.md#42-git-et-github)                                                                                         |
| `error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'` | frontière non validée, `any` implicite en amont                          | [01 : TypeScript](04-niveau-2-frontend.md)                                                                                                |
| `Cannot find module 'X'` en production seulement                                          | dépendance en devDependencies, ou résolution runtime inexistante         | [01 : Node](03-niveau-1-socle.md#43-nodejs) · [04 : build/CI](06-niveau-4-systemes.md#71-cicd)                                            |
| `__dirname is not defined`                                                                | paquet CommonJS chargé en ESM                                            | [01 : Node](03-niveau-1-socle.md#43-nodejs)                                                                                               |
| `CORS: No 'Access-Control-Allow-Origin' header is present`                                | réponse serveur, pas un bug de front                                     | [01 : HTTP](03-niveau-1-socle.md#46-http-et-rest) · [03 : Express](05-niveau-3-backend.md#61-express-et-les-micro-frameworks)             |
| `401 Unauthorized` après un rafraîchissement de page                                      | jeton en mémoire seulement, ou cookie sans `SameSite` correct            | [03 : auth](05-niveau-3-backend.md#63-validation-authentification-autorisation)                                                           |
| `duplicate key value violates unique constraint`                                          | deux écritures concurrentes ; c'est la contrainte qui te sauve           | [01 : SQL](03-niveau-1-socle.md#47-sql-et-postgresql)                                                                                     |
| `deadlock detected`                                                                       | deux transactions verrouillent dans un ordre différent                   | [01 : SQL](03-niveau-1-socle.md#47-sql-et-postgresql)                                                                                     |
| `too many connections`                                                                    | pas de pool, ou un pool par instance multiplié par le nombre de réplicas | [03 : Redis/pool](05-niveau-3-backend.md#64-redis) · [04 : scalabilité](06-niveau-4-systemes.md#74-résilience-et-architecture-distribuée) |
| `JavaScript heap out of memory`                                                           | cache sans limite ni TTL, ou fuite par closure                           | [04 : performance/mémoire](06-niveau-4-systemes.md#73-observabilité)                                                                      |
| `UnhandledPromiseRejection`                                                               | un `await` manquant, une erreur avalée                                   | [03 : Node asynchrone](05-niveau-3-backend.md#61-express-et-les-micro-frameworks)                                                         |
| `Hydration failed because the initial UI does not match what was rendered on the server`  | lecture de `window`/`localStorage` au premier rendu                      | [02 : rendu](04-niveau-2-frontend.md)                                                                                                     |
| `Maximum update depth exceeded`                                                           | effet qui écrit l'état dont il dépend                                    | [02 : React](04-niveau-2-frontend.md)                                                                                                     |
| `standard_init_linux.go: exec user process caused: exec format error`                     | image construite pour une autre architecture (arm64 vs amd64)            | [01 : Docker](03-niveau-1-socle.md#43-nodejs)                                                                                             |
| `OOMKilled` / exit code 137                                                               | limite mémoire du conteneur atteinte                                     | [04 : cloud/conteneurs](06-niveau-4-systemes.md#72-cloud-et-déploiement)                                                                  |
| `context deadline exceeded` / `ETIMEDOUT`                                                 | appel externe sans timeout, pool épuisé en cascade                       | [04 : résilience](06-niveau-4-systemes.md#74-résilience-et-architecture-distribuée)                                                       |
| `429 Too Many Requests`                                                                   | tu satures un fournisseur : concurrence non bornée                       | [03 : files/queues](05-niveau-3-backend.md#65-files-de-messages-et-workers)                                                               |
| `certificate has expired`                                                                 | renouvellement automatique cassé, pas ton code                           | [04 : exploitation](06-niveau-4-systemes.md#72-cloud-et-déploiement)                                                                      |

---

## 2 : Index par symptôme

| Symptôme                                                 | Première mesure à prendre                                                    | Où lire                                                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| « ça marche en local, pas en prod »                      | comparer les variables d'environnement et la version du runtime, pas le code | [04](06-niveau-4-systemes.md#72-cloud-et-déploiement)                     |
| « c'est lent de temps en temps »                         | regarder le p99, jamais la moyenne                                           | [04 : observabilité](06-niveau-4-systemes.md#73-observabilité)            |
| « la mémoire monte sans redescendre »                    | heap snapshot, chercher une `Map` ou un tableau au niveau module             | [04 : mémoire](06-niveau-4-systemes.md#73-observabilité)                  |
| « la base sature après un déploiement »                  | cache vidé, requêtes simultanées identiques : jitter + verrou de recalcul    | [03 : Redis](05-niveau-3-backend.md#64-redis)                             |
| « un client voit les données d'un autre »                | état capturé par closure ou singleton partagé entre requêtes                 | [03 : Express](05-niveau-3-backend.md#61-express-et-les-micro-frameworks) |
| « le déploiement est parti, il faut revenir en arrière » | rollback avant diagnostic, toujours                                          | [04 : rollback](06-niveau-4-systemes.md#71-cicd)                          |
| « les chiffres du rapport sont faux d'un peu »           | fuseau horaire, ou arrondi en flottant                                       | [01 : SQL](03-niveau-1-socle.md#47-sql-et-postgresql)                     |
| « le temps réel écroule le serveur »                     | diffusion à tous au lieu des abonnés, pas de fenêtrage                       | [03 : temps réel](05-niveau-3-backend.md#66-temps-réel-websocket-et-sse)  |
| « le CI est vert mais la prod casse »                    | l'environnement de test ne reproduit pas la charge ni les données            | [04 : CI/CD](06-niveau-4-systemes.md#71-cicd)                             |
| « l'IA a rendu la suite verte »                          | vérifier qu'aucun test n'a été désactivé                                     | 06                                                                        |

---

## 3 : Procédure d'incident, sept gestes

<!-- AF-DIAGRAM:incident -->

```text
text
Signal
  │
  ▼
Triage ─► Mitigation ─► Recovery ─► Postmortem
  ▲                                  │
  └────────────── learning ─────────┘
```

La gestion d’incident transforme un signal de panne en restauration puis en apprentissage durable.

1. **Arrêter l'hémorragie.** Rollback ou coupure de la fonctionnalité. Le diagnostic vient après, jamais avant.
2. **Noter l'heure et l'horodatage du dernier changement.** 80 % des incidents suivent un déploiement ou un changement de configuration.
3. **Dire ce que tu vois, pas ce que tu crois.** Un message d'erreur littéral, un taux, un graphe. Pas d'hypothèse énoncée comme un fait.
4. **Réduire le périmètre.** Un endpoint ? un client ? une région ? une version ? Chaque réponse divise l'espace de recherche.
5. **Reproduire, même partiellement.** Une reproduction, même en staging avec un jeu de données copié, vaut dix intuitions.
6. **Corriger la cause, pas le symptôme** : mais poser le pansement d'abord si le pansement tient.
7. **Postmortem sans nom de coupable, dans les 48 h.** Chronologie, cause, ce qui a rendu la détection lente, une action mesurable. Sans ça, l'incident revient.

> **Règle non négociable** : pendant un incident, une seule personne décide. Les autres proposent.

---

← Audit et marché · [Sommaire](../README.md)
