---
stability: evolutif
acte: parcours
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/02-WEB-INCLUSIVE/01-why-web-inclusive.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/02-WEB-INCLUSIVE/01-why-web-inclusive.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# MODULE 02 WEB INCLUSIVE

> Palier `03-PILOTAGE`. Parcours complet estimé : **17 h 05**, dont **12 h 50** pour le noyau accessibilité (18 ressources) et **4 h 15** pour le sous-parcours i18n obligatoire (11 ressources). Le challenge final est estimé séparément à 1 h 30.

## Sommaire du module

| Fichier                                                                                    | Objet                                                                        | Duree  |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------ |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                                       | 00 : Prereq check : Accessibility                                            | 15 min |
| [`01-why-web-inclusive.md`](01-why-web-inclusive.md)                                       | POURQUOI CE MODULE MÉRITE TON TEMPS : ACCESSIBILITY (A11Y)                   | 45 min |
| [`02-a11y-why-it-matters.md`](02-a11y-why-it-matters.md)                                   | L'ACCESSIBILITÉ N'EST PAS UNE OPTION                                         | 45 min |
| [`51-a11y-why-it-matters-minimini-projet.md`](51-a11y-why-it-matters-minimini-projet.md)   | 01 a11y why it matters minimini projet                                       | 45 min |
| [`03-aria_basics.md`](03-aria_basics.md)                                                   | ARIA : PARLER LA LANGUE DES LECTEURS D'ÉCRAN                                 | 45 min |
| [`50-aria_basics_minimini_projet.md`](50-aria_basics_minimini_projet.md)                   | 02 aria basics minimini projet                                               | 45 min |
| [`04A-keyboard_navigation.md`](04A-keyboard_navigation.md)                                 | NAVIGATION CLAVIER : QUAND LA SOURIS N'EST PAS UNE OPTION                    | 45 min |
| [`52A-keyboard_navigation_minimini_projet.md`](52A-keyboard_navigation_minimini_projet.md) | 03 keyboard navigation minimini projet                                       | 45 min |
| [`04-contrast_and_colors.md`](04-contrast_and_colors.md)                                   | CONTRASTE ET COULEURS : QUAND LE DESIGN DEVIENT ILLISIBLE                    | 45 min |
| [`52-contrast_and_colors_minimini_projet.md`](52-contrast_and_colors_minimini_projet.md)   | 04 contrast and colors minimini projet                                       | 45 min |
| [`05-screen_readers.md`](05-screen_readers.md)                                             | LECTEURS D'ÉCRAN : COMMENT ILS LISENT VRAIMENT TON CODE                      | 45 min |
| [`53-screen_readers_minimini_projet.md`](53-screen_readers_minimini_projet.md)             | 05 screen readers minimini projet                                            | 45 min |
| [`06-a11y_audit.md`](06-a11y_audit.md)                                                     | AUDITER UNE PAGE : LES OUTILS ET LA MÉTHODE                                  | 45 min |
| [`54-a11y_audit_minimini_projet.md`](54-a11y_audit_minimini_projet.md)                     | 06 a11y audit minimini projet                                                | 45 min |
| [`90-grimoire.md`](90-grimoire.md)                                                         | Page verrouillée                                                             | 30 min |
| [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)                                                   | EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Web Inclusive (a11y + i18n)) | 50 min |
| [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)                                         | EXO [JEUNE IA] : 03-PILOTAGE/02-WEB-INCLUSIVE                                | 45 min |
| [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)                                             | 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust                      | 45 min |

Sous-total du noyau accessibilité : **12 h 50**. La somme reprend exactement les 18 lignes du tableau. Le sous-parcours i18n est obligatoire pour valider le module complet ; son détail et son calcul figurent dans [`08_i18n/README.md`](08_i18n/README.md) : **4 h 15** supplémentaires.

**Total du parcours complet : 17 h 05 (29 ressources de travail).** Le challenge final (1 h 30) est une évaluation séparée et n'est pas inclus dans ce total. Le fichier `07-EXO_LECTURE.md` est déjà compté dans les 12 h 50 du noyau ; il peut porter sur un extrait a11y ou i18n, il ne constitue pas un troisième sous-parcours. Aucun `96-boss-fight.md` distinct n'est fourni dans ce module ; ses checkpoints, gates ou autres critères de sortie déclarés font foi.

## Comment travailler ce module

1. Commence par [`00-PREREQUIS.md`](00-PREREQUIS.md). Si un prérequis échoue, remonte vers la ressource indiquée au lieu de deviner.
2. Termine le noyau accessibilité dans l'ordre du sommaire, puis réalise obligatoirement le sous-parcours [`08_i18n/README.md`](08_i18n/README.md). Son diagnostic est non bloquant ; ses deux mini-projets et son drill font partie du travail attendu.
3. Après chaque concept, réalise l'exercice ou le mini-projet explicitement associé. Une leçon peut intégrer sa pratique dans une section `EXERCICES` ; ne suppose pas qu'un fichier séparé existe.
4. Avant toute exécution, lis [`SETUP.md`](SETUP.md) et vérifie la version, le dossier courant, les données de départ et la commande attendue. Lorsqu'un outil externe manque, utilise uniquement le mode papier/simulation décrit par l'activité et marque le résultat comme simulé.
5. Fais le challenge `95-challenge.md`, puis le boss `96-boss-fight.md` **seulement s'il existe dans ce module**. À défaut de boss séparé, le challenge et les checkpoints/critères liés constituent la vérification annoncée : aucun boss non fourni n'est supposé.
6. Le grimoire se lit après la pratique. Consigne la preuve, le résultat des vérifications, les limites non testées et la date dans ton journal de progression.

## Ce que ce module produit dans ton depot fil rouge

