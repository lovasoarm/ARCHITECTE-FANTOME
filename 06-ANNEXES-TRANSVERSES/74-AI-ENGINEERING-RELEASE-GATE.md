---
stability: evolutif
acte: sécuriser-et-évaluer
noyau: oui
route: formation-complete
niveau: D-G
last_reviewed: 2026-10-30
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 74 : AI Engineering Release Gate : de l'expérience au système contrôlé

## Pourquoi

Une intégration IA n'est pas prête parce qu'un prompt produit une bonne réponse sur trois exemples. Elle est prête à un niveau donné lorsque les données, les droits, la qualité, les coûts, les erreurs, les limites et la stratégie d'arrêt sont définis et testés.

Ce gate complète le [service IA/RAG end-to-end](60-LAB-SERVICE-IA-END-TO-END.md), le [pont mathématiques/ML/LLM](41-PONT-MATHS-IA-ML-LLM.md), les [labs ML](45-LABS-IA-ML-DEPTH.md) et le [Data Engineering Core](70-DATA-ENGINEERING-CORE/README.md).

## Contrat de release

Avant toute release, le dossier doit préciser :

1. **Usage autorisé :** tâches, utilisateurs, domaine, exclusions, décisions qui restent humaines.
2. **Données :** provenance, licence, classification, conservation, qualité, split, droits d'accès et données de test.
3. **Modèle :** fournisseur/version ou hash local, paramètres, date, limitations et plan de remplacement.
4. **Évaluation :** jeu de cas versionné, baseline, critères établis avant les résultats, métriques par sous-groupe si pertinent.
5. **Sécurité :** prompt injection, exfiltration, ACL, secrets, outils autorisés, validation des sorties et contrôle humain.
6. **Exploitation :** latence, coût par requête, quota, disponibilité, erreurs, traces, rétention et alerte.
7. **Dégradation :** fallback déterministe, refus, abstention, désactivation du modèle et rollback.

## Matrice d'évaluation minimale

| Famille      | Cas à inclure                                   | Mesure/contrôle                                          |
| ------------ | ----------------------------------------------- | -------------------------------------------------------- |
| Normal       | requête couverte et données suffisantes         | réussite définie par critères explicites                 |
| Ambigu       | plusieurs interprétations                       | clarification ou abstention                              |
| Hors domaine | information absente                             | refus de fabriquer une réponse                           |
| Retrieval    | document pertinent absent, bruité ou mal classé | recall@k, precision@k ou métrique adaptée                |
| Grounding    | réponse non soutenue par le contexte            | taux d'affirmations soutenues et citations vérifiables   |
| Autorisation | document d'un autre tenant ou rôle              | zéro accès indu dans les tests négatifs                  |
| Adversarial  | instruction hostile dans un document            | séparation données/instructions, refus d'action illicite |
| Coût/latence | contexte volumineux, retry, burst               | coût et p50/p95/p99 mesurés                              |
| Régression   | ancien cas qui fonctionnait                     | comparaison version N / N+1                              |

Aucune métrique unique ne représente la qualité globale. Un score moyen élevé ne compense pas une fuite de données ou une action non autorisée.

## Gate de sécurité

- Les permissions sont appliquées avant la récupération ou l'exposition du contenu, et revérifiées au point d'action.
- Le texte récupéré est considéré comme donnée non fiable, jamais comme une instruction de contrôle.
- Les outils ont un schéma d'entrée strict, une liste d'autorisations et des limites de débit/coût.
- Les écritures, suppressions, envois et opérations irréversibles sont refusés par défaut ou exigent un contrôle explicite.
- Les secrets ne sont pas accessibles au modèle et ne sont pas copiés dans les traces.
- Les logs minimisent les données sensibles et disposent d'une durée de conservation définie.
- Le système offre un coupe-circuit et un mode dégradé testé.

## Gate de qualité

Avant l'entraînement ou la génération :

- tracer source, version, transformations et exclusions du dataset ;
- séparer train, validation et test selon le mécanisme de production ;
- éviter les doublons et les fuites temporelles/entre entités ;
- comparer avec une baseline déterministe ;
- écrire les seuils d'acceptation avant d'observer le résultat ;
- stocker le jeu de tests et le rapport par version.

## Gate opérationnel

Mesure au minimum :

- taux de requêtes acceptées, refusées, en erreur et abstentions ;
- latence p50/p95/p99 par étape : retrieval, modèle, outils ;
- tokens ou unités facturées et coût par tâche terminée ;
- nombre d'appels d'outils, échecs, refus et dépassements de budget ;
- qualité du retrieval et des réponses selon un jeu de test versionné ;
- dérive de la distribution et fréquence des cas hors domaine.

Définis un seuil de blocage, un propriétaire et une action. Une métrique qui n'entraîne aucune décision n'est qu'une décoration.

## Exercice de sabotage contrôlé

1. Injecte un document qui contient une instruction malveillante.
2. Ajoute un document auquel l'identité courante n'a pas accès.
3. Fais tomber le fournisseur de modèle ou dépasse le budget.
4. Fais retourner un résultat vide au retrieval.
5. Répète un appel d'outil qui écrit un effet externe.
6. Vérifie qu'il n'y a ni fuite, ni action non autorisée, ni double écriture, ni boucle infinie.
7. Désactive le modèle et vérifie que la fonction déterministe critique reste disponible.

**Preuve attendue :** rapports de test négatif, journaux expurgés, métriques, décision de release et limites restantes.

## Décision de release

- `BLOCKED` : vulnérabilité critique, fuite d'autorisation, action non autorisée, absence de fallback critique ou métrique obligatoire indisponible.
- `CONDITIONAL` : risque connu accepté avec contrôle compensatoire, propriétaire et date de réexamen.
- `APPROVED_FOR_SCOPE` : critères du cas d'usage atteints pour le périmètre exact testé ; ne signifie pas sûreté universelle.

La décision appartient au propriétaire du système et aux responsables de risque pertinents, pas au modèle qui a généré le code.

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

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **74 : AI Engineering Release Gate : de l'expérience au système contrôlé** se rattache à ce cas concret : La FAQ IA Kintana répond à partir de documents approuvés, cite ses sources et s'abstient quand le contenu manque. Elle ne crée ni annule ni modifie une demande.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : FAQ IA en lecture seule et évaluable

> **Arc Capsule Corp. / DBZ :** l'IA est un copilote puissant, pas le Hokage. Elle peut proposer ; c'est ton système qui doit vérifier, limiter et refuser si besoin.

**Mission liée à « 74 : AI Engineering Release Gate : de l'expérience au système contrôlé » :** Ajoute ou évalue une tranche FAQ Kintana : corpus synthétique approuvé, retrieval, citations, questions sans réponse, contradiction de source et prompt injection. Vérifie que toute action d'écriture métier reste impossible.

**Livrable :** jeu d'évaluation versionné, rapport retrieval/génération, tests sécurité, règle d'abstention et dossier de coûts/latence LAB.

**Critères d’acceptation :** les sources sont traçables ; les réponses sans support s'abstiennent ; l'injection ne donne pas de droits ; aucune action métier n'est exposée ; les métriques ne sont pas présentées comme production.

**Transfert obligatoire :** Le fournisseur IA tombe ou renvoie une sortie mal formée. Vérifie le mode dégradé, la reprise et le comportement sûr.
