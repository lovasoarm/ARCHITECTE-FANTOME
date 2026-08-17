---
stability: perissable_2027
acte: restituer
---

> **Frontière** : ce module ne traite pas le catalogue des formes d'architecture, traité en [`02-CONSTRUCTION/14_architecture_patterns`](../14_architecture_patterns/00_why_architecture_patterns.md), ni le découpage par le langage du métier ni CQRS, traités en [`02-CONSTRUCTION/16_ddd_contrats`](../16_ddd_contrats/00_why_ddd_contrats.md). Ici, on découpe un système existant en couches, dépendances dirigées et sources de vérité.
# Pourquoi ce niveau existe

## La scène

Le cabinet vétérinaire pour lequel tu as construit l'appli de gestion de créneaux a du succès.
Six mois après la mise en ligne, l'équipe demande une deuxième clinique, un système de
rappels SMS, et la possibilité pour les vétérinaires de voir leur planning depuis une appli
mobile. Ton code : un seul projet Express avec des routes qui parlent directement à la base
de données, un peu de logique métier éparpillée dans les contrôleurs et le reste dans des
triggers SQL : a très bien fonctionné jusqu'ici. Tu ouvres le fichier `routes/appointments.js`
pour ajouter la fonctionnalité de rappel SMS. Il fait 640 lignes. Il gère la création de
rendez-vous, la vérification de disponibilité, le calcul de prix, l'envoi d'email de
confirmation, et la mise à jour du stock de vaccins. Tu ne sais plus par où commencer sans
casser autre chose. Ton estimation initiale de "deux jours" devient une semaine, puis tu
découvres un bug en prod que personne n'avait vu venir parce que le calcul de disponibilité
et le calcul de prix partagent une variable qu'aucun des deux n'était censé modifier.

## Ce qui casse sans ce niveau

Sans compréhension de l'architecture, tu développes une intuition fausse : "le code marche,
donc il est bien structuré". Cette intuition tient tant que le projet est petit et que tu es
seul dessus. Elle s'effondre exactement au moment où le projet devient intéressant : quand il
faut le faire évoluer sous contrainte, avec plusieurs personnes, sans tout réécrire.

Trois symptômes précis apparaissent, toujours dans le même ordre :

1. **La peur de toucher au code.** Tu ajoutes une fonctionnalité en copiant-collant un bloc
   existant plutôt qu'en le réutilisant, parce que tu as peur de casser ce qui marche déjà en
   le modifiant. Le code grossit plus vite que les fonctionnalités qu'il porte.
2. **Les régressions fantômes.** Un changement dans un coin du code casse une fonctionnalité
   sans rapport apparent, parce que les deux étaient couplées par un détail d'implémentation
   que personne n'avait documenté ni même remarqué.
3. **Le mur de l'onboarding.** Une nouvelle personne rejoint l'équipe et met trois semaines à
   pouvoir livrer un changement sans supervision, parce que comprendre "comment ça marche"
   demande de lire tout le code plutôt qu'une carte des responsabilités.

Ces trois symptômes ont un point commun : ils ne viennent jamais d'un manque de compétence en
syntaxe. Ils viennent de dépendances mal placées : du code qui sait des choses qu'il ne
devrait pas savoir, et qui donc casse dès que ces choses changent.

## Ce que l'architecture n'est pas

Avant d'aller plus loin, une clarification qui évite un contresens répandu. L'architecture
logicielle n'est pas :

- un diagramme UML fait avant de coder, jamais mis à jour ensuite ;
- une liste de patterns à appliquer par principe ("j'utilise toujours le Repository Pattern") ;
- un sujet réservé aux "architectes", rôle qui n'écrit plus de code depuis dix ans ;
- une question de taille de fichier ("chaque fichier doit faire moins de 200 lignes").

L'architecture, c'est la réponse concrète à une seule question, posée en permanence pendant
que tu codes : **quand cette chose change, qu'est-ce que je suis obligé de changer avec ?**
Une bonne architecture minimise et rend explicite le rayon de l'explosion. Une mauvaise
architecture le maximise et le cache.

```text
Changement demandé : "ajouter un deuxième mode de paiement pour les cotisations du club"

Mauvaise architecture (couplage caché) :
  routes/cotisation.js --> modifie directement
       |-- la table `adherents`
       |-- le calcul de tarif dégressif (dupliqué ici ET dans le rapport comptable)
       |-- l'email de confirmation (template inline)
       \-- le webhook du prestataire de paiement (mélangé avec la logique métier)
  --> toucher au paiement oblige à comprendre et risquer de casser 4 autres choses

Bonne architecture (couplage explicite et limité) :
  UseCase "ProcessCotisation" --> dépend d'une interface PaymentGateway
       |-- implémentation prestataire actuel
       \-- implémentation nouvelle (à ajouter, sans toucher au UseCase)
  --> ajouter un mode de paiement = ajouter un fichier, pas modifier les autres
```

## Qui souffre en premier

L'équipe souffre en premier, en silence : chaque nouvelle fonctionnalité prend un peu plus de temps
que la précédente sans qu'aucun graphique ne le montre clairement, jusqu'à ce qu'un chiffre de
vélocité en baisse ou une estimation refusée par un client mette le doigt dessus. Le client souffre
en second, en payant plus cher pour moins de fonctionnalités livrées, sans savoir pourquoi.

