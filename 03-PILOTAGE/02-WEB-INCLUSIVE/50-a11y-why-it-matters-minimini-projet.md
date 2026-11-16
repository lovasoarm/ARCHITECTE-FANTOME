---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mini-projet : Pourquoi l’accessibilité compte

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Projet fil rouge

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un portfolio inaccessible exclut des visiteurs : dont parfois le recruteur. Et l'accessibilité est un signal de sérieux technique immédiat.

## OBJECTIF

Tes premiers obstacles sont identifiés et datés.

## APPLICATION

- Navigue ton accueil au clavier uniquement, sans souris, et note les trois premiers blocages.
- Écris-les dans `docs/a11y.md` avec leur gravité.
- Corrige le plus grave aujourd'hui.

## Critère de réussite

- [ ] Navigue ton accueil au clavier uniquement, sans souris, et note les trois premiers blocages.
- [ ] Écris-les dans `docs/a11y.md` avec leur gravité.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel blocage rendait une partie du site totalement inutilisable, et pas seulement inconfortable ?

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

Dans ce scénario, tu as vérifié que : tes premiers obstacles sont identifiés et datés.

Tu as une feuille de route d'accessibilité issue de ton propre site. Commit `docs/a11y.md`.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Livraison produit : Kintana : identifier et prioriser les obstacles d'accès

> **Fil rouge :** Kintana garde le même parcours de demande. Cette mission ne cherche pas encore à corriger toutes les techniques d'accessibilité ; elle vérifie que tu sais identifier qui est bloqué, à quel moment et avec quelle conséquence.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Pourquoi l’accessibilité compte » :** examine trois tâches métier du demandeur : trouver un service, envoyer une demande et retrouver son statut. Pour chacune, analyse au moins un mode d'accès différent parmi clavier seul, lecteur d'écran, faible perception du contraste/zoom ou compréhension des libellés et messages. Observe le parcours réel dans ton environnement ou inspecte le code et le rendu ; ne prétends pas représenter l'expérience de toutes les personnes concernées par une simple simulation.

**Livrable :** `docs/a11y-kintana.md` contenant les tâches, le mode d'accès étudié, l'étape précise, l'obstacle constaté, la conséquence utilisateur, une preuve (capture, séquence de touches, annonce entendue ou extrait pertinent), la gravité argumentée, la correction proposée et la limite de l'observation.

**Gate : la preuve porte sur l'impact et la priorisation :**

- le registre contient au moins trois constats vérifiables (obstacles constatés ou contrôles passés) couvrant au moins deux modes d'accès différents ; si aucun défaut n'est observé, tu le notes comme tel au lieu d'en inventer un ;
- chaque constat distingue le fait observé de l'hypothèse sur l'impact ;
- les niveaux `bloquant`, `important` et `amélioration` sont définis selon la tâche empêchée ou dégradée, pas selon la facilité de correction ;
- si un obstacle est confirmé, tu choisis le plus grave, tu le corriges avec un changement limité, puis tu rejoues exactement la tâche pour comparer avant/après ; si aucun obstacle n'est confirmé, tu justifies ce résultat et définis le test supplémentaire qui réduirait le plus l'incertitude ;
- les éléments non testés sont explicitement marqués `NON TESTÉ` ; une inspection personnelle n'est pas présentée comme un test utilisateur ni comme une validation juridique.

**Contre-épreuve :** donne un exemple d'interface visuellement réussie qui échoue pour un autre mode d'accès, puis explique pourquoi le seul score visuel ou fonctionnel ne suffit pas. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu'après observation réelle dans cet environnement.
