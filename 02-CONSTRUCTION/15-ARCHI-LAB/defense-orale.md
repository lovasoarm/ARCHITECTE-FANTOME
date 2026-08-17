# DÉFENSE ORALE : 15 ARCHI LAB

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Couplage | Un changement isolé se transforme en chantier de trois jours ailleurs | Peux-tu citer le type de couplage entre deux modules précis de ton système, et pourquoi ce type-là ? |
| Cohésion | Un module fourre-tout devient impossible à décrire en une phrase, personne n'ose plus y toucher seul | Peux-tu décrire ce module en une phrase sans "et" ? |
| Dépendance dirigée | Un cycle de dépendances rend impossible de déployer, tester ou remplacer une partie sans l'autre | Peux-tu dessiner le graphe de dépendances de ton système sans trouver de cycle ? |
| Inversion de dépendance | Le domaine se retrouve à connaître HTTP, SQL ou un framework, impossible à tester sans les démarrer | Ton domaine peut-il se tester sans base de données ni serveur démarré ? |
| Source de vérité | Deux copies divergent, personne ne sait laquelle croire, une décision se prend sur la mauvaise | Pour une donnée dupliquée dans ton système, sais-tu nommer sa source de vérité ? |
| Cohérence éventuelle | Une décision irréversible se prend sur une copie périmée, sans que personne ne l'ait choisi | Quelle décision irréversible pourrait s'appuyer, par erreur, sur une copie non à jour ? |
| Monolithe modulaire | Le système se fragmente en services avant que l'équipe en ait besoin, coût réseau payé pour rien | Pourquoi choisir un monolithe modulaire plutôt que des microservices ici, avec quels critères ? |
| Critères monolithe vs services | On découpe en services par mode plutôt que par besoin, coût réseau sans bénéfice réel | Lequel des quatre critères est vrai dans ton contexte actuel, et lequel ne l'est pas ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
