---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L3
perturbation_modes: [fichier_absent, donnees_mal_formees]
anti_recipe_key: fichier_absent+donnees_mal_formees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE Kintana —** un export CSV vient d’un appareil terrain ; son encodage, ses nombres et ses dates doivent être interprétés avant toute conclusion.

# 05 : Fichiers, CSV, JSON et types utiles

Les laboratoires de données lisent des fichiers et écrivent des résultats. Il faut savoir d'où vient le fichier, quel encodage est utilisé et ce qui se passe lorsqu'une ligne est invalide.

## 1. Chemins et texte

```python
from pathlib import Path

source = Path("data/events.csv")
if not source.exists():
    raise FileNotFoundError(source)

text = source.read_text(encoding="utf-8")
```

`Path` représente un chemin. Un chemin relatif est résolu depuis le dossier courant du processus, pas nécessairement depuis le fichier `.py`.

## 2. Lire du JSON

```python
import json

payload = {"id": "E-01", "status": "open"}
serialized = json.dumps(payload, ensure_ascii=False)
restored = json.loads(serialized)
```

JSON est un format texte. `dumps` sérialise un objet Python ; `loads` parse une chaîne JSON et peut lever `json.JSONDecodeError` si elle est invalide. Pour lire un fichier, utilise `json.load(file)` ; pour écrire, `json.dump(payload, file, ensure_ascii=False, indent=2)`.

## 3. Lire un CSV

```python
import csv
from pathlib import Path

with Path("data/events.csv").open(encoding="utf-8", newline="") as source_file:
    for row in csv.DictReader(source_file):
        print(row["event_id"], row["status"])
```

`DictReader` transforme chaque ligne en dictionnaire. Les cellules CSV sont généralement des chaînes : convertis et valides les champs avant un calcul numérique. Le bloc `with` ferme le fichier même si une erreur survient.

## 4. Valeurs décimales et dates

```python
from decimal import Decimal
from datetime import datetime

amount = Decimal("12.50")  # texte décimal exact pour ce nombre saisi
timestamp = datetime.fromisoformat("2026-10-31T09:30:00+03:00")
```

Pour une valeur décimale métier, `Decimal` évite les surprises d'arrondi propres aux nombres binaires `float`. Une date/heure doit conserver son fuseau si celui-ci est connu. N'invente pas le fuseau d'un timestamp qui ne le fournit pas.

## Schéma mental

```text
chemin → fichier → décodage → validation → données utilisables
CSV/JSON restent du texte jusqu'au parsing et à la conversion explicite
```

## Pourquoi / quand / limites

- **Pourquoi :** une donnée n'est fiable que si son format, son encodage et ses règles de validation sont explicites.
- **Quand :** utilise CSV pour des lignes tabulaires, JSON pour des structures imbriquées, et `pathlib` pour manipuler les chemins.
- **Limites :** parser correctement ne rend pas les données vraies ; `Decimal` ne corrige pas une unité fausse et un timestamp sans fuseau reste ambigu.

## Mécanisme : la version sans magie

Le fichier est ouvert, son contenu est décodé en texte, puis le parseur convertit les caractères en structures Python. Les conversions de nombres et de dates sont des étapes séparées qui peuvent échouer.

## Mission utile : lire un petit lot Kintana

Crée un CSV avec trois demandes et lis-le avec `csv.DictReader`. Vérifie qu'un identifiant et un statut sont présents, puis écris les lignes valides dans un fichier JSON UTF-8. Place les lignes invalides dans une seconde liste en mémoire ; ne les supprime pas silencieusement.

**Livrable :** le CSV source, le script, le JSON créé et le compte des lignes traitées.

**Critères d'acceptation :** les chemins sont clairs, l'encodage est explicite, les conversions sont contrôlées et les entrées invalides sont visibles.

## Transfert : variation proche

**Transfert :** déplace le dossier de travail et explique pourquoi un chemin relatif peut ne plus pointer vers le même fichier.

## Ancrage LAB

Le pipeline Data Engineering utilise CSV, JSON, chemins et contrôles de données. Le laboratoire ML utilise également CSV et des dates ordonnées : ne mélange pas les lignes si le temps fait partie du problème.

<!-- AF-LESSON-PROFILE: data-formats -->
