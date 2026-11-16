---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, decision_organisationnelle]
anti_recipe_key: transmission+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 03 OBJECTION STORM : défense orale sous objection dynamique

Temps de lecture ~3 min

Durée maximale : 35 min pour les cinq objections (5 min par réponse, le reste pour le cadrage et les transitions), puis 15 min de débrief.

## POURQUOI CE DRILL EXISTE

`02-desaccord_cto.md` et `03-mock_interview_async.md` entraînent la défense écrite,
au calme, sans coupure. En situation réelle, une objection peut interrompre le fil ou contester fermement une hypothèse. Ce drill entraîne à répondre sur le fond sans transformer le désaccord en attaque personnelle.

## PÉRIMÈTRE : DRILL AVANCÉ SUR UN ADR SIGNIFICATIF

L'Objection Storm complet est un entraînement DEPTH, pas une obligation universelle. Il se réalise sur **un ADR significatif choisi** lorsque l'apprenant maîtrise déjà la rédaction d'ADR. Il ne bloque jamais un projet débutant ni la validation d'un ADR qui satisfait son propre contrat.

La défense minimale d'un ADR reste obligatoire dans le document ADR : problème, options, critères, compromis, conséquences, risques résiduels et signal de révision. Selon le niveau du projet, on ajoute une à trois objections substantielles. Le retour d'un pair est recommandé, mais facultatif ; la simulation solo reste clairement étiquetée `SIMULATION`.

Le Storm complet utilise cinq objections substantielles, chacune portant sur un risque, une hypothèse, un coût, une dépendance ou une conséquence réelle. Il n'impose pas un nombre minimal artificiel de mots : la réponse est jugée sur la justesse, la preuve, la reconnaissance des limites et la capacité à réviser la décision.

## PROTOCOLE : 5 OBJECTIONS SUBSTANTIELLES SUR UN ADR

Le temps est plafonné à cinq minutes par réponse. Le Storm porte sur **un seul ADR choisi**, pas sur plusieurs ADR regroupés. Les cinq objections couvrent cinq angles distincts :

| Objection  | Question à poser                                                                | Compétence travaillée |
| ---------- | ------------------------------------------------------------------------------- | --------------------- |
| Hypothèse  | Cette hypothèse est-elle vérifiée par une observation ou un test ?              | Vérification          |
| Simplicité | Une solution plus simple répondrait-elle au même besoin avec moins de risques ? | Arbitrage             |
| Panne      | Que se passe-t-il si une dépendance ou un composant tombe en panne ?            | Résilience            |
| Coût       | Quel coût opérationnel, humain ou de maintenance as-tu sous-estimé ?            | Pensée systémique     |
| Révision   | Quelle observation concrète te ferait changer de décision ?                     | Révision              |

Chaque réponse indique les faits, les inconnues, la preuve examinée, la conséquence et la décision (maintenue, révisée ou bloquée).

- Indique la durée réellement utilisée et le temps accordé à chaque objection ; un chronomètre est un outil d'entraînement, pas un substitut au jugement.
- Chaque réponse doit traiter l'objection, citer une preuve ou une incertitude vérifiable et préciser si la décision est maintenue, révisée ou bloquée.
- **Livrable :** un seul `OBJECTION-LOG.md` pour l'ADR choisi, avec cinq objections substantielles, les réponses et les décisions révisées. Ajoute des timestamps si l'exercice est chronométré.
- Le format est vérifié séparément de la qualité du raisonnement. La longueur n'est pas un critère de réussite.

### Modes de formulation optionnels (ils ne remplacent pas les cinq angles ci-dessus)

1. **Formulation neutre :** « Peux-tu montrer sur quelle preuve repose ce choix ? »
2. **Doute explicite :** « Cette hypothèse me paraît fragile ; comment l’as-tu vérifiée ? »
3. **Contradiction :** « Cette conséquence semble incompatible avec la contrainte annoncée ; comment l’expliques-tu ? »
4. **Objection technique ferme :** « Tu confonds X et Y ; dans ce scénario, la propriété P semble échouer. Quelle preuve permet de soutenir ton choix ? »
5. **Contrainte de temps :** « Résume la décision, son risque principal et le signal qui la ferait réviser en vingt secondes. »

