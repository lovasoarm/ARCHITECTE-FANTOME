---
stability: intemporel
acte: comprendre
route: complete
---

# Module 00-SOCLE/06-MINDSET : Mindset

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Module précédent](../05-PROBLEM-SOLVING/README.md) | [Module suivant](../../01-CADRAGE/01-PROBLEM-HUNT/README.md)

**Prérequis immédiat :** le module [05-PROBLEM-SOLVING](../05-PROBLEM-SOLVING/README.md) doit être terminé. Mindset réutilise aussi les [7 règles du Prologue](../02-PROLOGUE/README.md), acquises plus tôt ; elles ne remplacent pas Problem Solving.

**Auto-test d'entrée :**

1. Peux-tu citer, dans l'ordre, les quatre étapes de la méthode de Polya ?
2. Face à « ça ne marche pas », peux-tu préciser le comportement actuel, le comportement attendu, les conditions, l'impact et ce qui a changé récemment ?
3. Peux-tu comparer deux approches plausibles selon la complexité, la performance, le couplage et le coût de changement avant de choisir ?

**Verdict de l'auto-test :** si une réponse hésite, reprends la leçon correspondante : [Polya](../05-PROBLEM-SOLVING/02-polya_method.md), [exigences floues](../05-PROBLEM-SOLVING/06-read_fuzzy_requirements.md) ou [choix d'approche](../05-PROBLEM-SOLVING/05-choose_an_approach.md). Si deux réponses ou plus manquent, refais aussi le [challenge de Problem Solving](../05-PROBLEM-SOLVING/95-challenge.md) avant d'entrer ici. Les règles du Prologue restent un rappel transversal ; elles ne remplacent pas ce prérequis immédiat.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ce niveau construit les quatre outils de pensée que tout le reste du curriculum réutilise :
voir un système comme entrées/sorties/état, évaluer le coût réel d'une décision, raisonner
correctement sous incertitude, et écrire pour clarifier sa pensée avant de coder. Aucune
technologie n'est enseignée ici : c'est le socle sur lequel toute technologie s'appuiera.

Prérequis immédiat : Module `00-SOCLE/05-PROBLEM-SOLVING` terminé. Le Prologue (`00-SOCLE/02-PROLOGUE`) est un acquis antérieur réutilisé ici, pas le prérequis immédiat.

## Ce que tu sais faire à la sortie

- Décrire n'importe quel système en termes d'entrées, sorties, état et effets de bord, et
  situer ses frontières.
- Évaluer si une dette technique est acceptable en fonction de son coût de changement et de
  sa valeur d'option.
- Formuler une hypothèse testable, choisir l'expérience la moins chère pour la vérifier, et
  reconnaître le pari le moins cher parmi plusieurs options incertaines.
- Écrire un ADR ou une note de conception qui tient face à une objection sérieuse.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md)
- [02-thinking-in-systems.md](02-thinking-in-systems.md)
- [03-cost-of-decisions.md](03-cost-of-decisions.md)
- [04-reasoning-under-uncertainty.md](04-reasoning-under-uncertainty.md)
- [05-writing-to-think.md](05-writing-to-think.md)
- [95-challenge.md](95-challenge.md)
- [96-boss-fight.md](96-boss-fight.md) : approfondissement facultatif après le challenge
- [90-grimoire.md](90-grimoire.md)

## Comment lire ce niveau

Les leçons 02 à 05 sont indépendantes dans leur contenu mais cumulatives dans leur usage :
le challenge te demandera de les combiner sur un seul cas. Lis-les dans l'ordre une première
fois, puis garde le grimoire ouvert pendant le challenge. Le boss-fight est un approfondissement
facultatif après le challenge ; il ne constitue pas une seconde gate obligatoire.

## Ce qui ne se passe pas ici

Pas de framework, pas de base de données, pas de ligne de code de production. Si tu veux
"commencer à construire", c'est le signe que ce niveau est nécessaire : c'est exactement le
réflexe qu'il vient corriger.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : approfondissement facultatif ; il ne bloque pas la sortie du module

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `06-MINDSET`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Penser en systèmes](02-thinking-in-systems.md)
- [Le coût des décisions](03-cost-of-decisions.md)
- [Raisonner sous incertitude](04-reasoning-under-uncertainty.md)
- [Écrire pour penser](05-writing-to-think.md)
- [Approfondissement facultatif : défendre une décision face à une objection](96-boss-fight.md)
- [Challenge : note de conception + ADR sur un cas Kintana](95-challenge.md)
- [Grimoire : Module 00-SOCLE/06-MINDSET, Mindset](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique fictif commun, pas un projet personnel imposé. Le challenge Mindset constitue l’activité intégrée obligatoire de première passe et en définit le scénario et les critères. Les trois encadrés « Mission utile » des leçons 01 à 03 enrichissent une seule note en trois étapes : acteurs/invariants, modèle de flux, puis comparaison simple de deux options. Ils ne demandent ni expérience préalable, ni code, ni projet réel, ni trois livrables séparés. La [carte des missions Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) fournit des prolongements facultatifs ; elle ne crée ni prérequis, ni gate supplémentaire. La FAQ IA reste réservée aux activités IA/RAG.
