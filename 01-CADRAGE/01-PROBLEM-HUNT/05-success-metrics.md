# Métriques de succès et seuil d'échec

## La scène

Une bibliothèque de club d'escalade développe un outil de réservation de créneaux sur les pans
d'entraînement, pour éviter les conflits de réservation griffonnés sur un carnet. Trois mois
après le lancement, le comité directeur demande "est-ce que ça marche ?" L'équipe répond :
"on a 40 comptes créés et 300 vues de page." Personne ne sait dire si c'est un succès. Le
carnet papier, lui, était consulté par tout le monde, tout le temps : mais personne n'avait
défini avant le lancement ce que "ça marche" voulait dire précisément. L'outil est peut-être
un succès, peut-être un échec silencieux : sans seuil défini d'avance, la question ne se
tranche pas, elle se discute indéfiniment selon l'humeur de la réunion.

Ce flou a un coût concret : sans décision claire, l'équipe continue d'ajouter des
fonctionnalités à l'outil pendant six mois de plus (export PDF, historique des réservations,
statistiques d'usage par grimpeur), en pariant que "ça va finir par prendre". Au bout d'un an,
le club a dépensé l'équivalent de deux mois de travail supplémentaire sur un outil que 78% des
grimpeurs continuent d'ignorer, sans qu'aucune de ces fonctionnalités additionnelles n'ait
adressé la vraie cause de non-adoption, jamais mesurée faute de métrique reliée au problème.

## Ce qui se passe vraiment

Une métrique de succès produit mesure si le problème réel identifié en amont (voir la leçon
sur les besoins réels) est effectivement résolu pour l'utilisateur. Une métrique de vanité
mesure une activité qui donne une impression de traction sans rien dire sur la résolution du
problème. Le nombre de comptes créés est une métrique de vanité tant qu'on ne sait pas si ces
comptes réservent réellement des créneaux et évitent les conflits sur le pan d'entraînement.

```text
Métrique de vanité              Métrique de succès produit
---------------------           --------------------------
Comptes créés                   Créneaux réservés sans double-booking
Vues de page                    % de séances où le grimpeur a eu le pan
                                 sans conflit ni attente
Téléchargements de l'appli      % d'utilisateurs qui reviennent réserver
                                 une deuxième fois dans le mois
```

La différence tient à une question simple : est-ce que cette métrique peut monter sans que le
problème initial soit résolu ? Si oui, c'est une métrique de vanité : elle mesure l'activité
autour du produit, pas son utilité réelle.

## Le seuil d'échec, défini avant de coder

Un seuil d'échec est un chiffre fixé avant le lancement, en dessous duquel l'équipe s'engage à
reconnaître que le produit, dans sa forme actuelle, ne fonctionne pas : et à en tirer une
décision (pivoter, arrêter, refaire une itération sur un point précis). Sans ce seuil écrit à
l'avance, chaque résultat décevant se rationalise après coup ("ce n'est pas si mal", "il faut
laisser le temps à l'adoption"), et le produit continue d'exister par inertie plutôt que par
utilité démontrée.

```text
Avant de coder, on écrit :
  Métrique de succès : % de séances avec réservation faite via l'outil,
    sans recours au carnet papier en parallèle.
  Seuil d'échec : si moins de 50% des séances passent par l'outil
    après 6 semaines d'usage réel, l'outil ne remplace pas le carnet
    : on retourne comprendre pourquoi avant de continuer à l'améliorer.

Six semaines plus tard, on mesure 22%.
  --> seuil non atteint, décision prise à l'avance : on arrête d'ajouter
    des fonctionnalités et on va interroger les grimpeurs qui utilisent
    encore le carnet, pour comprendre le vrai blocage.
```

