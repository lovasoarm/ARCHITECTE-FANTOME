# Rétrospective de bloc : Bloc BUILD (niveaux 04 à 07)

[Sommaire](../06-ANNEXES-TRANSVERSES/03-CURRICULUM-HISTORIQUE.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/05-ROADMAP.md) | [Style](.meta/_STYLE.md)

Une rétrospective de bloc n'est pas un bilan de motivation. C'est une opération précise : tu
rouvres un livrable écrit avant d'avoir appris ce que tu sais maintenant, et tu écris ce qui
est désormais faux, et pourquoi ce n'était pas visible à l'époque.

Durée : 60 à 90 minutes. À faire après le boss-fight du niveau 07-API-DOJO, avant d'ouvrir le bloc
suivant. Ne saute pas cette étape : c'est la seule fois du parcours où tu juges ton propre
travail passé avec des yeux différents.

## Contrôle d'antériorité du bloc

Ouvre les livrables des niveaux de ce bloc. Pour chacun, réponds par oui ou par non : ce
document a-t-il été écrit avant que la solution soit décidée ?

Compte les non. Un ou deux non, c'est normal et ça se corrige. Trois non ou plus sur un bloc,
c'est un signal net : tu produis des documents de justification, pas des documents de
décision. Dans ce cas, reprends le livrable le plus récent et refais-le en aveugle, sans
relire ta solution. C'est deux heures. Elles valent les vingt heures du bloc suivant.


## Ce que tu rouvres

- tes flux et états du niveau 04 ([04-USER-WIZARD/challenge.md](./01-USER-WIZARD/challenge.md)),
- ton modèle de données du niveau 05 ([05-DATA-SPELLS/challenge.md](./08-DATA-SPELLS/challenge.md)),
- ton ADR d'architecture du niveau 06 ([06-ARCHI-LAB/challenge.md](./15-ARCHI-LAB/challenge.md)),
- ta spec d'API du niveau 07 ([07-API-DOJO/challenge.md](./20-API-DOJO/challenge.md)).

Tu les rouvres sans les corriger tout de suite. D'abord tu lis, ensuite tu annotes, enfin tu
décides quoi reprendre.

## Le protocole en trois passes

```text
passe 1 : lecture seule (20 min)
   |
   +-- tu surlignes chaque affirmation qui te fait tiquer
   +-- interdiction absolue de modifier le fichier
   |
passe 2 : verdict ligne par ligne (30 min)
   |
   +-- FAUX      : contredit par ce que tu sais maintenant
   +-- INCOMPLET : vrai, mais il manque la condition qui le rend vrai
   +-- TENU      : toujours valide, et tu sais dire pourquoi
   |
passe 3 : écriture de la rétro (20 à 40 min)
   \-- tu remplis le gabarit ci-dessous, tu ne réécris pas le livrable
```

## Gabarit imposé de ta rétro

Crée le fichier `RETRO-BLOC-2-BUILD-<date-du-jour>.md` dans le dépôt de ton projet fil rouge.

```text
Livrable rouvert :
Date d'écriture initiale :          Date de relecture :

1. Ce qui est désormais FAUX
   - affirmation exacte (citation) :
   - ce qui la rend fausse (mécanisme, pas impression) :
   - ce que j'ignorais au moment de l'écrire :
   - ce que ça aurait coûté de le découvrir en production :

2. Ce qui est INCOMPLET
   - affirmation :
   - condition manquante :

3. Ce qui est TENU
   - affirmation :
   - la preuve qui la soutient aujourd'hui :

4. La reprise
   - je corrige maintenant :
   - je ne corrige pas, et j'assume, parce que :
   - le signal chiffré qui me forcera à y revenir :

Signé :                             Date :
```

Une rétro sans aucune ligne en FAUX est suspecte. Sur ce bloc, personne n'a tout eu bon du
premier coup. Si tu n'en trouves aucune, tu relis en cherchant à te donner raison.

## Les trois faux les plus fréquents sur ce bloc

| Symptôme observable | Ce que ça révèle |
| --- | --- |
| Le schéma contredit un flux | Un état dessiné au niveau 04 n'est représentable dans aucune colonne. |
| L'ADR écarte une alternative que tu ne comprenais pas encore | Tu l'as écartée pour une mauvaise raison, ou pour aucune raison écrite. |
| Le contrat d'API laisse passer un état impossible | Le type accepte une combinaison que le schéma interdit. |

## Analogie

Analogie : une rétrospective de bloc, c'est le débriefing d'après service en cuisine, et le
point de navigation où l'on reporte la position réelle sur la carte après une nuit de route.
Où l'analogie casse : en cuisine et en mer, l'écart se constate sur des faits déjà mesurés.
Ici, l'écart vient de toi : c'est ta grille de lecture qui a changé, pas le livrable, et rien
ne t'oblige à l'admettre à part la discipline du gabarit.

## Passe additionnelle : 45 minutes de lecture d'un dépôt tiers

Le métier consiste à lire beaucoup plus qu'à écrire. Cette passe est obligatoire pour valider
la rétro, et elle est volontairement placée ici plutôt que dans un seul niveau de lecture.

Règles :

- 45 minutes chronométrées dans un dépôt que tu n'as **pas** écrit et auquel tu n'as jamais
  contribué (projet open source réel, pas un exemple de tutoriel).
- **Zéro modification** : pas de commit, pas de branche, pas de correction de typo. Lire.
- Un paragraphe de restitution (150 à 250 mots) collé dans ta rétro : le point d'entrée que tu
  as choisi, une contrainte que le code révèle et que la documentation ne dit pas, et une
  décision que tu aurais prise autrement, avec son critère.

Signal d'échec : une restitution qui décrit l'arborescence des dossiers. L'arborescence se lit
en trente secondes ; ce qu'on attend, c'est un mécanisme ou une contrainte.

## Vérification des horodatages de boss-fight

Relis tes horodatages de boss-fight du bloc. Combien sont antérieurs à ta première lecture de
la grille ? Si moins de la moitié, refais-en un avant de continuer : une grille lue d'abord
transforme un exercice de raisonnement en exercice de remplissage.

## Critères de réussite

- Au moins 3 affirmations classées FAUX ou INCOMPLET, avec leur mécanisme nommé.
- Au moins 1 correction réellement appliquée au livrable d'origine.
- Au moins 1 non-correction assumée, avec son signal chiffré de réouverture.
- La rétro est signée, datée, et vit dans le dépôt à côté du livrable qu'elle juge.
- La passe de lecture de 45 min est faite, son paragraphe de restitution est présent, et aucun
  commit n'a été produit sur le dépôt tiers pendant la passe.

## Si tu bloques

Rouvre [06-ARCHI-LAB/challenge.md](./15-ARCHI-LAB/challenge.md) et relis seulement sa section de critères de réussite : la plupart
des FAUX se voient en comparant un livrable à ses propres critères, pas à ta mémoire.
