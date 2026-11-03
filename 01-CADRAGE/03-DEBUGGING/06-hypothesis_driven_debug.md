---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# 05 : Debug hypothèse-dirigé

Temps de lecture ~5 min

> **Principe universel** : méthode scientifique appliquée au code. Hypothèse → expérience → réfutation. Sherlock, pas devin.

## Le protocole

1. **Observation** : symptôme précis, pas "ça marche pas".
2. **Hypothèse** : phrase **réfutable**. "Le bug vient de X parce que Y."
3. **Expérience** : la plus petite modification qui **prouve ou réfute** l'hypothèse.
4. **Verdict** : si réfutée, nouvelle hypothèse. Jamais "je change et je vois".
5. **Explication** : tu dois pouvoir expliquer le bug **à voix haute** avant le fix.

## 5 bugs à traiter

Pour chacun, produis un fichier `HYPOTHESES.md` avec au minimum 3 hypothèses ordonnées par coût.

1. `list.map(async fn)` renvoie `[Promise, Promise, ...]` non résolues.
2. `setTimeout(fn, 100)` s'exécute après 3s en prod.
3. `fetch` renvoie `undefined` sous Safari uniquement.
4. Un test passe seul, échoue en suite.
5. Un compteur affiche `NaN` après 1h d'usage.

## (attention) Piège

Coder le fix pendant qu'on formule l'hypothèse. **Interdit.** Sépare pensée et action.

> **Ce protocole revient plus tard, à l'échelle système.** Une fois rendu à
> `05-MAITRISE/02-SCALABILITY`, tu appliqueras exactement ce même protocole à des pannes
> distribuées (cascading failure, incohérence entre services) dans
> [`09-b_hypotheses_panne_distribuee.md`](../../05-MAITRISE/02-SCALABILITY/09-b_hypotheses_panne_distribuee.md).
> Rien à faire ici, juste à savoir que ce protocole n'est pas qu'un exercice local.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **05 : Debug hypothèse-dirigé** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « 05 : Debug hypothèse-dirigé » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
