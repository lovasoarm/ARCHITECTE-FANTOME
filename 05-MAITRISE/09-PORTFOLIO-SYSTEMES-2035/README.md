---
stability: evolutif
acte: maitrise
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

# 09 : Portefeuille avancé de systèmes 2035+

> **Un seul projet actif à la fois.** Ce portefeuille est une extension Depth après les prérequis correspondants et selon les besoins du parcours complet ; il ne remplace ni le fil rouge ni les preuves S1–S7. Il appartient à la profondeur de la formation complète ; le CORE de 16 semaines / 192 h n’en est qu’une route facultative.

## Avant de choisir un projet : parcours de préparation obligatoire

**Ne commence pas par le projet le plus impressionnant. Commence par vérifier tes prérequis.** La page [00 : Parcours de préparation et gates d’entrée](00-PARCOURS-PREPARATION.md) indique les leçons exactes à étudier, leur ordre, les preuves attendues et les critères `READY / NOT READY` pour chacun des dix projets.

Chaque fiche projet conserve ses prérequis résumés, mais cette page centrale est la source de vérité pour le parcours complet. Les leçons-ponts de `LECONS-PONTS/` comblent les écarts spécialisés qui ne sont pas développés ailleurs dans AF. Lis-les avant le projet correspondant ; ne saute pas une étape parce que le nom de la technologie te semble familier. Pour le Coffre Imprenable, le pont 12 réseau précède l’architecture Cloud, les cours TLS et le pont 06 Zero Trust : une architecture ne remplace pas l’enseignement de ses prérequis.

**Règle :** lis → pratique sans corrigé → explique → casse volontairement → répare → garde la preuve. Un chapitre terminé n'est pas un gate validé.

## Pourquoi ce portefeuille existe

Les mini-projets actuels forment les mécanismes. Le capstone et les preuves Staff vérifient que tu sais les assembler. Ce portefeuille sert à construire un petit nombre de systèmes assez profonds pour rencontrer les problèmes de production : sécurité des données, récupération, coûts, mesures, régressions, opérations, migration et décisions sous contraintes.

Les dix idées sont gardées parce qu'elles couvrent des familles différentes, pas parce qu'il faut dix projets gigantesques publiables immédiatement. Chaque projet est découpé en **tranches démontrables**. Le niveau de finition doit être proportionnel au besoin, au risque et aux ressources réellement disponibles. La route de préparation est contrôlée par `00-PARCOURS-PREPARATION.md` : une technologie obligatoire doit avoir une leçon préalable et une preuve `READY`, ou être clairement déclarée optionnelle/différée.

## Règles non négociables

1. **Un seul projet Depth en cours.** Pas de parallèle obligatoire. Une fiche peut rester en attente jusqu'à ses prérequis.
2. **Pas de Kubernetes, GPU, cloud payant ou API payante par défaut.** Toute fonctionnalité coûteuse possède une variante locale ou simulée. Les coûts réels ne sont consignés que s'ils ont été mesurés.
3. **Pas de “production-grade” par déclaration.** Il faut un périmètre explicite, des objectifs mesurables, des tests d'échec, une méthode de récupération, des limites reconnues et une revue indépendante.
4. **Sécurité dès la conception.** Les documents, sorties d'outils, prompts, embeddings et caches ne deviennent pas fiables simplement parce qu'ils viennent d'un LLM ou d'un outil.
5. **Ne réécris pas les briques matures sans raison.** CrazyDB est une exception pédagogique ciblée : son moteur maison ne doit jamais remplacer une base de données éprouvée dans un usage réel.
6. **Évite le lock-in.** Les concepts sont obligatoires ; un fournisseur ou une bibliothèque ne l'est pas. Note les versions et revalide les spécifications vivantes.
7. **Chaque projet doit dire ce qu'il ne prouve pas.** Une simulation T0 ne devient jamais une preuve de production T4.
8. **L'IA ne compte pas comme compétence démontrée si l'apprenant ne peut pas expliquer, tester, modifier et diagnostiquer le résultat.**

## Carte du portefeuille

