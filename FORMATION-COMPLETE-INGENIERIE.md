---
stability: stable
type: canonical-curriculum-route
scope: full-formation
---

# Formation complète : ingénierie logicielle, systèmes, IA et leadership technique

> **Référence globale de la formation, sans durée promise.** L’entrée effective se fait par [START HERE](00-SOCLE/01-GETTING-STARTED/01-START_HERE.md). Ce document décrit la cible, les domaines et les paliers ; il n’est pas une lecture obligatoire avant le premier exercice. Le CORE de 16 semaines / 192 h est conservé comme parcours d’orientation facultatif ; il ne constitue ni la formation complète, ni une condition suffisante pour revendiquer une maîtrise avancée.

## Contrat de formation

AF vise à développer, par preuves progressives, une capacité durable à comprendre, concevoir, implémenter, tester, sécuriser, déployer, exploiter et faire évoluer des systèmes logiciels complexes, y compris des systèmes intégrant l'IA. La progression est fondée sur des compétences démontrées, non sur le temps passé, le nombre de fichiers lus ou l'achèvement d'une checklist.

La maîtrise de niveau Distinguished Engineer n'est ni une certification délivrée par ce dépôt ni une conséquence automatique de la fin du cursus. AF peut préparer les compétences et structurer un portfolio ; un niveau professionnel de portée Distinguished suppose un impact réel, durable, transversal et évalué dans un contexte extérieur.

## Comment utiliser la route

> **Repère canonique :** les blocs, paliers, phases, étapes et gates sont des couches différentes. Consulte la [matrice des progressions](06-ANNEXES-TRANSVERSES/80-MATRICE-PROGRESSIONS.md) pour leurs correspondances.

La carte qui transforme cette vue d'ensemble en séquence concrète se trouve dans [58 : Route apprenant cohérente](06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md). Utilise-la pour choisir les ressources exactes, les livrables et la remédiation. Pour travailler les preuves plutôt que réciter, utilise le [laboratoire de fondations](06-ANNEXES-TRANSVERSES/64-LAB-FONDATIONS-ET-RAISONNEMENT.md), le [laboratoire données/API/transactions](06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md), le [laboratoire sécurité/architecture](06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md), le [laboratoire de tests](06-ANNEXES-TRANSVERSES/63-LAB-TESTING-ENGINEERING.md), le [pack d'exercices systèmes](06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md) et la [fiche de preuve](06-ANNEXES-TRANSVERSES/62-FICHE-APPRENTISSAGE-PREUVE.md). Le [gate de maîtrise/capstone](06-ANNEXES-TRANSVERSES/67-GATE-MAITRISE-ET-CAPSTONE.md) fixe les critères de sortie communs. Les ateliers intégrateurs [DevOps/SRE](06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) et [service IA/RAG](06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) sont des fils transversaux, pas de nouvelles technologies à mémoriser avant d'en comprendre le besoin.

1. **Diagnostic d'entrée** : exécuter les prérequis et challenges déjà disponibles. Un résultat au test permet de raccourcir une explication, jamais de supprimer une preuve de transfert ou une lacune constatée.
2. **Apprentissage en boucle** : prédire, expliquer le mécanisme causal, coder ou modéliser, tester un contre-exemple, mesurer, puis transférer le principe à un contexte différent.
3. **Validation** : un module est acquis seulement après la preuve définie dans sa sortie. Une lecture, un quiz isolé ou un code qui compile ne suffit pas.
4. **Projet fil rouge** : conserver un système évolutif et l'enrichir au fil des phases. Enregistrer les décisions, erreurs, tests, incidents, coûts, migrations et retours de revue.
5. **Rétention** : revisiter les compétences après un délai et sous une forme différente. Reprendre les modules nécessaires si la compétence ne se transfère pas.
6. **Preuves externes** : étiqueter clairement les preuves `T0` (simulation), `T1` (projet personnel vivant), `T2` (collaboration), `T3` (open source / mission / client), `T4` (production suivie). Ne jamais présenter une simulation comme expérience terrain.

## Diagnostic et niveaux d'exigence

