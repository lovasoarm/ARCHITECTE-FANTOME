---
stability: stable
type: gate
---

# 50 : INCIDENT COMMANDER GATE

Un incident est une décision sous information incomplète et pression. Cette gate fondamentale se ferme avec l'épreuve **Kintana : Release, incident et récupération (T0)**, fournie sans dépendance à Docker, Cloud ou à un service externe.

## Pack autonome

Ouvre le [pack T0 Kintana](75-LAB-PLATFORM-OPERATIONS/T0-KINTANA/INCIDENT-INJECTS.md) et utilise :

- `SERVICE.md` : architecture, responsabilités, invariants et SLO du scénario ;
- `RELEASE-MANIFEST.md` : release candidate, configuration et risques ;
- `METRICS.csv` et `LOGS.ndjson` : signaux synthétiques, chronologie et symptômes ;
- `BACKUP-MANIFEST.csv` et `RESTORE-FIXTURE.csv` : preuve de restauration à vérifier ;
- `INCIDENT-INJECTS.md` : révélations progressives et variation ;
- `RUBRIC.md` : barème, échecs éliminatoires et seuil.

Toutes les données sont **SIMULATION**. Elles entraînent la décision mais ne prouvent pas une exploitation réelle.

## Travail obligatoire

1. décider go/no-go avant release et définir les critères d'arrêt ;
2. définir/relire SLI, SLO, fenêtres, seuils et limites de mesure ;
3. diagnostiquer les signaux sans confondre symptômes et causes ;
4. choisir confinement, rollback applicatif ou roll-forward ;
5. préserver et restaurer les données en vérifiant hash et invariants ;
6. produire le postmortem et des actions préventives ;
7. rejouer la variation 2 et adapter la décision.

## Chronologie de référence

```text
T+00 signal reçu
T+05 triage et impact
T+10 hypothèses falsifiables
T+15 première décision
T+30 nouvelle observation
T+45 révision
T+60 confinement confirmé
T+90 service récupéré et données vérifiées
T+120 postmortem initial
```

Utilise les timestamps du scénario. Ne réécris pas l'historique ; distingue heure de l'événement, heure de détection et heure de décision.

## Mesures

- `MTTA` : délai entre le premier signal disponible et le premier traitement.
- `MTTR` : délai jusqu'au retour à un service utilisable, avec intégrité vérifiée.
- `blast radius` : étendue de l'impact utilisateur/données.
- `decision latency` : délai entre une nouvelle information et la décision qui en tient compte.

## Gate et seuil

La grille de `RUBRIC.md` s'applique : **16/20 minimum**, sans échec éliminatoire. Une simulation sur fichiers statiques suffit pour cette gate fondamentale. Les exercices du [Lab 75 : Platform Operations](75-LAB-PLATFORM-OPERATIONS/README.md), les builds conteneurisés et le Cloud restent des approfondissements lorsque l'environnement le permet ; ils ne conditionnent pas la validation T0.
