---
stability: stable
---

<div align="center">

<img src="./assets/brand/architecte-fantome-logo.png" alt="ARCHITECTE-FANTOME" width="520" />

<br>

> _Construire. Casser. Réparer. Concevoir. Exploiter. Arbitrer. Diriger._

</div>

# ARCHITECTE-FANTOME

> **Construire. Casser. Réparer. Concevoir. Exploiter. Arbitrer. Diriger.**

ARCHITECTE-FANTOME est un parcours CrazyDevs d’ingénierie logicielle. Il part du code que tu peux comprendre seul et t’emmène vers la conception de systèmes que tu peux expliquer, mesurer, exploiter et défendre sous contrainte.

## Comment lire le parcours

Les documents du parcours utilisent une numérotation lisible. Les dossiers de modules portent les préfixes numériques ; les artefacts transverses comme `PROGRESSION.md` et `PREUVES-STAFF-ENGINEER.md` sont des noms canoniques sans préfixe pour éviter toute collision de namespace. Les README servent de portes d’entrée locales ; les noms techniques de code et de configuration gardent leurs conventions. **00 prérequis → 01 pourquoi → 02+ leçons → 50+ pratique/minimini-projets → 90 grimoires → 95 challenge → 96 boss → 97 vérifications → 99 portage → 99A ponts**.

Tu n'as donc pas à deviner “quel fichier ouvrir maintenant”. Les doublons de préfixes sont interdits dans un même dossier, y compris entre fichiers et dossiers. Les suffixes alphabétiques (`01A-...`, `97A-...`) sont réservés aux artefacts auxiliaires qui partagent le rang d’un dossier pédagogique sans concurrencer son rang canonique. Les fichiers techniques nécessaires à l'apprentissage gardent leurs noms canoniques ; le runtime de référence est fixé par `.nvmrc`.

### Règle CrazyDevs

Chaque concept pédagogique important doit avoir une empreinte mémorable : mission, piège, personnage, analogie, incident, conflit ou conséquence. Les références Naruto, Garo, Dragon Ball Z, Attack on Titan, football, Trap Soul/R&B et les autres univers autorisés servent à **ancrer le mécanisme**, jamais à remplacer l'explication technique.

Les mini-projets restent volontairement **sans corrigé** : leurs décisions, tests, ADR, journal TDD et postmortem sont produits par l'apprenant.

## Pour qui ?

Pour quelqu’un qui veut progresser en JavaScript/TypeScript et en ingénierie logicielle au sens large : architecture, systèmes, fiabilité, sécurité, cloud, produit, coût, collaboration et leadership.

Tu n’as pas besoin d’être déjà architecte. Tu dois accepter de pratiquer, de casser des choses et de justifier tes choix.

## Le cerveau 2035+

Le parcours vise un profil **Staff / Principal Engineer + Software / Solutions Architect**. Le noyau durable n’est pas une liste d’outils : c’est la capacité à comprendre un système inconnu, choisir sous contrainte, exploiter, sécuriser, chiffrer, transférer et superviser l’automatisation.

Le parcours contient donc trois terrains supplémentaires sans créer trois spécialisations fermées : `21-CLIENT-SYSTEMS-FLUTTER` pour le client, `12-PLATFORM-ENGINEERING` pour la plateforme multi-équipe, et le lab CMS dans `08-PRODUIT-COUT-ROI` pour exercer le choix produit sans sacraliser une technologie.

## Pourquoi ?

Parce que savoir écrire du code n’est qu’un morceau du métier. Le vrai travail apparaît quand les contraintes arrivent : exigences floues, bugs difficiles à reproduire, données imparfaites, trafic, incidents, coûts, sécurité, désaccords et décisions irréversibles.

La promesse du parcours est simple : apprendre à **raisonner avant de bricoler**, puis à faire tenir ce raisonnement dans un système réel.

## Comment ça marche ?

Le parcours suit une seule boucle :

**Comprendre → Construire → Casser → Réparer → Concevoir → Exploiter → Arbitrer → Diriger**

Chaque module contient une explication, une pratique et un livrable. Les challenges vérifient une compétence. Les Boss demandent une production complète et une défense. Les rétrospectives ferment chaque niveau. La sortie finale n'est pas un simple certificat de lecture : elle exige un portfolio `PREUVES/` construit dans ton dépôt fil rouge et validé par le gate de sortie Staff.

Tu gardes un **projet fil rouge** dès le cadrage. Les notions apprises reviennent ensuite sous une autre contrainte : c’est volontaire. Le but n’est pas de collectionner des fichiers, mais de constater que tu prends de meilleures décisions.

## Où commencer ?

Commence ici, sans ouvrir toute l’arborescence :

**[START HERE](00-SOCLE/01-GETTING-STARTED/01-START_HERE.md)**

Puis utilise **[PROGRESSION.md](PROGRESSION.md)** comme tableau de bord personnel.

Pour comprendre l’échelle du parcours, consulte **[COMPTEURS DU PARCOURS](06-ANNEXES-TRANSVERSES/18-COMPTEURS-DU-PARCOURS.md)**.

Pour vérifier ton propre niveau, utilise les critères du **[STAFF READINESS GATE](06-ANNEXES-TRANSVERSES/37-STAFF-READINESS-GATE.md)** : produire, défendre, transférer et réviser une décision compte davantage que terminer des fichiers.

