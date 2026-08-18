---
stability: intemporel
acte: évaluer
---

# Rétrospective du palier 2 : sortie de CONSTRUCTION, entrée en conception

Acte attendu : évaluer.

[Style](../06-ANNEXES-TRANSVERSES/meta/_STYLE.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md) | [Première mi-rétro](MI-RETRO-BLOC-2-BUILD.md)

Ce document ferme le niveau 2 (Développeur confirmé) : il est la retrospective de palier, pas une simple respiration. Tant qu'il n'est pas signé et daté, le niveau 2 n'est pas coché, même si les treize modules sont lus.

Ce bloc porte vingt positions, la moitié du parcours. La première mi-rétro respire après la position 10 : dix positions plus loin arrivent les deux plus abstraites du repo, le découpage par le langage du métier et la séparation lecture/écriture, exactement au moment où l'attention est la plus basse. Cette seconde mi-rétro existe pour que DDD et CQRS soient abordés après une consolidation, jamais en fin de plateau.

À faire après [13_runtime_env](13_runtime_env/README.md) et le passage de BOSS-6, avant d'ouvrir [14_architecture_patterns](14_architecture_patterns/00_why_architecture_patterns.md). Durée : 45 minutes, pas plus.

## 1. Ce que tu rouvres (15 min)

Deux artefacts seulement, parmi les positions 11 à 13 :

- un refactoring de [11_refactoring](11_refactoring) : le comportement était-il verrouillé par un test avant de bouger le code ?
- un type non trivial de [12_typescript](12_typescript) : interdit-il vraiment l'état invalide, ou décore-t-il du code déjà écrit ?

Classe chacun VRAI, FAUX ou INCOMPLET, avec le mécanisme nommé pour chaque FAUX ou INCOMPLET.

## 2. Les trois frontières, à dire à voix haute (5 min)

Sans rouvrir les fichiers, dis ce que traite [14_architecture_patterns](14_architecture_patterns/00_why_architecture_patterns.md), ce que traite [15-ARCHI-LAB](15-ARCHI-LAB/01-why-this-level.md), et ce que va traiter [16_ddd_contrats](16_ddd_contrats/00_why_ddd_contrats.md). Si les trois réponses se ressemblent, tu ressens une redite là où il y a trois niveaux différents : relis les lignes "Frontière" en tête de chacun des trois, elles sont écrites pour ce moment précis.

## 3. Le signal d'entrée dans l'abstraction (10 min)

Fais la calibration de frontière de contexte du [prereq_check de 16_ddd_contrats](16_ddd_contrats/00_prereq_check.md). Si elle échoue, tu viens d'économiser deux semaines de lecture qui n'auraient rien accroché.

## 4. Le verdict de palier (15 min)

Écris trois lignes, pas davantage : ce que tu sais construire aujourd'hui et que tu ne savais pas au module 01, le mécanisme qui te coûte encore le plus cher, et la date à laquelle tu ouvres le niveau 2bis. Le niveau 2bis (positions 14 à 20, fermé par [RETRO-BLOC-2-BUILD.md](RETRO-BLOC-2-BUILD.md)) ne se lit pas comme la suite du même plateau : il change de question, on ne construit plus, on découpe.

## Critères de réussite

- Deux artefacts classés, mécanisme nommé pour chaque défaut.
- Les trois frontières dites de mémoire, sans confusion entre elles.
- La calibration de contexte passée, ou refaite le lendemain avant d'entrer.
- Le verdict de palier écrit, daté : c'est lui qui coche le niveau 2.

Signe et date cette mi-rétro dans ton dépôt. Une rétrospective non datée n'a pas eu lieu.
