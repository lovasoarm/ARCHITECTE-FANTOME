# Rétrospective de bloc : Bloc MAITRISE (niveaux 13 à 15)

[Sommaire](../99-COULISSES/archives/CURRICULUM-projectfunny.md) | [Rythmes](../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md) | [Style](../06-ANNEXES-TRANSVERSES/meta/_STYLE.md)

Une rétrospective de bloc n'est pas un bilan de motivation. C'est une opération précise : tu
rouvres un livrable écrit avant d'avoir appris ce que tu sais maintenant, et tu écris ce qui
est désormais faux, et pourquoi ce n'était pas visible à l'époque.

Durée : 60 à 90 minutes. À faire après avoir terminé le niveau 15-BONUS-VAULT, donc à la fin
du parcours, avant d'ouvrir [EPILOGUE.md](../06-ANNEXES-TRANSVERSES/12-EPILOGUE.md). Ne saute pas cette étape : c'est la
seule fois du parcours où tu juges tes propres habitudes de travail, et non un livrable
technique isolé.

## Boss de palier (rythme deux modules, un Boss)

Cette retrospective **est** le dernier Boss de son palier : elle ferme [tools](07_tools/README.md) et [maitrise staff engineer](08_maitrise_staff_engineer/README.md). Il n'y a donc pas de dossier `BOSS-` supplementaire ici : le Boss final d'un
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

- ta routine d'apprentissage écrite au niveau 13 ([13-DAY-TO-LEGEND/challenge.md](05-DAY-TO-LEGEND/challenge.md)),
- ton `HYPOTHESES.md` et ton relevé de temps de résolution du niveau 14 ([14-TOOL-CAVE/challenge.md](../04-EPREUVE/02-TOOL-CAVE/challenge.md)),
- ta `REVUE-DE-RISQUES.md` du capstone, relue à la lumière du niveau 15 ([15-BONUS-VAULT/05-security-cost-privacy.md](../04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md)),
- le journal de bord que tu tiens depuis le niveau 00, s'il existe encore.

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

| Symptôme observable | Ce que ça révèle |
| --- | --- |
| La routine d'apprentissage du niveau 13 n'a plus une seule entrée datée depuis trois semaines | Une routine qui ne survit pas à la première semaine chargée n'était pas dimensionnée pour ta vie réelle, elle était dimensionnée pour ta motivation du jour où tu l'as écrite. |
| Ton temps de résolution de bug mesuré après le niveau 14 n'est pas comparable à celui d'avant, faute d'avoir noté le premier | Tu as adopté une méthode sans jamais mesurer si elle t'a fait gagner du temps : c'est exactement le biais que le niveau 14 dénonce, appliqué à toi-même. |
| La revue sécurité/coûts/RGPD n'a été faite qu'une fois, pour le capstone, et jamais depuis sur un projet suivant | Le niveau 15 devient un exercice scolaire, pas un réflexe : un contrôle qui ne se déclenche que sur demande d'un correcteur ne protège aucun utilisateur. |

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

## Verification du livrable TECH-ILA 6 sur 6

> Depuis S-10, la carte n'est plus annoncee ici : elle a ete ouverte dans `04-EPREUVE/04_ai_native_dev`. Cette retrospective ne verifie qu'une chose, binaire : le livrable existe-t-il ? Attendu : IA-EN-PROD.md, avec cout par utilisateur actif et jeu d'evaluation. Non produit = le bloc n'est pas ferme, meme si toutes les lecons sont lues.

### Rappel de la carte (reference, pas decouverte) : Niveau 6 IA (bloquant)

Le [Niveau 6 IA](../06-ANNEXES-TRANSVERSES/03-TECH-ILA/tech-ila/06-niveau-6-ia.md) de TECH-ILA
referme la boucle commencée au palier du bloc CADRAGE : la même question, portée cette fois sur
l'usage de l'IA elle-même plutôt que sur un langage ou un framework. Lecture avant la soutenance.

## Relecture du dossier unique (A15, bloquant)

Cette rétro ne se valide pas tant qu'un « non » subsiste dans le tableau ci-dessous. Aucun item
n'est une lecture : chacun se tranche en rouvrant un artefact et en y cherchant un chiffre.

| # | Vérification binaire sur ton dossier unique | Si « non », tu reprends |
| --- | --- | --- |
| 1 | Les **trois tensions** sont-elles chiffrées **des deux côtés** (le coût de faire ET le coût de ne pas faire, en heures, en euros ou en points de SLO) ? | [08_maitrise_staff_engineer/03_trois_tensions.md](08_maitrise_staff_engineer/03_trois_tensions.md) |
| 2 | Le **SLO** annoncé est-il tenable avec le budget relevé (même service, même unité, même devise) ? | [06_fiabilite_slo/01_sli_slo_budget_erreur.md](../03-PILOTAGE/06_fiabilite_slo/01_sli_slo_budget_erreur.md) recroisé avec [RELEVE-REFERENCE-2026.md](../03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md) |
| 3 | Chaque **ADR** du dossier chiffre-t-il au moins une conséquence (pas « risque modéré », un nombre) ? | [08_maitrise_staff_engineer/01_dossier_unique.md](08_maitrise_staff_engineer/01_dossier_unique.md) |
| 4 | **STANDARDS-AGENTS.md** est-il présent dans les pièces du dossier, avec ses quatre blocs binaires ? | [11_leadership_mentorat/07_standards_pour_agents.md](../03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md) |

Règle de verdict : un seul « non » et la rétro n'est pas signée. Tu rouvres le module nommé sur
la ligne, tu corriges l'artefact, tu réponds « oui » avec la date de correction en face. Un
« oui » sans date de relecture compte comme un « non ».

Trace exigée, dans le dépôt du fil rouge :
`RETRO-BLOC-5 : relecture dossier unique, items 1 a 4 OUI le <date>`.

## Critères de réussite

- Au moins 3 affirmations classées FAUX ou INCOMPLET, avec leur mécanisme nommé.
- Au moins 1 correction réellement appliquée au livrable d'origine.
- Au moins 1 non-correction assumée, avec son signal chiffré de réouverture.
- Une date précise, inscrite dans ton agenda, pour la prochaine revue sécurité/coûts/RGPD sur
  un projet qui n'est pas le capstone.
- La rétro est signée, datée, et vit dans le dépôt à côté du livrable qu'elle juge.

## Si tu bloques

Rouvre [13-DAY-TO-LEGEND/challenge.md](05-DAY-TO-LEGEND/challenge.md) et relis seulement sa section de critères de réussite : la plupart
des FAUX se voient en comparant un livrable à ses propres critères, pas à ta mémoire.

## Question de rappel actif : module Staff neuf de ce bloc

- **`05-MAITRISE/08_maitrise_staff_engineer`** : sans rouvrir ton dossier de
  maîtrise (`01_dossier_unique.md`), énumère les pièces qu'il contient et le
  chiffre qui appuie chacune (SLO, budget cloud, ROI d'un refus). Puis
  compare à la version réelle : toute pièce oubliée ou tout chiffre approximé
  de mémoire est un signal que le dossier n'est pas encore défendable devant
  un interlocuteur non technique.

## Annexe declenchee ici

- [13-ANNEXE-et-apres.md](../06-ANNEXES-TRANSVERSES/13-ANNEXE-et-apres.md) : a ouvrir apres l'epilogue, une fois la retro de ce bloc ecrite et signee.
