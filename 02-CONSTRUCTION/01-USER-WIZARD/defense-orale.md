# DÉFENSE ORALE : 01 USER WIZARD

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| États obligatoires | L'UI ment sur l'état réel des données : succès affiché sur une erreur, ou inverse | Pour cet écran, montre-moi les six états rendus, pas seulement le cas ready |
| État partiel | L'utilisateur croit avoir toutes les données alors qu'il n'en a qu'une partie, décide sur une base fausse | Comment distingues-tu visuellement un succès partiel d'un succès complet ? |
| Overload | Le navigateur se fige à essayer de rendre des milliers de lignes d'un coup | Quel seuil de volume déclenche le passage en mode filtré forcé ? |
| Machine à états d'un formulaire | Un double clic ou un timeout renvoie deux fois la même action sans que personne ne le détecte | Que fait ton formulaire si la réponse serveur n'arrive jamais (timeout) ? |
| Idempotence | Un retry réseau ou un double clic crée deux fois la ressource (double réservation, double paiement) | Quelle est la clé d'idempotence de cette soumission, et qui la génère ? |
| Race condition | Deux utilisateurs modifient la même ressource en même temps, l'un écrase l'autre sans le savoir | Quel est le pire ordre d'arrivée possible pour ces deux actions concurrentes ? |
| UI optimiste | Un rollback silencieux laisse l'utilisateur croire à un succès qui n'a jamais eu lieu | Pour cette action, l'optimisme est-il justifié ou dangereux ? |
| Formulaire qui ne ment pas | Le client valide, le serveur accepte n'importe quoi envoyé hors UI (curl, script) | Que se passe-t-il si ce formulaire est soumis directement en curl avec un payload invalide ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
