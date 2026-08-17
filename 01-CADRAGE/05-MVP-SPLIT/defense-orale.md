# DÉFENSE ORALE : 05 MVP SPLIT

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Tranche verticale | Rien n'est utilisable avant que tout soit fini, aucune validation terrain avant la fin | Ta première tranche livre-t-elle un scénario complet, ou juste une brique technique ? |
| Couche horizontale | Des semaines de travail sans aucun retour utilisateur possible avant l'assemblage final | Cette couche, seule, apporte-t-elle une valeur observable à quelqu'un ? |
| Invariant d'une feature | Tu coupes au mauvais endroit et livres quelque chose qui ment à l'utilisateur | Que se passe-t-il concrètement si cette règle est violée ? |
| Ligne de coupe | La coupe touche l'invariant : la version réduite devient dangereuse ou trompeuse | Sur quel axe as-tu réduit sans toucher l'invariant ? |
| Feature flag | Du code incomplet part en production sans filet, ou bloque un déploiement complet | Comment reviens-tu en arrière si ce comportement pose problème en production ? |
| Estimation honnête | Un chiffre unique rassure sur le moment puis explose sans qu'on sache pourquoi | Quelle est la source d'incertitude principale de cette estimation ? |
| Effet tunnel | Le dépassement est découvert au dernier moment, sans marge pour réagir | Quel point de contrôle rapproché aurait révélé cet écart plus tôt ? |
| Coût d'opportunité | Un refus paraît arbitraire, ou un oui coûte une autre priorité sans arbitrage conscient | Qu'est-ce que ce oui te fait sacrifier ailleurs, précisément ? |
| Dette technique assumée | Le raccourci se perd dans le code, personne ne sait qu'il faut le rembourser | Quelle est l'échéance de remboursement de cette dette, et où est-elle écrite ? |
| Dette technique subie | Le raccourci explose en production, traité comme une surprise alors qu'il était prévisible | Comment aurait-on pu transformer cette dette subie en dette assumée à temps ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
