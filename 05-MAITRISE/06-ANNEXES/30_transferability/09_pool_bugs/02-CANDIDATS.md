---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [decision_inversee, solution_concurrente]
anti_recipe_key: decision_inversee+solution_concurrente
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Pool de bugs : candidats calibrés

Temps de lecture ~2 min

Trois dépôts par langage, sélectionnés pour être :

- ni triviaux (pas un à 3 fichiers),
- ni gigantesques (< 20k lignes de code utile),
- riches en bugs historiques bien documentés (issues fermées, PR de fix).

## Python

1. `httpx` : client HTTP asyncio. Chercher issues label `bug` closed.
2. `sanic` : framework asyncio. Bugs de concurrence documentés.
3. Un projet perso à toi > 6 mois d'existence (le meilleur choix).

## Rust

1. `serde_json` : parsing, edge cases numériques.
2. `tokio` (exemples) : concurrence, cancellation.
3. Un starter Rust que tu casses volontairement (voir `CHAOS_INSTRUCTIONS.md`).

## Règle d'or

Tu ne cherches pas un bug ouvert non résolu. Tu prends un bug **déjà corrigé**, tu
`git checkout` sur le commit d'AVANT le fix, et tu essaies de le retrouver seul.
Puis tu compares ton diagnostic au fix officiel. C'est la seule façon d'avoir un
oracle honnête sur ta perf.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Pratique autonome : production attendue

À partir de « Pool de bugs : candidats calibrés », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:transfer -->

## Repère visuel utile : Transférer un invariant entre écosystèmes

```text
principe abstrait / invariant
          |
     +----+----+
     v         v
 runtime A   runtime B
     |         |
 implémenter implémenter
     |         |
     +----+----+
          v
    mêmes fixtures
          |
          v
 comparer traces + limites
```

<!-- AF-LESSON-PROFILE: transfer -->

## Repères de décision

- **Pourquoi :** Le transfert vérifie que tu as compris un principe et pas seulement mémorisé une syntaxe ou une recette liée à un outil.
- **Quand l’utiliser / quand l’éviter :** Utilise-le quand tu changes de langage, de runtime, de framework ou de contexte métier. Évite de transposer mot à mot une abstraction qui n'existe pas dans l'écosystème cible.
- **Limites :** Les sémantiques de mémoire, concurrence, erreurs et bibliothèques diffèrent. Une analogie entre langages ne prouve pas l'équivalence de leur comportement.

## Mécanisme : la version sans magie

Identifie l'invariant, lis le modèle du langage cible, implémente une version minimale, puis compare les traces et les cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pool de bugs : candidats calibrés** se rattache à ce cas concret : Kintana peut être implémenté ou instrumenté dans plusieurs technologies. Les garanties d'idempotence et d'ordre doivent rester les mêmes même si la syntaxe change.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Transférer un invariant entre écosystèmes

> **Arc One Piece / Grand Line :** si tu changes de navire, le principe doit encore naviguer. Le but n'est pas de réciter JavaScript dans un autre langage, mais de reconnaître le même mécanisme.

**Mission liée à « Pool de bugs : candidats calibrés » :** Prends le mécanisme de la leçon et reconstruis-le dans un langage ou runtime différent. Utilise une fixture commune, compare les traces et note ce qui ne se transpose pas directement.

**Livrable :** deux implémentations ou une implémentation et un modèle de référence, tests partagés, tableau de sémantique et note de divergence.

**Critères d’acceptation :** les mêmes entrées sont utilisées ; les divergences sont expliquées ; aucune équivalence n'est revendiquée sans test ; les différences du runtime sont explicites.

**Transfert obligatoire :** Change l'hypothèse de concurrence ou d'erreur du second environnement. Révise ton modèle plutôt que de forcer la première solution.
