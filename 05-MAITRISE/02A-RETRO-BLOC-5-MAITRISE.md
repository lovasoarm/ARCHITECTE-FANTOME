---
stability: intemporel
acte: évaluer
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Rétrospective de bloc : Bloc MAITRISE (05-MAITRISE, modules `01-DATABASES` a `08-MAITRISE-STAFF-ENGINEER`)

[Sommaire](../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/08-ROADMAP-rythmes.md) | Style

Une rétrospective de bloc n'est pas un bilan de motivation. C'est une opération précise : tu
rouvres un livrable écrit avant d'avoir appris ce que tu sais maintenant, et tu écris ce qui
est désormais faux, et pourquoi ce n'était pas visible à l'époque.

Durée : 60 à 90 minutes. À faire après avoir terminé le 04-EPREUVE/01-BONUS-VAULT, donc à la fin
du parcours, avant d'ouvrir [14-EPILOGUE.md](../06-ANNEXES-TRANSVERSES/14-EPILOGUE.md). Ne saute pas cette étape : c'est la
seule fois du parcours où tu juges tes propres habitudes de travail, et non un livrable
technique isolé.

## Contrôle d'antériorité du bloc

Ouvre les livrables des niveaux de ce bloc. Pour chacun, réponds par oui ou par non : ce
document a-t-il été écrit avant que la solution soit décidée ?

Compte les non. Un ou deux non, c'est normal et ça se corrige. Trois non ou plus sur un bloc,
c'est un signal net : tu produis des documents de justification, pas des documents de
décision. Dans ce cas, reprends le livrable le plus récent et refais-le en aveugle, sans
relire ta solution. C'est deux heures. Elles valent les vingt heures du bloc suivant.

## Ce que tu rouvres

- ta routine d'apprentissage écrite au module `05-MAITRISE/05-DAY-TO-LEGEND` ([95-challenge.md](05-DAY-TO-LEGEND/95-challenge.md)),
- ton `HYPOTHESES.md` et ton relevé de temps de résolution du module `04-EPREUVE/02-TOOL-CAVE` ([95-challenge.md](../04-EPREUVE/02-TOOL-CAVE/95-challenge.md)),
- ta `REVUE-DE-RISQUES.md` du capstone, relue à la lumière du module `04-EPREUVE/01-BONUS-VAULT` ([01-BONUS-VAULT/04-security-cost-privacy.md](../04-EPREUVE/01-BONUS-VAULT/04-security-cost-privacy.md)),
- le journal de bord que tu tiens depuis le 00-SOCLE, s'il existe encore.

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

Crée le fichier `RETRO-BLOC-5-MAITRISE-<date-du-jour>.md` dans le dépôt de ton projet fil rouge.

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

| Symptôme observable                                                                                                                                 | Ce que ça révèle                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La routine d'apprentissage du module `05-MAITRISE/05-DAY-TO-LEGEND` n'a plus une seule entrée datée depuis trois semaines                           | Une routine qui ne survit pas à la première semaine chargée n'était pas dimensionnée pour ta vie réelle, elle était dimensionnée pour ta motivation du jour où tu l'as écrite.     |
| Ton temps de résolution de bug mesuré après le module `04-EPREUVE/02-TOOL-CAVE` n'est pas comparable à celui d'avant, faute d'avoir noté le premier | Tu as adopté une méthode sans jamais mesurer si elle t'a fait gagner du temps : c'est exactement le biais que le module `04-EPREUVE/02-TOOL-CAVE` dénonce, appliqué à toi-même.    |
| La revue sécurité/coûts/RGPD n'a été faite qu'une fois, pour le capstone, et jamais depuis sur un projet suivant                                    | Le module `04-EPREUVE/01-BONUS-VAULT` devient un exercice scolaire, pas un réflexe : un contrôle qui ne se déclenche que sur demande d'un correcteur ne protège aucun utilisateur. |

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

## Critères de réussite

- Au moins 3 affirmations classées FAUX ou INCOMPLET, avec leur mécanisme nommé.
- Au moins 1 correction réellement appliquée au livrable d'origine.
- Au moins 1 non-correction assumée, avec son signal chiffré de réouverture.
- Une date précise, inscrite dans ton agenda, pour la prochaine revue sécurité/coûts/RGPD sur
  un projet qui n'est pas le capstone.
- La rétro est signée, datée, et vit dans le dépôt à côté du livrable qu'elle juge.

## Si tu bloques

Rouvre [95-challenge.md](05-DAY-TO-LEGEND/95-challenge.md) et relis seulement sa section de critères de réussite : la plupart
des FAUX se voient en comparant un livrable à ses propres critères, pas à ta mémoire.

<!-- VERDICT-BOSS:debut -->

## Boss de palier : le verdict qui ferme le palier

Cette rétrospective **est** le Boss de palier : elle ferme le palier `05-MAITRISE`. Tant qu'elle n'est pas passée, le palier suivant reste fermé, même si tous les fichiers sont lus.

Les quatre actes se cochent dans l'ordre, et aucun ne se coche sur une lecture :

- [ ] **Construire** : le livrable existe, il tourne, il est daté dans ton dépôt.
- [ ] **Expliquer** : tu le racontes en cinq lignes à quelqu'un qui n'a pas le contexte.
- [ ] **Justifier** : tu écris le critère qui a tranché, et l'option que tu as écartée.
- [ ] **Défendre** : le contradicteur attaque le point faible, tu réponds par écrit.

Un acte non coché n'est pas un retard : c'est le palier qui n'est pas fini. Reporte le
résultat dans [PROGRESSION.md](../PROGRESSION.md).

<!-- VERDICT-BOSS:fin -->

<!-- RETRO-DOSSIER-UNIQUE:debut -->

## Relecture du dossier unique

Le parcours ne se termine pas sur un dernier module : il se termine sur le dossier que tu
as construit depuis le premier jour. Tu le rouvres en entier, une seule fois, et tu le juges
avec les yeux d'un recruteur qui n'a pas ton contexte.

- [ ] Tu nommes **trois tensions** que le dossier n'a pas résolues, et ce que chacune coûte.
- [ ] Tes **SLO** sont chiffrés, mesurés, et tu montres la fois où ils ont été violés.
- [ ] Chaque décision structurante a son **ADR**, écrit avant la solution, pas après.
- [ ] `STANDARDS-AGENTS.md` décrit ce que tes agents font, et surtout ce qu'ils n'ont pas le droit de faire.

Aucun item ne se coche sur une relecture : chacun se coche sur un artefact que tu peux ouvrir.

<!-- RETRO-DOSSIER-UNIQUE:fin -->
