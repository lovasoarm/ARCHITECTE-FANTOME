---
stability: intemporel
acte: construction
noyau: oui
type: exercice
cognitive_level: L3
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Exercice : refuser une architecture trop belle

Temps de lecture ~2 min

Durée : 45 min. Rendu écrit obligatoire.

## Le cas

On te propose, sur ton fil rouge : event sourcing complet, un service par contexte borné (six
services), un bus de messages, une base par service, et CQRS avec vues asynchrones.
Le proposant est compétent et sincère. La proposition est _correcte_ dans l'absolu.

## Ce qu'on te demande

Écrire une page `ADR/0xx-refus-architecture.md` qui **refuse**, sans mépris, avec des nombres.

Structure imposée :

1. Ce que la proposition résout réellement (sois honnête, il y a du vrai).
2. Le coût, en trois lignes chiffrées : jours-homme de mise en place, surcoût mensuel d'infrastructure
   (tiré de ton `06A-BUDGET-CLOUD.md`), nombre de nouveaux modes de panne.
3. Le seuil déclencheur : « nous adopterons X quand Y dépassera Z » (une métrique, un nombre, un lieu
   de mesure).
4. Ce que tu fais à la place cette semaine, et le gain attendu.
5. La date de réexamen.

## Critère de réussite

Un lecteur qui n'était pas dans la discussion doit pouvoir dire : « le refus est réversible, il a une
condition de sortie ». Un refus sans seuil déclencheur est un refus idéologique : recale-toi seul.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Pour trois stations qui envoient au total 500 mesures par jour, une proposition prévoit six microservices, Kafka, un service mesh et un cluster Kubernetes. L'équipe ne dispose ni d'astreinte dédiée ni de preuve de charge qui justifie ces frontières. Elle choisit un monolithe modulaire avec une base relationnelle et une file simple déjà opérée par l'équipe. Elle documente un seuil de réexamen : par exemple, saturation mesurée ou besoin indépendant de déploiement : sans prétendre qu'un chiffre universel existe. **Pourquoi :** l'architecture proportionnée réduit le coût opérationnel immédiat tout en gardant une voie d'évolution réversible.

**À toi :** Les équipes collecte, qualité de l’eau et maintenance ont des règles et des rythmes différents, mais échangent des événements contractuels. Construis un cas minimal qui illustre « Exercice : refuser une architecture trop belle » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:ddd -->

## Repère visuel utile : Contrat métier et langage commun Kintana

```text
acteur -> commande -> invariant
                    |
                    v
                événement
                    |
          +---------+---------+
          v                   v
     contexte A           contexte B
   sens / modèle A       sens / modèle B
          |                   |
          +---- contrat ------+
```

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Exercice : refuser une architecture trop belle** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission Kintana : refuser une architecture disproportionnée

On te propose d'isoler chaque étape d'une demande Kintana dans un microservice, avec broker, base séparée et orchestration. Construis la meilleure défense de cette proposition, puis compare-la à un monolithe modulaire et à une séparation partielle. Utilise uniquement les volumes, contraintes d'équipe et incidents disponibles ; identifie ce qui manque.

**Livrable :** note d'arbitrage avec trois options, coûts d'exploitation, risques, réversibilité, seuil déclencheur et date de réexamen.

**Acceptation :** le refus ou l'acceptation repose sur les contraintes ; les estimations sont étiquetées ; le coût de migration et d'astreinte apparaît ; une observation peut invalider la décision.

**Transfert :** l'équipe double et deux domaines changent à des rythmes différents. Reconsidère la frontière sans imposer mécaniquement des microservices.
