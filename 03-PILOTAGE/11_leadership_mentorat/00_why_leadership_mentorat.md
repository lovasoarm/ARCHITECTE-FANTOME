> **CE MODULE RÉUTILISE** : travail d'équipe (10_team_craft), collaboration multi-rôles (09-TEAM-QUEST), revue de code et lecture de diff (01-CADRAGE/03_debugging, 02-CONSTRUCTION/11_refactoring), arbitrage coût/valeur (08_produit_cout_roi). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **OÙ CE MODULE EST RECROISÉ** : au palier [04-EPREUVE](../../04-EPREUVE/06-CAPSTONE-ARENA/04-evaluation-grid.md), la soutenance du capstone se prépare avec la grille d'explication à trois publics de ce module, appliquée à l'ADR (S2) et au budget cloud (S1) de ton propre livrable. Recroisé au palier [05-MAITRISE/08_maitrise_staff_engineer](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), où une revue de code écrite et une note pour non-techniciens font partie du dossier final.

# POURQUOI CE MODULE MÉRITE TON TEMPS : INFLUENCE SANS AUTORITÉ

Un Staff Engineer n'a presque jamais de pouvoir hiérarchique. Son levier, c'est que d'autres gens décident mieux après lui avoir parlé. Ce module travaille exactement ça : la revue de code qui fait progresser au lieu d'humilier, le standard qu'une équipe adopte parce qu'il lui fait gagner du temps, et la phrase qui fait comprendre un risque technique à quelqu'un qui n'écrira jamais une ligne de code.

## 1. LA REVUE DE CODE QUI FAIT GRANDIR

Intuition : dans Naruto, Kakashi ne corrige presque jamais un geste. Il pose la question qui fait voir le geste. Une revue de code de bon niveau fonctionne pareil : elle transmet un critère, pas une correction.

Trois niveaux de commentaire, à annoncer explicitement :

- **Bloquant** : ça ne part pas en production comme ça, et voici le risque exact.
- **Suggestion** : je ferais autrement, tu décides, je ne reviendrai pas dessus.
- **Question** : je ne comprends pas, explique-moi, peut-être que j'apprends quelque chose.

```
"renomme ça"                       --> correction, transmet rien
"ce nom dit le comment, pas le
 quoi : dans 6 mois, qui saura ?"  --> critère, transmet un réflexe
```

Risque réel : une revue sans niveaux annoncés fait perdre deux jours à un junior qui traite une préférence de style comme un blocage.

## 2. LE MENTORAT : DONNER LE PROBLÈME, PAS LA SOLUTION

Le protocole en quatre temps, tenable en 30 minutes par semaine :

1. La personne expose ce qu'elle a essayé, pas ce qui ne marche pas.
2. Tu poses une question qui déplace le regard, sans donner la réponse.
3. Elle formule l'hypothèse suivante à voix haute.
4. Vous notez ensemble, en deux lignes, ce qui a été appris. Sans trace écrite, la session est un service rendu, pas du mentorat.

Analogies : c'est le sparring plutôt que le combat, et c'est l'entraîneur qui filme la séance plutôt que celui qui crie depuis le bord.

Risque réel : donner la solution résout le ticket et supprime l'apprentissage. Au troisième ticket identique, tu deviens le goulot d'étranglement de ta propre équipe.

## 3. LES STANDARDS D'ÉQUIPE : UN STANDARD SANS AUTOMATISATION EST UN VŒU

Un standard qui repose sur la vigilance humaine tient trois semaines. Un standard qui vit dans un outil tient des années.

```
règle écrite dans un wiki   --> oubliée au premier rush
règle vérifiée par la CI    --> tenue même la nuit du déploiement
```

Trois questions avant d'imposer un standard : qui l'a demandé, qu'est-ce qu'il fait gagner mesurablement, et quel outil le vérifie sans réunion.

## 4. PARLER À QUELQU'UN QUI N'ÉCRIRA JAMAIS DE CODE

Quatre publics, quatre traductions du même fait technique.

| Public | Ce qui l'intéresse | Ta phrase |
| --- | --- | --- |
| Direction | argent, délai, risque | "trois semaines de retard, ou 40 000 de dette annuelle" |
| Produit | ce que l'utilisateur perd ou gagne | "la recherche répondra en 2 s au lieu de 8 s" |
| Ops | ce qui va sonner la nuit | "une alerte de moins, un tableau de bord de plus" |
| Conformité | preuve, traçabilité, durée de conservation | "chaque accès est journalisé et gardé 12 mois" |

Risque réel : la même phrase technique répétée aux quatre publics ne convainc aucun des quatre, et fait passer son auteur pour quelqu'un qui n'a pas compris ce qu'il fait.

## 5. EXERCICES

**Exercice 1 : la revue à trois niveaux (20 min).** Reprends la dernière modification de ton projet fil rouge et relis-la comme si elle venait de quelqu'un d'autre. Écris trois commentaires, un de chaque niveau, avec le risque exact pour le bloquant.

**Exercice 2 : la session de sparring (15 min).** Prends un blocage que tu as eu cette semaine. Écris les trois questions qu'un mentor aurait pu te poser pour te débloquer sans te donner la réponse. Garde-les : c'est ta grille pour la prochaine fois.

**Exercice 3 : les quatre traductions (20 min).** Prends une décision technique de ton capstone, par exemple ton choix de zone de disponibilité. Écris-la en une phrase pour chacun des quatre publics du tableau ci-dessus. Interdiction d'utiliser un terme technique pour la direction.

## RÉSUMÉ

L'influence d'un Staff Engineer se mesure à la qualité des décisions prises par d'autres après son passage. Une revue de code transmet un critère et annonce son niveau, sinon elle bloque au lieu de faire grandir. Le mentorat laisse une trace écrite, sinon c'est un dépannage. Un standard non automatisé disparaît au premier rush. Et une décision technique n'existe vraiment que le jour où quatre publics différents l'ont comprise chacun dans sa langue.

> Sans équipe et sans mentoré réel : ce module se joue entièrement en solo, avec un mentoré fictif documenté, par [01_mentorat_solo.md](01_mentorat_solo.md). La preuve S5 ne dépend d'aucun employeur.
