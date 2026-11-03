---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Trade-off arena : 3 scénarios, 0 bonne réponse

Temps de lecture ~30 min

Le vrai boulot de dev, c'est CHOISIR, pas coder. Ces 3 scénarios ont plusieurs solutions valides. Tu dois choisir ET argumenter. Un pair te challenge.

---

## SCÉNARIO 1 : LA LATENCE CONTRE LE COÛT

Ton API sert 500 req/s. La feature "recommandations" ajoute 200 ms par requête. Solutions candidates :

- Précalculer les recos toutes les nuits (rapide, mais stale).
- Cache Redis avec TTL 5 min.
- Recalcul temps réel avec upgrade CPU (facture x2).

**Livrable** : 1 page. Ton choix, 3 métriques que tu surveilles, 1 scénario où ton choix est faux.

---

## SCÉNARIO 2 : LA DETTE CONTRE LA DEADLINE

Feature critique à livrer dans 5 jours. La refacto propre prend 8 jours. Solutions :

- Livrer moche, ticket de refacto (jamais fait).
- Retarder de 3 jours.
- Livrer une version diminuée qui évite la zone crade.

**Livrable** : 1 page. Ton choix + comment tu le pitches au PM.

---

## SCÉNARIO 3 : LE MONOLITHE CONTRE LES MICROSERVICES

Startup 4 devs, 20k utilisateurs, produit qui pivote tous les 2 mois. On te propose de "casser en microservices tout de suite".

**Livrable** : 1 page. Ton verdict argumenté. Bonus : à partir de quel signal tu changerais d'avis ?

---

## RÈGLE D'OR

Ta réponse est jugée sur l'ARGUMENT, pas sur le choix. Deux réponses opposées peuvent être 10/10.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Pratique autonome : production attendue

À partir de « Trade-off arena : 3 scénarios, 0 bonne réponse », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Trade-off arena : 3 scénarios, 0 bonne réponse** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Trade-off arena : 3 scénarios, 0 bonne réponse » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
