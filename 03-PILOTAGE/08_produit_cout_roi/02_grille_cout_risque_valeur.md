---
stability: perissable_2027
acte: appliquer
---

# 02 : La grille coût / risque / valeur

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans ce fichier, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle.

Temps de lecture ~7 min

```
             VALEUR faible        VALEUR forte
COÛT faible  à faire si gratuit   à faire tout de suite
COÛT fort    à refuser par écrit  à découper avant de s'engager
```

```js
// minimal : un score n'est utile que si ses composantes sont visibles
const score = (valeur, cout, risque) => valeur / (cout * risque);
```

```js
// réaliste : chaque composante est chiffrée avec sa source
const option = {
  valeur: 40_000,   // gain annuel estimé par le métier, pas par toi
  cout: 12_000,     // jours-homme + cloud sur 12 mois
  risque: 1.6,      // multiplicateur assumé : dépendance externe non testée
};
```

```js
// qui casse : le score sans les composantes
const score = 3.2; // personne ne peut contester un chiffre dont
// on ne voit pas la source, donc personne n'y croit, donc la décision
// se reprend au feeling en réunion trois semaines plus tard.
```

Explication technique : un arbitrage se défend par ses hypothèses, pas par son résultat. Publie toujours les trois nombres et leur origine, sur une seule page.

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** La grille coût / risque / valeur est un format d'écriture d'arbitrage, pas une formule. Elle impose trois nombres, chacun avec sa source nommée, et une phrase de décision. Son produit final tient sur une page et se lit en deux minutes par quelqu'un qui n'a pas assisté à la discussion.

**Pourquoi.** Un arbitrage non écrit se rejoue. Il se rejoue en réunion, il se rejoue en couloir, et il se rejoue surtout six semaines plus tard quand la personne qui avait perdu revient avec le même sujet et plus d'énergie. Trois nombres sourcés ne rendent pas la décision juste : ils la rendent contestable sur le bon terrain, celui des hypothèses, et c'est exactement ce qui l'empêche d'être rejouée à l'humeur.

**Quand.** Dès qu'une décision engage plus de cinq jours de travail, ou dès qu'elle est irréversible à moins de trois mois. En dessous, la grille coûte plus cher que la décision : l'écrire quand même est un signal de bureaucratie, et une équipe qui te voit chiffrer un choix de deux heures cessera de te lire quand tu chiffreras un choix de deux mois.

**Comment, en quatre gestes.**

1. Écris la valeur en euros par an, avec le nom de la personne qui te l'a donnée. Si personne ne peut la donner, écris "non chiffrée par le métier" : c'est une information, pas un trou.
2. Écris le coût complet sur douze mois : jours-homme au taux réel, plus l'infrastructure, plus la maintenance estimée. Le coût de maintenance oublié est la cause la plus fréquente d'un arbitrage faux.
3. Écris le risque comme un multiplicateur assumé, entre 1 et 3, avec la raison en une ligne. Un multiplicateur sans raison écrite est un chiffre magique.
4. Écris la décision et son signal de réouverture : à quel événement précis on rouvre le dossier.

## SCHÉMA : LA GRILLE ET SES QUATRE SORTIES

```
                VALEUR faible              VALEUR forte
             +--------------------------+--------------------------+
COÛT faible  | à faire si c'est gratuit | à faire tout de suite    |
             | (sinon on ne fait rien)  | (et à mesurer après)     |
             +--------------------------+--------------------------+
COÛT fort    | à refuser PAR ÉCRIT      | à découper avant tout    |
             | avec les trois nombres   | engagement de date       |
             +--------------------------+--------------------------+

risque = multiplicateur applique au COÛT, jamais a la VALEUR
         (on ne gonfle pas un gain espere pour se rassurer)
```

## EXEMPLE MINIMAL

```js
// trois nombres, trois sources, une décision
const arbitrage = {
  option: "file de traitement dediee pour les lots de nuit",
  valeurAnnuelle: 40_000, // source : direction des operations, 12/03
  cout12Mois: 12_000,     // source : 15 j-h a 600 EUR + 3 000 EUR d'infra
  risque: 1.6,            // dependance externe jamais testee en charge
  decision: "on fait, en deux tranches",
  reouverture: "si le volume de nuit double avant juin",
};
```

## EXEMPLE RÉALISTE

