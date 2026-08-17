---
stability: perissable_2027
acte: appliquer
---

# 04 : Dette technique : une dette, donc un taux

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans ce fichier, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle.

Temps de lecture ~6 min

Toute dette n'est pas mauvaise. Emprunter du temps pour livrer avant un événement fixe est parfois la bonne décision. Ce qui est fautif, c'est la dette non déclarée.

Une dette se déclare en quatre champs : ce qu'on a coupé, pourquoi, ce que ça coûte par mois, et la date à laquelle on rembourse ou on assume définitivement.

Analogies pour retenir : c'est le prêt d'un joueur en fin de mercato, et c'est la carte de crédit qu'on prend en connaissance du taux.

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** Une dette technique déclarée est un raccourci assumé par écrit, avec quatre champs obligatoires : ce qui a été coupé, pourquoi, ce que cela coûte par mois, et la date à laquelle on rembourse ou on assume définitivement. Sans ces quatre champs, ce n'est pas une dette, c'est un défaut.

**Pourquoi.** La différence entre une équipe saine et une équipe qui s'enfonce n'est pas la quantité de dette, c'est sa visibilité. Une dette déclarée est un objet qu'on peut arbitrer, prioriser, et fermer. Une dette silencieuse devient un piège pour la personne suivante, qui la découvrira un vendredi soir en production et perdra deux heures à comprendre qu'il s'agissait d'un choix, pas d'un bug.

**Quand.** Au moment exact où tu prends le raccourci, pas au moment où tu en as le temps. La déclaration coûte cinq minutes le jour du choix et deux heures de reconstitution trois mois plus tard, quand personne ne se souvient du contexte.

**Comment, en quatre gestes.**

1. Nomme le raccourci en une phrase technique précise, avec le chemin du fichier concerné.
2. Écris la raison, et surtout la contrainte externe qui l'a rendue rationnelle : une date fixe, un événement, une indisponibilité.
3. Chiffre le taux : combien de temps par mois ce raccourci coûte à l'équipe, ou quel risque il ajoute, exprimé en probabilité et en impact.
4. Fixe l'échéance et son signal : à cette date, on rembourse, ou on écrit noir sur blanc qu'on assume pour toujours. Les deux sorties sont honorables ; l'absence de sortie ne l'est pas.

## SCHÉMA : LE REGISTRE DE DETTE

```
DETTE-<numero>
  |
  +-- coupe      : "pas de reprise sur echec partiel dans l'export de nuit"
  +-- ou         : outils/export_nuit.js, fonction exporterLot()
  +-- pourquoi   : date de bascule fixee au 12/03, non negociable
  +-- taux       : ~2 h/mois de reprise manuelle + risque de trou de donnees
  +-- echeance   : 30/06
  +-- sortie     : REMBOURSE (on code la reprise) ou ASSUME (on ecrit
                   la procedure manuelle et on ferme la ligne)
```

## EXEMPLE MINIMAL

```js
const dette = {
  id: "DETTE-04",
  coupe: "aucune reprise sur echec partiel de l'export de nuit",
  tauxMensuelHeures: 2,
  echeance: "2026-06-30",
};
```

## EXEMPLE RÉALISTE

```js
// une dette porte son coût cumulé : c'est ce chiffre qui déclenche l'arbitrage
const coutCumule = (dette, moisEcoules, tauxHoraire = 75) =>
  dette.tauxMensuelHeures * moisEcoules * tauxHoraire;

coutCumule({ tauxMensuelHeures: 2 }, 8); // 1 200 EUR
// Présentée comme "2 h par mois", la dette est invisible. Présentée
// comme "1 200 EUR depuis mars, et 150 EUR de plus chaque mois",
// elle entre dans un ordre du jour.
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// la dette non déclarée, dans son habitat naturel
// TODO: gerer le cas d'echec partiel plus tard
// Ce commentaire a trois défauts mesurables : il n'a pas de date, il
// n'a pas de coût, et il n'est visible que par quelqu'un qui ouvre
// déjà ce fichier, c'est-à-dire par quelqu'un qui n'a plus besoin
// d'être averti. Un TODO n'est pas une dette déclarée, c'est un
// aveu privé.
```

