# Rétrospective de bloc : Bloc EPREUVE (niveaux 11 à 12)

[Sommaire](../99-COULISSES/archives/CURRICULUM-projectfunny.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md) | [Style](../06-ANNEXES-TRANSVERSES/meta/_STYLE.md)

Une rétrospective de bloc n'est pas un bilan de motivation. C'est une opération précise : tu
rouvres un livrable écrit avant d'avoir appris ce que tu sais maintenant, et tu écris ce qui
est désormais faux, et pourquoi ce n'était pas visible à l'époque.

Durée : 60 à 90 minutes. À faire après le boss-fight du niveau 12-CAPSTONE-ARENA, avant d'ouvrir le bloc
suivant. Ne saute pas cette étape : c'est la seule fois du parcours où tu juges ton propre
travail passé avec des yeux différents.

## Boss de palier (rythme deux modules, un Boss)

Cette retrospective **est** le dernier Boss de son palier : elle ferme [BIG APP SNOOP](05-BIG-APP-SNOOP/README.md) et [CAPSTONE ARENA](06-CAPSTONE-ARENA/README.md). Il n'y a donc pas de dossier `BOSS-` supplementaire ici : le Boss final d'un
palier, c'est la relecture qui decide si le palier se coche. Meme verdict binaire que les Boss
intermediaires : passe, ou ne passe pas.

## Contrôle d'antériorité du bloc

Ouvre les livrables des niveaux de ce bloc. Pour chacun, réponds par oui ou par non : ce
document a-t-il été écrit avant que la solution soit décidée ?

Compte les non. Un ou deux non, c'est normal et ça se corrige. Trois non ou plus sur un bloc,
c'est un signal net : tu produis des documents de justification, pas des documents de
décision. Dans ce cas, reprends le livrable le plus récent et refais-le en aveugle, sans
relire ta solution. C'est deux heures. Elles valent les vingt heures du bloc suivant.


## Ce que tu rouvres

- ton rapport d'exploration du niveau 11 ([11-BIG-APP-SNOOP/challenge.md](05-BIG-APP-SNOOP/challenge.md)),
- ta note de cadrage du capstone ([12-CAPSTONE-ARENA/03-deliverables.md](06-CAPSTONE-ARENA/03-deliverables.md)),
- ton HYPOTHESES.md du capstone,
- ta REVUE-DE-RISQUES.md du capstone.

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

Crée le fichier `RETRO-BLOC-4-EPREUVE-<date-du-jour>.md` dans le dépôt de ton projet fil rouge.

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
| Une hypothèse de cadrage s'est révélée fausse | Tu l'avais notée en confiance haute : sur quoi reposait cette confiance ? |
| Une conclusion du rapport d'exploration ne tient plus | Tu as jugé un code inconnu en 3 h, le code te répond maintenant. |
| Une mesure de la revue de risques n'a jamais été appliquée | Une mesure jamais appliquée est une intention, pas une mesure. |

## Analogie

Analogie : une rétrospective de bloc, c'est le débriefing d'après service en cuisine, et le
point de navigation où l'on reporte la position réelle sur la carte après une nuit de route.
Où l'analogie casse : en cuisine et en mer, l'écart se constate sur des faits déjà mesurés.
Ici, l'écart vient de toi : c'est ta grille de lecture qui a changé, pas le livrable, et rien
ne t'oblige à l'admettre à part la discipline du gabarit.

## Vérification des horodatages de boss-fight

Relis tes horodatages de boss-fight du bloc. Combien sont antérieurs à ta première lecture de
la grille ? Si moins de la moitié, refais-en un avant de continuer : une grille lue d'abord
transforme un exercice de raisonnement en exercice de remplissage.


## Rappel actif du matériel Staff (obligatoire, avant le capstone)

Cette rétrospective précède immédiatement le capstone, et l'addendum du capstone exige le budget
cloud, le SLO et le découpage en contextes bornés. Les trois questions suivantes se répondent
**sans rouvrir les modules** : c'est le seul dispositif de répétition espacée du parcours, et il
ne sert à rien si tu lis la source avant de répondre. Écris tes trois réponses dans ta rétro, puis
seulement ensuite ouvre les renvois de vérification en fin de fichier.

