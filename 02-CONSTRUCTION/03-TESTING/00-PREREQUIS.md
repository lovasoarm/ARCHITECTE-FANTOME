## perishability_id: PER-0012

stability: perissable
acte: évaluer
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_inversee]
anti_recipe_key: changement_echelle+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Testing

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `01-CADRAGE/04-ERROR-HANDLING`, le module que tu viens de finir.

## Questions

1. Différence entre `throw new Error("x")` et `throw "x"` : quel est le vrai avantage du premier ?
2. Dans quel ordre s'exécutent `try` / `catch` / `finally` si l'erreur est levée dans `try` ?
3. Une `Promise` rejetée qui n'est jamais `await`-ée ni `.catch()`-ée : que se passe-t-il en Node 22+ ?
4. Cite un cas où `catch(e)` **doit** re-`throw` plutôt qu'avaler l'erreur.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `01-CADRAGE/04-ERROR-HANDLING/`, ou à sa synthèse `_recall_05.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence unit/intégration/e2e, ce
> qu'un test qui passe toujours prouve réellement (rien : c'est un piège),
> et le format AAA (Arrange/Act/Assert) sont le contenu que ce module va
> t'enseigner (notamment `02-unit_sniper.md`) : normal de ne pas encore
> les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
