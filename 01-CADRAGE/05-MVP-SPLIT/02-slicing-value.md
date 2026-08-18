# Découper par valeur, pas par couche

## La scène

Une bibliothèque de club d'escalade veut numériser le prêt de son matériel (cordes,
baudriers, chaussons) actuellement géré sur un cahier. Le cahier des charges liste : gestion
des membres, catalogue de matériel avec état d'usure, emprunt, retour, relances de retard,
statistiques d'utilisation par matériel. Un développeur pressé de "faire les choses bien"
commence par modéliser une base de données complète pour tous ces besoins, puis construit
une API générique CRUD pour chaque entité, puis attaque le frontend. Après trois semaines,
rien ne fonctionne de bout en bout : la base est prête, l'API répond, mais aucun bénévole du
club n'a encore pu enregistrer un seul emprunt réel. Le président du club, qui avait promis
le nouvel outil à l'assemblée générale, doit annoncer un report.

## Ce qui se passe vraiment

Une **couche horizontale** est une strate technique complète (toute la base de données, toute
l'API, tout le design system) qui ne produit rien d'utilisable tant que les autres couches ne
sont pas terminées. Une **tranche verticale** est un scénario utilisateur complet, du geste
initial jusqu'à l'effet final observable, qui traverse toutes les couches nécessaires mais se
limite à un périmètre fonctionnel réduit.

Pour la bibliothèque du club, la première tranche verticale pourrait être : "un bénévole peut
enregistrer qu'une corde précise est empruntée par un membre précis, et voir que cette corde
n'apparaît plus comme disponible." Ça suppose une table membres minimale (juste un nom), une
table matériel minimale (juste un identifiant et un statut), un formulaire simple, une route
API, un affichage de disponibilité. Limité, mais complet et testable en vrai dès la fin de
la tranche : un bénévole peut l'utiliser au prochain créneau du club.

```text
Couches horizontales                    Tranches verticales
--------------------                    --------------------
Base de données complète                Tranche 1 : emprunt simple
     | (rien d'utilisable)              d'une corde par un membre
     v                                  --> livrable, testable, utile seul
API générique CRUD
     | (rien d'utilisable)              Tranche 2 : retour + relance
     v                                  de retard
Frontend complet                        --> livrable, ajoute de la valeur
     |
     v                                  Tranche 3 : état d'usure +
Tout devient utilisable                 statistiques d'utilisation
   d'un coup, à la fin                  --> livrable, complète le tableau
```

Le point clé : chaque tranche verticale a une valeur propre, indépendante des tranches
suivantes. Si le projet s'arrête après la tranche 1, le club dispose déjà d'un outil qui
remplace utilement le cahier pour l'usage le plus fréquent (l'emprunt).

## Le calcul qui justifie le découpage vertical

