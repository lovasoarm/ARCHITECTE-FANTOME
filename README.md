---
stability: stable
---

<div align="center">

<img src="./assets/brand/architecte-fantome-logo.png" alt="ARCHITECTE-FANTOME" width="520" />

<br>

> _Construire. Casser. Réparer. Concevoir. Exploiter. Arbitrer. Diriger._

</div>

# ARCHITECTE-FANTOME

ARCHITECTE-FANTOME (AF) est un parcours d’ingénierie logicielle orienté pratique. Il accompagne l’apprenant des fondamentaux vers la conception, la construction, la sécurisation, l’exploitation et l’évolution de systèmes logiciels complexes (un ensemble de composants qui communiquent et travaillent ensemble pour répondre à un besoin réel (ex. : une plateforme de gestion du trafic combinant frontend, backend, base de données, Cloud et IA).), y compris lorsqu’ils intègrent de l’IA.

Le parcours cherche à développer une capacité démontrable : expliquer pourquoi un système fonctionne, prévoir ses limites, diagnostiquer ses pannes, mesurer ses propriétés et défendre des décisions techniques. Terminer une page ou faire passer un exemple ne constitue pas, à lui seul, une preuve de maîtrise.

## Commencer ici : une seule porte d’entrée

**Ouvre d’abord [START HERE](00-SOCLE/01-GETTING-STARTED/01-START_HERE.md).** Suis son ordre sans prélecture obligatoire : Getting Started, Prologue, puis la route apprenant.

- [58 : Route apprenant cohérente](06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md) est la référence opérationnelle pour savoir quoi faire, dans quel ordre et avec quelle preuve.
- [Formation complète](FORMATION-COMPLETE-INGENIERIE.md) décrit la cible, les huit phases et les paliers de capacité ; elle est une carte de référence, pas un prérequis avant le premier exercice.
- [83 : Ordre des neuf familles de domaines](06-ANNEXES-TRANSVERSES/83-ORDRE-DOMAINES-APPRENTISSAGE.md) donne la vue macro, de Fondations à Technical Leadership & Advanced Architecture.
- [Matrice des progressions](06-ANNEXES-TRANSVERSES/80-MATRICE-PROGRESSIONS.md) explique comment les différentes cartes d’AF s’articulent.
- Le [guide général](06-ANNEXES-TRANSVERSES/00-GUIDE.md) et [Comment utiliser le parcours](06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md) sont des références consultables au besoin, pas des lectures bloquantes.

### Trois niveaux de lecture : ne lis pas le dépôt en entier

1. **Maintenant :** la ressource de l'étape courante dans la Route 58, puis son exemple et sa pratique.
2. **Quand la route le demande :** les prérequis, mini-projets, laboratoires et modules spécialisés liés à cette étape.
3. **En référence :** annexes, matrices, grimoires et approfondissements ; ouvre-les pour répondre à une question précise ou préparer une étape ultérieure.

Les milliers de fichiers éventuels du dépôt représentent un corpus complet, pas un volume de lecture obligatoire pour commencer. Il n'y a pas de rattrapage de toutes les annexes : les statuts `différé` et `facultatif` sont réellement facultatifs jusqu'au moment de reprise indiqué.

## Lire les fichiers Markdown

Ouvre les fichiers `.md` en **aperçu Markdown** plutôt qu'en vue du texte source. Certaines ressources commencent par un bloc de métadonnées YAML encadré par `---` ; d'autres contiennent des commentaires HTML (`<!-- ... -->`). Ces éléments décrivent la ressource ou balisent la structure du dossier : ils ne font pas partie de la leçon à lire. Pour masquer aussi le bloc YAML initial, l'aperçu doit prendre en charge le _YAML Front Matter_ ; les commentaires HTML sont destinés à rester cachés dans le rendu. Si ton lecteur affiche le YAML, utilise un aperçu compatible ou ignore uniquement ce bloc placé au début du fichier. **Ne supprime ni ne modifie ces métadonnées et commentaires** : ils peuvent porter des informations de stabilité, de progression, de provenance ou délimiter des sections utilisées par les index.

