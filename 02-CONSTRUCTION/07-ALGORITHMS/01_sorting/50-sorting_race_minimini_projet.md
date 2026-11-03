---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, transmission]
anti_recipe_key: changement_contexte+transmission
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Sorting race : bubble vs merge vs quick sur des vrais volumes

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les projets du portfolio s'affichent dans un ordre. Aujourd'hui cet ordre est probablement celui du tableau source ; il devrait être une décision explicite : date, popularité, ordre manuel de mise en avant.

## OBJECTIF

L'ordre d'affichage de tes projets est une règle de tri explicite et testable.

## APPLICATION

- Dans `lib/`, écris une fonction `sortProjects(projects, criterion)` qui trie par date, puis par titre à date égale.
- Utilise-la dans la page qui liste les projets, à la place de l'ordre implicite du tableau.
- Vérifie qu'elle ne mute pas le tableau d'origine (travaille sur une copie).
- Compare le coût de ton tri sur 6 projets et sur 5 000 objets générés : note ce que le changement d'échelle rend visible.

## Critère de réussite

- [ ] Fait : la liste affichée suit la règle de tri annoncée, y compris en cas d'égalité.
- [ ] Fait : le tableau source reste inchangé après appel.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi la stabilité du tri devient-elle importante dès qu'il existe des valeurs égales sur le critère principal ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton ordre d'affichage vient d'une règle de tri explicite et non mutante.

Tu as appliqué un algorithme classique à tes données réelles. Commit `lib/sortProjects`.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Mesurer avant d’optimiser

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 50-sorting_race_minimini_projet » :** Choisis une opération Kintana liée à cette leçon et crée un benchmark reproductible sur un jeu synthétique d’au moins 10 000 entrées lorsque le sujet le permet. Compare une baseline et une variante.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le protocole indique machine, volume, concurrence et répétitions ; tu présentes p50/p95 ou mémoire ; tu expliques le coût secondaire et refuses toute extrapolation non justifiée. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
