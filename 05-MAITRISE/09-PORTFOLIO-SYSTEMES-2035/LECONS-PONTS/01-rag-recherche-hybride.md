---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 01 : RAG et recherche hybride : retrouver avant de répondre

> **Arc DBZ :** le LLM est Goku en Super Saiyan. Mais si tu lui donnes le mauvais parchemin, il va défendre une absurdité avec une confiance olympique. La première mission n'est donc pas de générer : c'est de retrouver la bonne preuve.

<!-- AF-DIAGRAM:ai -->

## Repère visuel utile : Pipeline retrieval avant génération

```text
Corpus -> chunks -> index lexical ----+
                 -> embeddings/vector --+-> fusion -> rerank
Question -> query ----------------------+             |
                                                     ACL
                                                      |
                                              contexte + citations
                                                      |
                                                   réponse
```

<!-- AF-LESSON-PROFILE: ai -->

## Résultat attendu

À la fin, tu peux construire et mesurer un retriever lexical, un retriever vectoriel puis une combinaison hybride. Tu sais expliquer le chunking, les embeddings, le reranking, les métriques et les droits documentaires. Tu peux aussi prouver quand une extension n'apporte rien.

## Pourquoi cette brique existe

Un RAG (Retrieval-Augmented Generation) cherche des passages utiles, les transmet à un modèle puis construit une réponse à partir de ce contexte. Si la recherche rate le bon document, le modèle ne peut pas inventer une preuve fiable.

```text
Documents -> découpage -> index lexical ----+
                         -> embeddings -> index vectoriel --+-> fusion
Question -> normalisation -> recherche ---------------------+    |
                                                               candidats
                                                                  |
                                                              reranking
                                                                  |
                                                        filtre ACL + contexte
                                                                  |
                                                         génération + citations
```

## Les notions à apprendre, dans l'ordre

### 1. Préparer les documents

- **Ingestion** : extraire texte et métadonnées depuis une source connue ; conserver identifiant, version, propriétaire, classification et statut.
- **Chunking** : découper en passages qui gardent assez de contexte. Un chunk trop court perd les relations ; un chunk trop long dilue la recherche et gonfle le contexte.
- **Normalisation** : traiter accents, casse, espaces, références, codes et langues sans détruire les identifiants exacts.

### 2. Recherche lexicale

BM25 classe des documents selon la présence et la rareté des termes, avec une normalisation de longueur. C'est utile pour noms exacts, numéros, références et termes métier. Ça comprend mal les paraphrases si le vocabulaire diffère.

### 3. Recherche vectorielle

Un modèle d'embedding transforme un texte en vecteur. Une mesure comme le cosinus compare la direction de deux vecteurs (proximité sémantique approximative). Les embeddings aident sur les paraphrases, mais peuvent rater négations, chiffres, codes ou petites différences métier. Les modèles, dimensions et paramètres doivent être versionnés ensemble.

### 4. Fusion et reranking

- **Recherche hybride** : combine les résultats lexicaux et vectoriels. Commence par Reciprocal Rank Fusion (RRF) ou une règle simple documentée ; n'invente pas un score commun si les échelles ne sont pas comparables.
- **Reranker** : réévalue les candidats avec une fonction/modèle plus coûteux. Il ne peut pas récupérer un résultat absent des candidats.
- **Baseline** : garde toujours le retriever lexical de départ afin de mesurer si l'hybride fait mieux sur les cas annotés.

### 5. Mesurer le retrieval séparément

Crée un dataset de requêtes avec les documents pertinents attendus. Calcule `Recall@k` (combien de documents pertinents sont retrouvés), `MRR` (rang du premier résultat pertinent) ou `nDCG` (qualité de l'ordre lorsque les labels sont gradués). N'utilise que les métriques cohérentes avec tes labels.

### 6. Sécurité avant génération

Les filtres de tenant, propriétaire, groupe et révocation s'appliquent côté serveur **avant** d'exposer les passages au modèle. Vérifie aussi les caches, snippets, citations, logs, résumés et suppressions. Un prompt ne remplace jamais une ACL.

## Quand l'utiliser / quand l'éviter

Utilise un RAG si la réponse doit s'appuyer sur un corpus changeant ou privé et si la recherche peut être évaluée. Évite-le si quelques règles déterministes ou une requête SQL suffisent. Commence par la recherche lexicale avant d'ajouter un vector store, un reranker ou un graphe.

## Limites

- Une proximité vectorielle n'est pas une vérité sémantique.
- Un bon Recall@k ne garantit pas une bonne réponse finale.
- Un reranker ajoute latence, coût et une nouvelle source d'erreur.
- L'index peut être obsolète après modification/révocation.
- Les métriques dépendent du corpus et des requêtes annotées ; elles ne prédisent pas tous les usages.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire avant le projet

- [SQL et modélisation des données](../../01-DATABASES/README.md).
- [HTTP/REST et API](../../../02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md) et [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md).
- [Authentification et autorisation](../../../02-CONSTRUCTION/18-WEB-CONCEPTS/06-auth_authz.md) puis [RBAC/ABAC/IDOR](../../../03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md).
- [Laboratoire IA 60](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), puis le [produit IA de référence](../../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/09-PARCOURS-LECTURE-APPRENANT.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : Kintana FAQ

Construis un corpus synthétique de 30 à 100 documents approuvés et au moins 20 questions annotées. Compare lexical, vectoriel et hybride ; ajoute un test de source révoquée, un tenant A/B, une question sans réponse et une source contradictoire.

**Livrable :** corpus versionné, manifeste de chunks, baseline lexicale, rapport Recall@k/MRR ou nDCG, choix de fusion, rapport d'erreurs et tests ACL.

**Critère de sortie :** tu peux montrer une requête ratée, diagnostiquer à quelle étape elle se perd, justifier les paramètres et prouver qu'un utilisateur ne peut jamais récupérer un passage non autorisé.

## Transfert obligatoire

Le corpus double de taille et un document est révoqué pendant qu'un cache est chaud. Explique quelle partie se dégrade, comment tu mesures la fraîcheur et comment tu garantis la révocation.

## Références de projet

[60 : Laboratoire IA de bout en bout](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) · [03 : RAG Blindé](../03-rag-blinde.md).
