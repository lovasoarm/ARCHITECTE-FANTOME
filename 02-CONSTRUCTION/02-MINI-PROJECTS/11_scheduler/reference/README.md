# Laboratoire complémentaire : validation des entrées

Ce dossier est un petit exercice isolé de validation et de diagnostic. Il **ne constitue pas** une implémentation de `Loop` ni de `pMap`, et ses tests ne valident pas le cahier des charges principal du mini-projet.

Son but est uniquement de montrer une progression en trois étapes :

- `minimal.js` refuse une entrée qui n'est pas un tableau ;
- `intermediate.js` ajoute une règle d'acceptation ;
- `complete.js` ajoute un diagnostic lisible.

Prérequis : Node.js 22.x, aucune dépendance réseau. Depuis `reference/` :

```sh
node --test test.cjs
node -e "console.log(require('./complete').report([1,2]))"
```

Le projet principal demeure dans `../src/` et `../tests/`. Ne copie pas ces fichiers comme solution du scheduler.

## Transfert facultatif : planification de créneaux

Après le laboratoire, tu peux concevoir une validation de créneau tenant compte de la date, de la durée et des plages déjà occupées. Distingue chevauchement, créneau adjacent et heure locale avec fuseau explicite.

Cas à traiter : créneau libre, chevauchement partiel, bornes qui se touchent et heure/fuseau invalide. Déclare les bornes inclusives/exclusives et la règle de conflit. Cette extension n'est pas implémentée ici et ne doit pas être présentée comme une preuve obtenue.
