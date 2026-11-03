---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# Interview live : 3 scripts chronométrés

Temps de lecture ~5 min

Trois exercices oraux. Enregistre-toi. Réécoute. C'est violent, c'est le but.

---

## Script 1 : Debug async à voix haute (25 min)

**Setup** : on te partage un fichier `race.js`. Un `Promise.all` retourne des résultats mélangés. Tu as 25 min pour :

1. Poser 3 questions de clarification (5 min).
2. Formuler une hypothèse par écrit (5 min).
3. Debug à voix haute (10 min).
4. Livrer la correction + un test qui prévient la régression (5 min).

**Critères** : parle pendant que tu cherches. Silence > 30s = point perdu. Cite ton hypothèse **avant** de vérifier.

---

## Script 2 : Défendre une archi (10 min)

**Setup** : "Défends ton choix d'archi pour le Rasengan Engine devant un CTO." Tu as 10 min :

1. Pitch (2 min) : le problème, ta décision, le trade-off principal.
2. Q/R (8 min). Le CTO joue le sceptique.

**Critères** : cite ton ADR. Reconnais au moins une limite. Propose une porte de sortie ("si le trafic double, je migre vers X").

---

## Script 3 : Revue de PR IA (15 min)

**Setup** : une PR de 200 lignes générée par assistant de code. Trouve **3 failles** minimum (sécurité, logique, style, ou perf) en 15 min.

**Critères** : chaque commentaire de revue est actionnable. Zéro "je pense que". Uniquement : "cette ligne fait X, or on veut Y, propose Z".

---

## Comment s'entraîner

- Enregistre au téléphone. Silence audio absolu.
- Réécoute le lendemain. Note les "euh", les silences, les hypothèses non vérifiées.
- Refais le même script 3 fois. Le progrès est brutal.

## Piège

Ne prépare pas de script mot pour mot. En vrai, on te coupe. Prépare des **beats** (idées clés) et un ordre.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Interview live : 3 scripts chronométrés » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Interview live : 3 scripts chronométrés** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Interview live : 3 scripts chronométrés » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
