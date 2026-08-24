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

## Checklist par projet GitHub

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

Un dépôt qui passe la checklist. Fais-le relire par un pair **avant** de le mettre sur ton CV.

---

## RÈGLES DURCIES v2026.1

- **Publication GitHub OBLIGATOIRE** pour chaque mini-projet avant de passer au module suivant.
- **Peer-review OBLIGATOIRE** : voir `COMMUNAUTE.md`.
- **Lien du dépôt** à inscrire dans le `09-DEPENDENCY_LEDGER.md`.

## GRILLE D'AUTO-ÉVALUATION (10 points)

| Critère                            | 0      | 1            | 2                            |
| ---------------------------------- | ------ | ------------ | ---------------------------- |
| README clair (pitch, install, run) | absent | présent flou | net + captures               |
| Tests                              | 0      | quelques-uns | couverture des cas critiques |
| POSTMORTEM                         | absent | brouillon    | publié                       |
| ADR (si projet ≥ moyen)            | 0      | 1            | 1 par décision majeure       |
| Peer-review reçue                  | 0      | 1 remarque   | ≥ 3 remarques traitées       |

Note < 6/10 → tu ne passes pas au module suivant. Point.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
