---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [solution_concurrente, constraints_injectees]
anti_recipe_key: solution_concurrente+constraints_injectees
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Career pivot : plan 30 jours

Temps de lecture ~5 min

> Tu veux pivoter vers Rust, Python, cloud, data. Voici le squelette.

## Semaine 1 : Terrain

- Choisis **1** cible (Rust OU Python OU cloud, pas les trois).
- Écris ce qui, dans ce parcours, se **transfère directement** (voir `transferability/`).
- Écris ce qui te **manque** (syntaxe, écosystème, tooling).

## Semaine 2 : Concepts miroir

- Rejoue **3** modules du parcours dans la cible : closure, async, tests.
- Publie sur GitHub sous `pivot-<langue>/`.

## Semaine 3 : Projet pont

- Réécris **un** mini-ce parcours dans la cible.
- Compare : ce qui devient plus simple, plus dur, radicalement différent.

## Semaine 4 : Preuve sociale

- Article de blog (1000 mots max) : "ce parcours → <cible>, ce qui a survécu."
- Update LinkedIn / CV avec le projet pont.

## Anti-pattern

Apprendre "un peu de tout". Non. **Un** pivot, **une** cible, **30 jours**.

---

## COMBIEN DE TEMPS POUR PIVOTER ?

Avec les 6 pierres CrazyDevs solides + JS maîtrisé :

- **Python (data / backend)** : 2 semaines pour être productif, 2 mois pour être fiable.
- **Go (backend / infra)** : 3 semaines productif, 3 mois fiable.
- **Rust (systèmes)** : 6-8 semaines productif, 6 mois fiable (le borrow checker coûte cher).
- **TypeScript (si tu viens de JS)** : 3 jours productif, 3 semaines fiable.
- **SQL avancé** : 2 semaines productif, jamais "fini".

Ces chiffres supposent 1-2h/jour dédiées. Divise par ton rythme réel.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une personne qui développe déjà des applications web veut passer vers l'ingénierie backend. Elle ne postule pas immédiatement à dix métiers différents : elle choisit une cible (backend junior), relève trois écarts vérifiables (SQL, tests d'intégration, exploitation), puis construit pendant 30 jours une petite API documentée, testée et déployable en environnement de démonstration. Au jour 30, elle compare les preuves obtenues aux offres visées et ajuste la cible. **Limite :** ce plan démontre un travail de préparation, pas une garantie d'embauche.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Career pivot : plan 30 jours » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:portfolio -->

## Repère visuel utile : Dossier de preuve examinable

```text
problème -> rôle -> artefact
                   |
                   v
             commande reproductible
                   |
                   v
             résultat + limites
                   |
                   v
             revue / objection
                   |
                   v
             preuve renforcée ou claim retiré
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un portfolio crédible relie compétence, artefact, décision et résultat sans transformer une simulation en expérience réelle.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour montrer ton travail à un reviewer, entretien ou équipe. Mets en avant une preuve profonde plutôt qu'une collection de technologies.
- **Limites :** Un portfolio personnel ne démontre pas à lui seul influence organisationnelle ou impact production. Respecte confidentialité, licences et données non publiques.

## Mécanisme : la version sans magie

Présente le problème, ton rôle, les contraintes, les choix, le code/tests, la mesure, les limites et ce qui a changé après feedback.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Career pivot : plan 30 jours** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « Career pivot : plan 30 jours » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
