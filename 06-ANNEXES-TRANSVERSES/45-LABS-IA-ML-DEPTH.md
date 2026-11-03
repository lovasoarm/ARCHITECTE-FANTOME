---
stability: evolutif
acte: approfondissement
noyau: renfort
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 45 : LABS IA / ML : DEPTH, DE L'INTUITION AU SYSTÈME

> Ces labs ne créent pas un cursus de recherche en machine learning. Ils rendent exécutables les intuitions du pont `41-PONT-MATHS-IA-ML-LLM.md` avec des expériences petites, locales et mesurables.
>
> **Temps CORE ajouté : 0 h.** Ces labs sont DEPTH. Ils peuvent être réalisés séparément, selon les lacunes observées ou l'orientation du projet.

## Contrat commun

Pour chaque lab :

```text
observer
→ formuler une hypothèse
→ exécuter
→ mesurer
→ expliquer
→ casser volontairement une hypothèse
→ documenter ce qui change
```

Utilise le runtime déjà prévu par AF lorsque cela suffit. Les exemples ci-dessous sont volontairement sans dépendance lourde : l'objectif est de comprendre le mécanisme, pas d'apprendre un framework.

---

## LAB 1 : Descente de gradient sur une régression minimale

### Intuition durable

Un modèle apprend en modifiant ses paramètres pour réduire une fonction de perte. Le gradient fournit une information locale sur la direction de variation.

### Expérience

Dans un petit script Node.js, ajuste `w` et `b` pour approcher :

```text
x → y = 2x + 1
```

Utilise une perte quadratique moyenne et une boucle de descente de gradient.

Mesure à chaque itération :

```text
loss
w
b
```

### Ce que tu dois produire

- le script exécutable ;
- un tableau des valeurs initiales puis finales ;
- une explication de l'effet du learning rate ;
- une expérience où le learning rate est volontairement trop grand.

### Preuve minimale

Tu dois pouvoir montrer un cas où la perte diminue et un cas où l'apprentissage devient instable ou diverge.

### Ne pas conclure

« Le gradient garantit qu'on trouve toujours la meilleure solution. » Le comportement dépend de la fonction, des données, des paramètres et de l'algorithme.

---

## LAB 2 : Généralisation, overfitting et fuite de données

### Intuition durable

Un modèle utile doit généraliser à des données qu'il n'a pas vues. Une métrique sur les données d'entraînement ne suffit pas.

### Expérience

Construis un petit jeu de données synthétique et compare :

```text
train
validation
test
```

Crée volontairement deux conditions :

1. modèle trop simple ;
2. modèle trop flexible.

Puis introduis volontairement une fuite d'information entre train et test.

### Mesure

Compare les performances sur :

```text
train
validation
test
```

### Preuve minimale

Explique quelle métrique devient trompeuse lorsque la fuite existe et pourquoi le résultat ne doit pas être utilisé comme preuve de généralisation.

### Transfert

Relie l'expérience à une décision d'architecture : pourquoi une excellente métrique hors contexte peut conduire à une mauvaise décision en production.

---

## LAB 3 : Embeddings et similarité vectorielle

### Intuition durable

Un embedding représente un objet sous forme vectorielle ; la proximité calculée dans cet espace dépend de la représentation et de la métrique choisie.

### Expérience

Crée au moins six vecteurs courts représentant des documents ou concepts artificiels.

Implémente :

```text
produit scalaire
norme
cosine similarity
```

Puis compare les voisins les plus proches.

### Ce que tu dois produire

- le calcul ;
- trois paires attendues comme proches ;
- une paire volontairement surprenante ;
- une explication de la limite de la proximité vectorielle.

### Preuve minimale

Démontrer :

```text
similarité ≠ vérité
similarité ≠ identité
similarité ≠ causalité
```

---

## LAB 4 : Attention simplifiée

### Intuition durable

L'attention calcule des poids reliant une représentation à d'autres représentations du contexte.

### Expérience

À partir de petits vecteurs, implémente une version minimale de :

```text
scores = QKᵀ / √d
poids  = softmax(scores)
sortie = poids × V
```

Pas besoin d'entraîner un Transformer complet.

Fais varier une seule valeur de `Q` et observe comment changent les poids.

### Ce que tu dois produire

- les matrices `Q`, `K`, `V` ;
- les scores avant softmax ;
- les poids après softmax ;
- la sortie ;
- une explication du rôle de `Q`, `K`, `V`.

### Preuve minimale

Expliquer pourquoi « l'attention regarde le contexte » est une intuition utile mais incomplète : il existe une mécanique de calcul précise et un coût.

---

## LAB 5 : RAG local mesuré

### Intuition durable

Ajouter de la récupération de contexte à un modèle ne garantit pas la vérité. Il faut mesurer la qualité du retrieval et la qualité de la réponse.

### Expérience

Crée un mini-corpus local de 10 à 20 documents courts.

Construis une recherche simple (mots-clés, BM25 ou représentation vectorielle selon ton niveau), puis teste au moins 10 questions :

```text
question
→ documents récupérés
→ réponse attendue
→ réponse produite
```

Tu peux utiliser un LLM réel si tu en as accès, mais ce n'est pas obligatoire pour comprendre le mécanisme de retrieval.

### Mesure

Évalue séparément :

