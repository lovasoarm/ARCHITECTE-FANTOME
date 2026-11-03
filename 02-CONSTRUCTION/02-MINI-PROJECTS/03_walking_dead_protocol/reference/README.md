# Référence isolée  : 03_walking_dead_protocol

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **protocole** (transition explicite et état interdit). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **protocole** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique  : Transitions d’état du camp

**À réaliser après le laboratoire générique :** Modélise les transitions autorisées d’un survivant ou d’une mission. Une transition invalide doit être refusée sans modifier l’état courant ; une transition valide produit un nouvel état cohérent.

**Cas minimaux à traiter :**
- transition autorisée
- transition interdite
- état initial inconnu
- répétition de la même commande

**Critères de réussite :** Les états et transitions sont listés ; la répétition est idempotente ou explicitement rejetée ; aucune mutation partielle ne subsiste.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