| Palier                                      | Capacité attendue                                                                                                                             | Preuve minimale de sortie                                                                                                                | Échec qui impose une remédiation                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| A : Fondations                              | Expliquer l'exécution d'un programme, les structures de données, le contrôle de flux, les types, les erreurs et les commandes de base         | Construire et déboguer une petite solution sans tutoriel pas à pas ; tests positifs et négatifs ; explication à livre fermé              | Réponse imitée, incapacité à expliquer un bug ou à traiter un cas limite                                    |
| B : Ingénierie autonome                     | Concevoir des fonctions/modules, contrats, tests, API et modèle de données ; lire du code existant                                            | Livrer une petite application maintenable avec tests, documentation, instrumentation minimale et évolution demandée après coup           | Couverture seulement nominale, couplage injustifié, débogage par essais au hasard                           |
| C : Système logiciel robuste                | Comprendre runtime, mémoire, concurrence, réseau, bases de données, sécurité et performances                                                  | Diagnostiquer une défaillance inconnue, faire un profil avant/après, démontrer l'invariant de sécurité et expliquer le compromis choisi  | Mesure absente, hypothèse non testée, correction qui masque le symptôme                                     |
| D : Livraison et exploitation               | Construire des artefacts reproductibles, les livrer, les observer, les restaurer et répondre aux incidents                                    | Pipeline automatisé, déploiement et rollback testés, SLO et runbook, incident simulé avec postmortem et restauration                     | Pipeline non reproductible, absence de rollback ou de preuve de restauration                                |
| E : Architecture et systèmes distribués     | Définir les exigences de qualité, frontières, contrats et comportements sous panne                                                            | ADR concurrents, prototype et expérience falsifiable ; scénarios de partition, duplication, retard et migration                          | Décision fondée sur une mode, hypothèses non explicites, confusion entre disponibilité et cohérence         |
| F : IA et systèmes de données               | Évaluer données, retrieval/modèles, confidentialité, erreurs, coût et limites de génération                                                   | Benchmark versionné, split sans fuite, tests adversariaux, mesures de qualité/coût/latence, politique de refus et rollback de version    | Démonstration fondée sur quelques requêtes, absence de données de test indépendantes ou de contrôle d'accès |
| G : Leadership transverse (Staff/Principal) | Aligner équipes, réduire les risques systémiques, construire des plateformes et faire évoluer une architecture dans le temps                  | Dossier d'architecture contradictoire, plan de migration, indicateurs de succès, adoption par d'autres équipes et rétrospective          | Décision purement locale, absence d'impact mesuré, arbitrage non communiqué                                 |
| H : Portée Distinguished-level              | Influencer durablement plusieurs systèmes/équipes, rendre de nouvelles capacités possibles et changer la direction technique à grande échelle | Preuves externes longitudinales d'impact, adoption, réduction de risque/coût ou innovation confirmée par plusieurs sources indépendantes | Toute conclusion reposant uniquement sur le dépôt, une simulation ou un titre auto-attribué                 |

Ces paliers ne sont pas des années ni des semaines. L'entrée dans un palier est autorisée par les prérequis observés ; la sortie demande des preuves reproductibles, répétées et transférables. Les paliers G et H nécessitent une expérience progressive en équipe et dans des systèmes vivants.

## Curriculum par domaines et ordre de dépendance

> **Spécialisations et frontières :** [82 : Cartographie DEPTH, MLOps et applicabilité juridique](06-ANNEXES-TRANSVERSES/82-CARTOGRAPHIE-DEPTH-ET-APPLICABILITE.md).

### Phase 1 : Fondations de programmation et pensée informatique

**Ressources principales :** `00-SOCLE/`, `01-CADRAGE/`, puis mathématiques, structures de données et algorithmes dans `02-CONSTRUCTION/`.

À maîtriser : shell, Git, environnement, variables, types, fonctions, portée, closures, modules, erreurs, asynchronisme, complexité, structures linéaires, arbres, graphes, recherche, tri, récursion, invariants et tests. Chaque famille de concepts doit être expliquée, appliquée, cassée par un contre-exemple et réutilisée dans un problème distinct.

