---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/01-tour-de-controle.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/01-tour-de-controle.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 00 : Avant les projets 2035+ : le vrai parcours de préparation

> **Arc DBZ :** tu ne lances pas un Genkidama avec 2 % de batterie et trois notions apprises sur TikTok. Les projets de ce portefeuille sont des boss de fin de parcours. Les prérequis ne sont pas décoratifs : ils empêchent de confondre copier du code et comprendre un système.

## Pourquoi cette page existe

Dans les fiches projets, les prérequis étaient parfois résumés par « maîtrise HTTP, DB, concurrence, sécurité… ». C'était trop vague. Cette page transforme ces mots en **leçons exactes, ordre d'étude et preuves de maîtrise**.

Tu n'as pas besoin de terminer les dix projets pour être un bon ingénieur. Tu avances **un projet à la fois**, selon ton intérêt et tes prérequis. Les projets 2035+ sont une extension Depth ; ils ne remplacent ni les modules fondamentaux ni le cas d’étude pédagogique commun Kintana ; ton fil rouge personnel reste distinct.

## La carte générale

```text
FONDATIONS
  Git + shell + runtime + tests
          |
          v
BACKEND ET DONNÉES
  HTTP/API + DB + transactions + auth
          |
          v
SYSTÈMES EN PRODUCTION
  async + queues + observabilité + SLO
          |
          +-------------------+
          |                   |
          v                   v
      ROUTE IA           ROUTE PLATFORM/SÉCURITÉ
  retrieval + eval      Linux + conteneurs + CI/CD
  gateway + agents      GitOps + identité + supply chain
          |                   |
          +---------+---------+
                    |
                    v
         PROJETS 2035+ SPÉCIALISÉS
    local-first | stockage | GraphRAG | leadership
```

## Règle d'entrée : prouver avant de commencer

Pour chaque compétence marquée obligatoire :

1. Lis la leçon liée, pas uniquement le README du module.
2. Refais l'exercice sans regarder le corrigé.
3. Explique le mécanisme avec tes mots et dessine le flux.
4. Injecte un cas qui casse ta première solution.
5. Garde le résultat dans ton dépôt de preuves.

Un chapitre lu n'est pas un prérequis validé. Une preuve peut être un test, une petite implémentation, une trace, un ADR ou une démonstration enregistrée. Elle doit être reproductible.

## Niveau 0 : Socle commun obligatoire

À passer une fois avant n'importe lequel des dix projets.

| Compétence                     | Leçons à étudier                                                                                                                                                                                                                                                                                                                           | Preuve de sortie                                                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Shell, Git et environnement    | [Shell Survival](../../00-SOCLE/01-GETTING-STARTED/04-shell_survival.md), [Git 101](../../00-SOCLE/01-GETTING-STARTED/05-git_101.md), [Setup](../../SETUP.md)                                                                                                                                                                              | Cloner, configurer, lancer les tests, lire un diff, créer une branche et revenir à un commit sans perdre le travail.                 |
| JavaScript/runtime et fichiers | [Node vs Browser](../../02-CONSTRUCTION/13-RUNTIME-ENV/02-node_vs_browser.md), [process/env/argv](../../02-CONSTRUCTION/13-RUNTIME-ENV/05-process_env_argv.md), [Streams/Buffers](../../02-CONSTRUCTION/13-RUNTIME-ENV/03-streams_buffers.md), [Filesystem](../../02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts/03-filesystem_ops.md) | Lire un gros fichier en flux, gérer une configuration par environnement et distinguer mémoire, fichier et processus.                 |
| HTTP, API et sérialisation     | [HTTP/REST](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md), [Sérialisation](../../02-CONSTRUCTION/18-WEB-CONCEPTS/07-serialization.md), [API Craft](../../02-CONSTRUCTION/19-API-CRAFT/README.md)                                                                                                                           | Concevoir un contrat HTTP avec statuts, validation, pagination, erreur, timeout et versionnement.                                    |
| Tests et CI                    | [Testing](../../02-CONSTRUCTION/03-TESTING/README.md), [Contract Testing](../../02-CONSTRUCTION/03-TESTING/08-contract_testing_pact.md), [Test Strategy](../../02-CONSTRUCTION/03-TESTING/10-test_strategy_not_framework.md), [Review and CI](../../03-PILOTAGE/03-QUALITY-SHIELD/04-review-and-ci.md)                                     | Un test unitaire, un test d'intégration, un contrat, une commande CI et une régression volontaire détectée.                          |
| Données et transactions        | [SQL](../01-DATABASES/02-sql_basics.md), [Modélisation](../01-DATABASES/04-data_modeling.md), [DB dans JS](../01-DATABASES/06-db_in_js.md), [Lab Transactions](../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md)                                                                                                         | Expliquer atomicité, contrainte, isolation, concurrence, idempotence et migration ; démontrer une course read-modify-write corrigée. |
| Sécurité de base               | [Authn/Authz](../../02-CONSTRUCTION/18-WEB-CONCEPTS/06-auth_authz.md), [OAuth/Sessions/JWT](../../03-PILOTAGE/04-SECURITY/05-auth_flows.md), [RBAC/ABAC/IDOR](../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md), [Secrets](../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md)                                                   | Montrer qu'un utilisateur A ne peut pas lire ou modifier la ressource privée de B, même avec un identifiant valide.                  |
| Asynchronisme et erreurs       | [Async](../../01-CADRAGE/02-ASYNC/README.md), [AbortController](../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md), [Backpressure](../../01-CADRAGE/02-ASYNC/04A-backpressure.md), [Error Handling](../../01-CADRAGE/04-ERROR-HANDLING/README.md)                                                                          | Gérer timeout, annulation, erreur, concurrence et surcharge sans promesse pendante ni retry infini.                                  |