Pour la qualité pédagogique avancée, consulte aussi **[ÉCHELLE COGNITIVE ADAPTATIVE](06-ANNEXES-TRANSVERSES/32-ECHELLE-COGNITIVE-ADAPTATIVE.md)** et **[ANTI-RECETTE ENGINE](06-ANNEXES-TRANSVERSES/33-ANTI-RECETTE-ENGINE.md)**. Elles empêchent que l’apprenant puisse progresser uniquement en reconnaissant la forme des exercices.

## Les niveaux

| Niveau                                                | Transformation                                                                                                   |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **00 : Socle**                                        | Comprendre le code et résoudre un problème sans se perdre.                                                       |
| **01 : Cadrage**                                      | Choisir le bon problème, gérer l’asynchrone et diagnostiquer proprement.                                         |
| **02 : Construction**                                 | Construire, tester, profiler, refactorer, poser des frontières solides et comprendre le client comme un système. |
| **02bis : Architecture (sous-étape de Construction)** | Partir des contraintes, comparer des options et prendre des décisions d’architecture.                            |
| **03 : Pilotage**                                     | Faire fonctionner le système : sécurité, observabilité, fiabilité, cloud, plateforme, produit et équipe.         |
| **04 : Épreuve**                                      | Lire une grosse codebase, gérer le temps réel et défendre un système complet.                                    |
| **05 : Maîtrise**                                     | Combiner les acquis, arbitrer sous contrainte et transmettre.                                                    |

## Les trois profondeurs de parcours

Le dépôt complet n’est pas une checklist de 1 500 fichiers. Il possède trois profondeurs :

- **CORE** : route intensive de 16 semaines, 12 h/semaine, avec preuves, transfert et défense ;
- **DEPTH** : contenu à ouvrir quand une compétence doit être approfondie ou quand une faiblesse est détectée ;
- **VAULT** : référence durable, variantes, outils et documentation à consulter au besoin.

Le détail de la route intensive est dans [19A-ROUTE-CORE-16-SEMAINES.md](06-ANNEXES-TRANSVERSES/19A-ROUTE-CORE-16-SEMAINES.md). Les durées affichées dans les modules servent de repères de travail. Les mini-projets sont cartographiés dans [25-CORE-MINI-PROJECT-MAP.md](06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md).

Cette séparation ne retire rien du corpus. Elle évite seulement de confondre **richesse de référence** et **quantité à consommer**.

## Comment progresser ?

Ne coche pas parce que tu as lu. Coche quand tu peux **produire la preuve** demandée.

Le rythme est volontairement irrégulier : certains sujets se traversent vite, d’autres exigent plusieurs essais. Quand tu bloques, reviens au prérequis, refais la pratique, puis retente le challenge.

Le **Mode Survie** est une vue accélérée du même parcours canonique pour prioriser l’employabilité. La **Route CORE 16 semaines** définit le sprint intensif. **DEPTH/VAULT** classent la profondeur du même corpus. Aucun de ces modes ne crée une seconde progression ou un second système de certification.

## Que produit l’apprenant ?

Pas 500 pages de notes. Quelques preuves fortes et réutilisables :

- décisions d’architecture et ADR ;
- API et contrats ;
- tests et stratégie de qualité ;
- analyse de performance et de mémoire ;
- sécurité et observabilité ;
- SLI/SLO, récupération et continuité ;
- choix cloud et budget ;
- arbitrages produit/coût/risque ;
- projet fil rouge et capstone ;
- dossier final capable de raconter **problème → contraintes → options → décision → conséquences**.

## Que signifie terminer ?

Terminer ne veut pas dire atteindre le dernier dossier. Cela signifie que tu peux prendre un problème ambigu, construire une solution raisonnable, montrer ses limites, mesurer ce qui compte, récupérer après une panne, expliquer son coût et défendre tes choix devant quelqu’un qui n’est pas d’accord.

Le dernier niveau ne te donne pas 300 notions de plus. Il te demande de **combiner intelligemment celles que tu as déjà rencontrées**, puis de défendre, invalider et transférer les décisions.

La difficulté cognitive doit aussi monter : une compétence réellement maîtrisée doit survivre au diagnostic, à la décision, à la contradiction, à la révision et au transfert. Le passage par les mêmes formulaires n’est jamais considéré comme une preuve supplémentaire en soi.

> **Diplôme AF ≠ Staff Engineer reconnu.** Le diplôme prouve une préparation intensive et des productions évaluables ; le scope, l’influence et les conséquences vécues sur plusieurs mois ou années restent de l’expérience professionnelle.

## L’esprit CrazyDevs

Le parcours est direct, pratique et parfois un peu sale dans son humour. Une punchline peut te faire retenir une idée. Elle ne remplace jamais la définition technique.

> Voilà le problème. Voilà pourquoi il existe. Maintenant regarde la connerie qu’on pourrait faire. Voilà pourquoi elle casse. Maintenant fais mieux.

## Gouvernance canonique du curriculum

Les compteurs pédagogiques sont dérivés du filesystem et des frontmatters. Les contrôles structurels et preuves de release sont conservés hors du produit apprenant.

```text
Les contrôles de release sont exécutés hors du produit apprenant.
```
