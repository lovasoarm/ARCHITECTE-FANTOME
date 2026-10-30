# Référence isolée : 06_ultras_dashboard

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **tableau de bord** (total calculé sans valeurs invalides). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **tableau de bord** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

**Exemple TDD contextualisé :** pour tableau de bord, un tableau nul doit échouer par `TypeError`; un tableau avec valeur manquante doit être refusé. **ADR :** commencer par un contrat `Array` testable avant une entrée réseau ; coût : modèle initial artificiellement étroit. **Postmortem de démonstration :** une entrée partielle était acceptée ; détection par test négatif, correctif au niveau `analyze`, prévention par test de non-régression.
