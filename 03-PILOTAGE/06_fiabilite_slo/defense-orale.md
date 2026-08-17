# DÉFENSE ORALE : 06 FIABILITE ET SLO

Ce module Staff est juge a l'oral, pas a la lecture : ce qui est evalue ici, c'est les SLI, les SLO et le budget d'erreur.
Trois objections types, tirees de la banque de [06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md),
meme protocole : chrono de 5 minutes par objection, reponse a voix haute, aucune note
pendant la reponse, grille du CONTRADICTEUR pour la notation.

| # | Objection posee en face | Ce qu'une reponse de Staff contient |
| --- | --- | --- |
| 1 | Pourquoi 99,95 % et pas 99,9 % ? Votre neuvieme supplementaire, elle coute combien ? | Repondre par un calcul, pas par une ambition : minutes d'indisponibilite gagnees par an, surcout de topologie associe (04_rayon_impact_zones.md), et prix de la minute d'indisponibilite pour le metier. Si le prix de la minute est inconnu, le SLO est arbitraire. |
| 2 | Votre budget d'erreur est une autorisation de mal faire. | C'est l'inverse : il est la seule regle qui arrete les livraisons quand la fiabilite se degrade. Montrer la consequence ecrite d'un budget epuise (gel des nouveautes) et la derniere fois ou elle a ete appliquee. |
| 3 | Vos SLI mesurent votre serveur, pas mon utilisateur. | Accepter l'objection et montrer la mesure cote parcours critique, pas cote composant : taux de succes de la transaction complete, latence percentile 99 vue du client. |

## Regle de validation (binaire, pas d'auto-notation complaisante)

- [ ] Les trois objections ont ete jouees chronometrees, a voix haute, sans notes.
- [ ] Chaque reponse contient au moins un nombre releve et sa source datee.
- [ ] Chaque reponse nomme la condition dans laquelle l'objection aurait raison.

Une case non cochee = la defense n'est pas passee. Grille detaillee et methode de tirage :
[CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md). Critere binaire du module : [verification_pack/criteres.md](verification_pack/criteres.md).
