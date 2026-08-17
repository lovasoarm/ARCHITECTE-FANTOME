# CHALLENGE : LA GRILLE D'AUTO-ÉVALUATION, SANS COMPLAISANCE

Temps de lecture ~8 min

Une auto-évaluation utile ne note pas un ressenti : elle exige une preuve datée. Pour chaque famille, un seul critère tranche : **le fichier existe-t-il dans ton dépôt, avec des chiffres sourcés ?**

| Famille | Preuve exigée | Niveau 0 | Niveau 1 | Niveau 2 |
| --- | --- | --- | --- | --- |
| S1 | `BUDGET-CLOUD.md` | absent | un palier chiffré | trois paliers, egress, dates |
| S2 | `ADR-PRINCIPAL.md` | absent | un ADR sans conséquence chiffrée | trois ADR, chacun chiffré en coût ou disponibilité |
| S3 | `SLO.md` | absent | SLO écrit, RTO estimé | RTO mesuré et daté, budget en requêtes/semaine |
| S4 | `DECISION-ARBITRAGE.md` | absent | une option | deux options chiffrées et un point mort |
| S5 | revue + note | absent | l'un des deux | les deux, note sans jargon |
| S6 | `IA-EN-PROD.md` | absent, ou famille remplacée par écrit | coût connu | plafond, timeout, SLO séparé, 20 cas |

Règle de notation : au moindre doute, on descend d'un niveau. Une preuve qu'il faut expliquer
oralement pour qu'elle compte n'est pas une preuve.

## Le seuil de passage

Quatre familles au niveau 2, dont S1 et S3 obligatoirement, et aucune famille au niveau 0 parmi
les quatre retenues. Une famille peut être écartée par écrit (typiquement S6 sans brique IA),
comme l'autorise [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

## Exercice

**La notation à froid (20 min).** Remplis la grille pour ton projet aujourd'hui, avec le chemin
exact du fichier en face de chaque niveau annoncé. Les cases vides sont ton plan des 90 jours
([04_plan_90_jours.md](04_plan_90_jours.md)).

## ET APRÈS

[02_soutenance_solo.md](02_soutenance_solo.md).
