# Anti-patterns hall of fame

## Le piège

Chaque équipe technique croit vivre des problèmes uniques à son contexte. En réalité, la
grande majorité des dysfonctionnements techniques et organisationnels reviennent, année
après année, projet après projet, sous des noms différents mais avec la même structure
sous-jacente. Ce catalogue nomme les plus fréquents pour que tu les reconnaisses tôt, avant
qu'ils ne deviennent la norme silencieuse de ton équipe, et te donne pour chacun un signal
de détection précoce et une première action correctrice concrète.

## Ce qui se passe vraiment

Un anti-pattern n'est pas une erreur ponctuelle. C'est une solution qui a semblé
raisonnable à court terme, s'est généralisée sans remise en question, et dont le coût
n'apparaît que longtemps après que la décision initiale a été oubliée.

```text
Décision locale raisonnable  -->  Généralisation sans remise en question  -->  Coût différé
     (semble efficace)              (devient la norme implicite)          (personne ne
                                                                            relie plus la
                                                                            cause à l'effet)
```

### Le God Object (l'objet qui sait tout, fait tout)

Une classe `GestionnaireCabinetVeterinaire` finit par contenir la logique de planning, de
facturation, de notification et de gestion des dossiers médicaux. Symptôme : chaque
modification, même mineure, touche un fichier de plusieurs milliers de lignes que plus
personne ne comprend en entier, et chaque revue de code sur ce fichier prend deux fois plus
de temps que sur le reste du projet.

Signal de détection précoce : le fichier apparaît dans plus de la moitié des pull requests
du mois, quel que soit le sujet touché. Première action : identifier une seule
responsabilité à extraire (par exemple la notification), sans attendre un refactoring
complet.

### Le Copier-Coller Métier (duplication de règle sans source unique)

La règle "un créneau vétérinaire ne peut pas être réservé moins de deux heures à l'avance"
est codée à trois endroits différents (formulaire de prise de rendez-vous, API, job de
rappel automatique). Symptôme : la règle change une fois, dans un seul des trois endroits,
et un client peut réserver un créneau dans l'heure via l'API alors que le formulaire le
bloque : un bug invisible tant que personne ne compare les deux chemins.

Signal de détection précoce : une recherche du texte de la règle dans le code retourne plus
d'un résultat. Première action : extraire la règle dans une fonction unique, appelée par les
trois endroits, avant même de discuter d'architecture plus large.

### Le Faux Consensus de Réunion (décision jamais vraiment prise)

Une réunion se termine par "on est tous d'accord sur l'approche B" sans que personne n'ait
formulé explicitement ce qu'était l'approche B. Symptôme : trois personnes implémentent
trois versions différentes de "l'approche B" dans les semaines qui suivent, chacune
convaincue d'avoir suivi la décision.

Signal de détection précoce : personne ne peut citer la décision dans une phrase identique
cinq minutes après la réunion. Première action : voir le gabarit ADR du fichier
[01-decision-templates.md](01-decision-templates.md), même en trois lignes, envoyé dans les
dix minutes suivant la réunion.

### Le Test Alibi (test qui ne teste rien)

Un test unitaire vérifie que la fonction ne lève pas d'exception, sans jamais vérifier la
valeur retournée. Symptôme : la couverture de tests affichée est haute, mais un bug de
logique métier majeur passe en production sans qu'aucun test n'ait bronché.

Signal de détection précoce : le test continue de passer après avoir volontairement inversé
une condition métier dans le code testé. Première action : réécrire l'assertion pour vérifier
une valeur précise attendue, pas seulement l'absence de crash.

### La Dette Technique Silencieuse (jamais nommée, jamais budgétée)

Un raccourci pris sous deadline ("on corrigera plus tard") n'est jamais écrit nulle part,
jamais estimé en coût, jamais planifié pour être remboursé. Symptôme : dix-huit mois plus
tard, personne ne se souvient pourquoi telle partie du code est fragile, et chaque nouvelle
fonctionnalité dans cette zone prend trois fois plus de temps que prévu sans qu'on sache
pourquoi précisément.

Signal de détection précoce : le commentaire "TODO : corriger plus tard" existe dans le code
depuis plus d'un trimestre. Première action : transformer chaque TODO ancien en ticket daté
et estimé, même sommairement, pour le rendre visible dans la planification.

### Le Héros Systémique (une seule personne qui sait tout)

Un seul développeur comprend vraiment le système de refacturation d'énergie de l'immeuble
collectif. Toute l'équipe se repose sur lui pour chaque question un peu profonde. Symptôme :
cette personne part en vacances ou change d'équipe, et un incident simple devient une crise
de plusieurs jours faute de documentation ou de transfert de connaissance réel.

Signal de détection précoce : une seule personne est mentionnée dans plus de la moitié des
demandes d'aide sur un module donné. Première action : organiser une session où cette
personne explique le module à voix haute pendant qu'une autre prend des notes qui deviennent
la documentation.

### Le Yak Shaving Involontaire (le vrai problème disparaît sous les sous-problèmes)

Pour corriger un bug de calcul de tournée, tu découvres que la librairie de dates utilisée
est obsolète, tu la mets à jour, ce qui casse trois autres modules, que tu corriges à leur
tour, en oubliant le bug initial. Symptôme : plusieurs heures ou jours passés, un diff
énorme, et le ticket d'origine toujours pas résolu.

