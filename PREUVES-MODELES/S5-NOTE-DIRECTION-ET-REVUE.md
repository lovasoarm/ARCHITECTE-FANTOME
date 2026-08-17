---
stability: perissable_2027
acte: appliquer
---

# MODÈLE S5 : la revue de code et la note direction : exemplaires de référence

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans ce fichier, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle.

Projet fictif : **Lumen**. Deux pièces distinctes, exigées par `PREUVES-STAFF-ENGINEER.md`.

## Pièce 1 : revue de code écrite, à trois niveaux annoncés

Contribution relue : ajout de l'export comptable mensuel (ADR-004), 380 lignes.

**Bloquant : l'export s'exécute sur la base principale.**
Risque nommé : la mesure du 05/06 montre 60% des connexions consommées pendant 8 minutes.
Au tarif de notre SLO (99,5%, budget de 216 requêtes ratées par semaine), un seul export
consomme environ 2 100 requêtes ratées, soit dix semaines de budget en une nuit. Ce n'est
pas une préférence d'architecture : c'est la rupture d'un engagement écrit. Corriger en
pointant la connexion vers la réplique de lecture, ou démontrer par une mesure que le
chiffre ci-dessus est faux.

**Suggestion : le format de date de l'export.**
Je passerais en date ISO plutôt qu'en format local, pour éviter l'ambiguïté jour/mois côté
tableur. Tu décides, je ne reviendrai pas dessus.

**Question : la reprise après échec partiel.**
Si l'export tombe à 70%, que se passe-t-il au lancement suivant : reprise, doublon, ou
écrasement ? Je ne le vois pas dans le code ni dans les tests. Si le comportement est
volontaire, une ligne de commentaire ou un test nommé suffira.

## Pièce 2 : note d'une page pour une direction non technique

**Objet : pourquoi l'export comptable prendra 14 jours et non 6.**

Nous pouvons livrer l'export comptable de deux façons. La rapide prend 6 jours et ne coûte
rien de plus par mois. La solide prend 14 jours et coûte 96 € de plus par mois.

La version rapide fait lire toute la base par le programme d'export, au même moment que
les utilisateurs. Nous avons mesuré le 5 juin ce que cela produit : pendant environ huit
minutes chaque mois, l'écran de disponibilité devient trop lent, ou n'affiche rien. Nous
avons promis par écrit à trois clients que cet écran répond correctement 99,5 fois sur 100.
Ces huit minutes, à elles seules, consomment dix semaines de la marge d'erreur que cette
promesse nous laisse.

La version solide fait travailler l'export sur une copie de la base, mise à jour en
continu, qui sert uniquement à la lecture. Les utilisateurs ne sont pas ralentis. C'est ce
que coûtent les 96 € mensuels.

Nous recommandons la version solide, et nous prévenons dès cette semaine les sept structures
en attente que la livraison arrive dans quatre semaines. Ce que nous perdons : huit jours de
délai, et une facture d'infrastructure qui passe de 395 à 491 € par mois. Ce que nous
évitons : une promesse écrite rompue le premier mois, devant les trois clients qui l'ont
signée.

**Ce que je ne sais pas encore.** Si le nombre de structures dépasse cinquante, la copie de
lecture pourrait devoir grossir. Je le saurai en rejouant la mesure de charge à ce volume,
et je réponds avant le 30 septembre.

## Pourquoi ces deux pièces vont ensemble

La revue prouve la transmission d'un critère à un pair. La note prouve la traduction du même
fait vers une direction, sans un seul terme technique non expliqué, avec les chiffres exacts
du budget (S1) et de la promesse de service (S3). Une seule des deux ne prouve pas la famille.