**Gate :** implémenter et expliquer une solution, prévoir ses cas limites, tester ses invariants et déboguer un défaut injecté sans suivre une recette.

### Phase 2 : Construction d'un logiciel maintenable

**Ressources principales :** construction, testing, refactoring, TypeScript, runtime, patterns, DDD/contrats, API et clients.

À maîtriser : modularité, cohésion/couplage, contrats, compatibilité, tests unitaires/intégration/contrat, migrations, validation des entrées, erreurs, versioning, accessibilité, internationalisation et gestion de dette. Travailler sur une codebase existante fait partie du cursus, pas un bonus facultatif.

**Gate :** livrer un changement avec contrat explicite, tests de régression, observabilité minimale et analyse de l'impact sur les consommateurs.

### Phase 3 : Systèmes internes

À maîtriser au-delà des définitions : processus/threads, scheduling, mémoire virtuelle et GC, file descriptors, entrées-sorties, locks, contention, files d'attente, protocoles, DNS, TCP, TLS, HTTP, bases SQL, transactions, isolation, indexes et plans d'exécution.

**Gate :** observer un symptôme, formuler des hypothèses, choisir des mesures qui les départagent, puis démontrer pourquoi une correction répond à la cause.

### Phase 4 : Réseau, systèmes distribués et architecture

À maîtriser : latence, pannes partielles, timeouts, retries, backpressure, idempotence, duplication, causalité, consensus/quorum à bon niveau, caches, réplication, cohérence, partitionnement, migrations et évolutivité des contrats. Toute solution doit expliciter ses hypothèses, ses modes de panne et les coûts de ses garanties.

**Gate :** décider entre plusieurs architectures plausibles, fournir un prototype ou une expérience et simuler au moins une panne qui pourrait invalider le modèle.

### Phase 5 : Sécurité, livraison et exploitation

À maîtriser : threat modeling, identité et autorisation, secrets, supply chain, permissions minimales, tests de sécurité, Linux, conteneurs, CI/CD, IaC, déploiements progressifs, rollback, SBOM, observabilité, SLO/SLI, budget d'erreur, incidents, sauvegardes, restauration et coûts.

**Ressources pratiques :** [59 : Lab DevOps/SRE](06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) et [75 : Platform Operations Lab](06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md).

**Gate :** reconstruire depuis une machine propre, publier un artefact, le surveiller, effectuer un rollback et restaurer une donnée en démontrant l'intégrité. La partie conteneurisée du lab 75 doit être réellement exécutée avec Docker ; elle reste `NOT RUN` dans tout environnement sans moteur disponible.

### Phase 6 : Data Engineering, Mathématiques, Machine Learning et IA

**Ressources et ordre d'apprentissage : alignés sur la Route 58, étape 9 :**

1. **Data Engineering :** après les étapes 5 (Databases) et 8 (systèmes distribués), suivre [70 : Data Engineering Core](06-ANNEXES-TRANSVERSES/70-DATA-ENGINEERING-CORE/README.md). Valide la [passerelle Python](00-SOCLE/07-PYTHON-PASSERELLE/README.md) avant la première activité Python si ces bases ne sont pas déjà maîtrisées.
2. **Mathématiques et ML :** suivre le [pont maths → IA/ML/LLM](06-ANNEXES-TRANSVERSES/41-PONT-MATHS-IA-ML-LLM.md), puis [71 : Mathématiques & Machine Learning Core](06-ANNEXES-TRANSVERSES/71-MACHINE-LEARNING-MATH-CORE/README.md), puis les [labs ML](06-ANNEXES-TRANSVERSES/45-LABS-IA-ML-DEPTH.md). La passerelle Python n'est à refaire que si les compétences Python requises ne sont pas acquises.
3. **AI Engineering :** lire les leçons-ponts [RAG](05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md) et [évaluation](05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/02-evaluation-et-llm-judge.md), réaliser [60 : Service IA/RAG de bout en bout](06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md), puis passer [74 : AI Engineering Release Gate](06-ANNEXES-TRANSVERSES/74-AI-ENGINEERING-RELEASE-GATE.md).

