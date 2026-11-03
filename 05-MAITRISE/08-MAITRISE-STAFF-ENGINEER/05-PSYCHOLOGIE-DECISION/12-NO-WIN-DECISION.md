---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [solution_concurrente, preuve_partielle]
anti_recipe_key: solution_concurrente+preuve_partielle
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# NO-WIN-DECISION : décider quand toute option perd quelque chose

Construis un scénario où chaque option porte une perte différente : produit, coût, fiabilité, délai ou impact humain.

## Obligatoire

| Option | Ce qu'elle protège | Ce qu'elle sacrifie | Qui porte le coût | Signal de réouverture |
| ------ | ------------------ | ------------------- | ----------------- | --------------------- |
| A      |                    |                     |                   |                       |
| B      |                    |                     |                   |                       |
| C      |                    |                     |                   |                       |

Puis choisis une option et écris pourquoi tu acceptes précisément le coût qu'elle déplace.

## Moral remainder

Termine par une phrase sur ce qui reste inconfortable même après une décision rationnelle.

Le test porte sur la capacité à rendre le sacrifice explicite, pas sur la découverte d'une option magique.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « NO-WIN-DECISION : décider quand toute option perd quelque chose » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Choisir en rendant la perte explicite

```text
options possibles
      |
      v
perte associée à chaque option
      |
      v
réversibilité et risques
      |
      v
perte acceptée + atténuation
      |
      v
condition de réexamen
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **NO-WIN-DECISION : décider quand toute option perd quelque chose** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Décider quand chaque option a un coût

**Mission liée à « NO-WIN-DECISION : décider quand toute option perd quelque chose » :** Pour une évolution Kintana sans option parfaite, compare trois choix en termes de perte acceptée, réversibilité, risque et personnes affectées. Choisis et prépare les mitigations.

**Livrable :** Matrice d’arbitrage, décision, plan de mitigation et seuil de réexamen.

**Critères d’acceptation :** Les pertes ne sont pas masquées ; le choix est explicite ; les personnes affectées et les recours sont identifiés.

**Transfert obligatoire :** Un coût devient inacceptable : précise le déclencheur d’arrêt ou de retour arrière.
