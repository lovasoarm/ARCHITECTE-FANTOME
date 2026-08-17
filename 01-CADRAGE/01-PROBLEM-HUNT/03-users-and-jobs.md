# Utilisateurs et jobs to be done

## La scène

Un réseau de tournées de livraison à vélo veut une appli pour ses livreurs. L'équipe produit
dessine trois personas soignés : "Marc, 28 ans, sportif, aime la technologie" ; "Julie, 34 ans,
maman, cherche un complément de revenu" ; "Karim, 22 ans, étudiant, flexible." Six mois plus
tard, l'appli existe, personne ne s'en sert vraiment côté encadrement des tournées : le vrai
frein des livreurs n'était pas leur profil sociologique, c'était qu'ils devaient appeler le
dispatcher à chaque changement d'adresse client, en plein effort physique, sans pouvoir lâcher
le guidon. Le "job" réel était "signaler un changement d'adresse sans les mains", pas "avoir
une appli moderne adaptée à mon profil".

L'équipe avait passé trois semaines à interviewer des livreurs sur leurs habitudes de vie, leur
rapport à la technologie, leurs loisirs. Aucune de ces informations n'a permis de prédire le
vrai point de friction. Ce qui aurait fonctionné : suivre un livreur pendant une tournée réelle
et observer, chronomètre en main, ce qu'il fait à chaque appel au dispatcher. Ça aurait pris
une matinée, pas trois semaines, et ça aurait révélé le vrai job en une observation directe.

## Ce qui se passe vraiment

Un **job to be done** décrit ce que l'utilisateur essaie d'accomplir, indépendamment de qui
il est. La question n'est pas "qui est mon utilisateur" mais "quel progrès cherche-t-il à
faire, dans quel contexte, avec quelle contrainte". Un persona décrit une personne ; un job
décrit une situation à résoudre. Le job survit aux changements de personas : le prochain
livreur, quel que soit son âge ou son mode de vie, aura le même besoin de signaler un
changement d'adresse sans lâcher son guidon.

Formule utile pour formuler un job to be done :

```text
Quand [situation],
je veux [action ou résultat],
pour pouvoir [bénéfice réel, souvent émotionnel ou pratique].

Exemple concret :
Quand je suis en pleine tournée à vélo et que l'adresse change,
je veux signaler le changement sans lâcher le guidon,
pour pouvoir continuer ma tournée sans perdre de temps ni risquer un accident.
```

Le format force trois précisions que les personas omettent presque toujours : le contexte
physique exact ("en roulant", pas "au travail"), l'action minimale suffisante ("signaler",
pas "renseigner un formulaire complet"), et le bénéfice réel qui justifie l'effort de conception
("ne pas risquer un accident", pas "avoir une belle expérience utilisateur").

## Persona utile vs persona décoratif

Un persona est utile s'il change une décision de conception. Il est décoratif s'il ne sert
qu'à illustrer une slide ou à donner un sentiment de rigueur méthodologique sans influencer
quoi que ce soit dans le produit.

| Test                                                                               | Persona utile                                                         | Persona décoratif                                                   |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| "Si je supprime ce persona, est-ce que je changerais une décision de conception ?" | Oui : sans lui, on n'aurait pas pensé à l'usage mains libres          | Non : la fiche pourrait disparaître, rien ne change dans le produit |
| Source de l'information                                                            | Observation ou interview réelle d'un utilisateur concret              | Extrapolation générique ("les jeunes aiment le mobile")             |
| Niveau de détail utile                                                             | Contexte d'usage, contrainte physique ou organisationnelle, fréquence | Âge, loisirs, prénom inventé, photo stock                           |
| Rôle dans les décisions                                                            | Sert d'arbitre quand deux choix de conception s'opposent              | Décore un document sans jamais être reconsulté                      |

Un persona décoratif est reconnaissable à un symptôme simple : personne dans l'équipe ne le
mentionne plus après la phase de cadrage. Un persona utile, à l'inverse, revient
spontanément en réunion ("est-ce que ça marche pour Karim en pleine tournée ?").

## Comment observer un job plutôt que le déduire

L'interview seule surestime souvent ce que les gens disent faire, par rapport à ce qu'ils font
réellement. Trois techniques d'observation directe, moins coûteuses qu'il n'y paraît :

- **L'accompagnement de terrain** : suivre un livreur pendant une demi-journée réelle, avec un
  chronomètre, en notant chaque interruption du geste principal (rouler) et sa cause. Une
  matinée suffit souvent à révéler un job que trois semaines d'entretiens n'ont pas fait
  émerger, parce que le livreur lui-même ne pense pas à mentionner un geste devenu automatique.
- **La capture d'écran d'un contournement existant** : si les livreurs ont un groupe WhatsApp
  où ils s'échangent des changements d'adresse entre eux, ce fil de discussion documente le
  job mieux qu'aucune interview, avec des horodatages et des formulations réelles.
- **Le comptage d'événements dans les logs existants** : si un système de dispatch existe déjà,
  compter le nombre d'appels entrants par heure de tournée et leur durée moyenne donne une
  mesure objective de la fréquence du job, sans dépendre du souvenir approximatif de la
  personne interrogée.

