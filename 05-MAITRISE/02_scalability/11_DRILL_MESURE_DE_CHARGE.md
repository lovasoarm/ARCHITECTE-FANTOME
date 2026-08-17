---
stability: intemporel
acte: appliquer
---

# 11 : LE DRILL DE MESURE, TRANCHER PAR LA COURBE

Acte attendu : produire.

Temps ~50 min, obligatoire, une seule fois, sur le fil rouge.

Tout le reste du parcours t'apprend à décider par le raisonnement. Ce drill est le seul endroit où tu n'as pas le droit de raisonner : tu charges, tu mesures, tu publies deux courbes, et la courbe tranche. L'écart entre un très bon candidat Staff et un Staff Engineer réel tient souvent à ce geste, et à lui seul.

## 1. Le dispositif

1. Choisis une décision de performance réellement ouverte sur ton fil rouge, et deux variantes qui l'incarnent. Exemples tenables : cache en mémoire contre requête directe, traitement synchrone contre file d'attente, une réplique de lecture contre zéro.
2. Charge les deux variantes en local avec un outil de charge en ligne de commande, même modeste. Ce qui compte n'est pas l'outil, c'est le protocole : même machine, même jeu de données, même durée, montée en paliers de charge, trois répétitions.
3. Relève pour chaque palier : débit, latence médiane, latence au 95e centile, taux d'erreur. La médiane seule ment, le 95e centile est ce que vit ton utilisateur mécontent.

## 2. Le protocole de mesure, écrit avant de mesurer

Écris-le avant, sinon tu ajusteras le protocole jusqu'à obtenir le résultat que tu espérais. Trois lignes suffisent : ce que je mesure, à quelle charge, et quel écart je considère comme significatif. Un écart de moins de 10 pour cent entre deux variantes, sur une machine de développement, ne prouve rien.

## 3. Publication

Deux courbes dans ton dépôt, palier de charge en abscisse, latence au 95e centile en ordonnée, plus le tableau des chiffres bruts. Un graphique sans le tableau n'est pas une mesure, c'est une illustration.

## 4. Le bouclage obligatoire avec le SLO

C'est la partie que personne ne fait spontanément, et c'est celle qui compte. Reprends ton `SLO.md` écrit en [03-PILOTAGE/06_fiabilite_slo/challenge.md](../../03-PILOTAGE/06_fiabilite_slo/challenge.md) et réponds par écrit :

- à quelle charge la variante retenue sort-elle de l'objectif de latence annoncé dans le SLO ?
- combien de budget d'erreur cette sortie consomme-t-elle par mois, en minutes ?
- la variante perdante tenait-elle le SLO malgré tout ? Si oui, ton arbitrage n'était pas un arbitrage de performance mais de coût, et il faut le dire ainsi.

## 5. La décision

Une ligne, datée, dans ton journal : "variante retenue X, tranchée par la mesure du <date>, écart de <n> ms au 95e centile à <charge>, budget d'erreur consommé <n> minutes par mois". Une décision de performance sans nombre mesuré ne compte pas dans ce module.

Mode de vérification : critère binaire du [verification_pack/drill_2.md](verification_pack/drill_2.md), complété par la ligne "mesure" des [critères du pack](verification_pack/criteres.md).

## RÉSUMÉ

Charger deux variantes, publier deux courbes et laisser la courbe trancher, c'est le geste qui sépare l'estimation de la mesure. Le protocole s'écrit avant la mesure, sinon il s'ajuste au résultat souhaité. Et la mesure ne vaut que reliée au budget d'erreur du SLO : sinon elle reste une performance sans promesse.
