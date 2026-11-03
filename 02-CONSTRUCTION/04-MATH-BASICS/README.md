---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/04-MATH-BASICS/01-00-why-math-basics.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/04-MATH-BASICS/01-00-why-math-basics.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 04 MATH BASICS

> Palier `02-CONSTRUCTION`. Duree estimee : **10 h 00** (15 fichiers de travail).

## Sommaire du module

| Fichier                                                          | Objet                                                        | Duree  |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                             | 00 : Prereq check : Math                                     | 15 min |
| [`01-00-why-math-basics.md`](01-00-why-math-basics.md)           | POURQUOI CE MODULE MÉRITE TON TEMPS : LES MATHS UTILES       | 45 min |
| [`02-boolean_logic.md`](02-boolean_logic.md)                     | BOOLEAN LOGIC : LA LOGIQUE QUI PILOTE TOUT                   | 45 min |
| [`03-modular_arithmetic.md`](03-modular_arithmetic.md)           | ARITHMÉTIQUE MODULAIRE : LE MODULO QUI TOURNE EN BOUCLE      | 45 min |
| [`04-bit_manipulation.md`](04-bit_manipulation.md)               | BIT MANIPULATION : MANIPULER LES DONNÉES À L'OS              | 45 min |
| [`05-hashing_basics.md`](05-hashing_basics.md)                   | HASHING BASICS : L'EMPREINTE QUI NE MENT PAS                 | 45 min |
| [`06-probability_random.md`](06-probability_random.md)           | PROBABILITY & RANDOM : LE RNG QUI NE MENT PAS                | 45 min |
| [`07-combinatorics_lite.md`](07-combinatorics_lite.md)           | COMBINATORICS LITE : COMPTER AVANT DE BRUTEFORCER            | 45 min |
| [`99A-PONT.md`](99A-PONT.md)                                     | 07 bits and memory bridge                                    | 45 min |
| [`08-geometry_for_dev.md`](08-geometry_for_dev.md)               | GÉOMÉTRIE POUR DÉVELOPPEUR                                   | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                               | Page verrouillée                                             | 30 min |
| [`09-EXO_LECTURE.md`](09-EXO_LECTURE.md)                         | EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Math Basics) | 50 min |
| [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md)               | EXO [JEUNE IA] : 02-CONSTRUCTION/04-MATH-BASICS              | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)               | EXO IA MENTEUSE : module 02-CONSTRUCTION/04-MATH-BASICS      | 10 min |
| [`10-PONT-MEMORY-PERFORMANCE.md`](10-PONT-MEMORY-PERFORMANCE.md) | PONT BITS ET MÉMOIRE                                         | 45 min |

Total : **10 h 00**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) est une évaluation séparée et n'est pas ajouté au Total sauf s'il apparaît comme ligne du tableau. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

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

- [00 : Prereq check : Math](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : les maths utiles](01-00-why-math-basics.md)
- [Boolean logic : la logique qui pilote tout](02-boolean_logic.md)
- [Arithmétique modulaire : le modulo qui tourne en boucle](03-modular_arithmetic.md)
- [Bit manipulation : manipuler les données à l'os](04-bit_manipulation.md)
- [Hashing basics : l'empreinte qui ne ment pas](05-hashing_basics.md)
- [Probability & random : le rng qui ne ment pas](06-probability_random.md)
- [Combinatorics lite : compter avant de bruteforcer](07-combinatorics_lite.md)
- [99A-PONT.md](99A-PONT.md)
- [Géométrie pour développeur](08-geometry_for_dev.md)
- [Page verrouillée](90-grimoire.md)
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Math Basics)](09-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/04-math-basics](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/04-MATH-BASICS](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [PONT bits et mémoire](10-PONT-MEMORY-PERFORMANCE.md)
- [Challenge : `04-MATH-BASICS`](95-challenge.md)
- [Grimoire : `04-MATH-BASICS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Vérification : 11_EXO_VERIFICATION.md](11_EXO_VERIFICATION.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **mesurer avant d’optimiser** : Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le protocole indique machine, volume, concurrence et répétitions ; tu présentes p50/p95 ou mémoire ; tu expliques le coût secondaire et refuses toute extrapolation non justifiée.
