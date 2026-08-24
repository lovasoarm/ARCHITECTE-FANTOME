---
stability: intemporel
acte: comprendre
route: complete
---

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../04-BIG-APP-SNOOP/README.md) | [Niveau suivant](../../05-MAITRISE/05-DAY-TO-LEGEND/README.md)

# Module 04-EPREUVE/05-CAPSTONE-ARENA : Capstone Arena

<!-- AF-DIAGRAM:influence -->

```text
text
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

<!-- AF-DIAGRAM:capstone -->

```text
text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

## Ce que c'est

Ce niveau ne t'apprend rien de nouveau techniquement. Il te met en situation de livrer un
projet complet, seul, face à un brief client réaliste et volontairement ambigu : comme celui
que tu recevras vraiment en mission ou en poste. Aucun niveau précédent ne t'a préparé un
cahier des charges propre : ici non plus. Le capstone teste ta capacité à mobiliser tout ce
que tous les modules qui precedent t'ont donné, dans le désordre et sous incertitude, sans qu'on te dise
quelle compétence utiliser à quel moment.

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../04-BIG-APP-SNOOP/90-grimoire.md) (20 minutes), puis refais son
[challenge](../04-BIG-APP-SNOOP/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au module `04-EPREUVE/05-CAPSTONE-ARENA` une difficulté qui vient du module `04-EPREUVE/04-BIG-APP-SNOOP`.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

Prérequis : tous tous les modules qui precedent terminés, avec leurs challenges et boss fights validés.
Ce niveau n'enseigne pas de méthode nouvelle, il vérifie que les précédentes tiennent
ensemble sous pression réelle.

Ce niveau réutilise : tous les modules qui precedent dans leur ensemble, mobilisés sans indication de
quand utiliser quoi, exactement comme en mission réelle.

Auto-test d'entrée : (1) As-tu terminé et validé les onze niveaux précédents, challenges et
boss fights compris ? (2) Sais-tu déjà que personne ne va clarifier le brief à ta place, et
que c'est volontaire ? (3) As-tu vu, dans un contexte réel ou rapporté, un projet dérailler
à cause d'un brief mal cadré au départ ?

## Ce que tu sais faire à la sortie

- Tu sais transformer un brief flou et parfois contradictoire en un périmètre livrable, sans
  attendre qu'on clarifie tout à ta place.
- Tu sais produire une liste de livrables vérifiables, pas une intention vague de "faire de
  ton mieux".
- Tu sais t'auto-évaluer avec une grille chiffrée avant qu'un tiers ne le fasse à ta place.
- Tu as un projet complet, démontrable, que tu peux présenter à un recruteur ou un client
  sans rougir de ses angles morts : parce que tu les connais et tu peux les nommer.

## Structure du niveau

```text
12-CAPSTONE-ARENA/
|-- 01-01-why-this-level.md      --> pourquoi un brief ambigu est un test, pas un défaut
|-- 02-briefing.md             --> le brief client réaliste et ambigu
|-- 03-deliverables.md         --> ce que tu dois livrer, précisément
|-- 04-evaluation-grid.md      --> grille chiffrée
|-- 05-changement-de-spec.md   --> mesurer le coût d'un changement de spec en cours de route
|-- 95-challenge.md                --> le capstone lui-même
|-- 96-boss-fight.md                --> un imprévu de dernière minute
\-- 90-grimoire.md                  --> mémo dense
```

## Écart au gabarit assumé

[08-SCELLE-MESSAGE-CLIENT-JALON-2.md](08-SCELLE-MESSAGE-CLIENT-JALON-2.md) est volontairement
court, sans schéma ASCII ni questions de défense, hors de la fenêtre 150-350 lignes. Ce n'est pas un oubli, c'est le
dispositif : une enveloppe scellée doit se lire en trente secondes, au moment précis où elle
est autorisée.
Ne pas allonger ce fichier. L'allonger détruit le contrôle d'antériorité d'ADR noté 20 points
dans [04-evaluation-grid.md](04-evaluation-grid.md).
Son nom en majuscules le sort volontairement de l'ordre alphabétique des leçons numérotées :
un apprenant qui parcourt les fichiers dans l'ordre ne doit pas tomber dessus au jalon 0.

## Écart au gabarit : volume de défense

Les fichiers de ce niveau portent 5 à 6 questions de défense au lieu de 3. Le capstone est le
seul livrable évalué sur 340 points devant une grille complète : trois questions ne couvrent
pas la surface d'attaque réelle d'un projet complet. Le compte de 3 reste la règle pour tous
les autres niveaux.

## Comment lire ce niveau

Lis `02-briefing.md` une seule fois, en entier, sans sauter aux livrables. Note tes premières
questions avant de lire `03-deliverables.md` : c'est un exercice volontaire : la plupart des
briefs réels ne répondent pas à tes questions avant que tu ne livres quelque chose. Utilise
`04-evaluation-grid.md` pour t'auto-évaluer avant toute revue externe.

Lis `05-changement-de-spec.md` après avoir validé ton jalon Architecture : c'est le moment
exact où ce niveau simule un changement de contrainte tombé en cours de route.

Avant de continuer : passe par [02A-RETRO-BLOC-4-EPREUVE.md](../02A-RETRO-BLOC-4-EPREUVE.md), la
rétrospective du bloc Épreuve que tu viens de terminer.

## Ce qui ne se passe pas ici

Personne ne va clarifier le brief à ta place. C'est le point.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : capstone arena](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Le brief](02-briefing.md)
- [Les livrables](03-deliverables.md)
- [Grille d'évaluation chiffrée](04-evaluation-grid.md)
- [Changement de spec : la tarification différenciée par salle](05-changement-de-spec.md)
- [Addendum Staff Engineer au Capstone](06-addendum-staff-engineer.md)
- [Semaine à double dérive : technique ET roadmap, en même temps](07-semaine-double-derive.md)
- [ENVELOPPE SCELLÉE - ne pas lire avant le jalon 2](08-SCELLE-MESSAGE-CLIENT-JALON-2.md)
- [Security gate : fil rouge (cloud + brique IA)](09-SECURITY-GATE-FIL-ROUGE.md)
- [Boss Fight : Le pivot à J-10](96-boss-fight.md)
- [Challenge : Le capstone](95-challenge.md)
- [Grimoire : Capstone Arena](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Extension CORE : dérive organisationnelle

En plus de la double dérive technique/roadmap, le capstone peut recevoir une dérive d’organisation : une équipe refuse une partie de la proposition, une autre demande une priorité concurrente, ou un sponsor change le critère de succès. L’apprenant doit alors produire la meilleure décision **adoptable**, pas seulement la meilleure architecture sur le papier.

Utiliser [22-SIMULATION-CROSS-TEAM.md](../../06-ANNEXES-TRANSVERSES/22-SIMULATION-CROSS-TEAM.md) et documenter : stakeholder impact, compromis, plan d’adoption, métrique de succès et condition d’arrêt.
