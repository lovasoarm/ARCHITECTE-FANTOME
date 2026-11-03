---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/03-agents-durables-mcp.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/03-agents-durables-mcp.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 03 : Agents durables, outils et MCP

> **Arc Naruto :** un agent n'est pas le Hokage. C'est un Genin qui propose des actions ; le village (ton backend) garde les clés, les permissions et le droit de dire non.

<!-- AF-DIAGRAM:agents -->

## Repère visuel utile : État durable d’un agent

```text
Demande -> Orchestrateur -> état/checkpoint
                 |
              modèle
                 |
          proposition d'outil
                 |
     identité + ACL + validation
          | autorisé
          v
       outil/MCP -> résultat -> journal
                 ^               |
                 +--- reprise ---+
```

<!-- AF-LESSON-PROFILE: agents -->

## Résultat attendu

Concevoir un agent comme un workflow contrôlé : état persistant, appels d'outils validés, permissions minimales, reprise après crash et audit. Expliquer le rôle de MCP sans le confondre avec une autorisation.

## Pourquoi une boucle d'agent ne suffit pas

Une boucle `observe → think → act` peut fonctionner dans une démo puis perdre son état au redémarrage, répéter un paiement ou exécuter un outil non autorisé. Un système durable sépare le modèle probabiliste du moteur qui décide si une action est permise.

```text
Demande utilisateur
       |
       v
Orchestrateur / machine à états -----> Journal durable + checkpoint
       |                                      ^
       v                                      |
Plan proposé par le modèle                    |
       |                                      |
Validation schéma + identité + ACL             |
       | autorisé                              |
       v                                      |
Tool broker -> MCP / outil borné -> résultat -+
       |
Audit + quota + confirmation si effet sensible
```

## Notions à maîtriser

- **Tool calling** : le modèle émet une demande structurée ; le serveur valide nom d'outil, schéma, identité, portée, budget et état avant exécution.
- **MCP** : protocole/contrat d'interaction entre clients et serveurs d'outils ou de contexte. Il facilite l'interopérabilité ; il ne garantit ni l'identité de l'utilisateur, ni l'autorisation, ni le sandboxing.
- **Machine à états** : par exemple `PENDING → RUNNING → WAITING_APPROVAL → SUCCEEDED/FAILED/CANCELLED`. Les transitions invalides doivent être impossibles ou rejetées.
- **Checkpoint** : état minimal persisté pour reprendre après panne. Il doit distinguer action demandée, action envoyée, effet confirmé et résultat enregistré.
- **Idempotence** : une reprise ne doit pas produire deux fois le même effet. La clé, la portée, la durée et le comportement du destinataire doivent être documentés.
- **Outbox/queue** : séparer transaction métier et livraison asynchrone sans perdre silencieusement l'événement.
- **Sandbox** : isoler fichiers, réseau, CPU, mémoire, temps, processus et dépendances selon le risque. Le prompt n'est pas une sandbox.
- **Human-in-the-loop** : exiger une confirmation explicite pour les opérations coûteuses, irréversibles ou exposées à un tiers.

## Quand l'utiliser / quand l'éviter

Utilise un agent si une tâche comporte plusieurs étapes réelles, des décisions variables et des outils que l'utilisateur a intérêt à déléguer. Un workflow déterministe est préférable quand les étapes sont fixes. Évite l'agent autonome pour une opération irréversible sans garde-fou humain ou compensation testée.

## Limites

MCP n'est pas une politique d'autorisation. Une clé d'idempotence ne rend pas atomique un système externe qui l'ignore. Un checkpoint ne prouve pas qu'un effet externe a eu lieu. Les résumés mémoire peuvent être faux ou obsolètes. Une sandbox mal configurée n'est qu'une boîte en carton.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [Async](../../../01-CADRAGE/02-ASYNC/README.md), [AbortController](../../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md) et [Backpressure](../../../01-CADRAGE/02-ASYNC/04A-backpressure.md).
- [Transactions et idempotence : Lab 65](../../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md).
- [Queues](../../02-SCALABILITY/08-message_queues.md), [primitives distribuées](../../02-SCALABILITY/03-distributed_primitives.md) et [résilience](../../02-SCALABILITY/10-c_tests_de_resilience.md).
- [Authz/RBAC](../../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md), [secrets](../../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md), puis [66 : Lab sécurité](../../../06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md).
- [Leçon-pont 07 : Gateway LLM](07-gateway-llm-fiabilite.md) et [Laboratoire IA 60](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : agent support Kintana

Construis un agent qui peut lire le statut d'une demande et préparer une réponse. Au départ, il ne peut ni rembourser, ni annuler, ni modifier. Persiste les étapes, simule un crash après l'appel de l'outil mais avant l'enregistrement du résultat, puis redémarre.

**Livrable :** machine à états, contrat de chaque outil, matrice permissions, journal/checkpoints, clés d'idempotence, tests de reprise, journal d'audit, threat model et kill switch.

**Critère de sortie :** un crash/retry ne crée pas de doublon ; un outil non autorisé est refusé côté serveur ; un document hostile ne peut pas élargir les permissions ; une personne tierce comprend qui a demandé et exécuté chaque action.

## Transfert obligatoire

Le serveur MCP devient indisponible après avoir reçu une commande, mais avant que l'agent reçoive la réponse. Détermine ce qui est connu, inconnu et sûr à retenter. Ne suppose pas que le timeout signifie « rien ne s'est passé ».

## Références de projet

[05 : Agents Increvables](../05-agents-increvables.md) · [MCP : références vivantes](../../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).
