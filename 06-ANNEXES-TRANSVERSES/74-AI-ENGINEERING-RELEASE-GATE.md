---
stability: evolutif
acte: sécuriser-et-évaluer
noyau: oui
route: formation-complete
niveau: D-G
last_reviewed: 2026-10-30
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
