---
stability: intemporel
acte: maitrise
noyau: oui
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Pourquoi ce niveau existe

Temps de lecture ~2 min

Un Staff Engineer ne livre pas six documents indépendants : il montre qu'une
seule décision tient sous plusieurs contraintes. Ce palier rassemble les preuves
cloud, architecture, fiabilité, produit, leadership et IA autour du **même**
fil rouge. La réussite ne dépend pas d'une équipe réelle : un dépôt public, des
mesures datées et une soutenance écrite rendent la preuve vérifiable **seul**.

## Ce que ce palier n'est pas

Ce n'est pas un résumé des modules précédents. Ce n'est pas un portfolio de
captures. Si une famille S1..S6 est encore CREUX (fichier de preuve vide, ou
contrat IA sans plafond réel), **tu n'entres pas**.

## D'où tu viens : la couture JS → Staff

Les fondations de ce dépôt (`00-SOCLE` à `02-CONSTRUCTION`) t'ont appris JavaScript
et son écosystème dans le détail : event loop, GC de V8, `npm`, patterns du
langage. Rien de ce palier ne reformule cet héritage : et c'est volontaire. Ce que
tu portes ici n'est pas la syntaxe JS mais ce qu'elle t'a servi à apprendre :
chaque `99-PORTAGE-MENTAL.md` rencontré depuis `02-CONSTRUCTION` (event loop,
structures de données, gestion mémoire, contrats d'API...) existait déjà pour
prouver, module après module, que le concept survivait au changement de langage.
Le [transfert hors écosystème](05A-transfert_hors_ecosysteme.md) de ce palier est
la version grandeur nature de cet exercice répété : un service entier, pas une
notion isolée, réécrit dans un second langage et redéployé chez un second
fournisseur. Si un des encarts de portage t'a semblé abstrait en le lisant la
première fois, c'est le moment où il cesse de l'être.

## Contrôle d'entrée (tout ou rien)

- [ ] `PREUVES/06A-BUDGET-CLOUD.md` : trois paliers 100 / 10 000 / 1 000 000, egress inclus.
- [ ] `PREUVES/SLO.md` : SLO chiffré, budget d'erreur, RTO mesuré chrono en main.
- [ ] `PREUVES/DECISION-ARBITRAGE.md` : valeur, coût, risque, point mort.
- [ ] Revue S5 publiée (URL + SHA) + passe [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md).
- [ ] `STANDARDS-AGENTS.md` présent.
- [ ] `PREUVES/IA-EN-PROD.md` : coût calculé, plafond, dégradé, 20 cas : ou remplacement S4/S5 **écrit**.
- [ ] Capstone rejouable (y compris addendum Staff et semaine à double dérive).

## Maturation décisionnelle

Le palier n'est pas certifié si tu sais seulement défendre une bonne réponse. Tu dois aussi montrer que tu peux abandonner ta propre réponse, reconnaître une erreur, supporter une perte de statut et reconstruire un mécanisme de décision. La boucle est dans [05-PSYCHOLOGIE-DECISION/README.md](05-PSYCHOLOGIE-DECISION/README.md).

## À la sortie

Le dossier doit aussi contenir la boucle de maturation décisionnelle : une croyance initiale, une contradiction, une révision datée, un biais identifié et une situation où une meilleure idée est venue d'ailleurs.

Le [dossier unique](02-dossier_unique.md) tient dix sections. Les
[trois tensions](03-trois_tensions.md) sont chiffrées des deux côtés. Une
décision est **refusée** avec son chiffre. Le
[transfert hors écosystème](05A-transfert_hors_ecosysteme.md) a été exécuté, pas
raconté. Le [boss fight](96-boss-fight.md) a croisé le contradicteur.

Sans `05A-transfert_hors_ecosysteme.md` (cité par le dossier unique, y compris hors
lien markdown), le palier n'est pas franchissable : c'est pour ça que ce fichier
existe sur le disque.
