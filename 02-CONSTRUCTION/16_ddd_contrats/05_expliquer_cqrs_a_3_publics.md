---
stability: intemporel
last_reviewed: 2026-08
depends_on_vendor: false
acte: appliquer
---
# CQRS : expliqué à 3 publics

-> ~15 min, oral chronometre, aucune note ecrite pendant la restitution

Gabarit herite de [00-SOCLE/04_fundamentals/09_expliquer_a_3_publics_closures.md](../../00-SOCLE/04_fundamentals/09_expliquer_a_3_publics_closures.md).
Prerequis : avoir lu [02_cqrs_coherence_terme.md](02_cqrs_coherence_terme.md) et avoir
execute son exercice 1, donc disposer de TES trois lags mesures.

## À UN ENFANT

Dans le stade, il y a la dame au guichet et l'écran géant. La dame doit être exacte :
si elle vend deux fois le même siège, deux personnes se disputent la place. L'écran
géant, lui, affiche « 12 400 spectateurs » ; s'il affiche encore 12 399 pendant deux
secondes après ton entrée, personne n'est blessé. On a donc deux métiers différents,
avec deux règles différentes, reliés par un coursier qui court du guichet à l'écran.
CQRS, c'est décider d'avoir un guichet et un écran plutôt qu'un seul comptoir qui fait
les deux mal.

Contrôle : l'enfant doit pouvoir redire qui doit être exact et qui a le droit d'être en
retard. S'il ne le peut pas, tu as expliqué la technique et pas la contrainte.

## À UN PAIR DEV

Séparation des responsabilités entre le modèle d'écriture (normalisé, transactionnel,
source de vérité) et un ou plusieurs modèles de lecture (dénormalisés, jetables,
reconstructibles depuis le flux d'événements). L'écriture publie un événement, un worker
de projection l'applique, la lecture n'interroge jamais la table d'écriture.

- Ce que ça achète : lectures rapides, montée en charge séparée, formes de lecture
  multiples sans toucher au schéma d'écriture.
- Ce que ça coûte : une fenêtre d'incohérence (chez moi : lag moyen mesuré `___ ms`,
  maximum `___ ms`, à remplir avec TES chiffres), un worker de plus à exploiter, et la
  reprise des projections à écrire avant la mise en production.
- Le piège n°1 : brancher la lecture sur la base d'écriture « juste pour ce cas-là ».
  La contention revient et l'architecture ne sert plus à rien.
- Le piège n°2 : confondre CQRS et event sourcing. On peut faire CQRS sans stocker les
  événements comme source de vérité ; l'inverse est plus rare.

Contrôle : le pair doit pouvoir citer ton chiffre de lag et nommer une mitigation
(lecture depuis le modèle d'écriture pour l'auteur de l'action, accusé optimiste côté
interface).

## À UN CTO QUI DÉFEND LE CRUD

Ce troisième public n'est pas neutre : il est hostile, par expérience et à raison.
Objections branchées sur [06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md),
même méthode de tirage, même grille, chrono 5 minutes par objection.

**Objection 1 — « Un CRUD sur une base bien indexée tient dix fois notre charge.
Pourquoi deux modèles ? »**
Réponse attendue : lui donner raison d'abord, chiffres à l'appui. Tant que la lecture ne
verrouille pas l'écriture et que le volume tient sur une instance, le CRUD est le bon
choix, et CQRS est une dette de complexité gratuite. Le basculement s'argumente sur un
fait mesuré, pas sur une préférence : contention observée en production, ou besoin de
formes de lecture incompatibles avec le schéma d'écriture. Sans ce fait, tu ne défends
pas CQRS, tu le subis.

**Objection 2 — « Vous introduisez volontairement des données fausses à l'écran. »**
Réponse attendue : elles ne sont pas fausses, elles sont datées, et la date est bornée
par un chiffre engageant (« au plus `___ ms` », ton maximum mesuré). Un CRUD répliqué en
lecture a exactement la même propriété, sans que personne ne l'ait écrite : la différence
est que ton lag est mesuré et inscrit dans l'ADR, le sien est subi et inconnu.

**Objection 3 — « Qui exploitera le worker de projection à 3 h du matin ? »**
Réponse attendue : la question est juste et elle a un prix. Nommer les trois coûts
d'exploitation (retard de projection à surveiller comme un SLI, procédure de rejeu,
reconstruction complète du modèle de lecture chronométrée au moins une fois), et les
comparer au coût de l'incident de contention que CQRS évite. Si tu ne peux pas nommer un
astreignant, réponds : « alors on reste en CRUD » — c'est une réponse de Staff, pas une
capitulation.

## AUTO-VÉRIFICATION (binaire, sans auto-notation complaisante)

- [ ] J'ai fait les trois restitutions à voix haute, chronométrées, sans notes.
- [ ] J'ai cité mon lag mesuré, en millisecondes, dans les publics 2 et 3.
- [ ] J'ai formulé au moins une condition écrite dans laquelle le CRUD gagne.
- [ ] J'ai nommé le coût d'exploitation du worker sans le minimiser.

Deux cases non cochées = le drill est à refaire, pas à valider. Suite :
[boss-fight.md](boss-fight.md).
