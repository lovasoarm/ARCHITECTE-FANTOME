---
perishability_id: PER-0003

stability: perissable
acte: comprendre
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_type: primary
source_url: https://docs.npmjs.com/cli/v10/configuring-npm/package-json/
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « `package.json` : mode d'emploi (2 min) ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# `package.json` : mode d'emploi (2 min)

Ce dossier contient un `package.json` minimal. **Ne lance PAS `npm install`
tout de suite** : il n'y a aucune dependance a installer.

## A quoi il sert

- Declarer que ce dossier est un projet Node moderne (`"type": "module"`
  active les `import`/`export` sans configuration).
- Fournir 3 scripts pratiques :
  - `npm start` -> `node index.js`
  - `npm test` -> `node --test` (runner natif Node)
  - `npm run watch` -> re-execute a chaque sauvegarde

## Quand faire `npm install` ici

- **Jamais**, tant qu'aucune dependance n'apparait dans la section
  `dependencies` ou `devDependencies`.
- Le jour ou tu ajoutes une lib (par exemple `zod`), tu fais
  `npm install zod`, ce qui cree `node_modules/` et `package-lock.json`.

## Requis Node

`"engines"` déclare ici la plage `">=22.23.4 <23"` : Node 22.23.4 ou un correctif ultérieur de la branche 22, mais pas automatiquement Node 23, 24 ou une autre majeure. `npm` est déclaré à `">=10"`. Cette plage décrit le sandbox fourni ; si un autre projet a un `engines` différent, c’est son `package.json` qui fait foi.
Verifie avec `node -v`.

**Référence canonique du runtime AF : `22.23.4` (voir `.nvmrc`).**

## Pourquoi ce fichier est utile meme vide

Il te sert de reference : tu regardes comment un `package.json` est
structure avant d'en generer un toi-meme avec `npm init -y`.

## Sources officielles

- [npm : package.json (`engines`, `type`, scripts)](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [Node.js v22 : modules et champ `type`](https://nodejs.org/docs/latest-v22.x/api/packages.html)
- [Node.js v22 : test runner natif](https://nodejs.org/docs/latest-v22.x/api/test.html)
- [Node.js : archive de la version 22.23.4](https://nodejs.org/en/download/archive/v22.23.4)

Vérifié le 1er novembre 2026. `engines` est une déclaration de compatibilité ; npm peut la traiter comme un avertissement plutôt qu'un blocage lorsque `engine-strict` n'est pas activé. La commande de version du terminal reste le contrôle immédiat pour l'apprenant.
