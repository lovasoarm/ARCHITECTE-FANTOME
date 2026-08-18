---
stability: intemporel
acte: évaluer
---

# Mi-rétrospective 2 : bloc CONSTRUCTION, juste avant DDD et CQRS

Acte attendu : évaluer.

[Style](../06-ANNEXES-TRANSVERSES/meta/_STYLE.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md) | [Première mi-rétro](MI-RETRO-BLOC-2-BUILD.md)

Ce bloc porte vingt positions, la moitié du parcours. La première mi-rétro respire après la position 10 : dix positions plus loin arrivent les deux plus abstraites du repo, le découpage par le langage du métier et la séparation lecture/écriture, exactement au moment où l'attention est la plus basse. Cette seconde mi-rétro existe pour que DDD et CQRS soient abordés après une consolidation, jamais en fin de plateau.

À faire après [15-ARCHI-LAB](15-ARCHI-LAB/01-why-this-level.md), avant d'ouvrir [16_ddd_contrats/00_prereq_check.md](16_ddd_contrats/00_prereq_check.md). Durée : 30 minutes, pas plus.

## 1. Ce que tu rouvres (15 min)

Deux artefacts seulement, parmi les positions 11 à 15 :

- un refactoring de [11_refactoring](11_refactoring) : le comportement était-il verrouillé par un test avant de bouger le code ?
- le découpage produit en [15-ARCHI-LAB](15-ARCHI-LAB) : les dépendances vont-elles toutes dans le même sens, sans cycle ?

Classe chacun VRAI, FAUX ou INCOMPLET, avec le mécanisme nommé pour chaque FAUX ou INCOMPLET.

## 2. Les trois frontières, à dire à voix haute (5 min)

Sans rouvrir les fichiers, dis ce que traite [14_architecture_patterns](14_architecture_patterns/00_why_architecture_patterns.md), ce que traite [15-ARCHI-LAB](15-ARCHI-LAB/01-why-this-level.md), et ce que va traiter [16_ddd_contrats](16_ddd_contrats/00_why_ddd_contrats.md). Si les trois réponses se ressemblent, tu ressens une redite là où il y a trois niveaux différents : relis les lignes "Frontière" en tête de chacun des trois, elles sont écrites pour ce moment précis.

## 3. Le signal d'entrée dans l'abstraction (10 min)

Fais la calibration de frontière de contexte du [prereq_check de 16_ddd_contrats](16_ddd_contrats/00_prereq_check.md). Si elle échoue, tu viens d'économiser deux semaines de lecture qui n'auraient rien accroché.

## Critères de réussite

- Deux artefacts classés, mécanisme nommé pour chaque défaut.
- Les trois frontières dites de mémoire, sans confusion entre elles.
- La calibration de contexte passée, ou refaite le lendemain avant d'entrer.

Signe et date cette mi-rétro dans ton dépôt. Une rétrospective non datée n'a pas eu lieu.
