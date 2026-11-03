---
perishability_id: PER-0037

stability: "perissable"
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://nodejs.org/docs/v22.23.4/api/esm.html"
source_type: "primary"
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « PONT : de typer du code à connaître le sol sur lequel il tourne à l'environnement d'exécution ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# PONT : de typer du code à connaître le sol sur lequel il tourne à l'environnement d'exécution

Temps de lecture ~2 min

-> ~10 min

> **ARRÊTE-TOI ICI.** Ce fichier est un point de passage obligé entre `02-CONSTRUCTION/12-TYPESCRIPT` et `02-CONSTRUCTION/13-RUNTIME-ENV`. Ne l'ouvre pas comme "encore un chapitre" : c'est un palier de respiration avant un saut de nature.

## POURQUOI CE PONT EXISTE

TypeScript t'a donné une sécurité statique. Reste à comprendre où ton code s'exécute vraiment : Node, Bun, Deno, browser. Chaque runtime a ses APIs, ses limites, ses pièges. Un `require` casse dans Deno, un `Deno.readFile` n'existe pas ailleurs.

## CE QUE TU MAÎTRISES DÉJÀ

- Écrire un module TypeScript strict.
- Séparer types et implémentation.
- Lire un `tsconfig.json` sans peur.

## VOCABULAIRE NOUVEAU QUI ARRIVE

- **Runtime** : la machine qui exécute ton JS (V8, JavaScriptCore, SpiderMonkey).
- **ESM vs CommonJS** : deux formats de modules incompatibles.
- **Global objects** : `window` (browser), `global` (Node), `Deno` (Deno).
- **Environment variables** : jamais dans le code, toujours au boot.

## LE PIÈGE MENTAL TYPIQUE DU SAUT

Croire que "JavaScript = JavaScript partout". `fetch` n'existait pas dans Node avant v18. `Buffer` n'existe pas dans le browser. Le socle change.

## EXERCICE-CHARNIÈRE (5 min chrono)

Écris un module qui lit un fichier. Fais-le tourner dans Node, puis dans Deno. Note les 3 différences que tu rencontres. `../13-RUNTIME-ENV/02-node_vs_browser.md` liste les principales.

## SI TU BLOQUES

Relis le module précédent avant de continuer. Ce pont existe précisément parce que sauter cette marche brise beaucoup d'apprenants. Aucune honte à revenir.

<!-- AF-TRANSFER-FIELD-1.1 -->

## Transfert terrain : Kintana

**Pourquoi ce transfert compte :** une notion que tu sais réciter mais que tu ne sais pas replacer dans un système est encore fragile.

**Quand la réutiliser :** quand une contrainte du produit change (rôle, réseau, volume, concurrence, panne ou coût) et que tu dois déterminer ce qui reste invariant.

**Limite :** ne transpose pas une syntaxe ou une solution sans vérifier ses hypothèses ; le même mécanisme peut avoir des garanties différentes selon le runtime et le stockage.

**Mission courte :** applique le principe de cette page à un incrément de [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) : Relie le contrat de type aux valeurs réellement reçues à l’exécution : choisis une frontière Kintana, valide les données inconnues et trace ce qui doit être contrôlé avant d’utiliser le type déclaré. Produis un petit test ou scénario de panne et note l'invariant conservé, l'hypothèse qui change et la limite observée. Cette mission complète le transfert ; elle ne remplace pas le projet évalué du module.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [Node.js : ECMAScript modules](https://nodejs.org/docs/v22.23.4/api/esm.html)
- [Node.js : Fetch global](https://nodejs.org/docs/v22.23.4/api/globals.html#fetch)
- [TypeScript : moduleResolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html)
