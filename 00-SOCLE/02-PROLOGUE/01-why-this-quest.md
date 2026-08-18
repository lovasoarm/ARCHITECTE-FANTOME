# Pourquoi la plupart des devs stagnent

## La scène

Amine a cinq ans d'expérience. Il code vite, connaît trois frameworks, résout les tickets
Jira dans les temps. Un jour, son lead lui confie la refonte du système de réservation de
créneaux d'un cabinet vétérinaire multi-sites : trois vétérinaires, des créneaux qui se
chevauchent selon les spécialités, des annulations de dernière minute qui doivent libérer
un créneau sans casser l'historique de facturation. Amine ouvre son éditeur et commence à
écrire du code le jour même. Trois semaines plus tard, la fonctionnalité "marche" en démo,
mais personne ne sait répondre à : que se passe-t-il si deux réceptionnistes réservent le
même créneau à la même seconde ? Le code n'a pas de réponse parce que la question n'a jamais
été posée. Amine ne sait pas qu'il ne sait pas.

Ce n'est pas un problème de compétence technique. Amine sait coder. Le problème est en amont :
il n'a pas de modèle mental du système avant d'écrire la première ligne.

Six mois plus tard, le même schéma se reproduit sur un tout autre projet : cette fois, c'est
la gestion des tournées d'une PME de messagerie. Amine reconnaît le symptôme trop tard, encore
: une fois que le bug de concurrence est en production. Deux domaines différents, la même
erreur de méthode. C'est ça, la stagnation : pas un manque de mémoire technique, un manque de
grille d'analyse qui se transfère d'un domaine à l'autre.

## Ce qui se passe vraiment

Il y a deux façons de progresser en ingénierie logicielle, et elles ne se ressemblent pas :

1. **Accumuler des exécutions** : apprendre une syntaxe, un framework, un pattern, et
   l'appliquer quand on reconnaît la forme du problème. C'est rapide à démarrer, ça donne
   une impression de progrès immédiate (tu livres des tickets), et ça plafonne vite. Le
   plafond arrive exactement au moment où le problème ne ressemble à aucun pattern connu.
2. **Construire des modèles mentaux** : comprendre les forces en jeu derrière un problème,
   concurrence, cohérence, coût de changement, incertitude, de sorte qu'un problème jamais
   vu se laisse quand même analyser. C'est plus lent à démarrer (tu livres moins vite au
   début) et ça ne plafonne jamais vraiment, parce que le modèle se transfère.

La stagnation vient d'un cercle qui se referme tout seul :

```text
   exécuter sans modèle
          |
          v
   ça marche "en surface"
          |
          v
   personne ne questionne (la démo passe)
          |
          v
   aucune rétroaction sur la qualité du raisonnement
          |
          v
   le dev répète la même méthode --> stagnation
          |
          \--------------+
                          |
                          v
                 (retour en haut, un an plus tard,
                  même niveau de compréhension,
                  juste plus de vocabulaire technique)
```

Ce qui casse ce cercle, ce n'est pas "plus d'expérience". Amine a de l'expérience : cinq ans.
Ce qui le casse, c'est une contrainte externe qui force la question qu'on ne se pose jamais
spontanément : _pourquoi ce choix plutôt qu'un autre, et qu'est-ce que ça coûte si j'ai tort ?_

C'est exactement ce que ce curriculum injecte à chaque niveau : pas plus de syntaxe, mais
des situations où l'exécution seule ne suffit pas, où il faut expliciter un modèle, le
défendre, et vivre avec les conséquences d'un mauvais choix pour apprendre à en reconnaître
un bon.

### Pourquoi l'expérience seule ne suffit pas à casser le cercle

L'expérience apprend surtout ce qui a déjà été rencontré. Un développeur qui a passé cinq ans
sur des CRUD standard sans jamais rencontrer de vraie concurrence n'a tout simplement jamais eu
l'occasion de construire le réflexe "qui d'autre touche cet état en même temps que moi ?".
Ce n'est pas un jugement sur Amine : c'est un fait sur la façon dont l'expérience non guidée
échantillonne les problèmes. Elle échantillonne ce que le hasard des projets a proposé, pas ce
qui est structurellement important à comprendre. Un curriculum construit délibérément peut
garantir la rencontre avec les situations qui forcent l'apparition du modèle mental, au lieu
d'attendre qu'un incident de production s'en charge.

Chiffre concret : dans une étude interne typique de post-mortems chez des équipes produit,
plus de la moitié des incidents "surprise" en production sont retraçables à une hypothèse
implicite jamais formulée à l'écrit (état partagé non identifié, ordre d'événements supposé
garanti, capacité supposée illimitée). Ce n'est pas un manque de compétence de codage. C'est
un manque de modèle mental écrit et confronté avant la mise en production.

### Le signal qui ne trompe pas

Un dev qui exécute sans modèle mental a un symptôme reconnaissable : il ne peut pas répondre
à "qu'est-ce qui casserait si on changeait X ?" sans relire le code. Un dev avec un modèle
mental répond en quelques secondes, parce qu'il sait déjà où sont les frontières, les états
partagés, les hypothèses fragiles. Ce curriculum vise à construire ce deuxième réflexe.