```js
// le coût réel inclut la maintenance : c'est la ligne qu'on oublie
const coutComplet = (jours, tauxJour, infraMensuelle, maintenanceMensuelle) =>
  jours * tauxJour + 12 * (infraMensuelle + maintenanceMensuelle);

coutComplet(15, 600, 250, 400); // 16 800 EUR, pas 9 000
// L'écart entre 9 000 et 16 800 est la différence entre un arbitrage
// qui tient douze mois et un arbitrage qu'on rouvre en octobre.
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// le score opaque : la façon la plus élégante de perdre un arbitrage
const score = 3.2;
// Personne ne voit la valeur, ni le coût, ni le risque. Deux effets
// mesurables : la décision est acceptée sans être comprise, puis
// abandonnée sans être discutée. Et le jour où quelqu'un arrive avec
// un score de 4.1 calculé autrement, tu n'as aucun terrain pour
// répondre, parce que ton propre chiffre n'a pas de composantes.
```

## PIÈGE CLASSIQUE

Le piège majeur est de chiffrer la valeur soi-même. Un ingénieur qui estime la valeur métier de sa propre proposition produit un chiffre que personne du métier ne reconnaîtra, et le premier désaccord fera tomber la grille entière. La règle tient en une phrase : la valeur vient du métier, le coût vient de toi, le risque se négocie à deux.

Piège secondaire : refuser à l'oral. Un refus non écrit n'existe pas. Trois mois plus tard, la version de l'histoire qui reste est celle de la personne qui a écrit.

## DEUX ANALOGIES

Le mercato d'un club de football : on ne recrute pas le meilleur joueur disponible, on recrute celui dont le rapport entre le salaire, le risque de blessure et l'apport au poste est défendable devant le conseil d'administration. Où l'analogie casse : un club peut revendre un joueur, alors qu'une fonctionnalité livrée ne se revend pas et se paie en maintenance jusqu'à sa suppression.

La comptabilité d'un dealer prudent dans Breaking Bad : chaque décision se mesure en argent gagné, en risque d'exposition et en temps immobilisé, et celle qui paraît la plus rentable est souvent celle qui expose le plus. Où l'analogie casse : là le risque est binaire et personnel, alors qu'en ingénierie le risque est graduel et se partage avec l'équipe qui reprendra le code.

## RÉSUMÉ

Un arbitrage se défend par ses composantes, jamais par son résultat. Trois nombres sourcés sur une page battent n'importe quel score agrégé, parce qu'ils déplacent la discussion des personnes vers les hypothèses. La valeur appartient au métier, le coût t'appartient et doit inclure la maintenance, le risque est un multiplicateur qu'on assume par écrit. Et un refus qui n'est pas écrit n'a pas eu lieu.

## LA PAGE D'ARBITRAGE, GABARIT EXACT

Un arbitrage utile tient dans ce gabarit, et rien de plus. Copie-le tel quel dans ton dépôt sous `DECISION-ARBITRAGE.md` : c'est la famille S4 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md).

```
# Arbitrage : <une phrase, verbe a l'infinitif>
Date : <jj/mm>   Decideur : <nom>   Consulte : <noms>

## Options examinees (au moins deux, dont celle qu'on rejette)
| Option | Valeur/an (source) | Cout 12 mois | Risque | Decision |
| ------ | ------------------ | ------------ | ------ | -------- |

## Ce que l'option rejetee avait de mieux
<une a trois lignes honnetes : si tu n'y arrives pas, tu n'as pas
 examine l'option, tu l'as habillee pour la perdre>

## Ce qu'on accepte de perdre
<le sacrifice explicite : delai, perimetre, confort d'equipe>

## Signal de reouverture
<evenement observable, pas une date de confort>
```

La section "ce que l'option rejetée avait de mieux" est celle qui distingue une décision d'une justification. Un jury de soutenance la lit en premier, et un ADR qui ne la contient pas est un communiqué.

## TROIS ERREURS DE CHIFFRAGE QUI REVIENNENT TOUJOURS

1. Le coût en jours-homme sans le taux journalier : un chiffre en jours ne parle qu'à l'équipe, un chiffre en euros parle à la personne qui décide.
2. La valeur exprimée en gain de temps interne sans conversion : "on gagnera deux heures par semaine" devient défendable seulement écrit "environ 5 200 euros par an à taux plein".
3. Le risque appliqué à la valeur au lieu du coût : gonfler un gain espéré pour compenser une incertitude produit un dossier qui se retourne contre toi dès la première question sérieuse.

## Exercice

**Exercice (15 min).** Prends une fonctionnalité que tu as envie de construire dans ton projet fil rouge. Écris le refus en cinq lignes, avec les trois nombres de la grille. Si tu n'arrives pas à écrire le refus, c'est que tu n'as pas chiffré la valeur.
