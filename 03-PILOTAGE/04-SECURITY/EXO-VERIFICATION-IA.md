---
stability: stable
acte: verification
---

# Exercice pratique : Sécurité applicative

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

Temps de lecture ~2 min

> Tag `[IA séduisante]` : contrainte pédagogique de travail sans assistance de solution ni autocomplétion générative. Cette contrainte repose sur l’auto-déclaration de l’apprenant ; elle n’est pas vérifiable techniquement par ce document.
> Durée indicative : 45 min. Aucun pack de correction indépendant n’est fourni dans ce module ; cette activité repose sur une auto-vérification explicitement limitée.
> **Statut V6.5 : entraînement non certifiant :** tu peux réaliser cet exercice sans reviewer, mais ton contrat, ton code et ton vérificateur ne constituent pas un corrigé indépendant. Cette page ne ferme aucune gate. Pour obtenir un retour fiable, suis le [protocole de retour fiable](../../06-ANNEXES-TRANSVERSES/85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) ; sans reviewer compétent, conserve le statut `PRATIQUE  : AUTOÉVALUÉ` et note les incertitudes.

## Consigne

Sans assistance de solution ni autocomplétion générative pendant cette activité, choisis le concept-clé du module et rédige d’abord `SPEC-DRILL.md` **avant toute implémentation**. Ce fichier doit fixer : le contrat de la fonction (entrée, sortie et erreurs attendues), au moins trois cas précis (nominal, limite et invalide) et leurs résultats attendus.

Implémente ensuite ton propre module `drill-2.js`. Écris `learner-verifier.js` pour importer ce module et vérifier son comportement réel avec `node:assert/strict`. Les assertions doivent contrôler les résultats ou effets attendus ; elles ne doivent pas seulement vérifier ou imprimer un message de réussite. La fonction testée doit être exportée par `drill-2.js` et importée dans le vérificateur selon le système de modules du projet. N’importe aucun corrigé du curriculum. Le message final `drill 2 OK` ne doit être affiché qu’après la réussite de toutes les assertions.

## Critère de réussite (deterministe)

```bash
node learner-verifier.js
# doit sortir avec le code 0 et afficher exactement : drill 2 OK
```

Le résultat est accepté uniquement si les assertions de `learner-verifier.js` portent sur le comportement du module `drill-2.js` et passent toutes. Un simple `console.log` sans assertions effectives ne valide pas l’activité.

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

Coder à la main un contrôle adapté aux secrets (drill_2_timing_safe), c’est vérifier que tu comprends pourquoi une comparaison ordinaire de chaînes, comme `===`, peut exposer un risque de canal auxiliaire temporel dans certains contextes. Ce n’est pas automatiquement une faille exploitable : le risque dépend notamment de l’environnement, de la possibilité de mesurer les variations de temps et du modèle de menace. Lorsque la plateforme fournit une primitive dédiée, utilise-la en respectant ses préconditions et sa documentation (par exemple `crypto.timingSafeEqual` dans Node.js : les deux entrées doivent être des `Buffer`, `TypedArray` ou `DataView` de même longueur en octets). Cette primitive ne garantit pas, à elle seule, que le code environnant soit également résistant aux attaques temporelles. Voir la [documentation Node.js](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b).

## Journal personnel (auto-déclaré, non indépendant)

Le journal peut conserver les dates déclarées et le SHA-256 du fichier pour suivre tes propres versions. Ces éléments locaux ne prouvent ni la date réelle de création, ni l’absence d’assistance, ni l’indépendance du test.

---
