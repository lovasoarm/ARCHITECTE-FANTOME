---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "00-SOCLE/04-FUNDAMENTALS/05_web_basics/02-dom_manipulation.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 00-SOCLE/04-FUNDAMENTALS/05_web_basics/02-dom_manipulation.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# WEB BASICS

> Sommaire de `00-SOCLE/04-FUNDAMENTALS/05_web_basics`.

## Première passe : JavaScript et navigateur natifs

Ce dossier est une étape obligatoire de la route Fundamentals, même si son front matter indique `noyau: non` : cette valeur classe le dossier dans l'arborescence, elle ne détermine pas l'obligation pédagogique. Termine les leçons canoniques dans l'ordre, puis réalise la pratique native associée. La première passe ne demande ni React, ni Next.js, ni projet Portfolio.

Avant ta première page interactive, lis [46 : Accessibilité : première interface](46-accessibility-first-pass.md). Applique ces six réflexes dans la pratique DOM déjà prévue ; ne construis pas un deuxième projet et ne commence pas le module avancé Web Inclusive à ce stade.

<!-- CONTENU-DOSSIER:debut -->

1. [DOM manipulation](02-dom_manipulation.md) → [pratique DOM native](40-dom-natif-premiere-passe.md)
2. [Fetch : quand ton code parle à internet](03-fetch_adventure.md) → [pratique Fetch locale](41-fetch-local-premiere-passe.md)
3. [Storage treasure : le trésor du navigateur](04-storage_treasure.md) → [pratique Storage native](42-storage-preference-premiere-passe.md)
4. [Template portals : template strings & DOM templating](07-template_portals.md) → [pratique Templates native](43-template-natif-premiere-passe.md)
5. [Web helpers : DOM & events](05-web_helpers.md) → [pratique Web Helpers native](44-web-helpers-natif-premiere-passe.md)
6. [Scope isolé : arrêter de polluer le global](06-module_factory.md) → [pratique Scope isolé native](45-scope-isole-natif-premiere-passe.md)
7. [Page verrouillée : grimoire](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

## Intégrations différées : React / Next.js

Les projets `50` à `55` sont des **extensions de mise en pratique sur un projet React/Next.js**, pas des exercices nécessaires pour apprendre le DOM ou `fetch` en JavaScript natif. Les six pratiques `40` à `45` ci-dessus sont les activités de première passe et ne nécessitent aucun framework. Les extensions `50` à `55` ne sont pas des gates de la première passe Fundamentals : ouvre-les seulement après les leçons canoniques et les prérequis indiqués dans chaque fichier. Un apprenant qui n'a pas encore étudié React ou Next.js peut les ignorer sans retard ni échec.

- [50 : Référence DOM avec React (`useRef`)](50-dom_manipulation_minimini_projet.md)
- [51 : Fetch dans un Server Component Next.js](51-fetch_adventure_minimini_projet.md)
- [52 : Stockage local dans un hook React](52-storage_treasure_minimini_projet.md)
- [53 : Portals et modale React](53-template_portals_minimini_projet.md)
- [54 : Hooks et API du navigateur](54-web_helpers_minimini_projet.md)
- [55 : Couche d'accès aux données du portfolio](55-module_factory_minimini_projet.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
