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
captures. Si une famille S1..S6 est encore CREUX (fichier de preuve vide ou invérifiable), **tu n'entres pas**. La preuve S6 de livraison/exploitation et le contrôle transversal G8 d'évaluation IA sont distincts.

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
- [ ] Si le fil rouge délègue des décisions ou actions à des agents/automatisations autonomes : `PREUVES/STANDARDS-AGENTS.md`. Sinon, `PREUVES/EVALUATION-IA.md` documente explicitement le non-usage, son périmètre et les limites de ce choix. Un assistant utilisé sous contrôle humain direct ne déclenche pas à lui seul cette pièce.
- [ ] `PREUVES/LIVRAISON-EXPLOITATION.md` : release, migration, observabilité post-déploiement, test de rollback/recovery daté.
- [ ] `PREUVES/EVALUATION-IA.md` : jeu de cas versionné exécuté, erreurs et limites expliquées, décision d’usage/refus justifiée.
- [ ] Si le fil rouge intègre une brique IA : `PREUVES/IA-EN-PROD.md` avec coût plafond, permissions, fallback et conditions d’arrêt.
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

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Rendre visible l’impact au-delà d’une équipe

```text
problème inter-équipes
        |
        v
carte d’influence et dépendances
        |
        v
levier d’action
        |
        v
coordination sans autorité directe
        |
        v
impact vérifié
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce niveau existe** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Définir une preuve de portée Staff

**Mission liée à « Pourquoi ce niveau existe » :** Choisis une initiative Kintana qui dépasse une équipe. Cartographie son impact, les équipes concernées, les décisions que tu peux influencer et les preuves observables de résultat.

**Livrable :** Carte de portée et dossier de preuves avec limites explicites.

**Critères d’acceptation :** L’influence n’est pas confondue avec l’autorité ; les résultats non observés sont étiquetés ; le périmètre dépasse une contribution individuelle.

**Transfert obligatoire :** L’initiative réussit localement mais dégrade une autre équipe : révise la mesure de succès.
