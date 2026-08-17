> **Document historique, ne pas suivre.** Ce fichier décrivait le plan d'entrelacement
> pour mener ProjectFunny et MyFunnyJS de front, avant leur fusion en un seul parcours à
> six paliers. Ses renvois de niveaux (00 à 16) ne correspondent plus à l'arborescence
> actuelle. Ce qui fait autorité aujourd'hui : le [README.md](../../README.md) racine pour
> la progression, et le
> [DEPENDENCY_LEDGER.md](../../00-SOCLE/03_referentiel/DEPENDENCY_LEDGER.md) pour les
> dépendances entre modules. Conservé ici comme trace historique, voir
> [archives/README.md](README.md).

```
   ___  ____  ____  ____  ____    ____  _____   ____   ____ _____ ____  __    ____
  / __)(  _ \(  _ \(  __)(  _ \  (  _ \(  _  ) (  _ \ (  __(  _  (_  _)/ _\  (  __)
 ( (_ \ )   / )(_) )) _)  )   /   ) _ ( )(_)(   ) _ ( ) _)  )(_)(  )( /    \  ) _)
  \___/(_)\_)(____/(____)(_)\_)  (____/(_____) (____/(____)(_____)(__)\_/\_/ (____)
```

# L'ORDRE DE BATAILLE : ProjectFunny + MyFunnyJS

_Le plan pour faire les deux curriculums en même temps, sans te perdre et sans
perdre de temps._

Prends ça comme un GPS, pas comme un cours de plus à lire. À chaque semaine, il te
dit : ouvre ce dossier-là, ce soir. Rien de plus compliqué.

Chaque étape de ce plan est vérifiée directement dans les fichiers des deux
curriculums : pas juste dans leurs tables des matières. Quand un module dit
littéralement "j'ai besoin de tel autre module avant moi", ce plan respecte cet
ordre-là à la lettre. Tu peux vérifier chaque lien toi-même, les fichiers cités
existent réellement dans tes deux dossiers.

---

## Avant de commencer : quelques mots qu'on va croiser tout le long

Je les mets ici une bonne fois, comme ça t'as plus besoin d'aller chercher ailleurs
pendant que tu lis :

- **Curriculum** = le programme, la suite de leçons à suivre dans l'ordre.
- **Fil rouge** = LE projet unique que tu gardes du début à la fin. Pas dix petits
  projets différents, un seul, qui grossit à chaque niveau.
- **Capstone** = le gros projet final qui prouve que t'as tout compris, la dernière
  étape avant de dire "je sais faire ça".
- **Prérequis** = ce que tu dois déjà savoir avant d'ouvrir un module, sinon tu
  liras des mots que personne ne t'a encore expliqués.
- **Dépendance** = un lien du genre "le module B a besoin de ce que t'as appris
  dans le module A". Si tu inverses l'ordre, le module B te paraît confus, alors
  que le vrai problème c'est juste que t'as sauté une étape avant.

---

## LE PLAN, EN UNE PHRASE

```
┌─────────────────────────────────────────────────────────────┐
│  Tu ne fais PAS ProjectFunny en entier, puis MyFunnyJS en    │
│  entier. Tu ne fais PAS non plus l'inverse.                  │
│                                                                │
│  Tu avances sur les DEUX EN MÊME TEMPS, semaine après         │
│  semaine, en te servant de MyFunnyJS comme boîte à outils     │
│  technique pour construire le projet que ProjectFunny te      │
│  fait porter du début à la fin.                               │
└─────────────────────────────────────────────────────────────┘
```

---

## POURQUOI CE PLAN-LÀ, ET PAS "TOUT L'UN PUIS TOUT L'AUTRE"

Je t'explique le raisonnement, pas juste le résultat, comme ça tu peux le
contester si un jour ta situation change.

### Raison n°1 : ProjectFunny se construit SUR un projet, pas dans le vide

Le fichier `README.md` de ProjectFunny le dit lui-même : _"Fais chaque niveau sur
ce projet [ton projet fil rouge]. Le curriculum n'a de valeur que collé à un cas
concret."_

Concrètement : au niveau 05 (DATA-SPELLS : la partie où tu apprends à organiser
les données de ton projet, genre une base de données), tu écris de vraies requêtes
et une vraie structure de données. Au niveau 07 (API-DOJO : la partie où deux
programmes apprennent à se parler entre eux), tu écris un vrai contrat technique.

Si tu fais tout ProjectFunny d'abord, sans avoir encore vu comment JavaScript
gère l'attente d'une réponse (ce qu'on appelle l'**asynchrone**, ou comment une
fonction "se souvient" d'une valeur même après avoir fini de tourner, ce qu'on
appelle une **closure**), tu vas remplir ces niveaux avec du code fragile. Résultat :
tu devras tout reprendre plus tard. Deux fois le travail pour un seul résultat.

### Raison n°2 : ProjectFunny lui-même exige un minimum avant d'entrer

