---
stability: perissable
perishability_id: PER-0117
review_interval: "3 mois"
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_url: https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm
source_type: primary
review_due: "2027-02-03"
source_scope: "BLS Employment Projections 2024–2034 (États-Unis) : data scientists +33,5 %, information security analysts +28,5 %, software developers +15,8 %. Ce sont des projections professionnelles américaines, pas des données mondiales ou malgaches. Le guide contient aussi des liens de marché distincts ; leurs références, dates et limites sont inventoriées dans 06-ANNEXES-TRANSVERSES/84-REGISTRE-SOURCES-V6.5.md. Ces liens ne sont pas couverts par cette seule fiche BLS."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_current » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "BLS_US_2024_2034_OCCUPATION_PROJECTIONS_EXACT_PERCENTAGES_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# 00-GUIDE : Tu ne sais pas quoi faire ? Commence ici.

> **Périmètre suivi :** les données de marché, les projections, les offres d’emploi et les références externes datées. Les données étrangères ou issues d’une plateforme ne décrivent pas automatiquement le marché malgache ; relis les sources et leur périmètre avant toute décision.

> **Contrôle documentaire des références : 3 novembre 2026 :** les projections BLS citées dans la section marché ont été contrôlées sur la source BLS 2024–2034 et ne concernent que les États-Unis. Les autres sources liées dans ce guide sont des enquêtes, analyses de plateformes, rapports ou instantanés distincts : leurs dénominateurs, territoires et dates sont conservés dans le texte et leurs références sont inventoriées dans le [registre des références V6.5](84-REGISTRE-SOURCES-V6.5.md). Une donnée Indeed décrit des annonces Indeed aux États-Unis ; une donnée Upwork décrit sa place de marché ; une enquête Stack Overflow décrit ses répondants ; une projection WEF/BLS n'est pas une promesse individuelle. Les instantanés Asako/Recruteo sont historiques et ne décrivent pas les offres actuellement disponibles. Aucune de ces sources ne permet de calculer une probabilité personnelle d'embauche à Madagascar.

> **Porte d’entrée unique :** commence par [START HERE](../00-SOCLE/01-GETTING-STARTED/01-START_HERE.md). Suis ensuite l’ordre indiqué : Getting Started, Prologue, première passe du Référentiel, puis Route 58. Ce guide est une boussole de référence, pas une étape à terminer avant ton premier exercice. [Formation complète](../FORMATION-COMPLETE-INGENIERIE.md) décrit la destination et les domaines ; ce n’est pas un prérequis de démarrage.

> **Version CrazyDevs**
>
> Ce guide n'est pas Wikipedia avec une cravate.
> C'est une carte de terrain pour quelqu'un qui arrive devant un ordinateur,
> voit 500 technologies, 40 metiers, 200 tutos et pense :
>
> **"Ok... mais je commence par quoi ?"**
>
> Respire. On va remettre les pieces dans le bon ordre.

Première passe de lecture : environ 15–20 minutes pour l’introduction et la section 0 (repères 0.1 à 0.4). Cette estimation n’inclut ni la réalisation du kata de la section 0.5 (20–45 minutes), ni la lecture des sections 1 à 13. La lecture complète du guide est volontairement progressive : reviens aux sections longues après le démarrage ou lorsque la Route 58 te renvoie vers elles. Ce document est une boussole d’orientation, pas un module CORE.

> **Limite des données de marché :** les chiffres cités plus loin proviennent de périmètres différents (enquêtes de répondants, annonces publiées, projections ou données de plateformes). Chaque chiffre conserve son territoire, sa période et sa méthode ; aucun ne permet de déduire directement une probabilité individuelle d’embauche à Madagascar. Les instantanés de job boards sont datés et ne décrivent pas les offres disponibles aujourd’hui.

---

## Sommaire

