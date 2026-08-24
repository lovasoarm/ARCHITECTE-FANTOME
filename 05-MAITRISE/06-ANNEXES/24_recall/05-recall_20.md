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
text
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
