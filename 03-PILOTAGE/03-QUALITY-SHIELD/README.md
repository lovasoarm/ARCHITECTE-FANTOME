---
stability: intemporel
acte: comprendre
route: complete
---

# Module 03-PILOTAGE/03-QUALITY-SHIELD : Quality Shield

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../01-ROADMAP-RUN/README.md) | [Niveau suivant](../09-TEAM-QUEST/README.md)

**Ce niveau réutilise :** [20-API-DOJO](../../02-CONSTRUCTION/20-API-DOJO/03-errors-and-idempotence.md) : les erreurs exploitables et l'idempotence, réutilisees pour decider quoi tester et quoi observer.

**Auto-test d'entrée :**

1. Qu'est-ce qu'un jalon réel, par opposition a un jalon decoratif ?
2. Pourquoi faut-il attaquer le risque le plus cher d'un projet en premier plutôt qu'en dernier ?
3. Donne un exemple de signal de derive qu'on peut reperer avant que le retard soit officiel.

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../01-ROADMAP-RUN/90-grimoire.md) (20 minutes), puis refais son
[challenge](../01-ROADMAP-RUN/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au module `03-PILOTAGE/03-QUALITY-SHIELD` une difficulté qui vient du module `03-PILOTAGE/01-ROADMAP-RUN`.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ton code marche. Il tourne en démo, les tests que tu as écrits passent, tout le monde est
content. Trois mois plus tard, il tourne en production avec de vrais utilisateurs, de vrais
pics de charge, et un stagiaire qui pousse une modification à 17h58 un vendredi. Ce niveau
construit le bouclier qui te protège de toi-même et de tes coéquipiers : les tests qui
rapportent vraiment, l'observabilité qui te dit ce qui se passe sans que tu aies à deviner,
la revue de code et la CI comme garde-fous automatiques, et la gestion d'incident qui répare
sans détruire la confiance de l'équipe.

Prérequis : Module `02-CONSTRUCTION/20-API-DOJO` (API Dojo) : tu dois avoir un système qui répond à des requêtes pour
que la notion de test, d'observabilité et d'incident ait un sens concret.

## Ce que tu sais faire à la sortie

- Tu sais choisir quoi tester selon le coût réel d'une panne, pas selon une règle de
  couverture arbitraire.
- Tu sais construire une observabilité qui répond à "qu'est-ce qui se passe là, maintenant"
  sans devoir te connecter en SSH et lire des logs en direct.
- Tu sais organiser une revue de code qui attrape les vrais problèmes au lieu de débattre de
  style, et une CI qui bloque ce qui doit l'être sans ralentir tout le monde.
- Tu sais mener un incident sans paniquer et écrire un postmortem qui change réellement le
  système, pas un rapport qui accuse quelqu'un.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : pourquoi "ça marche chez moi" ne suffit jamais
- [02-tests-that-pay.md](02-tests-that-pay.md) : pyramide vs trophée, quoi tester selon le coût de panne
- [03-observability.md](03-observability.md) : logs structurés, métriques, traces, alertes utiles
- [04-review-and-ci.md](04-review-and-ci.md) : revue de code utile, CI, garde-fous automatiques
- [05-incidents-and-postmortem.md](05-incidents-and-postmortem.md) : gestion d'incident, postmortem sans blâme
- [95-challenge.md](95-challenge.md) : construire le bouclier qualité d'un service réel
- [96-boss-fight.md](96-boss-fight.md) : un incident en production, un dimanche, sans ton lead
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `02` et `03` sont la fondation (savoir ce qui casse, savoir le voir).
`04` empêche que ça casse une deuxième fois. `05` répare quand malgré tout ça casse.

## Ce qui ne se passe pas ici

Ce niveau ne prône pas "100 % de couverture de tests" ni "logguer chaque ligne". Les deux
sont des coûts. Ce niveau t'apprend à dépenser cet effort là où il rapporte.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `03-QUALITY-SHIELD`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe : QUALITY-SHIELD](01-01-why-this-level.md)
- [Pyramide vs trophée, quoi tester selon le coût de la panne](02-tests-that-pay.md)
- [Logs structurés, métriques, traces, alertes utiles](03-observability.md)
- [Revue de code utile, CI, garde-fous automatiques](04-review-and-ci.md)
- [Gestion d'incident, postmortem sans blâme](05-incidents-and-postmortem.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Boss Fight : L'incident du dimanche, sans ton lead](96-boss-fight.md)
- [Challenge : Le bouclier qualité du système de tournées](95-challenge.md)
- [Grimoire : Quality Shield](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