Les prérequis détaillés et les gates de chaque ressource restent prioritaires. Cette synthèse ne les remplace pas.

À maîtriser : ingestion batch/streaming, ETL/ELT, SQL analytique, contrats, qualité, provenance, quarantaine, idempotence, Kafka, Spark, orchestration, statistiques, probabilités, algèbre linéaire, optimisation, entraînement, validation sans fuite, métriques, baselines, calibration, drift, LLM/RAG, retrieval, citations, prompt injection, ACL, refus, coûts, latence, gouvernance et human-in-the-loop.

**Gate :** pipeline rejouable avec reprise et lineage ; modèle simple entraîné/évalué sans fuite ; baseline comparée ; erreurs et seuils justifiés ; service IA testé contre des cas normaux, ambigus, adversariaux et non autorisés ; coûts bornés et possibilité d'arrêt/rollback démontrée.

### Phase 7 : Plateformes, produit et leadership technique

À maîtriser : paved roads, developer experience, standards, gestion des interfaces entre équipes, stratégie d'investissement, migration, réduction de risque, analyse économique, mentorat, revues, négociation d'architecture et communication écrite/orale des compromis. Réalise le [73 : Technical Leadership Practicum](06-ANNEXES-TRANSVERSES/73-TECHNICAL-LEADERSHIP-PRACTICUM.md), puis utilise le [76 : Leadership Field Proof Pack](06-ANNEXES-TRANSVERSES/76-LEADERSHIP-FIELD-PROOF/README.md) pour documenter l'adoption, le mentorat, l'impact et la revue indépendante.

**Gate :** défendre un ADR contradictoire, conduire un exercice d'incident, arbitrer une roadmap avec un budget contraint, développer l'autonomie d'un pair et prouver qu'un standard aide réellement d'autres ingénieurs.

### Phase 8 : Portée Principal et Distinguished

Il n'existe pas de checklist qui crée une portée Distinguished. AF prépare les capacités suivantes : modéliser des problèmes ambigus, identifier les investissements techniques à fort levier, concevoir des systèmes qui durent, faire converger plusieurs équipes, éviter les risques systémiques, développer d'autres leaders et influencer une direction technique au-delà de sa seule codebase. Réalise le [72 : Capstone systèmes intégrés](06-ANNEXES-TRANSVERSES/72-DISTINGUISHED-SYSTEMS-CAPSTONE.md) comme démonstration d'intégration des huit axes.

**Preuves requises :** historiques de décisions, effets mesurés sur plusieurs équipes ou systèmes, adoption par des tiers, résultats durables, retour critique indépendant et distinction explicite entre contribution personnelle et résultat collectif. Le pack 76 fournit des modèles ; un modèle rempli par l'auteur n'est pas une preuve tant que les éléments n'ont pas été corroborés. Le capstone peut démontrer une maîtrise intégrée dans un contexte ; il ne remplace pas l'expérience réelle nécessaire à Staff, Principal ou Distinguished.

## Cartes de référence complémentaires

- [80 : Matrice des progressions](06-ANNEXES-TRANSVERSES/80-MATRICE-PROGRESSIONS.md).
- [81 : Traçabilité Staff](06-ANNEXES-TRANSVERSES/81-MATRICE-TRACEABILITE-STAFF.md).
- [82 : DEPTH, MLOps et applicabilité juridique](06-ANNEXES-TRANSVERSES/82-CARTOGRAPHIE-DEPTH-ET-APPLICABILITE.md).

## Projet fil rouge : évolution longitudinale

Choisir un système réaliste, avec un périmètre clairement délimité. Le faire évoluer au fil des phases :

- V0 : besoin utilisateur, hypothèses, invariants, critères d'acceptation et risques ;
- V1 : implémentation, tests et documentation minimale ;
- V2 : API/stockage, migration, compatibilité et observabilité ;
- V3 : sécurité, permissions, threat model et tests négatifs ;
- V4 : CI/CD, conteneur, artefacts reproductibles et déploiement ;
- V5 : charge, performance, budget et saturation ;
- V6 : incident, postmortem, sauvegarde, restauration et rollback ;
- V7 : évolution architecturale, plusieurs consommateurs et plan de migration ;
- V8 : brique IA optionnelle avec dataset/évaluation/ACL/coût et refus mesurés ;
- V9 : transfert à une autre personne ou équipe, revue indépendante et réduction de la dépendance à son auteur.

