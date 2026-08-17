# Avancement réel vs déclaré, signaux de dérive

## Le piège

Tous les lundis, l'équipe qui construit le système de gestion de créneaux du cabinet
vétérinaire fait un point d'avancement. Chaque développeur annonce "ça avance bien" ou "je
suis à 70 %". Pendant six semaines, tout le monde annonce une progression stable. En semaine
7, deux jours avant la démo au client, le développeur en charge du module de facturation
annonce qu'il ne sera "peut-être pas prêt". En creusant, on découvre qu'il est bloqué depuis
seize jours sur le calcul de proration des abonnements (un vétérinaire qui commence en cours
de mois ne paie qu'une fraction), et qu'il pensait "s'en sortir" chaque jour depuis. Le
chiffre "70 %" annoncé pendant six semaines ne mesurait rien : c'était une intuition de
confort, pas une observation.

## Ce qui se passe vraiment

Un pourcentage d'avancement déclaré par la personne qui fait le travail souffre d'un biais
structurel : elle ne peut pas mesurer objectivement ce qu'elle n'a pas encore rencontré. Le
travail restant _paraît_ proche de la fin parce que le travail fait _jusqu'ici_ était facile
,  rien ne garantit que ce qui reste l'est aussi.

```text
Ce que la personne ressent               Ce qui se passe réellement
                                          (courbe typique d'un problème avec
     "70% fait"                           une inconnue cachée dedans)
        |                                        |
   #######...                              #######....................
        |                                        |
   avance linéaire supposée              plateau invisible : le "30% restant"
   --> "encore un petit effort"             contient la partie jamais rencontrée,
                                           potentiellement plus grosse que
                                           tout ce qui a été fait avant
```

### Trois signaux de dérive qui apparaissent avant le retard officiel

Un projet qui dérape ne le fait presque jamais d'un coup. Des signaux apparaissent des
semaines avant que quelqu'un ose dire "on ne sera pas prêts". Trois sont particulièrement
fiables :

1. **Le même chiffre d'avancement se répète plusieurs fois de suite.** "Je suis à 70 %"
   dit en semaine 5 puis en semaine 6 signifie presque toujours que la personne est bloquée
   et n'ose pas le dire : un vrai avancement change de semaine en semaine, même lentement.

2. **Les questions deviennent plus vagues au lieu de plus précises.** Sur un travail qui
   avance, les questions se précisent ("est-ce que la proration doit arrondir au jour ou à
   l'heure ?"). Sur un travail bloqué, les questions restent générales ("est-ce que la
   facturation est compliquée chez vous ?") parce que la personne n'a pas encore une prise
   assez fine sur le problème pour poser une question précise.

3. **Le périmètre de la tâche grossit sans que la date bouge.** "En fait il faut aussi gérer
   le cas où..." qui s'accumule sans jamais provoquer une révision de date est un signal
   qu'on absorbe du risque supplémentaire silencieusement.

```text
Signal 1 : chiffre figé          Signal 2 : questions qui régressent   Signal 3 : périmètre qui gonfle
sem.4 --> "70%"                    sem.4 --> "arrondi jour ou heure ?"     sem.4 --> tâche = proration simple
sem.5 --> "70%"                    sem.5 --> "c'est compliqué la          sem.5 --> "+ gérer le remboursement
sem.6 --> "72%"  <-- faux mouvement           facturation ?"                       partiel"
                                                                       sem.6 --> "+ gérer les avoirs"
                                                                       (date annoncée : inchangée)
```

### Mesurer l'avancement réel : le test de la démonstration

Le seul avancement fiable est celui qu'on peut démontrer, pas celui qu'on déclare. La
question à poser en point d'équipe n'est pas "où en es-tu ?" mais "montre-moi ce qui marche
maintenant, en vrai, avec des données réelles". Cette question change le comportement des
deux côtés :

```text
Question faible                          Question forte
"Où en es-tu sur la proration ?"         "Montre-moi un abonnement qui démarre
                                          le 15 du mois, avec le montant calculé
"Ça avance, encore deux jours"           à l'écran, là, maintenant"

--> réponse invérifiable, confortable      --> soit ça marche et c'est visible,
                                            soit ça ne marche pas et ça se voit
                                            immédiatement : sans accusation,
                                            juste un fait
```

Ce mécanisme n'est pas une inspection méfiante : c'est un service rendu à la personne
bloquée, qui souvent n'ose pas signaler elle-même qu'elle patine, par peur de décevoir.
Demander une démo régulière, tôt, avec bienveillance, rend le blocage visible avant qu'il ne
devienne un secret de seize jours.

Analogie : suivre l'avancement réel, c'est un régisseur qui vérifie en direct que chaque
effet a bien été déclenché plutôt que de se fier à la feuille de conduite, et un chef de
cordée qui compte ses coéquipiers à chaque relais plutôt que de croire au plan de course.
Où l'analogie casse : un régisseur ou un chef de cordée constatent l'état réel d'un seul coup
d'œil. L'avancement d'un projet logiciel ne se voit pas, il faut le déclarer, et une tâche
dite terminée peut cacher un travail à moitié fait sans qu'aucun indicateur ne l'affiche.

## Cas chiffré : le coût du secret de seize jours

Le développeur bloqué sur la proration a perdu seize jours en annonçant "70%" sans creuser
publiquement son blocage. Une démo hebdomadaire obligatoire, coûtant environ 15 minutes de
préparation par semaine (donc environ 1 heure sur les seize jours), aurait révélé le blocage
dès la première semaine. Coût du signal manqué : quinze jours de travail invisible contre une
heure de préparation de démo, soit un ratio d'environ 1 pour 15 entre le coût de la
vérification régulière et le coût du silence prolongé.

## Que faire concrètement face à un signal de dérive

Détecter un signal ne suffit pas : encore faut-il réagir sans braquer la personne concernée.
La séquence qui fonctionne évite l'accusation directe et se concentre sur le blocage concret.

```text
Mauvaise reaction                        Bonne reaction
"Tu es en retard, c'est                  "Je vois que le chiffre n'a pas
 pas normal"                             bouge depuis deux semaines,
                                          qu'est-ce qui coince exactement ?"
--> la personne se ferme,                 --> ouvre une conversation sur
    cache encore plus                          le probleme technique reel,
                                              pas sur la performance
```

### Contre-exemple : la démo permanente qui tue la concentration

L'excès inverse coûte cher aussi. Une équipe qui impose une démo quotidienne de trente minutes
à chaque développeur, sur un cabinet vétérinaire de taille modeste avec trois personnes,
transforme le suivi en surveillance de tous les instants : chaque développeur passe une part
non négligeable de sa journée à préparer une démonstration présentable plutôt qu'à avancer, et
le climat de confiance se dégrade, chacun se sentant observé plutôt qu'accompagné. Le bon
rythme de démonstration dépend du coût d'un blocage non détecté, pas d'un principe universel
de fréquence maximale.

```text
   Tâche à faible enjeu, courte durée (2-3 jours)
        --> une démo en fin de tâche suffit, pas besoin de suivi quotidien

   Tâche à enjeu élevé, longue durée, avec inconnue réelle (comme la proration
   de facturation) --> démo à mi-parcours au minimum, voire tous les 2-3 jours
```

### Combien de fréquence est raisonnable, en pratique

Une règle simple, pas universelle mais utile par défaut : la fréquence de démonstration doit
être proportionnelle au coût d'un blocage non détecté. Si un blocage non vu pendant une
semaine coûte peu (tâche annexe, non bloquante pour d'autres), une démo hebdomadaire suffit.
Si un blocage non vu pendant une semaine peut faire glisser une échéance client, comme la
proration de facturation avant la démo contractuelle, la fréquence doit descendre à deux ou
trois jours. Le critère n'est jamais "plus c'est fréquent, mieux c'est" : c'est le coût réel
du silence prolongé sur cette tâche précise.

## Ce qui distingue un signal de dérive d'un simple ralentissement normal

Toute tâche ralentit parfois sans que ce soit un signal d'alerte : une réunion imprévue, un
jour de congé, une dépendance externe qui répond en retard. La différence avec un vrai signal
de dérive tient à la répétition et à l'absence d'explication concrète. Un ralentissement
normal a une cause nommée et ponctuelle. Un signal de dérive se répète sans cause identifiée,
ou avec une cause qui change à chaque fois qu'on demande.

## Compromis

| Option                                     | Coût                                                              | Bénéfice                                                             | Quand choisir                                                              |
| ------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Pourcentage déclaré en réunion             | Rapide, ne demande aucune préparation                             | Donne une impression de suivi                                        | Jamais comme unique signal : au mieux en complément d'un signal vérifiable |
| Démo régulière de ce qui marche réellement | Demande de préparer quelque chose à montrer, plus lent en réunion | Détecte les blocages en quelques jours au lieu de plusieurs semaines | Systématiquement sur toute tâche dont l'échec coûterait cher au planning   |

## Pièges classiques

- Accepter un pourcentage stable plusieurs semaines de suite sans creuser : le symptôme est
  la découverte tardive d'un blocage la veille d'un jalon.
- Confondre "occupé" et "en avance" : le symptôme est une personne visiblement active
  (beaucoup de commits, beaucoup de réunions) sur une tâche dont personne ne peut voir le
  résultat concret.
- Punir la première personne qui annonce un retard : le symptôme est que plus personne
  n'annonce de retard tant qu'il n'est pas devenu ingérable.
- Traiter chaque tâche en retard comme un problème individuel de compétence plutôt qu'un
  signal sur la qualité du découpage initial : le symptôme est un blâme répété sans jamais
  revoir la façon dont les tâches sont estimées.

## Ce que tu dois savoir défendre

1. Pourquoi un pourcentage d'avancement déclaré par la personne qui fait le travail est
   structurellement biaisé, même si cette personne est honnête et compétente.
2. Cite les trois signaux de dérive présentés ici et donne, pour chacun, un exemple observé
   ou plausible dans un projet que tu connais.
3. Explique pourquoi demander une démonstration régulière n'est pas un acte de méfiance mais
   un service rendu à la personne qui risque d'être bloquée en silence.
