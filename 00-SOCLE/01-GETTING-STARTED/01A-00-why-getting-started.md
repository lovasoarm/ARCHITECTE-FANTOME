---
perennite: evolutif
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: Les outils d'installation (Node, npm, VS Code) évoluent mais les principes restent.
acte: comprendre
cognitive_level: L1
perturbation_modes: [consigne_simple, premiere_execution]
anti_recipe_key: consigne_simple+premiere_execution
transfer_distance: low
assessment_role: instructional_checkpoint
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "00-SOCLE/01-GETTING-STARTED/01-START_HERE.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 00-SOCLE/01-GETTING-STARTED/01-START_HERE.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE : première exécution :** tu écris une instruction dans un fichier, tu demandes à Node.js de l’exécuter et tu lis le résultat dans le terminal.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

# Pourquoi ce dossier "getting started" ?

Temps de lecture ~2 min

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Parce qu'un débutant peut perdre sa première séance sur un problème d'outillage plutôt que sur la programmation : Node absent, chemin mal configuré, terminal inconnu ou éditeur mal préparé. Ce dossier réduit ce risque en donnant une vérification simple à chaque étape. Aucun pourcentage d'abandon n'est avancé ici : le parcours ne dispose pas d'une mesure publiée permettant de le justifier.

## Le pari

Un débutant "super nul" doit pouvoir :

- installer Node **22.23.4** sur Windows, macOS ou Linux ;
- vérifier son installation avec `node -v` ;
- ouvrir un premier fichier `.js`, le lancer, voir la sortie ;
- comprendre ce qu'est un terminal, un shell, un dossier de projet.

En suivant d'abord les consignes fournies, puis en consultant une documentation fiable lorsqu'une étape le demande. Ne copie pas une commande que tu ne sais pas identifier.

## Ce que tu y trouveras

- `02-install.md` : installer uniquement Node.js pour le premier exercice, avec un parcours distinct selon le système et la méthode choisie.
- Les hypothèses matérielles minimales (RAM, OS, réseau).
- Une commande simple qui confirme que Node.js répond. npm et Git seront vérifiés seulement lorsqu’une activité en aura besoin.

## Ce que ce dossier n'est PAS

Ce n'est pas un cours JavaScript. Ce n'est pas non plus une doc
exhaustive de Node. C'est un tunnel : entrée = machine vierge, sortie =
"j'ai obtenu une sortie dans mon terminal, je passe au Prologue puis aux Fundamentals".

## Signal que tu peux quitter ce dossier

Tu sais vérifier `node -v`, créer et exécuter un fichier `.js`, puis lire une erreur simple. Retourne à `01-START_HERE.md` pour vérifier le noyau, puis ouvre le Prologue. Ne saute pas directement à Fundamentals.

## Signal que tu dois y rester encore un peu

Une requête te renvoie une erreur que tu ne comprends pas, un chemin ne
fonctionne pas, ou tu ne sais pas ce qu'est un shell. C'est normal. Ne
saute pas ce dossier "pour aller au vrai contenu" : le vrai contenu ne
tiendra pas si les fondations d'outillage sont fissurées.

## Pourquoi c'est traité en tout premier

Parce qu'une installation confuse peut donner l'impression que la programmation est inaccessible, alors que le problème vient seulement de l'outillage. Le parcours sépare donc la vérification de l'environnement de l'apprentissage du langage.

<!-- AF-DIAGRAM:setup -->

## Repère visuel utile : Environnement reproductible et livraison

```text
fichier .js
    |
    v
commande node
    |
    v
exécution du programme
    |
    v
résultat dans le terminal
```

<!-- AF-LESSON-PROFILE: setup -->

## Repères de décision

- **Pourquoi :** Un environnement non reproductible transforme un bug logiciel en chasse au trésor. Le but est que deux machines puissent exécuter le même projet avec des versions et des étapes connues.
- **Quand l’utiliser / quand l’éviter :** Prépare ou répare l'environnement avant une modification, un onboarding ou une livraison. N'ajoute pas d'outil si une commande native et documentée suffit.
- **Limites :** Un setup reproductible ne garantit pas que le service fonctionne en production ; il réduit seulement les différences d'environnement. Les secrets et données personnelles ne doivent jamais entrer dans le dépôt.

## Mécanisme : la version sans magie

Node.js lit et exécute le fichier JavaScript. La commande `node -v` indique quelle version du runtime est disponible ; elle ne vérifie ni Git, ni les dépendances d'un projet, ni son fonctionnement complet.

## Ancrage produit / terrain : Kintana

[Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md) sert ici de contexte pédagogique. À ce stade, il ne faut ni cloner le projet, ni installer ses dépendances : on vérifie seulement que la machine sait lancer Node.js.

**À observer :** la version réellement affichée par `node -v`. Cette sortie confirme le runtime sélectionné ; elle ne prouve pas qu'une application complète fonctionne.

## Mission utile : vérifier le runtime

Lance `node -v` dans ton terminal et recopie la sortie dans ton journal d'apprentissage. Explique en une phrase ce que cette commande confirme et ce qu'elle ne confirme pas.

**Livrable :** la sortie réelle de `node -v` et une phrase d'explication.

**Critères d’acceptation :** la version est visible ; tu sais que cette commande affiche la version de Node.js et ne vérifie ni Git, ni les dépendances, ni le déploiement d'un projet.

**Transfert obligatoire :** relance la même commande après avoir changé de dossier. La version de Node ne doit pas être confondue avec le contenu du dossier courant.
