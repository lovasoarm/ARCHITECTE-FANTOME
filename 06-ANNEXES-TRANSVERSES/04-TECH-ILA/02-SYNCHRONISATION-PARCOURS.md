---
stability: evolutif
acte: comprendre
companion: ce parcours
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/04-TECH-ILA/01-00-why-tech-ila.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/04-TECH-ILA/01-00-why-tech-ila.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# TECH-ILA : synchronisation avec le fil principal

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

TECH-ILA n'est **pas** un examen final à faire après avoir fini JavaScript, TypeScript et Staff.
Il accompagne le fil principal au moment où un mécanisme devient utile dans un écosystème réel.

## La règle

```text
mécanisme JS/TS
   ↓
pratique sur le fil principal
   ↓
TECH-ILA : voir le même mécanisme dans une vraie stack
   ↓
mini-projet
   ↓
transfert / architecture
   ↓
Staff : décider quand l'outil vaut la complexité
```

Jamais :

```text
apprendre 300 outils
→ espérer comprendre pourquoi ils existent
```

## Synchronisation par phase

| Phase de la route principale | Travail principal | Usage de TECH-ILA | Limite à respecter |
| --- | --- | --- | --- |
| Getting Started → Prologue → première passe Fundamentals | environnement local, premier JavaScript, variables et fonctions | aucune lecture TECH-ILA obligatoire ; la documentation locale du Socle suffit | ne pas ouvrir le Niveau 1 comme prérequis de démarrage |
| Après un jalon JS/runtime identifié | mécanisme déjà étudié et pratiqué | ouvrir uniquement la section qui correspond au mécanisme, après ses prérequis locaux | ne pas lire le Niveau 1 en entier ; plusieurs sections exigent TypeScript ou un projet Node |
| Construction | TypeScript, tests, API, architecture | sections ciblées des Niveaux 1 à 3 lorsque les modules principaux les introduisent | le niveau affiché ne remplace jamais le prérequis de la section |
| Pilotage | sécurité, observabilité, cloud, SLO | sections ciblées des Niveaux 3 à 4 | documenter coût, risque et preuve sans prétendre à une expérience de production |
| Épreuve | système réel, lecture legacy, IA | fiches utiles des Niveaux 4 et 6 | distinguer lecture, simulation, laboratoire et terrain réel |
| Maîtrise Staff | transfert, arbitrage, architecture | sections pertinentes des Niveaux 5 et 6 | le portfolio et les preuves externes ne se remplacent pas par la lecture du compagnon |

## Test anti-collection

À chaque fiche TECH-ILA, le candidat doit répondre :

1. Quel mécanisme du fil principal se cache derrière cet outil ?
2. Qu'est-ce que l'outil masque ?
3. Dans quel contexte je refuserais cet outil ?
4. Comment prouver que je le maîtrise dans un mini-projet ?

Si la réponse se limite au nom d'un framework, TECH-ILA est raté.

## Le vrai fil d'apprentissage

JavaScript / TypeScript reste le **terrain d'expérimentation** du début du parcours.
TECH-ILA élargit progressivement le terrain sans abandonner les fondations.

Au niveau Staff, le candidat ne doit plus demander :

> « Quel framework dois-je apprendre ? »

mais :

> « Quel mécanisme est en jeu, quelles contraintes changent avec cette stack, et quel outil
> réduit réellement le coût sans me faire perdre le modèle mental ? »
