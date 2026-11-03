---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Mapped types : transformer un type propriété par propriété

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Les mapped types transforment tous les champs d'un type d'un coup : une version « brouillon » de `Project`, ou une version figée.

## OBJECTIF

Ton catalogue est immuable au niveau des types.

## APPLICATION

- Déclare un type `ReadonlyDeep`-like appliqué à `Project` pour figer aussi `stack` et `description`.
- Applique-le à ton catalogue exporté.
- Constate l'erreur en tentant un `push` sur `stack`.

## Critère de réussite

- [ ] Déclare un type `ReadonlyDeep`-like appliqué à `Project` pour figer aussi `stack` et `description`.
- [ ] Applique-le à ton catalogue exporté.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelle différence pratique entre `Readonly<Project>` et ta version profonde ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton catalogue est immuable au niveau des types.

La règle d'immutabilité du module `02-CONSTRUCTION/09-FUNCTIONAL-JS` est désormais vérifiée par le compilateur. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-mapped_types_minimini_projet » :** Dérive depuis le type d’une demande un type de champs modifiables et un type de champs en lecture seule au moyen d’un mapped type. Vérifie le comportement sur les champs optionnels et les identifiants immuables.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
