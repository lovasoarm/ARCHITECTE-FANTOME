# Pourquoi ce niveau existe

## Le piège

Tu rejoins une équipe qui gère le logiciel de gestion des tournées d'une entreprise de
livraison de colis frais. 400 000 lignes, sept ans d'historique, trois refontes partielles
jamais terminées. Ton ticket du premier jour : "le calcul de créneau de livraison affiche
parfois un horaire impossible, corrige ça". Tu ouvres le dépôt. Tu tapes "creneau" dans la
recherche globale : 340 résultats répartis dans 60 fichiers. Tu passes ta journée à cliquer
de fichier en fichier sans savoir si tu remontes vers la cause ou si tu t'enfonces dans une
branche morte. À 17h tu n'as toujours pas trouvé le bug, et tu ne sais même pas dire dans
quel service il vit.

Ce n'est pas un manque de compétence technique. C'est un manque de méthode d'entrée.

## Ce qui casse sans ce niveau

- **Tu lis linéairement un système qui n'est pas linéaire.** Le code s'exécute dans un ordre,
  mais sa logique de conception suit un autre ordre : celui des responsabilités métier. Lire
  fichier par fichier dans l'ordre alphabétique ou dans l'ordre d'appel te noie, parce que tu
  accumules des détails avant d'avoir la carte qui leur donne un sens.
- **Tu juges un design avant de comprendre ses contraintes.** Tu vois une fonction de 400
  lignes et tu penses "mauvais code". Six mois plus tard tu apprends qu'elle existe parce
  qu'un audit de conformité imposait qu'un seul point de code traite toute la logique de
  calcul de prix, traçable en une seule revue. Le jugement rapide te fait perdre la confiance
  de l'équipe en place et te fait rater la vraie leçon.
- **Tu ne sais pas où est le risque.** Dans un système inconnu, certains fichiers sont
  cosmétiques et d'autres sont le cœur battant qui, s'il casse, arrête l'entreprise. Sans
  méthode, tu traites les deux avec la même prudence : trop pour l'un, pas assez pour l'autre.
- **Tu proposes des réécritures qui répètent des erreurs déjà commises et corrigées.** Le
  code que tu trouves "mal fait" a souvent déjà été "bien fait" dans une version antérieure,
  puis changé pour une raison que le commit d'origine explique et que tu n'as pas lue.
- **Tu perds un temps disproportionné sur des fichiers à faible enjeu.** Sans grille de
  priorité, une page d'export CSV rarement utilisée reçoit la même attention qu'un moteur de
  facturation qui tourne 40 000 fois par jour, simplement parce qu'elle est apparue en
  premier dans ta recherche.

## Ce qui se passe vraiment

Un gros code base est un artefact archéologique. Il porte les traces de décisions produit,
de contraintes techniques disparues, de rapports de force d'équipe, de deadlines qui ont
forcé des compromis. Lire ce code sans reconstruire ce contexte, c'est lire les ruines d'une
ville sans savoir qu'elle a survécu à trois guerres et un tremblement de terre : tu vois des
murs bizarrement placés et tu conclus que les architectes étaient mauvais.

```text
Code étranger = signal + bruit + histoire figée

Signal   --> logique métier actuelle, ce qui doit marcher aujourd'hui
Bruit    --> code mort, expérimentations abandonnées, copier-coller jamais nettoyé
Histoire --> contraintes disparues (deadline, migration, contrat client) toujours visibles
           dans la forme du code, même quand la raison a disparu de toute mémoire humaine
```

Ce niveau t'apprend à séparer ces trois couches vite, avec une méthode répétable, pour
qu'entrer dans un système inconnu devienne un exercice maîtrisé au lieu d'une noyade.

### La grille de priorité par risque, avant même de lire une ligne

