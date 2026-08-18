# DÉFENSE ORALE : 16 DDD ET CONTRATS

Ce module Staff est juge a l'oral, pas a la lecture : ce qui est evalue ici, c'est le decoupage en contextes bornes et la separation ecriture / lecture.
Trois objections types, tirees de la banque de [06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md),
meme protocole : chrono de 5 minutes par objection, reponse a voix haute, aucune note
pendant la reponse, grille du CONTRADICTEUR pour la notation.

| # | Objection posee en face | Ce qu'une reponse de Staff contient |
| --- | --- | --- |
| 1 | Pourquoi pas un CRUD ? Une seule table, une seule equipe, et personne n'a besoin d'apprendre le vocabulaire d'un livre de 2003. | Donner raison au CRUD tant qu'aucun fait mesure ne le disqualifie : citer TON lag de projection et TA contention observee, ou reconnaitre que le CRUD gagne ici. Voir 05_expliquer_cqrs_a_3_publics.md. |
| 2 | Vos contextes bornes, c'est du decoupage pour le plaisir : deux equipes, deux bases, et une migration a chaque changement de champ. | Nommer la frontiere par le langage, pas par la technique : deux definitions differentes du meme mot metier = deux contextes. Puis chiffrer le cout du contrat (versionnage, periode de double ecriture) et l'assumer. |
| 3 | Vous rompez un contrat public d'API : qui paie la casse chez les clients ? | Presenter la procedure ecrite : depreciation datee, double version servie, mesure du trafic residuel sur l'ancienne version, date de coupure annoncee. Sans ces quatre elements, la rupture n'est pas defendable. |

## Regle de validation (binaire, pas d'auto-notation complaisante)

- [ ] Les trois objections ont ete jouees chronometrees, a voix haute, sans notes.
- [ ] Chaque reponse contient au moins un nombre releve et sa source datee.
- [ ] Chaque reponse nomme la condition dans laquelle l'objection aurait raison.

Une case non cochee = la defense n'est pas passee. Grille detaillee et methode de tirage :
[CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md). Critere binaire du module : [verification_pack/criteres.md](verification_pack/criteres.md).