## À quel moment du projet ça se manifeste

Jamais avant un seuil, qui n'est pas une durée mais une accumulation : le nombre de fonctionnalités
qui touchent aux mêmes données. Un projet peut vivre deux ans sans jamais rencontrer ce problème
s'il n'a qu'un seul flux métier simple. Il peut aussi le rencontrer en six semaines si trois
fonctionnalités convergent tôt vers les mêmes tables et les mêmes règles métier.

## Le mécanisme sous-jacent

Le couplage caché se construit toujours de la même façon : une décision d'implémentation, prise
pour aller vite, fuit hors de l'endroit où elle a été prise. Un format de date choisi dans un
contrôleur se retrouve codé en dur dans trois autres fichiers. Une règle de calcul de prix écrite
dans une route se retrouve copiée dans un rapport comptable, parce que personne n'a extrait une
fonction unique que les deux pourraient appeler.

```text
Décision prise localement                Où elle fuit, sans qu'on le décide
--------------------------               -----------------------------------
Format de date "JJ/MM/AAAA"              Trois écrans différents parsent ce
choisi dans un formulaire                format à la main, chacun un peu
                                          différemment

Calcul de tarif dégressif écrit          Recopié dans le rapport comptable,
dans la route de cotisation              avec un arrondi légèrement différent

Nom de champ interne "amount_cents"      Exposé tel quel dans la réponse API,
choisi pour la précision monétaire       devient un contrat que les clients
                                          externes dépendent maintenant à vie
```

Un système bien architecturé ne supprime pas ces décisions : il les regroupe en un seul endroit
responsable, que tout le reste appelle sans dupliquer. Le coût d'un changement devient alors
proportionnel à l'importance réelle du changement, pas à la surface de code qu'il faut fouiller pour
le trouver.

## Contre-exemple : quand trop d'architecture coûte plus qu'elle ne rapporte

Un script interne, utilisé une fois par mois par une seule personne pour extraire un rapport, n'a
pas besoin d'interfaces, de couches et d'injection de dépendances : le coût d'abstraction dépasse
largement le bénéfice pour un outil jetable, à faible enjeu, jamais amené à évoluer. La discipline de
ce niveau s'applique aux systèmes qui vont vivre, changer et accueillir plusieurs mains, pas à tout
ce qui s'écrit.

## Pourquoi c'est difficile à apprendre seul

Le problème d'architecture ne se voit pas sur un petit projet. Un CRUD de 500 lignes tient
debout avec n'importe quelle structure, bonne ou mauvaise : c'est justement ce qui rend
l'apprentissage piégeux : tu peux passer des années à coder des petits projets et ne jamais
rencontrer la douleur qui justifie ces leçons. Elle apparaît à partir d'un seuil : plusieurs
développeurs, plusieurs mois de vie du projet, ou plusieurs fonctionnalités qui se chevauchent
sur les mêmes données. Ce niveau simule ce seuil artificiellement, par les exemples et le
challenge, pour que tu construises l'intuition avant de la payer en vrai, sur un projet qui
compte.

## Ce que ce niveau ne couvre pas

Ce niveau ne couvre pas la modélisation des données elles-mêmes (traitée au
[niveau 05](../08-DATA-SPELLS/README.md)) ni la conception du contrat d'API exposé vers
l'extérieur (traitée au [niveau 07](../20-API-DOJO/README.md)). Il se concentre sur l'organisation
interne du code qui relie ces deux couches.

## Ce que tu sais faire à la sortie

- Repérer un couplage caché avant qu'il ne provoque une régression, en te demandant "qu'est-ce que
  je suis obligé de changer avec ceci".
- Séparer la logique métier de son déclenchement (route HTTP, tâche planifiée, message de file
  d'attente), pour la tester et la réutiliser sans dupliquer.
- Choisir un niveau d'abstraction proportionné à la durée de vie réelle du code, sans en ajouter par
  principe.
- Expliquer à un tiers, avec un schéma simple, où vit chaque responsabilité du système.

## Comment ce niveau est réutilisé plus tard

La séparation des responsabilités posée ici conditionne directement la façon dont un contrat d'API
peut évoluer sans casser ses appelants, traitée au [niveau 07](../20-API-DOJO/README.md), et la
capacité à observer où un système ralentit, traitée au
[niveau 09](../../03-PILOTAGE/03-QUALITY-SHIELD/README.md).

## Analogie

Analogie : une architecture, c'est le plan d'un atelier où chaque machine a sa zone, et l'organisation d'un bloc d'urgences.
Où l'analogie casse : déplacer une machine coûte une journée, déplacer une frontière logicielle peut coûter un trimestre.

## Ce que tu dois savoir défendre

- Pourquoi "le code marche" et "le code est bien architecturé" sont deux affirmations
  indépendantes.
- Donne un exemple concret (pas générique) où un couplage caché a transformé un changement
  d'un jour en changement d'une semaine.
- Pourquoi l'architecture ne se voit pas sur un petit projet, et pourquoi c'est dangereux.
