---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Comment utiliser ce curriculum

Temps de lecture ~9 min

## La scène

Léa suit un parcours en ligne sur les architectures distribuées. Elle regarde les vidéos à
1.5x, coche les cases, obtient le certificat. Trois mois plus tard, on lui demande de
concevoir le système de suivi des tournées de livraison d'une PME de messagerie : position
des chauffeurs, replanification en cas de retard, notification client, et elle se rend
compte qu'elle ne sait pas par où commencer. Elle a "suivi" le cours. Elle n'a rien produit
avec. Le certificat existe ; la compétence, non.

Ce curriculum est construit pour que ça ne t'arrive pas, mais seulement si tu respectes trois
règles d'usage. Les ignorer revient à transformer ce contenu en documentation qu'on lit une
fois et qu'on oublie.

## Ce qui se passe vraiment

### Règle 1 : le livrable, pas la lecture

Le contrat local indique les pièces attendues. Lorsqu'un module déclare un `95-challenge.md`
comme preuve de sortie, il te demande un exercice appliqué avec un livrable concret et des
critères de réussite mesurables. Lire les leçons sans réaliser la preuve déclarée, c'est comme
lire un livre de musculation sans soulever de barre : tu comprends l'idée, mais tu ne développes
pas encore la capacité.

La règle est simple et non négociable : **tu ne passes au niveau suivant qu'après avoir produit
les preuves de sortie déclarées par le README local et la Route 58.** Un `96-boss-fight.md`
ajoute une contrainte adverse uniquement lorsque le fichier existe et que le README local
l'annonce. Pas "je pense avoir compris" : un artefact que tu peux montrer, critiquer et tester.

```text
   lire la leçon
        |
        v
   comprendre le modèle mental (tu peux l'expliquer à voix haute, sans notes)
        |
        v
   produire la preuve déclarée localement
        |
        v
   boss-fight supplémentaire ?
        | oui (si le README le déclare)
        v
   contrainte adverse réaliste
        |
        +--------------------+
        | non                 | oui
        v                    v
   vérifier les critères   évaluer l'épreuve
   de sortie locaux        et les critères locaux
        |                    |
        +---------+----------+
                  |
          +-------+-------+
          |               |
        réussi          échec
          |               |
          v               v
     niveau suivant   retour au critère concerné,
                      PAS au début du niveau
```

### Règle 2 : le rythme est déterminé par la compréhension, pas par le calendrier

Il n'y a pas de "un niveau par semaine". Un niveau peut prendre trois jours ou trois semaines
selon ta base. Le signal pour avancer n'est pas "j'ai fini de lire" mais "je peux défendre
chaque réponse de la section _Ce que tu dois savoir défendre_ sans relire la leçon". Si tu
bloques sur une question, c'est que le modèle mental n'est pas encore installé : retourne
lire, pas en diagonale, mais en cherchant spécifiquement la réponse à cette question.

Un rythme réaliste pour un développeur avec 1-3 ans d'expérience travaillant à côté d'un
emploi : 4 à 8 heures par semaine, un niveau toutes les 2 à 4 semaines selon sa densité.
Un développeur avec 5+ ans d'expérience technique mais peu d'habitude de formaliser ses
décisions ira souvent plus vite sur la lecture, et plus lentement sur l'écriture (règle 3
du niveau suivant), parce que le réflexe d'expliciter n'est pas encore automatique.

### Règle 3 : l'auto-évaluation se fait par confrontation, pas par confiance

Tu ne peux pas juger ton livrable en te demandant seulement « est-ce que je suis content de moi ? ».
Les critères obligatoires sont ceux du `README.md` local, du challenge lorsqu'il est déclaré et de la
Route 58 lorsqu'elle associe une preuve ou un gate à cette étape. Un `96-boss-fight.md` ajoute une
mise sous contrainte uniquement lorsque le module le fournit et l'annonce. Un module sans boss séparé
n'est pas incomplet : son challenge, ses checkpoints et ses critères de sortie constituent son contrat.
Si possible, fais relire le livrable par un pair ou un mentor ; à défaut, conserve une auto-revue datée
et ne la présente pas comme une revue externe.

### Ce que "terminer un niveau" signifie réellement

Terminer un niveau, ce n'est pas avoir lu tous les fichiers. C'est avoir :