|   # | Projet                                                          | Noyau principal                                    | Priorité                   | Statut dans AF                                 |
| --: | --------------------------------------------------------------- | -------------------------------------------------- | -------------------------- | ---------------------------------------------- |
|  01 | [La Tour de Contrôle](01-tour-de-controle.md)                   | Observabilité, SLO, incidents                      | Fondamental                | Recommandé tôt ; réutilisé partout             |
|  02 | [Le Tribunal des IA](02-tribunal-des-ia.md)                     | Évaluation, régressions, red team                  | Fondamental si systèmes IA | Base de vérification réutilisable              |
|  03 | [RAG Blindé](03-rag-blinde.md)                                  | Recherche hybride, reranking, droits documentaires | Avancé IA                  | Projet IA de référence                         |
|  04 | [Le Chef d'Orchestre des Modèles](04-chef-orchestre-modeles.md) | Gateway LLM, routage, coût, fallback               | Avancé plateforme/IA       | Après un benchmark de base                     |
|  05 | [Les Agents Increvables](05-agents-increvables.md)              | Orchestration durable, MCP, reprise, sandbox       | Avancé système/IA          | Après auth, stockage et observabilité          |
|  06 | [Mini-Heroku](06-mini-heroku.md)                                | Build, déploiement, rollback, GitOps, FinOps       | Avancé plateforme          | Système de plateforme local d'abord            |
|  07 | [Le Coffre Imprenable](07-coffre-imprenable.md)                 | Zero trust, mTLS, politiques, supply chain         | Avancé sécurité            | Contrôles réutilisés dans tous les projets     |
|  08 | [Zéro Réseau](08-zero-reseau.md)                                | Local-first, sync, conflits, CRDT                  | Avancé client/systèmes     | Après persistance et concurrence               |
|  09 | [CrazyDB](09-crazydb.md)                                        | WAL, récupération, MVCC, réplication Raft          | Très avancé systèmes       | Option profondeur majeure, jamais base de prod |
|  10 | [Le Staff Engineer de Poche](10-staff-engineer-de-poche.md)     | Recherche sur code/RFC/ADR, assistant auditable    | Projet intégrateur         | En dernier, sur tes preuves existantes         |

## Ordre conseillé, pas ordre dogmatique

`Tour de Contrôle → Tribunal des IA → RAG Blindé → Chef d'Orchestre → Agents Increvables → Mini-Heroku → Coffre Imprenable → Zéro Réseau → CrazyDB → Staff Engineer de Poche`.

Le Coffre intervient dès le premier projet sous la forme de contrôles de base ; son projet dédié approfondit ensuite l'identité, les politiques et la chaîne d'approvisionnement. CrazyDB peut être déplacé plus tôt ou plus tard selon tes bases en Go ou Rust. Si un prérequis échoue, reviens au module de base au lieu de compenser avec du code généré.

## Les douze leçons-ponts : quoi étudier avant les boss

| Pont                                                                          | Compétence préparée                                                                | Projet concerné         |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------- |
| [01 : RAG et recherche hybride](LECONS-PONTS/01-rag-recherche-hybride.md)     | Chunking, BM25, embeddings, fusion, reranking, métriques et ACL.                   | RAG Blindé              |
| [02 : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md)              | Dataset, labels, tests déterministes, juge calibré et régressions.                 | Tribunal des IA         |
| [03 : Agents durables/MCP](LECONS-PONTS/03-agents-durables-mcp.md)            | State machine, outils, permissions, idempotence, checkpoint et sandbox.            | Agents Increvables      |
| [04 : WAL/MVCC/Raft](LECONS-PONTS/04-stockage-wal-mvcc-raft.md)               | I/O, durabilité, recovery, snapshots, transactions et consensus.                   | CrazyDB                 |
| [05 : Local-first/CRDT](LECONS-PONTS/05-local-first-crdt.md)                  | Stockage local, outbox, sync, conflits, tombstones et convergence.                 | Zéro Réseau             |
| [06 : Zero Trust/Supply chain](LECONS-PONTS/06-zero-trust-et-supply-chain.md) | Identités, mTLS, politiques, secrets, SBOM et provenance.                          | Coffre Imprenable       |
| [07 : Gateway LLM](LECONS-PONTS/07-gateway-llm-fiabilite.md)                  | Adaptateurs, budget, timeout, retry, circuit breaker, cache et fallback.           | Chef d'Orchestre        |
| [08 : Platform Engineering](LECONS-PONTS/08-platform-engineering-gitops.md)   | Image, release, GitOps, drift, rollback, ressources et secrets.                    | Mini-Heroku             |
| [09 : Go ou Rust](LECONS-PONTS/09-langage-systeme-go-rust.md)                 | Toolchain, structures, erreurs, I/O, concurrence et tests dans un langage système. | CrazyDB                 |
| [10 : GraphRAG/code graph](LECONS-PONTS/10-graphrag-code-graph.md)            | AST, graphe de dépendances, provenance et récupération de code.                    | Staff Engineer de Poche |
| [11 : Tests de charge HTTP](LECONS-PONTS/11-tests-de-charge-http.md)          | Scénario de charge HTTP sûr, débit, latence, erreurs, saturation et baseline.      | Tour de Contrôle        |
| [12 : Fondations réseau](LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md)    | IP, ports, DNS, TCP, TLS, HTTP et trajet de requête.                               | Coffre Imprenable       |

## Trois paliers de sortie

### A : Portfolio Engineer

- Un système complet qui répond à un besoin défini et dont le comportement peut être vérifié.
- Tests reproductibles, documentation d'installation, limites explicites et au moins un scénario de panne.
- Une preuve S6 de livraison/exploitation et un dossier d'arbitrage.

### B : Staff Readiness

- Plusieurs dimensions S1–S7 sont étayées par un projet et par des preuves de transfert.
- Au moins une revue externe R1, puis une révision après contradiction.
- Un impact au-delà de son propre code : utilisateurs, pair, petite équipe, open source ou système réellement exploité.
- Le statut ne se déduit pas de la seule réussite des projets du portefeuille.

### C : Distinguished-level Portfolio Review

- Dossier externe, preuves de plusieurs systèmes et résultats suivis dans le temps.
- Décisions réutilisées par d'autres, influence technique et transmission démontrées.
- Revue par plusieurs professionnels indépendants ayant un périmètre de compétence pertinent.
- Cette distinction peut qualifier un **dossier AF** ; elle ne confère pas le grade professionnel Distinguished Engineer d'une entreprise et ne remplace ni l'expérience ni une décision d'embauche/promotion.

## Chaîne de leçons et cohérence entre projets

Le portefeuille ne doit pas devenir dix démos indépendantes. Chaque projet réutilise le même contrat de preuve, mais applique les invariants propres à son domaine :

- [60 : Laboratoire IA de bout en bout](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) relie retrieval, évaluation, ACL, refus, coût et exploitation du service IA ; commence par lui avant RAG Blindé, Chef d'Orchestre ou Agents Increvables.
- [59 : Atelier DevOps/SRE](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) relie artefact, release, observabilité, incident, rollback et restauration ; applique-le à Mini-Heroku et à la Tour de Contrôle.
- [61 : Pack d'exercices systèmes](../../06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md) propose des problèmes transversaux ; le [62 : Fiche de preuve d'apprentissage](../../06-ANNEXES-TRANSVERSES/62-FICHE-APPRENTISSAGE-PREUVE.md) impose explication, test, contre-exemple et transfert.

Les ponts spécifiques restent dans `LECONS-PONTS`. Applique la leçon-pont avant le projet, le projet ensuite, puis reviens au pont si une hypothèse échoue. Pour les projets IA 03, 04, 05 et 10, le projet 02 : Tribunal des IA doit d'abord être `PASS` ; pour Mini-Heroku, Docker Basics précède le pont 08 ; pour CrazyDB, le pont 09 doit être `READY` dans une seule voie Go/Rust. Un projet réussi sans capacité à expliquer, déboguer et modifier le système n'est pas une preuve de maîtrise.

## Sources de référence vivantes

Lire [55 : Références techniques vivantes](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md). Le dépôt enregistre les sources de départ ; avant un usage réel, vérifier la version en vigueur et les consignes de sécurité actuelles.

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

## Ancrage produit / terrain : Kintana

Les projets peuvent réutiliser Kintana comme contexte métier commun, mais chacun possède son propre périmètre et ses critères de sortie. Les données d'exemple sont synthétiques ; étiquette `LAB` ou `SIMULATION` tant qu'un système n'est pas réellement utilisé. Le parcours de préparation est détaillé dans [00 : Parcours de préparation](00-PARCOURS-PREPARATION.md).
