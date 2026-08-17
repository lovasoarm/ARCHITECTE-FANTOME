---
stability: intemporel
acte: appliquer
---

# drill_1 : restituer sans support : memory performance

Mode de verification : critere binaire du `verification_pack` (voir [criteres.md](criteres.md)).

Duree : 10 minutes chrono. Support ferme, IA fermee, notes fermees.

## Consigne

Ecris de memoire, sur une feuille ou dans un fichier neuf, la definition et le mecanisme de chacun des elements suivants du module :

1. Garbage Collector (GC)
2. Mark-and-Sweep
3. Fuite mémoire
4. Référence forte
5. WeakRef

Pour chaque element, une definition en deux lignes maximum, puis une ligne "ca casse quand...".

## Critere binaire

REUSSI : les cinq elements sont ecrits, chacun avec sa definition et sa ligne "ca casse quand", sans avoir rouvert un seul fichier du module.
NON REUSSI : un seul element manquant, approximatif, ou retrouve en rouvrant un fichier.

Aucune nuance, aucun bareme intermediaire. En cas de doute, c'est NON REUSSI.
