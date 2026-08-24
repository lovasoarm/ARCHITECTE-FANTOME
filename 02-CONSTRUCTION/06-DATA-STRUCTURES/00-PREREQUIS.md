---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [defaut_cache, transmission]
anti_recipe_key: defaut_cache+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

# 00 : Prereq check : Data Structures

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`, le module que tu viens de finir.

## Questions

1. Que fait un garbage collector, en une phrase ?
2. Différence entre une fuite mémoire et un simple pic mémoire ?
3. Copie par valeur vs par référence en JS : quel type de données suit quelle règle ?
4. Que révèle concrètement un heap snapshot que `console.log` ne montre pas ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/`, ou à sa synthèse `_recall_10.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : quand une hash table bat un array, le
> coût d'insertion d'un BST équilibré, et la complexité d'accès d'une `Map`
> sont le contenu que ce module va t'enseigner (notamment `07_hash_table/`
> et `06_bst/`) : normal de ne pas encore les maîtriser. La différence
> stack/queue a déjà été vue au fil du curriculum ; si c'est flou, jette un
> œil rapide à `04_queue/02-queue_basics.md` avant de commencer.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
