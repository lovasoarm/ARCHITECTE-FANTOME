---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : Scalability

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `05-MAITRISE/01-DATABASES`, le module que tu viens de finir.

## Questions

1. Que garantit ACID, lettre par lettre (au moins 3 sur 4) ?
2. Un index accélère les lectures : quel est son coût caché sur les écritures ?
3. SQL vs NoSQL : sur quel critère trancher, pas juste "à la mode" ?
4. Une transaction, c'est quoi concrètement, avec un exemple où elle évite un bug ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../01-DATABASES/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : la différence scaling vertical/horizontal,
> pourquoi l'idempotence compte côté réseau, et le mythe du "exactly-once
> delivery" sont le contenu que ce module va t'enseigner (notamment
> `03-distributed_primitives.md`) : normal de ne pas encore les maîtriser.
> Ta compréhension est testée en fin de module.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
