---
stability: evolutif
acte: pilotage
noyau: renfort
---

# DRILL 2 — LE CHIFFRAGE À FROID, EN 20 MINUTES

Exercice de répétition. À rejouer une fois par mois, sans notes.

## Consigne

On te donne un système inconnu en trois lignes. Tu produis, en 20 minutes, chronomètre visible :

1. L'action représentative choisie et pourquoi.
2. Les six postes, avec l'unité facturée de chacun.
3. La facture d'ordre de grandeur à 10 000 utilisateurs.
4. Le poste qui explosera en premier à 1 000 000, et le levier associé.

## Le système du jour

« Une application de partage de photos entre amis : envoi d'images (2 Mo en moyenne), fil
d'actualité, notifications par courriel, conservation illimitée. »

## Correction attendue (à ne lire qu'après)

Le poste dominant n'est ni le stockage ni le calcul : c'est **l'egress** des images consultées, sauf
si un CDN et des vignettes existent. Deuxième poste : le stockage, à cause de la conservation
illimitée — la rétention est ici une décision produit, pas technique.

## Critère

Réussi si l'egress apparaît dans les deux premiers postes et si l'unité facturée est nommée pour
chaque ligne.
