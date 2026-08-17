---
stability: perissable_2027
acte: transférer
---

# 06 : PORTER SON BUDGET CHEZ UN SECOND FOURNISSEUR

Acte attendu : produire.

Temps de lecture ~8 min

Le repo vérifie déjà le transfert multi-langage par un livrable bloquant ([02-CONSTRUCTION/17_polyglot_forge](../../02-CONSTRUCTION/02_mini_projects/17_polyglot_forge/RULES.md)). Le transfert multi-cloud, lui, était jusqu'ici postulé : on comparait des fournisseurs sans jamais porter quoi que ce soit. Une pensée transférable qu'on n'a jamais transférée est une pensée supposée.

## 1. Ce que porter veut dire ici

Porter, ce n'est pas retrouver le même total chez l'autre fournisseur. C'est découvrir **ce qui change de nature**, pas seulement de prix.

| Ce qui change | Question à poser | Ce que ça révèle |
| --- | --- | --- |
| Modèle de facturation | à la seconde, à l'heure, à la requête, au provisionné ? | ton budget est-il piloté par la charge ou par la réservation |
| Unité d'egress | par Go sortant, par zone, par destination, gratuit vers son propre CDN ? | où se cache ton vrai coût de croissance |
| Granularité du managé | peux-tu prendre la sauvegarde sans prendre le cluster ? | combien d'astreinte tu achètes réellement |
| Verrouillage | quel service n'a aucun équivalent ailleurs ? | ton degré d'enfermement, en jours de sortie |

## 2. Le geste, en trois quarts d'heure

1. Reprends le tableau de ton `BUDGET-CLOUD.md`, palier 10 000, colonnes de traçabilité comprises ([BUDGET-CLOUD.md](BUDGET-CLOUD.md)).
2. Refais la même facture chez le second fournisseur que tu as déjà relevé et daté à l'exercice 2 de [05_choisir_fournisseur.md](05_choisir_fournisseur.md). Aucun nouveau relevé n'est nécessaire : le protocole de la donnée sourcée t'a déjà fait faire le travail.
3. Écris la liste "change de nature", ligne par ligne, en utilisant le tableau ci-dessus.
4. Termine par une phrase de réversibilité : combien de jours pour partir, et ce que coûte l'egress de la migration elle-même.

## 3. Le piège classique

L'écart de total est presque toujours faible, entre 10 et 20 pour cent, et l'apprenant en conclut que le choix du fournisseur n'a pas d'importance. C'est l'inverse : le total se ressemble parce que le marché s'aligne, et tout l'écart réel est dans les lignes qui changent de nature. Un système qui pousse 18 To sortants par mois est bon marché chez l'un et ruineux chez l'autre, à total affiché identique au palier précédent.

## 4. Livrable

Une section `## Portage` ajoutée à ton `BUDGET-CLOUD.md` : le second tableau daté et sourcé, la liste "change de nature", la phrase de réversibilité. Mode de vérification : critère binaire du [verification_pack/drill_2.md](verification_pack/drill_2.md).

## RÉSUMÉ

Le multi-cloud ne se démontre pas en comparant deux grilles, il se démontre en portant un budget réel et en nommant ce qui change de nature. Le total se ressemble, les mécanismes non, et c'est dans les mécanismes que vit l'enfermement. Un portage écrit vaut mieux qu'une conviction de portabilité.

## ET APRÈS

Le [grimoire](grimoire.md) fige le vocabulaire, puis le [challenge](challenge.md) produit ton `BUDGET-CLOUD.md` complet, portage inclus.
