---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# \_recall_25.md : modules `02-CONSTRUCTION/19-API-CRAFT` a `05-MAITRISE/02-SCALABILITY`

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

Périmètre : API craft, security, lecture et évolution d’une codebase inconnue (Big App Snoop), databases et scalability. Plus 2 questions de rappel sur 16-20.

## 10 questions

1. Idempotence : donne un exemple **non trivial** (autre que "GET est idempotent").
2. REST vs RPC vs GraphQL : le vrai critère de choix en 1 phrase par cas.
3. Versioning d'API : URL vs header - trade-off, et lequel tu utilises pour du public ?
4. OWASP top 10 : cite-en 3 que tu vérifies dans **chaque** code review.
5. consigne injection : c'est quoi la nature de l'attaque, et quelle mitigation _ne marche pas_ ?
6. Index DB : pourquoi trop d'index tue la performance en écriture ?
7. Transactions : les 4 lettres ACID, et donne un exemple concret où **I** (isolation) sauve la mise.
8. Scalabilité : différence entre scaling _stateless_ et _stateful_. Le vrai piège du stateful ?
9. **Rappel 16-20 :** HTTP 401 vs 403 - laquelle tu ne confonds jamais et pourquoi.
10. **Rappel 16-20 :** `class` en JS - sucre sur quoi ?

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « \_recall_25.md : modules `02-CONSTRUCTION/19-API-CRAFT` a `05-MAITRISE/02-SCALABILITY` » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **\_recall_25.md : modules `02-CONSTRUCTION/19-API-CRAFT` a `05-MAITRISE/02-SCALABILITY`** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « \_recall_25.md : modules `02-CONSTRUCTION/19-API-CRAFT` a `05-MAITRISE/02-SCALABILITY` » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
