---
stability: intemporel
acte: maitrise
noyau: oui
---

# 09 : System Ownership & Migration : penser sur trois ans, pas sur trois heures

Concevoir un système n'est que le jour 0. Le jugement Staff apparaît lorsqu'une décision doit
survivre à une migration, une augmentation de trafic, un changement d'équipe et une dette qui
s'accumule.

## 1. Le dossier vivant

Pour un système fil rouge, conserve :

```text
architecture actuelle
ADR historiques
invariants critiques
SLO / signaux
coûts observés
incidents / postmortems
dette acceptée
migrations prévues
owners actuels
```

Chaque nouvelle décision doit pouvoir répondre à :

> « Qu'est-ce que cette décision rend plus facile ou plus difficile dans douze mois ? »

## 2. Migration comme décision sous risque

Toute migration importante doit expliciter :

| Élément       | Question                                                        |
| ------------- | --------------------------------------------------------------- |
| Trigger       | Pourquoi migrer maintenant ?                                    |
| Invariant     | Qu'est-ce qui doit rester vrai pendant toute la transition ?    |
| Stratégie     | big-bang, parallèle, strangler, dual-write, autre ?             |
| Compatibilité | Quelle période de chevauchement ?                               |
| Observabilité | Comment détecter la dérive ?                                    |
| Rollback      | Quel est le dernier moment où revenir est réellement possible ? |
| Coût          | Infrastructure + temps + risque                                 |
| Ownership     | Qui surveille après le changement ?                             |
| Fin           | Comment sait-on que l'ancienne voie peut mourir ?               |

## 3. Drill longitudinal

À partir d'un système stable, injecte successivement :

```text
+40 % trafic
→ changement de schéma
→ dépendance lente
→ départ d'un mainteneur
→ exigence sécurité
→ contrainte budgétaire
```

À chaque étape, ne réécris pas tout. Fais évoluer l'ADR et note ce qui reste invariant.

## 4. Ce que l'exercice mesure

Il mesure la capacité à reconnaître qu'une décision peut être localement correcte et globalement
mauvaise après changement de contexte.

Le candidat doit montrer au moins un **compromis qui a vieilli** et expliquer pourquoi il était
raisonnable au moment où il a été pris.

## 5. Critère de sortie

Une bonne preuve contient :

**décision initiale → signal de vieillissement → options → migration → observation → révision.**

Elle ne contient pas de rétrospective magique où l'auteur avait « déjà tout prévu ».

Ce module alimente G2, G3, G5, G6 et G9 et le niveau terrain `T3/T4` lorsqu'une expérience réelle
est disponible.
