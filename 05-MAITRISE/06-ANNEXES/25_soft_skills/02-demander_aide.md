---
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: Demander de l'aide efficacement est indépendant de la techno.
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, constraints_injectees]
anti_recipe_key: changement_echelle+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Demander de l'aide efficacement

Temps de lecture ~8 min

> Une compétence que personne n'enseigne, que tout le monde attend. Se démerder tout seul jusqu'à un mur, puis poser une question qui obtient une réponse en 5 min plutôt qu'en 3 jours.

## LE TRIPLET AVANT LA QUESTION

Avant de solliciter quiconque (collègue, canal Slack, forum, IA), tu dois pouvoir formuler trois choses :

1. **Le contexte** : ce que tu essaies de faire, pas ce que tu bloques. "Je veux servir un fichier statique en dev sans reload manuel" et pas "npm start renvoie une erreur".
2. **L'hypothèse** : ce que tu crois qu'il se passe et pourquoi. "Je pense que Vite ne watch pas ce dossier parce qu'il n'est pas dans `src/`."
3. **La preuve** : ce que tu as testé pour confirmer ou infirmer l'hypothèse. "J'ai déplacé le fichier dans `src/` : le reload fonctionne. Donc je veux comprendre comment ajouter un dossier watché sans le déplacer."

Une question qui contient les trois obtient une réponse. Une question qui contient seulement le blocage obtient d'autres questions.

## LE CANEVAS DE MESSAGE

Pour Slack, un collègue, une PR bloquante :

```text
Contexte : <une phrase, ce que tu tentes>
Ce que j'ai essayé : <2-3 puces, avec le résultat de chaque tentative>
Mon hypothèse actuelle : <une phrase, pourquoi>
Ce qui me bloque : <la question précise>
```

Ordre non négociable. Ne mets jamais la question en premier. La personne qui te lit doit pouvoir juger si le sujet vaut son temps avant de lire ta question.

## MAUVAISE vs BONNE DEMANDE

### Mauvaise (verdict : ignorée ou trollée)

> "Salut, ma promesse ne resolve pas, quelqu'un peut m'aider ?"

### Bonne (verdict : réponse en 5 min)

> Contexte : je fetch trois APIs en parallèle avec Promise.all, la 3e ne résout jamais.
> Ce que j'ai essayé : (a) log dans la 3e fonction : elle est bien appelée. (b) je l'appelle isolément : elle retourne bien. (c) j'ai remplacé Promise.all par Promise.allSettled : la 3e est bien en pending.
> Mon hypothèse : la 3e fonction ne fait pas de return sur son await, ça se voit pas dans le log parce que je log avant.
> Ce qui me bloque : je ne trouve pas le missing return après 20 min de relecture, je préfère demander qu'y passer une heure. Voici les 15 lignes de la fonction : [snippet]

Deux minutes à écrire, une réponse ciblée en retour.

## LA RÈGLE DES TROIS TENTATIVES

Avant de demander :

1. Cherche 5 min sur ton codebase et la doc officielle.
2. Cherche 5 min sur le web (mots-clés du message d'erreur exact).
3. Écris ton hypothèse et ta preuve avant de demander.

Si les trois échouent : demande. Ne demande pas avant. Demande sans faute après.

## ABORDER UN CODE HÉRITÉ SANS MÉPRIS

Le code que tu trouves moche a probablement été écrit par quelqu'un qui avait moins de contexte, moins de temps, ou une contrainte que tu ne vois pas. Trois postures utiles :

- **Lire l'historique git avant de juger** : `git log --pretty=format:'%h %an %s' -- <fichier>` révèle souvent une contrainte disparue.
- **Ne jamais dire "c'est de la merde"** dans un commentaire, un Slack, une revue. Dis "je ne comprends pas la raison de X, quelqu'un a le contexte ?"
- **Refactorer avec humilité** : commence petit, garde le comportement, prouve avec tests. Le code hérité qui tient depuis 5 ans encaisse des cas que ton refacto ignore.

## RECONNAÎTRE SES LIMITES

Trois signaux que tu bloques et que tu dois demander plutôt que persister :

1. Tu as passé plus de 45 min sans avancer d'un iota.
2. Tu recycles la même approche en boucle en la modifiant à la marge.
3. Tu es fatigué au point que tu relis 3 fois la même ligne sans la voir.

Reconnaître ça n'est pas faible. C'est du respect pour ton temps et celui des autres.

## OÙ CETTE FICHE S'ARTICULE

- Amont : `../../../01-CADRAGE/03-DEBUGGING/06-hypothesis_driven_debug.md` (formuler une hypothèse debug).
- Aval : `../../../03-PILOTAGE/10-TEAM-CRAFT/02-code_review.md` (recevoir et donner des retours).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Pratique autonome : production attendue

À partir de « Demander de l'aide efficacement », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Rendre une demande d’aide actionnable

```text
contexte bref
     |
     v
attendu vs observé
     |
     v
essais et résultats
     |
     v
blocage précis
     |
     v
aide demandée + prochaine étape
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Demander de l'aide efficacement** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Demander une aide ciblée dans une situation de travail

**Mission liée à « Demander de l'aide efficacement » :** Construis une demande d’aide Kintana selon le contexte, les essais, le blocage et le type de soutien recherché ; élimine les informations sensibles inutiles.

**Livrable :** Message d’aide réutilisable et reproduction minimale.

**Critères d’acceptation :** Le destinataire comprend ce qui est demandé ; les contraintes de temps sont explicites ; les données privées sont protégées.

**Transfert obligatoire :** Le destinataire n’a pas la compétence recherchée : formule le relais nécessaire.
