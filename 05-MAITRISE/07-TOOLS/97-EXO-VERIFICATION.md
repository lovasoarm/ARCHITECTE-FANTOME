---
stability: "evolutif"
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "05-MAITRISE/07-TOOLS/01-00-why-tools.md"
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/07-TOOLS/01-00-why-tools.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
acte: pratiquer
last_reviewed: 2026-07
depends_on_vendor: false
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Exercice pratique : Outillage technique

Temps de lecture ~2 min

> Tag `[IA séduisante]` : contrainte pédagogique de travail sans assistance de solution ni autocomplétion générative. Cette contrainte repose sur l’auto-déclaration de l’apprenant ; elle n’est pas vérifiable techniquement par ce document.
> Durée indicative : 45 min. Aucun pack de correction indépendant n’est fourni dans ce module ; cette activité repose sur une auto-vérification explicitement limitée.
> **Statut V6.5 : entraînement non certifiant :** tu peux réaliser cet exercice sans reviewer, mais ton contrat, ton code et ton vérificateur ne constituent pas un corrigé indépendant. Cette page ne ferme aucune gate. Pour obtenir un retour fiable, suis le [protocole de retour fiable](../../06-ANNEXES-TRANSVERSES/85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) ; sans reviewer compétent, conserve le statut `PRATIQUE  : AUTOÉVALUÉ` et note les incertitudes.

## Consigne

Sans assistance de solution ni autocomplétion générative pendant cette activité, choisis le concept-clé du module et rédige d’abord `SPEC-DRILL.md` **avant toute implémentation**. Ce fichier doit fixer : le contrat de la fonction (entrée, sortie et erreurs attendues), au moins trois cas précis (nominal, limite et invalide) et leurs résultats attendus.

Implémente ensuite ton propre module `drill-2.js`. Écris `learner-verifier.js` pour importer ce module et vérifier son comportement réel avec `node:assert/strict`. Les assertions doivent contrôler les résultats ou effets attendus ; elles ne doivent pas seulement vérifier ou imprimer un message de réussite. N’importe aucun corrigé du curriculum. Le message final `drill 2 OK` ne doit être affiché qu’après la réussite de toutes les assertions.

## Critère de réussite (deterministe)

```bash
node learner-verifier.js
# doit sortir avec le code 0 et afficher exactement : drill 2 OK
```

Le résultat est accepté uniquement si les assertions de `learner-verifier.js` portent sur le comportement du module `drill-2.js` et passent toutes. Un simple message imprimé sans assertions effectives ne valide pas l’activité.

## Livrable

- `SPEC-DRILL.md` : contrat et cas de test écrits avant l’implémentation.
- `drill-2.js` : ta propre implémentation du concept choisi.
- `learner-verifier.js` : assertions exécutables qui importent et testent `drill-2.js`.
- `JOURNAL-EXERCICE.md` facultatif : temps, blocages et notions à revoir.

## Auto-evaluation (a cocher honnetement)

- [ ] j’ai suivi la contrainte sans assistance (auto-déclaration, non vérifiable indépendamment).
- [ ] les assertions comportementales passent dans le temps indicatif (auto-évaluation).
- [ ] Je peux expliquer le concept a un debutant en 3 minutes, sans notes.

## Pourquoi c'est vital

Un outil (linter, bundler, runner) que tu ne peux pas configurer sans IA est un outil qui te configure. Ce drill verifie que tu tiens la chaine d'outillage, pas l'inverse.

## Journal personnel (auto-déclaré, non indépendant)

Le journal peut conserver les dates déclarées et le SHA-256 du fichier pour suivre tes propres versions. Ces éléments locaux ne prouvent ni la date réelle de création, ni l’absence d’assistance, ni l’indépendance du test.

---
