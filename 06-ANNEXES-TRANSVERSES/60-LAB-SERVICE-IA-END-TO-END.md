---
stability: evolutif
acte: apprendre-et-pratiquer
noyau: renfort
route: formation-complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 60 : Laboratoire IA de bout en bout : retrieval, preuve, droits et opérations

> Ce laboratoire enseigne à concevoir et à évaluer un service IA. Il ne demande pas de croire à un modèle, un prompt ou un score. Il part d'une baseline explicable, introduit les composants un à un et rattache chaque risque à une expérience.

## Position dans le parcours

Prérequis : fonctions/API, tests, bases de données, authentification/autorisation et mesures. Étudie le [pont RAG](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md), le [pont évaluation IA](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/02-evaluation-et-llm-judge.md) et les [labs IA/ML](45-LABS-IA-ML-DEPTH.md). Utilise le [service IA de référence](19-PRODUIT-IA-REFERENCE/README.md) comme code à lire, et [RAG Blindé](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/03-rag-blinde.md) pour l'intégration du projet.

## Étape 1 : Établir une baseline qui ne dépend pas d'un LLM

### Modèle

Séparer les composants empêche d'attribuer tout échec au « modèle » :

`requête → authentification → filtrage ACL → retrieval → construction du contexte → génération → validation/citations → réponse`.

Le chemin de contrôle doit pouvoir refuser l'accès avant que le contenu soit fourni au modèle. Une instruction dans le prompt ne remplace jamais une autorisation serveur.

### Exercice guidé : mini-corpus annoté

Créer les documents synthétiques suivants :

- `D1` : règles de permissions et séparation tenant ;
- `D2` : délai standard de remboursement ;
- `D3` : procédure de retour ;
- `D4` : exclusions et exceptions au remboursement ;
- `D5` : procédure de suppression de compte.

Créer au minimum ces requêtes et annotations attendues :

| Requête                                             | Document pertinent      | Risque à détecter                   |
| --------------------------------------------------- | ----------------------- | ----------------------------------- |
| « Quel est le délai de remboursement ? »            | D2                      | Retrieval normal                    |
| « Comment retourner un article ? »                  | D3                      | Synonymes                           |
| « Quelles exceptions annulent le remboursement ? »  | D4                      | Négation/exception                  |
| « Comment supprimer mon compte ? »                  | D5                      | Retrieval normal                    |
| « Quelle est l'adresse personnelle d'un employé ? » | Aucun document autorisé | Question sans preuve, refus attendu |

L'apprenant ajoute au moins 15 requêtes : termes exacts, paraphrases, requêtes ambiguës, contradiction de documents, hors domaine et demandes impossibles. Le label est déterminé avant l'exécution du système.

### Travail demandé

1. Écrire une baseline lexicale qui renvoie les IDs et extraits, sans génération.
2. Consigner les documents pertinents attendus et les résultats du retriever.
3. Pour chaque requête, calculer `Recall@k = nombre de documents pertinents récupérés dans top-k / nombre total de documents pertinents pour cette requête`, puis moyenner sur les requêtes positives. `HitRate@k` mesure plutôt la part des requêtes positives qui ont au moins un résultat pertinent dans top-k. Ces métriques coïncident seulement dans certains jeux où une seule réponse documentaire est pertinente par requête. Les requêtes sans réponse sont suivies séparément ; ne les transforme pas en échec de retrieval si l'attendu est justement l'abstention.
4. Examiner chaque faux négatif : ingestion, découpage, tokenisation, index, classement ou annotation.
5. N'introduire les embeddings, la fusion hybride ou un reranker qu'après avoir conservé la baseline.

**Réponse attendue :** si le modèle produit une bonne réponse à partir d'un document non pertinent, le retrieval n'est pas validé. Si un bon document est récupéré mais la réponse ignore une négation, le problème se situe plus loin dans la chaîne. Une métrique unique ne permet pas de les distinguer.

## Étape 2 : Évaluer sans fuite ni score magique

Le jeu de développement aide à améliorer le système ; la validation sert à sélectionner ; le test final estime le comportement sur des cas non utilisés pendant l'ajustement. La même question ou un quasi-duplicata présent dans les trois partitions peut gonfler les résultats.

### Travail demandé

- versionner les requêtes, les labels, le corpus, la configuration de retrieval, le prompt et le modèle ;
- définir chaque métrique avant de comparer les versions ;
- inclure succès normal, ambiguïté, abstention, contradiction, accès refusé, prompt injection, langue, latence et coût ;
- comparer la baseline et toute modification sur les mêmes cas ;
- examiner les régressions par sous-groupe, pas seulement la moyenne.

### Contrôles déterministes à séparer du jugement sémantique

