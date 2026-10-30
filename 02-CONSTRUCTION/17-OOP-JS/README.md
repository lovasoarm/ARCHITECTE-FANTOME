---
stability: evolutif
acte: parcours
noyau: oui
route: complete
paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING
expert_review: pending
paper_audit_date: 2026-10-30
terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT
---

# MODULE 17 OOP JS

> **État pédagogique : 30 octobre 2026 : preuves documentaires complétées.** Les ajouts ciblés couvrent les exemples, pratiques, vérifications et transferts requis pour ce module. Une revue technique indépendante et une validation terrain restent distinctes ; voir [48 : External Review Gate](../../06-ANNEXES-TRANSVERSES/48-EXTERNAL-REVIEW-GATE.md) et [49 : Terrain Maturity Gate](../../06-ANNEXES-TRANSVERSES/49-TERRAIN-MATURITY-GATE.md).

<!-- AF-DIAGRAM:prototype -->

```text
┌──────────────┐
│ objet        │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ prototype    │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ Object.proto │
└──────────────┘
```

Une propriété absente sur l’objet est recherchée le long de sa chaîne de prototypes.

> Palier `02-CONSTRUCTION`. Duree estimee : **12 h 00** (17 fichiers de travail).

## Sommaire du module

| Fichier                                                                                | Objet                                                                     | Duree  |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                   | 00 : Prereq check : OOP en JS                                             | 15 min |
| [`01-00-why-oop-js.md`](01-00-why-oop-js.md)                                           | POURQUOI CE MODULE MÉRITE TON TEMPS : OOP EN JS                           | 45 min |
| [`02-prototype_chain_raw.md`](02-prototype_chain_raw.md)                               | PROTOTYPE CHAIN RAW : LA CHAÎNE BRUTE, SANS SUCRE                         | 45 min |
| [`03-constructor_functions.md`](03-constructor_functions.md)                           | CONSTRUCTOR FUNCTIONS : LA FAÇON OLD SCHOOL AVANT "CLASS"                 | 45 min |
| [`04-class_syntax_sugar.md`](04-class_syntax_sugar.md)                                 | CLASS SYNTAX SUGAR : LA PREUVE QUE CLASS NE RÉINVENTE RIEN                | 45 min |
| [`05-this_keyword_rules.md`](05-this_keyword_rules.md)                                 | THIS KEYWORD RULES : THIS SELON LE CALL-SITE                              | 45 min |
| [`50-this_keyword_rules_minimini_projet.md`](50-this_keyword_rules_minimini_projet.md) | 04 this keyword rules minimini projet                                     | 45 min |
| [`06-call_apply_bind.md`](06-call_apply_bind.md)                                       | CALL, APPLY, BIND : EMPRUNTER UNE FONCTION, FIGER THIS                    | 45 min |
| [`07-inheritance_extends_super.md`](07-inheritance_extends_super.md)                   | INHERITANCE EXTENDS/SUPER : ET POURQUOI LES HIÉRARCHIES PROFONDES PIÈGENT | 45 min |
| [`08-encapsulation_privacy.md`](08-encapsulation_privacy.md)                           | ENCAPSULATION & PRIVACY : CE QU'ON PROTÈGE VRAIMENT                       | 45 min |
| [`09-static_getters_setters.md`](09-static_getters_setters.md)                         | STATIC, GETTERS, SETTERS : LOGIQUE CACHÉE DERRIÈRE UNE SYNTAXE D'ATTRIBUT | 45 min |
| [`10-composition_vs_inheritance.md`](10-composition_vs_inheritance.md)                 | COMPOSITION VS INHERITANCE : LA VRAIE DÉCISION SENIOR                     | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                     | Page verrouillée                                                          | 30 min |
| [`11-expliquer_a_3_publics_prototypes.md`](11-expliquer_a_3_publics_prototypes.md)     | Prototypes : expliqué à 3 publics                                         | 45 min |
| [`12-EXO_LECTURE.md`](12-EXO_LECTURE.md)                                               | EXO LECTURE : 15-25 minutes (OOP en JS)                                   | 45 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                     | EXO [JEUNE IA] : 02-CONSTRUCTION/17-OOP-JS                                | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                         | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                   | 45 min |

Total : **12 h**. Le Total reprend exactement la somme du tableau. Le challenge (1 h 30) et le boss (3 h) sont des évaluations séparées et ne sont pas ajoutés au Total sauf s’ils apparaissent comme lignes du tableau.

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

- [00 : Prereq check : OOP en JS](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : oop en JS](01-00-why-oop-js.md)
- [Prototype chain raw : la chaîne brute, sans sucre](02-prototype_chain_raw.md)
- [Constructor functions : la façon old school avant "class"](03-constructor_functions.md)
- [Class syntax sugar : la preuve que class ne réinvente rien](04-class_syntax_sugar.md)
- [This keyword rules : this selon le call-site](05-this_keyword_rules.md)
- [50-this_keyword_rules_minimini_projet.md](50-this_keyword_rules_minimini_projet.md)
- [Call, apply, bind : emprunter une fonction, figer this](06-call_apply_bind.md)
- [Inheritance extends/super : et pourquoi les hiérarchies profondes piègent](07-inheritance_extends_super.md)
- [Encapsulation & privacy : ce qu'on protège vraiment](08-encapsulation_privacy.md)
- [Static, getters, setters : logique cachée derrière une syntaxe d'attribut](09-static_getters_setters.md)
- [Composition vs inheritance : la vraie décision senior](10-composition_vs_inheritance.md)
- [Page verrouillée](90-grimoire.md)
- [Prototypes : expliqué à 3 publics](11-expliquer_a_3_publics_prototypes.md)
- [EXO LECTURE : 15-25 minutes (OOP en JS)](12-EXO_LECTURE.md)
- [EXO [jeune IA] : 02-construction/17-oop-js](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `17-OOP-JS`](95-challenge.md)
- [Grimoire : `17-OOP-JS`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Standard de complétude et audit

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-00-why-oop-js.md`](01-00-why-oop-js.md)
- [`02-prototype_chain_raw.md`](02-prototype_chain_raw.md)
- [`03-constructor_functions.md`](03-constructor_functions.md)
- [`04-class_syntax_sugar.md`](04-class_syntax_sugar.md)
- [`05-this_keyword_rules.md`](05-this_keyword_rules.md)
- [`06-call_apply_bind.md`](06-call_apply_bind.md)
- [`07-inheritance_extends_super.md`](07-inheritance_extends_super.md)
- [`08-encapsulation_privacy.md`](08-encapsulation_privacy.md)
- [`09-static_getters_setters.md`](09-static_getters_setters.md)
- [`10-composition_vs_inheritance.md`](10-composition_vs_inheritance.md)
- [`11-expliquer_a_3_publics_prototypes.md`](11-expliquer_a_3_publics_prototypes.md)
- [`12-EXO_LECTURE.md`](12-EXO_LECTURE.md)
- [`50-this_keyword_rules_minimini_projet.md`](50-this_keyword_rules_minimini_projet.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)
