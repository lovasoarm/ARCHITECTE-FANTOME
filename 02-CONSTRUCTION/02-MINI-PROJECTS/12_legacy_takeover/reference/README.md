# Référence isolée : 12_legacy_takeover

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **reprise de legacy** (valeur absente et transformation réversible). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **reprise de legacy** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Prise en main sans casser le comportement existant

**À réaliser après le laboratoire générique :** Choisis une fonction legacy et construis une caractérisation des comportements observables avant refactor. Isole une règle, puis compare les mêmes scénarios après modification.

**Cas minimaux à traiter :**

- cas nominal existant
- cas d’erreur connu
- entrée limite
- comportement à changer avec justification

**Critères de réussite :** Les tests de caractérisation décrivent l’existant sans l’approuver ; toute divergence est reliée à une décision documentée.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
