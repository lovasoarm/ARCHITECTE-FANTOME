---
stability: "evolutif"
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/12-TYPESCRIPT/README.md"
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/12-TYPESCRIPT/README.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
acte: pratiquer
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# Exercice pratique : TypeScript

Temps de lecture ~2 min

> Tag `[IA séduisante]` : contrainte pédagogique de travail sans assistance de solution ni autocomplétion générative. Cette contrainte repose sur l’auto-déclaration de l’apprenant ; elle n’est pas vérifiable techniquement par ce document.
> Durée indicative : 45 min. Aucun pack de correction indépendant n’est fourni dans ce module ; cette activité repose sur une auto-vérification explicitement limitée.
> **Statut V6.5 : entraînement non certifiant :** tu peux réaliser cet exercice sans reviewer, mais ton contrat, ton code et ton vérificateur ne constituent pas un corrigé indépendant. Cette page ne ferme aucune gate. Pour obtenir un retour fiable, suis le [protocole de retour fiable](../../06-ANNEXES-TRANSVERSES/85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) ; sans reviewer compétent, conserve le statut `PRATIQUE  : AUTOÉVALUÉ` et note les incertitudes.

## Consigne

Sans assistance de solution ni autocomplétion générative pendant cette activité, choisis le concept-clé du module et rédige d’abord `SPEC-DRILL.md` **avant toute implémentation**. Ce fichier doit fixer : le contrat de la fonction (entrée, sortie et erreurs attendues), au moins trois cas précis (nominal, limite et invalide) et leurs résultats attendus.

Implémente ensuite ton propre module `drill-2.ts`. Écris `learner-verifier.ts` pour importer ce module, vérifier son comportement et contenir au moins une assertion de type compilée (par exemple `Expect<Equal<...>>`). La vérification runtime doit contrôler les résultats ou effets attendus ; elle ne doit pas seulement imprimer un message de réussite. N’importe aucun corrigé du curriculum. Le concept doit comporter au moins un contrat TypeScript vérifiable à la compilation : signature générique, union discriminée, type guard ou type conditionnel.

## Critère de réussite (deterministe)

```bash
# 1. Vérification des types sans émettre de JavaScript.
tsc --noEmit --strict --target ES2022 --module commonjs --lib ES2022,DOM drill-2.ts learner-verifier.ts

# 2. Compilation, puis vérification du comportement réel.
tsc --strict --target ES2022 --module commonjs --lib ES2022,DOM --outDir dist drill-2.ts learner-verifier.ts
node dist/learner-verifier.js
# code de sortie 0 et message final : drill 2 OK
```

La réussite exige les deux étapes : compilation stricte sans erreur et assertions runtime passantes. `drill 2 OK` n’est affiché qu’après toutes les assertions. Les tests runtime ne remplacent pas la preuve du système de types.

## Livrable

- `SPEC-DRILL.md` : contrat et cas de test écrits avant l’implémentation.
- `drill-2.ts` : ta propre implémentation typée du concept choisi.
- `learner-verifier.ts` : assertions de type et vérifications runtime qui importent et testent `drill-2.ts`.
- `JOURNAL-EXERCICE.md` facultatif : temps, blocages et notions à revoir.

## Auto-evaluation (a cocher honnetement)

- [ ] j’ai suivi la contrainte sans assistance (auto-déclaration, non vérifiable indépendamment).
- [ ] les assertions comportementales passent dans le temps indicatif (auto-évaluation).
- [ ] Je peux expliquer le concept a un debutant en 3 minutes, sans notes.

## Pourquoi c'est vital

Un discriminated union ecrit a la main, un generique contraint proprement : c'est ce qui separe TypeScript-decoration de TypeScript-outil. sans IA, tu ne peux plus laisser any glisser dans un coin.

## Journal personnel (auto-déclaré, non indépendant)

Le journal peut conserver les dates déclarées et le SHA-256 du fichier pour suivre tes propres versions. Ces éléments locaux ne prouvent ni la date réelle de création, ni l’absence d’assistance, ni l’indépendance du test.

---
