# Référence isolée : 14_system_design_lab

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **design système** (budget de capacité et limites). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **design système** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Capacité et limites d’un service

**À réaliser après le laboratoire générique :** À partir d’un profil de charge synthétique, calcule une capacité de traitement et identifie le seuil où la file augmente. Déclare les hypothèses de débit, durée de service et concurrence.

**Cas minimaux à traiter :**

- charge sous capacité
- charge égale à capacité
- charge supérieure
- arrêt du consommateur

**Critères de réussite :** Les unités sont cohérentes ; la file et le débit sont distingués ; le modèle est présenté comme simplifié et non comme une mesure de production.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
