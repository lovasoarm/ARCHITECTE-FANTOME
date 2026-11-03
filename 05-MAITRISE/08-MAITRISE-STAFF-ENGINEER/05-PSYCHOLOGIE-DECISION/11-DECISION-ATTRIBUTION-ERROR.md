---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [regression, decision_inversee]
anti_recipe_key: regression+decision_inversee
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible

Après un incident, interdis-toi d'utiliser les informations découvertes après la décision initiale pour condamner le raisonnement initial.

## Manche 1 : T-1

Écris uniquement :

- faits observables ;
- hypothèses ;
- inconnues ;
- options ;
- seuil de réouverture ;
- décision.

## Manche 2 : T+1

Seulement après avoir scellé la manche 1, ajoute les faits révélés par l'incident.

## Analyse

Sépare :

- mauvaise décision compte tenu des informations disponibles ;
- bonne décision rendue mauvaise par un événement imprévisible ;
- décision raisonnable mais mécanisme de détection insuffisant ;
- décision mal documentée malgré un raisonnement correct.

## Preuve

Conserve les deux versions et explique ce qui était réellement prévisible.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** À la date de décision, les tests, les métriques disponibles et le plan de rollback sont verts ; la release est déployée progressivement. Une heure plus tard, une panne fournisseur non annoncée affecte le service. La décision initiale peut avoir été raisonnable malgré le mauvais résultat. La revue vérifie les signaux alors disponibles et demande séparément si la détection et la réaction étaient adaptées. Elle n'utilise pas la panne connue après coup pour prétendre qu'elle était prévisible.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Évaluer avec l’information disponible à l’époque

```text
information disponible à t0
          |
          v
décision et raisonnement à t0
          |
          v
issue connue à t1
          |
          v
séparer qualité du processus et chance
          |
          v
leçon sans biais rétrospectif
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Évaluer une décision avec l’information disponible à l’époque

**Mission liée à « DECISION-ATTRIBUTION-ERROR : juger une décision avec l'information réellement disponible » :** Reconstitue une décision Kintana à deux dates : ce qui était connu au moment du choix, puis ce qui a été découvert après. Distingue qualité du processus et qualité du résultat.

**Livrable :** Chronologie des informations, évaluation ex ante et leçon ex post.

**Critères d’acceptation :** Le résultat connu après coup n’est pas utilisé pour juger artificiellement les connaissances initiales ; les hypothèses sont datées.

**Transfert obligatoire :** Le résultat est bon malgré un processus fragile : indique ce qu’il faut améliorer sans réécrire l’histoire.
