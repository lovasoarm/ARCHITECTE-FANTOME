---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, changement_contexte]
anti_recipe_key: solution_concurrente+changement_contexte
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Publier ton portfolio proprement

Temps de lecture ~5 min

## Checklist par projet publié

- [ ] `README.md` : problème résolu, démo (GIF/screenshot), stack, `npm start` en 3 lignes.
- [ ] `ADR/` : au moins 1 décision documentée.
- [ ] un postmortem si un incident réel a eu lieu.
- [ ] Lien vers `09-DEPENDENCY_LEDGER.md` racine.
- [ ] Démo déployée (Vercel/Netlify/fly.io) : URL en tête du README.
- [ ] Licence.
- [ ] Un test qui passe en CI (badge visible).

## Anti-pattern

- README auto-généré et jamais relu.
- 47 dépendances pour un app.
- Screenshots datés d'il y a 6 mois.

## Livrable

Si tu choisis de publier le projet, le dépôt passe la checklist et sa publication est relue avant d’être utilisée comme preuve publique. La publication elle-même n’est pas une condition de validation de chaque mini-projet.

---

## RÈGLES DE PREUVE v2026.2

- La **publication GitHub n’est pas obligatoire** pour chaque mini-projet : une preuve locale, versionnée dans ton dépôt fil rouge, suffit lorsque le jalon ne demande pas de preuve externe.
- La **contradiction est obligatoire**, mais elle peut être locale et hors ligne pendant le CORE : revue aveugle, checklist adversariale et objection écrite.
- Une **preuve externe** devient obligatoire seulement lorsqu’un gate la demande explicitement (R1+ / T2+ / sortie terrain). Voir `COMMUNAUTE.md` et `48-EXTERNAL-REVIEW-GATE.md`.
- Le lien du dépôt public et le `09-DEPENDENCY_LEDGER.md` sont des éléments de portfolio, pas des barrières techniques d’entrée.

## GRILLE D'AUTO-ÉVALUATION (10 points)

| Critère                            | 0      | 1            | 2                            |
| ---------------------------------- | ------ | ------------ | ---------------------------- |
| README clair (pitch, install, run) | absent | présent flou | net + captures               |
| Tests                              | 0      | quelques-uns | couverture des cas critiques |
| POSTMORTEM                         | absent | brouillon    | publié                       |
| ADR (si projet ≥ moyen)            | 0      | 1            | 1 par décision majeure       |
| Relecture contradictoire           | 0      | 1 objection  | ≥ 3 objections traitées      |

Note < 6/10 → reviens sur le point faible avant de déclarer la preuve complète. La publication externe n’entre en jeu que si le jalon la demande.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-P0-2026-10-30: missing_example -->

### Exemple travaillé : cas métier

Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Publier ton portfolio proprement » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
