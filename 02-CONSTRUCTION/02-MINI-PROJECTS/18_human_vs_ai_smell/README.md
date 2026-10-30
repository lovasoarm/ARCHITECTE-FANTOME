---
perishability_id: PER-0011
stability: perissable
duree_de_vie_estimee: "1-2 ans"
raison: "Les styles IA évoluent avec les modèles."
freshness_registry_id: PER-0011
freshness_audit_date: 2026-10-30
freshness_status: a_verifier_date_absente
review_due: 2027-04-28
review_status: a_verifier_date_absente
---
# 18_human_vs_ai_smell : reconnaître deux styles de bug

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


Temps de lecture ~30 min

> Même bug fonctionnel. Deux versions du code. L'une écrite à la main un vendredi soir. L'autre suggérée par un modèle IA. Ton job : nommer les 3 pièges spécifiques de chaque style. Pas les mêmes pièges. Pas les mêmes contre-mesures.

## POURQUOI CE MINI-PROJET

Le curriculum traite les deux angles séparément : `10_legacy_dungeon` pour le legacy humain, `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/06-IA-GOVERNANCE-SECURITY.md` pour l'IA. Ici, on les met **côte à côte** sur le même problème. C'est le seul moyen de sentir la différence de texture.

## LE PROBLÈME

Écrire un helper `formatArenaTime(seconds)` qui renvoie `"1h 23m 04s"` ou `"23m 04s"` ou `"04s"` selon la taille de l'entrée. Cas limites : 0, négatif, non entier, NaN/Infinity, très grand nombre entier. Le contrat d'entrée est volontairement déterministe : `seconds` doit être un `number` fini et entier, avec `seconds >= 0`. Toute autre valeur (`NaN`, `Infinity`, négatif, décimal, valeur non numérique) doit être rejetée explicitement et de manière documentée. Pour un nombre valide, la sortie est normalisée en unités `h`, `m`, `s` avec deux chiffres pour `m` et `s` sauf lorsque l'unité est absente.

## VERSION HUMAINE (vendredi 19h)

Voir `src/human_version.js`. Écrite vite, marche sur les cas testés, rate le reste.

## VERSION IA (Copilot avec un prompt court)

Voir `src/ai_version.js`. Semble propre, structurée, commentée, casse autrement.

## L'EXERCICE

1. Lis les deux versions **sans exécuter**.
2. Écris `AUDIT.md` avec deux sections :
   - "Pièges style humain" : 3 pièges nommés, avec la ligne exacte et la raison.
   - "Pièges style IA" : 3 pièges nommés, différents des précédents, avec la ligne exacte et la raison.
3. Écris `FIX.md` avec la version corrigée qui passe tous les cas limites.
4. Passe la version corrigée dans les tests fournis (`tests/tests.js`).

## LOCK

Tu ne modifies aucun fichier avant que ton AUDIT.md soit signé (les 6 pièges nommés, chacun avec sa preuve). Sinon, l'exo ne compte pas.

## LIVRABLE ATTENDU

- `AUDIT.md` (6 pièges, 3 par style).
- `FIX.md` (version corrigée avec explication des choix).
- Tests verts.

## POURQUOI CE FORMAT MARCHE

Un piège de style humain se sent : incohérence, court-circuit "je verrai plus tard", magic number oublié. Un piège de style IA se lit : trop propre, trop générique, plausible mais faux sur un edge case que le modèle n'a pas vu. Nommer la différence, c'est apprendre à reviewer les deux avec des lunettes différentes.

---

## ÉTAT INITIAL DES TESTS

Ce mini-projet est volontairement incomplet à l’ouverture : `tests/tests.js` référence `src/format_arena_time.js`, que l’apprenant doit créer. Un échec `MODULE_NOT_FOUND` avant création de ce fichier est donc un **RED_BY_DESIGN**, pas une panne de la release. Une fois le livrable créé, les mêmes tests doivent devenir verts.

Pour la CI du corpus, distinguer toujours :
- `verify-release` : tests du produit distribué ;
- `verify-exercise-scaffold` : vérifie que les fichiers attendus par l’exercice sont bien présents et décrit les échecs volontairement initiaux.

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État des tests à la réception

- **Code de départ présent :** `src/human_version.js` et `src/ai_version.js`.
- **Tests de référence verts dès le départ :** aucun, car le fix n'est volontairement pas fourni.
- **Test volontairement rouge :** `tests/tests.js` importe `src/format_arena_time.js`, qui doit être créé par l'apprenant. L'échec initial `MODULE_NOT_FOUND` est `RED_BY_DESIGN` et correspond à l'état initial déclaré par le cahier des charges.
- **Tests à créer :** au moins trois cas spécifiques au style humain, trois cas spécifiques au style IA, et des cas limites pour valeurs négatives, non finies, non entières et grands nombres. Chaque piège nommé doit être prouvé par un test qui échoue sur les versions originales et passe sur le fix.
- **Validation finale :** après création de `src/format_arena_time.js`, lancer `node tests/tests.js` depuis la racine du projet. Tous les tests doivent passer ; conserver la sortie. Ne pas modifier `human_version.js`, `ai_version.js` ou affaiblir les assertions pour obtenir artificiellement du vert.

Ce projet diffère des scaffolds vierges : il fournit du code à examiner et à comparer. Lis le code avant de modifier le protocole.

### Détails d’implémentation et de validation à la réception

- **Code fourni :** `src/human_version.js` et `src/ai_version.js`, avec `tests/tests.js`.
- **Tests de référence verts :** aucun ; le correctif n'est volontairement pas fourni.
- **Test volontairement rouge :** `tests/tests.js` importe `src/format_arena_time.js`, absent au départ. `node tests/tests.js` doit donc échouer sur un module manquant tant que l'apprenant n'a pas créé ce livrable.
- **Tests à créer :** cas propres à chaque style, nombres négatifs, décimaux, chaînes, valeurs non finies, grandes durées et bornes métier. Chaque bug identifié dans `AUDIT.md` doit avoir une preuve testable.
- **Commande finale :** après création du module, `node tests/tests.js` depuis ce dossier. Aucun `npm install` n'est requis par les fichiers livrés.
- **Preuve :** chaque test échoue sur le comportement fautif initial et passe sur la correction, sans modifier les sources originales ni affaiblir les assertions.
