---
stability: evolutif
acte: gouvernance
noyau: oui
route: reference
---

# 40 : NOYAU DUR STAFF / PRINCIPAL 2035+

> Cette carte ne crée pas un nouveau parcours. Elle répond à une question unique : **qu'est-ce qu'un apprenant doit réellement savoir comprendre, faire et prouver pour être prêt à exercer des responsabilités Staff, puis à progresser vers Principal, dans un métier Software / Solutions Architecture durable ?**

## 1. Règle de vérité

ARCHITECTE-FANTOME ne délivre pas un titre professionnel Staff Engineer ou Principal Engineer en seize semaines. La route CORE certifie une **préparation intensive et démontrable** : des fondations, des preuves et des comportements de décision qui accélèrent la trajectoire.

Une promotion réelle dépend ensuite du scope, des conséquences de décisions prises dans la durée, de l'influence entre équipes et de l'expérience de systèmes vivants.

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

La route reste **16 semaines / 192 h**. Cette carte n'ajoute aucune heure : elle décrit le niveau de compréhension et de preuve attendu dans les activités déjà prévues.

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
