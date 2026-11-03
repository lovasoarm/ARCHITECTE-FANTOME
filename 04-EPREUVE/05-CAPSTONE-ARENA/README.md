---
stability: intemporel
acte: comprendre
route: complete
---

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Contrôle d'entrée](00-PREREQUIS.md) | [Après validation : Day-to-Legend](../../05-MAITRISE/05-DAY-TO-LEGEND/README.md)

# Module 04-EPREUVE/05-CAPSTONE-ARENA : Capstone Arena

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

<!-- AF-DIAGRAM:capstone -->

```text
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

Ce niveau ne t'apprend pas une nouvelle spécialité technique. Il te met en situation de
livrer un projet complet face à un brief client réaliste et volontairement ambigu : comme
celui que tu peux recevoir en mission ou en poste. Le Capstone vérifie ta capacité à mobiliser
les compétences amont pertinentes, à reconnaître celles qui te manquent et à décider sous
incertitude, sans qu'on te dicte quelle compétence utiliser à chaque étape. **Cela ne signifie
pas que tous les modules du dépôt ou du bloc Épreuve doivent avoir été terminés** : seuls les
livrables et gates listés dans `00-PREREQUIS.md` conditionnent l'entrée.

**Verdict du contrôle d'entrée :** le fichier [`00-PREREQUIS.md`](00-PREREQUIS.md)
fait foi. Il vérifie les pièces effectivement exigées, un `PORTAGE.md` au niveau
`PORTAGE_CONÇU` ou `PORTAGE_EXÉCUTÉ`, et les données nécessaires au scénario. La voie
`PORTAGE_CONÇU` ne demande aucun compte ni paiement ; elle ne ferme pas S7. Big App Snoop
peut fournir une preuve complémentaire, mais son challenge n'est pas une condition universelle d'entrée.

**Accès matériel au Capstone :** la voie normale livre une démonstration distante accessible.
Si aucun hébergement gratuit ou environnement partagé sans frais n'est réellement accessible,
la voie `DEMO_LOCALE` de `03-deliverables.md` permet de réaliser et faire examiner le système sur
la machine de l'apprenant, avec procédure reproductible et limites déclarées. Elle permet de
valider le travail technique du Capstone dans son périmètre local ; elle ne vaut ni déploiement
public, ni preuve de production, ni fermeture automatique de S6 ou S7.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

Prérequis d'entrée : satisfaire **toutes** les conditions documentées dans
[`00-PREREQUIS.md`](00-PREREQUIS.md) : les quatre pièces amont, les trois éléments chiffrés
de la tension n°1 et le dossier `PREUVES/PORTAGE.md` avec ses preuves comparables.
Cette porte contrôle les livrables réellement produits ; elle ne demande pas de terminer
tous les modules du bloc `04-EPREUVE`.

Ne constituent **pas** des prérequis universels d'entrée : la lecture complète de Bonus Vault,
Tool Cave ou Realtime, ni le challenge de Big App Snoop. Ces modules conservent leurs
propres objectifs et leurs validations locales. Un de leurs artefacts peut contribuer à une
preuve demandée, mais leur achèvement n'est pas une condition cachée supplémentaire.

La revue `REVUE-DE-RISQUES.md` est un livrable interne du Capstone : elle doit être datée
avant le premier commit de code du jalon 3, conformément à la grille. Elle n'est pas exigée
pour ouvrir le module. Le gabarit de Bonus Vault est facultatif.

Ce niveau ne crée pas une nouvelle méthode technique : il vérifie que les compétences et
preuves amont pertinentes tiennent ensemble sous contrainte réelle.

Auto-test d'entrée :

1. Les quatre pièces amont listées dans `00-PREREQUIS.md` existent-elles réellement et sont-elles vérifiables ?
2. `PORTAGE.md` distingue-t-il les deux modes : en `PORTAGE_CONÇU`, les tests comparables passent sur les deux implémentations locales ; en `PORTAGE_EXÉCUTÉ`, ils passent sur les cibles des deux fournisseurs ? L’écart de coût est-il calculé depuis des prix datés et sourcés ?
3. Les trois éléments de coût de la tension n°1 sont-ils documentés avant le démarrage du capstone ?

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

## Fermeture Staff sans casser le Capstone

Après la validation du capstone, utilise les quatre renforcements du module Staff :

- [Spécification agentique](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/07-SPECIFICATION-AGENTIQUE.md)
- [Organizational reasoning](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/08-ORGANIZATIONAL-REASONING.md)
- [System ownership & migration](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/09-SYSTEM-OWNERSHIP-MIGRATION.md)
- [Gouvernance des systèmes semi-autonomes](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/10-AUTONOMOUS-SYSTEM-GOVERNANCE.md)

Ils ne remplacent ni les challenges, ni le boss, ni la revue externe. Ils rendent explicites quatre contrôles complémentaires : spécification, raisonnement organisationnel, ownership/migration et gouvernance de systèmes autonomes.

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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.