**Gate G0 :** si tu ne peux pas exécuter le service, lire ses logs, lancer ses tests, décrire son contrat et expliquer son modèle de données, ne commence pas un projet 2035+. Retourne au module concerné. Pas de honte : c'est le checkpoint, pas le tribunal de Konoha.

## Niveau 1 : Systèmes en production

Ces compétences sont indispensables aux projets d'observabilité, d'orchestration, de plateforme et de sécurité.

### Préparation réseau et sécurité du Coffre Imprenable

Cette route spécialisée est à terminer **avant** la gate du projet 07. Elle enseigne les notions réseau de base avant de demander de lire un diagramme Cloud ou d'implémenter Zero Trust.

1. Étudier [HTTP/REST](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md) pour comprendre la requête et la réponse applicatives.
2. Étudier [Leçon-pont 12 : Fondations réseau](LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md) : IP, ports, DNS, TCP, TLS, HTTP et trajet d'une requête. Produire `NETWORK-REQUEST-JOURNEY.md`.
3. Lire [Architectures réseau, identités et reprise Cloud](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md) pour appliquer ces notions aux flux publics/privés et aux services.
4. Étudier [TLS/chiffrement et certificats](../../03-PILOTAGE/04-SECURITY/12-chiffrement_repos_transit.md), puis [auth flows](../../03-PILOTAGE/04-SECURITY/05-auth_flows.md), [autorisation RBAC/ABAC/IDOR](../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md) et [secrets/rotation](../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md).
5. Terminer [Leçon-pont 06 : Zero Trust et supply chain](LECONS-PONTS/06-zero-trust-et-supply-chain.md), la SBOM, la CI et les preuves du projet.

La lecture de la page Cloud seule ne valide pas le socle réseau ; `NETWORK-REQUEST-JOURNEY.md` doit expliquer chaque étape avec tes mots.

