# Challenge : Problem Hunt

## Contexte

Un réseau de trois cabinets vétérinaires partage le même standard téléphonique. La direction
te contacte avec cette phrase : "il nous faudrait un outil pour mieux gérer les urgences."
C'est tout ce que tu reçois au départ. Le standard actuel fonctionne avec un carnet papier par
cabinet et un groupe WhatsApp entre secrétaires pour se prévenir des urgences qui débordent
d'un cabinet à l'autre.

## Ce que tu dois produire

Un document de cadrage, en markdown, structuré exactement comme suit :

1. **Demande initiale vs besoin réel** : reformule la phrase de départ en identifiant au moins
   trois interprétations possibles différentes de "mieux gérer les urgences", et explique
   laquelle tu retiendrais en priorité et pourquoi : en t'appuyant sur des signaux faibles
   plausibles que tu inventes de façon crédible (contournement observé, tableau fantôme,
   plainte récurrente).
2. **Jobs to be done** : au moins deux jobs distincts pour au moins deux rôles différents
   (secrétaire, vétérinaire de garde, propriétaire d'animal), formulés avec la structure
   "Quand..., je veux..., pour pouvoir...".
3. **Non-objectifs** : au moins trois non-objectifs écrits, chacun avec sa raison d'être
   explicite (risque, coût, complexité évitée), et une explication de la différence entre
   chaque non-objectif et une simple fonctionnalité reportée.
4. **Métrique de succès et seuil d'échec** : une métrique reliée directement au symptôme
   initial (pas une métrique de vanité), et un seuil d'échec chiffré, à évaluer après une
   durée que tu justifies.

## Contraintes

- Aucun des exemples utilisés (cabinet vétérinaire, urgences, WhatsApp) ne doit être remplacé
  par un exemple générique de type todo, blog ou e-commerce.
- Le document ne doit contenir aucune fonctionnalité déjà décrite en détail : c'est un
  document de cadrage, pas une spécification technique.
- Longueur cible : 80 à 150 lignes de markdown dense, pas de remplissage.

## Critères de réussite mesurables

- Les trois interprétations de la demande initiale sont réellement différentes entre elles
  (pas trois reformulations de la même idée).
- Chaque job to be done est vérifiable : il indique une situation concrète, pas une envie
  générale ("je veux une bonne appli").
- Chaque non-objectif passe le test de la leçon 04 : si on le supprime, une décision de
  conception change réellement.
- La métrique de succès ne peut pas monter sans que le symptôme initial diminue : vérifie-le
  explicitement en une phrase dans ton document.
- Le seuil d'échec est un chiffre, pas une phrase vague comme "si ça ne marche pas bien".


## Durée cible

3 heures, en deux passes séparées par une nuit.
Passe 1 (2 h) : les trois interprétations et les jobs to be done.
Passe 2 (1 h) : les non-objectifs et la métrique, écrits à froid.
Si tu dépasses 4 h : tu es en train de spécifier au lieu de cadrer. Coupe. C'est exactement le
symptôme que la leçon 04 t'apprend à repérer, appliqué sur toi-même.

## Livrable

Un fichier markdown unique, nommé `cadrage-veterinaire.md`, respectant la structure ci-dessus.

## Horodatage

En tête de ton livrable, note deux dates à la minute : le moment où tu as écrit la première
ligne, le moment où tu as écrit la dernière. Note aussi si tu avais déjà commencé à imaginer
la solution avant la première date. Cette dernière mention n'est pas une confession : c'est la
seule façon de savoir, plus tard, si ce document a orienté ta décision ou s'il l'a maquillée
après coup.
