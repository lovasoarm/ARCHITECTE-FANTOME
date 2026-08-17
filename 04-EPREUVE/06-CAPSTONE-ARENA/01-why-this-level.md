# Pourquoi ce niveau existe

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

| Option                                                     | Coût                                                        | Bénéfice                                                          | Quand choisir                                                                |
| ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Attendre un brief complet avant de commencer                | Semaines perdues en allers-retours, le client change d'avis entre-temps | Zéro gaspillage de code si le brief final change radicalement          | Quasiment jamais en mission réelle ; seulement si le coût de construire un prototype est disproportionné (matériel physique, contrat juridique lourd) |
| Construire un prototype qui teste l'hypothèse la plus risquée en premier | Risque de jeter ce prototype si l'hypothèse est fausse       | Réduction rapide de l'incertitude la plus coûteuse, feedback réel tôt  | Cas général : brief flou, coût de construction faible à moyen, client disponible pour réagir |
| Poser une longue liste de questions fermées au client        | Le client se lasse, répond au hasard ou pas du tout            | Utile pour extraire des faits que le client connaît déjà (contraintes légales, budget réel) | Uniquement pour les données factuelles, jamais pour arbitrer une préférence non formée |
| Décider seul sans hypothèse écrite ni retour du client        | Le client découvre un désaccord de fond à la livraison finale, coût maximal | Vitesse d'exécution apparente, aucun ralentissement en cours de route  | Jamais recommandé ; acceptable seulement sur un point vraiment sans enjeu (couleur d'un bouton secondaire) |

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
