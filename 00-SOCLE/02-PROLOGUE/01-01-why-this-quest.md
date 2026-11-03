---
stability: intemporel
acte: comprendre
cognitive_level: L2
perturbation_modes: [defaut_cache, decision_organisationnelle]
anti_recipe_key: defaut_cache+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Pourquoi la plupart des devs stagnent

Temps de lecture ~8 min

> Tu peux commencer sans expérience professionnelle et sans projet personnel. Les exemples qui suivent sont des situations à imaginer : tu n'as pas besoin d'avoir déjà livré un logiciel.

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

Exemple concret, sans prétendre à une statistique : une équipe suppose que deux demandes
ne modifieront jamais la même réservation en même temps. Le code fonctionne pendant la
démonstration, puis deux utilisateurs réservent la dernière place presque simultanément.
Le défaut ne vient pas forcément de la syntaxe ; il vient d'une hypothèse de concurrence qui
n'a pas été formulée ni vérifiée. Écrire l'hypothèse permet de chercher le scénario qui peut
la réfuter avant qu'un incident ne le fasse à ta place.

### Le signal qui ne trompe pas

Un dev qui exécute sans modèle mental a un symptôme reconnaissable : il ne peut pas répondre
à "qu'est-ce qui casserait si on changeait X ?" sans relire le code. Un dev avec un modèle
mental répond en quelques secondes, parce qu'il sait déjà où sont les frontières, les états
partagés, les hypothèses fragiles. Ce curriculum vise à construire ce deuxième réflexe.

Un test simple, même sans avoir jamais livré de logiciel : imagine une application de réservation. Deux personnes veulent la dernière place exactement au même moment. Demande-toi : "quelle réservation doit être acceptée ?" et "quelle règle permet de le décider ?". Tu viens de formuler une question d'ingénierie sans écrire une ligne de code.

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

### Un signal de travail, pas un chiffre inventé

Tu n'as pas besoin d'un sondage pour comprendre le risque : imagine une réservation, une
limite de stock ou un paiement. Si personne n'a écrit ce qui doit se passer lorsque deux
demandes arrivent ensemble, chaque développeur peut avoir une interprétation différente.
Le travail d'ingénierie consiste à rendre cette hypothèse visible, à définir le comportement
attendu et à prévoir comment le vérifier. Le curriculum ne revendique aucun résultat de sondage ni taux d'incident.

## Compromis

| Option                                 | Coût                                                                                  | Bénéfice                                                                | Quand choisir                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Apprendre par accumulation de patterns | Rapide au démarrage, faible charge cognitive initiale                                 | Productif vite sur des problèmes déjà vus                               | Quand le domaine est stable et bien balisé (CRUD standard, intégrations connues)     |
| Apprendre par modèles mentaux          | Plus lent au démarrage, demande de la friction volontaire (écrire, défendre, mesurer) | Se transfère à des problèmes jamais vus, résiste au changement de stack | Dès que le problème a de l'incertitude, de la concurrence, ou un coût d'erreur élevé |

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

## Ce que tu dois savoir expliquer

1. Quelle hypothèse Amine n'a-t-il pas formulée avant de coder ?
2. Pourquoi une démonstration réussie ne prouve-t-elle pas que le scénario à deux utilisateurs est sûr ?
3. Quelle question simple peut-on poser avant de commencer à coder ?

Tu peux répondre avec le scénario de la réservation. Aucune expérience professionnelle ni vocabulaire d'architecture n'est nécessaire.

## Défi avancé facultatif : variation G : boîte noire

Quand tu auras étudié les notions de système, décris un problème sans nommer sa technologie : mécanisme, invariants et observations attendues. Ce défi n'est pas un prérequis du Prologue.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi la plupart des devs stagnent** commence par un exemple de réservation. Tu n'as pas besoin de connaître ce produit : il sert seulement à imaginer une règle métier et une situation qui pourrait la contredire.

**À observer :** l'hypothèse formulée, le scénario qui pourrait la contredire et la vérification qui serait utile. À ce stade, tu fais un exercice de réflexion ; ne présente pas un exemple imaginé comme un test réellement exécuté.

## Mission utile : Kintana : formuler une hypothèse avant de coder

> **Arc Naruto :** avant d'attaquer, regarde ce que tu supposes. Une hypothèse invisible devient facilement un bug.

**Mission liée à « Pourquoi la plupart des devs stagnent » :** imagine que Kintana réserve des créneaux. Écris une règle simple : « un créneau ne peut être attribué qu'à une seule réservation ». Imagine ensuite que deux personnes demandent ce créneau au même instant. Décris ce qui pourrait mal se passer et quelle vérification permettrait de contrôler la règle.

**Livrable :** un tableau de trois lignes : `hypothèse / scénario qui la met en difficulté / vérification possible`.

**Critères d’acceptation :** l'hypothèse est exprimée clairement ; le scénario décrit un risque concret ; la vérification est une idée de contrôle, pas un test prétendument exécuté. Aucun code, commit ou outil n'est requis dans le Prologue.

**Transfert obligatoire :** applique le même raisonnement à un stock de trois articles : quelle hypothèse formules-tu si deux clients achètent le dernier article en même temps ?
