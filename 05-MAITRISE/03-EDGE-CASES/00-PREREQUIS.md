---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : Edge Cases

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté et ne ferme pas l’accès : il repère seulement les bases réutilisées. Les races conditions, les pièges de dates, les formulaires et les erreurs off-by-one sont enseignés dans ce module ; tu n’as pas à déjà les maîtriser.

## Questions

1. Quand un test échoue, comment distingues-tu le résultat attendu du résultat observé ?
2. Quelle première information recueilles-tu pour reproduire un bug de façon fiable ?
3. À quoi sert `try/catch`, et que doit-on éviter de faire lorsqu’une erreur est récupérée ?
4. Pourquoi faut-il préciser les unités et les hypothèses d’un calcul numérique ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → revois au besoin les bases de tests (`02-CONSTRUCTION/03-TESTING/`), de debugging (`01-CADRAGE/03-DEBUGGING/`), de gestion d’erreurs (`01-CADRAGE/04-ERROR-HANDLING/`) ou de mathématiques (`02-CONSTRUCTION/04-MATH-BASICS/`). Tu peux poursuivre ensuite : ce diagnostic oriente la révision, il ne bloque pas l’accès.

> Le but n’est pas de te bloquer : les notions avancées d’edge cases sont précisément ce que ce module doit t’apprendre.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
