---
stability: intemporel
acte: appliquer
---

# 01 : LE MODE SOLO DU LEADERSHIP, LE MENTORÉ FICTIF

Acte attendu : produire.

Temps ~45 min

Tout ce module suppose une équipe et un mentoré réels. Le public annoncé du parcours, lui, travaille souvent seul. Une preuve qui dépend d'un contexte que l'apprenant ne contrôle pas n'est pas une preuve : ce fichier rend la famille S5 jouable sans employeur, exactement comme [CONTRADICTEUR.md](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md) rend jouable un comité hostile sans comité.

## 1. Ton mentoré : Yuki, 14 mois d'expérience

Yuki est rapide, consciencieuse, et livre beaucoup. Elle lit la documentation officielle avant de demander. Elle a un angle mort unique et régulier : elle optimise le code qu'elle voit et ne questionne jamais la frontière dans laquelle ce code vit. Elle prend les découpages existants pour des lois de la nature.

Fiche à conserver dans ton dépôt, parce qu'un mentorat sans historique n'est qu'une suite de conseils : niveau, angle mort observé, objectif à trois mois, dernière trace écrite.

## 2. Les trois productions à réviser

Écris-les toi-même, à partir de ton fil rouge, avant de les réviser. Oui, tu produis le travail que tu vas corriger : c'est précisément l'exercice, parce que réviser sa propre production en changeant de rôle est la compétence de revue à l'état pur.

1. **Production A, franchement perfectible.** Une fonction longue, nommage flou, aucun test. Facile à réviser, elle sert d'étalonnage.
2. **Production B, correcte et discutable.** Le code est propre, testé, lisible. La décision d'implémentation est défendable, elle mérite une question, pas un blocage.
3. **Production C, celle qui semble correcte et cache une décision d'architecture dangereuse.** Propre, testée, revue sans remarque par n'importe quel outil : elle introduit un appel direct d'un domaine vers la table d'un autre domaine, "juste pour cette lecture, c'est plus simple". Rien ne casse aujourd'hui. Dans neuf mois, deux domaines ne peuvent plus être déployés séparément et personne ne saura dire quand cela a été décidé.

La production C est le coeur du fichier. Un mentor junior corrige A. Un bon développeur corrige A et B. Un Staff Engineer voit C, et sait la nommer sans humilier la personne qui l'a écrite.

## 3. La revue, en trois niveaux

Applique strictement les trois niveaux de [02_revue_de_code_trois_niveaux.md](02_revue_de_code_trois_niveaux.md) : bloquant, suggestion, question. Un seul bloquant maximum par revue, et il porte sur C, pas sur A. Une revue qui bloque sur le nommage et laisse passer la frontière violée est une revue qui a inversé ses priorités : c'est le défaut le plus commun, et le plus coûteux.

Pour C, ta remarque bloquante contient trois choses : ce qui est décidé sans être écrit, ce que ça coûte dans neuf mois, et l'alternative concrète du même ordre de travail.

## 4. Confrontation aux critères

Confronte ta revue aux critères du [verification_pack/criteres.md](verification_pack/criteres.md), puis livre ta preuve S5 : la revue écrite, la fiche de suivi de Yuki, et la note de trois lignes disant ce que tu attends d'avoir transmis.

## RÉSUMÉ

Le leadership se prouve seul si le mentoré est documenté, si les productions sont écrites avant d'être révisées, et si l'une d'elles cache une décision d'architecture invisible à l'outillage. Un bloquant unique, porté sur la frontière et non sur le style, sépare la revue de Staff de la revue de relecteur. La preuve S5 ne dépend plus d'un employeur.

## ET APRÈS

[02_revue_de_code_trois_niveaux.md](02_revue_de_code_trois_niveaux.md) donne le formalisme complet des trois niveaux, puis [07_standards_pour_agents.md](07_standards_pour_agents.md) applique tes standards à une flotte d'agents.
