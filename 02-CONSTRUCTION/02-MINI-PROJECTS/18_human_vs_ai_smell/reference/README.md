# Référence isolée : 18_human_vs_ai_smell

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **odeur de code** (critères explicités). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **odeur de code** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Évaluer deux implémentations sans inférer leur origine

**À réaliser après le laboratoire générique :** Compare deux solutions au même problème selon contrat, lisibilité, robustesse et tests. Attribue chaque constat à un élément démontrable du code ; ne conclus pas qu’un échantillon vient d’un humain ou d’une IA sans provenance indépendante.

**Cas minimaux à traiter :**

- sortie nominale
- entrée invalide
- borne de durée
- code difficile à maintenir

**Critères de réussite :** Les critères sont appliqués symétriquement ; les constats sont reproductibles ; provenance et qualité technique sont séparées.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