1. Un modèle mental que tu peux expliquer à quelqu'un d'autre en moins de cinq minutes sans
   support.
2. Un livrable concret, versionné quelque part (dépôt git, document daté), que tu peux
   montrer dans six mois pour te souvenir de ce que tu as compris à ce moment-là.
3. Une trace écrite d'au moins une décision que tu as prise et que tu pourrais défendre en
   entretien technique.

### Comment traiter un échec à une preuve de sortie

Un échec à une preuve de sortie n'est pas un retour à la case départ du module. C'est un signal précis :
la grille ou les critères locaux indiquent ce qui manque et quelle ressource revisiter. Si le module
prévoit un `96-boss-fight.md`, corrige le critère en échec puis rejoue l'épreuve selon son contrat.
S'il n'en prévoit pas, reprends le challenge, le checkpoint ou la partie du livrable qui couvre le
critère manquant ; ne crée pas un boss fictif.

```text
   preuve de sortie non validée
        |
        v
   quel critère précis manque ?
        |
        v
   quelle ressource ou prérequis le couvre ?
        |
        v
   corriger cette partie du livrable
        |
        v
   rejouer la vérification déclarée par le README local
```

### Ce que tu perds si tu lis en diagonale

Un lecteur qui saute les blocs ```text et les exemples chiffrés perd la moitié du contenu :
la prose donne le principe, le diagramme et l'exemple donnent le mécanisme. Un curriculum qui
ne fournirait que la prose produirait exactement le même effet que le certificat de Léa :
une compréhension qui sonne juste à l'oral et qui s'effondre devant un cas concret.

### Contre-exemple : suivre à la lettre sans jamais lever la tête

L'excès inverse existe aussi. Un lecteur qui refuse d'avancer tant qu'il n'a pas une réponse
parfaite à chaque question de "Ce que tu dois savoir défendre", en boucle sur la même leçon
pendant des semaines sans jamais tenter le challenge, tombe dans un piège symétrique : la
paralysie par perfectionnisme. Le critère de passage n'est pas "je maîtrise à 100 %", c'est
"je peux répondre sans relire, même si ma réponse n'est pas parfaite, et le challenge me
donnera un retour concret sur ce qui manque encore".

```text
   Trop vite : lire en diagonale, sauter les preuves déclarées
        --> illusion de compétence, qui cède au premier cas concret

   Trop lent : relire indéfiniment sans jamais produire de livrable
        --> aucune confrontation réelle, le modèle mental reste théorique

   Le bon rythme : lire, répondre aux 3 questions à l'oral,
   produire le livrable, se faire corriger par la grille
