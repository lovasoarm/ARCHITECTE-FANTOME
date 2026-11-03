# Référence isolée : 13_memory_hunter

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **mémoire** (comptage et suppression). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **mémoire** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Comptage et durée de vie des ressources

**À réaliser après le laboratoire générique :** Modélise une collection de ressources suivies par identifiant. Ajoute et retire des éléments en maintenant un compteur cohérent, puis distingue suppression métier et libération mémoire du runtime.

**Cas minimaux à traiter :**

- création
- suppression
- suppression répétée
- ressource encore référencée

**Critères de réussite :** Le compteur suit l’état logique ; aucune collecte mémoire n’est supposée immédiate ; l’exercice ne prétend pas prouver une absence de fuite réelle.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
