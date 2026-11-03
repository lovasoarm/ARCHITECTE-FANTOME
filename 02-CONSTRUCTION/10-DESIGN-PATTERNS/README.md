---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/10-DESIGN-PATTERNS/01A-00-why-design-patterns.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/10-DESIGN-PATTERNS/01A-00-why-design-patterns.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 10 DESIGN PATTERNS

> Palier `02-CONSTRUCTION`. Duree estimee : **5 h 25** (9 fichiers de travail).

## Sommaire du module

| Fichier                                                          | Objet                                                                           | Duree  |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                             | 00 : Prereq check : Design Patterns                                             | 15 min |
| [`01A-00-why-design-patterns.md`](01A-00-why-design-patterns.md) | POURQUOI CE MODULE MÉRITE TON TEMPS : DESIGN PATTERNS                           | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                               | Page verrouillée                                                                | 30 min |
| [`02A-EXO_LECTURE.md`](02A-EXO_LECTURE.md)                       | EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Design Patterns)                | 50 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)               | EXO [JEUNE IA] : 02-CONSTRUCTION/10-DESIGN-PATTERNS                             | 45 min |
| [`03A-EXO_FRONTIERE.md`](03A-EXO_FRONTIERE.md)                   | EXO FRONTIÈRE : quel module aurait dû accueillir ce geste ?                     | 30 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)               | EXO [IA MENTEUSE] : design_patterns (singleton qui fuit)                        | 20 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                   | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                         | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                     | PONT : de reconnaître des patterns à réécrire pour les révéler à le refactoring | 45 min |

Total : **5 h 25**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Commence par [`00-PREREQUIS.md`](00-PREREQUIS.md). Si un prérequis échoue, remonte vers la ressource indiquée au lieu de deviner.
2. Lis la leçon « pourquoi ce module » lorsqu'elle figure dans le parcours, puis suis l'ordre du sommaire. Les sous-dossiers ont leur propre README lorsqu'un sous-parcours est nécessaire.
3. Après chaque concept, réalise l'exercice ou le mini-projet explicitement associé. Une leçon peut intégrer sa pratique dans une section `EXERCICES` ; ne suppose pas qu'un fichier séparé existe.
4. Avant toute exécution, lis [`SETUP.md`](SETUP.md) et vérifie la version, le dossier courant, les données de départ et la commande attendue. Lorsqu'un outil externe manque, utilise uniquement le mode papier/simulation décrit par l'activité et marque le résultat comme simulé.
5. Fais le challenge `95-challenge.md`, puis le boss `96-boss-fight.md` **seulement s'il existe dans ce module**. À défaut de boss séparé, le challenge et les checkpoints/critères liés constituent la vérification annoncée : aucun boss non fourni n'est supposé.
6. Le grimoire se lit après la pratique. Consigne la preuve, le résultat des vérifications, les limites non testées et la date dans ton journal de progression.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Tous les fichiers du tableau sont ouverts et leurs exercices rendus.
- [ ] L artefact produit est cite dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Design Patterns](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : design patterns](01A-00-why-design-patterns.md)
- [`01_creational/`](01_creational/README.md)
- [`02_structural/`](02_structural/README.md)
- [`03_behavioral/`](03_behavioral/README.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Design Patterns)](02A-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/10-design-patterns](98-EXO-VERIFICATION.md)
- [EXO FRONTIÈRE : quel module aurait dû accueillir ce geste ?](03A-EXO_FRONTIERE.md)
- [EXO [IA MENTEUSE] : design_patterns (singleton qui fuit)](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT : de reconnaître des patterns à réécrire pour les révéler à le refactoring](99A-PONT.md)
- [Challenge : `10-DESIGN-PATTERNS`](95-challenge.md)
- [Grimoire : `10-DESIGN-PATTERNS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Vérification : 08_EXO_VERIFICATION.md](08_EXO_VERIFICATION.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
