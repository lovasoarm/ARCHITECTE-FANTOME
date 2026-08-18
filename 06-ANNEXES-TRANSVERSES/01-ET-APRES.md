# ANNEXE : et après ? Spécialisations et signaux de progression

## Choisir une spécialisation sans se piéger

Une spécialisation utile est un endroit où tu absorbes de la complexité que les autres ne veulent
pas absorber. Ce n'est pas un langage, c'est un type de problème.

```text
TYPE DE PROBLEME              CE QUE TU ABSORBES               SIGNE QUE C'EST FAIT POUR TOI
----------------------------  -------------------------------  ------------------------------
Données et modélisation       le temps, l'historique, la        tu aimes les cas limites
                              cohérence                         métier
Fiabilité / production        la panne partielle, la charge     les incidents t'intéressent
                                                                plus qu'ils ne t'angoissent
Produit / cadrage             l'ambiguïté du besoin             tu poses les questions que
                                                                personne n'ose poser
Performance                   la mesure, les budgets            tu ne crois pas une intuition
                                                                sans profil
Plateforme / outillage        la friction des autres devs       tu automatises ton propre
                                                                agacement
```

Reste généraliste au moins deux ans avant de choisir. Une spécialisation prématurée te rend fragile
au changement de marché.

## Signaux de progression, dans l'ordre

1. Tu finis ce que tu commences. (Beaucoup de devs ne dépassent jamais ce point.)
2. Tu détectes une mauvaise idée avant de l'implémenter, et tu sais dire pourquoi.
3. Tu chiffres un compromis au lieu de le trancher au feeling.
4. Tu conçois pour le changement probable, pas pour tous les changements possibles.
5. On te consulte avant les décisions, pas après.
6. Tes absences ne bloquent pas l'équipe : tes décisions sont écrites.

Le passage 3 -> 4 est le plus dur : c'est là qu'on sur-généralise et qu'on fabrique de l'abstraction
inutile. Relis `06-ARCHI-LAB/05-choosing-architecture.md` chaque fois que tu sens venir un framework
maison.

## Ce qu'il faut lire ensuite

Pas de bibliographie de cent titres. Quatre livres, dans cet ordre, un par trimestre :

- _A Philosophy of Software Design_ (Ousterhout) : pour la profondeur des modules.
- _Designing Data-Intensive Applications_ (Kleppmann) : pour les données et la fiabilité.
- _Accelerate_ (Forsgren, Humble, Kim) : pour comprendre ce qui fait vraiment livrer une équipe.
- _Thinking in Systems_ (Meadows) : pour sortir de l'informatique et voir les boucles.

Lis-les en appliquant sur ton projet fil rouge. Un livre lu sans mise en pratique s'oublie en six
semaines.

## Le test final, à refaire tous les ans

Prends une décision technique que tu as prise il y a un an. Peux-tu :
la retrouver écrite, citer l'alternative écartée, dire si le critère de révision a été atteint ?

Trois oui : tu progresses. Sinon, tu accumules du kilométrage sans apprendre.

## Ton portfolio a deux pièces, pas une

Le parcours produit un projet fil rouge très profond sur un seul domaine. Un CTO exigeant y voit
de la rigueur et zéro preuve d'adaptabilité. La deuxième pièce existe déjà : c'est le **rapport
d'exploration du niveau 11**, produit sur un dépôt réel que tu n'as pas écrit
([11-BIG-APP-SNOOP/challenge.md](../04-EPREUVE/05-BIG-APP-SNOOP/challenge.md)). Traite-le comme une pièce de
portfolio à part entière, pas comme un exercice interne.

| Pièce | Ce qu'elle prouve | Ce qu'elle ne prouve pas |
| --- | --- | --- |
| Projet fil rouge (niveaux 02 à 12) | tu conduis un projet du besoin flou à la livraison, et tu assumes tes décisions | que tu sais entrer dans du code que tu n'as pas écrit |
| Rapport d'exploration (niveau 11) | tu cartographies 50 000 lignes inconnues en 3 h et tu reconstitues des intentions | que tu sais construire de zéro |
| `TRANSFERT.md` (niveau 13) | tes réflexes survivent au changement d'écosystème | rien de plus : c'est une preuve ciblée |

## Format du dépôt public de sortie

Un label ne vaut que s'il est vérifiable par un tiers en trois minutes. Publie un dépôt unique,
avec cette arborescence imposée, et mets **ce lien** sur ton CV, pas la mention seule :

```text
mon-parcours-projectfunny/
  README.md                 synthèse 1 page : le projet, les 5 décisions dont tu es fier,
                            ce que tu ferais autrement, la durée réelle et les dates
  01-cahierdescharges.md    le besoin, les non-objectifs, les métriques de succès
  02-ADR/                   les décisions datées, une par fichier, conséquences négatives incluses
  03-schema-et-api/         modèle de données + contrat d'API
  04-POSTMORTEM.md          un incident réel, chronologie horodatée
  05-REVUE-DE-RISQUES.md    sécurité, coûts, données personnelles, signée et datée
  06-rapport-exploration/   le rapport du niveau 11, sur un dépôt que tu n'as pas écrit
  07-TRANSFERT.md           la preuve de transfert du niveau 13
  RETRO-FINALE.md           ta note sur 20 par bloc et ce que tu en as tiré
  src/ tests/               le code, avec la commande exacte pour le lancer
```

Règles de recevabilité, non négociables : chaque artefact est **daté**, chaque ADR porte ses
conséquences négatives, le `README.md` de synthèse tient sur une page et ne contient aucun
adjectif d'auto-promotion. Un recruteur doit pouvoir ouvrir trois fichiers au hasard et y trouver
une décision justifiée avec son coût. C'est ça, le label : une structure lisible, pas un badge.
