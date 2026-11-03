# Référence isolée : 16_distributed_arena

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **distribution** (ordre et idempotence). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **distribution** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Idempotence d’un événement rejoué

**À réaliser après le laboratoire générique :** Traite des événements porteurs d’un identifiant. Applique chaque effet une seule fois même si le même événement est reçu plusieurs fois et conserve une trace de décision.

**Cas minimaux à traiter :**

- événement nouveau
- même identifiant rejoué
- identifiant absent
- deux événements distincts dans un ordre différent

**Critères de réussite :** La clé d’idempotence et sa portée sont définies ; les effets ne doublonnent pas ; l’ordre et les événements tardifs sont traités explicitement.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
