---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Immutabilité : ne pas muter, créer

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

## TYPE

Micro-drill

## Niveau

[OK] Intermédiaire

## CONTEXTE

Ne jamais modifier les données reçues : c'est ce qui garantit que le filtre d'une rangée n'affecte pas les autres.

## APPLICATION

- Repère toute méthode mutante restante (`sort`, `reverse`, `splice`, `push`) dans `lib/`.
- Remplace-les par leurs équivalents non destructifs.
- Ajoute un test qui vérifie que le catalogue d'origine est inchangé après appel.

## Critère de réussite

- [ ] Repère toute méthode mutante restante (`sort`, `reverse`, `splice`, `push`) dans `lib/`.
- [ ] Remplace-les par leurs équivalents non destructifs.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel test prouve concrètement l'immutabilité d'une fonction ?

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton catalogue est intouchable.

Une classe entière de bugs est éliminée, avec un test qui le prouve. Commit.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Livraison produit obligatoire : Kintana : Règle métier et état

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-immutability_minimini_projet » :** Dans `domain/requests/`, produis une nouvelle demande lorsqu’un champ change. Vérifie que l’objet initial et ses collections restent inchangés et que le résultat conserve les champs non modifiés.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
