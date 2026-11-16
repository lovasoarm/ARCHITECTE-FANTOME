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

# Micro-projet : calculateur de frais de livraison

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Savoir déclarer des variables.
- Avoir lu [`01-function_essentials.md`](01-function_essentials.md).

## Mission de première passe

Crée `delivery.js` :

1. Déclare `calculateDeliveryFee(distanceKm, ratePerKm)`.
2. Fais renvoyer `distanceKm * ratePerKm` avec `return`.
3. Appelle la fonction avec `5` kilomètres et `800` ariary par kilomètre.
4. Stocke la valeur dans `deliveryFee` et affiche-la.
5. Recommence avec `12` kilomètres et le même tarif, sans modifier le corps de la fonction.

Le modèle est volontairement simple : aucun palier, supplément ou taxe n’est appliqué dans cet exercice.

## Critères de réussite

- [ ] Le premier résultat vaut `4000` ariary.
- [ ] Le deuxième résultat vaut `9600` ariary.
- [ ] `console.log` est utilisé pour afficher ; `return` pour renvoyer.
- [ ] Je sais distinguer les paramètres des arguments.

## Vérification

Que reçoit l'appelant si une fonction ne contient aucun `return` explicite ?

## Preuve à conserver

Le fichier, les deux sorties et une phrase qui explique le rôle de `return`.

## Approfondissement différé : mission Kintana

> **Statut : différé, facultatif pour la première passe.** Cette intégration suppose que le modèle métier Kintana soit connu. Elle ne conditionne pas la validation des fonctions élémentaires.

**Mission liée à « Micro-projet : calculateur de frais de livraison » :** isole le calcul du frais de livraison d’une demande Kintana dans une fonction qui reçoit la distance et le tarif par kilomètre, puis renvoie le montant. Ne suppose pas que la distance ou le tarif sont déjà fournis par un service réel.

**Livrable :** fonction et cas nominal/négatif. **Gate de cette livraison différée (pas gate Fundamentals) :** les entrées, la sortie et les limites sont explicites ; aucun état global n'est requis. Sans intégration réelle, étiquette le résultat `LAB`.
