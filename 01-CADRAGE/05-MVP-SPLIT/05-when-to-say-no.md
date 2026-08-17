# Savoir dire non sans passer pour l'obstacle

## La scène

Une plateforme de suivi de tournées de livraison a validé un MVP : créer une tournée,
l'assigner à un livreur, suivre sa progression en temps réel. Deux semaines avant la
livraison, le responsable des opérations demande d'ajouter "juste un petit module" de
facturation automatique aux clients à la fin de chaque tournée, "puisque de toute façon on a
déjà les données." Un développeur qui accepte par réflexe de bonne volonté ajoute deux
semaines de retard sur une fonctionnalité de suivi qui, elle, était déjà attendue par les
livreurs sur le terrain. Un développeur qui refuse en disant simplement "non, ce n'est pas
prévu" passe pour quelqu'un qui bloque le projet sans raison. Aucune des deux réactions ne
protège le vrai enjeu : livrer ce qui a été promis, dans le délai promis.

## Ce qui se passe vraiment

Dire non efficacement ne consiste pas à refuser une demande, mais à rendre visible son coût
d'opportunité : ce qu'on sacrifie ailleurs si on l'accepte. La plupart des demandes de
périmètre supplémentaire semblent gratuites parce que la personne qui les formule ne voit pas
ce qu'elles déplacent. Le rôle de qui reçoit la demande n'est pas de juger si elle est
légitime dans l'absolu : la facturation automatique est probablement une bonne idée un jour, 
mais de rendre concret son prix, ici et maintenant, par rapport à ce qui était déjà engagé.

```text
Réponse qui bloque sans convaincre :
  "Non, ce n'est pas prévu dans le MVP."
  --> vrai sur le fond, mais ne montre aucun raisonnement,
    ressemble à un refus de principe

Réponse qui montre le coût d'opportunité :
  "Si on ajoute la facturation automatique maintenant, le suivi en
   temps réel des tournées glisse de deux semaines : c'est la
   fonctionnalité que les livreurs attendent depuis le début, et
   c'est celle qui a été promise dans ce lot. On peut faire la
   facturation ensuite, en connaissant déjà mieux les données réelles
   de facturation collectées par le suivi. Qu'est-ce qui compte le
   plus dans ces deux semaines : le suivi ou la facturation ?"
```

La deuxième réponse déplace la décision vers la personne qui a le pouvoir d'arbitrer : elle
n'affirme pas un refus, elle rend le compromis visible et laisse le choix être fait en
connaissance de cause.

## Les trois réponses possibles, pas deux

Le réflexe binaire "oui ou non" oublie une troisième réponse, souvent la bonne : "pas
maintenant, et voici pourquoi, et voici ce qui doit se passer avant que ce soit possible."

```text
                 Demande de périmètre supplémentaire
                            |
       +--------------------+--------------------+
       |                    |                     |
      OUI                 NON                "PAS MAINTENANT"
  (le coût             (la demande           (vraie idée, mauvais
   d'opportunité         viole un              moment : dette
   est acceptable,       non-objectif,          consciente à
   arbitré               voir Niveau 02)        prévoir, pas à
   consciemment)                                subir)
```

"Pas maintenant" n'est crédible que s'il s'accompagne d'un engagement concret : où cette
demande sera-t-elle réévaluée, et sous quelle condition. Sans cet engagement, "pas maintenant"
devient un "non" déguisé qui use la confiance de la personne qui a formulé la demande.

## Dette technique assumée vs dette subie

Accepter une demande en sachant qu'elle crée un raccourci technique n'est pas une faute, à
condition que ce raccourci soit choisi consciemment et documenté : c'est de la dette assumée.
La dette subie, elle, apparaît quand personne n'a décidé consciemment de prendre ce raccourci :
il s'est simplement produit sous la pression, sans que personne ne l'écrive ni ne prévoie de
le rembourser.

```text
Dette assumée :
  "On code la facturation en dur pour un seul mode de calcul, on sait
   que ça ne gère pas les tarifs dégressifs, on l'écrit dans le ticket
   de suivi et on prévoit de le reprendre au sprint suivant."

Dette subie :
  Le même raccourci, pris dans l'urgence, sans ticket, sans personne
  qui se souvient dans six mois pourquoi le calcul est faux pour les
  gros clients à tarif dégressif.
```

La différence entre les deux n'est pas technique, elle est purement organisationnelle : est-ce
que la décision a été écrite quelque part, avec sa raison et son échéance de remboursement.


## Analogie

Rendre visible le coût d'opportunité d'une demande, c'est comme le régisseur d'un spectacle qui
répond à un ajout de dernière minute en montrant quel réglage lumière devra être sacrifié pour
tenir le filage, ou un chef de cuisine qui explique qu'ajouter un plat maison au menu du soir
retardera forcément l'envoi des tables déjà en commande.
Où l'analogie casse : au théâtre et en cuisine, le coût se voit immédiatement (moins de temps de
répétition, service qui prend du retard visible en salle). En développement, le coût
d'opportunité est souvent invisible pour la personne qui demande : elle ne voit pas le code, elle
doit être guidée explicitement vers ce qu'elle sacrifie, sinon elle croit sincèrement que la
demande est gratuite.

