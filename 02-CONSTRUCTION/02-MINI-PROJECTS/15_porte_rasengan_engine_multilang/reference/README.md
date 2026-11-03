# Référence isolée : 15_porte_rasengan_engine_multilang

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **moteur polyglotte** (contrat identique entre implémentations). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **moteur polyglotte** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Parité d’un contrat entre langages

**À réaliser après le laboratoire générique :** Choisis une fonction pure du moteur et définis une table d’entrées/sorties partagée. Implémente le même contrat dans le langage cible sans traduction syntaxique aveugle.

**Cas minimaux à traiter :**

- entrée nominale
- borne numérique
- entrée invalide
- cas qui révèle une différence de type

**Critères de réussite :** Les deux langages appliquent la même règle métier ; les différences de représentation sont documentées ; les résultats de référence ne sont pas extrapolés à tout le moteur.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