```

### Un exemple chiffré : volontairement illustratif

Les chiffres ci-dessous ne constituent pas une étude ni une mesure du dépôt. Ils servent uniquement
à rendre visible l'écart entre lecture et pratique : imagine deux parcours avec un temps de lecture
comparable, mais l'un saute la majorité des exercices alors que l'autre produit systématiquement le
preuves déclarées et, lorsqu'il existe dans le contrat local, affronte le boss-fight. Le second
accumulera davantage de retours observables et de preuves de décision parce qu'il aura davantage
de situations à résoudre et à réviser.

### Ce que veulent dire les numéros de fichiers

Les préfixes donnent des conventions de lecture, pas un squelette obligatoire identique pour chaque
module. Le `README.md` local énumère les pièces réellement présentes, leur rôle et les critères de
sortie. Une pièce absente n'est un défaut que si le contrat canonique du module la déclare obligatoire.

| Préfixe                | Rôle habituel                               | Règle d'utilisation                                                                             |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `00-PREREQUIS.md`      | Vérification des prérequis annoncés         | Suivre uniquement les dépendances déclarées par le module et la Route 58.                       |
| `00_why_*.md`          | Pourquoi le module mérite du temps          | Lire avant les leçons lorsqu'il existe.                                                         |
| `01`, `02`, `03`…      | Leçons                                      | Respecter l'ordre indiqué par le README local.                                                  |
| `90-grimoire.md`       | Rappel dense                                | Réviser après l'apprentissage et la pratique.                                                   |
| `95-challenge.md`      | Application intégrée                        | Obligatoire lorsque le README local le déclare comme preuve de sortie.                          |
| `96-boss-fight.md`     | Mise sous contrainte supplémentaire         | Obligatoire uniquement si le fichier existe et que le README local l'annonce.                   |
| `99-PORTAGE-MENTAL.md` | Transfert vers un autre langage ou contexte | Utiliser selon le contrat du module.                                                            |
| `99A-PONT.md`          | Transition ou pont conceptuel               | Obligatoire uniquement lorsqu'une route ou un README le déclare ; certains ponts sont différés. |

Le `README.md` de chaque module est la source de vérité pour les pièces et critères locaux. La Route 58
est la source de vérité pour l'ordre opérationnel et les dépendances transversales. Le standard 69
fixe les exigences de qualité communes, sans imposer un fichier qui n'est pas pertinent pour le module.

### Cas particulier : un module qui n'est pas un bloc à finir d'un coup

Un seul module échappe à la lecture strictement linéaire :
`02-CONSTRUCTION/02-MINI-PROJECTS`. Sa position dans l'arborescence (juste après
`01-USER-WIZARD`) ne veut pas dire "termine les 19 projets avant de passer à
`03-TESTING`" : les projets sont numérotés par ambition croissante et **s'étalent sur
tout le parcours**, jusqu'à `05-MAITRISE`. Le détail des cinq vagues (quel projet après
quel niveau) est dans le
[README du module](../../02-CONSTRUCTION/02-MINI-PROJECTS/README.md#ordre-pédagogique).
Si tu ouvres ce dossier tôt et t'arrêtes au projet 5 avant de continuer le fil normal,
c'est le comportement attendu, pas un signe que tu as sauté quelque chose.

## Compromis

| Option                                                         | Coût                               | Bénéfice                                                                | Quand choisir                                                                     |
| -------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Suivre le curriculum linéairement, niveau par niveau           | Plus lent, exige de la discipline  | Modèle mental cumulatif solide, chaque niveau s'appuie sur le précédent | Par défaut : c'est la conception du parcours                                      |
| Piocher les niveaux qui t'intéressent selon un besoin immédiat | Rapide pour combler un trou précis | Modèle mental fragmenté, angles morts sur les fondations                | Quand tu as déjà un modèle mental solide ailleurs et un besoin ponctuel documenté |

## Diagnostic de départ : 10 questions non bloquantes

Ce diagnostic sert à repérer les notions à renforcer ; il ne filtre pas l'accès au curriculum et ne
remplace aucun prérequis déclaré par un module. Si tu débutes de zéro, commence par Getting Started,
puis suis la séquence du Socle. Une réponse manquante signifie « à apprendre ou à réviser », jamais
« interdit d'entrer ».

Réponds sans chercher, puis marque chaque item `ACQUIS`, `À RENFORCER` ou `NON VU`.

| #   | Question                                                                                 | Notion à repérer                   |
| --- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| 1   | Écris une fonction qui prend une liste de nombres et rend la moyenne, sans bibliothèque. | Fonction, boucle, retour.          |
| 2   | Que vaut `x` après `let x = "3" + 1`, et pourquoi ?                                      | Types et conversions.              |
| 3   | Dans `{"user":{"id":7,"tags":["a","b"]}}`, comment accéder à `"b"` ?                     | Structures imbriquées.             |
| 4   | Écris un `SELECT` qui joint `commande` et `client` et filtre les commandes de 2026.      | SQL `JOIN` et `WHERE`.             |
| 5   | Quelle différence de sémantique entre `GET` et `POST` ?                                  | HTTP et effets de bord.            |
| 6   | Que fait `git commit` que `git add` ne fait pas ?                                        | Index et historique Git.           |
| 7   | Ton programme affiche « undefined is not a function ». Quelle est ta première démarche ? | Lecture de l'erreur et diagnostic. |
| 8   | Écris une condition « majeur ET email validé ».                                          | Logique booléenne.                 |
| 9   | Que fait une boucle qui parcourt une liste vide ?                                        | Cas limite.                        |
| 10  | Depuis un terminal, place-toi dans un dossier et liste ses fichiers.                     | Navigation shell.                  |

### Interpréter le résultat

- **Majorité `ACQUIS` :** poursuis la route normale et conserve tes réponses comme point de départ.
- **Plusieurs `À RENFORCER` :** ajoute une séance ciblée sur les modules du Socle qui couvrent ces notions ; refais les exercices après les leçons correspondantes.
- **Majorité `NON VU` ou début absolu :** suis intégralement Getting Started, Prologue, Référentiel, Fundamentals et Problem Solving. Le Socle est précisément là pour construire ces bases progressivement.

Il n'existe **aucun seuil éliminatoire**, aucune note minimale et aucune obligation de suivre un cours extérieur avant l'entrée. Une formation externe peut aider, mais elle reste facultative. Seuls les prérequis explicites d'un module ou d'un projet peuvent retarder cette étape précise ; ils ne bloquent pas l'accès au curriculum entier.

Écris la date et les statuts dans ton journal pour comparer tes progrès plus tard. Ce diagnostic n'est ni un examen de certification ni une preuve de compétence.

## Reprendre après une pause longue

Le corpus complet peut s’étaler sur plusieurs mois selon le rythme, les interruptions et la profondeur choisie. La route CORE intensive est, elle, fixée à 16 semaines / 192 h ; cette durée ne prétend pas convertir une année d’expérience réelle en quatre mois. Tu peux interrompre ton parcours, même pendant plusieurs semaines : cela ne signifie ni échec ni perte de tout ce que tu as appris. Le vrai risque est de reprendre sans repère, de relire depuis le début, de te lasser et d'abandonner. Utilise le protocole ci-dessous pour retrouver ton dernier point maîtrisé et reprendre progressivement.

Protocole de reprise, dans cet ordre, 90 minutes maximum :

1. **Relis le grimoire du dernier niveau terminé.** Pas la leçon, le grimoire : il est fait
   pour ça. Coche mentalement chaque ligne que tu peux encore défendre à l'oral.
2. **Compte tes trous.** Trois lignes ou plus indéfendables : refais le `95-challenge.md` de ce
   niveau, pas les leçons. Moins de trois : tu continues.
3. **Relis ton dernier livrable en entier**, avec ta grille de lecture d'aujourd'hui. Note en
   trois puces ce que tu ferais différemment. C'est gratuit et c'est le meilleur signal de
   progression que tu obtiendras jamais.
4. **Refais l'auto-test d'entrée du niveau suivant** (en tête de son `README.md`). Échec :
   retour au grimoire du niveau amont cité dans « Ce niveau réutilise ».
5. **Redate ton plan.** Réécris la date de fin visée dans ton journal, à partir d'aujourd'hui
   et de ton rythme réel constaté, pas de celui que tu espérais.

Règle dure : après une pause, tu ne recommences **jamais** un module déjà validé par sa preuve de
sortie déclarée. Tu relis son grimoire, puis tu rejoues uniquement le contrôle que le README local
prévoit si ton rappel montre une lacune. Un boss-fight n'est rejoué que lorsqu'il existe dans ce module.

## Pièges classiques

- Lire trois niveaux d'affilée sans faire un seul challenge : le symptôme est de ne plus
  savoir répondre aux questions du niveau précédent quand on te les repose.
- Faire le challenge en cherchant "la bonne réponse attendue" plutôt qu'en raisonnant depuis
  le contexte donné : le symptôme est un livrable qui ressemble à un exemple du cours au lieu
  de répondre au cas concret posé.
- Sauter une vérification de sortie explicitement prévue : le symptôme est de confondre lecture et
  maîtrise. Un boss-fight supplémentaire n'est requis que s'il figure au contrat local.
- Considérer une note personnelle non écrite comme suffisante : le symptôme est l'incapacité
  à retrouver, six mois après, pourquoi une décision a été prise.
- Recommencer tout le niveau après un échec au boss-fight au lieu de cibler le critère
  précis en cause : le symptôme est une démotivation par lassitude qui n'apporte aucun gain
  d'apprentissage supplémentaire.

## Analogie

Analogie : ce curriculum se suit comme une mise en place avant un service, et comme une progression de course en montagne : dans l'ordre, sinon rien ne tient.
Où l'analogie casse : une mise en place ratée se rattrape le lendemain, un niveau sauté ne se voit qu'au capstone.

## Ce que tu dois savoir défendre

1. Pourquoi « avoir lu » un module ne prouve pas la maîtrise.
2. Comment retrouver le critère manquant après l'échec d'une preuve de sortie, avec ou sans boss-fight.
3. Quels éléments concrets le README local et la Route 58 demandent de conserver comme preuve.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Comment utiliser ce curriculum** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « Comment utiliser ce curriculum » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
