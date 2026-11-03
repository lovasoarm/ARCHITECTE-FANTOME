---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, defaut_cache]
anti_recipe_key: changement_contexte+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : SOLID : renvoi vers la leçon canonique

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Micro-drill

## Niveau

[OK] Avancé

## CONTEXTE

Les principes SOLID peuvent aider à analyser certaines responsabilités et dépendances dans une architecture frontend, mais ils ne constituent pas une checklist obligatoire pour chaque composant React.

## APPLICATION

- Vérifie que `ProjectCard` ne fait qu'afficher, `Row` qu'organiser, `lib/` que sélectionner.
- Repère une violation (par ex. un composant qui filtre ET affiche) et corrige-la.
- Note quel principe était enfreint.

## Critère de réussite

- [ ] Vérifie que `ProjectCard` ne fait qu'afficher, `Row` qu'organiser, `lib/` que sélectionner.
- [ ] Repère une violation (par ex. un composant qui filtre ET affiche) et corrige-la.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Lequel des cinq principes ton code enfreignait-il le plus, et à quel signe l'as-tu vu ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes responsabilités sont séparées.

Ton architecture de composants se défend ligne à ligne. Commit.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-solid_principles_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
