---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [preuve_partielle, decision_organisationnelle]
anti_recipe_key: preuve_partielle+decision_organisationnelle
transfer_distance: high
assessment_role: transfer_mastery
---

**SCÈNE CRAZYDEVS : mission ouverte :** les contraintes viennent d’augmenter, l’information est incomplète et plusieurs solutions restent plausibles. Ne cherche pas encore la réponse : trouve d’abord ce qui pourrait casser.

# Drill : Pseudo-Rust

Temps de lecture ~5 min

Objectif P6 : montrer que ta méthode ce parcours survit au changement de langage.

```rust
// pseudo-code
async fn main() {
  spawn(async { println!("A"); });
  println!("B");
  yield_now().await;
  println!("C");
}
```

- Ordre d'affichage attendu ?
- Compare avec `setTimeout(() => log("A"), 0); log("B"); await Promise.resolve(); log("C")` en JS.
- Où sont les micro/macrotasks ici ? Où est le scheduler ?

## Debrief à écrire (obligatoire)

- Qu'est-ce qui a été **identique** à JS ?
- Qu'est-ce qui a été **différent** ?
- Qu'est-ce que tu retiens pour la prochaine fois ?

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
