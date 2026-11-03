---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Attack on Titan :** une langue est un contexte d'exécution, pas un simple drapeau décoratif. Le même message doit garder son sens quand la locale, le format ou le fuseau change.

# 00 : Prereq check : i18n

Temps de travail indicatif ~10 min

> Avant de commencer ce sous-parcours, réponds à ces questions **sans regarder**. Ce diagnostic n'est pas noté et ne ferme jamais l'accès ; il aide à repérer les bases JavaScript et données utiles pour suivre les exemples.

## Questions

1. Dans un objet JavaScript, comment lire une valeur à partir d'une clé ? Que peux-tu obtenir si la clé n'existe pas ?
2. Quelle différence fais-tu entre une chaîne (`"42"`) et un nombre (`42`) ? Pourquoi cette différence compte-t-elle lorsqu'on formate une valeur ?
3. À quoi sert un paramètre explicite dans une fonction, et pourquoi est-il préférable à une dépendance implicite à la machine qui exécute le code ?
4. Quelle différence y a-t-il entre une valeur représentant un instant, une date civile et une durée ? Si tu ne sais pas encore, indique-le : la distinction sera enseignée dans ce sous-parcours.

## Verdict

- **3+ réponses solides** → commence le sous-parcours et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → revois les bases sur les objets, les types et les fonctions JavaScript dans les leçons déjà terminées, puis refais le diagnostic. Cette révision est un conseil, pas une condition d'accès.

> Le but n'est pas de te bloquer. Les locales, la pluralisation, `Intl`, les règles de dates et les fuseaux horaires sont enseignés dans les leçons qui suivent ; tu n'as pas à les connaître avant de commencer.

## CHECKPOINT DE PROFONDEUR : variation H : changer de locale

Prends une valeur et décris ce qui doit rester invariant lorsque la locale change, puis ce qui doit être formaté différemment. Distingue le sens des données de leur représentation affichée.
