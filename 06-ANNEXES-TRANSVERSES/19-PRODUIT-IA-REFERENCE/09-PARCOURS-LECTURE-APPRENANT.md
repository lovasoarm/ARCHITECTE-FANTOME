---
stability: evolutif
acte: apprendre
noyau: renfort
route: formation-complete
---

# Parcours de lecture apprenant : comprendre `retrieval-gateway`

> Lis ce fichier après les bases HTTP, tests, fonctions et authentification. Son but est d'apprendre à lire et modifier un service IA existant, pas de recopier sa forme ni d'obtenir une étiquette « production ».

## Comment travailler

Pour chaque étape, ouvre le code et ses tests. Prédire le résultat avant de lancer les tests ; après observation, expliquer tout écart. Une réponse « les tests passent » est incomplète tant que tu ne sais pas quel défaut chaque test détecterait, lequel il ne détecterait pas et comment tu le falsifierais.

## Étape 1 : Corpus et contrat de données

**Lire :** `data/knowledge.json`, puis `src/server.mjs` dans `loadKnowledge()`.

**Comprendre :** un document possède au minimum un identifiant, un texte et un tenant. Les identifiants sont vérifiés dans la portée du tenant ; le corpus est une entrée de confiance limitée au dépôt de labo, pas une base documentaire multi-utilisateur.

**Exercices :**

1. Crée un document invalide (ID vide, texte vide, tenant manquant, paire tenant/ID dupliquée). Prédire si le chargement doit échouer, puis vérifier.
2. Ajoute deux documents ayant le même ID dans deux tenants différents. Justifie la portée de l'unicité.
3. Décris quelles métadonnées seraient nécessaires avant d'utiliser un corpus documentaire réel : provenance, version, classification, ACL, fraîcheur, licence et révocation.

**Critère :** distinguer la validation de la fixture locale d'une validation de gouvernance des données réelles.

## Étape 2 : Le retriever lexical avant le modèle

**Lire :** `src/retriever.mjs` et `src/retriever.test.mjs` ; lancer ensuite `src/cli.mjs` sur des questions connues et inconnues.

**Comprendre :** le code normalise/tokenise la requête, compte les tokens dans les documents, calcule un score lexical simplifié, applique une pénalité de longueur puis trie les résultats. Cette baseline est explicable et déterministe ; ce n'est ni BM25 complet, ni embedding sémantique, ni une preuve de pertinence générale.

**Exercices :**

1. Calcule à la main le score relatif de deux documents courts pour une requête de deux mots.
2. Ajoute une requête contenant une négation. Explique pourquoi un score lexical positif peut quand même retourner un passage de sens opposé.
3. Ajoute un ID exact, une faute de frappe, un synonyme et une question hors corpus. Note le comportement séparément.
4. Écris un test qui échoue si le tri des égalités devient non déterministe.

**Critère :** décrire les classes d'erreurs du retrieval, pas simplement dire qu'une réponse est bonne ou mauvaise.

## Étape 3 : Le client LLM est une frontière externe

**Lire :** `src/llm_client.mjs` et `src/llm_client.test.mjs`.

**Tracer :**

`configuration → validation endpoint → timeout → requête HTTP → validation statut/type/taille/JSON → extraction réponse → mode live ou dégradé`.

**Exercices :**

1. Simule un fournisseur qui attend au-delà du timeout ; vérifie la voie dégradée et l'absence de blocage indéfini.
2. Retourne un content-type inattendu, un JSON invalide, une réponse vide puis une réponse trop volumineuse. Chaque cas doit avoir un comportement observable et un test.
3. Compare le mode déterministe local au mode live simulé. Explique pourquoi les deux sont utiles à l'apprentissage, mais ne prouvent pas les mêmes propriétés.
4. Trouve ce que le code ne peut pas garantir avec un faux transport : disponibilité réelle du fournisseur, politique de conservation, facturation réelle, sémantique exacte de son modèle et qualité sur un corpus de production.

**Critère :** ne pas traiter le fallback comme une réponse LLM validée. Il fournit des extraits à vérifier, pas une vérité certifiée.

## Étape 4 : Le serveur applique l'identité avant le retrieval

**Lire :** `createAppServer()`, la route `/v1/query`, `secureTokenMatches()`, `readJsonBody()` et `readRuntimeConfig()` dans `src/server.mjs`. Puis lire les cas d'intégration dans `src/server.test.mjs`.

**Tracer une requête :**

