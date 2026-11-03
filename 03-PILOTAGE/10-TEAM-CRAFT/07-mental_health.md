---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# 06 : Santé mentale du dev : même les Hokages prennent des jours off

Temps de lecture ~5 min

Ce fichier parle d'hygiène de travail et de durabilité d'équipe, pas de diagnostic médical. Trois signaux à surveiller, trois leviers d'organisation à tester.

## Signal 1 : Le syndrome de l'imposteur

Symptôme : "je vais me faire griller". Ce ressenti peut apparaître même chez des personnes compétentes. Ce n'est pas une preuve d'incompétence : c'est un signal à observer plutôt qu'une identité à défendre.

**Protocole** : tiens un `WINS.md`. Chaque semaine, note 3 trucs que tu as livrés. Relis quand ça tape. C'est bête. Ça marche.

## Signal 2 : La fatigue de décision

À mesure que les décisions techniques s'enchaînent, la fatigue cognitive peut dégrader l'attention et la qualité des arbitrages.

**Protocole** : décisions lourdes le matin. Standardise les petites (linter, formatter, template). Automatise ce qui ne mérite pas ta cervelle.

## Signal 3 : Le burnout

Ce n'est pas "je suis crevé ce soir". C'est "je suis crevé depuis 3 mois, dormir ne répare plus". Cynisme + désengagement + perte d'efficacité.

**Protocole** : parle. À un collègue, à un thérapeute, à ton médecin. Pas à ChatGPT. Pas à un post LinkedIn. À un humain qui connaît ton contexte.

## Règles de base

- Deux jours off réels par semaine. Pas de "petit commit du dimanche".
- Une vraie pause déjeuner. Loin de l'écran.
- Un sport, un truc physique, choisi. Pas discutable.
- Sommeil > tout. Un dev qui dort mal est un dev qui pousse des bugs.

## Ce que l'analogie cache

Naruto s'entraîne comme un dingue mais il **récupère**. Le manga saute la récup, la vraie vie non. Sans récup, pas de progression, juste de la casse.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Agir sur la charge sans diagnostiquer les personnes

```text
signaux collectifs de surcharge
          |
          v
causes dans le système de travail
          |
          v
limites / rotation / soutien
          |
          v
expérience volontaire et réversible
          |
          v
revue de la charge sans donnée privée
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **06 : Santé mentale du dev : même les Hokages prennent des jours off** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger une capacité de travail soutenable

**Mission liée à « 06 : Santé mentale du dev : même les Hokages prennent des jours off » :** Dans un scénario fictif Kintana, une équipe accumule interruptions, astreintes et tâches en cours. Identifie les conditions de travail modifiables sans diagnostiquer les personnes ni demander de divulgation privée.

**Livrable :** Carte des facteurs de charge, proposition de limites WIP/rotation et mécanisme de demande d’aide.

**Critères d’acceptation :** La réponse porte sur le système de travail ; confidentialité et volontariat sont respectés ; l’urgence est distinguée de la disponibilité permanente.

**Transfert obligatoire :** La charge ne baisse pas après l’expérience : indique quelles données collectives et quels soutiens demander, sans attribuer de faute individuelle.
