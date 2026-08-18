---
stability: intemporel
acte: construction
noyau: oui
---

# CQRS ET COHÉRENCE À TERME : CE QUE ÇA COÛTE VRAIMENT

Temps de lecture ~9 min

## 1) CE QUE CQRS EST

Séparer le chemin d'écriture du chemin de lecture. Rien d'autre.
Ce n'est **pas** : deux bases obligatoires, l'event sourcing, ni un bus de messages.

Trois marches, à monter dans cet ordre, et à arrêter dès que ça suffit :
1. Deux modèles en mémoire, même base, mêmes transactions.
2. Vues de lecture dénormalisées (tables ou vues matérialisées), rafraîchies dans la transaction.
3. Vues alimentées de façon asynchrone → **cohérence à terme**, et là seulement le coût explose.

## 2) LA COHÉRENCE À TERME EST UNE PROMESSE MÉTIER, PAS UN DÉTAIL TECHNIQUE

Dès la marche 3, tu dois répondre par écrit à trois questions :
- Quel délai maximal entre l'écriture et sa visibilité ? (chiffre, pas « rapide »)
- Que voit l'utilisateur qui relit immédiatement ce qu'il vient d'écrire ?
- Que fait le système si la vue prend du retard de 10 minutes ?

Sans ces trois réponses, tu n'as pas fait du CQRS : tu as fait un bug distribué.

## 3) LE PIÈGE DU RETOUR SUR SA PROPRE ÉCRITURE

Le cas qui casse toujours : l'utilisateur enregistre, la page recharge la vue, la vue est en retard,
il croit avoir perdu son travail. Solutions honnêtes : lire son propre écrit depuis le modèle
d'écriture, ou afficher l'état local optimiste avec un marqueur « en cours de publication ».

## 4) QUAND NE PAS FAIRE CQRS

- Moins de 10 requêtes/seconde en lecture : inutile.
- Une seule équipe, un seul déployable, un modèle qui tient en tête : inutile.
- Tu n'as pas de mesure prouvant que les lectures gênent les écritures : inutile.

## Exercice (25 min)

Prends la page la plus lourde de ton fil rouge. Mesure-la. Écris la marche minimale qui la répare et
la marche que tu refuses de monter, avec le chiffre qui justifie le refus.
