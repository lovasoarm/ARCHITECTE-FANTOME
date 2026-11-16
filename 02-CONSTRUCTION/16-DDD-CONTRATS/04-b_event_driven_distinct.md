---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Event-driven distinct : réagir n'est pas projeter

<!-- AF-DIAGRAM:event_driven -->

```text
┌────────────┐      event      ┌────────────┐
│ Producer   │────────────────►│ Event Bus  │
└────────────┘                 └────┬───────┘
                                   ├────► Consumer A
                                   ├────► Consumer B
                                   └────► Consumer C
```

Un événement découple le producteur des consommateurs tout en faisant circuler un fait observable.

Temps de lecture ~2 min

Fichier **distinct** de CQRS. CQRS = deux modèles de données,
lecture vs écriture : [03-cqrs_coherence_terme.md](03-cqrs_coherence_terme.md).
Event-driven = des composants qui **émettent** et **écoutent** sans s'appeler :
leçon mécanisme dans
[06-event_driven.md](../14-ARCHITECTURE-PATTERNS/06-event_driven.md).

Les traiter « en passant » dans les patterns fait croire que les deux sujets se
recouvrent. Ils ne se recouvrent pas.

## 1. Trois objets, trois fichiers

| Objet           | Question                       | Fichier                      |
| --------------- | ------------------------------ | ---------------------------- |
| Forme           | couches, ports, hexagone       | `14-ARCHITECTURE-PATTERNS`   |
| Événement       | qui écoute `user.registered` ? | `06-event_driven.md`         |
| Lecture séparée | quoi montrer pendant le lag ?  | `03-cqrs_coherence_terme.md` |

Un bus d'événements **peut** alimenter une projection CQRS. Ce n'est pas
automatique. Beaucoup de systèmes event-driven restent **CRUD** derrière.

## 2. Flux event-driven (sans CQRS)

```text
  Commande HTTP
       |
       v
  Module A  --emit: ReservationCreated-->  bus
                                           / | \
                                          /  |  \
                                    mail  stats  audit
```

A n'importe pas B. B peut tomber : A a déjà commité. C'est un **compromis de
couplage**, pas une stratégie de lecture.

## 3. Quand tu n'en veux pas

- Une seule équipe, un seul process, moins de 20 req/s : un appel de fonction
  est plus honnête.
- Tu as besoin d'une transaction unique (double-booking interdit) : l'événement
  _après coup_ arrive trop tard.
- Tu ne sais pas rejouer un événement (pas d'idempotence, pas de `eventId`) :
  tu construis une panne.

Chiffre d'exercice : un bus managé à 20 €/mois + 3 h de chase de traces/mois
(135 €) pour éviter un `import { notify }` de 0 €. Si tu ne peux pas nommer
l'équipe que tu découples, refuse.

## 4. Exercice fil rouge

Écris 15 lignes :

1. un événement métier réel (`ReservationCreated`, pas `ButtonClicked`) ;
2. deux listeners qui n'ont **pas** le droit d'échouer ensemble ;
3. ce que voit l'utilisateur si le listener mail est down (pas « rien ») ;
4. le coût mensuel du bus vs l'appel direct ;
5. la phrase « ceci n'est pas CQRS parce que … ».

Sans la phrase 5, tu recolles le gap.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « Event-driven distinct : réagir n'est pas projeter », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Event-driven distinct : réagir n'est pas projeter** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission Kintana : rendre une notification fiable

Dessine le trajet d'un événement `DemandeAssignee` depuis le producteur jusqu'au service de notification. Définis l'identifiant stable, le contrat, la politique de retry, la déduplication, l'ordre attendu et la gestion d'un consommateur indisponible. Distingue clairement réaction métier et projection de lecture.

**Livrable :** séquence producteur/broker/consommateur, contrat d'événement versionné, table des scénarios (doublon, retard, panne, changement de schéma) et preuve locale qui démontre l'absence de double effet dans le scénario simulé.

**Acceptation :** chaque message a un owner ; le retry ne masque pas une erreur permanente ; la déduplication est idempotente ; le statut de simulation est explicite.

**Transfert :** l'événement est reçu dans le désordre après une reprise. Explique si tu le rejettes, le réordonnes ou le compenses.
