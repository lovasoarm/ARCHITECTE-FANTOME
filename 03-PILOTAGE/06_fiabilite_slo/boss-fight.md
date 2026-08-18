# BOSS FIGHT : LE BUDGET BRÛLÉ UN VENDREDI À 16 H

Un boss fight combine tout le module sans dire quelle leçon s'applique. Compte 45 minutes, chrono lancé, sans IA, et écris tes décisions au fur et à mesure sans revenir en arrière.

## La situation

Vendredi, 16 h 10. Ton SLO est de 99,5% sur un mois glissant, budget hebdomadaire de 216 requêtes ratées. Le tableau de bord affiche 511 requêtes ratées depuis mardi : le budget du mois entier est consommé à 87%, et il reste dix jours de fenêtre.

Ce qui est établi :

- Les erreurs viennent d'un fournisseur de paiement externe, dont le taux d'échec est passé de 0,2% à 9% depuis mardi 14 h.
- Ton code réessaie trois fois, sans attente exponentielle, sur un appel de débit.
- Le disjoncteur n'existe pas : il était dans le carnet, jamais fait.
- Une mise en production de la nouvelle page de recherche est prévue lundi 9 h, annoncée à des clients.
- La personne d'astreinte du week-end n'a jamais restauré la base ; le dernier test de restauration date d'il y a onze mois.

Trois interlocuteurs t'écrivent en même temps :

**Le produit.** "La page de recherche part lundi, c'est annoncé. Elle ne touche pas au paiement, donc je ne vois pas le rapport avec vos erreurs."

**Le support.** "On a 40 clients qui disent avoir été débités deux fois. Est-ce que c'est possible ? Réponse rapide, on a la presse qui commence à poser des questions."

**La direction.** "Coupez le fournisseur et passez au secondaire, tout de suite. On paie deux prestataires justement pour ça."

## Ce que tu produis

Un journal de décision horodaté, avec pour chaque point :

1. **16 h 15 : l'action d'atténuation immédiate**, celle qui protège l'utilisateur dans l'heure, et pourquoi celle-là avant les autres.
2. **La réponse au support** : ce que tu affirmes, ce que tu ne peux pas encore affirmer, et comment tu le vérifies. Le double débit est-il possible avec ton code actuel ? Réponds franchement.
3. **La réponse au produit** : la mise en production de lundi part, ou ne part pas. Applique ta politique de budget écrite en [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md), et cite-la. Si tu n'en avais pas écrit une, note-le : c'est le vrai enseignement du boss fight.
4. **La réponse à la direction** : le basculement fournisseur, immédiat ou non, avec le risque exact du basculement à chaud un vendredi soir et ce que tu exiges avant de le faire.
5. **Les trois lignes de post-mortem** à froid : cause système, pas coupable, avec la correction qui empêche la répétition et sa date.

## Verdict

- Atténuation en premier, double débit reconnu comme possible et vérifié, livraison de lundi arbitrée en citant une politique écrite, basculement conditionné à une vérification : boss fight gagné.
- Tu bascules de fournisseur avant d'avoir arrêté le retry non idempotent : tu as multiplié les doubles débits sur un second système. Relis [04_degradation_disjoncteur.md](04_degradation_disjoncteur.md), section 2.
- Tu laisses partir la livraison de lundi sans référence à une politique écrite : ton budget d'erreur est décoratif. Reprends la section 4 de [01_sli_slo_budget_erreur.md](01_sli_slo_budget_erreur.md) et écris la politique aujourd'hui.
- Tu affirmes au support que le double débit est impossible : c'est faux avec un retry non idempotent, et c'est le genre d'affirmation qu'on te ressortira. La franchise chiffrée est ici la seule option tenable.

## Où ça ressort

Ce scénario est rejoué sous une autre forme au [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md) et dans la section 8 du dossier unique, où la tension "budget d'erreur contre date de livraison annoncée" est un candidat direct pour l'une des trois tensions exigées.

## ET APRÈS

Le module est terminé. Le module suivant, [07_cloud_foundations](../07_cloud_foundations/00_why_cloud_foundations.md), chiffre ce que coûte la promesse que tu viens d'écrire.
