---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# Dire "je ne sais pas" : un pouvoir

Temps de lecture ~5 min

> **Principe universel** : la confiance technique se gagne en admettant les zones d'ombre, pas en les masquant.

## Formulations types

- "Je ne sais pas, mais voici comment je vais chercher : …"
- "J'ai une hypothèse, pas une certitude. Testons X."
- "Je connais ce concept à 30 %. Je peux le vérifier avant EOD."
- "Je n'ai jamais fait ça en prod. Voici les risques que je vois."

## Ce qu'il ne faut PAS dire

- "Je pense que oui" (si tu ne penses pas : tu **devines**).
- "Normalement…" (drapeau rouge).
- Silence + hochement de tête.

## Mise en situation

Ton PM te demande en réunion : "On peut migrer vers Postgres 17 ce trimestre ?"
Tu **ne sais pas** vraiment. Écris **3 réponses possibles** et classe-les de la pire à la meilleure.

## (attention) Ce que le "je sais" par défaut cache

Chaque "oui" non fondé devient une dette d'estimation. Coût : la confiance de l'équipe.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Pratique autonome : production attendue

À partir de « Dire "je ne sais pas" : un pouvoir », produis une variante indépendante du cas suivant : Une décision affecte trois équipes, chacune ayant des contraintes et des données différentes ; les désaccords doivent devenir des options testables. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Exprimer l’incertitude utilement

```text
faits établis
      |
      v
hypothèses
      |
      v
inconnues
      |
      v
vérification minimale
      |
      v
décision provisoire + échéance
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Dire "je ne sais pas" : un pouvoir** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Exprimer l’incertitude sans bloquer la décision

**Mission liée à « Dire "je ne sais pas" : un pouvoir » :** Face à une question Kintana dont tu ignores la réponse, sépare faits, hypothèses et inconnues. Propose la plus petite vérification qui réduirait le risque et fixe un délai de retour.

**Livrable :** Note d’incertitude, expérience de vérification et décision provisoire réversible.

**Critères d’acceptation :** Aucune supposition n’est présentée comme un fait ; le risque de l’attente est explicite ; le responsable et le retour sont définis.

**Transfert obligatoire :** La vérification ne tranche pas : indique ce que tu peux décider malgré l’incertitude et ce qui doit rester bloqué.
