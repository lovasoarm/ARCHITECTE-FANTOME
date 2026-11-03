---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Juridique & employabilité : ce qu'on t'a pas dit

Temps de lecture ~15 min

Tu vas signer des contrats. Certains te feront perdre la propriété de TON code. Lis avant, pas après.

## NDA (accord de confidentialité)

- Vérifie la DURÉE (5 ans ? à vie ?).
- Vérifie le PÉRIMÈTRE ("toute information" = trop large).
- Vérifie la JURIDICTION (tribunal du client = souvent défavorable).

## PROPRIÉTÉ DU CODE

- **Salarié** : par défaut le code appartient à l'employeur si écrit dans le cadre du travail.
- **Freelance** : par défaut le code T'appartient tant que le contrat ne prévoit PAS de cession. Beaucoup de contrats prévoient la cession : lis-les.
- **Open source pendant le boulot** : demande l'autorisation ÉCRITE avant de committer sur ton repo perso.

## FREELANCE VS SALARIÉ (résumé brutal)

| Critère            | Salarié  | Freelance          |
| ------------------ | -------- | ------------------ |
| Sécurité           | Élevée   | Zéro par défaut    |
| Rémunération brute | Moyenne  | 1.5x à 3x          |
| Charges/impôts     | Prélevés | À gérer soi        |
| Congés payés       | Oui      | Non                |
| Choix des missions | Faible   | Élevé (si demandé) |
| Formation          | Payée    | À financer soi     |

## AVANT DE SIGNER

- Fais relire par un pair.
- Négocie 3 clauses (jamais 0, jamais 10).
- Garde une copie signée en PDF hors du drive de l'employeur.

## PRINCIPES DURABLES

Un contrat mal lu est plus dangereux qu'un bug en prod. Le bug tu le fixes ; le contrat te suit 5 ans.

<!-- AF-DIAGRAM:portfolio -->

## Repère visuel utile : Dossier de preuve examinable

```text
problème -> rôle -> artefact
                   |
                   v
             commande reproductible
                   |
                   v
             résultat + limites
                   |
                   v
             revue / objection
                   |
                   v
             preuve renforcée ou claim retiré
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un portfolio crédible relie compétence, artefact, décision et résultat sans transformer une simulation en expérience réelle.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour montrer ton travail à un reviewer, entretien ou équipe. Mets en avant une preuve profonde plutôt qu'une collection de technologies.
- **Limites :** Un portfolio personnel ne démontre pas à lui seul influence organisationnelle ou impact production. Respecte confidentialité, licences et données non publiques.

## Mécanisme : la version sans magie

Présente le problème, ton rôle, les contraintes, les choix, le code/tests, la mesure, les limites et ce qui a changé après feedback.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Juridique & employabilité : ce qu'on t'a pas dit** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « Juridique & employabilité : ce qu'on t'a pas dit » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
