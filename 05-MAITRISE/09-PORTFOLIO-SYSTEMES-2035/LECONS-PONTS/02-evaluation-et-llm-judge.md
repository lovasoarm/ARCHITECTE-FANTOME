---
stability: evolutif
acte: apprendre
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/02-evaluation-et-llm-judge.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/02-evaluation-et-llm-judge.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Leçon-pont 02 : Évaluer une application IA sans croire au score magique

> **Arc Naruto :** un examen où Naruto se note lui-même, c'est une blague. Un modèle qui s'auto-déclare excellent, c'est pareil. Il te faut des cas, des labels, des règles et des contre-exemples.

<!-- AF-DIAGRAM:evaluation -->

## Repère visuel utile : Pipeline d’évaluation

```text
Dataset + labels humains
          |
   +------+------+
   |             |
Tests exacts   Juge sémantique
   |             |
   +------+------+
          |
 Analyse par sous-groupe
          |
 Régression injectée -> CI
          |
      décision
```

<!-- AF-LESSON-PROFILE: evaluation -->

## Résultat attendu

Construire un jeu d'évaluation versionné, séparer les contrôles déterministes des jugements sémantiques et estimer les erreurs d'un LLM-juge. Une personne tierce doit pouvoir relancer un échantillon et comprendre le verdict.

## Pourquoi évaluer séparément ?

Une application IA a plusieurs sorties indépendantes : respect du contrat, accès autorisé, retrieval correct, réponse utile, citation fondée, latence, coût et comportement en cas d'incertitude. Un score unique cache les échecs graves derrière une moyenne flatteuse.

```text
Besoin utilisateur
      |
Cas représentatifs + labels humains
      |
+-----+--------------------+
|                          |
Tests déterministes     Jugement sémantique
|                          |
|                       Juge LLM éventuel
+-----------+--------------+
            |
      analyse par sous-groupe
            |
    régression injectée en CI
            |
      décision documentée
```

## Les notions à apprendre

1. **Dataset versionné** : chaque cas porte un identifiant, une entrée, un contexte autorisé, une attente/label, une catégorie et une version du corpus.
2. **Rubrique** : décrire ce qui compte comme exact, partiel, non fondé, dangereux ou abstention correcte. Évite les adjectifs vagues comme « bonne réponse ».
3. **Tests déterministes** : schéma JSON, statut HTTP, citation existante, ACL, nombre d'appels, plafond coût, absence d'un champ interdit. Ils ne doivent pas être délégués à un juge LLM.
4. **Métriques de qualité** : précision des citations, taux d'abstention adaptée, taux de réponse non fondée, réussite par sous-groupe, latence et coût. Définis le dénominateur avant de calculer.
5. **LLM-as-a-judge** : utile pour comparer des dimensions sémantiques à grande échelle, mais il peut être biaisé, instable, sensible au style et d'accord avec le modèle qu'il évalue.
6. **Calibration humaine** : fais annoter un échantillon par des humains selon la même rubrique ; compare accords, désaccords, faux positifs et faux négatifs du juge.
7. **Holdout et fuite de benchmark** : garde des cas non utilisés pour régler prompts et seuils. Si tu optimises continuellement sur le même jeu, tu finis par apprendre le test.

## Quand l'utiliser / quand l'éviter

Utilise une évaluation versionnée dès qu'une modification de modèle, prompt, corpus, retriever ou outil peut affecter les utilisateurs. N'ajoute pas de juge LLM si quelques assertions déterministes couvrent le risque. Pour une décision de sécurité, d'accès ou d'action irréversible, le juge n'est jamais l'autorité.

## Limites

Un résultat dépend du jeu de cas, des labels, des versions et des conditions d'exécution. Une bonne moyenne ne garantit pas les langues, utilisateurs ou cas rares absents. Un juge LLM n'est pas une vérité oracle. Un benchmark ne valide pas à lui seul un système légal, clinique ou critique.

## Mécanisme : le modèle mental à retenir

Le système est fiable quand chaque étape possède un contrat, un état observable, une règle d'échec et une preuve indépendante. Sépare les mécanismes ; ne laisse pas une démo réussie masquer une étape non vérifiée.

## Leçons AF à faire

- [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md), notamment [Contract Testing](../../../02-CONSTRUCTION/03-TESTING/08-contract_testing_pact.md) et [Test Strategy](../../../02-CONSTRUCTION/03-TESTING/10-test_strategy_not_framework.md).
- [Quality Shield : CI et revue](../../../03-PILOTAGE/03-QUALITY-SHIELD/04-review-and-ci.md).
- [Produit IA de référence : gabarit G8](../../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/05-GABARIT-EVALUATION-IA.md) et [matrice des défaillances](../../../06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/06-MATRICE-EVALUATION-IA-SECURITE.md).
- [Laboratoire IA 60](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md).

## Ancrage produit / terrain : Kintana

Dans Kintana, le scénario d'étude utilise des données synthétiques et un environnement local. L'objectif est de prouver le mécanisme et ses limites ; il ne s'agit pas d'une mesure de production. Garde une trace de l'entrée, du résultat, du cas d'échec et du niveau de preuve (`CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : Tribunal Kintana

Crée au moins 40 cas : nominal, ambigu, sans source, contradiction, injection, langue, utilisateur non autorisé, outil abusif et sortie malformée. Annote un sous-ensemble humainement ; fais évaluer le même sous-ensemble par un juge ; injecte une régression connue dans la CI.

**Livrable :** `cases.jsonl`, rubric, labels, rapport de calibration, résultats détaillés, seuils versionnés, workflow CI et analyse des échecs par catégorie.

**Critère de sortie :** une régression critique fait échouer la CI ; un tiers peut reproduire le résultat ; tu peux citer au moins un cas où le juge s'est trompé et expliquer le contrôle qui l'a rattrapé.

## Transfert obligatoire

Le fournisseur change son modèle sans prévenir et le score moyen monte, mais les citations chutent pour les demandes en français. Montre comment ta suite détecte la régression masquée.

## Références de projet

[02 : Tribunal des IA](../02-tribunal-des-ia.md) · [60 : Laboratoire IA](../../../06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md).