Le tout premier niveau de ProjectFunny (`00-PROLOGUE`) contient un test de 10
questions à te poser avant même de commencer : écrire une fonction simple, lire
un petit bout de JSON (un format pour ranger des données, genre une fiche
d'identité en texte), faire une jointure SQL (une requête qui relie deux tables
d'une base de données entre elles), utiliser `git commit` (l'outil qui garde
l'historique de ton code), lire un message d'erreur.

Le verdict est écrit noir sur blanc dans le fichier : en dessous de 7 bonnes
réponses sur 10, il te demande de faire d'abord une remise à niveau de 20 à 40
heures avant même d'ouvrir le niveau 02. Autrement dit : ProjectFunny admet
lui-même qu'il faut un socle solide en JavaScript avant de commencer. Ce socle,
c'est exactement les tout premiers modules de MyFunnyJS.

### Raison n°3 : MyFunnyJS te fait construire dès le départ, pas seulement à la fin

MyFunnyJS ne garde pas ses 19 mini-projets pour la toute fin. Son propre fichier
de référence (`02-CONSTRUCTION/02_mini_projects/README.md`) donne une règle claire :

```
Mini-projets 01 -> 05   dès que t'as fini les modules 01 -> 07
Mini-projets 06 -> 10   après les modules 08 -> 13
Mini-projets 11 -> 14   après les modules 15 -> 22
Mini-projets 15 -> 17   après les modules 23 -> 29
```

Ce curriculum veut donc, lui aussi, que tu construises en avançant : pas que tu
lises 250 heures de théorie avant de toucher à un vrai projet complet. Faire tout
MyFunnyJS avant de commencer un seul vrai projet casserait cette logique-là aussi.

### Raison n°4 : le vrai danger, c'est la distance entre "apprendre" et "construire"

```
ProjectFunny (sans le niveau 13, qui est une routine continue) :  environ 137 heures
MyFunnyJS :                                                       environ 250 heures
─────────────────────────────────────────────────────────────────────────────────
Si tu les mets bout à bout :                                      387 heures
```

Si tu fais "ProjectFunny complet, PUIS MyFunnyJS complet", ton premier vrai gros
projet (le capstone de ProjectFunny : son dernier niveau, le grand test final)
arrive tout au fond de la pile, après 250 heures de JavaScript pur. Ça fait des
mois avant de toucher un vrai projet complet, et c'est exactement le genre de
distance qui tue la motivation en cours de route.

Si tu fais l'inverse ("MyFunnyJS complet, PUIS ProjectFunny complet"), tu repousses
tout ce qui apprend à réfléchir avant de coder (comprendre un besoin, découper un
projet en morceaux livrables) tout en bas : alors que c'est la compétence la plus
rare et la plus difficile à muscler chez un développeur.

**La règle d'or : ne laisse jamais 250 heures d'écart entre le moment où tu
apprends un truc et le moment où tu construis un vrai projet complet avec.**

---

## LA VÉRIFICATION QUI CHANGE TOUT : LES MODULES ONT DES PRÉREQUIS ÉCRITS

Voici quelque chose d'important : MyFunnyJS n'a pas juste 29 modules numérotés
au hasard. Chaque module commence par une ligne du genre _"CE MODULE RÉUTILISE :
tel autre module, tel autre module"_ : c'est le curriculum lui-même qui te dit
noir sur blanc de quoi il a besoin avant de commencer.

J'ai ouvert chacun des 29 modules pour lire cette ligne, une par une, et j'ai
construit la vraie carte de qui a besoin de quoi. Voici ce que ça donne, en
version simple (une flèche veut dire "il faut celui de gauche avant celui de
droite") :

```
01 (les bases)
 └─> 03 (l'attente/asynchrone)
      ├─> 04 (chercher un bug)
      │    └─> 05 (gérer une erreur)
      │         └─> 06 (tester son code)
      │              └─> 13 (réécrire proprement)
      │                   └─> 27 (travailler en équipe)
      ├─> 08 (la mémoire) [a aussi besoin de 07, les maths de base]
      │    └─> 09 (ranger des données)
      │         └─> 10 (traiter des données)
      │         └─> 24 (bases de données)
      │              └─> 25 (tenir la charge)
      └─> 17 (comment le web communique)
           ├─> 20 (temps réel)
           ├─> 21 (construire une API) [a aussi besoin de 05]
           └─> 22 (sécuriser son code)  [a aussi besoin de 05]

11 (écrire du code plus prévisible)
 └─> 12 (les solutions toutes faites, "design patterns")
      ├─> 13 (réécrire proprement, cf plus haut)
      ├─> 14 (ajouter des types à son code)
      └─> 16 (organiser un projet entier) [a aussi besoin de 03 et 13]
```

Ça confirme un point précis, très concret : le module 16 (organiser un projet
entier) a besoin du module 13 (réécrire proprement) avant lui. Le module 21
(construire une API) a besoin du module 17 (comment le web communique) avant
lui. Ce genre de lien, invisible si tu regardes juste les titres des dossiers,
change complètement l'ordre dans lequel il faut avancer. Le plan plus bas
respecte chacun de ces liens.

---

## LE PLAN EN BLOCS

ProjectFunny découpe déjà son parcours en 5 blocs officiels, chacun terminé par
une **rétrospective** (un moment où tu relis ce que t'as déjà fait, avec un regard
neuf, pour voir ce qui a changé dans ta compréhension). Je garde ces blocs, et je
glisse les bons modules de MyFunnyJS dedans, dans un ordre qui respecte
exactement la carte de dépendances vue juste au-dessus.

```
██████████████████████████████████████████████████████████████████████
█  BLOC 0 : LE SOCLE                                                  █
█  (avant d'ouvrir un seul niveau numéroté de ProjectFunny)           █
██████████████████████████████████████████████████████████████████████

   Côté MyFunnyJS                        Côté ProjectFunny
   ───────────────                       ──────────────────
   00-SOCLE/01_getting_started                    00-PROLOGUE
     (installer les outils,                (les règles du jeu,
      écrire tes 3 premières lignes)        aucune ligne de code)
   00-SOCLE/03_referentiel                        01-MINDSET
     (comprendre où tu en es)              (apprendre à réfléchir en
   00-SOCLE/04_fundamentals                         coûts et en hypothèses)
     (les bases : variables,
      fonctions, boucles)
   00-SOCLE/05_problem_solving
     (comment décomposer un
      problème avant de coder)

   Environ 25 heures                     Environ 8 heures

   Ce que tu dois pouvoir faire à la fin de ce bloc : réussir le test
   d'entrée de ProjectFunny (le fameux test de 10 questions) avec au
   moins 7 bonnes réponses sur 10, sans stresser.
```

```
██████████████████████████████████████████████████████████████████████
█  BLOC CADRAGE : apprendre à bien poser un projet avant de coder     █
█  (niveaux 02 et 03 de ProjectFunny)                                 █
██████████████████████████████████████████████████████████████████████

   Côté ProjectFunny (le fil conducteur)   Côté MyFunnyJS (en soutien)
   ──────────────────────────────────      ────────────────────────────
   02-PROBLEM-HUNT                         01-CADRAGE/02_async
     (séparer ce qu'on te demande,           (comprendre comment JS
      ce dont on a vraiment besoin,           attend une réponse sans
      et ce qui n'est pas négociable)         se bloquer)
   03-MVP-SPLIT                            01-CADRAGE/03_debugging
     (découper un gros projet en               (chercher un bug avec
      petits morceaux livrables un              méthode, sans paniquer)
      par un)                               01-CADRAGE/04_error_handling
                                                (prévoir qu'une erreur
                                                 va arriver, et bien
                                                 la gérer quand elle
                                                 arrive)

   -> C'est ICI que tu choisis ton projet fil rouge, avec le test à
      5 critères du fichier 00-PROLOGUE/README.md. C'est ce projet-là
      que tu vas construire, avec les outils de MyFunnyJS, jusqu'à la
      toute fin du parcours.

   -> Pourquoi 03/04/05 ici et pas plus tard : ces trois modules
      s'enchaînent dans cet ordre précis d'après leurs propres
      prérequis (03 dépend de 01, 04 dépend de 01 et 03, 05 dépend de
      01 et 03). Les faire ici te prépare directement au niveau 05 de
      ProjectFunny qui arrive juste après.
```

```
██████████████████████████████████████████████████████████████████████
█  BLOC CONSTRUCTION : le plus gros morceau                           █
█  (niveaux 04 à 07 de ProjectFunny)                                  █
██████████████████████████████████████████████████████████████████████

   Côté ProjectFunny (le fil conducteur)   Côté MyFunnyJS (en soutien)
   ──────────────────────────────────      ────────────────────────────
   04-USER-WIZARD                          02-CONSTRUCTION/03_testing
     (dessiner les parcours d'un              (comment vérifier que
      utilisateur dans ton appli)              ton code fait bien ce
   05-DATA-SPELLS                              qu'il doit faire)
     (organiser les données de ton           02-CONSTRUCTION/04_math_basics
      projet, genre ta base de données)        (les bases de calcul
   06-ARCHI-LAB                                 dont ton code a besoin,
     (décider comment organiser ton             genre les arrondis)
      code pour qu'il tienne debout)          02-CONSTRUCTION/05_memory_performance
   07-API-DOJO                                  (comment ton programme
     (écrire les règles par lesquelles           gère sa mémoire)
      deux programmes se parlent)             02-CONSTRUCTION/06_data_structures
                                                (les bonnes façons de
                                                 ranger des données)
                                              02-CONSTRUCTION/07_algorithms
                                                (les bonnes façons de
                                                 traiter des données)
                                              02-CONSTRUCTION/09_functional_js
                                                (une façon d'écrire du
                                                 code plus prévisible)
                                              02-CONSTRUCTION/10_design_patterns
                                                (des solutions toutes
                                                 faites à des problèmes
                                                 qui reviennent souvent)
                                              02-CONSTRUCTION/11_refactoring
                                                (réécrire du code qui
                                                 marche déjà, pour le
                                                 rendre plus sain)
                                              02-CONSTRUCTION/12_typescript
                                                (ajouter des types à
                                                 son code JavaScript,
                                                 pour attraper des
                                                 erreurs avant même de
                                                 lancer le programme)
                                              02-CONSTRUCTION/13_runtime_env
                                                (les différences entre
                                                 les endroits où ton
                                                 code JS peut tourner)
                                              02-CONSTRUCTION/14_architecture_patterns
                                                (des façons éprouvées
                                                 d'organiser un projet
                                                 entier)
                                              02-CONSTRUCTION/18_web_concepts
                                                (comment deux machines
                                                 se parlent sur
                                                 internet)
                                              02-CONSTRUCTION/17_oop_js
                                                (organiser son code
                                                 autour d'objets)
                                              02-CONSTRUCTION/19_api_craft
                                                (construire une vraie
                                                 API, celle qui va
                                                 servir ton projet)

   C'est le bloc le plus dense, et c'est normal : c'est là que
   ProjectFunny te demande de construire les fondations réelles de ton
   projet (données, architecture, API), donc c'est là qu'il te faut le
   plus d'outils techniques solides derrière.

   Repère utile pour ne pas te perdre dans la longueur de cette liste :
   les modules 06 à 10 avancent en même temps que ProjectFunny 04-05
   (tu poses les fondations techniques et les données), et les modules
   11 à 21 avancent en même temps que ProjectFunny 06-07 (tu organises
   ton code et tu construis ton API).

   Le niveau 05 de ProjectFunny te demande de bien organiser tes
   données -> le module 09 de MyFunnyJS te donne les bons outils
   techniques pour le faire proprement. Le niveau 06 te demande de
   poser des frontières dans ton code -> les modules 13 et 16 te
   donnent le vocabulaire et les méthodes pour bien les choisir (16 a
   justement besoin de 13 avant lui, donc les faire dans cet ordre
   n'est pas un hasard). Le niveau 07 te demande d'écrire un contrat
   d'API solide -> le module 17 (comment le web communique) doit venir
   avant le module 21 (construire une API), parce que 21 a
   explicitement besoin de 17 pour être compris.
```

```
██████████████████████████████████████████████████████████████████████
█  BLOC PILOTAGE : apprendre à tenir un projet dans la durée          █
█  (niveaux 08 à 10 de ProjectFunny)                                  █
██████████████████████████████████████████████████████████████████████

   Côté ProjectFunny (le fil conducteur)   Côté MyFunnyJS (en soutien)
   ──────────────────────────────────      ────────────────────────────
   08-ROADMAP-RUN                          03-PILOTAGE/02_web_inclusive
     (planifier en fonction des             (rendre ton site utilisable
      risques, pas juste dans l'ordre         par tout le monde, y
      des écrans)                              compris les langues et
   09-QUALITY-SHIELD                             les handicaps)
     (choisir quoi tester, quoi             03-PILOTAGE/04_security
      surveiller, quoi vérifier)              (protéger ton code contre
   10-TEAM-QUEST                                les attaques courantes)
     (travailler à plusieurs sans           03-PILOTAGE/05_observability
      se bloquer les uns les autres)          (savoir voir ce qui se
                                                passe dans ton programme
                                                une fois qu'il tourne)
                                              03-PILOTAGE/10_team_craft
                                                (bien travailler avec
                                                 d'autres développeurs)

   Quelque part par ici tombe un test bloquant de MyFunnyJS (après le
   module 14, un "défi de transfert" qui te fait reproduire ce que tu
   sais en JavaScript dans un autre langage). Ne le saute pas, même
   si t'es à fond dans ProjectFunny : c'est ce test-là qui prouve que
   tu comprends vraiment les mécanismes, et pas juste la syntaxe de JS.

   Le module 27 (travailler en équipe) a justement besoin du module 13
   (réécrire proprement) avant lui : tu l'as déjà fait dans le bloc
   précédent, donc l'ordre est bon.
```

```
██████████████████████████████████████████████████████████████████████
█  BLOC ÉPREUVE : le grand test final                                 █
█  (niveaux 11 et 12 de ProjectFunny, avec deux prérequis obligatoires)█
██████████████████████████████████████████████████████████████████████

   Côté ProjectFunny (le fil conducteur)   Côté MyFunnyJS (en soutien)
   ──────────────────────────────────      ────────────────────────────
   15-BONUS-VAULT (section 05)             04-EPREUVE/03_realtime
     (revue de sécurité : à faire            (les technologies qui
      AVANT le niveau 12, sinon               permettent à ton appli
      le capstone est automatiquement         de réagir en direct,
      recalé)                                 sans recharger la page)
   14-TOOL-CAVE (sections 03 et 05)         04-EPREUVE/04_ai_native_dev
     (les fiches de débogage                  (coder avec l'aide d'une
      exigées pour le capstone)                IA sans se faire piéger)
   11-BIG-APP-SNOOP
     (entrer dans un gros projet que
      tu n'as pas écrit toi-même, et
      comprendre comment il marche
      en 3 heures chrono)
   12-CAPSTONE-ARENA
     (le grand projet final, 25 à
      40 heures, en 3 étapes datées)

   Le capstone de ProjectFunny, c'est ton mini-projet MyFunnyJS le
   plus ambitieux, habillé avec toute la rigueur qu'on t'a apprise
   depuis le début. C'est le moment précis où les deux curriculums se
   rejoignent complètement dans un seul et même livrable.

   À ce stade, tu as fini les modules 01 à 23 de MyFunnyJS. Son propre
   fichier de règles pour les mini-projets (`02-CONSTRUCTION/02_mini_projects/README.md`)
   te dit que les projets 11 à 14 s'attaquent après les modules 15 à 22
   : donc c'est le bon moment pour les faire aussi, en parallèle de ton
   capstone ProjectFunny si t'as l'énergie, ou juste après si tu
   préfères souffler entre les deux.
```

```
██████████████████████████████████████████████████████████████████████
█  BLOC APRÈS : ce qu'il reste à consolider                           █
██████████████████████████████████████████████████████████████████████

   Côté ProjectFunny                       Côté MyFunnyJS
   ──────────────────                      ──────────────
   13-DAY-TO-LEGEND                        05-MAITRISE/01_databases
     (une routine de 12 semaines qui         (bases de données en
      démarre juste après le niveau 12,      profondeur : SQL, NoSQL,
      pour garder tes réflexes affûtés)      cache)
   15-BONUS-VAULT (le reste)               05-MAITRISE/02_scalability
                                              (tenir la charge quand
                                               ton appli grossit)
                                            05-MAITRISE/03_edge_cases
                                              (les cas limites qui
                                               piègent tout le monde :
                                               fuseaux horaires,
                                               nombres à virgule,
                                               encodage de texte)
                                            05-MAITRISE/04_ai_agents_and_autonomy
                                              (déléguer des tâches à
                                               une IA sans perdre le
                                               contrôle de ton projet)
                                            02-CONSTRUCTION/02_mini_projects (les
                                              projets 15 à 17,
                                              après les modules 23-29)
                                            05-MAITRISE/06_annexes (préparer un
                                              entretien, un portfolio)
                                            05-MAITRISE/07_tools (outils
                                              complémentaires, au
                                              besoin)
```

---

## PLANNING SEMAINE PAR SEMAINE

ProjectFunny propose trois rythmes possibles selon ton temps disponible (dans son
fichier `ROADMAP.md`). Comme t'as un mémoire à écrire cette année en plus des
cours, je te construis sur un rythme tenable : 6 heures par semaine, ProjectFunny
et MyFunnyJS confondus. Les durées ci-dessous ne sont pas des dates arrondies au
pif : je les ai calculées en comptant le volume réel de chaque bloc (les durées
officielles pour ProjectFunny, le nombre de fichiers de leçon réel pour
MyFunnyJS) et en divisant par 6h/semaine. C'est plus honnête qu'un chiffre rond,
même si ça donne des nombres de semaines moins "propres".

```
SEMAINES 1 à 9      [SOCLE]
                    MyFunnyJS : 00-SOCLE/01_getting_started -> 00-SOCLE/03_referentiel -> 01 -> 02
                    ProjectFunny : 00 -> 01
                    -> Tu passes le test d'entrée de ProjectFunny (7/10 minimum)

SEMAINES 10 à 15    [CADRAGE]
                    ProjectFunny : 02 -> 03
                    MyFunnyJS : 03 -> 04 -> 05
                    -> Tu choisis ton PROJET FIL ROUGE
                    -> Tu relis ce que tu as déjà fait (rétrospective bloc 1)

SEMAINES 16 à 33    [CONSTRUCTION]
                    ProjectFunny : 04 -> 05 -> 06 -> 07
                    MyFunnyJS : 06 -> 07 -> 08 -> 09 -> 10 -> 11 -> 12 -> 13
                                -> 14 -> 15 -> 16 -> 17 -> 18 -> 21
                    -> Tu relis ce que tu as déjà fait (rétrospective bloc 2)

SEMAINES 34 à 40    [PILOTAGE]
                    ProjectFunny : 08 -> 09 -> 10
                    MyFunnyJS : 19 -> 22 -> 26 -> 27
                    -> Le défi de transfert de MyFunnyJS tombe quelque part ici
                    -> Tu relis ce que tu as déjà fait (rétrospective bloc 3)

SEMAINES 41 à 51    [ÉPREUVE]
                    ProjectFunny : 15 (section 05) -> 14 (sections 03 et 05)
                                   -> 11 -> 12 (le capstone)
                    MyFunnyJS : 20 -> 23 (+ mini-projets 11 à 14 si l'énergie
                                le permet)
                    -> Tu relis ce que tu as déjà fait (rétrospective bloc 4)

SEMAINE 52 et +     [APRÈS]
                    ProjectFunny : 13 (routine de 12 semaines) + 15 (le reste)
                    MyFunnyJS : 24 -> 25 -> 28 -> 29 -> 30 (fin) -> 31 -> 32
                    -> Tu relis ce que tu as déjà fait (rétrospective bloc 5)
```

Compte au total environ 1 an à 6 heures par semaine, capstone inclus (le niveau
13 de ProjectFunny s'ajoute par-dessus, 12 semaines de routine légère une fois
le capstone fini). C'est plus long que ce qu'annoncent séparément les deux
curriculums (137 heures pour ProjectFunny seul, 250 pour MyFunnyJS seul, soit
387 heures si on les additionnait), et c'est normal : à 6h/semaine, 387 heures
prennent environ 64 semaines. Le chiffre qui compte vraiment, c'est celui-là -
pas une durée arrondie qui a l'air propre sur le papier mais qui te met en
retard dès la troisième semaine.

**Pourquoi le bloc CONSTRUCTION est si long (18 semaines).** C'est le bloc qui
porte le plus gros morceau des deux curriculums en même temps : 4 niveaux
ProjectFunny (dont le niveau 05, le plus lourd de tout ProjectFunny à lui seul)
et 14 modules MyFunnyJS d'affilée. Si ça te semble trop long, c'est le bloc où
il vaut mieux ralentir consciemment plutôt que de sauter des étapes pour
rattraper le calendrier : relis la "règle d'abandon saine" de ProjectFunny plus
bas dans ce document : le blocage vient presque toujours d'un projet trop
ambitieux, pas d'un manque de capacité.

**Si 6h/semaine ne colle pas à ta réalité cette année** (le mémoire prend plus
de place certaines semaines, moins d'autres) : ce n'est pas grave. Garde
l'ordre des blocs et l'ordre des modules à l'intérieur de chaque bloc tel quel
- c'est ça qui est vérifié et qui ne bouge pas. Ajuste juste le nombre de
semaines par bloc à ton rythme réel, en gardant le ratio entre les blocs à peu
près pareil (CONSTRUCTION restera toujours le bloc le plus long, quel que soit
ton rythme).

---

## LA CARTE RAPIDE : "J'OUVRE QUOI CE SOIR ?"

Pour les jours où tu sais plus où t'en es et où tu veux juste une réponse simple :

```
┌──────────────────────────────────┬───────────────────────────────────┐
│  Ce que tu es en train de faire  │  Ouvre plutôt...                   │
├──────────────────────────────────┼───────────────────────────────────┤
│  Cadrer un besoin qui reste flou │  ProjectFunny 02-PROBLEM-HUNT       │
│  Découper un gros truc en petits │  ProjectFunny 03-MVP-SPLIT          │
│  morceaux                        │                                     │
│  Dessiner un écran ou un parcours│  ProjectFunny 04-USER-WIZARD        │
│  Organiser ta base de données    │  ProjectFunny 05 + MyFunnyJS 09/24  │
│  Décider où couper ton code      │  ProjectFunny 06 + MyFunnyJS 13/16  │
│  Écrire un point d'entrée d'API  │  ProjectFunny 07 + MyFunnyJS 17/21  │
│  Tu t'embrouilles sur du JS pur  │  Retour à MyFunnyJS 01/02/04/05     │
│  Un bug bizarre que tu comprends │  MyFunnyJS 01-CADRAGE/03_debugging +           │
│  pas                             │  ProjectFunny 14-TOOL-CAVE          │
│  Comprendre les fonctions et la  │  MyFunnyJS 00-SOCLE/04_fundamentals          │
│  mémoire de tes variables        │                                     │
│  Comprendre comment JS gère      │  MyFunnyJS 01-CADRAGE/02_async                 │
│  l'attente (une requête réseau,  │                                     │
│  par exemple)                    │                                     │
│  Écrire tes premiers tests       │  MyFunnyJS 02-CONSTRUCTION/03_testing + ProjectFunny│
│                                   │  09                                 │
│  Nettoyer du code qui marche     │  MyFunnyJS 02-CONSTRUCTION/11_refactoring           │
│  mais qui pue                    │                                     │
│  Sécuriser ton appli (mots de    │  MyFunnyJS 03-PILOTAGE/04_security +            │
│  passe, formulaires, attaques)   │  ProjectFunny 15-BONUS-VAULT        │
└──────────────────────────────────┴───────────────────────────────────┘
```

---

## TON PROFIL À LA SORTIE, SI TU TIENS LES DEUX JUSQU'AU BOUT

Voici ce que ça donne concrètement, en croisant ce que chaque curriculum promet
à sa propre sortie.

**ProjectFunny** considère que t'as terminé quand : le capstone est livré, toutes
les rétrospectives de bloc sont faites, la revue de sécurité du niveau 15 est
faite, un document de transfert du niveau 13 existe, et le rapport d'exploration
du niveau 11 (celui où tu entres dans un code que t'as pas écrit) est produit.

**MyFunnyJS** considère que t'es "diplômé" quand cinq conditions sont remplies,
aucune n'étant facultative : les 32 modules ont chacun un compte-rendu personnel
signé, les 19 mini-projets sont livrés avec leur vérification de sécurité passée,
le défi de transfert vers un autre langage est réussi, un test filmé avec un vrai
débutant montre que tes explications sont claires, et un carnet de suivi montre
que tu dépends de moins en moins de l'aide d'une IA pour progresser.

```
                    ╔═══════════════════════════════════╗
                    ║   TON PROFIL, UNE FOIS LES DEUX     ║
                    ║   CURRICULUMS TERMINÉS              ║
                    ╚═══════════════════════════════════╝

   ProjectFunny t'apprend à...           MyFunnyJS t'apprend à...
   ────────────────────────────           ─────────────────────────
   séparer une demande, un besoin         comprendre comment JavaScript
   réel, et une contrainte fixe           tourne vraiment en coulisses
   découper un projet en tranches         gérer la mémoire et la
   livrables les unes après les           performance de ton code
   autres
   organiser les données d'un vrai        choisir les bonnes structures
   projet                                 de données et les bons
   poser des frontières claires dans      algorithmes
   ton code                               reconnaître et utiliser les
   écrire des contrats d'API solides      bons patterns de conception
   planifier en fonction des risques      débugger un système que tu
   défendre une décision à l'oral,        connais pas encore
   devant quelqu'un                       transférer tes réflexes sur
   entrer dans un gros projet écrit       un autre langage que JS
   par quelqu'un d'autre
   conduire un projet complet, seul,
   du besoin flou jusqu'à la livraison

              en résumé, tu deviens quelqu'un capable de...
     ┌────────────────────────────────────────────────────────┐
     │  1. Décider QUOI construire : c'est rare, et ça se paie  │
     │     cher, parce que peu de gens savent bien le faire     │
     │  2. Construire CORRECTEMENT ce qu'il a décidé de faire   │
     │  3. Défendre ses deux décisions devant quelqu'un d'autre │
     │  4. Entrer dans du code qu'il n'a jamais vu et s'y       │
     │     retrouver en quelques heures                          │
     │  5. Transférer ses réflexes sur un langage ou un outil    │
     │     qu'il n'a jamais touché avant                         │
     └────────────────────────────────────────────────────────┘
```

Le point le plus important, et celui que je veux que tu retiennes vraiment :
**ce qui compte, c'est le croisement des deux, pas la somme.** Un développeur qui
connaît ProjectFunny sans MyFunnyJS sait quoi construire, mais va buter sur le
"comment" technique dès que ça devient sérieux. Un développeur qui connaît
MyFunnyJS sans ProjectFunny va écrire du code impeccable, pour la mauvaise chose.
Ce qui vaut vraiment cher sur le marché, c'est quelqu'un qui a fait les deux et
qui les a fait fusionner sur un seul et même vrai projet : pas quelqu'un qui a
juste deux formations séparées sur son CV.

## LE NOYAU DUR : CE QUI DOIT TENIR JUSQU'EN 2035, PAS JUSTE JUSQU'AU DIPLÔME

Tout ce qu'on a vu jusqu'ici, c'est "fais ça, puis ça, puis ça". Mais y'a une
question plus profonde : dans 9 ans, qu'est-ce qui, dans tout ce que tu vas
apprendre cette année, sera encore vrai ? Et qu'est-ce qui va juste pourrir
tranquillement dans un coin, remplacé par un nouvel outil qu'on connaît pas
encore ?

Les deux repos ont déjà la réponse écrite dedans, module par module, pas
inventée au feeling. MyFunnyJS a un fichier entier là-dessus
(`00-SOCLE/03_referentiel/06_intemporel_vs_perissable.md`) et ProjectFunny pareil
(`ANNEXE-perennite.md`). Voilà ce qu'ils disent, croisés ensemble.

### Le partage exact, sur les 29 modules MyFunnyJS

```
   ╔═══════════════════════════════════════════════════════════╗
   ║       DURÉE DE VIE DES 29 MODULES : CHIFFRES RÉELS         ║
   ╚═══════════════════════════════════════════════════════════╝

   INTEMPOREL : 13/29 modules : le vrai noyau dur
   ─────────────────────────────────────────────────────
   ça bouge pas, même en 2035, sauf séisme dans l'informatique
   entière (genre un nouveau paradigme de calcul)

   01 fundamentals     02 problem_solving   03 async
   05 error_handling   07 math_basics      09 data_structures
   10 algorithms      11 functional_js     12 design_patterns
   13 refactoring      18 oop_js         27 team_craft
   28 edge_cases

   5 ANS : 11/29 modules : solide, mais à ressortir de temps en temps
   ─────────────────────────────────────────────────────
   04 debugging   06 testing        08 memory_performance
   16 architecture  17 web_concepts     19 web_inclusive
   20 realtime    21 api_craft       24 databases
   25 scalability  26 observability

   2 ANS : 5/29 modules : le plus volatile, à checker souvent
   ─────────────────────────────────────────────────────
   14 typescript   15 runtime_env    22 security
   23 ai_native_dev  29 ai_agents_and_autonomy
```

(Le module `00-SOCLE/01_getting_started`, lui aussi classé "2 ans" dans le fichier
source, est le setup/onboarding : installer les outils, pas apprendre un
concept : donc on le compte pas dans les 29.)

Regarde la liste "intemporel" une seconde. C'est presque exactement ce que tu
retrouves dans TOUS les entretiens techniques sérieux, dans toutes les
boîtes, peu importe la stack (l'ensemble langage + outils qu'une équipe
utilise) : comment raisonner un problème (`02`), comment JS tourne vraiment
en dessous (`03` async, `28` edge cases : les cas limites qui font planter
un programme en silence), quelle structure de données choisir et pourquoi
(`09`, `10`), comment organiser du code qui vit longtemps (`12`, `13`, `18`),
comment gérer les erreurs proprement (`05`), et comment bosser avec des
humains (`27`). Cette liste-là, c'est ton armure. Le reste, c'est ton
équipement : ça s'use, ça se remplace, mais sans l'armure en dessous t'es à
poil.

### Et côté ProjectFunny, pareil, mais version "produit / architecture"

L'annexe pérennité de ProjectFunny dit un truc très simple, presque une
formule :

```
CE QUI PÉRIME VITE                    CE QUI RESTE 20 ANS
──────────────────────                ──────────────────────────
la syntaxe d'un framework             le couplage et la cohésion
l'ORM du moment                       le coût d'un changement de schéma
le format de config du CI             l'idée de garde-fou automatique
le fournisseur de cloud               la latence, la panne partielle, le coût
la mode "micro-services"              le critère de découpage d'un système
l'outil de ticket                     un travail invisible = un travail pas suivi
```

_(ORM = l'outil qui traduit ton code en requêtes de base de données ;
CI = le robot qui teste et déploie ton code automatiquement à chaque
envoi ; micro-services = découper une grosse app en petites apps qui se
parlent entre elles, plutôt qu'une seule grosse app monolithique.)_

Traduit en clair : le nom des outils change, la nature des problèmes, non.
Un système distribué (plusieurs machines qui bossent ensemble sur une même
tâche) en 2035 aura toujours de la latence, toujours des pannes partielles,
toujours un coût. Peu importe le nom de l'outil qui gère ça à ce moment-là.

### Le vrai test : est-ce que ça survit au changement de langage ?

Les deux repos ont chacun un exercice qui sert à vérifier ça en vrai, pas en
théorie :

- **MyFunnyJS** : après les modules noyaux (01, 03, 08, 09, 13, 17), interdit
  de continuer avant d'avoir réimplémenté le concept clé du module dans un
  AUTRE langage, sans IA, de tête. La règle du fichier est écrite texto :
  _"un concept qui ne survit pas au changement de langage n'est pas un
  concept, c'est une recette liée à un vocabulaire."_
- **ProjectFunny** : le niveau 11, Big App Snoop, te fait entrer dans un
  vrai dépôt open source que t'as pas écrit et cartographier comment il est
  fait. C'est exactement ce qui attend 90% des devs en vrai poste : t'arrives
  presque jamais sur un projet vierge, tu arrives sur un système déjà là,
  avec des décisions que personne t'explique.

Réussir ces deux trucs-là, c'est la vraie preuve : pas juste un sentiment -
que ce que t'as dans la tête tient debout même en dehors de JavaScript, même
en dehors du web tel qu'il existe aujourd'hui.

### Le vrai statut final : ce que ça donne pour un profil Backend • Cloud • AI

Pas "tout apprendre au même niveau de profondeur". Voilà le dosage honnête,
pensé pour un profil qui vise du Full-Stack orienté Backend, Cloud, et
intégration d'IA (utiliser l'IA comme brique dans un vrai produit, pas juste
comme copilote de code), avec un horizon tech lead (le dev qui guide les
choix techniques d'une équipe sans forcément la manager) ou architecte (celui
qui décide comment les gros morceaux d'un système s'assemblent) :

```
┌──────────────────────────────────────────────────────────────┐
│  SOCLE : à maîtriser jusqu'à l'os, sans exception            │
│  (les 13 modules intemporels ci-dessus + leur équivalent PF) │
│                                                              │
│  → Algorithmique et structures de données (pourquoi CE       │
│    choix, pas juste comment l'utiliser)                      │
│  → Event loop (l'ordre dans lequel JS exécute vraiment ton   │
│    code) et concurrence, pas juste la syntaxe async/await    │
│  → Design patterns + refactoring (reconnaître ET réécrire)   │
│  → Gestion d'erreurs et edge cases (NaN, floats, race        │
│    conditions : deux bouts de code qui se marchent           │
│    dessus en même temps et cassent tout, en silence)         │
│  → Couplage, cohésion, découpage d'un système : peu          │
│    importe le nom de la mode d'architecture du moment        │
│  → Communication technique : défendre un choix à l'oral,     │
│    écrire un ADR (un court texte qui explique pourquoi       │
│    t'as choisi telle solution, gardé comme preuve)           │
│                                                              │
│  → TE REND CAPABLE, peu importe la stack ou le langage.      │
│    Ça reste la base de ton métier en 2035. Zéro doute.       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  SPÉCIALISATION : creusée fort, à rafraîchir tous les 3-5 ans│
│  (niveaux ProjectFunny 05→08 + modules MyFunnyJS             │
│  16/21/24/25/26 : ton créneau Backend • Cloud précisément)   │
│                                                              │
│  → Bases de données (le modèle relationnel bouge peu,        │
│    les outils autour, oui)                                   │
│  → Architecture système, contrats d'API, scalabilité         │
│    (tenir la charge quand y'a beaucoup plus                  │
│    d'utilisateurs), observabilité (savoir ce qui se          │
│    passe en prod avant que l'utilisateur s'en plaigne)       │
│                                                              │
│  → TE REND EMPLOYABLE sur ton créneau précis, avec un        │
│    vrai avantage sur les devs qui n'ont fait QUE du frontend.│
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  OUTILLAGE DU MOMENT : à checker tous les 1-2 ans            │
│  (modules 14/15/22/23/29 : le langage précis,                │
│  l'environnement d'exécution, la sécurité du moment,         │
│  et l'IA-native)                                             │
│                                                              │
│  → TypeScript précis, le runtime du moment (Node, Bun,       │
│    ou Deno : les environnements qui font tourner du JS       │
│    hors navigateur), dev assisté par IA et agents IA         │
│    (des programmes qui utilisent l'IA pour agir seuls        │
│    sur plusieurs étapes, pas juste répondre)                 │
│                                                              │
│  → TE REND PERTINENT maintenant. C'est prévu de le           │
│    rafraîchir souvent : c'est pas un échec de "réapprendre". │
└──────────────────────────────────────────────────────────────┘
```

Le fichier career de MyFunnyJS le dit très bien : un dev qui maîtrise
vraiment React + TypeScript vaut plus qu'un dev qui connaît vaguement cinq
frameworks. Et le fichier career-and-craft de ProjectFunny ajoute la pièce
qui manque : la seniorité (le niveau réel d'un dev, au-delà du titre) se
prouve par des preuves écrites : un ADR, un post-mortem (le compte-rendu
écrit après un incident, qui explique la cause réelle et ce qu'on corrige) -
pas par le nombre d'années sur un CV.

Le vrai objectif, c'est donc pas juste "finir les deux curriculums". C'est
sortir avec trois choses en main :

1. **Le socle intemporel gravé dans la tête**, vérifié par les exercices de
   transfert, sans triche, sans IA qui fait le travail à ta place.
2. **La spécialisation Backend/Cloud/AI clairement creusée**, pas juste
   survolée : les niveaux ProjectFunny 05 à 08, les modules MyFunnyJS
   16/21/24/25/26, plus 23/29 pour la partie intégration d'IA.
3. **Un dossier de preuves qui documente comment t'as pensé**, pas juste ce
   que t'as codé : ADR, post-mortems, rapport d'exploration du niveau 11,
   défi de transfert. C'est ça, concrètement, qui fait passer de "dev qui
   code" à quelqu'un qu'on écoute en réunion d'architecture.

En 2035, les frameworks précis que tu utilises aujourd'hui auront
probablement changé deux ou trois fois. Le raisonnement qui t'a fait choisir
PostgreSQL plutôt que MongoDB pour un projet donné, lui, sera encore
exactement le même raisonnement : juste appliqué à d'autres noms d'outils.
C'est cette différence-là qu'il faut viser en apprenant : pas "je sais
utiliser Next.js", mais "je comprends pourquoi cette architecture-là résout
ce problème-là", peu importe comment le framework s'appellera dans 9 ans.

### Ton portfolio final : deux pièces, pas une seule

ProjectFunny le dit lui-même, dans une de ses annexes : un parcours qui produit
un seul projet très profond, même excellent, montre de la rigueur mais aucune
preuve que tu sais t'adapter à autre chose.

Ton dépôt public de fin de parcours doit donc contenir :

1. **Ton projet fil rouge** (celui de ProjectFunny, construit avec les outils
   techniques de MyFunnyJS) : la preuve que tu sais conduire un projet complet,
   du début à la fin.
2. **Ton rapport d'exploration** (niveau 11 de ProjectFunny, sur un code que tu
   n'as pas écrit) : la preuve que tu sais entrer dans l'inconnu sans paniquer.
3. **Ton défi de transfert** (celui de MyFunnyJS, JavaScript vers un autre
   langage) : la preuve que ce que t'as appris tient debout même en dehors de
   JavaScript.

Ces trois pièces réunies, c'est un profil qu'un recruteur peut ouvrir en trois
minutes et qui prouve à la fois ta capacité à réfléchir et ta profondeur
technique. C'est exactement ça, ton vrai profil, une fois les deux curriculums
terminés.

---

```
   ____   ___   _  _  ____ _  _  ____    _     _   _  ____ _  _
  (  _ \ / _ \ ( \( )( ___( )( )( ___)  ( )   ( )_( )( ___( \( )
   )___/( (_) ) )  (  )__) )()(  )__)    )(__(  _  )( )__) )  (
  (__)   \___/ (_)\_)(____)(____)(____)  (____)(_)(_)(____)(_)\_)

  Ce soir, tu ouvres UN seul de ces deux dossiers :
  MyFunnyJS -> 00-SOCLE/04_fundamentals
  OU
  ProjectFunny -> 00-PROLOGUE

  Pas les deux le même soir. Un pas après l'autre. Vas-y.
```
