---
stability: intemporel
acte: comprendre
route: survie
---

# Module 01-CADRAGE/01-PROBLEM-HUNT : Problem Hunt

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../../00-SOCLE/06-MINDSET/README.md) | [Niveau suivant](../05-MVP-SPLIT/README.md)

**Ce niveau réutilise :** [01-MINDSET](../../00-SOCLE/06-MINDSET/03-cost-of-decisions.md) : le coût réel d'une décision, réutilise pour chiffrer le coût d'un mauvais cadrage.

**Auto-test d'entrée :**

1. Donne un exemple de décision ou le coût de changement est faible au debut et enorme six mois plus tard.
2. Qu'est-ce qu'une hypothese testable, et en quoi differe-t-elle d'une intuition non vérifiée ?
3. Pourquoi ecrire un ADR avant de coder change-t-il la qualite de la décision elle-meme, pas seulement sa tracabilite ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../../00-SOCLE/06-MINDSET/90-grimoire.md) (20 minutes), puis refais son
[challenge](../../00-SOCLE/06-MINDSET/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au 01-PROBLEM-HUNT une difficulté qui vient du 01-CADRAGE.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Ce niveau apprend à chasser le vrai problème avant de chasser la solution. La compétence
n'est pas "coder vite", c'est "coder la bonne chose". Un développeur qui livre une feature
parfaitement construite mais qui répond à une mauvaise demande a produit de la dette, pas
de la valeur : et il l'a fait avec zéro bug, ce qui rend l'erreur encore plus difficile à
détecter en revue de code.

Ici tu apprends à démonter une demande, à repérer les signaux faibles qui trahissent un besoin
mal formulé, à distinguer les utilisateurs qui comptent de ceux qu'on invente pour se rassurer,
à écrire des non-objectifs qui protègent l'architecture, et à définir un seuil d'échec avant
de coder : pas après avoir livré, quand tout le monde est déjà en mode justification.

Prérequis : Module `00-SOCLE/02-PROLOGUE` (Prologue) et Module `00-SOCLE/06-MINDSET` (Mindset) terminés. Tu dois déjà savoir qu'écrire
du code n'est pas une fin en soi.

## Ce que tu sais faire à la sortie

- Tu sais transformer une phrase du type "il nous faudrait un tableau de bord" en une liste
  de besoins réels, avec les contraintes qui les entourent.
- Tu sais mener une interview qui fait émerger des faits et des comportements passés,
  pas des opinions et des promesses futures.
- Tu sais repérer un signal faible (contournement, tableur fantôme, ticket qui revient) avant
  qu'il devienne un incendie.
- Tu sais écrire des "jobs to be done" et distinguer un persona utile d'un persona décoratif
  qui ne sert qu'à décorer un slide.
- Tu sais rédiger une section "non-objectifs" qui a un effet réel sur les choix d'architecture,
  pas juste une liste de vœux pieux.
- Tu sais définir une métrique de succès produit (pas une métrique de vanité) et un seuil
  d'échec explicite, écrits avant la première ligne de code.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : ce qui casse quand on saute la chasse au problème
- [02-find-the-real-need.md](02-find-the-real-need.md) : demande vs besoin vs contrainte, interviews, signaux faibles
- [03-users-and-jobs.md](03-users-and-jobs.md) : jobs to be done, personas utiles vs décoratifs
- [04-scope-and-non-goals.md](04-scope-and-non-goals.md) : écrire les non-objectifs, effet sur l'architecture
- [05-success-metrics.md](05-success-metrics.md) : métrique produit vs vanité, seuil d'échec défini d'avance
- [95-challenge.md](95-challenge.md) : exercice appliqué, livrable, critères mesurables
- [96-boss-fight.md](96-boss-fight.md) : situation adverse + grille d'évaluation
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre, sans sauter `01-01-why-this-level.md`. Les leçons 02 à 05 forment une chaîne :
tu ne peux pas écrire de bons non-objectifs (04) si tu n'as pas identifié le vrai besoin (02)
ni les bons utilisateurs (03). Le `95-challenge.md` te demande d'appliquer les quatre leçons sur
un cas réel, pas un cas jouet. Le `96-boss-fight.md` te met dans une situation où quelqu'un te
pousse à sauter cette étape : c'est le vrai test.

## Ce qui ne se passe pas ici

Pas d'architecture, pas de découpage technique. Ce niveau se termine quand tu as un document
de cadrage solide, pas un schéma de base de données. Le découpage en tranches livrables,
c'est le Module `01-CADRAGE/05-MVP-SPLIT` (MVP Split), qui suppose que ce niveau-ci est acquis.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `01-PROBLEM-HUNT`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Trouver le vrai besoin](02-find-the-real-need.md)
- [Utilisateurs et jobs to be done](03-users-and-jobs.md)
- [Non-objectifs : écrire ce qu'on ne fera pas](04-scope-and-non-goals.md)
- [Métriques de succès et seuil d'échec](05-success-metrics.md)
- [Boss Fight : Problem Hunt](96-boss-fight.md)
- [Challenge : Problem Hunt](95-challenge.md)
- [Grimoire : Module 01-CADRAGE/01-PROBLEM-HUNT, Problem Hunt](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
