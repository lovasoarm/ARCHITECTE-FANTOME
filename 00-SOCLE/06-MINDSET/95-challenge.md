---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [solution_concurrente, regression]
anti_recipe_key: solution_concurrente+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
---

# Challenge : note de conception + ADR sur un cas Kintana

## Contexte et périmètre

Tu n'as pas encore qualifié ton fil rouge personnel : cela se fera pendant le Cadrage. Ce challenge utilise donc le cas fictif commun [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), déjà décrit dans le curriculum. **Kintana est un support de simulation, pas ton projet personnel, pas un service réel et pas une preuve de production.**

Scénario borné : deux demandeurs essaient de réserver la dernière place disponible dans un centre. Une réponse réseau tarde ; un demandeur peut renvoyer sa demande sans savoir si la première a été prise en compte. Kintana doit éviter une double réservation et conserver une trace compréhensible.

Tu dois raisonner et écrire. Aucune base de données, API, transaction, file de messages, intégration ou ligne de code n'est requise dans ce module.

## Décision à étudier

Choisis et compare au moins trois options plausibles, par exemple :

1. **Traitement manuel** : les demandes ambiguës sont mises en attente pour qu'un agent vérifie la disponibilité. Coût : délai et charge opérateur. Bénéfice : limite les décisions automatiques en cas d'incertitude.
2. **Réservation confirmée uniquement après vérification centrale** : la disponibilité est vérifiée au moment de confirmer la réservation. Coût : demande un mécanisme central cohérent à concevoir et à tester plus tard. Bénéfice : une seule décision fait autorité.
3. **Liste d'attente / confirmation différée** : la demande est enregistrée comme attente, puis confirmée quand une place est réellement attribuable. Coût : parcours plus long et statut supplémentaire à expliquer. Bénéfice : évite de promettre immédiatement une place indisponible.

Ces options sont des pistes, pas une réponse attendue. Tu peux en proposer d'autres si elles sont réellement défendables. À ce stade, traite les mécanismes techniques comme des concepts ; ne choisis pas une technologie ni n'invente un test d'implémentation.

## Livrables

Conserve les deux documents dans un dossier local, par exemple `PREUVES/00-SOCLE/06-MINDSET/`. Git et un projet personnel ne sont pas requis.

### 1. Note de conception : `design-kintana-reservation.md`

Maximum indicatif : 500 mots. Elle doit contenir :

- **Problème** : ce qui arrive, pour qui, avec quel impact.
- **Contraintes connues** : dernière place, délai réseau, rôles et besoin de traçabilité. Sépare ce qui est fourni de ce que tu supposes.
- **Non-objectifs** : au moins deux sujets hors du périmètre de cette décision.
- **Hypothèse mesurable** : formule un seuil chiffré comme hypothèse de travail, pas comme donnée réelle. Décris une vérification en moins d'une journée à partir d'un scénario ou d'un jeu synthétique ; indique ce que cette simulation ne pourra pas prouver.
- **Critères de succès** : observations qui permettraient de juger la décision après une période d'utilisation réelle. Marque-les comme critères futurs, non mesurés.

### 2. ADR : `ADR-kintana-reservation.md`

Un **ADR** (Architecture Decision Record) est une courte fiche qui garde la trace d’une décision : le contexte, les options, le choix proposé et ses conséquences. Tu ne dois pas connaître de format ou d’outil particulier.

Maximum indicatif : 500 mots. Il doit contenir, dans cet ordre :

- **Statut et date** : `PROPOSITION  : SIMULATION` (cela signifie que tu proposes une décision sur un cas fictif, sans prétendre l’avoir mise en œuvre).
- **Contexte** : résumé du problème.
- **Options considérées** : au moins trois options réelles, chacune avec au moins un coût et un bénéfice.
- **Décision proposée** : une option choisie pour le scénario, explicitement provisoire.
- **Justification** : distinguer les faits du scénario, les hypothèses et les jugements.
- **Conséquences** : ce que tu acceptes de perdre et la condition observable qui te ferait réviser la proposition.

## Critères de réussite mesurables

1. La note contient une hypothèse chiffrée, marquée comme hypothèse, et un test de simulation faisable en moins d'une journée.
2. L'ADR compare au moins trois options, avec coûts et bénéfices non caricaturaux.
3. La condition de révision est observable ; « on verra plus tard » ne suffit pas.
4. Un lecteur qui ne connaît pas le scénario peut reconstituer le problème, les options et la raison de la proposition.
5. Les documents distinguent explicitement `FAIT DU SCÉNARIO`, `HYPOTHÈSE`, `JUGEMENT` et `NON MESURÉ`.
6. Aucun résultat de simulation n'est présenté comme une observation auprès de vrais utilisateurs ou comme une preuve d'implémentation.

## Ce qui ne valide pas le fil rouge personnel

Ce challenge valide uniquement l'exercice de raisonnement sur le cas partagé Kintana. Il ne sélectionne, ne qualifie et ne remplace pas ton projet personnel. Il ne constitue pas une décision appliquée ni une preuve d'un système réel. Après le Cadrage, tu pourras reprendre la méthode sur ton domaine qualifié et réévaluer cette décision avec les faits recueillis. N'antidate pas cette reprise et ne présente pas l'ADR de simulation comme une décision déjà prise pour ton propre projet.

## Durée cible

Jusqu'à 6 h, selon la lecture et la qualité de la comparaison. La durée est une estimation d'exercice, pas une obligation de produire deux documents artificiellement longs.

## CHECKPOINT DE PROFONDEUR : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Qui gagne, qui supporte le coût, quelle incitation perverse pourrait apparaître et quelle observation permettrait de renégocier la décision ? Ce checkpoint approfondit le raisonnement ; il n'ajoute pas une nouvelle gate logicielle.
