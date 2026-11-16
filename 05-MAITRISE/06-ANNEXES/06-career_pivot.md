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

<!-- AF-DIAGRAM:career_pivot -->

## Repère visuel : pivot professionnel en 30 jours

```text
rôle cible unique
       |
       v
compétences transférables + écarts
       |
       v
plan 4 semaines
       |
       v
mini-projet pont + preuve
       |
       v
bilan : continuer / ajuster / arrêter
```

<!-- AF-LESSON-PROFILE: transfer -->

## Repères de décision

- **Pourquoi :** Un pivot professionnel réussi réduit l'écart entre le rôle visé et les compétences réellement démontrables.
- **Quand l’utiliser / quand l’éviter :** Utilise ce plan pour choisir une transition réaliste et prioriser quatre semaines de travail. Ne traite pas 30 jours comme une promesse d'embauche ou de maîtrise d'un nouveau métier.
- **Limites :** Le plan dépend du temps disponible, du niveau de départ, du marché local et des exigences du rôle. Les retours d'offres ou d'entretiens sont des signaux, pas une garantie.

## Mécanisme : la version sans magie

Choisis une cible professionnelle, compare ses exigences à tes preuves actuelles, sélectionne un seul écart prioritaire, découpe-le en étapes hebdomadaires et réévalue le plan à partir du résultat réel.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Career pivot : plan 30 jours** se rattache à ce cas concret : sélectionne un rôle cible qui utilise une partie des compétences acquises sur Kintana, identifie ce qui se transfère et construis un mini-projet pont de portée limitée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : planifier un pivot réaliste

**Mission liée à « Career pivot : plan 30 jours » :** choisis un seul rôle cible (par exemple backend Python, platform ou mobile). Relève cinq exigences à partir de descriptions de poste accessibles, distingue celles déjà prouvées de celles qui manquent, puis construis un plan de quatre semaines tenant dans ton temps disponible. Prévois un mini-projet pont qui démontre un écart prioritaire et une revue de la pertinence de la cible à la fin.

**Livrable :** `CAREER-PIVOT-30-JOURS.md` : rôle cible, sources des exigences et date, tableau transférable/manquant, créneaux réalistes, jalons hebdomadaires, mini-projet pont, risques et critères d'arrêt/révision.

**Critères d’acceptation :** une seule cible ; charge compatible avec le temps disponible ; chaque exigence a une preuve ou une action ; les objectifs ne promettent ni maîtrise ni embauche en 30 jours ; les résultats réellement obtenus sont séparés du plan.

**Transfert obligatoire :** une offre d'emploi exige une compétence non prévue. Révise le plan en indiquant ce que tu retires ou reportes au lieu d'ajouter une charge illimitée.