Ces jalons se font à des moments dictés par les acquis et l'opportunité, pas en semaines fixes. Marquer chaque version `SIMULE`, `PERSONNEL`, `COLLABORATIF`, `EXTERNE` ou `PRODUCTION` et conserver des preuves datées.

## Évaluation et rétention

Pour chaque compétence importante, le dossier de preuve doit contenir :

- la compétence précise et ses prérequis ;
- le problème et les contraintes ;
- une prédiction écrite avant l'expérience ;
- l'implémentation ou le modèle ;
- les tests positifs, négatifs et les cas limites ;
- les mesures brutes et la méthode de mesure ;
- une explication sans notes ;
- un transfert vers un contexte différent ;
- une revue indépendante quand le niveau le requiert ;
- un rappel différé et le résultat de ce rappel ;
- les limites et ce qui n'a pas été démontré.

Le statut de progression est l'un de `NOT_STARTED`, `PRACTICING`, `EVIDENCE_PENDING`, `MASTERED_IN_CONTEXT`, `TRANSFER_VERIFIED`, `EXTERNALLY_REVIEWED`. `MASTERED_IN_CONTEXT` ne signifie pas compétence universelle. Une preuve peut être rétrogradée si la rétention, le transfert ou une nouvelle contrainte révèle une lacune.

## Sources et actualité

Traiter CS2023 (ACM / IEEE Computer Society / AAAI) comme une grille de couverture, pas comme un plan de cours qu'il suffirait de recopier. Compléter par des références primaires à jour pour chaque version d'OS, langage, framework, cloud, protocole, standard de sécurité ou API. Toute ressource sensible à une version doit porter sa date de revue et un responsable. L'absence de date signifie « revue non attestée », pas « toujours à jour ».

## Chaîne minimale obligatoire pour une compétence critique

Une compétence critique n'est pas considérée acquise parce qu'une leçon ou un mini-projet a été ouvert. La séquence minimale est :

1. **Comprendre** le problème et les prérequis ;
2. **Prédire** le résultat avant d'exécuter ;
3. **Reconstruire** le mécanisme à livre fermé ;
4. **Reproduire** un exemple travaillé sans copier sa solution ;
5. **Pratiquer** sur un exercice indépendant ;
6. **Casser une hypothèse** par un cas limite ou une panne contrôlée ;
7. **Corriger et expliquer** le résultat, avec test ou mesure ;
8. **Transférer** vers un problème différent ;
9. **Revisiter** après un délai et rétrograder le statut si le mécanisme n'est plus disponible.

Le [protocole de leçon profonde](06-ANNEXES-TRANSVERSES/26-PROTOCOLE-LECON-PROFONDE.md) fixe le détail ; la [fiche apprenant](06-ANNEXES-TRANSVERSES/62-FICHE-APPRENTISSAGE-PREUVE.md) permet de l'appliquer même aux ressources historiques qui ne suivent pas encore la même forme.

## Règle de fin

AF est terminé pour un apprenant à un palier précis lorsque les preuves correspondantes sont évaluées : jamais simplement parce qu’il a atteint la dernière page. La formation elle-même reste un système vivant à réviser, mesurer et corriger. Pour toute utilisation d’un service logiciel dans un contexte réel, distingue toujours les exercices réussis, les revues externes réalisées et les conditions d’exploitation effectivement testées ; la lecture de ce curriculum ne constitue pas une certification de production.

## Passerelle Python conditionnelle

Le parcours JavaScript reste le cœur du Socle. Avant les activités Python des laboratoires Data Engineering, ML et Platform Operations, un apprenant débutant en Python doit valider la [passerelle Python](00-SOCLE/07-PYTHON-PASSERELLE/README.md). Elle n'est pas une étape universelle ni un prérequis du début du cursus.
