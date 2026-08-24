---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Templates de décision : ADR, RFC, one-pager

Temps de lecture ~5 min

## Le piège

L'équipe qui gère la refacturation d'énergie d'un immeuble collectif hésite entre stocker
les tarifs horaires en base ou les calculer à la volée depuis un service externe. La
discussion a lieu à l'oral en réunion, personne ne prend de notes structurées, une décision
émerge par lassitude plutôt que par conviction. Six mois plus tard, un nouveau développeur
demande "pourquoi c'est fait comme ça", personne ne se souvient exactement des raisons, et
l'équipe repart dans le même débat depuis zéro : deuxième fois pour le même coût cognitif.

Même scène, autre décor : le club d'escalade qui gère sa bibliothèque de topos hésite entre
un identifiant de voie basé sur un nom (modifiable) ou sur un code stable généré une fois.
Trois bénévoles différents tranchent, chacun à sa façon, sur trois écrans différents du
même produit, parce qu'aucune trace écrite ne dit ce qui a déjà été décidé ailleurs.

## Ce qui se passe vraiment

Un format de décision n'est pas de la bureaucratie. C'est une mémoire externe qui évite de
repayer le coût d'une décision déjà prise. Le choix du bon format dépend de l'enjeu et de
l'audience, pas d'une préférence personnelle pour la paperasse ou contre elle.

```text
Enjeu réversible, une personne     -->  Rien d'écrit, ou une ligne dans le message de commit
Enjeu structurant, équipe restreinte -->  ADR (Architecture Decision Record)
Enjeu qui engage plusieurs équipes  -->  RFC (Request for Comments)
Enjeu qui doit convaincre une direction non technique -->  One-pager
```

Une décision non écrite n'est pas gratuite : elle déplace le coût dans le futur, sous forme
de débat répété, d'archéologie de commits, ou de choix contradictoires pris par des
personnes différentes qui ignorent l'existence les unes des autres.

### ADR : traité ailleurs, une seule fois

Le gabarit d'ADR, son exemple rempli et ses pièges sont enseignés **une seule fois** dans ce
dépôt, à l'endroit où tu rencontres l'écrit d'équipe pour la première fois :
[03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md](../../03-PILOTAGE/10-TEAM-CRAFT/03-adr_writing.md).
C'est la référence : si un ADR de ton dépôt fil rouge diverge de ce gabarit, c'est ce
fichier-là qui a raison, pas celui-ci.

Ce qui reste ici, et qui n'est traité nulle part ailleurs : **le choix** entre ADR, RFC et
one-pager, plus les deux gabarits que l'ADR ne couvre pas.

```text
ADR  --> décision d'équipe déjà prise, tracée pour la mémoire  (gabarit : 03-adr_writing.md)
RFC  --> décision proposée, ouverte à contestation avant d'être prise  (gabarit ci-dessous)
One-pager --> décision à faire valider par une audience non technique  (gabarit ci-dessous)
```

### RFC : pour un changement qui traverse plusieurs équipes ou services

Une RFC diffère d'une ADR par son intention : elle sollicite un retour avant que la décision
ne soit prise, pas après.

```text
Différence clé :
ADR  --> documente une décision déjà prise, pour la mémoire future.
RFC  --> propose une décision, ouverte à contestation, avant qu'elle ne soit prise.
```

Gabarit RFC :

```text
# RFC-NNNN : <titre>

## Problème
<Ce qui ne fonctionne plus ou ne tiendra pas à l'échelle visée, avec des chiffres.>

## Contraintes connues
<Ce qui ne peut pas bouger : SLA existants, formats déjà consommés par d'autres
équipes, budget, date limite.>

## Options considérées
1. <option> : coût, bénéfice, risque
2. <option> : coût, bénéfice, risque

## Proposition
<L'option retenue par l'auteur, et pourquoi.>

## Période de commentaires
Ouverte du <date> au <date>. Passé cette date, la proposition est actée sauf
objection bloquante documentée.
```

Exemple rempli, sur la bibliothèque de topos du club d'escalade, décision qui affecte
l'équipe web et l'équipe mobile :

```text
# RFC-0003 : Identifiant stable des voies d'escalade

## Problème
Les voies sont actuellement identifiées par leur nom, modifiable en édition.
L'application mobile met en cache les favoris par nom : un renommage casse
silencieusement les favoris de 40% des utilisateurs actifs.

## Contraintes connues
L'application mobile ne peut pas être forcée à se mettre à jour immédiatement :
un ancien format doit rester lisible pendant au moins 3 mois.

## Options considérées
1. Identifiant UUID généré à la création : stable, mais illisible dans les logs.
2. Identifiant lisible type "voie-2024-0031" : stable et traçable, coût de
   génération légèrement supérieur.

## Proposition
Option 2, pour la traçabilité dans le support utilisateur.

## Période de commentaires
Ouverte du 2024-04-01 au 2024-04-10.
```

