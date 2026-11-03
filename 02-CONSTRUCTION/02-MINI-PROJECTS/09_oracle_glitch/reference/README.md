# Référence isolée : 09_oracle_glitch

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **oracle** (estimation explicite et entrée vide). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **oracle** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Estimation avec entrée partielle

**À réaliser après le laboratoire générique :** Calcule une estimation uniquement lorsque les données minimales sont présentes. Marque les champs manquants et refuse de présenter une estimation vide ou non calculable comme une valeur certaine.

**Cas minimaux à traiter :**

- données complètes
- liste vide
- champ absent
- valeur non numérique

**Critères de réussite :** Le résultat distingue estimation, données manquantes et erreur ; aucune valeur par défaut arbitraire ne masque une absence.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