Le seuil transforme une discussion émotionnelle ("on a mis du temps, ce serait dommage
d'arrêter") en une décision déjà actée avant que l'attachement au projet ne brouille le
jugement.

## Trois niveaux de seuils, pas un seul

Un seul seuil binaire (succès ou échec) manque souvent de nuance pour décider quoi faire
ensuite. Un cadrage plus utile fixe trois paliers avant le lancement, chacun relié à une
action différente :

```text
Seuil rouge  (< 30% des séances via l'outil)
  --> échec net : le produit ne résout pas le problème, on arrête d'investir
      dessus et on retourne interviewer les utilisateurs qui l'ignorent.

Seuil orange (30% à 60%)
  --> adoption partielle : quelque chose fonctionne pour une partie des
      grimpeurs, mais un blocage empêche la généralisation. On instrumente
      pour savoir qui utilise et qui n'utilise pas, avant de décider.

Seuil vert   (> 60%)
  --> l'outil remplace le carnet pour la majorité des usages réels.
      On peut investir dans des améliorations incrémentales.
```

Ces trois paliers évitent le piège du seuil unique, qui pousse parfois à arrondir un résultat
limite ("48%, c'est presque 50%, on va dire que ça passe") pour éviter une décision
inconfortable. Avec trois zones définies à l'avance, un résultat à 48% tombe clairement dans
la zone orange, avec une action déjà décidée (instrumenter avant de trancher), pas un débat
de couloir sur l'arrondi.

## Choisir une métrique qui ne peut pas être trichée facilement

Une métrique se laisse parfois optimiser sans que le problème réel progresse. Si la métrique
choisie est "nombre de réservations créées", il suffit d'envoyer une notification insistante
pour la faire monter sans que les conflits sur le pan diminuent réellement. Une bonne métrique
de succès est reliée le plus directement possible au symptôme du problème initial, pas à un
comportement facilement stimulable par un rappel ou une notification.

Un test rapide pour repérer une métrique manipulable : imagine la pire version malhonnête de
ton équipe, celle qui veut juste "faire monter le chiffre" sans se soucier du problème réel.
Note trois actions qu'elle pourrait prendre pour gonfler la métrique sans rien changer côté
utilisateur (notification agressive, incitation artificielle, changement de définition du
compteur). Si ces trois actions sont faciles à imaginer et peu coûteuses à exécuter, la
métrique est fragile. Une métrique reliée au symptôme réel (conflits évités sur le pan) résiste
mieux à cet exercice : gonfler artificiellement le nombre de réservations créées n'empêche pas
un conflit d'avoir lieu si deux personnes se présentent quand même au même créneau.

## Instrumenter avant de lancer, pas après

Le seuil ne sert à rien si la métrique n'est pas mesurable dès le premier jour d'usage réel.
Pour le club d'escalade, ça veut dire journaliser chaque réservation avec un horodatage, et
comparer a posteriori avec les créneaux réellement occupés (observation manuelle sur deux
semaines, ou capteur de présence si le club en a un). Attendre trois mois pour se demander
comment on va mesurer le succès revient à découvrir, au moment de rendre des comptes, qu'on n'a
gardé aucune trace exploitable.

## Compromis

| Option                                                                        | Coût                                                | Bénéfice                                                                                      | Quand choisir                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Métrique reliée directement au symptôme initial (conflits de créneaux évités) | Parfois plus difficile à instrumenter techniquement | Dit vraiment si le problème est résolu                                                        | Toujours en priorité, même si l'instrumentation demande du travail |
| Métrique d'activité facile à mesurer (comptes créés, vues)                    | Rapide à obtenir dès le lancement                   | Se fait manipuler par n'importe quelle action marketing, ne dit rien sur l'utilité            | Uniquement en complément, jamais comme métrique de décision        |
| Trois paliers de seuil (rouge / orange / vert) plutôt qu'un seuil binaire      | Demande un peu plus de réflexion en amont            | Évite l'arrondi de complaisance et donne une action pour chaque zone de résultat              | Dès que le produit touche plusieurs profils d'utilisateurs         |
| Pas de seuil d'échec défini                                                   | Évite une conversation inconfortable en amont         | Chaque résultat se rationalise après coup, aucun produit n'est jamais officiellement un échec | Jamais                                                             |

## Pièges classiques

- Choisir une métrique de vanité parce qu'elle est facile à obtenir dès le premier jour, alors
  que la vraie métrique demande d'attendre plusieurs semaines d'usage réel.
- Définir le seuil d'échec après avoir vu les premiers résultats, ce qui permet de l'ajuster
  pour qu'il corresponde toujours au chiffre obtenu : le seuil doit être écrit avant.
- Confondre "la métrique est bonne" et "le produit est fini" : une métrique de succès atteinte
  signale un vrai problème résolu, pas l'absence de tout problème restant.
- Mesurer un seul indicateur global sans regarder s'il cache des écarts importants entre
  groupes d'utilisateurs (par exemple, l'outil marche pour les grimpeurs autonomes mais pas
  pour les débutants qui réservent encore par le carnet).
- Arrondir un résultat limite vers le seuil de succès plutôt que d'assumer une zone
  intermédiaire qui demande d'investiguer avant de décider.

## Analogie

Analogie : une métrique de succès, c'est le thermomètre à cœur en cuisine, et le relevé de position en mer.
Où l'analogie casse : le thermomètre mesure une seule grandeur physique, une métrique produit résume des humains et se manipule.

## Ce que tu dois savoir défendre

- La différence entre une métrique de vanité et une métrique de succès produit, avec un
  exemple qui montre qu'une métrique de vanité peut monter sans que le problème soit résolu.
- Pourquoi le seuil d'échec doit être écrit avant le lancement et non après avoir vu les
  premiers chiffres.
- Comment choisir une métrique qui résiste à la manipulation facile (notification, rappel)
  plutôt qu'une métrique qui se laisse gonfler artificiellement.
