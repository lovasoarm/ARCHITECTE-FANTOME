---
stability: intemporel
acte: pilotage
noyau: oui
type: challenge
---

# CHALLENGE : LE `SLO.md` QUI TIENT DEBOUT

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

Le SLO doit être tenable avec le budget de `BUDGET-CLOUD.md`. Si le SLO exige une redondance que le
budget ne finance pas, écris la contradiction et l'arbitrage : c'est une des trois tensions du dossier
Staff ([../../05-MAITRISE/08_maitrise_staff_engineer/03_trois_tensions.md](../../05-MAITRISE/08_maitrise_staff_engineer/03_trois_tensions.md)).

## Barème (12 points, 9 pour passer)

Mesures réelles et datées (4) · budget exprimé en unités métier (2) · politique appliquée à un cas
concret du mois écoulé (3) · alertes réduites et justifiées (3).
