---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [decision_inversee, defaut_cache]
anti_recipe_key: decision_inversee+defaut_cache
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# Les trois tensions : la seule preuve de croisement

<!-- AF-DIAGRAM:roi -->

```text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

Temps de lecture ~2 min

Durée : 1 h 30.

Six familles prouvées séparément ne prouvent rien. Ce qui distingue le niveau visé, c'est de tenir
deux exigences qui se contredisent, et d'arbitrer par un nombre.

## Ce qu'est une tension recevable

Une contradiction **réelle et chiffrée des deux côtés**, entre deux familles différentes.

```txt
Tension 1 (S1 x S3) : la haute disponibilité de la base coûte +58 €/mois (S1).
Sans elle, le RTO mesuré passe de 6 min à 41 min, hors SLO promis (S3).
Arbitrage : sauvegarde restaurable en 12 min + SLO abaissé à 99,3 %, réexamen à 2 000 utilisateurs.
Ce que je perds : deux heures de service par an dans le pire cas. Assumé, écrit, daté.
```

## Les trois tensions imposées (une par ligne)

| Tension | Familles | Question forcée                                                                   |
| ------- | -------- | --------------------------------------------------------------------------------- |
| 1       | S1 x S3  | ta promesse de service est-elle finançable ?                                      |
| 2       | S4 x S2  | l'architecture choisie est-elle rentable, ou seulement élégante ?                 |
| 3       | S5 x S6  | ce que l'agent décide seul est-il compatible avec ce que tu promets aux humains ? |

## La structure d'une tension écrite (5 lignes, jamais plus)

1. Le fait A, chiffré, avec sa source.
2. Le fait B, chiffré, avec sa source, qui contredit A.
3. L'arbitrage retenu, en une phrase.
4. Ce que tu perds, nommé.
5. Le seuil et la date de réexamen.

## Auto-recalage

Si une de tes tensions se résout sans rien perdre, ce n'était pas une tension : c'était un malentendu.
Recommence avec un vrai conflit : il y en a toujours trois dans un système réel.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Les trois tensions : la seule preuve de croisement », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Les trois tensions : la seule preuve de croisement** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Analyser une initiative sous trois tensions

**Mission liée à « Les trois tensions : la seule preuve de croisement » :** Évalue une évolution Kintana sous trois angles : qualité technique, valeur produit et coût organisationnel. Explique les tensions, le compromis choisi et les garde-fous.

**Livrable :** Matrice des trois tensions et décision argumentée.

**Critères d’acceptation :** Aucun axe n’est optimisé isolément ; le compromis est explicite ; les conséquences reportées ont un propriétaire.

**Transfert obligatoire :** Le contexte change et l’équilibre se déplace : précise quel indicateur déclenche une nouvelle décision.
