---
stability: intemporel
acte: maitrise
noyau: oui
source_method: "Booster sa réflexion · QI/QE/QD · Aramis · 2026"
cognitive_level: L9
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# Booster sa réflexion : assimilation dans le parcours Staff

Ce fichier transforme les exercices de réflexion en **réflexes d'ingénieur**. Il ne remplace
pas le guide source ; il évite surtout qu'un apprenant le lise puis oublie tout dans un dossier
séparé.

## Boucle d'assimilation

```text
vie personnelle
    ↓
mini-projet
    ↓
décision technique
    ↓
incident / contradiction
    ↓
ADR ou postmortem
    ↓
révision du modèle mental
    ↓
réemploi sur une situation différente
```

## 1. Journal des 4 questions → après chaque boss

Après chaque boss, réponds en 10 minutes :

1. Qu'est-ce qui m'a surpris ?
2. Quelle décision ai-je prise, et pourquoi vraiment ?
3. Qu'aurais-je pu penser ou faire autrement ?
4. Quelle idée continue de tourner dans ma tête ?

Ne transforme pas ça en dissertation. Trois à cinq lignes par question suffisent.

## 2. Scan émotionnel → avant / pendant / après une décision tendue

Avant un ADR controversé, une revue difficile ou un incident :

```text
émotion précise → déclencheur → effet sur mon raisonnement → réponse choisie
```

Le but n'est pas de devenir « calme ». Le but est de repérer le moment où une émotion commence
à sélectionner les faits à ta place.

## 3. Feynman → preuve d'assimilation technique

Une fois par bloc, choisis un concept que tu crois maîtriser : event loop, SLO, CQRS,
backpressure, idempotence, cache, etc.

Explique-le à un ingénieur qui ne connaît pas encore le sujet, sans jargon. Puis réponds :

> « Dans quelles conditions mon explication devient-elle fausse ? »

Cette seconde question est obligatoire au niveau Staff : expliquer puis invalider son propre
modèle.

## 4. Bias log → avant l'ADR, pas après uniquement

Avant une décision importante : ouvre `05-BIAS-LOG.md` et écris au moins :

- la préférence que tu as déjà ;
- la preuve qui pourrait la tuer ;
- la personne la plus susceptible de voir ce que tu rates ;
- la mesure qui tranchera.

Une fois la décision prise, complète le résultat. L'état initial ne doit jamais être réécrit.

## 5. Perspective shifting → conflit technique

Sur un désaccord réel, produis trois versions :

```text
moi → ce que je crois défendre
l'autre → ce qu'il croit défendre
observateur → faits + hypothèses + valeurs en conflit
```

Puis distingue explicitement : désaccord sur le problème, le modèle, la décision ou la personne.

## 6. Journal de décisions → ADR + réalité

Le journal de décisions du guide devient ici le `ADR` augmenté :

```text
contexte connu à T0
→ croyance + confiance
→ décision
→ résultat attendu
→ nouvelle preuve
→ mise à jour de confiance
→ décision révisée
```

Cela protège contre le biais rétrospectif : ne juge jamais la décision T0 avec les informations
qui n'existaient qu'à T+1.

## 7. 10 / 10 / 10 → architecture

Pour une décision importante, ajoute une ligne :

- dans 10 minutes : qu'est-ce qui presse ?
- dans 10 mois : quelle dette ou contrainte apparaît ?
- dans 10 ans : quelle propriété fondamentale dois-je préserver ?

La réponse ne décide pas à ta place ; elle force trois horizons avant de choisir.

## 8. Assimilation répétée

Une compétence psycho n'est pas validée après un seul exercice.

Elle doit apparaître au minimum dans :

- une situation personnelle ou solo ;
- un mini-projet technique ;
- une décision d'architecture ;
- une perturbation / incident ;
- le capstone.

**Gate :** si le candidat sait remplir `05-BIAS-LOG.md` mais reproduit le même biais dans une
ADR, la compétence n'est pas assimilée.

## 9. Garde-fou scientifique

Le guide source distingue utilement les exercices de réflexion des concepts qui ont un statut
scientifique plus ou moins solide. Le parcours AF reprend les pratiques comportementales
(observation, retrieval, perspective shifting, journal de décision, pré-mortem) sans présenter
le label pédagogique « QD » comme une mesure psychométrique reconnue.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Transfert : changer de contexte

Applique le mécanisme de « Booster sa réflexion : assimilation dans le parcours Staff » à une décision qui touche plusieurs équipes pendant plusieurs trimestres. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Booster sa réflexion : assimilation dans le parcours Staff** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Intégrer une notion Staff par réflexion et transfert

**Mission liée à « Booster sa réflexion : assimilation dans le parcours Staff » :** Choisis une décision Kintana récente et relie-la à trois notions du parcours. Explique ce que chaque notion éclaire, ce qu’elle ne permet pas de conclure et quelle question reste ouverte.

**Livrable :** Carte conceptuelle, note de transfert et rappel planifié par le lecteur.

**Critères d’acceptation :** Les concepts sont appliqués à des faits distincts ; les analogies sont limitées ; les incertitudes restent visibles.

**Transfert obligatoire :** Transfère l’analyse à une organisation d’une autre taille et identifie les hypothèses qui ne tiennent plus.
