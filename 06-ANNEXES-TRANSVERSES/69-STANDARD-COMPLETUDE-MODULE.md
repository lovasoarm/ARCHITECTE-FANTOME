---
stability: stable
acte: gouverner
---

# Standard de complétude d'un module AF

Un module ne peut être marqué `route: complete` ou `noyau: oui` que si les exigences ci-dessous sont démontrées par des fichiers accessibles et des vérifications exécutables ou explicitement évaluables. La présence d'un README, challenge et grimoire ne suffit pas.

## Gate pédagogique par concept majeur

1. Définition simple et exacte.
2. Problème résolu et raisons d'existence.
3. Mécanisme interne, étapes et invariants.
4. Exemple concret complet dans un fil conducteur.
5. Diagramme quand le flux, la distribution ou les états le justifient.
6. Erreurs, anti-patterns, limites et conséquences.
7. Exercice progressif à consigne non ambiguë.
8. Vérification : test, corrigé différé, grille ou critères observables.
9. Liaison avec les prérequis et modules suivants.
10. Preuve de maîtrise : résultat et transfert attendus.

## Gate module

- Tous les concepts noyaux ont une leçon approfondie, pas seulement une liste.
- Le challenge vérifie l'application intégrée lorsqu'il est déclaré comme pièce de sortie. Un boss-fight séparé ajoute ambiguïté, incident ou arbitrage uniquement lorsque le module le fournit et l'annonce. Un module sans `96-boss-fight.md` peut être complet si ses autres preuves et critères de sortie satisfont son objectif.
- Les tests démarrent dans un état documenté : verts de référence, rouges TDD attendus, ou absents à créer.
- Les chemins, liens, ancres, métadonnées et commandes sont vérifiés.
- Les limites de version/fraîcheur et les sources sont datées.
- La charge de travail et les prérequis sont réalistes pour le public annoncé.
- Une personne autre que l'auteur peut suivre le parcours et évaluer la preuve sans deviner les critères.

## Contrat local des pièces

Le `README.md` du module est l'autorité pour la liste de ses fichiers, ses prérequis, ses exercices et ses critères de sortie. Les conventions de nommage sont des aides, pas une obligation de reproduire le même squelette partout. `95-challenge.md`, `96-boss-fight.md`, `99A-PONT.md` et `99-PORTAGE-MENTAL.md` sont obligatoires seulement lorsque le README du module ou la Route 58 les déclare explicitement. Une absence n'est pas une lacune si la fonction pédagogique est couverte par une autre preuve déclarée. Les gates de bloc ou de mini-projet sont distincts des exigences d'un module et ne deviennent bloquants que pour les éléments qu'ils nomment.