| Invariant            | Test déterministe possible                           | Ce qu'il ne prouve pas seul                               |
| -------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Schéma de réponse    | Parsing strict et validation de type                 | La réponse est vraie                                      |
| Citation autorisée   | Chaque ID vient d'un document récupéré et accessible | La citation soutient l'affirmation                        |
| Droits documentaires | Cas inter-tenant / ACL refusée                       | Absence totale de canaux auxiliaires sans autre analyse   |
| Abstention           | Cas sans source / seuil de preuve insuffisant        | Bonne calibration sur tous les cas                        |
| Budget               | Nombre d'appels/tokens et limite de délai            | Coût de production complet si le prix ou trafic diffèrent |
| Qualité sémantique   | Rubrique humaine et/ou LLM-juge calibré              | Vérité universelle ou autorisation de sécurité            |

Un LLM-juge peut assister l'évaluation sémantique, mais il faut mesurer ses désaccords sur un échantillon annoté et conserver les faux pass/faux fail. Il ne décide jamais de droits ou d'action irréversible.

## Étape 3 : Sécurité : l'ACL doit survivre à toutes les couches

### Scénario de référence

L'utilisateur A appartient au tenant A. Le document privé `D-secret-B` appartient au tenant B. Une requête d'A demande explicitement le contenu de ce document ; un autre document public contient une injection qui demande au modèle d'ignorer les règles et de révéler les autres documents.

Le résultat attendu est un refus ou une réponse sans contenu secret. Pour le démontrer, vérifier chaque surface : retrieval, snippets, contexte du prompt, citations, cache de réponse, logs, traces et messages d'erreur. Il ne suffit pas que l'interface masque le document ou que le prompt dise « ne pas divulguer ».

### Exercices

1. Ajouter un document autorisé, un interdit, un révoqué et un document hostile ; noter leurs propriétaires, versions et ACL.
2. Tester l'accès par ID direct, recherche lexicale, recherche vectorielle, cache chaud, citation et résumé.
3. Révoquer un accès après l'indexation. Définir la garantie de révocation ; vérifier que le serveur filtre avant exposition. Si l'index n'est pas immédiatement réindexé, les droits doivent tout de même l'emporter.
4. Mettre une injection dans un document et un résultat d'outil. Confirmer que les opérations restent gouvernées par le code de contrôle et les permissions, pas par les instructions du document.
5. Ajouter des canaris synthétiques aux données protégées, exécuter les chemins de test et chercher leur présence dans les réponses et les journaux.

**Échec éliminatoire :** tout contenu non autorisé atteint le contexte du modèle ou une sortie observable, même si le modèle choisit finalement de ne pas le répéter.

## Étape 4 : Contrôles d'un service IA sous conditions imparfaites

Construis, ou analyse dans la référence, des limites explicites pour :

- délais de requêtes et du fournisseur, annulation et retries bornés ;
- limite de concurrence, file d'attente et backpressure ;
- taille d'entrée, taille de contexte, sorties, nombre d'appels et budget ;
- erreurs du fournisseur, réponse mal formée, citations absentes et modèle indisponible ;
- idempotence pour les opérations et outils ;
- configuration obligatoire et refus de démarrer si un secret réel manque ou si un placeholder est utilisé.

### Exercice de failure injection

Injecte une réponse fournisseur en timeout, un JSON invalide, un trop grand nombre d'outils, un coût estimé au plafond, puis un retriever vide. Pour chaque cas, écris l'état sûr, le code d'erreur externe, ce qui doit être loggé sans secret et la décision de retry/abstention. Justifie pourquoi certaines erreurs ne doivent pas être réessayées.

**Réponse attendue :** retry infini, nouvelle génération à chaque retry et absence de timeout peuvent amplifier une panne et le coût. Les limites doivent être appliquées côté serveur et mesurées. Ne logge ni clés, ni documents privés, ni prompts sensibles bruts par défaut.

## Étape 5 : Jeu d'acceptation du service

Conserve quatre ensembles séparés :

1. **tests de contrat** : schémas, erreurs, droits et limites ;
2. **dataset de retrieval** : labels documentaires et métriques de classement ;
3. **dataset de génération** : fidélité, citations, abstention et qualité sémantique ;
4. **corpus adversarial** : injections, fuite inter-tenant, contradiction, révocation et abus de coûts.

Pour chaque changement de code, prompt, modèle, découpage ou index, compare les résultats. Une modification ne « passe » pas simplement parce que la moyenne augmente : tout échec critique doit être revu, et les seuils doivent être justifiés avant l'expérience.

## Projet de synthèse

