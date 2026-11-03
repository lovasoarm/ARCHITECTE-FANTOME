---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Pourquoi ce niveau existe

<!-- AF-DIAGRAM:capstone -->

```text
Architecture ─┐
Security ─────┤
Cost ─────────┤
Reliability ──┼──► STAFF DECISION ─► Perturbation ─► Revision
Product ──────┤
AI ───────────┤
Leadership ───┘
```

Le capstone réunit plusieurs contraintes dans une décision unique, puis force sa révision sous perturbation.

Temps de lecture ~9 min

## Le piège

Un client t'écrit : "on veut un outil pour gérer les réservations de nos salles d'escalade,
un peu comme Doctolib mais pour nous, avec un système de créneaux et de niveaux de
difficulté". C'est tout. Pas de spécification, pas de maquette, pas de liste de
fonctionnalités précise. Le développeur junior demande "vous pouvez préciser le cahier des
charges ?" et attend une réponse qui ne viendra jamais complète. Le développeur senior
commence à construire une première version en quelques jours, la montre, et fait préciser le
besoin par les réactions du client face à quelque chose de concret.

Le piège n'est pas dans le brief flou lui-même : il est dans ce que tu fais en réaction. La
majorité des apprenants qui arrivent à ce niveau ont un réflexe scolaire : ils veulent une
spec complète avant de taper une ligne de code, parce que c'est ce que les onze niveaux
précédents leur ont donné à chaque fois (un challenge avec critères de réussite écrits
d'avance). Ici, personne ne va écrire ces critères à ta place. C'est le point du niveau, pas
un oubli de conception pédagogique.

## Ce qui casse sans ce niveau

- **Tu attends la clarté avant d'agir**, et tu perds des semaines en allers-retours de
  questions alors qu'un prototype aurait fait émerger les réponses plus vite.
- **Tu livres "tout ce que tu as compris" sans structure de livrables**, ce qui rend
  impossible pour le client de savoir ce qui est fini, en cours, ou pas commencé.
- **Tu ne t'évalues jamais toi-même avant la revue**, donc tu découvres tes angles morts en
  même temps que ton client : au pire moment possible.
- **Tu confonds "j'ai tout fait" avec "j'ai livré de la valeur vérifiable"**, deux choses très
  différentes quand personne d'autre que toi ne peut juger si le travail est bon.
- **Tu traites chaque nouvelle demande du client comme une trahison du brief initial**, alors
  qu'un client qui découvre une contrainte en cours de route n'a pas menti : il ne savait pas
  encore que cette contrainte existait avant de voir quelque chose de concret.

## Ce qui se passe vraiment

Un brief ambigu n'est pas un problème à résoudre en une fois, c'est un problème à réduire
progressivement pendant que tu construis. La compétence n'est pas de deviner juste du premier
coup, elle est de faire des hypothèses explicites, de construire un premier livrable qui les
teste, et d'ajuster.

Ce mécanisme a un nom dans la littérature de gestion de projet : la réduction d'incertitude
par itération, plutôt que par analyse préalable exhaustive. Deux univers très différents
appliquent ce même principe tous les jours.

Analogie : cadrer un brief ambigu, c'est comme un capitaine qui ajuste sa route en pleine mer
au fur et à mesure que la météo se précise, et comme un chef de cuisine qui goûte et corrige
une sauce plutôt que de suivre une recette figée sans jamais y retoucher.
Où l'analogie casse : le capitaine et le chef ont un retour sensoriel immédiat (le vent
change, la sauce a un goût). Toi, tu n'as souvent aucun retour tant que tu n'as pas construit
quelque chose d'assez concret pour que le client réagisse : ton "goût" à toi, c'est un
livrable qui existe, pas une intuition.

```text
Brief ambigu
   |
   v
Hypotheses explicites ecrites (pas dans ta tete)
   |
   v
Premier livrable qui teste les hypotheses les plus risquees en premier
   |
   v
Retour (reel ou simule) --> confirme ou infirme
   |
   v
Ajustement du perimetre, jamais du silence
```

Le point le plus contre-intuitif : l'ordre des hypothèses testées compte autant que le fait
d'en avoir. Un apprenant qui teste d'abord l'hypothèse la moins risquée ("le bouton doit être
bleu ou vert ?") avant l'hypothèse structurante ("le comptage de capacité doit-il être exact à
la seconde près ou approximatif ?") perd le bénéfice de l'itération : il découvre le vrai
problème trop tard pour corriger sans tout reconstruire.

