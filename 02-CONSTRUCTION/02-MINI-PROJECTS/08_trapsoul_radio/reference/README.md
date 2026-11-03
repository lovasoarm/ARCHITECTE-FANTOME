# Référence isolée : 08_trapsoul_radio

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **radio** (sélection sûre dans une liste). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **radio** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Sélection d’une piste dans une liste

**À réaliser après le laboratoire générique :** Sélectionne une piste par identifiant dans une liste disponible. Distingue liste vide, piste absente, piste désactivée et piste sélectionnable ; n’utilise jamais un index non validé.

**Cas minimaux à traiter :**

- liste vide
- identifiant absent
- piste désactivée
- piste sélectionnable

**Critères de réussite :** La sélection renvoie un résultat explicite ; aucune piste différente n’est choisie silencieusement ; l’ordre de la liste est préservé.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
