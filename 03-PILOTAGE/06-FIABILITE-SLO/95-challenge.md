---
stability: intemporel
acte: pilotage
noyau: oui
type: challenge
cognitive_level: L4
perturbation_modes: [transmission, changement_contexte]
anti_recipe_key: transmission+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# CHALLENGE : LE `SLO.md` QUI TIENT DEBOUT

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Temps de lecture ~2 min

Durée : 1 h 30. Solo.

## Livrable unique : `SLO.md` dans ton fil rouge

Sections imposées :

1. Les trois SLI, avec leur point de mesure exact (URL, couche, outil).
2. Les trois SLO, en pourcentage **et** en unités métier (requêtes ratées / semaine).
3. La politique de budget d'erreur, avec les quatre paliers de décision.
4. RPO/RTO visés **et** mesurés, avec la date de la restauration réelle.
5. Les alertes qui réveillent (maximum trois), chacune avec son runbook d'une page.
6. Les alertes supprimées, avec la raison.

## Contrainte de cohérence croisée

Le SLO doit être tenable avec le budget de `06A-BUDGET-CLOUD.md`. Si le SLO exige une redondance que le
budget ne finance pas, écris la contradiction et l'arbitrage : c'est une des trois tensions du dossier
Staff ([03-trois_tensions.md](../../05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/03-trois_tensions.md)).

## Barème (12 points, 9 pour passer)

Mesures réelles et datées (4) · budget exprimé en unités métier (2) · politique appliquée à un cas
concret du mois écoulé (3) · alertes réduites et justifiées (3).

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
