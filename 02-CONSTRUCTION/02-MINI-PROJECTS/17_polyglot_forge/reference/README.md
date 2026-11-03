# Référence isolée : 17_polyglot_forge

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **forge polyglotte** (parité des formats). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **forge polyglotte** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Parité de trace entre deux implémentations

**À réaliser après le laboratoire générique :** Définis un scénario déterministe d’event loop simplifiée (file macrotask, microtask, tick) lu par deux implémentations. Compare les traces ligne par ligne.

**Cas minimaux à traiter :**

- une macrotask et une microtask
- plusieurs microtasks
- enchaînement de ticks
- file vide

**Critères de réussite :** L’entrée est partagée ; aucun wall-clock n’influence la sortie ; toute divergence est expliquée plutôt que corrigée par un tri artificiel.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
