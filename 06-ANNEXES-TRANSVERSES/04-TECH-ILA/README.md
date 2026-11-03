---
companion: ce parcours
stability: evolutif
acte: comprendre
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/04-TECH-ILA/01-00-why-tech-ila.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/04-TECH-ILA/01-00-why-tech-ila.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# TECH-ILA

> **Statut de fraîcheur :** les principes de transfert sont durables, mais les références d’outils, versions, API et commandes peuvent évoluer. La valeur `evolutif` signale que ces exemples doivent être recontrôlés avant un usage réel ; `freshness_status: not_verified` ne certifie pas leur actualité.

<!-- AF-DIAGRAM:event_loop -->

```text
┌──────────────┐
│ Call Stack   │
└──────┬───────┘
       │ libère
       ▼
┌──────────────┐
│ Microtasks   │
└──────┬───────┘
       │ vide
       ▼
┌──────────────┐
│ Tasks/Timers │
└──────┬───────┘
       │
       └──────────────► Call Stack
```

L’Event Loop reprend le travail lorsque la pile est libérée, en drainant d’abord les microtasks avant les tâches suivantes.

<!-- AF-DIAGRAM:transfer -->

```text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

> **Ce parcours enseigne les mécanismes ; TECH-ILA montre où ils réapparaissent dans des technologies concrètes.** Les exercices vérifient la compréhension, les mini-projets la capacité d'action et le portfolio les décisions prises.

> **Ne commence pas ici.** La porte d'entrée unique reste [START HERE](../../00-SOCLE/01-GETTING-STARTED/01-START_HERE.md). TECH-ILA est une annexe-compagnon : elle ne fait pas partie des lectures obligatoires du premier passage, ne conditionne pas l'accès au Prologue ou à Fundamentals et ne constitue pas une deuxième progression à terminer.

> **Attention : une fiche ne remplace pas la pratique.** Lire le nom d'un outil ou son fonctionnement ne prouve pas qu'on sait l'utiliser. Ouvre uniquement la section à laquelle la Route 58 ou le module courant te renvoie, après avoir atteint ses prérequis locaux. Chaque fiche indique ce qu'il faut déjà savoir ; ces prérequis locaux priment sur le nom de son niveau. Le fichier Niveau 1, par exemple, comprend des sujets qui supposent déjà des acquis Node.js et TypeScript : il ne doit pas être lu intégralement au démarrage.

> **Un seul parcours principal, des lectures ciblées en compagnon.** Les fichiers TECH-ILA ne sont ni une certification parallèle ni une liste de lectures cumulatives. Tu n'as pas à lire les dix fichiers ni à parcourir un niveau entier avant de poursuivre la Route 58.

TECH-ILA est un **compagnon technologique intégré** : ouvre la section correspondante quand le parcours principal te l'indique, ou consulte-la comme référence ciblée lorsque tu as acquis les prérequis.

ce parcours te donne le runtime, la mémoire, l'asynchrone, le debugging, l'architecture. Excellent. Mais un diplômé qui comprend l'event loop et n'a jamais lu un `docker-compose.yml`, jamais ouvert une migration SQL, jamais vu un `guard` NestJS, reste bloqué au premier jour de mission.

Ce document répond à une seule question, répétée des dizaines de fois :

**"Ce que j'ai appris dans ce fichier du parcours, où est-ce que je vais le retrouver dans la vraie vie technologique ?"**

---

## Sommaire

Le contenu est un index de consultation, pas une séquence à lire. Ouvre uniquement la fiche ciblée par la Route 58 ou le module courant, après vérification de ses prérequis locaux. Les numéros classent les sujets ; ils ne créent aucune gate. En incident, ouvre directement le fichier 09.

| # | Fichier | Section | Taille indicative | Ce que tu y gagnes |
|---|---|---|---:|---|
| 0-3 | [02-orientation.md](tech-ila/02-orientation.md) | Lire, classer, ordonner | 294 lignes | La méthode, la classification, la carte des niveaux |
| 4 | [03-niveau-1-socle.md](tech-ila/03-niveau-1-socle.md) | Niveau 1 : Socle professionnel | 975 lignes | Terminal, Git, Node, TS, HTTP, SQL, Docker |
| 5 | [04-niveau-2-frontend.md](tech-ila/04-niveau-2-frontend.md) | Niveau 2 : Frontend | 658 lignes | React, état, stratégies de rendu, perf, a11y |
| 6 | [05-niveau-3-backend.md](tech-ila/05-niveau-3-backend.md) | Niveau 3 : Backend | 517 lignes | Express, NestJS, auth, Redis, fichiers, temps réel |
| 7 | [06-niveau-4-systemes.md](tech-ila/06-niveau-4-systemes.md) | Niveau 4 : Systèmes professionnels | 771 lignes | CI/CD, cloud, observabilité, résilience |
| 8 | [07-niveau-5-transfert.md](tech-ila/07-niveau-5-transfert.md) | Niveau 5 : Transfert | 642 lignes | Python, Java/Spring, .NET |
| 9 | [06-niveau-6-IA.md](tech-ila/06-niveau-6-IA.md) | Niveau 6 : IA | 165 lignes | Diriger, vérifier, refuser |
| 10-11 | [08-cartes-parcours-technologies.md](tech-ila/08-cartes-parcours-technologies.md) | Cartes du parcours ↔ technologies | 362 lignes | Le mapping module par module, et l’inverse |
| 12-14 | [08-IA-exercices-marche-audit.md](tech-ila/08-IA-exercices-marche-audit.md) | Exercices, marché, audit | 123 lignes | Ce qui reste ton travail, la preuve, l’honnêteté |
| 15 | [09-mode-urgence.md](tech-ila/09-mode-urgence.md) | Mode urgence | 126 lignes | Trouver la bonne page en incident en moins de 30 s |

Les nombres de lignes sont indicatifs : ils donnent une idée du volume, pas une consigne de lecture ni un prérequis.

Le niveau 6 (fichier 06) intègre désormais l'ancienne section « angles morts de l'IA » : une doctrine de vérification unifiée, documentée à un endroit de référence puis réutilisée depuis les modules concernés.

---

<a id="rituel-de-revue-trimestrielle"></a>

## Points qui évoluent plus vite

Certaines zones bougent plus vite que les mécanismes de fond. Avant de réutiliser une information de ces sections dans une décision technique, vérifie la documentation officielle et le contexte de version correspondant.

| Zone susceptible d’évoluer      | Fichier                                                       | Point à revalider avant réutilisation                                                                              |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Next.js et stratégies de rendu  | [04-niveau-2-frontend.md](tech-ila/04-niveau-2-frontend.md)   | App Router / Pages Router / RSC ont-ils encore la même forme, ou une nouvelle stratégie de rendu a-t-elle émergé ? |
| Défaillances IA par technologie | 06-niveau-6-IA.md                                             | Les modèles produisent-ils encore les mêmes erreurs types sur ces technos, ou la liste est-elle obsolète ?         |
| Économie du serverless          | [06-niveau-4-systemes.md](tech-ila/06-niveau-4-systemes.md)   | Les ordres de grandeur de coût donnés sont-ils encore réalistes chez les fournisseurs actuels ?                    |
| Threads virtuels Java           | [07-niveau-5-transfert.md](tech-ila/07-niveau-5-transfert.md) | Le statut (preview, stable, par défaut) a-t-il changé depuis la dernière revue ?                                   |
| Express 4 vs 5                  | [05-niveau-3-backend.md](tech-ila/05-niveau-3-backend.md)     | La version majeure recommandée par défaut a-t-elle changé ?                                                        |

Ce tableau aide à repérer les sujets volatils ; les fiches concernées précisent les conditions qui justifient une nouvelle vérification. Les dates et statuts de source conservés dans leur front-matter décrivent le périmètre documentaire, sans garantir l’actualité d’une version au moment où tu la réutilises.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Pourquoi TECH-ILA](01-00-why-tech-ila.md)
- [`tech-ila/`](tech-ila/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Les deux nouveaux terrains du cerveau 2035+

> **SCÈNE CRAZYDEVS : multivers :** tu ne changes pas de cerveau parce que tu changes de stack. Tu changes de terrain pour vérifier que le cerveau survit.

### Client Systems / Flutter

Le module [`21-CLIENT-SYSTEMS-FLUTTER`](../../02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/README.md) suit le même rythme que le cœur JS/TS : le mécanisme appris (état, async, contrats, cache, auth, observabilité) est immédiatement remis en scène côté client Flutter. Flutter n’est pas traité comme une religion de widgets : le test final demande ce qui resterait vrai si le framework disparaissait.

### Platform Engineering

Le module [`12-PLATFORM-ENGINEERING`](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/README.md) reconnecte cloud + sécurité + observabilité + équipe autour de GitOps, IDP, golden paths, drift, toil et DX. Le fournisseur ou l’outil précis peut changer ; les invariants restent.

### CMS comme terrain, pas comme spécialité

Le lab [`06-CMS-ARCHITECTURE-LAB`](../../03-PILOTAGE/08-PRODUIT-COUT-ROI/06-CMS-ARCHITECTURE-LAB/README.md) montre comment une technologie encore largement utilisée devient un exercice Staff : choisir, mesurer, migrer, sécuriser, sortir.


Il n’y a aucune progression à terminer dans TECH-ILA ; ses niveaux ne constituent pas une gate générale du parcours.
