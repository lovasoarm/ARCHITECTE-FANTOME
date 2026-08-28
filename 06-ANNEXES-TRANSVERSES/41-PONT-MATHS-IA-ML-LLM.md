---
stability: evolutif
acte: approfondissement
noyau: renfort
route: depth
---

# 41 : PONT MATHS → IA → ML → DEEP LEARNING → LLM

> Ce document ne crée pas un second cursus d'IA. Il fournit le modèle mental minimum qui permet à un Software / Solutions Architect de comprendre ce qu'il intègre, mesure et gouverne.

## 1. Pourquoi ce pont existe

AF possède déjà les bases mathématiques utiles au développeur et des projets d'IA gouvernée. Ce pont ferme la continuité manquante entre ces deux mondes sans prétendre former un chercheur en machine learning.

La profondeur demandée suit :

```text
intuition
  ↓
mécanisme
  ↓
mesure
  ↓
limite
  ↓
décision d'architecture
```

## 2. Algèbre linéaire minimale

Un vecteur est une représentation ordonnée de composantes. Une matrice peut représenter une transformation ou une relation entre plusieurs ensembles de composantes.

Le produit scalaire :

```text
x · y = Σ xᵢyᵢ
```

sert notamment à mesurer une relation entre deux vecteurs. Une norme mesure leur grandeur.

Pourquoi c'est important : les embeddings représentent des éléments dans un espace vectoriel. Beaucoup de calculs de similarité, de recherche et d'attention reposent sur des opérations matricielles et vectorielles.

À comprendre :

- dimension ;
- norme ;
- produit scalaire ;
- matrice ;
- transformation ;
- similarité vectorielle.

Pas nécessaire en CORE : démonstrer toute l'algèbre linéaire avancée ou mémoriser des décompositions sans cas d'usage.

## 3. Probabilités et statistiques

Une sortie probabiliste est une mesure d'incertitude ou une distribution selon le modèle utilisé ; elle n'est pas une preuve de vérité.

À savoir utiliser :

```text
P(A|B) = P(B|A)P(A) / P(B)
```

pour raisonner sur les probabilités conditionnelles et les hypothèses.

À comprendre :

- variable aléatoire ;
- distribution ;
- espérance ;
- variance ;
- échantillonnage ;
- estimation ;
- corrélation ;
- causalité ;
- incertitude ;
- biais d'échantillonnage ;
- data leakage.

Le point Staff n'est pas de calculer des exercices abstraits. Il est de pouvoir dire **quelle incertitude une mesure cache et quelle décision elle permet réellement**.

## 4. Optimisation et apprentissage

Un entraînement cherche à réduire une fonction de perte ou à optimiser un objectif.

```text
paramètres
   ↓
modèle
   ↓
prediction
   ↓
loss
   ↓
gradient
   ↓
mise à jour des paramètres
   ↺
```

Le gradient indique localement dans quelle direction une fonction varie le plus fortement. La descente de gradient utilise cette information pour rechercher des paramètres qui réduisent l'objectif.

À comprendre :

- fonction objectif ;
- dérivée / gradient ;
- learning rate ;
- convergence ;
- minima locaux / plats selon le contexte ;
- régularisation ;
- généralisation.

Une phrase comme « le modèle apprend grâce à l'IA » n'est pas une explication suffisante.

## 5. ML : généraliser plutôt que mémoriser

Le schéma minimum est :

```text
Données d'entraînement
        ↓
      Modèle
        ↓
Validation / réglage
        ↓
Test séparé
        ↓
Généralisation sur données nouvelles
```

À distinguer :

- overfitting : le modèle s'ajuste trop aux données observées ;
- underfitting : le modèle est trop pauvre pour capturer le signal utile ;
- biais / variance : sources différentes d'erreur ;
- distribution shift : le contexte réel change ;
- métrique hors contexte : une métrique excellente peut correspondre à une décision réelle médiocre.

## 6. Réseaux de neurones : le minimum utile à l'architecte

Un réseau compose des transformations paramétrées et des fonctions non linéaires.

```text
entrée
 ↓
transformation
 ↓
activation
 ↓
transformation
 ↓
sortie
```

L'entraînement ajuste les paramètres pour réduire l'erreur mesurée par la fonction de perte. La rétropropagation calcule efficacement les gradients nécessaires aux mises à jour.

L'architecte n'a pas besoin de dériver tous les gradients à la main pour chaque réseau. Il doit pouvoir expliquer **ce qui est optimisé, sur quelles données, avec quelle métrique et avec quels modes d'échec**.

## 7. Embeddings et représentation

Un embedding transforme un objet discret en représentation vectorielle exploitable par des calculs de proximité ou par un modèle.

```text
objet
  ↓
embedding
  ↓
vecteur
  ↓
relation / recherche / contexte
```

Important : une proximité vectorielle n'est pas une preuve d'identité, de vérité ou de causalité.

## 8. Attention et Transformer

