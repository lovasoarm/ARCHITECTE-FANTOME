# 01 : Lire une roadmap produit sans se faire avoir

Temps de lecture ~8 min

Intuition : une roadmap produit se lit comme une feuille de match. Elle annonce une intention, pas un résultat. Ce qui compte, ce sont les hypothèses non écrites : ce que l'équipe croit vrai sans l'avoir vérifié.

## Trois questions à poser à chaque ligne de roadmap

1. Quelle hypothèse cette ligne suppose vraie, et comment on la vérifie pour moins cher que de la construire.
2. Qu'est-ce qui devient impossible ou beaucoup plus cher si on la fait maintenant.
3. Qu'est-ce qui se casse si on la retire complètement.

```
ligne de roadmap : "ajouter un système de recommandations"

hypothèse cachée : les utilisateurs reviennent assez souvent pour
                    qu'un historique existe et vaille la peine
vérif moins chère : compter le taux de retour à 7 jours avant de coder
si on la retire  : rien ne casse -> c'est un pari, pas un besoin
```

Risque réel : la ligne de roadmap la plus dangereuse est celle que personne ne conteste, parce que personne ne l'a comprise. Le silence en réunion de planning n'est pas un accord, c'est souvent une absence de lecture.

## Lire une roadmap en trois passes

```js
// passe 1 : minimal, on lit les titres
const lignes = roadmap.map(l => l.titre);
```

```js
// passe 2 : réaliste, on extrait l'hypothèse et son coût de vérification
const analyse = roadmap.map(l => ({
  titre: l.titre,
  hypothese: l.hypothese ?? "non écrite -> à demander en réunion",
  coutVerif: l.coutVerif ?? null,
}));
```

```js
// qui casse : accepter une ligne sans hypothèse écrite
const decision = "on fait"; // sans savoir ce qu'on vérifie, la moitié
// des lignes livrées ne servent à personne six mois plus tard, et
// personne ne peut dire pourquoi puisque rien n'a été écrit avant.
```

Explication technique : une roadmap n'est pas un contrat de livraison, c'est une liste de paris ordonnés par confiance décroissante. Un Staff Engineer qui la lit littéralement construit ce qu'on lui demande. Un Staff Engineer qui la lit par ses hypothèses construit ce qui a des chances de compter.

## Le format "hypothèse - vérification - coût"

Avant d'accepter une ligne dans ton sprint, exige ou écris toi-même ces trois champs :

| Ligne | Hypothèse non écrite | Vérification la moins chère | Coût de la vérification |
| --- | --- | --- | --- |
| Export PDF des factures | des clients le demandent assez pour justifier le développement | sondage à 20 clients existants, ou compter les demandes support déjà reçues | 1 jour |
| Mode hors ligne | les utilisateurs perdent la connexion assez souvent pour que ça compte | instrumenter le taux de perte de connexion réel pendant 2 semaines | 2 jours d'instrumentation |

Si personne ne peut remplir la troisième colonne, la ligne n'a pas été pensée : elle a été décidée par intuition et habillée en priorité.

## QUOI, POURQUOI, QUAND, COMMENT

**Quoi.** Lire une roadmap par ses hypothèses veut dire transformer chaque ligne de titre en une phrase falsifiable : "nous croyons que X est vrai, et si X est faux, cette ligne ne sert à rien". Tant qu'une ligne reste un titre, elle est incontestable, donc indiscutable, donc non pilotable.

**Pourquoi.** Une roadmap est un document politique avant d'être un document technique. Elle porte la trace de qui a parlé le plus fort en réunion, pas la trace de ce qui a été vérifié. Le seul levier d'un Staff Engineer sur ce document est de rendre visible ce qu'il suppose : personne ne peut défendre publiquement une hypothèse qu'il refuse d'écrire.

