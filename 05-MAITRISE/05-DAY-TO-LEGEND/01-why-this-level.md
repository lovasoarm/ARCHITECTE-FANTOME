# Pourquoi ce niveau existe

## Le piège

Tu es développeur depuis trois ans dans une entreprise de logistique de tournées de
livraison. Tu maîtrises parfaitement la stack de ton équipe. Tu livres tes tickets à temps,
personne ne se plaint. Tu postules à un poste de développeur senior ailleurs, mieux payé.
Premier entretien technique : on te demande de justifier un choix d'architecture sur un cas
que tu n'as jamais rencontré dans ton entreprise actuelle : un système avec forte contrainte
de cohérence entre deux bases de données. Tu bloques. Pas parce que tu manques
d'intelligence : parce que tu as fait la même chose, dans le même contexte, avec les mêmes
contraintes, pendant trois ans. Ton nombre d'années d'expérience a augmenté. Ta compétence,
elle, a plafonné après la première année : le reste n'était que de la répétition.

## Ce qui se passe vraiment

### La confusion entre ancienneté et compétence

Une carrière technique se mesure en années. La compétence, elle, ne progresse pas de façon
linéaire avec le temps passé : elle progresse avec le nombre de **situations nouvelles
correctement digérées**. Un développeur qui reste cinq ans sur le même produit, avec la même
équipe, les mêmes types de bugs, atteint un plateau bien avant l'année cinq, et le reste du
temps ne fait que consolider ce qu'il savait déjà.

```text
Compétence réelle dans le temps : deux trajectoires possibles

  Compétence
     |
     |           ___________________________  <-- trajectoire A : plateau après 18 mois
     |          /                              (même contexte, mêmes problèmes répétés)
     |         /
     |        /        __/--/--/--/--         <-- trajectoire B : progression par paliers
     |       /        /                          (exposition volontaire à du nouveau,
     |      /        /                            feedback, correction)
     |_____/________/_______________________ Temps
          1 an     3 ans    5 ans

  Même durée. Compétence radicalement différente à l'arrivée.
```

La différence entre les deux trajectoires n'est pas le talent de départ. C'est un mécanisme
observable : la trajectoire B contient des boucles de feedback régulières qui forcent la
correction d'erreurs invisibles en autonomie totale. La trajectoire A n'en contient aucune, 
le travail quotidien devient une routine confortable qui ne remet jamais rien en question.

### Pourquoi "travailler beaucoup" ne suffit pas

Le travail professionnel quotidien optimise pour livrer, pas pour apprendre. Ce sont deux
objectifs différents, parfois même en tension. Livrer vite pousse à réutiliser ce qu'on
sait déjà faire : c'est rationnel à court terme, un ticket urgent n'est pas le bon moment
pour essayer une technique qu'on maîtrise mal. Mais si 100% de ton temps est consacré à
livrer avec ce que tu sais déjà, 0% est consacré à élargir ce que tu sais. Le "deliberate
practice" (pratique délibérée), concept étudié depuis les années 1990 sur les musiciens et
les joueurs d'échecs, distingue précisément ces deux régimes :

```text
Travail ordinaire                     Pratique délibérée
-----------------                     -------------------
Objectif : produire un résultat       Objectif : améliorer une capacité précise
Zone de confort (ce qu'on sait faire) Zone d'inconfort ciblée (juste au-delà du connu)
Feedback : "ça marche / ça marche     Feedback : spécifique et rapide sur CE qui
pas" en général, tardif                a raté et pourquoi
Répétable indéfiniment sans           S'arrête ou change de cible une fois la
progrès garanti                        capacité acquise
```

Un développeur qui ne fait jamais de pratique délibérée peut très bien réussir
professionnellement pendant des années : le marché récompense la fiabilité, pas seulement
la croissance de compétence. Mais le jour où le contexte change (nouvel employeur, nouveau
type de projet, montée en responsabilité), l'absence de réserve de compétence transférable
se voit immédiatement, et brutalement.

### Le vrai risque : l'obsolescence silencieuse

