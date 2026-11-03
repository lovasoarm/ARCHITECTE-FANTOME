---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : rédac du newsroom de Konoha version CrazyDevs :** le rédacteur veut publier maintenant. Le développeur veut refactorer. Le SEO veut des URLs stables. Le support veut pouvoir annuler une publication. Le CMS devient un problème système.

# Pourquoi un CMS peut encore être worth it

Le CMS est pertinent quand l’édition de contenu est une capacité métier. Il devient douteux quand on l’introduit seulement parce qu’« il y en a partout ».

Le test Staff :

> « Quelle complexité le CMS supprime-t-il réellement, et quelle complexité ajoute-t-il ? »

<!-- AF-DIAGRAM:cost -->

## Repère visuel utile : Coût total par demande terminée

```text
options A / B
     |
     v
hypothèses de volume + prix datés
     |
     v
coûts directs + coûts humains
     |
     v
coût par résultat utile
     |
     v
sensibilité -> seuil -> décision
```

<!-- AF-LESSON-PROFILE: cost -->

## Repères de décision

- **Pourquoi :** Le coût technique et le coût d'opportunité déterminent si une solution reste soutenable pour l'équipe et les utilisateurs.
- **Quand l’utiliser / quand l’éviter :** Compare le coût total quand un choix influence infrastructure, maintenance ou temps humain. N'optimise pas à l'extrême sans connaître l'usage et la qualité attendue.
- **Limites :** Une estimation dépend de tarifs datés, d'hypothèses de charge et d'un périmètre. Le coût calculé n'est pas la valeur créée ; l'impact doit être mesuré séparément.

## Mécanisme : la version sans magie

Définis unité économique, volume, coûts directs/indirects, fréquence et horizon ; compare options et analyse la sensibilité.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi un CMS peut encore être worth it** se rattache à ce cas concret : Pour Kintana, un coût par demande terminée est plus utile qu'un coût serveur mensuel isolé si le produit doit aider les centres à traiter leurs demandes.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Coût total par demande terminée

> **Arc Capsule Corp. / DBZ :** chaque transformation consomme du ki. Une feature doit acheter une valeur réelle, pas juste remplir le tableau des nouveautés.

**Mission liée à « Pourquoi un CMS peut encore être worth it » :** Compare deux options pour une capacité Kintana (cache, stockage, notifications, outil managé ou développement maison). Calcule coût total sur un horizon déclaré, puis relie le coût à un résultat utilisateur observable.

**Livrable :** tableau de coût daté, hypothèses de volume, coût par unité, sensibilité et recommandation réversible.

**Critères d’acceptation :** tarifs sourcés et datés ; charge déclarée ; coûts opérationnels et humains inclus ; économies non présentées comme réalisées sans mesure ; seuil de réévaluation indiqué.

**Transfert obligatoire :** Le volume réel est deux fois plus faible que prévu et le coût fixe domine. Recalcule et explique si ton choix reste valable.
