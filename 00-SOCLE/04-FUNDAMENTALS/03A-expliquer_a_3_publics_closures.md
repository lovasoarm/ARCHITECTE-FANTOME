---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Closures : expliqué à 3 publics

<!-- AF-DIAGRAM:closure -->

```text
┌──────────────┐
│ appelant     │
└──────┬───────┘
       │ crée
       ▼
┌──────────────┐       conserve
│ fonction     │────────────────┐
└──────┬───────┘                │
       │ retourne               │
       ▼                        ▼
┌──────────────┐        ┌──────────────┐
│ code suivant │        │ environnement│
└──────────────┘        │ lexical      │
                        └──────────────┘
```

Une closure reste liée à son environnement lexical même après le retour de la fonction créatrice.

Temps de lecture ~2 min

-> ~10 min

## À UN ENFANT

Imagine une boîte à jouets fermée à clé. Tu donnes la clé à ton frère. Lui n'a jamais vu tes jouets, mais quand il ouvre, il peut jouer avec **exactement les mêmes** que quand tu as fermé la boîte. La fonction qui "ferme la boîte", c'est une closure : elle emporte avec elle les variables telles qu'elles étaient au moment de sa création.

## À UN PAIR DEV

Une closure = une fonction + son environnement lexical capturé. Techniquement, le moteur JS garde vivant le scope parent tant que la fonction interne est référencée. Conséquences concrètes :

- **Data hiding** : émuler du privé sans `#field` (avant ES2022).
- **Module pattern** : IIFE qui expose une API publique, cache l'état interne.
- **Piège mémoire n°1** : une closure sur une grosse variable dans un event handler garde cette variable vivante indéfiniment.
- **Piège n°2** : `for (var i=0;…)` + `setTimeout(()=>console.log(i))` → toutes les closures partagent le même `i`. `let` isole par itération.

## À UN CTO

Les closures sont la base de la modularité JS avant les modules ES6, et restent la source n°1 de fuites mémoire subtiles (heap qui grimpe sans OOM immédiat, dégradation lente sur 48h). Coût : un dev qui ne maîtrise pas les closures produit du code qui **tourne en dev** et **fuit en prod**. Signal d'embauche : "explique-moi une fuite mémoire causée par une closure que tu as debug" → si la réponse est floue, red flag junior.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