### One-pager : pour convaincre une audience non technique

Un one-pager ne contient jamais de détail d'implémentation. Il répond à trois questions en
une page : quel problème métier concret cela résout, quel est le coût (temps, argent,
risque), quel est le résultat mesurable attendu et à quelle échéance. Aucun jargon technique
non expliqué.

```text
# <Titre orienté résultat, pas technique>

Problème : <en une phrase, ce que vit l'utilisateur ou le métier aujourd'hui>
Coût : <temps équipe, budget, risque pris en l'état>
Résultat attendu : <un chiffre, une échéance>
Ce qu'on ne fait pas : <périmètre explicitement exclu, pour éviter les malentendus>
```

## Compromis

| Format       | Coût de rédaction                    | Bénéfice                                                                                  | Quand choisir                                                         |
| ------------ | ------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Rien d'écrit | Nul                                  | Rapide sur l'instant                                                                      | Décision réversible en une commande, une seule personne concernée     |
| ADR          | 15-30 minutes                        | Mémoire durable, évite de rejouer le débat                                                | Décision d'architecture qui engage l'équipe plus de quelques semaines |
| RFC          | Plusieurs heures, cycle de relecture | Aligne plusieurs équipes avant l'implémentation, réduit le risque de blocage a posteriori | Changement qui traverse des frontières d'équipe ou de service         |
| One-pager    | 30-60 minutes                        | Obtient un budget ou un accord d'une audience non technique                               | Décision qui nécessite une validation hiérarchique ou financière      |

## Critères de tri rapide

Avant de choisir un format, réponds à ces trois questions dans l'ordre :

```text
1. Si je me trompe, est-ce réversible en moins d'une heure ?
   Oui --> rien d'écrit ne suffit, sauf si le sujet revient souvent (alors ADR courte).
   Non --> continue.

2. Est-ce que d'autres équipes que la mienne dépendent du résultat ?
   Oui --> RFC.
   Non --> ADR.

3. Est-ce qu'une personne non technique doit donner un accord (budget, priorité) ?
   Oui --> one-pager, en plus du document technique, jamais à sa place.
```

## Pièges classiques

- **Écrire une ADR après coup pour justifier une décision déjà actée ailleurs.** Symptôme :
  le document ne liste aucune conséquence négative, seulement des avantages.
- **Utiliser une RFC pour une décision déjà prise, la faire passer pour de la concertation.**
  Symptôme : les commentaires reçus ne changent jamais rien à la proposition initiale.
- **Un one-pager truffé de jargon technique.** Symptôme : l'audience non technique hoche la
  tête en réunion mais ne peut reformuler la décision avec ses propres mots ensuite.
- **Sur-documenter une décision triviale.** Symptôme : plus de temps passé à rédiger l'ADR
  qu'à implémenter la décision elle-même.
- **Une RFC sans date de clôture.** Symptôme : la période de commentaires s'étire
  indéfiniment, personne ne sait quand la décision devient effective.
- **Numéroter les ADR au hasard ou sans registre central.** Symptôme : deux ADR portent le
  même numéro dans deux dossiers différents, et personne ne peut les citer sans ambiguïté.

## Analogie

Analogie : un format de décision, c'est le bon de commande au passe, et le report écrit au livre de bord.
Où l'analogie casse : le bon de commande sert dans l'heure, un ADR ne sert que le jour où quelqu'un le rouvre.

## Ce que tu dois savoir défendre

- Explique la différence d'intention entre une ADR et une RFC, pas seulement de format.
- Donne un exemple de décision technique récente que tu as prise sans la documenter, et
  explique si elle aurait mérité une ADR a posteriori.
- Explique pourquoi une ADR sans conséquence négative listée est un signal d'alarme.

## Ce que tu emportes

Un dossier `decisions/` avec un fichier ADR par décision structurante, numéroté et jamais
réécrit après coup : une ADR obsolète est remplacée par une nouvelle ADR qui la référence,
jamais modifiée en place. Trois gabarits prêts à copier (ADR, RFC, one-pager) et une règle
de tri en trois questions pour ne plus hésiter sur le format à utiliser.
