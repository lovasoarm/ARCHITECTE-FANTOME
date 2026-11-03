---
perishability_id: PER-0011
stability: "evolutif"
duree_de_vie_estimee: "1-2 ans"
raison: "Les outils et contextes d’assistance évoluent ; les comportements et leurs preuves restent à examiner."
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
review_interval: "3 mois"
perishability_scope: "Provenance des suggestions IA dans le scénario : fournisseur, identifiant de modèle, date, paramètres et outils activés. Ne valide pas l’origine humaine ou IA du code ni les performances d’un fournisseur."
canonical_resource: "02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/00-CAHIER-DES-CHARGES.md"
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/00-CAHIER-DES-CHARGES.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 18 : deux implémentations, un contrat, une revue fondée sur les preuves

> **Périmètre de suivi (3 mois) :** Provenance des suggestions IA dans le scénario : fournisseur, identifiant de modèle, date, paramètres et outils activés. Ne valide pas l’origine humaine ou IA du code ni les performances d’un fournisseur.

## Protocole de comparaison à consigner

Pour chaque échantillon, conserve le fichier source, son empreinte, le contexte de collecte et les transformations déjà appliquées. Si une provenance d’assistance est réellement disponible, consigne séparément le fournisseur, le modèle affiché, la date, le prompt, les paramètres et les outils activés ; sinon, indique « provenance inconnue ». Les noms historiques `human_version.js` et `ai_version.js` sont conservés pour compatibilité : ils ne prouvent pas qui a écrit le code. Une paire d’échantillons ne permet aucune généralisation sur les humains ou les outils. Les conclusions portent sur les comportements observables et les preuves.

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

Temps de lecture ~30 min

> Deux échantillons de code A/B traitent le même problème. Le ZIP ne fournit pas de provenance suffisante pour authentifier leur origine ; les noms de fichiers historiques ne sont pas des preuves. Examine les deux implémentations et relève les défauts distincts réellement observables, dans la limite de six pour garder l’exercice borné. Ne fractionne pas un même défaut en plusieurs constats et n’invente pas de répartition selon une origine supposée.

## POURQUOI CE MINI-PROJET

Le projet met deux implémentations côte à côte sur un contrat commun. L’objectif est de détecter des écarts de comportement, de couverture et de risque ; il ne s’agit pas de reconnaître une « texture humaine » ou « IA ».

## LE PROBLÈME

Écrire un helper `formatArenaTime(seconds)` qui renvoie `"1h 23m 04s"` ou `"23m 04s"` ou `"04s"` selon la taille de l'entrée. Cas limites : 0, négatif, non entier, NaN/Infinity, très grand nombre entier. Le contrat d'entrée est volontairement déterministe : `seconds` doit être un `number` fini et entier, avec `seconds >= 0`. Toute autre valeur (`NaN`, `Infinity`, négatif, décimal, valeur non numérique) doit être rejetée explicitement et de manière documentée. Pour un nombre valide, la sortie est normalisée en unités `h`, `m`, `s` avec deux chiffres pour `m` et `s` sauf lorsque l'unité est absente.

## ÉCHANTILLON A : fixture historique

Voir `src/human_version.js`. Le nom du fichier est historique et ne permet pas d’authentifier son auteur.

## ÉCHANTILLON B : fixture historique

Voir `src/ai_version.js`. Le nom du fichier est historique ; aucune provenance vérifiable de génération n’est fournie dans le ZIP.

## L'EXERCICE

1. Lis les deux versions **sans exécuter**.
2. Écris `AUDIT.md` sous forme de tableau, avec au plus six défauts indépendants réellement observés : fichier/ligne, entrée, comportement constaté, règle du contrat concernée, preuve/test et impact. Si les observations démontrent moins de six défauts distincts, indique pourquoi les autres cas relèvent d’une même cause au lieu de remplir artificiellement le quota.
3. Écris `FIX.md` avec la version corrigée qui passe tous les cas limites.
4. Passe la version corrigée dans les tests fournis (`tests/tests.js`).

## LOCK

Tu ne modifies aucun fichier avant que ton `AUDIT.md` consigne les défauts distincts observés et leurs preuves. Sinon, l’exo ne compte pas. La preuve porte sur le comportement, pas sur l’auteur supposé.

## LIVRABLE ATTENDU

- `AUDIT.md` (jusqu’à six défauts indépendants, chacun relié à une ligne, une règle et une preuve ; moins si les observations ne justifient pas davantage).
- `FIX.md` (version corrigée avec explication des choix).
- Tests verts.

