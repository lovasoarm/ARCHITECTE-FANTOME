---
stability: intemporel
acte: évaluer
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Rétrospective du palier 2 : sortie de CONSTRUCTION, entrée en conception

Acte attendu : évaluer.

Style | [Rythmes](../06-ANNEXES-TRANSVERSES/08-ROADMAP-rythmes.md) | [Première mi-rétro](02A-c-MI-RETRO-BLOC-2-BUILD.md)

Ce document ferme le niveau 2 (Développeur confirmé) : il est la retrospective de palier, pas une simple respiration. Tant qu'il n'est pas signé et daté, le niveau 2 n'est pas coché, même si les treize modules sont lus.

Le dossier `02-CONSTRUCTION` porte vingt positions réparties sur deux niveaux ; celle-ci ferme les treize premières. La première mi-rétro respire après la position 13 (`13-RUNTIME-ENV`) : juste après arrivent les deux plus abstraites du repo, le découpage par le langage du métier et la séparation lecture/écriture, exactement au moment où l'attention est la plus basse. Elle se tient après la mi-rétro de la position 13 pour que DDD et CQRS soient abordés après une consolidation, jamais en fin de plateau.

À faire après [13-RUNTIME-ENV](13-RUNTIME-ENV/README.md) et le passage de 13b-BOSS-6, avant d'ouvrir [14-ARCHITECTURE-PATTERNS](14-ARCHITECTURE-PATTERNS/01-00-why-architecture-patterns.md). Durée : 45 minutes, pas plus.

## 1. Ce que tu rouvres (15 min)

Deux artefacts seulement, parmi les positions 11 à 13 :

- un refactoring de [11-REFACTORING](11-REFACTORING) : le comportement était-il verrouillé par un test avant de bouger le code ?
- un type non trivial de [12-TYPESCRIPT](12-TYPESCRIPT) : interdit-il vraiment l'état invalide, ou décore-t-il du code déjà écrit ?

Classe chacun VRAI, FAUX ou INCOMPLET, avec le mécanisme nommé pour chaque FAUX ou INCOMPLET.

## 2. Les trois frontières, à dire à voix haute (5 min)

Sans rouvrir les fichiers, dis ce que traite [14-ARCHITECTURE-PATTERNS](14-ARCHITECTURE-PATTERNS/01-00-why-architecture-patterns.md), ce que traite [15-ARCHI-LAB](15-ARCHI-LAB/01-01-why-this-level.md), et ce que va traiter [16-DDD-CONTRATS](16-DDD-CONTRATS/01-00-why-ddd-contrats.md). Si les trois réponses se ressemblent, tu ressens une redite là où il y a trois niveaux différents : relis les lignes "Frontière" en tête de chacun des trois, elles sont écrites pour ce moment précis.

## 3. Le signal d'entrée dans l'abstraction (10 min)

Fais la calibration de frontière de contexte du [prereq_check de 16-DDD-CONTRATS](16-DDD-CONTRATS/00-PREREQUIS.md). Si elle échoue, tu viens d'économiser deux semaines de lecture qui n'auraient rien accroché.

## 4. Le verdict de palier (15 min)

Écris trois lignes, pas davantage : ce que tu sais construire aujourd'hui et que tu ne savais pas au module `00-SOCLE/04-FUNDAMENTALS`, le mécanisme qui te coûte encore le plus cher, et la date à laquelle tu ouvres le niveau 2bis. Le niveau 2bis (positions 14 à 20, fermé par [04A-RETRO-BLOC-2BIS-ARCHI.md](04A-RETRO-BLOC-2BIS-ARCHI.md)) ne se lit pas comme la suite du même plateau : il change de question, on ne construit plus, on découpe.

## Critères de réussite

- Deux artefacts classés, mécanisme nommé pour chaque défaut.
- Les trois frontières dites de mémoire, sans confusion entre elles.
- La calibration de contexte passée, ou refaite le lendemain avant d'entrer.
- Le verdict de palier écrit, daté : c'est lui qui coche le niveau 2.

Signe et date cette mi-rétro dans ton dépôt. Une rétrospective non datée n'a pas eu lieu.

<!-- VERDICT-BOSS:debut -->

## Boss de palier : le verdict qui ferme le palier

Cette rétrospective **est** le Boss de palier : elle ferme le niveau 2 (Développeur confirmé) du palier `02-CONSTRUCTION`. Tant qu'elle n'est pas passée, le niveau 2bis reste fermé, même si tous les fichiers sont lus.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->
