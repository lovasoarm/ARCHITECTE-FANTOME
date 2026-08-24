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

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
