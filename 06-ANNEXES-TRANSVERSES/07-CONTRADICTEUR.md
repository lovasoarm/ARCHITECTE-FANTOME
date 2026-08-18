# LE CONTRADICTEUR : dispositif de défense orale, jouable seul

Un choix technique qui n'a jamais affronté d'objection réelle n'est pas défendu, il est
juste pas encore contesté. Ce fichier fournit une banque d'objections écrites en toutes
lettres, une méthode de tirage au sort, et une grille d'auto-notation, pour t'entraîner
seul à répondre à une opposition adverse avant qu'un vrai jury, un vrai client ou un vrai
incident ne te la pose sans préavis.

## Comment s'en servir

1. Choisis le point du repo où tu es renvoyé ici (soutenance, dossier de maîtrise, défense
   CQRS, audit d'architecture, arbitrage budgétaire).
2. Tire une objection au sort dans la banque ci-dessous avec l'une des trois méthodes.
3. Réponds à voix haute, chrono à 5 minutes, comme si l'objection venait d'être posée en
   face de toi.
4. Note-toi avec la grille, sans complaisance.

## Méthode de tirage au sort

Trois méthodes équivalentes, choisis celle que tu as sous la main :

- **Dé.** Lance un dé à six faces. Le résultat donne le groupe (1 à 6 ci-dessous). S'il y a
  plusieurs objections dans le groupe, relance le dé pour désigner laquelle.
- **Date du jour.** Prends le jour du mois, fais le modulo par le nombre total
  d'objections de la banque (14 à la date d'écriture de ce fichier). Le reste te donne
  l'index de l'objection, compté depuis le début de la banque.
- **Hash.** Prends le nom de ton projet fil rouge, calcule un hash simple (somme des codes
  ASCII des caractères), fais le modulo par 14. Cette méthode a l'avantage d'être
  reproductible : deux personnes sur le même projet tirent la même objection.

Ne choisis jamais l'objection toi-même. Le but est de s'entraîner à ce qu'on ne t'a pas
préparé.

## Banque d'objections

### Groupe 1 : le CTO pro-CRUD

**Objection 1.1.** "On n'a pas besoin de CQRS. On a une table, un ORM, quatre
développeurs. CQRS, c'est deux modèles à maintenir, une synchronisation à surveiller, et
un bug de cohérence à terme la première fois qu'un utilisateur rafraîchit trop vite. Tu
proposes de doubler la complexité pour un problème de lecture qu'un index correctement
posé résout en une migration."

**Objection 1.2.** "Ton découpage en contextes bornés, c'est joli sur un schéma, mais en
pratique ça fait cinq micro-tables qu'il faut joindre à la main dans le code applicatif
au lieu d'une jointure SQL native. Tu as remplacé un problème que la base de données sait
résoudre par un problème que toi, tu dois résoudre à la main."

### Groupe 2 : la direction financière

**Objection 2.1.** "Le budget cloud que tu proposes dépasse l'enveloppe de 30%. On ne
demande pas de retravailler l'architecture, on demande de trouver 30% d'économies sur ce
budget précis, cette semaine, sans dégrader le SLO annoncé aux clients."

**Objection 2.2.** "Tu chiffres cette fonctionnalité à 15 jours-développeur. Le devis d'un
prestataire externe propose la même chose en configuration, sans code, pour moins cher que
ton estimation en salaire chargé. Pourquoi développer en interne plutôt que payer cette
solution du marché ?"

### Groupe 3 : la conformité

**Objection 3.1.** "Le stockage que tu proposes héberge des données de santé hors de
l'Union européenne. Peu importe le chiffrement au repos que tu as prévu : le transfert
international de cette catégorie de donnée est bloqué par notre politique, point final. Ce
choix technique n'est pas négociable avec moi, il l'est avec le DPO, mais je ne le
valide pas en l'état."

**Objection 3.2.** "Ta durée de conservation des logs applicatifs est de deux ans. Notre
politique de minimisation impose six mois sauf obligation légale contraire. Justifie-moi
l'exception ligne par ligne, catégorie de donnée par catégorie de donnée, ou raccourcis."

### Groupe 4 : l'astreinte, à trois heures du matin

**Objection 4.1.** "Je suis d'astreinte cette nuit et ton architecture event-driven vient
de me réveiller pour un message coincé dans une file que je ne sais pas inspecter sans
réécrire un script. Avec l'ancien système synchrone, je voyais l'erreur dans un seul log.
Explique-moi pourquoi je devrais accepter de perdre en lisibilité d'incident ce que tu
gagnes en découplage, un jour où je ne suis pas reposé pour apprécier la nuance."

**Objection 4.2.** "Ton architecture multi-région promet une meilleure disponibilité, mais
elle ajoute trois systèmes distribués que je dois comprendre pour diagnostiquer une panne
à trois heures du matin, contre un seul avant. Le MTTR (temps moyen de réparation) que tu
me proposes en pratique est pire que celui que tu prétends améliorer sur le papier."

