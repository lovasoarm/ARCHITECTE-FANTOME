---

stability: stable
acte: appliquer
---
> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# MODÈLE S5 : la revue de code et la note direction : exemplaires de référence

Temps de lecture ~3 min

> **Scénario fictif.** Les montants, délais et mesures de ce modèle sont des hypothèses pédagogiques, pas des tarifs relevés ni des observations de production. Ils ne sont pas dérivés du modèle S1 ; un projet réel doit recalculer les chiffres à partir de ses propres preuves.

Projet fictif : **Lumen**. Deux pièces distinctes, exigées par `PREUVES-STAFF-ENGINEER.md`.

## Pièce 1 : revue de code écrite, à trois niveaux annoncés

Contribution relue : ajout de l'export comptable mensuel (ADR-004), 380 lignes.

**Bloquant : l'export s'exécute sur la base principale.**
Risque nommé : dans le scénario de charge du 05/06, l'export consomme 60 % des connexions
pendant 8 minutes. Pour la cible de scénario (99,5 %, budget de 216 requêtes ratées par
semaine), le cas estime environ 2 100 requêtes ratées, soit près de dix semaines de budget.
Ces valeurs sont des hypothèses à vérifier par une mesure sur le système réel. Ce n'est
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

Dans ce scénario fictif, l'export comptable a deux options. La rapide prend 6 jours et ne coûte
rien de plus par mois. La solide prend 14 jours et coûte 96 € de plus par mois.

La version rapide fait lire toute la base par le programme d'export, au même moment que
les utilisateurs. Le scénario de charge du 5 juin prévoit que, pendant environ huit
minutes, l'écran de disponibilité devient trop lent ou n'affiche rien ; ce résultat reste à mesurer sur un système réel. Nous
avons promis par écrit à trois clients que cet écran répond correctement 99,5 fois sur 100.
Ces huit minutes, à elles seules, consomment dix semaines de la marge d'erreur que cette
promesse nous laisse.

La version solide fait travailler l'export sur une copie de la base, mise à jour en
continu, qui sert uniquement à la lecture. Le scénario suppose que les utilisateurs ne sont pas ralentis ; un test doit le confirmer. Le surcoût fictif est de 96 € mensuels.

Nous recommandons la version solide, et nous prévenons dès cette semaine les sept structures
en attente que la livraison arrive dans quatre semaines. Ce que nous perdons : huit jours de
délai, et une facture d'infrastructure simulée qui passe de 389,86 à 485,86 € par mois (total S1 à 10 000 utilisateurs, puis +96 € mensuels dans ce scénario). Ce que nous
évitons : une promesse écrite rompue le premier mois, devant les trois clients qui l'ont
signée.

**Ce que le scénario ne démontre pas.** Si le nombre de structures dépasse cinquante, la copie de
lecture pourrait devoir grossir. Le projet réel doit rejouer la mesure de charge à ce volume
avant de confirmer la capacité et le budget.

## Pourquoi ces deux pièces vont ensemble

La revue prouve la transmission d'un critère à un pair. La note prouve la traduction du même
fait vers une direction, sans un seul terme technique non expliqué, avec les chiffres de scénario du budget S1 et de la promesse de service S3 ;
ils ne valent pas mesures de production. Une seule des deux ne prouve pas la famille.
