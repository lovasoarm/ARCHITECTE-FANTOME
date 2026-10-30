---
stability: stable
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# PROGRESSION

**Route canonique : [FORMATION-COMPLETE-INGENIERIE.md](FORMATION-COMPLETE-INGENIERIE.md) + [58 : Route apprenant cohérente](06-ANNEXES-TRANSVERSES/58-ROUTE-APPRENANT-COHERENTE.md).** La première définit les paliers ; la seconde fait le lien entre prérequis, ressources réelles, productions, gates et remédiation. La formation n’a pas de durée de fin prédéterminée ; les étapes et le rythme sont pilotés par les preuves de maîtrise. Le CORE de 16 semaines / 192 h est une route facultative d’orientation/accélération, pas l’ossature de la formation complète.

Ton tableau de bord personnel. Une seule règle : une étape est validée par une **preuve**, pas par le nombre de pages lues.

## Boucle d’apprentissage profonde

Avant chaque leçon importante de la formation complète, applique [26-PROTOCOLE-LECON-PROFONDE.md](06-ANNEXES-TRANSVERSES/26-PROTOCOLE-LECON-PROFONDE.md) et consigne le résultat avec la [fiche de preuve](06-ANNEXES-TRANSVERSES/62-FICHE-APPRENTISSAGE-PREUVE.md) : prédiction → modèle causal → pratique indépendante → perturbation → correction → transfert → rappel différé. Si une ressource ne fournit pas tous les éléments, complète-les dans ta fiche d'étude ; une fiche documentaire ne devient pas une preuve de compétence par sa seule existence.

