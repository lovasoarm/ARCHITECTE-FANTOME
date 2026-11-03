---
stability: evolutif
acte: apprendre-et-pratiquer
noyau: oui
route: formation-complete
niveau: C-F
last_reviewed: 2026-10-31
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 71 : Mathématiques & Machine Learning : comprendre, entraîner, évaluer

## Pourquoi ce module mérite ton temps

Intégrer un LLM ou appeler une API de modèle ne suffit pas à comprendre le comportement d'un système intelligent. Un ingénieur doit savoir ce qu'une donnée représente, ce qu'un modèle optimise, ce qu'une métrique mesure, comment une évaluation peut mentir et à quel moment un modèle n'est pas le bon outil.

Ce module ne cherche pas à former un chercheur en apprentissage profond. Il construit le socle mathématique et expérimental nécessaire pour entraîner un modèle simple, l'évaluer honnêtement, interpréter ses limites et décider comment l'intégrer dans un système logiciel.

## Prérequis

Avant toute exécution Python, réalise ou valide par preuve la [passerelle Python pour débutants absolus](../../00-SOCLE/07-PYTHON-PASSERELLE/README.md). Elle enseigne le langage utilisé ici ; elle ne remplace pas les prérequis SQL, mathématiques ou ML propres à ce module.

- fonctions, boucles, tableaux/listes, modules et tests ;
- moyenne, pourcentage, équations simples et lecture de graphiques ;
- notions de base sur les données structurées ;
- Python 3.12+ comme plancher de compatibilité annoncé pour les laboratoires (bibliothèque standard uniquement). Pour une nouvelle installation au 31 octobre 2026, préfère Python 3.15.x (dernier correctif stable : 3.15.2 ; branche en correctifs réguliers). Python 3.14.x reste également en correctifs réguliers ; Python 3.12 est en correctifs de sécurité uniquement. Vérifie les versions prises en charge dans le [calendrier officiel Python](https://devguide.python.org/versions/) et les [téléchargements officiels](https://www.python.org/downloads/).

Tu peux faire les calculs à la main sur les premiers exercices. Le code doit ensuite confirmer le raisonnement, pas le remplacer.

## Progression obligatoire

| Étape | Sujet                        | Résultat attendu                                                                         | Preuve                                        |
| ----- | ---------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------- |
| 1     | Algèbre linéaire pratique    | Comprendre scalaire, vecteur, matrice, norme, produit scalaire et projection             | Calcul manuel + script testé                  |
| 2     | Statistiques et probabilités | Résumer une distribution, raisonner sur base rate, conditionnelle et incertitude         | Analyse d'un jeu de données                   |
| 3     | Optimisation                 | Expliquer perte, dérivée, gradient, learning rate et convergence                         | Régression entraînée par descente de gradient |
| 4     | Apprentissage supervisé      | Distinguer régression et classification, baseline et modèle                              | Modèle logistique entraîné et comparé         |
| 5     | Généralisation               | Séparer train/validation/test, détecter fuite, overfitting et changement de distribution | Protocole d'évaluation sans fuite             |
| 6     | Métriques et seuils          | Interpréter précision, rappel, F1, matrice de confusion et coût des erreurs              | Seuil choisi selon le risque métier           |
| 7     | Mise en service              | Relier modèle, API, données, dérive, latence, coût et rollback                           | Fiche de décision d'intégration               |

## Laboratoire local

Le laboratoire n'utilise ni NumPy ni scikit-learn. Les opérations de base sont écrites volontairement pour rendre visibles les calculs. Lance :

```bash
cd lab
python -m unittest discover -s tests -v
python run_experiment.py
```

Le jeu de mesures est synthétique et reproductible : 480 observations, seed `20261030`, génération par `lab/generate_dataset.py`, avec un changement de régime volontaire après la ligne 360. Il sert à vérifier le protocole expérimental, pas à démontrer une performance clinique, industrielle ou opérationnelle. Il ne remplace pas une donnée réelle documentée avec licence, provenance, population cible et biais connus.

## Noyau mathématique à maîtriser

### Algèbre linéaire

- un scalaire est une valeur ; un vecteur ordonne plusieurs valeurs ; une matrice organise des vecteurs ;
- le produit scalaire combine des composantes et permet notamment de calculer un score linéaire ;
- une norme mesure une grandeur vectorielle ; la similarité cosinus compare une orientation, pas la vérité sémantique ;
- les dimensions doivent être compatibles : un calcul numériquement valide peut être conceptuellement faux si les colonnes n'ont pas le même sens ou la même unité.

### Statistiques et probabilités

- moyenne, médiane, variance, écart-type et quantiles décrivent des aspects différents d'une distribution ;
- une probabilité est conditionnée par un événement, un échantillon et un modèle ;
- le taux de base compte : un détecteur peut sembler précis alors que la majorité de ses alertes sont fausses lorsque l'événement est rare ;
- une corrélation ne prouve pas une causalité ;
- l'incertitude ne disparaît pas parce qu'un modèle renvoie un nombre avec plusieurs décimales.

### Probabilité conditionnelle : pourquoi le taux de base change tout

Imagine un défaut rare présent dans **1 %** des équipements. Un détecteur a une sensibilité de **90 %** (il signale 90 % des vrais défauts) et une spécificité de **95 %** (il laisse tranquilles 95 % des équipements sains).

Sur 10 000 équipements :

- 100 ont réellement le défaut ; 90 seront détectés et 10 seront manqués ;
- 9 900 sont sains ; 5 % d'entre eux, soit 495, déclencheront une fausse alerte ;
- parmi les 585 alertes, seules 90 sont de vrais défauts.

La valeur prédictive positive est donc `90 / (90 + 495) ≈ 15,4 %`. Un détecteur qui semble « précis à 90 % » peut produire surtout de fausses alertes lorsque le défaut est rare. Tu dois distinguer sensibilité, spécificité, précision et taux de base avant de choisir un seuil.

**Exercice :** refais le calcul avec une prévalence de 10 %, puis explique pourquoi la précision change alors que sensibilité et spécificité restent identiques. Décide si une alerte déclenche automatiquement une intervention ou une inspection humaine.

### Optimisation et apprentissage

- une fonction de perte quantifie l'écart selon un objectif défini ;
- le gradient indique une direction locale de variation ;
- le learning rate contrôle l'amplitude des mises à jour ; trop petit, l'apprentissage est lent ; trop grand, il peut diverger ;
- une perte qui diminue sur train n'assure pas la généralisation ;
- la régularisation et la validation servent à limiter les solutions qui mémorisent les données.

### Évaluation honnête

- définir les métriques et les seuils avant de regarder les résultats ;
- séparer les données par temps, entité ou groupe lorsque le problème l'exige ;
- ne pas entraîner, normaliser ou sélectionner les caractéristiques à partir des données de test ;
- comparer à une baseline simple ;
- regarder les faux positifs et faux négatifs dans leur contexte métier ;
- surveiller dérive de données, dérive de performance, latence, coût et taux d'abstention après mise en service.

## Laboratoire : barrière anti-fuite

Le fichier `lab/ml_core.py` contient les fonctions de calcul, la standardisation, un classifieur logistique minimal, le split chronologique trois voies, le Brier score et la sélection de seuil par coût. Le test ferme le split et empêche d’utiliser le test pour sélectionner le seuil. Les 13 tests vérifient dimensions, stabilité numérique, métriques, séparation temporelle et contraintes du dataset. Lis le code et explique-le avant de le modifier.

Le fichier `lab/data/maintenance.csv` contient 480 mesures synthétiques ordonnées dans le temps. Le label `overheat` illustre une classification binaire et un changement de régime est introduit dans le dernier quart. Ne mélange pas les lignes au hasard : le temps fait partie de la structure du problème. Le script `lab/generate_dataset.py` permet de reproduire le fichier à l’octet près avec la seed documentée. Le résultat de l’expérience doit toujours être relu : un changement de seed, de split ou de coût d’erreur modifie les métriques et peut inverser le choix de seuil.

## Expérience obligatoire

1. Calcule une baseline naïve sur l'ensemble d'entraînement.
2. Sépare chronologiquement train (60 %), validation (20 %) et test (20 %) ; le test reste fermé jusqu'à la fin.
3. Ajuste le standardiseur sur train uniquement, puis applique ces paramètres sans les recalculer.
4. Entraîne un modèle logistique ; conserve la courbe de perte.
5. Choisis le seuil sur validation à partir d'un coût d'erreur explicite, sans consulter le test.
6. Compare baseline et modèle sur test avec matrice de confusion, précision, rappel, F1 et Brier score.
7. Analyse le changement de régime en comparant les taux de classe et les erreurs par période.
8. Décide si le modèle apporte assez de valeur pour justifier son coût et son risque.

## Calibration, incertitude et validité externe

Un score de 0,8 n'est une probabilité utile que si les prédictions comparables à 0,8 se réalisent approximativement dans 80 % des cas sur une population et une période pertinentes. La calibration ne remplace pas le classement (ranking), pas plus qu'une bonne AUC ne garantit une bonne décision au seuil choisi.

Exercice obligatoire : regroupe les prédictions en intervalles de score, compare score moyen et fréquence observée, puis décris les limites d'un petit échantillon. Découpe les résultats par période et par type d'équipement lorsque ces groupes ont un sens opérationnel. N'interprète pas une différence faible sur quelques lignes comme une preuve de disparité ou d'équité.

Pour chaque conclusion statistique, précise population cible, unité d'analyse, fenêtre de temps, taille d'échantillon, taux de base, données absentes et mécanisme de collecte. Si ces éléments sont inconnus, présente le résultat comme une hypothèse à vérifier, non comme un fait.

## Exemple de rapport local (reproductibilité, pas généralisation)

Sur la fixture livrée au 30 octobre 2026, le protocole utilise 288 lignes train, 96 validation et 96 test. Le modèle donne une accuracy de 0,7604 et un Brier score de 0,1557 au seuil 0,5 ; le seuil choisi sur validation pour un coût faux négatif quatre fois supérieur au faux positif est 0,20. Sur test, ce seuil donne 52 vrais positifs, 19 vrais négatifs, 22 faux positifs et 3 faux négatifs. La baseline majorité donne 41 vrais négatifs et 55 faux négatifs.

Ces valeurs sont des résultats reproductibles d'une fixture synthétique particulière. Elles ne sont ni un benchmark externe, ni une estimation de performance réelle, ni une promesse que le modèle sera utile hors de ce jeu. Le seuil 0,20 montre explicitement le compromis : moins de faux négatifs, davantage de faux positifs.

## Questions que tu dois savoir défendre

- Pourquoi ne pas utiliser le taux de réussite global quand les classes sont déséquilibrées ?
- Dans quel cas un split aléatoire crée-t-il une fuite temporelle ?
- Pourquoi un meilleur score test n'implique-t-il pas automatiquement une meilleure décision métier ?
- Pourquoi entraîner un modèle plus complexe qu'une régression logistique ?
- À quel moment une règle déterministe est-elle préférable ?
- Qui porte le risque si le modèle ne sait pas répondre ?
- Comment détecter une dégradation après un changement de données ?

## Gate de sortie

Tu dois expliquer et montrer :

- les dimensions et unités des vecteurs manipulés ;
- l'effet du learning rate sur une courbe d'apprentissage ;
- la différence train/validation/test et un scénario de fuite ;
- une matrice de confusion avec un seuil choisi et justifié ;
- le gain par rapport à une baseline ;
- une limite du jeu synthétique et une limite du modèle ;
- une décision d'architecture : modèle, règle métier, abstention ou absence de ML.

## Limites et honnêteté

Ce module ne couvre pas à fond la recherche ML, l'entraînement distribué massif, CUDA, la conception d'architectures profondes ou la preuve statistique avancée. Ces sujets restent des spécialisations. Une expérience locale sur données synthétiques ne valide jamais un modèle destiné à une population ou un système réel.

## Intégration au parcours

- [Pont maths → IA/ML/LLM](../41-PONT-MATHS-IA-ML-LLM.md)
- [Labs IA/ML](../45-LABS-IA-ML-DEPTH.md)
- [Évaluation et service IA/RAG](../60-LAB-SERVICE-IA-END-TO-END.md)
- [Data Engineering](../70-DATA-ENGINEERING-CORE/README.md)
- [Capstone intégré](../72-DISTINGUISHED-SYSTEMS-CAPSTONE.md)
