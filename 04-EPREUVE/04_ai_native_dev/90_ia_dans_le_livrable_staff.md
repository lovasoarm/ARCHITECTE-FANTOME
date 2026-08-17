---
stability: perissable_2027
acte: appliquer
---

# ENRICHISSEMENT : L'IA COMME BRIQUE DU LIVRABLE, PAS COMME COPILOTE

Ce module t'a déjà appris à coder avec une IA sans te faire piéger, et [11b_construire_un_pipeline_rag.md](11b_construire_un_pipeline_rag.md) t'a fait construire un pipeline RAG. Cette page ajoute le seul angle qui manquait pour le profil visé : ce qui change quand cette brique IA part en production dans TON capstone, avec un budget et un SLO déjà écrits ailleurs.

## 1. LE COÛT D'UNE FONCTIONNALITÉ IA N'EST PAS UN COÛT FIXE

Une requête LLM (large language model : le modèle de langage derrière l'API) se facture au token, en entrée et en sortie. La conséquence est brutale : ta facture suit l'usage, pas ton infrastructure.

```js
// minimal
const cout = (tokensEntree * prixIn) + (tokensSortie * prixOut);
```

```js
// réaliste : plafond par utilisateur et par jour, décidé avant la mise en ligne
if (await compteur.jour(userId) > PLAFOND) return reponseDegradee();
```

```js
// qui casse : pas de plafond, contexte entier renvoyé à chaque tour
// un seul utilisateur curieux transforme une facture de 40 en facture de 3 000,
// et la ligne n'apparaît dans aucun budget parce qu'elle n'existait pas au
// moment où le budget a été écrit.
```

Croisement avec la famille S1 : cette ligne doit apparaître dans le budget cloud du module [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md), avec sa propre hypothèse d'usage.

## 2. UN SLO POUR UNE BRIQUE NON DÉTERMINISTE

Un appel LLM peut être lent, peut échouer, peut répondre à côté. Trois décisions à écrire :

- Le timeout, et la réponse dégradée servie derrière : jamais une page blanche.
- Le SLO de la fonctionnalité IA, séparé du SLO du reste du produit. Mélanger les deux rend le budget d'erreur illisible.
- Le critère de qualité mesurable : un jeu de 20 cas attendus, rejoué à chaque changement de prompt ou de modèle.

Croisement avec la famille S3 : ce SLO séparé se déclare dans le fichier produit au module [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md).

## 3. LA FRONTIÈRE DE CONFIANCE

Ce que le modèle produit est une entrée utilisateur, jamais une sortie de confiance. Tout ce qui sort d'un LLM et qui touche une base, un fichier ou un appel externe passe par la même validation que n'importe quelle donnée venue de l'extérieur, module [03-PILOTAGE/04_security](../../03-PILOTAGE/04_security/00_why_security.md).

```
utilisateur --> prompt --> modèle --> validation stricte --> action
                                   ^ ici, pas avant
```

## 4. EXERCICE (20 min)

Prends la brique IA de ton capstone, ou celle que tu envisages. Écris une page : coût par utilisateur actif par mois avec l'hypothèse d'usage, plafond retenu, timeout, réponse dégradée, SLO séparé, et les 20 cas de ton jeu d'évaluation. Cette page part directement dans la pièce S6 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## RÉSUMÉ

Une brique IA en production se pilote comme un service payant, non déterministe et non fiable par nature : plafond de coût, réponse dégradée, SLO séparé, jeu d'évaluation rejoué. Sa sortie reste une donnée non fiable jusqu'à validation. Sans ces quatre décisions écrites, la fonctionnalité IA est une démonstration, pas un livrable.
