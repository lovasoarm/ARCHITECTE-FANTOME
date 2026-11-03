---
stability: stable
acte: pratiquer
cognitive_level: L1
perturbation_modes: [consigne_simple, changement_valeur]
anti_recipe_key: consigne_simple+changement_valeur
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** utilise un tableau pour la liste et un objet pour décrire un élément.

# Micro-projet : mini-inventaire

## Type

Micro-pratique guidée, sans framework ni dépendance.

## Prérequis

- Savoir lire une variable et une valeur.
- Avoir étudié les conditions et les boucles.
- Avoir lu [`01-data-basics.md`](01-data-basics.md).

## Mission de première passe

Dans `inventory.js` :

1. Crée un tableau `products` contenant trois noms de produits.
2. Affiche le premier et le troisième produit.
3. Ajoute un quatrième produit avec `push`.
4. Crée un objet `product` avec `name` et `price`.
5. Modifie `price`, puis affiche `product.name` et `product.price`.
6. Parcours `products` avec `for...of` et affiche chaque nom.

N'ajoute ni `map`, ni `filter`, ni `reduce` : ces méthodes utilisent des fonctions de rappel qui seront étudiées ensuite.

## Critères de réussite

- [ ] Les index 0 et 2 affichent les bons éléments.
- [ ] Le tableau contient quatre éléments après `push`.
- [ ] L'objet contient les deux propriétés attendues et le prix mis à jour.
- [ ] La boucle affiche les quatre noms, dans l'ordre.
- [ ] Je peux expliquer pourquoi `products[0]` et `product.name` ne désignent pas la même forme d'accès.

## Vérification

Quand choisirais-tu un tableau d'objets plutôt qu'un simple tableau de textes ? Réponds avec un exemple concret, sans écrire le code complet.

## Preuve à conserver

Le fichier, les sorties et une phrase de justification du choix tableau/objet.

## Approfondissement différé : mission Kintana

> **Statut : différé, facultatif pour la première passe.** Cette intégration suppose que le modèle de demande et le dépôt Kintana soient disponibles. Elle ne conditionne pas la validation de Data Basics.

**Mission liée à « Micro-projet : mini-inventaire » :** représente une demande Kintana par un objet et plusieurs demandes par un tableau. Définis les champs utiles et précise les champs obligatoires.

**Livrable :** exemple de données et cas invalide. **Gate de cette livraison différée (pas gate Fundamentals) :** les champs et la cardinalité sont cohérents ; une demande incomplète est identifiée. Sans environnement réel, étiquette le résultat `LAB`.