Les deux chaînes intégratrices à retrouver au cours du parcours sont [DevOps/SRE](06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) (commit → artefact → déploiement → signal → incident → restauration) et [service IA/RAG](06-ANNEXES-TRANSVERSES/60-LAB-SERVICE-IA-END-TO-END.md) (dataset → baseline → retrieval → ACL → génération → évaluation → limites opérationnelles). Les problèmes de transfert transversal sont dans le [pack d'exercices systèmes](06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md).

## Boussole professionnelle : horizon 2035+

- **Cap de capacité :** architecturer et faire fonctionner des systèmes logiciels complexes,
  fiables, sécurisés et soutenables, avec une compréhension critique des systèmes intégrant l'IA.
- **Premier jalon élevé :** Staff Engineer (leadership technique transverse, sans management obligatoire).
- **Cap stratégique de long terme :** Principal Engineer / Software Systems Architect.
- **Étoile du Nord :** impact de niveau Distinguished Engineer / Fellow-equivalent si le parcours,
  les résultats réels et l'organisation le permettent. Ce n'est ni une étape obligatoire ni un titre
  universel.

La feuille de référence est [40 : Noyau dur technique, horizon 2035+](06-ANNEXES-TRANSVERSES/40-NOYAU-DUR-STAFF-PRINCIPAL-2035.md).
Lorsque les prérequis correspondants sont acquis, utilise le [Portefeuille avancé de systèmes 2035+](05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/README.md)
comme route Depth : un seul projet actif à la fois ; réutilise les modules existants au lieu de les dupliquer.
Les règles de validation du [diplôme AF et des revues externes](06-ANNEXES-TRANSVERSES/56-DIPLOME-AF-ET-REVUE-EXTERNE.md)
distinguent portfolio évalué, readiness et grade professionnel réel.
Le CORE de 16 semaines / 192 h est une route facultative d’orientation/accélération : il ne remplace pas la formation complète ni la pratique longitudinale et ne certifie aucun rang professionnel.

## Niveau actuel

**À remplir après chaque Boss :**

- Niveau :
- Boss dernier validé :
- Projet fil rouge :
- Dernière preuve produite :
- Blocage actuel :

## Preuve terrain : état de maturation

La progression pédagogique et la progression professionnelle ne sont pas la même chose. Lorsque tu disposes d'un contexte extérieur, note le niveau atteint sans inventer d'expérience :

```text
T0 = simulation AF
T1 = projet personnel vivant
T2 = petit groupe / association / pair
T3 = open source / mission / client
T4 = production suivie avec responsabilité dans la durée
```

Le [Pont preuve terrain](06-ANNEXES-TRANSVERSES/43-PONT-PREUVE-TERRAIN.md) explique comment faire évoluer une preuve. Le portfolio doit conserver la distinction entre simulation, terrain, revue externe et impact. Cette maturation fait partie de la formation complète et continue bien au-delà du CORE de 16 semaines / 192 h.

### Référence de maîtrise durable

Utilise [NOYAU DUR STAFF / PRINCIPAL 2035+](06-ANNEXES-TRANSVERSES/40-NOYAU-DUR-STAFF-PRINCIPAL-2035.md) pour distinguer les capacités qui doivent devenir durables des spécialisations DEPTH/VAULT. Cette carte définit les capacités durables de la formation complète ; elle ne se réduit pas à un budget d’heures du CORE.

## Parcours canonique par paliers

Les étapes ci-dessous sont des paliers de progression, pas un calendrier. Les gates de la [formation complète](FORMATION-COMPLETE-INGENIERIE.md) priment sur la lecture séquentielle et sur toute durée indicative.

### 00 : SOCLE

**Ce que tu dois faire :** comprendre le terrain, écrire du code simple et apprendre à résoudre un problème sans sauter directement au clavier.

**Ce que tu dois produire :** environnement de travail, premières fonctions testées, notes de raisonnement et premier Boss.

**Boss :** prouver que tu peux lire, modifier et expliquer du code sans dépendre d’un tutoriel pas à pas.

**Prochaine étape :** 01 : CADRAGE.

### 01 : CADRAGE

**Ce que tu dois faire :** cadrer un problème, comprendre l’asynchronisme, déboguer et organiser l’échec.

**Ce que tu dois produire :** problème fil rouge cadré, MVP, hypothèses de debug et stratégie d’erreur.

**Boss :** défendre ce que tu construis et surtout ce que tu refuses de construire.

**Prochaine étape :** 02 : CONSTRUCTION.

### 02 : CONSTRUCTION

**Ce que tu dois faire :** construire, tester, profiler, manipuler les données et faire évoluer le code sans tout casser.

**Ce que tu dois produire :** mini-projets, tests, refactorings, preuves de performance, premiers contrats et un client Flutter relié au système, sans transformer Flutter en fin en soi.

**Boss :** livrer un système qui tient quand les contraintes changent.

**Prochaine étape :** 2bis : ARCHITECTURE.

### 02bis : ARCHITECTURE (sous-étape de 02 : CONSTRUCTION)

**Ce que tu dois faire :** partir du problème et des contraintes, comparer les options et choisir des frontières.

**Ce que tu dois produire :** ADR, diagrammes, contrats, contexte métier et prototype d’architecture.

**Boss :** défendre une vraie décision face à plusieurs solutions plausibles.

**Prochaine étape :** 03 : PILOTAGE.

### 03 : PILOTAGE

**Ce que tu dois faire :** faire fonctionner le système dans le monde réel : priorité, qualité, sécurité, observabilité, fiabilité, cloud, plateforme interne, produit et équipe.

**Ce que tu dois produire :** budget, SLO, revue sécurité, signaux d’observabilité et standards de collaboration.

**Boss :** réagir à une situation sous contrainte, pas réciter une définition.

**Prochaine étape :** 04 : ÉPREUVE.

### 04 : ÉPREUVE

**Ce que tu dois faire :** entrer dans une grosse codebase inconnue, toucher au temps réel et tenir une livraison qui bouge.

**Ce que tu dois produire :** investigation de codebase, modification contrôlée et capstone complet.

**Boss :** relier technique, risque, coût et décision sans casser ce qui existe déjà.

**Prochaine étape :** 05 : MAÎTRISE.

### 05 : MAÎTRISE

**Ce que tu dois faire :** combiner les acquis, résoudre les tensions et transférer les principes hors de ta stack habituelle.

**Ce que tu dois produire :** dossier final, arbitrages, preuve de transfert et soutenance.

**Boss :** montrer une transformation, pas seulement une accumulation de fichiers.

**Prochaine étape :** maintenir, transmettre et continuer à apprendre.

## Mode Survie : vue accélérée facultative, pas la formation complète

Le **Mode Survie** est une sélection accélérée des preuves déjà présentes dans le parcours canonique. Il ne crée ni niveaux, ni prérequis, ni système de validation parallèle : tu conserves le même `Niveau`, le même `Boss` et les mêmes preuves que dans `PROGRESSION.md`. Il sert uniquement à prioriser les compétences immédiatement utiles à l’employabilité.

Quand ton rythme change, reprends simplement le parcours canonique au dernier Boss validé. Aucun transfert de progression entre deux curricula n’est nécessaire.

## Épreuve intégratrice D8

<!-- AF-DIAGRAM:d7d8 -->

```text
D1 connaître
  │
  ▼
D3 diagnostiquer
  │
  ▼
D4 arbitrer
  │
  ▼
D5 transférer
  │
  ▼
D7 invalider son modèle
  │
  ▼
D8 reconstruire sous contrainte
```

La profondeur D7→D8 exige de pouvoir abandonner puis reconstruire son propre modèle mental.

Avant la sortie Staff, joue [29-EPREUVE-D8-RECONSTRUCTION.md](06-ANNEXES-TRANSVERSES/29-EPREUVE-D8-RECONSTRUCTION.md). Cette épreuve vérifie explicitement la reconstruction d’un modèle sous contraintes nouvelles ; elle complète les Boss, le transfert et la perturbation sans fournir de solution d’architecture.

> Pour les preuves de profondeur D7/D8 : [`Matrice D7→D8`](06-ANNEXES-TRANSVERSES/34-D7-D8-PROOF-MATRIX.md).

## Renforcement du palier Staff

Ce renforcement n'ajoute pas une nouvelle étape CORE. Il consolide la sortie du palier terminal avec deux preuves :

- [Boucle d'ownership en production](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/11-PRODUCTION-OWNERSHIP-LOOP.md)
- [Staff Judgment Arena](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/12-STAFF-JUDGMENT-ARENA.md)

La préparation se lit à travers les gates Staff, le transfert T0→T4 et les preuves produites par l’apprenant.
