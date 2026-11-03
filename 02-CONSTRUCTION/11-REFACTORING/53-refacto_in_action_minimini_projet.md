---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [temps_limite, solution_concurrente]
anti_recipe_key: temps_limite+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Refacto in action

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Refactorer sans changer le comportement : c'est possible seulement si des tests le garantissent. Tu en as depuis `02-CONSTRUCTION/03-TESTING`.

## OBJECTIF

Ton premier refactor sous filet est fait.

## APPLICATION

- Choisis une fonction couverte par des tests et refactore-la en profondeur.
- Lance les tests après chaque petit pas.
- Interdis-toi d'ajouter une fonctionnalité pendant ce refactor.

## Critère de réussite

- [ ] Choisis une fonction couverte par des tests et refactore-la en profondeur.
- [ ] Lance les tests après chaque petit pas.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment sais-tu que ton refactor n'a rien changé pour l'utilisateur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton premier refactor sous filet est fait.

Tu peux améliorer ton code sans peur : c'est ce que les tests achètent. Commit séparément du reste.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

## Livraison produit obligatoire : Kintana : Incident de demande dupliquée

> **Fil narratif : Capsule Corp. / DBZ :** Bulma ne gagne pas en ajoutant des boutons au vaisseau : elle comprend le mécanisme, teste ses limites et répare ce qui casse. Ton code doit faire pareil, sans compter sur une transformation magique.

Le micro-exercice existant reste une mise en jambe : il isole un mécanisme, mais ne suffit pas comme preuve de maîtrise. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 53-refacto_in_action_minimini_projet » :** Reproduis un incident où un demandeur envoie deux fois la même commande après une réponse lente. Écris les hypothèses, ajoute le signal nécessaire, isole la cause et corrige sans supprimer la preuve du défaut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate :** Le défaut est démontré avant correction ; un test de non-régression échoue avant et passe après ; le postmortem distingue cause et symptôme. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
