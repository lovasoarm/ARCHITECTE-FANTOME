## perishability_id: PER-0073

stability: perissable
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L4
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
review_due: 2028-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> (attention) **OUTIL PÉRISSABLE** : le tooling JS bouge chaque année. Traite ce module comme une REVUE, pas une bible. `Principes durables` en bas.

> **Périssable : valable 2026.** L'outil change vite ; le principe (build, format, lint, package) est **intemporel**.

# 00 : Prereq check : Tools

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `05-MAITRISE/03-EDGE-CASES`, dernier module du tronc technique
> séquentiel avant ce bloc d'outils.

## Questions

1. Une race condition, en une phrase, avec un exemple concret ?
2. Cite trois cas limites d'un formulaire d'email qu'on oublie facilement.
3. Qu'est-ce qu'une erreur off-by-one, avec un exemple de code qui la produit ?
4. Cite un piège classique avec les dates et les fuseaux horaires.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `05-MAITRISE/03-EDGE-CASES/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : bootstrap un projet sans template,
> pourquoi verrouiller les versions, et la différence linter/formateur sont
> le contenu que ce module va t'enseigner : normal de ne pas encore les
> maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
