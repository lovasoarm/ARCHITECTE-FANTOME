---
stability: stable
last_reviewed: 2026-10-31
acte: parcours
---

> **Repère de lecture :** le sous-module Variables est volontairement divisé en deux passages pour ne pas exiger la maîtrise des objets, des boucles ou des fonctions avant leur introduction.

# Ordre de lecture : 01_variables

## Scène concrète : préparer un panier

Une personne prépare un panier avec un prix unitaire de `12000` et une quantité de `2`. Le Passage A apprend à donner un nom à ces données avant de calculer le total.

```js
const unitPrice = 12000;
const quantity = 2;
const total = unitPrice * quantity;
console.log(total); // 24000
```

Plus tard, quand les tableaux et les objets auront été étudiés, le même panier pourra contenir plusieurs articles. Cette progression évite de demander au débutant de comprendre une structure qu'il n'a pas encore rencontrée.

## Passage A : variables élémentaires, au début de Fundamentals

Suis ces trois leçons et leur pratique dans l'ordre :

1. [Introduction aux variables](03-intro_variables.md) → [pratique de base](50-intro_variables_minimini_projet.md)
2. [Binding](04-a_binding.md) → [pratique de base](51-a_binding_minimini_projet.md)
3. [`var` / `let` / `const`](05-b_var_let_const.md) → [pratique de base](52-b_var_let_const_minimini_projet.md)

À ce stade, tu dois savoir nommer une valeur et choisir entre un nom réaffectable et un nom non réaffectable. Ne cherche pas encore à expliquer les closures, les tableaux ou la mémoire du moteur.

## Passage B : références et mémoire, après fonctions avancées et Scope

Reviens ici après avoir terminé Contrôle de flux, Data Basics, Function essentials, les fonctions avancées et Scope :

4. [Stack vs Heap](06-c_stack_heap.md) → [pratique de base](53-c_stack_heap_minimini_projet.md)
5. [Le chaos des références](07-reference_chaos.md) → [pratique de base](54-reference_chaos_minimini_projet.md)
6. [Mutation madness](08-mutation_madness.md) → [pratique de base](55-mutation_madness_minimini_projet.md)
7. [The const trap](09-const_trap.md) → [pratique de base](56-const_trap_minimini_projet.md)

Le glossaire est une ressource de consultation (`10-variable_glossary.md`). Tu peux l'ouvrir lorsqu'un mot te bloque ; il n'est pas un test d'entrée.

<!-- AF-DIAGRAM:variables -->

## Repère visuel utile : deux passages sans prérequis caché

```text
Passage A : nom -> valeur -> binding -> choix const/let/var
                           |
                           v
          Contrôle de flux -> Data Basics -> Function essentials
                           |
                           v
       Types -> Fonctions avancées -> Scope
                           |
                           v
Passage B : références -> mémoire -> mutation -> const et objets
```

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** séparer les deux passages évite de rencontrer les références, les mutations et les appels de fonctions avant d'avoir les bases nécessaires.
- **Quand l'utiliser / quand l'éviter :** suis le Passage A au début, puis reviens au Passage B aux prérequis indiqués. Ne traite pas le glossaire comme une leçon obligatoire.
- **Limites :** l'ordre est un guide de prérequis ; il ne remplace pas les exercices et ne promet pas une durée fixe.

## Mécanisme : la version sans magie

Le Passage A apprend les noms et les valeurs. Contrôle de flux, Data Basics et Function essentials ajoutent ensuite les mécanismes nécessaires. Les fonctions avancées enseignent notamment les callbacks et `map`. Scope enseigne les closures. Le Passage B peut ensuite réutiliser les tableaux, les objets, le spread et les fonctions sans introduire ces notions à l'improviste.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une demande a un identifiant, un statut et des propriétés. Le Passage A nomme les valeurs ; le Passage B explique comment les objets et leurs références peuvent être partagés et modifiés.

**À observer :** les preuves simples du Passage A d'abord, puis les effets des références dans le Passage B. Étiquette chaque pratique selon le contexte réel (`LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION`).

## Mission utile : respecter les prérequis

**Mission liée à « Ordre de lecture : 01_variables » :** réalise le Passage A avant de poursuivre, puis reviens au Passage B après les étapes Fonctions avancées et Scope de Fundamentals. Consigne les preuves dans ton journal.

**Livrable :** une liste datée des sept leçons, avec une preuve ou une question précise pour chacune.

**Critères d'acceptation :** le Passage A est réalisé avant Contrôle de flux ; le Passage B seulement après Data Basics, Function essentials, fonctions avancées et Scope ; aucune maîtrise n'est déclarée sans pratique.

**Transfert obligatoire :** explique pourquoi une leçon qui utilise un tableau doit être placée après l'introduction des tableaux.
