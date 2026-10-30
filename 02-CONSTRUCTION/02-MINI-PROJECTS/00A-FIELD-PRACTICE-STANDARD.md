---
stability: stable
acte: pratiquer
---

# Standard de lecture des tests : les 19 mini-projets

## Comprendre les tests avant de commencer

Un test est un programme qui vérifie un comportement. Un fichier `README.md` dans `tests/` décrit un emplacement ; ce n'est pas un test exécutable. Un test qui échoue parce que l'implémentation attendue n'existe pas encore peut être un rouge TDD normal. Un script de scénario contenant `TODO` ou un prérequis manquant est un harnais incomplet à compléter, pas une preuve de panne du produit.

Chaque projet distingue les catégories suivantes :

1. **Tests de référence qui doivent passer dès le départ** : tests réellement fournis et exécutables sans écrire le livrable. Quand aucun test de cette catégorie n'existe, le dire explicitement ; ne pas inventer un résultat vert.
2. **Tests volontairement rouges** : tests fournis qui importent un module/livrable absent, ou scénario explicitement `TODO`. Ils matérialisent le cycle rouge → vert. Le rouge attendu doit être documenté et relié à l'absence de code ciblée.
3. **Tests à créer par l'apprenant** : tests métier, limites, sécurité, intégration et reprise qui ne sont pas fournis.
4. **Tests de validation finale** : suite complète ou scénario de bout en bout, rejoué depuis un état propre ; tous les tests annoncés comme finaux doivent passer.

Un test rouge au démarrage n'est pas une permission d'ignorer le test. Il doit devenir vert après l'implémentation. Un test qui échoue à cause d'une dépendance absente, d'une commande erronée, d'une syntaxe invalide ou d'un environnement non documenté n'est pas un rouge TDD acceptable.

## Ordre de travail pour un scaffold

1. Lire `00-CAHIER-DES-CHARGES.md`, `01-RULES.md`, `03-SECURITY.md` et `04-SECURITY-GATE.md`.
2. Vérifier les prérequis avec le `SETUP.md` local et noter les versions.
3. Cartographier les entrées/sorties et écrire les hypothèses.
4. Créer les tests unitaires du domaine avant l'implémentation.
5. Créer le modèle/types et invariants ; puis les fonctions métier pures.
6. Ajouter les adaptateurs (fichier, base, réseau, processus) derrière des interfaces testables.
7. Ajouter orchestration/entrée du programme et tests d'intégration.
8. Exécuter les gates de sécurité, reprise et performance pertinents.
9. Remplir ADR, TDD journal, postmortem et preuve de validation ; ne pas remplir ces documents avant d'avoir des décisions/événements réels.

L'ordre exact peut changer selon la mission : les projets de reprise de legacy exigent d'abord une cartographie du système existant ; les projets polyglottes exigent d'abord un contrat de scénario commun. Toute dérogation doit être expliquée.

## Règles de validation

- Conserver la sortie exacte des commandes et la version de runtime.
- Ne pas marquer un test `skip`, ne pas supprimer un cas et ne pas affaiblir une assertion pour obtenir du vert sans décision argumentée.
- Les tests finaux couvrent le chemin nominal, les limites, les erreurs, la sécurité et la reprise quand le projet le requiert.
- Un projet n'est pas terminé sur la seule présence de `src/`, `tests/`, d'un ADR ou d'un postmortem : les artefacts doivent contenir des preuves réelles.
- Les gabarits TDD, postmortem, ADR, spécifications et sécurité sont copiés dans chaque projet pour être remplis localement. Ne pas les supprimer au motif qu'ils se ressemblent.

## Convention de compte rendu

Dans chaque mini-projet, la section « État des tests » doit indiquer les fichiers présents, ce qui peut être exécuté maintenant, ce qui est volontairement rouge, ce que l'apprenant doit créer et la commande finale exacte. Si le projet ne fournit aucun code ou test exécutable, l'écrire sans ambiguïté.