Le modèle mental minimum : l'attention permet à une représentation de pondérer des informations provenant d'autres positions du contexte.

La construction classique utilise des projections `Q`, `K` et `V`. Une forme simplifiée est :

```text
Attention(Q,K,V)
= softmax(QKᵀ / √dₖ)V
```

Cette équation n'est pas à mémoriser pour elle-même. Elle sert à comprendre qu'il existe :

- des représentations de requête, clé et valeur ;
- un calcul de scores ;
- une normalisation des poids ;
- une combinaison d'informations ;
- un coût computationnel associé.

Un Transformer n'est donc pas une « boîte qui raisonne ». C'est une architecture de calcul entraînée sur des objectifs déterminés.

## 9. LLM

Le modèle mental minimal :

```text
texte
 ↓
tokenisation
 ↓
embeddings + informations de position
 ↓
blocs Transformer
 ↓
distribution sur prochains tokens
 ↓
sélection / échantillonnage
 ↓
texte produit
```

À distinguer :

- connaissance mémorisée dans les paramètres ;
- contexte fourni à l'inférence ;
- récupération externe ;
- comportement demandé par le prompt ;
- garde-fous et validation ;
- erreurs de génération.

Une probabilité élevée pour un token ne signifie pas que l'assertion produite est vraie.

## 10. RAG, fine-tuning et agents

### RAG

```text
question
 ↓
recherche de contexte
 ↓
documents récupérés
 ↓
contexte fourni au modèle
 ↓
génération
 ↓
validation
```

RAG améliore l'accès à une source récupérée ; il ne garantit ni pertinence, ni exactitude, ni sécurité du contexte.

### Fine-tuning

Le fine-tuning modifie les paramètres d'un modèle à partir d'un jeu de données d'entraînement. Il ne doit pas être présenté comme un mécanisme magique d'ajout fiable de connaissances.

### Agent

Un agent combine généralement un modèle, un état ou contexte, des outils et une boucle de décision.

```text
objectif
 ↓
modèle
 ↓
décision / outil
 ↓
observation
 ↺
```

Un système agentique doit donc posséder des permissions, des limites, une politique d'arrêt et des traces vérifiables.

## 11. Ce que l'architecte doit mesurer

Pour une brique IA, ne pas réduire la qualité à « ça répond bien ».

Évaluer selon le système :

- qualité de tâche ;
- robustesse ;
- taux d'erreur ;
- coûts variables ;
- latence ;
- débit ;
- disponibilité ;
- sécurité ;
- confidentialité ;
- provenance / traçabilité ;
- dérive ;
- comportement hors distribution ;
- possibilité de rollback / arrêt.

## 12. Noyau dur à savoir expliquer sans notes

Avant d'aller vers une spécialisation ML/AI, tu dois pouvoir expliquer avec tes propres mots :

- ce qu'est un vecteur et pourquoi un embedding en est un ;
- ce que représentent une matrice et une transformation ;
- pourquoi une probabilité n'est pas une vérité ;
- ce qu'optimise une fonction de perte ;
- à quoi sert un gradient ;
- pourquoi train/validation/test existent ;
- ce qu'est l'overfitting ;
- pourquoi une métrique peut être trompeuse ;
- ce qu'est une attention ;
- le rôle général de Q/K/V ;
- ce qu'est un Transformer ;
- pourquoi un LLM prédit des tokens ;
- ce que RAG change et ce qu'il ne garantit pas ;
- ce que le fine-tuning change ;
- pourquoi un agent doit être borné et observable.

Cette liste est un **noyau de compréhension**, pas une certification de chercheur ML.

## 13. Niveau suivant

À placer en DEPTH seulement lorsque le problème l'exige :

- SVD / PCA ;
- optimisation avancée ;
- CNN / architectures spécialisées ;
- entraînement distribué ;
- quantification et compression ;
- LoRA et autres méthodes d'adaptation ;
- architecture GPU ;
- systèmes de serving avancés ;
- évaluation expérimentale avancée ;
- modèles multimodaux ;
- diffusion ;
- reinforcement learning.

Les sujets de recherche de modèle et d'implémentation accélérateur restent VAULT / spécialisation.

## 14. Preuve d'architecture

Une preuve suffisante n'est pas un exposé théorique isolé.

Elle doit relier :

```text
mécanisme compris
      ↓
choix d'architecture
      ↓
mesure
      ↓
limite observée
      ↓
arbitrage
      ↓
validation / perturbation
      ↓
révision si nécessaire
```

Pour la sortie Staff, les preuves IA restent gouvernées par `PREUVES-STAFF-ENGINEER.md` et `37-STAFF-READINESS-GATE.md`.

## 11. Labs exécutables DEPTH

Pour transformer ces mécanismes en intuition expérimentale sans ajouter de charge CORE, voir [45-LABS-IA-ML-DEPTH.md](45-LABS-IA-ML-DEPTH.md).
