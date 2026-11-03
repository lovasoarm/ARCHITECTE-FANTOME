---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# 06 : Blind Debug

Temps de lecture ~5 min

> **Principe universel** : un bon debugger raisonne à partir des **symptômes**, pas du code. C'est ce que tu fais quand tu aides un collègue dont tu n'as pas le repo sous les yeux.

## Règle du jeu

- Un binôme (ou l'IA) tient le code.
- **Toi**, tu ne le vois pas.
- Tu poses **des questions** pour localiser le bug.
- Objectif : **nommer la ligne fautive** et le fix, sans ouvrir le fichier.

## 3 scénarios fournis (reproductibles, code fourni)

Le code de chaque scénario est dans [`17_scenarios/`](./17_scenarios/) : celui qui **tient le code** ouvre le fichier, celui qui **debug** ne le voit jamais.

1. Un `debounce` qui ne debounce pas -> [`17_scenarios/00_scenario_1_debounce.js`](./17_scenarios/00_scenario_1_debounce.js)
2. Une requête `POST` qui part deux fois -> [`17_scenarios/01_scenario_2_double_post.js`](./17_scenarios/01_scenario_2_double_post.js)
3. Un state React qui oublie une update -> [`17_scenarios/02_scenario_3_react_stale_state.jsx`](./17_scenarios/02_scenario_3_react_stale_state.jsx)

Les scénarios sont **reproductibles** : deux binômes différents jouent exactement le même bug, la comparaison de scores est valide.

## Rubrique de score

- Nombre de questions posées avant identification (moins = mieux).
- Les 3 meilleures questions à réutiliser plus tard.

## (attention) Piège

"Envoie-moi le code" = tu perds. La contrainte fait le muscle.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

<!-- AF-DIAGRAM:debug -->

## Repère visuel utile : Reproduction et correction d'un incident Kintana

```text
signal utilisateur
      |
      v
hypothèses falsifiables
      |
      v
reproduction stable ? -- non --> instrumenter
      | oui
      v
isoler la cause
      |
      v
patch minimal + test de régression
```

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **06 : Blind Debug** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « 06 : Blind Debug » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
