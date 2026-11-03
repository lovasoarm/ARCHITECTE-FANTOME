---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/07-gateway-llm-fiabilite.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/07-gateway-llm-fiabilite.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 07 : Construire un gateway LLM fiable

> **Arc DBZ :** tu ne demandes pas à Vegeta, Gohan et Piccolo de se battre avec la même technique. Mais ton application doit parler à chaque modèle sans exposer les données ni exploser le budget.

<!-- AF-DIAGRAM:gateway -->

## Repère visuel utile : Gateway multi-fournisseurs

```text
Use case -> contrat interne -> policy tenant/données/budget
                                    |
                                   routeur
                             /       |       \
                         modèle A  modèle B  stub
                             \       |       /
                              métriques + résultat validé
```

<!-- AF-LESSON-PROFILE: gateway -->

## Résultat attendu

Créer une frontière fournisseur avec contrats/adaptateurs, routage explicable, timeouts, retries bornés, circuit breaker, quotas, mesure de coût et fallback sûr.

## Pourquoi un gateway ?

Sans couche d'intégration, les appels au fournisseur se dispersent dans le code métier. Chaque changement de modèle casse plusieurs modules, les erreurs sont traitées différemment et le coût devient invisible.

```text
Use case
   |
   v
Contrat interne stable
   |
   +--> policy données / tenant / budget
   |
   v
Router (capacité + confidentialité + qualité + coût)
   |
   +--> Provider A
   +--> Provider B / modèle local
   +--> Stub déterministe
   |
   v
Normalisation / validation / métriques
```

## Notions à maîtriser

- Contrat interne et adaptateurs : normaliser ce qui peut l'être sans effacer streaming, sortie structurée ou limites propres au fournisseur.
- Timeout : borne la durée d'attente ; l'appel distant peut malgré tout avoir été exécuté.
- Retry : retenter seulement les erreurs transitoires, avec nombre maximal, backoff et jitter. Le retry d'une opération non idempotente peut doubler l'effet.
- Circuit breaker : arrêter temporairement les appels à un fournisseur qui échoue, puis sonder sa reprise.
- Fallback : vérifier que le fournisseur de secours possède la même classification de données et les capacités nécessaires. Si aucun fournisseur n'est autorisé, échouer proprement.
- Token budget : mesurer les tokens d'entrée/sortie ou une approximation explicitement étiquetée. Le nombre de tokens dépend du tokenizer et du modèle.
- Cache : commencer par le cache exact. Le cache sémantique exige des règles strictes d'ACL, de tenant, de version, de modèle, de prompt et d'invalidation.
- Routage : justifier une décision par exigences, qualité observée, coût, latence et confidentialité, jamais par popularité seule.

## Quand l'utiliser / quand l'éviter

Un gateway se justifie quand plusieurs cas d'usage partagent des exigences de gouvernance, de coût, de fiabilité ou de fournisseur. Pour un prototype avec un seul appel, commence par un adaptateur simple. N'ajoute pas un routeur intelligent avant d'avoir une baseline et deux options réellement utiles.

## Limites

Un gateway ne rend pas les modèles équivalents. Un fallback peut produire une qualité différente. Les coûts des fournisseurs évoluent. Une réponse en cache peut devenir obsolète. Un timeout n'annule pas forcément l'inférence distante.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [HTTP/API](../../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md), [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md), [Async](../../../01-CADRAGE/02-ASYNC/README.md), [timeouts/annulation](../../../01-CADRAGE/02-ASYNC/03_async_await/05-c_abort_controller.md).
- [Error handling](../../../01-CADRAGE/04-ERROR-HANDLING/README.md), [rate limiting](../../02-SCALABILITY/07-rate_limiting.md), [observability](../../../03-PILOTAGE/05-OBSERVABILITY/README.md).
- [Model cost](../../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/02-COST.md), [IA lab 60](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), [Évaluation IA 02](02-evaluation-et-llm-judge.md).
- [Secrets](../../../03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md) et [authz](../../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : Chef d'Orchestre Kintana

Ajoute une interface interne et deux adaptateurs : un stub déterministe et un fournisseur facultatif. Implémente timeout, retry borné, circuit breaker, budget par utilisateur, fallback contrôlé et télémétrie. Injecte panne, sortie malformée et budget épuisé.

**Livrable :** contrat et adaptateurs, matrice de routage, politique confidentialité, test harness, rapport coût/latence/qualité, runbook et ADR.

**Critère de sortie :** aucun retry infini ; aucun fallback interdit ; dépassement de budget bloqué ; comportement de panne compréhensible et mesurable.

## Transfert obligatoire

Le fournisseur primaire répond après le timeout. Montre comment tu évites une double facturation/réponse, comment tu traites l'appel tardif et ce qui peut être annulé ou non.

## Références

[04 : Chef d'Orchestre](../04-chef-orchestre-modeles.md) · [références techniques vivantes](../../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).
