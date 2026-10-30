---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 04 : WAL, MVCC et consensus : trois problèmes différents

## Résultat attendu

Expliquer le contrat de durabilité, la visibilité des versions concurrentes et les garanties d'un consensus sans mélanger ces problèmes en un unique projet vague.

## WAL / récupération

Le write-ahead log impose que l'information nécessaire à la récupération soit persistée avant que la page ou l'état associé soit considéré durable selon le contrat choisi. Il faut préciser le comportement vis-à-vis du flush, du système de fichiers et du matériel. Un `write()` réussi ne prouve pas nécessairement que tout résistera à une coupure physique.

Exercice : écrire un log append-only et une récupération idempotente ; injecter un crash à chaque frontière d'écriture ; comparer le résultat à un modèle de référence.

## MVCC

MVCC conserve plusieurs versions pour que les transactions voient un état cohérent selon une règle d'isolation définie. Les questions centrales sont : version visible, snapshot, write-write conflict, commit/abort et nettoyage des versions anciennes. Ne pas revendiquer serializable si seul un comportement plus faible est implémenté.

Exercice : simuler deux lecteurs et deux écrivains qui s'entrelacent ; documenter et tester ce que chaque transaction doit voir.

## Raft / réplication

Le consensus ajoute les termes, élections, réplication du journal, quorum, commit et réintégration d'un nœud retardé. Une majorité n'est pas un synonyme de “les messages ont été reçus”. Un prototype qui passe trois scénarios normaux ne prouve pas la sûreté du protocole.

Exercice : commencer par un modèle d'état simplifié, tester partition, ancien leader, réordonnancement/duplicats de messages et rattrapage d'un nœud. Garder la réplication comme phase séparée après la correction WAL/MVCC.

## Interdit

Ne pas implémenter sa propre cryptographie ; ne pas utiliser le moteur pédagogique pour des données importantes ; ne pas copier les règles d'un protocole sans comprendre les invariants.

## Références de départ

- [PostgreSQL : documentation officielle](https://www.postgresql.org/docs/current/)
- [Raft : site et papier du protocole](https://raft.github.io/)
- [CrazyDB](../09-crazydb.md)
