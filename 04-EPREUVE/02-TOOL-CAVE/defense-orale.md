# DÉFENSE ORALE : 02 TOOL CAVE

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Hypothèse falsifiable | Tu tournes en rond en changeant du code au hasard, sans savoir si tu te rapproches | Donne un exemple d'hypothèse sur un bug vécu, et le résultat qui l'aurait infirmée |
| Bissection | Tu inspectes les changements un par un, en O(n), tu perds un temps proportionnel au problème | Pourquoi une recherche par bissection sur 1000 commits prend au maximum 10 étapes ? |
| Log ciblé | Tu ajoutes des logs génériques partout, tu noies le signal et tu oublies de les retirer | Quelle question précise ton dernier log de debug devait-il trancher ? |
| Cause racine vs symptôme | Tu corriges le symptôme, le même bug revient sous une autre forme la semaine suivante | Cite un bug où corriger le symptôme sans corriger la cause aurait suffi à repasser les tests |
| Hypothèse silencieuse d'une réponse IA | Tu livres un code qui répond à ta question mais pas à ton besoin réel | Comment repères-tu qu'un prompt était sous-spécifié après coup ? |
| Compromis nommé et assumé | Tu prends une décision sous pression sans dire ce qu'elle coûte, personne ne peut la challenger | Sur ta dernière décision urgente, qu'as-tu sacrifié et pourquoi c'était le bon ordre de priorité ? |
| Honnêteté sur l'incertitude | Une hypothèse non vérifiée se propage, d'autres construisent dessus sans la questionner | Sur ton dernier rapport de bug, quelle affirmation n'avait en réalité pas de preuve derrière elle ? |
| Commit unitaire sans transaction globale | Une interruption laisse un état partiel, impossible à rejouer sans risquer un doublon | Pourquoi relancer un lot à commit unitaire depuis le début double le travail déjà validé ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
