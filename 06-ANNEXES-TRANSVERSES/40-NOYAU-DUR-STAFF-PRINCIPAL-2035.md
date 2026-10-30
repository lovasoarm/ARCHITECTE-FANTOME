---
stability: evolutif
acte: gouvernance
noyau: oui
route: reference
---

# 40 : NOYAU DUR TECHNIQUE : STAFF → PRINCIPAL → DISTINGUISHED-EQUIVALENT (2035+)

> Cette carte ne crée pas un nouveau parcours. Elle fixe le cap professionnel et les capacités à
> construire sans prétendre prédire le titre exact du marché en 2035.

## 1. Règle de vérité

ARCHITECTE-FANTOME ne délivre pas un titre professionnel Staff, Principal ou Distinguished Engineer
par la complétion d’un parcours de 16 semaines / 192 h. Le CORE est une route d’orientation facultative qui peut fournir des preuves initiales ; il ne constitue ni la formation complète, ni une certification de préparation Staff. La formation canonique est la progression adaptative de [FORMATION-COMPLETE-INGENIERIE.md](../FORMATION-COMPLETE-INGENIERIE.md).

Une promotion réelle dépend du périmètre réellement assumé, des conséquences de décisions prises
sur la durée, de l'influence transverse, de la confiance gagnée et de l'expérience de systèmes
vivants. Les titres Staff, Principal, Distinguished et Fellow ne sont pas normalisés entre
entreprises.

## Cap professionnel adopté après confrontation des recherches (28 octobre 2026)

### Mission qui doit survivre aux changements de titre

Devenir un **expert technique individuel en architecture de systèmes logiciels** capable de
comprendre, construire, vérifier, sécuriser, livrer, exploiter et faire évoluer des systèmes
complexes sous contraintes réelles de coût, performance, disponibilité, sécurité, énergie et besoin
utilisateur. Les systèmes peuvent intégrer l'IA, mais la carrière ne dépend pas d'un modèle, d'un
fournisseur, d'un framework ou du mot « IA » dans le titre.

### Trois horizons, à ne pas confondre

| Horizon                           | Formulation de référence                                                                                                               | Rôle dans AF                                                                                                                                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Prochaine employabilité**       | Software Engineer / Backend Engineer / Full-Stack Engineer selon les postes disponibles                                                | Obtenir une expérience réelle de bout en bout ; le titre de départ dépend du marché et des preuves accessibles.                                                                                                          |
| **Premier grand jalon technique** | **Staff Engineer** ou rôle équivalent de leadership technique individuel                                                               | Montrer un impact au-delà d'une équipe, des décisions robustes et une influence sans management obligatoire.                                                                                                             |
| **Cap stratégique de long terme** | **Principal Engineer / Software Systems Architect**, spécialisé en systèmes distribués, fiabilité, sécurité et systèmes intégrant l'IA | Portée multi-systèmes ou organisationnelle, arbitrages durables et résultats mesurables.                                                                                                                                 |
| **Étoile du Nord, non garantie**  | **Distinguished Engineer / Fellow-equivalent** dans une organisation qui possède ce niveau                                             | Niveau d'impact technique exceptionnel à l'échelle de l'entreprise, parfois de l'industrie. Il dépend de résultats rares et d'une grille d'entreprise : il n'est pas une étape obligatoire ni un titre portable partout. |

**Intitulé descriptif à conserver comme ambition maximale :** _Distinguished-level Individual
Contributor : Software & Systems Architecture, including AI-enabled systems._ Ce n'est pas la
promesse que l'intitulé exact « Distinguished Engineer : Software & AI Systems Architecture »
existera, sera standard ou sera accessible dans chaque organisation en 2035.

**Décision pratique pour AF :** Staff est le premier jalon de leadership technique ; Principal est
le cap de long terme à planifier ; Distinguished/Fellow reste une possibilité au sommet, pas une
condition de réussite du parcours. L'IA est une compétence intégrée, pas une identité de carrière
exclusive.

### Pourquoi ce cadrage est plus robuste

- Les descriptions officielles de carrière montrent que les niveaux élevés mêlent architecture,
  influence, stratégie, mentorat et coordination ; ils ne désignent pas seulement un excellent codeur.
  Les niveaux et responsabilités varient selon les organisations.
- Les données du marché sont géographiques et temporelles : les projections du BLS concernent les
  États-Unis et la période 2024–2034, pas Madagascar ni l'ensemble du monde.
- Les études de productivité IA donnent des résultats contextuels : un essai publié dans
  _Management Science_ combine trois essais et 4 867 développeurs et observe +26,08 % de tâches
  terminées en moyenne, avec des résultats bruités et variables. Cela ne prouve ni une autonomie
  générale des agents ni un pourcentage universel de code qui sera automatisé en 2035.
