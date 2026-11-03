# Référence isolée : 07_ballon_dor_cli

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **classement** (tri stable avec égalités). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **classement** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Classement de votes avec égalités

**À réaliser après le laboratoire générique :** Calcule les points à partir de bulletins valides puis produit un classement déterministe. Définis le départage des égalités et refuse les votes dupliqués selon un identifiant explicite.

**Cas minimaux à traiter :**

- bulletin valide
- candidat inconnu
- bulletin dupliqué
- égalité de points

**Critères de réussite :** La règle de points et le départage sont documentés ; les entrées n’ont pas d’effet caché ; le classement reste stable à données identiques.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