| Compétence                | Leçons à étudier                                                                                                                                                                                                                                                                                                                                                          | Preuve de sortie                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Logs, métriques, traces   | [Logs structurés](../../03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md), [Distributed tracing](../../03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md), [Metrics/alerting](../../03-PILOTAGE/05-OBSERVABILITY/05-metrics_alerting.md), [Instrumenter un projet](../../03-PILOTAGE/05-OBSERVABILITY/10-instrumenter_ton_projet.md)                            | Une requête corrélée, un SLI défini, un tableau de bord qui répond à une question opérationnelle.                      |
| Fiabilité et récupération | [SLI/SLO/Error budget](../../03-PILOTAGE/06-FIABILITE-SLO/02-sli_slo_budget_erreur.md), [RPO/RTO](../../03-PILOTAGE/06-FIABILITE-SLO/04-reprise_rpo_rto.md), [Injection de panne](../../03-PILOTAGE/06-FIABILITE-SLO/07-injection_panne.md), [59 : DevOps/SRE](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md)                                                   | Déclencher une panne contrôlée, la détecter, restaurer et expliquer ce qui a été mesuré.                               |
| Test de charge HTTP       | [HTTP/REST](../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md), [Métriques](../../03-PILOTAGE/05-OBSERVABILITY/05-metrics_alerting.md), [Leçon-pont 11](LECONS-PONTS/11-tests-de-charge-http.md)                                                                                                                                                               | Produire trois essais locaux comparables, lire débit/latence/erreurs et relier une observation à un signal du service. |
| Architecture distribuée   | [Distributed primitives](../02-SCALABILITY/03-distributed_primitives.md), [Fallacies](../02-SCALABILITY/04-distributed_fallacies.md), [Queues](../02-SCALABILITY/08-message_queues.md), [Résilience](../02-SCALABILITY/10-c_tests_de_resilience.md)                                                                                                                       | Démontrer le comportement lors d'un doublon, d'un retard, d'un timeout et d'une panne de dépendance.                   |
| Cloud et plateforme       | [Cloud architectures](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md), [GitOps](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md), [IDP](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/03-internal-developer-platform.md), [Platform Operations Lab](../../06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md) | Construire une image, livrer une version locale, détecter un drift et effectuer un rollback vérifié.                   |
| Supply chain              | [SBOM](../../03-PILOTAGE/04-SECURITY/08-supply_chain_sbom.md), [Audit supply chain](../../03-PILOTAGE/04-SECURITY/09-audit_your_supply_chain.md), [Leçon-pont 06](LECONS-PONTS/06-zero-trust-et-supply-chain.md)                                                                                                                                                          | Produire une SBOM et faire échouer un contrôle après altération d'un artefact signé.                                   |

## Niveau 2 : Route IA

À passer avant les projets 02, 03, 04, 05 et 10. Les projets IA restent des systèmes logiciels : API, droits, tests, état et exploitation passent avant les prompts.

1. Lire le [parcours apprenant du produit IA de référence](../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/09-PARCOURS-LECTURE-APPRENANT.md).
2. Exécuter le [laboratoire IA de bout en bout : 60](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) sans fournisseur payant si tu n'en as pas.
3. Étudier [Leçon-pont 01 : RAG/recherche hybride](LECONS-PONTS/01-rag-recherche-hybride.md) et [02 : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md).
4. Terminer le [projet 02 : Tribunal des IA](02-tribunal-des-ia.md) avec `PASS` avant les projets 03, 04, 05 et 10. Pour ces quatre projets, la lecture du pont 02 ou du README ne remplace pas la preuve du projet 02.
5. Avant un gateway, étudier [07 : Gateway LLM](LECONS-PONTS/07-gateway-llm-fiabilite.md) ; avant un agent, étudier [03 : Agents durables/MCP](LECONS-PONTS/03-agents-durables-mcp.md) ; avant un assistant de dépôt, étudier [10 : GraphRAG/code graph](LECONS-PONTS/10-graphrag-code-graph.md).

**Gate IA :** tu dois être capable de séparer retrieval, génération et post-traitement ; versionner les jeux d'évaluation ; appliquer les droits côté serveur ; faire échouer un test sur une régression injectée ; expliquer où l'IA peut se tromper.

## Niveau 3 : Routes spécialisées