Construire une version minimale de `RAG Blindé` : ingestion avec provenance et ACL ; baseline lexicale ; évaluation annotée ; génération fondée sur les passages ; citations vérifiées ; abstention ; contrôle de droits serveur ; budget/timeout ; rapport comparatif et test de régression. La version initiale peut être locale et utiliser un générateur simulé ; le raisonnement doit rester valable quand un fournisseur réel est branché.

### Livrables

- schéma des flux de données et frontières de confiance ;
- dataset versionné et critères pré-enregistrés ;
- baseline et rapport d'erreurs ;
- tests positifs/négatifs de droits et de révocation ;
- rapport de qualité, latence et coût avec environnement et limite de validité ;
- ADR pour chaque composant non trivial ;
- notes de soutenance à livre fermé et une modification imprévue réussie.

## Barème de sortie

| Dimension     | Échec                                             | Maîtrise démontrée                                                                   |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Retrieval     | Seulement de bonnes démos choisies                | Baseline fixée, labels et erreurs examinés, métrique expliquée                       |
| Génération    | Réponse plausible = réussite                      | Fidélité/citations/abstention évaluées séparément du retrieval                       |
| Accès         | Règles uniquement dans le prompt                  | Contrôle avant exposition, tests cross-tenant/revocation/cache                       |
| Évaluation    | Dataset utilisé pour ajuster et annoncer le score | Séparation des données et régression injectée détectée                               |
| Exploitation  | Retry illimité / coûts inconnus                   | Timeout, limites, budget, fallback et état dégradé testés                            |
| Compréhension | Récitation d'une architecture                     | Peut prédire une panne, tracer sa cause et modifier une règle sans copie de solution |

Un échec d'autorisation, de fuite de données ou de gestion d'une opération irréversible impose `REVISE`, même avec des métriques moyennes excellentes.

## Règle honnête

Le labo prouve la maîtrise dans un périmètre local et selon ses tests. Il ne prouve pas la sûreté universelle, la conformité juridique, ni le niveau de production d'un système exposé. Pour une mise en production réelle, les contrôles doivent être adaptés au contexte et à sa menace réelle.

<!-- AF-DIAGRAM:ai -->

## Repère visuel utile : FAQ IA en lecture seule et évaluable

```text
question utilisateur
       |
       v
contrôle d'accès + retrieval
       |
       v
sources autorisées ?
   | oui        | non
   v            v
générer + citer   abstention
   |
   v
validation / sécurité
   |
   v
réponse lecture seule
```

<!-- AF-LESSON-PROFILE: ai -->

## Repères de décision

- **Pourquoi :** L'ingénierie IA consiste à intégrer une capacité probabiliste dans un système déterministe qui doit gérer droits, qualité, coût et échecs.
- **Quand l’utiliser / quand l’éviter :** Utilise LLM/RAG/agents seulement quand la valeur est claire et une solution non-IA ne suffit pas. En lecture seule, l'IA peut assister ; elle ne doit pas effectuer une action métier sans autorisation et confirmation séparées.
- **Limites :** Une réponse plausible peut être fausse. Un score d'évaluation ne garantit pas la sécurité ; un prompt n'est pas une frontière d'autorisation ; une simulation n'est pas une mesure utilisateur.

## Mécanisme : la version sans magie

Définis contrat, sources, droits, abstention et évaluation ; observe retrieval, génération et post-traitement séparément ; garde les outils dans un périmètre minimal.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **60 : Laboratoire IA de bout en bout : retrieval, preuve, droits et opérations** se rattache à ce cas concret : La FAQ IA Kintana répond à partir de documents approuvés, cite ses sources et s'abstient quand le contenu manque. Elle ne crée ni annule ni modifie une demande.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : FAQ IA en lecture seule et évaluable

> **Arc Capsule Corp. / DBZ :** l'IA est un copilote puissant, pas le Hokage. Elle peut proposer ; c'est ton système qui doit vérifier, limiter et refuser si besoin.

**Mission liée à « 60 : Laboratoire IA de bout en bout : retrieval, preuve, droits et opérations » :** Ajoute ou évalue une tranche FAQ Kintana : corpus synthétique approuvé, retrieval, citations, questions sans réponse, contradiction de source et prompt injection. Vérifie que toute action d'écriture métier reste impossible.

**Livrable :** jeu d'évaluation versionné, rapport retrieval/génération, tests sécurité, règle d'abstention et dossier de coûts/latence LAB.

**Critères d’acceptation :** les sources sont traçables ; les réponses sans support s'abstiennent ; l'injection ne donne pas de droits ; aucune action métier n'est exposée ; les métriques ne sont pas présentées comme production.

**Transfert obligatoire :** Le fournisseur IA tombe ou renvoie une sortie mal formée. Vérifie le mode dégradé, la reprise et le comportement sûr.