### Groupe 5 : le produit

**Objection 5.1.** "Le changement de spec demandé par le client casse ton modèle de
données central. Tu me dis qu'il faut trois semaines de refonte. Le client, lui, dit qu'il
part chez un concurrent dans dix jours si rien ne bouge. Donne-moi une option à dix jours,
même dégradée, ou dis-moi clairement qu'elle n'existe pas et pourquoi."

**Objection 5.2.** "Tu proposes de reporter cette fonctionnalité en V2 au nom de la dette
technique. Le tableau de bord commercial montre que c'est la première demande des
prospects perdus ce trimestre. Ta priorisation technique et la réalité commerciale ne
racontent pas la même histoire : laquelle a tort ?"

### Groupe 6 : les pairs

**Objection 6.1.** "Ta revue de code demande de refactorer une fonction qui n'a jamais eu
de bug en production depuis deux ans. Tu proposes de risquer une régression sur du code
stable pour un gain de lisibilité que toi seul juges nécessaire. En quoi ce risque en
vaut-il la peine, mesuré, pas ressenti ?"

**Objection 6.2.** "Tu délègues cette tâche à une IA générative sans relecture ligne à
ligne, en disant que le test automatisé suffit à garantir la qualité. Le test que tu as
écrit ne couvre pas le cas limite qui a cassé la production le mois dernier. Comment
sais-tu que ce que tu n'as pas relu ne contient pas la même faille ?"

## Passe de contradiction S5 : la revue de code, contestée en solo

La preuve S5 ([PREUVES-STAFF-ENGINEER.md](../PREUVES-STAFF-ENGINEER.md)) ne doit dépendre
d'aucun tiers. Cette passe remplace le mainteneur absent.

| Étape | Durée | Ce que tu fais | Trace exigée |
| --- | --- | --- | --- |
| 1 | 2 min | tu lis à voix haute ton commentaire bloquant, risque nommé compris | l'URL permanente du commit audité, écrite avant de commencer |
| 2 | 2 min | tu tires 6.1 ou 6.2 et tu **plaides contre toi**, avec le meilleur argument adverse disponible : code stable depuis deux ans, test automatisé jugé suffisant | l'objection recopiée mot pour mot |
| 3 | 3 min | tu réponds : le bloquant tient, ou il devient une suggestion | la phrase de verdict, une seule |
| 4 | 1 min | tu te notes sur la grille ci-dessous | note + date |

Verdict binaire : un bloquant qui ne survit pas à une objection sourcée **doit** être requalifié
en suggestion dans ta revue publiée. Une passe où les trois niveaux sortent intacts est suspecte :
tu as plaidé contre toi trop mollement, refais l'étape 2.

Réponse du mainteneur : bonus daté, jamais une condition de validation.

## Grille d'auto-notation

Après ta réponse orale de 5 minutes, note-toi sur ces quatre axes, sans indulgence. Une
réponse ne peut pas valider un axe sans preuve écrite ou chiffrée à l'appui.

| Axe | Question | 0 point | 1 point | 2 points |
| --- | --- | --- | --- | --- |
| Vrai point soulevé | As-tu répondu à l'objection exacte, ou à une version plus facile que tu as substituée sans le dire ? | tu as répondu à côté | tu as reformulé l'objection avant de répondre, mais imparfaitement | tu as nommé explicitement le point précis avant de le traiter |
| Chiffrage | Ta réponse contient-elle au moins un nombre vérifiable (coût, latence, durée, taux d'erreur) ? | aucun chiffre | un ordre de grandeur non sourcé | un chiffre sourcé ou calculable devant l'interlocuteur |
| Cession sans argument | As-tu cédé sur le fond sans justifier pourquoi l'objection l'emportait ? | tu as cédé "pour avoir la paix", sans dire pourquoi | tu as cédé partiellement avec un argument partiel | soit tu as tenu avec un argument complet, soit tu as cédé en nommant précisément ce qui a fait pencher la balance |
| Écoute | As-tu tenu ta position en ignorant un élément nouveau apporté par l'objection ? | tu as répété ton plan initial mot pour mot | tu as ajusté un détail sans reconnaître le point de fond | tu as intégré explicitement ce que l'objection t'apprenait, même en maintenant ta décision |

Un score total inférieur à 5/8 signale une défense non prête : retire l'objection, prépare
une réponse écrite cette fois, puis retire une nouvelle objection du même groupe.

## Historique des tirages

Note ici, au fil de tes entraînements, l'objection tirée, la date, et ton score, pour
vérifier que tu progresses plutôt que de rejouer toujours le même groupe.

```
date       | objection | score /8 | ce qui a manqué
-----------|-----------|----------|----------------
```
