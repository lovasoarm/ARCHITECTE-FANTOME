---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L9
perturbation_modes: [fausse_piste, changement_echelle]
anti_recipe_key: fausse_piste+changement_echelle
transfer_distance: low
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Le rôle du facilitateur n'est pas de gagner le débat : il est de faire apparaître les informations manquantes et de rendre la décision compréhensible.

# Pourquoi ce module mérite ton temps : leadership et mentorat

Temps de lecture indicatif : 8 min.

À mesure qu'une décision touche plusieurs personnes ou systèmes, sa qualité dépend aussi de la façon dont le problème est cadré, dont les objections sont entendues et dont le suivi est organisé. Le leadership technique ne remplace pas le travail d'ingénierie : il permet à plusieurs personnes de le coordonner sans cacher les désaccords.

## 1. Le problème

Un bon choix technique peut échouer s'il n'est pas compris par les personnes qui doivent le mettre en œuvre, l'exploiter ou en assumer les conséquences. À l'inverse, une décision bien présentée n'est pas automatiquement bonne : les faits, les contraintes et les objections doivent rester examinables.

L'influence ne se mesure donc ni au volume de parole, ni au titre, ni au nombre de documents rédigés. Elle se vérifie dans la qualité de la décision, la clarté des responsabilités et, lorsqu'un collectif existe, les changements réellement adoptés.

## 2. Les mécanismes qui rendent le travail collectif possible

<!-- AF-DIAGRAM:leadership -->

1. **Cadrer le problème :** séparer le symptôme, le besoin, les contraintes et les non-objectifs.
2. **Faire émerger les points de vue :** demander les objections, écouter les personnes les moins audibles et distinguer faits, hypothèses et préférences.
3. **Rendre les options comparables :** exposer les coûts, risques, dépendances, réversibilité et conséquences opérationnelles.
4. **Décider et suivre :** nommer le décideur, les responsables, les critères d'acceptation, la date de revue et la condition de retour arrière.

```text
problème partagé
       |
       v
contraintes et voix concernées
       |
       v
options + objections + risques
       |
       v
décision, propriétaire et actions
       |
       v
adoption observée et réévaluation
```

Une RFC (proposition de changement discutée) ou un ADR (record du choix architectural) peut conserver le raisonnement. Le document soutient la collaboration ; il ne prouve pas, à lui seul, que les personnes ont accepté ou appliqué la décision.

## 3. Ce qu'une pratique individuelle peut : et ne peut pas : démontrer

Une revue argumentée d'un dépôt open source public peut montrer que tu sais lire un changement, repérer un risque et formuler un commentaire utile. Elle ne prouve pas exactement ce qu'une revue au sein d'une équipe démontrerait : tu n'observes pas forcément les contraintes internes, les échanges répétés, le suivi des corrections, le mentorat ou l'adoption d'une décision.

De même, un scénario joué seul permet de t'entraîner à écouter plusieurs intérêts et à préparer une décision. Il reste une `SIMULATION`. Pour affirmer qu'une règle a été adoptée, il faut une preuve provenant du collectif concerné : changement de pratique, responsabilités assumées, retour des personnes et durée d'observation.

Les agents IA peuvent recevoir une délégation de tâches avec des permissions, limites, critères de validation et règles d'escalade. C'est un sujet de gouvernance opérationnelle utile, mais diriger un agent n'est pas équivalent à mentorer une personne ni à exercer un leadership humain.

<!-- AF-LESSON-PROFILE: leadership -->

## 4. Repères de décision

- **Pourquoi :** le leadership technique réduit les malentendus et rend les décisions multi-acteurs suivables, contestables et révisables.
- **Quand l'utiliser / quand l'éviter :** utilise une RFC/ADR, une revue ou un atelier lorsque le changement affecte plusieurs rôles, services ou responsabilités. Pour une petite décision locale et réversible, une note courte ou une conversation peut suffire. Ne transforme pas chaque échange en procédure.
- **Limites :** le consensus n'est pas toujours possible ; une objection pertinente peut rester minoritaire ; une décision documentée peut ne jamais être appliquée. Les simulations et les revues publiques démontrent des capacités partielles, pas une influence organisationnelle complète.

## 5. Ancrage produit / terrain : Kintana

Une évolution de Kintana peut modifier un contrat d'API, une règle de données et une procédure d'exploitation. Les rôles produit, backend, client, sécurité et exploitation n'ont pas les mêmes contraintes. La décision doit préciser qui tranche, qui réalise la migration, qui surveille les effets et comment revenir en arrière.

Kintana reste un cas d'étude fictif. Un ADR écrit sur ce scénario est une preuve `SIMULATION` ou `LAB`, selon le travail réellement effectué ; il ne démontre pas une adoption par une équipe réelle.

## 6. Mission utile : préparer une décision qui traverse les rôles

Rédige une RFC/ADR pour une évolution Kintana touchant au moins deux domaines, par exemple le contrat d'un événement de demande et sa procédure de reprise. Compare au moins deux options et l'option de statu quo. Identifie les rôles concernés, les objections plausibles, le propriétaire de la décision, le plan de migration et la condition de retour arrière.

**Livrable :** une proposition de décision, une carte des parties concernées, un registre des objections et un plan de suivi avec un signal d'adoption mesurable.

**Critères d'acceptation :** les faits et hypothèses sont séparés ; au moins deux options sont comparées ; les objections sont traitées sans être effacées ; une personne ou un rôle est responsable de chaque action ; la condition de révision est explicite. Si tu travailles seul, les objections jouées sont étiquetées `SIMULATION` et l'adoption reste `NON DÉMONTRÉE`.

**Vérification :** demande une revue contradictoire à un pair si cela est possible. Sinon, écris la meilleure objection de chaque rôle, puis vérifie que ta décision y répond sans masquer le coût ou le risque. Cette auto-revue ne devient pas une revue indépendante.

## 7. Transfert

Reprends la décision dans une organisation où tu n'as pas d'autorité hiérarchique et où une équipe refuse la migration pour des raisons opérationnelles légitimes. Explique comment tu recueilles les contraintes, ce que tu peux décider, ce qui doit être négocié et quelle preuve montrerait une adoption réelle.
