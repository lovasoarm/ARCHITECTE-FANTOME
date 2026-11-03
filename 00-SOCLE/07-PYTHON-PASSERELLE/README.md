---
stability: stable
acte: parcours-conditionnel
noyau: non
route: passerelle-avant-laboratoires-python
last_reviewed: 2026-10-31
---

# Passerelle Python : entrer dans les laboratoires sans prérequis caché

Cette passerelle apprend le Python réellement nécessaire pour lire, exécuter, expliquer et modifier les exercices Python fournis dans AF. Elle s'adresse d'abord aux apprenants qui ont suivi le parcours JavaScript et qui n'ont jamais programmé en Python.

**Elle n'est pas une nouvelle branche obligatoire du Socle JavaScript.** Tu la fais uniquement avant une activité AF qui demande du Python, si tu n'as pas déjà les compétences décrites dans le gate de sortie. Elle comprend six leçons courtes et progressives. Elle ne remplace pas un cursus Python avancé et ne prétend pas enseigner l'écosystème scientifique ou le développement web Python.

## Quelle version installer ?

- **Compatibilité minimale annoncée par les laboratoires AF : Python 3.12+.** Cela décrit leur niveau syntaxique/API minimal, pas une recommandation d'installation ni une preuve de compatibilité exécutée dans cette release.
- **Choix apprenant recommandé au 31 octobre 2026 : Python 3.15.x**, en installant le dernier correctif stable disponible (3.15.2, publié le 25 octobre 2026). La branche 3.15 est en correctifs réguliers ; Python 3.14 l'est également. Si aucun installateur 3.15 n'est proposé pour ton système, Python 3.14.10 est une alternative prise en charge et maintenue. Python 3.12 est déjà en correctifs de sécurité uniquement. Les laboratoires concernés utilisent la bibliothèque standard, sans dépendance tierce dans cette passerelle. Cette description ne constitue ni une preuve de compatibilité exécutée ni une certification de leurs environnements.
- Vérifie la matrice officielle avant installation : [versions Python prises en charge](https://devguide.python.org/versions/) et [téléchargements officiels](https://www.python.org/downloads/).

**Commandes de vérification :**

| Système                   | Python 3.15.x (choix recommandé)               | Python 3.14.x (alternative maintenue)          |
| ------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Windows (Python Launcher) | `py -3.15 --version` / `py -3.15 hello.py`     | `py -3.14 --version` / `py -3.14 hello.py`     |
| macOS / Linux             | `python3.15 --version` / `python3.15 hello.py` | `python3.14 --version` / `python3.14 hello.py` |

Si la commande versionnée n'existe pas, tu peux utiliser `python` ou `python3` après avoir vérifié avec `--version` que l'interpréteur choisi est bien Python 3.12 ou supérieur, conformément au plancher documentaire des laboratoires. Pour une nouvelle installation, préfère 3.15.x ; utilise 3.14.x si aucun installateur 3.15 adapté à ton système n'est disponible. Note toujours la version exacte utilisée. N'installe aucun package tiers pour cette passerelle : les trois laboratoires ciblés utilisent la bibliothèque standard Python.

## Ordre de la passerelle

1. [01 : Environnement et exécution](01-environnement-et-execution.md)
2. [02 : Valeurs et collections](02-valeurs-et-collections.md)
3. [03 : Conditions, boucles et parcours](03-conditions-et-boucles.md)
4. [04 : Fonctions, modules et erreurs](04-fonctions-modules-erreurs.md)
5. [05 : Fichiers, CSV, JSON et types utiles](05-fichiers-csv-json.md)
6. [06 : Tests, arguments et lecture d'un laboratoire](06-tests-cli-et-lecture-lab.md)

Ne saute pas directement à Kafka, Spark, Airflow ou au ML parce que ces noms apparaissent dans un README. Tu dois d'abord réussir le petit travail de sortie, même si tu as déjà l'habitude de JavaScript.

## Gate de sortie : être autonome pour les laboratoires Python

Sans recopier une solution complète, tu dois pouvoir :

- lancer un fichier Python et lire une erreur de syntaxe simple ;
- manipuler `str`, `int`, `float`, `bool`, `None`, `list`, `tuple` et `dict` ;
- écrire une condition, une boucle et une fonction qui retourne un résultat ;
- importer un module de la bibliothèque standard et lire une annotation de type sans croire qu'elle valide les données à l'exécution ;
- lire et écrire un CSV/JSON en UTF-8 avec `pathlib` ;
- expliquer une exception courante et ajouter un test simple avec `unittest` ;
- lancer un script avec des arguments simples et comprendre son dossier de sortie.

**READY** si ces points sont démontrés sur un exercice court et expliqué. **NOT READY** si l'un d'eux bloque : reprends seulement la leçon correspondante. Si tu maîtrises déjà ces capacités, réalise le diagnostic de sortie puis passe directement au laboratoire demandé.

## Où cette passerelle devient nécessaire

| Activité                                                                                                                        | Quand la terminer                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [75 : Platform Operations](../../06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md)                                   | Avant la partie de tests Python locaux sans Docker. Le service est fourni : on ne demande pas d'écrire un serveur HTTP depuis zéro. |
| [70 : Data Engineering Core](../../06-ANNEXES-TRANSVERSES/70-DATA-ENGINEERING-CORE/README.md)                                   | Avant d'exécuter, lire ou modifier le pipeline batch Python.                                                                        |
| [71 : Mathématiques & Machine Learning Core](../../06-ANNEXES-TRANSVERSES/71-MACHINE-LEARNING-MATH-CORE/README.md)              | Avant les laboratoires Python ML ; la passerelle couvre le langage, pas les mathématiques requises.                                 |
| [Mini-projet 15 : Portage Rasengan Engine](../../02-CONSTRUCTION/02-MINI-PROJECTS/15_porte_rasengan_engine_multilang/README.md) | Seulement si tu choisis Python comme second langage ; elle n'est pas nécessaire si tu choisis Go.                                   |

## Limites et honnêteté

Cette passerelle ne prétend pas rendre autonome sur les classes avancées, les décorateurs, l'asynchronisme Python, les frameworks, NumPy, pandas, scikit-learn ou l'exploitation d'un service web Python. Les laboratoires AF les plus proches utilisent des scripts et la bibliothèque standard ; certaines implémentations, notamment le serveur Platform Operations, sont fournies et doivent être lues, pas réécrites intégralement par un débutant.

Le passage de JavaScript à Python implique des différences réelles : indentation, valeur `None`, mutabilité, dictionnaires, exceptions, imports, environnement et conventions. Ne transpose pas mécaniquement une syntaxe JavaScript.
