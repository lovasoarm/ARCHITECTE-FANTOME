---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L2
perturbation_modes: [type_inattendu, mutation]
anti_recipe_key: type_inattendu+mutation
transfer_distance: near
assessment_role: instructional_checkpoint
---

> **SCÈNE Kintana —** une file de demandes contient des champs parfois absents ; le code ne doit pas confondre absence, chaîne vide et valeur valide.

# 02 : Valeurs et collections

Une variable Python associe un nom à un objet. Le type de la valeur influence les opérations disponibles ; la collection choisie influence la manière de retrouver, d'ajouter ou de parcourir les données.

## 1. Valeurs courantes

```python
name = "Kintana"       # str : texte
count = 3              # int : entier
ratio = 0.75           # float : nombre à virgule flottante
is_ready = True        # bool : vrai ou faux
missing_value = None   # absence de valeur
```

Python utilise l'indentation pour délimiter les blocs. Les commentaires commencent par `#`. `None` est une valeur particulière ; ce n'est pas la chaîne de caractères `"None"`.

## 2. Collections courantes

```python
names = ["Ana", "Bako"]                 # list : ordonnée, modifiable
point = (12, 8)                          # tuple : ordonné, non modifiable
user = {"id": 7, "name": "Ana"}         # dict : clés vers valeurs
tags = {"urgent", "review"}             # set : éléments uniques
```

Accéder à une liste : `names[0]`. Accéder à un dictionnaire : `user["name"]`. Vérifier une clé sans provoquer d'erreur : `user.get("email")` renvoie `None` si elle manque, sauf si tu fournis une autre valeur par défaut.

Une liste et un dictionnaire sont modifiables. Si deux noms désignent le même dictionnaire, une modification faite par l'un est visible par l'autre. Une affectation ne fabrique pas automatiquement une copie.

## 3. Vérifier avant de convertir

```python
raw_count = "12"
count = int(raw_count)

if count < 0:
    raise ValueError("count doit être positif ou nul")
```

`int("douze")` échoue : ne transforme pas une erreur de conversion en valeur zéro silencieuse. `isinstance(value, dict)` permet de contrôler le type concret d'une donnée reçue.

## Schéma mental

```text
nom ──désigne──> valeur
list  : [valeur, valeur]   dict : {clé: valeur}
None  : absence explicite  set  : valeurs uniques
```

## Pourquoi / quand / limites

- **Pourquoi :** une donnée lue dans un CSV ou un JSON arrive souvent sous forme de texte ou de structure ; tu dois savoir quelle opération est sûre.
- **Quand :** utilise `list` pour une séquence, `dict` pour des champs nommés, `tuple` pour un petit groupe fixe et `set` pour l'unicité.
- **Limites :** les annotations de type ne valident pas automatiquement les données externes ; un dictionnaire peut manquer une clé et une liste peut contenir des types mélangés.

## Mécanisme : la version sans magie

La variable est un nom lié à un objet. Les opérations de lecture récupèrent des éléments ; les opérations de mutation changent l'objet modifiable lui-même. Choisis la structure selon les opérations dont ton programme a besoin.

## Mission utile : lire une demande Kintana

Représente une demande par un dictionnaire contenant `id`, `name`, `status` et `tags`. Lis deux champs, ajoute un tag à l'ensemble et gère un champ optionnel absent.

**Livrable :** un court script et une phrase expliquant les structures utilisées.

**Critères d'acceptation :** les clés sont explicites ; l'absence n'est pas confondue avec une chaîne ; tu sais expliquer ce qui est modifié et ce qui ne l'est pas.

## Transfert : variation proche

**Transfert :** crée une liste de trois demandes et retrouve celles dont le statut vaut `"open"` sans supprimer les autres.

## Ancrage produit / terrain

Dans les laboratoires Data Engineering et ML, les lignes deviennent des dictionnaires ou des séquences. Les clés et les types font partie du contrat de données ; un type supposé n'est pas un type garanti.

<!-- AF-LESSON-PROFILE: data-structures -->
