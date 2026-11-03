---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n/01-00-why-i18n.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n/01-00-why-i18n.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# I18N

> Sommaire de `03-PILOTAGE/02-WEB-INCLUSIVE/08_i18n`.

## Durée et ordre de travail

Temps indicatif du sous-parcours complet : **4 h 15**. Les durées incluent la lecture et la pratique courte demandée dans chaque ressource ; les deux missions Kintana sont des premières preuves ciblées, pas une estimation de réalisation complète d'un produit.

| Ressource                                                                        | Travail attendu                                                  | Durée indicative |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------: |
| [`00-PREREQUIS.md`](00-PREREQUIS.md)                                             | Diagnostic de départ, non bloquant                               |           10 min |
| [`01-00-why-i18n.md`](01-00-why-i18n.md)                                         | Comprendre le besoin et les frontières de l'internationalisation |           10 min |
| [`02-i18n_basics.md`](02-i18n_basics.md)                                         | Concepts, dictionnaires et fallback                              |           20 min |
| [`50-i18n_basics_minimini_projet.md`](50-i18n_basics_minimini_projet.md)         | Première preuve de centralisation des chaînes                    |           45 min |
| [`03-dates_timezones.md`](03-dates_timezones.md)                                 | Instants, dates civiles, heures locales et fuseaux               |           25 min |
| [`51-dates_timezones_minimini_projet.md`](51-dates_timezones_minimini_projet.md) | Modèle temporel et tests de frontière                            |           45 min |
| [`04-number_formats.md`](04-number_formats.md)                                   | Formats numériques et devises                                    |           15 min |
| [`05-pluralization.md`](05-pluralization.md)                                     | Pluralisation et messages complets                               |           15 min |
| [`06-i18n_in_project.md`](06-i18n_in_project.md)                                 | Organisation dans un produit                                     |           20 min |
| [`07-i18n_drill_exec.md`](07-i18n_drill_exec.md)                                 | Drill de chargement, fallback et taille                          |           30 min |
| [`90-grimoire.md`](90-grimoire.md)                                               | Restitution après pratique                                       |           20 min |

**Calcul :** 10 + 10 + 20 + 45 + 25 + 45 + 15 + 15 + 20 + 30 + 20 = **255 minutes, soit 4 h 15**. Le challenge global de Web Inclusive ajoute 1 h 30 à part ; il ne doit pas être compté une seconde fois dans le sous-total.

Ordre recommandé : prérequis → pourquoi → bases i18n → mini-projet dictionnaires → dates/fuseaux → mini-projet dates → nombres → pluralisation → intégration projet → drill → grimoire. Le challenge parent [`../95-challenge.md`](../95-challenge.md) vérifie les deux dimensions, a11y et i18n.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [00 : Prereq check : i18n](00-PREREQUIS.md)
- [Pourquoi ce module mérite ton temps : i18n](01-00-why-i18n.md)
- [I18n basics : parler toutes les langues sans tout réécrire](02-i18n_basics.md)
- [50-i18n_basics_minimini_projet.md](50-i18n_basics_minimini_projet.md)
- [Dates et timezones : le cauchemar et comment le résoudre](03-dates_timezones.md)
- [51-dates_timezones_minimini_projet.md](51-dates_timezones_minimini_projet.md)
- [Number formats : 1,234.56 vs 1.234,56](04-number_formats.md)
- [Pluralisation : "1 résultat" vs "2 résultats" vs "many"](05-pluralization.md)
- [I18n dans un vrai projet : organisation, performance, dx](06-i18n_in_project.md)
- [Page verrouillée](90-grimoire.md)
- [i18n : Drill exécutable](07-i18n_drill_exec.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) uniquement comme contexte partagé. Pour ce sous-module, applique la mission précise de sa ligne dans la section **Missions ciblées par sous-module** de cette carte ; le challenge local reste la consigne et le critère de validation. Cette référence ne crée ni prérequis ni gate supplémentaire.