- L'enquête Stack Overflow 2026 décrit une confiance conditionnelle : beaucoup de répondants font
  confiance à l'IA quand la sortie est facile à vérifier, beaucoup moins pour les décisions importantes.
  AF doit donc évaluer et vérifier les systèmes, pas enseigner une dépendance aveugle aux outils.

Sources primaires consultées pour cette décision :

- [GitLab : Distinguished Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/distinguished/)
- [GitLab : Principal Engineer](https://handbook.gitlab.com/job-description-library/engineering/development/management/principal-engineer/)
- [BLS : Projections professionnelles 2024–2034](https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm)
- [Management Science : essais terrain sur l'IA et les développeurs, publié le 27 février 2026](https://pubsonline.informs.org/doi/10.1287/mnsc.2025.00535)
- [Stack Overflow Developer Survey 2026 : confiance envers l'IA](https://survey.stackoverflow.co/2026/ai/data/ai-trust)

Ces sources ne permettent pas de connaître le titre gagnant de 2035. Elles suffisent à justifier la
décision d'AF : viser une capacité systémique transférable, prendre les titres comme repères de marché
révisables et ne pas bâtir le programme sur une prédiction chiffrée spectaculaire.

## Durcissement intégré au parcours : sans confondre la route complète et le CORE facultatif

Les résultats indépendants convergent sur la nécessité de prouver le jugement, le fonctionnement
réel et la capacité de vérification. AF doit renforcer les activités déjà présentes, pas empiler des modules sans objectif ni preuve ; le parcours complet n’est pas limité aux 16 semaines / 192 h du CORE :

1. **Anti-illusion de compétence :** sur une tâche nouvelle, expliquer le mécanisme, modifier le
   résultat, diagnostiquer un défaut non montré dans le cours et dire quelle observation ferait
   changer d'avis. Voir la [matrice de preuves](27-MATRICE-PREUVES-CORE.md) et l'épreuve D8.
2. **Panne contrôlée :** provoquer au moins une panne adaptée au système, détecter, limiter l'impact,
   restaurer ou revenir en arrière, puis écrire un postmortem sans réécrire l'historique.
   Réutiliser les modules SLO, panne, rollback et [Incident Commander Gate](50-INCIDENT-COMMANDER-GATE.md).
3. **Audit du travail assisté par IA :** examiner une sortie plausible mais imparfaite, vérifier tests,
   sécurité, dépendances, licences si pertinentes, coûts et limites ; ne jamais compter le code généré
   comme preuve tant que le comportement n'a pas été vérifié.
4. **Architecture sous contraintes :** comparer au moins deux options, exposer coût/risque/latence/
   fiabilité, préciser l'option refusée et le seuil qui rouvrirait la décision.
5. **Preuve mesurée :** garder tests, commits, ADR, résultats de charge ou de restauration, incidents,
   métriques disponibles et retour contradictoire. Une simulation reste étiquetée T0 ; elle n'est pas
   transformée en expérience professionnelle.
6. **Transfert et révision :** déplacer un principe vers un autre contexte, puis revisiter la décision
   après un changement de contrainte ou une période d'exploitation quand le contexte le permet.

La vérification formelle avancée, le chaos engineering à grande échelle, la recherche ML, l'entraînement
de modèles de fondation et l'optimisation GPU sont des approfondissements ciblés, pas des prérequis
universels du CORE. Ils sont ajoutés en DEPTH/VAULT uniquement si le besoin du projet ou la spécialité
visée le justifie.

## Extension Depth : systèmes complets et preuves cumulatives

Le noyau ne se valide pas en accumulant une grande quantité de prototypes. Après le CORE, le
[Portefeuille avancé 2035+](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/README.md) propose :

- une base réutilisable d'observabilité et d'incident ([Tour de Contrôle]) ;
- un laboratoire de régression des systèmes IA ([Tribunal des IA]) ;
- un RAG à droits documentaires, un gateway de modèles et un orchestrateur agentique ;
- une plateforme de livraison, un coffre de sécurité et une application local-first ;
- une implémentation pédagogique de stockage persistant puis, séparément, de consensus ;
- un assistant de revue sur code, RFC et ADR qui réutilise des preuves existantes.

Ces projets sont Depth, pas CORE. Le parcours doit rester **unithread : un projet actif à la fois**. Les versions locales sont le défaut ; les coûts cloud, les GPU, Kubernetes et les APIs payantes ne sont pas des conditions d'entrée. Pour la liste complète des critères, vois le README du portefeuille et le [contrat commun](../05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/00-CONTRAT-COMMUN.md).

La diplomation et le statut professionnel sont séparés par le [contrat de diplôme AF](56-DIPLOME-AF-ET-REVUE-EXTERNE.md). Une distinction AF de portfolio peut attester une revue stricte ; elle ne confère pas le rang employeur Distinguished Engineer.

## 2. Les noyaux réellement non négociables

### N1 : Software engineering fondamental

Tu dois pouvoir expliquer et utiliser sans dépendre d'une recette :

- langage et runtime de travail ;
- structures de données essentielles ;
- complexité temporelle et spatiale ;
- algorithmes courants et choix de représentation ;
- modularité, couplage, cohésion et contrats ;
- tests, stratégie de test et régression ;
- debugging par hypothèses et preuves ;
- concurrence, asynchronisme et gestion des ressources ;
- mémoire, performance et profiling ;
- Git, versioning et changements sûrs.

**Preuve attendue :** produire, diagnostiquer, modifier sans casser, expliquer le compromis et revenir sur une décision quand une observation la contredit.

### N2 : Systèmes et informatique sous-jacente

Tu dois posséder un modèle mental suffisant de :

- processus, threads et isolation ;
- mémoire et persistance ;
- I/O ;
- réseau, latence, débit et timeouts ;
- DNS, HTTP et contrats de service ;
- stockage et indexation ;
- cache ;
- files, streams et événements ;
- réplication, partition et cohérence ;
- pannes partielles et récupération ;
- observabilité.

Il n'est pas nécessaire de devenir ingénieur kernel pour être Staff Architect, mais une abstraction qui casse sous incident ne peut pas être remplacée par du vocabulaire.

### N3 : Architecture et conception

Tu dois pouvoir :

- partir des contraintes avant des technologies ;
- définir frontières et responsabilités ;
- comparer plusieurs options ;
- expliciter invariants et compromis ;
- distinguer décision réversible et irréversible ;
- concevoir pour l'évolution ;
- migrer un système vivant sans imposer une réécriture aveugle ;
- intégrer sécurité, fiabilité, coût et opérabilité dans l'architecture ;
- défendre une décision puis produire le meilleur argument contre elle.

### N4 : Fiabilité, sécurité et exploitation

Tu dois pouvoir raisonner sur :

- SLI / SLO et budgets d'erreur ;
- modes de panne ;
- timeouts, retries, idempotence et backpressure ;
- détection, mitigation, récupération et postmortem ;
- threat modeling, identité, permissions et supply chain ;
- secrets, données sensibles et frontières de confiance ;
- déploiement, rollback et changement progressif ;
- observabilité utile à une décision.

### N5 : Données, performance et économie

Tu dois pouvoir relier :

```text
architecture
    ↓
data / trafic / charge
    ↓
performance / coût / fiabilité
    ↓
décision produit
```

Le noyau comprend :

- modèle de données et compromis SQL / NoSQL ;
- cache et invalidation ;
- capacité et saturation ;
- profiling et mesure ;
- coût fixe / variable ;
- coût d'exploitation ;
- ROI et coût d'opportunité ;
- FinOps / GreenOps lorsque pertinent.

### N6 : Intelligence artificielle : littératie mathématique et systèmes

Pour un Staff / Principal Software Architect, l'objectif n'est pas de devenir chercheur ML. Il faut cependant comprendre suffisamment le mécanisme pour **architecturer, évaluer et refuser correctement** une solution IA.

#### Fondations mathématiques minimales

- vecteurs et matrices ;
- produit scalaire et normes ;
- représentation en espace vectoriel ;
- probabilité conditionnelle et Bayes ;
- espérance, variance et incertitude ;
- échantillonnage et estimation ;
- fonctions, dérivées et gradient ;
- fonction de perte / objectif ;
- intuition de la descente de gradient ;
- compromis biais / variance ;
- corrélation, causalité et fuite de données.

La maîtrise requise est une **compréhension opérationnelle**, pas la mémorisation de démonstrations universitaires sans application.

#### ML / deep learning minimal

Tu dois pouvoir expliquer :

```text
données
  ↓
représentation / features
  ↓
modèle
  ↓
fonction de perte
  ↓
entraînement
  ↓
validation
  ↓
généralisation
```

et reconnaître :

- apprentissage supervisé / non supervisé / auto-supervisé ;
- train / validation / test ;
- overfitting et underfitting ;
- regularization ;
- métriques et seuils ;
- fuite de données ;
- distribution shift ;
- incertitude et limites d'un modèle.

#### LLM / systèmes modernes

Tu dois pouvoir expliquer au minimum :

```text
tokenisation
    ↓
embeddings
    ↓
représentations vectorielles
    ↓
attention / Transformer
    ↓
prédiction de tokens
    ↓
inférence
```

et distinguer :

- contexte ;
- paramètres du modèle ;
- prompt ;
- RAG ;
- fine-tuning ;
- évaluation ;
- hallucination / erreur de modèle ;
- coût et latence ;
- confidentialité et sécurité ;
- permissions et limites d'un agent ;
- rollback / kill switch ;
- observabilité d'une brique IA.

**Règle :** une API d'IA utilisée sans compréhension de ses limites n'est pas une preuve de maîtrise IA.

Le pont détaillé est dans [`41-PONT-MATHS-IA-ML-LLM.md`](41-PONT-MATHS-IA-ML-LLM.md).

### N7 : Produit, communication et influence

Tu dois pouvoir :

- reformuler un besoin ambigu ;
- distinguer problème, solution et non-objectifs ;
- parler coût, risque, délai et impact ;
- écrire une décision lisible par plusieurs publics ;
- négocier un désaccord technique ;
- influencer sans autorité hiérarchique ;
- mentoriser avec un objectif observable ;
- transformer une décision technique en preuve réutilisable.

### N8 : Jugement Staff

Le vrai noyau Staff est la capacité à tenir une décision quand l'information est incomplète.

```text
problème ambigu
      ↓
hypothèse
      ↓
mesure / observation
      ↓
diagnostic
      ↓
arbitrage
      ↓
décision
      ↓
perturbation
      ↓
révision
      ↓
transfert
```

C'est ici que les preuves D1–D8 deviennent déterminantes. Bloom explique le type d'action cognitive ; D1–D8 mesure une profondeur de preuve propre à AF.

### N9 : Transfert

Une compétence Staff n'est pas attachée à une stack particulière.

Tu dois pouvoir prendre un mécanisme, identifier ses invariants, expliquer ce qui change avec le contexte et reconstruire une décision ailleurs.

```text
principe appris
     ↓
nouveau contexte
     ↓
invariants conservés + hypothèses cassées
     ↓
adaptation
     ↓
nouvelle preuve
```

### N10 : Principal : stratégie et portée temporelle

Principal n'est pas « Staff avec davantage de fichiers ». Le saut est surtout un changement de portée.

Un futur Principal doit progressivement apprendre à :

- construire une vision technique sur plusieurs trimestres / années ;
- distinguer dette locale et dette systémique ;
- définir des standards qui évitent de répéter les mêmes erreurs ;
- raisonner en portefeuille de systèmes et d'investissements ;
- choisir ce qu'il faut centraliser, standardiser ou laisser autonome ;
- faire évoluer une architecture organisationnelle aussi bien qu'une architecture logicielle ;
- créer des cadres dans lesquels d'autres ingénieurs peuvent décider correctement ;
- développer d'autres leaders techniques ;
- mesurer l'effet d'une stratégie après adoption, pas seulement à son lancement ;
- abandonner une stratégie devenue fausse.

Ces capacités sont **préparées**, pas certifiées par le parcours intensif de 16 semaines.

## 3. Ce qui doit être maîtrisé en CORE

Le CORE doit verrouiller les fondations nécessaires pour raisonner :

```text
Software
+ Systems
+ Architecture
+ Reliability / Security
+ Data / Performance / Cost
+ AI architectural literacy
+ Decision / Influence
+ Transfer
```

Le CORE reste une option de 16 semaines / 192 h, jamais la limite de la formation. Cette carte décrit les niveaux de compréhension et de preuve attendus dans la formation complète et dans les expériences terrain successives.

La **CORE AI literacy** couvre uniquement le modèle mental nécessaire pour architecturer et gouverner une brique IA : données → modèle → évaluation, et pour un LLM tokenisation → embeddings → attention/Transformer → inférence, avec limites, métriques, coût, sécurité et conditions d’arrêt. Le pont complet math/ML/LLM (`41-PONT-MATHS-IA-ML-LLM.md`) reste **DEPTH**.

Les parties mathématiques avancées, le ML spécialisé, les architectures de GPU, l'entraînement distribué à grande échelle, la recherche de nouveaux modèles et les détails de kernel/compilateur restent DEPTH ou VAULT sauf choix explicite d'une spécialisation.

## 4. Ce qui ne doit pas devenir une fausse exigence

Ne pas transformer la sortie Staff en liste obligatoire de :

- fournisseurs cloud ;
- frameworks ;
- modèles IA ;
- langages ;
- certifications ;
- outils de mode.

Le noyau doit rester formulé en **mécanismes, décisions, invariants et preuves**.

## 5. Critère de sortie honnête

La bonne question finale n'est pas :

> « Combien de technologies connais-tu ? »

mais :

> « Peux-tu comprendre un système inconnu, formuler des hypothèses, mesurer, diagnostiquer, choisir, défendre, exploiter, transférer et réviser ton modèle quand les contraintes changent : y compris lorsqu'une partie du système est pilotée par l'IA ? »

Pour la décision de sortie, l'autorité reste [`37-STAFF-READINESS-GATE.md`](37-STAFF-READINESS-GATE.md), avec les preuves et matrices déjà définies par AF.