Au moins un artefact date et verifiable. Si tu ne peux pas montrer de fichier a la sortie, le module
n est pas fait : relis la liste ci-dessus et rends l exercice manquant.

## Verification

- [ ] Les 18 ressources du noyau accessibilité sont traitées et leurs exercices rendus.
- [ ] Les 11 ressources du sous-parcours i18n sont traitées, y compris ses deux mini-projets et son drill.
- [ ] Les artefacts a11y et i18n produits sont cités dans ton journal de progression (`PROGRESSION.md`).

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [91-90-grimoire.md](91-90-grimoire.md) : pont de compatibilité conservé pour la restitution

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : Accessibility](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : accessibility (a11y)](01-why-web-inclusive.md)
- [L'accessibilité n'est pas une option](02-a11y-why-it-matters.md)
- [51-a11y-why-it-matters-minimini-projet.md](51-a11y-why-it-matters-minimini-projet.md)
- [ARIA : parler la langue des lecteurs d'écran](03-aria_basics.md)
- [50-aria_basics_minimini_projet.md](50-aria_basics_minimini_projet.md)
- [Navigation clavier : quand la souris n'est pas une option](04A-keyboard_navigation.md)
- [52A-keyboard_navigation_minimini_projet.md](52A-keyboard_navigation_minimini_projet.md)
- [Contraste et couleurs : quand le design devient illisible](04-contrast_and_colors.md)
- [52-contrast_and_colors_minimini_projet.md](52-contrast_and_colors_minimini_projet.md)
- [Lecteurs d'écran : comment ils lisent vraiment ton code](05-screen_readers.md)
- [53-screen_readers_minimini_projet.md](53-screen_readers_minimini_projet.md)
- [Auditer une page : les outils et la méthode](06-a11y_audit.md)
- [54-a11y_audit_minimini_projet.md](54-a11y_audit_minimini_projet.md)
- [Page verrouillée](90-grimoire.md)
- [`08_i18n/`](08_i18n/README.md)
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Web Inclusive (a11y + i18n))](07-EXO_LECTURE.md)
- [EXO [jeune IA] : 03-pilotage/02-web-inclusive](97-EXO-VERIFICATION.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Challenge : `02-WEB-INCLUSIVE`](95-challenge.md)
- [Grimoire : `02-WEB-INCLUSIVE`](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Navigation complète des ressources

Les liens ci-dessous donnent accès aux ressources documentaires du module, y compris les sous-dossiers. Le sommaire conserve l’ordre pédagogique recommandé ; cet index n’ajoute pas d’étape obligatoire.

- [`00-PREREQUIS.md`](00-PREREQUIS.md)
- [`01-why-web-inclusive.md`](01-why-web-inclusive.md)
- [`02-a11y-why-it-matters.md`](02-a11y-why-it-matters.md)
- [`03-aria_basics.md`](03-aria_basics.md)
- [`04-contrast_and_colors.md`](04-contrast_and_colors.md)
- [`04A-keyboard_navigation.md`](04A-keyboard_navigation.md)
- [`05-screen_readers.md`](05-screen_readers.md)
- [`06-a11y_audit.md`](06-a11y_audit.md)
- [`07-EXO_LECTURE.md`](07-EXO_LECTURE.md)
- [`08_i18n/00-PREREQUIS.md`](08_i18n/00-PREREQUIS.md)
- [`08_i18n/01-00-why-i18n.md`](08_i18n/01-00-why-i18n.md)
- [`08_i18n/02-i18n_basics.md`](08_i18n/02-i18n_basics.md)
- [`08_i18n/03-dates_timezones.md`](08_i18n/03-dates_timezones.md)
- [`08_i18n/04-number_formats.md`](08_i18n/04-number_formats.md)
- [`08_i18n/05-pluralization.md`](08_i18n/05-pluralization.md)
- [`08_i18n/06-i18n_in_project.md`](08_i18n/06-i18n_in_project.md)
- [`08_i18n/07-i18n_drill_exec.md`](08_i18n/07-i18n_drill_exec.md)
- [`08_i18n/50-i18n_basics_minimini_projet.md`](08_i18n/50-i18n_basics_minimini_projet.md)
- [`08_i18n/51-dates_timezones_minimini_projet.md`](08_i18n/51-dates_timezones_minimini_projet.md)
- [`08_i18n/90-grimoire.md`](08_i18n/90-grimoire.md)
- [`08_i18n/README.md`](08_i18n/README.md)
- [`50-aria_basics_minimini_projet.md`](50-aria_basics_minimini_projet.md)
- [`51-a11y-why-it-matters-minimini-projet.md`](51-a11y-why-it-matters-minimini-projet.md)
- [`52-contrast_and_colors_minimini_projet.md`](52-contrast_and_colors_minimini_projet.md)
- [`52A-keyboard_navigation_minimini_projet.md`](52A-keyboard_navigation_minimini_projet.md)
- [`53-screen_readers_minimini_projet.md`](53-screen_readers_minimini_projet.md)
- [`54-a11y_audit_minimini_projet.md`](54-a11y_audit_minimini_projet.md)
- [`90-grimoire.md`](90-grimoire.md)
- [`91-90-grimoire.md`](91-90-grimoire.md)
- [`95-challenge.md`](95-challenge.md)
- [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md)
- [`99-PORTAGE-MENTAL.md`](99-PORTAGE-MENTAL.md)
- [`SETUP.md`](SETUP.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Atelier de consolidation](ATELIER-CONSOLIDATION.md) : réutiliser les notions du module dans un cas intégré.
- [Corrigé de référence de l'atelier](corriges/ATELIER-CONSOLIDATION-CORRIGE.md) : à consulter après une tentative autonome.