Objectif : **ne pas escalader émotionnellement**. Rester factuel, traiter chaque objection sur son fond et savoir réviser une décision lorsque les preuves l’exigent. Le ton hostile n’est pas nécessaire pour réussir le drill.

## LIEN AVEC LES ADR

Le Storm complet porte sur un ADR choisi, pas sur tous les ADR du projet. Les projets débutants conservent leur propre contrat de défense écrite ; les objections supplémentaires sont calibrées selon le niveau et le risque de la décision.

## FORMAT `OBJECTION-LOG.md`

Un seul fichier pour l’ADR choisi. Pour chaque objection, conserve :

- l’objection formulée et le risque/hypothèse contesté ;
- les faits connus, inconnues et preuves examinées ;
- ta réponse et le test ou élément qui pourrait la réfuter ;
- la décision : maintenue, révisée ou bloquée, avec sa raison.

Exemple de structure :

```text
## Objection 1  : coût opérationnel
Objection : ...
Faits / inconnues : ...
Preuve examinée : ...
Réponse : ...
Décision et raison : ...
```

Les timestamps sont facultatifs. Il n’existe aucun minimum de mots par réponse.

## ÉVALUATION

Le contrôle de format vérifie la présence des cinq objections et de leurs réponses. La qualité est évaluée sur la pertinence, les preuves, la distinction faits/hypothèses, les conséquences et la capacité à réviser. Aucun script `learner-verifier.js` n’est supposé fourni ; n’affirme pas avoir exécuté un vérificateur absent.

## APRÈS

Debrief 15 min : quelle objection a révélé une faiblesse réelle, laquelle reposait sur une hypothèse fausse et quelle décision as-tu révisée ? Termine le `OBJECTION-LOG.md` par un `## Debrief`.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Vérification observable : critères de réussite

Prépare trois contre-épreuves liées à l’ADR choisi : (1) un fait qui confirmerait l’hypothèse centrale ; (2) un contre-exemple ou une panne qui fragiliserait la solution ; (3) une observation qui déclencherait une révision. Avant de répondre, écris ce que tu t’attends à constater ; après examen des sources ou des fixtures disponibles, note le résultat et tout écart. Si aucune donnée réelle n’est disponible, marque le point `NON VÉRIFIÉ` au lieu d’inventer une observation.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Répondre à une objection par la preuve

```text
proposition
     |
     v
objection la plus forte
     |
     v
preuve et hypothèses
     |
     v
compromis reconnu
     |
     v
réponse ou proposition révisée
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **03 OBJECTION STORM : défense orale sous objection dynamique** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Répondre à des objections sans défendre son ego

**Mission liée à « 03 OBJECTION STORM : défense orale sous objection dynamique » :** choisis un seul ADR significatif de Kintana. Réponds aux cinq angles du protocole (hypothèse, solution plus simple, panne, coût sous-estimé, signal de révision). Pour chaque angle, expose les faits et inconnues, cite une preuve interne ou indique `NON VÉRIFIÉ`, puis décide si l’ADR est maintenu, révisé ou bloqué. Si tu travailles seul, étiquette le document `SIMULATION` ; ne le présente pas comme une revue indépendante.

**Livrable :** un unique `OBJECTION-LOG.md` rattaché à l’ADR choisi, contenant les cinq objections, les réponses, les preuves ou inconnues, les décisions prises et un débrief. Les timestamps sont facultatifs et aucun nombre minimal de mots n’est imposé.

**Critères d’acceptation :** un seul ADR est ciblé ; les cinq angles sont distincts ; les affirmations sont séparées des hypothèses ; aucune preuve n’est inventée ; le log indique toute révision de décision.

**Transfert obligatoire :** une preuve nouvelle invalide l’une des réponses. Mets à jour la décision dans le même `OBJECTION-LOG.md` et conserve l’ancienne raison de décision dans l’historique du document.