## Comprendre les numéros dans les noms de fichiers

Les préfixes numériques des fichiers et des dossiers facilitent le classement et les renvois ; **ils ne constituent pas, à eux seuls, une route de lecture globale**. Un dossier peut contenir des leçons `02` ou `03`, des pratiques `50` à `56`, un grimoire `90` et un challenge `95`. Ce classement peut aussi comporter des ressources complémentaires avec une lettre (`00A`, `01A`, `99A`, `06A`, `06B`) ou un dossier de sous-parcours (`06C`). La lettre distingue un identifiant associé ; elle ne signifie pas automatiquement « prochaine étape » et ne transforme pas les deux fichiers en doublons.

Pour connaître l'ordre réel, ouvre le `README.md` local puis suis la Route 58 lorsqu'elle désigne ce dossier. Dans un module, son tableau de route et ses prérequis explicites priment sur l'ordre alphabétique des noms. Si un dossier ne donne pas d'ordre clair, ne devine pas à partir des chiffres : signale l'ambiguïté et fais-la corriger.

Lorsqu'un dossier et un fichier voisin partagent le même numéro (`04-.../` et `04A-...md`, par exemple), ce ne sont pas automatiquement deux étapes. Le dossier contient une collection ou un sous-parcours ; le fichier avec lettre est une ressource compagne dont le rôle doit être expliqué dans le README parent. Si cette relation n'est pas indiquée, suis uniquement la route locale explicite et considère le nom comme ambigu.

## Le produit fil rouge et le style des leçons

Le parcours utilise **[Kintana](06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md)** comme cas d’étude pédagogique fictif commun (un projet fictif commun utilisé dans AF pour illustrer les leçons et pratiquer (ex. : une plateforme de réservation).). Il ne remplace pas le fil rouge personnel (ton propre projet personnel que tu développes progressivement tout au long de la formation), qui est choisi et qualifié après le Cadrage. Chaque notion contribue à comprendre un système cohérent, plutôt qu'à une collection d'applications jetables. Les principes de pratique, de preuve et de transfert sont présentés dans le [protocole de leçon approfondie](06-ANNEXES-TRANSVERSES/26-PROTOCOLE-LECON-PROFONDE.md).

## Préparer ton environnement

Tu peux lire les leçons et faire les exercices conceptuels sans installer l’ensemble des outils. Avant une activité pratique, commence par le [guide général de préparation](SETUP.md), puis ouvre le `SETUP.md` le plus proche de l’exercice : ce guide local précise les prérequis de l’activité, les commandes de vérification et les solutions de secours lorsque c’est possible ; il prévaut sur le guide général.

Les installations de Node.js, npm, Git, Docker ou d’autres outils se font **manuellement, par l’apprenant, seulement lorsqu’une activité en a besoin**. Suis la version demandée par le guide local et la documentation officielle correspondant à ton système. N’installe pas une technologie simplement parce qu’elle apparaît dans une annexe. Certains projets exécutables comprennent leur propre `package.json`, leurs tests ou leurs fichiers Docker : ce sont des supports de pratique à utiliser lorsque la route t’y conduit.

Le parcours privilégie les activités locales lorsque c’est possible. Une activité qui nécessite un réseau, un service externe ou un fournisseur IA doit le signaler dans ses prérequis ; les exemples d’IA restent des supports d’apprentissage et ne certifient pas un service prêt pour la production.

Les informations qui évoluent : versions, prix, services cloud, sécurité, réglementation, marché et offres d'emploi : doivent être vérifiées auprès des sources officielles à la date d'utilisation. Une date de révision du document ne prouve pas que sa source externe a été reconsultée. En l'absence d'une date explicite de vérification de la source, considère les détails évolutifs comme **à confirmer**, et non comme une information garantie à jour.

## La méthode de travail

Pour une compétence importante, suis cette boucle :