**Quand.** À trois moments précis, et pas en continu : au moment où la roadmap est proposée (avant que les dates soient annoncées à l'extérieur), au moment où une ligne entre dans un sprint, et au moment où une ligne est reportée pour la deuxième fois. Le troisième moment est le plus rentable : une ligne reportée deux fois cache presque toujours une hypothèse fausse que personne n'a osé nommer.

**Comment, en quatre gestes.**

1. Recopie la ligne telle quelle, sans la reformuler. La reformulation est déjà une interprétation.
2. Écris la phrase "cette ligne suppose que ...", au présent, avec un sujet et un verbe.
3. Cherche la vérification la moins chère qui rendrait l'hypothèse fausse en moins de deux jours.
4. Chiffre le coût de cette vérification, et compare-le au coût de construction complet. Le rapport entre les deux est ton argument, pas ton avis.

## SCHÉMA : DE LA LIGNE DE ROADMAP À LA DÉCISION

```
ligne de roadmap
      |
      v
"cette ligne suppose que ..."   <-- si tu n'arrives pas à l'écrire,
      |                             la ligne n'a pas été pensée
      v
vérification la moins chère --> coût de vérif (heures)
      |
      +--> coût de vérif < 10 % du coût de construction
      |         --> on vérifie d'abord, toujours
      |
      +--> coût de vérif >= coût de construction
                --> on construit la version la plus petite
                    qui produit la mesure elle-même
```

## EXEMPLE MINIMAL

```js
// une ligne de roadmap devient un objet falsifiable
const ligne = {
  titre: "tableau de bord temps reel pour les equipes de nuit",
  suppose: "les equipes de nuit consultent un ecran pendant leur poste",
  verif: "compter les connexions entre 22h et 6h sur 14 jours",
  coutVerifHeures: 4,
  coutConstructionJours: 12,
};
```

## EXEMPLE RÉALISTE

```js
// on ordonne la roadmap par ratio de vérification, pas par enthousiasme
const parRentabiliteDeVerification = roadmap
  .map((l) => ({
    ...l,
    ratio: l.coutVerifHeures / (l.coutConstructionJours * 7),
  }))
  .sort((a, b) => a.ratio - b.ratio);

// la première ligne du tableau est celle où quatre heures de mesure
// peuvent économiser douze jours de construction : c'est celle-là
// qu'on présente en réunion, pas celle qui te plaît le plus.
```

## CONTRE-EXEMPLE : CE QUI CASSE

```js
// ce que fait un ingénieur qui veut avoir raison plutôt que décider
const avis = "ce truc ne servira a rien";
// aucune hypothèse nommée, aucune mesure proposée, aucun coût.
// Résultat observable : la ligne est construite quand même, parce
// qu'une opinion sans chiffre perd toujours contre une intention
// portée par quelqu'un de plus haut placé. L'ingénieur en conclut
// qu'on ne l'écoute pas ; en réalité il n'a rien donné à écouter.
```

## PIÈGE CLASSIQUE

Le piège n'est pas de manquer d'hypothèses : c'est d'en écrire une invérifiable. "Les gens aimeront cette fonctionnalité" ne se vérifie pas. "Au moins 30 % des comptes actifs ouvrent cet écran deux fois par semaine" se vérifie, et surtout se réfute. Une hypothèse qu'aucune mesure ne peut faire tomber est une croyance déguisée en méthode, et elle coûte plus cher qu'une absence d'hypothèse parce qu'elle donne l'illusion du sérieux.

Second piège, plus discret : vérifier l'hypothèse la plus facile à mesurer plutôt que la plus coûteuse si elle est fausse. L'ordre de vérification suit le risque, jamais la commodité de l'instrumentation.

## DEUX ANALOGIES

Un scout de football qui regarde un match : il ne note pas les buts, il note les courses sans ballon, parce que ce sont elles qui prédisent la suite. Où l'analogie casse : le scout observe un joueur qui existe déjà, alors que tu évalues une fonctionnalité qui n'existe pas encore et dont la mesure doit être fabriquée avant de servir.

Le plan d'évasion de Prison Break : chaque étape repose sur une hypothèse précise (ce tuyau passe, ce gardien tourne à cette heure), et chaque hypothèse est testée en amont, séparément, pour un coût très inférieur à celui de l'évasion elle-même. Où l'analogie casse : dans la série, une hypothèse fausse tue le plan d'un coup ; dans un produit, une hypothèse fausse ne tue rien du tout, elle produit une fonctionnalité tiède que personne n'ose retirer.

## RÉSUMÉ

Une roadmap ne se conteste pas ligne par ligne : elle se traduit hypothèse par hypothèse. Une ligne dont personne ne sait écrire l'hypothèse est une ligne non pensée, et la nommer publiquement est plus efficace que la refuser. Ce qui fait basculer une décision, c'est le rapport entre le coût de la vérification et le coût de la construction, présenté sur une seule page. La compétence à acquérir ici n'est pas de dire non, c'est de rendre le pari visible avant que la date ne soit annoncée à l'extérieur.

## Exercice

**Exercice (15 min).** Prends la roadmap réelle ou fictive de ton projet fil rouge. Choisis les trois lignes les plus hautes en priorité. Pour chacune, écris l'hypothèse non écrite, sa vérification la moins chère, et son coût. Si tu ne trouves pas d'hypothèse à une ligne, c'est qu'elle est soit évidente (rare), soit non pensée (fréquent) : marque-la et pose la question en réunion suivante.
