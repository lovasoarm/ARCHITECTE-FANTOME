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
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

Temps de lecture ~5 min

> Rappel espacé. Réponds **sans revoir les fichiers**. Note ton score.
> Refais ce fichier **une semaine plus tard**. C'est là que la mémoire tient.

Périmètre : API craft, security, IA-native dev, databases, scalability. Plus 2 questions de rappel sur 16-20.

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
