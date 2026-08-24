---
statut: revu
last_reviewed: 2026-08
last_counted: 2026-08
proprietaire: mainteneur TECH-ILA
revue: trimestrielle
companion: ce parcours
stability: intemporel
acte: comprendre
---

# TECH-ILA

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
text
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

> **ce parcours enseigne le cerveau. TECH-ILA montre où ce cerveau s'utilise.**
> Les exercices vérifient la compréhension. Les mini-projets prouvent la capacité d'action. Le portfolio montre les décisions prises.

> **Attention : lu seul, ce document ment sur ta compétence.**
> Lu sans ce parcours, ce document produit un faux sentiment de compétence. Tu reconnaîtrais des gestes, des noms d'outils, des tableaux de comparaison : sans jamais avoir touché le mécanisme qu'ils supposent acquis. Avant d'ouvrir le niveau 1, fais au minimum ces trois modules :
>
> - [00-SOCLE/01-GETTING-STARTED/01A-00-why-getting-started.md](../../00-SOCLE/01-GETTING-STARTED/01A-00-why-getting-started.md) : installation, terminal, premier jour.
> - [00-SOCLE/03-REFERENTIEL/01-00-why-referentiel.md](../../00-SOCLE/03-REFERENTIEL/01-00-why-referentiel.md) : le référentiel de compétences et la grille intemporel/périssable.
> - [00-SOCLE/04-FUNDAMENTALS/01A-00-why-fundamentals.md](../../00-SOCLE/04-FUNDAMENTALS/01A-00-why-fundamentals.md) : variables, scope, fonctions : le socle sur lequel toute fiche de ce document s'appuie.

> **Un seul parcours logique, dix fichiers de compagnon.** TECH-ILA relie les mécanismes du curriculum aux technologies et systèmes où ils apparaissent réellement. Les dix fichiers sont découpés pour permettre une lecture ciblée et réutilisable ; ils ne constituent ni une certification parallèle ni une seconde progression.

TECH-ILA n'est pas un second curriculum. C'est le **compagnon technologique intégré** de ce parcours : ouvre la section correspondante quand un jalon t'y renvoie, ou utilise-la comme référence ciblée en cas de besoin.

ce parcours te donne le runtime, la mémoire, l'asynchrone, le debugging, l'architecture. Excellent. Mais un diplômé qui comprend l'event loop et n'a jamais lu un `docker-compose.yml`, jamais ouvert une migration SQL, jamais vu un `guard` NestJS, reste bloqué au premier jour de mission.

Ce document répond à une seule question, répétée des dizaines de fois :

**"Ce que j'ai appris dans ce fichier du parcours, où est-ce que je vais le retrouver dans la vraie vie technologique ?"**

---

## Sommaire

Le contenu est découpé par niveau, un fichier par étape du parcours. Lis dans l'ordre ; chaque fichier est autonome et renvoie ici. En incident, ne lis rien dans l'ordre : ouvre directement le fichier 09.

| #     | Fichier                                                                           | Section                            | Taille indicative | Ce que tu y gagnes                                  |
| ----- | --------------------------------------------------------------------------------- | ---------------------------------- | ----------------- | --------------------------------------------------- |
| 0-3   | [02-orientation.md](tech-ila/02-orientation.md)                                   | Lire, classer, ordonner            | 221 lignes        | La méthode, la classification, la carte des niveaux |
| 4     | [03-niveau-1-socle.md](tech-ila/03-niveau-1-socle.md)                             | Niveau 1 : Socle professionnel     | 866 lignes        | Terminal, Git, Node, TS, HTTP, SQL, Docker          |
| 5     | [04-niveau-2-frontend.md](tech-ila/04-niveau-2-frontend.md)                       | Niveau 2 : Frontend                | 562 lignes        | React, état, stratégies de rendu, perf, a11y        |
| 6     | [05-niveau-3-backend.md](tech-ila/05-niveau-3-backend.md)                         | Niveau 3 : Backend                 | 676 lignes        | Express, NestJS, auth, Redis, files, temps réel     |
| 7     | [06-niveau-4-systemes.md](tech-ila/06-niveau-4-systemes.md)                       | Niveau 4 : Systèmes professionnels | 608 lignes        | CI/CD, cloud, observabilité, résilience             |
| 8     | [07-niveau-5-transfert.md](tech-ila/07-niveau-5-transfert.md)                     | Niveau 5 : Transfert               | 485 lignes        | Python, Java/Spring, .NET                           |
| 9     | 06-niveau-6-IA.md                                                                 | Niveau 6 : IA                      | 317 lignes        | Diriger, vérifier, refuser                          |
| 10-11 | [08-cartes-parcours-technologies.md](tech-ila/08-cartes-parcours-technologies.md) | Cartes du parcours ↔ technologies  | 311 lignes        | Le mapping module par module, et l'inverse          |
| 12-14 | 08-IA-exercices-marche-audit.md                                                   | Exercices, marché, audit           | 216 lignes        | Ce qui reste ton travail, la preuve, l'honnêteté    |
| :     | [09-mode-urgence.md](tech-ila/09-mode-urgence.md)                                 | Mode urgence                       | 81 lignes         | Trouver la bonne page en incident en moins de 30 s  |

Ces chiffres sont recomptés à chaque revue trimestrielle. S'ils sont faux, c'est un bug : signale-le.

Le niveau 6 (fichier 06) intègre désormais l'ancienne section « angles morts de l'IA » : une doctrine de vérification unifiée, documentée à un endroit de référence puis réutilisée depuis les modules concernés.

---

<a id="rituel-de-revue-trimestrielle"></a>

## Sections à surveiller

Ce document ne date rien par principe (aucune version épinglée), mais il vieillit quand même. Les zones suivantes bougent plus vite que le reste du corpus. À chaque revue trimestrielle, ouvre-les en premier et pose-toi la question associée.

| Section périssable              | Fichier                                                       | Question à se reposer chaque trimestre                                                                             |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Next.js et stratégies de rendu  | [04-niveau-2-frontend.md](tech-ila/04-niveau-2-frontend.md)   | App Router / Pages Router / RSC ont-ils encore la même forme, ou une nouvelle stratégie de rendu a-t-elle émergé ? |
| Défaillances IA par technologie | 06-niveau-6-IA.md                                             | Les modèles produisent-ils encore les mêmes erreurs types sur ces technos, ou la liste est-elle obsolète ?         |
| Économie du serverless          | [06-niveau-4-systemes.md](tech-ila/06-niveau-4-systemes.md)   | Les ordres de grandeur de coût donnés sont-ils encore réalistes chez les fournisseurs actuels ?                    |
| Threads virtuels Java           | [07-niveau-5-transfert.md](tech-ila/07-niveau-5-transfert.md) | Le statut (preview, stable, par défaut) a-t-il changé depuis la dernière revue ?                                   |
| Express 4 vs 5                  | [05-niveau-3-backend.md](tech-ila/05-niveau-3-backend.md)     | La version majeure recommandée par défaut a-t-elle changé ?                                                        |

Ce tableau est aussi l'index des conditions de péremption : les fiches concernées portent un champ « Se périme si : » qui dit ce qui déclencherait leur révision.

Chaque revue met à jour `last_reviewed` dans le front-matter du ou des fichiers concernés, et `last_counted` quand le rituel de recomptage a été exécuté en entier.

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