Avant d'ouvrir un seul fichier en détail, la première question n'est pas "que fait ce code"
mais "si ce code casse, qu'est-ce qui s'arrête réellement". Cette question se répond souvent
sans lire le code du tout, juste en observant le système en fonctionnement (logs de volume
d'appels, tableau de bord de revenus, tickets de support historiques).

```text
Risque faible, effort de lecture faible     Risque élevé, effort de lecture élevé
----------------------------------          ---------------------------------------
Export CSV mensuel                          Calcul de créneau de livraison (coeur métier)
Page d'administration interne rare          Module de facturation
Rapport statistique non critique            Authentification et permissions

  --> Lire vite, en diagonale, pas de risque à se tromper légèrement
                                               --> Lire lentement, avec méthode complète,
                                                   test de caractérisation avant modification
```

Un développeur qui applique la même rigueur partout perd du temps sur le mauvais quart du
système. Un développeur qui saute cette étape prend des risques sur le mauvais quart aussi,
juste dans l'autre sens : trop vite là où ça compte.

### Pourquoi l'histoire figée résiste au nettoyage

Une contrainte disparue laisse une trace dans le code bien après avoir disparu du monde réel,
parce que retirer cette trace demande un effort que personne n'a jamais priorisé. C'est la
raison la plus fréquente pour laquelle un code "sale" survit des années : personne ne l'a
jugé assez dangereux pour justifier le risque de le toucher, et personne n'a eu le temps de
prouver qu'il ne l'était plus.

### Le premier jour compte double

L'impression que tu donnes ta première semaine dans une équipe reste longtemps ancrée, dans
les deux sens. Un développeur qui pose des questions structurées ("je cherche à comprendre
pourquoi ce champ est dupliqué, pas à le juger") gagne de la confiance vite. Un développeur
qui commente en réunion "franchement ce code est n'importe quoi" avant d'avoir cherché la
raison en perd tout aussi vite, et souvent pour plus longtemps que le temps qu'il a fallu
pour perdre cette confiance : la reconstruire prend des mois, la perdre prend une phrase.

### Ce que ce niveau construit, concrètement

À la fin de ce niveau, tu sais répondre en moins d'une journée à trois questions sur un
système que tu n'as jamais vu :

```text
1. Quelles sont les 5 responsabilités metier principales du systeme, sans lire tout le code
2. Quels sont les 2-3 fichiers ou modules dont la panne coute le plus cher a l'entreprise
3. Pour un design qui semble discutable, ai-je une hypothese de contrainte a verifier
   avant de proposer un changement, et sais-je qui pourrait confirmer ou infirmer
```

Ce n'est pas un objectif de perfection : c'est un objectif de vitesse de mise en confiance,
la tienne et celle de l'équipe qui t'accueille.

### Le cas du système qui a survécu à plusieurs refontes ratées

Sept ans d'historique et trois refontes partielles jamais terminées, comme dans l'exemple
d'ouverture, ne sont pas une anomalie : c'est l'état normal d'un système qui a réellement
généré du revenu pendant longtemps. Chaque refonte abandonnée laisse une couche de code mort
ou à moitié branché, souvent sans commentaire pour dire "abandonné, ne pas suivre cette
piste". Reconnaître ces couches mortes fait partie de la compétence de ce niveau : un code
qui n'est appelé nulle part, vérifiable en quelques minutes avec un outil de recherche de
références, ne mérite ni jugement ni réécriture, juste une vérification puis un signalement.

## Pourquoi cette compétence est rare

La plupart des formations optimisent pour "écrire depuis zéro". C'est confortable à enseigner
et à évaluer. Mais le marché du travail ne t'offre presque jamais une feuille blanche. Un
développeur qui sait entrer vite dans l'inconnu et en ressortir avec un diagnostic juste est
plus précieux, plus vite, qu'un développeur qui écrit un code neuf impeccable mais met trois
semaines à comprendre où le brancher.

Analogie : entrer dans un gros code base inconnu ressemble à prendre la garde aux urgences
d'un hôpital en plein service, et à reprendre le quart de barre d'un navire en pleine
traversée.
Où l'analogie casse : aux urgences et en mer, un protocole écrit et normé existe presque
toujours pour la prise de relais. Sur un code base de sept ans, ce protocole n'existe le
plus souvent nulle part, et la première tâche est justement de le reconstruire toi-même.

## Compromis

| Option                                                        | Coût                                              | Bénéfice                                                        | Quand choisir                                                          |
| -------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Lire linéairement, fichier par fichier                        | Très lent, noyade dans les détails sans hiérarchie | Aucun vrai bénéfice au-delà de la familiarité de surface        | Jamais comme méthode principale sur un système de plus de 10 000 lignes |
| Cartographier par responsabilité avant de lire le détail      | Investissement initial d'une demi-journée          | Carte mentale réutilisable, priorisation correcte du risque      | Systématique à l'arrivée sur tout système de taille significative      |
| Juger la qualité du code avant d'enquêter sur ses contraintes | Rapide, satisfaisant sur le moment                | Aucun, ce jugement est presque toujours partiellement faux        | Jamais avant d'avoir posé les quatre questions de la leçon suivante    |

| Poser des questions ouvertes avant de juger un design                | Coût social minime, demande un peu d'humilité affichée | Confiance de l'équipe construite vite, information fiable obtenue | Systématique, surtout la première semaine dans un nouveau système |

## Ce que tu dois savoir défendre

- Pourquoi juger la qualité d'un code avant d'avoir compris ses contraintes est une erreur
  de méthode, pas une preuve de sens critique.
- Pourquoi un gros code base doit se lire par couches de responsabilité et non par ordre
  d'exécution ou ordre alphabétique.
- Donne un exemple (vécu ou plausible) de code qui semble mauvais mais qui répond en fait à
  une contrainte externe légitime.
