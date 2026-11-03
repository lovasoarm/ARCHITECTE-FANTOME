---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, decision_organisationnelle]
anti_recipe_key: solution_concurrente+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Interview Arena : 10 sujets + grilles

Temps de lecture ~5 min

> Chaque sujet = 20-45 min. Timer obligatoire. Grille de score à la fin.

## 1. Live coding async

**consigne** : "Implémente `pMap(items, mapper, { concurrency })` sans lib."
**Grille** :

- [ ] Signature correcte
- [ ] Gère les erreurs (fail-fast ou aggregate ?)
- [ ] Backpressure
- [ ] Test qui prouve la concurrence

## 2. Défense d'architecture

**consigne** : "Présente l'archi d'un de tes mini-projets. On va challenger."
**Grille** :

- [ ] Contraintes énoncées avant les choix
- [ ] Trade-offs explicites
- [ ] Cite au moins 1 chose qu'on referait autrement

## 3. "Pourquoi vous et pas une IA ?"

**Attendu** : réponse structurée. L'IA génère, tu **décides**. Cite 1 cas où l'IA t'a proposé un mauvais choix et où tu l'as vu.

## 4. Debug live

**consigne** : bug fourni, écran partagé. Tu penses à voix haute.
**Grille** : hypothèses avant actions, reproduction avant fix, explication en fin.

## 5. Design d'API

**consigne** : "Design l'API d'un raccourcisseur d'URL."
**Grille** : idempotence, versioning, erreurs, rate limit, sécurité.

## 6. Sécurité

**consigne** : "Cette route login est vulnérable. Trouve **trois** attaques."

## 7. SQL / DB

**consigne** : requête N+1 dans un ORM. Détecte, explique, corrige.

## 8. Lecture de code

**consigne** : 200 lignes d'un langage que tu ne connais pas. Explique.

## 9. Trade-off

**consigne** : "Consistance forte ou disponibilité ? Justifie sur un cas."

## 10. Post-mortem

**consigne** : "Raconte-moi un incident réel. Cause racine ? Prévention ?"

## Score global

- 8/10 → prêt.
- 5-7 → cible les 3 sujets faibles.
- <5 → refais un cycle de synthèses.

---

## Comment t'entraîner à l'oral

Écrire une bonne réponse ≠ savoir la **dire** sous stress.

### Protocole 3×3

1. **Enregistre-toi** (voix seule, 3 min) répondant à une question du pool.
2. **Réécoute** sans note. Note 3 défauts (hésitations, mots de remplissage,
   phrases sans verbe).
3. **Refais-la** 3 fois, en corrigeant un défaut à la fois.

### Reformulation à voix haute

Prends un concept du curriculum (ex: "closure", "event loop", "idempotence").
Explique-le à voix haute :

- en 15 secondes (elevator pitch),
- en 2 minutes (dev pair),
- en 5 minutes (dev senior qui challenge).

Voir `03-PILOTAGE/10-TEAM-CRAFT/13-three_audiences_intro.md` et `03-PILOTAGE/10-TEAM-CRAFT/14-three_audiences_drill.md`.

### Simulation avec un pair

Idéal : 1×/semaine, 30 min. Rôles :

- toi = candidat,
- pair = interviewer qui **coupe la parole** et **pose des sous-questions**.

Sans coupures, ce n'est pas un entretien, c'est un monologue.

### (attention) Ce que l'analogie "je sais donc je saurai dire" cache

Le cerveau qui code n'est pas le cerveau qui parle. Sans entraînement
oral, ta connaissance reste **inaccessible** en entretien. C'est le
principal filtre injuste du marché : assume-le, prépare-toi.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Question : « Racontez une panne que vous avez résolue. » Réponse structurée : « Après une mise à jour, les erreurs sont passées de 1 % à 8 % sur le périmètre touché. J'ai comparé la version précédente et la nouvelle, isolé une conversion de date incompatible, puis proposé un rollback avant de corriger. Le rollback a ramené le taux d'erreur au niveau antérieur. Je n'ai pas mesuré l'impact chez les clients qui n'avaient pas de télémétrie ; je ne le revendique donc pas. » La réponse sépare faits, action, résultat et limite.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Interview Arena : 10 sujets + grilles » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Défendre un raisonnement en entretien

```text
question
   |
   v
clarifier le besoin et les contraintes
   |
   v
expliquer options + choix
   |
   v
traiter une objection
   |
   v
réviser si la preuve change
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Interview Arena : 10 sujets + grilles** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : S’entraîner à expliquer une décision en entretien

**Mission liée à « Interview Arena : 10 sujets + grilles » :** Choisis un sujet de l’Interview Arena et réponds comme si tu défendais une décision réelle de Kintana : clarifie le besoin, pose les hypothèses, compare les options et verbalise les limites.

**Livrable :** Réponse structurée, schéma simple et grille d’auto-évaluation.

**Critères d’acceptation :** La réponse commence par clarifier le contexte ; les compromis sont concrets ; les limites sont reconnues ; une simulation n’est pas présentée comme un entretien réel.

**Transfert obligatoire :** L’intervieweur change une contrainte : adapte la réponse sans réciter la précédente.
