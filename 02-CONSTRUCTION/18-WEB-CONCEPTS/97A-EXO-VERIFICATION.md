---
stability: stable
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# EXO : Vérifier une IA séduisante

stability: intemporel
acte: pratiquer

---

## EXO [IA séduisante] : 02-construction/18-web-concepts

Temps de lecture ~2 min

> Tag `[IA séduisante]` : contrainte pédagogique de travail sans assistance de solution ni autocomplétion générative. Cette contrainte repose sur l’auto-déclaration de l’apprenant ; elle n’est pas vérifiable techniquement par ce document.
> Durée indicative : 45 min. La grille `97-CHECKPOINT-PACK` fournit des critères de validation et une défense orale ; elle n’exécute pas automatiquement les tests du projet.

## Consigne

Sans assistance de solution ni autocomplétion générative pendant cette activité, choisis le concept-clé du module et rédige d’abord `SPEC-DRILL.md` **avant toute implémentation**. Fixe le contrat (entrée, sortie, erreurs) et au moins trois cas (nominal, limite, invalide) avec leurs résultats attendus.

Implémente ton propre module `drill-2.js`. Écris `learner-verifier.js` pour importer ce module et vérifier son comportement réel avec `node:assert/strict`. Les assertions doivent contrôler les résultats ou effets attendus, pas seulement un message de réussite. Le pack du module complète cette auto-vérification par une grille d’évaluation et une défense orale ; il ne remplace pas les tests exécutables.## Critere de reussite (deterministe)

```bash
node learner-verifier.js
# doit sortir avec code 0 et afficher "OK"
```

Le résultat automatique est accepté uniquement si les assertions testent le comportement du module `drill-2.js`. Le jalon du pack exige en plus un artefact daté, exécutable et défendable à l’oral ; la grille ne lance pas elle-même les tests.

## Livrable

- `SPEC-DRILL.md` : contrat et cas de test fixés avant l’implémentation.
- `drill-2.js` : ta propre implémentation.
- `learner-verifier.js` : tests exécutables du comportement réel.
- `JOURNAL-EXERCICE.md` facultatif : temps, blocages et notions à revoir.## Auto-evaluation (a cocher honnetement)

- [ ] j’ai suivi la contrainte sans assistance (auto-déclaration, non vérifiable indépendamment).
- [ ] les assertions comportementales passent dans le temps indicatif (auto-évaluation).
- [ ] Je peux expliquer le concept a un debutant en 3 minutes, sans notes.

## Pourquoi c'est vital

Le cycle HTTP (auth, validation, handler, error) doit tenir dans ta tete avant de tenir dans le code. l'IA te livre le squelette ; ce drill verifie que tu sais dire pourquoi cet ordre-la, et pas un autre.

## Journal personnel (auto-déclaré, non indépendant)
Le journal conserve une trace personnelle. Les dates déclarées, une capture ou un SHA-256 local ne prouvent ni l’absence d’assistance, ni une date de création certaine, ni l’indépendance des tests.

---

3. Ensuite seulement, tu ouvres l'editeur.

Le jalon n’est démontré que si l’artefact demandé existe, est daté, s’exécute et peut être défendu à l’oral, conformément à la grille du pack. La grille ne certifie pas l’absence d’assistance.