## Plusieurs jobs, un seul utilisateur

Un même utilisateur porte souvent plusieurs jobs différents selon le moment. Le livreur a un
job "signaler un changement d'adresse en roulant", mais aussi un job différent en fin de
journée : "vérifier que toutes mes livraisons ont bien été comptées pour ma paie." Traiter
ces deux jobs comme un seul "besoin livreur" générique conduit à construire une fonctionnalité
qui essaie de tout faire à la fois et qui ne fait bien ni l'un ni l'autre.

```text
Utilisateur : livreur à vélo
   |
   |-- Job 1 : signaler un changement d'adresse, mains occupées, en mouvement
   |       --> contrainte : rapidité, pas de saisie fine, usage à une main ou vocal
   |
   \-- Job 2 : vérifier le décompte de livraisons en fin de tournée
           --> contrainte : lecture posée, précision, pas d'urgence physique
```

Ces deux contraintes d'interface sont presque incompatibles dans un seul écran : le Job 1
demande de grosses zones cliquables, peu de texte, une réponse vocale possible ; le Job 2
demande une liste détaillée, filtrable, consultée au calme. Une équipe qui construit un
"tableau de bord livreur" unique pour les deux jobs finit souvent avec un écran surchargé qui
ne sert bien ni l'urgence du premier, ni la précision du second.

## Le job du payeur n'est pas le job de l'utilisateur

Dans l'exemple des tournées de livraison, il existe un troisième acteur qu'on oublie souvent :
le dispatcher, qui n'est ni le livreur ni un simple observateur. Son job à lui : "savoir en
temps réel où en est chaque tournée pour réorganiser si un livreur prend du retard." Ce job
a ses propres contraintes (vue d'ensemble, plusieurs tournées simultanées, alertes) qui
n'ont rien à voir avec celles du livreur. Une appli pensée uniquement du point de vue du
livreur laisse le dispatcher sans outil, et il continue d'appeler chaque livreur un par un
pour savoir où il en est, ce qui recrée exactement le problème que l'appli devait résoudre.

## Quand un job change avec le temps

Un job to be done n'est pas figé pour toujours. Un livreur débutant a un job "apprendre le
quartier sans se perdre" ; le même livreur trois mois plus tard a un job différent
"optimiser mon trajet pour finir plus tôt." Un produit qui ne sert que le premier job devient
inutile aux livreurs expérimentés, qui représentent souvent la majorité de l'effectif après la
période de rodage. Vérifier à quel moment du parcours de l'utilisateur un job apparaît, et à
quel moment il disparaît, évite de construire une fonctionnalité pour une population qui
n'existe que pendant les deux premières semaines d'activité.

## Compromis

| Option                                                       | Coût                                  | Bénéfice                                                    | Quand choisir                                             |
| ------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| Construire des jobs to be done à partir d'interviews réelles | Demande du temps de terrain           | Base solide, résiste aux changements de profil utilisateur  | Systématiquement en début de cadrage                      |
| Observer directement l'utilisateur en contexte réel          | Coûte une journée d'accompagnement    | Révèle des jobs invisibles même à l'utilisateur lui-même     | Dès que le job implique un contexte physique ou une urgence |
| Utiliser des personas détaillés (âge, style de vie, photo)   | Rapide à produire en atelier          | Séduisant en réunion mais rarement actionnable              | Uniquement en complément d'un job to be done, jamais seul |
| Ignorer les jobs et concevoir "pour tout le monde"           | Semble économiser du temps de cadrage | Produit une fonctionnalité diluée qui ne sert bien personne | Jamais, sauf produit jetable sans enjeu                   |

## Pièges classiques

- Construire des personas riches en détails biographiques mais vides de contrainte d'usage
  réelle : le symptôme est qu'aucune décision de conception ne cite jamais le persona.
- Confondre "utilisateur qui paie" et "utilisateur qui utilise" : le gérant du club qui commande
  l'outil n'est pas forcément celui qui devra s'en servir tous les jours.
- Réduire un utilisateur à un seul job alors qu'il en a plusieurs, contradictoires en termes
  de contraintes d'interface (urgence vs précision, par exemple).
- Créer un job to be done à partir d'une intuition d'équipe sans jamais l'avoir vérifié sur le
  terrain : le symptôme est qu'aucune citation d'interview ne l'appuie.
- Oublier les acteurs secondaires (dispatcher, superviseur, comptable) dont le job diffère de
  celui de l'utilisateur principal, et découvrir leur besoin seulement après le lancement.

## Analogie

Analogie : les rôles et leurs tâches, c'est la brigade de cuisine avec ses postes, et l'équipage avec ses fonctions de quart.
Où l'analogie casse : une brigade est fixe, un utilisateur change de rôle en cours de journée sans prévenir.

## Ce que tu dois savoir défendre

- La différence entre un persona et un job to be done, et pourquoi le second résiste mieux
  au temps.
- Comment tester si un persona donné est utile ou décoratif, avec un exemple concret.
- Pourquoi un même utilisateur peut porter plusieurs jobs incompatibles en termes de
  contraintes d'interface, et ce que ça implique pour la conception.