1. limite de taille / parsing ;
2. route et authentification ;
3. identité tenant fixée côté serveur ;
4. sélection des documents autorisés ;
5. retrieval sur ce sous-ensemble ;
6. abstention si aucun passage n'est trouvé ;
7. construction du contexte et appel générateur ;
8. réponse JSON et log d'événement minimal.

**Exercices :**

1. Appelle l'API sans token, avec mauvais token, corps invalide, question trop longue, tenant sans documents et question sans hit. Pour chaque cas, écris code HTTP, raison et effet attendu.
2. Tente de passer un `tenantId` dans le JSON utilisateur. Vérifie qu'il ne remplace pas l'identité fixée côté serveur.
3. Ajoute un document d'un autre tenant, puis tente de le retrouver avec une question qui le nomme exactement. Aucun contenu interdit ne doit atteindre le contexte générateur.
4. Trace les données sensibles potentielles. Vérifie que question, token et texte documentaire ne sont pas écrits dans les logs structurés actuels.

**Limite à mémoriser :** le tenant configuré et le bearer token unique illustrent une frontière de labo. Ils ne constituent pas un système d'identité, d'autorisation granulaire ou de révocation multi-utilisateur complet.

## Étape 5 : Interpréter l'évaluation sans exagérer

**Lire :** `eval/cases.json`, `eval/run.mjs`, `eval/load.mjs`, `05-GABARIT-EVALUATION-IA.md`, `06-MATRICE-EVALUATION-IA-SECURITE.md` et `08-RELEASE-GATES.md`.

`eval/run.mjs` mesure la recherche sur un jeu réduit : HitRate@3 et MRR@3 pour les cas positifs, et exactitude séparée sur les cas sans résultat. Il imprime aussi les hashes des fixtures. Le hash permet de vérifier les octets testés ; il ne prouve pas la représentativité des cas.

**Exercices :**

1. Ajoute une requête et ses documents attendus _avant_ de modifier le retriever. Documente le label.
2. Introduis une régression qui déplace un résultat pertinent hors du top-3. Vérifie que le smoke test échoue.
3. Ajoute un cas no-hit, une négation, un doublon quasi-identique, un document contradictoire et un cas multilingue.
4. Crée un dataset de développement pour modifier la méthode et garde le test final séparé. Explique ce qui serait une fuite entre les deux.
5. Pour chaque cas de la matrice de sécurité, étiquette `implémenté + testé`, `test à écrire`, `hors périmètre` ou `exige validation externe`. Ne transforme jamais une ligne de matrice en preuve d'exécution.

**Critère :** séparer qualité de retrieval, qualité de génération, fidélité des citations, respect des droits, latence, coût et comportement en panne.

## Étape 6 : Travail de modification guidée

Effectue les changements dans cet ordre pour réduire le risque de casser plusieurs invariants à la fois :

1. Ajouter d'abord un test qui reproduit le défaut.
2. Modifier le composant le plus étroit possible.
3. Exécuter les tests du composant, puis les tests API et l'évaluation.
4. Comparer la baseline et le résultat ; noter les régressions de sous-groupe.
5. Faire relire ton diff par un autre apprenant, ou défendre toi-même chaque ligne si tu étudies seul.

Variantes à choisir selon les besoins : amélioration de la tokenisation, score lexical, limite de réponse, validation du schéma, configuration, métrique additionnelle, refus/abstention ou cas adversarial. Ne commence pas par remplacer le retriever ou l'architecture complète : chaque changement doit répondre à une faiblesse observée.

## Examen à livre fermé

Sans lire tes notes :

1. trace une requête depuis le socket HTTP à la réponse ;
2. explique comment le code empêche un tenant d'accéder au corpus d'un autre dans le contexte actuel ;
3. donne trois défaillances que le code détecte et trois qu'il ne prouve pas prévenir ;
4. explique comment distinguer un défaut de retrieval d'un défaut de génération ;
5. propose et exécute une régression qui devrait faire échouer un test ;
6. décris la prochaine expérience qui changerait ta décision sur la qualité du service.

**Gate :** tout accès inter-tenant ou contournement d'une limite est un échec critique ; un score de retrieval vert ne le compense pas. Si l'apprenant ne peut pas tracer le flux ou modifier le code sans copier, il doit refaire les étapes 2–5.

## Passage vers le projet complet

Après cette lecture, enchaîne sur [60 : Laboratoire IA de bout en bout](../60-LAB-SERVICE-IA-END-TO-END.md), puis [RAG Blindé](../../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/03-rag-blinde.md). Le premier fait pratiquer la chaîne globale ; le second transforme ces mécanismes en projet plus complet. Aucun des deux ne prouve à lui seul une sécurité de production universelle.
