# DÉFENSE ORALE : 08 DATA SPELLS

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Entité | Tu confonds identité et attributs, deux lignes différentes se retrouvent fusionnées par erreur | Peut-elle changer d'attribut sans changer d'identité ? |
| Clé naturelle / clé technique | Une clé naturelle qui change casse toutes les références qui s'appuient dessus | Pourquoi cette table utilise une clé technique et pas la clé naturelle en identifiant primaire ? |
| Invariant | Un chemin de code oublié viole la règle silencieusement, incident découvert bien plus tard | Cet invariant est-il défendu par une contrainte de base, ou seulement par du code applicatif ? |
| Normalisation | Deux copies du même fait divergent, plus personne ne sait laquelle est vraie | Ce fait est-il dupliqué quelque part, et si oui pourquoi assumé ? |
| Dénormalisation en snapshot | Un historique se met à jour rétroactivement, une facture déjà émise change de montant | Pourquoi cette copie est un snapshot volontaire et pas un oubli de normalisation ? |
| Index partiel | Une contrainte UNIQUE classique laisse passer plusieurs lignes NULL, l'invariant n'est jamais posé | Pourquoi une contrainte UNIQUE simple ne suffit pas ici ? |
| Contrainte d'exclusion | Deux périodes se chevauchent silencieusement, la base ne le refuse jamais | Comment la base empêche-t-elle, elle-même, deux périodes qui se chevauchent ? |
| Expand/contract | Un déploiement interrompu au milieu laisse le schéma dans un état incohérent, coupure de service | Si le déploiement s'arrête à cette étape précise, le système reste-t-il cohérent ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