## PIÈGE CLASSIQUE

Le piège est la dette sans taux. "On sait qu'il faudra revoir ça" ne crée aucune pression et ne sera jamais priorisé, parce qu'aucun chiffre ne concurrence les demandes du métier. Un taux, même approximatif et marqué comme approximatif, transforme la ligne en candidat d'arbitrage.

Second piège : la dette éternelle par renouvellement d'échéance. Une échéance repoussée trois fois n'est pas une échéance, c'est une décision d'assumer qui refuse de se dire. À la troisième fois, ferme la ligne en "assumé", écris la procédure de contournement, et arrête de payer le coût psychologique d'un remboursement qui n'arrivera pas.

## DEUX ANALOGIES

Le prêt d'un joueur en fin de mercato : on accepte de s'affaiblir maintenant contre une marge de manoeuvre immédiate, avec une date de retour écrite au contrat. Où l'analogie casse : le contrat de prêt est signé par deux parties qui ont intérêt à le respecter, alors qu'une dette technique n'a pour créancier que ta propre équipe, qui peut donc l'oublier sans conséquence immédiate.

Une carte de crédit dont on connaît le taux : emprunter n'est pas la faute, ignorer le taux l'est. Où l'analogie casse : la banque t'envoie un relevé chaque mois, alors que ta dette technique ne t'enverra jamais rien. C'est précisément pour cela que le registre doit être relu à date fixe, par exemple à chaque rétrospective de bloc.

## RÉSUMÉ

Une dette technique n'est pas une faute : la dette silencieuse en est une. Quatre champs suffisent, et le champ décisif est le taux, parce qu'un coût mensuel chiffré est la seule chose qui fasse concurrence aux demandes du métier. Deux sorties sont honorables, rembourser ou assumer par écrit, et repousser trois fois l'échéance équivaut à assumer sans le dire. Un TODO dans le code n'a jamais tenu ce rôle et ne le tiendra jamais.

## LA RELECTURE DU REGISTRE, RITUEL MINIMAL

Un registre de dette non relu se transforme en cimetière en environ deux mois. Le rituel qui le maintient vivant tient en quatre minutes par ligne, à date fixe.

| Question posée à chaque ligne | Sortie possible |
| --- | --- |
| Le taux mensuel est-il toujours le bon ? | On corrige le chiffre, on garde la ligne |
| L'échéance est-elle déjà passée ? | On rembourse maintenant, ou on bascule en assumé |
| A-t-on déjà repoussé deux fois ? | Bascule en assumé, obligatoire, sans nouvelle discussion |
| La zone concernée existe-t-elle encore ? | On ferme la ligne sans rien faire, et c'est une victoire |

La dernière ligne du tableau est la plus fréquente en pratique : une partie non négligeable des dettes se rembourse d'elle-même par suppression du code concerné. C'est une raison de plus de ne jamais rembourser une dette dont l'échéance est postérieure à la date de retrait prévue du module.

## COMMENT PRÉSENTER UN REGISTRE À QUELQU'UN QUI NE CODE PAS

Trois colonnes, jamais plus : ce que ça nous coûte par mois, ce que ça risque de provoquer, et à quelle date on décide. Le contenu technique du raccourci n'a pas sa place dans cette version : il vit dans le registre, pas dans la présentation. Un interlocuteur non technique qui voit un chemin de fichier cesse de lire, et une ligne non lue est une ligne non arbitrée.

## Exercice

**Exercice (15 min).** Traduis ton budget cloud (module [07_cloud_foundations](../07_cloud_foundations/00_why_cloud_foundations.md)) et ton SLO (module [06_fiabilite_slo](../06_fiabilite_slo/00_why_fiabilite_slo.md)) en cinq lignes sans un seul terme technique, qui disent ce que ça coûte, ce que ça évite, et ce qu'on accepte de perdre.
