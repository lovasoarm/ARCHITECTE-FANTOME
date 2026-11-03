---
stability: stable
type: evaluation-protocol
---

# 57 : Registre de preuves et validation reproductible

## Pourquoi ce registre existe

Une fiche de projet, une grille ou une case cochée est une intention ou une déclaration. Elle ne prouve pas qu'un artefact fonctionne ni que son auteur sait expliquer ses décisions. Utilise ce registre pour séparer les états de travail et conserver les éléments vérifiables.

## États qui ne doivent jamais être fusionnés

| État             | Sens                                                                | Preuve minimale                                                                    | Ce que l'état ne permet pas de déclarer                  |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `BRIEF_READ`     | Spécification comprise et questions ouvertes consignées             | résumé de l'objectif, contraintes et hypothèses                                    | projet commencé ou compétence acquise                    |
| `IMPLEMENTED`    | Un artefact a été créé/modifié                                      | chemin, commit/version, auteur et date                                             | tests réussis                                            |
| `TESTED`         | Une commande exacte s'est terminée avec résultat consigné           | commande, environnement, code de sortie, sortie, données/fixtures                  | sécurité ou qualité globale                              |
| `PERTURBED`      | Une hypothèse a été mise en défaut de manière contrôlée             | scénario, prévision, résultat observé et mesures                                   | résilience générale                                      |
| `TRANSFERRED`    | Le principe a été appliqué à un contexte sensiblement différent     | différence d'au moins deux dimensions et analyse des invariants                    | transfert vers tous les contextes                        |
| `REVIEWED`       | Une autre personne a examiné la preuve et challengé le raisonnement | reviewer, compétences pertinentes, date, questions, verdict et conflits d'intérêts | titre professionnel ou impact organisationnel non mesuré |
| `FIELD_EVIDENCE` | Des conditions externes/terrain sont documentées                    | niveau T0–T4, population/scope, durée, limites et artefacts vérifiables            | expérience au-delà du niveau réellement documenté        |

Un état ne peut passer au suivant que si les critères correspondants sont remplis. La progression n'est pas un compteur de fichiers.

## Fiche à copier pour chaque preuve critique

```yaml
proof_id: "S1-EXEMPLE-001"
claim: "Formulation précise de la capacité revendiquée"
state: "TESTED"
artifact:
  repository_path: "chemin/relatif"
  commit_or_version: "à renseigner"
  author: "à renseigner"
  created_at: "YYYY-MM-DD"
environment:
  os: "à renseigner"
  runtime_and_version: "à renseigner"
  dependencies: "lockfile ou versions réelles"
execution:
  command: "commande exacte"
  exit_code: 0
  result_artifact: "chemin vers log/rapport"
  dataset_or_fixture: "identifiant et version"
perturbation:
  scenario: "à renseigner ou null"
  predicted_failure: "à renseigner ou null"
  observed_result: "à renseigner ou null"
transfer:
  changed_dimensions: []
  invariant_preserved: "à renseigner ou null"
  assumptions_changed: "à renseigner ou null"
review:
  reviewer: null
  date: null
  conflicts_of_interest: null
  verdict: "not-reviewed"
limits:
  untested_claims: []
  known_failures: []
  external_validity: "non démontrée tant que non vérifiée"
```

Ce YAML est un modèle, pas une preuve. Remplacer toutes les valeurs « à renseigner » ; ne jamais recopier un résultat fictif. Si une information n'est pas connue, utiliser `unknown` et expliquer le plan de vérification.

## Règles d'acceptation des évaluations

- Conserver l'entrée, la commande et la sortie brutes, sans substituer un résumé mémorisé.
- Distinguer `PASS`, `FAIL`, `BLOCKED` et `NOT RUN`.
- Tout test rouge intentionnel doit être déclaré `RED_BY_DESIGN` et relié à une étape attendue ; un test rouge non expliqué bloque la validation.
- Une mesure doit indiquer le nombre d'essais, le jeu d'entrée, les limites et la variabilité pertinente.
- Un score de recherche sur cinq requêtes est un smoke test, pas un benchmark représentatif.
- Toute preuve critique doit contenir au moins un cas négatif ou contradictoire.
- Un test qui passe sur une version de runtime différente de la version épinglée prouve seulement le résultat sur la version effectivement exécutée.
- Une auto-évaluation ne remplace pas une revue indépendante pour les gates Staff/Principal.
- Les 26 exercices recensés dans [85 : Statut et retours des 26 exercices](85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md) sont des entraînements non certifiants : aucun corrigé/oracle indépendant n’y est livré. Le [protocole de retour fiable](85-STATUT-EXERCICES-AUTO-EVALUATION-V6.5.md#procedure-de-retour-fiable) distingue la revue humaine indépendante de l’auto-retour guidé. Un `learner-verifier.js` écrit par l’apprenant ne devient pas un oracle indépendant parce qu’il passe.
- Une case cochée, un journal personnel, un SHA-256 ou une déclaration « sans IA » est une trace ou une auto-déclaration, pas une preuve indépendante d’auteur, de date, d’absence d’assistance ou de maîtrise.
- La revue d’un tiers n’est pas requise pour pratiquer un exercice ordinaire ; elle est requise uniquement lorsque la gate choisie exige explicitement `REVIEWED` ou une validation externe.
- Le niveau de maturité terrain T0–T4 est consigné séparément du statut pédagogique.

## Conditions de sortie

Une compétence CORE critique n'est acquise que si l'apprenant peut :

1. produire un artefact modifiable ;
2. exécuter la vérification avec les résultats consignés ;
3. expliquer une défaillance plausible et les limites du test ;
4. corriger ou réviser l'artefact face à une contrainte nouvelle ;
5. appliquer le principe à un second contexte ;
6. répondre à une objection sans se réfugier dans le vocabulaire du cours.

Pour les compétences de niveau Staff/Principal, documenter en plus la provenance de la preuve et faire intervenir une revue externe. Le curriculum peut entraîner le jugement, pas créer à lui seul une expérience d'impact multi-équipe.