Signal de détection précoce : le diff en cours touche des fichiers sans rapport apparent
avec le ticket d'origine. Première action : t'arrêter, ouvrir un ticket séparé pour le
sous-problème découvert, revenir sur la branche d'origine sans le corriger tout de suite.

### Le Cargo Cult Architectural (copier la forme sans le contexte)

L'équipe adopte une architecture en microservices parce qu'une grande entreprise connue
l'utilise, sans avoir le volume de trafic ni l'équipe nécessaires pour en justifier le coût
opérationnel. Symptôme : plus de complexité de déploiement et de debug qu'avec un monolithe,
sans aucun des bénéfices de scalabilité qui justifiaient le choix chez l'entreprise copiée.

Signal de détection précoce : personne dans l'équipe ne peut citer un chiffre concret
(trafic, taille d'équipe) qui justifie le choix, seulement "c'est ce que fait telle
entreprise". Première action : chiffrer le volume réel actuel et celui projeté à un an,
avant de valider ou d'inverser le choix.

## Checklist de détection rapide (revue trimestrielle d'équipe)

- [ ] Un même fichier apparaît-il dans une majorité des pull requests du dernier mois ?
- [ ] Une règle métier importante existe-t-elle à plus d'un endroit dans le code ?
- [ ] Peux-tu retrouver une décision d'équipe récente écrite noir sur blanc quelque part ?
- [ ] Un test peut-il continuer de passer si tu inverses volontairement la logique testée ?
- [ ] Combien de TODO ont plus de trois mois dans la base de code ?
- [ ] Une seule personne est-elle citée dans la majorité des demandes d'aide sur un module ?
- [ ] Le dernier gros correctif a-t-il élargi son périmètre bien au-delà du ticket d'origine ?
- [ ] Un choix d'architecture récent peut-il être justifié par un chiffre, pas une référence
      à une autre entreprise ?

## Compromis

| Anti-pattern                | Coût d'ignorer                           | Coût de corriger tôt                                | Coût de corriger tard                               |
| --------------------------- | ----------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| God Object                  | Fichier de plus en plus risqué à toucher | Refactoring ciblé, modéré                           | Refactoring complet sous pression, risqué           |
| Copier-Coller Métier        | Bugs d'incohérence discrets              | Centraliser la règle, simple                          | Chercher toutes les occurrences en production, lent |
| Faux Consensus              | Reprises de travail multiples            | Reformuler explicitement en fin de réunion, gratuit | Conflit d'équipe après coup                         |
| Test Alibi                  | Fausse confiance en la couverture        | Réécrire l'assertion, rapide                          | Bug découvert en production, coûteux                |
| Dette Technique Silencieuse | Ralentissement progressif inexpliqué     | Nommer et estimer, discipline légère                | Zone du code que plus personne ne veut toucher      |
| Héros Systémique            | Dépendance critique sur une personne     | Documenter et faire des binômes, effort régulier    | Crise à son départ                                  |
| Yak Shaving Involontaire    | Diff énorme, ticket d'origine non résolu | Ouvrir un ticket séparé, discipline de coupure       | Revue impossible, régression cachée dans le diff    |
| Cargo Cult Architectural    | Complexité opérationnelle non justifiée  | Choisir selon le contexte réel, effort de jugement  | Migration inverse coûteuse                          |

## Pièges classiques

- **Reconnaître l'anti-pattern chez les autres, jamais chez soi.** Symptôme : tu identifies
  facilement le Héros Systémique dans une autre équipe sans remarquer que tu en es un dans
  la tienne.
- **Corriger la forme sans corriger la cause.** Symptôme : découper le God Object en
  plusieurs fichiers sans jamais clarifier les responsabilités : le God Object se
  reconstitue ailleurs, juste réparti différemment.
- **Traiter ces anti-patterns comme des fautes morales plutôt que des dérives structurelles.**
  Symptôme : blâmer une personne pour un God Object qui s'est construit sur trois ans, par
  dizaines de petites décisions locales raisonnables prises par toute l'équipe.
- **Utiliser ce catalogue comme argument d'autorité en réunion sans preuve concrète.**
  Symptôme : "c'est du cargo cult" devient une accusation qui coupe le débat au lieu de
  demander le chiffre qui manque.

## Analogie

Analogie : un anti-pattern, c'est la rallonge bricolée qui traîne dans l'atelier depuis deux ans, et le cordage réparé au scotch.
Où l'analogie casse : le cordage rompt visiblement ; un anti-pattern tient longtemps et casse le jour du pic de charge.

## Ce que tu dois savoir défendre

- Identifie, dans un projet que tu connais bien, un anti-pattern de cette liste présent
  aujourd'hui, et la décision locale raisonnable qui l'a probablement lancé.
- Explique pourquoi corriger la forme d'un anti-pattern sans corriger sa cause structurelle
  le fait souvent réapparaître ailleurs.
- Choisis l'anti-pattern de cette liste que tu risques personnellement le plus de reproduire,
  et explique le mécanisme précis qui t'y pousserait.

## Ce que tu emportes

Huit anti-patterns nommés avec leur signal de détection précoce et leur première action
correctrice, une checklist de revue trimestrielle à faire passer à ton équipe, et le réflexe
de chercher la décision locale raisonnable derrière chaque dérive plutôt qu'une faute
individuelle à désigner.
