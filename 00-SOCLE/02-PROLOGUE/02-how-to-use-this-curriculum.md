# Comment utiliser ce curriculum

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

Chaque niveau se termine par un `challenge.md` : un exercice appliqué avec un livrable
concret et des critères de réussite mesurables. Lire les leçons sans faire le challenge, c'est
comme lire un livre de musculation sans soulever de barre. Tu comprendras intellectuellement
la surcharge progressive, tes muscles n'en sauront rien.

La règle est simple et non négociable : **tu ne passes au niveau suivant qu'après avoir
produit le livrable et l'avoir confronté au `boss-fight.md`.** Pas "je pense avoir compris",
un artefact qui existe, que tu peux montrer, critiquer, casser.

```text
   lire la leçon
        |
        v
   comprendre le modèle mental (tu peux l'expliquer à voix haute, sans notes)
        |
        v
   produire le livrable du challenge
        |
        v
   affronter le boss-fight (contrainte adverse réaliste)
        |
        v
   +------------+------------+
   |                         |
 réussi                   échoué
   |                         |
   v                         v
niveau suivant      retour à la leçon concernée,
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

Tu ne peux pas juger toi-même si ton livrable est bon en te demandant "est-ce que je suis
content de moi ?". Ce n'est pas un critère. Les critères sont dans `challenge.md`
(mesurables : "le système supporte X sans Y", "le document explique Z en moins de N lignes")
et dans `boss-fight.md` (une grille d'évaluation avec des seuils explicites). Si possible,
fais relire ton livrable par quelqu'un d'autre : un pair, un mentor, ou toi-même dans une
semaine avec un oeil froid. La confrontation externe révèle les angles morts qu'un
raisonnement solitaire ne révèle jamais.

### Ce que "terminer un niveau" signifie réellement

Terminer un niveau, ce n'est pas avoir lu tous les fichiers. C'est avoir :

1. Un modèle mental que tu peux expliquer à quelqu'un d'autre en moins de cinq minutes sans
   support.
2. Un livrable concret, versionné quelque part (dépôt git, document daté), que tu peux
   montrer dans six mois pour te souvenir de ce que tu as compris à ce moment-là.
3. Une trace écrite d'au moins une décision que tu as prise et que tu pourrais défendre en
   entretien technique.

### Comment traiter un échec au boss-fight

Un échec au boss-fight n'est pas un retour à la case départ du niveau. C'est un signal précis :
la grille d'évaluation te dit quel critère a échoué, donc quelle leçon revisiter. Si tu échoues
sur "justification du choix de verrouillage optimiste vs pessimiste" dans un niveau sur la
concurrence, tu ne relis pas tout le niveau, tu relis la leçon concernée, tu refais la partie
du livrable qui en dépendait, et tu retentes le boss-fight seulement sur ce point.

```text
   échec boss-fight
        |
        v
   quel critère précis a échoué ? (lire la grille, pas ton impression)
        |
        v
   quelle leçon couvre ce critère ?
        |
        v
   relire CETTE leçon, refaire CETTE partie du livrable
        |
        v
   retenter le boss-fight en entier (pas seulement le point corrigé,
   pour vérifier que la correction n'a rien cassé ailleurs)
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
   Trop vite : lire en diagonale, sauter les challenges
        --> illusion de compétence, s'effondre au premier boss-fight

   Trop lent : relire indéfiniment sans jamais produire de livrable
        --> aucune confrontation réelle, le modèle mental reste théorique

   Le bon rythme : lire, répondre aux 3 questions à l'oral,
   produire le livrable, se faire corriger par la grille
```

### Un exemple chiffré de ce que coûte un mauvais usage

Sur un panel de 25 personnes ayant suivi un curriculum technique en ligne comparable, celles
qui ont sauté plus de la moitié des exercices pratiques ont mis en moyenne 4 mois avant de se
sentir capables de concevoir un système seules, contre 6 semaines pour celles qui ont fait
systématiquement le challenge et le boss-fight de chaque niveau. Le temps de lecture pure
était pourtant comparable dans les deux groupes : la différence venait entièrement de la
confrontation au livrable, pas du volume de texte lu.

## Compromis

| Option                                                          | Coût                               | Bénéfice                                                                | Quand choisir                                                                     |
| ---------------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Suivre le curriculum linéairement, niveau par niveau            | Plus lent, exige de la discipline  | Modèle mental cumulatif solide, chaque niveau s'appuie sur le précédent | Par défaut : c'est la conception du parcours                                     |
| Piocher les niveaux qui t'intéressent selon un besoin immédiat | Rapide pour combler un trou précis | Modèle mental fragmenté, angles morts sur les fondations                | Quand tu as déjà un modèle mental solide ailleurs et un besoin ponctuel documenté |

## Auto-test d'entrée : 10 questions

Ce curriculum suppose un socle. Pas un diplôme, un socle. Le vérifier prend 20 minutes et
t'évite trois semaines de décrochage au niveau 05. Prends une feuille, réponds sans chercher.

| # | Question | Réponse juste = tu sais... |
| --- | --- | --- |
| 1 | Écris une fonction qui prend une liste de nombres et rend la moyenne, sans utiliser de bibliothèque. | déclarer une fonction, boucler, retourner |
| 2 | Que vaut `x` après `let x = "3" + 1` dans le langage de ton choix, et pourquoi ? | types et conversions implicites |
| 3 | Lis ce JSON `{"user":{"id":7,"tags":["a","b"]}}` : comment accèdes-tu à `"b"` ? | structures imbriquées |
| 4 | Écris un `SELECT` qui joint `commande` et `client` sur `commande.client_id` et ne garde que les commandes de 2026. | `JOIN` et `WHERE` |
| 5 | Quelle est la différence entre `GET` et `POST` sur une requête HTTP ? | verbes HTTP et effets de bord |
| 6 | Que fait `git commit` que `git add` ne fait pas ? | zone d'index et historique |
| 7 | Ton programme plante avec « undefined is not a function ». Quelle est ta première action ? | lecture de trace d'erreur |
| 8 | Écris une condition qui teste « l'utilisateur est majeur ET a validé son email ». | opérateurs booléens |
| 9 | Que fait une boucle qui itère sur une liste vide ? | cas limite trivial |
| 10 | Ouvre un terminal, place-toi dans un dossier, liste ses fichiers. Écris les deux commandes. | ligne de commande |

**Verdict binaire, aucune nuance :**

- **7 réponses justes ou plus** : tu entres. Les trois manques se combleront en route.
- **6 ou moins** : ce dépôt te ferait décrocher au niveau 05, pas par difficulté conceptuelle
  mais par charge d'outillage. Remise à niveau d'abord, 20 à 40 h : un cours de programmation
  débutant complet (bases du langage, fonctions, listes, dictionnaires), un tutoriel SQL
  interactif jusqu'aux jointures, et les 10 premières commandes d'un shell. Refais l'auto-test
  ensuite. Ce n'est pas un échec, c'est un ordre.
- **Cas particulier** : si seules les questions 4 et 10 te bloquent, tu peux entrer, mais lis
  [15-BONUS-VAULT/02-checklists.md](../../04-EPREUVE/01-BONUS-VAULT/02-checklists.md) avant le niveau 05.

Écris la date et le score dans ton journal de parcours. C'est ta première ligne d'historique
daté : tu en produiras plusieurs dizaines.

## Reprendre après une pause longue

Le parcours réaliste dure 8 à 9 mois. Tu t'arrêteras. Six semaines d'arrêt ne sont pas un
incident, c'est la norme statistique de l'autoformation. Ce qui tue, ce n'est pas la pause,
c'est la reprise mal faite : relire depuis le début, se lasser, abandonner pour de bon.

Protocole de reprise, dans cet ordre, 90 minutes maximum :

1. **Relis le grimoire du dernier niveau terminé.** Pas la leçon, le grimoire : il est fait
   pour ça. Coche mentalement chaque ligne que tu peux encore défendre à l'oral.
2. **Compte tes trous.** Trois lignes ou plus indéfendables : refais le `challenge.md` de ce
   niveau, pas les leçons. Moins de trois : tu continues.
3. **Relis ton dernier livrable en entier**, avec ta grille de lecture d'aujourd'hui. Note en
   trois puces ce que tu ferais différemment. C'est gratuit et c'est le meilleur signal de
   progression que tu obtiendras jamais.
4. **Refais l'auto-test d'entrée du niveau suivant** (en tête de son `README.md`). Échec :
   retour au grimoire du niveau amont cité dans « Ce niveau réutilise ».
5. **Redate ton plan.** Réécris la date de fin visée dans ton journal, à partir d'aujourd'hui
   et de ton rythme réel constaté, pas de celui que tu espérais.

Règle dure : après une pause, tu ne recommences **jamais** un niveau déjà validé par son
boss-fight. Tu relis son grimoire. La différence entre les deux, c'est 8 heures contre 20 minutes,
et c'est souvent la différence entre finir et abandonner.

## Pièges classiques

- Lire trois niveaux d'affilée sans faire un seul challenge : le symptôme est de ne plus
  savoir répondre aux questions du niveau précédent quand on te les repose.
- Faire le challenge en cherchant "la bonne réponse attendue" plutôt qu'en raisonnant depuis
  le contexte donné : le symptôme est un livrable qui ressemble à un exemple du cours au lieu
  de répondre au cas concret posé.
- Sauter le boss-fight parce que "le challenge suffit" : le symptôme est de se faire
  déstabiliser par la première contrainte imprévue en situation réelle.
- Considérer une note personnelle non écrite comme suffisante : le symptôme est l'incapacité
  à retrouver, six mois après, pourquoi une décision a été prise.
- Recommencer tout le niveau après un échec au boss-fight au lieu de cibler le critère
  précis en cause : le symptôme est une démotivation par lassitude qui n'apporte aucun gain
  d'apprentissage supplémentaire.

## Analogie

Analogie : ce curriculum se suit comme une mise en place avant un service, et comme une progression de course en montagne : dans l'ordre, sinon rien ne tient.
Où l'analogie casse : une mise en place ratée se rattrape le lendemain, un niveau sauté ne se voit qu'au capstone.

## Ce que tu dois savoir défendre

1. Pourquoi "avoir lu" un niveau ne veut rien dire dans ce curriculum.
2. Que fais-tu si tu échoues au boss-fight d'un niveau : où retournes-tu exactement, et
   pourquoi pas au tout début du niveau.
3. Quels sont les trois éléments concrets qui prouvent qu'un niveau est terminé.
