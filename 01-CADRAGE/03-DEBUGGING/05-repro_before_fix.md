---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# 04 : Reproduis avant de corriger

Temps de lecture ~5 min

> **Principe de diagnostic** : une reproduction contrôlée est la meilleure base d'un correctif. Si un incident de production ne peut pas être reproduit localement, ce n'est pas une raison pour l'ignorer : conserve les traces, entrées non sensibles, versions, horodatages et hypothèses, puis construis une reproduction réduite quand c'est possible.

## Règle non négociable

> **Avant de considérer un correctif comme démontré**, cherche un test qui échoue avec l'ancien comportement et passe avec le nouveau. Pour un incident non reproductible, documente explicitement la preuve indirecte et les limites : ne fabrique pas une reproduction artificielle en prétendant qu'elle est celle de la production.

## Protocole

1. Écris la reproduction **en français** : entrées, actions, résultat observé, résultat attendu.
2. Traduis-la en test automatisé (unit, integration, ou un simple script).
3. Le test doit **échouer** avant le fix.
4. Fix.
5. Le test doit **passer** après.
6. Commit dans cet ordre : `test:` puis `fix:`.

## Exercice

On te fournit [`11A-flaky.js`](./11A-flaky.js) (fonction autonome). Une branche rare ajoute `undefined` et fait renvoyer `NaN` à `computeTotal([1,2,3])`.

- Reproduis **déterministement** par injection d'une fonction aléatoire contrôlée (indice : appelle `computeTotal(items, () => 0)`). L'API standard `Math.random()` ne fournit pas de méthode standard pour fixer sa seed.
- Écris le test qui casse à coup sûr.
- Fix. Commit.

## (attention) Piège

"Je le vois en dev mais pas en test" = le test ne reproduit pas encore. Continue.

---

> Pour tout exercice de debugging : utilise le template [`16-HYPOTHESES_TEMPLATE.md`](16-HYPOTHESES_TEMPLATE.md). Pas de correction sans hypothèse écrite.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **04 : Reproduis avant de corriger** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « 04 : Reproduis avant de corriger » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
