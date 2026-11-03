# Référence isolée : 05_prison_break_api

**Portée honnête :** laboratoire JavaScript de validation d'entrées, **pas** la solution complète au cahier des charges. Le métier à réaliser demeure : **api** (refus des requêtes invalides). Ne pas utiliser ce laboratoire comme certification du projet.

Prérequis : Node.js 22+, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Arborescence : `minimal.js` → `intermediate.js` → `complete.js` → `test.cjs`. Le niveau 1 valide le type d'entrée, le niveau 2 ajoute une règle d'acceptation, le niveau 3 rapporte un diagnostic. Transférer cette mécanique dans **api** après lecture du cahier, pas avant. Le parcours apprenant reste dans `../src/` et `../tests/` ; ne pas copier la référence dans la remise.

## Transfert métier spécifique : Accès à une ressource protégée

**À réaliser après le laboratoire générique :** Étends le validateur à une décision d’accès : une ressource appartient à une section et une identité possède un rôle. Refuse par défaut les rôles inconnus et les combinaisons non prévues.

**Cas minimaux à traiter :**

- rôle autorisé
- rôle insuffisant
- section inconnue
- identité absente

**Critères de réussite :** L’autorisation est vérifiée côté serveur dans le modèle ; une entrée invalide n’accorde jamais l’accès ; la référence reste un exercice isolé, pas une API complète.

**Portée :** cette extension est une consigne de travail pour `../src/` et `../tests/`. Elle n’est pas implémentée par `minimal.js`, `intermediate.js` ou `complete.js` et ne doit pas être présentée comme une solution déjà fournie. La référence isolée continue seulement à illustrer une chaîne de validation d’entrée et de diagnostic.
