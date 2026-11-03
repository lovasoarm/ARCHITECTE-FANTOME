# Référence isolée : 11_scheduler

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **ordonnanceur** (ordre de priorité déterministe). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **ordonnanceur** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Planification et chevauchements

**À réaliser après le laboratoire générique :** Valide un créneau en tenant compte de la date, de la durée et des plages déjà occupées. Distingue chevauchement, créneau adjacent et heure locale avec fuseau explicite.

**Cas minimaux à traiter :**

- créneau libre
- chevauchement partiel
- bornes qui se touchent
- heure/fuseau invalide

**Critères de réussite :** Les bornes inclusives/exclusives sont déclarées ; le fuseau est explicite ; les règles de conflit sont déterministes.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