```text
Prédire le résultat
        ↓
Expliquer le mécanisme
        ↓
Pratiquer sans recopier
        ↓
Tester un cas limite
        ↓
Diagnostiquer et corriger
        ↓
Transférer à un autre contexte
        ↓
Revenir vérifier après un délai
```

Consigne les résultats dans la **[fiche d’apprentissage et de preuve](06-ANNEXES-TRANSVERSES/62-FICHE-APPRENTISSAGE-PREUVE.md)**. Utilise la page **[Progression](PROGRESSION.md)** comme tableau de bord personnel. Les [compétences de référence](MATRICE-COMPETENCES.csv) relient les capacités attendues à une ressource canonique (la version officielle) ; les ressources complémentaires sont listées dans [MATRICE-COMPETENCES-RESSOURCES.csv](MATRICE-COMPETENCES-RESSOURCES.csv) et expliquées dans [MATRICE-COMPETENCES-README.md](MATRICE-COMPETENCES-README.md).

## La route

```text
00 SOCLE
    ↓
01 CADRAGE
    ↓
02 CONSTRUCTION
    ↓
03 PILOTAGE
    ↓
04 ÉPREUVE
    ↓
05 MAÎTRISE
```

Ce schéma montre les **six blocs physiques du dépôt** (`00` à `05`) : c'est l'organisation des dossiers, pas la liste complète des étapes pédagogiques. Les étapes de progression, l'ordre exact des ressources, les gates et les remédiations sont décrits dans la [Route 58](06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md), qui fait foi pour savoir quoi étudier ensuite. Une étape de cette route peut traverser plusieurs blocs physiques ; les deux cartes ne correspondent donc pas une à une.

Le bloc `00-SOCLE` comprend six modules principaux et une passerelle Python conditionnelle, à suivre uniquement avant une activité qui demande réellement Python et si les prérequis ne sont pas déjà maîtrisés. Elle n’est pas requise pour la route JavaScript de base. Les numéros des blocs indiquent une direction, pas une obligation de lire chaque fichier. La route canonique utilise les leçons, les mini-projets, les challenges et les ateliers intégrateurs déjà présents. Le CORE de 16 semaines / 192 heures est un parcours facultatif d’orientation ou d’accélération ; il ne représente pas toute la formation et ne garantit aucun niveau professionnel dans un délai donné.

Les laboratoires qui relient les domaines :

- [Fondations et raisonnement](06-ANNEXES-TRANSVERSES/64-LAB-FONDATIONS-ET-RAISONNEMENT.md)
- [Données, API et transactions](06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md)
- [Data Engineering : pipelines, qualité, Kafka, Spark et orchestration](06-ANNEXES-TRANSVERSES/70-DATA-ENGINEERING-CORE/README.md)
- [Mathématiques & Machine Learning](06-ANNEXES-TRANSVERSES/71-MACHINE-LEARNING-MATH-CORE/README.md)
- [Sécurité et architecture](06-ANNEXES-TRANSVERSES/66-LAB-SECURITE-ET-ARCHITECTURE.md)
- [Tests d’ingénierie](06-ANNEXES-TRANSVERSES/63-LAB-TESTING-ENGINEERING.md)
- [DevOps et SRE](06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md)
- [Platform Operations : service, conteneur et drill de dégradation](06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md)
- [Service IA/RAG de bout en bout](06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md)
- [Gate de release des systèmes IA](06-ANNEXES-TRANSVERSES/74-AI-ENGINEERING-RELEASE-GATE.md)
- [Capstone systèmes intégrés](06-ANNEXES-TRANSVERSES/72-DISTINGUISHED-SYSTEMS-CAPSTONE.md)
- [Practicum leadership technique](06-ANNEXES-TRANSVERSES/73-TECHNICAL-LEADERSHIP-PRACTICUM.md)
- [Leadership Field Proof Pack : RFC, adoption, mentorat et impact](06-ANNEXES-TRANSVERSES/76-LEADERSHIP-FIELD-PROOF/README.md)

