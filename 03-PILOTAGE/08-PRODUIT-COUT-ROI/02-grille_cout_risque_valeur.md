---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# La grille coût / risque / valeur

Temps de lecture ~8 min

## 1) LE GABARIT

| Option        | Valeur mensuelle | Coût (j-h + €/mois) | Risque (P x I) | Réversibilité | Décision              |
| ------------- | ---------------- | ------------------- | -------------- | ------------- | --------------------- |
| Ne rien faire |                  | 0 j-h               |                | totale        | référence obligatoire |
| Option A      |                  |                     |                |               |                       |
| Option B      |                  |                     |                |               |                       |

**« Ne rien faire » est toujours une ligne du tableau.** Sans elle, tout chantier paraît rentable.

## 2) SOURCER CHAQUE NOMBRE

Trois sources acceptables : une mesure de ton système, un relevé daté (facture, tarif public), un
entretien avec la personne concernée (nom + date). Une estimation « au doigt » est acceptable si elle
est étiquetée comme telle et encadrée par une fourchette.

## 3) RISQUE = PROBABILITÉ x IMPACT

Sers-toi d'échelles grossières : probabilité 10 % / 50 % / 90 %, impact en euros ou en heures
d'indisponibilité. La précision fausse est pire que l'ordre de grandeur assumé.

## 4) LE PIÈGE DU COÛT DÉJÀ DÉPENSÉ

Les 40 jours déjà investis dans la mauvaise option ne sont pas un argument. Seuls comptent les coûts
**futurs**. Écris-le explicitement dans la grille : « coûts passés exclus ».

## Exercice (25 min)

Prends la prochaine décision réelle de ton fil rouge. Remplis la grille, trois options minimum dont
« ne rien faire », chaque nombre sourcé et daté.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une équipe hésite entre corriger un bug qui provoque 4 incidents de support par mois et ajouter un filtre demandé par un seul client. La correction coûte deux jours et réduit un risque opérationnel récurrent ; le filtre coûte une journée mais n'a pas encore de demande confirmée. La grille compare valeur, risque, coût et réversibilité. L'équipe choisit d'abord le bug, puis conditionne le filtre à une demande mesurée. **Pourquoi :** la décision s'appuie sur des conséquences vérifiables, pas sur le prestige de la fonctionnalité.

**À toi :** Deux améliorations sont proposées : l’une réduit les incidents, l’autre accélère une fonctionnalité ; le budget et l’équipe sont limités. Construis un cas minimal qui illustre « La grille coût / risque / valeur » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
