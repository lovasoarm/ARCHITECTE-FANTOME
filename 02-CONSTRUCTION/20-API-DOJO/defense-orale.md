# DÉFENSE ORALE : 20 API DOJO

Cette table complète le mémo de [grimoire.md](grimoire.md), qui reste à quatre colonnes exactes. Ici, trois colonnes : le terme, ce qui casse sans lui, et la question qu'on te posera dessus. Révise-la à voix haute, jamais en lecture silencieuse.


| Terme | Ce qui casse sans ça | Ce que tu dois savoir défendre |
| --- | --- | --- |
| Contrat d'API | Un déploiement casse des clients qui faisaient confiance à un comportement jamais formalisé | Ton contrat est-il écrit quelque part, ou seulement implicite dans le code du serveur ? |
| Compatibilité ascendante | Un client externe que tu ne contrôles pas casse à ton prochain déploiement | Un client qui n'a pas été mis à jour depuis six mois fonctionne-t-il encore avec ta dernière version ? |
| Compatibilité descendante | Un déploiement progressif casse en plein rollout, entre ancienne et nouvelle version du serveur | Que se passe-t-il si ton client nouveau parle à un serveur pas encore mis à jour ? |
| Idempotence | Un retry réseau duplique une commande, un paiement, un envoi | Quelles opérations de ton API sont idempotentes, et comment le garantis-tu pour les autres ? |
| Idempotency key | Sans elle, chaque coupure réseau crée un doublon indétectable par le serveur | Ta clé d'idempotence est-elle générée à l'intention ou à chaque tentative réseau ? |
| Authn / Authz | Un appelant identifié mais mal autorisé accède à des données hors de son périmètre | Ton système confond-il "je sais qui tu es" avec "je sais ce que tu as le droit de faire" ? |
| Rate limiting | Un client mal configuré ou une attaque sature ton service sans limite | Que se passe-t-il concrètement si un client rejoue la même requête cent fois par seconde ? |
| Latence perçue | On optimise le temps serveur sans jamais améliorer ce que l'utilisateur ressent réellement | Comment réduirais-tu la latence perçue sans forcément réduire le temps de réponse mesuré ? |

Grille détaillée : voir [boss-fight.md](boss-fight.md).