## Critères de progression et limites de validation

Une ressource n’est acquise que lorsque tu peux réaliser la pratique demandée, expliquer tes choix et produire les éléments de preuve indiqués. Lire une leçon ou terminer un exercice ne suffit pas, à lui seul, à démontrer une compétence transférable.

La complétude documentaire ne remplace pas une validation par un spécialiste indépendant ni une exécution sur une infrastructure réelle. Les activités indiquent leur environnement et leur niveau de preuve ; une simulation locale ne doit jamais être présentée comme une expérience de production.

## Cap professionnel

> **Spécialisations et frontières :** [82 : Cartographie DEPTH, MLOps et applicabilité juridique](06-ANNEXES-TRANSVERSES/82-CARTOGRAPHIE-DEPTH-ET-APPLICABILITE.md).

Le cap de long terme est de développer le jugement d’un ingénieur capable de concevoir et de faire évoluer des systèmes complexes, fiables, sûrs et soutenables. Les rôles Staff Engineer, Principal Engineer, Software Systems Architect ou Distinguished Engineer décrivent des périmètres qui varient selon les organisations ; ils ne sont ni des titres délivrés par ce curriculum, ni des résultats automatiques de sa complétion.

Le [noyau dur technique à l’horizon 2035+](06-ANNEXES-TRANSVERSES/40-NOYAU-DUR-STAFF-PRINCIPAL-2035.md) et le [portefeuille avancé de systèmes](05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/README.md) servent à approfondir ce cap lorsque les prérequis sont acquis. Avant de lancer un de ses dix projets, suis le [parcours de préparation avec les leçons exactes et les gates d’entrée](05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/00-PARCOURS-PREPARATION.md).

## Une règle

Une bonne analogie aide à retenir une idée ; elle ne remplace jamais l’explication technique. Quand une mesure, un test, une source officielle ou une expérience contredit une hypothèse, réexamine cette hypothèse. La capacité à corriger son modèle mental fait partie de l’ingénierie.

Cette édition est une adaptation du curriculum ARCHITECTE-FANTOME destinée aux apprenants ; l’entrée en matière et certaines consignes de pratique ont été reformulées. Le curriculum conserve la licence CC BY-SA 4.0 et les exemples de code la licence CC0 1.0 indiquées dans le fichier `LICENSE`.

---

**ARCHITECTE-FANTOME** : _Des fondamentaux aux systèmes, puis au jugement d’ingénierie._

## Ressources de référence

- [Glossaire général](GLOSSAIRE.md)
- [Méthode d’apprentissage autonome](06-ANNEXES-TRANSVERSES/68-METHODE-APPRENTISSAGE-AUTONOME.md)
- [Standard de complétude d’un module](06-ANNEXES-TRANSVERSES/69-STANDARD-COMPLETUDE-MODULE.md)
- [Route apprenant cohérente](06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md)
- [Dossier de preuves Staff](PREUVES-STAFF-ENGINEER.md)

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

## Navigation des six blocs

- [00 : Socle](00-SOCLE/README.md) : fondamentaux et démarrage.
- [01 : Cadrage](01-CADRAGE/README.md) : raisonnement, async et debugging.
- [02 : Construction](02-CONSTRUCTION/README.md) : modules, tests et mini-projets.
- [03 : Pilotage](03-PILOTAGE/README.md) : sécurité, fiabilité et conduite.
- [04 : Épreuve : Field Exit Card](04-EPREUVE/00-FIELD-EXIT-CARD.md) : preuve de sortie et préparation de la validation.
- [Validation externe](04-EPREUVE/08-EXTERNAL-VALIDATION/README.md) : périmètre et modalités de revue par un tiers.
- [05 : Maîtrise](05-MAITRISE/README.md) : approfondissements et portefeuille avancé.
- [Annexes transverses](06-ANNEXES-TRANSVERSES/README.md) : index des ressources complémentaires.
