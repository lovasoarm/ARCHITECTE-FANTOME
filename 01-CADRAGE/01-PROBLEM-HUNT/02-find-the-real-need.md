---
stability: perissable_2027
acte: appliquer
---

# Trouver le vrai besoin

## La scène

La responsable d'un cabinet vétérinaire à trois praticiens t'écrit : "il nous faut un système
de rappel automatique par SMS pour les vaccins, parce que les clients oublient." Tu pourrais
foncer sur un cron job qui envoie des SMS un mois avant l'échéance vaccinale. Mais avant de
coder, tu poses trois questions et tu découvres que le vrai problème est ailleurs : les
vétérinaires notent les dates de rappel sur un carnet papier que la secrétaire recopie
"quand elle a le temps" dans un tableur, deux fois par mois. La moitié des rappels n'existe
même pas dans un fichier numérique. Un SMS automatique branché sur des données incomplètes
enverrait des rappels à moitié des clients et rien aux autres : pire que le problème initial,
parce que ça donnerait une fausse impression de fiabilité.

Six mois plus tard, si tu avais codé le SMS tel quel : le cabinet aurait un outil qui envoie
des messages à des dates fausses pour 30% des animaux, et zéro message pour les 20% dont la
fiche n'a jamais été saisie. La responsable, en confiance dans son "système automatique",
aurait arrêté de vérifier le carnet papier. Le vrai risque n'est pas l'absence d'outil : c'est
un outil qui masque un trou de données en donnant une fausse impression de couverture.

## Ce qui se passe vraiment

Trois couches à séparer systématiquement quand quelqu'un te fait une demande :

- **La demande** : ce que la personne dit vouloir ("un système de SMS automatique").
  C'est une solution déjà pensée, presque toujours influencée par ce que la personne connaît
  ou a vu ailleurs.
