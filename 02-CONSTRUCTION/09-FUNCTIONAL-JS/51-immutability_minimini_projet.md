---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, decision_inversee]
anti_recipe_key: transmission+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
---

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
