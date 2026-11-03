---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : vestiaire après match :** deux personnes peuvent être techniquement en désaccord sans devenir ennemies. Le vrai skill est de séparer le problème, le modèle, la décision… et l'ego.

# How to ask : template

Temps de lecture ~5 min

> Une question bien posée = une réponse rapide + du respect gagné.

## Template

```text
CONTEXTE (2 lignes) : ce que je fais, pourquoi.
CE QUE J'ai ESSAYÉ (3 puces) : liste de tentatives + résultat.
ATTENDU vs OBSERVÉ : ce que je pensais voir vs ce que je vois.
REPRO MINIMALE : un snippet ou un lien.
QUESTION PRÉCISE : une seule interrogation, close ou ouverte.
```

## Anti-patterns (immédiatement disqualifiants)

- "Ça marche pas."
- "Vous avez 2 min ?" (non).
- Screenshot du terminal sans texte copiable.
- Question posée en **deux messages** ("hello ?" puis 10 min plus tard le vrai contenu).

## Exercice

Prends la dernière question technique que tu as posée. Réécris-la au template. Diff = ta marge.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Transfert : changer de contexte

Applique le mécanisme de « How to ask : template » à une équipe qui conteste la décision avec des preuves contraires. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Formuler une demande d’aide précise

```text
contexte
   |
   v
résultat attendu / obtenu
   |
   v
reproduction minimale
   |
   v
essais déjà faits
   |
   v
question et aide attendue
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **How to ask : template** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Formuler une demande d’aide diagnosable

**Mission liée à « How to ask : template » :** Écris une demande d’aide concernant un incident Kintana avec contexte minimal, résultat attendu/réel, reproduction, hypothèses déjà testées et aide précise attendue.

**Livrable :** Message prêt à envoyer, reproduction minimale et liste des éléments sensibles à retirer.

**Critères d’acceptation :** Le lecteur peut commencer le diagnostic sans deviner ; les secrets et données personnelles sont masqués ; les essais infructueux sont décrits.

**Transfert obligatoire :** Après une première réponse insuffisante, précise ce qui manque sans réécrire tout l’historique.
