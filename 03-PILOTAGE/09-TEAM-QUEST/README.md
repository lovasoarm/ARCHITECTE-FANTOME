---
stability: intemporel
acte: comprendre
route: complete
---

# Module 03-PILOTAGE/09-TEAM-QUEST : Team Quest

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../08-PRODUIT-COUT-ROI/README.md) | [Niveau suivant](../10-TEAM-CRAFT/README.md)

**Ce niveau réutilise :** [08-ROADMAP-RUN](../01-ROADMAP-RUN/04-tracking-reality.md) : les signaux de derive, réutilises pour reperer un desaccord d'equipe avant qu'il bloque un jalon.

**Auto-test d'entrée :** les questions ci-dessous vérifient les acquis de Product Cost & ROI
et de Roadmap Run, pas le contenu de Team Quest.

1. Pourquoi une grille de décision doit-elle inclure valeur, coût, risque et coût d'opportunité ?
2. Pourquoi « ne rien faire » est-elle une option de référence utile ?
3. Quel signal de dérive dans un plan ou un jalon doit conduire à réexaminer la décision ?

**Verdict de l'auto-test :** si deux réponses ou plus manquent, reprends le grimoire du
[niveau précédent, Product Cost & ROI](../08-PRODUIT-COUT-ROI/90-grimoire.md) et, si nécessaire,
celui de [Roadmap Run](../01-ROADMAP-RUN/90-grimoire.md). Roadmap Run est un prérequis amont
réutilisé, pas le précédent immédiat dans l'ordre du bloc.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Tout ce que tu as appris jusqu'ici marche à une personne. Ce niveau ajoute la variable qui
change tout : d'autres humains, avec leur propre contexte, leurs propres désaccords, et un
Git history commun où tes erreurs deviennent visibles pour tout le monde. Une équipe qui
code bien individuellement mais qui n'a pas d'accords de travail clairs perd plus de temps
en friction qu'en bugs. Ce niveau construit les règles implicites qui doivent devenir
explicites, le flux Git qui absorbe le travail parallèle sans collision, et la communication
qui tient sous pression sans dégénérer en silence ou en conflit ouvert.

Prérequis : avoir terminé `03-PILOTAGE/08-PRODUIT-COUT-ROI` et maîtriser les repères de planification et de suivi de `03-PILOTAGE/01-ROADMAP-RUN`. Product Cost & ROI est le précédent immédiat dans l'ordre du bloc ; Roadmap Run est un prérequis amont réutilisé pour relier les accords d'équipe à un plan et à des jalons partagés.

## Ce que tu sais faire à la sortie

- Tu sais rédiger un working agreement qui règle les questions avant qu'elles deviennent des
  conflits (définition de "fini", horaires de revue, qui décide quoi).
- Tu sais choisir un flux Git (trunk-based, GitFlow, feature flags) selon la taille de
  l'équipe et le rythme de release, pas par habitude.
- Tu sais désamorcer un désaccord technique sans écraser l'autre ni t'écraser toi-même.
- Tu sais dire non à une demande intenable sans bloquer la relation avec la personne qui
  demande.
- Tu sais escalader un problème au bon niveau, au bon moment, sans attendre que ça explose.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : pourquoi de bons devs produisent une mauvaise équipe
- [02-working-agreements.md](02-working-agreements.md) : les règles qu'on écrit avant d'en avoir besoin
- [03-git-and-flow.md](03-git-and-flow.md) : branches, PR, releases, feature flags
- [04-communication-under-pressure.md](04-communication-under-pressure.md) : désaccords, escalade, dire non
- [95-challenge.md](95-challenge.md) : rédiger et faire vivre un working agreement
- [96-boss-fight.md](96-boss-fight.md) : un conflit de merge humain, pas technique
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `02` pose le cadre, `03` l'outille techniquement, `04` te donne les réflexes
pour quand le cadre ne suffit plus : parce qu'il ne suffit jamais complètement.

## Ce qui ne se passe pas ici

Ce niveau n'enseigne pas le management au sens hiérarchique. Il s'adresse à des pairs qui
doivent collaborer, avec ou sans manager dans la pièce.

Avant de continuer : passe par [02A-RETRO-BLOC-3-CONDUITE.md](../02A-RETRO-BLOC-3-CONDUITE.md), la
rétrospective du bloc Conduite que tu viens de terminer.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `09-TEAM-QUEST`](00-PREREQUIS.md)
- [Pourquoi de bons devs produisent une mauvaise équipe](01-01-why-this-level.md)
- [Les règles qu'on écrit avant d'en avoir besoin](02-working-agreements.md)
- [Branches, PR, releases, feature flags](03-git-and-flow.md)
- [Désaccords, escalade, dire non](04-communication-under-pressure.md)
- [Boss Fight : Un conflit de merge humain, pas technique](96-boss-fight.md)
- [Challenge : Rédiger et faire vivre un working agreement](95-challenge.md)
- [Grimoire : Team Quest](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Frontière avec TEAM-CRAFT

TEAM-QUEST = travailler ensemble quand les priorités, dépendances et responsabilités se frottent.

## Extension CORE : influence cross-team

<!-- AF-DIAGRAM:influence -->

```text
                 ┌───────────┐
                 │ Decision  │
                 └─────┬─────┘
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Product       SRE        Security
          │            │            │
          └──── objections / feedback ───┘
                         │
                         ▼
                      adoption
```

L’influence traverse des parties prenantes aux objectifs différents avant d’aboutir à l’adoption.

La sortie Staff de ce niveau ne s’arrête pas à « savoir bien communiquer ». Utilise [22-SIMULATION-CROSS-TEAM.md](../../06-ANNEXES-TRANSVERSES/22-SIMULATION-CROSS-TEAM.md) pour simuler un problème porté par plusieurs équipes avec intérêts légitimes mais contradictoires.

La preuve porte sur l’alignement, le compromis, l’adoption et la mesure d’impact : pas seulement sur la qualité du texte technique.

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