Le risque n'est pas de rester "mauvais". C'est de rester bon **dans un contexte de plus en
plus étroit**, sans s'en rendre compte, parce que personne ne te le dit : ton équipe actuelle
n'a aucune raison de remarquer que tu ne saurais pas résoudre un problème qu'elle ne
rencontre jamais. La seule façon de détecter ce risque tôt est de s'exposer volontairement,
régulièrement, à des problèmes hors de ton contexte habituel : du code d'autres équipes, des
décisions d'architecture que tu n'as pas prises, des katas qui simulent des situations que
tu n'as pas encore vécues.

### Le coût chiffre du plateau silencieux

```text
Developpeur A (trajectoire A, plateau a 18 mois)   Developpeur B (trajectoire B)
Annee 1 : 100% de sa competence actuelle           Annee 1 : 100% de sa competence actuelle
Annee 3 : ~105% (routine, tres peu de nouveau)     Annee 3 : ~160% (expositions repetees)
Annee 5 : ~110%                                    Annee 5 : ~220%
Salaire : progression lente, plafonnee vite        Salaire : negociation credible a la hausse
```

Ces chiffres sont des ordres de grandeur, pas une mesure exacte : le mecanisme compte plus
que le pourcentage precis. Ce qui est mesurable, en revanche, c'est le nombre de fois ou tu
as du sortir de ta zone de confort dans l'annee : zero fois, plateau presque garanti.

Analogie : un plateau de competence silencieux ressemble a une cordee qui repete toujours la
meme voie facile en montagne, et a un cuisinier qui ne fait jamais tourner sa carte dans un
restaurant.
Où l'analogie casse : la cordee et le cuisinier voient leurs limites a l'oeil nu (la voie
suivante est plus dure, le client se lasse du menu). Le plateau de competence, lui, ne se
voit pas depuis l'interieur : c'est justement ce qui le rend dangereux.

## Compromis

| Option                                                    | Coût                                                                    | Bénéfice                                                      | Quand choisir                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Rester dans sa zone de confort technique                  | Aucun coût immédiat visible                                             | Vitesse de livraison maximale à court terme                   | Périodes de forte charge, crise, deadline serrée : jamais comme régime permanent    |
| Routine de pratique délibérée régulière                   | 3-5 heures/semaine prélevées sur du temps "libre" ou du temps pro dédié | Compétence transférable, résilience au changement de contexte | Dès que tu vises une progression au-delà de ton poste actuel                        |
| Changer souvent de contexte (mission, projet, entreprise) | Coût de ramp-up répété, perte de profondeur sur un domaine              | Large exposition à des problèmes variés                       | Début et milieu de carrière, avant de viser une expertise verticale profonde        |
| Rester longtemps sur un seul domaine complexe             | Risque de plateau si aucune pratique délibérée en parallèle             | Expertise verticale rare et recherchée                        | Une fois qu'on a déjà une base large, pour devenir la référence d'un domaine précis |

## Pièges classiques

- **La confusion "j'apprends" / "je fais de la veille".** Symptôme : tu lis des articles
  techniques tous les jours, tu ne codes jamais rien de nouveau à partir de ce que tu lis.
  La lecture passive sans application ne change quasiment pas la compétence pratique.
- **Le syndrome du CV qui grossit sans le cerveau.** Symptôme : ta liste de technologies
  "connues" s'allonge chaque année, mais tu ne pourrais pas justifier un choix d'architecture
  à l'oral sans notes. Tu as accumulé du vocabulaire, pas du jugement.
- **La routine trop ambitieuse abandonnée en trois semaines.** Symptôme : tu te fixes deux
  heures de kata par jour, tu craques la première semaine chargée, tu culpabilises, tu
  arrêtes tout. Une routine tenable à 20 minutes vaut infiniment mieux qu'une routine
  parfaite abandonnée.
- **L'illusion de compétence par ancienneté.** Symptôme : tu te dis senior parce que tu as
  cinq ans d'XP, sans pouvoir citer une seule fois où tu as changé d'avis sur ta façon de
  concevoir un système suite à un retour ou une erreur.

## Ce que tu dois savoir défendre

- Explique la différence entre "travailler beaucoup" et "pratique délibérée" avec un exemple
  tiré de ta propre semaine de travail.
