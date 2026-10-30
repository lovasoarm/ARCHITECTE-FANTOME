---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 01 : RAG et recherche hybride

## Résultat attendu

À la fin, tu peux expliquer pourquoi un RAG a plusieurs points de défaillance distincts : ingestion, découpage, indexation, retrieval, fusion, reranking, construction de contexte, génération et citation. Tu sais mesurer au moins la phase de retrieval indépendamment de la réponse finale.

## Modèle minimal

- La recherche lexicale trouve bien les termes exacts, noms, codes et identifiants ; elle dépend de l'analyse du texte et de l'index.
- La recherche vectorielle rapproche des contenus selon une représentation apprise ; elle peut ignorer des identifiants exacts, les négations ou des distinctions fines.
- La recherche hybride combine les signaux. Une méthode de fusion comme Reciprocal Rank Fusion peut aider à fusionner des classements, mais ses paramètres doivent être évalués sur des requêtes représentatives.
- Un reranker réordonne un ensemble candidat. Il ne récupère pas un document qui n'a jamais été candidat et peut ajouter de la latence/coût.
- Le générateur ne transforme pas un retrieval mauvais en bonne preuve. Il faut mesurer séparément la récupération et la qualité finale.

## Exercice

Créer un corpus de 30–100 documents non sensibles et 20 requêtes annotées avec les documents pertinents. Inclure des noms exacts, questions conceptuelles, synonymes, négations, requêtes impossibles et documents contradictoires.

1. Faire une baseline lexicale.
2. Faire une baseline vectorielle.
3. Fusionner les résultats.
4. Ajouter le reranking seulement après avoir mesuré la baseline.
5. Calculer recall@k et au moins une métrique de classement (MRR ou nDCG) si les labels le permettent.
6. Examiner manuellement les cinq erreurs les plus impactantes.

## Sécurité des accès

Chaque document possède owner/tenant, groupes, classification, version et état de révocation. Les droits doivent s'appliquer au moment du retrieval sur le serveur. N'utilise pas un prompt “ignore les documents interdits” comme contrôle d'accès. Vérifie aussi caches, citations, snippets, logs et index de résumés.

## Critère de sortie

Tu peux montrer une amélioration ou prouver que l'extension ne vaut pas son coût ; tu peux expliquer pourquoi un document pertinent a été perdu, pourquoi une réponse doit s'abstenir et comment une révocation devient effective.

## Chaîne avec le projet

Applique cette leçon dans [60 : Laboratoire IA de bout en bout](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), qui sépare les évaluations du retrieval, de la génération, des permissions et de l'exploitation. Ne passe au projet [RAG Blindé](../03-rag-blinde.md) qu'après avoir conservé une baseline et un dataset annoté.

## Références

- [Ragas : métriques disponibles](https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/)
- [OWASP GenAI : risques RAG/vector embeddings](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/)
