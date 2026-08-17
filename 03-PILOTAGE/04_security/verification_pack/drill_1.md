---
stability: intemporel
acte: appliquer
---

# drill_1 : restituer sans support : security

Mode de verification : critere binaire du `verification_pack` (voir [criteres.md](criteres.md)).

Duree : 10 minutes chrono. Support ferme, IA fermee, notes fermees.

## Consigne

Ecris de memoire, sur une feuille ou dans un fichier neuf, la definition et le mecanisme de chacun des elements suivants du module :

1. XSS (Cross-Site Scripting : injection de script côté client)
2. SQL Injection
3. CSRF (Cross-Site Request Forgery : falsification de requête cross-site)
4. CORS (Cross-Origin Resource Sharing : partage de ressources cross-origine)
5. Prototype Pollution

Pour chaque element, une definition en deux lignes maximum, puis une ligne "ca casse quand...".

## Critere binaire

REUSSI : les cinq elements sont ecrits, chacun avec sa definition et sa ligne "ca casse quand", sans avoir rouvert un seul fichier du module.
NON REUSSI : un seul element manquant, approximatif, ou retrouve en rouvrant un fichier.

Aucune nuance, aucun bareme intermediaire. En cas de doute, c'est NON REUSSI.