1. **Facture.** Rechiffre de tête la facture mensuelle de ton projet fil rouge à trois paliers de
   charge : nominal, dix fois, cent fois. Cinq lignes maximum par palier, egress compris. Note
   pour chaque montant si c'est une mesure ou une estimation.
2. **Promesse.** Réécris ton SLO et ton budget d'erreur du parcours critique, en volume de
   requêtes par semaine, puis nomme ce que tu dégrades en premier quand le budget est consommé aux
   deux tiers avant la fin de la fenêtre.
3. **Frontières.** Redessine tes contextes bornés en ASCII, puis nomme la rupture de contrat la
   plus probable des six prochains mois, son consommateur le plus exposé, et le délai de double
   run que tu lui dois.

Une réponse que tu ne peux pas produire de mémoire est un trou de mémoire, pas un trou de
compétence : elle se comble en refaisant le drill du module, pas en relisant la leçon.

## Renvois de vérification (à n'ouvrir qu'après avoir écrit tes trois réponses)

- Question 1 : [03-PILOTAGE/07_cloud_foundations](../03-PILOTAGE/07_cloud_foundations/README.md), drill 2 de son [verification_pack](../03-PILOTAGE/07_cloud_foundations/verification_pack/criteres.md).
- Question 2 : [03-PILOTAGE/06_fiabilite_slo](../03-PILOTAGE/06_fiabilite_slo/README.md), drill 2 de son [verification_pack](../03-PILOTAGE/06_fiabilite_slo/verification_pack/criteres.md).
- Question 3 : [02-CONSTRUCTION/16_ddd_contrats](../02-CONSTRUCTION/16_ddd_contrats/README.md), drill 2 de son [verification_pack](../02-CONSTRUCTION/16_ddd_contrats/verification_pack/criteres.md).

Mode de vérification de ce rappel : critère binaire du `verification_pack` du module concerné.
Trois réponses produites de mémoire, ou rappel non réussi.

## Verification du livrable TECH-ILA 5 sur 6

> Depuis S-10, la carte n'est plus annoncee ici : elle a ete ouverte dans `04-EPREUVE`. Cette retrospective ne verifie qu'une chose, binaire : le livrable existe-t-il ? Attendu : PORTAGE.md, le livrable note du palier. Non produit = le bloc n'est pas ferme, meme si toutes les lecons sont lues.

### Rappel de la carte (reference, pas decouverte) : Niveau 5 Transfert (bloquant)

Le [Niveau 5 Transfert](../06-ANNEXES-TRANSVERSES/03-TECH-ILA/tech-ila/05-niveau-5-transfert.md) de
TECH-ILA contient un exercice de portage : prendre un service de 150 lignes de ton fil rouge,
écrit en Node, et le porter dans un second langage serveur (FastAPI en Python, Spring Boot en
Java, ou .NET selon la section choisie). Contrairement aux paliers précédents, celui-ci n'est
pas une lecture : c'est un livrable, une journée, vérifié par un test qui prouve que les deux
versions répondent identiquement sur les mêmes cas. Sans lui, ta compétence n'a jamais quitté
Node une seule fois en quinze blocs, et rien ne distingue ce que tu sais vraiment de ce que
Node t'a appris à force d'habitude. Garde la page d'écart demandée en fin d'exercice : c'est la
pièce qui prouve que le transfert a eu lieu, pas seulement que tu l'as lu.

## Critères de réussite

- Au moins 3 affirmations classées FAUX ou INCOMPLET, avec leur mécanisme nommé.
- Au moins 1 correction réellement appliquée au livrable d'origine.
- Au moins 1 non-correction assumée, avec son signal chiffré de réouverture.
- La rétro est signée, datée, et vit dans le dépôt à côté du livrable qu'elle juge.
- Les trois questions de rappel actif du matériel Staff sont répondues de mémoire, avant tout renvoi ouvert.

## Si tu bloques

Rouvre [11-BIG-APP-SNOOP/challenge.md](05-BIG-APP-SNOOP/challenge.md) et relis seulement sa section de critères de réussite : la plupart
des FAUX se voient en comparant un livrable à ses propres critères, pas à ta mémoire.
