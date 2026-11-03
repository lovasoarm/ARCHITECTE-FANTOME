# Référence isolée : 06_ultras_dashboard

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **tableau de bord** (total calculé sans valeurs invalides). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **tableau de bord** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Agrégation d’événements de match

**À réaliser après le laboratoire générique :** À partir d’événements de match validés, calcule un compteur ou indicateur simple par type et fenêtre. Sépare événements invalides, doublons éventuels et événements acceptés.

**Cas minimaux à traiter :**

- aucun événement
- type inconnu
- doublon avec identifiant
- volume supérieur à la fenêtre

**Critères de réussite :** L’agrégat est déterministe pour une même entrée ; une règle de déduplication est écrite ; aucun débit réel n’est revendiqué.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
