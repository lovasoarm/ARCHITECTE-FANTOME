---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_organisationnelle]
anti_recipe_key: changement_echelle+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# Tech pitch : convaincre un pair

Temps de lecture ~5 min

> Tu proposes une techno / un pattern / une refonte. Tu as **3 minutes** pour convaincre.

## Structure imposée

1. **Le problème** (30s) : ce qui **casse aujourd'hui**, chiffré si possible.
2. **La proposition** (60s) : quoi, pas comment.
3. **Les alternatives écartées** (60s) : 2 minimum, pourquoi non.
4. **Le coût** (20s) : temps, complexité, formation.
5. **La sortie de secours** (10s) : comment on **revient en arrière** si ça foire.

## Exercice

Pitche à un pair (ou à l'IA jouant le sceptique) l'adoption de TypeScript sur un projet legacy JS.
Enregistre-toi. Réécoute. Note **1 chose à retirer**.

## (attention) Piège

Vendre la solution **avant** d'avoir prouvé le problème. Ton public décroche à 45s.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** « Aujourd'hui, chaque nouvelle règle de validation oblige à modifier trois contrôleurs. Je propose d'extraire une politique commune derrière une interface, sans introduire de microservice. Le changement sera accepté si les tests existants gardent le même résultat et si l'ajout d'une quatrième règle ne demande qu'une modification localisée. Le risque est une abstraction prématurée ; nous la limiterons à ces trois règles et la réexaminerons après le prochain changement. » Ce pitch identifie problème, solution, preuve, risque et limite en langage compréhensible.

**À toi :** Une décision affecte trois équipes, chacune ayant des contraintes et des données différentes ; les désaccords doivent devenir des options testables. Construis un cas minimal qui illustre « Tech pitch : convaincre un pair » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Construire un pitch technique court

```text
public et durée
      |
      v
problème utilisateur
      |
      v
choix + compromis
      |
      v
preuve utile
      |
      v
décision ou action attendue
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Tech pitch : convaincre un pair** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Présenter un choix technique en trois minutes

**Mission liée à « Tech pitch : convaincre un pair » :** Prépare un pitch sur une décision Kintana en partant du problème utilisateur, puis du choix, des compromis et de la prochaine décision attendue. Adapte le vocabulaire à un public technique.

**Livrable :** Trame orale de trois minutes et support d’une page maximum.

**Critères d’acceptation :** Le problème précède la solution ; une recommandation est explicite ; au moins un compromis et une incertitude sont mentionnés.

**Transfert obligatoire :** Le public n’accorde que trente secondes : produis une version qui conserve le problème, la décision et le risque principal.