Chiffre le coût du découpage horizontal sur cet exemple précis. Budget total estimé du projet :
15 jours. Découpage horizontal classique : base de données complète (4 jours), API CRUD pour
les 5 entités (5 jours), frontend complet (6 jours). Premier retour terrain possible : jour 15,
au mieux, si rien ne dérape. En pratique, un projet de ce type dérape de 30 à 50% quand il n'a
jamais été confronté à un utilisateur réel avant la fin : la modélisation de la base a supposé
des choses que seul un bénévole en action aurait pu corriger (par exemple : deux cordes
identiques prêtées par erreur au même membre, un cas que personne n'avait — pas un prérequis : ce module en donne le strict nécessaire, le fond est enseigné là-bas plus tard).

Découpage vertical sur le même projet : tranche 1 (emprunt simple) en 3 jours, testée en
conditions réelles au créneau suivant du club. Tranche 2 (retour et relance) en 3 jours,
enrichie par ce que la tranche 1 a révélé. Tranche 3 (état d'usure et statistiques) en 4 jours.
Total similaire en jours de travail brut, mais premier retour terrain au jour 3 au lieu du jour
15 : cinq fois plus tôt. Si la tranche 1 révèle une erreur de modélisation, elle coûte 3 jours à
corriger, pas 15.

## Comment reconnaître une "fausse" tranche verticale

Toutes les tranches ne se valent pas. Une tranche verticale mal choisie traverse les couches
mais ne produit rien d'exploitable en pratique.

- Une tranche est vraie si un utilisateur réel peut l'utiliser sans dépendre d'une tranche
  future non encore livrée.
- Une tranche est fausse si elle nécessite "juste encore un petit bout" pour devenir utile
  (exemple : afficher le catalogue de matériel sans pouvoir encore rien emprunter : ça ne
  change le quotidien de personne).
- Une tranche est vraie si elle peut être mesurée : on peut compter combien de fois elle a
  été utilisée en vrai.
- Une tranche est fausse si sa seule justification est "ça prépare le terrain pour la suite",
  c'est une couche horizontale déguisée en tranche.

## Arbre de décision pour choisir la première tranche

```text
Parmi les scénarios possibles, lequel découper en premier ?
                    |
      Se produit-il au moins une fois par semaine
      dans l'usage réel du club ?
           |                        |
          non                      oui
           |                        |
    Reporte-le                Un bénévole peut-il
    (statistiques,             l'exécuter seul, sans
     relances rares)           intervention du dev,
                                une fois livré ?
                                     |             |
                                    non           oui
                                     |             |
                              Simplifie encore   Choisis-le comme
                              (retire une        tranche 1
                              condition, un
                              cas limite)
```

Dans l'exemple du club, "emprunt simple" coche les deux cases : ça arrive à chaque créneau, et
un bénévole peut le faire seul avec un formulaire minimal. "Statistiques d'utilisation" ne les
coche pas : ça n'arrive jamais en direct pendant un créneau, ça peut attendre.


## Analogie

Découper par tranche verticale, c'est comme un service en cuisine de restaurant qui sort une
assiette complète et mangeable table par table, plutôt qu'une régie de spectacle qui monte tout
le décor avant d'allumer le premier projecteur.
Où l'analogie casse : en cuisine, chaque assiette est jetée après le service, rien n'est
réutilisé d'une commande à l'autre. En logiciel, la tranche 1 laisse du code (tables, routes)
que la tranche 2 réutilise et étend : la vraie difficulté est justement de choisir ce qu'on
construit assez solide pour être réutilisé sans construire une fondation complète à l'avance.

## Compromis

| Option                                                           | Coût                                                                                                                       | Bénéfice                                                                                                             | Quand choisir                                                                                   |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Découpage vertical strict                                        | Duplique parfois du code entre tranches (une table réutilisée est étendue plutôt que reconstruite proprement dès le début) | Valeur livrée dès la première tranche, retour terrain rapide                                                         | Presque toujours, en particulier en début de projet ou avec un budget incertain                 |
| Découpage horizontal complet avant toute livraison               | Rassure sur la propreté de l'architecture initiale                                                                         | Retarde tout retour terrain de plusieurs semaines, risque d'investir dans une architecture pour un besoin mal validé | Seulement quand le besoin est déjà validé à 100% par ailleurs et que le risque produit est nul   |
| Mélange : fondations minimales communes puis tranches verticales | Demande de la discipline pour ne pas dériver vers "encore une fondation"                                                   | Bon compromis entre propreté et vitesse de livraison                                                                 | Projets où plusieurs tranches partageront un socle évident (authentification, par exemple)       |

## Pièges classiques

- Appeler "MVP" une version qui contient encore toutes les fonctionnalités mais "en plus
  moche" : ce n'est pas un découpage par valeur, c'est juste une version bâclée du même
  périmètre complet.
- Croire qu'une fondation technique solide dès le départ fera gagner du temps plus tard,
  alors qu'elle retarde la première validation terrain, qui est souvent bien plus précieuse.
- Découper par écran plutôt que par scénario complet ("d'abord l'écran de connexion, puis
  l'écran de liste") : un écran seul, sans le flux qui le traverse, ne livre rien d'utile.
- Négliger la mesurabilité d'une tranche : si tu ne peux pas dire combien de fois elle a servi
  après livraison, tu ne sauras jamais si elle valait la peine d'être construite en premier.
- Choisir la première tranche pour sa simplicité technique plutôt que pour sa fréquence
  d'usage réelle : la tranche la plus facile à coder n'est pas toujours celle qui débloque le
  plus de valeur pour l'utilisateur.

## Ce que tu dois savoir défendre

- La différence concrète entre une tranche verticale et une couche horizontale, avec un
  exemple qui montre pourquoi une "fausse" tranche verticale ne compte pas.
- Pourquoi une fondation technique "propre dès le départ" peut être un mauvais calcul en
  début de projet, même si elle semble techniquement supérieure.
- Comment vérifier, avant de coder une tranche, qu'elle sera réellement mesurable une fois
  livrée.
