---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L2
perturbation_modes: [collection_vide, condition_limite]
anti_recipe_key: collection_vide+condition_limite
transfer_distance: near
assessment_role: instructional_checkpoint
---

> **SCÈNE Kintana —** une équipe doit parcourir une file de demandes et isoler celles qui nécessitent une vérification, sans faire disparaître les autres.

# 03 : Conditions, boucles et parcours

Un programme doit décider quoi faire et répéter une opération sans recopier la même instruction. Python fournit `if`, `elif`, `else`, `for` et `while`.

## 1. Conditions

```python
status = "pending"

if status == "ready":
    message = "Tu peux continuer"
elif status == "pending":
    message = "Attends la confirmation"
else:
    message = "Vérifie la demande"

print(message)
```

`=` affecte une valeur ; `==` compare deux valeurs. Les blocs sont définis par l'indentation : garde le même niveau d'indentation pour les instructions d'un bloc.

## 2. Boucle `for`

```python
requests = ["R-01", "R-02", "R-03"]

for request_id in requests:
    print(request_id)
```

`for` parcourt les éléments d'une collection. `range(3)` produit les nombres 0, 1, 2. `enumerate(requests)` permet d'obtenir à la fois un index et une valeur.

## 3. Boucle `while`

```python
attempts = 0
while attempts < 3:
    attempts += 1
```

Une boucle `while` doit avoir une condition qui finit par devenir fausse. Sinon, elle peut tourner indéfiniment. Si le nombre d'éléments est déjà connu, une boucle `for` est souvent plus facile à relire.

## 4. Compréhensions simples

```python
open_ids = [item["id"] for item in items if item["status"] == "open"]
```

Cette forme crée une nouvelle liste. Elle n'est pas obligatoire : commence par une boucle explicite si la compréhension te semble difficile à lire.

## Schéma mental

```text
valeur ──> condition ? ──oui/non──> branche choisie
collection ──> boucle ──> traiter chaque élément
```

## Pourquoi / quand / limites

- **Pourquoi :** les laboratoires doivent parcourir des événements et écarter des lignes invalides selon des règles explicites.
- **Quand :** utilise `if` pour décider, `for` pour parcourir une collection et `while` lorsque la fin dépend d'une condition qui évolue.
- **Limites :** une boucle sur un grand fichier peut consommer du temps et de la mémoire ; cette passerelle enseigne le contrôle de flux, pas l'optimisation de pipelines massifs.

## Mécanisme : la version sans magie

La condition est évaluée, puis une seule branche est exécutée. Une boucle reprend au début de son bloc jusqu'à épuisement de la collection ou jusqu'à ce que sa condition s'arrête.

## Mission utile : filtrer une file de demandes

À partir d'une liste de dictionnaires, affiche uniquement les demandes `open` et compte-les. Teste aussi le cas d'une liste vide.

**Livrable :** une fonction ou un script court avec la sortie pour une liste normale et une liste vide.

**Critères d'acceptation :** aucun élément n'est perdu dans la donnée d'origine ; le résultat est correct pour zéro, un ou plusieurs éléments.

## Transfert : variation proche

**Transfert :** ajoute une condition qui rejette une demande dont l'identifiant est absent ; explique pourquoi elle doit être contrôlée avant d'être utilisée.

## Ancrage LAB

Le pipeline Data Engineering transforme une collection d'événements. Avant de lancer le pipeline, tu dois pouvoir expliquer pourquoi une ligne est acceptée, ignorée ou mise en quarantaine.

<!-- AF-LESSON-PROFILE: control-flow -->
