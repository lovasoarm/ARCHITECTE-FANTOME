---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre métier. Il faut comparer ce que chaque option apporte, ce qu'elle coûte et ce qu'elle empêche de faire.

# Pourquoi ce module mérite ton temps : produit, coût et ROI

Temps de lecture indicatif : 8 min.

T'as déjà vu un refactoring refusé sans argument, ou une fonctionnalité acceptée sans vérifier qui en avait besoin ? Une décision technique engage du temps, de l'argent, des risques et de la capacité d'une équipe. Un seul chiffre ne suffit généralement pas.

## 1. Le problème

Une décision ne se résume pas à « ça rapporte combien ? ». Il faut comprendre le résultat recherché, les ressources nécessaires, les conséquences possibles et ce qui sera retardé si l'équipe choisit cette option.

Les nombres aident à discuter ; ils ne remplacent pas le jugement. Une estimation honnête expose ses hypothèses et sa marge d'incertitude au lieu de se déguiser en certitude.

## 2. Quatre dimensions à comparer

<!-- AF-DIAGRAM:roi -->

```text
                     DÉCISION
                        |
       +----------------+----------------+
       |                |                |
       v                v                v
     VALEUR           COÛT             RISQUE
       |                |                |
       +----------------+----------------+
                        |
                        v
              COÛT D'OPPORTUNITÉ
       (ce que la même capacité ne fera pas)
                        |
                        v
                 ARBITRAGE EXPLICITE
```

- **Valeur :** résultat utile attendu : temps économisé, erreurs évitées, délai réduit, qualité ou accès amélioré. Précise pour qui et sur quelle période.
- **Coût total :** réalisation, migration, exploitation, maintenance, formation et sortie éventuelle. Garde les jours-personnes et les euros séparés, sauf si tu expliques le taux utilisé pour les convertir.
- **Risque :** événement incertain, probabilité, conséquence et possibilité de récupération. Le calcul « probabilité × impact » peut aider lorsque les deux termes sont estimables ; sinon utilise une échelle qualitative et explique-la.
- **Coût d'opportunité :** travail auquel l'équipe renonce ou qu'elle retarde en mobilisant sa capacité sur cette option.

Ajoute toujours une option de référence : **ne rien changer maintenant**. Elle n'est pas forcément bonne, mais elle permet de comparer les autres choix à une situation explicite.

## 3. Exemple travaillé : Kintana (hypothèses fictives)

Une équipe envisage d'automatiser une vérification manuelle qui ralentit la clôture des demandes. Pour simplifier cet exercice, elle utilise le même coût horaire chargé de 30 € pour le travail du chantier et le temps économisé : 8 jours-personnes × 8 heures × 30 € = 1 920 € de réalisation ; 12 heures économisées par mois × 30 € = 360 € de gain brut mensuel ; 60 € de coût d'exploitation supplémentaire donnent 300 € de gain net mensuel estimé.

Le point mort simplifié est donc 1 920 € / 300 € = **6,4 mois**. Ce résultat dépend de l'hypothèse d'un même taux horaire pour les deux activités. Dans une décision réelle, utilise des coûts adaptés à chaque rôle et inclus les frais de migration ou de maintenance pertinents.

Le coût d'opportunité doit aussi être nommé : pendant ces huit jours-personnes, l'équipe ne travaille pas sur une autre amélioration. Le risque de régression doit être évalué séparément. Tous les chiffres restent des hypothèses d'exercice, pas des mesures de Kintana.

<!-- AF-LESSON-PROFILE: cost -->

## 4. Repères de décision

- **Pourquoi :** les quatre dimensions rendent visibles les compromis et évitent de défendre un chantier uniquement parce qu'il est techniquement intéressant.
- **Quand l'utiliser / quand l'éviter :** utilise cette grille quand plusieurs options se disputent un budget ou une capacité limitée. Ne réduis pas une obligation légale, une exigence de sécurité ou un risque grave à un ROI positif/négatif : ces contraintes peuvent être non négociables et doivent être traitées comme telles.
- **Limites :** les gains futurs sont incertains ; les coûts indirects sont souvent oubliés ; les risques difficiles à chiffrer doivent rester visibles sous forme qualitative. Un point mort n'est utile que si les coûts et bénéfices comparés portent sur des périodes et des unités cohérentes.

## 5. Ancrage produit / terrain : Kintana

La carte Kintana associe ce module au calcul du **coût par demande terminée** et à la décision de financer ou non une amélioration. La base de comparaison doit inclure les demandes réellement terminées, les reprises éventuelles, les coûts fixes et les incidents évités ou créés.

Les chiffres de l'exemple ci-dessus sont fictifs. Ils n'établissent ni le coût réel de Kintana, ni le retour sur investissement d'une entreprise.

## 6. Mission utile : décider si une amélioration vaut son coût

Choisis une amélioration du parcours de demande Kintana. Compare trois options : ne rien changer, réaliser une amélioration minimale, réaliser une option plus complète. Pour chacune, décris la valeur attendue, les coûts, le risque, la réversibilité et le coût d'opportunité.

**Livrable :** une grille de décision datée qui contient les hypothèses, les sources, les fourchettes lorsque nécessaire et une recommandation conditionnelle.

**Critères d'acceptation :** les unités sont cohérentes ; les coûts passés irrécupérables ne sont pas présentés comme des coûts futurs ; les hypothèses non mesurées sont étiquetées ; l'option « ne rien changer » est comparée ; la recommandation indique ce qui la ferait changer.

**Vérification :** fais varier une hypothèse importante (volume d'usage, temps économisé ou coût d'exploitation) et vérifie si le choix reste identique. Note le seuil auquel une autre option devient préférable. Étiquette la preuve `SIMULATION` tant qu'elle ne repose pas sur des mesures réelles autorisées.

## 7. Transfert

Reprends la grille pour une décision où l'avantage principal est la réduction d'un risque de sécurité ou de conformité. Montre pourquoi un ROI financier seul ne suffit pas et quelles contraintes deviennent non négociables.
