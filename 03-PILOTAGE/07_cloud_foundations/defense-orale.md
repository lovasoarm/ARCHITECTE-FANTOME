# DÉFENSE ORALE : 07 FONDATIONS CLOUD

Ce module Staff est juge a l'oral, pas a la lecture : ce qui est evalue ici, c'est la topologie, le rayon d'impact et le cout.
Trois objections types, tirees de la banque de [06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md),
meme protocole : chrono de 5 minutes par objection, reponse a voix haute, aucune note
pendant la reponse, grille du CONTRADICTEUR pour la notation.

| # | Objection posee en face | Ce qu'une reponse de Staff contient |
| --- | --- | --- |
| 1 | Pourquoi cette neuvieme coute ca ? Le multi-zone double la facture des composants repliques pour une panne qu'on n'a jamais eue. | Sortir le releve tarifaire date (07_releve_tarifaire_reel.md), le surcout calcule de la seconde zone, et le comparer au cout d'une journee d'indisponibilite. La reponse est un rapport de deux nombres releves, avec leurs URL et leurs dates. |
| 2 | Un seul fournisseur, un seul contrat : le multi-cloud est une lubie d'architecte. | Distinguer portabilite (savoir partir, exercee une fois) et exploitation simultanee (rarement justifiee). Nommer la contrainte qui imposerait la seconde : reglementaire, contractuelle, ou SLO au-dela de 99,95 %. |
| 3 | Votre schema est joli, mais l'egress, vous l'avez chiffre sur quel volume ? | Annoter la fleche inter-region avec le volume mensuel attendu et le prix au Go releve. Un diagramme sans volume annote ne permet aucune discussion de cout. |

## Regle de validation (binaire, pas d'auto-notation complaisante)

- [ ] Les trois objections ont ete jouees chronometrees, a voix haute, sans notes.
- [ ] Chaque reponse contient au moins un nombre releve et sa source datee.
- [ ] Chaque reponse nomme la condition dans laquelle l'objection aurait raison.

Une case non cochee = la defense n'est pas passee. Grille detaillee et methode de tirage :
[CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md). Critere binaire du module : [verification_pack/criteres.md](verification_pack/criteres.md).
