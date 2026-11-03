---
perishability_id: PER-0093

companion: ce parcours
stability: "perissable"
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://nodejs.org/docs/v22.23.4/api/diagnostics_channel.html"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Mode urgence ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
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

| Symptôme                                                 | Première mesure à prendre                                                                                                                                                                     | Où lire                                                                   |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| « ça marche en local, pas en prod »                      | comparer les variables d'environnement et la version du runtime, pas le code                                                                                                                  | [04](06-niveau-4-systemes.md#72-cloud-et-déploiement)                     |
| « c'est lent de temps en temps »                         | regarder le p99, jamais la moyenne                                                                                                                                                            | [04 : observabilité](06-niveau-4-systemes.md#73-observabilité)            |
| « la mémoire monte sans redescendre »                    | heap snapshot, chercher une `Map` ou un tableau au niveau module                                                                                                                              | [04 : mémoire](06-niveau-4-systemes.md#73-observabilité)                  |
| « la base sature après un déploiement »                  | cache vidé, requêtes simultanées identiques : jitter + verrou de recalcul                                                                                                                     | [03 : Redis](05-niveau-3-backend.md#64-redis)                             |
| « un client voit les données d'un autre »                | état capturé par closure ou singleton partagé entre requêtes                                                                                                                                  | [03 : Express](05-niveau-3-backend.md#61-express-et-les-micro-frameworks) |
| « le déploiement est parti, il faut revenir en arrière » | arrêter la progression du rollout, évaluer rapidement l'impact et la compatibilité d'état, puis choisir une mitigation sûre : rollback, roll-forward, feature flag, isolement ou restauration | [04 : rollback](06-niveau-4-systemes.md#71-cicd)                          |
| « les chiffres du rapport sont faux d'un peu »           | fuseau horaire, ou arrondi en flottant                                                                                                                                                        | [01 : SQL](03-niveau-1-socle.md#47-sql-et-postgresql)                     |
| « le temps réel écroule le serveur »                     | diffusion à tous au lieu des abonnés, pas de fenêtrage                                                                                                                                        | [03 : temps réel](05-niveau-3-backend.md#66-temps-réel-websocket-et-sse)  |
| « le CI est vert mais la prod casse »                    | l'environnement de test ne reproduit pas la charge ni les données                                                                                                                             | [04 : CI/CD](06-niveau-4-systemes.md#71-cicd)                             |
| « l'IA a rendu la suite verte »                          | vérifier qu'aucun test n'a été désactivé                                                                                                                                                      | 06                                                                        |

---

## 3 : Procédure d'incident, sept gestes

<!-- AF-DIAGRAM:incident -->

```text
Signal
  │
  ▼
Triage ─► Mitigation ─► Recovery ─► Postmortem
  ▲                                  │
  └────────────── learning ─────────┘
```

La gestion d’incident transforme un signal de panne en restauration puis en apprentissage durable.

1. **Stopper l'exposition.** Mettre en pause le rollout ou réduire immédiatement le trafic exposé. Si une fonctionnalité est isolable par feature flag, la désactiver peut être plus sûr qu'un retour complet de version.
2. **Faire un triage rapide.** Évaluer l'impact utilisateur, le périmètre, la gravité, les données potentiellement écrites et les dépendances. Ne retarde pas une mesure de confinement urgente pour mener un diagnostic complet.
3. **Consigner les faits et la chronologie.** Noter les signaux observés, l'heure et les changements récents : déploiement, configuration, migration, dépendance, certificat ou changement de trafic. Une proximité temporelle est un indice, pas une preuve de causalité. Sépare les faits des hypothèses.
4. **Choisir la récupération compatible avec l'état réel.** Rollback applicatif si l'ancienne version reste compatible avec les données et protocoles présents ; roll-forward/hotfix si revenir en arrière est dangereux ou impossible ; feature flag, isolement du trafic ou bascule vers une capacité saine si cela réduit mieux le risque. Une restauration de données suit son propre plan vérifié : elle n'est pas un effet automatique du rollback applicatif.
5. **Réduire le périmètre et confirmer la récupération.** Comparer les indicateurs avant/après, vérifier les parcours critiques, les files, les erreurs et l'intégrité des données. Ne confonds pas retour au vert d'un seul indicateur avec rétablissement complet.
6. **Reproduire et diagnostiquer.** Reproduire le défaut, même partiellement, dans un environnement contrôlé ; isoler la cause confirmée des hypothèses et des facteurs contributifs.
7. **Corriger la cause et apprendre.** Documenter chronologie, cause confirmée ou inconnue, détection, décision de mitigation et une action mesurable. Organiser le postmortem sans recherche de coupable, selon le délai et le processus d'équipe.

> **Règle de coordination** : un responsable d'incident coordonne les actions, explicite qui peut autoriser une opération risquée et consigne les décisions. Les spécialistes apportent les faits et options nécessaires ; une mesure irréversible sur des données ne se prend jamais sur une supposition.

## Références de pratique

- [Microsoft Learn : Architecture strategies for safe deployment practices](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/safe-deployments) : arrêt du rollout, investigation du signal, options de rollback, roll-forward ou infrastructure précédente ; la page rappelle que les changements de schéma et d'état demandent une stratégie spécifique. Dernière mise à jour affichée : 17 juin 2026 ; consultée le 31 octobre 2026.
- [AWS Well-Architected : Ensure backwards compatibility for data store and schema changes](https://docs.aws.amazon.com/wellarchitected/latest/devops-guidance/dl.ads.5-ensure-backwards-compatibility-for-data-store-and-schema-changes.html) : compatibilité entre anciennes et nouvelles versions, déploiement progressif et vérification de la séquence de rollback ; consultée le 31 octobre 2026.

Ces références étayent des principes de déploiement sûr ; elles ne remplacent pas le runbook, les tests de compatibilité ni le plan de restauration propres au système.

---

← Audit et marché · [Sommaire](../README.md)

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Node.js : Diagnostics Channel](https://nodejs.org/docs/v22.23.4/api/diagnostics_channel.html)
- [PostgreSQL : Monitoring Database Activity](https://www.postgresql.org/docs/current/monitoring.html)
- [Docker : Troubleshoot](https://docs.docker.com/engine/daemon/troubleshoot/)
- [Git : Documentation](https://git-scm.com/docs)
