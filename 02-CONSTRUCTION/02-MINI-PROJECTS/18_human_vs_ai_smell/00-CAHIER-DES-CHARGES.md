---
stability: "evolutif"
duree_de_vie_estimee: 1-2 ans
raison: Les outils et contextes d’assistance évoluent ; les comportements et leurs preuves restent à examiner.
route_family: depth
review_mode: blind
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "none"
canonical_resource: null
source_scope: "Contenu autonome tel que délimité dans le document ; réévaluer si une affirmation externe versionnée est ajoutée."
provenance_note: "Document déclaré autonome/fictif ; cette classification ne vaut pas validation d’une affirmation externe qui serait ajoutée ultérieurement."
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Cahier des charges : revue comparative de deux implémentations

> **Provenance des références :** ce cahier décrit un scénario pédagogique original. Il ne prouve pas que les échantillons A/B proviennent réellement d’un humain ou d’un assistant IA. Les champs fournisseur/modèle consignés pendant l’exercice sont des éléments de contexte déclarés, pas une authentification indépendante ; toute affirmation technique sur un fournisseur doit avoir sa propre source officielle.

Temps de lecture ~4 min

## Objectif

Comparer deux échantillons de code A/B sur un même problème (`formatArenaTime`) et identifier les défauts distincts réellement démontrables, dans la limite de six constats pour borner l’exercice. Si moins de six défauts indépendants sont observables, explique pourquoi plusieurs cas relèvent d’une même cause : ne fractionne pas un défaut pour remplir un quota. Le ZIP ne contient pas de provenance vérifiable ; les noms de fichiers historiques ne prouvent pas l’origine du code.

## Contraintes fonctionnelles

- Le helper accepte un nombre fini et entier de secondes. Les valeurs négatives, non finies ou non entières sont refusées explicitement.
- La sortie respecte les formats : `"1h 23m 04s"`, `"23m 04s"`, `"04s"`. Le comportement au-delà de 24 h doit être décidé dans l'ADR, sans débordement silencieux.
- Les tests fournis dans `tests/` doivent passer sans modification.

## Contraintes de méthode

- Lecture obligatoire des deux versions AVANT toute exécution.
- Aucun code produit avant que `AUDIT.md` liste les défauts distincts observés (au plus six), chacun avec le fichier, la ligne, l’entrée, le comportement, la règle concernée et la preuve attendue. A/B identifie la fixture examinée, pas son auteur.
- La version corrigée vit dans `src/` et est justifiée dans `FIX.md`.
- Une décision de conception (arrondi, gestion négatif, dépassement de 24h) est actée dans un fichier `ADR/`.

## Livrables attendus

- `AUDIT.md` (jusqu’à six défauts indépendants, chacun relié à une ligne, une règle du contrat, une preuve et un impact ; moins si les observations ne justifient pas davantage)
- `FIX.md` (version corrigée + justification par cas limite)
- `src/format_arena_time.js` (implémentation propre)
- `tests/fixture-review.js` (ou équivalent) : revue des fixtures A/B et vérification du correctif
- `tests/tests.js` : tests d’acceptation du contrat de la nouvelle implémentation
- `tests/` verts
- `ADR/0001-choix-arrondi-et-negatifs.md`
- `02-TDD-JOURNAL.md` rempli au fil de l'eau
- `08-POSTMORTEM.md` en fin de mission

## Hors périmètre

- Réécrire les deux versions initiales : elles restent volontairement cassées.
- Ajouter des dépendances : Node standard suffit.

## Critères d'acceptation

- Chaque défaut retenu est distinct, observable et non redondant ; aucune conclusion sur son auteur n’est tirée du style.
- Chaque défaut retenu est démontré par un cas qui appelle réellement la fixture concernée ; le même cas vérifie que la nouvelle implémentation respecte le contrat. Les tests d’acceptation du correctif restent verts.
- Le postmortem distingue les défauts observés et les hypothèses possibles sur leur contexte de production. Il ne présente pas « humain fatigué » ou « IA aveugle » comme des causes certaines sans provenance documentée.

<!-- AF-PROJECT-REAL-WORLD-GATE-1.1 -->

## Mission produit évaluée : Normalisateur de timeline d’incident : revue comparative

Le formatter `formatArenaTime(seconds)` reste un **échauffement court** pour pratiquer la revue comparative de deux implémentations. Il ne constitue plus le projet final : le vrai travail d’ingénierie commence quand plusieurs signaux incohérents doivent être assemblés pendant un incident.

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
