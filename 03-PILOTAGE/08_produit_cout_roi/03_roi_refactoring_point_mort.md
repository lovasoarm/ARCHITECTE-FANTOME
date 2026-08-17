---
stability: perissable_2027
acte: appliquer
---

# 03 : Le ROI technique : chiffrer un refactoring

Temps de lecture ~7 min

Un refactoring ne se vend pas avec "le code est sale". Il se vend avec trois lignes :

- Coût actuel : le temps perdu par mois, mesuré, pas ressenti.
- Coût du chantier : jours-homme, plus le risque de régression.
- Point mort : au bout de combien de mois l'investissement est remboursé.

```
temps perdu : 6 h/mois de contournement
chantier    : 10 jours
point mort  : 10 j / (6 h/mois) ~ 13 mois --> à ne faire que si
              le module doit vivre plus de 13 mois. Sinon, on documente
              le contournement et on passe à autre chose.
```

Risque réel : un Staff Engineer qui demande un refactoring sans point mort obtient un non. Le même qui arrive avec un point mort de 5 mois obtient un oui presque toujours.

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** Le point mort d'un refactoring est le nombre de mois au bout duquel le temps économisé rembourse le temps investi. C'est une division, pas une conviction : coût du chantier divisé par gain mensuel mesuré.

**Pourquoi.** Aucune direction ne refuse un investissement remboursé en cinq mois, et aucune direction n'accepte un chantier dont personne ne sait dire quand il se rembourse. La phrase "le code est sale" décrit ton confort ; la phrase "on perd six heures par mois et le chantier se rembourse en treize mois" décrit une décision d'entreprise. Ce sont deux métiers différents, et le second est celui d'un Staff Engineer.

**Quand.** Avant de demander l'autorisation, jamais après avoir commencé. Un refactoring déjà entamé qu'on cherche à justifier est un chantier qu'on défend, pas qu'on arbitre, et cela s'entend immédiatement dans la voix de celui qui le présente.

**Comment, en cinq gestes.**

1. Mesure le gain, ne l'estime pas : pendant une semaine réelle, note chaque interruption causée par la zone concernée, en minutes.
2. Multiplie par quatre pour obtenir un ordre de grandeur mensuel, et écris explicitement que c'est une extrapolation d'une semaine.
3. Chiffre le chantier en jours, puis ajoute la provision de régression : entre 20 et 40 % selon la couverture de tests réelle de la zone.
4. Divise, et obtiens le point mort en mois.
5. Compare le point mort à la durée de vie restante attendue du module. Si la durée de vie est inférieure au point mort, la bonne décision est de documenter le contournement et de ne rien refactorer.

## SCHÉMA : LA DÉCISION EN UNE SEULE COMPARAISON

```
cout du chantier (jours) + provision de regression
                    |
                    v
             POINT MORT (mois) = cout / gain mensuel
                    |
      +-------------+--------------------------+
      |                                        |
point mort < duree de vie restante      point mort >= duree de vie
      |                                        |
      v                                        v
on refactore, et on l'ecrit dans un ADR   on documente le contournement
avec la date de verification du gain      et on note la dette (lecon 04)
```

## EXEMPLE MINIMAL

```js
const pointMortEnMois = (joursChantier, heuresPerduesParMois) =>
  (joursChantier * 7) / heuresPerduesParMois;

pointMortEnMois(10, 6); // ~11.7 mois
```

## EXEMPLE RÉALISTE

```js
// avec provision de régression et durée de vie du module
const decisionRefactoring = ({ jours, heuresParMois, couvertureTests, dureeVieMois }) => {
  const provision = couvertureTests > 0.7 ? 1.2 : 1.4;
  const pointMort = (jours * provision * 7) / heuresParMois;
  return {
    pointMort: Number(pointMort.toFixed(1)),
    decision: pointMort < dureeVieMois ? "on refactore" : "on documente et on note la dette",
  };
};

decisionRefactoring({ jours: 10, heuresParMois: 6, couvertureTests: 0.4, dureeVieMois: 9 });
// { pointMort: 16.3, decision: "on documente et on note la dette" }
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// le refactoring vendu par le ressenti
const argument = "ce module est illisible, il faut le reprendre";
// Trois conséquences observables, dans cet ordre : la demande est
// reportée au trimestre suivant, la zone continue de coûter six heures
// par mois sans que personne ne le sache, et la personne qui a demandé
// finit par le faire en cachette le week-end. Ce dernier point est le
// vrai dégât : un chantier non arbitré devient un chantier non testé,
// non documenté, et connu d'une seule personne.
```