## Un exemple chiffré de "pas maintenant" crédible

Sur l'exemple de la tournée de livraison, un "pas maintenant" crédible ressemble à ceci, avec une
condition de réexamen concrète et une date :

```text
"La facturation automatique n'est pas dans ce lot. On la réexamine au
 prochain point de planification, dans trois semaines, une fois que le
 suivi en temps réel aura tourné en production et qu'on connaîtra le
 format exact des données de trajet collectées : ça évitera de
 construire la facturation sur des hypothèses qu'on devra reprendre."
```

Comparé à un "pas maintenant" vague ("on verra plus tard"), cette version donne une date, une
condition et une raison technique : la personne qui a formulé la demande peut la noter dans son
propre calendrier, au lieu de la reformuler indéfiniment sans jamais savoir si elle avance.

### Contre-exemple : dire non à une demande qui était en fait légitime

Refuser trop systématiquement coûte aussi cher que d'accepter par réflexe. Sur le même projet
de tournées, un développeur a refusé, deux mois plus tard, une demande d'ajouter un champ
"note du client sur la livraison" en argumentant "ce n'est pas dans le périmètre du MVP",
sans vérifier que cette demande venait d'un incident réel : plusieurs livreurs se plaignaient
de ne pas savoir qu'un client avait des consignes spéciales (code d'accès, étage sans
ascenseur), ce qui causait des retards mesurables sur le terrain. Le refus automatique, basé
sur la lettre du périmètre plutôt que sur son intention, a coûté plusieurs semaines de
frictions terrain évitables pour un ajout qui aurait pris moins d'une journée.

```text
   Refus qui vérifie l'intention derrière la demande :
   "Cette demande vient-elle d'un vrai problème terrain mesuré,
    ou d'une idée qui semble bonne en réunion ?"
   --> si problème terrain mesuré et coût d'ajout faible : traiter à part du MVP,
       ne pas le bloquer par principe

   Refus mécanique basé sur la lettre du périmètre :
   "Ce n'est pas écrit dans le document de MVP" --> ignore le contexte,
   traite un vrai signal terrain comme du bruit
```

### Ce que coûte un mauvais découpage entre "non" et "petit oui"

Sur ce cas précis, ajouter le champ de note client représentait environ 3 heures de travail
(un champ texte, affiché sur l'écran du livreur). Le retard accumulé par les livreurs sur le
terrain avant que la demande soit enfin acceptée, cinq semaines plus tard, a représenté
environ 25 minutes perdues par tournée sur des dizaines de tournées quotidiennes. Le ratio
entre le coût du refus prolongé et le coût de l'ajout initial dépasse largement 50 pour 1.
Le critère qui aurait évité cette erreur : distinguer une demande de confort ("ce serait
bien d'avoir") d'une demande qui répond à un incident terrain déjà mesuré.

## Compromis

| Option                                               | Coût                                           | Bénéfice                                                                                         | Quand choisir                                                      |
| ---------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Accepter en rendant le coût d'opportunité visible    | Demande de chiffrer l'impact avant de répondre | La décision est prise en connaissance de cause, la confiance reste intacte des deux côtés        | Chaque fois qu'une demande de périmètre supplémentaire arrive      |
| Refuser sèchement sans expliquer le compromis        | Rapide sur le moment                           | Casse la relation de confiance, la demande revient sous une autre forme sans être mieux traitée  | Jamais, sauf violation nette d'un non-objectif déjà écrit et connu |
| Accepter par réflexe de bonne volonté sans arbitrage | Évite un conflit immédiat                      | Fait glisser silencieusement les délais déjà promis, sans que personne n'ait choisi ce compromis | Jamais                                                             |

## Pièges classiques

- Refuser une demande sans jamais montrer ce qu'elle coûterait ailleurs : le refus paraît
  arbitraire même quand il est justifié.
- Accepter systématiquement par crainte de paraître peu coopératif, ce qui fait glisser tous
  les délais un par un sans qu'aucun arbitrage explicite n'ait jamais eu lieu.
- Utiliser "pas maintenant" comme un refus déguisé, sans jamais préciser sous quelle condition
  la demande sera réexaminée : la confiance s'érode au deuxième "pas maintenant" sans suite.
- Prendre une dette technique sous la pression sans l'écrire nulle part, ce qui la transforme
  en incident de production surprenant des mois plus tard.

## Ce que tu dois savoir défendre

- Pourquoi montrer le coût d'opportunité convainc mieux qu'un refus de principe, même quand
  le refus est justifié sur le fond.
- La différence entre "non" et "pas maintenant", et pourquoi "pas maintenant" n'est crédible
  que s'il s'accompagne d'une condition de réexamen concrète.
- La différence entre dette technique assumée et dette technique subie, et pourquoi cette
  différence est organisationnelle plutôt que technique.
