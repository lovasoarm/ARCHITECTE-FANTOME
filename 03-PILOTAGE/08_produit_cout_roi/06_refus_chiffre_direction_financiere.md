---
stability: perissable_2027
acte: appliquer
---

# 06 : Tenir un refus chiffré face à la direction financière

Temps de lecture ~7 min

Une direction financière ne discute pas une intuition, elle discute un chiffre. Tenir un refus, c'est répondre à la pression par un chiffre plus précis que celui qu'on te oppose, jamais par une opinion plus ferme.

```
DAF : "on coupe 20% du budget cloud ce trimestre, point."

réponse faible  : "c'est risqué, on ne peut pas."
réponse tenable : "20% de coupe fait passer notre budget d'erreur de
                    99.9% à 99.5%, soit environ 4h de coupure en plus
                    par mois sur le service de traitement des lots. Voici deux
                    options qui coupent 12% sans toucher au SLO,
                    et une troisième qui atteint 20% en dégradant
                    explicitement le SLO du module non critique X."
```

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** Tenir un refus chiffré veut dire répondre à une contrainte budgétaire par des options mesurées et une recommandation assumée, sans jamais contester le principe de la contrainte. Le refus ne porte pas sur la demande, il porte sur la version de la demande qui casse quelque chose de mesurable.

**Pourquoi.** Une direction financière ne t'oppose pas une opinion : elle t'oppose un objectif chiffré qui lui a été donné. Y répondre par une inquiétude produit toujours le même résultat, la coupe est appliquée telle quelle et tu récupères l'incident trois mois plus tard. Y répondre par deux options chiffrées déplace le sujet : la question n'est plus "coupe-t-on", elle devient "que choisit-on de dégrader", et cette deuxième question a une réponse écrite, signée, et opposable.

**Quand.** Dans les vingt-quatre heures, et par écrit. Un refus donné à chaud en réunion se perd, un refus donné deux semaines plus tard arrive après la décision. La fenêtre est courte et elle se referme sans avertissement.

**Comment, en cinq gestes.**

1. Reformule la contrainte telle qu'elle t'a été donnée, en la validant explicitement. Cette phrase désarme la moitié de la tension.
2. Traduis la coupe demandée en effet mesurable : budget d'erreur consommé, latence, délai de traitement, capacité maximale.
3. Propose une option qui atteint une partie de l'objectif sans toucher au seuil critique.
4. Propose une option qui atteint la totalité de l'objectif, en nommant précisément ce qui sera dégradé et sur quel périmètre.
5. Recommande l'une des deux, en une phrase, et signe. Une note à deux options sans recommandation est une manière polie de renvoyer la décision, et elle sera lue comme telle.

## SCHÉMA : L'ARCHITECTURE D'UNE NOTE DE REFUS QUI TIENT

```
1. "L'objectif de -20 % est compris et legitime."   <- validation
2. "Applique tel quel, il consomme le budget
    d'erreur du service de traitement des lots :
    de 99.9 % a 99.5 %, soit ~4 h d'indisponibilite
    supplementaire par mois."                       <- effet mesurable
3. Option A : -12 %, aucun seuil critique touche
4. Option B : -20 %, SLO du module secondaire Y
              abaisse a 99.0 %, par ecrit
5. "Je recommande A, et B au trimestre suivant
    si l'objectif est maintenu."                    <- recommandation signee
```

## EXEMPLE MINIMAL

```js
const effetSurBudgetErreur = (sloAvant, sloApres) => {
  const minutesParMois = 30 * 24 * 60;
  return Math.round(minutesParMois * (sloAvant - sloApres) / 100);
};

effetSurBudgetErreur(99.9, 99.5); // 173 minutes de plus par mois
```

## EXEMPLE RÉALISTE

```js
// on présente les deux options avec le même calcul, pas deux méthodes
const option = (nom, coupePourcent, sloApres) => ({
  nom,
  coupePourcent,
  minutesIndispoAjoutees: effetSurBudgetErreur(99.9, sloApres),
});

const notes = [option("A", 12, 99.9), option("B", 20, 99.0)];
// A : 0 minute ajoutee. B : 389 minutes ajoutees par mois.
// Le tableau se lit sans explication orale, ce qui est le seul
// critere de qualite d'une note envoyee a quelqu'un qui n'assistera
// pas a la reunion suivante.
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// le refus émotionnel, dans sa forme la plus courante
const reponse = "c'est risque, on ne peut pas faire ca.";
// Deux effets, systématiques. Premier effet : la coupe est appliquée
// intégralement, parce qu'un objectif chiffré gagne toujours contre
// une inquiétude. Second effet, plus durable : la prochaine fois,
// tu ne seras pas consulté avant, mais informé après, parce que la
// consultation n'a rien produit d'exploitable.
```

## PIÈGE CLASSIQUE

Le piège est de contester le principe. Dès que tu discutes la légitimité de l'objectif budgétaire, tu quittes ton terrain, où tu es le seul à savoir, pour entrer sur le sien, où tu ne sais rien. La phrase de validation initiale n'est pas de la diplomatie, c'est une manoeuvre : elle maintient la discussion sur les conséquences techniques, seul endroit où ton avis a du poids.

Second piège : ne proposer qu'une seule option, celle que tu préfères. Une option unique se lit comme un refus déguisé, et la réaction naturelle est de l'ignorer. Deux options, dont une qui atteint réellement l'objectif demandé, prouvent que tu as cherché à résoudre le problème de ton interlocuteur, et pas seulement à protéger le tien.

Troisième piège : chiffrer sans nommer le périmètre dégradé. "On dégraderait la fiabilité" ne veut rien dire. "Le module secondaire Y passerait à 99.0 %, ce qui représente environ six heures d'indisponibilité par mois sur un service utilisé par trois équipes internes" est une phrase qu'une direction peut accepter en connaissance de cause.

## DEUX ANALOGIES

Un entraîneur à qui l'on impose de vendre un joueur : il ne répond pas "impossible", il répond "voici les deux joueurs vendables, voici le poste qui devient fragile dans chaque cas, et voici celui que je recommande". Où l'analogie casse : l'entraîneur négocie devant un public et une presse qui arbitrent aussi, alors que ta note est lue par trois personnes en silence.

Le comptable de Breaking Bad expliquant qu'une somme trop grosse ne peut pas être blanchie ce mois-ci : il ne dit pas non, il donne le plafond, le délai, et le risque de chaque option. Où l'analogie casse : ses chiffres sont vérifiables immédiatement, alors que ton estimation d'indisponibilité future repose sur un historique que ton interlocuteur ne peut pas contrôler, ce qui t'oblige à citer la source de la mesure.

## RÉSUMÉ

Un refus tenable valide le principe, chiffre l'effet, propose deux options dont une qui atteint vraiment l'objectif, et recommande par écrit en moins de vingt-quatre heures. Ce qui se refuse n'est jamais la demande : c'est la version non arbitrée de la demande. Une note sans recommandation renvoie la décision, une note à option unique se lit comme un blocage, et un refus sans chiffre garantit que la prochaine décision se prendra sans toi.

## Exercice

**Exercice (25 min).** On te demande de réduire ton budget cloud de 20% ce trimestre, sans discussion possible sur le principe. Écris la réponse que tu enverrais par écrit à la direction financière : elle doit contenir au moins deux options chiffrées, l'effet exact de chacune sur le SLO ou la valeur métier, et une recommandation assumée. Une réponse qui ne cite aucun chiffre est un refus émotionnel, pas un refus tenable.