## Ce qui se passe vraiment (suite) : la différence entre "flou" et "sous-spécifié"

Un brief flou n'est pas la même chose qu'un brief incomplet. Un brief incomplet manque
d'informations que quelqu'un possède déjà (le nombre exact de salles, le nom du prestataire
de paiement) : la bonne réponse est de poser la question précise. Un brief flou n'a
littéralement pas encore de réponse arrêtée dans la tête du client (est-ce que "utilisable
dans deux mois" veut dire "démo interne" ou "ouvert aux adhérents" ?) : la bonne réponse est
de proposer une hypothèse et de la confronter à un livrable concret, parce que poser la
question ne suffira pas, le client lui-même hésite.

Confondre les deux te fait perdre du temps dans les deux sens : tu poses des questions
précises à quelqu'un qui n'a pas de réponse arrêtée (il te répondra vague, tu n'auras rien
gagné), ou tu inventes une hypothèse sur une donnée que quelqu'un connaît déjà et que tu
aurais pu simplement demander (tu perds du temps à deviner ce qui était disponible).

## Compromis

| Option                                                                   | Coût                                                                        | Bénéfice                                                                                    | Quand choisir                                                                                                                                         |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Attendre un brief complet avant de commencer                             | Semaines perdues en allers-retours, le client change d'avis entre-temps     | Zéro gaspillage de code si le brief final change radicalement                               | Quasiment jamais en mission réelle ; seulement si le coût de construire un prototype est disproportionné (matériel physique, contrat juridique lourd) |
| Construire un prototype qui teste l'hypothèse la plus risquée en premier | Risque de jeter ce prototype si l'hypothèse est fausse                      | Réduction rapide de l'incertitude la plus coûteuse, feedback réel tôt                       | Cas général : brief flou, coût de construction faible à moyen, client disponible pour réagir                                                          |
| Poser une longue liste de questions fermées au client                    | Le client se lasse, répond au hasard ou pas du tout                         | Utile pour extraire des faits que le client connaît déjà (contraintes légales, budget réel) | Uniquement pour les données factuelles, jamais pour arbitrer une préférence non formée                                                                |
| Décider seul sans hypothèse écrite ni retour du client                   | Le client découvre un désaccord de fond à la livraison finale, coût maximal | Vitesse d'exécution apparente, aucun ralentissement en cours de route                       | Jamais recommandé ; acceptable seulement sur un point vraiment sans enjeu (couleur d'un bouton secondaire)                                            |

## Pièges classiques

- **Construire la fonctionnalité la plus intéressante techniquement en premier**, pas la plus
  risquée pour le client. Symptôme observable : tu as un algorithme élégant de recommandation
  de créneaux avant même d'avoir vérifié que le compte partagé entre les trois salles
  fonctionne.
- **Écrire les hypothèses dans ta tête plutôt que sur un document daté**. Symptôme observable :
  en relecture, tu ne sais plus dire quelle hypothèse tu avais posée avant de voir la réaction
  du client, tu confonds ce que tu savais avant et après.
- **Considérer chaque silence du client comme une validation implicite**. Symptôme observable :
  tu avances trois semaines sur une direction sans jamais avoir montré une version concrète,
  en te disant "il n'a pas dit non".
- **Traiter l'auto-évaluation comme une formalité de fin de projet**. Symptôme observable : tu
  remplis la grille en cinq minutes juste avant la deadline, avec des scores tous proches du
  maximum et sans justification différenciée par critère.
- **Refuser d'ajuster le périmètre par peur de sembler incompétent**. Symptôme observable : tu
  gardes "prêt de matériel" dans la V1 alors que le brief indique explicitement que le client
  peut vivre sans, uniquement parce que tu l'avais déjà commencé.

## Un exemple concret d'hypothèse mal ordonnée

Un apprenant du niveau a réellement commis cette erreur (rapportée en revue) : il a passé
trois jours à concevoir un système de badges de progression (niveaux de difficulté, paliers,
récompenses visuelles) avant de vérifier que la contrainte de capacité en temps réel
fonctionnait sous deux réservations simultanées. Le badge system n'existait dans aucune ligne
du brief. La capacité en temps réel, elle, était directement liée à l'incident avec les
pompiers cité dans le message client.

