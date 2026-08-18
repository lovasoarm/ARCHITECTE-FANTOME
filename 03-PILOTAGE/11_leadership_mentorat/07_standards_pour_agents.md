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

## 4. Ce que tu produis : `STANDARDS-AGENTS.md`, obligatoire

Livrable unique, une page, a la racine de ton fil rouge, nomme `STANDARDS-AGENTS.md`. Il reprend
ton document de standards d'equipe avec la colonne « applicable a un agent : oui / non / avec
cette reformulation », **et** les quatre blocs ci-dessous. Les quatre sont obligatoires : trois
blocs sur quatre ne prouvent rien, parce que c'est toujours le quatrieme qui coute.

| Bloc | Question a laquelle il repond | Forme exigee | Ce qui le rend irrecevable |
| --- | --- | --- | --- |
| 1. Decisions autonomes | qu'est-ce que l'agent tranche sans te demander ? | une liste fermee d'actes nommes (renommer un symbole prive, ajouter un test, corriger un typage) | « les petites choses », toute formule non enumerable |
| 2. Validations requises | qu'est-ce qui ne part jamais sans ton accord explicite ? | une liste fermee de declencheurs (migration de schema, changement de contrat d'API, dependance nouvelle, secret touche, suppression de test) | un declencheur qui dependrait du jugement de l'agent |
| 3. Verification de sortie | quelle commande refuse mecaniquement une production non conforme ? | la commande exacte, sur la meme branche, et le comportement en echec | une relecture humaine presentee comme controle |
| 4. Cout plafond d'une tache deleguee | a partir de quel montant ou de quel nombre d'appels tu coupes ? | un nombre, sa devise ou son unite, et l'action declenchee au depassement | un plafond sans action : un plafond qu'on ne fait pas respecter n'existe pas |

Critere binaire du livrable : les quatre blocs remplis, le bloc 3 cite par une commande executable,
le bloc 4 portant un nombre. Le chiffre du bloc 4 vient de ton budget
([RELEVE-REFERENCE-2026.md](../07_cloud_foundations/RELEVE-REFERENCE-2026.md) si tu n'as pas encore
ton propre releve), pas d'une intuition.

`STANDARDS-AGENTS.md` est une **piece du dossier unique**
([05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md)) :
sans ce fichier, le dossier est refuse, quelles que soient les huit sections.

## 5. Le piège

L'agent respecte la lettre du standard et rate son intention, systématiquement et à grande échelle. Un humain qui produit vingt fichiers douteux prend deux semaines, ce qui laisse le temps de le voir. Un agent le fait en une heure. Le contrôle doit donc être en amont, dans le standard, pas en aval dans le courage du relecteur.

## RÉSUMÉ

Conduire des agents, c'est le même travail que conduire une équipe : un standard observable, cité dans l'instruction, vérifié par une commande. Ce qui change est le rythme, donc l'exigence que le contrôle soit mécanique et non humain. Le livrable reste unique : un document de standards valable pour les humains et pour les agents.

## ET APRÈS

Le [challenge](challenge.md) livre les pièces de la preuve S5, puis le [boss fight](boss-fight.md) te met face à trois personnes sans aucune autorité.
