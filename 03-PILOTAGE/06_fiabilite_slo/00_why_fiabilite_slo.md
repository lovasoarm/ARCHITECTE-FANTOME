---
stability: intemporel
acte: pilotage
noyau: oui
---

# POURQUOI CE MODULE MÉRITE TON TEMPS : FIABILITÉ ET SLO

Temps de lecture ~8 min

T'as déjà entendu « le site doit être fiable » sans savoir ce que ça voulait dire en nombre ?
T'as déjà été réveillé par une alerte qui ne demandait aucune action ?
T'as déjà eu une sauvegarde… jamais restaurée ?

## 1) LE PROBLÈME

« Fiable » sans chiffre est une promesse invérifiable, donc une promesse trahie tôt ou tard.
Le passage au niveau supérieur, c'est de transformer un adjectif en contrat : *99,5 % des requêtes de
consultation répondent en moins de 800 ms sur 28 jours glissants*. Cette phrase se mesure, se rate, et
se défend en réunion.

## 2) LE BUDGET D'ERREUR, LA SEULE IDÉE VRAIMENT NEUVE

Si tu promets 99,5 %, tu **autorises** 0,5 % d'échecs. Ce n'est pas un aveu de faiblesse : c'est le
carburant que tu dépenses pour livrer vite. Budget entamé → on ralentit et on répare. Budget intact →
on prend des risques. C'est le seul outil qui fait arbitrer vitesse et stabilité par un nombre plutôt
que par la personne qui parle le plus fort.

## 3) 100 %, C'EST LE PIÈGE

Viser 100 % coûte un ordre de grandeur de plus à chaque neuf ajouté, et tes utilisateurs ne le voient
pas : leur réseau mobile est déjà à 99 %. La bonne question n'est jamais « comment ne jamais tomber »
mais « combien de temps par mois avons-nous le droit de tomber, et qui le décide ».

## 4) CE QUE ÇA PROUVE DE TOI

Un profil Staff est celui qui refuse une fonctionnalité parce que le budget d'erreur est vide, et qui
sait le dire à une direction en trois phrases sans jargon.

> **Durée de vie : intemporel.** Les outils d'alerting changent tous les trois ans. Le raisonnement
> budget/promesse ne bouge pas.
