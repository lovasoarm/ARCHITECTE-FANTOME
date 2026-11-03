---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, defaut_cache]
anti_recipe_key: changement_echelle+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Bloc 21-25 : API, sécu, IA, DB, scalabilité

Temps de lecture ~5 min

## Rétrospective guidée

- Qu'est-ce qui, dans le bloc, a été **le plus dur à intégrer** ?
- Cite **1 décision** que tu regrettes.
- Cite **1 décision** que tu re-prendrais.

## Mini-défi de re-contextualisation

Prends un exercice d'un module **antérieur au bloc** et refais-le avec les outils du bloc courant. Écris ce qui change.

## Rétro-ADR

Compare ton temps et ta confiance sur ce bloc (21-25) à ceux du bloc précédent.

## Question rituelle

> Relis ton ADR le plus ancien. Qu'est-ce que tu changerais aujourd'hui ? Pourquoi ?

## Chaos Day (si applicable)

Contraintes qui peuvent tomber :

1. "Le client veut du temps réel."
2. "On supprime la DB, tout en mémoire."
3. "L'API doit être idempotente."
4. "Un dev quitte, tu récupères son module sans doc."
5. "La sécu impose CSP strict."

Chaque changement → nouvel ADR (max 1 page).

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Un service de réservation expose `POST /reservations`, vérifie l'identité de l'utilisateur, stocke la réservation et publie un événement. La synthèse F relie cinq questions : contrat API (champs obligatoires), sécurité (l'utilisateur ne peut lire que sa réservation), IA (si un classement existe, il ne décide pas l'autorisation), base de données (unicité de la réservation) et scalabilité (rejeu sans doublon). Une seule réservation est suivie de la requête à l'événement ; chaque frontière possède sa preuve et ses limites.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « Bloc 21-25 : API, sécu, IA, DB, scalabilité » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

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

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Bloc 21-25 : API, sécu, IA, DB, scalabilité** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Bloc 21-25 : API, sécu, IA, DB, scalabilité » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