- **Le besoin** : le problème réel derrière la demande ("les clients ne reviennent pas à temps
  pour les vaccins, ce qui coûte du chiffre d'affaires et met en danger la santé animale").
  Le besoin explique _pourquoi_ la demande existe.
- **La contrainte** : ce qui limite les solutions possibles ("les dates de rappel ne sont pas
  fiables dans le système actuel", "la secrétaire n'a pas le temps de faire une saisie
  manuelle supplémentaire", "le budget mensuel pour les SMS est de 30 euros").

Confondre ces trois couches est l'erreur la plus fréquente en cadrage. Traiter une contrainte
comme un besoin fait rater le vrai problème. Traiter une demande comme un besoin fait coder
la première idée venue sans vérifier qu'elle le résout.

```text
"Il nous faut un SMS automatique"          <-- demande (solution déjà pensée)
        |
        v pourquoi ?
"Les clients oublient les vaccins"         <-- symptôme, encore une couche au-dessus du besoin
        |
        v pourquoi ce symptôme a un impact ?
"Ça coûte du chiffre d'affaires et         <-- besoin réel
 met en danger la santé animale"
        |
        v qu'est-ce qui empêche de résoudre ça directement ?
"Les dates de rappel ne sont pas fiables   <-- contrainte structurante
 dans le système actuel"
```

## La technique des cinq pourquoi, appliquée sans la caricaturer

La technique "cinq pourquoi" a mauvaise réputation parce qu'elle est souvent réduite à répéter
mécaniquement le mot "pourquoi" jusqu'à agacer l'interlocuteur. Utilisée correctement, chaque
"pourquoi" doit changer de registre : du symptôme observable, vers l'impact métier, vers la
contrainte structurelle qui empêche de résoudre l'impact directement. Si un "pourquoi" ne fait
que reformuler la réponse précédente avec d'autres mots, tu n'as pas avancé d'une couche.

Dans le cas du cabinet vétérinaire, voici où chaque "pourquoi" arrête d'être utile :

```text
Pourquoi 1 : pourquoi les clients oublient ?
  --> parce qu'ils ne reçoivent aucun rappel entre deux visites.
Pourquoi 2 : pourquoi aucun rappel n'est envoyé ?
  --> parce que personne au cabinet n'a le temps de les envoyer manuellement.
Pourquoi 3 : pourquoi manque-t-il ce temps ?
  --> parce que la secrétaire gère l'accueil, le téléphone et la caisse en même temps.
Pourquoi 4 : pourquoi ne pas automatiser directement l'envoi ?
  --> parce que les dates de rappel ne sont fiables que pour la moitié des animaux.
Pourquoi 5 : pourquoi seulement la moitié ?
  --> parce que la saisie dans le tableur se fait a posteriori, à partir d'un carnet papier,
      et qu'elle prend du retard structurellement (deux fois par mois, pas en continu).
```

Le cinquième "pourquoi" révèle la vraie contrainte : ce n'est pas un problème de canal de
communication (SMS vs email vs papier), c'est un problème de capture de la donnée à la source,
au moment de la consultation, plutôt qu'en re-saisie différée. Un système de SMS automatique
ne répare rien de ça : il faudrait d'abord que le vétérinaire saisisse la date de rappel
directement pendant la consultation, sur une tablette ou un formulaire papier scanné le jour
même.

## Interviews : faire émerger des faits, pas des opinions

Une interview de cadrage mal menée produit des opinions et des promesses ("oui ce serait
génial", "je pense que les gens aimeraient"). Une interview bien menée produit des faits
vérifiables sur des comportements passés.

Règles concrètes :

- Demande "raconte-moi la dernière fois que ça s'est produit", pas "est-ce que ça arrive
  souvent". Le récit précis d'un cas réel contient des détails que l'estimation générale
  écrase toujours.
- Ne demande jamais "utiliseriez-vous une fonctionnalité qui fait X". La réponse est presque
  toujours oui, sans engagement réel, parce que dire oui ne coûte rien à la personne interrogée.
- Cherche les contournements actuels : tableur fantôme, post-it, message WhatsApp entre
  collègues, feuille papier. Un contournement prouve qu'un besoin existe déjà et qu'il coûte
  assez cher pour que quelqu'un ait inventé une solution bricolée.
- Compte les occurrences réelles avant de croire à la fréquence perçue ("souvent" peut vouloir
  dire deux fois par semaine ou deux fois par mois selon la personne).
- Interroge au moins deux rôles différents sur le même processus (la secrétaire et la
  vétérinaire, par exemple) : leurs récits divergent presque toujours, et l'écart est
  informatif.

Dans le cas du cabinet, l'écart entre les deux récits est révélateur : la vétérinaire pense
que "la secrétaire envoie les rappels chaque semaine", la secrétaire dit "je fais ça le
vendredi si j'ai le temps, sinon ça attend la semaine suivante." Aucune des deux ne ment.
Chacune décrit le processus depuis son poste, avec sa propre notion de fréquence. C'est cet
écart, pas l'une ou l'autre version isolée, qui montre où le processus casse réellement.

## Signaux faibles à repérer

Un signal faible est un indice discret qui annonce un problème avant qu'il devienne visible
dans les métriques officielles.

| Signal faible                                                                                     | Ce qu'il révèle                                                               |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Un tableur "de secours" maintenu à la main en parallèle du système officiel                       | Le système officiel ne couvre pas un besoin réel                              |
| Un ticket de support qui revient sous des formulations différentes                                | Le vrai problème n'a jamais été traité, seulement ses symptômes               |
| Une tâche que "seule une personne sait faire" dans l'équipe                                       | Un processus non documenté et fragile, souvent invisible du management        |
| Une fonctionnalité demandée "pour tout le monde" mais utilisée par une seule personne en pratique | Un besoin individuel déguisé en besoin collectif                              |
| Un export manuel régulier vers Excel puis remanipulation                                          | L'outil ne restitue pas les données sous la forme dont on a réellement besoin |

Chacun de ces signaux se détecte en une phrase pendant une interview, à condition de poser la
bonne question de suivi : "et sinon, comment vous faites quand [l'outil officiel] ne suffit
pas ?" C'est souvent à cette question, posée en fin d'entretien une fois la confiance
installée, que le vrai contournement sort. Les quinze premières minutes d'une interview
décrivent le processus officiel ; le contournement réel apparaît souvent après.

## Ce que le vrai besoin change dans la solution retenue

Une fois le vrai besoin identifié pour le cabinet vétérinaire, la solution change de nature :
elle ne consiste plus à automatiser un envoi de SMS, mais à garantir que la date de rappel
existe et est correcte dès la consultation. Concrètement, ça peut vouloir dire un champ de
saisie rapide sur la fiche de consultation, rempli par le vétérinaire lui-même en fin de
rendez-vous, plutôt qu'un module de messagerie sophistiqué. Le SMS automatique redevient une
brique triviale une fois que la donnée source est fiable : c'est un problème de capture de
donnée qui a été confondu avec un problème de canal de notification.

## Compromis

| Option                                                        | Coût                                                    | Bénéfice                                                                    | Quand choisir                                                    |
| ------------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Interviewer plusieurs rôles avant de cadrer                   | Du temps, parfois perçu comme lent par le client pressé | Vision fidèle du besoin réel, évite un aller-retour coûteux après livraison | Toujours, sauf urgence vitale documentée                       |
| Prendre la demande telle quelle et coder vite                 | Rapidité immédiate apparente                            | Risque élevé de livrer une solution au mauvais problème                     | Uniquement sur un prototype jetable, jamais sur un vrai livrable |
| Se fier aux métriques déclaratives ("les gens disent que...") | Faible coût de collecte                                 | Fiable seulement pour des opinions, pas des comportements                   | Jamais comme seule source pour décider du scope                 |

## Pièges classiques

- Accepter la première explication donnée par le client comme le besoin final, sans demander
  "pourquoi" une deuxième ou une troisième fois : le symptôme est pris pour la cause profonde.
- Confondre l'absence de plainte avec l'absence de problème : beaucoup d'utilisateurs
  contournent en silence plutôt que de se plaindre.
- Interroger uniquement la personne qui a formulé la demande (souvent un manager) et jamais
  les utilisateurs finaux qui vivent le problème au quotidien.
- Poser des questions fermées ("est-ce que ça vous embête ?") qui orientent vers une réponse
  polie plutôt qu'un fait.
- Traiter une contrainte budgétaire ou technique comme si elle n'existait pas, puis découvrir
  en fin de projet qu'elle bloque la solution retenue.
- Arrêter la chaîne des "pourquoi" au premier niveau qui semble actionnable techniquement,
  au lieu de vérifier qu'il correspond bien à la contrainte structurelle réelle.

## Analogie

Analogie : chercher le vrai besoin, c'est interroger un patient au tri des urgences, et écouter la salle plutôt que la carte des plats.
Où l'analogie casse : le patient sent sa douleur, l'utilisateur, lui, te décrit déjà une solution.

## Ce que tu dois savoir défendre

- La différence entre demande, besoin et contrainte, avec un exemple tiré d'un contexte
  différent de celui de cette leçon.
- Pourquoi "est-ce que vous utiliseriez cette fonctionnalité ?" est une question à bannir
  d'une interview de cadrage, et par quoi la remplacer.
- Comment un contournement actuel (tableur fantôme, post-it) t'aide à prouver qu'un besoin
  existe réellement, avant même d'avoir écrit une ligne de code.
