---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, changement_echelle]
anti_recipe_key: regression+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## CONTEXTE

Un module ESM est déjà un singleton : l'index slug → projet ne doit être construit qu'une fois, pas à chaque rendu.

## APPLICATION

- Vérifie que ta `Map` d'index est bien créée au niveau module et non dans une fonction appelée à chaque requête.
- Ajoute un log de construction et compte combien de fois il apparaît en navigation.
- Note pourquoi une classe Singleton explicite serait ici inutile.

## Critère de réussite

- [ ] Vérifie que ta `Map` d'index est bien créée au niveau module et non dans une fonction appelée à chaque requête.
- [ ] Ajoute un log de construction et compte combien de fois il apparaît en navigation.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi un module ESM suffit-il là où d'autres langages imposent un pattern Singleton ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton index est construit une seule fois.

Tu as compris un pattern et su ne pas le sur-implémenter : c'est le vrai signe de maîtrise.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
