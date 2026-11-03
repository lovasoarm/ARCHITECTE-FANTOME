---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_inversee, defaut_cache]
anti_recipe_key: decision_inversee+defaut_cache
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# 3 publics, 1 concept

Temps de lecture ~5 min

> **Principe universel** : la maîtrise = savoir monter/descendre en abstraction sans mentir.

## Exercice

Prends un concept que tu maîtrises (closure, event loop, index DB).
Explique-le **trois fois** :

### 1. À un enfant de 10 ans (60 secondes)

Analogies, aucun jargon.

### 2. À un dev junior (3 minutes)

Un exemple de code, un piège, un cas d'usage.

### 3. À un CTO (5 minutes)

Trade-offs, coûts, quand NE PAS l'utiliser, impact business.

## Grille d'auto-évaluation

- Enfant : as-tu résisté à la tentation du vocabulaire technique ?
- Junior : ton exemple est-il **exécutable** ?
- CTO : as-tu parlé **coût** au moins une fois ?

## (attention) Piège

Le CTO version "je fais compliqué pour paraître profond". Non. **Simple + coût + risque**.

Prochaine étape : le drill long `14-three_audiences_drill.md` (45 min) pour ancrer la compétence sous pression.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « 3 publics, 1 concept » à une équipe qui conteste la décision avec des preuves contraires. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Adapter l’explication à trois publics

```text
même fait et même invariant
           |
           +--> décideur : impact et risque
           |
           +--> ingénieur : mécanisme et compromis
           |
           +--> utilisateur : effet concret
           |
           v
vérifier la compréhension
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **3 publics, 1 concept** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Expliquer un même concept à trois publics

**Mission liée à « 3 publics, 1 concept » :** Explique une évolution de Kintana séparément à un décideur, un pair ingénieur et un utilisateur. Conserve les faits mais adapte le niveau de détail et la question à résoudre.

**Livrable :** Trois versions courtes et tableau des éléments invariants/adaptés.

**Critères d’acceptation :** Aucune version ne déforme le comportement ; le jargon est expliqué ou supprimé ; chaque public sait quelle action est attendue.

**Transfert obligatoire :** Un détail technique attire l’attention du décideur : explique-le par son impact plutôt que par son implémentation.
