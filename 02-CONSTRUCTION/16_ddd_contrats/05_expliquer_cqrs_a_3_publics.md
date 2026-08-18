---
stability: intemporel
acte: construction
noyau: oui
---

# EXPLIQUER CQRS À TROIS PUBLICS

Durée : 45 min. Rendu : trois textes, dans le même fichier.

Même contenu, trois auditoires. Le niveau Staff se mesure ici : la même idée, sans mensonge, à trois
altitudes.

## 1) À un junior (150 mots max, un exemple de code)

Objectif : qu'il sache **quand** l'utiliser, pas seulement ce que c'est. Analogie autorisée : le
comptoir de commande et la vitrine d'un restaurant — on ne fait pas la queue au même endroit pour
commander et pour regarder le menu.

## 2) À un pair (200 mots, un schéma, un compromis explicite)

Objectif : qu'il puisse te contredire. Donne le seuil de trafic, le délai de cohérence retenu, le cas
« relire son propre écrit », et ce que tu abandonnes en simplicité.

## 3) À une direction non technique (120 mots, aucun terme technique non défini, un chiffre)

Objectif : une décision. Formule attendue : « aujourd'hui les pages de consultation ralentissent quand
beaucoup de gens enregistrent. On sépare les deux chemins. Coût : X jours et Y €/mois. Effet : la page
passe de 2,4 s à 0,4 s. Contrepartie : une modification peut mettre jusqu'à 30 secondes à apparaître. »

## Auto-contrôle

- [ ] Aucun des trois textes ne contient une phrase copiée d'un autre.
- [ ] Le texte direction contient un chiffre et une contrepartie assumée.
- [ ] Le texte junior contient un contre-exemple (« ne fais pas ça quand… »).
