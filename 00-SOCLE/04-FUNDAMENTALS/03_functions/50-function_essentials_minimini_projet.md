---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** une fonction reçoit des arguments et renvoie une valeur que le reste du programme peut utiliser.

# Micro-projet : calculateur de total

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Savoir déclarer des variables.
- Avoir lu [`01-function_essentials.md`](01-function_essentials.md).

## Mission de première passe

Crée `total.js` :

1. Déclare `calculateTotal(price, quantity)`.
2. Fais renvoyer `price * quantity` avec `return`.
3. Appelle la fonction avec `12000` et `2`.
4. Stocke la valeur dans `total` et affiche-la.
5. Recommence avec `500` et `3` sans modifier le corps de la fonction.

## Critères de réussite

- [ ] Le premier résultat vaut `24000`.
- [ ] Le deuxième résultat vaut `1500`.
- [ ] `console.log` est utilisé pour afficher ; `return` pour renvoyer.
- [ ] Je sais distinguer les paramètres des arguments.

## Vérification

Que reçoit l'appelant si une fonction ne contient aucun `return` explicite ?

## Preuve à conserver

Le fichier, les deux sorties et une phrase qui explique le rôle de `return`.

## Approfondissement différé : mission Kintana

> **Statut : différé, facultatif pour la première passe.** Cette intégration suppose que le modèle métier Kintana soit connu. Elle ne conditionne pas la validation des fonctions élémentaires.

**Mission liée à « Micro-projet : calculateur de total » :** isole un calcul métier simple du scénario Kintana dans une fonction pure qui reçoit ses données et renvoie le résultat.

**Livrable :** fonction et cas nominal/négatif. **Gate de cette livraison différée (pas gate Fundamentals) :** les entrées, la sortie et les limites sont explicites ; aucun état global n'est requis. Sans intégration réelle, étiquette le résultat `LAB`.
