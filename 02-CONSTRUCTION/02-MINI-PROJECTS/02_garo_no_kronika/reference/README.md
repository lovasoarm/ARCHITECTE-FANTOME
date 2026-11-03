# Référence isolée : 02_garo_no_kronika

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **chronologie** (tri stable des événements et égalité des dates). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **chronologie** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Chronologie d’événements

**À réaliser après le laboratoire générique :** Traite une liste d’événements datés : normalise les dates admises, ordonne sans perdre l’ordre d’arrivée des événements à date égale et refuse une date invalide.

**Cas minimaux à traiter :**

- entrée vide
- deux événements avec le même horodatage
- date invalide
- entrée déjà ordonnée

**Critères de réussite :** Le tri est stable et ne mute pas l’entrée ; le format et le fuseau attendus sont explicités.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
