---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# CONSIGNE : HYPOTHESES.md OBLIGATOIRE

Temps de lecture ~2 min

> Application generale de la Partie O du referentiel.
> Tout EXO du module `01-CADRAGE/03-DEBUGGING` (et tout EXO tagge `[HYP]` ailleurs) livre un `HYPOTHESES.md`.

## Format minimal (copie/colle)

```md
# HYPOTHESES.md

## Contexte

- symptome observe :
- environnement :
- ce que je peux reproduire deterministe :

## Hypothese 1

- enonce :
- test qui la falsifie :
- resultat du test :
- verdict : VRAIE / FAUSSE / INDECISE

## Hypothese 2

...

## Cause racine confirmee

- preuve reproductible :
- correctif applique :
- test de non-regression ajoute :
```

## Regle non negociable

Aucun fix commite sans `HYPOTHESES.md` a jour. Un fix sans hypothese ecrite = coup de chance, pas competence.

## Exemple rempli

Voir `12-HYPOTHESES_EXEMPLE.md` à côté : exemple guidé de fuite mémoire (scénario simulé).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CONSIGNE : HYPOTHESES.md OBLIGATOIRE** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « CONSIGNE : HYPOTHESES.md OBLIGATOIRE » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert obligatoire :** Change l'ordre des événements ou ajoute une latence variable. Vérifie si la même hypothèse tient toujours.
