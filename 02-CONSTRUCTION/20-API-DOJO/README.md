---
stability: intemporel
acte: comprendre
route: complete
---

# Module 02-CONSTRUCTION/20-API-DOJO : API Dojo

<!-- AF-DIAGRAM:api_request -->

```text
┌────────┐  HTTP   ┌──────────┐  validate  ┌─────────┐
│ Client │────────►│ Gateway  │───────────►│ Handler │
└────────┘         └──────────┘            └────┬────┘
                                                ▼
                                           ┌─────────┐
                                           │ Data    │
                                           └────┬────┘
                                                ▼
                                           Response
```

Le cycle API relie transport, validation, logique métier, persistance et réponse observable.

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../15-ARCHI-LAB/README.md) | [Niveau suivant](../../03-PILOTAGE/01-ROADMAP-RUN/README.md)

**Ce niveau réutilise :** [15-ARCHI-LAB](../15-ARCHI-LAB/03-layers-and-flow.md) : les couches UI / cas d'usage / domaine / infra, réutilisees pour situer la frontiere publique d'un contrat d'API.

**Auto-test d'entrée :**

1. Qu'est-ce qu'un couplage fort, et comment le reperer dans du code que tu n'as jamais vu ?
2. Quelle couche a le droit de connaitre quelle autre, dans le modèle UI / cas d'usage / domaine / infra ?
3. Pourquoi le choix entre monolithe modulaire et services doit-il etre chiffre plutôt que tranche par slogan ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../15-ARCHI-LAB/90-grimoire.md) (20 minutes), puis refais son
[challenge](../15-ARCHI-LAB/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au 20-API-DOJO une difficulté qui vient du 15-ARCHI-LAB.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Tu sais écrire un endpoint qui répond `200 OK` avec le bon JSON. Ce niveau s'attaque à
autre chose : ce qui se passe quand ton API n'est plus seule dans la pièce. Dès qu'un
deuxième système appelle le tien : une appli mobile, un partenaire, un cron de nuit qui
retente trois fois : ton code n'est plus un script qui répond à une requête, c'est un
contrat public que des inconnus vont violer, mal lire, appeler en double, et attaquer.
Une API n'est pas une fonction exposée sur le réseau. C'est une promesse écrite, versionnée,
et défendue dans le temps. Ce niveau te donne les réflexes pour tenir cette promesse sans
que ton système ne s'effondre au premier appelant capricieux.

Prérequis : avoir livré au moins une API HTTP qui fonctionne (Module `01-CADRAGE/05-MVP-SPLIT` ou équivalent), et
avoir complété le Module `02-CONSTRUCTION/15-ARCHI-LAB` : Archi-Lab. Tu dois savoir ce qu'est une couche domaine avant
d'apprendre à protéger sa frontière publique ; sans ça, "contrat d'API" restera un mot vide.

## Ce que tu sais faire à la sortie

- Tu sais écrire un contrat d'API avant le code, et distinguer un changement rétrocompatible
  d'un changement qui casse tous tes clients existants.
- Tu sais concevoir des erreurs exploitables par du code, pas juste lisibles par un humain,
  et implémenter des retries et des clés d'idempotence sans dupliquer une opération.
- Tu sais expliquer la différence entre authentification et autorisation, et dessiner la
  frontière de confiance d'un système qui accepte des appels de plusieurs origines.
- Tu sais mettre en place pagination, rate limiting et cache HTTP sans réinventer une roue
  bancale, et chiffrer l'impact réel de chacun sur la latence perçue.
- Tu sais te défendre à l'oral sur chacun de ces choix, avec un exemple concret, pas un mot
  de vocabulaire récité.

## Fil rouge

Trois systèmes reviennent dans tout le niveau, pour que les leçons s'empilent au lieu de
se contredire :

- **Le cabinet vétérinaire** : une API de prise de rendez-vous et de dossiers patients,
  appelée par une appli mobile grand public et par un logiciel de comptabilité tiers.
- **Les tournées de livraison** : une API qui expose l'état des tournées à des chauffeurs
  via une appli terrain à connexion instable, et à des clients via un portail de suivi.
- **La refacturation d'énergie** : une API B2B exposée à des partenaires qui interrogent des
  volumes de consommation, avec des contraintes réglementaires sur qui a le droit de voir quoi.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : ce qui casse sans discipline d'API
- [02-contracts-first.md](02-contracts-first.md) : contrat avant code, versionnage, compatibilité
- [03-errors-and-idempotence.md](03-errors-and-idempotence.md) : codes, erreurs exploitables, retries, idempotency keys
- [04-auth-and-trust.md](04-auth-and-trust.md) : authn vs authz, tokens, scopes, frontières de confiance
- [05-performance-and-limits.md](05-performance-and-limits.md) : pagination, rate limiting, cache HTTP, latence perçue
- [95-challenge.md](95-challenge.md) : exercice appliqué et livrable noté
- [96-boss-fight.md](96-boss-fight.md) : situation adverse réaliste + grille d'évaluation
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `02` pose le socle : tant que tu ne sais pas ce qu'est un contrat stable, les
leçons suivantes n'ont pas de fondation. `03` et `04` sont les deux niveaux de défense d'une
API exposée : l'un contre les pannes et la concurrence, l'autre contre les acteurs malveillants
ou simplement mal informés. `05` referme la boucle avec les questions qui apparaissent une
fois que l'API a du succès et du trafic réel, ce qui est le meilleur problème à avoir et
aussi celui que le plus de gens ratent.

## Ce qui ne se passe pas ici

Ce niveau ne t'apprend pas un framework précis (REST vs GraphQL vs gRPC au sens outillage,
Swagger vs autre générateur). Il t'apprend les forces qui s'appliquent quel que soit le
protocole choisi : un contrat instable casse des clients en REST comme en gRPC, une clé
d'idempotence manquante double une facture peu importe le framework. Le vocabulaire d'outil
changera au fil de ta carrière ; les problèmes de ce niveau ne changeront pas.

Avant de continuer : passe par [04A-RETRO-BLOC-2BIS-ARCHI.md](../04A-RETRO-BLOC-2BIS-ARCHI.md), la
rétrospective du bloc 2bis (Concepteur) que tu viens de terminer.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `20-API-DOJO`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Le contrat avant le code](02-contracts-first.md)
- [Erreurs exploitables et idempotence](03-errors-and-idempotence.md)
- [Authn vs authz, tokens, scopes, frontières de confiance](04-auth-and-trust.md)
- [Pagination, rate limiting, cache HTTP, latence perçue](05-performance-and-limits.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Boss Fight : Le partenaire pressé et le token trop large](96-boss-fight.md)
- [Challenge : Blinder une API existante](95-challenge.md)
- [Grimoire : Module 02-CONSTRUCTION/20-API-DOJO, API Dojo](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