## POURQUOI CE FORMAT MARCHE

Dans cet exercice, compare les comportements des deux échantillons. Les noms de fichiers A/B sont des identifiants de fixtures, pas une preuve de provenance. Un bug ne révèle pas à lui seul son auteur. Décrire les défauts et les démontrer par des tests apprend à reviewer le code sans inventer une cause.

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

### État initial, tests et validation

- **Code de départ présent :** `src/human_version.js` et `src/ai_version.js`, fournis comme fixtures à examiner ; ils ne constituent pas le correctif.
- **Tests de référence verts :** aucun, car la nouvelle implémentation attendue n'est pas fournie.
- **Portée des tests fournis :** `tests/tests.js` vérifie le contrat de `src/format_arena_time.js` ; il ne teste pas directement les deux fixtures originales.
- **Échec initial prévu :** `tests/tests.js` importe `src/format_arena_time.js`, absent à réception. L'erreur `MODULE_NOT_FOUND` est `RED_BY_DESIGN` tant que l'apprenant n'a pas créé ce livrable.
- **Harnais de revue des fixtures :** créer séparément `tests/fixture-review.js` (ou un équivalent) pour appeler les deux fixtures, reproduire les défauts décrits dans `AUDIT.md`, puis comparer leurs sorties à la fonction corrigée. Les sources originales ne doivent pas être modifiées.
- **Tests du correctif :** la suite fournie couvre les nombres négatifs, décimaux, chaînes, valeurs non finies, grandes durées et bornes métier ; complète-la si l'analyse des fixtures révèle un cas contractuel manquant.
- **Ordre de construction :** lire les fixtures et l'audit, reproduire chaque défaut, formaliser le contrat, implémenter `src/format_arena_time.js`, puis construire le harnais de comparaison.
- **Validation finale :** depuis le dossier du projet, exécuter d'abord `node tests/fixture-review.js`, puis `node tests/tests.js`. Aucun `npm install` n'est requis par les fichiers livrés.
- **Preuve attendue :** pour chaque défaut retenu, conserver le comportement observé sur la fixture et vérifier que le correctif respecte le contrat. La suite finale reste verte ; les sources originales ne servent pas d'oracle de conformité.

## Mission produit évaluée : Normalisateur de timeline d’incident : revue comparative

Le formatter `formatArenaTime(seconds)` reste un **échauffement court** pour pratiquer la revue comparative de deux implémentations. Il ne constitue pas le projet final : le vrai travail d’ingénierie commence quand plusieurs signaux incohérents doivent être assemblés pendant un incident.

### Mission évaluée : normalisateur de timeline Kintana

Construis un outil qui ingère trois sources synthétiques : logs applicatifs JSON, accès HTTP et événements du worker de notifications. Il doit :

- valider le schéma et isoler les lignes invalides sans arrêter tout le lot ;
- normaliser les timestamps en UTC en exigeant un fuseau explicite ou une configuration source documentée ;
- produire un ordre stable pour les timestamps identiques ;
- corréler les événements par `request_id`/`trace_id` sans inventer de causalité ;
- dédupliquer uniquement avec une clé et une règle documentées ;
- masquer tokens, mots de passe, emails/téléphones de test avant sortie ;
- signaler champs absents, horloges suspectes et événements impossibles ;
- sortir une timeline JSON/JSONL lisible, accompagnée d'un manifeste de rejet.

**Produit de référence :** [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Livrables :** `src/incident_timeline.js`, tests tabulaires (au moins 30 cas couvrant formats, timezone, égalités, doublons, secrets, champs manquants et ordre), jeu de fixtures synthétiques, ADR sur la stratégie de corrélation et audit comparatif de deux implémentations. La provenance de chaque variante n’est mentionnée que si elle est réellement documentée.

**Gate :** aucune donnée sensible ne fuit ; le tri est déterministe ; les invalides sont comptés et conservés en quarantaine ; une corrélation incertaine est marquée incertaine au lieu d’être inventée. Chaque défaut maintenu dans l’audit possède une preuve reproductible ; les constats ne sont pas attribués à une origine non vérifiée.

**Règle de livraison :** la kata d’origine reste utile pour isoler le concept et son univers narratif. La validation finale du projet repose sur la mission métier ci-dessus, ses tests, ses limites et les preuves produites par l’apprenant. Les résultats de simulation ne sont jamais présentés comme des résultats de production.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
