---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 03 : RAG Blindé

> Moteur RAG orienté production : recherche hybride, reranking, ACL par document et évaluations.

**Place dans le parcours :** Projet phare IA : le premier système documentaire complet.  
**Prérequis :** API/DB, indexation et requêtes, sécurité/auth, tests ; tribunal IA ; connaissances d’embeddings et de recherche lexicale à acquérir via le pont RAG.

## Mission

Construire un assistant documentaire qui sait retrouver les bonnes sources pour le bon utilisateur, citer ce qu’il utilise, refuser quand la preuve manque et ne pas exposer les documents d’autrui.

## Version de départ : obligatoire

- [ ] Pipeline d’ingestion avec identifiant stable, version, propriétaire, groupes autorisés, date, statut et stratégie de suppression/réindexation.
- [ ] Implémenter une base lexicale (BM25 ou moteur équivalent) et une recherche vectorielle ; les combiner avec une règle de fusion documentée. Ne pas appeler “hybride” un unique vecteur.
- [ ] Ajouter un reranker facultatif après la fusion ; comparer la qualité et le coût sans supposer qu’il améliore toutes les requêtes.
- [ ] Appliquer l’authentification et les droits documentaire avant que le contenu soit fourni au modèle. Les ACL doivent être appliquées au retrieval, pas seulement masquées dans l’interface ou dans le prompt.
- [ ] Répondre avec citations de documents et passages ; inclure abstention si les preuves sont insuffisantes ou les sources contradictoires.
- [ ] Mesurer retrieval (par ex. recall@k, MRR/nDCG si le jeu de labels le permet), qualité de réponse/citations, latence et coût ; utiliser un dataset de requêtes annotées.
- [ ] Tester les suppressions, changements de permissions, contenu empoisonné, prompt injection dans les documents, tentatives de cross-tenant et prompt/cache leakage.

## Extensions Depth : une à la fois

- [ ] Reranking à cross-encoder et comparaison à la fusion RRF ou méthode simple ; conserver un baseline.
- [ ] Ajout de mises à jour incrémentales, ingestion idempotente, détection de doublons et reprise après échec.
- [ ] Test de révocation : un document retiré des droits ne doit plus ressortir dans le retrieval ou la mémoire cache, même si l’index n’est pas immédiatement reconstruit.
- [ ] Comparer le coût/hit utile, pas seulement le temps d’inférence ; ajouter quotas utilisateur et observabilité.

## Tests d’acceptation

- [ ] Une identité A ne peut retrouver, citer, inférer depuis le contexte ou obtenir via le cache le contenu privé B.
- [ ] La suppression/révocation possède une garantie temporelle explicite et vérifiée ; sinon le système invalide immédiatement le contenu obsolète.
- [ ] Une réponse sans source satisfaisante s’abstient selon les règles définies ; les citations correspondent réellement aux sources récupérées.
- [ ] Un lot d’évaluation fixe permet de comparer une version avant/après et d’examiner les régressions, pas seulement de regarder quelques belles réponses.

## Dossier de preuves attendu

Schéma métadonnées/ACL, ADR de retrieval, pipeline de données versionné, set d’évaluation, tests cross-tenant, rapports de retrieval et génération, threat model, runbook et S6 si déployé.

## Hors périmètre et limites

Pas besoin d’un énorme corpus, d’un GPU, d’un graphe ou d’un cluster. Commencer par des documents synthétiques non sensibles. Les ACL, l’actualisation, l’abstention et les métriques passent avant le volume.

## Ponts vers AF

Avant de coder, suis [60 : Laboratoire IA de bout en bout](../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) comme fil d'expérimentation, puis [Leçon : RAG et recherche hybride](LECONS-PONTS/01-rag-recherche-hybride.md) et [Leçon : Évaluation IA](LECONS-PONTS/02-evaluation-et-llm-judge.md). Les deux leçons donnent la mécanique ; le laboratoire impose la mesure de bout en bout. Pour la sécurité et les métriques RAG, commence par [les références techniques vivantes](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
