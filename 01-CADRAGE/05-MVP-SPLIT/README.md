---
stability: intemporel
acte: comprendre
route: survie
---

# Module 01-CADRAGE/05-MVP-SPLIT : MVP Split

<!-- AF-DIAGRAM:mvp -->

```text
text
Problem
  │
  ▼
Must prove
  │
  ├────► CORE MVP
  │
  └────► Defer / remove
             │
             ▼
          measure
```

Le MVP choisit la plus petite tranche capable de tester l’hypothèse importante et de produire une mesure.

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../01-PROBLEM-HUNT/README.md) | [Niveau suivant](../../02-CONSTRUCTION/01-USER-WIZARD/README.md)

**Ce niveau réutilise :** [02-PROBLEM-HUNT](../01-PROBLEM-HUNT/04-scope-and-non-goals.md) : les non-objectifs et la metrique de succes, qui donnent les bornes du decoupage en tranches.

**Auto-test d'entrée :**

1. Quelle est la différence entre une demande et un besoin réel ?
2. A quoi sert une section de non-objectifs, concretement, sur les choix d'architecture ?
3. Comment distingues-tu un persona utile d'un persona decoratif ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../01-PROBLEM-HUNT/90-grimoire.md) (20 minutes), puis refais son
[challenge](../01-PROBLEM-HUNT/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au 05-MVP-SPLIT une difficulté qui vient du 01-PROBLEM-HUNT.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ce niveau apprend à découper un problème déjà bien compris (Module `01-CADRAGE/01-PROBLEM-HUNT` fait) en tranches
livrables qui ont de la valeur individuellement. La compétence n'est pas "faire un MVP",
tout le monde connaît le mot. La compétence est de savoir couper une feature sans la casser,
d'estimer sans mentir, et de savoir dire non à un ajout de périmètre sans passer pour quelqu'un
qui ne veut pas travailler.

Ici tu apprends la différence entre une tranche verticale (qui traverse toute la stack et
livre un bout de valeur complet) et une couche horizontale (qui prépare l'infrastructure mais
ne livre rien d'utilisable seule). Tu apprends où placer les lignes de coupe dans une feature
complexe, comment estimer avec de l'incertitude assumée plutôt que cachée, et comment arbitrer
entre dire oui, dire non, et dire "pas maintenant, et voici pourquoi".

Prérequis : Module `01-CADRAGE/01-PROBLEM-HUNT` (Problem Hunt) terminé. Tu dois arriver ici avec un besoin réel identifié,
des utilisateurs qui comptent, des non-objectifs écrits et une métrique de succès définie.
Sans ça, découper un problème mal posé ne fait que produire des tranches inutiles plus vite.

## Ce que tu sais faire à la sortie

- Tu sais distinguer une tranche verticale d'une couche horizontale et tu sais pourquoi
  livrer par couches retarde le retour terrain de plusieurs semaines.
- Tu sais identifier où couper une feature complexe sans casser son utilité, et tu sais
  utiliser un feature flag pour livrer du code incomplet en sécurité.
- Tu sais estimer une tâche en assumant l'incertitude au lieu de la maquiller derrière un
  chiffre unique, et tu sais repérer l'effet tunnel avant qu'il ne te morde.
- Tu sais dire non à une demande de périmètre supplémentaire avec un argument de coût
  d'opportunité, pas avec de la mauvaise volonté.
- Tu sais assumer une dette technique consciemment plutôt que la découvrir en production.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : ce qui casse quand on découpe mal ou pas du tout
- [02-slicing-value.md](02-slicing-value.md) : tranches verticales vs couches horizontales
- [03-cut-lines.md](03-cut-lines.md) : où couper une feature sans la casser, feature flags
- [04-estimating-honestly.md](04-estimating-honestly.md) : incertitude, découpage, budget de temps, effet tunnel
- [05-when-to-say-no.md](05-when-to-say-no.md) : arbitrage, coût d'opportunité, dette assumée
- [95-challenge.md](95-challenge.md) : exercice appliqué, livrable, critères mesurables
- [96-boss-fight.md](96-boss-fight.md) : situation adverse + grille d'évaluation
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `02-slicing-value.md` pose le principe (verticale vs horizontale),
`03-cut-lines.md` l'applique à une feature concrète, `04-estimating-honestly.md` t'apprend
à chiffrer ce découpage sans te mentir, et `05-when-to-say-no.md` te donne les mots pour
défendre ce découpage face à quelqu'un qui veut tout, tout de suite. Le `96-boss-fight.md`
simule exactement cette pression.

## Ce qui ne se passe pas ici

Pas de code de production détaillé, pas de choix de stack technique. Ce niveau produit un plan
de livraison en tranches avec des estimations honnêtes, pas une implémentation. L'exécution
technique du découpage arrive dans les niveaux suivants.

Avant de continuer : passe par [02A-RETRO-BLOC-1-CADRAGE.md](../02A-RETRO-BLOC-1-CADRAGE.md), la
rétrospective du bloc Cadrage que tu viens de terminer.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `05-MVP-SPLIT`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Découper par valeur, pas par couche](02-slicing-value.md)
- [Où couper une feature sans la casser](03-cut-lines.md)
- [Estimer honnêtement](04-estimating-honestly.md)
- [Savoir dire non sans passer pour l'obstacle](05-when-to-say-no.md)
- [Boss Fight : MVP Split](96-boss-fight.md)
- [Challenge : MVP Split](95-challenge.md)
- [Grimoire : Module 01-CADRAGE/05-MVP-SPLIT, MVP Split](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
