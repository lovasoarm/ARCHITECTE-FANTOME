---
perishability_id: PER-0012

stability: "perissable"
acte: évaluer
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_inversee]
anti_recipe_key: changement_echelle+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://r2.nodejs.org/docs/latest-v22.x/api/process.html#event-unhandledrejection"
source_type: "primary"
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle Node.js 22.x sur process/unhandledRejection. Le lien R2 est le miroir officiel de la documentation versionnée. La référence soutient les événements Node.js ciblés, pas les autres comportements de test du module."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_NODE_22_VERSIONED_MIRROR_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Testing

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce n’est pas un test noté : il sert à repérer ce que tu peux déjà expliquer et ce qu’il
> serait utile de revoir dans `01-CADRAGE/04-ERROR-HANDLING`, le module précédent.

## Questions

1. Différence entre `throw new Error("x")` et `throw "x"` : quel est le vrai avantage du premier ?
2. Dans quel ordre s'exécutent `try` / `catch` / `finally` si l'erreur est levée dans `try` ?
3. Avec Node.js 22.23.4 et les options par défaut, que se passe-t-il si une `Promise` est rejetée et qu’aucun `await`, `.catch()` ou gestionnaire `unhandledRejection` ne la traite ? Cite aussi un élément de configuration qui peut modifier le comportement.
4. Cite un cas où `catch(e)` **doit** re-`throw` plutôt qu'avaler l'erreur.

## Verdict

- **3 réponses solides ou plus** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 réponses solides ou moins** → relis les sujets qui posent problème dans `01-CADRAGE/04-ERROR-HANDLING/`, notamment son [grimoire de synthèse](../../01-CADRAGE/04-ERROR-HANDLING/90-grimoire.md), puis réessaie. Tu peux poursuivre ensuite : ce diagnostic sert à orienter la révision, pas à te fermer l’accès.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence unit/intégration/e2e, ce
> qu'un test qui passe toujours prouve réellement (rien : c'est un piège),
> et le format AAA (Arrange/Act/Assert) sont le contenu que ce module va
> t'enseigner (notamment `02-unit_sniper.md`) : normal de ne pas encore
> les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource ci-dessous, également enregistrée dans `source_url`, documente le comportement versionné demandé dans la question 3. La note de version confirme la publication de Node.js 22.23.4. Ces références n’attestent pas que du code a été exécuté dans ce curriculum.

- [Node.js 22 : Process API, événement `unhandledRejection`](https://r2.nodejs.org/docs/latest-v22.x/api/process.html#event-unhandledrejection)
- [Node.js : publication de la version 22.23.4](https://nodejs.org/en/blog/release/v22.23.4)
