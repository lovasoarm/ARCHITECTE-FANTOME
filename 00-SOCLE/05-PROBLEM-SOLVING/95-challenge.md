---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Challenge : `05-PROBLEM-SOLVING` : résoudre avant de construire

Ce challenge vérifie les méthodes travaillées dans le module. Il ne demande pas de livrer une application complète ni d'utiliser un projet personnel. Aucune base de données, API, application hébergée ou intégration Kintana n'est requise. Git et un dépôt distant ne sont pas requis. Les six premiers exercices s'appuient sur le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md).

## Déroulement du challenge : 1 h 30 au total

Le challenge est une évaluation de synthèse distincte de la première passe. **Ne recommence pas les six mini-pratiques** : reprends les six livrables déjà produits et vérifie-les. De même, réutilise les trois fiches datées de l'exercice de lecture `08-EXO_LECTURE.md` ; il n'est pas nécessaire de refaire les trois cycles.

| Étape                       | Travail                                                                                                                                                                  | Temps indicatif |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------: |
| 1. Revue des six preuves    | Relis chacun des livrables ci-dessous pendant environ 5 min ; vérifie qu'il répond bien à sa consigne et qu'il distingue faits et hypothèses.                            |          30 min |
| 2. Transfert par la lecture | Reprends une des trois fiches de `08-EXO_LECTURE.md` et explique l'écart éventuel entre ton hypothèse et ce que l'extrait ou ses tests permettent réellement d'établir.  |          15 min |
| 3. Défendre l'inverse       | Fais le checkpoint de profondeur ci-dessous : défends une stratégie opposée, puis indique où elle échoue.                                                                |          15 min |
| 4. Synthèse finale          | Rédige `SYNTHESE-CHALLENGE.md` avec les six liens de preuve, le choix défendu, le meilleur contre-exemple, les incertitudes restantes et les vérifications qui manquent. |          30 min |

Les temps sont des repères de travail, pas une course. Si une preuve manque, complète-la avant de déclarer le challenge terminé.

### Les six preuves à réutiliser

1. [50 : Méthode Polya](50-polya_method_minimini_projet.md)
2. [51 : Décomposer](51-decompose_minimini_projet.md)
3. [52 : Modéliser avant de coder](52-model_before_code_minimini_projet.md)
4. [53 : Choisir une approche](53-choose_an_approach_minimini_projet.md)
5. [54 : Lire des exigences floues](54-read_fuzzy_requirements_minimini_projet.md)
6. [55 : Concevoir pour le changement](55-design_for_change_minimini_projet.md)

### Prolongements facultatifs : hors des 1 h 30

Ces deux exercices sont indépendants et ne conditionnent ni la première passe ni la validation du challenge :

- [Exercice autonome : implémenter et vérifier un concept](98-EXO-VERIFICATION.md) : environ 45 min.
- [Détection d'une IA qui invente](97-EXO-VERIFICATION.md) : environ 10 min.

Tu peux les faire séparément, dans l'ordre de ton choix. Ils ne remplacent aucun des six livrables et ne constituent pas une preuve indépendante de maîtrise.

## Dossier de preuve

Conserve les productions dans un dossier local, par exemple `PREUVES/00-SOCLE/05-PROBLEM-SOLVING/` :

- `01-polya.md` : problème, plan, exécution prévue et vérification ;
- `02-decomposition.md` : sous-tâches indépendantes et estimations ;
- `03-modele.md` : modèle `Project` et `PersonalInfo`, champs, types et usages ;
- `04-approche.md` : options, critères, choix et coût accepté ;
- `05-criteres.md` : exigences floues transformées en critères observables ;
- `06-changement.md` : ajout d'un septième projet dans une fixture locale, fichiers touchés et limites ;
- `HYPOTHESES_01.md`, `HYPOTHESES_02.md`, `HYPOTHESES_03.md` : trois hypothèses datées par cycle ;
- `LECTURE_01.md`, `LECTURE_02.md`, `LECTURE_03.md` : hypothèse, vérification et écart observé pour chacun des trois cycles ;
- `SYNTHESE-CHALLENGE.md` : revue des six preuves, contre-exemple, décision et incertitudes restantes.

Les noms sont indicatifs. Une feuille papier ou un fichier texte est acceptable pour les exercices qui ne demandent pas d'exécution. Le petit fichier de l'exercice 55 doit rester jetable et isolé sous `scratch/problem-solving/` ; ne touche pas à un projet personnel.

## Critères de réussite

- [ ] Les six livrables des mini-pratiques existent et sont datés ; ils ont été relus pendant la revue de 30 min, sans refaire les exercices.
- [ ] Les trois cycles de l'exercice de lecture existent ; une fiche a été reprise pour le transfert.
- [ ] Le problème est formulé avant la solution ; les hypothèses sont distinguées des faits.
- [ ] Le découpage produit des sous-tâches compréhensibles et de taille raisonnable.
- [ ] Le modèle de données couvre les informations demandées et leurs usages ; les champs incertains sont signalés.
- [ ] Le choix d'approche compare au moins deux options plausibles avec un critère de décision explicite.
- [ ] Les exigences vagues deviennent des observations ou mesures vérifiables, sans prétendre qu'elles ont déjà été validées.
- [ ] L'expérience de changement décrit ce qui a été modifié, ce qui est resté stable et les limites du résultat.
- [ ] `SYNTHESE-CHALLENGE.md` contient le meilleur contre-exemple, les incertitudes et les vérifications manquantes.
- [ ] Si les exercices IA facultatifs ont été faits, leurs sorties sont étiquetées `SIMULATION` ou `LAB` selon ce qui s'est réellement passé ; aucune sortie d'IA n'est présentée comme une preuve indépendante.

## Ce qui est explicitement différé

Les sections **Pont Kintana différé** présentes dans les six mini-pratiques ne font pas partie de ce challenge. Elles réutilisent des mécanismes d'API, d'idempotence, de tests et de diagnostic qui seront étudiés plus tard. Ne construis pas maintenant un backend Kintana, ne prétends pas avoir testé une requête concurrente et ne crée pas une gate cachée. Reviens à ces ponts après le Cadrage et lorsque les prérequis techniques locaux seront acquis.

Reporte l'état réel dans [PROGRESSION.md](../../PROGRESSION.md). Git, GitHub et un dépôt distant ne sont pas nécessaires pour valider ce challenge.

## CHECKPOINT DE PROFONDEUR : défendre l'inverse (15 min)

Ferme la page et défends pendant 15 minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours. Ce checkpoint approfondit le travail ; il ne remplace pas les six productions.
