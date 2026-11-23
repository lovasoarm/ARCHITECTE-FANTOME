---
stability: stable
type: canonical-domain-order
---

# 83 : Carte canonique des neuf familles de domaines

Cette carte donne la **vue macro de la progression des domaines** d'ARCHITECTE-FANTOME. Elle sert à comprendre dans quel ordre les grandes familles de compétences se construisent ; elle ne remplace ni les huit phases de la Formation complète, ni les étapes opérationnelles de la [Route 58](58-ROUTE-APPRENANT-COHERENTE.md).

## Ordre de progression recommandé

| Ordre  | Famille de domaines                              | Ce que l'apprenant construit                                                                                                           | Repère dans AF                                                                                                                           |
| ------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **00** | **Fondations**                                   | Pensée informatique, programmation, logique, algorithmique, environnement, Git et mathématiques de base.                               | Phase 1 ; Route 58, étapes 0 à 2.                                                                                                        |
| **01** | **Software Engineering**                         | Code maintenable, modularité, tests, refactoring, contrats, qualité et évolution sûre.                                                 | Phase 2 ; Route 58, étapes 3 et 4, puis pratique continue.                                                                               |
| **02** | **Backend & Databases**                          | API, runtime, réseau, modèles de données, SQL, transactions, persistance et cohérence.                                                 | Phase 3 ; Route 58, étapes 4 et 5, puis réutilisation dans les systèmes distribués.                                                      |
| **03** | **Architecture & System Design**                 | Frontières, contrats, choix d'architecture, systèmes distribués, cohérence, résilience et évolutivité.                                 | Phase 4 ; Route 58, étapes 4 et 8, puis approfondissement aux étapes 10 à 12.                                                            |
| **04** | **Cloud / DevOps / Infrastructure**              | Linux, sécurité, livraison reproductible, cloud, CI/CD, IaC, observabilité, SRE, incidents et restauration.                            | Phase 5 ; Route 58, étapes 6 et 7, puis exploitation transversale.                                                                       |
| **05** | **Data Engineering & Big Data**                  | Ingestion batch/streaming, pipelines, contrats, qualité, stockage, orchestration, Kafka, Spark, reprise et lineage.                    | Phase 6, sous-étape 9A de la Route 58. Après les prérequis Databases (étape 5) et systèmes distribués (étape 8).                         |
| **06** | **Mathématiques / Data Science / ML**            | Statistiques, probabilités, algèbre linéaire, optimisation, exploration, baselines, entraînement et évaluation sans fuite.             | Phase 6, sous-étape 9B ; pont maths, puis noyau Mathématiques & ML et labs ML. Les mathématiques élémentaires commencent dès 00.         |
| **07** | **AI Engineering**                               | Intégration et exploitation de systèmes IA : RAG, LLM, retrieval, évaluation, sécurité, contrôle d'accès, coûts, supervision et arrêt. | Phase 6, sous-étape 9C ; leçons-ponts, Lab 60 et AI Engineering Release Gate 74. Après les bases de données et les fondations ML utiles. |
| **08** | **Technical Leadership & Advanced Architecture** | Décisions à portée transverse, plateformes, arbitrages, migration, mentorat, adoption et influence technique durable.                  | Phases 7 et 8 ; Route 58, étapes 10 à 12. L'architecture se construit dès 03 et se renforce jusqu'à ce palier.                           |

## Pourquoi cet ordre ?

La progression suit une dépendance pédagogique lisible :

```text
Fondations
    ↓
Software Engineering
    ↓
Backend & Databases
    ↓
Architecture & System Design
    ↓
Cloud / DevOps / Infrastructure
    ↓
Data Engineering & Big Data
    ↓
Mathématiques / Data Science / ML
    ↓
AI Engineering
    ↓
Technical Leadership & Advanced Architecture
```

Le point à retenir est la séquence de la phase 6 : **Data Engineering → Mathématiques / ML → AI Engineering**. La Route 58 la rend explicite par les sous-étapes **9A → 9B → 9C**. L'ancien ordre de présentation qui plaçait AI Engineering avant Data et ML ne doit plus être utilisé comme ordre d'apprentissage.

## Ce que cet ordre ne signifie pas

- **Ce n'est pas une règle “tout maîtriser à 100 % avant de continuer”.** Les prérequis exacts et les gates de chaque activité dans la Route 58 priment ; certaines familles se chevauchent.
- **Les mathématiques ne commencent pas au niveau 06.** Le calcul, la logique et les mathématiques de base se travaillent dès les Fondations ; le niveau 06 approfondit les outils quantitatifs nécessaires à la Data Science et au ML.
- **L'architecture ne commence pas au niveau 08.** La conception logicielle débute dans les modules de Software Engineering ; la conception de systèmes se développe à partir de 03 et se poursuit dans Cloud, Data, IA et leadership.
- **AI Engineering ne signifie pas entraîner systématiquement un modèle.** L'intégration d'un LLM ou d'un système RAG, son évaluation et sa gouvernance sont distinctes de l'entraînement ML ; une décision argumentée de ne pas utiliser de ML reste recevable lorsque les besoins et les preuves le justifient.
- **Sécurité, qualité, tests, observabilité et exploitation sont transversaux.** Leur apprentissage commence avant leur approfondissement spécialisé et se poursuit dans les projets et les preuves.
- **Les numéros 00 à 08 sont des repères de lecture macro.** Ils ne sont ni les numéros des dossiers physiques, ni les étapes de la Route 58, ni une nouvelle certification.

## Sources canoniques à suivre

1. [58 : Route apprenant cohérente](58-ROUTE-APPRENANT-COHERENTE.md) : ordre opérationnel, prérequis, productions, gates et remédiations.
2. [Formation complète](../FORMATION-COMPLETE-INGENIERIE.md) : huit phases, domaines, objectifs et paliers.
3. [80 : Matrice canonique des progressions](80-MATRICE-PROGRESSIONS.md) : distinction entre blocs physiques, paliers, phases, étapes et validation.
4. [70 : Data Engineering Core](70-DATA-ENGINEERING-CORE/README.md), [71 : Mathématiques & Machine Learning Core](71-MACHINE-LEARNING-MATH-CORE/README.md) et [74 : AI Engineering Release Gate](74-AI-ENGINEERING-RELEASE-GATE.md) : séquence spécialisée de la phase 6.

En cas de doute ou de contradiction, la Route 58 et les prérequis/gates des ressources ciblées déterminent l'activité suivante. Cette carte ne crée aucun prérequis supplémentaire.