```text
Temps investi          Fonctionnalite                  Risque reel pour le client
------------------------------------------------------------------------------------
3 jours                Badges de progression            Nul : jamais demande
0 jour (a ce stade)     Capacite en temps reel           Maximal : lie a un incident passe
```

Ce déséquilibre n'est pas un problème de compétence technique : le code des badges était
propre, testé, bien structuré. C'est un problème de séquencement des hypothèses. La bonne
question à se poser avant chaque tâche n'est pas "qu'est-ce qui est intéressant à construire
maintenant ?" mais "qu'est-ce qui, si c'est faux, coûte le plus cher à découvrir tard ?".

## Ce que le niveau attend de toi concrètement, jour par jour

Ce niveau ne se lit pas comme une leçon isolée : il structure trois à quatre semaines de
travail réel. Voici, en substance, ce qui doit changer dans ta manière de travailler par
rapport aux niveaux précédents :

- Tu écris tes hypothèses avant de les tester, dans un fichier daté, pas dans un carnet mental
  que tu reconstruis a posteriori.
- Tu montres un livrable concret au client (réel ou simulé) avant d'avoir "fini" ta vision
  complète du produit, même si ce livrable est incomplet ou moche.
- Tu documentes chaque décision de périmètre (ce qui reste dans la V1, ce qui est reporté)
  avec l'argument qui la justifie, pas seulement la décision elle-même.
- Tu remplis la grille d'évaluation avant qu'un tiers ne le fasse, en acceptant d'y écrire des
  scores bas si c'est ce que la réalité de ta copie impose.
- Tu traites un changement de spec en cours de route comme un signal à mesurer, pas comme une
  injustice à subir ou une preuve que tu as mal travaillé.

## Pourquoi ce niveau ne note pas la même chose qu'un examen classique

Un examen classique note ta capacité à produire une bonne réponse à une question posée par
quelqu'un d'autre. Ce niveau note ta capacité à formuler la bonne question toi-même, puis à y
répondre avec des preuves vérifiables. C'est une compétence différente, plus proche de ce
qu'on attend en poste que de ce qu'on attend en examen : personne, en mission réelle, ne te
donnera un énoncé propre avec des critères de correction affichés d'avance.

## Ce que tu dois savoir défendre

- Pourquoi attendre un brief complet avant d'agir est souvent plus risqué que de livrer vite
  avec des hypothèses explicites.
- La différence entre "j'ai deviné juste" et "j'ai réduit l'ambiguïté par une méthode".
- Pourquoi s'auto-évaluer avec une grille avant la revue change la qualité de ce que tu livres.
- La différence entre un brief "flou" (le client n'a pas encore de réponse arrêtée) et un
  brief "incomplet" (le client a l'information mais tu ne l'as pas demandée), et pourquoi
  cette distinction change ta méthode de clarification.
- Pourquoi tester d'abord l'hypothèse la plus risquée plutôt que la plus facile change le
  résultat final d'un projet en brief ambigu.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce niveau existe** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une architecture exploitable de bout en bout

> **Arc Capsule Corp. / DBZ :** un plan n'est réussi que si le vaisseau peut être construit, piloté, réparé et faire face à une avarie.

**Mission liée au capstone :** Choisis un parcours métier complet de Kintana. Relie la frontière de domaine à ses contrats d'API, à la propriété des données, aux dépendances externes, aux modes de panne et au chemin de livraison. Compare au moins deux options d'architecture, puis explique comment la solution sera déployée, observée et restaurée. Le but n'est pas de produire un diagramme séduisant, mais une proposition exploitable et révisable.

**Livrable :** carte de contexte et diagramme de flux, ADR comparatif, contrats et invariants, registre de risques, plan de déploiement progressif, stratégie de rollback et signaux d'observabilité.

**Critères d’acceptation :** chaque donnée a un propriétaire ; les frontières et responsabilités sont explicites ; les pannes et effets partiels sont traités ; sécurité et données sensibles sont prises en compte ; les coûts d'exploitation et de migration sont visibles ; le déploiement et le retour arrière ont des conditions vérifiables ; aucune mise en production réelle n'est présumée.

**Transfert obligatoire :** Une dépendance tombe au milieu d'une migration et un volume double. Décris l'état sûr à préserver, les opérations à suspendre, les preuves nécessaires pour reprendre et le signal qui ferait réviser l'architecture.