| Projet                                                        | Parcours spécifique avant démarrage                                                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [01 : Tour de Contrôle](01-tour-de-controle.md)               | G0 + Observabilité + SLO + DevOps/SRE + [pont 11 : Tests de charge HTTP](LECONS-PONTS/11-tests-de-charge-http.md) et baseline locale.                   |
| [02 : Tribunal des IA](02-tribunal-des-ia.md)                 | G0 + tests/CI + produit IA de référence + leçon-pont 02.                                                                                                |
| [03 : RAG Blindé](03-rag-blinde.md)                           | G0 + données/sécurité + Route IA + pont 01 + projet 02 `PASS`.                                                                                          |
| [04 : Chef d'Orchestre](04-chef-orchestre-modeles.md)         | G0 + async/observabilité/coûts + Route IA + pont 07 + projet 02 `PASS`.                                                                                 |
| [05 : Agents Increvables](05-agents-increvables.md)           | G0 + DB/transactions/queues + sécurité + Route IA + pont 03 + projet 02 `PASS`.                                                                         |
| [06 : Mini-Heroku](06-mini-heroku.md)                         | G0 + Linux/Git + [Docker Basics](../06-ANNEXES/29_toolchain/06-docker_basics.md) + Cloud Foundations + Quality Shield + Platform Engineering + pont 08. |
| [07 : Coffre Imprenable](07-coffre-imprenable.md)             | G0 + HTTP + pont 12 (IP/ports/DNS/TCP/TLS) + preuve `NETWORK-REQUEST-JOURNEY.md` + architecture Cloud + TLS/authz/secrets + Quality Shield + pont 06.   |
| [08 : Zéro Réseau](08-zero-reseau.md)                         | G0 + DB/transactions + async/concurrence + client optionnel + leçon-pont 05.                                                                            |
| [09 : CrazyDB](09-crazydb.md)                                 | Structures/algorithmes + runtime/fichiers + concurrence + DB + Distributed Arena + pont 09 validé `READY` en Go **ou** Rust + pont 04.                  |
| [10 : Staff Engineer de Poche](10-staff-engineer-de-poche.md) | G0 + Route IA complète + projets 02 et 03 validés `PASS` + ADR/review + leçon-pont 10.                                                                  |

## Leçons-ponts disponibles

| Pont                                                                          | Ce qu'il t'apprend                                                                                 | Projet principal        |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------- |
| [01 : RAG/recherche hybride](LECONS-PONTS/01-rag-recherche-hybride.md)        | Chunking, BM25, embeddings, fusion, reranking, métriques retrieval et ACL.                         | RAG Blindé              |
| [02 : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md)              | Dataset, labels, métriques, calibration du juge et régressions.                                    | Tribunal des IA         |
| [03 : Agents durables/MCP](LECONS-PONTS/03-agents-durables-mcp.md)            | Tools, MCP, state machine, checkpoint, idempotence et sandbox.                                     | Agents Increvables      |
| [04 : WAL/MVCC/Raft](LECONS-PONTS/04-stockage-wal-mvcc-raft.md)               | Persistance, crash recovery, visibilité transactionnelle et consensus.                             | CrazyDB                 |
| [05 : Local-first/CRDT](LECONS-PONTS/05-local-first-crdt.md)                  | Outbox, synchronisation, conflits, convergence et tombstones.                                      | Zéro Réseau             |
| [06 : Zero Trust/Supply chain](LECONS-PONTS/06-zero-trust-et-supply-chain.md) | Identités, politiques, mTLS, SBOM, signatures et provenance.                                       | Coffre Imprenable       |
| [07 : Gateway LLM](LECONS-PONTS/07-gateway-llm-fiabilite.md)                  | Adaptateurs, quotas, timeouts, retry borné, fallback et coût.                                      | Chef d'Orchestre        |
| [08 : Platform Engineering](LECONS-PONTS/08-platform-engineering-gitops.md)   | Images, releases, GitOps, drift, rollback, ressources et secrets.                                  | Mini-Heroku             |
| [09 : Go ou Rust](LECONS-PONTS/09-langage-systeme-go-rust.md)                 | Parcours de montée en compétence dans **un seul** langage système.                                 | CrazyDB                 |
| [10 : GraphRAG/code graph](LECONS-PONTS/10-graphrag-code-graph.md)            | Graphe de code/documentation, provenance, requêtes et citations.                                   | Staff Engineer de Poche |
| [11 : Tests de charge HTTP](LECONS-PONTS/11-tests-de-charge-http.md)          | Scénario borné, débit, latence, erreurs, saturation et baseline reproductible.                     | Tour de Contrôle        |
| [12 : Fondations réseau](LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md)    | IP, ports, DNS, TCP, TLS, HTTP et trajet de requête ; prérequis enseigné avant le Cloud du Coffre. | Coffre Imprenable       |

## Comment savoir si tu es prêt ?

Avant chaque projet, remplis le gate indiqué dans sa fiche. La décision est binaire sur les prérequis obligatoires :

- `READY` : tu peux expliquer, implémenter et tester les mécanismes indiqués sans copier la solution.
- `NOT READY` : tu retournes aux leçons correspondantes ; tu ne compenses pas une lacune par du code généré.
- `OPTIONAL` : une technologie est un choix d'implémentation, pas une condition d'entrée (ex. Flutter pour Zéro Réseau, fournisseur LLM payant, Kubernetes pour Mini-Heroku).

Le but n'est pas de tout apprendre avant d'écrire une ligne. Le but est d'apprendre **juste assez avant**, de construire une tranche, puis de revenir approfondir dès que le système révèle une limite.

## Ce que ce parcours ne promet pas

Finir les leçons ou obtenir `READY` ne signifie pas être expert de production, SRE, cryptographe, chercheur ML ou Distinguished Engineer. Le gate indique seulement que tu possèdes les bases nécessaires pour commencer le projet ciblé. La profondeur vient des tests, des incidents, des revues et de l'expérience réelle.
