---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: le critère de découpage par langage du métier et la séparation lecture/écriture sont indépendants du framework.
acte: restituer
---

> **Frontière** : ce module ne traite pas le catalogue des formes d'architecture, traité en [`02-CONSTRUCTION/14_architecture_patterns`](../14_architecture_patterns/00_why_architecture_patterns.md), ni la mécanique de découpage en couches d'un code existant, traitée en [`02-CONSTRUCTION/15-ARCHI-LAB`](../15-ARCHI-LAB/01-why-this-level.md). Ici, la frontière est tracée par le langage du métier, et le contrat qui la traverse est versionné.
> **Statut de pérennité :** **intemporel** | évolutif | périssable
> Statut effectif de ce module : **intemporel**. Le vocabulaire DDD a 20 ans, CQRS aussi. Ce qui change, c'est l'outillage autour, pas le principe.

> **CE MODULE RÉUTILISE** : couplage et cohésion, couches et frontières (`02-CONSTRUCTION/15-ARCHI-LAB`), refactoring (`02-CONSTRUCTION/11_refactoring`), event-driven (`02-CONSTRUCTION/14_architecture_patterns/05_event_driven.md`). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **OÙ CE MODULE EST RECROISÉ** : au palier [04-EPREUVE](../../04-EPREUVE/06-CAPSTONE-ARENA/03-deliverables.md), dans le capstone, le découpage en contextes bornés produit ici devient l'ADR d'architecture du livrable, croisé avec le budget cloud (famille S1, module [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md)) et le SLO écrit (famille S3, module [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md)). Puis une seconde fois au palier [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), où le même découpage doit survivre à un changement de contrat imposé.

# POURQUOI CE MODULE MÉRITE TON TEMPS : DDD ET CONTRATS

Tu sais déjà couper un système en morceaux (module `15-ARCHI-LAB`). Ce module te donne le critère de coupe : le langage du métier, pas la couche technique. C'est la différence entre une équipe qui livre une feature en trois jours et une équipe qui ouvre onze fichiers pour renommer un champ. En production, un mauvais découpage ne casse rien tout de suite : il te coûte trois semaines par trimestre, en silence, pendant deux ans.

## 1) LE PROBLÈME QUE ÇA RÉSOUT

`15-ARCHI-LAB` t'a donné le vocabulaire du couplage et des couches. Il ne t'a pas dit **où** tracer la frontière entre deux modules d'un même domaine métier. Deux équipes qui découpent au hasard (par couche technique : "tout ce qui touche à la base d'un côté, tout ce qui touche à l'API de l'autre") se retrouvent avec des frontières qui ne correspondent à aucune réalité métier, et qui bougent à chaque feature. Le DDD (Domain-Driven Design : conception pilotée par le domaine) répond à cette question précise : la frontière suit le sens du mot pour les gens du métier, pas la techno utilisée pour l'implémenter.

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le développeur qui code une feature de "réservation" pendant que son collègue code une feature de "planification" sur le même mot `créneau`, sans jamais se parler, découvre au moment de la fusion que les deux `créneau` ne veulent pas dire la même chose. L'équipe souffre quand un champ renommé dans un coin du système casse un service à l'autre bout, sans qu'aucun test ne l'ait vu venir, parce que le contrat entre les deux n'a jamais été écrit. Et le pire scénario : un système qui lit et écrit dans la même table pour tout, où une requête de reporting verrouille la table de production pendant l'heure de pointe.

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```
deux équipes se marchent sur un même mot du métier   --> langage ubiquitaire --> un mot, un sens
lecture et écriture se gênent mutuellement sous charge --> CQRS               --> deux modèles séparés
un champ supprimé casse un service qui le consommait  --> contrat versionné  --> double run + date d'extinction
```

## 4) STRUCTURE DE CE MODULE

- [01_langage_contextes_bornes.md](01_langage_contextes_bornes.md) : le langage ubiquitaire et le contexte borné, la frontière qui se mérite.
- [02_cqrs_coherence_terme.md](02_cqrs_coherence_terme.md) : séparer ce qui écrit de ce qui lit, et mesurer le prix de cette séparation.
- [03_contrats_migration.md](03_contrats_migration.md) : contrats, versioning, migration, la date d'extinction écrite le jour de la publication.
- [challenge.md](challenge.md) : challenge, ton découpage sous pression d'un changement imprévu.
- [04_exercice_architecture_trop_belle.md](04_exercice_architecture_trop_belle.md) : démonter un schéma d'architecture généré par IA, plausible et truqué.
- [boss-fight.md](boss-fight.md) : boss fight, une situation adverse réaliste.
- [grimoire.md](grimoire.md) : mémo dense, à ouvrir seulement après avoir fini le reste.

## 5) MODERNE, LEGACY, OU INTEMPOREL ?

Eric Evans a publié *Domain-Driven Design* en 2003. CQRS a été formalisé peu après par Greg Young. Les deux idées ont largement survécu au cycle de hype des microservices : elles s'appliquent aussi bien dans un monolithe modulaire que dans un système distribué, parce qu'elles parlent de modèle et de langage, pas de nombre de serveurs.

## RÉSUMÉ

Le critère de découpage d'un système, c'est le langage du métier, pas la couche technique. Un contexte borné se prouve par un contrat étroit, pas par un dossier. CQRS achète de la performance de lecture en payant de la cohérence à terme : ce prix se décide avec le métier, pas seul devant l'éditeur. Un contrat se livre avec sa date d'extinction, sinon la migration ne finit jamais.

Maintenant, ouvre [01_langage_contextes_bornes.md](01_langage_contextes_bornes.md).
