---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# \_recall_20.md : modules `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` a `04-EPREUVE/03-REALTIME`

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

Périmètre : architecture patterns, web concepts, OOP JS (prototype), web inclusive (a11y/i18n), realtime. Plus 2 questions de rappel sur 11-15.

## 10 questions

1. Monolithe vs micro-services : cite 2 vrais critères de bascule, hors "c'est à la mode".
2. Layered vs hexagonal architecture : où branches-tu la DB dans chacune ?
3. HTTP : différence pratique entre 401, 403 et 404. Laquelle tu ne dois **jamais** confondre ?
4. Prototype chain : `Object.create(null)` - pourquoi et quand.
5. `class` en JS : sucre syntaxique sur quoi exactement ? Prouve-le en 3 lignes mentales.
6. A11y : cite 3 attributs ARIA que tu utilises vraiment et à quoi ils servent.
7. i18n : piège classique des dates/nombres - donne un exemple qui casse en prod.
8. WebSocket vs SSE vs long-polling : quand choisir SSE plutôt que WS ?
9. **Rappel 11-15 :** SOLID - le **O**, quel signal déclencheur ?
10. **Rappel 11-15 :** `unknown` vs `any` - pourquoi `unknown` est plus sûr ?

## Scoring

- 8+/10 → tu peux avancer.
- 5-7 → relis les modules faibles avant de continuer.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « \_recall_20.md : modules `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` a `04-EPREUVE/03-REALTIME` » à une codebase inconnue et un incident dont les symptômes sont incomplets. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **\_recall_20.md : modules `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` a `04-EPREUVE/03-REALTIME`** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « \_recall_20.md : modules `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS` a `04-EPREUVE/03-REALTIME` » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
