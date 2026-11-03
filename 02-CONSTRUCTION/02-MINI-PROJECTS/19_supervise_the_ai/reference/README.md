# Référence isolée : 19_supervise_the_ai

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **supervision IA** (refus et preuve indépendante). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **supervision IA** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Superviser une proposition générée sous invariants

**À réaliser après le laboratoire générique :** Évalue une proposition de changement selon les invariants append-only, idempotence, crash-safety, absence de réseau et dépendances contrôlées. Rejette toute modification qui les viole sans ADR approuvé.

**Cas minimaux à traiter :**

- proposition conforme
- réécriture du journal
- rejeu du journal
- dépendance ou accès réseau non autorisé

**Critères de réussite :** Chaque verdict cite un invariant et une preuve ; la simulation est étiquetée ; l’agent ne peut pas s’auto-certifier.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
