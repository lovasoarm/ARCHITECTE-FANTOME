---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# SPEC DRIFT : la spec qui bouge en cours de route

Temps de lecture ~4 min

-> ~2-4 h par exécution, à jouer sur un mini-projet AU CHOIX

Compétence visée : encaisser un changement de contrainte à 40% d'avancement sans jeter tout ton travail, sans perdre la trace des décisions. C'est le vrai visage de la prod, pas les cahiers des charges statiques d'un cours.

## POURQUOI CE FICHIER EXISTE

Les 18 cahiers des charges de `02-CONSTRUCTION/02-MINI-PROJECTS/*` sont clairs à l'ouverture. C'est un mensonge pédagogique utile : tu apprends d'abord à décomposer, ensuite à absorber le flou. Ce fichier introduit **le flou mouvant** : après 40% d'avancement, une contrainte change. Tu dois t'adapter sans réécrire depuis zéro.

## PROJETS ÉLIGIBLES

Choisis UN projet parmi :

- `02-CONSTRUCTION/02-MINI-PROJECTS/05_prison_break_api/` (recommandé pour un premier drift : contrainte de sécurité qui apparaît en cours de route).
- `02-CONSTRUCTION/02-MINI-PROJECTS/06_ultras_dashboard/` (drift sur la volumétrie / temps réel).
- `02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/` (drift sur la cohérence).

Refait le drift 3 fois total, projets différents, pour couvrir 3 natures de changement.

> Note : `../../../02-CONSTRUCTION/02-MINI-PROJECTS/03_walking_dead_protocol/04-SPEC_DRIFT.md` et `../../../02-CONSTRUCTION/02-MINI-PROJECTS/14_system_design_lab/04-SPEC_DRIFT.md`
> ont déjà **leur drift pré-écrit** (pas de tirage), ce sont des exécutions dédiées,
> pas des projets éligibles au tirage aléatoire ci-dessous.

## DÉCLENCHEMENT

Tu déclares "40%" toi-même : à peu près quand la structure squelette est en place, que 2-3 endpoints fonctionnent, que les tests d'entrée passent. À ce moment, ouvre le tableau ci-dessous et tire **une** contrainte au hasard (dé, aléa Node, doigt au hasard).

## LES CONTRAINTES DE DRIFT

| #   | Drift                                                                                                             | Nature                  | Complication réelle                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------------------- |
| 1   | Le stockage doit désormais survivre à un crash processus (pas juste au restart normal).                           | Persistance             | Il faut fsync, un WAL, ou basculer sur SQLite en mode strict.         |
| 2   | La latence P99 doit passer sous 200 ms sur les 3 endpoints critiques.                                             | Performance             | Il faut profiler, cacher, revoir le pattern d'accès.                  |
| 3   | Un nouveau rôle "auditeur" doit pouvoir tout lire sans rien écrire, sans révélation d'ID interne.                 | Sécurité / autorisation | Il faut découper l'ACL, potentiellement anonymiser.                   |
| 4   | Le flux de messages doit garantir l'ordre par source (pas globalement).                                           | Cohérence               | File par shard, ou clé de partition explicite.                        |
| 5   | Un test de charge existant révèle une race à > 200 requêtes/s.                                                    | Concurrence             | Renforcer la synchronisation, potentiellement une queue.              |
| 6   | La contrainte "pas de dépendance externe" est levée : tu PEUX ajouter Redis OU un broker, mais tu dois justifier. | Trade-off               | ADR obligatoire, alternative sans dépendance étudiée.                 |
| 7   | Une dépendance existante n'est plus autorisée en prod (lib X bannie).                                             | Contrainte négative     | Remplacer ou réécrire, sans casser les tests existants.               |
| 8   | Le contrat de sortie d'un endpoint devient `{data, meta}` au lieu de `[]`.                                        | Contrat d'API           | Adapter clients internes + tests, garder la rétro-compat si possible. |

## PROTOCOLE OBLIGATOIRE

1. **STOP CODE** dès que tu tires le drift. Interdiction de toucher au code avant l'étape 2.
2. **ADR** : ajoute un ADR dans `ADR/` du projet. Format habituel : contexte, options, choix, conséquence. Cite le drift tiré.
3. **POSTMORTEM mis à jour** : ouvre `08-POSTMORTEM.md`, ajoute une section "Spec drift #<numéro>" avec :
   - Ce qui existait avant.
   - Ce qui doit changer.
   - Ce que tu jettes (et pourquoi).
   - Ce que tu récupères.
4. **TDD_JOURNAL** : ajoute les nouveaux tests d'acceptation avant tout code.
5. **Puis** tu codes le drift. Objectif : dette technique visible, pas cachée.
6. **INTERVIEW_DEFENSE_JOURNAL** (facultatif mais fortement recommandé) : oralise en 90 secondes "pourquoi j'ai choisi cette voie et pas l'autre" comme au scénario 4 de `../16_career/03-interview_defense.md`.

## GRILLE DE VALIDATION

| #   | Critère                                                                              | OK  |
| --- | ------------------------------------------------------------------------------------ | --- |
| 1   | ADR daté, options listées, décision datée                                            |     |
| 2   | POSTMORTEM mis à jour AVANT tout code post-drift                                     |     |
| 3   | Tests d'acceptation du drift ajoutés AVANT implémentation                            |     |
| 4   | Ancienne fonctionnalité toujours verte (pas de régression silencieuse)               |     |
| 5   | Nouvelle fonctionnalité verte                                                        |     |
| 6   | Le code jeté est ARCHIVÉ dans une branche ou un commentaire, pas supprimé sans trace |     |

6/6 obligatoire.

## POURQUOI ÇA COMPTE

Un ingénieur qui n'a jamais absorbé un spec drift croit que la conception initiale suffit. Un ingénieur qui l'a vécu 3 fois sait que **la conception initiale est un pari**, que l'ADR est ton assurance, et que le POSTMORTEM est la mémoire des paris perdus.

C'est le passage de "je sais construire" à "je sais construire ET ré-orienter". C'est la différence entre kick-ass et Thor sur la Pierre 4 (architecture).

## APRÈS

- Rejoue avec un autre projet et une autre contrainte.
- Puis rejoue avec un projet finalisé du portfolio, spec drift dans 6 mois. La vraie prod, c'est ça.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Pratique autonome : production attendue

À partir de « SPEC DRIFT : la spec qui bouge en cours de route », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:architecture -->

## Repère visuel utile : Défendre une frontière de domaine Kintana

```text
client -> API / application
               |
               v
        domaine Kintana
        /      |      \
       v       v       v
 demandes  réservations  rôles
       \       |       /
        v      v      v
        persistance + outbox
                |
                v
          worker notification
```

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **SPEC DRIFT : la spec qui bouge en cours de route** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « SPEC DRIFT : la spec qui bouge en cours de route » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
