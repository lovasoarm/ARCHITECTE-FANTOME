## perishability_id: PER-0104

stability: perissable
acte: pratiquer
route_family: core

---

# 36 : Vérifier une affirmation technique

Une affirmation technique n’est pas plus vraie parce qu’elle contient un chiffre, un nom d’outil ou une date.

## La règle

Avant de reprendre une information dans une décision, un ADR, un rapport ou un livrable :

1. identifie ce qui est affirmé ;
2. distingue mécanisme, version, mesure, benchmark et heuristique ;
3. cherche d’abord une source primaire lorsque l’information est externe ;
4. note la version ou la date lorsqu’elle peut changer ;
5. vérifie les limites et les conditions de validité ;
6. indique ce que tu sais réellement et ce qui reste une hypothèse.

## Cinq types d’affirmation

| Type        | Exemple                                | Exigence                                               |
| ----------- | -------------------------------------- | ------------------------------------------------------ |
| Stable      | règle du langage ou mécanisme durable  | expliquer le mécanisme                                 |
| Versionnée  | comportement d’un runtime ou d’une API | version explicite                                      |
| Empirique   | mesure effectuée sur ton système       | commande / contexte / résultat                         |
| Benchmark   | comparaison de performances            | environnement + limites + source                       |
| Heuristique | règle pratique                         | présentée comme heuristique, pas comme loi universelle |

## Test anti-certitude

Pour toute affirmation importante, réponds :

> Quelle observation me ferait changer d’avis ?

Puis :

> Dans quel contexte cette affirmation devient-elle mauvaise ?

## Exemple : versions

Le parcours est reproductible sur **Node.js 22.23.2**. Cette version est le point de référence de l’expérience AF ; elle ne signifie pas que toute autre version LTS est interdite. Une compatibilité avec une autre version doit être vérifiée séparément.

Pour les versions, les prix, les services fournisseurs ou toute donnée évolutive, écris toujours la date de vérification et privilégie la source primaire.

## Exercice : source ou intuition ?

Choisis une affirmation technique récente de ton projet. Produis trois lignes :

- ce que la source primaire affirme ;
- ce que ton système mesure réellement ;
- ce que tu en déduis, avec la limite de cette déduction.

La qualité de l’argument compte plus que la quantité de références.

## Schéma de fraîcheur recommandé

Pour tout contenu `perissable`, conserver une métadonnée uniforme :

```yaml
stability: perissable
last_verified: 2026-08-23
review_due: 2027-02-23
source_type: primary
source_url: "https://..."
```

Une date seule ne constitue pas une preuve : elle doit être accompagnée d'une source et d'une règle de révision.
