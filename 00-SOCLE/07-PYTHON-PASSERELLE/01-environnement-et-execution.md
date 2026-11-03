---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L1-L2
perturbation_modes: [environnement_absent, mauvaise_commande]
anti_recipe_key: environnement_absent+mauvaise_commande
transfer_distance: near
assessment_role: instructional_checkpoint
---

> **SCÈNE Kintana —** une demande doit être rejouée sur un autre poste ; avant de lire le résultat, l’équipe doit savoir quel interpréteur a réellement lancé le fichier.

# 01 : Environnement et exécution Python

Python est un langage exécuté par un interpréteur. Le fichier contient les instructions ; l'interpréteur les lit et les exécute. Tu n'as pas besoin d'un IDE lourd ni d'un compte en ligne pour commencer.

## 1. Vérifier l'interpréteur

Windows, avec Python Launcher :

```powershell
py -3.15 --version
```

Si Python 3.15 n'est pas disponible pour ton système, Python 3.14 est une alternative maintenue :

```powershell
py -3.14 --version
```

Windows, si seule la commande générique `python` est configurée, vérifie toujours sa version :

```powershell
python --version
```

macOS / Linux, avec une installation versionnée :

```bash
python3.15 --version
```

Si 3.15 n'est pas disponible, essaie `python3.14 --version`. Si seul `python3` est fourni, vérifie sa version : le plancher documentaire annoncé par les laboratoires est Python 3.12+, mais une nouvelle installation doit préférer 3.15.x ou, si nécessaire, 3.14.x. Une version 3.12+ déjà présente peut être utilisée pour cette première mission si elle correspond au plancher demandé par l'activité ; note sa version réelle et ne déduis pas une compatibilité au-delà de ce qui est documenté. Installe depuis [python.org](https://www.python.org/downloads/) avec un installateur adapté ; ne compile pas Python depuis les sources uniquement pour cette passerelle.

## 2. Ton premier fichier

Crée un fichier `hello.py` dans un dossier de travail :

```python
print("Bonjour, Python !")
print(2 + 3)
```

Lance-le depuis le dossier qui contient le fichier : `py -3.15 hello.py` sous Windows avec Python 3.15, `py -3.14 hello.py` avec le fallback 3.14, ou `python3.15` / `python3.14` sur macOS/Linux selon la version installée. Si tu utilises une commande générique (`python` ou `python3`), vérifie d'abord sa version. `print()` écrit une sortie lisible dans le terminal. Le terminal n'est pas Python : c'est l'endroit où tu lances l'interpréteur et observes le résultat.

## 3. Fichier ou console interactive ?

- **Fichier `.py`** : garde les instructions et permet de les relancer.
- **Console interactive** : essaie une expression rapidement, sans créer de fichier durable.

Ne confonds pas le caractère `>>>` de la console interactive avec une instruction à recopier dans un fichier `.py`.

## Schéma mental

```text
hello.py  ──commande──>  interpréteur Python  ──exécution──>  sortie / erreur
```

## Pourquoi / quand / limites

- **Pourquoi :** savoir quel interpréteur exécute le fichier évite de diagnostiquer le mauvais environnement.
- **Quand :** vérifie la version avant chaque nouveau laboratoire Python ou lorsqu'une commande `python` est introuvable.
- **Limites :** un script qui démarre correctement ne prouve pas qu'il produit le bon résultat ; il faut encore vérifier sa sortie et ses cas limites.

## Mécanisme : la version sans magie

Le système cherche l'exécutable correspondant à ta commande. Celui-ci lit le fichier Python, puis exécute les instructions dans l'ordre, sauf lorsqu'une condition, une boucle, une fonction ou une exception modifie le flux.

## Mission utile : lancer un script sans ambiguïté

Dans `scratch/python-bridge/`, crée `hello.py`, exécute-le avec le lanceur adapté à ton système et consigne la commande exacte ainsi que la version affichée.

**Livrable :** le fichier, la commande et la sortie observée.

**Critères d'acceptation :** l'interpréteur est Python 3.15.x (choix recommandé), Python 3.14.x (alternative maintenue si 3.15 n'est pas disponible), ou une version 3.12+ déjà installée lorsque l'activité autorise ce plancher documentaire ; tu notes la version réellement utilisée ; la commande fonctionne depuis le bon dossier ; tu peux expliquer la différence entre terminal, fichier et interpréteur. La recommandation de version ne remplace pas une preuve d'exécution des laboratoires.

## Transfert : variation proche

**Transfert :** lance un second fichier depuis un autre dossier en donnant son chemin ; explique pourquoi le dossier courant compte.

## Ancrage LAB

Les laboratoires 70, 71 et 75 fournissent déjà leurs fichiers Python. Tu commences par les exécuter et les lire : personne ne te demande de construire un environnement distribué pour valider cette leçon.

> Une commande notée n'est pas une preuve d'exécution. Écris seulement ce que tu as réellement observé.

<!-- AF-LESSON-PROFILE: tooling -->