0. [Tu pars de zero ? Lis ceci d'abord](#af-guide-section-0)
1. [C'est quoi un langage de programmation ?](#1-cest-quoi-un-langage-de-programmation)
2. [Les grands types de langages](#2-les-grands-types-de-langages)
3. [Le paysage des langages en 2026](#3-le-paysage-des-langages-en-2026)
4. [Comment choisir son langage ?](#4-comment-choisir-son-langage)
5. [Debutant : par ou commencer ?](#af-guide-section-5)
6. [J'ai une idée ou un cahier des charges : je fais quoi exactement ?](#af-guide-section-6)
7. [Les vérités qu'on te dira jamais en cours](#af-guide-section-7)
8. [Les métiers du dev : la carte au trésor que personne t'a donnée](#af-guide-section-8)
9. [Le marché, l'argent et le levier remote](#af-guide-section-9)
10. [L'IA, le nouveau mode de travail](#af-guide-section-10)
11. [La trajectoire 2035+](#af-guide-section-11)
12. [Conclusion : maintenant, tu fais quoi ?](#af-guide-section-12)
13. [Sources et entretien du guide](#13-sources-et-entretien-du-guide)

---

<a id="af-guide-section-0"></a>

## 0. Tu pars de zero ? Lis ceci d'abord

Bienvenue.

Tu n'es pas en retard.
Tu n'as pas besoin d'avoir "une logique de genie".
Tu n'as pas besoin de connaitre Linux, Docker, React, Python, Git, AWS et toute la galaxie avant de commencer.

Tu as besoin d'un **premier pas suffisamment petit pour etre termine**.

### 0.1 Le probleme du debutant

Le debutant voit ceci :

```text
JavaScript  Python  Java  C#  Rust  Go  C++
     |         |      |     |     |    |
React     Django   Spring  .NET  Tokio ...
     |         |      |     |     |
Next.js   FastAPI   Kubernetes   AWS   Azure
     |
     +---- Docker
     +---- Git
     +---- SQL
     +---- Redis
     +---- Kafka
     +---- Terraform
     +---- LLM
     +---- Agents
```

Son cerveau dit :

> "Il faut tout apprendre."

Non.

La carte reelle ressemble plutot a ca :

```text
               PROBLEME
                  |
                  v
               CODE
                  |
                  v
             LOGIQUE
                  |
                  v
             SYSTEME
                  |
        +---------+---------+
        |         |         |
      reseau    donnees   machine
        |         |         |
        +---------+---------+
                  |
                  v
             PRODUCTION
       (quand de vrais gens
        utilisent ton logiciel)
                  |
                  v
             DECISIONS
                  |
                  v
             ARCHITECTURE
```

Tu n'apprends pas tout en meme temps.
Tu montes couche par couche.

### 0.2 Ton vrai premier objectif

Pas :

> "Devenir developpeur en 30 jours."

Mais :

> **devenir capable d'apprendre sans etre completement dependant d'un tutoriel.**

Tu dois progressivement savoir faire cette boucle :

```text
Je ne sais pas
     |
     v
Je formule une question
     |
     v
Je cherche
     |
     v
Je teste
     |
     v
Je me trompe
     |
     v
Je debug
     |
     v
Je comprends
     |
     v
Je documente
```

Ca, c'est deja de l'ingenierie.

### 0.3 Le kit de départ : installer au bon moment

Tu peux **lire le parcours et faire les exercices conceptuels sans installation globale**. Pour le premier cycle JavaScript exécutable de Getting Started, prépare seulement :

| Outil                                                 | Quand en as-tu besoin ?                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Un éditeur de texte (VS Code est une option pratique) | Pour créer et modifier le fichier `.js` de `Day One`.                                                                          |
| Un terminal                                           | Dès Getting Started, pour te repérer dans les dossiers et lancer le fichier. Le terminal intégré de VS Code convient aussi.    |
| Node.js                                               | Avant d'exécuter le premier fichier JavaScript ; suis la version et les étapes de `00-SOCLE/01-GETTING-STARTED/02-install.md`. |

**À différer jusqu'à l'activité qui le demande :**

| Outil                                           | Déclencheur d'installation ou d'utilisation                                                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigateur                                      | Lors d'un exercice Web qui demande de tester une page ou une interface. Tu en as probablement déjà un ; aucun réglage spécial n'est requis pour `Day One`. |
| Git local                                       | Juste avant une activité qui demande de suivre les changements ou de produire un historique de commits.                                                    |
| Compte GitHub et dépôt distant                  | Uniquement lorsqu'une activité demande explicitement une collaboration ou une publication distante ; ce n'est pas nécessaire pour le premier exercice.     |
| npm ou un autre gestionnaire de paquets         | Lorsqu'un projet demande d'installer des dépendances ; ne lance pas `install` par réflexe.                                                                 |
| Python, Docker, base de données et outils Cloud | À l'étape dont le `SETUP.md` les déclare nécessaires, pas au démarrage du curriculum.                                                                      |

Le principe est simple : installe un outil quand une activité précise en a besoin, puis vérifie-le avec la commande indiquée par cette activité. Le guide global [`SETUP.md`](../SETUP.md) et le `SETUP.md` local expliquent la priorité des prérequis.

### 0.4 Exemple de progression possible : sans calendrier

> Ce découpage donne des exemples de thèmes qui peuvent arriver successivement. Ce ne sont ni des semaines obligatoires, ni une durée cible, ni une promesse de résultat. La [Route 58](58-ROUTE-APPRENANT-COHERENTE.md) détermine l'ordre réel et les prérequis. Une étape peut prendre plusieurs séances ou être reportée jusqu'à ce que la compétence précédente soit suffisamment comprise.

```text
ÉTAPE A  : premiers mécanismes
variables, conditions, boucles, fonctions, tableaux, objets, console

ÉTAPE B  : consolider les gestes de développement
modules, erreurs, debugging, fichiers, terminal ; Git local lorsque la route le demande

ÉTAPE C  : construire avec des preuves
README, petit projet, tests simples et refactor, après les prérequis correspondants

ÉTAPE D  : terminer et rendre observable
corriger les bugs, documenter et déployer seulement lorsqu'une activité le demande
```

Une petite réalisation terminée à ton rythme vaut mieux qu'une longue liste de tutoriels commencés et abandonnés.

### 0.5 Ton premier kata : pas le fil rouge

> **Statut : kata de démarrage (20–45 minutes), pas projet fil rouge, pas mini-projet certifiant.** Il sert à pratiquer quelques opérations de base. Le fil rouge personnel sera qualifié après le Cadrage. Si un projet existe déjà, ne le détruis pas pour cet exercice.

Prends un probleme ridicule.

Oui, ridicule.

```text
Gestionnaire de taches
----------------------
ajouter
lister
terminer
supprimer
sauvegarder
```

Puis seulement :

```text
v2 -> comptes utilisateurs
v3 -> API (interface permettant a des programmes de communiquer)
v4 -> base de donnees
v5 -> deploiement
v6 -> monitoring (surveillance du systeme)
```

Tu viens de decouvrir la croissance naturelle d'un systeme sans avoir besoin de prononcer "microservices".

### 0.6 Le jour ou tu bloques

Ne fais pas :

```text
bug
 |
 +--> panique
 |
 +--> change de framework
 |
 +--> recommence le projet
 |
 +--> regarde 14 tutos
```

Fais :

```text
BUG
 |
 v
Quel est le comportement attendu ?
 |
 v
Qu'est-ce qui se passe vraiment ?
 |
 v
Ou la difference apparait-elle ?
 |
 v
Quelle hypothese explique cela ?
 |
 v
Comment la tester ?
 |
 v
Correction minimale
 |
 v
Test de non-regression
```

Un **test de non-regression** est un test qui verifie qu'une correction n'a pas casse quelque chose qui marchait deja.

### 0.7 Quand utiliser une IA

Tu peux demander :

```text
"Explique ce concept avec un exemple minimal."
"Donne-moi un exercice sans donner la reponse."
"Voici mon code. Donne-moi des pistes de diagnostic."
"Compare ces deux solutions."
"Qu'est-ce que je dois verifier dans la documentation officielle ?"
```

Evite :

```text
"Construis toute ma carriere."
"Fais tout le projet."
"Dis-moi juste quoi copier."
```

Une IA peut accelerer une personne qui comprend.
Elle peut aussi permettre a une personne perdue de produire beaucoup de code qu'elle ne comprend pas.

### 0.8 Le test "je peux continuer seul"

Tu es pret pour la suite quand tu peux :

```text
lire une documentation
chercher une erreur
utiliser le terminal
faire un commit
expliquer ton code
corriger un bug simple
ecrire un test
finir un petit projet
```

Tu n'as toujours pas besoin de tout connaitre.

Tu dois simplement devenir moins fragile.

### 0.9 Le mode anti-panique

Quand tu ne sais plus quoi apprendre :

```text
OBJECTIF
   |
   v
PROBLEME ACTUEL
   |
   v
COMPETENCE MANQUANTE
   |
   v
UNE seule ressource
   |
   v
UN exercice
   |
   v
UN petit projet
```

Pas dix cours.
Pas quinze frameworks.

Une marche.
Puis la suivante.

## 1. C'est quoi un langage de programmation ?

### L'origine : le vrai début de l'histoire

Avant de parler de Python ou de JavaScript, il faut remonter loin. Très loin. Genre... 1843.

En **1843**, **Ada Lovelace** publie ses notes sur la Machine analytique de **Charles Babbage**. Elles décrivent notamment une suite d'opérations destinée à calculer des nombres de Bernoulli. Cette machine mécanique générale n'a pas été achevée de son vivant. Pour cette raison, Lovelace est souvent présentée comme la première programmeuse : ses notes sont parmi les premières descriptions publiées d'un programme conçu pour une machine programmable. Cette formulation est plus précise que « première programmeuse » prise comme un fait sans nuance.

Le langage **Ada**, conçu bien plus tard pour des systèmes où la fiabilité compte, porte son prénom.

Byron était son père. L'histoire de la programmation commence aussi par un travail d'écriture, de traduction et de raisonnement.

Les langages de haut niveau apparaissent progressivement au milieu du XXe siècle.

En **1949**, **John Mauchly** propose **Short Code**, un interpréteur de notation mathématique ensuite implémenté pour des ordinateurs BINAC puis UNIVAC. C'est l'un des premiers langages de haut niveau effectivement mis en œuvre ; il n'est pas le premier langage lisible de toute l'histoire, car d'autres conceptions, dont Plankalkül de Konrad Zuse, l'ont précédé sur le plan conceptuel.

Puis **FORTRAN**, conçu par l'équipe de **John Backus** chez IBM et diffusé à partir de 1957, devient l'un des premiers langages de haut niveau largement adoptés, notamment pour le calcul scientifique. Il est encore utilisé dans certains domaines spécialisés.

---

### Mais concrètement, un langage c'est quoi ?

Un ordinateur ne comprend qu'une seule chose : des **0 et des 1**. Le binaire. Personne ne code en binaire (enfin, il y a des gens... on va pas en parler).

```
Le mot "Bonjour" en binaire :
01000010 01101111 01101110 01101010 01101111 01110101 01110010
```

Un langage de programmation fournit une notation structurée pour décrire des opérations. Selon le langage et l'environnement, un compilateur, un interpréteur ou une machine virtuelle transforme ou exécute ces instructions. Le résultat n'est pas toujours une traduction directe de chaque ligne en binaire : plusieurs étapes et couches d'exécution peuvent intervenir.

```
Illustration : la chaîne de traduction

 TOI        LANGAGE        MACHINE
 ----        --------       -------
 "affiche      print("Bonjour")  01000010 01101111...
 Bonjour"        |
 (ta pensée)    (ta syntaxe)    (ce que la puce comprend)
```

C'est exactement comme un traducteur lors d'une conférence internationale. Toi tu parles français, la machine parle binaire, et le langage de programmation joue le rôle de l'interprète entre vous deux.

---

### Frise chronologique : de 1843 à 2026

```
1843 -------- Ada Lovelace publie des notes décrivant un programme pour la Machine analytique
1949 -------- Short Code : proposition de Mauchly, puis premiers déploiements sur BINAC/UNIVAC
1957 -------- FORTRAN : diffusion commerciale d'un langage de haut niveau largement adopté
1958 -------- LISP : famille fondatrice des langages fonctionnels symboliques
1959 -------- COBOL : langage conçu pour les traitements de données métier
1972 -------- C : Dennis Ritchie et les débuts d'Unix moderne
1983 -------- C++ : extension de C avec programmation orientée objet
1991 -------- Python : Guido van Rossum publie la première version
1995 -------- Java, JavaScript et PHP apparaissent dans le contexte de l'essor du Web
2009 -------- Go : langage conçu chez Google pour des systèmes et outils réseau
2010 -------- Rust : première annonce publique du projet par Mozilla
2014 -------- Swift : Apple présente un langage moderne pour ses plateformes
2016 -------- TypeScript : Microsoft publie la version 2.0, après ses débuts en 2012
2022+ ------- Zig et Carbon : projets qui explorent d'autres choix pour la programmation système
```

En 1995, Java, JavaScript et PHP sont sortis la même année. Ferrari, Lamborghini et Bugatti le même jour : aucun des trois n'a gagné définitivement, mais chacun a dominé son terrain.

---

### Qui a programmé quoi en premier ?

```
PROGRAMME PUBLIÉ PRÉCOCEMENT : notes d'Ada Lovelace sur la Machine analytique (1843)
LANGAGE DE HAUT NIVEAU IMPLÉMENTÉ TÔT : Short Code, proposé par Mauchly (1949)
LANGAGE DE HAUT NIVEAU LARGEMENT ADOPTÉ : FORTRAN (à partir de 1957)
SCRIPT DE NAVIGATEUR POPULARISÉ : JavaScript, prototype de Brendan Eich (1995)
```

Le premier prototype de JavaScript a été écrit en dix jours en mai 1995, selon son créateur. Le langage s'appelait d'abord Mocha, puis LiveScript, avant de prendre le nom JavaScript. Cette rapidité de prototypage ne résume ni son évolution ultérieure ni la qualité des standards actuels.

---

## 2. Les grands types de langages

Il existe plusieurs façons de classer les langages. Voilà les principales, avec des analogies concrètes pour que ça rentre vraiment.

---

### Bas niveau vs Haut niveau

**Bas niveau** : tu es très proche de la machine. Tu contrôles tout. La mémoire, les registres, les octets. C'est puissant, c'est ultra-rapide. C'est aussi dangereux si tu fais des erreurs.

```
Exemples : Assembleur, C

Analogie :
 Conduire une F1 sans assistance électronique.
 Tu peux aller très vite. Mais si tu rates une courbe, t'es dans le mur.
```

**Haut niveau** : le langage s'occupe de beaucoup de choses à ta place. La mémoire ? Gérée automatiquement. Les types ? Souvent déduits tout seuls. Tu te concentres sur la logique.

```
Exemples : Python, JavaScript, Kotlin, Swift

Analogie :
 Conduire une Tesla avec pilote automatique.
 Tu indiques la destination, la voiture gère le reste.
 Tu peux quand même tout contrôler si tu veux, mais t'as pas besoin.
```

"Bas niveau" et "haut niveau" ne veulent pas dire "mauvais" et "bon" : c'est juste le degré d'abstraction. Les deux ont leur place selon le contexte.

---

### Compilé vs Interprété vs JIT

C'est la question du "comment ton code devient un vrai programme qui tourne".

```
COMPILÉ (ex: C, C++, Rust, Go)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Ton code .c --> Compilateur --> .exe / binaire --> Exécuté
 (lisible)     (traducteur)   (machine pure)    (rapide)

 Avantage   : très rapide à l'exécution
 Inconvénient : tu dois recompiler après chaque modif

INTERPRÉTÉ (ex: Python, Ruby)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Ton code .py --> Interprète --> Exécuté ligne par ligne
 (lisible)     (lit + agit)   (en temps réel)

 Avantage   : flexible, facile à tester
 Inconvénient : un peu plus lent que le compilé

JIT : Just-In-Time (ex: JavaScript V8, Java JVM, Kotlin)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Ton code --> Compilé AU MOMENT où tu l'exécutes --> Exécuté
         (pas avant, pas ligne par ligne)

 Avantage : combine vitesse du compilé + flexibilité de l'interprété
 C'est ce que fait Chrome quand il exécute ton JS
```

> **Analogie pour le JIT :** t'imagines un chef cuisinier qui prend ta commande et cuisine exactement ce dont tu as besoin, juste à temps. Ni trop tôt (gâché), ni trop tard (froid).

---

### Les paradigmes de programmation

Un paradigme, c'est une philosophie. Une façon de penser ton code. Même langage, paradigmes différents = code complètement différent.

**Impératif** : tu dis à la machine COMMENT faire les choses, étape par étape.

```javascript
// Impératif : "voilà comment faire"
let total = 0;
for (let i = 0; i < nombres.length; i++) {
  total = total + nombres[i];
}
```

**Fonctionnel** : tu dis à la machine CE QUE tu veux obtenir. Tu travailles avec des fonctions pures. Pas de modification de variables existantes.

```javascript
// Fonctionnel : "voilà ce que je veux"
const total = nombres.reduce((acc, n) => acc + n, 0);
```

**Orienté Objet (POO)** : tu organises ton code autour d'"objets" qui ont des propriétés et des comportements. C'est la méthode la plus répandue en entreprise.

```python
# POO : les données et les actions sont dans le même endroit
class Voiture:
  def __init__(self, marque, vitesse_max):
    self.marque = marque
    self.vitesse_max = vitesse_max

  def presenter(self):
    print(f"Je suis une {self.marque}, je vais jusqu'à {self.vitesse_max} km/h")

ma_voiture = Voiture("Toyota", 180)
ma_voiture.presenter()
# Sortie : Je suis une Toyota, je vais jusqu'à 180 km/h
```

La plupart des langages modernes supportent plusieurs paradigmes. Python est impératif, fonctionnel et orienté objet selon ce que tu fais : t'as pas à choisir un camp.

---

### Front-end vs Back-end vs Full-stack

```
             L'APPLICATION WEB
     ________________________________________________
     |                        |
     |  FRONT-END          BACK-END    |
     |  (ce que tu vois)       (le moteur)   |
     |                        |
     |  HTML : la structure     Python     |
     |  CSS : le style       Java      |
     |  JS  : les interactions   PHP       |
     |  TS  : JS mais sérieux    Go       |
     |                Rust      |
     |                Node.js (JS)  |
     |                C#       |
     |________________________________________________|
               |
               v
            BASE DE DONNÉES
          (PostgreSQL, MySQL, MongoDB...)
```

**Full-stack** : tu fais les deux. Le dev qui fait le front ET le back.

**JavaScript / TypeScript** fait partie des familles les plus polyvalentes : navigateur et serveur directement, et mobile via des frameworks. Cette polyvalence explique une partie de sa place sur le marché.

**Mobile natif** :

```
iOS   : Swift
Android : Kotlin
```

**Mobile cross-platform** (une seule codebase pour iOS + Android) :

```
Flutter   : Dart (ecosysteme cross-platform soutenu par Google)
React Native : JavaScript / TypeScript (ecosysteme cross-platform etabli)
```

---

## 3. Le paysage des langages en 2026

Il n'existe pas de classement universel qui permette de dire "voici les dix meilleurs langages".

Le bon classement depend de la question :

```text
Question
   |
   +-- Web ?
   |     -> JavaScript / TypeScript
   |
   +-- Backend ?
   |     -> TypeScript / Python / Java / Go / C# / Rust
   |
   +-- Data / AI ?
   |     -> Python est un point d'entree majeur
   |
   +-- Systeme / performance ?
   |     -> C / C++ / Rust / Go selon le probleme
   |
   +-- Android ?
   |     -> Kotlin
   |
   +-- Apple ?
   |     -> Swift
   |
   +-- Mobile cross-platform ?
         -> Flutter / Dart ou React Native / TypeScript
```

### Ce que les donnees permettent de dire

Dans le **Stack Overflow Developer Survey 2026**, JavaScript est cité par 62,0 % des répondants à la question sur les langages utilisés (`n = 14 099`), devant SQL (58,4 %), HTML/CSS (58,2 %) et Python (58,0 %). La question porte sur les langages avec lesquels les répondants ont réalisé un travail de développement approfondi au cours de l’année précédente. Ces résultats décrivent les participants à cette enquête ; ils ne constituent ni un recensement de tous les développeurs ni un classement universel du marché mondial.
Source : [Stack Overflow Developer Survey 2026 : langages, données détaillées](https://survey.stackoverflow.co/2026/technology/data/languages).

Le Web reste structuré autour de JavaScript et TypeScript. TypeScript est aujourd’hui une compétence très pertinente pour les applications web professionnelles, mais il ne faut pas confondre popularité et universalité.

Le vrai principe à retenir est :

```text
LANGAGE
   |
   v
CONCEPTS
   |
   v
OUTILS
   |
   v
SYSTEMES
```

Plus tu montes dans cette pyramide, moins ta valeur depend d'une syntaxe particuliere.

### Une strategie simple pour commencer

```text
JavaScript / TypeScript
        |
        +--> frontend
        |
        +--> backend Node.js
        |
        +--> outils
        |
        +--> APIs
        |
        +--> full-stack
```

Puis :

```text
TypeScript solide
        +
SQL
        +
HTTP / reseau
        +
Git
        +
tests
        +
deploiement
        |
        v
base solide d'ingenierie web
```

Ensuite seulement, ajoute :

```text
cloud
distributed systems
security
observability
AI integration
architecture
```

Cette progression est plus robuste que la course aux frameworks.

## 4. Comment choisir son langage ?

C'est LA question. Et la réponse honnête : ça dépend.

Mais "ça dépend" tout seul c'est inutile. Voilà les vraies questions à se poser, dans l'ordre.

---

### Question 1 : Pour quoi faire ?

Le langage suit le besoin. **Jamais l'inverse.**

```
SI TU VEUX FAIRE...          CHOISIS...
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Un site web (interface)      :  JavaScript / TypeScript
Une API ou un serveur web     :  Node.js, Python, Go, Java, PHP
Une app mobile iOS        :  Swift
Une app mobile Android      :  Kotlin
Une app mobile iOS + Android   :  Flutter (Dart) ou React Native (JS)
Un jeu vidéo           :  C# (Unity) / C++ (Unreal) / GDScript (Godot)
De l'IA ou de la data       :  Python principalement, avec d'autres langages selon le système
Des outils système / performance :  C, C++, Rust
Des scripts d'automatisation   :  Python, Go, Bash
Des applications d'entreprise   :  Java, C#, Kotlin
Du WebAssembly          :  Rust, C++ (calculs lourds -> jeux 3D, physique, photoshop en ligne, figma, etc.)
```

---

### Question 2 : Projet perso ou pro ?

**Projet perso** : fais ce qui te fait vibrer. Si un langage t'ennuie et qu'un autre te donne envie de coder le soir en grignotant des chips, prends celui qui te fait kiffer. La motivation, c'est ton carburant. Tout ce que tu apprends se retransformera plus tard.

> Exemple : Python te gave mais Rust te fait rêver ? Vas-y. Tu vas quand même apprendre des concepts qui te serviront ailleurs. La motivation c'est le turbo pour ton cerveau.

**Projet pro / startup** : mise sur ce qui a la plus grosse communauté, le plus de librairies et de devs autour. Comme ça, si ton projet cartonne, tu pourras recruter ou trouver des solutions rapidement.

> **Astuce :** check les offres d'emploi dans ta ville ou ton pays cible. Ce qui est demandé là, c'est ce que tu dois apprendre pour être un pro du marché.

---

### Question 3 : Maintenant ou long terme ?

```
PROTOTYPER VITE (dans les semaines) : Langage rapide, qui te fait pas chier
                    avec la mémoire ou les compilations.
                    Tu veux voir ton code vivre tout de suite.
                    (Ex: Python, JavaScript)

Systèmes qui durent 10 ans      : Langage solide, énorme communauté,
                    utilisé par des entreprises depuis des
                    décennies, pas de risque qu'il disparaisse.
                    (Ex: Java, C#, Rust)

Performance critique         : Langage qui te laisse contrôler chaque
                    octet. Plus compliqué à gérer, mais plus
                    rapide et précis.
                    (Ex: C, C++, Rust, Go)
```

---

### Question 4 : La communauté est grande comment ?

Plus la communauté est grande, plus tu as :

```
- De la documentation (souvent traduite en français)
- Des librairies et frameworks déjà faits (t'as pas à tout réinventer)
- Des réponses sur Stack Overflow (quelqu'un a eu ton problème avant toi)
- Des offres d'emploi (important quand tu veux bosser)
- Des tutos YouTube gratuits
```

**Repères de taille des écosystèmes en 2026 (indicatifs) :**

```
Très grands écosystèmes : Python, JavaScript, Java
Grands écosystèmes      : TypeScript, C#, C/C++, Rust
Écosystèmes établis     : Go, Kotlin, Swift, PHP
Plus petits mais solides: Ruby, Dart, Scala

Ces repères ne constituent pas un classement mondial strict ; ils servent à éviter
de confondre un instant de popularité avec une garantie de carrière.
```

---

### Conseil anti-paralysie

La "paralysie de l'analyse" c'est quand tu passes 3 semaines à comparer des langages au lieu de coder. C'est l'ennemi numéro 1 des débutants.

```
Tu te demandes : Python ou JavaScript ?
         Flutter ou React Native ?
         Go ou Rust ?

La vraie réponse : CHOISIS ET COMMENCE.
Tu changeras peut-être dans 6 mois. C'est pas grave.
Les concepts que tu apprends dans un langage se transfèrent.
```

---

<a id="af-guide-section-5"></a>

## 5. Debutant : par ou commencer ?

Si tu vises a terme :

> **Staff Engineer / Principal Engineer avec une forte dimension Software Architecture / Solutions Architecture**

ne commence surtout pas par "architecture".

C'est comme apprendre a dessiner les plans d'une maison sans savoir tenir une perceuse.

### 5.1 Le chemin recommande

```text
ETAPE 0
-------
Comprendre un ordinateur
terminal
fichiers
processus
reseau tres simple

        |
        v

ETAPE 1
-------
JavaScript
fondamentaux
debugging
Git
petits projets

        |
        v

ETAPE 2
-------
TypeScript
SQL
HTTP
APIs
backend
tests

        |
        v

ETAPE 3
-------
Full-stack
frontend suffisamment solide
backend plus profond
auth
data
deploiement

        |
        v

ETAPE 4
-------
Systems
reseau
concurrence (plusieurs tâches progressent en même temps)
caches
queues
stockage
performance

        |
        v

ETAPE 5
-------
Cloud
reliability
security
observability
cost

        |
        v

ETAPE 6
-------
Architecture
ADR
trade-offs
capacity planning
migration
design de systemes

        |
        v

ETAPE 7
-------
AI integration
evaluation
agents
verification
permissions
gouvernance

        |
        v

ETAPE 8
-------
Technical leadership
cross-team
mentoring
strategie
Staff / Principal
```

### 5.2 Pourquoi JavaScript / TypeScript ?

Ce n'est pas parce que c'est "le meilleur langage".

C'est parce que pour ton profil cible, il offre une voie pratique vers :

```text
web
   |
   +--> frontend
   +--> backend
   +--> APIs
   +--> outils
   +--> full-stack
```

Tu peux donc apprendre une large partie de l’ingénierie logicielle dans un même langage avant d’élargir ton environnement. Le nombre de changements de langage n’est pas un indicateur de progression.

Puis tu peux apprendre Python, Go, Java, Rust ou autre quand le problème le justifie.

### 5.3 Le principe "un noyau, plusieurs outils"

```text
             TON NOYAU
                 |
      +----------+----------+
      |          |          |
   langage    SQL/HTTP    Git
      |          |          |
      +----------+----------+
                 |
                 v
             SYSTEMES
                 |
       +---------+---------+
       |         |         |
      cloud   security   reliability
       |         |         |
       +---------+---------+
                 |
                 v
            ARCHITECTURE
```

Le langage est une partie de la competence.
Ce n'est pas la competence entiere.

### 5.4 La regle anti-collection

Quand tu vois :

```text
React
Vue
Angular
Svelte
Next.js
Nuxt
Astro
Solid
```

tu n'as pas besoin de tous les apprendre.

Choisis-en un selon ton objectif.
Apprends les concepts qui se transfèrent.
Passe au suivant uniquement quand un vrai besoin apparait.

### 5.5 Ton parcours n'est pas lineaire

Tu vas parfois revenir en arriere :

```text
Architecture
    |
    v
"Pourquoi ca coute si cher ?"
    |
    v
Cloud
    |
    v
"Pourquoi c'est lent ?"
    |
    v
Reseau
    |
    v
"Pourquoi la DB fait ca ?"
    |
    v
Storage / concurrency
```

C'est normal.

Un bon parcours n'est pas un escalier parfait.
C'est une boucle de curiosite de plus en plus profonde.

<a id="af-guide-section-6"></a>

## 6. J'ai une idée ou un cahier des charges : je fais quoi exactement ?

C'est la section la plus importante. Parce que c'est exactement la situation où la majorité des étudiants se perdent. Tu sors de cours, tu sais coder. Et là tu te demandes "mais dans la vraie vie, je fais quoi exactement ?"

---

### Étape 1 : Définir le type de produit

**Avant de choisir un seul outil ou langage**, tu dois savoir ce que tu construis.

Pose-toi ces questions dans l'ordre :

```
1. C'est quoi l'produit ?
  (site web / app mobile / outil interne / jeu / API / script...)

2. Qui va l'utiliser ?
  (grand public / entreprises / toi seul / des développeurs...)

3. Sur quel appareil ?
  (navigateur / téléphone / bureau / serveur / les deux...)

4. Y a-t-il de la donnée à stocker ?
  (oui --> tu as besoin d'une base de données)

5. Faut-il se connecter à des services externes ?
  (tribut, GPS, notifications push, emails, SMS...)

6. Y a-t-il des contraintes légales ?
  (santé, finances, données personnelles --> RGPD, sécurité renforcée)
```

Exemple pratique :

```
Idée : "je veux créer une app pour noter et partager des restaurants"

Réponses :
 1. App mobile + site web
 2. Grand public
 3. Téléphone principalement
 4. Oui : restaurants, avis, utilisateurs, notes
 5. Oui : GPS (maps), photos, notifications
 6. Données personnelles : respecter le RGPD

Conclusion : app mobile (Flutter) + backend API (Node ou Python)
       + base de données (PostgreSQL ou Firebase)
       + service de maps (Google Maps API)
```

---

### Étape 2 : Identifier les contraintes réelles

```
CONTRAINTE          IMPACT SUR LE CHOIX TECH
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
Peu de temps        : Technos que tu connais DÉJÀ.
               Pas le moment d'apprendre Rust.

Budget très limité : compare les offres gratuites ou d'essai, leurs quotas,
               régions, sauvegardes, limites de stockage et conditions de suspension.
               Prévois un scénario de coût dès que les quotas sont dépassés.

Travail en équipe     : Ce que tout le monde dans l'équipe sait déjà.
               Pas le moment d'imposer un langage exotique.

Doit durer longtemps    : vérifie la politique de support, la fréquence des versions,
               l'écosystème et le coût de migration. Un langage ou framework récent
               n'est pas automatiquement fragile ; un outil ancien n'est pas automatiquement maintenu.

Charge importante      : mesure les profils de lecture/écriture, la concurrence,
               la latence et les limites de la base avant de choisir. Go, Node.js,
               PostgreSQL et les bases NoSQL répondent à des contraintes différentes ;
               aucun n'est « plus scalable » sans scénario de charge défini.

Client / projet scolaire  : Choisis ce qui te permet de livrer quelque chose qui MARCHE.
               Un projet simple qui fonctionne est généralement plus utile qu'un
               projet complexe qui plante.
```

---

### Étape 3 : Choisir la stack

Une **stack** c'est l'ensemble des technologies que tu vas utiliser. Front + Back + Base de données + Hébergement.

```
SITE WEB ou APP WEB : stack moderne débutant-intermédiaire suggérée
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Front-end    : Next.js (React + TypeScript)
 Back-end     : Inclus dans Next.js via API routes, ou Supabase directement
 Base de données : PostgreSQL via Supabase
 Auth       : Supabase Auth (Google, GitHub, email/password)
 Hébergement   : Vercel (offre gratuite ou payante selon quotas et usage)
 Style      : Tailwind CSS

 Alternatives front : Vue.js + Nuxt, SvelteKit, Astro
 Alternatives back  : Express.js, FastAPI en Python, NestJS
 Alternatives DB   : MySQL, MongoDB, Firebase Firestore
 Alternatives auth  : Firebase Auth, Auth.js, Clerk
 Alternatives héberg : Netlify, Railway, Render, Firebase Hosting
 Alternatives style : Bootstrap, Shadcn/ui, Chakra UI

 Avantages : écosystème documenté et composants intégrables. Les coûts dépendent des quotas,
              des régions, des sauvegardes, du trafic et des options retenues.

APPLICATION MOBILE : cross-platform
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Langage   : Dart
 Framework  : Flutter
 Backend/Auth : Firebase ou Supabase
 Maps     : Google Maps Flutter Plugin
 Déploiement : Google Play Store + Apple App Store

 Alternatives langage  : JavaScript/TypeScript, Kotlin Multiplatform
 Alternatives framework : React Native, Expo, Ionic
 Alternatives backend  : Appwrite, PocketBase, ton propre serveur
 Alternatives maps    : Mapbox, OpenStreetMap via flutter_map
 Alternatives déploi   : APK direct pour Android, TestFlight pour bêtas iOS

APPLICATION MOBILE : natif Android
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Langage   : Kotlin
 UI      : Jetpack Compose
 Architecture : MVVM + Clean Architecture
 Backend   : Firebase ou API REST

 Alternatives langage : Java, Flutter/Dart si tu veux iOS aussi
 Alternatives UI    : XML Views classique, Flutter Widgets
 Alternatives archi  : MVI, MVP pour les projets plus simples
 Alternatives backend : Supabase, Appwrite, ton propre serveur Express

OUTIL INTERNE ou SCRIPT
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Python + librairies selon le besoin
 (requests pour les APIs, pandas pour la data, etc.)

 Alternatives : Node.js, Bash pour les scripts simples, Go pour la perf

JEU VIDÉO
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 Plupart des cas   : Unity + C#
 Gratuit open source : Godot + GDScript (ou C#)
 AAA / ultra-perf  : Unreal Engine + C++

 Alternatives Godot : Pygame en Python pour débuter
 Alternatives Unreal : CryEngine, custom engine si t'es fou
```

---

### Étape 4 : Ne pas surarchitecturer

C'est **l'erreur classique** de l'étudiant en info. Les étapes ci-dessous illustrent un ordre d'incréments, pas un calendrier : aucune durée ou échéance n'est imposée.

```
SCÉNARIO TYPE :
 Le projet : une application de prise de notes (3 écrans).

 Ce que l'étudiant fait :
  Étape 1 : configure Docker + Docker Compose
  Étape 2 : met en place Kubernetes
  Étape 3 : architecture microservices avec 4 services séparés
  Étape 4 : pipeline CI/CD sur GitHub Actions
  Étape 5 : ... il n'a pas encore une seule note dans l'app

 PROBLÈME : l'étudiant a construit l'infrastructure d'Amazon pour une app de notes.

LA BONNE APPROCHE :
 Étape 1 : l'app de notes fonctionne, on peut créer une note et la lire.
 Étape 2 : on peut modifier et supprimer une note.
 Étape 3 : authentification.
 Étape 4 : déploiement simple sur Vercel.
 Plus tard : ajoute un conteneur lorsque tu as besoin d'un environnement reproductible ou d'une isolation adaptée. Envisage un orchestrateur comme Kubernetes seulement si les contraintes d'exploitation le justifient : plusieurs services à gérer, disponibilité, déploiements progressifs, montée en charge mesurée ou exigences d'équipe. Un nombre d'utilisateurs, à lui seul, ne déclenche pas automatiquement ce choix.
```

> **Image de conteneur** = paquet qui décrit un système de fichiers et ses dépendances, métadonnées et paramètres de démarrage. Elle améliore la reproductibilité, mais ne garantit pas un comportement strictement identique sur tous les hôtes : noyau, architecture, secrets, données, réseau et configuration restent importants. **Docker Compose** décrit et lance plusieurs services associés dans un environnement donné. **Kubernetes** orchestre des charges de travail conteneurisées (déploiement, placement, redémarrage, réseau et mises à l'échelle) ; il ne se résume pas à « gérer des milliers de boîtes Docker » et ajoute un coût opérationnel. **Microservices** = services séparés, conçus pour être déployés et exploités indépendamment ; ce découpage n'est utile que si les frontières et les coûts sont maîtrisés. **CI/CD** = automatisation de certaines étapes d'intégration et de livraison (build, contrôles, publication ou déploiement), souvent avec des approbations et des garde-fous.

> **Règle : commence simple.** Ajoute de la complexité quand le BESOIN apparaît vraiment, pas avant. Un MVP (Minimum Viable Product) c'est la version la plus simple possible qui résout le vrai problème. Tout le reste vient après.

---

### Le schéma de décision complet

```
            TU AS UN PROJET
               |
               v
        Qu'est-ce que tu construis ?
               |
       _______________|_______________
       |        |       |
      WEB       MOBILE     AUTRE
       |        |       |
    interface ?    iOS seul ?  Jeu vidéo ?
       |        |       |
      Oui      --> Swift   Unity + C#
       |        |     Unreal + C++
    Next.js (TS)   Android seul ? Godot + GDScript
    React / Vue      |       |
    SvelteKit     --> Kotlin  Script / Outil ?
               |       |
             Les deux ?  Python + libs
               |       |
             --> Flutter  IA / Data ?
              (Dart)      |
               |     Python SEUL
             _____|_____  PyTorch / TF
            |      | scikit-learn
            API     API
          incluse    séparée
          (Supabase)    |
                Qui fait le back ?
                   |
                ______|______
               |       |
              JS / TS    Python
               |       |
              Node.js    FastAPI
              Express    Django
              Fastify    Flask
               |
               v
            BASE DE DONNÉES ?
               |
          __________|__________
          |           |
     Données relationnelles  Données flexibles
     (tableaux + relations)  (documents JSON)
          |           |
        PostgreSQL       MongoDB
        MySQL         Firebase Firestore
        SQLite (local)
               |
               v
             HÉBERGEMENT ?
               |
          __________|__________
          |     |     |
         Vercel   Railway  Render
        (front /  (back /  (back /
        Next.js)  Node/Py)  Node/Py)
         Paliers d'essai ou gratuits, avec quotas et limites variables
```

---

### Quand utiliser ce qu'on apprend à l'école ?

```
À L'ÉCOLE tu apprends Python.
DANS LA VRAIE VIE tu l'utilises pour :
 Data science, analyse, visualisation
 Scripts d'automatisation
 APIs et backends
 IA et Machine Learning
 Web scraping (extraire automatiquement des données depuis un site web)
 Tests automatisés

À L'ÉCOLE tu apprends JavaScript.
DANS LA VRAIE VIE tu l'utilises pour :
 Tout ce qui s'affiche dans un navigateur (obligatoire)
 Les applications web full-stack (Next.js, Nuxt)
 Les apps mobiles (React Native)
 Le backend avec Node.js
 Les scripts d'automatisation web

À L'ÉCOLE tu apprends Java.
DANS LA VRAIE VIE tu l'utilises pour :
 Les grandes entreprises et banques
 Le backend d'applications critiques
 Android (mais Kotlin le remplace)
 Les systèmes qui doivent tourner 24/7 sans jamais tomber

À L'ÉCOLE tu apprends C ou C++.
DANS LA VRAIE VIE tu l'utilises pour :
 Comprendre comment un ordinateur fonctionne vraiment
 Les logiciels où la performance est critique
 Les jeux vidéo avec Unreal Engine
 Les systèmes embarqués (arduino, robotique)
 Le trading haute fréquence
 Les noyaux de systèmes d'exploitation
```

---

### Exemple concret complet : de l'idée à la stack

**Situation** : tu veux créer une plateforme communautaire pour développeurs. Des profils utilisateurs, des posts, des likes, une messagerie en temps réel.

**Analyse du projet** :

```
Type de produit   : Application web (mobile en version 2 peut-être)
Utilisateurs     : Des développeurs : public averti, ils utilisent un navigateur
Fonctionnalités clés : Auth, profils, posts, likes, messagerie temps réel
Contrainte principale: messagerie en temps réel = besoin de websockets ou subscriptions
Budget        : Zéro (projet perso / scolaire)
Temps        : 3 mois
```

**Exemple de stack possible** (à adapter au besoin, au pays, au budget et aux contraintes de données) :

```
Front-end       : Next.js (TypeScript)
Styles          : Tailwind CSS
Backend         : API Supabase ou service applicatif séparé
Auth            : Supabase Auth ou fournisseur adapté au contexte
Base de données : PostgreSQL
Temps réel      : Supabase Realtime si le besoin le justifie
Hébergement     : Vercel ou autre fournisseur compatible
```

**Pourquoi commencer ainsi ?**

Cette composition réduit le nombre de composants à maintenir pour un produit simple. Les offres gratuites ou d'essai ont des quotas, limites, conditions de conservation et possibilités de suspension qui peuvent évoluer. Avant d'y placer des données réelles, vérifie les conditions, les régions d'hébergement, les sauvegardes, les limites et le coût au-delà des quotas. La capacité à livrer en quelques semaines ou en plusieurs mois dépend du périmètre, de l'expérience, du temps disponible et des contraintes : aucune durée universelle ne peut être promise.

---

<a id="af-guide-section-7"></a>

## 7. Les vérités qu'on te dira jamais en cours

**Vérité 1 : la maîtrise utile compte davantage qu'une collection de mots-clés.**

Pour un objectif donné, une bonne maîtrise d'un langage et d'un écosystème pertinents est généralement plus utile qu'une connaissance superficielle de dix langages. La largeur reste précieuse pour comprendre les frontières entre systèmes, lire du code existant et choisir un outil ; elle complète la profondeur au lieu de s'y opposer.

**Vérité 2 : Les langages ne meurent pas vraiment.**

COBOL de 1959 tourne encore dans les banques en 2026. FORTRAN tourne encore dans les labos scientifiques. Si t'apprends un langage "mort", les concepts que tu apprends restent valides partout. Mais pour le marché de l'emploi, choisis quelque chose de vivant.

**Vérité 3 : Les concepts se transfèrent.**

```
Si tu maîtrises vraiment Python, tu reconnaîtras rapidement dans Go, Kotlin ou Swift des concepts familiers : variables, fonctions, structures de contrôle, composition et gestion des erreurs.

La durée d'adaptation dépend toutefois de ce que tu veux faire. Comprendre la syntaxe de base peut être rapide ; maîtriser les idiomes, le système de types, la concurrence, l'outillage, les conventions et l'écosystème demande davantage de pratique.

Les idées se transfèrent ; les détails d'exécution et les contraintes ne sont pas identiques.
```

**Vérité 4 : La stack ne fait pas tout.**

```
Applications extraordinaires construites avec des technos "basiques" :
 Instagram au début : Python + Django. Simple. Efficace.
 Twitter au début  : Ruby on Rails. Pas très "cool". Mais ça marchait.
 WhatsApp      : Erlang. Un langage de 1986. 2 milliards d'utilisateurs.

Applications catastrophiques construites avec les technos les plus modernes :
 Il y en a plein. On en parle juste moins parce que personne les connaît.

La qualité du code et de l'architecture comptent plus que le choix du langage.
```

**Vérité 5 : Lire du code des autres est aussi important qu'en écrire.**

Passe du temps sur GitHub. Lis des projets open source dans ton domaine. Essaie de comprendre comment les autres ont résolu les mêmes problèmes que toi. C'est comme lire des livres pour un écrivain : indispensable.

**Vérité 6 : Le doute professionnel existe aussi chez les personnes expérimentées.**

Le syndrome de l’imposteur est fréquent, mais il n’est ni universel ni identique pour tout le monde. Des développeurs expérimentés consultent régulièrement la documentation et recherchent des notions qu’ils n’ont pas utilisées depuis longtemps. Personne ne connaît tout par cœur. L’expérience se construit notamment en reconnaissant les problèmes, en sachant où vérifier une information et en évaluant les conséquences d’une solution. Elle ne se résume pas au nombre de fois où une personne a rencontré le même problème.

**Vérité 7 : Les outils changent. Les fondamentaux, non.**

Les frameworks évoluent à des rythmes différents : certains changent fortement, d'autres conservent longtemps leurs concepts centraux. Angular, React, Vue, Svelte et Solid n'ont pas les mêmes conventions ni les mêmes modèles de rendu. Comprendre le DOM, les événements, l'asynchrone et HTTP facilite l'adaptation, mais ne garantit pas une maîtrise en quelques semaines ni une compétence immédiate sur n'importe quel nouvel outil.

> Construis des fondations solides. Le reste vient tout seul.

---

> _Ces informations sont des tendances, pas des chiffres officiels absolus._
> _Les technos évoluent vite : toujours vérifier les sources récentes avant une décision importante._

---

<a id="af-guide-section-8"></a>

## 8. Les métiers du dev : la carte au trésor que personne t'a donnée

> _"J'apprends à coder comme quelqu'un qui vient de découvrir une porte secrète dans un donjon. Je sais qu'il y a des trésors derrière... mais je veux comprendre : Quels sont TOUS les chemins possibles, qui les emprunte, avec quels outils, et lequel me rend riche ou heureux : idéalement les deux ?"_

Ok. T'as appris à coder. Bonne nouvelle : t'as maintenant accès à l'une des industries les plus larges, les plus diverses, et les mieux payées de la planète. Mauvaise nouvelle : Y'a tellement de métiers que la plupart des gens ne savent même pas qu'ils existent.

Ce chapitre, c'est le GPS complet. Pas juste "dev frontend vs backend". Vraiment tout.

---

### La carte complète de l'industrie software

```
          L'INDUSTRIE DU LOGICIEL
  ____________________________________________________________
  |                              |
  | CE QUE LES SHINOBIS VOIENT  CE QUI FAIT TOURNER  |
  | (layer produit)          (layer infrastructure) |
  |                              |
  | Frontend Dev     Backend Dev   DevOps/SRE     |
  | Mobile Dev      Data Engineer  Cloud Engineer   |
  | UI/UX Engineer    API Engineer   Platform Engineer |
  |                              |
  | CE QUI REND INTELLIGENT      CE QUI PROTÈGE TOUT   |
  | (layer intelligence)       (layer sécurité)    |
  |                              |
  | ML Engineer      Data Scientist  Security Engineer |
  | AI Engineer      Research Eng.  Pentest / Red Team |
  |                              |
  | LES PILIERS TRANSVERSES                  |
  |                              |
  | Software Engineer   Full-Stack Dev  Tech Lead     |
  | Software Architect  Engineering Manager  CTO     |
  |____________________________________________________________|
  |                              |
  | SPÉCIALISATIONS SECTORIELLES               |
  | Game Dev | Blockchain Dev | Embedded Systems Dev   |
  | Compiler Engineer | Graphics Engineer | Kernel Dev  |
  |____________________________________________________________|
```

---

### Les métiers du quotidien : ce qu'ils font VRAIMENT

---

#### Frontend Developer

**En une phrase** : il construit tout ce que tu vois et touches dans une interface. Le bouton, la liste, l'animation, le formulaire.

**Une journée type** :

```
09h00 Réunion avec l'équipe design : les maquettes Figma sont prêtes
09h30 Implémentation d'un nouveau composant React (formulaire de connexion)
11h00 Bug : le layout explose sur mobile Samsung Galaxy S22 -> débogage CSS
12h00 Code review : il relit le code d'un collègue, laisse des commentaires
14h00 Intégration d'une API backend : fetch des données utilisateur
16h00 Optimisation : réduction du bundle, lazy loading des images
    (bundle = fichiers JS/CSS regroupés pour que la page charge vite)
17h30 Déploiement sur la branche de staging pour validation
    (dev -> staging -> production : les utilisateurs voient la version finale)
```

**Technologies typiques** :

```
Obligatoire : HTML, CSS, JavaScript, TypeScript
Frameworks  : React, Vue, Angular, Svelte
Outils    : Webpack/Vite, Git, npm/yarn, Chrome DevTools
Tests    : Jest, Vitest, Playwright, Cypress
Styles    : Tailwind CSS, CSS Modules, Styled Components
État global : Redux, Zustand, Pinia, Jotai
```

**Exemple : ce qu'un vrai frontend dev rencontre tous les jours :**

```javascript
// Ce que le designer a livré dans Figma
// "c'est juste un bouton centré, simple"

// Ce que le frontend dev a eu à gérer en vrai
const Button = ({
  label,
  onClick,
  isLoading,
  isDisabled,
  variant,
  size,
  icon,
}) => {
  // 47 lignes plus tard...
  // fonctionne sur Chrome, Firefox, Safari, et le Nokia 3310 du client
  return <button>...</button>;
};
// Le client voit le résultat : "ouais mais il est pas assez rond"
```

**Compétences clés** : maîtrise du DOM et des événements browser, responsive design et accessibilité (WCAG : règles pour rendre ton site utilisable par tout le monde, y compris les personnes handicapées), optimisation des performances (Core Web Vitals : métriques Google pour mesurer la performance ressentie par l'utilisateur), compréhension des API REST et GraphQL, collaboration avec les designers via Figma.

Un bon frontend dev en 2026 comprend le réseau : pourquoi une page charge lentement, ce qu'est un cache HTTP, comment un CDN (réseau de serveurs répartis dans le monde qui stockent des copies de tes fichiers statiques) fonctionne. Sans CDN, un utilisateur à Tokyo télécharge tes images depuis Paris : lent. Avec CDN : depuis Tokyo : rapide. Pas juste "faire joli".

---

#### Backend Developer

**En une phrase** : il construit le moteur. La logique métier, les APIs, les bases de données, la sécurité des données.

**Une journée type** :

```
09h00 Review des logs de prod : y'a eu une erreur 500 à 3h du matin
09h30 Débogage : une requête SQL non optimisée qui bloquait toute la base
11h00 Implémentation d'un nouvel endpoint : POST /api/v2/orders
    (GET = tu lis une page / POST = tu envoies des données, il se passe quelque chose)
13h30 Écriture des tests unitaires pour la logique de tribut
15h00 Discussion architecture : comment gérer 10x plus de requêtes
16h30 Documentation de l'API dans Swagger/OpenAPI
    (outil qui génère automatiquement une documentation interactive de ton API)
17h30 Code review et merge de deux pull requests
```

**Technologies typiques** :

```
Langages     : Node.js (JS/TS), Python, Java, Go, C#, PHP, Rust
Frameworks    : Express, Fastify, FastAPI, Spring Boot, Gin, Laravel
Bases de données : PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
Outils      : Docker, Git, Postman, Swagger
Cloud      : AWS/GCP/Azure (basiques)
```

**Exemple : le quotidien du backend dev :**

```javascript
// Ce que le frontend pense que l'API fait
fetch("/api/user/42");
// -> renvoie les données de l'utilisateur, boom, done

// Ce que le backend dev a réellement écrit
app.get("/api/user/:id", async (req, res) => {
  // vérifie que t'es authentifié
  // vérifie que t'as le droit de voir CET utilisateur (pas juste n'importe lequel)
  // valide le format de l'id, puis le lie comme paramètre SQL (jamais de concaténation)
  // requête DB avec retry si connexion timeout
  // cache le résultat 60s pour pas brûler la base
  // log la requête pour le monitoring (surveiller ton app en temps réel)
  // gère 14 cas d'erreur différents
  // renvoie les données
  // et si c'est vendredi soir : prie pour que rien ne casse le weekend
});
```

**Compétences clés** : conception de bases de données (schémas, indexation, migrations), sécurité (authentification, JWT, OAuth2, HTTPS), design d'API (REST, GraphQL, gRPC), performance et scalabilité, logging et monitoring en production.

---

#### Mobile Developer

**En une phrase** : il construit les apps qu'on passe 4h par jour à utiliser.

Il se subdivise en deux sous-métiers distincts :

```
     NATIF            CROSS-PLATFORM
::::::::::::::::::::::      ::::::::::::::::::::::::
 iOS Dev   Android Dev    Flutter Dev    React Native Dev
 Swift    Kotlin       Dart       JS/TS
 SwiftUI   Jetpack Compose  Flutter      RN Components
 Xcode    Android Studio   Pub packages   npm packages
 TestFlight  Firebase Test Lab Firebase     Firebase
```

**Différences réelles** :

```
CRITÈRE         NATIF       CROSS-PLATFORM
::::::::::::       :::::::      ::::::::::::::::
Performance       Maximale      Très bonne
Accès hardware      Complet      Partiel
Une seule codebase    Non        Oui
Vitesse de dev      Plus lent     Plus rapide
Rendu UI         100% natif     Quasi-natif (Flutter)
Marché emploi      Large       En forte croissance
```

**Une journée type (Flutter Dev)** :

```
09h00 Fix layout : débordement sur petits écrans
10h30 Notifications push avec Firebase Cloud Messaging
12h30 Discussion architecture des states (Bloc vs Riverpod)
14h00 Tests sur appareils physiques et simulateurs
15h30 Optimisation : temps de démarrage de 2s -> 0.8s
17h00 Publication beta sur le Play Store via Fastlane
```

---

#### Full-Stack Developer

**En une phrase** : il peut construire le frontend ET le backend. Pas forcément expert dans les deux : mais opérationnel partout.

```
               FULL-STACK DEV
               ____________
               |      |
             Frontend   Backend
             React/TS   Node.js
             Next.js    PostgreSQL
             Tailwind   Supabase
               |____________|
                  |
          Déploie lui-même sur Vercel + Railway
```

**Exemple : la réalité d'un full-stack dans une startup :**

```javascript
// Lundi : "t'es full-stack non ? Tu peux aussi jeter un oeil au DevOps ?"

// Mardi matin
git commit -m "fix: bug critique en prod qui crashait 50% des utilisateurs"

// Mardi après-midi
git commit -m "feat: nouvelle page d'accueil avec animations"

// Mercredi
git commit -m "fix: j'avais cassé la base de données avec les animations"

// Vendredi
git commit -m "docs: README mis à jour (enfin)"
// -> spoiler : le README n'a jamais été mis à jour
```

Un profil full-stack peut avoir un domaine de prédilection (« main hand ») tout en intervenant des deux côtés. La répartition dépend de l’équipe, du produit et du niveau de responsabilité : une petite structure peut valoriser la polyvalence, tandis qu’une organisation plus grande peut répartir les responsabilités entre spécialistes. Aucun de ces modèles n’est universel et le titre « full-stack » ne garantit pas, à lui seul, une expertise équivalente en frontend et en backend.

---

#### Software Engineer

**En une phrase** : titre généraliste, rôle qui varie énormément selon le contexte.

Dans la Silicon Valley et les grandes tech companies, **Software Engineer** est le titre de base pour tous les devs. Chez Google, Meta, Stripe : tout le monde est "SWE".

Ce qui le distingue d'un simple dev : il pense systèmes et non juste features, il se préoccupe de la maintenabilité à long terme, il connaît les patterns et les structures de données, il fait passer ses solutions à l'échelle.

---

#### DevOps / SRE (Site Reliability Engineer)

**En une phrase** : il s'assure que ce que les devs ont construit tourne en production, que ça scale, et que ça tombe pas.

```
LE MONDE AVANT DEVOPS     LE MONDE AVEC DEVOPS
:::::::::::::::::::      ::::::::::::::::::::
Dev : "mon code marche    Dev + Ops travaillent
 en local, c'est bon"    ensemble depuis le début
Ops : "ton truc plante    Pipeline CI/CD automatisé
 en prod, pas mon      Monitoring en temps réel
 problème"          Infrastructure as Code
 -> les deux se détestent  -> les deux se comprennent
```

**Technologies typiques** :

```
Conteneurs : Docker, Kubernetes, Helm
CI/CD    : GitHub Actions, GitLab CI, Jenkins, CircleCI
Cloud    : AWS, GCP, Azure (expert level)
IaC     : Terraform, Ansible, Pulumi
Monitoring : Prometheus, Grafana, Datadog, PagerDuty
Scripting  : Bash, Python, Go
```

Ce qu'il fait vraiment : écrire les pipelines de déploiement, configurer les serveurs sans les toucher à la main (Infrastructure as Code), répondre aux alertes de production à 3h du matin (rotation d'astreinte, c'est réel), maintenir 99.99% de disponibilité.

> **SRE** est la version formalisée par Google. Même idée, mais avec plus d'ingénierie et moins de "ops" pur.

---

#### Data Engineer

**En une phrase** : il construit les tuyaux par lesquels les données circulent.

```
DONNÉES BRUTES --> DATA ENGINEER --> DONNÉES PROPRES ET ACCESSIBLES
(logs, APIs,     (construit les    (Data Scientists, analystes,
 bases, fichiers)   pipelines ETL)    ML models peuvent travailler)
```

**Technologies typiques** :

```
Langages   : Python, SQL, Scala
Frameworks  : Apache Spark, Apache Kafka, dbt, Airflow
Cloud     : BigQuery, Snowflake, Redshift, AWS S3
Orchestration (coordination de plusieurs tâches, outils ou agents) : Apache Airflow, Prefect, Dagster
```

> Ne pas confondre avec : Data Scientist (qui analyse les données) ou ML Engineer (qui entraîne des modèles). Le Data Engineer construit l'infrastructure qui rend tout ça possible. Il est le plombier : invisible quand tout va bien, indispensable quand les tuyaux fuient.

---

#### Machine Learning / AI Engineer

**En une phrase** : il entraîne, déploie et maintient des modèles d'intelligence artificielle.

```
ML ENGINEER vs DATA SCIENTIST
::::::::::::::::::::::::::::::::::::::::::::::
Data Scientist : explore les données, teste des hypothèses,
          "ça marche sur mon ordi en Jupyter Notebook"

ML Engineer   : prend le modèle et le rend utilisable en production :
          API rapide, scalable, mise à jour auto,
          monitoring du modèle en temps réel
```

**Technologies typiques** :

```
Langages   : Python principalement, avec d’autres langages selon le service et le runtime
Frameworks ML : PyTorch, TensorFlow, JAX, scikit-learn
Serving    : FastAPI, Triton Inference Server, TorchServe
MLOps     : MLflow, Weights & Biases, DVC, Kubeflow
Cloud ML   : SageMaker (AWS), Vertex AI (GCP), Azure ML
LLMs/Agents  : Hugging Face, LangChain, LlamaIndex
```

---

#### Security Engineer

**En une phrase** : il cherche les failles avant que quelqu'un de malveillant les trouve.

```
DÉFENSIVE (Blue Team)     OFFENSIVE (Red Team / Pentester)
:::::::::::::::::::      ::::::::::::::::::::::::::::::::::
Construit des défenses     Attaque les systèmes de l'entreprise
Audit et hardening       Avec autorisation (pour trouver les failles)
SIEM, IDS/IPS         Kali Linux, Metasploit, Burp Suite
Réponse aux incidents     CVE, exploits, social engineering
SOC (Security Operations)   Rapport de vulnérabilités
```

Les profils de securite restent tres recherches dans de nombreux marches. La demande et la remuneration varient fortement selon la specialite, le pays, l'experience et le secteur.

---

### Exemple avec une application : Amorya

Une app de rencontre où les utilisateurs créent un profil, matchent, et discutent. Chaque swipe, chaque message génère des données. Ces données, quelqu'un doit les collecter, les lire, les protéger, et les déployer.

#### Le workflow

```
              AMORYA
          Application mobile et web
               |
         l'utilisateur swipe, matche, envoie des messages
               |
               v
            DEV WEB / MOBILE
        Construit l'app. Chaque action
        est enregistrée en base de données.
               |
       données brutes : swipes, matchs, messages, connexions
               |
               v
            DATA ENGINEER
        Collecte tout ce que l'app produit.
        Nettoie, organise, rend les données utilisables.
               |
          ___________|___________
         |            |
         v            v
      DATA ANALYST      DATA SCIENTIST
     Lit ce qui s'est passé. Prédit ce qui va se passer.
     "Les matchs arrivent    "Ces deux profils ont 87%
     surtout le dimanche."   de compatibilité."
     Rapport pour        Améliore l'algorithme
     l'équipe produit.     de suggestion.
         |            |
         |___________|___________|
               |
               v
            DEV WEB / MOBILE
        Affiche les meilleurs profils en premier.
        Intègre les nouvelles fonctionnalités.
               |
               v
              DEVOPS
        Déploie la mise à jour sans coupure.
        Surveille que les serveurs tiennent.
               |
               v
           SECURITY ENGINEER
          Surveille en permanence.
         Bloque les faux profils, protège
        les données personnelles des utilisateurs.
```

#### Résumé

| Rôle              | Responsabilité                                 |
| ----------------- | ---------------------------------------------- |
| Dev Web / Mobile  | Construit ce que l'utilisateur voit et utilise |
| Data Engineer     | Collecte et prépare les données                |
| Data Analyst      | Explique ce qui s'est passé                    |
| Data Scientist    | Prédit ce qui va se passer                     |
| DevOps            | Déploie et maintient l'app en ligne            |
| Security Engineer | Protège l'app et ses utilisateurs              |

---

### Les rôles d'évolution de carrière

> _"Dans 10 ans, je suis encore en train d'écrire des boucles for dans mon coin ?"_

```
ANNÉE 1-3    ANNÉE 3-6    ANNÉE 6-10    ANNÉE 10+
:::::::::    :::::::::    ::::::::::::   ::::::::::::
Junior Dev -> Mid-Level Dev -> Senior Dev  -> Principal / Staff
                   |
                Tech Lead
                (leadership technique)
                   |
             ____________|______________
            |              |
         Software Architect     Engineering Manager
         (décisions techniques)   (gestion d'équipe)
            |              |
            |___________________________|
                   |
                  CTO
               (directeur technique)
                  ou
              Freelance / Entrepreneur
```

---

#### WORKFLOW avec un exemple : "Meme Mashup Generator"

> _Tu uploads des images ou du texte -> l'app combine tout aléatoirement -> MEME WTF généré._

---

#### Vue d'ensemble

```
             [ SHINOBI ]
                |
          drag & drop image + texte
                |
                v
            [ Next.js Frontend ]
                |
             POST /api/upload
                |
                v
             [ API Route ]
                |
          _____________|______________
         |              |
         v              v
    [ Supabase Storage ]    [ Meme Engine (Node.js) ]
    (stocke l'image uploadée)        |
               _________________|_________________
               |                  |
               v                  v
           [ Supabase DB ]          [ Sharp (lib) ]
           (pioche une phrase        (colle texte +
           WTF aléatoire)          filtre sur image)
               |                  |
               |_________________|_________________|
                        |
                        v
                  [ Meme PNG généré ]
                        |
                 [ Supabase Storage ]
                 (sauvegarde le meme final)
                        |
                     URL publique
                        |
                        v
               [ Frontend -- affiche le meme ]
                        |
                 _____________|_____________
                 |              |
              [ Télécharger ]       [ Partager ]
```

---

#### La stack : exemple d'outils

```
OUTIL       RÔLE DANS LE PROJET           ALTERNATIVE SI CA SCALE
::::::::::::::::  ::::::::::::::::::::::::::::::::::::::: :::::::::::::::::::::::
Next.js      Le site + les routes API, tout en un  Séparer front (React) /
                              back (Express)

Supabase Storage  Stocker les images uploadées et     S3 (Amazon) si tu dépasses
          les memes générés            1GB/mois

Supabase DB    Sauvegarder les phrases WTF,      PlanetScale, Railway, Neon
          l'historique des memes générés

Sharp       Coller le texte sur l'image côté    Canvas API (si tu fais ça
          serveur (rapide, léger)         dans le navigateur)

Vercel       Héberger le projet, déploiement     Railway, Render, VPS perso
          automatique depuis GitHub
```

---

#### Le MEME Engine en détail

```
              [ INPUT ]
                |
          _____________|_____________
         |              |
      Image uploadée       Texte de l'utilisateur
      (photo de chat)      ("moi un lundi")
         |              |
         |____________|______________|
                |
                v
            [ Randomisation ]
                |
         _____________|_____________
         |       |       |
         v       v       v
     flip horizontal filtre random phrase random
     (40% de chance) neon/glitch  depuis Supabase DB
             /flou/sépia  (si texte vide)
         |       |       |
         |_____________|_____________|
                |
                v
          [ Sharp : composition ]
                |
         _____________|_____________
         |       |       |
         v       v       v
     redimensionne  écrit le texte applique
     en 800x600    en blanc +   le filtre
             contour noir  choisi
         |       |       |
         |_____________|_____________|
                |
                v
          [ OUTPUT : meme.png ]
                |
          affichage en < 2 sec
```

---

### Qui fait quoi dans la vraie vie ?

#### Junior Dev _(0-2 ans)_

Il code les pièces simples. Il apprend.

```
CE QU'IL FAIT SUR CE PROJET
-------------------------------------------------------------
- Intègre le composant drag & drop (React Dropzone)
- Appelle l'API /api/generate et affiche le meme retourné
- Connecte le bouton "Télécharger" au lien Supabase Storage

CE QU'ON NE LUI DEMANDE PAS ENCORE
-------------------------------------------------------------
- Concevoir le Meme Engine from scratch
- Choisir entre Supabase Storage et S3
- Gérer la sécurité des uploads (validation MIME, taille max)
```

---

#### Mid-Level Dev _(3-5 ans)_

Il comprend le pourquoi, pas juste le comment.

```
JUNIOR                MID-LEVEL
::::::::::::::::::::::::::      ::::::::::::::::::::::::::::::::
"Comment j'envoie l'image      "Pourquoi on envoie l'image côté
 côté serveur ?"           serveur et pas côté client ?
                    -> parce que Sharp ne tourne pas
                     dans le navigateur, et Canvas
                     est trop lent sur mobile"

"Je copie l'exemple Sharp       "Je lis la doc Sharp pour comprendre
 de la doc"              le pipeline et je choisis les
                    bonnes options"

Résout le bug de l'image       Anticipe que les PNG transparents
 qui s'affiche mal           vont poser problème avec le filtre
                    sépia -> il gère ça avant que ça arrive
```

---

#### Senior Dev _(6-8 ans)_

Il dit **non** quand il le faut.

> _"Non, on ne génère pas le meme à chaque clic de l'utilisateur : si 500 personnes cliquent en même temps, le serveur tombe. On met en place une queue de jobs (Bull + Redis) : les memes se génèrent dans l'ordre, l'utilisateur voit un spinner. Voilà pourquoi, voilà comment."_

```
              CE QU'IL APPORTE SUR CE PROJET
             ::::::::::::::::::::::::::::::::::::
               Design du pipeline complet
              (queue ou génération synchrone ?)
                     |
               ____________|____________
              |             |
           Sécurité uploads       Perf Sharp
         validation MIME stricte,   Sharp recrée son instance
         taille max, rate limiting   à chaque requête -> il
                        l'initialise une seule fois
                        au démarrage
              |             |
              |_________________________|
                     |
                  Code reviews
             repère que le junior oublie de gérer
             les erreurs d'upload (que se passe-t-il
             si Supabase est down ?)
```

---

#### Tech Lead _(Senior qui guide l'équipe)_

Il code encore, mais il passe du temps à débloquer les autres.

```
TECHNIQUE               HUMAIN
:::::::::::::::::::::::::::::     ::::::::::::::::::::::::::::::
Choisit Sharp plutôt que Canvas    Explique au junior pourquoi son
 après avoir testé les deux      composant React re-render 10x

Définit la structure des dossiers   Fait le lien avec le PM :
 (features/, lib/, api/)       "non, le filtre animé GIF est
                    possible mais ça triple le temps
Pose les règles de code review     de génération / on le fait en v2"
 (toute PR doit avoir des tests
 sur le Meme Engine)
```

---

#### Software Architect _(Décisions d'ensemble)_

Il ne code pas le MEME Engine. Il décide comment il s'intègre dans le système.

```
          SES QUESTIONS SUR CE PROJET
     ::::::::::::::::::::::::::::::::::::::::::::::::
      Monolithe ou microservice pour la génération ?
                 |
          _____________|______________
          |              |
        Monolithe Next.js      Microservice séparé
        plus simple à déployer   si le Meme Engine tourne
        sur Vercel, parfait     sur un serveur plus puissant
        pour débuter        (génération intensive = CPU élevé)

      Supabase Storage ou S3 pour stocker les memes ?
                 |
          _____________|______________
          |              |
        Supabase             S3
        intégration simple,       contrôle fin et écosystème large,
        quotas et limites         configuration et coûts à mesurer,
        selon l'offre             frais selon stockage, requêtes et transferts

      Comment éviter que le stockage explose ?
      -> job CRON : les memes non téléchargés depuis 7 jours
       sont supprimés automatiquement
```

> Les microservices : c'est uniquement côté backend/serveur.

---

#### Engineering Manager _(Management, pas code)_

```
CE QU'IL FAIT             CE QU'IL NE FAIT PAS
::::::::::::::::::::::::::::::::    ::::::::::::::::::::::::::::::
S'assure que le junior monte      Choisir entre Sharp et Canvas
 en compétence (1:1 réguliers)
                    Faire du code review
Gère le recrutement si le projet
 grandit               Concevoir le Meme Engine

Protège l'équipe des demandes
 irréalistes ("le meme en 0.1s
 c'est pas possible, voilà pourquoi")
```

---

#### CTO (le boss de la partie tech)

```
STARTUP (projet early-stage)      SI MEME MASHUP DEVIENT VIRAL
:::::::::::::::::::::::::::::     :::::::::::::::::::::::::::::::::
Code encore (il a tout construit)   Code rarement
Choisit la stack initiale       Définit la vision tech à 2 ans
 (Next.js + Supabase + Vercel)     (passer sur S3 ? ouvrir une API
Recrute le premier dev         publique pour les créateurs ?)
Parle aux premiers utilisateurs        Surveille les coûts d'infra
```

---

#### Freelance / Entrepreneur

```
FREELANCE               ENTREPRENEUR (tu construis Meme Mashup)
:::::::::::::::::::::         ::::::::::::::::::::::::::::::::::::::::
Un client te paie pour         Tu construis l'produit, tu vises les
 construire ce type d'app        créateurs de contenu TikTok / Instagram
Tu choisis la stack, tu livres     Tu es dev + PM + support en même temps
Tu factures à l'heure ou au projet   Si ça devient viral -> gros upside
 (tarifs occidentaux depuis      Si ça flop -> t'as quand même appris
  Madagascar, c'est le levier 2026)   Next.js, Supabase et Sharp en vrai
```

---

### Résumé : qui touche à quoi sur ce projet

```
RÔLE        SUR MEME MASHUP GENERATOR
::::::::::::::::  ::::::::::::::::::::::::::::::::::::::::::::::::::
Junior Dev     Composants UI, appels API, bouton télécharger
Mid-Level Dev   Meme Engine, intégration Sharp + Supabase
Senior Dev     Pipeline complet, sécurité uploads, perf, reviews
Tech Lead     Archi des features + mentoring + lien avec le PM
Software Architect Monolithe vs microservice, Supabase vs S3, scalabilité
Eng. Manager    Équipe, recrutement, roadmap, protection des devs
CTO        Stack initiale, vision, si nécessaire premiers commits
Freelance     Livre la feature demandée, seul ou en mission courte
Entrepreneur    Tout. Le produit, les utilisateurs, les coûts, la survie.
```

---

> _"Dans 10 ans, je suis encore en train d'écrire des boucles for dans mon coin ?"_
> Peut-être. Mais si tu sais **pourquoi** tu les écris, **pour qui**, et **quels compromis** tu fais,
> tu n'es plus junior. Tu décides où tu vas.

---

### Les grandes spécialisations : dans quel donjon tu veux aller ?

| Spécialisation    | Difficulté  | Marché    | Salaire   | Tendance      |
| ----------------- | ----------- | --------- | --------- | ------------- |
| Web               | Moyenne     | Mondial   | Bon       | Stable        |
| Mobile            | Moyenne     | Mondial   | Bon       | Hausse        |
| Cloud / DevOps    | Élevée      | Mondial   | Très bon  | Forte hausse  |
| IA / ML           | Très élevée | Mondial   | Excellent | Explosion     |
| Data Engineering  | Élevée      | Mondial   | Très bon  | Forte hausse  |
| Cybersécurité     | Très élevée | Mondial   | Excellent | Explosion     |
| Jeux vidéo        | Élevée      | Concentré | Correct   | Stable        |
| Blockchain        | Élevée      | Volatile  | Bon       | Instable      |
| Systèmes / Kernel | Très élevée | Niche     | Excellent | Stable (rare) |

---

#### Web

Le domaine le plus accessible, le plus vaste, et le plus employant. Des milliers de frameworks. Des millions d'offres dans le monde.

Technologies : HTML, CSS, JS/TS, React, Next.js, Vue, Node.js, PostgreSQL. Ce qui différencie les tops : performance, accessibilité, architecture front, SEO technique. Sous-spécialisations : e-commerce, SaaS, apps temps réel (websockets), PWA (Progressive Web App : une app web qui se comporte comme une app mobile native, sans passer par l'App Store).

---

#### Mobile

La majorité des gens utilisent leur téléphone plus que leur PC. C'est un marché énorme.

Technologies : Flutter/Dart, React Native/JS, Swift, Kotlin. Ce qui différencie les tops : performances natives, animations fluides (60fps), gestion de la batterie, offline-first. En 2026, Flutter reste une option importante pour le cross-platform ; la qualité peut approcher le natif dans de nombreux cas, avec des compromis qui dépendent du produit et de la plateforme.

---

#### Cloud / DevOps

L'infrastructure est devenue un produit software. Plus personne n'achète des serveurs physiques.

Technologies : AWS/GCP/Azure, Kubernetes, Terraform, Docker, CI/CD. Ce qui différencie les tops : comprendre les coûts cloud (ça peut ruiner une startup), la résilience, la sécurité infra. Certifications qui valent quelque chose : AWS Solutions Architect, GCP Professional, CKA (Certified Kubernetes Administrator).

---

#### IA / Machine Learning

Un champ en forte expansion en 2026. La demande est élevée, mais varie fortement selon le niveau, le métier, la géographie et le contexte d'entreprise.

Technologies : Python, PyTorch, TensorFlow, Hugging Face, LangChain. Ce qui différencie les tops : maths (algèbre linéaire, stats, calcul), compréhension théorique des architectures. Les vrais postes ML demandent souvent un Master ou un PhD. Mais les postes "AI Engineer" (qui utilisent des APIs et déploient des modèles existants) sont accessibles sans.

---

#### Cybersécurité

Le marché manque cruellement de profils. Toutes les entreprises ont besoin de sécurité. Peu de gens savent vraiment faire.

Technologies : Kali Linux, Metasploit, Burp Suite, Wireshark, Python, Bash. Ce qui différencie les tops : curiosité maniaque, connaître le système en profondeur (réseau, OS, code bas niveau), éthique. Certifications : CEH, OSCP (difficile mais très valorisée), CISSP, CompTIA Security+.

---

#### Jeux Vidéo

L'industrie qui fait rêver. Mais attention aux réalités.

Technologies : Unity + C#, Unreal Engine + C++, Godot + GDScript/C#. Ce qui différencie les tops : maths 3D (matrices, quaternions, vecteurs), optimisation (chaque milliseconde compte), shaders, physics. Salaires souvent plus bas que dans le web/cloud. Passion obligatoire. Crunch culture dans certains studios. Le jeu indépendant explose : un dev solo avec Unity peut sortir un jeu sur Steam.

---

#### Blockchain

Technologies : Solidity (Ethereum), Rust (Solana), Go. Le marché suit les cycles crypto. En 2021 c'était l'El Dorado. En 2023 ça s'est effondré. En 2024-2026 ça remonte. Risqué comme pari de carrière à long terme.

---

### Comment choisir sa spécialisation intelligemment ?

> _"Si tu entres dans un donjon au hasard, t'as peut-être choisi celui qui donne sur une décharge. Voilà comment choisir le bon couloir."_

```
ÉTAPE 1 : COUPE CE QUI TE DÉPLAÎT VRAIMENT
 Tu détestes les maths poussés ?       -> élimine IA/ML et Systèmes
 Tu veux voir des résultats visuels vite ?  -> garde Web et Mobile
 Tu adores comprendre "comment ça marche" ?  -> Cloud, Sécurité, Systèmes

ÉTAPE 2 : CROISE AVEC LE MARCHÉ LOCAL + REMOTE
 Offres d'emploi dans ta ville ?  -> regarde LinkedIn, Indeed, Upwork
 Travail remote ?         -> Web, Cloud, IA, Mobile = les plus remote-friendly
 Freelance ?            -> Web et Mobile = les plus faciles à vendre

ÉTAPE 3 : ÉVALUE LA DURÉE D'APPRENTISSAGE
 Employable en 6-12 mois ?  -> Web, Mobile
 Employable en 1-2 ans ?   -> Backend fort, DevOps, Data
 Employable en 2-4 ans ?   -> IA/ML, Cybersécurité, Systèmes

ÉTAPE 4 : TESTE AVANT DE T'ENGAGER
 Fais un mini-projet de 2-4 semaines dans chaque spécialisation qui t'attire.
 Laquelle te donnait envie de continuer le soir, même sans obligation ?
 Celle-là, c'est la tienne.
```

---

### Ce qui différencie un dev moyen d'un excellent dev

> _"La plupart des devs savent coder. Les bons devs savent résoudre des problèmes. Les excellents devs savent résoudre les bons problèmes."_

**1. Algorithmique et structures de données**

```
- Savoir utiliser une liste c'est bien. Savoir POURQUOI tu choisis une HashMap
 plutôt qu'une liste dans CE cas précis, c'est autre chose.
- Complexité O(n), O(log n), O(1) : ça devient très concret quand t'as 10 millions
 d'enregistrements et que la requête prend 12 secondes.
```

**2. Clean Code**

```javascript
// Dev moyen : ça marche, personne sait pourquoi, personne ose y toucher
function f(x, y, z) {
  if (z === 1) return x * 1.1;
  if (z === 2) return x * 1.2;
  return x + y;
}

// Dev excellent : ça se lit comme une phrase
const TAX_RATES = {
  reduced: 1.1,
  standard: 1.2,
};

function calculateTotalPrice(basePrice, shippingCost, taxType) {
  // si le type de taxe existe, on l'applique. sinon, on ajoute juste les frais de port.
  const rate = TAX_RATES[taxType];
  return rate ? basePrice * rate : basePrice + shippingCost;
}

// Six mois plus tard, un nouveau dev lit ça et comprend en 10 secondes.
// Avec la version f(x, y, z), il allait pleurer.
```

**3. Design Patterns**

Les patterns sont des solutions documentées à des problèmes récurrents. Savoir quand les appliquer et surtout quand les éviter : te fait passer un cap.

```javascript
// Exemple du pattern Observer : le même principe que les EventListeners
// ou que le state management dans React
class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach((cb) => cb(data));
  }
}

const bus = new EventBus();

bus.on("pizza:titane", ({ saveur }) => {
  console.log(`Le four se prépare pour une pizza ${saveur}`);
});

bus.on("pizza:titane", ({ client }) => {
  console.log(`SMS envoyé à ${client} : votre pizza est en préparation`);
});

bus.emit("pizza:titane", { saveur: "Regina", client: "Bob" });
// -> Le four se prépare pour une pizza Regina
// -> SMS envoyé à Bob : votre pizza est en préparation

// Chaque partie du système réagit sans se connaître. C'est ça le pattern Observer.
```

Les patterns les plus utiles en pratique :

```
Singleton  : une seule instance dans toute l'app (ex: connexion DB)
       "comme le wifi de la maison : y'en a un, tout le monde partage"

Observer  : notifier des objets quand un état change (ex: React re-render)
       "comme un groupe WhatsApp : quelqu'un envoie, tout le monde reçoit"

Factory   : créer des objets sans spécifier leur classe exacte
       "comme un distributeur automatique : t'appuies sur B3, tu sais pas qui l'a fabriqué"

Repository : couche d'abstraction entre logique métier et base de données
       "comme googler quelque chose : t'sais pas où est l'info, tu demandes juste"

Strategy  : changer un algorithme à l'exécution sans modifier le code appelant
       "comme choisir entre Uber et le bus : toi t'as juste dit 'amène-moi là-bas'"

Adapter   : brancher une interface incompatible sur une autre
       "comme un adaptateur jack 3.5 -> USB-C : les deux veulent juste jouer de la musique"
```

#### Anti-patterns classiques

| Anti-pattern                             | C'est quoi                                                                            | Conséquence                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Requêtes séquentielles indépendantes** | Tu lances deux requêtes l'une après l'autre alors qu'elles ont aucun lien             | 200ms au lieu de 100ms. Multiplie par 10M req/jour et pleure                            |
| **God Object**                           | Une classe / un fichier qui fait absolument tout                                      | 3000 lignes, personne n'ose toucher, le fichier a sa propre légende urbaine             |
| **Hardcoding**                           | Des valeurs magiques collées directement dans le code au lieu de variables ou configs | Le client veut changer une valeur. Tu cherches dans 47 fichiers. Tu souffres            |
| **Callback Hell**                        | Des fonctions imbriquées les unes dans les autres à l'infini                          | Code illisible, debugging cauchemardesque, tes collègues te détestent                   |
| **Avaler les erreurs**                   | `catch (e) {}` : l'erreur est capturée et immédiatement ignorée                       | Le bug existe. T'en sais rien. L'utilisateur, lui, il sait. Depuis 3 semaines           |
| **Optimisation prématurée**              | T'optimises pour des problèmes que t'as pas encore                                    | 3 semaines de boulot pour 12 utilisateurs. Le vrai goulot d'étranglement était ailleurs |
| **Copier-coller au lieu d'abstraire**    | Le même bloc de 30 lignes existe en 6 endroits dans le codebase                       | Tu corriges le bug dans 3 endroits. Les 3 autres attendent leur tour patiemment         |
| **Tout mettre dans le front**            | Logique métier, validation, calcul de prix : tout dans le client JS                   | N'importe qui ouvre DevTools, modifie les variables, achète à 0€                        |
| **Ne jamais committer**                  | "Je commit quand c'est fini" : spoiler : c'est jamais fini                            | Le laptop meurt. 3 semaines de travail partent à la poubelle                            |
| **Dépendances circulaires**              | Le module A importe B, B importe A, personne sait qui démarre en premier              | Erreurs cryptiques au runtime, build qui plante sans raison claire                      |

> **Requêtes séquentielles** : faire un `await fetchUser()` puis `await fetchOrders()` alors que les deux peuvent partir en même temps avec `Promise.all` : comme aller chercher ta pizza ET ta boisson en deux voyages alors que t'as deux mains.

> **God Object** : `UserManager.js` qui gère l'auth, les emails, les tributs, les rapports et accessoirement ton karma : comme un employé qui est à la fois caissier, cuisinier, livreur et comptable. Il est partout. Il est nulle part. Il démissionne.

> **Hardcoding** : `if (currency === "EUR")` écrit en dur partout. Le client veut ajouter le dollar, bonne chance : comme tatouer ton numéro de téléphone sur ton front. Tu déménages. Problème.

> **Callback Hell** : `getData(fn(a) { getMore(a, fn(b) { save(b, fn(c) { ... }) }) })` : des poupées russes, mais chaque poupée contient une tâche urgente et une mauvaise surprise.

> **Avaler les erreurs** : un try/catch vide sur un appel API critique. L'appel plante, l'app continue comme si de rien n'était, les données sont corrompues : comme recevoir une lettre d'huissier, la mettre à la poubelle sans lire, et s'étonner que la police débarque.

> **Tout mettre dans le front** : calculer le prix final côté React et envoyer juste le total au serveur sans vérification : comme confier à l'acheteur le soin d'écrire lui-même le prix sur le ticket de caisse.

---

**4. Compréhension des systèmes**

Un excellent dev comprend ce qui se passe au-delà de son code : comment fonctionne le réseau (TCP/IP, HTTP, DNS : ex : une requête fetch passe par DNS pour résoudre le domaine, TCP pour établir la connexion, HTTP pour transporter les données), la mémoire (stack vs heap, garbage collector), le système de fichiers, un OS (processus, threads, signaux), une base de données en dessous (B-trees, ACID : ex : un index sur user_id utilise un B-tree pour trouver la ligne en O(log n) au lieu de scanner toute la table).

> **Livre de référence :** _Designing Data-Intensive Applications_ de Martin Kleppmann. Si t'en lis un seul dans ta carrière, c'est celui-là.

**5. Architecture logicielle : "l'art de prendre des décisions structurelles aujourd'hui pour ne pas les regretter demain"**

```javascript
// Les trois questions d'un dev qui pense architecture

// 1. "Comment ce code va évoluer dans 6 mois ?"
// Si la réponse c'est "on va devoir tout réécrire", c'est un signal.
// (ex: t'as hardcodé la langue en "fr" partout et le client veut l'anglais : bonne chance!)

// 2. "Si cette partie tombe en panne, qu'est-ce qui casse autour ?"
// Un système bien architecturé a des points de défaillance isolés.
// Un système mal architecturé : tout tombe en même temps.
// (ex: le service de notif email plante et somehow le tribut marche plus : classique)

// 3. "Comment un nouveau dev comprend ce système en 30 minutes ?"
// Si t'es le seul à pouvoir expliquer comment ça marche,
// c'est pas de la valeur. C'est un risque.
// (ex: t'es en vacances, ton tel sonne, c'est le CTO : t'aurais dû écrire de la doc)
```

---

### La carrière réaliste sur 10-15 ans

```
Exemple de trajectoire, pas calendrier de promotion : l'expérience, les occasions,
le contexte local et les responsabilités confiées varient fortement.

ANNÉES 1-2 : LE DÉBROUSSAILLAGE
 Tu apprends vite mais tu casses aussi vite.
 Chaque semaine tu découvres que tu ne sais pas quelque chose.
 C'est normal. C'est comme ça pour tout le monde.
 Objectif : livrer de la valeur, apprendre les bases du travail en équipe.
 Erreur classique : vouloir tout apprendre en même temps -> épuisement.

ANNÉES 3-5 : L'AUTONOMIE
 Tu livres sans supervision constante.
 Tu commences à avoir des opinions sur les choix techniques.
 Tu peux concevoir une feature de A à Z.
 Objectif : développer ta spécialité et ta réputation.
 Erreur classique : rester en zone de confort, éviter les projets complexes.

ANNÉES 5-8 : L'IMPACT
 Ton code affecte des équipes entières.
 Tu mentores des juniors (naturellement, pas encore par obligation).
 Tu vois les patterns des projets qui réussissent ou échouent.
 Objectif : choisir entre technique pure (architect/principal) ou leadership.
 Erreur classique : prendre un rôle manager parce que "c'est la promotion normale"
 sans vraiment vouloir gérer des gens.

ANNÉES 8-15 : LA FORCE TRANQUILLE
 Tu n'as plus à prouver que tu sais coder.
 Tu résous des problèmes organisationnels autant que techniques.
 Tu as un réseau solide dans l'industrie.
 Objectif : impact à grande échelle, ou indépendance (freelance/startup).
 Erreur classique : se reposer sur ses lauriers, arrêter d'apprendre.
```

---

### Le tableau de synthèse final

| Famille de rôle                   | Travail caractéristique                                                | Contraintes qui structurent le poste                                             |
| --------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Frontend / expérience utilisateur | Interfaces, état, rendu, accessibilité et performance perçue           | Diversité des appareils, navigateur, usages et qualité de l'expérience           |
| Backend / services                | API, règles métier, données, intégrations et fiabilité                 | Sécurité, cohérence, latence, disponibilité et évolution des contrats            |
| Full-stack                        | Parcours complet du client aux données                                 | Arbitrage entre profondeur technique et largeur de responsabilité                |
| Mobile / client                   | Applications installées, synchronisation et capacités locales          | Plateformes, cycle de publication, réseau intermittent et stockage sécurisé      |
| DevOps / SRE / Platform           | Livraison, exploitation, fiabilité et plateforme interne               | Astreinte, automatisation, incidents, coûts et objectifs de service              |
| Data Engineering                  | Collecte, qualité, transformation et circulation des données           | Volumes, fraîcheur, gouvernance, traçabilité et coûts de calcul                  |
| ML / AI Engineering               | Modèles, données, évaluation et intégration produit                    | Qualité des données, dérive, coût d'inférence, sécurité et mesure du résultat    |
| Sécurité                          | Réduction du risque, architecture de défense et réponse aux incidents  | Menaces, conformité applicable, preuve et arbitrages avec les équipes            |
| Game development                  | Moteur, gameplay, rendu et outils de production                        | Performance temps réel, plateformes, contraintes graphiques et modèle économique |
| Architecture logicielle           | Décisions transversales, frontières, migration et alignement technique | Contexte organisationnel, influence, dette, risque et conséquences à long terme  |

Ces familles ne se classent pas universellement par salaire, facilité d'accès, télétravail ou stabilité. Ces dimensions dépendent notamment du pays, du secteur, de l'expérience, de l'entreprise et du cycle économique ; compare des offres réelles dans le marché visé plutôt que de traiter un adjectif comme une statistique.

---

> Il n'y a pas de "bon" métier dans le développement. Il y a des métiers qui correspondent à ce que tu es. Si t'aimes voir les choses apparaître à l'écran : frontend. Si t'aimes comprendre comment les systèmes fonctionnent : backend ou DevOps. Si t'aimes les maths et l'optimisation : IA/ML. Si t'aimes l'adversaire et le défi : sécurité. Le reste, c'est une question de chemin et de temps.
>
> _"Le meilleur métier dev c'est celui dans lequel tu n'as pas l'impression de travailler... jusqu'au vendredi soir où t'es encore là à déboguer à 23h parce que tu peux pas t'arrêter."_

---

<a id="af-guide-section-9"></a>

## 9. Le marché, l'argent et le levier remote

Le marche 2026 est moins simple que :

> "les devs sont demandes"

ou :

> "l'IA remplace les devs"

Les donnees montrent plutot une **polarisation**.

Le Bureau of Labor Statistics (BLS) publie des projections pour les Etats-Unis sur la période 2024–2034. Il faut distinguer les **professions** des **industries** : on ne mélange pas leurs taux dans un même classement.

**Professions sélectionnées :**

| Profession aux Etats-Unis     | Variation projetée de l'emploi, 2024–2034 |
| ----------------------------- | ----------------------------------------: |
| Data scientists               |                                   +33,5 % |
| Information security analysts |                                   +28,5 % |
| Software developers           |                                   +15,8 % |

Ces pourcentages sont des projections nationales d'emploi, pas des taux d'embauche garantis ni des prévisions mondiales. Le nombre absolu d'emplois et la base de départ comptent également.

**Industries :** le BLS projette séparément une croissance de certaines industries, dont l'infrastructure informatique. Ce taux ne doit pas être présenté comme la croissance d'une profession de développeur.

Sources : [BLS : professions liées à l'IA et aux technologies, 2024–2034](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm) ; [BLS : projections par industrie et profession](https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm).

### 9.1 Le changement le plus important

Selon Indeed Hiring Lab, les **annonces d’emploi** en développement logiciel aux États-Unis ont progressé d’environ 15 % entre le 24 février 2025 (date de référence du lancement de Claude Code) et juin 2026, tandis que l’ensemble des annonces reculait d’environ 7 %. Le point de départ était bas : les annonces de développement logiciel restaient environ 27,5 % sous leur niveau de février 2020. Entre mai 2025 et mai 2026, les postes seniors représentaient 71 % de l’augmentation nette des annonces de développement logiciel, et les postes mentionnant l’IA dans leur intitulé en représentaient 37 %. Ces deux catégories peuvent se recouper.

Il s’agit d’un indice d’annonces américaines, pas d’un décompte d’embauches, d’emplois garantis ou d’une mesure complète de la demande mondiale. La concomitance avec la diffusion des outils agentiques ne démontre pas une causalité.

Source : [Indeed Hiring Lab : AI and Job Postings (8 juillet 2026)](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/).

La lecture intelligente n'est donc pas :

```text
"le software va disparaitre"
```

mais plutot :

```text
travail facile a decrire
        |
        v
plus facile a automatiser
        |
        v
pression sur la valeur

travail complexe
        |
        +-- contexte
        +-- jugement
        +-- architecture
        +-- responsabilite
        +-- communication
        +-- impact business
        |
        v
valeur potentiellement plus defendable
```

### 9.2 Freelance : meme histoire

Upwork annonce en 2026 une hausse de 109 % des compétences explicitement liées à l'IA dans les données de sa propre place de marché. Ce signal décrit les annonces, catégories et missions suivies par Upwork ; il ne mesure pas, à lui seul, l’ensemble du marché mondial de l’emploi.

Le Future Workforce Index 2026 d’Upwork distingue l’exécution de tâches avec l’IA du travail plus complexe augmenté par l’IA. Ces observations portent sur sa place de marché et ne démontrent pas une évolution uniforme des revenus ou des missions dans les autres canaux de recrutement. Upwork emploie l’expression « AI orchestrator » pour désigner un profil qui combine outil, expertise de domaine, workflow, jugement et résultat métier ; il s’agit de sa terminologie, pas d’un titre professionnel universel.

Sources :
https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work
https://www.upwork.com/research/research-future-workforce-index-2026

Un autre rapport d'Upwork décrit la progression, sur sa place de marché, des missions où des humains vérifient ou améliorent des productions générées par IA. Les pourcentages et comparaisons de ce rapport portent sur les offres et missions observées par la plateforme ; ils ne doivent pas être extrapolés à toutes les entreprises ni à tous les pays.

Source : [Upwork Research : AI-generated work is creating more work for humans](https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans).

### 9.3 Ce que cela signifie pour toi

Ne vends pas :

```text
"je sais utiliser un outil"
```

Essaie de construire :

```text
je comprends le probleme
      +
je sais construire
      +
je sais verifier
      +
je sais mesurer
      +
je sais expliquer
      +
je sais ameliorer
```

C'est beaucoup plus resistant a la commoditisation.

### 9.4 Remote : levier, pas magie

Travailler a distance pour une entreprise etrangere peut ouvrir un marche plus large que le marche local.

Mais une affirmation du type :

```text
"remote = salaire x3 a x10"
```

est trop absolue.

La remuneration depend de :

```text
pays de l'employeur
niveau
specialisation
type de contrat
fuseau horaire
langue
droit au travail / statut juridique
impact
secteur
negociation
```

La bonne strategie n'est donc pas :

> "je veux un salaire remote"

mais :

> "je veux devenir exportable."

### 9.5 Exportable depuis Madagascar

Madagascar possede deja un ecosysteme d'emploi numerique et d'externalisation.

Des instantanés de plateformes locales consultés entre août et septembre 2026 montraient des annonces dans les domaines suivants ; ce relevé n'est pas un inventaire actuel ni une mesure exhaustive du marché :

```text
backend
full-stack
data
DevOps / cloud
support
IT management
BPO
design
```

Dans son instantané du 1er septembre 2026, Asako affichait par exemple 13 offres Informatique & Digital, dont CTO remote,
developpeur PHP senior, data, chef de projet IT, DevWebflow et full-stack.

Source :
https://www.asako.mg/emploi/s-informatique-digital

Dans son instantané consulté le 1er novembre 2026, Recruteo affichait également des offres IT à Madagascar dans les domaines web, système/réseau, data et DevOps. Ses annonces et éventuels salaires sont des données de plateforme, pas une statistique nationale.

Source :
https://recruteo.mg/en/secteurs/informatique

La structure economique du pays impose cependant de rester lucide. La Banque mondiale souligne le besoin de
creer davantage d'emplois productifs et identifie le numerique comme l'un des secteurs pouvant soutenir cette evolution.

Source :
https://www.worldbank.org/en/country/madagascar/publication/madagascar-economic-update-bridging-the-productivity-divide

Le gouvernement americain decrit egalement Madagascar comme un marche ou le BPO et les services numeriques peuvent
servir des entreprises internationales.

Source :
https://www.trade.gov/country-commercial-guides/madagascar-digital-economy

La conclusion utile est :

```text
Madagascar
    |
    +-- marche local
    |
    +-- nearshore / offshore
    |
    +-- freelance international
    |
    +-- emploi remote
    |
    v
competences exportables
```

### 9.6 Développer progressivement l'anglais technique

L'anglais technique facilite l'accès aux documentations, aux discussions et aux équipes internationales. **Ce n'est pas un prérequis pour commencer AF**, ni une raison de retarder la programmation. Il se travaille par petites tâches liées à ce que tu étudies déjà ; il ne remplace jamais la compréhension du concept en français.

| Palier                        | Où l'intégrer dans AF                                                | Pratique courte et preuve utile                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Reconnaître le vocabulaire | Dès Getting Started et Fundamentals                                  | Garde un mini-glossaire personnel : terme anglais, explication simple en français, phrase ou ligne de code où tu l'as rencontré. Commence par les mots d'interface, les noms d'outils et les messages d'erreur.                |
| 2. Lire sans tout traduire    | Après les premières notions JavaScript, puis dans Async et Debugging | Lis un court passage de documentation correspondant à une notion déjà étudiée. Repère le but, la condition d'utilisation et une limite ; explique-les avec tes mots en français. Vérifie les termes bloquants, pas chaque mot. |
| 3. Écrire pour être compris   | Dans les exercices, mini-projets et standards de README              | Rédige un résumé court, une étape de reproduction ou une description de changement. La précision compte plus que la sophistication grammaticale ; n'ajoute pas un commentaire à chaque ligne de code.                          |
| 4. Communiquer sur un système | Dans Pilotage, sécurité, observabilité et revues                     | Prépare progressivement un compte-rendu d'incident, une question technique, un ADR ou une revue. Commence par des phrases simples et des faits vérifiables, puis expose les compromis et les limites.                          |

**Routine légère, sans gate :** à la fin d'une séance, choisis un terme rencontré, retrouve sa définition dans le contexte, puis écris une phrase qui explique ce qu'il signifie dans ton exercice. Quand tu es à l'aise, remplace cette phrase par un court résumé en anglais. Deux ou trois répétitions régulières valent mieux qu'une longue session de traduction sans pratique.

Pour signaler un bug, tu peux d'abord t'appuyer sur ce canevas :

```text
Expected behavior: what should happen
Actual behavior: what happened
Steps to reproduce: how to see the problem
Environment: tool and version
Evidence: error message or relevant observation
```

**Comment mesurer le progrès :** tu progresses lorsque tu peux retrouver une information précise dans une documentation, expliquer une instruction ou une erreur, poser une question compréhensible et rédiger un compte-rendu reproductible. La fluidité orale, un niveau CECRL particulier ou la rédaction parfaite ne sont pas des gates du parcours. Pour une décision sensible (sécurité, droit, données, coût), vérifie toujours le texte source et son contexte ; une traduction automatique peut aider à lire, pas remplacer cette vérification.

Cette progression s'appuie sur les activités existantes : [Getting Started](../00-SOCLE/01-GETTING-STARTED/README.md), [Debugging](../01-CADRAGE/03-DEBUGGING/README.md), le [standard de complétude d'un module](69-STANDARD-COMPLETUDE-MODULE.md) et les pratiques de revue du bloc [Leadership & Mentorat](../03-PILOTAGE/11-LEADERSHIP-MENTORAT/README.md). Elle ne crée pas de devoir préalable ni de validation supplémentaire.

### 9.7 Ce qui se vend moins bien a long terme

```text
copie de boilerplate
landing pages generiques
contenu generique
prompt sans domaine
templates non personnalises
taches repetitives faciles a verifier
```

Cela ne signifie pas "plus personne ne paie".

Cela signifie :

> la concurrence par le prix devient plus forte quand la sortie est facilement comparable.

### 9.8 Ce qui devient plus interessant

```text
architecture
backend complexe
cloud
reliability
security
data pipelines
AI integration
AI evaluation
agent supervision
cost optimization
migration
legacy modernization
technical leadership
solutions architecture
```

Le point commun :

```text
PROBLEME AMBIGU
      +
CONTRAINTES
      +
DECISION
      +
EXECUTION
      +
RESPONSABILITE
```

<a id="af-guide-section-10"></a>

## 10. L'IA, le nouveau mode de travail

Il faut commencer par une nuance importante :

```text
outil IA
 !=
agent IA
 !=
organisation organisée autour de systèmes agentiques
```

Une entreprise peut utiliser ChatGPT tous les jours sans avoir une architecture agentique.

### 10.1 Ce que les developpeurs font deja

Le **Stack Overflow Developer Survey 2026**, publié le 6 octobre 2026, décrit les usages déclarés par les personnes ayant répondu à chaque question du sondage. Pour la question sur les outils IA utilisés dans le rôle professionnel (`n = 17 464`) :

```text
83 % utilisent au moins un outil IA
65,9 % utilisent des assistants/agents de codage
62,5 % utilisent des outils conversationnels généralistes
26,2 % utilisent des agents ou workflows automatisés
```

Pour la fréquence d'usage (`n = 14 478`), 73 % des utilisateurs d'assistants/agents de codage déclarent les utiliser quotidiennement. Ce dénominateur est celui de la question de fréquence, pas l'ensemble des répondants au sondage.

Sur l'intégration dans le workflow (`n = 12 637`), les répondants indiquent notamment l'usage actuel de l'IA pour générer du code dans des contextes familiers (69 %) et pour déboguer, diagnostiquer ou refactorer (63,8 %). L'usage actuel pour déployer, exploiter ou dépanner des systèmes de production est plus bas (19,9 %). Les catégories et dénominateurs sont ceux de questions différentes ; ne les additionne pas.

Le signal utile pour AF n'est donc plus « l'IA va-t-elle arriver ? ». Elle est déjà présente dans les pratiques déclarées ; la question d'ingénierie devient : comment cadrer, vérifier, sécuriser, mesurer et exploiter ce travail sans confier le jugement au système ?

Sources : [Stack Overflow Developer Survey 2026 : données IA](https://survey.stackoverflow.co/2026/ai/data) ; [résultats du sondage, 6 octobre 2026](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/).

Le signal est tres important :

```text
ADOPTION
   haute
    |
    v
USAGE
  quotidien
    |
    v
VERIFICATION + CONTEXTE
       necessaires
    |
    v
RESPONSABILITE HUMAINE
```

### 10.2 Les agents ne rendent pas l'expertise inutile

Anthropic a analysé environ 400 000 sessions interactives de Claude Code, issues d’environ 235 000 personnes entre octobre 2025 et avril 2026. L’étude porte sur l’usage de Claude Code via son interface en ligne de commande, Claude.ai ou son application de bureau ; elle décrit cet outil et cet échantillon, pas l’ensemble des développeurs ni toutes les IA.

Le résultat le plus intéressant n'est pas simplement "l'agent code beaucoup".

Dans les sessions typiques :

```text
humain
   |
   +-- decide quoi faire
   |
   v
agent
   |
   +-- decide comment executer
```

Et plus l'utilisateur apporte d'expertise de domaine, plus l'agent peut effectuer de travail par instruction.

Source :
https://www.anthropic.com/research/claude-code-expertise

C’est une idée centrale pour ton parcours :

> **L’IA augmente la puissance de l’ingénieur, mais la qualité du problème, du contexte et de la vérification reste essentielle.**

### 10.3 L'adoption organisationnelle monte vite, le déploiement des agents est plus récent

Le Stanford AI Index 2026 rapporte que 88 % des organisations interrogées déclaraient utiliser l’IA dans au moins une fonction en 2025. Il indique également que le déploiement d’agents restait à un chiffre dans presque toutes les fonctions métier. Ces mesures proviennent d’enquêtes organisationnelles ; elles ne décrivent pas automatiquement toutes les entreprises ni tous les pays.

Source :
https://hai.stanford.edu/ai-index/2026-ai-index-report/economy

Cela implique que :

```text
AI integration
```

est déjà une compétence concrète,

alors que :

```text
large-scale autonomous agent orchestration (coordination de plusieurs tâches, outils ou agents)
```

reste plus experimental.

Ne construis donc pas tout ton parcours autour d'une mode.

Construis autour de mecanismes qui survivront au changement d'outil.

### 10.4 La vraie competence IA

Le schema utile est :

```text
OBJECTIF
   |
   v
CONTEXTE
   |
   v
OUTIL / MODELE
   |
   v
EXECUTION
   |
   v
VERIFICATION
   |
   +-- tests
   +-- docs
   +-- metriques
   +-- revue
   +-- securite
   |
   v
DECISION HUMAINE
   |
   v
PRODUCTION
```

Pas :

```text
prompt
  |
  v
copier-coller
  |
  v
production
```

### 10.5 Les quatre niveaux de maturite

```text
NIVEAU 1
--------
UTILISATEUR
Je demande a l'outil de m'aider.

NIVEAU 2
--------
DEVELOPPEUR AUGMENTE
Je fournis du contexte et je verifie la sortie.

NIVEAU 3
--------
ORCHESTRATEUR
Je divise le travail, donne des outils, definis des controles,
mesure le resultat et fais intervenir l'humain aux bons endroits.

NIVEAU 4
--------
INGENIEUR DE SYSTEME IA
Je conçois les permissions, la securite, l'observabilite,
les evaluations, les couts, les fallbacks et les limites
d'un systeme utilisant des modeles et des agents.
```

ARCHITECTE-FANTOME vise les niveaux 3 et 4, mais seulement apres les fondations.

### 10.6 Ce que l'IA ne doit jamais remplacer dans ton apprentissage

Au debut :

```text
debugger toi-meme
lire la documentation
ecrire du code sans assistant
raisonner sur un bug
expliquer un concept
faire un petit projet seul
```

Une bonne regle :

```text
AI FIRST
  |
  v
je demande la solution
  |
  X
mauvais reflexe pour apprendre

HUMAN FIRST
  |
  v
je forme une hypothese
  |
  v
j'utilise l'IA
  |
  v
je compare
  |
  v
je verifie
```

### 10.7 Ton protocole de verification

Quand un agent genere quelque chose :

```text
1. Lis.
2. Explique avec tes propres mots.
3. Verifie la documentation.
4. Execute.
5. Teste.
6. Cherche un cas qui casse.
7. Inspecte la securite.
8. Mesure si cela compte.
9. Commit seulement apres verification.
```

### 10.8 Mesurer l'effet reel de l'IA

Pour un projet AF, compare :

```text
HUMAIN SEUL
    |
    +-- temps
    +-- erreurs
    +-- qualite

HUMAIN + IA
    |
    +-- temps
    +-- erreurs
    +-- qualite

AGENT
    |
    +-- temps
    +-- cout
    +-- erreurs
    +-- interventions
    +-- qualite
```

Le KPI interessant n'est pas seulement :

```text
"combien de lignes l'agent a produites"
```

mais :

```text
"combien de valeur fiable l'ensemble du systeme a produit,
et quelle part du jugement humain restait indispensable ?"
```

### 10.9 Le danger du "presque juste"

Dans le **Developer Survey 2025** (et non 2026), 66 % des personnes ayant répondu à cette question ont cité les solutions IA « presque correctes, mais pas tout à fait » comme frustration ; 45 % ont aussi signalé que déboguer du code généré par IA prenait davantage de temps. Le dénominateur de la question est de 31 476 répondants. Ce résultat doit rester daté de 2025.

Source : [Stack Overflow Developer Survey 2025 : AI tool frustrations](https://survey.stackoverflow.co/2025/ai/).

Le bon ingenieur n'est donc pas celui qui produit le plus de code avec IA.

C'est celui qui sait detecter rapidement :

```text
plausible
   !=
correct
```

### 10.10 Le travail qui reste humain

Ce qui est relativement plus defendable lorsque le contexte augmente :

```text
quel probleme resoudre ?
quelles contraintes accepter ?
quelle architecture choisir ?
quel risque prendre ?
quel cout accepter ?
quoi securiser ?
quoi mesurer ?
quoi automatiser ?
quand ne pas automatiser ?
qui doit etre convaincu ?
quand faut-il changer de decision ?
```

Ces questions sont au coeur du chemin Staff / Principal.

<a id="af-guide-section-11"></a>

## 11. La trajectoire 2035+

Personne ne peut connaitre les metiers exacts de 2035.

On peut toutefois chercher des competences robustes.

Le WEF 2025 projette que 39 % des competences cles du travail pourraient changer d'ici 2030.
Parmi les competences en hausse figurent AI et big data, reseaux et cybersecurite,
litteratie technologique, pensee analytique, pensee systemique, curiosite et apprentissage
continu, ainsi que leadership et influence sociale.

Sources :
https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/
https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/

### 11.1 Pense en "scenario", pas en prediction

```text
SCENARIO A
L'IA automatise surtout l'execution
        |
        v
le jugement, l'architecture et l'impact montent en valeur

SCENARIO B
L'IA prend beaucoup plus de jugement
        |
        v
les humains se concentrent davantage sur
contexte, responsabilite, produit, gouvernance

SCENARIO C
Le marche ralentit ou se fragmente
        |
        v
les competences transferables et la capacite
a changer de contexte deviennent encore plus importantes
```

Un bon parcours doit survivre aux trois.

### 11.2 Le moat professionnel

Pour 2035+, pense en couches :

```text
                +-------------------------+
                | BUSINESS JUDGMENT       |
                +-------------------------+
                | LEADERSHIP             |
                +-------------------------+
                | ARCHITECTURE            |
                +-------------------------+
                | RELIABILITY + SECURITY  |
                +-------------------------+
                | CLOUD + DATA + AI       |
                +-------------------------+
                | SOFTWARE ENGINEERING     |
                +-------------------------+
                | FUNDAMENTALS             |
                +-------------------------+
```

Les couches du haut ne remplacent pas celles du bas.

Elles s'appuient dessus.

### 11.3 Les competences a relativiser

```text
Connaitre par coeur un framework
Connaitre une syntaxe particuliere
Copier des snippets
Faire des CRUD repetitifs
Ecrire de la documentation generique
Savoir utiliser un outil sans comprendre le systeme
```

Ces competences peuvent rester utiles.

Elles sont simplement plus faciles a remplacer, apprendre ou augmenter.

### 11.4 Les competences a renforcer

```text
modeles mentaux
debugging
system design
architecture
API design
data modeling
distributed systems
security
reliability
observability
cost reasoning
AI evaluation
agent supervision
technical writing
communication
product sense
decision making
mentoring
```

### 11.5 Pourquoi le profil Staff / Principal reste une direction rationnelle

Le role Staff n'est pas protege par magie contre l'IA.

Il est interessant parce qu'il rassemble plusieurs dimensions :

```text
INCERTITUDE
   +
COMPLEXITE
   +
DEPENDANCES
   +
MULTIPLES EQUIPES
   +
COUT
   +
RISQUE
   +
COMMUNICATION
   |
   v
DECISION TECHNIQUE
```

Une IA peut aider sur chaque morceau.

La difficulte vient de la coordination de l'ensemble.

C'est exactement pourquoi ARCHITECTE-FANTOME insiste sur :

```text
ADR
SLO
threat modeling
cost
trade-offs
release / rollback
postmortem
transfer
leadership
review
```

### Un titre final ou une capacité finale ?

Les recherches croisées ne désignent pas un titre universel garanti pour 2035. **Staff Engineer**
est un premier grand jalon de leadership technique ; **Principal Engineer / Software Systems
Architect** est le cap de long terme le plus utile à planifier ; **Distinguished Engineer / Fellow**
reste une étoile du Nord possible, dont l'intitulé exact dépend de l'organisation et d'un impact rare.

Pour AF, ne remplace pas les fondamentaux par une course au titre. Construis une capacité qui reste
utile si l'étiquette change : architecture de systèmes logiciels, systèmes distribués, fiabilité,
sécurité, exploitation, coût, produit et intégration critique de l'IA. Voir la décision détaillée dans
[40 : Noyau dur technique 2035+](40-NOYAU-DUR-STAFF-PRINCIPAL-2035.md).

### 11.6 L'Afrique et 2035+

Le potentiel africain ne doit pas etre transforme en promesse vague.

Un document de travail de la Banque mondiale publié en novembre 2025 cite une **projection de l’IFC datant de 2019** : plus de 230 millions d’emplois en Afrique subsaharienne pourraient nécessiter des compétences numériques d’ici 2030. Ce nombre est une projection ancienne, pas un comptage actuel ni une prévision spécifiquement établie pour Madagascar. Le même document de 2025 apporte une analyse distincte de près de cinq millions d’annonces en ligne, recueillies entre 2020 et 2024 en Afrique du Sud, au Nigeria, au Kenya et en Ouganda ; ses résultats ne doivent pas être extrapolés directement au marché malgache.

Source :
https://documents1.worldbank.org/curated/en/099746512082541920/pdf/IDU-dcae1207-ed6e-4383-9c7f-1f2b2dbae522.pdf

La GSMA estime que les technologies et services mobiles ont contribue pour environ 240 milliards de dollars
a l'economie africaine en 2025 et projette environ 290 milliards en 2030, avec l'IA, les services numeriques
et la connectivite comme moteurs importants.

Source :
https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/Africa/

La consequence pour un profil depuis Madagascar est pragmatique :

```text
BASE LOCALE
   |
   v
COMPETENCES TECHNIQUES TRANSFERABLES
   |
   v
ANGLAIS + ECRIT
   |
   v
GITHUB + PREUVES
   |
   v
EXPERIENCE REELLE
   |
   v
MARCHE INTERNATIONAL
```

Tu n'as pas besoin d'abandonner ton contexte local pour travailler globalement.

Tu dois apprendre a produire une competence qui traverse les frontieres.

### 11.7 La trajectoire recommandee

```text
0. DEBUTANT
   |
   +-- programmation
   +-- terminal
   +-- Git
   +-- debugging
   |
   v
1. SOFTWARE ENGINEER
   |
   +-- TypeScript / backend
   +-- SQL
   +-- HTTP
   +-- APIs
   +-- tests
   |
   v
2. FULL-STACK / BACKEND SOLIDE
   |
   +-- data
   +-- auth
   +-- deployment
   +-- cloud basics
   |
   v
3. SENIOR-TRACK
   |
   +-- systems
   +-- reliability
   +-- security
   +-- ownership
   |
   v
4. ARCHITECT
   |
   +-- trade-offs
   +-- ADR
   +-- cost
   +-- cloud
   +-- product
   |
   v
5. STAFF ENGINEER
   |
   +-- cross-team influence
   +-- technical strategy
   +-- mentoring
   +-- ambiguous problems
   |
   v
6. PRINCIPAL
   |
   +-- organizational scope
   +-- long-term technical direction
   +-- multiple systems / teams
```

Tu ne sautes pas les etapes.

Tu accumules des preuves.

---

<a id="af-guide-section-12"></a>

## 12. Conclusion : maintenant, tu fais quoi ?

Tu viens peut-etre de lire une centaine de pages dans ta tete sans avoir encore ecrit une ligne.

Ce serait ironique.

Alors voici la sortie.

### Si tu pars de zero aujourd'hui

```text
ETAPE 1
Choisis JavaScript.

ETAPE 2
Apprends les fondamentaux.

ETAPE 3
Fais un petit projet.

ETAPE 4
Apprends Git et GitHub.

ETAPE 5
Apprends TypeScript.

ETAPE 6
Apprends HTTP, SQL et les APIs.

ETAPE 7
Construis un backend.

ETAPE 8
Apprends a deployer.

ETAPE 9
Apprends systemes, cloud, security et reliability.

ETAPE 10
Commence ARCHITECTE-FANTOME comme parcours d'ingenierie.
```

Pas besoin de passer 18 mois a preparer le moment ou tu commenceras.

Commence.

### Si tu es deja developpeur

Ne cherche pas automatiquement un nouveau framework.

Regarde tes trous :

```text
Je code bien, mais je ne comprends pas le reseau
    -> reseau / HTTP

Je construis, mais mes systemes cassent
    -> reliability / observability

Je sais deployer, mais je ne comprends pas le cout
    -> cloud / FinOps

Je sais coder, mais mes decisions sont faibles
    -> architecture / ADR / trade-offs

Je sais faire tout cela, mais je reste seul dans ma bulle
    -> communication / mentoring / leadership

Je sais utiliser l'IA, mais je ne sais pas verifier
    -> evaluation / tests / supervision
```

### Si tu vises Staff / Principal

Ton objectif n'est pas :

> "faire le projet le plus complique."

Ton objectif est :

```text
probleme ambigu
    |
    v
questions
    |
    v
options
    |
    v
trade-offs (compromis entre plusieurs objectifs)
    |
    v
decision
    |
    v
implementation
    |
    v
measurement
    |
    v
operation
    |
    v
postmortem
    |
    v
learning
    |
    v
decision suivante
```

C'est cette boucle que tu veux devenir capable de porter a une equipe.

### Le test final CrazyDevs

Devant n'importe quelle technologie, demande :

```text
Qu'est-ce qu'elle resout ?
Pourquoi maintenant ?
Pourquoi elle plutot qu'une autre ?
Quel est son cout ?
Quel est son risque ?
Comment je mesure qu'elle fonctionne ?
Que se passe-t-il si elle tombe ?
Comment je la remplace ?
Qu'est-ce que je peux automatiser ?
Qu'est-ce que je dois absolument verifier moi-meme ?
```

Tu ne deviens pas meilleur parce que tu connais plus de noms.

Tu deviens meilleur parce que tu poses de meilleures questions.

> **C'est ca, le vrai debut de l'ingenierie.**

## 13. Sources et entretien du guide

### Comment lire les sources

Les sources ne servent pas a prouver que "tel metier gagnera forcement".

Elles servent a reduire l'aveuglement.

```text
source primaire
    |
    v
donnee
    |
    v
interpretation
    |
    v
decision prudente
```

Une plateforme de recrutement mesure sa propre plateforme.
Une enquete mesure ses repondants.
Une projection depend de ses hypotheses.
Un rapport d'entreprise a ses propres interets.

Le guide essaie donc de croiser plusieurs angles.

### Marche du travail et competences

**U.S. Bureau of Labor Statistics - 2026**
https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm

**Indeed Hiring Lab - 2026**
https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/

**Upwork - In-Demand Skills 2026**
https://www.upwork.com/research/in-demand-skills-2026

**Upwork - In-Demand Skills press release**
https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work

**Upwork - AI-generated work creating more work for humans**
https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans

**World Economic Forum - Future of Jobs 2025**
https://www.weforum.org/publications/the-future-of-jobs-report-2025/

### IA et travail logiciel

**Stack Overflow Developer Survey 2026 : résultats et données détaillées**
https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/
https://survey.stackoverflow.co/2026/technology/data/languages
https://survey.stackoverflow.co/2026/ai/data

**Stanford AI Index 2026 : Economy**
https://hai.stanford.edu/ai-index/2026-ai-index-report/economy

**Stanford AI Index 2026**
https://hai.stanford.edu/ai-index/2026-ai-index-report

### Afrique et Madagascar

**World Bank - Madagascar**
https://www.worldbank.org/en/country/madagascar

**World Bank - Digital skills / Africa**
https://documents1.worldbank.org/curated/en/099746512082541920/pdf/IDU-dcae1207-ed6e-4383-9c7f-1f2b2dbae522.pdf

**GSMA - Mobile Economy Africa**
https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-economy/Africa/

### Regle de maintenance

Les parties suivantes doivent etre revues regulierement :

```text
salaires
offres d'emploi
frameworks
outils IA
agents
certifications
plateformes
remote
```

Les fondamentaux peuvent vivre beaucoup plus longtemps, mais meme eux doivent etre verifies
lorsqu'une decision importante est prise.

### Derniere regle

> **Si une nouvelle information contredit ce guide, ne protege pas le guide. Verifie l'information.**

Le but n'est pas d'avoir raison en 2026.

Le but est de savoir apprendre en 2026, puis en 2030, puis en 2035+.

---

> **Statut et entretien**
>
> `00-GUIDE` est une boussole de référence ; ce n'est pas une porte d'entrée concurrente. La seule porte d'entrée reste [START HERE](../00-SOCLE/01-GETTING-STARTED/01-START_HERE.md), puis la [Route 58](58-ROUTE-APPRENANT-COHERENTE.md) fait foi pour l'ordre et les prérequis. `FORMATION-COMPLETE-INGENIERIE.md` est une carte de destination, non une lecture préalable.
>
> Les informations de marché, d'emploi, d'outils et de versions sont des instantanés, pas des garanties actuelles. Avant une décision, vérifie la date de publication, le périmètre, le pays concerné et le contexte des sources citées. Les tendances observées sur une plateforme ou dans une enquête ne se généralisent pas automatiquement à tous les employeurs ni à tous les marchés.
>
> Et le titre Staff / Principal se construit dans le monde reel : experience,
> impact, responsabilite, influence et preuves independantes.
