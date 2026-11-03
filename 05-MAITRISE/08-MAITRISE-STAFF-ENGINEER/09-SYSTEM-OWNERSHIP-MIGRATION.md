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

### Transfert : changer de contexte

Applique le mécanisme de « 09 : System Ownership & Migration : penser sur trois ans, pas sur trois heures » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **09 : System Ownership & Migration : penser sur trois ans, pas sur trois heures** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Posséder une migration sur plusieurs années

**Mission liée à « 09 : System Ownership & Migration : penser sur trois ans, pas sur trois heures » :** Prépare pour Kintana une migration à étapes : compatibilité, double lecture/écriture si pertinente, observabilité, critères de bascule, retrait de l’ancien chemin et ownership à long terme.

**Livrable :** Roadmap de migration, matrice d’ownership, plan de rollback et critères de décommissionnement.

**Critères d’acceptation :** Chaque étape a un responsable et une preuve de sortie ; la coexistence est bornée ; le retour arrière est réaliste ; les coûts de maintenance sont chiffrés ou explicitement estimés.

**Transfert obligatoire :** Une étape intermédiaire dure plus longtemps que prévu : explicite le risque de prolonger la coexistence.
