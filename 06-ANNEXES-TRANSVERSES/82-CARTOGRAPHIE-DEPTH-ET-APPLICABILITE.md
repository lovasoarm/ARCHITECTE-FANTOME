---
stability: evolutif
type: depth-boundaries-and-specialization-map
release: 1.1.33
introduced_release: 1.1.4
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 82 : Cartographie DEPTH : MLOps, applicabilité juridique et spécialisations

Ce document clarifie les frontières du CORE et donne une route d’approfondissement sans transformer les spécialisations en prérequis universels. Il fournit une cartographie et des preuves attendues ; il ne prétend pas remplacer une formation spécialisée ni une revue juridique.

## A. MLOps : cycle de vie approfondi

### Ce que le CORE couvre déjà

Le CORE introduit les données, les baselines, les splits sans fuite, les métriques, l’analyse d’erreurs, la dérive, l’évaluation IA, les coûts, les limites et les conditions d’arrêt via [70 : Data Engineering](70-DATA-ENGINEERING-CORE/README.md), [71 : Mathématiques & ML](71-MACHINE-LEARNING-MATH-CORE/README.md), [74 : AI Engineering Release Gate](74-AI-ENGINEERING-RELEASE-GATE.md) et [60 : Service IA/RAG](60-LAB-SERVICE-IA-END-TO-END.md).

Ces ressources permettent de comprendre et d’intégrer de façon critique un modèle. Elles ne constituent pas, à elles seules, une spécialisation complète en MLOps.

### Route DEPTH recommandée

| Étape                              | Compétence                                                               | Travail attendu                                                                                    | Preuve de sortie                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| M1 : Données                       | Contrats, versionnement, qualité, provenance et séparation train/serving | Produire un dataset versionné, valider schéma, lineage, droits, doublons et dérive                 | Manifeste, contrôle qualité, historique des versions et split reproductible           |
| M2 : Expériences                   | Reproductibilité et traçabilité                                          | Fixer graine, paramètres, code, dépendances, données et métriques                                  | Expérience relançable et comparaison baseline/candidat                                |
| M3 : Entraînement et évaluation    | Pipeline de train/validation/test sans fuite                             | Automatiser entraînement, sélection de seuil, analyse d’erreurs et critères de blocage             | Rapport d’évaluation versionné, preuve d’absence de fuite et justification des seuils |
| M4 : Registre et promotion         | Gestion du cycle de vie du modèle                                        | Associer un identifiant à l’artefact, au code, aux données, aux métriques et aux approbations      | Registre de modèles et règle explicite de promotion/rejet                             |
| M5 : Serving et déploiement        | Batch/online, compatibilité et déploiement progressif                    | Comparer batch et online ; définir canary, shadow ou promotion progressive lorsque pertinent       | Contrat d’inférence, plan de release, rollback et preuve de compatibilité             |
| M6 : Monitoring                    | Performance technique et qualité métier                                  | Mesurer latence/coût/erreurs, qualité, drift, données manquantes et changements de régime          | Tableau de bord, seuils d’alerte, runbook et incident simulé identifié comme tel      |
| M7 : Réentraînement et gouvernance | Réentraînement contrôlé, audit et arrêt                                  | Définir les déclencheurs, approbations, tests de non-régression, archivage et procédure de retrait | ADR, politique de réentraînement, audit trail et preuve de rollback/arrêt             |

### Prérequis et terrain

Prérequis conseillés : [70](70-DATA-ENGINEERING-CORE/README.md), [71](71-MACHINE-LEARNING-MATH-CORE/README.md), [bases de données](../05-MAITRISE/01-DATABASES/README.md), [Cloud Foundations](../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md), [Observability](../03-PILOTAGE/05-OBSERVABILITY/README.md), [Security](../03-PILOTAGE/04-SECURITY/README.md) et [AI Release Gate](74-AI-ENGINEERING-RELEASE-GATE.md).

Le parcours DEPTH peut commencer en local avec des données synthétiques et un modèle simple. Kubernetes, GPU, registre managé, service externe ou API payante ne sont pas des prérequis par défaut. Lorsqu’un outil n’est pas installé, marque l’activité `BLOCKED` ou `NOT RUN` ; n’invente pas de résultat. Le modèle DEPTH n’est déclaré maîtrisé qu’après une chaîne reproductible de données → expérience → artefact → promotion → serving → monitoring → rollback/réentraînement.

## B. Applicabilité juridique et réglementaire

AF ne suppose pas qu’un texte s’applique automatiquement parce qu’il est cité dans une leçon. L’ingénieur doit établir le contexte avant de déduire une obligation.

### Matrice minimale d’applicabilité