```text
retrieval correct ?
contexte suffisant ?
réponse fidèle au contexte ?
réponse hors contexte ?
coût / latence observés ?
```

### Preuve minimale

Inclure au moins un cas où le retrieval échoue et expliquer si le défaut vient de l'indexation, de la recherche, du contexte ou de la génération.

---

## LAB 6 : Agent : permissions, coût et arrêt

### Intuition durable

Un agent n'est pas seulement un prompt qui appelle des outils. Il possède un périmètre d'action qu'il faut limiter, observer et pouvoir arrêter.

### Expérience

Construis un agent minimal simulé avec trois outils :

```text
read_data
write_data
send_message
```

Ajoute une politique de permissions :

```text
read_data    → autorisé
write_data   → demande confirmation
send_message → refusé par défaut
```

Simule une boucle où l'agent choisit un outil, puis mesure :

```text
nombre d'appels
coût simulé
temps
actions refusées
conditions d'arrêt
```

### Preuve minimale

Provoquer volontairement une tentative d'action hors périmètre et montrer :

```text
détection
→ refus
→ journalisation
→ arrêt ou retour à l'état sûr
```

### Question Staff

Quelle responsabilité doit rester humaine même si le modèle peut produire l'action techniquement ?

---

## LAB 7 : Mini-boucle d'évaluation IA

### Intuition durable

Une démo qui fonctionne une fois ne constitue pas une évaluation.

### Expérience

Crée un petit jeu d'évaluation de 20 à 30 cas couvrant :

```text
cas normal
cas ambigu
cas hors domaine
cas adversarial
cas sensible
cas coûteux
```

Définis avant l'exécution :

```text
critère de réussite
critère d'échec
tolérance
```

Puis exécute une première version et une version corrigée.

### Preuve minimale

Publier ou archiver :

```text
version
jeu de tests
résultats
erreurs observées
modification
nouveau résultat
```

### À retenir

L'évaluation est une boucle de décision, pas un chiffre isolé.

---

## Quand ces labs s'arrêtent-ils ?

Ils sont terminés quand tu peux expliquer le mécanisme expérimenté, montrer au moins une observation qui pourrait contredire ton hypothèse initiale et relier cette observation à une décision d'ingénierie.

Ils ne demandent pas de devenir chercheur ML. Les sujets avancés (entraînement distribué, CUDA, systèmes de recherche, nouvelles architectures de modèles, mathématiques avancées) restent des spécialisations possibles hors de cette série.

## Relation avec AF

```text
41-PONT-MATHS-IA-ML-LLM
        ↓
     modèles
        ↓
45-LABS-IA-ML-DEPTH
        ↓
 expérience exécutable
        ↓
 mesure + contre-exemple
        ↓
 décision d'architecture
```

Ces labs renforcent la compréhension pratique du modèle mental. Ils approfondissent la formation complète au rythme des acquis. Ils ne sont pas des extensions promises à un budget fixe de 192 h ; la route CORE reste un sous-ensemble facultatif.

<!-- AF-LESSON-PROFILE: ai -->

## Repères de décision

- **Pourquoi :** L'ingénierie IA consiste à intégrer une capacité probabiliste dans un système déterministe qui doit gérer droits, qualité, coût et échecs.
- **Quand l’utiliser / quand l’éviter :** Utilise LLM/RAG/agents seulement quand la valeur est claire et une solution non-IA ne suffit pas. En lecture seule, l'IA peut assister ; elle ne doit pas effectuer une action métier sans autorisation et confirmation séparées.
- **Limites :** Une réponse plausible peut être fausse. Un score d'évaluation ne garantit pas la sécurité ; un prompt n'est pas une frontière d'autorisation ; une simulation n'est pas une mesure utilisateur.

## Mécanisme : la version sans magie

Définis contrat, sources, droits, abstention et évaluation ; observe retrieval, génération et post-traitement séparément ; garde les outils dans un périmètre minimal.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **45 : LABS IA / ML : DEPTH, DE L'INTUITION AU SYSTÈME** se rattache à ce cas concret : La FAQ IA Kintana répond à partir de documents approuvés, cite ses sources et s'abstient quand le contenu manque. Elle ne crée ni annule ni modifie une demande.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : FAQ IA en lecture seule et évaluable

> **Arc Capsule Corp. / DBZ :** l'IA est un copilote puissant, pas le Hokage. Elle peut proposer ; c'est ton système qui doit vérifier, limiter et refuser si besoin.

**Mission liée à « 45 : LABS IA / ML : DEPTH, DE L'INTUITION AU SYSTÈME » :** Ajoute ou évalue une tranche FAQ Kintana : corpus synthétique approuvé, retrieval, citations, questions sans réponse, contradiction de source et prompt injection. Vérifie que toute action d'écriture métier reste impossible.

**Livrable :** jeu d'évaluation versionné, rapport retrieval/génération, tests sécurité, règle d'abstention et dossier de coûts/latence LAB.

**Critères d’acceptation :** les sources sont traçables ; les réponses sans support s'abstiennent ; l'injection ne donne pas de droits ; aucune action métier n'est exposée ; les métriques ne sont pas présentées comme production.

**Transfert obligatoire :** Le fournisseur IA tombe ou renvoie une sortie mal formée. Vérifie le mode dégradé, la reprise et le comportement sûr.
