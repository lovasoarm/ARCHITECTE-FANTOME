---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, preuve_partielle]
anti_recipe_key: fausse_piste+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Chaos Day : 3 vagues de 30 min

Temps de lecture ~5 min

Simulation de journée pourrie en prod. Prends un de tes mini-projets. Applique les 3 vagues. Livre ADR modifié + journal de bord + rétro.

## Vague 1 : La DB est down (30 min)

Ta base primaire ne répond plus. Timeout à 5s. Tu dois :

- Mettre en place un cache local de secours (in-memory ou fichier).
- Décider ce qui est servable stale vs ce qui doit erreur proprement.
- Écrire un `ADR-chaos-01-cache-fallback.md`.

## Vague 2 : Le client veut du SSR maintenant (30 min)

Ton app est SPA. Le client dit "il me faut du SEO pour hier". Tu dois :

- Lister ce qui casse en SSR (accès à `window`, `localStorage`, etc.).
- Proposer une stratégie (island, full SSR, prerender).
- ADR : `ADR-chaos-02-rendering-strategy.md`.

## Vague 3 : Un dev a push du code non testé sur main (30 min)

Le build de prod pète. Tu es d'astreinte. Tu dois :

- Revert propre (pas force push).
- Post-mortem : cause racine, impact, prévention (hook, CI, review policy).
- ADR : `ADR-chaos-03-branch-protection.md`.

## Journal de bord

Pour chaque vague : minute par minute, note ce que tu as pensé, ce que tu as fait, ce que tu as raté. Format libre, mais **honnête**.

## Rétrospective (15 min)

- Une chose à garder.
- Une chose à changer.
- Une chose à documenter pour l'équipe.

## Piège

Ne prépare pas les vagues à l'avance. La panique fait partie de l'exercice.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Vague 1 : couper l'accès à une dépendance pendant 2 minutes et vérifier que l'API retourne une erreur contrôlée. Vague 2 : rétablir la dépendance et vérifier que les demandes en attente sont reprises sans doublon. Vague 3 : restaurer une sauvegarde et comparer un invariant métier avant/après. L'équipe consigne l'heure, le signal observé, l'impact et la limite de chaque exercice. **Conclusion :** le système a résisté à ces scénarios de laboratoire, pas à toutes les pannes possibles.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Chaos Day : 3 vagues de 30 min » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Chaos Day : 3 vagues de 30 min** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Chaos Day : 3 vagues de 30 min » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