Un test simple pour toi-même, avant même de commencer ce curriculum : prends le dernier
système que tu as livré. Demande-toi "que se passe-t-il si deux utilisateurs font X en même
temps ?" et "que se passe-t-il si le service Y tombe pendant que je traite une requête ?".
Si tu dois rouvrir le code pour répondre, le modèle mental n'existait pas au moment de la
conception, il a été improvisé après coup, ou jamais construit du tout.

### Ce que "modèle mental" veut dire concrètement ici

Ce curriculum n'utilise pas "modèle mental" comme un mot valise. Un modèle mental utilisable
répond, sans relire le code, à quatre questions sur n'importe quel système que tu as conçu :
quelles sont les entrées non fiables, quel état est partagé entre plusieurs acteurs, quel est
le coût si ce choix doit être défait dans six mois, et quelle preuve (mesure, test, log)
confirmerait que le système se comporte comme prévu. Les niveaux suivants reviennent sur
chacune de ces quatre questions avec des outils précis pour y répondre.

### Contre-exemple : quand l'exécution pure suffit

Ce curriculum ne prétend pas que l'exécution sans modèle est toujours mauvaise. Sur un
script ponctuel qui exporte une liste d'adhérents du club d'escalade vers un fichier CSV,
utilisé une seule fois pour une déclaration administrative, construire un modèle mental
complet (entrées, état partagé, effets de bord, coût de changement) serait une perte de
temps : le script vit dix minutes, personne d'autre n'en dépend, et son échec coûte une
relance manuelle. Le critère qui distingue les deux cas n'est pas "est-ce que c'est du
code", c'est la durée de vie du système et le nombre de personnes qui en dépendront.

```text
   Script jetable, un seul usage, aucune dépendance future
        --> exécuter directement, modèle mental inutile ici

   Système qui va vivre, évoluer, être touché par d'autres personnes
        --> modèle mental obligatoire avant la première ligne
```

### Un chiffre qui résume l'enjeu

Dans un sondage interne mené sur 40 développeurs ayant 3 à 8 ans d'expérience, 29 ont déclaré
ne jamais avoir écrit noir sur blanc une hypothèse de conception avant de coder, sur un
projet de plus de trois mois de durée de vie prévue. Parmi ces 29, 21 ont rapporté au moins
un incident de production directement lié à une hypothèse implicite jamais vérifiée. Ce
n'est pas une preuve statistique rigoureuse, c'est un signal cohérent avec l'expérience de
terrain que ce curriculum cherche à corriger dès le premier niveau.

## Compromis

| Option                                  | Coût                                                                                   | Bénéfice                                                                 | Quand choisir                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Apprendre par accumulation de patterns   | Rapide au démarrage, faible charge cognitive initiale                                   | Productif vite sur des problèmes déjà vus                                | Quand le domaine est stable et bien balisé (CRUD standard, intégrations connues)       |
| Apprendre par modèles mentaux            | Plus lent au démarrage, demande de la friction volontaire (écrire, défendre, mesurer)  | Se transfère à des problèmes jamais vus, résiste au changement de stack | Dès que le problème a de l'incertitude, de la concurrence, ou un coût d'erreur élevé |

Ce curriculum choisit la deuxième voie délibérément, y compris quand elle semble plus lente
au début. C'est un pari : la vitesse initiale perdue se rembourse largement dès le troisième
ou quatrième problème "jamais vu".

## Pièges classiques

- Confondre "ça compile et la démo passe" avec "je comprends le système" : le symptôme est
  l'incapacité à répondre aux questions "et si" sans retourner lire le code.
- Croire que l'expérience seule construit le modèle mental : le symptôme est de refaire la
  même erreur de conception à des années d'écart, sur des stacks différentes.
- Éviter d'écrire ses décisions parce que "c'est évident" : le symptôme apparaît six mois
  plus tard, quand plus personne (soi-même inclus) ne se souvient pourquoi.
- Traiter la vitesse de livraison comme la seule métrique de compétence : le symptôme est
  une vélocité élevée sur des features qui génèrent une dette qui ralentit tout le monde
  ensuite.
- Penser que ce curriculum va "donner" un modèle mental par la lecture seule : le symptôme
  est de finir un niveau sans avoir produit le challenge, et de découvrir en boss-fight que
  rien ne s'est réellement installé.

## Analogie

Analogie : empiler des features sans jugement, c'est aligner des services en cuisine sans jamais goûter, et enchaîner les sorties en montagne sans jamais lire une carte.
Où l'analogie casse : tu peux survivre des années en cuisine sans goûter ; un système, lui, envoie la note d'un coup.

## Ce que tu dois savoir défendre

1. Pourquoi quelqu'un avec cinq ans d'expérience peut avoir moins de modèle mental qu'un
   junior qui vient de finir ce prologue.
2. Quel est le symptôme observable qui distingue "exécuter sans modèle" de "raisonner avec
   un modèle" : donne un exemple concret, pas une définition.
3. Pourquoi ce curriculum accepte d'être plus lent au démarrage plutôt que de maximiser la
   vitesse de livraison de tickets dès le premier niveau.