## PIÈGE CLASSIQUE

Le piège est de compter le gain en confort et non en interruptions. Le confort ne se chiffre pas et ne convainc personne. Ce qui se chiffre, c'est le temps de compréhension avant chaque modification, le nombre d'incidents provenant de la zone, et le délai moyen d'une correction dans cette zone. Trois chiffres, tous relevables en une semaine.

Second piège : oublier que le point mort dépend d'une hypothèse de durée de vie. Un module qui sera remplacé dans six mois ne mérite aucun refactoring, même si le code est objectivement mauvais. Refactorer du code condamné est la forme la plus coûteuse du plaisir technique.

## DEUX ANALOGIES

Changer les pneus d'un véhicule qu'on va garder trois ans : l'investissement est évident. Où l'analogie casse : les pneus ont un prix affiché et une durée annoncée par le fabricant, alors que ton gain mensuel doit être mesuré par toi, sur ton propre code, et personne ne te fournira ce chiffre.

Un joueur de football qui se fait opérer en fin de saison plutôt qu'en pleine compétition : la décision se prend en comparant le temps d'indisponibilité au temps de carrière restant. Où l'analogie casse : le joueur ne peut pas décider de ne pas guérir, alors que tu peux parfaitement décider de vivre avec la douleur du code jusqu'à sa suppression, et c'est souvent la décision correcte.

## RÉSUMÉ

Un refactoring se vend par une division, pas par un adjectif. Mesure le temps perdu sur une semaine réelle, chiffre le chantier avec sa provision de régression, divise, et compare le point mort à la durée de vie restante du module. Le résultat le plus utile de ce calcul est souvent un refus : la moitié du code qui te dérange ne mérite pas d'être réparé, il mérite d'être documenté comme dette avec une date. Et la décision, oui ou non, se conclut toujours dans un ADR daté.

## LES TROIS CHIFFRES À RELEVER PENDANT UNE SEMAINE

Le calcul du point mort ne vaut que si son numérateur vient d'une mesure. Voici le relevé minimal, tenu dans un simple fichier texte, une ligne par événement.

| Chiffre à relever | Comment le relever | Piège de mesure |
| --- | --- | --- |
| Temps de compréhension avant modification | Chronomètre lancé à l'ouverture du fichier, arrêté à la première ligne écrite | Ne pas compter le temps passé à lire la demande métier |
| Incidents provenant de la zone | Compter les tickets dont la cause finale est dans la zone | Ne pas compter les incidents déclenchés ailleurs et révélés ici |
| Délai de correction dans la zone | De la reproduction confirmée à la mise en production | Ne pas y inclure les délais d'attente de validation externe |

Une semaine de relevé suffit pour un ordre de grandeur, et un ordre de grandeur suffit pour décider. Ce qui ne suffit pas, c'est zéro relevé.

## CE QUE LE POINT MORT NE CAPTURE PAS

Deux effets échappent au calcul, et il faut les nommer à l'oral plutôt que les faire entrer de force dans le chiffre. Le premier est le risque de départ : si une seule personne comprend la zone, le coût réel d'un incident dépend de son calendrier de vacances. Le second est l'effet de blocage : une zone que personne n'ose toucher fait dévier les nouvelles fonctionnalités autour d'elle, ce qui produit une dette latérale invisible dans le relevé.

La bonne pratique consiste à présenter le point mort comme le chiffre principal, puis ces deux effets comme deux phrases séparées, explicitement non chiffrées. Un dossier qui distingue ce qui est mesuré de ce qui est argumenté gagne en crédibilité ; un dossier qui mélange les deux perd sur les deux tableaux.

## Exercice

**Exercice (20 min).** Choisis la partie la plus pénible de ton code. Mesure sur une semaine réelle le temps que tu perds à cause d'elle. Calcule le point mort. Décide, et écris la décision dans un ADR.
