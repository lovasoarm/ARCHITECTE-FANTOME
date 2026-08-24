---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [changement_echelle, solution_concurrente]
anti_recipe_key: changement_echelle+solution_concurrente
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# SLI, SLO, budget d'erreur

<!-- AF-DIAGRAM:slo -->

```text
text
SLO
 │
 ├──► SLI mesuré ───► conformité
 │
 └──► Error Budget ─► capacité à prendre du risque
                         │
                         ▼
                  freeze / release / invest
```

Le SLO définit la cible, le SLI mesure le service et l’error budget relie fiabilité et cadence de changement.

Temps de lecture ~9 min

## 1) LES TROIS MOTS, DANS L'ORDRE

- **SLI** : l'indicateur mesuré. _Part des requêtes GET /reservations répondant en < 800 ms._
- **SLO** : l'objectif daté. _99,5 % sur 28 jours glissants._
- **SLA** : le même objectif avec une pénalité contractuelle. Tu n'en écris pas au début.

Un SLI se mesure **côté utilisateur** ou au plus près : au bord (load balancer), pas au fond du code.

## 2) CALCULER LE BUDGET D'ERREUR

```txt
Trafic : 200 000 requêtes / 28 jours
SLO    : 99,5 %
Budget : 0,5 % x 200 000 = 1 000 requêtes ratées autorisées
         soit ~36 requêtes/jour, soit ~3 h 22 d'indisponibilité totale sur 28 jours
```

Exprime toujours le budget en **unités que le métier comprend** : requêtes ratées, minutes, commandes
perdues. Jamais en pourcentage seul.

## 3) LA POLITIQUE DE BUDGET (à écrire une fois, à appliquer sans discuter)

| Budget restant | Décision automatique                                               |
| -------------- | ------------------------------------------------------------------ |
| > 50 %         | on livre normalement, on prend des risques bornés                  |
| 20-50 %        | gel des changements risqués, priorité aux causes récurrentes       |
| < 20 %         | gel des fonctionnalités, seuls les correctifs de fiabilité passent |
| épuisé         | post-mortem obligatoire + un chantier de fond financé              |

## 4) CHOISIR TROIS SLI, PAS DIX

Disponibilité, latence, justesse. Trois suffisent. Le quatrième SLI n'est jamais regardé.

## 5) LES ERREURS CLASSIQUES

- Mesurer la moyenne au lieu d'un centile (p95/p99). La moyenne cache exactement ce qui fait mal.
- Compter les erreurs 4xx du client comme des échecs de service.
- Un SLO par microservice sans SLO du parcours utilisateur : personne ne vit dans un microservice.

## Exercice (25 min)

Écris les trois SLI de ton fil rouge, leur point de mesure exact, le SLO de chacun, et le budget en
requêtes ratées par semaine. Rends `SLO.md`, section 1 à 3.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
