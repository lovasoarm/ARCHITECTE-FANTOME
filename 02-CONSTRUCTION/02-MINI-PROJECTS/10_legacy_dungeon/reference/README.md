# Référence isolée : 10_legacy_dungeon

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **legacy** (migration non destructive). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **legacy** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Règle métier extraite d’un legacy

**À réaliser après le laboratoire générique :** Isole une règle de décision d’un comportement historique. Compare avant/après sur des exemples documentés et conserve explicitement les comportements que la spécification demande de préserver.

**Cas minimaux à traiter :**

- cas nominal historique
- cas limite
- entrée invalide
- comportement retiré explicitement

**Critères de réussite :** Chaque changement est relié à une exigence ; la compatibilité n’est pas supposée ; les comportements inconnus sont signalés.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
