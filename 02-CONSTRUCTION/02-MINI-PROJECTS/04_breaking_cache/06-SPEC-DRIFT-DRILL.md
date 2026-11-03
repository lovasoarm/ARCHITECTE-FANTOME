---
stability: intemporel
acte: pratiquer
---

# SPEC DRIFT DRILL : pendant la construction de 04 BREAKING CACHE

Ce fichier est un carnet mouvant. Il ne contient pas de corrigé prédéfini.

## Règle

À chaque changement de contrat, note ce qui a changé, pourquoi et quels tests empêchent une régression. N'invente pas de modification si tu n'as pas activé la perturbation.

## Format d'entrée

| Date       | Exigence modifiée         | Déclencheur     | Invariant conservé | Tests / fichiers touchés | ADR lié | Coût / risque |
| ---------- | ------------------------- | --------------- | ------------------ | ------------------------ | ------- | ------------- |
| AAAA-MM-JJ | À remplir par l'apprenant | J+1 / J+3 / J+5 | À préciser         | À préciser               | ADR-NNN | À préciser    |

## Vérification après changement

- Le contrat du cahier des charges est-il encore clair ?
- Les tests du comportement précédent existent-ils toujours ?
- Le nouveau comportement n'autorise-t-il pas une lecture inter-tenant ?
- La politique de fraîcheur est-elle explicitement écrite ?
- Les mesures comparent-elles encore les mêmes charges ?

## Rappel à froid

Une semaine après le drill, reconstruis sans relire le changement de contrat, son invariant et le risque qui reste. Compare ensuite ta reconstruction au journal.
