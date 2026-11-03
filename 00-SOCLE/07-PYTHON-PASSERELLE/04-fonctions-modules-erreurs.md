---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L2-L3
perturbation_modes: [entree_invalide, import_absent]
anti_recipe_key: entree_invalide+import_absent
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE Kintana —** plusieurs écrans doivent appliquer la même règle de validation ; elle ne doit pas être copiée ni dépendre d’une variable globale cachée.

# 04 : Fonctions, modules et erreurs

Une fonction nomme une opération. Un module permet de ranger du code dans un fichier et de le réutiliser. Une exception signale qu'une opération n'a pas pu produire son résultat normal.

## 1. Fonction et retour

```python
def normalize_name(raw_name):
    return raw_name.strip().title()

clean_name = normalize_name("  ana  ")
print(clean_name)  # Ana
```

`return` renvoie un résultat à l'appelant. `print()` affiche quelque chose, mais ne remplace pas le retour : une fonction sans `return` explicite renvoie `None`.

## 2. Paramètres et valeurs par défaut

```python
def describe_request(request_id, status="pending"):
    return f"{request_id}: {status}"
```

Évite de mettre une liste ou un dictionnaire modifiable comme valeur par défaut d'une fonction débutante : cet objet peut être réutilisé entre plusieurs appels.

## 3. Modules et imports

```python
from pathlib import Path
from math import sqrt

folder = Path("data")
print(sqrt(9))
```

`import` rend accessibles des fonctions ou objets déclarés dans un module. La bibliothèque standard est fournie avec Python ; tu n'as pas besoin de `pip` pour `pathlib`, `csv`, `json`, `math` ou `unittest`.

Le bloc `if __name__ == "__main__":` permet à un fichier d'exécuter son point d'entrée lorsqu'il est lancé directement, sans l'exécuter automatiquement lorsqu'il est importé.

## 4. Annotations de type

```python
from typing import Sequence

def count_items(items: Sequence[str]) -> int:
    return len(items)
```

Les annotations aident les humains et les outils. Python ne valide pas automatiquement toutes les valeurs au moment de l'exécution à cause de ces annotations. Vérifie les entrées aux frontières du programme.

## 5. Exceptions

```python
try:
    quantity = int("12")
except ValueError:
    print("La quantité n'est pas un entier valide")
```

Capture une exception que tu sais traiter. N'écris pas un `except:` général qui masque tout défaut. Les laboratoires peuvent définir une exception métier qui hérite de `ValueError` pour distinguer une donnée invalide.

## Schéma mental

```text
appel ──> fonction ──> return ──> résultat
                 └── erreur ──> exception ──> traitement
module.py ──import──> autre fichier Python
```

## Pourquoi / quand / limites

- **Pourquoi :** séparer les opérations facilite les tests et permet aux laboratoires de réutiliser les mêmes règles.
- **Quand :** crée une fonction pour une opération qui a une entrée et une sortie identifiables ; importe un module lorsqu'une capacité est déjà fournie.
- **Limites :** un nom de fonction lisible n'assure pas qu'elle respecte son contrat ; une annotation ne remplace ni validation ni test.

## Mécanisme : la version sans magie

Un appel crée un contexte d'exécution pour la fonction. Les arguments sont liés aux paramètres. `return` renvoie une valeur ; une exception interrompt le chemin normal jusqu'à un gestionnaire approprié.

## Mission utile : isoler une règle de validation

Écris `validate_request(data)` qui renvoie `True` seulement si l'objet est un dictionnaire contenant un identifiant non vide. Pour une entrée invalide, choisis un retour explicite ou une exception documentée ; ne mélange pas les deux sans raison.

**Livrable :** la fonction, deux cas valides et deux cas invalides.

**Critères d'acceptation :** la règle est isolée, le résultat est prévisible et tu peux expliquer ce que l'annotation dit : et ne dit pas.

## Transfert : variation proche

**Transfert :** place la fonction dans un fichier séparé et importe-la depuis un second fichier.

## Ancrage LAB

Les scripts 70 et 71 séparent calculs, fonctions d'orchestration et tests. Lis les imports et suis une fonction appelée avant de modifier quoi que ce soit.

<!-- AF-LESSON-PROFILE: functions -->
