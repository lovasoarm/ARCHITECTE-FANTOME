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

### Transfert : changer de contexte

Applique le mécanisme de « \_recall_30.md : modules `03-PILOTAGE/05-OBSERVABILITY` a `02-CONSTRUCTION/02-MINI-PROJECTS` » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **\_recall_30.md : modules `03-PILOTAGE/05-OBSERVABILITY` a `02-CONSTRUCTION/02-MINI-PROJECTS`** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « \_recall_30.md : modules `03-PILOTAGE/05-OBSERVABILITY` a `02-CONSTRUCTION/02-MINI-PROJECTS` » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