- Pourquoi une carrière technique peut plafonner malgré des années d'ancienneté qui
  continuent de s'accumuler.
- Donne un exemple concret de situation professionnelle qui t'a forcé, contre ta volonté, à
  sortir de ta zone de confort : et ce que tu en as retiré.

## Le principe

La compétence ne s'accumule pas par la présence, elle s'accumule par la correction. Un
mécanisme unique explique tout ce niveau : sans confrontation régulière à un problème hors
de ta zone actuelle, avec un retour sur ce qui a raté, ton cerveau n'a aucune raison de
changer son modèle interne. Il continue d'appliquer la même heuristique, qui a fonctionné
hier, jusqu'au jour où le contexte change et où elle ne fonctionne plus.

## Exemple concret

Deux développeurs de la même entreprise de tournées de livraison reçoivent, à un an
d'intervalle, la même mission : migrer un système de calcul d'itinéraire vers un nouveau
fournisseur de cartographie. Le premier avait, dans l'année écoulée, tenu un kata mensuel de
décision d'architecture sur des cas hors de son périmètre habituel. Il identifie en une
heure les trois points de rupture de contrat probables (format de coordonnées, limites de
requêtes par seconde, gestion des zones non couvertes) avant même d'ouvrir la documentation
du fournisseur. Le second, qui a passé l'année à livrer des tickets sans jamais sortir de son
module habituel, découvre ces trois points un par un, en production, sur trois incidents
distincts, étalés sur six semaines. Les deux avaient la même ancienneté au départ.


## Comment reconnaître un plateau chez toi, concrètement

Le plateau ne s'annonce pas. Voici des questions factuelles, pas des impressions, à te poser
tous les trois mois pour le détecter tôt.

```text
Question de détection                                    Signal de plateau
--------------------------------------------------------  --------------------------------
As-tu résolu un problème que tu ne savais pas résoudre    Non depuis plus de 2 mois : signal
il y a 3 mois ?                                            d'alerte, pas encore critique
As-tu changé d'avis sur une décision d'architecture       Jamais depuis 6 mois : tu ne
suite à un retour ou une erreur ?                          confrontes plus tes croyances
Peux-tu citer un domaine technique de ton secteur          Non : ta carte mentale du métier
que tu ne maîtrises pas et que tu évites sciemment ?        a un angle mort que tu ignores
As-tu lu du code écrit par quelqu'un de nettement          Non : tu ne vois jamais un style
plus expérimenté que toi ce trimestre ?                    ou un raisonnement différent du tien
```

Aucune de ces questions n'a de bonne réponse universelle. Ce qui compte, c'est le nombre de
"non" qui s'accumulent sur plusieurs trimestres consécutifs : un "non" isolé est normal, une
série de "non" répétée est le signal du plateau silencieux.

## Construire une routine de pratique délibérée tenable

L'erreur la plus commune est de viser trop grand dès le départ. Une routine qui tient dans le
temps bat systématiquement une routine ambitieuse abandonnée après trois semaines.

```text
Routine intenable (abandon a 90% en moins d'un mois)
- 2h de kata par jour
- Un nouveau langage par mois
- Zero marge pour les semaines chargees au travail

Routine tenable (base recommandee de depart)
- 20-30 min, 3 fois par semaine, jour fixe (ex: lundi, mercredi, samedi matin)
- Un seul axe a la fois (ex: lire du code d'un projet open source de reference)
- Regle explicite : une semaine ratee ne casse pas la routine, elle reprend la semaine suivante
```

## Ce que tu emportes

Le nombre d'années d'expérience ne garantit rien seul : c'est un compteur de temps, pas de
compétence. Ce qui fait progresser, c'est l'exposition volontaire et régulière à des
situations un peu au-delà de ce que tu maîtrises déjà, avec un retour qui te dit précisément
ce qui a raté. Sans ce mécanisme, un plateau s'installe tôt et reste invisible de
l'intérieur, jusqu'au jour où le contexte change brutalement et où l'écart devient un
handicap concret, en entretien, en promotion, ou face à un incident réel.