| Dimension              | Question à documenter                                                                                 | Exemple de preuve                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Entité responsable     | Quelle entité décide des finalités et moyens ?                                                        | Organisation, rôle contractuel et propriétaires           |
| Territoires            | Où sont établis l’organisation, les utilisateurs, les sous-traitants et les destinataires ?           | Pays, états/régions et transferts pertinents              |
| Personnes concernées   | Qui utilise ou est affecté par le système ?                                                           | Population et contexte d’utilisation                      |
| Données                | Données personnelles, sensibles, financières, de santé, biométriques, professionnelles ou publiques ? | Inventaire et classification                              |
| Finalité               | Pourquoi chaque donnée est-elle collectée ou transformée ?                                            | Finalité, base ou justification applicable, durée         |
| Rôle des fournisseurs  | Hébergeur, sous-traitant, responsable indépendant, modèle tiers ou source de données ?                | Contrat, DPA, conditions et flux                          |
| Secteur                | Santé, finance, éducation, emploi, secteur public ou autre domaine régulé ?                           | Analyse sectorielle et obligations spécifiques            |
| Transfert et résidence | Où les données sont-elles stockées, traitées, sauvegardées et accessibles ?                           | Cartographie des flux et localisation                     |
| IA / automatisation    | Le système influence-t-il une décision ou agit-il sur une personne ?                                  | Usage prévu, contrôle humain, évaluation et documentation |
| Conservation et droits | Quels droits, délais, notifications et obligations de suppression s’appliquent ?                      | Politique, procédures testables et journal                |

### Procédure de décision

1. Décrire le système, son usage réel et son usage prévu ; séparer hypothèses et faits.
2. Cartographier entités, territoires, personnes, données, finalités, fournisseurs et secteurs.
3. Identifier les textes et standards potentiellement applicables à partir de sources primaires officielles.
4. Vérifier définitions, champ territorial/matériel, exceptions, date d’entrée en vigueur et dispositions transitoires.
5. Relier chaque obligation retenue à un contrôle d’architecture, une politique, un contrat, un test ou une procédure.
6. Faire relire les conclusions juridiques par une personne qualifiée dans la juridiction concernée lorsque l’enjeu le requiert.
7. Conserver `applicability.md` avec sources, date de consultation, conclusion, inconnues, propriétaire et prochaine revue.

**Limite :** AF enseigne une démarche d’identification et de vérification ; ce document n’est ni un avis juridique ni une liste universelle de lois. Une date de consultation n’assure pas qu’une interprétation est juridiquement correcte.

## C. Frontières CORE / DEPTH / VAULT

| Domaine avancé                         | Couverture CORE                                                               | Quand passer en DEPTH                                                          | Preuve de spécialisation attendue                                                                      |
| -------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Vérification formelle                  | Contrats, invariants et raisonnement sur les états                            | Système critique, protocole sensible, erreurs non tolérables                   | Spécification formelle, propriétés démontrées ou bornées, contre-exemples                              |
| Chaos engineering à grande échelle     | Pannes contrôlées et récupération dans un périmètre local                     | Plateforme multi-services avec dépendances et risque opérationnel significatif | Hypothèses de blast radius, expériences approuvées, arrêt d’urgence, apprentissages et actions suivies |
| Recherche ML / deep learning           | Littératie mathématique et entraînement d’un modèle simple                    | Le rôle exige de concevoir de nouveaux modèles ou méthodes                     | Question de recherche, baseline, protocole, analyse statistique, reproductibilité et limites           |
| Entraînement de modèles de fondation   | Compréhension des LLM, coûts et limites ; pas l’entraînement à grande échelle | Besoin explicite de recherche/entraînement et ressources adaptées              | Données/licences, budget calcul, pipeline distribué, évaluations, sécurité et comparaison indépendante |
| Optimisation GPU                       | Conscience coût/latence et limites d’inférence                                | Goulot GPU mesuré et valeur attendue supérieure au coût d’expertise            | Profilage, baseline, kernels ou batching justifiés, métriques et reproduction                          |
| MLOps avancé                           | Pipeline de données, évaluation et release critique                           | Modèle réentraîné, promu, servi et surveillé régulièrement                     | Cycle M1–M7 complet, versions et rollback vérifiables                                                  |
| Cryptographie avancée                  | Hygiène des secrets, chiffrement et menaces courantes                         | Protocole ou primitive cryptographique conçu/choisi au cœur du système         | Revue spécialisée, analyse formelle/cryptographique et usage de bibliothèques éprouvées                |
| Réseaux bas niveau / kernel / stockage | Modèles et diagnostic au niveau nécessaire à l’architecture                   | Développement de runtime, base, stockage ou réseau spécialisé                  | Tests de propriétés, benchmarks contrôlés, panne et analyse de concurrence                             |

La règle n’est pas « tout apprendre ». Elle est : **connaître la frontière du CORE, savoir reconnaître le signal qui déclenche une spécialisation, puis produire une preuve à la profondeur requise par le contexte.**
