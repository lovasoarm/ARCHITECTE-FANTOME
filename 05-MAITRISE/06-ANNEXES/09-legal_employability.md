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

<!-- AF-DIAGRAM:contract_review -->

## Repère visuel : revue de contrat de travail ou de prestation

```text
document + version + juridiction
              |
              v
      clauses et annexes
              |
              v
rémunération / durée / préavis / IP / confidentialité
              |
              v
obligations + risques + questions ouvertes
              |
              v
avis compétent si nécessaire
              |
              v
décision éclairée et trace écrite
```

<!-- AF-LESSON-PROFILE: contract -->

## Repères de décision

- **Pourquoi :** Comprendre un contrat permet d'identifier les engagements, les droits cédés, les restrictions et les points à clarifier avant de s'engager.
- **Quand l’utiliser / quand l’éviter :** Utilise cette grille pour préparer une lecture structurée d'une offre, d'un contrat de travail ou de prestation. Ne signe pas et ne conclus pas sur une clause complexe sur la seule base de cette annexe.
- **Limites :** Les règles dépendent de la juridiction, du statut et du texte complet ; ce support n'est pas un conseil juridique. Fais vérifier les points à enjeu par une personne compétente.

## Mécanisme : la version sans magie

Identifie la juridiction et le statut, repère les clauses qui créent droits ou obligations, vérifie les termes ambigus, note les risques et prépare des questions factuelles à poser avant signature.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Juridique & employabilité : ce qu'on t'a pas dit** s'applique à une proposition d'emploi ou de prestation pour un rôle d'ingénierie : tu dois distinguer les promesses orales, les clauses écrites, la propriété intellectuelle, la confidentialité, la durée, la rémunération et les conditions de départ.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : préparer la revue d'une offre ou d'un contrat

**Mission liée à « Juridique & employabilité » :** utilise un exemple anonymisé ou un contrat fictif d'emploi/prestation. Repère les parties, la juridiction indiquée, le statut, la rémunération et ses modalités, la durée, la période d'essai, le préavis, les clauses de confidentialité et propriété intellectuelle, les restrictions post-contractuelles et les modalités de fin. Si le document ne fournit pas une information, inscris `ABSENT` au lieu de la supposer.

**Livrable :** `CONTRACT-REVIEW.md` avec les clauses, leur effet pratique en langage simple, les questions à poser, les risques/doutes, les sources publiques de la juridiction si elles sont mobilisées et les points nécessitant une revue juridique.

**Critères d’acceptation :** chaque observation renvoie à une clause ; faits et interprétations sont séparés ; la juridiction n'est pas devinée ; aucun conseil définitif n'est donné sur un point incertain ; les informations personnelles sont anonymisées.

**Transfert obligatoire :** compare l'offre à une autre modalité (salariat/prestation ou autre juridiction) et liste les différences à faire vérifier avant toute décision.
