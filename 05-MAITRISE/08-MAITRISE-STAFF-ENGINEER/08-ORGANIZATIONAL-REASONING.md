---
stability: intemporel
acte: maitrise
noyau: oui
---

# 08 : Organizational Reasoning : décider dans une organisation réelle

Une architecture correcte peut échouer parce qu'elle arrive au mauvais moment, demande une
capacité absente, heurte un budget, crée une dépendance politique ou n'est pas adoptée.
Le raisonnement organisationnel complète l'architecture ; il ne la remplace pas.

## 1. Les cinq cartes

```text
PROBLÈME
  ↓
ACTEURS → intérêts / pouvoir / contraintes
  ↓
OPTIONS → coût / risque / réversibilité
  ↓
ADOPTION → qui doit dire oui ? qui peut bloquer ?
  ↓
CONSÉQUENCE → mesurer puis réviser
```

Pour chaque décision importante, renseigne :

| Carte            | Preuve attendue                               |
| ---------------- | --------------------------------------------- |
| Acteurs          | parties prenantes et dépendances              |
| Incentives       | pourquoi chaque groupe accepterait/refuserait |
| Décision         | option choisie + options rejetées             |
| Séquençage       | quoi faire maintenant, plus tard, jamais      |
| Adoption         | action minimale qui permet la convergence     |
| Risque politique | coût d'un désaccord ou d'un retard            |
| Révision         | signal qui ferait changer d'avis              |

## 2. Ambiguïté : ne pas la supprimer trop tôt

Le Staff ne reçoit pas toujours un problème propre. Il doit parfois décider quelles inconnues
méritent d'être résolues avant d'engager du travail.

Classe chaque inconnue :

```text
bloquante maintenant
utile mais non bloquante
à apprendre par expérimentation
acceptable comme hypothèse temporaire
sans valeur décisionnelle
```

Une bonne décision explique aussi pourquoi une inconnue n'a **pas** été résolue.

## 3. Influence sans autorité

L'objectif n'est pas de « gagner » une discussion. Il est d'obtenir une décision que les personnes
concernées peuvent réellement appliquer.

Protocole :

```text
écouter
→ reformuler l'objection
→ identifier l'hypothèse en conflit
→ apporter une preuve ou accepter la correction
→ proposer une option réversible si possible
→ documenter la décision
```

## 4. Épreuve : la meilleure architecture perd

Le candidat reçoit une architecture techniquement supérieure mais incompatible avec au moins
une contrainte organisationnelle réelle ou plausible : capacité d'équipe, délai, compétence,
budget, contrat ou dépendance.

Il doit choisir entre :

- défendre l'architecture telle quelle ;
- la simplifier ;
- la séquencer ;
- la refuser ;
- ou financer d'abord une réduction d'incertitude.

Le critère principal est **l'adoptabilité sans trahison des invariants critiques**.

## 5. Preuve externe

La meilleure forme de preuve est une décision soumise à un regard indépendant : pair,
mainteneur open source, association, équipe ou client. Utilise `48-EXTERNAL-REVIEW-GATE.md`.

Une simulation peut entraîner la méthode, mais doit rester étiquetée T0.

## 6. Critère de sortie

La réponse est réussie si le candidat peut expliquer simultanément :

**ce qui est techniquement vrai, ce qui est organisationnellement possible, et pourquoi le
séquençage choisi réduit le risque maintenant.**

Ce module renforce G1, G2, G5 et G7 du `37-STAFF-READINESS-GATE` sans créer une nouvelle famille.
