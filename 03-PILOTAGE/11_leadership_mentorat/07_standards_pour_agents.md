---
stability: perissable_2028
acte: appliquer
---

# 07 : CONDUIRE UNE FLOTTE D'AGENTS COMME ON CONDUIT UNE ÉQUIPE

Acte attendu : produire.

Temps ~12 min

Le reste du parcours traite l'IA du point de vue de l'utilisateur unique : copilote, récupération augmentée, produit à base de modèle. Rien ne traite la situation qui arrive vite : plusieurs agents produisent du code en continu, et quelqu'un reste responsable du résultat. Ce quelqu'un fait un travail de leadership, pas un travail d'utilisateur.

## 1. Le déplacement à faire

Un agent n'est ni un outil ni un collègue : c'est un exécutant rapide, infatigable, sans mémoire de tes conventions et sans peur des conséquences. Les trois questions de [04_standards_equipe.md](04_standards_equipe.md) restent exactement les mêmes, seul l'exécutant change.

| Question du standard | Version équipe | Version flotte d'agents |
| --- | --- | --- |
| Qui l'a demandé ? | un humain qui a subi le problème | identique, l'agent ne demande jamais rien |
| Qu'est-ce qu'il fait gagner ? | temps de revue, incidents évités | identique, plus le coût par appel et le temps de correction |
| Quel outil le vérifie sans réunion ? | intégration continue | intégration continue, la même, appliquée avant fusion |

Un standard écrit pour l'humain et non appliqué à l'agent crée une équipe à deux vitesses de qualité, avec la vitesse la plus rapide du mauvais côté.

## 2. Un standard opposable à un agent

Opposable veut dire : vérifiable sans discussion, cité en amont dans l'instruction, et refusé mécaniquement en aval. Trois propriétés obligatoires.

1. **Formulé en critère observable** : "toute fonction exportée porte un test qui échoue si on inverse la condition", pas "écris du code testable".
2. **Cité dans l'instruction donnée à l'agent**, textuellement, pas résumé.
3. **Vérifié par la même commande que pour un humain**, sur la même branche, sans exception d'urgence.

## 3. Réviser la production d'un agent comme celle d'un junior

Reprends les trois niveaux de [02_revue_de_code_trois_niveaux.md](02_revue_de_code_trois_niveaux.md), avec deux écarts assumés : la question ne sert à rien, l'agent n'apprendra pas de ta pédagogie, elle devient une correction du standard. Et le bloquant ne se négocie jamais, parce qu'un agent qui plaide sa cause plaide toujours de façon convaincante.

Croise avec la fiche d'audit de réponse IA du [02-TOOL-CAVE](../../04-EPREUVE/02-TOOL-CAVE) : la production de l'agent s'audite avec la même grille qu'une réponse d'IA, la responsabilité du résultat restant entièrement sur toi.

## 4. Ce que tu produis

Aucun document nouveau : **le même document de standards**, avec une colonne supplémentaire "applicable à un agent : oui / non / avec cette reformulation". C'est le livrable, et il vaut pour les deux populations.

## 5. Le piège

L'agent respecte la lettre du standard et rate son intention, systématiquement et à grande échelle. Un humain qui produit vingt fichiers douteux prend deux semaines, ce qui laisse le temps de le voir. Un agent le fait en une heure. Le contrôle doit donc être en amont, dans le standard, pas en aval dans le courage du relecteur.

## RÉSUMÉ

Conduire des agents, c'est le même travail que conduire une équipe : un standard observable, cité dans l'instruction, vérifié par une commande. Ce qui change est le rythme, donc l'exigence que le contrôle soit mécanique et non humain. Le livrable reste unique : un document de standards valable pour les humains et pour les agents.

## ET APRÈS

Le [challenge](challenge.md) livre les pièces de la preuve S5, puis le [boss fight](boss-fight.md) te met face à trois personnes sans aucune autorité.
