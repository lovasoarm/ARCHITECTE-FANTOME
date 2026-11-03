---
stability: evolutif
acte: maitrise
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

# 05 : Les Agents Increvables

> Orchestrateur d’agents avec MCP, mémoire contrôlée, reprise après crash et sandbox.

**Place dans le parcours :** Avancé : automatisation gouvernée, jamais autonomie illimitée.  
**Prérequis :** DB/transactions, API/tool calling, permissions, queue/task lifecycle, observabilité, [Leçon-pont 02 : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md) et [Tribunal des IA](02-tribunal-des-ia.md) terminé avec un verdict `PASS` traçable. La leçon-pont 02 seule ne remplace pas le projet d'évaluation.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

- [Async](../../01-CADRAGE/02-ASYNC/README.md), [AbortController](../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md), [backpressure](../../01-CADRAGE/02-ASYNC/04A-backpressure.md).
- [Bases de données](../01-DATABASES/README.md), [Lab 65 : transactions/idempotence](../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md), [queues](../02-SCALABILITY/08-message_queues.md), [résilience distribuée](../02-SCALABILITY/10-c_tests_de_resilience.md).
- [RBAC/ABAC](../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md), [secrets](../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md), [Leçon-pont 03 : Agents durables/MCP](LECONS-PONTS/03-agents-durables-mcp.md) et [07 : Gateway LLM](LECONS-PONTS/07-gateway-llm-fiabilite.md).

**Gate d'entrée :** le [Tribunal des IA](02-tribunal-des-ia.md) est validé `PASS` ; tu peux aussi dessiner une machine à états persistante, gérer un doublon avec idempotence, reprendre après crash, vérifier une permission côté serveur et expliquer ce qui est inconnu après un timeout. MCP seul ne valide pas ce gate. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-2--route-ia).

## Mission

Créer un orchestrateur qui peut reprendre un travail interrompu sans le dupliquer, demander une autorisation avant une action sensible et limiter l’impact d’un agent mal guidé ou compromis.

## Version de départ : obligatoire

- [ ] Modéliser chaque tâche par un état durable : queued, running, awaiting_approval, succeeded, failed, cancelled. Interdire les transitions invalides.
- [ ] Persister objectif, étapes, résultats, tool calls, version de configuration et checkpoints ; définir durée de conservation et suppression de mémoire.
- [ ] Ajouter idempotency keys, timeouts, retries bornés, déduplication, compensation/rollback quand possible et reprise après kill du processus.
- [ ] Exposer les outils via une interface explicite ; MCP est un protocole de transport/contrat, pas une politique de confiance ou d’autorisation en soi.
- [ ] Exécuter les outils avec permissions minimales, liste d’outils autorisés, limites de fichiers/réseau/CPU/temps et sandbox adaptée au risque. Ne pas compter sur le prompt système comme frontière de sécurité.
- [ ] Exiger confirmation humaine pour actions irréversibles ou externes ; journaliser qui a demandé, autorisé et exécuté l’action.
- [ ] Traiter les documents et sorties d’outils comme données non fiables ; limiter la profondeur des boucles, le budget et les appels parallèles.

## Extensions Depth : une à la fois

- [ ] Queue durable avec lease/heartbeat et reprise d’un worker mort ; documenter la fenêtre de duplication possible.
- [ ] Mémoire en trois classes : état de tâche vérifiable, préférences utilisateur contrôlables et résumé généré non fiable. Suppression et export doivent marcher.
- [ ] Expérimenter un protocole MCP récent en l’épinglant dans le lockfile/documentation ; garder l’application protégée si le protocole ou le SDK change.
- [ ] Red-team de l’injection indirecte via documents, sortie d’outil, faux message système et outil trop permissif.

## Tests d’acceptation

- [ ] Crash après exécution d’un tool mais avant persistance du résultat : pas de double effet non compensé ; la garantie et la limite sont explicites.
- [ ] Un agent ne peut lire ou écrire hors de son sandbox, appeler un outil non autorisé ou dépasser les plafonds de ressources.
- [ ] Une action sensible passe par un vrai contrôle serveur/outillage, pas une simple instruction dans le prompt.
- [ ] Les tentatives d’injection ou de fuite produisent une trace utile et un refus/isolement mesurable ; ne jamais exposer de vraies clés pendant le red team.

## Chaîne pédagogique

Avant d’implémenter la reprise durable, réalise les expériences de timeout, effet externe, retry et refus du [60 : Laboratoire IA](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) puis les exercices d’idempotence du [61 : Pack systèmes](../../06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md). Les outils restent des autorités séparées du modèle.

## Dossier de preuves attendu

Diagramme de machine à états, schéma de journal/checkpoint, politique de permissions, sandbox, enregistrement d’audit, rapport de crash recovery, dataset agent eval, SLO et kill switch.

## Hors périmètre et limites

Ne pas construire un agent qui exécute librement le shell ou les changements de production. Le parcours démontré est gouverné, borné, révocable et observable.

## Ponts vers AF

[Leçon : Agents durables & MCP](LECONS-PONTS/03-agents-durables-mcp.md), [Gouvernance autonome](../08-MAITRISE-STAFF-ENGINEER/10-AUTONOMOUS-SYSTEM-GOVERNANCE.md), [Spécification agentique](../08-MAITRISE-STAFF-ENGINEER/07-SPECIFICATION-AGENTIQUE.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
