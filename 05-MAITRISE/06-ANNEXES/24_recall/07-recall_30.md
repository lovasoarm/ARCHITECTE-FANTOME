---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_inversee]
anti_recipe_key: temps_limite+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# \_recall_30.md : modules `03-PILOTAGE/05-OBSERVABILITY` a `02-CONSTRUCTION/02-MINI-PROJECTS`

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Temps de lecture ~5 min

> Rappel espacé. Réponds **sans revoir les fichiers**. Note ton score.
> Refais ce fichier **une semaine plus tard**. C'est là que la mémoire tient.

Périmètre : observability, team craft, edge cases, IA agents & autonomy, mini-projects. Plus 2 questions de rappel sur 21-25.

## 10 questions

1. Logs / metrics / traces : donne l'usage propre de chacun et ce qu'on n'y met **jamais**.
2. Un SLO à 99,9 % : combien de minutes d'indispo autorisées par mois ? Que fais-tu quand le budget d'erreur est brûlé ?
3. Post-mortem blameless : cite 2 pièges qui le rendent bidon en pratique.
4. Three audiences (code review, doc, commit) : à qui tu écris et **quoi** dans chacun ?
5. Edge case classique en date : cite 3 pièges (fuseaux, DST, année bissextile...) qui t'ont ou vont te griller.
6. Agent IA autonome : quelle est la garde-fou minimale avant de lui donner accès à un outil qui écrit ?
7. Relis ton **ADR le plus ancien**. Que changerais-tu aujourd'hui, avec justification ?
8. Mini-projet livré : nomme 3 signaux que tu peux le montrer en entretien sans avoir honte.
9. **Rappel 21-25 :** idempotence - donne un exemple non trivial.
10. **Rappel 21-25 :** cite 3 items d'OWASP que tu vérifies systématiquement.

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.
