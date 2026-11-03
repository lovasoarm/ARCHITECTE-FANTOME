---
stability: stable
acte: apprendre-et-pratiquer
cognitive_level: L3
perturbation_modes: [argument_absent, regression]
anti_recipe_key: argument_absent+regression
transfer_distance: medium
assessment_role: mastery_checkpoint
---

> **SCÈNE Kintana —** un incident est signalé dans un laboratoire ; avant de modifier le pipeline, l’ingénieur doit comprendre sa commande, ses entrées, sa sortie et ses tests.

# 06 : Tests, arguments et lecture d'un laboratoire

Un script peut être lancé avec des options. Un test vérifie un comportement précis. Le but ici n'est pas d'apprendre tout `unittest` ni de devenir administrateur système : il faut savoir lire les commandes des trois laboratoires Python et vérifier les sorties.

## 1. Arguments de commande

Certains scripts utilisent `argparse`. Tu peux commencer par demander l'aide du programme :

```bash
python run_pipeline.py --help
```

Dans cette commande, `--help` demande au script d'expliquer ses options. Un argument comme `--input data/events.csv` désigne le fichier d'entrée ; `--output build` désigne le dossier de sortie dans ce laboratoire. Ne remplace pas un chemin sans comprendre où les fichiers seront créés.

Sous Windows avec Python Launcher, remplace `python` par `py -3.15`. Sur macOS/Linux, remplace-le par `python3` si `python` n'est pas disponible.

## 2. Premier test avec `unittest`

```python
import unittest

def add_tax(amount, rate):
    return amount * (1 + rate)

class TaxTests(unittest.TestCase):
    def test_zero_rate_keeps_amount(self):
        self.assertEqual(add_tax(100, 0), 100)

if __name__ == "__main__":
    unittest.main()
```

Le test appelle la fonction avec une entrée connue puis compare le résultat attendu. `assertEqual` signale un échec si les deux valeurs diffèrent. Un test vert signifie uniquement que cette assertion a réussi dans ce contexte.

Lancer les tests d'un laboratoire :

```bash
python -m unittest discover -s tests -v
```

Cette commande recherche les tests dans `tests`. Le statut `PASS` n'est valable que pour les tests réellement lancés, sur l'environnement affiché.

## 3. Lire un dépôt sans tout réécrire

Avant de modifier un laboratoire :

1. lis son README et ses prérequis ;
2. repère le fichier d'entrée et le dossier de données ;
3. lance `--help` si le script le propose ;
4. suis une fonction depuis son appel jusqu'à son résultat ;
5. lis les tests pour comprendre les comportements attendus ;
6. consigne les versions et les résultats réels.

Le laboratoire 75 fournit un service HTTP construit avec `http.server` et `ThreadingHTTPServer`. Tu dois comprendre le contrat des endpoints et les commandes de lancement ; tu n'as pas à réécrire le serveur ni à maîtriser les threads Python pour réussir cette passerelle.

## Schéma mental

```text
commande + options → script → entrée / traitement → sortie
test → appel contrôlé → assertion → PASS ou FAIL
```

## Pourquoi / quand / limites

- **Pourquoi :** les scripts du curriculum ont des points d'entrée et des tests ; savoir les lire évite d'exécuter des commandes au hasard.
- **Quand :** consulte `--help` avant de changer un chemin ou une option ; lis les tests avant d'interpréter une sortie.
- **Limites :** un test unitaire ne certifie ni toute l'application ni un service réel ; un test non exécuté ne peut pas être déclaré réussi.

## Mécanisme : la version sans magie

Le shell transmet les arguments au processus. Le programme les lit, choisit ses entrées et exécute les fonctions. `unittest` découvre des méthodes de test, les exécute et compare les résultats observés aux assertions.

## Mission utile : mini-gate de lecture

Choisis un laboratoire Python, lis le README et le script d'entrée. Explique la commande, le fichier d'entrée, le dossier de sortie et un test. Ne modifie pas le code.

**Livrable :** une fiche courte avec la commande exacte, les chemins, une fonction suivie et un résultat réellement observé (ou `NOT RUN` si tu ne l'as pas lancé).

**Critères d'acceptation :** tu peux décrire le flux sans prétendre à une exécution que tu n'as pas faite ; tu sais distinguer le test local, l'extension de plateforme et une preuve de production.

## Transfert : variation proche

**Transfert :** applique la même lecture à un autre laboratoire et relève une différence de point d'entrée ou de dépendance.

## Ancrage LAB

Les laboratoires 70, 71 et 75 sont des exercices contrôlés. Une fixture synthétique, une simulation ou un service local ne prouvent pas une capacité Big Data ou une expérience de production.

<!-- AF-LESSON-PROFILE: testing-tools -->
